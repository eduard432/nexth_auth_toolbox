import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'], // puedes eliminar esto en producción si quieres menos logs
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
