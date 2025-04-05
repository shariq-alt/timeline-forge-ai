
export type TimelineType = 'Roadmap' | 'Project' | 'Study' | 'Personal' | 'Career';
export type TimeUnit = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Timeline {
  id: string;
  title: string;
  description: string;
  type: TimelineType;
  segments: TimelineSegment[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface TimelineSegment {
  id: string;
  title: string;
  goals: Goal[];
  timelineId: string;
  position: number;
}

export interface Goal {
  id: string;
  text: string;
  completed: boolean;
  segmentId: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  timelines: Timeline[];
}
