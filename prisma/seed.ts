import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash password
  const hashedPassword = await bcrypt.hash('password', 10);

  // Create demo student
  const student = await prisma.user.upsert({
    where: { email: 'student@priedu.com' },
    update: {},
    create: {
      email: 'student@priedu.com',
      name: 'Demo Student',
      password: hashedPassword,
      role: 'STUDENT',
      level: 3,
      xp: 250,
      stars: 120,
      streak: 5,
    },
  });

  console.log('✅ Created student:', student.email);

  // Create demo teacher
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@priedu.com' },
    update: {},
    create: {
      email: 'teacher@priedu.com',
      name: 'Ms. Halloway',
      password: hashedPassword,
      role: 'TEACHER',
      level: 1,
      xp: 0,
      stars: 0,
      streak: 1,
    },
  });

  console.log('✅ Created teacher:', teacher.email);

  // Create some sample submissions for the student
  const submission1 = await prisma.submission.create({
    data: {
      studentId: student.id,
      imageUrl: 'https://example.com/homework1.jpg',
      extractedText: 'Sample homework text',
      feedback: 'Great work! Keep it up.',
      correctnessScore: 85,
      neatnessScore: 90,
    },
  });

  const submission2 = await prisma.submission.create({
    data: {
      studentId: student.id,
      imageUrl: 'https://example.com/homework2.jpg',
      extractedText: 'Another homework submission',
      feedback: 'Good effort, but check your calculations.',
      correctnessScore: 72,
      neatnessScore: 80,
    },
  });

  console.log('✅ Created sample submissions');

  // Create knowledge nodes for the student
  await prisma.knowledgeNode.createMany({
    data: [
      {
        studentId: student.id,
        nodeKey: 'math.addition',
        mastery: 0.85,
      },
      {
        studentId: student.id,
        nodeKey: 'math.subtraction',
        mastery: 0.78,
      },
      {
        studentId: student.id,
        nodeKey: 'science.plants',
        mastery: 0.92,
      },
      {
        studentId: student.id,
        nodeKey: 'language.grammar',
        mastery: 0.65,
      },
    ],
  });

  console.log('✅ Created knowledge nodes');

  console.log('🎉 Seeding completed!');
  console.log('\n📝 Demo Credentials:');
  console.log('Student: student@priedu.com / password');
  console.log('Teacher: teacher@priedu.com / password');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
