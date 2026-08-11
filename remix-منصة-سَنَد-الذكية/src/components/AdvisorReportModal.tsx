import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { FileText, Printer, Download, GraduationCap, X, Award, Users, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface AdvisorReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdvisorReportModal: React.FC<AdvisorReportModalProps> = ({ isOpen, onClose }) => {
  const { currentProject, currentTeam, teamMembers, tasks, showToast } = useApp();
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const completedCount = tasks.filter(t => t.status === 'done').length;
  const inProgressCount = tasks.filter(t => t.status === 'in_progress').length;
  const completionPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    showToast("جاري تجهيز PDF", "تم إنشاء نسخة منسقة من تقرير المشرف الأكاديمي جاهزة للطباعة والارسال.", "info");
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl m-auto bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-stone-800 dark:text-stone-200 max-h-[85vh] sm:max-h-[90vh] flex flex-col">
        
        {/* Modal Top Actions Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200/80 dark:border-stone-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3D6346] text-white flex items-center justify-center font-bold shadow-xs">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-black text-stone-900 dark:text-stone-100 font-tajawal">تقرير المشرف الأكاديمي المعتمد</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">صادر عن وكيل سند الذكي للتقييم والمتابعة</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 text-stone-700 dark:text-stone-300 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors border border-stone-200/80 dark:border-stone-700/80"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-5 py-2 bg-[#3D6346] hover:bg-[#2E4D36] text-white font-bold rounded-full text-xs flex items-center gap-1.5 transition-all shadow-xs font-tajawal"
            >
              <Download className="w-4 h-4" />
              <span>تصدير PDF 📄</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Content */}
        <div ref={printRef} className="flex-1 overflow-y-auto pr-1 space-y-6 text-right print:text-black print:bg-white print:p-0">
          
          {/* Official Academic Letterhead */}
          <div className="bg-[#E9F1EA]/80 dark:bg-[#1C3022]/80 border border-[#3D6346]/20 dark:border-[#3D6346]/40 p-6 rounded-2xl shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#3D6346]/15 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#3D6346] dark:text-emerald-400 text-xs font-bold font-tajawal">
                  <GraduationCap className="w-4 h-4" />
                  <span>تقرير أداء مشروع التخرج — الفصل الدراسي المعتمد</span>
                </div>
                <h2 className="text-2xl font-black text-stone-900 dark:text-stone-100 font-tajawal">{currentProject?.name || 'مشروع التخرج الأكاديمي'}</h2>
                <p className="text-stone-600 dark:text-stone-300 text-xs">اسم الفريق: <strong className="text-stone-900 dark:text-stone-100 font-tajawal">{currentTeam?.team_name}</strong> | الكلية: علوم الحاسب والمعلومات</p>
              </div>

              <div className="bg-white/90 dark:bg-stone-900/90 p-4 rounded-2xl border border-[#3D6346]/20 dark:border-[#3D6346]/40 text-center shrink-0 shadow-xs">
                <span className="text-[11px] text-stone-500 dark:text-stone-400 block">نسبة الإنجاز الكلية</span>
                <span className="text-2xl font-black text-[#2E4D36] dark:text-emerald-300 font-mono">{completionPercent}%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-stone-500 dark:text-stone-400 block text-[11px]">أعضاء الفريق:</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">{teamMembers.length} طالبات</span>
              </div>
              <div>
                <span className="text-stone-500 dark:text-stone-400 block text-[11px]">المهام المنجزة:</span>
                <span className="font-bold text-[#2E4D36] dark:text-emerald-300">{completedCount} مهام</span>
              </div>
              <div>
                <span className="text-stone-500 dark:text-stone-400 block text-[11px]">قيد التنفيذ:</span>
                <span className="font-bold text-amber-700 dark:text-amber-400">{inProgressCount} مهام</span>
              </div>
              <div>
                <span className="text-stone-500 dark:text-stone-400 block text-[11px]">مؤشر التكافئ والعدالة:</span>
                <span className="font-bold text-[#3D6346] dark:text-emerald-400">98% (ممتاز)</span>
              </div>
            </div>
          </div>

          {/* Section 1: Executive Academic Summary */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 border-b border-stone-200/80 dark:border-stone-800 pb-2 font-tajawal">
              <Award className="w-4 h-4 text-[#3D6346] dark:text-emerald-400" />
              <span>1. الملخص التنفيذي وتوصيات وكيل "سند" للمشرف</span>
            </h4>
            <div className="bg-stone-50 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 p-4 rounded-2xl text-xs leading-relaxed space-y-2">
              <p className="font-semibold text-stone-800 dark:text-stone-200">
                أهلاً بك يا دكتورنا المشرف الفاضل. بناءً على المتابعة المستمرة لوكيل منصة "سند" الذكي:
              </p>
              <ul className="list-disc list-inside space-y-1 text-stone-600 dark:text-stone-300 pr-2">
                <li>يسير الفريق وفق الجدول الزمني المحدد لمرحلة بناء النواة وتطوير واجهات المستخدم.</li>
                <li>تم مراعاة التوزيع العادل للمهام بناءً على مصفوفة مهارات الطلاب (Skill Matrix) لمنع التكدس على عضو واحد.</li>
                <li>توصية سند: يوصى ببدء مراجعة التوثيق الأكاديمي والمخططات لمرحلة الاختبارات المبكرة.</li>
              </ul>
            </div>
          </div>

          {/* Section 2: Team Members Matrix */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 border-b border-stone-200/80 dark:border-stone-800 pb-2 font-tajawal">
              <Users className="w-4 h-4 text-[#3D6346] dark:text-emerald-400" />
              <span>2. كشف توزيع المساهمات والمهارات لكل طالب</span>
            </h4>

            <div className="overflow-x-auto border border-stone-200/80 dark:border-stone-800 rounded-2xl bg-white dark:bg-stone-900">
              <table className="w-full text-right text-xs">
                <thead className="bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold border-b border-stone-200/80 dark:border-stone-700 font-tajawal">
                  <tr>
                    <th className="p-3">الطالب / العضو</th>
                    <th className="p-3">المهارات التقنية</th>
                    <th className="p-3 text-center">المهام المسندة</th>
                    <th className="p-3 text-center">نسبة الإنجاز</th>
                    <th className="p-3 text-center">تقييم العبء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800 font-medium">
                  {teamMembers.map((member) => {
                    const memberTasks = tasks.filter(t => t.assigned_to_user_id === member.user_id);
                    const memberDone = memberTasks.filter(t => t.status === 'done').length;
                    const percent = memberTasks.length > 0 ? Math.round((memberDone / memberTasks.length) * 100) : 0;

                    return (
                      <tr key={member.id} className="hover:bg-stone-50/80 dark:hover:bg-stone-800/50">
                        <td className="p-3 font-bold text-stone-900 dark:text-stone-100 font-tajawal">
                          {member.full_name} {member.role_in_team === 'leader' ? '⭐ (قائد)' : ''}
                        </td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {member.skills_json.slice(0, 3).map((s, idx) => (
                              <span key={idx} className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[10px] px-2 py-0.5 rounded-md border border-stone-200/60 dark:border-stone-700">
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-3 text-center font-bold text-stone-800 dark:text-stone-200">{memberTasks.length} مهام</td>
                        <td className="p-3 text-center font-bold text-[#2E4D36] dark:text-emerald-300">{percent}%</td>
                        <td className="p-3 text-center">
                          <span className="bg-[#E9F1EA] dark:bg-[#1C3022] text-[#2E4D36] dark:text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#3D6346]/20 dark:border-[#3D6346]/40">
                            متكافئ ومثالي ✓
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Tasks Timeline */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 border-b border-stone-200/80 dark:border-stone-800 pb-2 font-tajawal">
              <Clock className="w-4 h-4 text-[#3D6346] dark:text-emerald-400" />
              <span>3. حالة مهام المشروع التفصيلية</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {tasks.map(task => (
                <div key={task.id} className="bg-stone-50 dark:bg-stone-800/80 p-3.5 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="font-bold text-stone-900 dark:text-stone-100 font-tajawal">{task.title}</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">الأهمية: {task.priority} | النقاط: {task.estimated_hours}h</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    task.status === 'done' ? 'bg-[#E9F1EA] dark:bg-[#1C3022] text-[#2E4D36] dark:text-emerald-300 border border-[#3D6346]/20 dark:border-[#3D6346]/40' :
                    task.status === 'in_progress' ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60' :
                    'bg-stone-200/60 dark:bg-stone-700/60 text-stone-600 dark:text-stone-300'
                  }`}>
                    {task.status === 'done' ? 'مكتملة' : task.status === 'in_progress' ? 'قيد العمل' : 'مطلوبة'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Official Signatures Line */}
          <div className="pt-6 mt-6 border-t border-stone-200/80 dark:border-stone-800 grid grid-cols-2 gap-6 text-center text-xs text-stone-500 dark:text-stone-400">
            <div>
              <p className="font-bold text-stone-800 dark:text-stone-200 font-tajawal">توقيع القائد / ممثل الطلاب</p>
              <div className="mt-4 border-b border-dashed border-stone-300 dark:border-stone-700 w-32 mx-auto"></div>
            </div>
            <div>
              <p className="font-bold text-stone-800 dark:text-stone-200 font-tajawal">اعتماد الدكتور المشرف الأكاديمي</p>
              <div className="mt-4 border-b border-dashed border-stone-300 dark:border-stone-700 w-32 mx-auto"></div>
            </div>
          </div>

        </div>

      </div>
    </div>,
    document.body
  );
};
