import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task, TaskStatus } from '../../types';
import { GripVertical, Video, AlignLeft, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { motion } from 'framer-motion';

const STATUS_ORDER: TaskStatus[] = ['Planejado', 'Em Progresso', 'Concluído'];
const STATUS_LABELS: Record<string, string> = { 'Planejado': 'Iniciar', 'Em Progresso': 'Concluir' };
const PREV_LABELS: Record<string, string> = { 'Em Progresso': 'Voltar', 'Concluído': 'Reabrir' };

// Noir status — thin left border accent, not full background
const STATUS_STYLES: Record<string, { border: string; accent: string; badge: string }> = {
  'Planejado': {
    border: 'border-l-[#D4A574]/40',
    accent: 'text-[#D4A574]',
    badge: 'bg-[#D4A574]/10 text-[#D4A574]',
  },
  'Em Progresso': {
    border: 'border-l-[#93B3D2]/40',
    accent: 'text-[#93B3D2]',
    badge: 'bg-[#93B3D2]/10 text-[#93B3D2]',
  },
  'Concluído': {
    border: 'border-l-[#8BB48C]/40',
    accent: 'text-[#8BB48C]',
    badge: 'bg-[#8BB48C]/10 text-[#8BB48C]',
  },
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
    if (nextStatus === 'Concluído') addToast({ message: `"${task.title}" concluída! 🎉`, type: 'success' });
  };

  const handleGoBack = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canGoBack) return;
    moveTask(task.id, STATUS_ORDER[currentIndex - 1]);
  };

  const style = isDragOverlay ? {} : { transform: CSS.Transform.toString(transform), transition, zIndex: isDragging ? 10 : 1 };
  const s = STATUS_STYLES[task.status] || STATUS_STYLES['Planejado'];

  return (
    <motion.div
      initial={isDragOverlay ? false : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: isDragging && !isDragOverlay ? 0.4 : 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
      ref={isDragOverlay ? undefined : setNodeRef}
      style={style}
      className={`group relative bg-app-surface/80 border border-app-border-light border-l-2 ${s.border} rounded-xl p-3.5 mb-2.5 cursor-pointer transition-all duration-200 hover:bg-app-surface-light hover:border-app-border hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)] ${isDragging && !isDragOverlay ? 'ring-2 ring-[#D4A574]/30' : ''} ${isDragOverlay ? 'shadow-2xl' : ''}`}
      onClick={() => !isDragOverlay && setEditingTaskId(task.id)}
    >
      {task.mediaUrl && (
        <div className="media-thumbnail mb-2.5 bg-black/40" style={{ aspectRatio: '16 / 9' }}>
          {task.mediaType === 'video' ? (
            <>
              <video src={task.mediaUrl} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30"><Video className="text-white drop-shadow-md" size={24} /></div>
            </>
          ) : (
            <img src={task.mediaUrl} alt={task.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          )}
        </div>
      )}

      <div className="flex items-start gap-2">
        <button
          {...(isDragOverlay ? {} : attributes)}
          {...(isDragOverlay ? {} : listeners)}
          className="mt-0.5 text-white/15 hover:text-white/40 cursor-grab active:cursor-grabbing touch-none"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical size={16} />
        </button>
        <div className="flex-1 min-w-0">
          <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md mb-1.5 truncate max-w-full ${s.badge}`}>
            {task.category}
          </span>
          <p className="text-sm font-medium text-app-text leading-snug line-clamp-2">{task.title}</p>
          {task.description && <div className="mt-1.5 text-app-text-muted"><AlignLeft size={13} /></div>}
        </div>
      </div>

      {!isDragOverlay && (
        <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-app-border-light">
          {canGoBack && (
            <button onClick={handleGoBack} className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-app-text-muted hover:text-app-text-secondary hover:bg-app-border-light rounded-lg transition-colors cursor-pointer">
              <ChevronLeft size={12} />{PREV_LABELS[task.status]}
            </button>
          )}
          <div className="flex-1" />
          {canAdvance ? (
            <button onClick={handleAdvance} className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${s.accent} hover:bg-app-border-light`}>
              {STATUS_LABELS[task.status]}{currentIndex === 1 ? <Check size={12} /> : <ChevronRight size={12} />}
            </button>
          ) : (
            <span className="flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-[#8BB48C]"><Check size={12} /> Concluída</span>
          )}
        </div>
      )}
    </motion.div>
  );
};
