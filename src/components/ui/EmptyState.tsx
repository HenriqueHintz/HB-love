import React from 'react';
import { Heart, Image as ImageIcon, Trophy, Clock } from 'lucide-react';

interface EmptyStateProps {
  type: 'tasks' | 'memories' | 'achievements' | 'timeline';
  searchQuery?: string;
}

const config = {
  tasks: {
    icon: Heart,
    title: 'Nenhuma meta encontrada',
    description: 'Comece criando uma nova meta para acompanhar seus objetivos juntos!',
    color: 'text-rose-400',
    bg: 'bg-rose-100 dark:bg-rose-900/30',
  },
  memories: {
    icon: ImageIcon,
    title: 'Nenhuma memória ainda',
    description: 'Adicione fotos e vídeos dos seus momentos mais especiais!',
    color: 'text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-900/30',
  },
  achievements: {
    icon: Trophy,
    title: 'Nenhuma conquista registrada',
    description: 'Registre os marcos e vitórias que vocês alcançaram juntos!',
    color: 'text-amber-400',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
  },
  timeline: {
    icon: Clock,
    title: 'Linha do tempo vazia',
    description: 'Adicione os eventos mais marcantes da sua história!',
    color: 'text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
  },
};

export const EmptyState: React.FC<EmptyStateProps> = ({ type, searchQuery }) => {
  const c = config[type];
  const Icon = c.icon;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
      <div className={`w-20 h-20 rounded-full ${c.bg} flex items-center justify-center mb-6`}>
        <Icon size={36} className={c.color} />
      </div>
      <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-2">
        {searchQuery ? 'Nenhum resultado' : c.title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm text-sm leading-relaxed">
        {searchQuery
          ? `Não encontramos nada para "${searchQuery}". Tente outro termo.`
          : c.description}
      </p>
    </div>
  );
};
