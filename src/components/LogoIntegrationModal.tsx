import React, { useState } from 'react';
import { VortexLogo } from './VortexLogo';
import {
  X,
  Copy,
  Check,
  Download,
  Code2,
  Share2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  LogIn,
  Layers,
} from 'lucide-react';

interface LogoIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'logo_embed' | 'member_login';
}

export const LogoIntegrationModal: React.FC<LogoIntegrationModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'logo_embed',
}) => {
  const [activeTab, setActiveTab] = useState<'logo_embed' | 'member_login'>(defaultTab);
  const [selectedVariant, setSelectedVariant] = useState<'crimson' | 'dark' | 'white'>('crimson');
  const [embedFormat, setEmbedFormat] = useState<'badge_html' | 'svg_code' | 'iframe_widget'>('badge_html');
  const [copied, setCopied] = useState<string | null>(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
      setLoginSuccess(false);
    }
  }, [isOpen, defaultTab]);

  if (!isOpen) return null;

  const getEmbedCode = () => {
    switch (embedFormat) {
      case 'svg_code':
        return `<svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 4L92 27V73L50 96L8 73V27L50 4Z" fill="rgba(220,38,38,0.08)" stroke="#dc2626" stroke-width="3" stroke-linejoin="round"/>
  <path d="M26 30L50 78L74 30H61L50 56L39 30H26Z" fill="#dc2626"/>
  <polygon points="50,22 58,36 50,48 42,36" fill="#ef4444"/>
  <path d="M50 82L32 46H20L50 92L80 46H68L50 82Z" fill="#991b1b" opacity="0.8"/>
</svg>`;

      case 'iframe_widget':
        return `<iframe 
  src="${window.location.origin}/#salles" 
  width="100%" 
  height="220" 
  style="border:1px solid #e2e8f0; border-radius:16px; max-width:420px;" 
  title="Badge Officiel Salle Sportif"
  loading="lazy">
</iframe>`;

      case 'badge_html':
      default:
        return `<!-- Badge Partenaire Salle Sportif -->
<a href="${window.location.origin}" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; gap:10px; padding:10px 18px; background:#0f172a; color:#ffffff; font-family:sans-serif; font-size:13px; font-weight:700; text-decoration:none; border-radius:10px; box-shadow:0 4px 12px rgba(0,0,0,0.15);">
  <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 4L92 27V73L50 96L8 73V27L50 4Z" stroke="#dc2626" stroke-width="3"/>
    <path d="M26 30L50 78L74 30H61L50 56L39 30H26Z" fill="#dc2626"/>
  </svg>
  <span>Partenaire Officiel Salle Sportif</span>
</a>`;
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2500);
  };

  const handleDownloadSvg = () => {
    const svgContent = `<svg width="200" height="200" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M50 4L92 27V73L50 96L8 73V27L50 4Z" fill="rgba(220,38,38,0.08)" stroke="#dc2626" stroke-width="3" stroke-linejoin="round"/>
  <path d="M26 30L50 78L74 30H61L50 56L39 30H26Z" fill="#dc2626"/>
  <polygon points="50,22 58,36 50,48 42,36" fill="#ef4444"/>
  <path d="M50 82L32 46H20L50 92L80 46H68L50 82Z" fill="#991b1b" opacity="0.8"/>
</svg>`;
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'salle-sportif-logo.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPass.trim()) return;
    setLoginSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-white/15 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-auto transition-colors">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-neutral-900/60">
          <div className="flex items-center gap-3">
            <VortexLogo size={36} variant="crimson" />
            <div>
              <h3 className="font-athletic text-2xl font-black uppercase text-slate-950 dark:text-white leading-none">
                Intégration Facile & Espace Visiteurs
              </h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                Intégrez le logo officiel ou connectez-vous rapidement à votre profil
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-6 pt-5">
          <div className="flex rounded-xl bg-slate-100 dark:bg-neutral-900 p-1 border border-slate-200 dark:border-white/10">
            <button
              onClick={() => setActiveTab('logo_embed')}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'logo_embed'
                  ? 'bg-white text-slate-950 shadow-sm font-extrabold'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Code2 className="w-4 h-4 text-red-600" />
              <span>Intégrer le Logo / Widget sur votre site</span>
            </button>
            <button
              onClick={() => setActiveTab('member_login')}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'member_login'
                  ? 'bg-white text-slate-950 shadow-sm font-extrabold'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <LogIn className="w-4 h-4 text-red-600" />
              <span>Connexion Rapide Visiteur / Membre</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {activeTab === 'logo_embed' ? (
            <div className="space-y-6">
              {/* Visual preview card */}
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/40 flex flex-col items-center justify-center text-center">
                <div className="mb-3 p-4 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm border border-slate-200 dark:border-white/10">
                  <VortexLogo size={64} variant={selectedVariant} showText={true} />
                </div>
                <div className="text-xs font-bold text-slate-700 dark:text-neutral-300">
                  Logo Officiel Vectoriel Salle Sportif
                </div>
                <p className="text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">
                  Haute résolution vectorielle SVG, compatible tout site web, blog ou signature email.
                </p>

                {/* Color variant pills */}
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-[11px] text-slate-500 font-bold uppercase mr-1">Couleur :</span>
                  <button
                    onClick={() => setSelectedVariant('crimson')}
                    className={`px-3 py-1 rounded-md text-xs font-bold cursor-pointer transition-all ${
                      selectedVariant === 'crimson'
                        ? 'bg-red-600 text-white shadow'
                        : 'bg-white dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-white/10'
                    }`}
                  >
                    Rouge Iron
                  </button>
                  <button
                    onClick={() => setSelectedVariant('dark')}
                    className={`px-3 py-1 rounded-md text-xs font-bold cursor-pointer transition-all ${
                      selectedVariant === 'dark'
                        ? 'bg-slate-950 text-white shadow'
                        : 'bg-white dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-white/10'
                    }`}
                  >
                    Noir Anthracite
                  </button>
                  <button
                    onClick={() => setSelectedVariant('white')}
                    className={`px-3 py-1 rounded-md text-xs font-bold cursor-pointer transition-all ${
                      selectedVariant === 'white'
                        ? 'bg-slate-600 text-white shadow'
                        : 'bg-white dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-white/10'
                    }`}
                  >
                    Blanc Pur
                  </button>
                </div>
              </div>

              {/* Format selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300 mb-2">
                  Choisissez le format d'intégration :
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    onClick={() => setEmbedFormat('badge_html')}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                      embedFormat === 'badge_html'
                        ? 'bg-red-50 dark:bg-red-600/10 border-red-600 text-red-600 font-bold'
                        : 'bg-slate-50 dark:bg-neutral-900 border-slate-200 dark:border-white/10 text-slate-700 dark:text-neutral-300'
                    }`}
                  >
                    <span className="block font-bold">Bouton / Badge HTML</span>
                    <span className="text-[10px] text-slate-500 dark:text-neutral-400">Lien clic vers le club</span>
                  </button>

                  <button
                    onClick={() => setEmbedFormat('svg_code')}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                      embedFormat === 'svg_code'
                        ? 'bg-red-50 dark:bg-red-600/10 border-red-600 text-red-600 font-bold'
                        : 'bg-slate-50 dark:bg-neutral-900 border-slate-200 dark:border-white/10 text-slate-700 dark:text-neutral-300'
                    }`}
                  >
                    <span className="block font-bold">Code SVG Pur</span>
                    <span className="text-[10px] text-slate-500 dark:text-neutral-400">Intégration vectorielle</span>
                  </button>

                  <button
                    onClick={() => setEmbedFormat('iframe_widget')}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                      embedFormat === 'iframe_widget'
                        ? 'bg-red-50 dark:bg-red-600/10 border-red-600 text-red-600 font-bold'
                        : 'bg-slate-50 dark:bg-neutral-900 border-slate-200 dark:border-white/10 text-slate-700 dark:text-neutral-300'
                    }`}
                  >
                    <span className="block font-bold">Widget Iframe</span>
                    <span className="text-[10px] text-slate-500 dark:text-neutral-400">Mini-bannière dynamique</span>
                  </button>
                </div>
              </div>

              {/* Code Snippet Box with Copy Button */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-slate-500 dark:text-neutral-400">
                    Copiez et collez ce code dans votre code source :
                  </span>
                  <button
                    onClick={() => handleCopy(getEmbedCode(), 'code')}
                    className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                  >
                    {copied === 'code' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied === 'code' ? 'Code Copié !' : 'Copier le code'}</span>
                  </button>
                </div>

                <div className="relative">
                  <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto max-h-36 leading-relaxed border border-slate-800">
                    <code>{getEmbedCode()}</code>
                  </pre>
                </div>
              </div>

              {/* Quick Download Action */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-white/10">
                <button
                  onClick={handleDownloadSvg}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-900 dark:text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer border border-slate-200 dark:border-white/10"
                >
                  <Download className="w-4 h-4 text-red-600" />
                  <span>Télécharger le fichier logo (SVG)</span>
                </button>

                <span className="text-[11px] text-slate-500 dark:text-neutral-400">
                  Licence libre pour partenaires & membres
                </span>
              </div>
            </div>
          ) : (
            /* TAB 2: Member Quick Login / Onboarding */
            <div className="space-y-5">
              {!loginSuccess ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-neutral-300">
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">
                      Connexion Espace Adhérent & Visiteur
                    </p>
                    <p className="text-[11px]">
                      Entrez votre identifiant pour consulter vos réservations de salles, suivre vos chronos et modifier vos accès.
                    </p>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-neutral-400 font-bold uppercase tracking-wider mb-1">
                      Adresse Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="nom@exemple.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-neutral-400 font-bold uppercase tracking-wider mb-1">
                      Mot de passe *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={loginPass}
                      onChange={(e) => setLoginPass(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-white/10 rounded-lg px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-athletic text-lg font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-red-600/30 transition-all cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Se Connecter à Mon Espace</span>
                  </button>

                  <div className="text-center pt-2 text-[11px] text-slate-500">
                    Nouveau visiteur ? Vous pouvez réserver directement sans mot de passe via le bouton <strong>"Pass 7 Jours"</strong>.
                  </div>
                </form>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-3">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h4 className="font-athletic text-2xl font-black uppercase text-slate-950 dark:text-white mb-1">
                    Connexion Réussie !
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-neutral-400 mb-6">
                    Bienvenue dans votre espace d'entraînement Salle Sportif.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-slate-950 text-white dark:bg-white dark:text-slate-950 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Accéder à mon tableau de bord
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
