import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Clock, ShieldCheck, Dumbbell } from 'lucide-react';
import { GymClass, MembershipPlan } from '../types/gym';

interface PassBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedClass?: { cls: GymClass; day: string } | null;
  selectedPlan?: { plan: MembershipPlan; cycle: 'monthly' | 'annual' } | null;
  initialProgram?: string;
}

export const PassBookingModal: React.FC<PassBookingModalProps> = ({
  isOpen,
  onClose,
  selectedClass,
  selectedPlan,
  initialProgram,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState(
    selectedClass?.cls.name || initialProgram || 'Pass Découverte 7 Jours'
  );
  const [timeSlot, setTimeSlot] = useState(
    selectedClass ? `${selectedClass.day} à ${selectedClass.cls.time}` : 'Matin (07:00 - 10:00)'
  );
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    if (selectedClass) {
      setProgram(selectedClass.cls.name);
      setTimeSlot(`${selectedClass.day} à ${selectedClass.cls.time}`);
    } else if (selectedPlan) {
      setProgram(`Abonnement ${selectedPlan.plan.name} (${selectedPlan.cycle === 'annual' ? 'Annuel' : 'Mensuel'})`);
    } else if (initialProgram) {
      setProgram(initialProgram);
    }
  }, [selectedClass, selectedPlan, initialProgram]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Veuillez renseigner tous les champs obligatoires.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-[#12141a] border border-slate-200 dark:border-white/15 rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative my-auto transition-colors">
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-red-50 text-red-600 dark:bg-red-600/20 dark:text-red-500 border border-red-200 dark:border-red-500/30">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-athletic text-2xl font-black uppercase text-slate-950 dark:text-white tracking-wide">
                  {selectedClass
                    ? 'Réservation de Séance'
                    : selectedPlan
                    ? `Souscription : ${selectedPlan.plan.name}`
                    : 'Activer Mon Pass 7 Jours'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Accès illimité aux installations et bilan forme offert
                </p>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 mb-4 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-neutral-400 font-bold uppercase tracking-wider mb-1">
                  Nom et Prénom *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Marc Lefèvre"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-neutral-400 font-bold uppercase tracking-wider mb-1">
                    Adresse Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="nom@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-neutral-400 font-bold uppercase tracking-wider mb-1">
                    Numéro de Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="06 12 34 56 78"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 font-semibold uppercase tracking-wider mb-1">
                  Formule ou Programme sélectionné
                </label>
                <input
                  type="text"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded px-3 py-2.5 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-semibold uppercase tracking-wider mb-1">
                  Créneau d'accueil souhaité
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded px-3 py-2.5 text-white focus:outline-none focus:border-red-500"
                >
                  <option value="Matin (07:00 - 10:00)">Matinée (07:00 - 10:00)</option>
                  <option value="Midi (12:00 - 14:00)">Pause Déjeuner (12:00 - 14:00)</option>
                  <option value="Après-midi (15:00 - 18:00)">Après-midi (15:00 - 18:00)</option>
                  <option value="Soirée (18:30 - 21:00)">Soirée (18:30 - 21:00)</option>
                  {selectedClass && (
                    <option value={`${selectedClass.day} à ${selectedClass.cls.time}`}>
                      {selectedClass.day} à {selectedClass.cls.time} ({selectedClass.cls.name})
                    </option>
                  )}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-athletic text-lg font-black uppercase tracking-wider rounded transition-all shadow-lg shadow-red-900/40 cursor-pointer"
                >
                  Valider Ma Demande
                </button>
              </div>

              <p className="text-[11px] text-neutral-500 text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Aucun débit préalable · Annulation libre à tout moment</span>
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-athletic text-3xl font-black uppercase text-white mb-2 tracking-wide">
              Réservation Enregistrée !
            </h3>

            <p className="text-sm text-neutral-300 mb-6 max-w-sm mx-auto leading-relaxed">
              Félicitations <strong className="text-white">{fullName}</strong>, votre pass d'accès pour <strong className="text-red-400">{program}</strong> est validé.
            </p>

            <div className="bg-neutral-900 p-4 rounded-xl border border-white/10 text-xs text-left mb-6 space-y-2">
              <div className="flex justify-between text-neutral-400">
                <span>Code d’accès provisoire :</span>
                <span className="font-mono font-bold text-white">VTX-8842-PARIS</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Créneau :</span>
                <span className="text-white font-medium">{timeSlot}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Confirmation envoyée à :</span>
                <span className="text-white font-mono">{email}</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider rounded border border-white/15 cursor-pointer"
            >
              Retourner au site
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
