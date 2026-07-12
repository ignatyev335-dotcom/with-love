"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Guest, Invitation, User, Wedding, Wish } from "@/types";
import {
  ADMIN_USER,
  DEMO_GUESTS,
  DEMO_INVITATION,
  DEMO_USER,
  DEMO_WEDDING,
  DEMO_WISHES,
} from "./seed";

interface AppState {
  user: User | null;
  wedding: Wedding | null;
  invitation: Invitation | null;
  guests: Guest[];
  wishes: Wish[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateInvitation: (partial: Partial<Invitation>) => void;
  updateConfig: (config: Invitation["config"]) => void;
  toggleBlock: (blockId: string) => void;
  publishInvitation: () => void;
  addGuest: (guest: Omit<Guest, "id">) => void;
  updateGuest: (id: string, partial: Partial<Guest>) => void;
  removeGuest: (id: string) => void;
  submitRsvp: (data: {
    name: string;
    status: Guest["status"];
    plusOnes: number;
    message?: string;
    dietary?: string;
  }) => void;
  addWish: (authorName: string, text: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      wedding: DEMO_WEDDING,
      invitation: DEMO_INVITATION,
      guests: DEMO_GUESTS,
      wishes: DEMO_WISHES,

      login: (email) => {
        const normalized = email.trim().toLowerCase();
        if (normalized === ADMIN_USER.email) {
          set({ user: ADMIN_USER });
          return true;
        }
        if (normalized === DEMO_USER.email || normalized.includes("@")) {
          set({
            user: {
              ...DEMO_USER,
              email: normalized,
              name:
                normalized === DEMO_USER.email
                  ? DEMO_USER.name
                  : normalized.split("@")[0],
            },
          });
          return true;
        }
        return false;
      },

      register: (name, email) => {
        set({
          user: {
            id: `user-${Date.now()}`,
            email: email.trim().toLowerCase(),
            name,
            role: "organizer",
            plan: "free",
            createdAt: new Date().toISOString(),
          },
        });
        return true;
      },

      logout: () => set({ user: null }),

      updateInvitation: (partial) => {
        const inv = get().invitation;
        if (!inv) return;
        set({ invitation: { ...inv, ...partial } });
      },

      updateConfig: (config) => {
        const inv = get().invitation;
        if (!inv) return;
        set({ invitation: { ...inv, config } });
      },

      toggleBlock: (blockId) => {
        const inv = get().invitation;
        if (!inv) return;
        set({
          invitation: {
            ...inv,
            config: {
              ...inv.config,
              blocks: inv.config.blocks.map((b) =>
                b.id === blockId ? { ...b, enabled: !b.enabled } : b
              ),
            },
          },
        });
      },

      publishInvitation: () => {
        const inv = get().invitation;
        if (!inv) return;
        set({
          invitation: {
            ...inv,
            published: true,
            publishedAt: new Date().toISOString(),
          },
          wedding: get().wedding
            ? { ...get().wedding!, status: "published" }
            : null,
        });
      },

      addGuest: (guest) => {
        set({
          guests: [
            ...get().guests,
            { ...guest, id: `g-${Date.now()}` },
          ],
        });
      },

      updateGuest: (id, partial) => {
        set({
          guests: get().guests.map((g) =>
            g.id === id ? { ...g, ...partial } : g
          ),
        });
      },

      removeGuest: (id) => {
        set({ guests: get().guests.filter((g) => g.id !== id) });
      },

      submitRsvp: (data) => {
        const wedding = get().wedding;
        if (!wedding) return;
        const existing = get().guests.find(
          (g) => g.name.toLowerCase() === data.name.toLowerCase()
        );
        if (existing) {
          get().updateGuest(existing.id, {
            status: data.status,
            plusOnes: data.plusOnes,
            message: data.message,
            dietary: data.dietary,
            respondedAt: new Date().toISOString(),
          });
        } else {
          get().addGuest({
            weddingId: wedding.id,
            name: data.name,
            status: data.status,
            plusOnes: data.plusOnes,
            children: 0,
            message: data.message,
            dietary: data.dietary,
            respondedAt: new Date().toISOString(),
          });
        }
      },

      addWish: (authorName, text) => {
        const inv = get().invitation;
        if (!inv) return;
        set({
          wishes: [
            {
              id: `w-${Date.now()}`,
              invitationId: inv.id,
              authorName,
              text,
              createdAt: new Date().toISOString(),
            },
            ...get().wishes,
          ],
        });
      },
    }),
    {
      name: "with-love-store",
      partialize: (s) => ({
        user: s.user,
        wedding: s.wedding,
        invitation: s.invitation,
        guests: s.guests,
        wishes: s.wishes,
      }),
    }
  )
);
