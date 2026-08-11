import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Lock, Mail, User as UserIcon
} from 'lucide-react';
import { SanadLogo } from '../components/SanadLogo';

export const AuthView: React.FC = () => {
  const { users, switchUser, setActivePage, showToast } = useApp();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('itsjorybb@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [name, setName] = useState('');
  const [showForgot, setShowForgot] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showForgot) {
      showToast("تم إرسال الرابط", "تم إرسال رابط استرجاع كلمة المرور إلى بريدك الجامعي.", "info");
      setShowForgot(false);
      return;
    }

    // Demo auto match user
    const matched = users.find(u => u.email.toLowerCase() === email.toLowerCase()) || users[0];
    switchUser(matched.user_id);
    setActivePage('dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl rounded-3xl max-w-md w-full p-8 shadow-xl border border-stone-200/80 dark:border-stone-800 space-y-6 text-stone-800 dark:text-stone-200">

        {/* Brand Header */}
        <div className="text-center space-y-3 flex flex-col items-center">
          <SanadLogo size="lg" />
          <p className="text-xs text-stone-500 dark:text-stone-400 font-medium font-tajawal">
            {showForgot
              ? 'استرجاع كلمة المرور للحساب الجامعي'
              : isLogin
                ? 'تسجيل الدخول إلى منصة سَنَد'
                : 'إنشاء حساب جديد كطالب أو قائد فريق'}
          </p>
        </div>

        {/* Demo Fast Login Selector */}
        {!showForgot && (
          <div className="bg-stone-50 dark:bg-stone-800/80 p-3.5 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 space-y-2">
            <span className="text-[11px] font-bold text-[#2E4D36] dark:text-emerald-300 bg-[#E9F1EA] dark:bg-[#1C3022] px-2.5 py-0.5 rounded-full block text-center border border-[#3D6346]/20 dark:border-[#3D6346]/40 font-tajawal">
              الدخول السريع بحسابات تجريبية مسبقة:
            </span>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {users.map(u => (
                <button
                  key={u.user_id}
                  type="button"
                  onClick={() => {
                    switchUser(u.user_id);
                    setActivePage('dashboard');
                  }}
                  className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-[#3D6346]/40 dark:hover:border-emerald-500/40 text-right text-xs transition-all"
                >
                  <p className="font-bold text-stone-900 dark:text-stone-100 line-clamp-1 font-tajawal">{u.name}</p>
                  <span className="text-[10px] text-stone-400 dark:text-stone-500 font-tajawal">
                    {u.user_id === 'usr-101' ? 'قائد الفريق' : 'عضو الفريق'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {!isLogin && !showForgot && (
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1 font-tajawal">الاسم الكامل</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="محمد أحمد المنصوري"
                  className="w-full pl-4 pr-10 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:border-[#3D6346] font-tajawal"
                  required
                />
                <UserIcon className="w-4 h-4 text-stone-400 dark:text-stone-500 absolute right-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1 font-tajawal">البريد الإلكتروني الجامعي</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="student@university.edu.sa"
                className="w-full pl-4 pr-10 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:border-[#3D6346] font-mono dir-ltr text-right"
                required
              />
              <Mail className="w-4 h-4 text-stone-400 dark:text-stone-500 absolute right-3 top-3" />
            </div>
          </div>

          {!showForgot && (
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1 font-tajawal">كلمة المرور</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-10 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs focus:outline-none focus:border-[#3D6346] font-mono dir-ltr text-right"
                  required
                />
                <Lock className="w-4 h-4 text-stone-400 dark:text-stone-500 absolute right-3 top-3" />
              </div>
            </div>
          )}

          {isLogin && !showForgot && (
            <div className="text-left">
              <button
                type="button"
                onClick={() => setShowForgot(true)}
                className="text-xs font-bold text-[#3D6346] dark:text-emerald-400 hover:underline font-tajawal"
              >
                نسيت كلمة المرور؟
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-[#3D6346] hover:bg-[#2E4D36] text-white font-bold text-xs rounded-full shadow-xs transition-all font-tajawal"
          >
            {showForgot
              ? 'إرسال رابط الاسترجاع'
              : isLogin
                ? 'تسجيل الدخول'
                : 'إنشاء الحساب الان'}
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div className="text-center pt-2 border-t border-stone-200/80 dark:border-stone-800">
          {showForgot ? (
            <button
              onClick={() => setShowForgot(false)}
              className="text-xs font-bold text-[#3D6346] dark:text-emerald-400 hover:underline font-tajawal"
            >
              العودة إلى شاشة الدخول
            </button>
          ) : (
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs text-stone-600 dark:text-stone-300 hover:text-[#3D6346] dark:hover:text-emerald-400 font-bold font-tajawal"
            >
              {isLogin ? 'ليس لديك حساب؟ أنشئ حسابك الان' : 'لديك حساب بالفعل؟ سجل دخولك'}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
