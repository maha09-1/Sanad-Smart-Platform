import React from 'react';

interface SanadLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const SanadLogo: React.FC<SanadLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = ''
}) => {
  const iconBoxSize = size === 'sm' ? 'w-9 h-9' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Minimalist Luxury Emblem - Sage & Desert Sand */}
      <div className="relative group">
        <div className={`${iconBoxSize} rounded-2xl bg-gradient-to-br from-[#3D6346] via-[#2D4A34] to-[#1C3022] flex items-center justify-center border border-[#3D6346]/30 group-hover:border-[#3D6346] shadow-sm group-hover:shadow-md transition-all duration-300 relative overflow-hidden`}>
          {/* Subtle Al-Qatt corner accent */}
          <div className="absolute inset-0 qatt-corner-accent opacity-40"></div>
          
          {/* Refined Geometric Falcon & Diamond Emblem */}
          <svg className="w-5 h-5 relative z-10 text-stone-100 transform group-hover:scale-105 transition-transform duration-300" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoSage" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E5DFC9" />
              </linearGradient>
            </defs>
            {/* Minimal Diamond Frame */}
            <path d="M20 4L36 20L20 36L4 20L20 4Z" stroke="url(#logoSage)" strokeWidth="1.8" strokeLinejoin="round" />
            {/* Inner Chevron Falcon Motif */}
            <path d="M20 10L28 20L20 30L12 20L20 10Z" fill="url(#logoSage)" fillOpacity="0.25" stroke="url(#logoSage)" strokeWidth="1.2" />
            {/* Minimal Center Core */}
            <polygon points="20,16 23,20 20,24 17,20" fill="#FFFFFF" />
          </svg>
        </div>
      </div>

      {/* Brand Name "سَنَد" */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-black font-tajawal text-stone-900 dark:text-stone-100 tracking-tight ${titleSize}`}>
            سَنَد
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#3D6346]"></span>
        </div>
        {showTagline && (
          <span className="text-[10px] font-medium text-stone-500 dark:text-stone-400 tracking-wide font-cairo">
            المدير الذكي لمشاريع التخرج
          </span>
        )}
      </div>
    </div>
  );
};
