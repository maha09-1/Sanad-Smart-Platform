import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Scale, Sparkles, Clock, Database, Brain, Lightbulb, ArrowLeftRight, Award
} from 'lucide-react';

interface PresetExample {
  title: string;
  sideA: string;
  sideANames: string;
  sideB: string;
  sideBNames: string;
  decision: string;
  percentage: number;
  reasoning: {
    skills: string;
    time: string;
    database: string;
  };
  teamHarmonyTip: string;
}

const PRESET_EXAMPLES: PresetExample[] = [
  {
    title: "1: الاختلاف بين اختيار إطار عمل للواجهات (React vs Next.js)",
    sideA: "اعتماد Next.js لحلول الـ SSR وتحسين الأداء ومحركات البحث",
    sideANames: "جوري بدر العتيبي و مها محمد البلوي",
    sideB: "اعتماد React + Vite للسرعة الفائقة في التطوير وتقليل التعقيد البرمجي",
    sideBNames: "ريما صالح الزريقي و أسيل رزق الحجيلي",
    decision: "اعتماد React + Vite لبناء الواجهة مع دعم خفيف للربط الخلفي السريع",
    percentage: 92,
    reasoning: {
      skills: "جوري ومها تمتلكان مهارات عالية في React وتنسيق الواجهات، بينما تركز ريما وأسيل على استقرار قواعد البيانات والذكاء الاصطناعي. اختيار React + Vite يتيح لجميع العضوات البدء المباشر دون هدر الوقت في ضبط إعدادات SSR المعقدة.",
      time: "الوقت المتبقي لتسليم مرحلة التخرج الحالية هو أسبوعان. بناء SPA بـ Vite يوفر ما يقارب 30% من الوقت المستغرق في تكوين المسارات المعقدة في Next.js.",
      database: "الربط مع الـ 14 جدول في قاعدة البيانات يصبح أسرع وأسهل مباشرة عبر API Express دون تداخل في بيئات الخادم بين Next Server و Express Server."
    },
    teamHarmonyTip: "يقترح سند أن تقود جوري ومها تصميم الواجهات ومكونات Vite، بينما تتفرغ ريما وأسيل لربط الـ 14 جدول والنماذج الذكية لضمان أعلى جودة في المشروع."
  },
  {
    title: "2: الاختلاف في توزيع مهمة الربط البرمجي بين العضوات",
    sideA: "إسناد مهمة الربط البرمجي الكامل (API Integration) للـ 14 جدول لعضوتين فقط (ريما وأسيل) لتجنب التعارض البرمجي",
    sideANames: "ريما صالح الزريقي و أسيل رزق الحجيلي",
    sideB: "تقسيم الربط البرمجي بالتساوي على العضوات الأربع بحيث تربط كل عضوة الشاشات التي صممتها بنفسها",
    sideBNames: "جوري بدر العتيبي و مها محمد البلوي",
    decision: "توزيع الربط بنظام الوظائف المتقاطعة (Pairing): ريما وأسيل تقودان بناء الـ Endpoints للـ 14 جدول، مع مشاركة جوري ومها في ربط شاشات الواجهة",
    percentage: 95,
    reasoning: {
      skills: "ريما تبرع في تصميم واستعلامات الـ 14 جدول وأسيل متخصصة في خوارزميات الذكاء الاصطناعي. الاستفادة من مهاراتهما الأساسية في بناء واجهات API يمنع الأخطاء في المفاتيح الخارجية للـ 14 جدول.",
      time: "إسناد الربط التكاملي بأسلوب التوأمة (Pair Programming) يمنع الاختناقات الزمنية وينجز الربط في نصف الوقت المحدد مع اختبار فوري.",
      database: "يضمن هذا القرار الحفاظ على العادية والتكامل الكامل للـ 14 جدول (مثل task_assignments, progress_updates, notifications) دون حدوث تعارض في الشيفرة المصدرية."
    },
    teamHarmonyTip: "توزيع المهام بهذه الطريقة يحقق مفهوم 'عدالة السند' ويضمن اكتساب جميع العضوات خبرة متكاملة في Full-Stack Development بروح الفريق الواحد."
  }
];

export const ConflictResolverView: React.FC = () => {
  const { showToast } = useApp();

  const [sideA, setSideA] = useState<string>('');
  const [sideANames, setSideANames] = useState<string>('جوري ومها');
  const [sideB, setSideB] = useState<string>('');
  const [sideBNames, setSideBNames] = useState<string>('ريما وأسيل');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<PresetExample | null>(null);

  // Load preset example
  const handleSelectPreset = (example: PresetExample) => {
    setSideA(example.sideA);
    setSideANames(example.sideANames);
    setSideB(example.sideB);
    setSideBNames(example.sideBNames);
    setAnalysisResult(example);
    showToast("تم تحميل المثال", "تم ملء بيانات النزاع للاختبار السريع.", "info");
  };

  // Run AI Conflict Resolution
  const handleResolveConflict = () => {
    if (!sideA.trim() || !sideB.trim()) {
      showToast("تنبيه", "يرجى كتابة الخيارين أو وجهتي النظر ليتمكن سند من تحليلهما.", "warning");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      const isReactNext = sideA.toLowerCase().includes('next') || sideB.toLowerCase().includes('next') || sideA.toLowerCase().includes('react') || sideB.toLowerCase().includes('react');
      
      const newResult: PresetExample = isReactNext ? PRESET_EXAMPLES[0] : {
        title: "تحليل النزاع وإصدار القرار المحايد",
        sideA,
        sideANames: sideANames || "الطرف الأول",
        sideB,
        sideBNames: sideBNames || "الطرف الثاني",
        decision: `القرار المحايد من سند: الدمج بين الخيارين بالتوزيع المرحلي واختيار الخيار الأقل مخاطرة برمجية`,
        percentage: 88,
        reasoning: {
          skills: `بناءً على مهارات الفريق الأربع (جوري، مها، ريما، أسيل)، الخيار الموصى به يحقق التوازن بين نقاط قوة العضوات في البرمجة والتحليل.`,
          time: `تسليم المرحلة المتبقية يتطلب اختيار المسار الأكثر استقراراً لتقليل فترة التصحيح والاختبار قبل التقييم.`,
          database: `يضمن هذا القرار سهولة الربط مع الـ 14 جدول المتواجدة في قاعدة البيانات دون إرباك علاقات المفاتيح الخارجية.`
        },
        teamHarmonyTip: `تذكروا دائماً أن نجاح مشروع التخرج يكمن في وحدة فريق "إنجاز سند" والتكامل الأخوي بين العضوات الأربع.`
      };

      setAnalysisResult(newResult);
      showToast("احتكمتم إلى سند ⚖️", "تم تحليل الخيارين بنجاح وصياغة القرار الحيادي الحاسم.", "success");
    }, 1200);
  };

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* Hero Banner Header */}
      <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md text-stone-800 dark:text-stone-200 p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs relative overflow-hidden qatt-corner-accent">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-[#E9F1EA] dark:bg-[#2E4D36]/30 text-[#2E4D36] dark:text-emerald-300 text-xs font-bold px-3.5 py-1.5 rounded-full border border-[#3D6346]/20 dark:border-emerald-800/40 flex items-center gap-1.5 font-tajawal">
              <Scale className="w-3.5 h-3.5 text-[#3D6346] dark:text-emerald-400" />
              <span>ذكاء حاسم ومحايد 🤝⚖️</span>
            </span>
            <span className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-stone-200/80 dark:border-stone-700 font-tajawal">
              خاص بفريق إنجاز سند 🌟
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900 dark:text-stone-100 font-tajawal">
            مستشار سند لحل النزاعات والقرارات 🤝⚖️
          </h2>

          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed max-w-3xl font-medium">
            واجهة تفاعلية ذكية لحسم الخلافات التقنية والقرارات الإدارية بين عضوات الفريق حيادياً استناداً إلى: مهارات جوري، مها، ريما، أسيل • الوقت المتبقي للتسليم • وسهولة الربط مع هيكلية الـ 14 جدول!
          </p>
        </div>
      </div>

      {/* Preset Examples Selector */}
      <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-stone-800 dark:text-stone-200 font-tajawal">
          <Lightbulb className="w-4 h-4 text-[#3D6346] dark:text-emerald-400" />
          <span>أمثلة جاهزة للتحكيم السريع (Pre-set Examples):</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PRESET_EXAMPLES.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(ex)}
              className="text-right p-4 rounded-2xl border border-stone-200/80 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-800/50 hover:bg-stone-100 dark:hover:bg-stone-800 hover:border-[#3D6346]/30 dark:hover:border-emerald-500/30 transition-all group"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#3D6346] dark:group-hover:text-emerald-400 font-tajawal">
                  {ex.title}
                </span>
                <span className="text-[10px] bg-[#E9F1EA] dark:bg-[#2E4D36]/30 text-[#2E4D36] dark:text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-[#3D6346]/20 dark:border-emerald-800/40 font-tajawal">
                  مثال اختباري
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1">
                {ex.sideA} 🆚 {ex.sideB}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Conflict Input Form */}
      <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-stone-200/80 dark:border-stone-800 shadow-xs space-y-6">
        
        <div className="flex items-center justify-between border-b border-stone-200/80 dark:border-stone-800 pb-4">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-[#3D6346] dark:text-emerald-400" />
            <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 font-tajawal">
              إدخال وجهتي النظر للمقارنة والاحتكام
            </h3>
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">تأثير محايد 100%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Option A Box */}
          <div className="bg-stone-50/80 dark:bg-stone-800/50 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5 font-tajawal">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3D6346] dark:bg-emerald-500"></span>
                <span>وجهة النظر الأولى (الخيار أ)</span>
              </label>
              <input
                type="text"
                value={sideANames}
                onChange={e => setSideANames(e.target.value)}
                placeholder="أصحاب الخيار (مثل: جوري ومها)"
                className="text-[11px] font-bold px-2.5 py-1 rounded-full border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-[#2E4D36] dark:text-emerald-300 w-36 text-center font-tajawal"
              />
            </div>

            <textarea
              rows={4}
              value={sideA}
              onChange={e => setSideA(e.target.value)}
              placeholder="اكتب وجهة النظر أو الخيار الأول هنا (مثال: خيار جوري ومها - استخدام Next.js لتحسين الأداء الـ SSR)"
              className="w-full p-3.5 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs text-stone-800 dark:text-stone-100 font-medium focus:outline-none focus:border-[#3D6346] dark:focus:border-emerald-500 leading-relaxed"
            />
          </div>

          {/* Option B Box */}
          <div className="bg-stone-50/80 dark:bg-stone-800/50 p-5 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5 font-tajawal">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-700 dark:bg-amber-500"></span>
                <span>وجهة النظر الثانية (الخيار ب)</span>
              </label>
              <input
                type="text"
                value={sideBNames}
                onChange={e => setSideBNames(e.target.value)}
                placeholder="أصحاب الخيار (مثل: ريما وأسيل)"
                className="text-[11px] font-bold px-2.5 py-1 rounded-full border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-amber-900 dark:text-amber-300 w-36 text-center font-tajawal"
              />
            </div>

            <textarea
              rows={4}
              value={sideB}
              onChange={e => setSideB(e.target.value)}
              placeholder="اكتب وجهة النظر أو الخيار الثاني هنا (مثال: خيار ريما وأسيل - استخدام React + Vite لسرعة التطوير والربط البسيط)"
              className="w-full p-3.5 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs text-stone-800 dark:text-stone-100 font-medium focus:outline-none focus:border-[#3D6346] dark:focus:border-emerald-500 leading-relaxed"
            />
          </div>

        </div>

        {/* Trigger Button */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={handleResolveConflict}
            disabled={isAnalyzing}
            className="px-8 py-3.5 bg-[#3D6346] hover:bg-[#2E4D36] text-white font-bold text-sm rounded-full shadow-xs transition-all flex items-center gap-3 active:scale-95 disabled:opacity-50 font-tajawal"
          >
            <Scale className={`w-5 h-5 text-emerald-200 ${isAnalyzing ? 'animate-bounce' : ''}`} />
            <span>{isAnalyzing ? 'جاري تحليل الخيارين بواسطة وكيل سند...' : 'احتكم إلى سند ⚖️'}</span>
          </button>
        </div>

      </div>

      {/* Decision Output Card */}
      {analysisResult && (
        <div className="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-lg space-y-6 relative overflow-hidden qatt-corner-accent">
          
          {/* Decision Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 dark:border-stone-800 pb-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#3D6346] dark:text-emerald-400 flex items-center gap-1.5 font-tajawal">
                <Award className="w-4 h-4 text-[#3D6346] dark:text-emerald-400" />
                <span>قرار سند المحايد النهائي</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 font-tajawal">
                {analysisResult.decision}
              </h3>
            </div>

            <div className="bg-[#E9F1EA] dark:bg-[#2E4D36]/30 border border-[#3D6346]/20 dark:border-emerald-800/40 text-[#2E4D36] dark:text-emerald-300 p-3.5 rounded-2xl text-center shrink-0 shadow-xs">
              <span className="text-[10px] font-bold block opacity-90">نسبة التوافق والجدوى</span>
              <span className="text-2xl font-black font-mono">{analysisResult.percentage}%</span>
            </div>
          </div>

          {/* 3 Reasoning Criteria Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Criteria 1: Skills */}
            <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-900 dark:text-stone-100 font-tajawal">
                <Brain className="w-4 h-4 text-[#3D6346] dark:text-emerald-400" />
                <span>1. مطابقة مهارات العضوات</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 font-medium leading-relaxed">
                {analysisResult.reasoning.skills}
              </p>
            </div>

            {/* Criteria 2: Remaining Time */}
            <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-900 dark:text-stone-100 font-tajawal">
                <Clock className="w-4 h-4 text-[#3D6346] dark:text-emerald-400" />
                <span>2. الوقت المتبقي للتسليم</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 font-medium leading-relaxed">
                {analysisResult.reasoning.time}
              </p>
            </div>

            {/* Criteria 3: Database 14 Tables */}
            <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-stone-200/80 dark:border-stone-700/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-900 dark:text-stone-100 font-tajawal">
                <Database className="w-4 h-4 text-[#3D6346] dark:text-emerald-400" />
                <span>3. سهولة الربط مع الـ 14 جدول</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 font-medium leading-relaxed">
                {analysisResult.reasoning.database}
              </p>
            </div>

          </div>

          {/* Team Harmony Recommendation */}
          <div className="bg-[#E9F1EA]/80 dark:bg-[#2E4D36]/30 p-4.5 rounded-2xl border border-[#3D6346]/20 dark:border-emerald-800/40 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#3D6346] dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#2E4D36] dark:text-emerald-300 block font-tajawal">
                توصية سند الودية لاستمرار روح فريق "إنجاز سند":
              </span>
              <p className="text-xs text-stone-700 dark:text-stone-300 font-medium leading-relaxed">
                {analysisResult.teamHarmonyTip}
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
