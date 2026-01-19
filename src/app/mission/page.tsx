import { Metadata } from 'next';
import MissionPageClient from './MissionClient';

export const metadata: Metadata = {
    title: 'Our Mission & Core Values',
    description: 'To support leaders in their journey of self-discovery, enabling them to lead with purpose, open pathways for others, and awaken the power already within. Our core values: Inspire, Serve, and Grow.',
    keywords: ['leadership mission', 'core values', 'conscious leadership', 'Malaysia leadership programs', 'inspire serve grow'],
    openGraph: {
        title: 'Our Mission & Core Values | Mindful Consulting',
        description: 'Empowering leaders to lead with purpose and clarity.',
        images: [{ url: '/mission-hero.png' }],
    },
};

export default function MissionPage() {
    return <MissionPageClient />;
}
