import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    throw new Error("Intentional Sentry test exception for Phase 5 verification.");
  } catch (error) {
    const eventId = Sentry.captureException(error);
    return NextResponse.json({
      status: "verified",
      message: "Sentry test exception captured successfully.",
      eventId: eventId || "sentry-unconfigured-mock",
    });
  }
}
