import { z } from 'zod';

export const QuoteItemSchema = z.object({
  id: z.string(),
  text: z.string(),
  context: z.string().optional(),
  author: z.string().optional(),
  isPendingPersonalization: z.boolean().default(false),
});

export type QuoteItem = z.infer<typeof QuoteItemSchema>;

export const QUOTES_DATA: QuoteItem[] = [
  {
    id: "quote-1",
    text: "Some moments become memories. Some people become home.",
    context: "November 2020",
    author: "Kausik",
    isPendingPersonalization: false,
  },
  {
    id: "quote-2",
    text: "Six years later, and your smile still feels like my favourite place in the world.",
    context: "Every Single Day",
    author: "Kausik",
    isPendingPersonalization: false,
  },
  {
    id: "quote-3",
    text: "Among all the stories written across this universe, ours remains my absolute favourite.",
    context: "Six Years of Us",
    author: "Kausik",
    isPendingPersonalization: false,
  },
  {
    id: "quote-4",
    text: "Every chapter feels better, softer, and more meaningful because it is lived with you.",
    context: "Our Journey",
    author: "Kausik",
    isPendingPersonalization: false,
  },
  {
    id: "quote-5",
    text: "You are the quiet peace at the end of every storm and the joy at the start of every morning.",
    context: "With All My Devotion",
    author: "Kausik",
    isPendingPersonalization: false,
  }
];
