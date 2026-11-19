import { z } from 'zod';

export const SiteConfigSchema = z.object({
  brandName: z.string(),
  partnerOne: z.string(),
  partnerTwo: z.string(),
  brandLine: z.string(),
  subline: z.string(),
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
  brandName: "KAUSEEN",
  partnerOne: "Kausik", // Primary identity element
  partnerTwo: "Parveen", // Secondary identity element
  brandLine: "Six Years. One Beautiful Story.",
  subline: "23 November 2020 — Forever",
  cinematicSubtitle: "A personal digital love story celebrating six years together.",
  startDate: "2020-11-23T00:00:00+05:30",
  anniversaryDate: "2026-11-23T00:00:00+05:30",
  timezone: "Asia/Kolkata",
  accessPasscode: "23112020", // Recipient unlocks with anniversary date (or any custom code)
  enablePasscodeGate: false, // Set to true to require passcode before viewing intimate letters
  songs: ["Alfaaz", "Dilruba Dilnasee"],
};
