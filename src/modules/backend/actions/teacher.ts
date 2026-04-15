'use server';

import { analyticsService } from '../services/analyticsService';
import { submissionService } from '../services/submissionService';

export async function getClassProgressAction(teacherId: string) {
  try {
    const progress = await analyticsService.getClassProgress(teacherId);
    
    return {
      success: true,
      data: progress
    };
  } catch (error) {
    console.error('Failed to fetch class progress:', error);
    return {
      success: false,
      error: 'Failed to fetch class progress'
    };
  }
}

export async function getStudentAlertsAction() {
  try {
    const alerts = await analyticsService.getStudentAlerts();
    
    return {
      success: true,
      data: alerts
    };
  } catch (error) {
    console.error('Failed to fetch student alerts:', error);
    return {
      success: false,
      error: 'Failed to fetch alerts'
    };
  }
}

export async function getClassMasteryAction() {
  try {
    const mastery = await analyticsService.getClassMasteryBySubject();
    
    return {
      success: true,
      data: mastery
    };
  } catch (error) {
    console.error('Failed to fetch class mastery:', error);
    return {
      success: false,
      error: 'Failed to fetch mastery data'
    };
  }
}

export async function getPendingSubmissionsAction() {
  try {
    const submissions = await submissionService.getPendingSubmissions();
    
    return {
      success: true,
      data: submissions
    };
  } catch (error) {
    console.error('Failed to fetch pending submissions:', error);
    return {
      success: false,
      error: 'Failed to fetch submissions'
    };
  }
}

export async function gradeSubmissionAction(
  submissionId: string,
  feedback: string,
  approved: boolean
) {
  try {
    const submission = await submissionService.gradeSubmission(
      submissionId,
      feedback,
      approved
    );
    
    return {
      success: true,
      data: submission
    };
  } catch (error) {
    console.error('Failed to grade submission:', error);
    return {
      success: false,
      error: 'Failed to grade submission'
    };
  }
}
