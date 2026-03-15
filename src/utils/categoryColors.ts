// Category color definitions used across Kanban cards and progress bars
export const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; light: string; dark: string }> = {
  'ESPIRITUAL & BEM-ESTAR': { bg: 'bg-indigo-500', text: 'text-indigo-700 dark:text-indigo-300', border: 'border-indigo-300 dark:border-indigo-700', light: '#818cf8', dark: '#6366f1' },
  'SAÚDE & ATIVIDADE FÍSICA': { bg: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-300 dark:border-emerald-700', light: '#34d399', dark: '#10b981' },
  'LAZER & EXPERIÊNCIAS': { bg: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-300 dark:border-amber-700', light: '#fbbf24', dark: '#f59e0b' },
  'DATAS & CELEBRAÇÕES': { bg: 'bg-pink-500', text: 'text-pink-700 dark:text-pink-300', border: 'border-pink-300 dark:border-pink-700', light: '#f472b6', dark: '#ec4899' },
  'FINANÇAS & FUTURO': { bg: 'bg-cyan-500', text: 'text-cyan-700 dark:text-cyan-300', border: 'border-cyan-300 dark:border-cyan-700', light: '#22d3ee', dark: '#06b6d4' },
  'COMUNICAÇÃO & CONEXÃO': { bg: 'bg-violet-500', text: 'text-violet-700 dark:text-violet-300', border: 'border-violet-300 dark:border-violet-700', light: '#a78bfa', dark: '#8b5cf6' },
  'PLANEJAMENTO DE VIAGEM': { bg: 'bg-blue-500', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-300 dark:border-blue-700', light: '#60a5fa', dark: '#3b82f6' },
  'GERAL': { bg: 'bg-gray-500', text: 'text-gray-700 dark:text-gray-300', border: 'border-gray-300 dark:border-gray-700', light: '#9ca3af', dark: '#6b7280' },
};

export const getCategoryColor = (category: string) => {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS['GERAL'];
};
