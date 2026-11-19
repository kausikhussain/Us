import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter, Pinyon_Script } from 'next/font/google';
import './globals.css';
import { SITE_CONFIG } from '@/content/site';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const pinyonScript = Pinyon_Script({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.brandName} — ${SITE_CONFIG.brandLine}`,
  description: SITE_CONFIG.cinematicSubtitle,
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#2A0C17',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${pinyonScript.variable}`}
    >
      <body className="bg-wine-950 text-ivory-50 antialiased selection:bg-crimson-600 selection:text-ivory-50 min-h-screen">
        {/* Subtle 35mm Film Grain Overlay */}
        <div className="fixed inset-0 pointer-events-none z-30 film-grain" />
        {children}
      </body>
    </html>
  );
}
