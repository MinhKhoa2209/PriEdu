# Authentication Setup Guide

## ✅ Authentication Flow Implemented

### Overview
PriEdu now has a complete authentication system using NextAuth.js with role-based access control.

### Flow Diagram
```
1. User visits / → Redirects to /login (if not authenticated)
2. User logs in → NextAuth validates credentials
3. Session created with JWT → Includes user.id, role, level
4. Middleware checks authentication on every request
5. Redirects to appropriate dashboard based on role:
   - STUDENT → /student/dashboard
   - TEACHER → /teacher/dashboard
```

---

## 🔐 Demo Credentials

After running the seed script, use these credentials:

**Student Account:**
- Email: `student@priedu.com`
- Password: `password`
- Access: All `/student/*` routes

**Teacher Account:**
- Email: `teacher@priedu.com`
- Password: `password`
- Access: All `/teacher/*` routes

---

## 🚀 Setup Instructions

### 1. Environment Variables
Ensure your `.env` file has:
```env
DATABASE_URL="mongodb://..."
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. Database Setup
```bash
# Push schema to database
npm run db:push

# Seed demo users
npm run db:seed
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Test Authentication
1. Visit `http://localhost:3000`
2. You'll be redirected to `/login`
3. Use demo credentials above
4. You'll be redirected to the appropriate dashboard

---

## 🛡️ Security Features

### Implemented
- ✅ Password hashing with bcrypt
- ✅ JWT-based sessions
- ✅ Role-based access control (RBAC)
- ✅ Protected routes via middleware
- ✅ Secure cookie handling
- ✅ CSRF protection (NextAuth built-in)

### Middleware Protection
All routes except `/login` and `/api/auth/*` require authentication:
- `/student/*` → Requires STUDENT role
- `/teacher/*` → Requires TEACHER role
- `/` → Redirects based on role

---

## 📝 Authentication Files

### Core Files
```
src/
├── lib/
│   └── auth.ts              # NextAuth configuration
├── app/
│   ├── api/auth/[...nextauth]/
│   │   └── route.ts         # NextAuth API routes
│   ├── (auth)/login/
│   │   └── page.tsx         # Login page
│   └── page.tsx             # Home (redirects based on auth)
├── providers/
│   └── SessionProvider.tsx  # Client-side session provider
└── middleware.ts            # Route protection
```

### Key Components

**1. Auth Configuration (`src/lib/auth.ts`)**
- Credentials provider
- JWT strategy
- Session callbacks
- Role injection

**2. Middleware (`middleware.ts`)**
- JWT token validation
- Role-based redirects
- Public route handling

**3. Login Page (`src/app/(auth)/login/page.tsx`)**
- NextAuth signIn integration
- Error handling
- Demo credentials display

---

## 🔄 Authentication Flow Details

### Login Process
```typescript
1. User submits form → signIn('credentials', { email, password })
2. NextAuth calls authorize() in auth.ts
3. Validates credentials against database
4. Creates JWT token with user data
5. Sets secure HTTP-only cookie
6. Redirects to home page
7. Home page checks role → redirects to dashboard
```

### Protected Route Access
```typescript
1. User requests /student/dashboard
2. Middleware intercepts request
3. Checks JWT token from cookie
4. Validates role === 'STUDENT'
5. If valid → allows access
6. If invalid → redirects to /login
```

### Session Management
```typescript
// Get session in Server Component
const session = await getServerSession(authOptions);
const userId = (session.user as any).id;
const role = (session.user as any).role;

// Get session in Client Component
const { data: session } = useSession();
```

---

## 🎯 Role-Based Features

### Student Features
- Personal dashboard with stats
- Adventure map with quests
- AI tutor chat
- Resource library
- Homework submissions

### Teacher Features
- Class analytics dashboard
- Student progress monitoring
- Submission review & grading
- AI-powered alerts
- Student roster management

---

## 🐛 Troubleshooting

### Issue: "Invalid credentials" error
**Solution:** Make sure you've run the seed script:
```bash
npm run db:seed
```

### Issue: Redirects to login after successful login
**Solution:** Check that NEXTAUTH_SECRET is set in `.env`

### Issue: 404 on /dashboard
**Solution:** Use `/student/dashboard` or `/teacher/dashboard` instead

### Issue: Session not persisting
**Solution:** 
1. Clear browser cookies
2. Restart dev server
3. Check NEXTAUTH_URL matches your domain

---

## 📊 Database Schema

### User Model
```prisma
model User {
  id            String   @id @default(auto()) @map("_id") @db.ObjectId
  email         String   @unique
  password      String
  name          String
  role          Role     @default(STUDENT)
  level         Int      @default(1)
  xp            Int      @default(0)
  stars         Int      @default(0)
  streak        Int      @default(1)
  submissions   Submission[]
  chatSessions  ChatSession[]
}

enum Role {
  STUDENT
  TEACHER
  ADMIN
}
```

---

## 🔮 Future Enhancements

### Planned Features
- [ ] OAuth providers (Google, Microsoft)
- [ ] Email verification
- [ ] Password reset flow
- [ ] Two-factor authentication (2FA)
- [ ] Session management UI
- [ ] Account settings page
- [ ] Parent accounts
- [ ] Admin dashboard

### Security Improvements
- [ ] Rate limiting on login
- [ ] Account lockout after failed attempts
- [ ] Password strength requirements
- [ ] Session timeout configuration
- [ ] Audit logging

---

## 📚 Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Auth Guide](https://www.prisma.io/docs/guides/authentication)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

*Last Updated: 2026-04-15*
*Version: 1.0.0*
