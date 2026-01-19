import { Metadata } from 'next';
import AboutPageClient from './AboutClient';

export const metadata: Metadata = {
    title: 'Our Services & About Ogy',
    description: 'Learn about our leadership services and our founder Fauzihain (Ogy), an experienced leadership consultant and ICF-ACC certified coach with over 24 years of corporate experience.',
    keywords: ['Ogy Fauzihain', 'leadership consultant', 'ICF certified coach', 'Malaysia leadership coach', 'leadership workshops Malaysia'],
    openGraph: {
        title: 'Our Services & About Ogy | Mindful Consulting',
        description: 'Expert leadership development and coaching services led by Fauzihain (Ogy).',
        images: [{ url: '/about-hero.png' }],
    },
};

export default function AboutPage() {
    return <AboutPageClient />;
}
