import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto animate-pulse">
      <div className="h-28 bg-stone-200/60 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 rounded-3xl w-full"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-32 bg-stone-200/60 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 rounded-2xl"></div>
        <div className="h-32 bg-stone-200/60 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 rounded-2xl"></div>
        <div className="h-32 bg-stone-200/60 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 rounded-2xl"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64 bg-stone-200/60 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 rounded-2xl"></div>
        <div className="h-64 bg-stone-200/60 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 rounded-2xl"></div>
      </div>
    </div>
  );
};
