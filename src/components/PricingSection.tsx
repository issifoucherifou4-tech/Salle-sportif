import React, { useState } from 'react';
import { MEMBERSHIP_PLANS } from '../data/mockGymData';
import { MembershipPlan } from '../types/gym';
import { Check, ArrowRight } from 'lucide-react';

interface PricingSectionProps {
  onSelectPlan: (plan: MembershipPlan, billingCycle: 'monthly' | 'annual') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  return (
    <section id="adhesions" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200 dark:border-white/10 transition-colors">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-600 mb-2">
          <span>Abonnements & Tarifs</span>
          <span>·</span>
          <span>Transparence Totale</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-athletic uppercase text-slate-950 dark:text-white tracking-tight mb-4">
          Choisissez Votre Formule d’Entraînement
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-400">
          Toutes nos formules incluent l’accès aux vestiaires premium, serviette fournie et application mobile d'entraînement.
        </p>

        {/* Billing cycle toggle */}
        <div className="mt-8 inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-white/10 shadow-inner">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer ${
              billingCycle === 'monthly'
                ? 'bg-white dark:bg-neutral-800 text-slate-950 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            Facturation Mensuelle
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              billingCycle === 'annual'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <span>Engagement Annuel</span>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono font-bold">
              -20%
            </span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {MEMBERSHIP_PLANS.map((plan) => {
          const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

          return (
            <div
              key={plan.id}
              className={`rounded-2xl border flex flex-col justify-between p-6 sm:p-8 transition-all ${
                plan.recommended
                  ? 'border-red-600 bg-white dark:bg-[#161820] shadow-xl shadow-red-600/10 relative ring-2 ring-red-600/20'
                  : 'border-slate-200 dark:border-white/10 bg-white dark:bg-[#111317] hover:border-slate-300 dark:hover:border-white/20 shadow-sm hover:shadow-lg'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-600 text-white text-[11px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full shadow-md">
                    Formule la plus choisie
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-2xl font-black font-athletic uppercase text-slate-950 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-neutral-400 min-h-[32px] mb-6">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-slate-100 dark:border-white/10 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black font-athletic text-slate-950 dark:text-white tabular-nums">
                    {price}€
                  </span>
                  <span className="text-xs text-slate-500 dark:text-neutral-400 font-mono">
                    / mois {billingCycle === 'annual' ? '(facturé annuellement)' : ''}
                  </span>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-400 mb-2">
                    Inclus dans ce forfait :
                  </div>
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-neutral-300">
                      <Check className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] text-slate-500 mb-4 italic">
                  {plan.idealFor}
                </p>

                <button
                  onClick={() => onSelectPlan(plan, billingCycle)}
                  className={`w-full py-3.5 rounded-lg font-athletic text-base font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all transform active:scale-95 ${
                    plan.recommended
                      ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-white/10 dark:hover:bg-white/15 dark:text-white border border-slate-200 dark:border-white/15'
                  }`}
                >
                  <span>Rejoindre en {plan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
