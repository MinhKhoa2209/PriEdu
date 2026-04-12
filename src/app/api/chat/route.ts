import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { submissionRepo } from '../../../modules/backend/repository/submissionRepo';
import { SOCRATIC_TUTOR_PROMPT } from '../../../modules/ai/prompts/socratic';

export async function POST(req: Request) {
  try {
    const { messages, submissionId } = await req.json();

    // 1. Fetch context securely on the backend
    let contextPrompt = '';
    if (submissionId) {
      const submission = await submissionRepo.getSubmissionById(submissionId);
      if (submission) {
        contextPrompt = `
Here is the student's submission context for this conversation:
- OCR Extracted Text: "${submission.extractedText}"
- Initial System Feedback: "${submission.feedback}"
- Correctness Score: ${submission.correctnessScore}
Please use this context to guide the student towards finding any mistakes they made in this submission.
`;
      }
    }

    // 2. Generate the Socratic response stream
    const result = await streamText({
      model: google('gemini-2.0-flash'),
      system: `${SOCRATIC_TUTOR_PROMPT}\n${contextPrompt}`,
      messages,
      temperature: 0.7,
    });

    // 3. Return the DataStreamResponse as expected by useChat
    return result.toDataStreamResponse();

  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), { status: 500 });
  }
}
