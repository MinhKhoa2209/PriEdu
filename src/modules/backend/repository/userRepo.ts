import { prisma } from '@/lib/prisma';


// Complex DB queries here
export const userRepo = {
  findAll: () => prisma.user.findMany(),
};
