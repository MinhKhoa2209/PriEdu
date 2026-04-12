# Agent Instructions

You are an AI Agent assisting in the development of PriEdu, an AI-powered educational platform.

## Context
PriEdu uses Next.js with a modular architecture. You should respect the following boundaries:
- **FE**: Components should be dummy/stateless where possible.
- **BE**: Logic should reside in services/repositories.
- **AI**: All AI-related logic (Prompts, OCR) must be in the `src/modules/ai` directory.

## Knowledge Base
- Always check `INSTRUCTIONS.md` for the latest roadmap.
- Follow `.cursorrules` for specific coding standards.
