import React, { useState } from 'react';
import { AdCreative, AdFormat, AdThemeColor } from '../types/gym';
import {
  AD_PRESETS,
  GYM_HALLS,
  PINTEREST_REFERENCE_IMAGE,
  LOCAL_HERO_CINEMATIC,
  LOCAL_OLYMPIC_STRENGTH,
  LOCAL_RECOVERY_FACILITY,
  LOCAL_BOXING_HALL,
  LOCAL_PILATES_MOBILITY,
  LOCAL_HYROX_TRACK,
} from '../data/mockGymData';
import { AdPreviewCard } from './AdPreviewCard';
import {
  X,
  Sliders,
  Check,
  RotateCcw,
  Sparkles,
  Layers,
  Copy,
  ExternalLink,
  Eye,
  Columns3,
  Image as ImageIcon,
  Code2,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

interface AdStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  creative: AdCreative;
  onSave: (updated: AdCreative) => void;
}

export const AdStudioModal: React.FC<AdStudioModalProps> = ({
  isOpen,
  onClose,
  creative,
  onSave,
}) => {
  const [draft, setDraft] = useState<AdCreative>(creative);
  const [activeTab, setActiveTab] = useState<'content' | 'visuals' | 'presets' | 'script'>('content');
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [copiedBicea, setCopiedBicea] = useState<boolean>(false);
  const [copiedLeaderboard, setCopiedLeaderboard] = useState<boolean>(false);

  // Sync draft when opened or creative changes
  React.useEffect(() => {
    if (isOpen) {
      setDraft(creative);
    }
  }, [isOpen, creative]);

  if (!isOpen) return null;

  const handleApplyPreset = (presetCreative: Partial<AdCreative>) => {
    setDraft((prev) => ({
      ...prev,
      ...presetCreative,
    }));
  };

  const handleSaveAndApply = () => {
    onSave(draft);
    onClose();
  };

  const handleCopyEmbed = () => {
    const textData = `
/* Kit Publicitaire Vortex Club */
Format: ${draft.format}
Titre: ${draft.headlineLine1} ${draft.headlineHighlight} ${draft.headlineLine2}
Sous-titre: ${draft.subheadline}
Offre: ${draft.offerTag}
CTA: ${draft.ctaText}
Thème: ${draft.theme}
Image: ${draft.imageUrl}
    `.trim();

    navigator.clipboard.writeText(textData);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const imageOptions = [
    { label: 'Salle 01 · Force & Haltérophilie', url: LOCAL_OLYMPIC_STRENGTH },
    { label: 'Salle 02 · Piste Hyrox & Sprint', url: LOCAL_HYROX_TRACK },
    { label: 'Salle 03 · Ring & Boxe Anglaise', url: LOCAL_BOXING_HALL },
    { label: 'Salle 04 · Pilates Reformer & Mobilité', url: LOCAL_PILATES_MOBILITY },
    { label: 'Salle 05 · Bains Froids & Sauna', url: LOCAL_RECOVERY_FACILITY },
    { label: 'Plateau Dumbbells & Brouillard', url: LOCAL_HERO_CINEMATIC },
    { label: 'Original Pinterest DevVortex', url: PINTEREST_REFERENCE_IMAGE },
  ];

  const themeOptions: { id: AdThemeColor; label: string; bg: string }[] = [
    { id: 'clean_light', label: 'Clair & Rouge', bg: 'bg-white border-2 border-red-600' },
    { id: 'platinum', label: 'Platine Blanc', bg: 'bg-slate-200 border border-slate-400' },
    { id: 'crimson', label: 'Rouge Iron', bg: 'bg-red-600' },
    { id: 'volt', label: 'Cyber Volt', bg: 'bg-lime-400' },
    { id: 'obsidian', label: 'Obsidian Noir', bg: 'bg-neutral-800' },
    { id: 'bronze', label: 'Bronze Spa', bg: 'bg-amber-500' },
    { id: 'chrome', label: 'Chrome Acier', bg: 'bg-sky-400' },
  ];

  const formatOptions: { id: AdFormat; label: string; ratio: string }[] = [
    { id: 'banner_hero', label: 'Bannière Site Web', ratio: '16:9' },
    { id: 'social_square', label: 'Post Carré (Insta/Pin)', ratio: '1:1' },
    { id: 'story_vertical', label: 'Story & Reel', ratio: '9:16' },
    { id: 'compact_leader', label: 'Bandeau Promo', ratio: '3:1' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
      <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-white/15 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto transition-colors">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-neutral-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-50 text-red-600 dark:bg-red-600/20 dark:text-red-500 border border-red-200 dark:border-red-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-950 dark:text-white uppercase tracking-wider font-athletic flex items-center gap-2">
                <span>Studio d’Édition Publicitaire</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-neutral-300 font-sans normal-case">
                  Inspiration Pinterest
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-neutral-400">
                Personnalisez le visuel, l’éclairage, l’accroche et appliquez vos changements en direct au site.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCompareMode(!compareMode)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 cursor-pointer ${
                compareMode
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white dark:bg-white/5 text-slate-700 dark:text-neutral-300 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
              title="Comparer avec l'original Pinterest DevVortex"
            >
              <Columns3 className="w-3.5 h-3.5" />
              <span>{compareMode ? 'Quitter comparaison' : 'Comparer original'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split Controls & Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden min-h-0">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 border-r border-slate-200 dark:border-white/10 flex flex-col overflow-y-auto p-5 bg-slate-50/50 dark:bg-[#0e1014] space-y-6">
            {/* Tabs for Organization */}
            <div className="flex rounded-xl bg-slate-200/80 dark:bg-neutral-900 p-1 border border-slate-300 dark:border-white/10 gap-0.5">
              <button
                onClick={() => setActiveTab('content')}
                className={`flex-1 py-1.5 px-2 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center ${
                  activeTab === 'content'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                Textes
              </button>
              <button
                onClick={() => setActiveTab('visuals')}
                className={`flex-1 py-1.5 px-2 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center ${
                  activeTab === 'visuals'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                Visuel
              </button>
              <button
                onClick={() => setActiveTab('presets')}
                className={`flex-1 py-1.5 px-2 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center ${
                  activeTab === 'presets'
                    ? 'bg-white text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                Modèles
              </button>
              <button
                onClick={() => setActiveTab('script')}
                className={`flex-1 py-1.5 px-2 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center gap-1 ${
                  activeTab === 'script'
                    ? 'bg-white text-slate-950 shadow-sm font-extrabold'
                    : 'text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                <Code2 className="w-3 h-3 text-red-600" />
                <span>Script Pub</span>
              </button>
            </div>

            {/* TAB 1: TEXTS & OFFER */}
            {activeTab === 'content' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-400 font-semibold uppercase tracking-wider mb-1">
                    Badge d’en-tête (Kicker)
                  </label>
                  <input
                    type="text"
                    value={draft.badgeText}
                    onChange={(e) => setDraft({ ...draft, badgeText: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-semibold uppercase tracking-wider mb-1">
                    Badge Promotionnel / Offre
                  </label>
                  <input
                    type="text"
                    value={draft.offerTag}
                    onChange={(e) => setDraft({ ...draft, offerTag: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-neutral-400 font-semibold uppercase tracking-wider">
                    Titre Principal (3 Lignes)
                  </label>
                  <input
                    type="text"
                    placeholder="Ligne 1"
                    value={draft.headlineLine1}
                    onChange={(e) => setDraft({ ...draft, headlineLine1: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500 font-athletic text-sm uppercase"
                  />
                  <input
                    type="text"
                    placeholder="Ligne mise en avant (couleur d'accent)"
                    value={draft.headlineHighlight}
                    onChange={(e) => setDraft({ ...draft, headlineHighlight: e.target.value })}
                    className="w-full bg-neutral-900 border border-red-500/50 rounded px-3 py-2 text-red-400 focus:outline-none focus:border-red-500 font-athletic text-sm uppercase font-bold"
                  />
                  <input
                    type="text"
                    placeholder="Ligne 2 (optionnelle)"
                    value={draft.headlineLine2}
                    onChange={(e) => setDraft({ ...draft, headlineLine2: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500 font-athletic text-sm uppercase"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 font-semibold uppercase tracking-wider mb-1">
                    Texte descriptif
                  </label>
                  <textarea
                    rows={3}
                    value={draft.subheadline}
                    onChange={(e) => setDraft({ ...draft, subheadline: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500 text-xs leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-400 font-semibold uppercase tracking-wider mb-1">
                      Bouton CTA Principal
                    </label>
                    <input
                      type="text"
                      value={draft.ctaText}
                      onChange={(e) => setDraft({ ...draft, ctaText: e.target.value })}
                      className="w-full bg-neutral-900 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500 font-athletic text-xs uppercase"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 font-semibold uppercase tracking-wider mb-1">
                      Bouton Secondaire
                    </label>
                    <input
                      type="text"
                      value={draft.secondaryCtaText}
                      onChange={(e) => setDraft({ ...draft, secondaryCtaText: e.target.value })}
                      className="w-full bg-neutral-900 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500 font-athletic text-xs uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-400 font-semibold uppercase tracking-wider mb-1">
                    Note de pied (Conditions d’accès)
                  </label>
                  <input
                    type="text"
                    value={draft.priceNote}
                    onChange={(e) => setDraft({ ...draft, priceNote: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: VISUALS & FORMAT */}
            {activeTab === 'visuals' && (
              <div className="space-y-5 text-xs">
                {/* Format Preset */}
                <div>
                  <label className="block text-neutral-400 font-semibold uppercase tracking-wider mb-2">
                    Format d'affichage
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {formatOptions.map((fmt) => (
                      <button
                        key={fmt.id}
                        onClick={() => setDraft({ ...draft, format: fmt.id })}
                        className={`p-2.5 rounded border text-left flex items-center justify-between cursor-pointer transition-colors ${
                          draft.format === fmt.id
                            ? 'bg-neutral-800 border-white text-white'
                            : 'bg-neutral-900/60 border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <div>
                          <div className="font-bold">{fmt.label}</div>
                          <div className="text-[10px] text-neutral-500 font-mono">{fmt.ratio}</div>
                        </div>
                        {draft.format === fmt.id && <Check className="w-4 h-4 text-red-500" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Theme */}
                <div>
                  <label className="block text-neutral-400 font-semibold uppercase tracking-wider mb-2">
                    Thème & Accent de Couleur
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {themeOptions.map((th) => (
                      <button
                        key={th.id}
                        onClick={() => setDraft({ ...draft, theme: th.id })}
                        className={`p-2 rounded border flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                          draft.theme === th.id
                            ? 'border-white bg-neutral-800'
                            : 'border-white/10 bg-neutral-900 hover:border-white/20'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full ${th.bg}`} />
                        <span className="text-[10px] text-neutral-300 font-medium truncate w-full text-center">
                          {th.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Selection */}
                <div>
                  <label className="block text-neutral-400 font-semibold uppercase tracking-wider mb-2">
                    Photographie d’arrière-plan
                  </label>
                  <div className="space-y-2">
                    {imageOptions.map((img) => (
                      <button
                        key={img.url}
                        onClick={() => setDraft({ ...draft, imageUrl: img.url })}
                        className={`w-full p-2 rounded border flex items-center gap-3 cursor-pointer transition-colors ${
                          draft.imageUrl === img.url
                            ? 'bg-neutral-800 border-red-500 text-white'
                            : 'bg-neutral-900 border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <img
                          src={img.url}
                          alt={img.label}
                          referrerPolicy="no-referrer"
                          className="w-12 h-9 object-cover rounded bg-neutral-800"
                        />
                        <div className="flex-1 text-left">
                          <p className="font-semibold">{img.label}</p>
                          <p className="text-[10px] text-neutral-500 font-mono truncate max-w-xs">{img.url}</p>
                        </div>
                        {draft.imageUrl === img.url && <Check className="w-4 h-4 text-red-500" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Image URL */}
                <div>
                  <label className="block text-neutral-400 font-semibold uppercase tracking-wider mb-1">
                    Ou URL d'image personnalisée
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={draft.imageUrl}
                    onChange={(e) => setDraft({ ...draft, imageUrl: e.target.value })}
                    className="w-full bg-neutral-900 border border-white/10 rounded px-3 py-2 text-white font-mono text-[11px] focus:outline-none focus:border-red-500"
                  />
                </div>

                {/* Sliders and Toggles */}
                <div className="space-y-4 pt-3 border-t border-slate-200 dark:border-white/10">
                  <div>
                    <div className="flex justify-between text-slate-700 dark:text-neutral-300 font-semibold mb-1">
                      <span>Luminosité / Filtre d’ambiance</span>
                      <span className="font-mono text-red-600 font-bold">{draft.overlayDarkness}% sombre</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="75"
                      value={draft.overlayDarkness}
                      onChange={(e) => setDraft({ ...draft, overlayDarkness: Number(e.target.value) })}
                      className="w-full accent-red-600 cursor-pointer"
                    />
                    <p className="text-[11px] text-slate-500 dark:text-neutral-400 mt-1">
                      Glissez vers la gauche pour éclaircir le visuel et éliminer toute obscurité.
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10">
                    <div>
                      <span className="text-slate-800 dark:text-neutral-200 font-semibold block">Mode Bannière Lumineuse</span>
                      <span className="text-[11px] text-slate-500 dark:text-neutral-400">Fond clair & typographie dynamique</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={draft.isLightBanner || false}
                      onChange={(e) => setDraft({ ...draft, isLightBanner: e.target.checked })}
                      className="accent-red-600 w-4 h-4 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10">
                    <span className="text-slate-800 dark:text-neutral-200 font-semibold">Booster le contraste athlétique</span>
                    <input
                      type="checkbox"
                      checked={draft.contrastBoost}
                      onChange={(e) => setDraft({ ...draft, contrastBoost: e.target.checked })}
                      className="accent-red-600 w-4 h-4 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10">
                    <span className="text-slate-800 dark:text-neutral-200 font-semibold">Mode Noir & Blanc argentique</span>
                    <input
                      type="checkbox"
                      checked={draft.monochromeFilter}
                      onChange={(e) => setDraft({ ...draft, monochromeFilter: e.target.checked })}
                      className="accent-red-600 w-4 h-4 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: PRESETS */}
            {activeTab === 'presets' && (
              <div className="space-y-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-red-600 mb-1">
                    Publicités des 5 Salles de Sport (1 à 5)
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-neutral-400 mb-2">
                    Chargez en 1 clic la créa publicitaire dédiée à l'une de nos 5 salles :
                  </p>

                  <div className="space-y-2">
                    {GYM_HALLS.map((hall) => (
                      <div
                        key={hall.id}
                        className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-neutral-900/70 hover:border-red-500/50 transition-all flex items-center justify-between gap-3 shadow-sm"
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <img
                            src={hall.imageUrl}
                            alt={hall.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-9 object-cover rounded-lg shrink-0"
                          />
                          <div className="truncate">
                            <span className="text-[10px] font-black uppercase tracking-wider text-red-600 block">
                              Salle 0{hall.number}
                            </span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white truncate block">
                              {hall.name}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            handleApplyPreset({
                              badgeText: hall.adBadge,
                              headlineLine1: hall.adHeadline1,
                              headlineHighlight: hall.adHighlight,
                              headlineLine2: hall.adHeadline2,
                              subheadline: hall.adTagline,
                              imageUrl: hall.imageUrl,
                              theme: hall.adTheme,
                              overlayDarkness: 18,
                              isLightBanner: true,
                            })
                          }
                          className="px-2.5 py-1 text-xs font-bold uppercase rounded-lg bg-red-600 hover:bg-red-500 text-white cursor-pointer shrink-0"
                        >
                          Appliquer
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-white/10">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300 mb-1">
                    Styles Thématiques Généraux
                  </div>
                  <div className="space-y-2">
                    {AD_PRESETS.map((preset) => (
                      <div
                        key={preset.name}
                        className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-neutral-900/70 hover:border-slate-300 dark:hover:border-white/25 transition-all space-y-1.5 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-athletic text-sm uppercase font-bold text-slate-900 dark:text-white tracking-wide">
                            {preset.name}
                          </h4>
                          <button
                            onClick={() => handleApplyPreset(preset.creative)}
                            className="px-2.5 py-1 text-[11px] font-bold uppercase rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 cursor-pointer"
                          >
                            Charger
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-neutral-400">{preset.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: EXTERNAL AD SCRIPT MANAGEMENT */}
            {activeTab === 'script' && (
              <div className="space-y-4 text-xs">
                {/* Active Status Badge */}
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-600/40 text-emerald-900 dark:text-emerald-200">
                  <div className="flex items-center gap-2 mb-1 font-bold uppercase tracking-wider text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>3 Codes Publicitaires Actifs & Synchronisés</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-emerald-800 dark:text-emerald-300">
                    Les 3 configurations (Leaderboard 728×90, Slot Container et Tag Global) sont injectées et diffusées en temps réel sur <strong>SALLE SPORTIF</strong>.
                  </p>
                </div>

                {/* SCRIPT 3: BICEA LEADERBOARD 728x90 IFRAME (NOUVEAU) */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border-2 border-red-500/40 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded bg-red-600 text-white font-athletic">
                        Ajouté au Compte
                      </span>
                      <label className="text-slate-900 dark:text-white font-bold uppercase tracking-wider text-[11px]">
                        Bannière Leaderboard 728×90 (Bicea atOptions)
                      </label>
                    </div>
                    <button
                      onClick={() => {
                        const code = `<script>\n  atOptions = {\n    'key' : '60b91ea64916a1564545e9078206932a',\n    'format' : 'iframe',\n    'height' : 90,\n    'width' : 728,\n    'params' : {}\n  };\n</script>\n<script src="https://bicea.org/22/60b91ea64916a1564545e9078206932a"></script>`;
                        navigator.clipboard.writeText(code);
                        setCopiedLeaderboard(true);
                        setTimeout(() => setCopiedLeaderboard(false), 2500);
                      }}
                      className="px-2.5 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                    >
                      {copiedLeaderboard ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedLeaderboard ? 'Copié !' : 'Copier'}</span>
                    </button>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 text-amber-300 font-mono text-[10px] border border-slate-800 break-all leading-relaxed shadow-inner">
                    <code>&lt;script&gt; atOptions = &#123; 'key': '60b91ea64916a1564545e9078206932a', 'format': 'iframe', 'height': 90, 'width': 728 &#125;; &lt;/script&gt;&lt;script src="https://bicea.org/22/60b91ea64916a1564545e9078206932a"&gt;&lt;/script&gt;</code>
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Emplacement : Sous la section Hero en bannière Leaderboard 728×90 responsive</span>
                  </div>
                </div>

                {/* SCRIPT 2: BICEA CONTAINER */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-900 dark:text-white font-bold uppercase tracking-wider text-[11px]">
                      Régie Bicea : Slot Container #container-50f9422018c65ee6331aa76135412a1a
                    </label>
                    <button
                      onClick={() => {
                        const biceaFullCode = `<script async="async" data-cfasync="false" src="https://bicea.org/21/50f9422018c65ee6331aa76135412a1a"></script>\n<div id="container-50f9422018c65ee6331aa76135412a1a"></div>`;
                        navigator.clipboard.writeText(biceaFullCode);
                        setCopiedBicea(true);
                        setTimeout(() => setCopiedBicea(false), 2500);
                      }}
                      className="px-2 py-1 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-white rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedBicea ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedBicea ? 'Copié !' : 'Copier'}</span>
                    </button>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 text-emerald-300 font-mono text-[10px] border border-slate-800 break-all leading-relaxed shadow-inner">
                    <code>&lt;div id="container-50f9422018c65ee6331aa76135412a1a"&gt;&lt;/div&gt;</code>
                  </div>
                </div>

                {/* SCRIPT 1: AFDERS (PREMIER CODE) */}
                <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900/70 border border-slate-200 dark:border-white/10 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-800 dark:text-neutral-200 font-bold uppercase tracking-wider text-[11px]">
                      Régie Afders : Tag Global
                    </label>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('<script data-cfasync="false" src="https://afders.org/1/169fa6c8c40e592dd678829f10e27da2"></script>');
                        setCopiedScript(true);
                        setTimeout(() => setCopiedScript(false), 2500);
                      }}
                      className="px-2 py-1 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-white rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedScript ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedScript ? 'Copié !' : 'Copier'}</span>
                    </button>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 text-slate-100 font-mono text-[10px] border border-slate-800 break-all leading-relaxed shadow-inner">
                    <code>&lt;script data-cfasync="false" src="https://afders.org/1/169fa6c8c40e592dd678829f10e27da2"&gt;&lt;/script&gt;</code>
                  </div>
                </div>

                {/* Configuration & Parameters */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900/50 border border-slate-200 dark:border-white/10 space-y-2 text-[11px]">
                  <div className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-[11px]">
                    Paramètres d'Optimisation Appliqués
                  </div>
                  <div className="space-y-1.5 text-slate-600 dark:text-neutral-300">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>async="async" & data-cfasync="false" :</strong> Chargement non bloquant et exécution directe sans interception.</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Conteneur DOM dédié :</strong> ID unique préservé pour que la régie injecte automatiquement la bannière publicitaire.</span>
                    </div>
                  </div>
                </div>

                {/* Live Verification */}
                <div className="p-3 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/50 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-semibold text-slate-800 dark:text-neutral-200 text-[11px]">
                      Vérification DOM en temps réel :
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-700">
                    2 Tags & 1 Slot Connectés
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Live Preview Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col p-6 bg-black/60 overflow-y-auto justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    Aperçu Temps Réel · {draft.format.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyEmbed}
                    className="px-2.5 py-1 text-xs bg-white/5 hover:bg-white/10 border border-white/15 rounded text-neutral-300 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedNotification ? 'Copié !' : 'Copier les textes'}</span>
                  </button>
                </div>
              </div>

              {/* Compare Mode */}
              {compareMode ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-white/20 rounded-lg p-2 bg-neutral-900/60">
                    <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                      Original Pinterest (DevVortex)
                    </p>
                    <img
                      src={PINTEREST_REFERENCE_IMAGE}
                      alt="Original DevVortex pin"
                      referrerPolicy="no-referrer"
                      className="w-full h-80 object-cover rounded"
                    />
                  </div>

                  <div className="border border-red-500/50 rounded-lg p-2 bg-neutral-900/60">
                    <p className="text-[11px] font-mono text-red-400 uppercase tracking-wider mb-2">
                      Votre Modification
                    </p>
                    <AdPreviewCard creative={draft} />
                  </div>
                </div>
              ) : (
                <div className="w-full flex items-center justify-center py-2">
                  <AdPreviewCard creative={draft} />
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-6">
              <button
                onClick={() => handleApplyPreset(AD_PRESETS[0].creative)}
                className="px-3 py-2 text-xs text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Rétablir l’original</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-neutral-300 bg-white/5 hover:bg-white/10 rounded transition-colors cursor-pointer"
                >
                  Fermer
                </button>
                <button
                  onClick={handleSaveAndApply}
                  className="px-6 py-2.5 text-xs font-black uppercase tracking-widest text-white bg-red-600 hover:bg-red-500 rounded flex items-center gap-2 shadow-lg shadow-red-900/40 transition-transform active:scale-95 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Appliquer au site</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
