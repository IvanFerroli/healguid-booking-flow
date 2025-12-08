/** Singleton Prisma client for server-side usage.
 *  Prevents exhausting database connections in dev (Next.js hot reload)
 *  by reusing the same instance through globalThis.
 */

import { PrismaClient } from "@prisma/client";

  const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

  export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
      log: ["error", "warn"],
    });

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
