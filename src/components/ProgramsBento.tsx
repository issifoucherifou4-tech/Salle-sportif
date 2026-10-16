import React from 'react';
import { TRAINING_PROGRAMS } from '../data/mockGymData';
import { ArrowUpRight, Zap, Clock, Shield } from 'lucide-react';

interface ProgramsBentoProps {
  onSelectProgram: (programTitle: string) => void;
}

export const ProgramsBento: React.FC<ProgramsBentoProps> = ({ onSelectProgram }) => {
  return (
    <section id="programmes" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-white/10 transition-colors">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-600 mb-2">
            <span>Disciplines d'Élite</span>
            <span>·</span>
            <span>Programmation Scientifique</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-athletic uppercase text-slate-950 dark:text-white tracking-tight">
            Programmes d'Entraînement Haute Intensité
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 max-w-md leading-relaxed">
          Trois piliers fondamentaux conçus pour développer force brute, puissance aérobie et résilience physique sans compromis.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Marquee Card 1: Force & Hypertrophie (lg:col-span-7) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111317] overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all">
          <div className="relative h-72 sm:h-80 overflow-hidden">
            <img
              src={TRAINING_PROGRAMS[0].imageUrl}
              alt={TRAINING_PROGRAMS[0].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="font-athletic text-2xl font-black text-white bg-black/60 px-3 py-1 rounded backdrop-blur">
                {TRAINING_PROGRAMS[0].number}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white font-mono">
              <span className="flex items-center gap-1.5 bg-black/70 px-2.5 py-1 rounded backdrop-blur">
                <Zap className="w-3.5 h-3.5 text-red-500" />
                Intensité : {TRAINING_PROGRAMS[0].intensity}
              </span>
              <span className="flex items-center gap-1.5 bg-black/70 px-2.5 py-1 rounded backdrop-blur">
                <Clock className="w-3.5 h-3.5 text-neutral-300" />
                {TRAINING_PROGRAMS[0].duration}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold font-athletic uppercase text-slate-950 dark:text-white mb-2">
                {TRAINING_PROGRAMS[0].title}
              </h3>
              <p className="text-xs uppercase tracking-wider text-red-600 font-bold mb-3">
                {TRAINING_PROGRAMS[0].tagline}
              </p>
              <p className="text-sm text-slate-600 dark:text-neutral-400 leading-relaxed mb-6">
                {TRAINING_PROGRAMS[0].description}
              </p>

              {/* Benefits */}
              <div className="space-y-2 mb-6">
                {TRAINING_PROGRAMS[0].benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-neutral-500 font-mono">
                {TRAINING_PROGRAMS[0].equipment}
              </span>
              <button
                onClick={() => onSelectProgram(TRAINING_PROGRAMS[0].title)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-950 dark:text-white text-xs font-bold uppercase tracking-wider rounded-lg border border-slate-200 dark:border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Réserver une séance</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-red-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Column Right (lg:col-span-5 with 2 stacked cards) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Card 2: Hyrox & Conditioning */}
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111317] overflow-hidden flex flex-col justify-between group p-6 flex-1 shadow-sm hover:shadow-xl transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-athletic text-xl font-black text-slate-950 dark:text-white/90 bg-slate-100 dark:bg-white/5 px-2.5 py-0.5 rounded">
                  {TRAINING_PROGRAMS[1].number}
                </span>
                <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-neutral-400">
                  <span>{TRAINING_PROGRAMS[1].duration}</span>
                  <span>·</span>
                  <span className="text-emerald-600 dark:text-lime-400 font-bold">{TRAINING_PROGRAMS[1].intensity}</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-athletic uppercase text-slate-950 dark:text-white mb-1">
                {TRAINING_PROGRAMS[1].title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed mb-4">
                {TRAINING_PROGRAMS[1].description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 dark:text-neutral-500 font-mono">
                {TRAINING_PROGRAMS[1].equipment}
              </span>
              <button
                onClick={() => onSelectProgram(TRAINING_PROGRAMS[1].title)}
                className="text-xs font-bold uppercase tracking-wider text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Découvrir</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Recovery Sanctuary */}
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111317] overflow-hidden flex flex-col justify-between group p-6 flex-1 shadow-sm hover:shadow-xl transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-athletic text-xl font-black text-slate-950 dark:text-white/90 bg-slate-100 dark:bg-white/5 px-2.5 py-0.5 rounded">
                  {TRAINING_PROGRAMS[2].number}
                </span>
                <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-neutral-400">
                  <span>{TRAINING_PROGRAMS[2].duration}</span>
                  <span>·</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">Bains 3°C</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-athletic uppercase text-slate-950 dark:text-white mb-1">
                {TRAINING_PROGRAMS[2].title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed mb-4">
                {TRAINING_PROGRAMS[2].description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 dark:text-neutral-500 font-mono">
                {TRAINING_PROGRAMS[2].equipment}
              </span>
              <button
                onClick={() => onSelectProgram(TRAINING_PROGRAMS[2].title)}
                className="text-xs font-bold uppercase tracking-wider text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Découvrir</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
