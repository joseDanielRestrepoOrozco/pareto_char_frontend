import type { Problem } from '@/types/Problem';

export interface Project {
  id: string;
  name: string;
  problems?: Problem[];
  user?: string;
  createdAt: string;
  updatedAt: string;
}

export type NewProject = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;
