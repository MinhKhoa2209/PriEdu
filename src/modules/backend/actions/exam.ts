'use server';

import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { EXAM_GENERATOR_PROMPT } from '../../ai/prompts/exam';
import { examRepo } from '../repository/examRepo';

// Define the required structured JSON output schema
const ExamSchema = z.object({
  examTitle: z.string().describe('A catchy, child-friendly title for the exam.'),
  questions: z.array(z.object({
    type: z.enum(['MULTIPLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER']).describe('The format of the question.'),
    questionText: z.string().describe('The actual question, using age-appropriate vocabulary.'),
    options: z.array(z.string()).optional().describe('4 plausible options if MULTIPLE_CHOICE, or 2 if TRUE_FALSE. Skip if SHORT_ANSWER.'),
    correctAnswer: z.string().describe('The correct answer. Must match one of the options verbatim if applicable.'),
    bloomsTaxonomyLevel: z.enum(['Remembering', 'Understanding', 'Applying', 'Analyzing']).describe('The cognitive level of this question.'),
    explanation: z.string().describe('A simple, pedagogical explanation of WHY this is the correct answer.')
  })).describe('An array of generated questions matching the criteria.')
});

export async function generateExamAction(
  topic: string, 
  gradeLevel: string, 
  numberOfQuestions: number,
  teacherId: string // The authenticated teacher requesting the exam
) {
  try {
    const { object } = await generateObject({
      model: google('gemini-2.0-flash'),
      system: EXAM_GENERATOR_PROMPT,
      schema: ExamSchema,
      prompt: `Generate a highly engaging exam with ${numberOfQuestions} questions about "${topic}" suitable for ${gradeLevel} students.`
    });

    // Save the generated structured schema into our MongoDB via the Repository pattern
    const savedExam = await examRepo.createExam(
      teacherId,
      object.examTitle,
      topic,
      gradeLevel,
      object.questions // Prisma Json field
    );

    return {
      success: true,
      data: savedExam
    };

  } catch (error) {
    console.error('Exam Generation failed:', error);
    return {
      success: false,
      error: 'Failed to generate the exam. Please refine the topic or try again later.'
    };
  }
}
