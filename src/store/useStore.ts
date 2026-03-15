import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, Memory, Achievement, TimelineEvent, TaskStatus } from '../types';
import { initialTasks, initialMemories, initialAchievements, initialTimeline } from '../data/initialData';
import { ToastData } from '../components/ui/Toast';

interface AppState {
  // Data
  tasks: Task[];
  memories: Memory[];
  achievements: Achievement[];
  timeline: TimelineEvent[];
  editingTaskId: string | null;
  
  // UI State
  theme: 'light' | 'dark';
  isAuthenticated: boolean;
  toasts: ToastData[];
  
  // Task Actions
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  setEditingTaskId: (id: string | null) => void;

  // Memory Actions
  addMemory: (memory: Omit<Memory, 'id'>) => void;
  updateMemory: (id: string, updates: Partial<Memory>) => void;
  deleteMemory: (id: string) => void;

  // Achievement Actions
  addAchievement: (achievement: Omit<Achievement, 'id'>) => void;
  updateAchievement: (id: string, updates: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;

  // Timeline Actions
  addTimelineEvent: (event: Omit<TimelineEvent, 'id'>) => void;
  updateTimelineEvent: (id: string, updates: Partial<TimelineEvent>) => void;
  deleteTimelineEvent: (id: string) => void;

  // UI Actions
  toggleTheme: () => void;
  authenticate: () => void;
  addToast: (toast: Omit<ToastData, 'id'>) => void;
  removeToast: (id: string) => void;

  // Data Management
  exportData: () => string;
  importData: (json: string) => boolean;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Data
      tasks: initialTasks,
      memories: initialMemories,
      achievements: initialAchievements,
      timeline: initialTimeline,
      editingTaskId: null,
      
      // UI State
      theme: 'light',
      isAuthenticated: false,
      toasts: [],
      
      // Task Actions
      moveTask: (taskId, newStatus) => set((state) => ({
        tasks: state.tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t)
      })),
      
      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, { ...task, id: `t${Date.now()}` }]
      })),

      updateTask: (taskId, updates) => set((state) => ({
        tasks: state.tasks.map(t => t.id === taskId ? { ...t, ...updates } : t)
      })),
      
      deleteTask: (taskId) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== taskId)
      })),

      setEditingTaskId: (id) => set({ editingTaskId: id }),
      
      // Memory Actions
      addMemory: (memory) => set((state) => ({
        memories: [{ ...memory, id: `m${Date.now()}` }, ...state.memories]
      })),
      updateMemory: (id, updates) => set((state) => ({
        memories: state.memories.map(m => m.id === id ? { ...m, ...updates } : m)
      })),
      deleteMemory: (id) => set((state) => ({
        memories: state.memories.filter(m => m.id !== id)
      })),

      // Achievement Actions
      addAchievement: (achievement) => set((state) => ({
        achievements: [{ ...achievement, id: `a${Date.now()}` }, ...state.achievements]
      })),
      updateAchievement: (id, updates) => set((state) => ({
        achievements: state.achievements.map(a => a.id === id ? { ...a, ...updates } : a)
      })),
      deleteAchievement: (id) => set((state) => ({
        achievements: state.achievements.filter(a => a.id !== id)
      })),

      // Timeline Actions
      addTimelineEvent: (event) => set((state) => ({
        timeline: [{ ...event, id: `tl${Date.now()}` }, ...state.timeline]
      })),
      updateTimelineEvent: (id, updates) => set((state) => ({
        timeline: state.timeline.map(tl => tl.id === id ? { ...tl, ...updates } : tl)
      })),
      deleteTimelineEvent: (id) => set((state) => ({
        timeline: state.timeline.filter(tl => tl.id !== id)
      })),

      // UI Actions
      toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        return { theme: newTheme };
      }),

      authenticate: () => set({ isAuthenticated: true }),

      addToast: (toast) => set((state) => ({
        toasts: [...state.toasts, { ...toast, id: `toast-${Date.now()}` }]
      })),

      removeToast: (id) => set((state) => ({
        toasts: state.toasts.filter(t => t.id !== id)
      })),

      // Data Management
      exportData: () => {
        const state = get();
        const data = {
          tasks: state.tasks,
          memories: state.memories,
          achievements: state.achievements,
          timeline: state.timeline,
          exportedAt: new Date().toISOString(),
        };
        return JSON.stringify(data, null, 2);
      },

      importData: (json: string) => {
        try {
          const data = JSON.parse(json);
          if (data.tasks && data.memories && data.achievements && data.timeline) {
            set({
              tasks: data.tasks,
              memories: data.memories,
              achievements: data.achievements,
              timeline: data.timeline,
            });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },
    }),
    {
      name: 'nossa-jornada-storage',
      version: 1,
      migrate: (persistedState: unknown, version: number) => {
        const state = persistedState as Record<string, unknown>;
        if (version === 0) {
          // Migration from v0 to v1: add theme
          return { ...state, theme: 'light' };
        }
        return state;
      },
      partialize: (state) => ({
        tasks: state.tasks,
        memories: state.memories,
        achievements: state.achievements,
        timeline: state.timeline,
        theme: state.theme,
        // Note: isAuthenticated and toasts are NOT persisted (session-only)
      }),
    }
  )
);

// Apply theme on app start
const savedTheme = useStore.getState().theme;
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark');
}
