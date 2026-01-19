import { Metadata } from 'next';
import ProgramsPageClient from './ProgramsClient';

export const metadata: Metadata = {
    title: 'Training Programs & Workshops',
    description: 'Explore our transformative leadership training programs, executive coaching, and team effectiveness workshops designed for the modern leader.',
    keywords: ['leadership training workshops', 'executive coaching Malaysia', 'team building programs', 'HRDCorp claimable workshops', 'corporate leadership training'],
    openGraph: {
        title: 'Training Programs & Workshops | Mindful Consulting',
        description: 'Developing conscious, effective leadership through interactive programs.',
        images: [{ url: '/programs-hero.jpg' }],
    },
};

export default function ProgramsPage() {
    return <ProgramsPageClient />;
}
