import React from 'react';
import { useApp, ActivePage } from '../context/AppContext';
import {
  LayoutDashboard,
  Users,
  Sparkles,
  Layers,
  Kanban,
  UserCheck,
  TrendingUp,
  Bell,
  Settings,
  ShieldCheck,
  FolderGit2,
  Scale,
  X
} from 'lucide-react';
import { SanadLogo } from './SanadLogo';

export const Sidebar: React.FC = () => {
  const { activePage, setActivePage, notifications, currentProject, isLeader, isMobileMenuOpen, setIsMobileMenuOpen } = useApp();

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const menuItems: { id: ActivePage; label: string; icon: React.ReactNode; badge?: number | string }[] = [
    { id: 'dashboard', label: 'الرئيسية (Dashboard)', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'team', label: 'إدارة الفريق والمهارات', icon: <Users className="w-4 h-4" /> },
    { id: 'ai-ideas', label: 'سند يقترح أفكاراً', icon: <Sparkles className="w-4 h-4 text-[#3D6346]" />, badge: 'جديد' },
    { id: 'conflict-resolver', label: 'مستشار حل النزاعات', icon: <Scale className="w-4 h-4 text-[#3D6346]" />, badge: 'مميز' },
    { id: 'project-overview', label: 'تفاصيل ومراحل المشروع', icon: <Layers className="w-4 h-4" /> },
    { id: 'kanban', label: 'لوحة المهام (Kanban)', icon: <Kanban className="w-4 h-4" /> },
    { id: 'task-assignment', label: 'توزيع المهام وعدالة السند', icon: <UserCheck className="w-4 h-4 text-[#3D6346]" /> },
    { id: 'progress', label: 'تحديث التقدم والتاريخ', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'notifications', label: 'التنبيهات والإشعارات', icon: <Bell className="w-4 h-4" />, badge: unreadCount > 0 ? unreadCount : undefined },
    { id: 'profile', label: 'الملف الشخصي والإعدادات', icon: <Settings className="w-4 h-4" /> },
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div className="space-y-6">
        {/* Sidebar Header Brand */}
        <div className="pb-4 border-b border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
          <SanadLogo size="sm" showTagline={true} />
          {/* Close button for mobile menu */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-1.5 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Project Brief Badge */}
        {currentProject && (
          <div className="bg-[#E9F1EA]/80 dark:bg-[#1C3022]/80 border border-[#3D6346]/20 dark:border-[#3D6346]/40 p-4 rounded-2xl shadow-xs relative overflow-hidden qatt-corner-accent">
            <div className="relative z-10 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2E4D36] dark:text-emerald-300">
                <FolderGit2 className="w-3.5 h-3.5 text-[#3D6346] dark:text-emerald-400" />
                <span className="font-tajawal">المشروع الحالي:</span>
              </div>
              <h3 className="font-black text-sm text-stone-900 dark:text-stone-100 line-clamp-1 font-tajawal">
                {currentProject.name}
              </h3>
              <div className="pt-1 flex items-center justify-between text-[11px] text-stone-600 dark:text-stone-300">
                <span>البدء: {currentProject.start_date}</span>
                <span className="bg-white/80 dark:bg-stone-900/80 text-[#2E4D36] dark:text-emerald-300 border border-[#3D6346]/30 dark:border-[#3D6346]/50 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                  نشط
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Section */}
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-stone-400 dark:text-stone-500 px-3 uppercase tracking-wider mb-2 font-tajawal">
            القائمة الرئيسية
          </p>
          {menuItems.map(item => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-[#3D6346] text-white shadow-xs'
                    : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100/90 dark:hover:bg-stone-800/90 hover:text-stone-900 dark:hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-white' : ''}>{item.icon}</span>
                  <span className="font-tajawal">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge !== null && (
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : typeof item.badge === 'number'
                        ? 'bg-rose-800 text-white'
                        : 'bg-[#E9F1EA] dark:bg-[#1C3022] text-[#2E4D36] dark:text-emerald-300 border border-[#3D6346]/20 dark:border-[#3D6346]/40'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Role Notice at Bottom */}
      <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800 text-center">
        <div className="bg-stone-50 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 p-3.5 rounded-2xl flex items-center gap-2.5 text-xs text-stone-700 dark:text-stone-300">
          <ShieldCheck className="w-4 h-4 text-[#3D6346] dark:text-emerald-400 shrink-0" />
          <div className="text-right">
            <span className="font-bold text-stone-900 dark:text-stone-100 block font-tajawal">
              {isLeader ? 'صلاحيات: قائد الفريق' : 'صلاحيات: عضو الفريق'}
            </span>
            <span className="text-[10px] text-stone-500 dark:text-stone-400">
              {isLeader ? 'تسمح بإضافة مراحل وتوزيع المهام' : 'تسمح بتحديث الإنجاز ومتابعة المهام'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-72 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-stone-200/80 dark:border-stone-800 p-5 shrink-0 rounded-3xl shadow-xs self-start sticky top-24">
        {sidebarContent}
      </aside>

      {/* Mobile Off-Canvas Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-900/30 dark:bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <aside className="relative right-0 w-80 max-w-[85vw] bg-white dark:bg-stone-900 h-full p-5 shadow-xl border-l border-stone-200 dark:border-stone-800 overflow-y-auto z-50 transition-transform duration-300">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
