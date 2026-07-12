/**
 * Stripe helpers (one-time payments for plans & premium templates).
 * Install `stripe` + set STRIPE_SECRET_KEY to go live.
 */

import type { PlanTier } from "@/types";

export const STRIPE_PRICE_MAP: Partial<Record<PlanTier, string>> = {
  // basic: "price_xxx",
  // premium: "price_yyy",
  // lux: "price_zzz",
};

export function isStripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

/** Creates Checkout Session URL — demo returns local checkout page */
export async function createCheckoutUrl(opts: {
  planId: PlanTier;
  locale: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<string> {
  if (!isStripeConfigured()) {
    return `/${opts.locale}/checkout?plan=${opts.planId}`;
  }

  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const session = await stripe.checkout.sessions.create({ ... });
  // return session.url!;
  return `/${opts.locale}/checkout?plan=${opts.planId}`;
}
