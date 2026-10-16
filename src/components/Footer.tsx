import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-white/10 bg-slate-950 dark:bg-[#08090c] text-slate-400 dark:text-neutral-400 text-xs py-14 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="space-y-4">
          <div className="text-2xl font-black font-athletic text-white tracking-tight uppercase flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-600 inline-block"></span>
            <span>SALLE SPORTIF</span>
          </div>
          <p className="text-neutral-400 leading-relaxed max-w-xs">
            Centre de préparation physique haute intensité, force olympique et 5 salles de sport spécialisées.
          </p>
          <p className="text-neutral-500 font-mono text-[11px]">
            Inspiré de l’architecture UI/UX publicitaire DevVortex.
          </p>
        </div>

        {/* Quick Nav */}
        <div>
          <h4 className="font-athletic text-sm uppercase font-bold text-white tracking-wider mb-4">
            Navigation
          </h4>
          <ul className="space-y-2.5">
            <li><a href="#programmes" className="hover:text-white transition-colors">Programmes de Force</a></li>
            <li><a href="#planning" className="hover:text-white transition-colors">Planning Hebdomadaire</a></li>
            <li><a href="#adhesions" className="hover:text-white transition-colors">Tarifs & Adhésions</a></li>
            <li><a href="#sanctuaire" className="hover:text-white transition-colors">Bains Froids & Sauna</a></li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="font-athletic text-sm uppercase font-bold text-white tracking-wider mb-4">
            Horaires d'Ouverture
          </h4>
          <ul className="space-y-2.5">
            <li className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>Lundi – Vendredi : 06:00 – 23:00</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>Samedi – Dimanche : 07:30 – 21:00</span>
            </li>
            <li className="text-neutral-500 pt-1">
              Accès badge sécurisé biométrique pour les adhérents.
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-athletic text-sm uppercase font-bold text-white tracking-wider mb-4">
            Localisation
          </h4>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
              <span>48 Rue du Faubourg Saint-Honoré, 75008 Paris</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>+33 (0)1 42 68 50 00</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span>contact@vortex-performance.club</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
        <div>
          © {new Date().getFullYear()} SALLE SPORTIF. Tous droits réservés.
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-neutral-300">Mentions Légales</a>
          <span>·</span>
          <a href="#" className="hover:text-neutral-300">Politique de Confidentialité</a>
          <span>·</span>
          <a href="#" className="hover:text-neutral-300">Conditions Générales d'Accès</a>
        </div>
      </div>
    </footer>
  );
};
