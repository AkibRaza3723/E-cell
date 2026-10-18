"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, isAllowedAdminEmail } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function getAdminSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch {
    return null;
  }
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session?.user || !isAllowedAdminEmail(session.user.email)) {
    redirect("/admin/login");
  }
  return session;
}

export interface EmailStatusResponse {
  allowed: boolean;
  hasPassword?: boolean;
  message?: string;
}

export async function verifyAdminEmailStatus(
  rawEmail: string
): Promise<EmailStatusResponse> {
  const email = rawEmail.trim().toLowerCase();

  if (!email) {
    return {
      allowed: false,
      message: "Please enter an email address.",
    };
  }

  // 1. Verify if the email is on the whitelist in process.env.ADMIN_EMAILS
  if (!isAllowedAdminEmail(email)) {
    return {
      allowed: false,
      message:
        "This email is not authorized for administrator access. Only pre-configured society admin emails are allowed.",
    };
  }

  // 2. Check if this administrator already has an account with a password
  try {
    if (!prisma?.user) {
      return {
        allowed: true,
        hasPassword: false,
        message: "First-time setup: Enter your details to create your password.",
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        allowed: true,
        hasPassword: true,
        message: "Administrator account found. Please enter your password to sign in.",
      };
    } else {
      return {
        allowed: true,
        hasPassword: false,
        message:
          "Welcome! This is your first time accessing the portal. Please set your password.",
      };
    }
  } catch (err) {
    console.error("Error verifying email status:", err);
    return {
      allowed: true,
      hasPassword: false,
      message: "Proceed to login or first-time setup.",
    };
  }
}
