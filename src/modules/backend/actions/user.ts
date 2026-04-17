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

export async function getModuleProgressAction(userId: string) {
  try {
    const { prisma } = await import('@/lib/prisma');
    
    // Get all knowledge nodes for this user
    const knowledgeNodes = await prisma.knowledgeNode.findMany({
      where: { studentId: userId }
    });
    
    // Group by module (first part of nodeKey, e.g., "math" from "math.fractions.addition")
    const moduleProgress: Record<string, { totalNodes: number; totalMastery: number; lessons: number }> = {};
    
    knowledgeNodes.forEach(node => {
      const module = node.nodeKey.split('.')[0]; // e.g., "math", "science", "english", "history"
      
      if (!moduleProgress[module]) {
        moduleProgress[module] = { totalNodes: 0, totalMastery: 0, lessons: 0 };
      }
      
      moduleProgress[module].totalNodes++;
      moduleProgress[module].totalMastery += node.mastery;
    });
    
    // Calculate average mastery (progress) for each module
    const modules = Object.entries(moduleProgress).map(([moduleId, data]) => ({
      id: moduleId,
      progress: data.totalNodes > 0 ? Math.round((data.totalMastery / data.totalNodes) * 100) : 0,
      lessons: data.totalNodes // Number of topics/lessons tracked
    }));
    
    return {
      success: true,
      data: modules
    };
  } catch (error) {
    console.error('Failed to fetch module progress:', error);
    return {
      success: false,
      error: 'Failed to fetch module progress',
      data: []
    };
  }
}
