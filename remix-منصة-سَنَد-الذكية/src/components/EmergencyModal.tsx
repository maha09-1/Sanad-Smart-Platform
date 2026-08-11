import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, ShieldAlert, Sparkles, CheckCircle2, X, RefreshCw, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  const { showToast, refreshData } = useApp();
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  if (!isOpen) return null;

  const handleApplyEmergency = async () => {
    setIsApplying(true);
    setTimeout(async () => {
      setIsApplying(false);
      setApplied(true);
      await refreshData();
      showToast(
        "تم تطبيق التوزيع الطارئ بنجاح ⚡",
        "تم نقل مهمة الأمان للضوء ومهمة التوثيق لريم لتفادي تأخير التسليم.",
        "success"
      );
    }, 1200);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg m-auto bg-white dark:bg-stone-900 border border-rose-200 dark:border-rose-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-stone-800 dark:text-stone-200 space-y-6">

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="إغلاق النافذة"
          className="absolute top-4 left-4 p-2 text-stone-400 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">

          {/* Header Badge & Title */}
          <div className="flex items-center gap-3.5 pr-2">
            <div className="w-12 h-12 rounded-2xl bg-rose-700 text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldAlert className="w-6 h-6 text-rose-100" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 text-xs font-bold px-3 py-1 rounded-full border border-rose-200 dark:border-rose-800/80">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span className="font-tajawal">بروتوكول الطوارئ الأكاديمي 🚨</span>
              </div>
              <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 mt-1 font-tajawal">أنقذنا يا سند!</h3>
            </div>
          </div>

          {/* Core SOS Message Box */}
          <div className="bg-stone-50 dark:bg-stone-800/80 border border-rose-200/80 dark:border-rose-900/50 rounded-2xl p-5 space-y-3">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#3D6346] dark:text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-stone-700 dark:text-stone-200 text-sm leading-relaxed font-semibold">
                سند يحلل الوضع.. تم كشف تأخير في مرحلتين، ونقترح إعادة توزيع مهمتين على الأعضاء المتفرغين لتفادي التأخير قبل موعد التسليم.
              </p>
            </div>

            {/* Detailed Redistribution Breakdown */}
            <div className="mt-3 pt-3 border-t border-stone-200/80 dark:border-stone-700/80 space-y-2 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 bg-white dark:bg-stone-900 p-3 rounded-xl border border-stone-200/80 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
                  <span className="text-stone-800 dark:text-stone-200 font-bold font-tajawal">مهمة اختباري الأمان والربط</span>
                </div>
                <span className="text-[#2E4D36] dark:text-emerald-300 font-bold font-tajawal text-xs self-end sm:self-auto">
                  ← إعادة إسناد للضوء (تفرّغ 100%)
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 bg-white dark:bg-stone-900 p-3 rounded-xl border border-stone-200/80 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
                  <span className="text-stone-800 dark:text-stone-200 font-bold font-tajawal">توثيق المخططات الأكاديمية</span>
                </div>
                <span className="text-[#2E4D36] dark:text-emerald-300 font-bold font-tajawal text-xs self-end sm:self-auto">
                  ← إعادة إسناد لريم (متوفرة)
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 text-stone-700 dark:text-stone-300 font-bold text-xs rounded-full transition-all font-tajawal"
            >
              إلغاء الإجراء
            </button>

            <button
              type="button"
              onClick={handleApplyEmergency}
              disabled={isApplying || applied}
              className={`w-full sm:w-auto px-6 py-2.5 ${
                applied
                  ? 'bg-[#3D6346] text-white'
                  : 'bg-rose-700 hover:bg-rose-800 text-white'
              } font-bold text-xs rounded-full shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-80 font-tajawal`}
            >
              {isApplying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>جاري تطبيق التعديل السريع...</span>
                </>
              ) : applied ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تم التطبيق وتفادي التأخير!</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-rose-200" />
                  <span>تطبيق التوزيع الطارئ ⚡</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>,
    document.body
  );
};
