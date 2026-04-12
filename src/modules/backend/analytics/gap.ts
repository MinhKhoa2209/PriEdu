import { prisma } from '../../../lib/db';

/**
 * Analytics Engine — Knowledge Gap Calculator
 * Analyzes student submission history to identify weak areas.
 * This data powers the Teacher Dashboard heatmap.
 */
export const analyticsEngine = {
  /**
   * Get average correctness score per student.
   * Used to calculate Knowledge Gap heatmaps.
   */
  getStudentScoreSummary: async (studentId: string) => {
    const submissions = await prisma.submission.findMany({
      where: { studentId },
      select: { correctnessScore: true, neatnessScore: true, createdAt: true },
      orderBy: { createdAt: 'asc' },
    });

    if (submissions.length === 0) return null;

    const avgCorrectness =
      submissions.reduce((acc, s) => acc + s.correctnessScore, 0) / submissions.length;

    const avgNeatness =
      submissions.reduce((acc, s) => acc + s.neatnessScore, 0) / submissions.length;

    return {
      studentId,
      totalSubmissions: submissions.length,
      avgCorrectness: Math.round(avgCorrectness * 10) / 10,
      avgNeatness: Math.round(avgNeatness * 10) / 10,
    };
  },
};
