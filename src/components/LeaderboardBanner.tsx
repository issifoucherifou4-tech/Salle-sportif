import React, { useState } from 'react';
import { ExternalLink, Sparkles, CheckCircle2, ShieldCheck, Copy, Check } from 'lucide-react';

interface LeaderboardBannerProps {
  onOpenStudio?: () => void;
  onOpenAccount?: () => void;
}

export const LeaderboardBanner: React.FC<LeaderboardBannerProps> = ({
  onOpenStudio,
  onOpenAccount,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const bannerHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <base target="_blank">
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
  </style>
</head>
<body>
  <script type="text/javascript">
    atOptions = {
      'key' : '60b91ea64916a1564545e9078206932a',
      'format' : 'iframe',
      'height' : 90,
      'width' : 728,
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="https://bicea.org/22/60b91ea64916a1564545e9078206932a"></script>
</body>
</html>`;

  const rawCodeSnippet = `<script>
  atOptions = {
    'key' : '60b91ea64916a1564545e9078206932a',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://bicea.org/22/60b91ea64916a1564545e9078206932a"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCodeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="leaderboard-pub">
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-gradient-to-b from-slate-50 to-white dark:from-neutral-900/90 dark:to-neutral-950 p-4 shadow-sm">
        {/* Banner header bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-3 pb-2.5 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-extrabold uppercase font-athletic tracking-wider text-slate-900 dark:text-white text-xs sm:text-sm">
              Bannière Partenaire 728×90 · Compte Monétisation Bicea
            </span>
            <span className="hidden lg:inline text-[10px] px-2 py-0.5 rounded bg-slate-200/80 dark:bg-white/10 text-slate-700 dark:text-neutral-300 font-mono">
              Key: 60b91ea64916a1564545e9078206932a
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="hidden sm:flex items-center gap-1 font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>Actif sur votre compte</span>
            </span>

            <button
              onClick={handleCopy}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-neutral-200 rounded font-medium text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
              title="Copier le code de la bannière"
            >
              {copiedCode ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCode ? 'Copié' : 'Copier tag'}</span>
            </button>

            {onOpenAccount && (
              <button
                onClick={onOpenAccount}
                className="text-red-600 dark:text-red-400 font-bold hover:underline cursor-pointer flex items-center gap-0.5"
              >
                <span>Mon Compte</span>
              </button>
            )}
          </div>
        </div>

        {/* 728x90 Leaderboard Frame with responsive handling */}
        <div className="flex flex-col items-center justify-center overflow-x-auto py-2">
          <div className="relative min-w-[320px] max-w-full flex items-center justify-center rounded-xl bg-white dark:bg-black/40 border border-dashed border-slate-300 dark:border-white/15 p-1 sm:p-2">
            <iframe
              srcDoc={bannerHtml}
              title="Bannière Bicea 728x90 Leaderboard"
              width={728}
              height={90}
              className="border-0 overflow-hidden max-w-full block"
              style={{
                width: '728px',
                height: '90px',
                maxWidth: '100%',
              }}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </div>

          <div className="mt-2 text-[11px] text-slate-500 dark:text-neutral-400 text-center flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Format IAB Leaderboard (728×90 px) synchronisé avec votre compte régie</span>
          </div>
        </div>
      </div>
    </div>
  );
};
