import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task, TaskStatus } from '../../types';
import { KanbanTask } from './KanbanTask';
import { AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  totalCount: number;
  isDropTarget?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

const COL_ACCENTS: Record<string, { dot: string; text: string; badge: string }> = {
  'Planejado': { dot: 'bg-[#D4A574]', text: 'text-[#D4A574]', badge: 'bg-[#D4A574]/10 text-[#D4A574]' },
  'Em Progresso': { dot: 'bg-[#93B3D2]', text: 'text-[#93B3D2]', badge: 'bg-[#93B3D2]/10 text-[#93B3D2]' },
  'Concluído': { dot: 'bg-[#8BB48C]', text: 'text-[#8BB48C]', badge: 'bg-[#8BB48C]/10 text-[#8BB48C]' },
};

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ status, tasks, totalCount, isDropTarget, hasMore, onLoadMore }) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const a = COL_ACCENTS[status] || COL_ACCENTS['Planejado'];
  const highlight = isDropTarget || isOver;

  return (
    <div className={`flex flex-col rounded-2xl p-4 h-full transition-all duration-200 ${highlight ? 'bg-[#D4A574]/5 border border-[#D4A574]/20 ring-1 ring-[#D4A574]/10' : 'bg-app-surface/50 border border-app-border-light'}`}>
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2.5">
          <div className={`w-2 h-2 rounded-full ${a.dot}`} />
          <h3 className={`font-semibold text-sm ${a.text}`}>{status}</h3>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${a.badge}`}>{totalCount}</span>
      </div>
      
      <div ref={setNodeRef} className="flex-1 min-h-[120px]">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <AnimatePresence>
            {tasks.map(task => <KanbanTask key={task.id} task={task} />)}
          </AnimatePresence>
        </SortableContext>
        
        {tasks.length === 0 && (
          <div className={`flex items-center justify-center h-24 border-2 border-dashed rounded-xl text-sm transition-colors ${highlight ? 'border-[#D4A574]/30 text-[#D4A574]/50' : 'border-app-border-light text-app-text-muted'}`}>
            Arraste para cá
          </div>
        )}
      </div>
      
      {hasMore && onLoadMore && (
        <button onClick={onLoadMore} className="mt-3 w-full flex items-center justify-center gap-1 text-xs font-medium text-app-text-muted hover:text-app-text-secondary py-2 rounded-xl hover:bg-app-border-light transition-colors cursor-pointer">
          <ChevronDown size={14} />Ver mais ({totalCount - tasks.length} restantes)
        </button>
      )}
    </div>
  );
};
