import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task, TaskStatus } from '../../types';
import { GripVertical, Video, AlignLeft, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { motion } from 'framer-motion';
import { getCategoryColor } from '../../utils/categoryColors';

const STATUS_ORDER: TaskStatus[] = ['Planejado', 'Em Progresso', 'Concluído'];
const STATUS_LABELS: Record<string, string> = {
  'Planejado': 'Iniciar',
  'Em Progresso': 'Concluir',
};
const PREV_LABELS: Record<string, string> = {
  'Em Progresso': 'Voltar',
  'Concluído': 'Reabrir',
};

interface KanbanTaskProps {
  task: Task;
  isDragOverlay?: boolean;
}

export const KanbanTask: React.FC<KanbanTaskProps> = ({ task, isDragOverlay }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  const setEditingTaskId = useStore(state => state.setEditingTaskId);
  const moveTask = useStore(state => state.moveTask);
  const addToast = useStore(state => state.addToast);

  const currentIndex = STATUS_ORDER.indexOf(task.status);
  const canAdvance = currentIndex < STATUS_ORDER.length - 1;
  const canGoBack = currentIndex > 0;

  const handleAdvance = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canAdvance) return;
    const nextStatus = STATUS_ORDER[currentIndex + 1];
    moveTask(task.id, nextStatus);
    if (nextStatus === 'Concluído') {
      addToast({ message: `"${task.title}" concluída! 🎉`, type: 'success' });
    }
  };

  const handleGoBack = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canGoBack) return;
    moveTask(task.id, STATUS_ORDER[currentIndex - 1]);
  };

  const style = isDragOverlay ? {} : {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  const STATUS_COLORS: Record<string, { bg: string; border: string }> = {
    'Planejado': { bg: 'rgba(219, 234, 254, 0.95)', border: 'rgba(96, 165, 250, 0.5)' },
    'Em Progresso': { bg: 'rgba(254, 243, 199, 0.95)', border: 'rgba(251, 191, 36, 0.5)' },
    'Concluído': { bg: 'rgba(209, 250, 229, 0.95)', border: 'rgba(52, 211, 153, 0.5)' },
  };
  const DARK_STATUS_COLORS: Record<string, { bg: string; border: string }> = {
    'Planejado': { bg: 'rgba(30, 58, 138, 0.5)', border: 'rgba(96, 165, 250, 0.4)' },
    'Em Progresso': { bg: 'rgba(120, 80, 0, 0.45)', border: 'rgba(251, 191, 36, 0.4)' },
    'Concluído': { bg: 'rgba(6, 78, 59, 0.5)', border: 'rgba(52, 211, 153, 0.4)' },
  };
  const isDark = document.documentElement.classList.contains('dark');
  const statusStyle = (isDark ? DARK_STATUS_COLORS : STATUS_COLORS)[task.status] || STATUS_COLORS['Planejado'];

  return (
    <motion.div
      initial={isDragOverlay ? false : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: isDragging && !isDragOverlay ? 0.4 : 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
      ref={isDragOverlay ? undefined : setNodeRef}
      style={{
        ...style,
        backgroundColor: statusStyle.bg,
        borderColor: statusStyle.border,
        transition: `background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.2s ease, ${style.transition || ''}`,
      }}
      className={`group relative backdrop-blur-sm border shadow-sm rounded-xl p-3.5 mb-2.5 hover:shadow-md cursor-pointer border-l-4 ${getCategoryColor(task.category).border} ${isDragging && !isDragOverlay ? 'ring-2 ring-rose-400/50' : ''} ${isDragOverlay ? 'shadow-xl' : ''}`}
      onClick={() => !isDragOverlay && setEditingTaskId(task.id)}
    >
      {task.mediaUrl && (
        <div className="w-full h-28 mb-2.5 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
          {task.mediaType === 'video' ? (
            <>
              <video src={task.mediaUrl} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20"><Video className="text-white drop-shadow-md" size={24} /></div>
            </>
          ) : (
            <img src={task.mediaUrl} alt={task.title} className="w-full h-full object-cover" />
          )}
        </div>
      )}

      <div className="flex items-start gap-2">
        <button
          {...(isDragOverlay ? {} : attributes)}
          {...(isDragOverlay ? {} : listeners)}
          className="mt-0.5 text-gray-400 hover:text-rose-500 cursor-grab active:cursor-grabbing touch-none"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical size={16} />
        </button>
        <div className="flex-1 min-w-0">
          <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md mb-1.5 truncate max-w-full ${getCategoryColor(task.category).text} bg-current/10`}
            style={{ backgroundColor: getCategoryColor(task.category).light + '20' }}
          >
            {task.category}
          </span>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-snug line-clamp-2">{task.title}</p>
          {task.description && (
            <div className="mt-1.5 text-gray-400"><AlignLeft size={13} /></div>
          )}
        </div>
      </div>

      {/* Progress buttons */}
      {!isDragOverlay && (
        <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-700/50">
          {canGoBack && (
            <button
              onClick={handleGoBack}
              className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg transition-colors cursor-pointer"
              title={`Mover para ${STATUS_ORDER[currentIndex - 1]}`}
            >
              <ChevronLeft size={12} />
              {PREV_LABELS[task.status]}
            </button>
          )}
          <div className="flex-1" />
          {canAdvance ? (
            <button
              onClick={handleAdvance}
              className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                currentIndex === 1
                  ? 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30'
                  : 'text-rose-500 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/30'
              }`}
              title={`Mover para ${STATUS_ORDER[currentIndex + 1]}`}
            >
              {STATUS_LABELS[task.status]}
              {currentIndex === 1 ? <Check size={12} /> : <ChevronRight size={12} />}
            </button>
          ) : (
            <span className="flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-emerald-500 dark:text-emerald-400">
              <Check size={12} /> Concluída
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};
