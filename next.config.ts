import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs/config";

const nextConfig: NextConfig = {
  typedRoutes: true,
};

export default withSentryConfig(nextConfig, {
  silent: true,
});
