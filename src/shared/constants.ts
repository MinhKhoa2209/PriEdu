/**
 * Application-wide shared constants.
 * Import from '@/shared/constants' everywhere to avoid magic strings.
 */

export const ROLES = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  ADMIN: 'ADMIN',
} as const;

export const ROUTES = {
  HOME: '/',
  STUDENT_DASHBOARD: '/dashboard',
  TEACHER_DASHBOARD: '/teacher/dashboard',
  LOGIN: '/login',
} as const;

export const AI_MODEL = 'gemini-2.0-flash' as const;

export const SCORE_THRESHOLDS = {
  PASSING: 6,
  EXCELLENT: 9,
} as const;
