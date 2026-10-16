import React from 'react';
import { Sliders, Sun, Moon, Share2, Code2 } from 'lucide-react';
import { VortexLogo } from './VortexLogo';

interface NavbarProps {
  onOpenStudio: () => void;
  onOpenBooking: () => void;
  onOpenLogoIntegration: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenStudio,
  onOpenBooking,
  onOpenLogoIntegration,
  isDarkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0b0c10]/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark with Vector Logo */}
        <a 
          href="#top" 
          className="text-2xl sm:text-3xl font-extrabold tracking-tight font-athletic text-slate-950 dark:text-white uppercase whitespace-nowrap shrink-0 flex items-center gap-2.5 group"
        >
          <VortexLogo size={32} variant="crimson" />
          <span>SALLE<span className="text-red-600 font-light">·</span>SPORTIF</span>
        </a>

        {/* Zone 2: Clean Single-line Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-bold tracking-wide uppercase text-slate-700 dark:text-neutral-300">
          <a href="#salles" className="hover:text-red-600 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            <span>Salles (1 à 5)</span>
          </a>
          <a href="#programmes" className="hover:text-red-600 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
            Programmes
          </a>
          <a href="#planning" className="hover:text-red-600 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
            Planning
          </a>
          <a href="#adhesions" className="hover:text-red-600 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
            Adhésions
          </a>
          <a href="#sanctuaire" className="hover:text-red-600 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
            Récupération
          </a>
        </nav>

        {/* Zone 3: Actions (Theme Toggle + Logo Embed + Studio Ad modifier + Primary CTA) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 text-slate-700 dark:text-neutral-300 hover:text-slate-950 dark:hover:text-white rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 transition-colors cursor-pointer"
            title={isDarkMode ? 'Passer en thème clair' : 'Passer en thème sombre'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Logo & Widget Embed trigger button */}
          <button
            onClick={onOpenLogoIntegration}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-bold tracking-wider uppercase text-slate-800 dark:text-neutral-200 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/15 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Intégrer le logo ou widget Vortex Club sur votre site"
          >
            <Code2 className="w-3.5 h-3.5 text-red-600" />
            <span>Intégrer Logo</span>
          </button>

          <button
            onClick={onOpenStudio}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold tracking-wider uppercase text-slate-800 dark:text-neutral-200 bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/15 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Modifier le kit publicitaire et personnaliser l'affichage"
          >
            <Sliders className="w-3.5 h-3.5 text-red-600" />
            <span className="hidden sm:inline">Modifier la pub</span>
            <span className="sm:hidden">Éditer</span>
          </button>
          
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 text-xs font-black tracking-widest uppercase text-white bg-red-600 hover:bg-red-500 rounded-lg transition-all transform active:scale-95 shadow-md shadow-red-600/30 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Pass 7 Jours
          </button>
        </div>
      </div>
    </header>
  );
};
