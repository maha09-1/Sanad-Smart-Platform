import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import {
  Sparkles, Filter, Code2, AlertCircle, BookmarkPlus, Layers
} from 'lucide-react';

export const AiSuggestionsView: React.FC = () => {
  const {
    currentTeam,
    interests,
    projectIdeas,
    selectProjectIdea,
    showToast,
    refreshData
  } = useApp();

  const [selectedInterestFilter, setSelectedInterestFilter] = useState<string>('all');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // Handle Generate Ideas via Gemini API
  const handleGenerateAiIdeas = async () => {
    try {
      setIsAiLoading(true);
      const filter = selectedInterestFilter === 'all' ? undefined : selectedInterestFilter;
      const res = await api.suggestIdeasAI(currentTeam?.team_id, filter);
      await refreshData();
      showToast(
        "تم توليد الأفكار بالذكاء الاصطناعي",
        res.is_ai_generated
          ? "تم توليد أفكار جديدة مخصصة بالكامل استناداً لمهارات واهتمامات فريقك بواسطة Gemini."
          : "تم تجهيز الأفكار الموصى بها.",
        "success"
      );
    } catch (err) {
      showToast("خطأ", "فشل توليد المقترحات بالذكاء الاصطناعي.", "error");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Filtered Ideas
  const filteredIdeas = projectIdeas.filter(idea => {
    if (selectedInterestFilter === 'all') return true;
    return idea.related_interest === selectedInterestFilter;
  });

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Hero Banner */}
      <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md text-stone-800 dark:text-stone-200 p-6 sm:p-8 rounded-3xl shadow-xs border border-stone-200/80 dark:border-stone-800 relative overflow-hidden qatt-corner-accent">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#E9F1EA] dark:bg-[#2E4D36]/30 text-[#2E4D36] dark:text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-full border border-[#3D6346]/20 dark:border-emerald-800/40">
              <Sparkles className="w-3.5 h-3.5 text-[#3D6346] dark:text-emerald-400" />
              <span className="font-tajawal">وكيل سند الذكي — المحرك التوليدي الفائق</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900 dark:text-stone-100 font-tajawal">
              سند يقترح أفكاراً تلائم اهتمامات ومهارات الفريق 💡
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed font-medium">
              يقوم وكيل سند الذكي بتحليل نقاط قوة جميع أعضاء الفريق واهتماماتهم التقنية، ثم يولد أفكار مشاريع تخرج مبتكرة وقابلة للتطبيق.
            </p>
          </div>

          <button
            onClick={handleGenerateAiIdeas}
            disabled={isAiLoading}
            className="bg-[#3D6346] hover:bg-[#2E4D36] text-white font-bold px-6 py-3.5 rounded-full text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-xs transition-all shrink-0 active:scale-95 disabled:opacity-50 font-tajawal"
          >
            <Sparkles className={`w-4 h-4 text-emerald-200 ${isAiLoading ? 'animate-spin' : ''}`} />
            <span>{isAiLoading ? 'جاري التحليل وتوليد الأفكار...' : 'دع سند يقترح أفكاراً جديدة ✨'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs by Interest */}
      <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-4 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-700 dark:text-stone-300 font-tajawal">
          <Filter className="w-4 h-4 text-[#3D6346] dark:text-emerald-400" />
          <span>فلترة الأفكار حسب المجال:</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedInterestFilter('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedInterestFilter === 'all'
                ? 'bg-[#3D6346] text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200/80 dark:hover:bg-stone-700 border border-stone-200/80 dark:border-stone-700'
            }`}
          >
            جميع المجالات ({projectIdeas.length})
          </button>
          {interests.map(int => (
            <button
              key={int.interest_id}
              onClick={() => setSelectedInterestFilter(int.interest_name)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedInterestFilter === int.interest_name
                  ? 'bg-[#3D6346] text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200/80 dark:hover:bg-stone-700 border border-stone-200/80 dark:border-stone-700'
              }`}
            >
              {int.interest_name}
            </button>
          ))}
        </div>
      </div>

      {/* Ideas Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIdeas.map(idea => (
          <div
            key={idea.idea_id}
            className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#3D6346]/40 dark:hover:border-emerald-500/40 transition-all group"
          >
            <div className="space-y-3">
              {/* Card Header badges */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#2E4D36] dark:text-emerald-300 bg-[#E9F1EA] dark:bg-[#2E4D36]/30 px-3 py-1 rounded-full border border-[#3D6346]/20 dark:border-emerald-800/40 font-tajawal">
                  {idea.related_interest}
                </span>

                <div className="flex items-center gap-2">
                  {idea.created_by_ai && (
                    <span className="text-[10px] font-bold text-[#1C3022] dark:text-emerald-200 bg-[#E9F1EA] dark:bg-[#2E4D36]/40 border border-[#3D6346]/30 dark:border-emerald-700/50 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-tajawal">
                      <Sparkles className="w-3 h-3 text-[#3D6346] dark:text-emerald-400" />
                      مقترح AI
                    </span>
                  )}
                  {idea.difficulty && (
                    <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200/80 dark:border-stone-700">
                      مستوى: {idea.difficulty}
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#3D6346] dark:group-hover:text-emerald-400 transition-colors leading-snug font-tajawal">
                {idea.title}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                {idea.description}
              </p>

              {/* Tech Stack */}
              {idea.tech_stack && idea.tech_stack.length > 0 && (
                <div className="pt-3 border-t border-stone-200/80 dark:border-stone-800">
                  <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 block mb-1.5 flex items-center gap-1 font-tajawal">
                    <Code2 className="w-3.5 h-3.5 text-[#3D6346] dark:text-emerald-400" />
                    التقنيات المقترحة:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {idea.tech_stack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[11px] font-medium px-2.5 py-0.5 rounded-md border border-stone-200/60 dark:border-stone-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Phases preview */}
              {idea.suggested_phases && idea.suggested_phases.length > 0 && (
                <div className="pt-3 border-t border-stone-200/80 dark:border-stone-800 space-y-1">
                  <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 block mb-1 flex items-center gap-1 font-tajawal">
                    <Layers className="w-3.5 h-3.5 text-[#3D6346] dark:text-emerald-400" />
                    المراحل المتوقعة ({idea.suggested_phases.length}):
                  </span>
                  <ul className="text-xs text-stone-600 dark:text-stone-300 space-y-1 pr-2">
                    {idea.suggested_phases.slice(0, 3).map((ph, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3D6346] dark:bg-emerald-500"></span>
                        <span>{ph}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Select Idea Button */}
            <button
              onClick={() => selectProjectIdea(idea)}
              className="w-full mt-4 py-3 bg-[#3D6346] hover:bg-[#2E4D36] text-white font-bold text-xs rounded-full transition-all flex items-center justify-center gap-2 shadow-xs font-tajawal"
            >
              <BookmarkPlus className="w-4 h-4 text-emerald-200" />
              <span>اختيار هذه الفكرة واعتمادها للمشروع</span>
            </button>
          </div>
        ))}

        {filteredIdeas.length === 0 && (
          <div className="col-span-full bg-white/80 dark:bg-stone-900/80 p-12 text-center rounded-3xl border border-stone-200/80 dark:border-stone-800 space-y-3">
            <AlertCircle className="w-10 h-10 text-stone-400 dark:text-stone-500 mx-auto" />
            <h4 className="text-base font-bold text-stone-800 dark:text-stone-200 font-tajawal">لا توجد أفكار مشاريع مسجلة في هذا المجال</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400">انقر على "دع سند يقترح أفكاراً جديدة" لتوليد خيارات فورية.</p>
          </div>
        )}
      </div>

    </div>
  );
};
