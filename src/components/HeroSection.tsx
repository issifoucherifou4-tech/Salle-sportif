import React from 'react';
import { AdCreative } from '../types/gym';
import { SOCIAL_PROOF_METRICS } from '../data/mockGymData';
import { AdPreviewCard } from './AdPreviewCard';
import { Sliders, CheckCircle2, Shield, Flame } from 'lucide-react';

interface HeroSectionProps {
  creative: AdCreative;
  onOpenBooking: () => void;
  onOpenStudio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  creative,
  onOpenBooking,
  onOpenStudio,
}) => {
  return (
    <section id="top" className="relative pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Notice bar showing Pinterest Inspiration and modifier affordance */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 p-3.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs text-slate-700 dark:text-neutral-300 shadow-sm transition-colors">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider font-athletic text-base">
            SALLE SPORTIF · Édit Publicitaire Actif
          </span>
          <span className="text-slate-400 dark:text-neutral-500">·</span>
          <span>5 Salles de sport & studio publicitaire modifiable en direct</span>
        </div>

        <button
          onClick={onOpenStudio}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-xs shadow-sm shadow-red-600/30"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Modifier le kit publicitaire</span>
        </button>
      </div>

      {/* Main Interactive Hero Card (renders the live customized creative) */}
      <AdPreviewCard
        creative={creative}
        onCtaClick={onOpenBooking}
        onEditClick={onOpenStudio}
        showEditAffordance={true}
      />

      {/* 4-Column Proof & Performance Metrics Strip */}
      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {SOCIAL_PROOF_METRICS.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111317]/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold font-athletic text-slate-950 dark:text-white tracking-tight tabular-nums">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300 mt-1">
                {item.label}
              </div>
            </div>
            <div className="text-xs text-slate-500 dark:text-neutral-500 mt-3 border-t border-slate-100 dark:border-white/5 pt-2">
              {item.context}
            </div>
          </div>
        ))}
      </div>

      {/* Guarantees Line */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-neutral-400 font-medium">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-red-600" />
          <span>Pass d'essai 7 jours 100% remboursable</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-red-600" />
          <span>Coaching certifié NSCA & BPJEPS</span>
        </div>
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-red-600" />
          <span>Équipement Eleiko & Concept2 officiel</span>
        </div>
      </div>
    </section>
  );
};
