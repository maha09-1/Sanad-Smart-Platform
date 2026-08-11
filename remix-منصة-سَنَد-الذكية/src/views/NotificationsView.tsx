import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  Bell, CheckCircle2, AlertTriangle, Info, XCircle, CheckCheck
} from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const { notifications, markAllNotifsRead, refreshData, showToast } = useApp();

  const [filterType, setFilterType] = useState<'all' | 'unread'>('all');

  const handleMarkSingleRead = async (id: string) => {
    try {
      await api.markNotificationRead(id);
      await refreshData();
      showToast("تحديث", "تم تمييز الإشعار كمقروء.", "info");
    } catch (err) {
      console.error(err);
    }
  };

  const filteredNotifs = notifications.filter(n => {
    if (filterType === 'unread') return !n.is_read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Header Banner */}
      <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 qatt-corner-accent">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#3D6346] dark:text-emerald-400 mb-1 font-tajawal">
            <Bell className="w-4 h-4" />
            <span>مركز التنبيهات والإشعارات الفورية</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 font-tajawal">
            جميع إشعارات المشروع ({notifications.length})
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            يوجد لديك <strong className="text-[#3D6346] dark:text-emerald-400 font-bold">{unreadCount} إشعارات غير مقروءة</strong>
          </p>
        </div>

        <button
          onClick={markAllNotifsRead}
          disabled={unreadCount === 0}
          className="bg-[#3D6346] hover:bg-[#2E4D36] text-white font-bold px-5 py-2.5 rounded-full text-xs flex items-center gap-2 shadow-xs transition-all self-start sm:self-auto disabled:opacity-50 font-tajawal"
        >
          <CheckCheck className="w-4 h-4 text-emerald-100" />
          <span>تحديد الكل كمقروء</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-3.5 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs flex items-center gap-2 font-tajawal">
        <span className="text-xs font-bold text-stone-500 dark:text-stone-400 pr-2">تصفية حسب:</span>
        <button
          onClick={() => setFilterType('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            filterType === 'all'
              ? 'bg-[#3D6346] text-white shadow-xs'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 border border-stone-200/80 dark:border-stone-700'
          }`}
        >
          الكل ({notifications.length})
        </button>
        <button
          onClick={() => setFilterType('unread')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            filterType === 'unread'
              ? 'bg-[#3D6346] text-white shadow-xs'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 border border-stone-200/80 dark:border-stone-700'
          }`}
        >
          غير المقروءة ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.map(notif => {
          const typeIcons = {
            info: <Info className="w-5 h-5 text-[#3D6346] dark:text-emerald-400 shrink-0" />,
            warning: <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0" />,
            success: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />,
            alert: <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
          };

          return (
            <div
              key={notif.notification_id}
              className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                notif.is_read
                  ? 'bg-white/60 dark:bg-stone-900/40 border-stone-200/60 dark:border-stone-800/60 text-stone-500 dark:text-stone-400'
                  : 'bg-white dark:bg-stone-800/90 border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 font-medium shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {typeIcons[notif.type]}
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm leading-relaxed font-bold text-stone-800 dark:text-stone-100 font-tajawal">{notif.message}</p>
                  <span className="text-[10px] text-stone-400 dark:text-stone-500 block font-mono">
                    {new Date(notif.created_at).toLocaleString('ar-SA')}
                  </span>
                </div>
              </div>

              {!notif.is_read && (
                <button
                  onClick={() => handleMarkSingleRead(notif.notification_id)}
                  className="text-xs font-bold text-[#3D6346] dark:text-emerald-300 hover:underline shrink-0 bg-[#E9F1EA] dark:bg-[#1C3022] px-3 py-1 rounded-full border border-[#3D6346]/20 dark:border-[#3D6346]/40 font-tajawal"
                >
                  تعيين كمقروء
                </button>
              )}
            </div>
          );
        })}

        {filteredNotifs.length === 0 && (
          <div className="bg-white/80 dark:bg-stone-900/80 p-12 text-center rounded-3xl border border-stone-200/80 dark:border-stone-800 text-stone-500 dark:text-stone-400 text-xs font-tajawal">
            لا توجد إشعارات لعرضها حالياً.
          </div>
        )}
      </div>

    </div>
  );
};
