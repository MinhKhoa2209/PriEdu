# Requirements Document

## Introduction

This feature replaces hardcoded data in student pages (Adventure, Library, Chat) with dynamic data fetched from the database. Currently, these pages display static information including quest data, learning resources, lesson information, and progress metrics. This creates a poor user experience as data cannot be personalized or updated without code changes. The system will migrate from in-memory service data to persistent database storage using Prisma with MongoDB, enabling dynamic content management and personalized student experiences.

## Glossary

- **Quest_System**: The gamified learning journey component that manages student quests and adventures
- **Resource_Library**: The catalog of learning materials including videos, articles, quizzes, and interactive content
- **Chat_Interface**: The Socratic AI tutor interface where students interact with learning content
- **Database**: MongoDB database accessed through Prisma ORM
- **Student_Progress**: Metrics tracking student advancement including XP, level, weekly progress, and quest completion
- **Lesson_Sequence**: Ordered collection of lessons within a chapter or learning path
- **Empty_State**: UI displayed when no data exists, prompting user action
- **Quest_Status**: State of a quest (locked, available, in_progress, completed)
- **Resource_Type**: Category of learning material (video, article, quiz, interactive)
- **Chapter**: A collection of related lessons in a learning path

## Requirements

### Requirement 1: Quest Data Persistence

**User Story:** As a student, I want my quest progress to be saved in the database, so that I can continue my learning journey across sessions.

#### Acceptance Criteria

1. THE Quest_System SHALL store quest definitions in the Database with fields: id, title, description, subject, difficulty, xpReward, starsReward, requiredLevel, createdAt, updatedAt
2. THE Quest_System SHALL store student quest progress in the Database with fields: studentId, questId, status, progress, startedAt, completedAt
3. WHEN a student views the Adventure page, THE Quest_System SHALL fetch all quests from the Database
4. WHEN a student views the Adventure page, THE Quest_System SHALL fetch the student's quest progress from the Database
5. THE Quest_System SHALL join quest definitions with student progress to determine Quest_Status for each quest
6. WHEN a student's level is below a quest's requiredLevel, THE Quest_System SHALL set Quest_Status to locked
7. WHEN no quest progress exists for a student, THE Quest_System SHALL return default Quest_Status of available for unlocked quests

### Requirement 2: Learning Resource Persistence

**User Story:** As a student, I want to access a dynamic library of learning resources, so that I can explore materials relevant to my learning needs.

#### Acceptance Criteria

1. THE Resource_Library SHALL store resource definitions in the Database with fields: id, title, description, type, subject, difficulty, duration, thumbnailUrl, contentUrl, featured, viewCount, tags, createdAt, updatedAt
2. WHEN a student views the Library page, THE Resource_Library SHALL fetch all resources from the Database
3. WHEN a student filters by subject, THE Resource_Library SHALL fetch resources matching the subject from the Database
4. WHEN a student searches for resources, THE Resource_Library SHALL query the Database using title, description, subject, and tags fields
5. THE Resource_Library SHALL fetch featured resources where featured field equals true
6. THE Resource_Library SHALL order resources by viewCount in descending order for display

### Requirement 3: Lesson Sequence Persistence

**User Story:** As a student, I want to see my current lesson path in the Chat interface, so that I understand my learning progression.

#### Acceptance Criteria

1. THE Chat_Interface SHALL store chapter definitions in the Database with fields: id, title, description, subject, order, createdAt, updatedAt
2. THE Chat_Interface SHALL store lesson definitions in the Database with fields: id, chapterId, title, description, order, duration, createdAt, updatedAt
3. THE Chat_Interface SHALL store student lesson progress in the Database with fields: studentId, lessonId, status, completedAt
4. WHEN a student views the Chat page, THE Chat_Interface SHALL fetch the current chapter from the Database
5. WHEN a student views the Chat page, THE Chat_Interface SHALL fetch lessons for the current chapter ordered by the order field
6. THE Chat_Interface SHALL join lesson definitions with student progress to determine lesson status (completed, in_progress, locked)
7. WHEN a lesson is completed, THE Chat_Interface SHALL unlock the next lesson in the Lesson_Sequence

### Requirement 4: Student Progress Tracking

**User Story:** As a student, I want my weekly progress to be calculated from actual activity, so that I can see accurate metrics of my learning.

#### Acceptance Criteria

1. THE Student_Progress SHALL calculate weekly progress from student activity in the Database
2. THE Student_Progress SHALL aggregate completed lessons, quest progress, and chat sessions from the past 7 days
3. WHEN a student views any page with progress display, THE Student_Progress SHALL fetch activity data from the Database
4. THE Student_Progress SHALL compute progress percentage as (completed_activities / total_available_activities) * 100
5. WHEN no activity exists for the current week, THE Student_Progress SHALL return 0% progress
6. THE Student_Progress SHALL cache progress calculations for 1 hour to optimize performance

### Requirement 5: Empty State Handling

**User Story:** As a student, I want to see helpful messages when no content is available, so that I understand what actions to take.

#### Acceptance Criteria

1. WHEN no quests exist in the Database, THE Quest_System SHALL display an Empty_State with message "No quests available yet"
2. WHEN no resources exist in the Database, THE Resource_Library SHALL display an Empty_State with message "No learning resources available"
3. WHEN no lessons exist for a chapter, THE Chat_Interface SHALL display an Empty_State with message "No lessons in this chapter"
4. THE Empty_State SHALL include a call-to-action button or link for appropriate next steps
5. WHEN a teacher role is detected, THE Empty_State SHALL display "Create your first quest/resource/lesson" message
6. WHEN a student role is detected, THE Empty_State SHALL display "Check back soon for new content" message

### Requirement 6: Database Schema Migration

**User Story:** As a developer, I want Prisma schema models for all dynamic data, so that I can interact with the database using type-safe queries.

#### Acceptance Criteria

1. THE Database SHALL define a Quest model in the Prisma schema with all fields from Requirement 1
2. THE Database SHALL define a StudentQuest model in the Prisma schema for progress tracking
3. THE Database SHALL define a Resource model in the Prisma schema with all fields from Requirement 2
4. THE Database SHALL define a Chapter model in the Prisma schema with all fields from Requirement 3
5. THE Database SHALL define a Lesson model in the Prisma schema with all fields from Requirement 3
6. THE Database SHALL define a StudentLesson model in the Prisma schema for lesson progress tracking
7. THE Database SHALL establish relations: Quest 1-to-many StudentQuest, Chapter 1-to-many Lesson, Lesson 1-to-many StudentLesson, User 1-to-many StudentQuest, User 1-to-many StudentLesson
8. WHEN the schema is updated, THE Database SHALL generate Prisma client types for type-safe queries

### Requirement 7: Service Layer Refactoring

**User Story:** As a developer, I want service methods to query the database instead of returning hardcoded data, so that the application uses real persistent data.

#### Acceptance Criteria

1. THE Quest_System SHALL replace in-memory quest arrays with Prisma database queries
2. THE Resource_Library SHALL replace in-memory resource arrays with Prisma database queries
3. THE Chat_Interface SHALL replace hardcoded lesson data with Prisma database queries
4. WHEN questService.getQuestsForStudent is called, THE Quest_System SHALL execute a Prisma query joining Quest and StudentQuest tables
5. WHEN resourceService.getAllResources is called, THE Resource_Library SHALL execute a Prisma query on the Resource table
6. WHEN a service method encounters a database error, THE service SHALL log the error and return an empty array with success: false
7. THE service layer SHALL maintain existing method signatures to avoid breaking page components

### Requirement 8: Data Seeding

**User Story:** As a developer, I want seed data for quests, resources, and lessons, so that I can test the application with realistic content.

#### Acceptance Criteria

1. THE Database SHALL provide a seed script that populates Quest table with at least 4 sample quests
2. THE Database SHALL provide a seed script that populates Resource table with at least 5 sample resources
3. THE Database SHALL provide a seed script that populates Chapter table with at least 1 sample chapter
4. THE Database SHALL provide a seed script that populates Lesson table with at least 4 sample lessons
5. WHEN the seed script is executed, THE Database SHALL clear existing data before inserting new seed data
6. THE seed script SHALL create relationships between chapters and lessons using proper foreign keys
7. WHEN seed data already exists, THE seed script SHALL skip insertion to prevent duplicates

### Requirement 9: Adventure Page Integration

**User Story:** As a student, I want the Adventure page to display my actual quests from the database, so that I see personalized quest data.

#### Acceptance Criteria

1. WHEN the Adventure page loads, THE Quest_System SHALL fetch quests using getQuestsAction server action
2. THE Adventure page SHALL display quest title, description, subject, xpReward, starsReward from Database
3. THE Adventure page SHALL display Quest_Status (locked, available, in_progress, completed) from Database
4. THE Adventure page SHALL display quest progress percentage from StudentQuest table
5. WHEN no quests are returned, THE Adventure page SHALL render the Empty_State component
6. THE Adventure page SHALL display quest icons based on subject field from Database
7. THE Adventure page SHALL calculate weekly progress from Student_Progress data

### Requirement 10: Library Page Integration

**User Story:** As a student, I want the Library page to display learning resources from the database, so that I can access current educational materials.

#### Acceptance Criteria

1. WHEN the Library page loads, THE Resource_Library SHALL fetch resources using getResourcesAction server action
2. THE Library page SHALL display resource title, description, type, subject, difficulty, duration from Database
3. THE Library page SHALL display featured resources in the featured section using featured field
4. THE Library page SHALL display resource viewCount from Database
5. WHEN no resources are returned, THE Library page SHALL render the Empty_State component
6. THE Library page SHALL filter resources by subject using Database queries
7. THE Library page SHALL display resource icons based on Resource_Type from Database

### Requirement 11: Chat Page Integration

**User Story:** As a student, I want the Chat page sidebar to show my current lesson sequence from the database, so that I can track my learning path.

#### Acceptance Criteria

1. WHEN the Chat page loads, THE Chat_Interface SHALL fetch the current chapter using a new getChapterAction server action
2. WHEN the Chat page loads, THE Chat_Interface SHALL fetch lessons for the chapter using a new getLessonsAction server action
3. THE Chat page SHALL display chapter title and description from Database
4. THE Chat page SHALL display lesson titles ordered by the order field from Database
5. THE Chat page SHALL display lesson status (completed, in_progress, locked) from StudentLesson table
6. WHEN no lessons exist for the chapter, THE Chat page SHALL render the Empty_State component
7. THE Chat page SHALL calculate weekly progress from Student_Progress data

### Requirement 12: Performance Optimization

**User Story:** As a student, I want pages to load quickly, so that I have a smooth learning experience.

#### Acceptance Criteria

1. THE Quest_System SHALL use Prisma select to fetch only required fields from the Database
2. THE Resource_Library SHALL implement pagination when fetching more than 20 resources
3. THE Chat_Interface SHALL cache chapter and lesson data for 5 minutes using Next.js cache
4. WHEN fetching student progress, THE Student_Progress SHALL use database indexes on studentId and createdAt fields
5. THE Database SHALL create indexes on frequently queried fields: Quest.requiredLevel, Resource.featured, Resource.subject, Lesson.chapterId
6. WHEN multiple database queries are needed, THE service layer SHALL use Promise.all for parallel execution
7. THE service layer SHALL implement query result caching with 5-minute TTL for static data (quests, resources, chapters)
