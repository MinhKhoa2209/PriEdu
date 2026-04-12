import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Complex DB queries here
export const userRepo = {
  findAll: () => prisma.user.findMany(),
};
