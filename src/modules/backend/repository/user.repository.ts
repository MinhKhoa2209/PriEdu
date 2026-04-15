import { Prisma, User } from "@prisma/client";
import { BaseRepository } from "./base.repository";
import { prisma } from "@/lib/prisma";

export class UserRepository extends BaseRepository<User, Prisma.UserCreateInput, Prisma.UserUpdateInput> {
  constructor() {
    super("User");
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async addXP(userId: string, xpPoints: number): Promise<User> {
    const user = await this.findById(userId);
    if (!user) throw new Error("User not found");

    const newXP = user.xp + xpPoints;
    let newLevel = user.level;

    // Simple level up logic: 100 XP per level
    if (newXP >= user.level * 100) {
      newLevel += 1;
    }

    return this.update(userId, {
      xp: newXP,
      level: newLevel,
    });
  }
}

export const userRepository = new UserRepository();
