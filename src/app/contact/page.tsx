import { Metadata } from 'next';
import ContactPageClient from './ContactClient';

export const metadata: Metadata = {
    title: 'Contact Us | Start Your Leadership Journey',
    description: 'Ready to transform your leadership? Get in touch with Mindful Consulting for inquiries about our programs, coaching, and workshops.',
    keywords: ['contact leadership consultant', 'hire leadership coach Malaysia', 'leadership workshop inquiry', 'Mindful Consulting contact'],
    openGraph: {
        title: 'Contact Us | Mindful Consulting',
        description: 'Start a conversation with us about your leadership development needs.',
        images: [{ url: '/contact-hero.jpg' }],
    },
};

export default function ContactPage() {
    return <ContactPageClient />;
}
