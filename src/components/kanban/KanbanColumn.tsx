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

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ status, tasks, totalCount, isDropTarget, hasMore, onLoadMore }) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  const getColumnStyle = () => {
    const highlight = isDropTarget || isOver;
    switch (status) {
      case 'Planejado':
        return highlight
          ? 'bg-gray-100/80 dark:bg-gray-700/40 border-rose-400 ring-2 ring-rose-400/30'
          : 'bg-gray-50/60 dark:bg-gray-800/30 border-gray-200/50 dark:border-gray-700/50';
      case 'Em Progresso':
        return highlight
          ? 'bg-purple-100/80 dark:bg-purple-800/30 border-purple-400 ring-2 ring-purple-400/30'
          : 'bg-purple-50/60 dark:bg-purple-900/10 border-purple-200/50 dark:border-purple-800/30';
      case 'Concluído':
        return highlight
          ? 'bg-emerald-100/80 dark:bg-emerald-800/30 border-emerald-400 ring-2 ring-emerald-400/30'
          : 'bg-emerald-50/60 dark:bg-emerald-900/10 border-emerald-200/50 dark:border-emerald-800/30';
      default:
        return 'bg-white/50 dark:bg-gray-800/30 border-gray-200/50';
    }
  };

  return (
    <div className={`flex flex-col rounded-2xl p-4 border glass-panel h-full transition-all duration-200 ${getColumnStyle()}`}>
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="font-semibold text-gray-700 dark:text-gray-200">{status}</h3>
        <span className="bg-white/80 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
          {totalCount}
        </span>
      </div>
      
      <div ref={setNodeRef} className="flex-1 min-h-[120px]">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <AnimatePresence>
            {tasks.map(task => (
              <KanbanTask key={task.id} task={task} />
            ))}
          </AnimatePresence>
        </SortableContext>
        
        {/* Empty drop zone indicator */}
        {tasks.length === 0 && (
          <div className={`flex items-center justify-center h-24 border-2 border-dashed rounded-xl text-sm text-gray-400 dark:text-gray-500 transition-colors ${(isDropTarget || isOver) ? 'border-rose-300 text-rose-400 bg-rose-50/50 dark:bg-rose-900/10' : 'border-gray-200 dark:border-gray-700'}`}>
            Arraste para cá
          </div>
        )}
      </div>
      
      {hasMore && onLoadMore && (
        <button
          onClick={onLoadMore}
          className="mt-3 w-full flex items-center justify-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-rose-500 py-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
        >
          <ChevronDown size={14} />
          Ver mais ({totalCount - tasks.length} restantes)
        </button>
      )}
    </div>
  );
};
