import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProgramsBento } from './components/ProgramsBento';
import { ScheduleSection } from './components/ScheduleSection';
import { PricingSection } from './components/PricingSection';
import { SanctuarySection } from './components/SanctuarySection';
import { TransformationSection } from './components/TransformationSection';
import { Footer } from './components/Footer';
import { AdStudioModal } from './components/AdStudioModal';
import { PassBookingModal } from './components/PassBookingModal';
import { GymHallsSection } from './components/GymHallsSection';
import { LogoIntegrationModal } from './components/LogoIntegrationModal';
import { DEFAULT_AD_CREATIVE } from './data/mockGymData';
import { AdCreative, GymClass, MembershipPlan, GymHall } from './types/gym';
import { Sliders, Sparkles, Check, ArrowUp, Code2 } from 'lucide-react';

export default function App() {
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  // Theme state: defaults to light mode as requested ("La couleur est trop sombre")
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('vortex_theme_mode');
      return savedTheme === 'dark';
    } catch {
      return false;
    }
  });

  // Sync dark class on document root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('vortex_theme_mode', isDarkMode ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }, [isDarkMode]);

  // Load saved ad creative or use default (ensuring light values)
  const [creative, setCreative] = useState<AdCreative>(() => {
    try {
      const saved = localStorage.getItem('vortex_ad_creative');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.id === 'vortex_default_ad') {
          return DEFAULT_AD_CREATIVE;
        }
        // If previously saved with dark overlay, ensure it is adjusted to bright
        if (parsed.overlayDarkness > 30) {
          parsed.overlayDarkness = 20;
          parsed.theme = 'clean_light';
          parsed.isLightBanner = true;
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return DEFAULT_AD_CREATIVE;
  });

  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<{ cls: GymClass; day: string } | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<{ plan: MembershipPlan; cycle: 'monthly' | 'annual' } | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSaveCreative = (updated: AdCreative) => {
    setCreative(updated);
    try {
      localStorage.setItem('vortex_ad_creative', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setToastMessage('Publicité mise à jour et appliquée au site avec succès !');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenBookingForPass = () => {
    setSelectedClass(null);
    setSelectedPlan(null);
    setSelectedProgram('Pass Découverte 7 Jours');
    setIsBookingOpen(true);
  };

  const handleOpenBookingForProgram = (programTitle: string) => {
    setSelectedClass(null);
    setSelectedPlan(null);
    setSelectedProgram(programTitle);
    setIsBookingOpen(true);
  };

  const handleBookClass = (cls: GymClass, day: string) => {
    setSelectedPlan(null);
    setSelectedProgram(undefined);
    setSelectedClass({ cls, day });
    setIsBookingOpen(true);
  };

  const handleSelectPlan = (plan: MembershipPlan, cycle: 'monthly' | 'annual') => {
    setSelectedClass(null);
    setSelectedProgram(undefined);
    setSelectedPlan({ plan, cycle });
    setIsBookingOpen(true);
  };

  const handleApplyHallToAd = (hall: GymHall) => {
    const updated: AdCreative = {
      ...creative,
      badgeText: hall.adBadge,
      headlineLine1: hall.adHeadline1,
      headlineHighlight: hall.adHighlight,
      headlineLine2: hall.adHeadline2,
      subheadline: hall.adTagline,
      imageUrl: hall.imageUrl,
      imageAlt: hall.name,
      theme: hall.adTheme,
      overlayDarkness: 18,
      isLightBanner: true,
    };
    handleSaveCreative(updated);
    // Smooth scroll to top to see the updated hero advertising banner
    const heroEl = document.getElementById('top');
    if (heroEl) {
      heroEl.scrollIntoView({ behavior: 'smooth' });
    }
    setToastMessage(`La Salle 0${hall.number} (${hall.name}) est maintenant en bannière publicitaire !`);
  };

  const handleBookHall = (hall: GymHall) => {
    setSelectedClass(null);
    setSelectedPlan(null);
    setSelectedProgram(`Accès Salle 0${hall.number} : ${hall.name}`);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0b0c10] text-slate-900 dark:text-neutral-100 selection:bg-red-600 selection:text-white relative transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar
        onOpenStudio={() => setIsStudioOpen(true)}
        onOpenBooking={handleOpenBookingForPass}
        onOpenLogoIntegration={() => setIsLogoModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section with Live Advertising Card */}
        <HeroSection
          creative={creative}
          onOpenBooking={handleOpenBookingForPass}
          onOpenStudio={() => setIsStudioOpen(true)}
        />

        {/* The 5 Sports & Gym Halls Section (Salles 1 à 5) with direct ad activation */}
        <GymHallsSection
          onApplyHallToAd={handleApplyHallToAd}
          onBookHall={handleBookHall}
        />

        {/* Bento Grid: Workout Programs */}
        <ProgramsBento onSelectProgram={handleOpenBookingForProgram} />

        {/* Recovery & Cold Plunge Spa */}
        <SanctuarySection onOpenBooking={handleOpenBookingForPass} />

        {/* Weekly Training Schedule */}
        <ScheduleSection onBookClass={handleBookClass} />

        {/* Proof & Athlete Transformations */}
        <TransformationSection />

        {/* Membership Plans & Pricing */}
        <PricingSection onSelectPlan={handleSelectPlan} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons for the Ad Studio and Logo Embed */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5">
        <button
          onClick={() => setIsLogoModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-3 bg-white dark:bg-neutral-900 text-slate-800 dark:text-neutral-200 font-athletic text-xs uppercase tracking-wider font-extrabold rounded-full shadow-xl border border-slate-200 dark:border-white/20 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          title="Intégrer le logo ou le badge du club sur votre site"
        >
          <Code2 className="w-4 h-4 text-red-600" />
          <span className="hidden sm:inline">Intégrer Logo</span>
        </button>

        <button
          onClick={() => setIsStudioOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-500 text-white font-athletic text-sm uppercase tracking-wider font-extrabold rounded-full shadow-2xl shadow-red-900/60 border border-white/20 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          title="Modifier le kit publicitaire"
        >
          <Sliders className="w-4 h-4" />
          <span>Modifier l'édit pub</span>
        </button>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 px-5 py-2.5 bg-neutral-900 text-white border border-emerald-500/50 rounded-full shadow-2xl flex items-center gap-2 text-xs font-semibold backdrop-blur animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Studio Ad Modifier Modal */}
      <AdStudioModal
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        creative={creative}
        onSave={handleSaveCreative}
      />

      {/* Logo & Widget Integration Modal */}
      <LogoIntegrationModal
        isOpen={isLogoModalOpen}
        onClose={() => setIsLogoModalOpen(false)}
      />

      {/* Booking / Pass Modal */}
      <PassBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedClass={selectedClass}
        selectedPlan={selectedPlan}
        initialProgram={selectedProgram}
      />
    </div>
  );
}
