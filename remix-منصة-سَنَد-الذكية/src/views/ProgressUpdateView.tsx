import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp, Send, History, Sliders
} from 'lucide-react';

export const ProgressUpdateView: React.FC = () => {
  const {
    tasks,
    currentMember,
    teamMembers,
    users,
    progressUpdates,
    updateTaskProgress,
    taskAssignments
  } = useApp();

  // Tasks assigned to current user or all tasks
  const myAssignments = taskAssignments.filter(ta => ta.team_member_id === currentMember?.team_member_id);
  const myTaskIds = myAssignments.map(ta => ta.task_id);
  const myTasks = tasks.filter(t => myTaskIds.includes(t.task_id));
  const availableTasks = myTasks.length > 0 ? myTasks : tasks;

  const [selectedTaskId, setSelectedTaskId] = useState<string>(availableTasks[0]?.task_id || '');
  const [percent, setPercent] = useState<number>(50);
  const [note, setNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleProgressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTaskId) return;

    try {
      setIsSubmitting(true);
      await updateTaskProgress(selectedTaskId, percent, note);
      setNote('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Header Banner */}
      <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 qatt-corner-accent">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#3D6346] dark:text-emerald-400 mb-1 font-tajawal">
            <TrendingUp className="w-4 h-4" />
            <span>تسجيل المخرجات ومتابعة الإنجاز</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 font-tajawal">
            تحديث تقدم المهمة والتاريخ الزمني (Progress Updates)
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            سجّل نسبة الإنجاز مع كتابة ملاحظات الشرح لكي تظهر لجميع أفراد الفريق والقائد
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Update Form (1 col) */}
        <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-5">
          <div className="border-b border-stone-200/80 dark:border-stone-800 pb-3">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-tajawal">نموذج التحديث السريع</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">اختر المهمة المسندة وضبط الشريط</p>
          </div>

          <form onSubmit={handleProgressSubmit} className="space-y-4">

            {/* Select Task */}
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1 font-tajawal">اختر المهمة</label>
              <select
                value={selectedTaskId}
                onChange={e => setSelectedTaskId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:outline-none font-bold font-tajawal"
              >
                {availableTasks.map(tsk => (
                  <option key={tsk.task_id} value={tsk.task_id}>
                    {tsk.title} ({tsk.status === 'done' ? 'مكتملة' : 'جاري العمل'})
                  </option>
                ))}
              </select>
            </div>

            {/* Progress Percent Slider (0-100%) */}
            <div className="space-y-2 bg-stone-50/80 dark:bg-stone-800/80 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-700/80">
              <div className="flex items-center justify-between text-xs font-bold font-tajawal">
                <span className="text-stone-800 dark:text-stone-200 flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-[#3D6346] dark:text-emerald-400" />
                  نسبة الإنجاز (Progress %):
                </span>
                <span className="text-base text-[#3D6346] dark:text-emerald-400 font-black font-mono">{percent}%</span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={percent}
                onChange={e => setPercent(Number(e.target.value))}
                className="w-full h-2.5 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#3D6346] dark:accent-emerald-500"
              />

              <div className="flex justify-between text-[10px] text-stone-400 dark:text-stone-500 font-bold pt-1 font-mono">
                <span>0% (لم تبدأ)</span>
                <span>50% (نصف الطريق)</span>
                <span>100% (مكتملة بالكامل)</span>
              </div>
            </div>

            {/* Note Textarea */}
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1 font-tajawal">ملاحظات والتفاصيل (Note)</label>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="مثال: تم بناء وتدقيق الملفات وإجراء اختبار الاستجابة لجميع الشاشات..."
                rows={4}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#3D6346]"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#3D6346] hover:bg-[#2E4D36] text-white font-bold rounded-full text-xs flex items-center justify-center gap-2 shadow-xs transition-all disabled:opacity-50 font-tajawal"
            >
              <Send className="w-4 h-4 text-emerald-100" />
              <span>تسجيل التحديث ورسالة التقدم</span>
            </button>

          </form>
        </div>

        {/* Timeline of Updates (2 cols) */}
        <div className="lg:col-span-2 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-[#3D6346] dark:text-emerald-400" />
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-tajawal">سجل التحديثات التاريخية (Timeline)</h3>
            </div>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-bold font-mono">{progressUpdates.length} تحديث مسجّل</span>
          </div>

          <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
            {progressUpdates.map(upd => {
              const task = tasks.find(t => t.task_id === upd.task_id);
              const member = teamMembers.find(m => m.team_member_id === upd.member_id);
              const user = users.find(u => u.user_id === member?.user_id);

              return (
                <div
                  key={upd.update_id}
                  className="bg-stone-50/80 dark:bg-stone-800/80 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <img src={user?.avatar} className="w-8 h-8 rounded-full object-cover ring-1 ring-stone-200 dark:ring-stone-700" />
                      <div>
                        <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100 font-tajawal">{user?.name || 'عضو الفريق'}</h4>
                        <span className="text-[10px] text-stone-500 dark:text-stone-400 block font-tajawal">المهمة: {task?.title}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border font-mono ${
                        upd.progress_percent === 100
                          ? 'bg-[#E9F1EA] dark:bg-[#1C3022] text-[#2E4D36] dark:text-emerald-300 border-[#3D6346]/20 dark:border-[#3D6346]/40'
                          : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60'
                      }`}>
                        الإنجاز: {upd.progress_percent}%
                      </span>
                      <span className="text-[10px] text-stone-400 dark:text-stone-500 dir-ltr font-mono">
                        {new Date(upd.updated_at).toLocaleDateString('ar-SA')}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-900 p-3 rounded-xl border border-stone-200/80 dark:border-stone-800 leading-relaxed font-normal">
                    💬 {upd.note}
                  </p>
                </div>
              );
            })}

            {progressUpdates.length === 0 && (
              <p className="text-center text-xs text-stone-400 dark:text-stone-500 py-12">لا يوجد سجل تحديثات حتى الآن.</p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
