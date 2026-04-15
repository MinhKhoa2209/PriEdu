import { prisma } from '../../../lib/db';
import type { OcrResult } from '../../../shared/validation';

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

  findById: async (id: string) => {
    return prisma.submission.findUnique({
      where: { id },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
  },

  findByStudentId: async (studentId: string) => {
    return prisma.submission.findMany({
      where: { studentId },
      orderBy: { createdAt: 'desc' }
    });
  },

  findPending: async () => {
    return prisma.submission.findMany({
      where: {
        feedback: {
          contains: 'AI-generated' // Pending teacher review
        }
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  },

  update: async (id: string, data: { feedback?: string }) => {
    return prisma.submission.update({
      where: { id },
      data
    });
  }
};

