export type Locale = "ru" | "en";

export type ThemeStyle = "classic" | "minimal" | "luxury" | "travel" | "botanic" | "rustic";

export type RsvpStatus = "confirmed" | "declined" | "pending" | "maybe";

export type PlanTier = "free" | "basic" | "premium" | "lux";

export type UserRole = "organizer" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  plan: PlanTier;
  avatar?: string;
  createdAt: string;
}

export interface Wedding {
  id: string;
  userId: string;
  coupleNames: string;
  partner1: string;
  partner2: string;
  date: string;
  venue: string;
  venueAddress: string;
  guestCount: number;
  status: "draft" | "published" | "archived";
}

export interface InvitationConfig {
  theme: ThemeStyle;
  colors: {
    primary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  music?: {
    enabled: boolean;
    trackUrl?: string;
    trackName?: string;
    autoplay: boolean;
  };
  blocks: InvitationBlock[];
}

export type BlockType =
  | "hero"
  | "countdown"
  | "story"
  | "schedule"
  | "location"
  | "transfer"
  | "rsvp"
  | "wishes"
  | "dresscode"
  | "faq"
  | "gifts"
  | "music"
  | "afterparty"
  | "seating"
  | "payment";

export interface InvitationBlock {
  id: string;
  type: BlockType;
  enabled: boolean;
  order: number;
  data: Record<string, unknown>;
}

export interface Invitation {
  id: string;
  weddingId: string;
  slug: string;
  title: string;
  templateId: string;
  config: InvitationConfig;
  published: boolean;
  publishedAt?: string;
  views: number;
  watermark: boolean;
}

export interface Guest {
  id: string;
  weddingId: string;
  name: string;
  email?: string;
  phone?: string;
  status: RsvpStatus;
  plusOnes: number;
  children: number;
  dietary?: string;
  message?: string;
  table?: string;
  side?: "groom" | "bride" | "both";
  respondedAt?: string;
}

export interface Wish {
  id: string;
  invitationId: string;
  authorName: string;
  text: string;
  createdAt: string;
}

export interface Template {
  id: string;
  name: string;
  nameEn: string;
  style: ThemeStyle | string;
  category: string;
  premium: boolean;
  price: number;
  preview: string;
  colors: string[];
  description: string;
  descriptionEn: string;
}

export interface Plan {
  id: PlanTier;
  name: string;
  nameEn: string;
  price: number;
  popular?: boolean;
  features: string[];
  featuresEn: string[];
  guestLimit: number;
  watermark: boolean;
}

export interface ScheduleItem {
  time: string;
  title: string;
  titleEn?: string;
  description?: string;
  icon?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
