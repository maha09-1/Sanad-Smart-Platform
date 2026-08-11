import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, ArrowLeft, ShieldCheck, CheckCircle2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SanadLogo } from './SanadLogo';

export const SanadSplashScreen: React.FC = () => {
  const { setActivePage } = useApp();
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    return !sessionStorage.getItem('sanad_splash_seen');
  });

  const handleStartJourney = (targetPage: string = 'ai-ideas') => {
    sessionStorage.setItem('sanad_splash_seen', 'true');
    setIsVisible(false);
    setActivePage(targetPage);
  };

  const handleDismiss = () => {
    sessionStorage.setItem('sanad_splash_seen', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl m-auto bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 rounded-3xl p-6 sm:p-10 shadow-2xl border border-stone-200 dark:border-stone-800 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 left-4 p-2 text-stone-400 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10 space-y-6 text-center sm:text-right">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 bg-[#E9F1EA] dark:bg-[#1C3022] text-[#2E4D36] dark:text-emerald-300 text-xs font-bold px-4 py-1.5 rounded-full border border-[#3D6346]/20 dark:border-[#3D6346]/40">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3D6346] dark:bg-emerald-500"></span>
            <span className="font-tajawal">سَنَد متصل الآن ومستعد للعمل 🟢</span>
          </div>

          {/* Icon & Title */}
          <div className="space-y-3">
            <div className="mx-auto sm:mr-0">
              <SanadLogo size="lg" showTagline={false} />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-stone-900 dark:text-stone-100 font-tajawal">
              أهلاً بك في <span className="text-[#3D6346] dark:text-emerald-400">منصة سَنَد الذكية</span>
            </h2>

            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base font-medium leading-relaxed max-w-xl">
              إدارة وتوجيه مشاريع التخرج بأسلوب هادئ ومريح مستوحى من الأصالة السعودية.. يحلل مهارات الفريق، يقترح الأفكار، ويوزع المهام بإنصاف مع بروتوكول طوارئ ومتابعة الإنجاز لحظة بلحظة.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-stone-50 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 p-4 rounded-2xl space-y-1">
              <Sparkles className="w-4 h-4 text-[#3D6346] dark:text-emerald-400 mx-auto sm:mr-0" />
              <p className="font-bold text-stone-900 dark:text-stone-100 font-tajawal">مقترح أفكار ذكي</p>
              <p className="text-stone-500 dark:text-stone-400 text-[11px]">اقتراحات مخصصة بناءً على مهارات الطلاب</p>
            </div>
            <div className="bg-stone-50 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 p-4 rounded-2xl space-y-1">
              <ShieldCheck className="w-4 h-4 text-[#3D6346] dark:text-emerald-400 mx-auto sm:mr-0" />
              <p className="font-bold text-stone-900 dark:text-stone-100 font-tajawal">توزيع عادل للمهام</p>
              <p className="text-stone-500 dark:text-stone-400 text-[11px]">مصفوفة Skill Matrix لضمان التكافئ</p>
            </div>
            <div className="bg-stone-50 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 p-4 rounded-2xl space-y-1">
              <CheckCircle2 className="w-4 h-4 text-[#3D6346] dark:text-emerald-400 mx-auto sm:mr-0" />
              <p className="font-bold text-stone-900 dark:text-stone-100 font-tajawal">تتبع الإنجاز 100%</p>
              <p className="text-stone-500 dark:text-stone-400 text-[11px]">لوحة Kanban ومتابعة دورية للتأخير</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-start gap-3">
            <button
              onClick={() => handleStartJourney('ai-ideas')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#3D6346] hover:bg-[#2E4D36] text-white font-bold text-sm rounded-full shadow-xs transition-all flex items-center justify-center gap-3 font-tajawal group"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>ابدأ رحلة التخرج مع سند ✨</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleStartJourney('task-assignment')}
              className="w-full sm:w-auto px-6 py-3.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 text-stone-700 dark:text-stone-300 font-bold text-xs rounded-full transition-all font-tajawal"
            >
              عرض توزيع المهام العادل
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
