import React, { useState } from 'react';
import { GYM_HALLS } from '../data/mockGymData';
import { GymHall, AdCreative } from '../types/gym';
import {
  Dumbbell,
  Sparkles,
  ArrowRight,
  Maximize2,
  Users,
  Compass,
  CheckCircle,
  Megaphone,
} from 'lucide-react';

interface GymHallsSectionProps {
  onApplyHallToAd: (hall: GymHall) => void;
  onBookHall: (hall: GymHall) => void;
}

export const GymHallsSection: React.FC<GymHallsSectionProps> = ({
  onApplyHallToAd,
  onBookHall,
}) => {
  const [selectedHallId, setSelectedHallId] = useState<string>(GYM_HALLS[0].id);

  const selectedHall = GYM_HALLS.find((h) => h.id === selectedHallId) || GYM_HALLS[0];

  return (
    <section id="salles" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-white/10 transition-colors">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-600 mb-2">
            <span>Infrastructures du Club</span>
            <span>·</span>
            <span>5 Espaces Spécialisés</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-athletic uppercase text-slate-950 dark:text-white tracking-tight">
            Les 5 Salles de Sport & Espaces Publicitaires
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400 max-w-md leading-relaxed">
          Chaque espace est calibré pour une discipline spécifique. Vous pouvez transformer n'importe quelle salle en publicité principale en 1 clic.
        </p>
      </div>

      {/* 5 Salles Tab Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
        {GYM_HALLS.map((hall) => {
          const isActive = hall.id === selectedHall.id;
          return (
            <button
              key={hall.id}
              onClick={() => setSelectedHallId(hall.id)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-white dark:bg-neutral-800 border-red-600 shadow-md ring-2 ring-red-600/20'
                  : 'bg-white/60 dark:bg-neutral-900/40 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs font-black font-athletic px-2 py-0.5 rounded uppercase tracking-wider ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-neutral-300'
                  }`}
                >
                  Salle 0{hall.number}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">{hall.surface}</span>
              </div>
              <p
                className={`text-xs sm:text-sm font-bold uppercase font-athletic line-clamp-1 ${
                  isActive ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'
                }`}
              >
                {hall.name}
              </p>
            </button>
          );
        })}
      </div>

      {/* Featured Hall Showcase Box */}
      <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111317] overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0 transition-all">
        {/* Left: High-Impact Photography */}
        <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] overflow-hidden group">
          <img
            src={selectedHall.imageUrl}
            alt={selectedHall.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

          {/* Hall Number & Quick Badge */}
          <div className="absolute top-5 left-5 flex items-center gap-2">
            <span className="font-athletic text-2xl font-black text-white bg-black/70 backdrop-blur px-3.5 py-1 rounded-lg">
              Salle 0{selectedHall.number}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider bg-red-600 text-white px-3 py-1.5 rounded-lg shadow">
              {selectedHall.sports[0] || 'Espace Haute Intensité'}
            </span>
          </div>

          {/* Sports Pill List on Image Bottom */}
          <div className="absolute bottom-5 left-5 right-5">
            <div className="text-[11px] uppercase tracking-wider text-neutral-300 font-mono mb-2">
              Sports & Disciplines Pratiquées :
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {selectedHall.sports.map((sport, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-semibold bg-black/70 backdrop-blur text-white rounded-md border border-white/15"
                >
                  {sport}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Hall Details & Ad Actions */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-600 mb-1">
              <span>Fiche Technique & Édit Pub</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-athletic uppercase text-slate-950 dark:text-white mb-2 leading-tight">
              {selectedHall.name}
            </h3>
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-neutral-400 mb-4">
              {selectedHall.subtitle}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed mb-6">
              {selectedHall.description}
            </p>

            {/* Hall Key Specs */}
            <div className="grid grid-cols-2 gap-3 mb-6 p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs">
              <div>
                <span className="text-slate-500 dark:text-neutral-400 block text-[11px] uppercase">Surface Totale</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{selectedHall.surface}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-neutral-400 block text-[11px] uppercase">Capacité Créneau</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{selectedHall.capacity}</span>
              </div>
              <div className="col-span-2 pt-1 border-t border-slate-200 dark:border-white/10">
                <span className="text-slate-500 dark:text-neutral-400 block text-[11px] uppercase">Entraîneur Référent</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedHall.coach}</span>
              </div>
            </div>

            {/* Equipment bullet points */}
            <div className="space-y-1.5 mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-400 block mb-1">
                Équipements Installés :
              </span>
              {selectedHall.equipment.map((eq, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-neutral-300">
                  <CheckCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                  <span>{eq}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons: Apply as Main Ad OR Book Session */}
          <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-white/10">
            <button
              onClick={() => onApplyHallToAd(selectedHall)}
              className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-athletic text-base font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-red-600/30 cursor-pointer"
            >
              <Megaphone className="w-4 h-4" />
              <span>Publier cette salle en bannière pub</span>
            </button>

            <button
              onClick={() => onBookHall(selectedHall)}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-900 dark:text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors border border-slate-200 dark:border-white/15 cursor-pointer"
            >
              <span>Réserver une session dans la Salle 0{selectedHall.number}</span>
              <ArrowRight className="w-3.5 h-3.5 text-red-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
