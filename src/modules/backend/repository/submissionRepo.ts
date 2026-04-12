import { PrismaClient } from '@prisma/client';
import type { OcrResult } from '../../../shared/validation';

const prisma = new PrismaClient();

export const submissionRepo = {
  saveSubmission: async (studentId: string, imageUrl: string, ocrData: OcrResult) => {
    return prisma.submission.create({
      data: {
        studentId,
        imageUrl,
        extractedText: ocrData.extractedText,
        feedback: ocrData.feedback,
        correctnessScore: ocrData.correctnessScore,
        neatnessScore: ocrData.neatnessScore,
      }
    });
  },

  getSubmissionById: async (id: string) => {
    return prisma.submission.findUnique({
      where: { id }
    });
  },

  getSubmissionsByStudentId: async (studentId: string) => {
    return prisma.submission.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' }
    });
  }
};
