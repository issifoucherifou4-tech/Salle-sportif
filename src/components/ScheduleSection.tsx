import React, { useState } from 'react';
import { SCHEDULE_DAYS, CLASSES_BY_DAY } from '../data/mockGymData';
import { GymClass } from '../types/gym';
import { Calendar, Clock, User, MapPin, ArrowRight } from 'lucide-react';

interface ScheduleSectionProps {
  onBookClass: (cls: GymClass, day: string) => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ onBookClass }) => {
  const [selectedDay, setSelectedDay] = useState<string>('Lundi');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');

  const categories = ['Tous', 'Force', 'Hyrox', 'Boxe', 'Mobilité'];

  const currentClasses = CLASSES_BY_DAY[selectedDay] || [];

  const filteredClasses = currentClasses.filter((c) => {
    if (selectedCategory === 'Tous') return true;
    return c.category === selectedCategory;
  });

  return (
    <section id="planning" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-white/10 transition-colors">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-600 mb-2">
            <span>Grille Hebdomadaire</span>
            <span>·</span>
            <span>Accompagnement Coaché</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-athletic uppercase text-slate-950 dark:text-white tracking-tight">
            Planning des Entraînements
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-neutral-400 max-w-md">
          Séances limitées à 12 athlètes par créneau pour garantir une correction biomécanique en temps réel.
        </p>
      </div>

      {/* Day Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-slate-200 dark:border-white/10 mb-6">
        {SCHEDULE_DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-lg font-athletic text-sm uppercase tracking-wider transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              selectedDay === day
                ? 'bg-red-600 text-white font-bold shadow-md shadow-red-600/30'
                : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 mb-8">
        <span className="text-xs uppercase tracking-wider text-slate-500 mr-2">Discipline :</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold shadow-sm'
                : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Classes List */}
      <div className="space-y-3">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((cls) => (
            <div
              key={cls.id}
              className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#111317] hover:border-slate-300 dark:hover:border-white/20 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-black/60 border border-slate-200 dark:border-white/10 font-mono text-xs text-slate-950 dark:text-white shrink-0">
                  <Clock className="w-4 h-4 text-red-600 mb-1" />
                  <span className="tabular-nums font-bold">{cls.time}</span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                      {cls.category}
                    </span>
                    <span className="text-slate-300 dark:text-neutral-600">·</span>
                    <span className="text-xs text-slate-500 dark:text-neutral-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 dark:text-neutral-500" />
                      {cls.room}
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold font-athletic uppercase text-slate-950 dark:text-white group-hover:text-red-600 transition-colors">
                    {cls.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 flex items-center gap-1.5 mt-0.5">
                    <User className="w-3 h-3 text-slate-400 dark:text-neutral-500" />
                    <span>Coach : {cls.coach}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-white/5">
                <div className="text-left md:text-right">
                  <div className="text-xs font-bold text-slate-900 dark:text-white tabular-nums">
                    {cls.spotsLeft} places restantes
                  </div>
                  <div className="text-[11px] text-slate-500">Réservation incluse dans le pass</div>
                </div>

                <button
                  onClick={() => onBookClass(cls, selectedDay)}
                  className="px-4 py-2 bg-slate-100 hover:bg-red-600 hover:text-white text-slate-800 dark:bg-white/10 dark:hover:bg-red-600 dark:text-neutral-200 text-xs font-bold uppercase tracking-wider rounded-lg border border-slate-200 dark:border-white/15 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Réserver</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-neutral-900/40 text-slate-500 dark:text-neutral-400 text-sm">
            Aucun créneau programmé pour la discipline "{selectedCategory}" le {selectedDay}.
          </div>
        )}
      </div>
    </section>
  );
};
