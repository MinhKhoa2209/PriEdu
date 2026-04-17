# Implementation Plan: Student Pages Dynamic Data

## Overview

This implementation transforms student-facing pages from hardcoded data to database-backed content. The approach follows a bottom-up strategy: database schema → service layer → server actions → page components. Each task builds incrementally, ensuring testable progress at every step.

## Tasks

- [-] 1. Update Prisma schema with new models
  - Add Quest, StudentQuest, Resource, Chapter, Lesson, and StudentLesson models to prisma/schema.prisma
  - Define enums: QuestStatus (LOCKED, AVAILABLE, IN_PROGRESS, COMPLETED), ResourceType (VIDEO, ARTICLE, QUIZ, INTERACTIVE), LessonStatus (LOCKED, IN_PROGRESS, COMPLETED)
  - Add indexes for performance: Quest.requiredLevel, Quest.subject, StudentQuest.studentId, Resource.featured, Resource.subject, Lesson.chapterId
  - Add unique constraints: StudentQuest[studentId, questId], StudentLesson[studentId, lessonId]
  - Add relations: User 1-to-many StudentQuest, User 1-to-many StudentLesson, Quest 1-to-many StudentQuest, Chapter 1-to-many Lesson, Lesson 1-to-many StudentLesson
  - Generate Prisma client with `npx prisma generate`
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8_

- [ ] 2. Create database seed script
  - [~] 2.1 Update prisma/seed.ts with Quest seed data
    - Create 4 sample quests with varying difficulty levels (1-3) and subjects (science, math, language)
    - Include all required fields: title, description, subject, difficulty, xpReward, starsReward, requiredLevel
    - Use upsert to prevent duplicates on re-runs
    - _Requirements: 8.1, 8.5, 8.7_
  
  - [~] 2.2 Add Resource seed data to prisma/seed.ts
    - Create 5 sample resources with different types (VIDEO, ARTICLE, QUIZ, INTERACTIVE)
    - Include featured resources (at least 2 with featured: true)
    - Add realistic thumbnailUrl and contentUrl placeholders
    - Include tags array for search functionality
    - _Requirements: 8.2, 8.5, 8.7_
  
  - [~] 2.3 Add Chapter and Lesson seed data to prisma/seed.ts
    - Create 1 sample chapter with proper subject and order
    - Create 4 lessons linked to the chapter with sequential order values (1-4)
    - Establish proper foreign key relationships using chapterId
    - _Requirements: 8.3, 8.4, 8.6, 8.7_

- [ ] 3. Refactor QuestService to use Prisma
  - [~] 3.1 Update getQuestsForStudent method signature and implementation
    - Change signature to accept (studentId: string, studentLevel: number)
    - Replace in-memory quest array with Prisma query joining Quest and StudentQuest tables
    - Implement quest status calculation logic: locked (level < requiredLevel), available (no progress), in_progress, completed
    - Use Prisma select to fetch only required fields for performance
    - Add error handling with try-catch, log errors, return empty array on failure
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 7.1, 7.4, 7.6, 7.7, 12.1_
  
  - [~] 3.2 Update startQuest method to persist to database
    - Create StudentQuest record with status IN_PROGRESS and startedAt timestamp
    - Return updated quest with progress data
    - Add error handling and logging
    - _Requirements: 1.2, 7.1, 7.6_
  
  - [~] 3.3 Update updateQuestProgress method to persist to database
    - Update StudentQuest record with new progress value
    - Auto-complete quest when progress reaches 100 (set status to COMPLETED, add completedAt)
    - Return updated quest with progress data
    - Add error handling and logging
    - _Requirements: 1.2, 7.1, 7.6_

- [ ] 4. Refactor ResourceService to use Prisma
  - [~] 4.1 Update getAllResources method
    - Replace in-memory resource array with Prisma query on Resource table
    - Order by viewCount descending for popularity
    - Use Prisma select for required fields only
    - Add error handling with try-catch, return empty array on failure
    - _Requirements: 2.1, 2.2, 2.6, 7.2, 7.5, 7.6, 12.1_
  
  - [~] 4.2 Update getFeaturedResources method
    - Query Resource table with where: { featured: true }
    - Order by viewCount descending
    - Add error handling
    - _Requirements: 2.1, 2.5, 7.2, 7.6_
  
  - [~] 4.3 Update getResourcesBySubject method
    - Query Resource table with where: { subject: subject }
    - Order by viewCount descending
    - Add error handling
    - _Requirements: 2.1, 2.3, 7.2, 7.6_
  
  - [~] 4.4 Add searchResources method
    - Implement Prisma query with OR conditions on title, description, subject, tags fields
    - Use case-insensitive search with contains operator
    - Return matching resources ordered by relevance (viewCount)
    - Add error handling
    - _Requirements: 2.1, 2.4, 7.2, 7.6_
  
  - [~] 4.5 Add incrementViewCount method
    - Update Resource record to increment viewCount by 1
    - Use Prisma increment operation for atomic update
    - Add error handling
    - _Requirements: 2.1, 7.2, 7.6_

- [ ] 5. Create LessonService
  - [~] 5.1 Create src/modules/backend/services/lessonService.ts
    - Define ChapterData and LessonWithStatus interfaces matching design
    - Implement getChapter method to fetch chapter by ID from database
    - Implement getCurrentChapterForStudent method (returns first chapter for MVP)
    - Add error handling for all methods
    - _Requirements: 3.1, 3.4, 7.3, 7.6_
  
  - [~] 5.2 Implement getLessonsForChapter method
    - Query Lesson table with where: { chapterId }
    - Join with StudentLesson to get student progress
    - Order by lesson.order ascending
    - Calculate lesson status: locked (previous not completed), in_progress (started), completed
    - Return lessons with status field
    - Add error handling
    - _Requirements: 3.2, 3.3, 3.5, 3.6, 7.3, 7.6_
  
  - [~] 5.3 Implement completeLesson method
    - Create or update StudentLesson record with status COMPLETED and completedAt timestamp
    - Unlock next lesson in sequence (update next lesson's StudentLesson to IN_PROGRESS if exists)
    - Add error handling
    - _Requirements: 3.3, 3.7, 7.3, 7.6_

- [ ] 6. Update server actions in quest.ts
  - [~] 6.1 Update getQuestsAction signature and implementation
    - Change signature to accept (studentId: string, studentLevel: number)
    - Add authentication check using getServerSession
    - Verify studentId matches session user ID
    - Call questService.getQuestsForStudent with new signature
    - Return ActionResult<QuestWithProgress[]> format
    - Add error handling, return { success: false, error: message, data: [] } on failure
    - _Requirements: 1.3, 7.4, 9.1_
  
  - [~] 6.2 Update startQuestAction to use refactored service
    - Add authentication and authorization checks
    - Call questService.startQuest
    - Return ActionResult format
    - Add error handling
    - _Requirements: 7.1, 7.6_
  
  - [~] 6.3 Update getResourcesAction to use refactored service
    - Call resourceService methods based on filter parameter
    - Support featured and subject filters
    - Return ActionResult<ResourceData[]> format
    - Add error handling
    - _Requirements: 2.2, 2.3, 2.5, 7.5, 10.2, 10.3_
  
  - [~] 6.4 Update searchResourcesAction to use new service method
    - Call resourceService.searchResources
    - Return ActionResult format
    - Add error handling
    - _Requirements: 2.4, 7.5_

- [ ] 7. Create lesson server actions
  - [~] 7.1 Create src/modules/backend/actions/lesson.ts file
    - Define ActionResult type if not already exported from common location
    - Add authentication helper or import from existing location
    - _Requirements: 3.4, 3.5, 7.3_
  
  - [~] 7.2 Implement getChapterAction
    - Accept chapterId parameter
    - Add authentication check
    - Call lessonService.getChapter
    - Return ActionResult<ChapterData> format
    - Add error handling, return { success: false, error: message } on failure
    - _Requirements: 3.4, 7.3, 7.6, 11.1_
  
  - [~] 7.3 Implement getLessonsAction
    - Accept chapterId and studentId parameters
    - Add authentication check, verify studentId matches session
    - Call lessonService.getLessonsForChapter
    - Return ActionResult<LessonWithStatus[]> format
    - Add error handling
    - _Requirements: 3.5, 3.6, 7.3, 7.6, 11.2_
  
  - [~] 7.4 Implement completeLessonAction
    - Accept lessonId and studentId parameters
    - Add authentication and authorization checks
    - Call lessonService.completeLesson
    - Return ActionResult<void> format
    - Add error handling
    - _Requirements: 3.7, 7.3, 7.6_

- [ ] 8. Add weekly progress calculation to user actions
  - [~] 8.1 Implement getWeeklyProgressAction in src/modules/backend/actions/user.ts
    - Accept studentId parameter
    - Add authentication check, verify studentId matches session
    - Query StudentLesson for completed lessons in past 7 days
    - Query StudentQuest for quest progress in past 7 days
    - Query ChatSession for sessions in past 7 days
    - Calculate weighted progress: 50% lessons, 30% quests, 20% chat sessions
    - Return ActionResult<{ progress: number }> format
    - Add error handling
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 7.6_
  
  - [~] 8.2 Implement caching for weekly progress
    - Use Next.js unstable_cache with 1-hour revalidation
    - Create cache key using studentId
    - Add cache tags for invalidation on activity updates
    - _Requirements: 4.6, 12.3, 12.7_

- [~] 9. Checkpoint - Run seed script and verify database
  - Run `npx prisma migrate dev --name add_quest_resource_lesson_models` to create migration
  - Run `npx prisma db seed` to populate database with seed data
  - Verify Quest, Resource, Chapter, Lesson tables contain seed data
  - Test service methods directly to ensure database queries work
  - Ensure all tests pass, ask the user if questions arise

- [ ] 10. Update Adventure page to use database actions
  - [~] 10.1 Update src/app/student/adventure/page.tsx to fetch from database
    - Get user session to extract userId and level
    - Call getQuestsAction(userId, userLevel) instead of old signature
    - Handle ActionResult response format, extract data on success
    - Pass quests data to existing components
    - _Requirements: 9.1, 9.2, 9.3, 9.4_
  
  - [~] 10.2 Add empty state handling to Adventure page
    - Check if quests array is empty
    - Render EmptyState component with icon "explore", title "No quests available yet", description "Check back soon for new adventures!"
    - Create EmptyState component in src/shared/components/ui if it doesn't exist
    - _Requirements: 5.1, 5.4, 5.6, 9.5_
  
  - [~] 10.3 Update weekly progress display on Adventure page
    - Call getWeeklyProgressAction(userId)
    - Display progress percentage in dashboard stats
    - Handle empty progress (show 0%)
    - _Requirements: 4.3, 9.7_
  
  - [~] 10.4 Update quest icons based on subject field
    - Map subject values to appropriate Material Icons
    - Display icons from database subject field instead of hardcoded values
    - _Requirements: 9.6_

- [ ] 11. Update Library page to use database actions
  - [~] 11.1 Update src/app/student/library/page.tsx to fetch from database
    - Call getResourcesAction() to fetch all resources
    - Handle ActionResult response format
    - Pass resources data to existing components
    - _Requirements: 10.1, 10.2_
  
  - [~] 11.2 Add featured resources section
    - Call getResourcesAction({ featured: true }) for featured section
    - Display featured resources prominently at top of page
    - Show viewCount for each resource
    - _Requirements: 10.3, 10.4_
  
  - [~] 11.3 Add subject filtering functionality
    - Add subject filter UI (dropdown or tabs)
    - Call getResourcesAction({ subject: selectedSubject }) when filter changes
    - Update displayed resources based on filter
    - _Requirements: 10.6_
  
  - [~] 11.4 Add empty state handling to Library page
    - Check if resources array is empty
    - Render EmptyState component with icon "library_books", title "No learning resources available", description "New materials are being added regularly"
    - _Requirements: 5.2, 5.4, 5.6, 10.5_
  
  - [~] 11.5 Update resource type icons
    - Map ResourceType enum values to appropriate icons
    - Display icons from database type field
    - _Requirements: 10.7_

- [ ] 12. Update Chat page to use database actions
  - [~] 12.1 Update src/app/student/chat/page.tsx to fetch chapter and lessons
    - Get user session to extract userId
    - Call getChapterAction with hardcoded first chapter ID for MVP
    - Call getLessonsAction(chapterId, userId) to fetch lessons with status
    - Handle ActionResult response formats
    - _Requirements: 11.1, 11.2_
  
  - [~] 12.2 Update sidebar to display chapter and lesson data
    - Display chapter title and description from database
    - Display lessons ordered by order field
    - Show lesson status icons (locked, in_progress, completed) based on StudentLesson data
    - _Requirements: 11.3, 11.4, 11.5_
  
  - [~] 12.3 Add empty state handling to Chat page
    - Check if lessons array is empty
    - Render EmptyState component with icon "auto_stories", title "No lessons in this chapter", description "This chapter is being prepared"
    - _Requirements: 5.3, 5.4, 5.6, 11.6_
  
  - [~] 12.4 Update weekly progress display on Chat page
    - Call getWeeklyProgressAction(userId)
    - Display progress in sidebar or header
    - _Requirements: 4.3, 11.7_

- [ ] 13. Add performance optimizations
  - [~] 13.1 Add database indexes via Prisma migration
    - Verify indexes exist on Quest.requiredLevel, Quest.subject, StudentQuest.studentId, Resource.featured, Resource.subject, Lesson.chapterId
    - Run migration if indexes are missing
    - _Requirements: 12.5_
  
  - [~] 13.2 Implement query result caching in services
    - Add Next.js unstable_cache to questService.getQuestsForStudent with 5-minute revalidation
    - Add caching to resourceService.getAllResources with 5-minute revalidation
    - Add caching to lessonService.getChapter with 5-minute revalidation
    - Use appropriate cache keys and tags for invalidation
    - _Requirements: 12.3, 12.7_
  
  - [~] 13.3 Implement parallel query execution
    - Update page components to use Promise.all for independent queries (quests + progress, resources + featured, chapter + lessons + progress)
    - Ensure queries without dependencies execute in parallel
    - _Requirements: 12.6_
  
  - [~] 13.4 Add pagination to resource queries
    - Update resourceService.getAllResources to accept page and limit parameters
    - Implement skip/take logic in Prisma query
    - Return pagination metadata (total, totalPages, currentPage)
    - Update Library page to handle paginated results
    - _Requirements: 12.2_

- [~] 14. Final checkpoint - End-to-end testing
  - Test Adventure page: verify quests display, status calculation, empty state
  - Test Library page: verify resources display, featured section, filtering, empty state
  - Test Chat page: verify chapter/lesson display, status icons, empty state
  - Test weekly progress calculation across all pages
  - Verify database queries are performant (check logs for slow queries)
  - Ensure all tests pass, ask the user if questions arise

## Notes

- All database queries use Prisma for type safety and SQL injection prevention
- Empty states provide clear user guidance when no data exists
- Caching strategy balances freshness with performance (5-minute for static data, 1-hour for user progress)
- Authentication checks in all server actions prevent unauthorized access
- Error handling ensures graceful degradation (empty arrays on failure)
- Incremental approach allows testing at each layer before moving to the next
