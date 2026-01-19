import { Metadata } from 'next';
import PrivacyPageClient from './PrivacyClient';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Our commitment to protecting your personal data and ensuring transparency in how we handle your information at Mindful Consulting.',
    keywords: ['privacy policy', 'data protection', 'Mindful Consulting legal'],
};

export default function PrivacyPage() {
    return <PrivacyPageClient />;
}
