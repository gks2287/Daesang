import { PrismaClient } from '@prisma/client';

// 개발 환경의 HMR로 PrismaClient가 중복 생성되는 것을 방지하기 위한 전역 싱글톤.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
