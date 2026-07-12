/**
 * Data model for With Love (Drizzle/Supabase-ready).
 * Runtime still uses Zustand mock; this is the production target schema.
 */

export type ProfileRole = "organizer" | "admin";
export type PlanTier = "free" | "basic" | "premium" | "lux";
export type WeddingStatus = "draft" | "published" | "archived";
export type RsvpStatus = "confirmed" | "declined" | "pending" | "maybe";
export type PaymentStatus = "pending" | "succeeded" | "refunded" | "failed";

/** profiles — 1:1 with auth.users */
export interface DbProfile {
  id: string;
  email: string;
  name: string;
  role: ProfileRole;
  plan: PlanTier;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

/** weddings — max 1 active per organizer */
export interface DbWedding {
  id: string;
  user_id: string;
  partner1: string;
  partner2: string;
  date: string;
  venue: string;
  venue_address: string;
  guest_limit: number;
  status: WeddingStatus;
  created_at: string;
  updated_at: string;
}

/** invitations — published config as jsonb */
export interface DbInvitation {
  id: string;
  wedding_id: string;
  slug: string;
  title: string;
  template_id: string | null;
  config: Record<string, unknown>;
  published: boolean;
  published_at: string | null;
  views: number;
  watermark: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbTemplate {
  id: string;
  name: string;
  name_en: string;
  style: string;
  category: string;
  premium: boolean;
  price_cents: number;
  preview_url: string;
  config_defaults: Record<string, unknown>;
  active: boolean;
}

export interface DbGuest {
  id: string;
  wedding_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  status: RsvpStatus;
  plus_ones: number;
  children: number;
  dietary: string | null;
  message: string | null;
  table_name: string | null;
  side: "groom" | "bride" | "both" | null;
  responded_at: string | null;
  created_at: string;
}

export interface DbRsvp {
  id: string;
  invitation_id: string;
  guest_id: string | null;
  name: string;
  status: RsvpStatus;
  plus_ones: number;
  dietary: string | null;
  message: string | null;
  created_at: string;
}

export interface DbWish {
  id: string;
  invitation_id: string;
  author_name: string;
  text: string;
  created_at: string;
}

export interface DbPayment {
  id: string;
  user_id: string;
  amount_cents: number;
  currency: string;
  status: PaymentStatus;
  product_type: "plan" | "template" | "addon";
  product_id: string;
  stripe_session_id: string | null;
  created_at: string;
}

/**
 * Suggested Supabase SQL (run when connecting real backend):
 *
 * create table profiles (...);
 * create table weddings (...);
 * create unique index weddings_one_active on weddings (user_id) where status != 'archived';
 * create table invitations (...);
 * create unique index invitations_slug on invitations (slug);
 * create table guests (...);
 * create table rsvps (...);
 * create table wishes (...);
 * create table payments (...);
 * create table templates (...);
 *
 * -- Realtime: enable on rsvps, guests
 */
