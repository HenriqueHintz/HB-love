export type TaskStatus = 'Planejado' | 'Em Progresso' | 'Concluído';

export interface Task {
  id: string;
  title: string;
  category: string;
  status: TaskStatus;
  description?: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
}

export interface Memory {
  id: string;
  photoUrl: string;
  title: string;
  description: string;
  date: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'document';
  mediaName?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'document';
  mediaName?: string;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'milestone' | 'trip' | 'date';
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'document';
  mediaName?: string;
}
