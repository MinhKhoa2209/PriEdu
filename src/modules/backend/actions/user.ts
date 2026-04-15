'use server';

import { userRepo } from '../repository/userRepo';

export async function getUserStatsAction(userId: string) {
  try {
    const user = await userRepo.findById(userId);
    
    if (!user) {
      return {
        success: false,
        error: 'User not found'
      };
    }

    return {
      success: true,
      data: {
        name: user.name,
        level: user.level,
        xp: user.xp,
        stars: user.stars,
        streak: user.streak,
        role: user.role
      }
    };
  } catch (error) {
    console.error('Failed to fetch user stats:', error);
    return {
      success: false,
      error: 'Failed to fetch user statistics'
    };
  }
}

export async function getStudentSubmissionsAction(studentId: string) {
  try {
    const submissions = await userRepo.getStudentSubmissions(studentId);
    
    return {
      success: true,
      data: submissions
    };
  } catch (error) {
    console.error('Failed to fetch submissions:', error);
    return {
      success: false,
      error: 'Failed to fetch submissions'
    };
  }
}

export async function updateUserXPAction(userId: string, xpGain: number) {
  try {
    const updatedUser = await userRepo.addXP(userId, xpGain);
    
    return {
      success: true,
      data: {
        level: updatedUser.level,
        xp: updatedUser.xp
      }
    };
  } catch (error) {
    console.error('Failed to update XP:', error);
    return {
      success: false,
      error: 'Failed to update experience points'
    };
  }
}
