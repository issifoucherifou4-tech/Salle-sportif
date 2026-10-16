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
  User,
  Wallet,
  TrendingUp,
  BarChart3,
  BadgeCheck,
  CheckCircle2,
} from 'lucide-react';

interface LogoIntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'mon_compte' | 'logo_embed' | 'member_login';
  onOpenStudio?: () => void;
}

export const LogoIntegrationModal: React.FC<LogoIntegrationModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'mon_compte',
  onOpenStudio,
}) => {
  const [activeTab, setActiveTab] = useState<'mon_compte' | 'logo_embed' | 'member_login'>(defaultTab);
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
          <div className="flex flex-wrap sm:flex-nowrap rounded-xl bg-slate-100 dark:bg-neutral-900 p-1 border border-slate-200 dark:border-white/10 gap-1">
            <button
              onClick={() => setActiveTab('mon_compte')}
              className={`flex-1 py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'mon_compte'
                  ? 'bg-white text-slate-950 shadow-sm font-extrabold'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Wallet className="w-3.5 h-3.5 text-red-600" />
              <span>Mon Compte & Monétisation</span>
              <span className="text-[10px] bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-400 font-black px-1.5 py-0.2 rounded-full">
                3
              </span>
            </button>
            <button
              onClick={() => setActiveTab('logo_embed')}
              className={`flex-1 py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'logo_embed'
                  ? 'bg-white text-slate-950 shadow-sm font-extrabold'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-red-600" />
              <span>Intégrer Logo / Widget</span>
            </button>
            <button
              onClick={() => setActiveTab('member_login')}
              className={`flex-1 py-2 px-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'member_login'
                  ? 'bg-white text-slate-950 shadow-sm font-extrabold'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5 text-red-600" />
              <span>Espace Adhérent</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {activeTab === 'mon_compte' && (
            <div className="space-y-5 text-xs">
              {/* Account Profile Header Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-neutral-900 text-white shadow-md border border-neutral-800">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-athletic text-xl font-bold shadow-md">
                      CS
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-sm sm:text-base tracking-wide font-athletic uppercase">
                          Cherifou Issifou
                        </span>
                        <BadgeCheck className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="text-[11px] text-neutral-300 font-mono">
                        issifoucherifou4@gmail.com
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Compte & Monétisation Actifs</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-3 border-t border-white/10 text-center">
                  <div className="p-2 rounded-xl bg-white/5">
                    <div className="text-[10px] text-neutral-400 uppercase font-bold">Régies Liées</div>
                    <div className="text-base font-athletic font-extrabold text-white mt-0.5">2 Régies</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5">
                    <div className="text-[10px] text-neutral-400 uppercase font-bold">Tags Actifs</div>
                    <div className="text-base font-athletic font-extrabold text-emerald-400 mt-0.5">3 Tags</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5">
                    <div className="text-[10px] text-neutral-400 uppercase font-bold">Format Clé</div>
                    <div className="text-base font-athletic font-extrabold text-amber-300 mt-0.5">728×90 Iframe</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white/5">
                    <div className="text-[10px] text-neutral-400 uppercase font-bold">Taux Visibilité</div>
                    <div className="text-base font-athletic font-extrabold text-emerald-400 mt-0.5">99.4 %</div>
                  </div>
                </div>
              </div>

              {/* NEW CODE ADDED: BICEA 728x90 IFRAME BANNER */}
              <div className="p-4 rounded-xl border-2 border-red-500/40 bg-white dark:bg-neutral-900 shadow-sm space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white font-athletic font-extrabold text-[10px] uppercase tracking-wider">
                      Code Ajouté à Votre Compte
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wide">
                      Bannière Leaderboard 728×90 (Bicea)
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      const snippet = `<script>\n  atOptions = {\n    'key' : '60b91ea64916a1564545e9078206932a',\n    'format' : 'iframe',\n    'height' : 90,\n    'width' : 728,\n    'params' : {}\n  };\n</script>\n<script src="https://bicea.org/22/60b91ea64916a1564545e9078206932a"></script>`;
                      navigator.clipboard.writeText(snippet);
                      setCopied('bicea_atoptions');
                      setTimeout(() => setCopied(null), 2500);
                    }}
                    className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
                  >
                    {copied === 'bicea_atoptions' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied === 'bicea_atoptions' ? 'Copié !' : 'Copier le code'}</span>
                  </button>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-[10px] sm:text-[11px] leading-relaxed border border-slate-800 break-all overflow-x-auto">
                  <span className="text-amber-400">&lt;script&gt;</span>{'\n'}
                  {'  '}atOptions = {'{\n'}
                  {'    '}'key' : '<span className="text-emerald-400 font-bold">60b91ea64916a1564545e9078206932a</span>',<br />
                  {'    '}'format' : '<span className="text-sky-300">iframe</span>',<br />
                  {'    '}'height' : 90,<br />
                  {'    '}'width' : 728,<br />
                  {'    '}'params' : {'{}'}<br />
                  {'  '}{'}'};<br />
                  <span className="text-amber-400">&lt;/script&gt;</span>{'\n'}
                  <span className="text-amber-400">&lt;script</span> <span className="text-emerald-300">src</span>="https://bicea.org/22/60b91ea64916a1564545e9078206932a"<span className="text-amber-400">&gt;&lt;/script&gt;</span>
                </div>

                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Intégré sur la page d'accueil sous forme de Leaderboard 728×90 responsive</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">ID de zone: 60b91ea64916a1564545e9078206932a</span>
                </div>
              </div>

              {/* OTHER CODES ATTACHED TO ACCOUNT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Bicea Container Tag */}
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                      Bicea Slot Container
                    </span>
                    <button
                      onClick={() => {
                        const snippet = `<script async="async" data-cfasync="false" src="https://bicea.org/21/50f9422018c65ee6331aa76135412a1a"></script>\n<div id="container-50f9422018c65ee6331aa76135412a1a"></div>`;
                        navigator.clipboard.writeText(snippet);
                        setCopied('bicea_container');
                        setTimeout(() => setCopied(null), 2500);
                      }}
                      className="text-[10px] text-red-600 dark:text-red-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
                    >
                      {copied === 'bicea_container' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copied === 'bicea_container' ? 'Copié' : 'Copier'}</span>
                    </button>
                  </div>
                  <div className="p-2 rounded bg-slate-900 text-[10px] font-mono text-neutral-300 break-all">
                    #container-50f9422018c65ee6331aa76135412a1a
                  </div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Actif au bas de page</span>
                  </div>
                </div>

                {/* Afders Global Tag */}
                <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
                      Afders Tag Global
                    </span>
                    <button
                      onClick={() => {
                        const snippet = `<script data-cfasync="false" src="https://afders.org/1/169fa6c8c40e592dd678829f10e27da2"></script>`;
                        navigator.clipboard.writeText(snippet);
                        setCopied('afders_global');
                        setTimeout(() => setCopied(null), 2500);
                      }}
                      className="text-[10px] text-red-600 dark:text-red-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
                    >
                      {copied === 'afders_global' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copied === 'afders_global' ? 'Copié' : 'Copier'}</span>
                    </button>
                  </div>
                  <div className="p-2 rounded bg-slate-900 text-[10px] font-mono text-neutral-300 break-all">
                    https://afders.org/1/169fa6c8c40e592dd678829f10e27da2
                  </div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Actif dans l'en-tête &lt;head&gt;</span>
                  </div>
                </div>
              </div>

              {/* Action row */}
              <div className="flex flex-wrap items-center justify-between pt-2 gap-2">
                <div className="text-[11px] text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Tous les tags sont associés à votre compte et diffusés en direct sur votre site.</span>
                </div>

                {onOpenStudio && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenStudio();
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5 cursor-pointer hover:bg-slate-800 transition-colors"
                  >
                    <span>Ouvrir Studio Publicitaire</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'logo_embed' && (
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
          )}

          {/* TAB 3: Member Quick Login / Onboarding */}
          {activeTab === 'member_login' && (
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
