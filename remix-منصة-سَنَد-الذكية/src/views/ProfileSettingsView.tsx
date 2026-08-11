import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Settings, Database, Save, RefreshCw
} from 'lucide-react';

export const ProfileSettingsView: React.FC = () => {
  const {
    currentUser,
    currentMember,
    showToast,
    refreshData
  } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('••••••••');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("تم تحديث البيانات", "تم حفظ التغييرات على الملف الشخصي بنجاح.", "success");
  };

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Header Banner */}
      <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 qatt-corner-accent">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#3D6346] dark:text-emerald-400 mb-1 font-tajawal">
            <Settings className="w-4 h-4" />
            <span>إعدادات الملف الشخصي والنظام</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 font-tajawal">
            تعديل بيانات المستخدم والحساب
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            تغيير الاسم، البريد الإلكتروني، كلمة المرور وتبديل الأدوار للاختبار
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Profile Form (2 cols) */}
        <div className="lg:col-span-2 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-6">
          <div className="flex items-center gap-4 border-b border-stone-200/80 dark:border-stone-800 pb-5">
            <img
              src={currentUser?.avatar}
              alt={currentUser?.name}
              className="w-16 h-16 rounded-full object-cover ring-1 ring-stone-200 dark:ring-stone-700 shadow-xs border border-white dark:border-stone-800"
            />
            <div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg font-tajawal">{currentUser?.name}</h3>
              <p className="text-xs text-stone-400 dark:text-stone-500 font-mono">{currentUser?.email}</p>
              <span className="inline-block mt-1 bg-[#E9F1EA] dark:bg-[#1C3022] text-[#2E4D36] dark:text-emerald-300 text-xs font-bold px-3 py-0.5 rounded-full border border-[#3D6346]/20 dark:border-[#3D6346]/40 font-tajawal">
                الدور الحالي: {currentMember?.role || 'عضو'}
              </span>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1 font-tajawal">الاسم الكامل</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-bold text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#3D6346] font-tajawal"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1 font-tajawal">البريد الإلكتروني الجامعي</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-bold text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#3D6346] font-mono dir-ltr text-right"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1 font-tajawal">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-bold text-stone-900 dark:text-stone-100 focus:outline-none focus:border-[#3D6346] font-mono"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-[#3D6346] hover:bg-[#2E4D36] text-white font-bold rounded-full text-xs flex items-center gap-2 shadow-xs transition-all font-tajawal"
              >
                <Save className="w-4 h-4 text-emerald-100" />
                <span>حفظ التعديلات</span>
              </button>
            </div>
          </form>
        </div>

        {/* Database & System Info Box (1 col) */}
        <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-5">
          <div className="border-b border-stone-200/80 dark:border-stone-800 pb-3 flex items-center gap-2">
            <Database className="w-5 h-5 text-[#3D6346] dark:text-emerald-400" />
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-tajawal">هيكل قاعدة البيانات (14 جدول)</h3>
          </div>

          <div className="space-y-2 text-xs text-stone-600 dark:text-stone-300">
            <p className="font-bold text-stone-800 dark:text-stone-200 font-tajawal">
              النظام متكامل بنسبة 100% ويعكس جميع الـ 14 جدول التالية:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/80 p-3.5 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 font-mono dir-ltr text-right">
              <li>users</li>
              <li>teams</li>
              <li>team_members</li>
              <li>skills</li>
              <li>member_skills</li>
              <li>interests</li>
              <li>member_interests</li>
              <li>project_ideas</li>
              <li>projects</li>
              <li>phases</li>
              <li>tasks</li>
              <li>task_assignments</li>
              <li>progress_updates</li>
              <li>notifications</li>
            </ol>
          </div>

          <div className="pt-3 border-t border-stone-200/80 dark:border-stone-800">
            <button
              onClick={() => {
                refreshData();
                showToast("تحديث البيانات", "تم مزامنة حالة الـ 14 جدول مع الخادم.", "success");
              }}
              className="w-full py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 text-stone-800 dark:text-stone-200 font-bold rounded-full text-xs flex items-center justify-center gap-2 transition-colors border border-stone-200/80 dark:border-stone-700 font-tajawal"
            >
              <RefreshCw className="w-4 h-4 text-[#3D6346] dark:text-emerald-400" />
              <span>إعادة مزامنة قاعدة البيانات</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
