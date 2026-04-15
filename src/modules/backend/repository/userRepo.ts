import { prisma } from '@/lib/prisma';

export const userRepo = {
  findAll: () => prisma.user.findMany(),
  
  findById: (id: string) => prisma.user.findUnique({
    where: { id },
    include: {
      submissions: {
        orderBy: { createdAt: 'desc' },
        take: 10
      }
    }
  }),
  
  findByEmail: (email: string) => prisma.user.findUnique({
    where: { email }
  }),
  
  getStudentSubmissions: (studentId: string) => prisma.submission.findMany({
    where: { studentId },
    orderBy: { createdAt: 'desc' }
  }),
  
  addXP: async (userId: string, xpGain: number) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    
    const newXP = user.xp + xpGain;
    const newLevel = Math.floor(newXP / 100) + 1; // 100 XP per level
    
    return prisma.user.update({
      where: { id: userId },
      data: {
        xp: newXP,
        level: newLevel
      }
    });
  },
  
  updateStreak: async (userId: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');
    
    return prisma.user.update({
      where: { id: userId },
      data: {
        streak: user.streak + 1
      }
    });
  },
  
  addStars: async (userId: string, starsGain: number) => {
    return prisma.user.update({
      where: { id: userId },
      data: {
        stars: { increment: starsGain }
      }
    });
  }
};

