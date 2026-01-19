import { Metadata } from 'next';
import CalendarPageClient from './CalendarClient';

export const metadata: Metadata = {
    title: 'Training Calendar & Events',
    description: 'Stay updated with our upcoming leadership workshops, public programs, and training sessions in Malaysia and beyond.',
    keywords: ['leadership workshop calendar', 'training schedule Malaysia', 'upcoming leadership events', 'Ogy Fauzihain training schedule'],
    openGraph: {
        title: 'Training Calendar & Events | Mindful Consulting',
        description: 'Upcoming workshops and events for conscious leaders.',
        images: [{ url: '/calendar-hero.png' }],
    },
};

export default function CalendarPage() {
    return <CalendarPageClient />;
}
