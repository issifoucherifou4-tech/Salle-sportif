import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

interface BiceaAdSlotProps {
  onOpenStudio?: () => void;
}

export const BiceaAdSlot: React.FC<BiceaAdSlotProps> = ({ onOpenStudio }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if the script is already present in document
    const scriptSrc = 'https://bicea.org/21/50f9422018c65ee6331aa76135412a1a';
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    if (existingScript) {
      setIsScriptLoaded(true);
    } else {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = scriptSrc;
      script.onload = () => setIsScriptLoaded(true);
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="publicite-partenaire">
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-gradient-to-r from-slate-50 via-white to-slate-100 dark:from-neutral-900/90 dark:via-neutral-900/60 dark:to-neutral-900/90 p-5 shadow-sm transition-colors">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-3 pb-3 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="font-extrabold uppercase font-athletic tracking-wider text-slate-900 dark:text-white text-sm">
              Espace Publicitaire Officiel · Bicea & Afders
            </span>
            <span className="hidden md:inline text-[11px] px-2 py-0.5 rounded bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-neutral-300 font-mono">
              #container-50f9422018c65ee6331aa76135412a1a
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-mono text-[11px] bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Tag Bicea Connecté</span>
            </span>

            {onOpenStudio && (
              <button
                onClick={onOpenStudio}
                className="text-[11px] font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Gérer les tags</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* The Exact User Container: container-50f9422018c65ee6331aa76135412a1a */}
        <div className="relative min-h-[110px] w-full flex flex-col items-center justify-center rounded-xl bg-white dark:bg-black/40 border border-slate-200/80 dark:border-white/10 p-3 sm:p-5 overflow-hidden">
          {/* Target Container Element provided by user */}
          <div 
            id="container-50f9422018c65ee6331aa76135412a1a" 
            ref={containerRef}
            className="w-full flex items-center justify-center my-1"
          />

          {/* Contextual description and status indicator */}
          <div className="mt-2 text-center text-[11px] text-slate-500 dark:text-neutral-400 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="flex items-center gap-1 font-medium">
              <Sparkles className="w-3 h-3 text-red-600 dark:text-red-400" />
              Régie publicitaire Bicea synchronisée en temps réel
            </span>
            <span className="text-slate-300 dark:text-neutral-700 hidden sm:inline">•</span>
            <span className="font-mono text-[10px] text-slate-400 dark:text-neutral-500">
              ID: 50f9422018c65ee6331aa76135412a1a
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
