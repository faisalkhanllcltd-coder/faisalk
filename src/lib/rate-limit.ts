import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetMs: number;
}

// In-memory fallback store for development, CI, or when Upstash Redis is not configured
interface FallbackRecord {
  timestamps: number[];
}

const fallbackStore = new Map<string, FallbackRecord>();
const CLEANUP_INTERVAL_MS = 60 * 1000;
let lastCleanup = Date.now();

function cleanupExpiredFallback(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  const expirationThreshold = now - windowMs;
  for (const [key, record] of fallbackStore.entries()) {
    const valid = record.timestamps.filter((ts) => ts > expirationThreshold);
    if (valid.length === 0) {
      fallbackStore.delete(key);
    } else {
      record.timestamps = valid;
    }
  }
}

function checkFallbackRateLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  cleanupExpiredFallback(windowMs);

  const now = Date.now();
  const threshold = now - windowMs;

  const record = fallbackStore.get(key) || { timestamps: [] };
  const activeTimestamps = record.timestamps.filter((ts) => ts > threshold);

  if (activeTimestamps.length >= limit) {
    const oldest = activeTimestamps[0] ?? now;
    const resetMs = oldest + windowMs - now;
    return {
      success: false,
      limit,
      remaining: 0,
      resetMs: Math.max(0, resetMs),
    };
  }

  activeTimestamps.push(now);
  fallbackStore.set(key, { timestamps: activeTimestamps });

  return {
    success: true,
    limit,
    remaining: limit - activeTimestamps.length,
    resetMs: windowMs,
  };
}

// Initialize Upstash Ratelimit if credentials are present
const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

let upstashRatelimiter: Ratelimit | null = null;

if (redisUrl && redisToken) {
  try {
    const redis = new Redis({
      url: redisUrl,
      token: redisToken,
    });
    upstashRatelimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "10 m"),
      analytics: true,
      prefix: "ratelimit:contact",
    });
  } catch (err) {
    console.error("[RateLimit] Failed to initialize Upstash Redis:", err);
  }
}

/**
 * Checks sliding window rate limit for a given key (e.g. client IP).
 * Uses @upstash/ratelimit with @upstash/redis when configured,
 * falling back to an in-memory sliding window when credentials are unavailable.
 *
 * @param key Identifier for the client (e.g. IP address)
 * @param limit Maximum allowed requests in the window (default: 3)
 * @param windowMs Window duration in milliseconds (default: 10 minutes)
 */
export async function checkRateLimit(
  key: string,
  limit: number = 3,
  windowMs: number = 10 * 60 * 1000
): Promise<RateLimitResult> {
  if (upstashRatelimiter) {
    try {
      const response = await upstashRatelimiter.limit(key);
      const resetMs = Math.max(0, response.reset - Date.now());
      return {
        success: response.success,
        limit: response.limit,
        remaining: response.remaining,
        resetMs,
      };
    } catch (err) {
      console.error("[RateLimit] Upstash limit check failed, falling back to memory:", err);
    }
  }

  return checkFallbackRateLimit(key, limit, windowMs);
}
