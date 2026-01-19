import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './dark-mode-overrides.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import AnalyticsTracker from '@/components/AnalyticsTracker';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://mindfulconsulting-538b9.web.app'),
  title: {
    default: 'Mindful Consulting Sdn Bhd | Leadership Development & Executive Coaching',
    template: '%s | Mindful Consulting'
  },
  description: 'Mindful Consulting partners with organizations and individuals to develop conscious, effective leadership grounded in presence, clarity, and human connection. Specializing in leadership programs, executive coaching, and team effectiveness.',
  keywords: [
    'leadership development Malaysia',
    'executive coaching',
    'team effectiveness workshops',
    'mindful leadership',
    'conscious leadership',
    'HRDCorp claimable training',
    'corporate training Malaysia',
    'leadership growth',
    'mindfulness for leaders'
  ],
  authors: [{ name: 'Mindful Consulting' }],
  creator: 'Mindful Consulting',
  publisher: 'Mindful Consulting',
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'fObp0nmAtX6pGaiWRFeKOTSgTPv9AvYD8aD9QCVGy8c',
  },

  // Open Graph (Facebook, LinkedIn, WhatsApp, etc.)
  openGraph: {
    type: 'website',
    locale: 'en_MY',
    url: 'https://mindfulconsulting-538b9.web.app',
    siteName: 'Mindful Consulting',
    title: 'Mindful Consulting Sdn Bhd | Leadership Development & Coaching',
    description: 'Nurturing conscious, effective leadership grounded in presence and human connection. Partners for organizational growth and personal leadership transformation.',
    images: [
      {
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: 'Mindful Consulting - Growth with Presence',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Mindful Consulting | Leadership Development & Coaching',
    description: 'Developing conscious leaders grounded in presence and clarity.',
    images: ['/hero.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Navbar />
        <GoogleAnalytics />
        <AnalyticsTracker />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
