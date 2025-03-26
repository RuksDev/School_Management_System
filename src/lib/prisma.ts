// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Avoid multiple instances in development (hot reload handling)
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Use globalThis to avoid multiple instances in dev (Next.js hot reload)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma; 