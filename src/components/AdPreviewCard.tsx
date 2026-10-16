import React, { useState } from 'react';
import { AdCreative } from '../types/gym';
import { Dumbbell, ArrowUpRight, Flame, ShieldCheck } from 'lucide-react';

interface AdPreviewCardProps {
  creative: AdCreative;
  onCtaClick?: () => void;
  onEditClick?: () => void;
  showEditAffordance?: boolean;
  className?: string;
}

export const AdPreviewCard: React.FC<AdPreviewCardProps> = ({
  creative,
  onCtaClick,
  onEditClick,
  showEditAffordance = false,
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);

  // Theme color maps
  const getThemeClasses = () => {
    switch (creative.theme) {
      case 'volt':
        return {
          highlight: 'text-lime-400',
          accentBg: 'bg-lime-400 text-black hover:bg-lime-300',
          badgeText: 'text-lime-400',
          borderAccent: 'border-lime-400/40',
          glow: 'shadow-lime-500/20',
        };
      case 'obsidian':
        return {
          highlight: 'text-white underline decoration-neutral-500',
          accentBg: 'bg-white text-black hover:bg-neutral-200',
          badgeText: 'text-neutral-300',
          borderAccent: 'border-white/30',
          glow: 'shadow-white/10',
        };
      case 'bronze':
        return {
          highlight: 'text-amber-300',
          accentBg: 'bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 hover:from-amber-300 hover:to-amber-400',
          badgeText: 'text-amber-300',
          borderAccent: 'border-amber-400/30',
          glow: 'shadow-amber-500/20',
        };
      case 'chrome':
        return {
          highlight: 'text-sky-300',
          accentBg: 'bg-sky-400 text-neutral-950 hover:bg-sky-300',
          badgeText: 'text-sky-300',
          borderAccent: 'border-sky-400/30',
          glow: 'shadow-sky-500/20',
        };
      case 'clean_light':
        return {
          highlight: 'text-red-500 drop-shadow',
          accentBg: 'bg-red-600 text-white hover:bg-red-500',
          badgeText: 'text-red-400 font-extrabold',
          borderAccent: 'border-red-500/40',
          glow: 'shadow-red-600/30',
        };
      case 'platinum':
        return {
          highlight: 'text-sky-400 drop-shadow',
          accentBg: 'bg-white text-slate-950 hover:bg-slate-100',
          badgeText: 'text-sky-300 font-extrabold',
          borderAccent: 'border-sky-300/40',
          glow: 'shadow-sky-500/20',
        };
      case 'crimson':
      default:
        return {
          highlight: 'text-red-500',
          accentBg: 'bg-red-600 text-white hover:bg-red-500',
          badgeText: 'text-red-400',
          borderAccent: 'border-red-500/40',
          glow: 'shadow-red-600/30',
        };
    }
  };

  const theme = getThemeClasses();

  // Format classes
  const getFormatClasses = () => {
    switch (creative.format) {
      case 'social_square':
        return 'aspect-square max-w-xl mx-auto';
      case 'story_vertical':
        return 'aspect-[9/16] max-w-sm mx-auto';
      case 'compact_leader':
        return 'min-h-[260px] md:min-h-[300px] w-full';
      case 'banner_hero':
      default:
        return 'min-h-[560px] lg:min-h-[660px] w-full';
    }
  };

  const overlayOpacity = creative.overlayDarkness / 100;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/15 bg-slate-950 transition-all select-none group shadow-2xl ${getFormatClasses()} ${className}`}
    >
      {/* Background Image with Fallback */}
      <div className="absolute inset-0 z-0">
        {!imageError ? (
          <img
            src={creative.imageUrl}
            alt={creative.imageAlt || 'Publicité club de fitness'}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 ${
              creative.monochromeFilter ? 'grayscale contrast-125' : ''
            } ${creative.contrastBoost ? 'contrast-115 saturate-110' : ''}`}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-black flex items-center justify-center p-8">
            <div className="text-center text-neutral-400">
              <Dumbbell className="w-16 h-16 mx-auto mb-3 opacity-40 text-white" />
              <p className="text-sm tracking-widest font-mono uppercase">Vortex Performance Club</p>
            </div>
          </div>
        )}

        {/* Dynamic Gradient Scrim balanced for legibility while keeping image luminous */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"
          style={{ opacity: overlayOpacity }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-transparent" />
      </div>

      {/* Edit Affordance Button (if displayed on hero/preview) */}
      {showEditAffordance && onEditClick && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEditClick();
          }}
          className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-white/90 hover:bg-white text-slate-950 text-xs font-bold uppercase tracking-wider rounded border border-white/40 backdrop-blur transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
          title="Modifier les textes, l'image ou la couleur de cet encart"
        >
          <span>Modifier l’édit pub</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Foreground Content */}
      <div className="relative z-10 h-full p-6 sm:p-10 lg:p-14 flex flex-col justify-between">
        {/* Top Kicker / Badge */}
        <div>
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            <span className={`text-xs sm:text-sm font-bold tracking-widest uppercase ${theme.badgeText}`}>
              {creative.badgeText}
            </span>
          </div>

          {creative.offerTag && (
            <div className="mb-4">
              <span className="inline-block py-1 px-2.5 text-xs font-black uppercase tracking-wider bg-white/10 text-white border border-white/20 rounded">
                {creative.offerTag}
              </span>
            </div>
          )}
        </div>

        {/* Center / Bottom Athletic Typography Content */}
        <div className="max-w-3xl mt-auto">
          <h1 className="font-athletic text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tight text-white mb-4 drop-shadow-md">
            <div>{creative.headlineLine1}</div>
            <div className={theme.highlight}>{creative.headlineHighlight}</div>
            {creative.headlineLine2 && <div>{creative.headlineLine2}</div>}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-2xl font-normal leading-relaxed mb-6 line-clamp-3">
            {creative.subheadline}
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <button
              onClick={onCtaClick}
              className={`px-6 sm:px-8 py-3.5 sm:py-4 rounded font-athletic text-lg sm:text-xl font-black uppercase tracking-wider flex items-center gap-2 shadow-xl cursor-pointer transition-transform transform active:scale-95 ${theme.accentBg} ${theme.glow}`}
            >
              <span>{creative.ctaText}</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>

            {creative.secondaryCtaText && (
              <a
                href="#planning"
                className="px-5 py-3.5 rounded font-athletic text-base sm:text-lg font-bold uppercase tracking-wider text-neutral-200 bg-white/10 hover:bg-white/15 border border-white/15 transition-colors cursor-pointer"
              >
                {creative.secondaryCtaText}
              </a>
            )}
          </div>

          {/* Footnote / Guarantee text */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
            {creative.priceNote && <span>{creative.priceNote}</span>}
            {creative.showMemberCounter && (
              <>
                <span className="hidden sm:inline">·</span>
                <span className="flex items-center gap-1 text-neutral-300 font-medium">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <strong className="tabular-nums font-bold text-white">{creative.activeMembersCount.toLocaleString()}</strong> membres engagés
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
