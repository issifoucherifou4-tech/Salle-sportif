export type AdFormat = 'banner_hero' | 'social_square' | 'story_vertical' | 'compact_leader';

export type AdThemeColor = 'crimson' | 'volt' | 'obsidian' | 'bronze' | 'chrome' | 'clean_light' | 'platinum';

export interface AdCreative {
  id: string;
  badgeText: string;
  headlineLine1: string;
  headlineHighlight: string;
  headlineLine2: string;
  subheadline: string;
  ctaText: string;
  secondaryCtaText: string;
  offerTag: string;
  priceNote: string;
  imageUrl: string;
  imageAlt: string;
  theme: AdThemeColor;
  format: AdFormat;
  overlayDarkness: number; // 10 to 80
  contrastBoost: boolean;
  monochromeFilter: boolean;
  showMemberCounter: boolean;
  activeMembersCount: number;
  isLightBanner?: boolean;
}

export interface TrainingProgram {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  intensity: 'Élevée' | 'Maximale' | 'Régénératrice' | 'Modérée';
  duration: string;
  equipment: string;
  imageUrl: string;
  benefits: string[];
}

export interface GymClass {
  id: string;
  name: string;
  category: 'Force' | 'Hyrox' | 'Mobilité' | 'Boxe';
  time: string;
  coach: string;
  spotsLeft: number;
  room: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  recommended?: boolean;
  description: string;
  features: string[];
  idealFor: string;
}

export interface GymHall {
  id: string;
  number: number; // 1 to 5
  name: string;
  subtitle: string;
  sports: string[];
  surface: string;
  capacity: string;
  equipment: string[];
  coach: string;
  description: string;
  imageUrl: string;
  adHeadline1: string;
  adHighlight: string;
  adHeadline2: string;
  adTagline: string;
  adBadge: string;
  adTheme: AdThemeColor;
}

export interface BookingSubmission {
  fullName: string;
  email: string;
  phone: string;
  programOfInterest: string;
  timeSlot: string;
}
