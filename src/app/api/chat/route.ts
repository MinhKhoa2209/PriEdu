import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { SOCRATIC_TUTOR_PROMPT } from "@/modules/ai/prompts";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google("gemini-2.0-flash-exp"),
    system: SOCRATIC_TUTOR_PROMPT,
    messages,
    temperature: 0.7,
  });

  return result.toDataStreamResponse();
}
