import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { Task, TaskStatus } from '../types';
import {
  Kanban, Plus, Calendar, Sparkles, X, ChevronRight, ChevronLeft
} from 'lucide-react';

export const KanbanView: React.FC = () => {
  const {
    phases,
    tasks,
    taskAssignments,
    teamMembers,
    users,
    refreshData,
    showToast,
    isLeader,
    currentProject,
    setActivePage
  } = useApp();

  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<string>('all');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddPhaseModal, setShowAddPhaseModal] = useState(false);

  // New Task Form State
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskPhaseId, setNewTaskPhaseId] = useState(phases[0]?.phase_id || '');
  const [newTaskDeadline, setNewTaskDeadline] = useState('');

  // New Phase Form State
  const [newPhaseName, setNewPhaseName] = useState('');

  // Move task status
  const moveTaskStatus = async (taskId: string, currentStatus: TaskStatus, direction: 'next' | 'prev') => {
    const statuses: TaskStatus[] = ['todo', 'in_progress', 'review', 'done'];
    const idx = statuses.indexOf(currentStatus);
    const newIdx = direction === 'next' ? idx + 1 : idx - 1;
    if (newIdx >= 0 && newIdx < statuses.length) {
      const newStatus = statuses[newIdx];
      try {
        await api.updateTaskStatus(taskId, newStatus);
        await refreshData();
        if (newStatus === 'done') {
          showToast("عاش! تمت المهمة بنجاح بفضل مهارات الفريق 👏", "تهانينا! أضيفت المهمة إلى الإنجازات المكتملة في السند.", "success");
        } else {
          showToast("تم تحديث الحالة", "تم نقل المهمة في اللوحة بنجاح.", "success");
        }
      } catch (err) {
        showToast("خطأ", "فشل تحديث حالة المهمة.", "error");
      }
    }
  };

  // Add Task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      await api.createTask({
        phase_id: newTaskPhaseId || phases[0]?.phase_id,
        title: newTaskTitle,
        description: newTaskDesc,
        deadline: newTaskDeadline || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        status: 'todo'
      });
      await refreshData();
      showToast("تم إضافة المهمة", "تم إضافة المهمة بنجاح إلى لوحة Kanban.", "success");
      setNewTaskTitle('');
      setNewTaskDesc('');
      setShowAddTaskModal(false);
    } catch (err) {
      showToast("خطأ", "تعذر إضافة المهمة.", "error");
    }
  };

  // Add Phase
  const handleAddPhase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhaseName.trim() || !currentProject) return;
    try {
      await api.createPhase({
        project_id: currentProject.project_id,
        phase_name: newPhaseName,
        order: phases.length + 1,
        status: 'not_started'
      });
      await refreshData();
      showToast("تم إضافة المرحلة", "تم إضافة المرحلة الجديدة للمشروع.", "success");
      setNewPhaseName('');
      setShowAddPhaseModal(false);
    } catch (err) {
      showToast("خطأ", "تعذر إضافة المرحلة.", "error");
    }
  };

  // Filter Tasks by phase
  const filteredTasks = tasks.filter(t => {
    if (selectedPhaseFilter === 'all') return true;
    return t.phase_id === selectedPhaseFilter;
  });

  const columns: { id: TaskStatus; title: string; badgeBg: string; tasks: Task[] }[] = [
    {
      id: 'todo',
      title: 'لم تبدأ (To Do)',
      badgeBg: 'bg-stone-200 text-stone-800',
      tasks: filteredTasks.filter(t => t.status === 'todo')
    },
    {
      id: 'in_progress',
      title: 'قيد التنفيذ (In Progress)',
      badgeBg: 'bg-amber-100 text-amber-900 border border-amber-200',
      tasks: filteredTasks.filter(t => t.status === 'in_progress')
    },
    {
      id: 'review',
      title: 'تحت المراجعة (In Review)',
      badgeBg: 'bg-amber-100 text-amber-900 border border-amber-200',
      tasks: filteredTasks.filter(t => t.status === 'review')
    },
    {
      id: 'done',
      title: 'مكتملة (Done)',
      badgeBg: 'bg-[#E9F1EA] text-[#2E4D36] border border-[#3D6346]/20',
      tasks: filteredTasks.filter(t => t.status === 'done')
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Kanban Header & Actions */}
      <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 qatt-corner-accent">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#3D6346] dark:text-emerald-400 mb-1 font-tajawal">
            <Kanban className="w-4 h-4" />
            <span>لوحة المتابعة التفاعلية (Kanban Board)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 font-tajawal">
            مهام ومراحل مشروع التخرج
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            تتيح نقل المهام وتتبع المسند إليهم والمواعيد النهائية بدقة
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          {isLeader && (
            <button
              onClick={() => setShowAddPhaseModal(true)}
              className="bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 text-stone-800 dark:text-stone-200 font-bold px-4 py-2.5 rounded-full text-xs flex items-center gap-1.5 transition-all border border-stone-200/80 dark:border-stone-700 font-tajawal"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة مرحلة</span>
            </button>
          )}

          <button
            onClick={() => setShowAddTaskModal(true)}
            className="bg-[#3D6346] hover:bg-[#2E4D36] text-white font-bold px-5 py-2.5 rounded-full text-xs flex items-center gap-2 shadow-xs transition-all font-tajawal"
          >
            <Plus className="w-4 h-4 text-emerald-100" />
            <span>إضافة مهمة جديدة</span>
          </button>
        </div>
      </div>

      {/* Phase Filter Tabs */}
      <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-3.5 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-bold text-stone-500 dark:text-stone-400 shrink-0 pr-2 font-tajawal">المرحلة:</span>
        <button
          onClick={() => setSelectedPhaseFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all font-tajawal ${
            selectedPhaseFilter === 'all'
              ? 'bg-[#3D6346] text-white shadow-xs'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 border border-stone-200/80 dark:border-stone-700'
          }`}
        >
          جميع المراحل
        </button>
        {phases.map(p => (
          <button
            key={p.phase_id}
            onClick={() => setSelectedPhaseFilter(p.phase_id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all font-tajawal ${
              selectedPhaseFilter === p.phase_id
                ? 'bg-[#3D6346] text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 border border-stone-200/80 dark:border-stone-700'
            }`}
          >
            {p.phase_name}
          </button>
        ))}
      </div>

      {/* Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {columns.map(col => (
          <div key={col.id} className="bg-white/70 dark:bg-stone-900/70 backdrop-blur-md rounded-3xl p-4 border border-stone-200/80 dark:border-stone-800 min-h-[500px] flex flex-col gap-3 shadow-xs">

            {/* Column Title */}
            <div className="flex items-center justify-between pb-2 border-b border-stone-200/80 dark:border-stone-800 px-1">
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2 font-tajawal">
                <span>{col.title}</span>
              </h3>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold font-mono ${col.badgeBg}`}>
                {col.tasks.length}
              </span>
            </div>

            {/* Column Task Cards */}
            <div className="space-y-3 flex-1">
              {col.tasks.map(task => {
                const assignment = taskAssignments.find(ta => ta.task_id === task.task_id);
                const assignedMember = teamMembers.find(m => m.team_member_id === assignment?.team_member_id);
                const assignedUser = users.find(u => u.user_id === assignedMember?.user_id);

                return (
                  <div
                    key={task.task_id}
                    className="bg-white dark:bg-stone-800/90 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 shadow-xs space-y-3 hover:border-[#3D6346]/30 dark:hover:border-[#3D6346]/50 transition-all group"
                  >
                    {/* Card Title & Desc */}
                    <div className="space-y-1">
                      <h4 className="font-bold text-stone-900 dark:text-stone-100 text-xs leading-snug font-tajawal">
                        {task.title}
                      </h4>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 leading-normal">
                        {task.description}
                      </p>
                    </div>

                    {/* Deadline & Assigned Person */}
                    <div className="pt-2 border-t border-stone-100 dark:border-stone-700/80 flex items-center justify-between gap-2 text-[11px]">
                      <span className="flex items-center gap-1 text-stone-400 dark:text-stone-500 font-mono">
                        <Calendar className="w-3 h-3 text-[#3D6346] dark:text-emerald-400" />
                        <span>{task.deadline}</span>
                      </span>

                      {/* Member Avatar */}
                      {assignedUser ? (
                        <div className="flex items-center gap-1.5 bg-stone-50 dark:bg-stone-900 px-2 py-0.5 rounded-full border border-stone-200/80 dark:border-stone-700">
                          <img src={assignedUser.avatar} className="w-4 h-4 rounded-full object-cover" />
                          <span className="font-bold text-[#2E4D36] dark:text-emerald-300 text-[10px] font-tajawal">{assignedUser.name.split(' ')[0]}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => setActivePage('task-assignment')}
                          className="text-[10px] font-bold text-[#2E4D36] dark:text-emerald-300 bg-[#E9F1EA] dark:bg-[#1C3022] hover:bg-[#d8e8dc] dark:hover:bg-[#27422f] px-2.5 py-0.5 rounded-full border border-[#3D6346]/20 dark:border-[#3D6346]/40 flex items-center gap-1 font-tajawal"
                        >
                          <Sparkles className="w-3 h-3 text-[#3D6346] dark:text-emerald-400" />
                          <span>إسناد ذكي</span>
                        </button>
                      )}
                    </div>

                    {/* Task Move Status Action Buttons */}
                    <div className="flex items-center justify-between pt-1 border-t border-stone-100 dark:border-stone-700/80">
                      <button
                        onClick={() => moveTaskStatus(task.task_id, task.status, 'prev')}
                        disabled={col.id === 'todo'}
                        className="p-1 text-stone-400 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 disabled:opacity-20"
                        title="نقل للخلف"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setActivePage('progress')}
                        className="text-[10px] font-bold text-[#3D6346] dark:text-emerald-400 hover:underline font-tajawal"
                      >
                        تحديث الإنجاز %
                      </button>

                      <button
                        onClick={() => moveTaskStatus(task.task_id, task.status, 'next')}
                        disabled={col.id === 'done'}
                        className="p-1 text-stone-400 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 disabled:opacity-20"
                        title="نقل للأمام"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}

              {col.tasks.length === 0 && (
                <div className="h-28 border border-dashed border-stone-200 dark:border-stone-800 rounded-2xl flex items-center justify-center text-xs text-stone-400 dark:text-stone-600 font-tajawal">
                  لا توجد مهام في هذا العمود
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* ADD TASK MODAL */}
      {showAddTaskModal && createPortal(
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <form onSubmit={handleAddTask} className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full m-auto max-h-[85vh] sm:max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200">
            <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-tajawal">إضافة مهمة جديدة لمشروع التخرج</h3>
              <button type="button" onClick={() => setShowAddTaskModal(false)} className="text-stone-400 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1 font-tajawal">عنوان المهمة</label>
              <input
                type="text"
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
                placeholder="مثال: تصميم واجهة المستخدم لشاشة التنبيهات"
                className="w-full px-4 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#3D6346]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1 font-tajawal">الوصف والتفاصيل</label>
              <textarea
                value={newTaskDesc}
                onChange={e => setNewTaskDesc(e.target.value)}
                placeholder="اكتب التفاصيل المطلوبة لإنجاز المهمة..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#3D6346]"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1 font-tajawal">المرحلة المرتبطة</label>
                <select
                  value={newTaskPhaseId}
                  onChange={e => setNewTaskPhaseId(e.target.value)}
                  className="w-full px-3 py-2 rounded-2xl border border-stone-200 dark:border-stone-700 text-xs bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none"
                >
                  {phases.map(p => (
                    <option key={p.phase_id} value={p.phase_id}>{p.phase_name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1 font-tajawal">الموعد النهائي (Deadline)</label>
                <input
                  type="date"
                  value={newTaskDeadline}
                  onChange={e => setNewTaskDeadline(e.target.value)}
                  className="w-full px-3 py-2 rounded-2xl border border-stone-200 dark:border-stone-700 text-xs bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200/80 dark:border-stone-800">
              <button
                type="button"
                onClick={() => setShowAddTaskModal(false)}
                className="px-4 py-2 text-xs font-bold text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold bg-[#3D6346] hover:bg-[#2E4D36] text-white rounded-full shadow-xs font-tajawal"
              >
                إضافة المهمة
              </button>
            </div>
          </form>
        </div>,
        document.body
      )}

      {/* ADD PHASE MODAL */}
      {showAddPhaseModal && createPortal(
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
          <form onSubmit={handleAddPhase} className="bg-white dark:bg-stone-900 rounded-3xl max-w-md w-full m-auto max-h-[85vh] sm:max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200">
            <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-stone-800 pb-3">
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-tajawal">إضافة مرحلة جديدة للمشروع</h3>
              <button type="button" onClick={() => setShowAddPhaseModal(false)} className="text-stone-400 dark:text-stone-500 hover:text-stone-800 dark:hover:text-stone-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1 font-tajawal">اسم المرحلة</label>
              <input
                type="text"
                value={newPhaseName}
                onChange={e => setNewPhaseName(e.target.value)}
                placeholder="مثال: 6. النشر والتسليم النهائي"
                className="w-full px-4 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#3D6346]"
                required
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200/80 dark:border-stone-800">
              <button
                type="button"
                onClick={() => setShowAddPhaseModal(false)}
                className="px-4 py-2 text-xs font-bold text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold bg-[#3D6346] hover:bg-[#2E4D36] text-white rounded-full shadow-xs font-tajawal"
              >
                إضافة المرحلة
              </button>
            </div>
          </form>
        </div>,
        document.body
      )}

    </div>
  );
};
