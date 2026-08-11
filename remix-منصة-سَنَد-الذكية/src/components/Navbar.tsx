import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, ChevronDown, Check, LogOut, Layers, Users, Sun, Moon, ShieldAlert, Menu, X, Sparkles } from 'lucide-react';
import { SanadLogo } from './SanadLogo';
import { EmergencyModal } from './EmergencyModal';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    currentTeam,
    currentProject,
    currentMember,
    notifications,
    setActivePage,
    switchUser,
    users,
    markAllNotifsRead,
    isDarkMode,
    toggleDarkMode,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useApp();

  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <header className="bg-[#FAF8F5]/90 dark:bg-stone-950/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800 sticky top-0 z-30 px-4 lg:px-8 py-3.5 transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

        {/* Brand & Context */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors border border-stone-200/80 dark:border-stone-800"
            aria-label="قائمة الملاحة"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-stone-800 dark:text-stone-200" /> : <Menu className="w-5 h-5 text-stone-800 dark:text-stone-200" />}
          </button>

          <div
            onClick={() => setActivePage('dashboard')}
            className="cursor-pointer"
          >
            <SanadLogo size="md" showTagline={true} />
          </div>

          {/* Current Team & Project Pills */}
          {currentTeam && (
            <div className="hidden md:flex items-center gap-2 border-r border-stone-200/80 dark:border-stone-800 pr-4 mr-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300 bg-stone-100/90 dark:bg-stone-900/90 px-3.5 py-1.5 rounded-full border border-stone-200/80 dark:border-stone-800">
                <Users className="w-3.5 h-3.5 text-[#3D6346] dark:text-emerald-400" />
                <span>{currentTeam.team_name}</span>
              </div>
              {currentProject && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#2E4D36] dark:text-emerald-300 bg-[#E9F1EA] dark:bg-[#1C3022] px-3.5 py-1.5 rounded-full border border-[#3D6346]/20 dark:border-[#3D6346]/40">
                  <Layers className="w-3.5 h-3.5 text-[#3D6346] dark:text-emerald-400" />
                  <span className="truncate max-w-[180px] font-tajawal">{currentProject.name}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions: Emergency, Theme, Notifications, User */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Emergency Academic Protocol Button */}
          <button
            onClick={() => setShowEmergencyModal(true)}
            className="px-4 py-2 bg-rose-800 hover:bg-rose-900 text-white font-bold text-xs rounded-full shadow-xs transition-all transform hover:-translate-y-0.5 flex items-center gap-2 active:scale-95 shrink-0"
            title="أنقذنا يا سند - بروتوكول الطوارئ الأكاديمي"
          >
            <ShieldAlert className="w-4 h-4 text-rose-200 animate-pulse" />
            <span className="font-tajawal">أنقذنا يا سند 🚨</span>
          </button>

          {/* Dark/Light Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-all border border-stone-200/80 dark:border-stone-800 shadow-xs flex items-center justify-center"
            title={isDarkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-stone-600" />
            )}
          </button>

          {/* Role Badge */}
          <div className="hidden lg:flex items-center gap-1 text-[11px] font-bold text-[#2E4D36] dark:text-emerald-300 bg-[#E9F1EA] dark:bg-[#1C3022] border border-[#3D6346]/20 dark:border-[#3D6346]/40 px-3 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#3D6346] dark:text-emerald-400" />
            <span>{currentMember?.role || 'عضو الفريق'}</span>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-all border border-stone-200/80 dark:border-stone-800 shadow-xs"
              title="التنبيهات"
            >
              <Bell className="w-4 h-4 text-stone-700 dark:text-stone-300" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#3D6346] dark:bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifMenu && (
              <div className="absolute left-0 mt-2 w-80 sm:w-96 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 p-4 z-50 text-right animate-fade-in qatt-corner-accent">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-200/80 dark:border-stone-800">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm font-tajawal">التنبيهات الأخيرة</h3>
                    {unreadCount > 0 && (
                      <span className="bg-[#E9F1EA] dark:bg-[#1C3022] text-[#2E4D36] dark:text-emerald-300 text-xs px-2.5 py-0.5 rounded-full font-bold border border-[#3D6346]/20 dark:border-[#3D6346]/40">
                        {unreadCount} جديد
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      markAllNotifsRead();
                      setShowNotifMenu(false);
                    }}
                    className="text-xs text-[#3D6346] dark:text-emerald-400 hover:underline font-bold"
                  >
                    تحديد الكل كمقروء
                  </button>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.slice(0, 5).map(n => (
                    <div
                      key={n.notification_id}
                      className={`p-3 rounded-xl text-xs transition-colors border ${
                        n.is_read
                          ? 'bg-stone-50 dark:bg-stone-800/80 border-stone-200/60 dark:border-stone-700/60 text-stone-600 dark:text-stone-300'
                          : 'bg-[#E9F1EA]/60 dark:bg-[#1C3022]/80 border-[#3D6346]/20 dark:border-[#3D6346]/40 font-semibold text-stone-900 dark:text-stone-100'
                      }`}
                    >
                      <p className="leading-relaxed">{n.message}</p>
                      <span className="text-[10px] text-stone-400 dark:text-stone-500 block mt-1 dir-ltr text-right font-mono">
                        {new Date(n.created_at).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                  {notifications.length === 0 && (
                    <p className="text-xs text-stone-400 dark:text-stone-500 text-center py-4">لا توجد تنبيهات حالياً</p>
                  )}
                </div>

                <button
                  onClick={() => {
                    setActivePage('notifications');
                    setShowNotifMenu(false);
                  }}
                  className="w-full mt-3 pt-2 border-t border-stone-200/80 dark:border-stone-800 text-center text-xs font-bold text-[#3D6346] dark:text-emerald-400 hover:underline block font-tajawal"
                >
                  عرض جميع التنبيهات ({notifications.length})
                </button>
              </div>
            )}
          </div>

          {/* Profile & Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2.5 p-1 pl-3 rounded-full border border-stone-200/80 dark:border-stone-800 hover:border-[#3D6346]/40 dark:hover:border-[#3D6346]/60 bg-white dark:bg-stone-900 transition-all shadow-xs"
            >
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-stone-200 dark:ring-stone-700 border border-white dark:border-stone-800 shadow-xs"
              />
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1 font-tajawal">
                  <span>{currentUser?.name || 'مستخدم'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-semibold text-stone-500 dark:text-stone-400">
                    {currentMember?.role || 'عضو'}
                  </span>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
            </button>

            {/* Switcher Dropdown */}
            {showUserMenu && (
              <div className="absolute left-0 mt-2 w-64 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-stone-200 dark:border-stone-800 p-3.5 z-50 text-right animate-fade-in qatt-corner-accent">
                <div className="pb-2 mb-2 border-b border-stone-200/80 dark:border-stone-800">
                  <p className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">تبديل حساب المستخدم (اختبار الأدوار)</p>
                </div>
                <div className="space-y-1">
                  {users.map(u => {
                    const isSelected = u.user_id === currentUser?.user_id;
                    const uMember = useApp().teamMembers.find(m => m.user_id === u.user_id);
                    return (
                      <button
                        key={u.user_id}
                        onClick={() => {
                          switchUser(u.user_id);
                          setShowUserMenu(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-xs transition-all ${
                          isSelected
                            ? 'bg-[#E9F1EA] dark:bg-[#1C3022] text-[#1C3022] dark:text-emerald-200 font-bold border border-[#3D6346]/30 dark:border-[#3D6346]/50'
                            : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <img src={u.avatar} alt="" className="w-7 h-7 rounded-full object-cover ring-1 ring-stone-200 dark:ring-stone-700" />
                          <div className="text-right">
                            <p className="font-semibold font-tajawal">{u.name}</p>
                            <span className="text-[10px] text-stone-500 dark:text-stone-400">{uMember?.role || 'عضو'}</span>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#3D6346] dark:text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3 pt-2 border-t border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setActivePage('profile');
                      setShowUserMenu(false);
                    }}
                    className="text-xs text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white font-medium"
                  >
                    إعدادات الملف
                  </button>
                  <button
                    onClick={() => {
                      setActivePage('auth');
                      setShowUserMenu(false);
                    }}
                    className="text-xs text-rose-700 dark:text-rose-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    خروج
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      <EmergencyModal isOpen={showEmergencyModal} onClose={() => setShowEmergencyModal(false)} />
    </header>
  );
};
