"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { Resend } from "resend";
import { SITE_CONFIG } from "@/lib/metadata";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  projectTypes,
  projectTypeLabels,
  type ContactFormState,
} from "@/lib/contact-types";

const ContactSchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters."),
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email("Please provide a valid work or personal email address."),
  projectType: z.enum(projectTypes, {
    required_error: "Please select an inquiry type.",
  }),
  message: z
    .string({ required_error: "Project details are required." })
    .trim()
    .min(10, "Please provide more details regarding your objective (at least 10 characters).")
    .max(3000, "Message cannot exceed 3,000 characters."),
  _hp_company_fax: z.string().optional(),
});

export async function submitContactAction(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    projectType: formData.get("projectType"),
    message: formData.get("message"),
    _hp_company_fax: formData.get("_hp_company_fax"),
  };

  const parsed = ContactSchema.safeParse(rawData);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      success: false,
      errors: fieldErrors,
      submittedValues: {
        name: typeof rawData.name === "string" ? rawData.name : "",
        email: typeof rawData.email === "string" ? rawData.email : "",
        projectType: typeof rawData.projectType === "string" ? rawData.projectType : "full-stack",
        message: typeof rawData.message === "string" ? rawData.message : "",
      },
    };
  }

  const { name, email, projectType, message, _hp_company_fax } = parsed.data;

  // 1. Anti-spam Honeypot check: If the hidden input is filled, silently discard
  if (_hp_company_fax && _hp_company_fax.trim().length > 0) {
    console.warn("[Contact Action] Honeypot triggered by bot submission.");
    // Return standard success to fool bots without dispatching any emails
    return {
      success: true,
      message: "Thank you for reaching out! I will review your inquiry and get back to you within 24 business hours.",
    };
  }

  // 2. Sliding window rate limiting per IP
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  const realIp = headerList.get("x-real-ip");
  const clientIp = forwarded
    ? (forwarded.split(",")[0]?.trim() || "127.0.0.1")
    : realIp || "127.0.0.1";

  const rateLimit = checkRateLimit(clientIp, 3, 10 * 60 * 1000);
  if (!rateLimit.success) {
    const minutesLeft = Math.ceil(rateLimit.resetMs / 60000);
    return {
      success: false,
      formError: `Too many inquiries received from your connection. Please wait approximately ${minutesLeft} minute(s) before submitting again.`,
      submittedValues: { name, email, projectType, message },
    };
  }

  // 3. Email Delivery via Resend
  const projectLabel = projectTypeLabels[projectType] || projectType;
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const { error } = await resend.emails.send({
        from: "Portfolio Inquiries <onboarding@resend.dev>",
        to: SITE_CONFIG.email,
        replyTo: email,
        subject: `[Lead Inquiry] ${projectLabel} from ${name}`,
        text: `New qualified inquiry submitted via faisalk.dev:\n\nName: ${name}\nEmail: ${email}\nInquiry Type: ${projectLabel}\n\nDetails:\n${message}\n\nClient IP: ${clientIp}`,
      });

      if (error) {
        console.error("[Contact Action] Resend API error:", error);
        return {
          success: false,
          formError: "Failed to dispatch email notification. Please email me directly at " + SITE_CONFIG.email,
          submittedValues: { name, email, projectType, message },
        };
      }
    } catch (err) {
      console.error("[Contact Action] Unexpected error sending email:", err);
      return {
        success: false,
        formError: "A service error occurred while sending your message. Please reach out directly to " + SITE_CONFIG.email,
        submittedValues: { name, email, projectType, message },
      };
    }
  } else {
    // Development / CI fallback mode when RESEND_API_KEY is not configured
    console.warn(
      "[Contact Action] RESEND_API_KEY is not configured. Simulating delivery in dev/test mode:",
      { name, email, projectType: projectLabel, messageLength: message.length }
    );
  }

  return {
    success: true,
    message: "Thank you for reaching out! I will review your inquiry and get back to you within 24 business hours.",
  };
}
