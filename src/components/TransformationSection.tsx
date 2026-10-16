import React from 'react';
import { ATHLETE_TESTIMONIALS } from '../data/mockGymData';
import { Quote, Trophy, CheckCircle } from 'lucide-react';

export const TransformationSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-white/10 transition-colors">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-600 mb-2">
            <span>Rigueur & Résultats</span>
            <span>·</span>
            <span>Preuves Concrètes</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-athletic uppercase text-slate-950 dark:text-white tracking-tight">
            Performances Validées par Nos Athlètes
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-neutral-400 max-w-md">
          Chaque protocole d'entraînement est mesuré sur plateforme de force et validé par nos entraîneurs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ATHLETE_TESTIMONIALS.map((t, idx) => (
          <div
            key={idx}
            className="p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111317] flex flex-col justify-between relative group hover:border-slate-300 dark:hover:border-white/20 shadow-sm hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <Quote className="w-8 h-8 text-red-600/60" />
                <span className="px-3.5 py-1.5 bg-red-50 dark:bg-white/5 border border-red-200 dark:border-white/10 rounded-lg font-athletic text-lg font-bold text-red-600 dark:text-red-400 tracking-wider">
                  {t.metric}
                </span>
              </div>

              <p className="text-sm sm:text-base text-slate-700 dark:text-neutral-200 leading-relaxed mb-6 italic">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-950 dark:text-white uppercase font-athletic">
                  {t.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-neutral-400">{t.title}</p>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {t.duration}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
