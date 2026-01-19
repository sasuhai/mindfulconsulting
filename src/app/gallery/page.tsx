import { Metadata } from 'next';
import GalleryPageClient from './GalleryClient';

export const metadata: Metadata = {
    title: 'Photo Gallery & Memories',
    description: 'Glimpses into our transformative leadership workshops, coaching sessions, and corporate events across the globe.',
    keywords: ['leadership workshop photos', 'Mindful Consulting gallery', 'training session memories', 'Ogy Fauzihain workshops gallery'],
    openGraph: {
        title: 'Photo Gallery & Memories | Mindful Consulting',
        description: 'Capturing moments of growth and connection in our workshops.',
        images: [{ url: '/gallery-hero.jpg' }],
    },
};

export default function GalleryPage() {
    return <GalleryPageClient />;
}
