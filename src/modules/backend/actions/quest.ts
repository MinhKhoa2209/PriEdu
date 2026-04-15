'use server';

import { questService } from '../services/questService';
import { resourceService } from '../services/resourceService';

export async function getQuestsAction(studentLevel: number) {
  try {
    const quests = await questService.getQuestsForStudent(studentLevel);
    
    return {
      success: true,
      data: quests
    };
  } catch (error) {
    console.error('Failed to fetch quests:', error);
    return {
      success: false,
      error: 'Failed to fetch quests'
    };
  }
}

export async function startQuestAction(questId: string, studentId: string) {
  try {
    const quest = await questService.startQuest(questId, studentId);
    
    return {
      success: true,
      data: quest
    };
  } catch (error) {
    console.error('Failed to start quest:', error);
    return {
      success: false,
      error: 'Failed to start quest'
    };
  }
}

export async function getResourcesAction(filter?: { subject?: string; featured?: boolean }) {
  try {
    let resources;
    
    if (filter?.featured) {
      resources = await resourceService.getFeaturedResources();
    } else if (filter?.subject) {
      resources = await resourceService.getResourcesBySubject(filter.subject);
    } else {
      resources = await resourceService.getAllResources();
    }
    
    return {
      success: true,
      data: resources
    };
  } catch (error) {
    console.error('Failed to fetch resources:', error);
    return {
      success: false,
      error: 'Failed to fetch resources'
    };
  }
}

export async function searchResourcesAction(query: string) {
  try {
    const resources = await resourceService.searchResources(query);
    
    return {
      success: true,
      data: resources
    };
  } catch (error) {
    console.error('Failed to search resources:', error);
    return {
      success: false,
      error: 'Failed to search resources'
    };
  }
}
