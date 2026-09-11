import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs/config";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  typedRoutes: true,
};

export default withSentryConfig(withNextIntl(nextConfig), {
  silent: true,
});

