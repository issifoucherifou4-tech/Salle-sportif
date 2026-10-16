import React from 'react';
import { LOCAL_RECOVERY_FACILITY } from '../data/mockGymData';
import { Sparkles, ThermometerSnowflake, Flame, ArrowUpRight } from 'lucide-react';

interface SanctuarySectionProps {
  onOpenBooking: () => void;
}

export const SanctuarySection: React.FC<SanctuarySectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="sanctuaire" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-white/10 transition-colors">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column Text */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>Zone Récupération & Bio-Hacking</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-athletic uppercase text-slate-950 dark:text-white tracking-tight leading-none">
            Le Sanctuaire Thermocontraste : Bains à 3°C & Sauna Cèdre
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
            L'entraînement ne représente que 50% de vos gains. La vitesse d’adaptation neuro-musculaire dépend de votre capacité à éliminer les toxines et à basculer en système parasympathique.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-athletic text-xl uppercase font-bold mb-1">
                <ThermometerSnowflake className="w-5 h-5" />
                <span>Bains Glacés 3°C</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                Immersion de 3 minutes pour stimuler la noradrénaline, vasoconstriction immédiate et chute drastique des inflammations articulaires.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-sm">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-athletic text-xl uppercase font-bold mb-1">
                <Flame className="w-5 h-5" />
                <span>Sauna Finlandais 85°C</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                Bois de cèdre naturel, infusion d'eucalyptus et libération de protéines de choc thermique (HSP) réparatrices.
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-athletic text-lg font-black uppercase tracking-wider rounded-lg flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-950/20 transition-transform active:scale-95"
            >
              <span>Réserver mon accès découverte</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column Imagery */}
        <div className="lg:col-span-6">
          <div className="relative rounded-2xl overflow-hidden border border-white/15 group">
            <img
              src={LOCAL_RECOVERY_FACILITY}
              alt="Espace bien-être, bains froids et sauna du club Vortex"
              referrerPolicy="no-referrer"
              className="w-full h-[440px] sm:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                  Accès Libre avec la formule Pro & Elite
                </p>
                <p className="text-sm font-semibold text-white">
                  Créneaux calmes sans réservation de 07:00 à 22:00
                </p>
              </div>
              <span className="text-xs font-mono bg-white/10 px-2.5 py-1 rounded text-neutral-300">
                Filtre UV continu
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
