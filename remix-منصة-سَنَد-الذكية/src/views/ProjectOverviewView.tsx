import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Layers, Calendar, CheckCircle2, Clock, Circle,
  Kanban
} from 'lucide-react';

export const ProjectOverviewView: React.FC = () => {
  const { currentProject, currentTeam, phases, tasks, setActivePage } = useApp();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Project Banner & Overall Progress */}
      <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200/80 dark:border-stone-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#2E4D36] dark:text-emerald-300 bg-[#E9F1EA] dark:bg-[#2E4D36]/30 px-3.5 py-1.5 rounded-full border border-[#3D6346]/20 dark:border-emerald-800/40 font-tajawal">
                مشروع التخرج المعتمد
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                الفريق: {currentTeam?.team_name}
              </span>
            </div>
            <h2 className="text-2xl font-black text-stone-900 dark:text-stone-100 font-tajawal">
              {currentProject?.name || 'المدير الذكي لمشاريع التخرج'}
            </h2>
            <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400 pt-1 font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#3D6346] dark:text-emerald-400" />
                تاريخ البدء: {currentProject?.start_date || '2026-02-01'}
              </span>
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-[#3D6346] dark:text-emerald-400" />
                عدد المراحل: {phases.length} مراحل
              </span>
            </div>
          </div>

          <button
            onClick={() => setActivePage('kanban')}
            className="bg-[#3D6346] hover:bg-[#2E4D36] text-white font-bold px-5 py-2.5 rounded-full text-xs flex items-center gap-2 shadow-xs self-start md:self-auto font-tajawal"
          >
            <Kanban className="w-4 h-4 text-emerald-100" />
            <span>عرض المهام في لوحة Kanban</span>
          </button>
        </div>

        {/* General Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold font-tajawal">
            <span className="text-stone-800 dark:text-stone-200">نسبة التقدم الإجمالية للمشروع:</span>
            <span className="text-[#3D6346] dark:text-emerald-400 text-sm font-black font-mono">{progressPercent}%</span>
          </div>
          <div className="w-full h-3.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden p-0.5 border border-stone-200 dark:border-stone-700">
            <div
              className="h-full bg-[#3D6346] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-stone-400 dark:text-stone-500 text-left dir-ltr font-mono">
            {completedTasks} / {totalTasks} Tasks Completed
          </p>
        </div>
      </div>

      {/* Timeline Stepper of Phases */}
      <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-stone-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-tajawal">المخطط الزمني لمراحل المشروع (Phases Timeline)</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">تسلسل المراحل الخمسة والتأكد من إنجاز المخرجات بالترتيب</p>
          </div>
        </div>

        <div className="relative border-r-2 border-stone-200 dark:border-stone-700 mr-4 pr-6 space-y-8 my-4">
          {phases.sort((a, b) => a.order - b.order).map((phase) => {
            const phaseTasks = tasks.filter(t => t.phase_id === phase.phase_id);
            const phaseCompleted = phaseTasks.filter(t => t.status === 'done').length;
            const isFinished = phaseTasks.length > 0 && phaseCompleted === phaseTasks.length;
            const isInProgress = phase.status === 'in_progress' || (phaseTasks.length > 0 && phaseCompleted < phaseTasks.length && phaseCompleted > 0);

            return (
              <div key={phase.phase_id} className="relative group">
                {/* Status Dot icon on border line */}
                <div className={`absolute -right-[31px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-xs transition-all ${
                  isFinished
                    ? 'bg-[#3D6346] text-white ring-4 ring-emerald-50 dark:ring-emerald-950/50'
                    : isInProgress
                      ? 'bg-amber-500 text-white ring-4 ring-amber-50 dark:ring-amber-950/50 animate-pulse'
                      : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400 ring-4 ring-white dark:ring-stone-900'
                }`}>
                  {isFinished ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : isInProgress ? (
                    <Clock className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Circle className="w-3 h-3 text-stone-400 dark:text-stone-500" />
                  )}
                </div>

                {/* Phase Content Box */}
                <div className="bg-stone-50/80 dark:bg-stone-800/80 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 transition-all space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h4 className="font-bold text-stone-900 dark:text-stone-100 text-base font-tajawal">
                      {phase.phase_name}
                    </h4>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border self-start sm:self-auto font-tajawal ${
                      isFinished
                        ? 'bg-[#E9F1EA] dark:bg-[#2E4D36]/30 text-[#2E4D36] dark:text-emerald-300 border-[#3D6346]/20 dark:border-emerald-800/40'
                        : isInProgress
                          ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60'
                          : 'bg-white dark:bg-stone-800 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-700'
                    }`}>
                      {isFinished ? 'مكتملة بالكامل' : isInProgress ? 'جارية الان' : 'لم تبدأ بعد'}
                    </span>
                  </div>

                  {/* Tasks List inside Phase */}
                  <div className="space-y-2 pt-2 border-t border-stone-200/60 dark:border-stone-700/60">
                    <span className="text-xs font-bold text-stone-500 dark:text-stone-400 block font-tajawal">
                      المهام المرتبطة بهذه المرحلة ({phaseTasks.length}):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {phaseTasks.map(tsk => (
                        <div
                          key={tsk.task_id}
                          className="bg-white dark:bg-stone-900 p-3 rounded-xl border border-stone-200 dark:border-stone-700 text-xs flex items-center justify-between"
                        >
                          <div className="space-y-0.5">
                            <p className="font-bold text-stone-800 dark:text-stone-200 line-clamp-1 font-tajawal">{tsk.title}</p>
                            <span className="text-[10px] text-stone-400 dark:text-stone-500 block font-mono">الموعد: {tsk.deadline}</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            tsk.status === 'done'
                              ? 'bg-[#E9F1EA] dark:bg-[#2E4D36]/30 text-[#2E4D36] dark:text-emerald-300'
                              : tsk.status === 'in_progress'
                                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300'
                                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                          }`}>
                            {tsk.status === 'done' ? 'تمت' : tsk.status === 'in_progress' ? 'قيد التنفيذ' : 'معلقة'}
                          </span>
                        </div>
                      ))}
                      {phaseTasks.length === 0 && (
                        <p className="text-xs text-stone-400 dark:text-stone-500 italic">لا توجد مهام مضافة لهذه المرحلة بعد.</p>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
