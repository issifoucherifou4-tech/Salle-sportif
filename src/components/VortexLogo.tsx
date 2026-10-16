import React from 'react';

interface VortexLogoProps {
  className?: string;
  variant?: 'crimson' | 'dark' | 'white' | 'silver';
  size?: number;
  showText?: boolean;
}

export const VortexLogo: React.FC<VortexLogoProps> = ({
  className = '',
  variant = 'crimson',
  size = 36,
  showText = false,
}) => {
  const getColors = () => {
    switch (variant) {
      case 'white':
        return {
          primary: '#ffffff',
          secondary: '#e2e8f0',
          accent: '#ffffff',
          text: '#ffffff',
        };
      case 'dark':
        return {
          primary: '#0f172a',
          secondary: '#334155',
          accent: '#dc2626',
          text: '#0f172a',
        };
      case 'silver':
        return {
          primary: '#94a3b8',
          secondary: '#cbd5e1',
          accent: '#0284c7',
          text: '#0f172a',
        };
      case 'crimson':
      default:
        return {
          primary: '#dc2626',
          secondary: '#991b1b',
          accent: '#ef4444',
          text: '#0f172a',
        };
    }
  };

  const colors = getColors();

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        {/* Background shield/rhombus subtle glow */}
        <path
          d="M50 4L92 27V73L50 96L8 73V27L50 4Z"
          fill={variant === 'white' ? 'rgba(255,255,255,0.08)' : 'rgba(220,38,38,0.08)'}
          stroke={colors.primary}
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Dynamic Stylized Athletic 'V' Vortex Blades */}
        <path
          d="M26 30L50 78L74 30H61L50 56L39 30H26Z"
          fill={colors.primary}
        />
        
        {/* Central Core Power Diamond */}
        <polygon
          points="50,22 58,36 50,48 42,36"
          fill={colors.accent}
        />

        {/* Speed Chevrons */}
        <path
          d="M50 82L32 46H20L50 92L80 46H68L50 82Z"
          fill={colors.secondary}
          opacity="0.8"
        />
      </svg>

      {showText && (
        <span className="font-athletic text-2xl font-black uppercase tracking-tight text-slate-950 dark:text-white leading-none">
          SALLE<span className="text-red-600 font-light">·</span>SPORTIF
        </span>
      )}
    </div>
  );
};
