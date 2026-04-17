/**
 * Bug Condition Exploration Tests - Student Pages Internationalization
 * 
 * **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10**
 * 
 * CRITICAL: These tests MUST FAIL on unfixed code - failure confirms the bug exists
 * DO NOT attempt to fix the tests or the code when they fail
 * 
 * These tests encode the expected behavior - they will validate the fix when they pass after implementation
 * 
 * GOAL: Surface counterexamples that demonstrate hardcoded text not responding to language changes
 * 
 * Scoped PBT Approach: Test concrete failing cases across all 5 student pages with both English and Vietnamese locales
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

// Mock next-auth
vi.mock('next-auth', () => ({
  getServerSession: vi.fn(() => Promise.resolve({
    user: {
      id: 'test-user-id',
      name: 'Test Student',
      email: 'student@test.com',
      role: 'STUDENT'
    }
  })),
}));

// Mock next-auth/react for client components
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(() => ({
    data: { 
      user: { 
        id: 'test-user-id', 
        name: 'Test Student', 
        email: 'student@test.com',
        role: 'STUDENT'
      } 
    },
    status: 'authenticated',
    update: vi.fn(),
  })),
  signOut: vi.fn(),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    refresh: vi.fn(),
  })),
  redirect: vi.fn(),
  usePathname: vi.fn(() => '/student/dashboard'),
}));

// Mock next-intl for server components
vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn((namespace: string) => {
    // Return a mock translation function that returns the key itself
    return vi.fn((key: string) => key);
  }),
}));

// Mock next-intl for client components
vi.mock('next-intl', () => ({
  useTranslations: vi.fn((namespace: string) => {
    // Return a mock translation function that returns the key itself
    return vi.fn((key: string) => key);
  }),
  useLocale: vi.fn(() => 'vi'), // Default to Vietnamese to test the bug
}));

// Mock backend actions
vi.mock('@/modules/backend/actions/user', () => ({
  getUserStatsAction: vi.fn(() => Promise.resolve({
    success: true,
    data: {
      name: 'Test Student',
      level: 5,
      xp: 350,
      stars: 42,
      streak: 7
    }
  })),
  getStudentSubmissionsAction: vi.fn(() => Promise.resolve({
    success: true,
    data: []
  })),
}));

vi.mock('@/modules/backend/actions/quest', () => ({
  getQuestsAction: vi.fn(() => Promise.resolve({
    success: true,
    data: [
      {
        id: '1',
        title: 'Space Quest',
        description: 'Explore the universe',
        subject: 'science',
        status: 'in_progress',
        progress: 50,
        xpReward: 100,
        starsReward: 5
      }
    ]
  })),
  getResourcesAction: vi.fn(() => Promise.resolve({
    success: true,
    data: [
      {
        id: '1',
        title: 'Introduction to Physics',
        description: 'Learn the basics',
        subject: 'science',
        type: 'video',
        duration: 15,
        difficulty: 2,
        url: '/resource/1'
      }
    ]
  })),
}));

// Mock AI SDK
vi.mock('@ai-sdk/react', () => ({
  useChat: vi.fn(() => ({
    messages: [],
    sendMessage: vi.fn(),
    status: 'idle',
  })),
  DefaultChatTransport: vi.fn(),
}));

// Mock shared components
vi.mock('@/shared/components/ui/language-toggle', () => ({
  LanguageToggle: () => <button>Language Toggle</button>,
}));

vi.mock('@/shared/components/ui/theme-toggle', () => ({
  ThemeToggle: () => <button>Theme Toggle</button>,
}));

describe('Bug Condition Exploration - Student Pages Display Hardcoded Text Instead of Translations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Property 1: Dashboard Page with Vietnamese Locale', () => {
    /**
     * Bug Condition: Dashboard displays hardcoded English text when Vietnamese locale is selected
     * Expected: All text should be in Vietnamese using translation keys
     * 
     * Test Case from Bug Condition in design:
     * User selects Vietnamese locale → sees "Your Learning Path", "View All", "Science", 
     * "Mathematics", "English", "History", "lessons", "Progress", "Recent Activity" in English
     * instead of Vietnamese translations
     */

    it('Test 1: Dashboard should display Vietnamese text for "Your Learning Path" when Vietnamese locale is selected', async () => {
      // Set locale to Vietnamese
      const { useLocale } = await import('next-intl');
      vi.mocked(useLocale).mockReturnValue('vi');

      // Import and render Dashboard page
      const DashboardPage = (await import('./dashboard/page')).default;
      const { container } = render(await DashboardPage());

      // Look for hardcoded English text "Your Learning Path"
      // This SHOULD NOT be found - should be Vietnamese translation instead
      const hardcodedEnglishText = container.textContent?.includes('Your Learning Path');
      
      // Look for Vietnamese translation key or Vietnamese text
      // After fix, should find "Lộ trình học tập" or translation key "yourLearningPath"
      const hasVietnameseText = container.textContent?.includes('yourLearningPath') || 
                                container.textContent?.includes('Lộ trình học tập');

      // EXPECTED TO FAIL on unfixed code: Dashboard shows English "Your Learning Path"
      expect(hardcodedEnglishText).toBe(false);
      expect(hasVietnameseText).toBe(true);
    });

    it('Test 2: Dashboard should display Vietnamese text for module names when Vietnamese locale is selected', async () => {
      const { useLocale } = await import('next-intl');
      vi.mocked(useLocale).mockReturnValue('vi');

      const DashboardPage = (await import('./dashboard/page')).default;
      const { container } = render(await DashboardPage());

      // Look for hardcoded English module names
      const hasEnglishScience = container.textContent?.includes('Science') && 
                                !container.textContent?.includes('science'); // Exclude translation key
      const hasEnglishMathematics = container.textContent?.includes('Mathematics');
      const hasEnglishHistory = container.textContent?.includes('History') &&
                                 !container.textContent?.includes('history'); // Exclude translation key

      // EXPECTED TO FAIL on unfixed code: Shows "Science", "Mathematics", "History" in English
      expect(hasEnglishScience).toBe(false);
      expect(hasEnglishMathematics).toBe(false);
      expect(hasEnglishHistory).toBe(false);
    });

    it('Test 3: Dashboard should display Vietnamese text for "Quick Actions" section when Vietnamese locale is selected', async () => {
      const { useLocale } = await import('next-intl');
      vi.mocked(useLocale).mockReturnValue('vi');

      const DashboardPage = (await import('./dashboard/page')).default;
      const { container } = render(await DashboardPage());

      // Look for hardcoded English text in Quick Actions section
      const hasQuickActions = container.textContent?.includes('Quick Actions');
      const hasAITutor = container.textContent?.includes('AI Tutor');
      const hasGetHelpInstantly = container.textContent?.includes('Get help instantly');

      // EXPECTED TO FAIL on unfixed code: Shows English text
      expect(hasQuickActions).toBe(false);
      expect(hasAITutor).toBe(false);
      expect(hasGetHelpInstantly).toBe(false);
    });
  });

  describe('Property 2: Chat Page with English Locale', () => {
    /**
     * Bug Condition: Chat displays hardcoded Vietnamese text when English locale is selected
     * Expected: All text should be in English using translation keys
     * 
     * Test Case from Bug Condition in design:
     * User selects English locale → sees "Chương 3", "Khám phá Vũ trụ", Vietnamese lesson names
     * instead of English translations
     */

    it('Test 4: Chat page should display English text for chapter title when English locale is selected', async () => {
      // Set locale to English
      const { useLocale } = await import('next-intl');
      vi.mocked(useLocale).mockReturnValue('en');

      // Import and render Chat page
      const ChatPage = (await import('./chat/page')).default;
      const { container } = render(<ChatPage />);

      // Look for hardcoded Vietnamese text "Chương 3"
      const hasVietnameseChapter = container.textContent?.includes('Chương 3');
      
      // Look for hardcoded Vietnamese text "Khám phá Vũ trụ"
      const hasVietnameseExplore = container.textContent?.includes('Khám phá Vũ trụ');

      // EXPECTED TO FAIL on unfixed code: Shows Vietnamese "Chương 3", "Khám phá Vũ trụ"
      expect(hasVietnameseChapter).toBe(false);
      expect(hasVietnameseExplore).toBe(false);
    });

    it('Test 5: Chat page should display English text for lesson names when English locale is selected', async () => {
      const { useLocale } = await import('next-intl');
      vi.mocked(useLocale).mockReturnValue('en');

      const ChatPage = (await import('./chat/page')).default;
      const { container } = render(<ChatPage />);

      // Look for hardcoded Vietnamese lesson names
      const hasVietnameseMoon = container.textContent?.includes('Mặt trăng là gì?');
      const hasVietnamesePlanets = container.textContent?.includes('Các hành tinh xóm giềng');
      const hasVietnameseStars = container.textContent?.includes('Vì sao sao lại sáng?');

      // EXPECTED TO FAIL on unfixed code: Shows Vietnamese lesson names
      expect(hasVietnameseMoon).toBe(false);
      expect(hasVietnamesePlanets).toBe(false);
      expect(hasVietnameseStars).toBe(false);
    });

    it('Test 6: Chat page should display English text for AI tutor interface when English locale is selected', async () => {
      const { useLocale } = await import('next-intl');
      vi.mocked(useLocale).mockReturnValue('en');

      const ChatPage = (await import('./chat/page')).default;
      const { container } = render(<ChatPage />);

      // Look for hardcoded Vietnamese AI tutor text
      const hasVietnameseTutor = container.textContent?.includes('Gia sư AI: Socratic');
      const hasVietnameseStatus = container.textContent?.includes('Đang sẵn sàng hỗ trợ');
      const hasVietnamesePlaceholder = container.textContent?.includes('Hỏi Gia sư AI bất cứ điều gì...');

      // EXPECTED TO FAIL on unfixed code: Shows Vietnamese AI tutor text
      expect(hasVietnameseTutor).toBe(false);
      expect(hasVietnameseStatus).toBe(false);
      expect(hasVietnamesePlaceholder).toBe(false);
    });
  });

  describe('Property 3: Adventure Page with Vietnamese Locale', () => {
    /**
     * Bug Condition: Adventure displays hardcoded English status labels when Vietnamese locale is selected
     * Expected: All text should be in Vietnamese using translation keys
     * 
     * Test Case from Bug Condition in design:
     * User selects Vietnamese locale → sees "Active", "Completed", "Start Quest" in English
     * instead of Vietnamese translations
     */

    it('Test 7: Adventure page should display Vietnamese text for quest status labels when Vietnamese locale is selected', async () => {
      const { useLocale } = await import('next-intl');
      vi.mocked(useLocale).mockReturnValue('vi');

      const AdventurePage = (await import('./adventure/page')).default;
      const { container } = render(await AdventurePage());

      // Look for hardcoded English status labels
      const hasEnglishActive = container.textContent?.includes('Active') &&
                               !container.textContent?.includes('active'); // Exclude translation key
      const hasEnglishCompleted = container.textContent?.includes('Completed') &&
                                  !container.textContent?.includes('completed'); // Exclude translation key
      const hasEnglishAvailable = container.textContent?.includes('Available') &&
                                  !container.textContent?.includes('available'); // Exclude translation key

      // EXPECTED TO FAIL on unfixed code: Shows "Active", "Completed", "Available" in English
      expect(hasEnglishActive).toBe(false);
      expect(hasEnglishCompleted).toBe(false);
      expect(hasEnglishAvailable).toBe(false);
    });

    it('Test 8: Adventure page should display Vietnamese text for action buttons when Vietnamese locale is selected', async () => {
      const { useLocale } = await import('next-intl');
      vi.mocked(useLocale).mockReturnValue('vi');

      const AdventurePage = (await import('./adventure/page')).default;
      const { container } = render(await AdventurePage());

      // Look for hardcoded English "Start Quest" button
      const hasEnglishStartQuest = container.textContent?.includes('Start Quest');

      // EXPECTED TO FAIL on unfixed code: Shows "Start Quest" in English
      expect(hasEnglishStartQuest).toBe(false);
    });
  });

  describe('Property 4: Library Page with Vietnamese Locale', () => {
    /**
     * Bug Condition: Library displays hardcoded English text when Vietnamese locale is selected
     * Expected: All text should be in Vietnamese using translation keys
     * 
     * Test Case from Bug Condition in design:
     * User selects Vietnamese locale → sees "Student Hub", "Search resources...", "Difficulty" in English
     * instead of Vietnamese translations
     */

    it('Test 9: Library page should display Vietnamese text for header section when Vietnamese locale is selected', async () => {
      const { useLocale } = await import('next-intl');
      vi.mocked(useLocale).mockReturnValue('vi');

      const LibraryPage = (await import('./library/page')).default;
      const { container } = render(await LibraryPage());

      // Look for hardcoded English text
      const hasEnglishStudentHub = container.textContent?.includes('Student Hub');
      const hasEnglishDiscover = container.textContent?.includes('Discover interactive learning materials powered by AI');
      const hasEnglishSearchPlaceholder = container.textContent?.includes('Search resources...');

      // EXPECTED TO FAIL on unfixed code: Shows English text
      expect(hasEnglishStudentHub).toBe(false);
      expect(hasEnglishDiscover).toBe(false);
      expect(hasEnglishSearchPlaceholder).toBe(false);
    });

    it('Test 10: Library page should display Vietnamese text for category filters when Vietnamese locale is selected', async () => {
      const { useLocale } = await import('next-intl');
      vi.mocked(useLocale).mockReturnValue('vi');

      const LibraryPage = (await import('./library/page')).default;
      const { container } = render(await LibraryPage());

      // Look for hardcoded English category names (capitalized versions)
      const hasEnglishAll = container.textContent?.includes('All') &&
                            !container.textContent?.includes('all'); // Exclude translation key
      const hasEnglishScience = container.textContent?.includes('Science') &&
                                !container.textContent?.includes('science'); // Exclude translation key
      const hasEnglishMath = container.textContent?.includes('Math') &&
                             !container.textContent?.includes('math'); // Exclude translation key

      // EXPECTED TO FAIL on unfixed code: Shows "All", "Science", "Math" in English
      expect(hasEnglishAll).toBe(false);
      expect(hasEnglishScience).toBe(false);
      expect(hasEnglishMath).toBe(false);
    });

    it('Test 11: Library page should display Vietnamese text for resource metadata when Vietnamese locale is selected', async () => {
      const { useLocale } = await import('next-intl');
      vi.mocked(useLocale).mockReturnValue('vi');

      const LibraryPage = (await import('./library/page')).default;
      const { container } = render(await LibraryPage());

      // Look for hardcoded English metadata labels
      const hasEnglishStartLearning = container.textContent?.includes('Start Learning');
      const hasEnglishDifficulty = container.textContent?.includes('Difficulty');

      // EXPECTED TO FAIL on unfixed code: Shows "Start Learning", "Difficulty" in English
      expect(hasEnglishStartLearning).toBe(false);
      expect(hasEnglishDifficulty).toBe(false);
    });
  });

  describe('Property 5: Settings Page with Vietnamese Locale', () => {
    /**
     * Bug Condition: Settings displays hardcoded English text when Vietnamese locale is selected
     * Expected: All text should be in Vietnamese using translation keys
     * 
     * Test Case from Bug Condition in design:
     * User selects Vietnamese locale → sees "Settings", "Profile Information", "Edit" in English
     * instead of Vietnamese translations
     */

    it('Test 12: Settings page should display Vietnamese text for page header when Vietnamese locale is selected', async () => {
      const { useLocale } = await import('next-intl');
      vi.mocked(useLocale).mockReturnValue('vi');

      const SettingsPage = (await import('./settings/page')).default;
      const { container } = render(<SettingsPage />);

      // Look for hardcoded English header text
      const hasEnglishSettings = container.textContent?.includes('Settings') &&
                                 !container.textContent?.includes('settings'); // Exclude translation key
      const hasEnglishManageAccount = container.textContent?.includes('Manage your account and preferences');

      // EXPECTED TO FAIL on unfixed code: Shows "Settings", "Manage your account..." in English
      expect(hasEnglishSettings).toBe(false);
      expect(hasEnglishManageAccount).toBe(false);
    });

    it('Test 13: Settings page should display Vietnamese text for profile section when Vietnamese locale is selected', async () => {
      const { useLocale } = await import('next-intl');
      vi.mocked(useLocale).mockReturnValue('vi');

      const SettingsPage = (await import('./settings/page')).default;
      const { container } = render(<SettingsPage />);

      // Look for hardcoded English profile section text
      const hasEnglishProfileInfo = container.textContent?.includes('Profile Information');
      const hasEnglishEdit = container.textContent?.includes('Edit') &&
                             !container.textContent?.includes('edit'); // Exclude translation key
      const hasEnglishFullName = container.textContent?.includes('Full Name');
      const hasEnglishEmailAddress = container.textContent?.includes('Email Address');

      // EXPECTED TO FAIL on unfixed code: Shows English text
      expect(hasEnglishProfileInfo).toBe(false);
      expect(hasEnglishEdit).toBe(false);
      expect(hasEnglishFullName).toBe(false);
      expect(hasEnglishEmailAddress).toBe(false);
    });

    it('Test 14: Settings page should display Vietnamese text for appearance section when Vietnamese locale is selected', async () => {
      const { useLocale } = await import('next-intl');
      vi.mocked(useLocale).mockReturnValue('vi');

      const SettingsPage = (await import('./settings/page')).default;
      const { container } = render(<SettingsPage />);

      // Look for hardcoded English appearance section text
      const hasEnglishAppearance = container.textContent?.includes('Appearance') &&
                                   !container.textContent?.includes('appearance'); // Exclude translation key
      const hasEnglishTheme = container.textContent?.includes('Theme') &&
                              !container.textContent?.includes('theme'); // Exclude translation key
      const hasEnglishChooseTheme = container.textContent?.includes('Choose your preferred theme');
      const hasEnglishLanguage = container.textContent?.includes('Language') &&
                                 !container.textContent?.includes('language'); // Exclude translation key

      // EXPECTED TO FAIL on unfixed code: Shows English text
      expect(hasEnglishAppearance).toBe(false);
      expect(hasEnglishTheme).toBe(false);
      expect(hasEnglishChooseTheme).toBe(false);
      expect(hasEnglishLanguage).toBe(false);
    });

    it('Test 15: Settings page should display Vietnamese text for account actions when Vietnamese locale is selected', async () => {
      const { useLocale } = await import('next-intl');
      vi.mocked(useLocale).mockReturnValue('vi');

      const SettingsPage = (await import('./settings/page')).default;
      const { container } = render(<SettingsPage />);

      // Look for hardcoded English account actions text
      const hasEnglishAccountActions = container.textContent?.includes('Account Actions');
      const hasEnglishLogOut = container.textContent?.includes('Log Out');
      const hasEnglishSignOut = container.textContent?.includes('Sign out of your account');

      // EXPECTED TO FAIL on unfixed code: Shows English text
      expect(hasEnglishAccountActions).toBe(false);
      expect(hasEnglishLogOut).toBe(false);
      expect(hasEnglishSignOut).toBe(false);
    });
  });
});
