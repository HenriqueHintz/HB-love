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
    color: 'text-[#D4A574]',
    bg: 'bg-[#D4A574]/10',
  },
  memories: {
    icon: ImageIcon,
    title: 'Nenhuma memória ainda',
    description: 'Adicione fotos e vídeos dos seus momentos mais especiais!',
    color: 'text-[#C97B8B]',
    bg: 'bg-[#C97B8B]/10',
  },
  achievements: {
    icon: Trophy,
    title: 'Nenhuma conquista registrada',
    description: 'Registre os marcos e vitórias que vocês alcançaram juntos!',
    color: 'text-[#D4A574]',
    bg: 'bg-[#D4A574]/10',
  },
  timeline: {
    icon: Clock,
    title: 'Linha do tempo vazia',
    description: 'Adicione os eventos mais marcantes da sua história!',
    color: 'text-[#93B3D2]',
    bg: 'bg-[#93B3D2]/10',
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
      <h3 className="text-xl font-bold text-[#F0EDE8]/80 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        {searchQuery ? 'Nenhum resultado' : c.title}
      </h3>
      <p className="text-[#9A9590] max-w-sm text-sm leading-relaxed">
        {searchQuery
          ? `Não encontramos nada para "${searchQuery}". Tente outro termo.`
          : c.description}
      </p>
    </div>
  );
};
