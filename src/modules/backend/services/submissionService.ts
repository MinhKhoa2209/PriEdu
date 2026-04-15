import { submissionRepo } from '../repository/submissionRepo';
import { userRepo } from '../repository/userRepo';

export class SubmissionService {
  async gradeSubmission(submissionId: string, teacherFeedback: string, approved: boolean) {
    const submission = await submissionRepo.findById(submissionId);
    if (!submission) throw new Error('Submission not found');

    // Award XP and stars if approved
    if (approved && submission.correctnessScore >= 70) {
      const xpGain = Math.floor(submission.correctnessScore);
      const starsGain = Math.floor(submission.correctnessScore / 10);
      
      await userRepo.addXP(submission.studentId, xpGain);
      await userRepo.addStars(submission.studentId, starsGain);
    }

    return submissionRepo.update(submissionId, {
      feedback: teacherFeedback,
    });
  }

  async getSubmissionsByStudent(studentId: string) {
    return submissionRepo.findByStudentId(studentId);
  }

  async getPendingSubmissions() {
    return submissionRepo.findPending();
  }

  async getSubmissionStats(studentId: string) {
    const submissions = await submissionRepo.findByStudentId(studentId);
    
    const totalSubmissions = submissions.length;
    const avgCorrectness = submissions.reduce((sum, s) => sum + s.correctnessScore, 0) / totalSubmissions || 0;
    const avgNeatness = submissions.reduce((sum, s) => sum + s.neatnessScore, 0) / totalSubmissions || 0;
    
    return {
      totalSubmissions,
      avgCorrectness,
      avgNeatness,
      recentSubmissions: submissions.slice(0, 5)
    };
  }
}

export const submissionService = new SubmissionService();
