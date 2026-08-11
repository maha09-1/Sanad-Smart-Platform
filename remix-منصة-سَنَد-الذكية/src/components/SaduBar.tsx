import React from 'react';

interface SaduBarProps {
  className?: string;
  variant?: 'subtle' | 'full' | 'accent';
  height?: string;
}

export const SaduBar: React.FC<SaduBarProps> = ({
  className = '',
  variant = 'full',
  height = 'h-3'
}) => {
  return (
    <div
      className={`w-full overflow-hidden select-none ${height} ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 480 18"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="authenticSaduPattern"
            x="0"
            y="0"
            width="120"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            {/* 1. Longitudinal Top and Bottom Border Stripes (خطوط طولية متوازية) */}
            <line x1="0" y1="1" x2="120" y2="1" stroke="#3D6346" strokeWidth="1.2" opacity="0.85" />
            <line x1="0" y1="3" x2="120" y2="3" stroke="#D4C4A8" strokeWidth="0.8" opacity="0.6" />
            <line x1="0" y1="15" x2="120" y2="15" stroke="#D4C4A8" strokeWidth="0.8" opacity="0.6" />
            <line x1="0" y1="17" x2="120" y2="17" stroke="#3D6346" strokeWidth="1.2" opacity="0.85" />

            {/* Longitudinal Center Framing Guide Lines */}
            <line x1="0" y1="5.5" x2="120" y2="5.5" stroke="#3D6346" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
            <line x1="0" y1="12.5" x2="120" y2="12.5" stroke="#3D6346" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />

            {/* 2. Primary Precise Sadu Diamonds (معينات دقيقة - Motif 1 at x=25) */}
            <polygon points="25,4.5 32,9 25,13.5 18,9" fill="#3D6346" opacity={variant === 'subtle' ? 0.35 : 0.85} />
            <polygon points="25,6 29.5,9 25,12 20.5,9" fill="#D4C4A8" opacity="0.9" />
            <polygon points="25,7.2 27,9 25,10.8 23,9" fill="#2E4D36" />
            <circle cx="25" cy="9" r="0.75" fill="#FFFFFF" />

            {/* Primary Precise Sadu Diamonds (Motif 2 at x=60) */}
            <polygon points="60,4.5 67,9 60,13.5 53,9" fill="#3D6346" opacity={variant === 'subtle' ? 0.35 : 0.85} />
            <polygon points="60,6 64.5,9 60,12 55.5,9" fill="#D4C4A8" opacity="0.9" />
            <polygon points="60,7.2 62,9 60,10.8 58,9" fill="#2E4D36" />
            <circle cx="60" cy="9" r="0.75" fill="#FFFFFF" />

            {/* Primary Precise Sadu Diamonds (Motif 3 at x=95) */}
            <polygon points="95,4.5 102,9 95,13.5 88,9" fill="#3D6346" opacity={variant === 'subtle' ? 0.35 : 0.85} />
            <polygon points="95,6 99.5,9 95,12 90.5,9" fill="#D4C4A8" opacity="0.9" />
            <polygon points="95,7.2 97,9 95,10.8 93,9" fill="#2E4D36" />
            <circle cx="95" cy="9" r="0.75" fill="#FFFFFF" />

            {/* 3. Intersecting Geometric Connectors (Aweirjan / Diamond Chain Links) */}
            <polygon points="42.5,7 44.5,9 42.5,11 40.5,9" fill="#3D6346" opacity="0.7" />
            <polygon points="77.5,7 79.5,9 77.5,11 75.5,9" fill="#3D6346" opacity="0.7" />
            <polygon points="112.5,7 114.5,9 112.5,11 110.5,9" fill="#3D6346" opacity="0.7" />
            <polygon points="7.5,7 9.5,9 7.5,11 5.5,9" fill="#3D6346" opacity="0.7" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#authenticSaduPattern)" />
      </svg>
    </div>
  );
};
