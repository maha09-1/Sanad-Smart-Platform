import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UNIFIED_TEAM_AVATAR } from '../data/mockData';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid
} from 'recharts';
import {
  CheckCircle2, Clock, AlertCircle, ArrowUpRight,
  TrendingUp, Users, Sparkles, Bell, FileText, Crown
} from 'lucide-react';
import { AdvisorReportModal } from '../components/AdvisorReportModal';

export const DashboardView: React.FC = () => {
  const {
    currentTeam,
    currentProject,
    phases,
    tasks,
    notifications,
    setActivePage
  } = useApp();

  const [showAdvisorReportModal, setShowAdvisorReportModal] = useState(false);

  // Statistics calculations
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress' || t.status === 'review').length;
  const pendingTasks = tasks.filter(t => t.status === 'todo').length;

  // Overall progress percentage
  const overallProgress = totalTasks > 0
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  // Phase Chart Data
  const chartData = phases.map((phase, index) => {
    const phaseTasks = tasks.filter(t => t.phase_id === phase.phase_id);
    const completed = phaseTasks.filter(t => t.status === 'done').length;
    const progress = phaseTasks.length > 0 ? Math.round((completed / phaseTasks.length) * 100) : 0;
    const fullName = phase.phase_name.replace(/^[0-9]+\.\s*/, '');
    return {
      name: fullName,
      shortName: `مرحلة ${index + 1}`,
      percent: progress,
      totalTasks: phaseTasks.length,
      completedTasks: completed
    };
  });

  const COLORS = ['#3D6346', '#4B7354', '#5A8264', '#789D81', '#98B5A0'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-lg text-xs space-y-1.5 font-tajawal dir-rtl min-w-[200px]">
          <p className="font-bold text-stone-900 dark:text-stone-100">{data.name}</p>
          <div className="flex items-center justify-between gap-4 text-stone-600 dark:text-stone-300">
            <span>نسبة الإنجاز:</span>
            <span className="font-mono font-bold text-[#3D6346] dark:text-emerald-400">{data.percent}%</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-[11px] text-stone-500 dark:text-stone-400">
            <span>المهام المكتملة:</span>
            <span className="font-mono font-bold">{data.completedTasks} / {data.totalTasks}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Minimalist Luxury Sand & Sage Hero Card */}
      <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md text-stone-800 dark:text-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs border border-stone-200/80 dark:border-stone-800 relative overflow-hidden qatt-corner-accent">
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 bg-[#E9F1EA] dark:bg-[#1C3022] text-[#2E4D36] dark:text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-full border border-[#3D6346]/20 dark:border-[#3D6346]/40">
                <span className="w-2 h-2 rounded-full bg-[#3D6346] dark:bg-emerald-500"></span>
                <span className="font-tajawal">وكيل سند متصل الآن 🟢</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-stone-200/80 dark:border-stone-700">
                <Sparkles className="w-3.5 h-3.5 text-[#3D6346] dark:text-emerald-400" />
                <span className="font-tajawal">Minimalist Luxury • لمسة أصيلة</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight font-tajawal">
              سَنَد — إدارة مشاريع التخرج بهدوء وفخامة
            </h2>

            <p className="text-stone-600 dark:text-stone-300 text-sm font-medium max-w-2xl leading-relaxed bg-stone-50/80 dark:bg-stone-800/80 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-700/80">
              أهلاً بكم في منصة سَنَد.. الوكيل الذكي يراقب المهارات ويتابع إنجاز مشروع <span className="text-[#2E4D36] dark:text-emerald-400 font-bold font-tajawal">{currentProject?.name || 'المدير الذكي لمشاريع التخرج'}</span> ({currentTeam?.team_name}) بدقة وسلاسة متناهية.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              {/* Advisor Export Button */}
              <button
                onClick={() => setShowAdvisorReportModal(true)}
                className="px-5 py-3 bg-[#3D6346] hover:bg-[#2E4D36] text-white font-bold text-xs sm:text-sm rounded-full shadow-xs transition-all flex items-center gap-2.5 font-tajawal"
              >
                <FileText className="w-4 h-4 text-emerald-100" />
                <span>تصدير تقرير المشرف الأكاديمي 📄</span>
              </button>

              <button
                onClick={() => setActivePage('ai-ideas')}
                className="px-5 py-3 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 text-stone-800 dark:text-stone-200 font-bold text-xs sm:text-sm rounded-full border border-stone-200/80 dark:border-stone-700 transition-all flex items-center gap-2 font-tajawal"
              >
                <Sparkles className="w-4 h-4 text-[#3D6346] dark:text-emerald-400" />
                <span>مقترحات سَنَد الذكية</span>
              </button>

              <button
                onClick={() => setActivePage('task-assignment')}
                className="px-4 py-3 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold rounded-full border border-stone-200/80 dark:border-stone-800 transition-all font-tajawal"
              >
                توزيع المهام وعدالة السند
              </button>
            </div>
          </div>

          {/* Overall Progress Circle */}
          <div className="bg-stone-50/90 dark:bg-stone-800/90 border border-stone-200/80 dark:border-stone-700/80 p-5 rounded-3xl flex items-center gap-5 shrink-0 self-start md:self-auto shadow-xs">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-stone-200 dark:text-stone-700"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#3D6346] dark:text-emerald-400"
                  strokeDasharray={`${overallProgress}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xl font-bold text-stone-900 dark:text-stone-100 font-mono">
                {overallProgress}%
              </span>
            </div>
            <div>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-medium block">نسبة إنجاز المشروع</span>
              <span className="text-base font-bold text-stone-900 dark:text-stone-100 block mt-0.5 font-tajawal">
                {completedTasks} من أصل {totalTasks} مهام
              </span>
              <button
                onClick={() => setActivePage('project-overview')}
                className="text-xs text-[#3D6346] dark:text-emerald-400 font-bold flex items-center gap-1 mt-1 hover:underline font-tajawal"
              >
                <span>عرض المراحل والتفاصيل</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* فريق إنجاز سند (Sanad Developer Team Card) */}
      <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs relative overflow-hidden qatt-corner-accent">
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200/80 dark:border-stone-800 pb-4 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#3D6346] text-white flex items-center justify-center font-bold shadow-xs">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 font-tajawal">
                    فريق إنجاز سند 🌟
                  </h3>
                  <span className="bg-[#E9F1EA] dark:bg-[#1C3022] text-[#2E4D36] dark:text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#3D6346]/20 dark:border-[#3D6346]/40">
                    المطورات القائمات على المنصة
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  فريق التطوير والبرمجة الأكاديمية ذو التخصصات المكتملة
                </p>
              </div>
            </div>

            <button
              onClick={() => setActivePage('team')}
              className="text-xs font-bold text-[#3D6346] dark:text-emerald-400 hover:underline flex items-center gap-1 shrink-0 font-tajawal"
            >
              <span>إدارة الفريق والمهارات بالتفصيل</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4 Developers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Member 1: Jouri */}
            <div className="bg-stone-50/80 dark:bg-stone-800/80 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 relative space-y-2 hover:border-[#3D6346]/30 dark:hover:border-[#3D6346]/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="bg-[#3D6346] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  <span>قائدة الفريق</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-[#3D6346] dark:bg-emerald-500"></span>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <img src={UNIFIED_TEAM_AVATAR} alt="جوري" className="w-11 h-11 rounded-full object-cover ring-1 ring-stone-200 dark:ring-stone-700 shadow-xs shrink-0" />
                <div className="overflow-hidden">
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate font-tajawal">جوري بدر العتيبي</h4>
                  <p className="text-[11px] text-[#2E4D36] dark:text-emerald-300 font-semibold mt-0.5">مطورة الواجهات والأنظمة السحابية</p>
                  <p className="text-[10px] text-stone-400 dark:text-stone-500 font-mono mt-0.5 dir-ltr text-right truncate">itsjorybb@gmail.com</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                <span className="text-[10px] bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded-md font-medium border border-stone-200/60 dark:border-stone-700">React / Next.js</span>
                <span className="text-[10px] bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded-md font-medium border border-stone-200/60 dark:border-stone-700">Cloud Services</span>
              </div>
            </div>

            {/* Member 2: Maha */}
            <div className="bg-stone-50/80 dark:bg-stone-800/80 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 relative space-y-2 hover:border-[#3D6346]/30 dark:hover:border-[#3D6346]/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="bg-[#E9F1EA] dark:bg-[#1C3022] text-[#2E4D36] dark:text-emerald-300 border border-[#3D6346]/20 dark:border-[#3D6346]/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  عضو • تجربة المستخدم
                </span>
                <span className="w-2 h-2 rounded-full bg-[#3D6346] dark:bg-emerald-500"></span>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <img src={UNIFIED_TEAM_AVATAR} alt="مها" className="w-11 h-11 rounded-full object-cover ring-1 ring-stone-200 dark:ring-stone-700 shadow-xs shrink-0" />
                <div className="overflow-hidden">
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate font-tajawal">مها محمد البلوي</h4>
                  <p className="text-[11px] text-[#2E4D36] dark:text-emerald-300 font-semibold mt-0.5">مطورة UI/UX وتطبيقات الجوال</p>
                  <p className="text-[10px] text-stone-400 dark:text-stone-500 font-mono mt-0.5 dir-ltr text-right truncate">maha.albalawi09@gmail.com</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                <span className="text-[10px] bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded-md font-medium border border-stone-200/60 dark:border-stone-700">تصميم UI/UX</span>
                <span className="text-[10px] bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded-md font-medium border border-stone-200/60 dark:border-stone-700">Flutter</span>
              </div>
            </div>

            {/* Member 3: Rima */}
            <div className="bg-stone-50/80 dark:bg-stone-800/80 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 relative space-y-2 hover:border-[#3D6346]/30 dark:hover:border-[#3D6346]/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="bg-[#E9F1EA] dark:bg-[#1C3022] text-[#2E4D36] dark:text-emerald-300 border border-[#3D6346]/20 dark:border-[#3D6346]/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  عضو • قواعد البيانات
                </span>
                <span className="w-2 h-2 rounded-full bg-[#3D6346] dark:bg-emerald-500"></span>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <img src={UNIFIED_TEAM_AVATAR} alt="ريما" className="w-11 h-11 rounded-full object-cover ring-1 ring-stone-200 dark:ring-stone-700 shadow-xs shrink-0" />
                <div className="overflow-hidden">
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate font-tajawal">ريما صالح الزريقي</h4>
                  <p className="text-[11px] text-[#2E4D36] dark:text-emerald-300 font-semibold mt-0.5">مهندسة قواعد البيانات والربط</p>
                  <p className="text-[10px] text-stone-400 dark:text-stone-500 font-mono mt-0.5 dir-ltr text-right truncate">reemasaleh019@gmail.com</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                <span className="text-[10px] bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded-md font-medium border border-stone-200/60 dark:border-stone-700">14 الجدول الكاملة</span>
                <span className="text-[10px] bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded-md font-medium border border-stone-200/60 dark:border-stone-700">Node.js / Express</span>
              </div>
            </div>

            {/* Member 4: Aseel */}
            <div className="bg-stone-50/80 dark:bg-stone-800/80 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 relative space-y-2 hover:border-[#3D6346]/30 dark:hover:border-[#3D6346]/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="bg-[#E9F1EA] dark:bg-[#1C3022] text-[#2E4D36] dark:text-emerald-300 border border-[#3D6346]/20 dark:border-[#3D6346]/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  عضو • الذكاء الاصطناعي
                </span>
                <span className="w-2 h-2 rounded-full bg-[#3D6346] dark:bg-emerald-500"></span>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <img src={UNIFIED_TEAM_AVATAR} alt="أسيل" className="w-11 h-11 rounded-full object-cover ring-1 ring-stone-200 dark:ring-stone-700 shadow-xs shrink-0" />
                <div className="overflow-hidden">
                  <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate font-tajawal">أسيل رزق الحجيلي</h4>
                  <p className="text-[11px] text-[#2E4D36] dark:text-emerald-300 font-semibold mt-0.5">خبيرة خوارزميات الـ AI والتحليل</p>
                  <p className="text-[10px] text-stone-400 dark:text-stone-500 font-mono mt-0.5 dir-ltr text-right truncate">aseelalhejaili3@gmail.com</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                <span className="text-[10px] bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded-md font-medium border border-stone-200/60 dark:border-stone-700">Gemini 3.6 Flash</span>
                <span className="text-[10px] bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 px-2 py-0.5 rounded-md font-medium border border-stone-200/60 dark:border-stone-700">Python / NLP</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400 block">إجمالي المهام</span>
            <span className="text-2xl font-bold text-stone-900 dark:text-stone-100 mt-1 block font-mono">{totalTasks}</span>
            <span className="text-xs text-stone-400 dark:text-stone-500 mt-1 block">مقسمة على {phases.length} مراحل</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-[#3D6346] dark:text-emerald-400" />
          </div>
        </div>

        <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400 block">المهام المكتملة</span>
            <span className="text-2xl font-bold text-[#2E4D36] dark:text-emerald-300 mt-1 block font-mono">{completedTasks}</span>
            <span className="text-xs text-[#3D6346] dark:text-emerald-400 mt-1 block">تم الاعتماد والتسليم</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-[#E9F1EA] dark:bg-[#1C3022] text-[#2E4D36] dark:text-emerald-300 border border-[#3D6346]/20 dark:border-[#3D6346]/40 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400 block">قيد التنفيذ والمراجعة</span>
            <span className="text-2xl font-bold text-amber-800 dark:text-amber-400 mt-1 block font-mono">{inProgressTasks}</span>
            <span className="text-xs text-amber-700 dark:text-amber-500 mt-1 block">يعمل عليها الطلاب حالياً</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400 block">المهام المتبقية</span>
            <span className="text-2xl font-bold text-stone-800 dark:text-stone-200 mt-1 block font-mono">{pendingTasks}</span>
            <span className="text-xs text-stone-400 dark:text-stone-500 mt-1 block">في انتظار البدء والتوزيع</span>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Main Grid: Phase Progress Chart + Recent Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Phase Progress Chart (2 columns) */}
        <div className="lg:col-span-2 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200/80 dark:border-stone-800 pb-4">
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-tajawal">تقدم مراحل المشروع (Phases Progress)</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">نسبة إنجاز المهام المقترنة بكل مرحلة من مراحل المشروع</p>
            </div>
            <button
              onClick={() => setActivePage('kanban')}
              className="text-xs font-bold text-[#2E4D36] dark:text-emerald-300 bg-[#E9F1EA] dark:bg-[#1C3022] hover:bg-[#d8e8dc] dark:hover:bg-[#27422f] px-3.5 py-1.5 rounded-full border border-[#3D6346]/20 dark:border-[#3D6346]/40 transition-all font-tajawal self-start sm:self-auto"
            >
              فتح لوحة Kanban
            </button>
          </div>

          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 15, right: 10, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-stone-200/80 dark:stroke-stone-800/80" />
                <XAxis
                  dataKey="shortName"
                  tickLine={false}
                  axisLine={{ stroke: 'currentColor', strokeOpacity: 0.15 }}
                  tick={{ fontSize: 12, fontWeight: 700, fill: 'currentColor' }}
                  className="text-stone-700 dark:text-stone-300 font-tajawal"
                  dy={6}
                />
                <YAxis
                  domain={[0, 100]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: 'currentColor' }}
                  className="text-stone-400 dark:text-stone-500 font-mono"
                  unit="%"
                  dx={-4}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="percent" radius={[8, 8, 0, 0]} maxBarSize={48}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Phase Names Legend Cards below chart */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 pt-2 border-t border-stone-200/80 dark:border-stone-800">
            {chartData.map((item, idx) => (
              <div
                key={idx}
                className="bg-stone-50/80 dark:bg-stone-800/60 p-2.5 rounded-xl border border-stone-200/60 dark:border-stone-700/60 text-xs space-y-1"
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  ></span>
                  <span className="font-bold text-stone-800 dark:text-stone-200 font-tajawal truncate">
                    {item.shortName}
                  </span>
                </div>
                <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate" title={item.name}>
                  {item.name}
                </p>
                <div className="flex items-center justify-between text-[10px] text-[#2E4D36] dark:text-emerald-400 font-mono font-bold pt-0.5">
                  <span>{item.percent}%</span>
                  <span className="text-stone-400 font-normal">{item.completedTasks}/{item.totalTasks}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Notifications Box (1 column) */}
        <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-stone-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#3D6346] dark:text-emerald-400" />
                <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 font-tajawal">آخر التنبيهات</h3>
              </div>
              <span className="text-[11px] font-medium text-stone-400 dark:text-stone-500">آخر 5 إشعارات</span>
            </div>

            <div className="space-y-2.5">
              {notifications.slice(0, 5).map(notif => (
                <div
                  key={notif.notification_id}
                  className={`p-3 rounded-2xl border text-xs transition-all ${
                    notif.type === 'warning' || notif.type === 'alert'
                      ? 'bg-amber-50/80 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800/60 text-stone-800 dark:text-stone-200'
                      : notif.type === 'success'
                        ? 'bg-[#E9F1EA]/80 dark:bg-[#1C3022]/80 border-[#3D6346]/20 dark:border-[#3D6346]/40 text-stone-800 dark:text-stone-200'
                        : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200/60 dark:border-stone-700/60 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <p className="font-medium leading-relaxed">{notif.message}</p>
                  <span className="text-[10px] opacity-60 block mt-1 font-mono">
                    {new Date(notif.created_at).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActivePage('notifications')}
            className="w-full py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 text-stone-700 dark:text-stone-300 text-xs font-bold rounded-full transition-colors text-center border border-stone-200/80 dark:border-stone-700 block mt-2 font-tajawal"
          >
            عرض مركز الإشعارات بالكامل
          </button>
        </div>

      </div>

      {/* Quick Actions Footer Bar */}
      <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-stone-200/80 dark:border-stone-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#E9F1EA] dark:bg-[#1C3022] text-[#2E4D36] dark:text-emerald-300 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4 text-[#3D6346] dark:text-emerald-400" />
          </div>
          <p className="text-xs font-medium text-stone-600 dark:text-stone-300">
            هل ترغب في اقتراح أفكار جديدة أو توزيع المهام استناداً لنقاط قوة الطلاب عبر وكيل سند الذكي؟
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePage('ai-ideas')}
            className="bg-[#3D6346] hover:bg-[#2E4D36] text-white px-4 py-2 rounded-full text-xs font-bold transition-all font-tajawal"
          >
            سند يقترح أفكاراً
          </button>
          <button
            onClick={() => setActivePage('task-assignment')}
            className="bg-stone-100 dark:bg-stone-800 hover:bg-stone-200/80 dark:hover:bg-stone-700/80 text-stone-800 dark:text-stone-200 border border-stone-200/80 dark:border-stone-700 px-4 py-2 rounded-full text-xs font-bold transition-all font-tajawal"
          >
            توزيع المهام وعدالة السند
          </button>
        </div>
      </div>

      <AdvisorReportModal isOpen={showAdvisorReportModal} onClose={() => setShowAdvisorReportModal(false)} />
    </div>
  );
};
