import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    throw new Error("Intentional Sentry test exception for Phase 5 verification.");
  } catch (error) {
    const eventId = Sentry.captureException(error);
    await Sentry.flush(2000);
    return NextResponse.json({
      status: "verified",
      message: "Sentry test exception captured successfully.",
      eventId: eventId || "sentry-unconfigured-mock",
      dsnConfigured: Boolean(process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN),
    });
  }
}
