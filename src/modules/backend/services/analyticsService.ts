import { prisma } from '@/lib/prisma';

export class AnalyticsService {
  async getClassProgress(teacherId: string) {
    // Get all students and their submissions
    const students = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      include: {
        submissions: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });

    const totalStudents = students.length;
    const avgLevel = students.reduce((sum, s) => sum + s.level, 0) / totalStudents || 0;
    const avgXP = students.reduce((sum, s) => sum + s.xp, 0) / totalStudents || 0;

    return {
      totalStudents,
      avgLevel: Math.round(avgLevel),
      avgXP: Math.round(avgXP),
      students: students.map(s => ({
        id: s.id,
        name: s.name,
        level: s.level,
        xp: s.xp,
        stars: s.stars,
        recentScore: s.submissions[0]?.correctnessScore || 0
      }))
    };
  }

  async getWeakAreas(studentId: string) {
    const knowledgeNodes = await prisma.knowledgeNode.findMany({
      where: { studentId },
      orderBy: { mastery: 'asc' },
      take: 5
    });

    return knowledgeNodes.map(node => ({
      topic: node.nodeKey,
      mastery: node.mastery,
      lastTested: node.lastTested
    }));
  }

  async getStudentAlerts() {
    // Find students with declining performance
    const students = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      include: {
        submissions: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    });

    const alerts = [];
    for (const student of students) {
      if (student.submissions.length >= 3) {
        const recent = student.submissions.slice(0, 3);
        const avgRecent = recent.reduce((sum, s) => sum + s.correctnessScore, 0) / 3;
        
        if (avgRecent < 60) {
          alerts.push({
            studentId: student.id,
            studentName: student.name,
            type: 'LOW_PERFORMANCE',
            message: `Average score dropped to ${avgRecent.toFixed(0)}%`,
            severity: 'high'
          });
        }
      }

      if (student.streak < 2) {
        alerts.push({
          studentId: student.id,
          studentName: student.name,
          type: 'LOW_ENGAGEMENT',
          message: 'Streak below 2 days',
          severity: 'medium'
        });
      }
    }

    return alerts;
  }

  async getClassMasteryBySubject() {
    const knowledgeNodes = await prisma.knowledgeNode.findMany();
    
    const subjectMap = new Map<string, { total: number; sum: number }>();
    
    knowledgeNodes.forEach(node => {
      const subject = node.nodeKey.split('.')[0]; // e.g., "math.fractions" -> "math"
      const current = subjectMap.get(subject) || { total: 0, sum: 0 };
      subjectMap.set(subject, {
        total: current.total + 1,
        sum: current.sum + node.mastery
      });
    });

    return Array.from(subjectMap.entries()).map(([subject, data]) => ({
      subject,
      mastery: (data.sum / data.total) * 100
    }));
  }
}

export const analyticsService = new AnalyticsService();
