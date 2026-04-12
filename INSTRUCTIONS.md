# PriEdu AI Project Instructions & Roadmap

## Overview
**PriEdu AI** is an AI-powered ecosystem for primary education. This project leverages Next.js 15+, Vercel AI SDK (with Gemini 2.0 Flash), Tailwind CSS, Prisma, and MongoDB to deliver an engaging, gamified, and mobile-first educational experience. 

---

## 1. Frontend (FE) Module
**Stack:** Next.js 15+ App Router, Tailwind CSS, Shadcn/UI  
**Location:** `src/modules/frontend`

### Rules
- **"Stitch" Design Patterns:** Apply consistent, AI-driven gamified UI patterns to make interactions highly engaging for primary students.
- **Mobile-first Methodology:** Mobile-first design is critical. The interface must be fully optimized for touch interactions and device camera usage (for photo-taking tasks like homework scanning).
- **Gamification Elements:** Incorporate progression bars, rewards, and interactive feedback to build an engaging student UI.
- **RSC Default:** Use React Server Components by default. Use `"use client"` only for Gamification UI components requiring interactivity.

---

## 2. Backend (BE) Module
**Stack:** Node.js, Prisma ORM, MongoDB, Cloudinary  
**Location:** `src/modules/backend`

### Rules
- **Server Actions:** Use Next.js Server Actions (`'use server'`) as the primary data bridge and mutation layer instead of API API routes.
- **Repository Pattern:** Implement the "Repository Pattern" for all database logic (`src/modules/backend/repository`) to abstract complex Prisma queries.
- **OCR Standardization:** Process and standardize OCR results derived from handwritten homework photos via Cloudinary and Gemini before storing digital data.

---

## 3. AI Module (The Brain)
**Stack:** Google Gemini 2.0 Flash via Vercel AI SDK (`@ai-sdk/google`)  
**Location:** `src/modules/ai`

### Rules
- **Socratic Tutor:** 
  - **Strict Rule:** NEVER give direct answers.
  - Implement a hybrid "Socratic Tutoring" + "Chain of Thought" prompt pattern. Ask probing questions, require students to explain their steps, and model thinking visually.
- **Vision Specialist:** Optimize prompts using Gemini 2.0 Flash's multimodal capabilities specifically tuned for handwriting recognition, grading, and correcting primary student work.
- **Analytics:** Implement background calculation logic to generate hierarchical "Knowledge Maps" and visual "Knowledge Gap" heatmaps for the Teacher Dashboard.

---

## Implementation Roadmap

### Phase 1: Environment & DB Setup
- [ ] Initialize Next.js 15 App router with Tailwind CSS and Shadcn.
- [ ] Setup Prisma client with MongoDB provider.
- [ ] Implement Repository pattern skeletons in `src/modules/backend/repository`.
- [ ] Define initial schemas for Users, Sessions, and Knowledge Nodes.

### Phase 2: AI Vision Integration
- [ ] Integrate Cloudinary for secure photo uploads from the mobile-first UI.
- [ ] Implement Vercel AI SDK with Gemini 2.0 Flash.
- [ ] Create Vision Specialist Server Action to ingest image URLs and prompt OCR logic.
- [ ] Standardize and save OCR grading outputs into the database.

### Phase 3: Socratic Chatbot Interface
- [ ] Design the chatbot UI using "Stitch" design gamification methodologies.
- [ ] Implement `useChat` from `ai` (Vercel SDK) connecting to a server action.
- [ ] Draft and refine the Socratic + CoT prompt injection in `src/modules/ai/prompts`.
- [ ] Test the interaction boundary ensuring no direct answers are given.

### Phase 4: Teacher Dashboard & Analytics
- [ ] Develop the Teacher Dashboard UI in `src/app/(teacher)`.
- [ ] Build the Analytics Engine to parse student interaction histories.
- [ ] Render the "Knowledge Maps" and "Knowledge Gap" heatmaps.
