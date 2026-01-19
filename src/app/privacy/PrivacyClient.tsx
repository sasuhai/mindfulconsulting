'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface PrivacySection {
    title: string;
    content: string;
    items?: string[];
}

interface PrivacyData {
    lastUpdated: string;
    introduction: string;
    sections: PrivacySection[];
    contactEmail: string;
    contactPhone: string;
}

export default function PrivacyPolicyPage() {
    const [privacyData, setPrivacyData] = useState<PrivacyData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPrivacyData();
    }, []);

    const fetchPrivacyData = async () => {
        try {
            const docRef = doc(db, 'pages', 'privacy');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setPrivacyData(docSnap.data() as PrivacyData);
            }
        } catch (error) {
            console.error('Error fetching privacy data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '18px', color: '#666' }}>Loading...</div>
            </div>
        );
    }

    if (!privacyData) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
                <div style={{ fontSize: '48px' }}>⚠️</div>
                <div style={{ fontSize: '18px', color: '#666' }}>Privacy policy data not found</div>
                <a href="/admin" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>
                    Go to Admin to seed data
                </a>
            </div>
        );
    }

    const accentColor = '#7a8a6f';

    return (
        <div className="main-wrapper">
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                padding: '120px 24px 80px',
                background: `linear-gradient(135deg, ${accentColor} 0%, #5a6a4f 100%)`,
                color: '#fff',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.1,
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '48px 48px'
                }} />

                <div className="container" style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10, textAlign: 'center' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '8px 24px',
                        background: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.3)',
                        borderRadius: '999px',
                        fontSize: '13px',
                        fontWeight: '600',
                        letterSpacing: '2px',
                        textTransform: 'uppercase',
                        marginBottom: '24px'
                    }}>
                        Legal
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(36px, 5vw, 56px)',
                        fontWeight: '300',
                        lineHeight: '1.2',
                        marginBottom: '24px',
                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                        Privacy Policy
                    </h1>

                    <p style={{
                        fontSize: '18px',
                        lineHeight: '1.6',
                        opacity: 0.95,
                        maxWidth: '700px',
                        margin: '0 auto'
                    }}>
                        {privacyData.introduction}
                    </p>

                    <p style={{
                        fontSize: '14px',
                        opacity: 0.8,
                        marginTop: '32px'
                    }}>
                        Last updated: {privacyData.lastUpdated}
                    </p>
                </div>
            </section>

            {/* Content Sections */}
            <section style={{ padding: '80px 24px', background: '#fff' }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    {privacyData.sections.map((section, idx) => (
                        <div
                            key={idx}
                            style={{
                                marginBottom: '64px',
                                animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`
                            }}
                        >
                            <h2 style={{
                                fontSize: '28px',
                                fontWeight: '600',
                                marginBottom: '20px',
                                color: accentColor,
                                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                                paddingBottom: '12px',
                                borderBottom: `2px solid ${accentColor}20`
                            }}>
                                {section.title}
                            </h2>

                            <p style={{
                                fontSize: '16px',
                                lineHeight: '1.8',
                                color: '#444',
                                marginBottom: section.items ? '20px' : 0
                            }}>
                                {section.content}
                            </p>

                            {section.items && section.items.length > 0 && (
                                <ul style={{
                                    paddingLeft: '24px',
                                    fontSize: '16px',
                                    lineHeight: '1.8',
                                    color: '#444'
                                }}>
                                    {section.items.map((item, itemIdx) => (
                                        <li key={itemIdx} style={{
                                            marginBottom: '12px',
                                            position: 'relative',
                                            paddingLeft: '8px'
                                        }}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}

                    {/* Contact Section */}
                    <div style={{
                        marginTop: '80px',
                        padding: '40px',
                        background: `${accentColor}10`,
                        borderRadius: '16px',
                        border: `2px solid ${accentColor}30`
                    }}>
                        <h2 style={{
                            fontSize: '24px',
                            fontWeight: '600',
                            marginBottom: '16px',
                            color: accentColor,
                            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
                        }}>
                            Questions About This Policy?
                        </h2>
                        <p style={{
                            fontSize: '16px',
                            lineHeight: '1.8',
                            color: '#444',
                            marginBottom: '20px'
                        }}>
                            If you have any questions about this privacy policy, please contact us:
                        </p>
                        <div style={{ fontSize: '16px', lineHeight: '1.8' }}>
                            <p style={{ marginBottom: '8px' }}>
                                <strong>Email:</strong>{' '}
                                <a href={`mailto:${privacyData.contactEmail}`} style={{ color: accentColor, textDecoration: 'none', fontWeight: '600' }}>
                                    {privacyData.contactEmail}
                                </a>
                            </p>
                            <p>
                                <strong>Phone:</strong>{' '}
                                <a href={`tel:${privacyData.contactPhone.replace(/\s/g, '')}`} style={{ color: accentColor, textDecoration: 'none', fontWeight: '600' }}>
                                    {privacyData.contactPhone}
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
