interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Cleanup interval to avoid memory leaks over time
const CLEANUP_INTERVAL_MS = 60 * 1000;
let lastCleanup = Date.now();

function cleanupExpired(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  const expirationThreshold = now - windowMs;
  for (const [key, record] of rateLimitStore.entries()) {
    const valid = record.timestamps.filter((ts) => ts > expirationThreshold);
    if (valid.length === 0) {
      rateLimitStore.delete(key);
    } else {
      record.timestamps = valid;
    }
  }
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetMs: number;
}

/**
 * Checks sliding window rate limit for a given key (e.g. client IP).
 *
 * @param key Identifier for the client (e.g. IP address)
 * @param limit Maximum allowed requests in the window (default: 3)
 * @param windowMs Window duration in milliseconds (default: 10 minutes)
 */
export function checkRateLimit(
  key: string,
  limit: number = 3,
  windowMs: number = 10 * 60 * 1000
): RateLimitResult {
  cleanupExpired(windowMs);

  const now = Date.now();
  const threshold = now - windowMs;

  const record = rateLimitStore.get(key) || { timestamps: [] };
  // Keep only timestamps within current sliding window
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
  rateLimitStore.set(key, { timestamps: activeTimestamps });

  return {
    success: true,
    limit,
    remaining: limit - activeTimestamps.length,
    resetMs: windowMs,
  };
}
