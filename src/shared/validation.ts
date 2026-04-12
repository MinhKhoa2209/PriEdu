import { z } from 'zod';

export const OcrResultSchema = z.object({
  extractedText: z.string().describe('The raw text extracted from the handwritten image.'),
  feedback: z.string().describe('Constructive, encouraging feedback based on correctness and neatness.'),
  correctnessScore: z.number().min(0).max(100).describe('Score for theoretical correctness 0-100.'),
  neatnessScore: z.number().min(0).max(100).describe('Score for handwriting neatness 0-100.')
});

export type OcrResult = z.infer<typeof OcrResultSchema>;
