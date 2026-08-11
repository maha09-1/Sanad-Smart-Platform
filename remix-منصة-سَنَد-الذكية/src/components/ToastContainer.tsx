import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-3 max-w-md w-full">
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-[#3D6346] dark:text-emerald-400 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0" />,
          error: <XCircle className="w-5 h-5 text-rose-700 dark:text-rose-400 shrink-0" />,
          info: <Info className="w-5 h-5 text-stone-700 dark:text-stone-300 shrink-0" />
        };

        const borders = {
          success: 'border-[#3D6346]/30 dark:border-emerald-800/50 bg-white/95 dark:bg-stone-900/95 text-stone-800 dark:text-stone-200',
          warning: 'border-amber-300 dark:border-amber-800/50 bg-white/95 dark:bg-stone-900/95 text-stone-800 dark:text-stone-200',
          error: 'border-rose-300 dark:border-rose-800/50 bg-white/95 dark:bg-stone-900/95 text-stone-800 dark:text-stone-200',
          info: 'border-stone-300 dark:border-stone-700 bg-white/95 dark:bg-stone-900/95 text-stone-800 dark:text-stone-200'
        };

        return (
          <div
            key={toast.id}
            className={`flex items-start gap-3 p-4 rounded-2xl border shadow-lg backdrop-blur-md transition-all duration-300 ${borders[toast.type]}`}
          >
            {icons[toast.type]}
            <div className="flex-1 text-sm">
              <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-0.5 font-tajawal">{toast.title}</h4>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed text-xs">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
