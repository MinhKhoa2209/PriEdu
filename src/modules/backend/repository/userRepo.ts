import { prisma } from '../../../lib/db';


// Complex DB queries here
export const userRepo = {
  findAll: () => prisma.user.findMany(),
};
