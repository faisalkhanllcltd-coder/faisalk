"use client";

import React, { useActionState, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { submitContactAction } from "@/app/actions/contact";
import {
  type ContactFormState,
  type ProjectType,
} from "@/lib/contact-types";
import { trackEvent } from "@/lib/analytics";

const initialState: ContactFormState = {
  success: false,
};

const PROJECT_TYPE_KEYS: ProjectType[] = [
  "full-stack",
  "seo-cro",
  "headless",
  "full-time",
  "advisory",
];

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactAction, initialState);
  const [isDismissed, setIsDismissed] = useState(false);
  const t = useTranslations("Contact");

  useEffect(() => {
    if (state.success) {
      trackEvent({
        name: "contact_form_submit",
        properties: {
          projectType: state.submittedValues?.projectType || "full-stack",
        },
      });
    }
  }, [state.success, state.submittedValues?.projectType]);

  if (state.success && !isDismissed) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-8 text-center dark:border-emerald-900/60 dark:bg-emerald-950/40 transition-colors"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/80 dark:text-emerald-300">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-bold text-gray-950 dark:text-gray-100">
          {t("successHeading")}
        </h3>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
          {state.message || t("successDefaultMessage")}
        </p>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-800 shadow-2xs hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus-visible:ring-blue-400"
          >
            {t("sendAnother")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {/* Anti-spam Honeypot Field */}
      <div
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          left: "-9999px",
          height: 0,
          width: 0,
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <label htmlFor="_hp_company_fax">Company Fax</label>
        <input
          type="text"
          id="_hp_company_fax"
          name="_hp_company_fax"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Global Form-level Error Alert */}
      {state.formError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
        >
          {state.formError}
        </div>
      )}

      {/* Name Input */}
      <div>
        <label
          htmlFor="name"
          className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300"
        >
          {t("yourName")} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          defaultValue={state.submittedValues?.name || ""}
          aria-invalid={!!state.errors?.name}
          aria-describedby={state.errors?.name ? "name-error" : undefined}
          placeholder={t("placeholderName")}
          className={`mt-1.5 block w-full rounded-lg border px-3.5 py-2 text-sm text-gray-950 placeholder-gray-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-blue-400 ${
            state.errors?.name
              ? "border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-800"
              : "border-gray-300 focus:border-blue-500 dark:border-gray-700"
          }`}
        />
        {state.errors?.name && (
          <p id="name-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      {/* Email Input */}
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300"
        >
          {t("workEmail")} <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          defaultValue={state.submittedValues?.email || ""}
          aria-invalid={!!state.errors?.email}
          aria-describedby={state.errors?.email ? "email-error" : undefined}
          placeholder={t("placeholderEmail")}
          className={`mt-1.5 block w-full rounded-lg border px-3.5 py-2 text-sm text-gray-950 placeholder-gray-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-blue-400 ${
            state.errors?.email
              ? "border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-800"
              : "border-gray-300 focus:border-blue-500 dark:border-gray-700"
          }`}
        />
        {state.errors?.email && (
          <p id="email-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      {/* Inquiry Type Select */}
      <div>
        <label
          htmlFor="projectType"
          className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300"
        >
          {t("inquiryType")}
        </label>
        <select
          id="projectType"
          name="projectType"
          defaultValue={state.submittedValues?.projectType || "full-stack"}
          className="mt-1.5 block w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm text-gray-950 shadow-2xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
        >
          {PROJECT_TYPE_KEYS.map((typeKey) => (
            <option key={typeKey} value={typeKey}>
              {t(`inquiryTypes.${typeKey}`)}
            </option>
          ))}
        </select>
      </div>

      {/* Message Textarea */}
      <div>
        <label
          htmlFor="message"
          className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300"
        >
          {t("projectDetails")} <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          defaultValue={state.submittedValues?.message || ""}
          aria-invalid={!!state.errors?.message}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
          placeholder={t("placeholderMessage")}
          className={`mt-1.5 block w-full rounded-lg border px-3.5 py-2 text-sm text-gray-950 placeholder-gray-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-blue-400 ${
            state.errors?.message
              ? "border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-800"
              : "border-gray-300 focus:border-blue-500 dark:border-gray-700"
          }`}
        />
        {state.errors?.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">
            {state.errors.message[0]}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gray-950 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-500 dark:focus-visible:ring-blue-400"
      >
        {isPending ? (
          <>
            <svg
              className="h-4 w-4 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>{t("submitting")}</span>
          </>
        ) : (
          <span>{t("submit")}</span>
        )}
      </button>
    </form>
  );
}
