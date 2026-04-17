# Design Document: Student Pages Dynamic Data

## Overview

This design transforms the student-facing pages (Adventure, Library, Chat) from using hardcoded in-memory data to dynamic database-backed content. The system will migrate from service-layer arrays to Prisma-based MongoDB persistence, enabling personalized student experiences and dynamic content management.

The architecture follows a three-tier approach:
- **Data Layer**: Prisma models with MongoDB for persistent storage
- **Service Layer**: Business logic for data transformation and aggregation
- **Action Layer**: Next.js server actions for secure data fetching

This design maintains the existing component interfaces while replacing the data source, ensuring minimal disruption to the frontend while enabling scalable content management.

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Components                        │
│  (Adventure Page, Library Page, Chat Page)                  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Server Actions
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   Server Action Layer                        │
│  getQuestsAction, getResourcesAction, getChapterAction,     │
│  getLessonsAction                                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Service Methods
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Service Layer                             │
│  QuestService, ResourceService, LessonService               │
│  (Business Logic, Data Aggregation, Caching)                │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Prisma Client
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Data Layer (Prisma)                       │
│  Quest, StudentQuest, Resource, Chapter, Lesson,            │
│  StudentLesson Models                                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    MongoDB Database                          │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Pattern

1. **Page Component** renders and calls server action
2. **Server Action** validates input, calls service method
3. **Service Layer** executes Prisma queries, applies business logic
4. **Prisma Client** translates to MongoDB queries
5. **MongoDB** returns data
6. **Service Layer** transforms and caches results
7. **Server Action** returns typed response
8. **Page Component** renders with data or empty state

### Caching Strategy

- **Static Data** (quests, resources, chapters): 5-minute cache using Next.js unstable_cache
- **User Progress** (StudentQuest, StudentLesson): 1-hour cache with user-specific keys
- **Weekly Progress**: 1-hour cache, invalidated on activity updates
- Cache invalidation on mutations (quest start, lesson completion)

## Components and Interfaces

### Database Models (Prisma Schema)

#### Quest Model
```prisma
model Quest {
  id            String         @id @default(auto()) @map("_id") @db.ObjectId
  title         String
  description   String
  subject       String
  difficulty    Int
  xpReward      Int
  starsReward   Int
  requiredLevel Int
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  
  studentQuests StudentQuest[]
  
  @@index([requiredLevel])
  @@index([subject])
}
```

#### StudentQuest Model
```prisma
model StudentQuest {
  id          String    @id @default(auto()) @map("_id") @db.ObjectId
  studentId   String    @db.ObjectId
  questId     String    @db.ObjectId
  status      QuestStatus
  progress    Int       @default(0)
  startedAt   DateTime?
  completedAt DateTime?
  
  student     User      @relation(fields: [studentId], references: [id], onDelete: Cascade)
  quest       Quest     @relation(fields: [questId], references: [id], onDelete: Cascade)
  
  @@unique([studentId, questId])
  @@index([studentId])
  @@index([questId])
}

enum QuestStatus {
  LOCKED
  AVAILABLE
  IN_PROGRESS
  COMPLETED
}
```

#### Resource Model
```prisma
model Resource {
  id           String       @id @default(auto()) @map("_id") @db.ObjectId
  title        String
  description  String
  type         ResourceType
  subject      String
  difficulty   Int
  duration     Int
  thumbnailUrl String
  contentUrl   String
  featured     Boolean      @default(false)
  viewCount    Int          @default(0)
  tags         String[]
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
  
  @@index([featured])
  @@index([subject])
  @@index([viewCount])
}

enum ResourceType {
  VIDEO
  ARTICLE
  QUIZ
  INTERACTIVE
}
```

#### Chapter Model
```prisma
model Chapter {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  description String
  subject     String
  order       Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  lessons     Lesson[]
  
  @@index([order])
  @@index([subject])
}
```

#### Lesson Model
```prisma
model Lesson {
  id             String          @id @default(auto()) @map("_id") @db.ObjectId
  chapterId      String          @db.ObjectId
  title          String
  description    String
  order          Int
  duration       Int
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
  
  chapter        Chapter         @relation(fields: [chapterId], references: [id], onDelete: Cascade)
  studentLessons StudentLesson[]
  
  @@index([chapterId])
  @@index([order])
}
```

#### StudentLesson Model
```prisma
model StudentLesson {
  id          String        @id @default(auto()) @map("_id") @db.ObjectId
  studentId   String        @db.ObjectId
  lessonId    String        @db.ObjectId
  status      LessonStatus
  completedAt DateTime?
  
  student     User          @relation(fields: [studentId], references: [id], onDelete: Cascade)
  lesson      Lesson        @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  
  @@unique([studentId, lessonId])
  @@index([studentId])
  @@index([lessonId])
}

enum LessonStatus {
  LOCKED
  IN_PROGRESS
  COMPLETED
}
```

### Service Layer Interfaces

#### QuestService
```typescript
interface QuestWithProgress {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: number;
  xpReward: number;
  starsReward: number;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  progress: number;
  requiredLevel: number;
}

class QuestService {
  async getQuestsForStudent(studentId: string, studentLevel: number): Promise<QuestWithProgress[]>
  async startQuest(questId: string, studentId: string): Promise<QuestWithProgress>
  async updateQuestProgress(questId: string, studentId: string, progress: number): Promise<QuestWithProgress>
}
```

#### ResourceService
```typescript
interface ResourceData {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'quiz' | 'interactive';
  subject: string;
  difficulty: number;
  duration: number;
  thumbnail: string;
  url: string;
  featured: boolean;
  viewCount: number;
  tags: string[];
}

class ResourceService {
  async getAllResources(): Promise<ResourceData[]>
  async getFeaturedResources(): Promise<ResourceData[]>
  async getResourcesBySubject(subject: string): Promise<ResourceData[]>
  async searchResources(query: string): Promise<ResourceData[]>
  async incrementViewCount(resourceId: string): Promise<void>
}
```

#### LessonService (New)
```typescript
interface ChapterData {
  id: string;
  title: string;
  description: string;
  subject: string;
  order: number;
}

interface LessonWithStatus {
  id: string;
  title: string;
  description: string;
  order: number;
  duration: number;
  status: 'locked' | 'in_progress' | 'completed';
}

class LessonService {
  async getChapter(chapterId: string): Promise<ChapterData | null>
  async getCurrentChapterForStudent(studentId: string): Promise<ChapterData | null>
  async getLessonsForChapter(chapterId: string, studentId: string): Promise<LessonWithStatus[]>
  async completeLesson(lessonId: string, studentId: string): Promise<void>
}
```

### Server Actions

#### Quest Actions
```typescript
// src/modules/backend/actions/quest.ts
export async function getQuestsAction(studentId: string, studentLevel: number): Promise<ActionResult<QuestWithProgress[]>>
export async function startQuestAction(questId: string, studentId: string): Promise<ActionResult<QuestWithProgress>>
```

#### Resource Actions
```typescript
// src/modules/backend/actions/quest.ts (existing file)
export async function getResourcesAction(filter?: { subject?: string; featured?: boolean }): Promise<ActionResult<ResourceData[]>>
export async function searchResourcesAction(query: string): Promise<ActionResult<ResourceData[]>>
```

#### Lesson Actions (New)
```typescript
// src/modules/backend/actions/lesson.ts (new file)
export async function getChapterAction(chapterId: string): Promise<ActionResult<ChapterData>>
export async function getLessonsAction(chapterId: string, studentId: string): Promise<ActionResult<LessonWithStatus[]>>
export async function completeLessonAction(lessonId: string, studentId: string): Promise<ActionResult<void>>
```

#### Progress Actions
```typescript
// src/modules/backend/actions/user.ts (extend existing)
export async function getWeeklyProgressAction(studentId: string): Promise<ActionResult<{ progress: number }>>
```

### Action Result Type
```typescript
type ActionResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string; data?: T }
```

## Data Models

### Quest Status State Machine

```
┌─────────┐
│ LOCKED  │
└────┬────┘
     │ (level requirement met)
     ▼
┌─────────────┐
│  AVAILABLE  │
└──────┬──────┘
       │ (startQuest)
       ▼
┌──────────────┐
│ IN_PROGRESS  │
└──────┬───────┘
       │ (progress = 100)
       ▼
┌───────────┐
│ COMPLETED │
└───────────┘
```

### Lesson Status State Machine

```
┌─────────┐
│ LOCKED  │
└────┬────┘
     │ (previous lesson completed)
     ▼
┌──────────────┐
│ IN_PROGRESS  │
└──────┬───────┘
       │ (completeLesson)
       ▼
┌───────────┐
│ COMPLETED │
└───────────┘
```

### Weekly Progress Calculation

```typescript
interface WeeklyProgressData {
  completedLessons: number;
  totalLessons: number;
  questProgress: number; // sum of all quest progress
  totalQuests: number;
  chatSessions: number;
}

function calculateWeeklyProgress(data: WeeklyProgressData): number {
  const lessonWeight = 0.5;
  const questWeight = 0.3;
  const chatWeight = 0.2;
  
  const lessonProgress = (data.completedLessons / data.totalLessons) * 100;
  const questProgressAvg = (data.questProgress / data.totalQuests);
  const chatProgress = Math.min(data.chatSessions * 10, 100); // 10% per session, max 100%
  
  return (
    lessonProgress * lessonWeight +
    questProgressAvg * questWeight +
    chatProgress * chatWeight
  );
}
```

## Error Handling

### Service Layer Error Handling

```typescript
class QuestService {
  async getQuestsForStudent(studentId: string, studentLevel: number): Promise<QuestWithProgress[]> {
    try {
      const quests = await prisma.quest.findMany({
        include: {
          studentQuests: {
            where: { studentId }
          }
        }
      });
      
      return quests.map(quest => this.mapQuestWithProgress(quest, studentLevel));
    } catch (error) {
      console.error('[QuestService] Failed to fetch quests:', error);
      throw new Error('Failed to fetch quests from database');
    }
  }
}
```

### Server Action Error Handling

```typescript
export async function getQuestsAction(studentId: string, studentLevel: number) {
  try {
    const quests = await questService.getQuestsForStudent(studentId, studentLevel);
    
    return {
      success: true,
      data: quests
    };
  } catch (error) {
    console.error('[getQuestsAction] Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch quests',
      data: [] // Return empty array as fallback
    };
  }
}
```

### Component Error Handling

```typescript
// In page component
const questsResult = await getQuestsAction(userId, userLevel);
const quests = questsResult.success ? questsResult.data : [];

// Empty state is rendered when quests.length === 0
```

### Empty State Strategy

Each page will render an empty state component when no data is available:

```typescript
interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

// Adventure Page Empty State
<EmptyState 
  icon="explore"
  title="No quests available yet"
  description="Check back soon for new adventures!"
/>

// Library Page Empty State
<EmptyState 
  icon="library_books"
  title="No learning resources available"
  description="New materials are being added regularly"
/>

// Chat Page Empty State
<EmptyState 
  icon="auto_stories"
  title="No lessons in this chapter"
  description="This chapter is being prepared"
/>
```

## Testing Strategy

### Unit Testing

Unit tests will verify specific examples and edge cases:

1. **Service Layer Tests**
   - Test quest status calculation with specific student levels
   - Test resource filtering by subject
   - Test lesson sequence ordering
   - Test empty result handling
   - Test error scenarios (database unavailable, invalid IDs)

2. **Action Layer Tests**
   - Test action response format (success/error structure)
   - Test authentication requirements
   - Test input validation

3. **Data Transformation Tests**
   - Test Prisma model to service interface mapping
   - Test status derivation logic
   - Test progress calculation formulas

### Integration Testing

Integration tests will verify database interactions:

1. **Database Operations**
   - Test quest creation and retrieval
   - Test student progress tracking
   - Test resource search functionality
   - Test lesson completion flow

2. **Caching Behavior**
   - Test cache hit/miss scenarios
   - Test cache invalidation on updates

### Example Test Cases

```typescript
describe('QuestService', () => {
  it('should return available quests for student level 1', async () => {
    const quests = await questService.getQuestsForStudent('student-1', 1);
    expect(quests.filter(q => q.status === 'available').length).toBeGreaterThan(0);
  });
  
  it('should lock quests above student level', async () => {
    const quests = await questService.getQuestsForStudent('student-1', 1);
    const lockedQuests = quests.filter(q => q.requiredLevel > 1);
    expect(lockedQuests.every(q => q.status === 'locked')).toBe(true);
  });
  
  it('should return empty array when no quests exist', async () => {
    // Clear database
    await prisma.quest.deleteMany();
    const quests = await questService.getQuestsForStudent('student-1', 1);
    expect(quests).toEqual([]);
  });
});
```


## Performance Optimization

### Database Query Optimization

#### Index Strategy

```prisma
// Quest indexes
@@index([requiredLevel])  // For filtering by student level
@@index([subject])        // For subject-based filtering

// StudentQuest indexes
@@index([studentId])      // For user-specific queries
@@index([questId])        // For quest-specific lookups
@@unique([studentId, questId])  // Prevent duplicate progress entries

// Resource indexes
@@index([featured])       // For featured resource queries
@@index([subject])        // For subject filtering
@@index([viewCount])      // For sorting by popularity

// Lesson indexes
@@index([chapterId])      // For chapter-based queries
@@index([order])          // For lesson ordering

// StudentLesson indexes
@@index([studentId])      // For user progress queries
@@index([lessonId])       // For lesson-specific lookups
@@unique([studentId, lessonId])  // Prevent duplicate progress entries
```

#### Query Optimization Patterns

1. **Select Only Required Fields**
```typescript
// Instead of fetching all fields
const quests = await prisma.quest.findMany({
  select: {
    id: true,
    title: true,
    description: true,
    subject: true,
    difficulty: true,
    xpReward: true,
    starsReward: true,
    requiredLevel: true,
    studentQuests: {
      where: { studentId },
      select: {
        status: true,
        progress: true,
        startedAt: true,
        completedAt: true
      }
    }
  }
});
```

2. **Parallel Query Execution**
```typescript
// Execute independent queries in parallel
const [quests, userStats, weeklyProgress] = await Promise.all([
  questService.getQuestsForStudent(studentId, studentLevel),
  userService.getUserStats(studentId),
  progressService.getWeeklyProgress(studentId)
]);
```

3. **Pagination for Large Result Sets**
```typescript
async getAllResources(page: number = 1, limit: number = 20) {
  const skip = (page - 1) * limit;
  
  const [resources, total] = await Promise.all([
    prisma.resource.findMany({
      skip,
      take: limit,
      orderBy: { viewCount: 'desc' }
    }),
    prisma.resource.count()
  ]);
  
  return {
    resources,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
}
```

### Caching Strategy

#### Next.js Cache Implementation

```typescript
import { unstable_cache } from 'next/cache';

// Cache static quest data for 5 minutes
export const getCachedQuests = unstable_cache(
  async () => {
    return await prisma.quest.findMany();
  },
  ['quests-all'],
  {
    revalidate: 300, // 5 minutes
    tags: ['quests']
  }
);

// Cache user-specific progress for 1 hour
export const getCachedStudentProgress = unstable_cache(
  async (studentId: string) => {
    return await prisma.studentQuest.findMany({
      where: { studentId }
    });
  },
  ['student-progress'],
  {
    revalidate: 3600, // 1 hour
    tags: ['student-progress']
  }
);
```

#### Cache Invalidation

```typescript
import { revalidateTag } from 'next/cache';

// Invalidate quest cache when new quest is created
async function createQuest(data: QuestCreateInput) {
  const quest = await prisma.quest.create({ data });
  revalidateTag('quests');
  return quest;
}

// Invalidate student progress cache when quest is started
async function startQuest(questId: string, studentId: string) {
  const studentQuest = await prisma.studentQuest.create({
    data: {
      questId,
      studentId,
      status: 'IN_PROGRESS',
      startedAt: new Date()
    }
  });
  revalidateTag('student-progress');
  return studentQuest;
}
```

### Memory Optimization

1. **Streaming Large Result Sets**
```typescript
// For admin/teacher views with many resources
async function* streamResources() {
  const batchSize = 100;
  let cursor: string | undefined;
  
  while (true) {
    const resources = await prisma.resource.findMany({
      take: batchSize,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { id: 'asc' }
    });
    
    if (resources.length === 0) break;
    
    yield resources;
    cursor = resources[resources.length - 1].id;
  }
}
```

2. **Lean Queries for Counts**
```typescript
// Use count instead of fetching all records
const totalQuests = await prisma.quest.count({
  where: { requiredLevel: { lte: studentLevel } }
});
```

### Performance Monitoring

```typescript
// Add timing logs for slow queries
async function getQuestsForStudent(studentId: string, studentLevel: number) {
  const startTime = Date.now();
  
  try {
    const quests = await prisma.quest.findMany({
      // ... query
    });
    
    const duration = Date.now() - startTime;
    if (duration > 1000) {
      console.warn(`[Performance] Slow quest query: ${duration}ms for student ${studentId}`);
    }
    
    return quests;
  } catch (error) {
    console.error('[QuestService] Query failed:', error);
    throw error;
  }
}
```

## Implementation Notes

### Migration Strategy

1. **Phase 1: Schema Creation**
   - Add new Prisma models to schema.prisma
   - Generate Prisma client
   - Run database migration

2. **Phase 2: Service Layer Refactoring**
   - Update QuestService to use Prisma queries
   - Update ResourceService to use Prisma queries
   - Create new LessonService with Prisma queries
   - Maintain existing method signatures for backward compatibility

3. **Phase 3: Data Seeding**
   - Create seed script with sample data
   - Populate Quest, Resource, Chapter, Lesson tables
   - Test with seed data

4. **Phase 4: Page Integration**
   - Update server actions to pass studentId
   - Test each page with database data
   - Implement empty states
   - Add error boundaries

5. **Phase 5: Performance Optimization**
   - Add caching layer
   - Implement pagination
   - Monitor query performance
   - Optimize slow queries

### Backward Compatibility

During migration, the service layer will maintain existing interfaces:

```typescript
// Old interface (still supported)
async getQuestsForStudent(studentLevel: number): Promise<Quest[]>

// New interface (preferred)
async getQuestsForStudent(studentId: string, studentLevel: number): Promise<QuestWithProgress[]>
```

Pages will be updated incrementally to use the new interface.

### Database Seeding

The seed script will populate initial data:

```typescript
// prisma/seed.ts
async function seedQuests() {
  const quests = [
    {
      title: 'Science Springs Explorer',
      description: 'Master the basics of scientific method',
      subject: 'science',
      difficulty: 1,
      xpReward: 100,
      starsReward: 10,
      requiredLevel: 1
    },
    // ... more quests
  ];
  
  for (const quest of quests) {
    await prisma.quest.upsert({
      where: { title: quest.title },
      update: {},
      create: quest
    });
  }
}
```

### Testing Approach

This feature is NOT suitable for property-based testing because:

1. **Primarily CRUD Operations**: The feature involves straightforward database reads and writes with no complex transformation logic that would benefit from randomized input testing.

2. **Infrastructure Configuration**: Database schema design is declarative configuration, similar to IaC, which is better tested with schema validation and integration tests.

3. **Simple Business Logic**: Status derivation (locked/available/in_progress/completed) is deterministic based on specific conditions, not universal properties across infinite inputs.

4. **Integration-Heavy**: Most testable requirements involve database interactions, which are better verified with integration tests using real or mocked database connections.

Instead, the testing strategy will focus on:

- **Unit Tests**: Verify specific examples of status calculation, filtering logic, and data transformation
- **Integration Tests**: Test database queries, relationships, and data persistence with a test database
- **Schema Validation**: Ensure Prisma schema matches requirements and generates correct types
- **Seed Data Tests**: Verify seed script populates database correctly

Example unit tests:
```typescript
describe('Quest Status Calculation', () => {
  it('should mark quest as locked when student level is below required level', () => {
    const quest = { requiredLevel: 5 };
    const studentLevel = 3;
    expect(calculateQuestStatus(quest, studentLevel, null)).toBe('locked');
  });
  
  it('should mark quest as available when student level meets requirement', () => {
    const quest = { requiredLevel: 3 };
    const studentLevel = 3;
    expect(calculateQuestStatus(quest, studentLevel, null)).toBe('available');
  });
});
```

Example integration tests:
```typescript
describe('QuestService Integration', () => {
  it('should fetch quests with student progress from database', async () => {
    const quests = await questService.getQuestsForStudent('student-1', 5);
    expect(quests).toHaveLength(4);
    expect(quests[0]).toHaveProperty('status');
    expect(quests[0]).toHaveProperty('progress');
  });
});
```

## Security Considerations

### Authentication & Authorization

All server actions must verify user authentication:

```typescript
export async function getQuestsAction(studentId: string, studentLevel: number) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return {
      success: false,
      error: 'Unauthorized'
    };
  }
  
  // Verify studentId matches session user
  if ((session.user as any).id !== studentId) {
    return {
      success: false,
      error: 'Forbidden'
    };
  }
  
  // ... proceed with query
}
```

### Input Validation

Validate all inputs before database queries:

```typescript
export async function getResourcesAction(filter?: { subject?: string; featured?: boolean }) {
  // Validate subject is from allowed list
  const allowedSubjects = ['science', 'math', 'language', 'history', 'geography'];
  
  if (filter?.subject && !allowedSubjects.includes(filter.subject)) {
    return {
      success: false,
      error: 'Invalid subject filter'
    };
  }
  
  // ... proceed with query
}
```

### SQL Injection Prevention

Prisma provides parameterized queries by default, preventing SQL injection. Always use Prisma's query builder instead of raw queries:

```typescript
// Safe - Prisma parameterizes automatically
await prisma.quest.findMany({
  where: { subject: userInput }
});

// Avoid raw queries unless absolutely necessary
// If needed, use parameterized queries
await prisma.$queryRaw`SELECT * FROM Quest WHERE subject = ${userInput}`;
```

## Deployment Considerations

### Database Migration

```bash
# Generate migration
npx prisma migrate dev --name add_quest_resource_lesson_models

# Apply migration to production
npx prisma migrate deploy
```

### Environment Variables

Required environment variables:
```env
DATABASE_URL="mongodb+srv://user:password@cluster.mongodb.net/priedu"
```

### Monitoring

Add logging for production monitoring:

```typescript
// Log slow queries
if (process.env.NODE_ENV === 'production') {
  prisma.$use(async (params, next) => {
    const before = Date.now();
    const result = await next(params);
    const after = Date.now();
    
    if (after - before > 1000) {
      console.warn(`Slow query: ${params.model}.${params.action} took ${after - before}ms`);
    }
    
    return result;
  });
}
```

