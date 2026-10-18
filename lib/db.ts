import { Pool } from "pg";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

export function getDbPool(): Pool | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;

  if (!globalForPrisma.pool) {
    globalForPrisma.pool = new Pool({
      connectionString,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });
  }
  return globalForPrisma.pool;
}

function createPrismaClient(): PrismaClient {
  try {
    const pool = getDbPool();
    if (!pool) {
      return null as unknown as PrismaClient;
    }

    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
  } catch (error) {
    console.error("Failed to initialize PrismaClient:", error);
    return null as unknown as PrismaClient;
  }
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}