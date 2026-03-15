import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, DragOverEvent, MouseSensor, TouchSensor, useSensor, useSensors, closestCenter, pointerWithin, rectIntersection } from '@dnd-kit/core';
import { Task, TaskStatus } from '../../types';
import { KanbanColumn } from './KanbanColumn';
import { useStore } from '../../store/useStore';
import { KanbanTask } from './KanbanTask';
import { EmptyState } from '../ui/EmptyState';

const COLUMNS: TaskStatus[] = ['Planejado', 'Em Progresso', 'Concluído'];
const ITEMS_PER_PAGE = 8;

interface KanbanBoardProps {
  filterCategory: string;
  searchQuery?: string;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ filterCategory, searchQuery = '' }) => {
  const tasks = useStore(state => state.tasks);
  const moveTask = useStore(state => state.moveTask);
  const addToast = useStore(state => state.addToast);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [pages, setPages] = useState<Record<string, number>>({ 'Planejado': 1, 'Em Progresso': 1, 'Concluído': 1 });

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 8 } })
  );

  const filteredTasks = tasks.filter(t => {
    const matchCategory = filterCategory === 'TODAS' || t.category === filterCategory;
    const matchSearch = !searchQuery || t.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const getColumnTasks = (status: TaskStatus) => {
    return filteredTasks.filter(t => t.status === status);
  };

  const getPaginatedTasks = (status: TaskStatus) => {
    const all = getColumnTasks(status);
    const page = pages[status] || 1;
    return all.slice(0, page * ITEMS_PER_PAGE);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find(t => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (!over) { setActiveColumn(null); return; }
    
    const overId = over.id as string;
    
    // Check if over a column
    if (COLUMNS.includes(overId as TaskStatus)) {
      setActiveColumn(overId);
    } else {
      // Over a task - find which column that task belongs to
      const overTask = tasks.find(t => t.id === overId);
      if (overTask) setActiveColumn(overTask.status);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);
    setActiveColumn(null);
    
    if (!over) return;
    
    const taskId = active.id as string;
    const overId = over.id as string;
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    let targetStatus: TaskStatus | null = null;

    // Dropped on a column directly
    if (COLUMNS.includes(overId as TaskStatus)) {
      targetStatus = overId as TaskStatus;
    } else {
      // Dropped on another task - move to that task's column
      const overTask = tasks.find(t => t.id === overId);
      if (overTask) {
        targetStatus = overTask.status;
      }
    }

    if (targetStatus && targetStatus !== task.status) {
      moveTask(taskId, targetStatus);
      if (targetStatus === 'Concluído') {
        addToast({ message: `"${task.title}" concluída! 🎉`, type: 'success' });
      }
    }
  };

  // Custom collision detection: prefer columns, fall back to closest center
  const collisionDetection = (args: any) => {
    // First check pointer intersection with droppable areas (columns)
    const pointerCollisions = pointerWithin(args);
    if (pointerCollisions.length > 0) return pointerCollisions;
    
    // Fall back to rect intersection
    const rectCollisions = rectIntersection(args);
    if (rectCollisions.length > 0) return rectCollisions;
    
    // Final fallback
    return closestCenter(args);
  };

  const handleLoadMore = (status: TaskStatus) => {
    setPages(prev => ({ ...prev, [status]: (prev[status] || 1) + 1 }));
  };

  if (filteredTasks.length === 0 && searchQuery) {
    return <EmptyState type="tasks" searchQuery={searchQuery} />;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {COLUMNS.map(status => {
          const allTasks = getColumnTasks(status);
          const visibleTasks = getPaginatedTasks(status);
          const hasMore = visibleTasks.length < allTasks.length;

          return (
            <div key={status} className="min-h-[300px]">
              <KanbanColumn
                status={status}
                tasks={visibleTasks}
                totalCount={allTasks.length}
                isDropTarget={activeColumn === status}
                hasMore={hasMore}
                onLoadMore={() => handleLoadMore(status)}
              />
            </div>
          );
        })}
      </div>
      
      <DragOverlay dropAnimation={null}>
        {activeTask ? (
          <div className="opacity-90 rotate-2 scale-105">
            <KanbanTask task={activeTask} isDragOverlay />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
