import { betterAuth } from "better-auth";
import { createAuthMiddleware, APIError } from "better-auth/api";

export function isAllowedAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const raw = process.env.ADMIN_EMAILS || "";
  const allowed = raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.trim().toLowerCase());
}

import { getDbPool } from "@/lib/db";

const activePool = getDbPool();

const adminEmailGuardMiddleware = createAuthMiddleware(async (ctx) => {
  if (ctx.path === "/sign-in/email" || ctx.path === "/sign-up/email") {
    const body = ctx.body as { email?: string } | undefined;
    if (body?.email && !isAllowedAdminEmail(body.email)) {
      throw new APIError("FORBIDDEN", {
        message:
          "This email is not authorized for administrator access. Only pre-configured society admin emails are allowed.",
      });
    }
  }
});

export const auth = betterAuth({
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "ecell-jmi-secret-key-32-chars-minimum-2026",
  database: activePool || {
    provider: "sqlite",
    url: ":memory:",
  },
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "admin",
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (!isAllowedAdminEmail(user.email)) {
            throw new APIError("FORBIDDEN", {
              message:
                "This email is not authorized for administrator access.",
            });
          }
        },
      },
    },
  },
  hooks: {
    before: adminEmailGuardMiddleware,
  },
  baseURL:
    process.env.BETTER_AUTH_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"),
});

export type Session = typeof auth.$Infer.Session;
