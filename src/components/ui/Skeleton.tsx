import React from 'react';
import { cn } from '../../utils/cn';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div
    className={cn(
      'animate-pulse rounded-xl bg-gray-200/60 dark:bg-gray-700/40',
      className
    )}
  />
);

export const CardSkeleton: React.FC = () => (
  <div className="glass-panel rounded-2xl p-6 space-y-4">
    <Skeleton className="h-40 w-full rounded-xl" />
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-5 w-3/4" />
    <Skeleton className="h-4 w-full" />
  </div>
);

export const KanbanSkeleton: React.FC = () => (
  <div className="flex flex-col lg:flex-row gap-6 w-full">
    {[1, 2, 3].map((col) => (
      <div key={col} className="flex-1 glass-panel rounded-2xl p-4 space-y-3">
        <div className="flex justify-between items-center mb-4 px-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-6 w-8 rounded-full" />
        </div>
        {[1, 2, 3].map((task) => (
          <div key={task} className="bg-white/90 dark:bg-gray-800/90 rounded-xl p-4 space-y-2">
            <Skeleton className="h-3 w-20 rounded-md" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    ))}
  </div>
);

export const PageSkeleton: React.FC = () => (
  <div className="space-y-8">
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
      <Skeleton className="h-10 w-36 rounded-xl" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  </div>
);
