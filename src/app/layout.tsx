import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './dark-mode-overrides.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mindful Consulting | Leadership Development',
  description: 'Developing Mindful Leaders for Complex Organizations',
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
