import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { SmartMatchResult } from '../types';
import {
  UserCheck, Sparkles, CheckCircle2, Clock, Check
} from 'lucide-react';

export const TaskAssignmentView: React.FC = () => {
  const {
    tasks,
    currentTeam,
    teamMembers,
    users,
    taskAssignments,
    assignTaskToMember
  } = useApp();

  const [selectedTaskId, setSelectedTaskId] = useState<string>(tasks[0]?.task_id || '');
  const [recommendations, setRecommendations] = useState<SmartMatchResult[]>([]);
  const [isLoadingRecs, setIsLoadingRecs] = useState<boolean>(false);

  // Fetch AI smart match recommendations whenever selected task changes
  useEffect(() => {
    if (!selectedTaskId) return;

    const fetchSmartMatch = async () => {
      setIsLoadingRecs(true);
      try {
        const res = await api.smartAssignAI(selectedTaskId, currentTeam?.team_id);
        setRecommendations(res.recommendations || []);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingRecs(false);
      }
    };

    fetchSmartMatch();
  }, [selectedTaskId, currentTeam]);

  const activeTask = tasks.find(t => t.task_id === selectedTaskId);
  const currentAssignment = taskAssignments.find(ta => ta.task_id === selectedTaskId);
  const currentAssignedMember = teamMembers.find(m => m.team_member_id === currentAssignment?.team_member_id);
  const currentAssignedUser = users.find(u => u.user_id === currentAssignedMember?.user_id);

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Header Banner */}
      <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md text-stone-800 dark:text-stone-200 p-6 sm:p-8 rounded-3xl shadow-xs border border-stone-200/80 dark:border-stone-800 relative overflow-hidden qatt-corner-accent">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#E9F1EA] dark:bg-[#1C3022] text-[#2E4D36] dark:text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-full border border-[#3D6346]/20 dark:border-[#3D6346]/40 font-tajawal">
            <Sparkles className="w-3.5 h-3.5 text-[#3D6346] dark:text-emerald-400" />
            <span>وكيل سند الذكي — خوارزمية التوزيع الإنصافي</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight text-stone-900 dark:text-stone-100 font-tajawal">
            توزيع المهام وعدالة السند حسب المهارات وحجم الضغط
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm max-w-2xl leading-relaxed font-medium">
            يحلل وكيل سند الذكي المهارات المطلوبة لكل مهمة ويقارنها بمصفوفة مهارات الطلاب وعدد مهامهم المسندة لضمان توزيع عادل ومبني على نقاط القوة.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Task Selection Column (1 col) */}
        <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-4">
          <div className="border-b border-stone-200/80 dark:border-stone-800 pb-3">
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-tajawal">اختر المهمة للتوزيع</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">اختر مهمة لعرض التوصيات الذكية الخاصة بها</p>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {tasks.map(task => {
              const isSelected = task.task_id === selectedTaskId;
              const assign = taskAssignments.find(ta => ta.task_id === task.task_id);
              const assignMember = teamMembers.find(m => m.team_member_id === assign?.team_member_id);
              const assignUser = users.find(u => u.user_id === assignMember?.user_id);

              return (
                <div
                  key={task.task_id}
                  onClick={() => setSelectedTaskId(task.task_id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                    isSelected
                      ? 'bg-[#E9F1EA] dark:bg-[#1C3022] border-[#3D6346]/30 dark:border-[#3D6346]/50 text-[#1C3022] dark:text-emerald-200 font-bold shadow-xs'
                      : 'bg-stone-50/80 dark:bg-stone-800/80 border-stone-200/80 dark:border-stone-700/80 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold leading-snug font-tajawal">{task.title}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                      task.status === 'done' ? 'bg-[#E9F1EA] dark:bg-[#1C3022] text-[#2E4D36] dark:text-emerald-300' : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                    }`}>
                      {task.status === 'done' ? 'مكتملة' : 'قيد الانتظار'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                    <span className="font-mono">الموعد: {task.deadline}</span>
                    {assignUser ? (
                      <span className="text-[#2E4D36] dark:text-emerald-400 font-bold font-tajawal">مسندة إلى: {assignUser.name.split(' ')[0]}</span>
                    ) : (
                      <span className="text-amber-800 dark:text-amber-400 font-bold font-tajawal">غير مسندة</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Smart Recommendations Column (2 cols) */}
        <div className="lg:col-span-2 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-6">

          {/* Active Task Summary Card */}
          {activeTask && (
            <div className="bg-stone-50/80 dark:bg-stone-800/80 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-[#3D6346] dark:text-emerald-400 block mb-0.5 font-tajawal">المهمة المختارة:</span>
                  <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-tajawal">{activeTask.title}</h3>
                </div>
                {currentAssignedUser ? (
                  <div className="bg-[#E9F1EA] dark:bg-[#1C3022] border border-[#3D6346]/20 dark:border-[#3D6346]/40 text-[#2E4D36] dark:text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 self-start sm:self-auto font-tajawal">
                    <CheckCircle2 className="w-4 h-4 text-[#3D6346] dark:text-emerald-400" />
                    <span>مسندة حالياً إلى: {currentAssignedUser.name}</span>
                  </div>
                ) : (
                  <div className="bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 self-start sm:self-auto font-tajawal">
                    <Clock className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    <span>تحتاج إلى إسناد عضواً مسؤولاً</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 font-medium">{activeTask.description}</p>
            </div>
          )}

          {/* AI Match Recommendations List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#3D6346] dark:text-emerald-400" />
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-tajawal">
                  توصيات المطابقة الذكية للطلاب (Smart Match Results)
                </h3>
              </div>
              {isLoadingRecs && <span className="text-xs text-[#3D6346] dark:text-emerald-400 font-bold animate-pulse font-tajawal">جاري التحليل...</span>}
            </div>

            <div className="space-y-3">
              {recommendations.map(rec => {
                const member = teamMembers.find(m => m.team_member_id === rec.member_id);
                const user = users.find(u => u.user_id === member?.user_id);
                const isCurrentlyAssigned = currentAssignment?.team_member_id === rec.member_id;

                return (
                  <div
                    key={rec.member_id}
                    className={`p-5 rounded-2xl border transition-all space-y-3 ${
                      isCurrentlyAssigned
                        ? 'bg-[#E9F1EA]/60 dark:bg-[#1C3022]/60 border-[#3D6346]/30 dark:border-[#3D6346]/50'
                        : 'bg-stone-50/80 dark:bg-stone-800/80 border-stone-200/80 dark:border-stone-700/80 hover:border-[#3D6346]/30 dark:hover:border-[#3D6346]/50'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

                      {/* User Info & Score */}
                      <div className="flex items-center gap-3">
                        <img
                          src={user?.avatar}
                          className="w-12 h-12 rounded-full object-cover ring-1 ring-stone-200 dark:ring-stone-700 border border-white dark:border-stone-800"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-stone-900 dark:text-stone-100 text-sm font-tajawal">{rec.user_name}</h4>
                            <span className="text-[11px] font-medium text-stone-500 dark:text-stone-400">({member?.role})</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-bold text-[#2E4D36] dark:text-emerald-300 bg-[#E9F1EA] dark:bg-[#1C3022] px-2.5 py-0.5 rounded-full border border-[#3D6346]/20 dark:border-[#3D6346]/40 font-tajawal">
                              نسبة الملاءمة: {rec.match_score}%
                            </span>
                            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                              عبء العمل الحالي: <strong className="text-stone-800 dark:text-stone-200">{rec.current_task_count} مهام</strong>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Assign Action Button */}
                      <button
                        onClick={() => assignTaskToMember(selectedTaskId, rec.member_id)}
                        disabled={isCurrentlyAssigned}
                        className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 font-tajawal ${
                          isCurrentlyAssigned
                            ? 'bg-[#E9F1EA] dark:bg-[#1C3022] text-[#2E4D36] dark:text-emerald-300 border border-[#3D6346]/20 dark:border-[#3D6346]/40 cursor-default'
                            : 'bg-[#3D6346] hover:bg-[#2E4D36] text-white shadow-xs'
                        }`}
                      >
                        {isCurrentlyAssigned ? (
                          <>
                            <Check className="w-4 h-4 text-[#3D6346] dark:text-emerald-400" />
                            <span>المسند حالياً</span>
                          </>
                        ) : (
                          <>
                            <UserCheck className="w-4 h-4 text-emerald-100" />
                            <span>إسناد المهمة لهذا العضو</span>
                          </>
                        )}
                      </button>

                    </div>

                    {/* Match Reason Details */}
                    <div className="pt-2 border-t border-stone-200/60 dark:border-stone-700/60 text-xs text-stone-600 dark:text-stone-300 flex flex-wrap items-center justify-between gap-2 font-medium">
                      <p className="italic">💡 {rec.reason}</p>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-stone-500 dark:text-stone-400 font-tajawal">المهارات المطابقة:</span>
                        {rec.matching_skills.map((sk, sIdx) => (
                          <span key={sIdx} className="bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 text-[10px] font-medium px-2 py-0.5 rounded border border-stone-200 dark:border-stone-700">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
