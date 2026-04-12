'use server';

import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { OcrResultSchema } from '../../../shared/validation';
import { VISION_OCR_PROMPT } from '../../ai/prompts/image-ocr';
import { submissionRepo } from '../repository/submissionRepo';

/**
 * Server Action: Process a student's homework image
 * Expects a Cloudinary URL (or valid public image URL) and the student ID.
 */
export async function processHomeworkVisionAction(imageUrl: string, studentId: string) {
  try {
    // Use Vercel AI SDK's generateObject to get structured structured JSON back 
    // from Gemini 2.0 Flash matching our Zod schema.
    const { object } = await generateObject({
      model: google('gemini-2.0-flash'),
      schema: OcrResultSchema,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: VISION_OCR_PROMPT },
            { type: 'image', image: new URL(imageUrl) } 
          ]
        }
      ]
    });

    // Enforce Repository Pattern: Store the results into the DB
    const savedSubmission = await submissionRepo.saveSubmission(studentId, imageUrl, object);

    return { 
      success: true, 
      data: savedSubmission 
    };

  } catch (error) {
    console.error('Vision Specialist Action Failed:', error);
    return { 
      success: false, 
      error: 'Failed to process the handwriting image. Please try again.' 
    };
  }
}
