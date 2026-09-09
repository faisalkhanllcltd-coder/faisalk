"use client";

import React, { ComponentProps } from "react";
import Link from "next/link";
import { trackEvent, AnalyticsEvent } from "@/lib/analytics";

interface TrackedLinkProps extends ComponentProps<typeof Link> {
  event: AnalyticsEvent;
}

export function TrackedLink({ event, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent(event);
        onClick?.(e);
      }}
    />
  );
}

interface TrackedAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  event: AnalyticsEvent;
}

export function TrackedAnchor({ event, onClick, ...props }: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackEvent(event);
        onClick?.(e);
      }}
    />
  );
}
