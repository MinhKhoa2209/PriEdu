// Library/Resource catalog service

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'article' | 'quiz' | 'interactive';
  subject: string;
  difficulty: number;
  duration: number; // in minutes
  thumbnail: string;
  url: string;
  featured: boolean;
}

export class ResourceService {
  // Hardcoded resources for now - will move to DB later
  private resources: Resource[] = [
    {
      id: 'res-1',
      title: 'Molecular Bonds & Magic',
      description: 'Discover how atoms connect to form molecules',
      type: 'interactive',
      subject: 'science',
      difficulty: 2,
      duration: 15,
      thumbnail: '/resources/molecules.jpg',
      url: '/library/molecules',
      featured: true
    },
    {
      id: 'res-2',
      title: 'Ancient Civilizations Walk',
      description: 'Journey through Egypt, Rome, and Greece',
      type: 'video',
      subject: 'history',
      difficulty: 1,
      duration: 20,
      thumbnail: '/resources/ancient.jpg',
      url: '/library/ancient-civilizations',
      featured: true
    },
    {
      id: 'res-3',
      title: 'Fraction Fundamentals',
      description: 'Master fractions with visual examples',
      type: 'interactive',
      subject: 'math',
      difficulty: 1,
      duration: 10,
      thumbnail: '/resources/fractions.jpg',
      url: '/library/fractions',
      featured: false
    },
    {
      id: 'res-4',
      title: 'Global Citizen Quiz',
      description: 'Test your knowledge of world geography',
      type: 'quiz',
      subject: 'geography',
      difficulty: 2,
      duration: 5,
      thumbnail: '/resources/geography.jpg',
      url: '/library/geography-quiz',
      featured: true
    },
    {
      id: 'res-5',
      title: 'Creative Writing Workshop',
      description: 'Learn storytelling techniques',
      type: 'article',
      subject: 'language',
      difficulty: 2,
      duration: 25,
      thumbnail: '/resources/writing.jpg',
      url: '/library/creative-writing',
      featured: false
    }
  ];

  async getAllResources() {
    return this.resources;
  }

  async getFeaturedResources() {
    return this.resources.filter(r => r.featured);
  }

  async getResourcesBySubject(subject: string) {
    return this.resources.filter(r => r.subject === subject);
  }

  async searchResources(query: string) {
    const lowerQuery = query.toLowerCase();
    return this.resources.filter(r => 
      r.title.toLowerCase().includes(lowerQuery) ||
      r.description.toLowerCase().includes(lowerQuery) ||
      r.subject.toLowerCase().includes(lowerQuery)
    );
  }

  async getResourceById(id: string) {
    return this.resources.find(r => r.id === id);
  }
}

export const resourceService = new ResourceService();
