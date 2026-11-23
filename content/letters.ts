import { z } from 'zod';

export const LoveLetterSchema = z.object({
  id: z.string(),
  letterNumber: z.string(),
  title: z.string(),
  subtitle: z.string(),
  date: z.string(),
  salutation: z.string(),
  sealType: z.enum(['wax', 'ribbon']),
  paragraphs: z.array(z.string()),
  closing: z.string(),
  signatureName: z.string(),
  postscript: z.string().optional(),
});

export type LoveLetter = z.infer<typeof LoveLetterSchema>;

// Client bundle safe fallback shell. Real letters served via authenticated /api/private/content.
export const LETTERS_DATA: LoveLetter[] = [
  {
    id: 'letter-01',
    letterNumber: 'Letter 01',
    title: 'Keepsake Letter 01',
    subtitle: 'Private Love Letter — Authenticate to Read',
    date: '23 November 2026',
    salutation: 'Dearest Nasreen,',
    sealType: 'wax',
    paragraphs: [
      'Encrypted keepsake letter. Identity verification and multi-factor authentication required.',
    ],
    closing: 'With all my love,',
    signatureName: 'Kausik',
  },
  {
    id: 'letter-02',
    letterNumber: 'Letter 02',
    title: 'Keepsake Letter 02',
    subtitle: 'Private Love Letter — Authenticate to Read',
    date: '23 November 2026',
    salutation: 'Dearest Nasreen,',
    sealType: 'wax',
    paragraphs: [
      'Encrypted keepsake letter. Identity verification and multi-factor authentication required.',
    ],
    closing: 'With all my love,',
    signatureName: 'Kausik',
  },
  {
    id: 'letter-03',
    letterNumber: 'Letter 03',
    title: 'Open When You Miss Me',
    subtitle: 'Private Love Letter — Authenticate to Read',
    date: 'For Any Quiet Evening',
    salutation: 'Dearest Nasreen,',
    sealType: 'ribbon',
    paragraphs: [
      'Encrypted keepsake letter. Identity verification and multi-factor authentication required.',
    ],
    closing: 'With all my love,',
    signatureName: 'Kausik',
  },
];

export function getLetterById(id: string): LoveLetter | undefined {
  return LETTERS_DATA.find((l) => l.id === id);
}
