import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './dark-mode-overrides.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://mindfulconsulting-538b9.web.app'),
  title: 'Mindful Consulting | Leadership Development',
  description: 'Developing Mindful Leaders for Complex Organizations',
  keywords: ['leadership development', 'executive coaching', 'team effectiveness', 'mindful leadership', 'organizational development'],
  authors: [{ name: 'Mindful Consulting' }],
  creator: 'Mindful Consulting',
  publisher: 'Idiahus',

  // Open Graph (Facebook, LinkedIn, WhatsApp, etc.)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mindfulconsulting-538b9.web.app',
    siteName: 'Mindful Consulting',
    title: 'Mindful Consulting | Leadership Development',
    description: 'Developing Mindful Leaders for Complex Organizations',
    images: [
      {
        url: 'https://mindfulconsulting-538b9.web.app/og-image.png',
        width: 152,
        height: 136,
        alt: 'Mindful Consulting Logo',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary',
    title: 'Mindful Consulting | Leadership Development',
    description: 'Developing Mindful Leaders for Complex Organizations',
    images: ['https://mindfulconsulting-538b9.web.app/og-image.png'],
    creator: '@mindfulconsulting',
  },

  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  // Manifest
  manifest: '/site.webmanifest',

  // Theme color
  themeColor: '#7a8a6f',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
