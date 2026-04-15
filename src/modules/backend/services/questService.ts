// Quest/Adventure system service
// This will manage the gamified learning journey

export type QuestStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export interface Quest {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: number;
  xpReward: number;
  starsReward: number;
  status: QuestStatus;
  progress: number;
  requiredLevel: number;
}

export class QuestService {
  // Hardcoded quests for now - will move to DB later
  private quests: Quest[] = [
    {
      id: 'quest-1',
      title: 'Science Springs Explorer',
      description: 'Master the basics of scientific method',
      subject: 'science',
      difficulty: 1,
      xpReward: 100,
      starsReward: 10,
      status: 'available',
      progress: 0,
      requiredLevel: 1
    },
    {
      id: 'quest-2',
      title: 'Math Mountains Climber',
      description: 'Conquer addition and subtraction',
      subject: 'math',
      difficulty: 1,
      xpReward: 120,
      starsReward: 12,
      status: 'available',
      progress: 0,
      requiredLevel: 1
    },
    {
      id: 'quest-3',
      title: 'Grammar Forest Guide',
      description: 'Navigate through parts of speech',
      subject: 'language',
      difficulty: 2,
      xpReward: 150,
      starsReward: 15,
      status: 'locked',
      progress: 0,
      requiredLevel: 3
    },
    {
      id: 'quest-4',
      title: 'History Harbor Sailor',
      description: 'Sail through ancient civilizations',
      subject: 'history',
      difficulty: 2,
      xpReward: 180,
      starsReward: 18,
      status: 'locked',
      progress: 0,
      requiredLevel: 5
    }
  ];

  async getQuestsForStudent(studentLevel: number) {
    return this.quests.map(quest => ({
      ...quest,
      status: quest.requiredLevel <= studentLevel 
        ? (quest.status === 'locked' ? 'available' : quest.status)
        : 'locked'
    }));
  }

  async startQuest(questId: string, studentId: string) {
    const quest = this.quests.find(q => q.id === questId);
    if (!quest) throw new Error('Quest not found');
    
    // In real implementation, save to DB
    return {
      ...quest,
      status: 'in_progress' as QuestStatus,
      startedAt: new Date()
    };
  }

  async updateQuestProgress(questId: string, studentId: string, progress: number) {
    const quest = this.quests.find(q => q.id === questId);
    if (!quest) throw new Error('Quest not found');
    
    return {
      ...quest,
      progress,
      status: progress >= 100 ? 'completed' as QuestStatus : 'in_progress' as QuestStatus
    };
  }
}

export const questService = new QuestService();
