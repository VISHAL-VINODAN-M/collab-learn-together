
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: 'student' | 'teacher' | 'admin';
  createdAt: Date;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  enrolledCount: number;
}

export interface Material {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'quiz' | 'flashcards';
  contentUrl: string;
  thumbnailUrl?: string;
  createdAt: Date;
}

export interface StudySession {
  id: string;
  title: string;
  subjectId: string;
  hostId: string;
  status: 'scheduled' | 'active' | 'completed';
  startTime: Date;
  endTime?: Date;
  maxParticipants: number;
  currentParticipants: number;
  channelId: string;
}
