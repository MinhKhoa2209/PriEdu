import type { ROLES } from './constants';

export type Role = (typeof ROLES)[keyof typeof ROLES];

export type User = {
  id: string;
  email: string;
  name: string | null;
  role: Role;
};

export type Submission = {
  id: string;
  studentId: string;
  imageUrl: string;
  extractedText: string;
  feedback: string;
  correctnessScore: number;
  neatnessScore: number;
  createdAt: Date;
};
