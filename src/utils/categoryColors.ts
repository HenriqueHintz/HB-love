// Category color definitions — neutralized to work with image-driven design
export const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; light: string; dark: string }> = {
  'ESPIRITUAL & BEM-ESTAR': { bg: 'bg-white/20', text: 'text-white/70', border: 'border-white/10', light: 'rgba(255,255,255,0.15)', dark: 'rgba(255,255,255,0.1)' },
  'SAÚDE & ATIVIDADE FÍSICA': { bg: 'bg-white/20', text: 'text-white/70', border: 'border-white/10', light: 'rgba(255,255,255,0.15)', dark: 'rgba(255,255,255,0.1)' },
  'LAZER & EXPERIÊNCIAS': { bg: 'bg-white/20', text: 'text-white/70', border: 'border-white/10', light: 'rgba(255,255,255,0.15)', dark: 'rgba(255,255,255,0.1)' },
  'DATAS & CELEBRAÇÕES': { bg: 'bg-white/20', text: 'text-white/70', border: 'border-white/10', light: 'rgba(255,255,255,0.15)', dark: 'rgba(255,255,255,0.1)' },
  'FINANÇAS & FUTURO': { bg: 'bg-white/20', text: 'text-white/70', border: 'border-white/10', light: 'rgba(255,255,255,0.15)', dark: 'rgba(255,255,255,0.1)' },
  'COMUNICAÇÃO & CONEXÃO': { bg: 'bg-white/20', text: 'text-white/70', border: 'border-white/10', light: 'rgba(255,255,255,0.15)', dark: 'rgba(255,255,255,0.1)' },
  'PLANEJAMENTO DE VIAGEM': { bg: 'bg-white/20', text: 'text-white/70', border: 'border-white/10', light: 'rgba(255,255,255,0.15)', dark: 'rgba(255,255,255,0.1)' },
  'GERAL': { bg: 'bg-white/20', text: 'text-white/70', border: 'border-white/10', light: 'rgba(255,255,255,0.15)', dark: 'rgba(255,255,255,0.1)' },
};

export const getCategoryColor = (category: string) => {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS['GERAL'];
};
