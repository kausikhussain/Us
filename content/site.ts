import { z } from 'zod';

export const SiteConfigSchema = z.object({
  brandName: z.string(),
  partnerOne: z.string(),
  partnerTwo: z.string(),
  initials: z.string(),
  brandLine: z.string(),
  subline: z.string(),
  tagline: z.string(),
  startDate: z.string(), // ISO string with Asia/Kolkata offset
  anniversaryDate: z.string(), // ISO string with Asia/Kolkata offset
  timezone: z.string(),
  accessPasscode: z.string(),
  enablePasscodeGate: z.boolean(),
  songs: z.array(z.string()),
  cinematicSubtitle: z.string(),
});

export type SiteConfig = z.infer<typeof SiteConfigSchema>;

export const SITE_CONFIG: SiteConfig = {
  brandName: "K & N",
  partnerOne: "K",
  partnerTwo: "N",
  initials: "K & N",
  brandLine: "Six Years. One Story.",
  tagline: "Six Years. One Story. A Thousand Feelings.",
  subline: "23 November 2020 — Forever",
  cinematicSubtitle: "A personal digital world celebrating six years of love, memories, and devotion.",
  startDate: "2020-11-23T00:00:00+05:30",
  anniversaryDate: "2026-11-23T00:00:00+05:30",
  timezone: "Asia/Kolkata",
  accessPasscode: "23112020",
  enablePasscodeGate: true,
  songs: ["Alfaaz", "Dilruba Dilnasee"],
};
