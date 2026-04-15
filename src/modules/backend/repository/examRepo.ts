import { prisma } from '../../../lib/db';

export const examRepo = {
  /**
   * Save a newly generated exam to the database.
   */
  createExam: async (teacherId: string, title: string, topic: string, gradeLevel: string, questions: any) => {
    return prisma.exam.create({
      data: {
        teacherId,
        title,
        topic,
        gradeLevel,
        questions,
      }
    });
  },

  /**
   * Fetch all exams created by a specific teacher.
   */
  getExamsByTeacherId: async (teacherId: string) => {
    return prisma.exam.findMany({
      where: { teacherId },
      orderBy: { createdAt: 'desc' }
    });
  },

  /**
   * Fetch a specific exam by ID.
   */
  getExamById: async (id: string) => {
    return prisma.exam.findUnique({
      where: { id }
    });
  }
};
