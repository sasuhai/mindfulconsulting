'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface ProgramFeature {
    icon: string;
    title: string;
    description: string;
}

interface ProgramDetail {
    label: string;
    value: string;
    icon: string;
}

interface ProgramStat {
    value: string;
    label: string;
}

interface Program {
    programId: string;
    title: string;
    badge: string;
    heroDescription: string;
    heroGradient: string;
    primaryCTA: string;
    stats: ProgramStat[];
    sectionTitle: string;
    sectionDescription: string;
    featuresTitle: string;
    features: ProgramFeature[];
    detailsTitle: string;
    details: ProgramDetail[];
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonText: string;
}

export default function TeamEffectivenessPage() {
    const router = useRouter();
    const [program, setProgram] = useState<Program | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProgram();
    }, []);

    const fetchProgram = async () => {
        try {
            const docRef = doc(db, 'programs', 'team');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setProgram(docSnap.data() as Program);
            }
        } catch (error) {
            console.error('Error fetching program:', error);
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

    if (!program) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
                <div style={{ fontSize: '48px' }}>⚠️</div>
                <div style={{ fontSize: '18px', color: '#666' }}>Program data not found</div>
                <a href="/admin/programs" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>
                    Go to Admin to seed data
                </a>
            </div>
        );
    }

    const accentColor = '#5b7c8d';

    return (
        <>
            {/* Hero Section with Gradient Background */}
            <section style={{
                position: 'relative',
                background: program.heroGradient,
                padding: '120px 24px 80px',
                overflow: 'hidden',
                color: '#fff'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.1,
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '48px 48px'
                }} />

                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 30% 50%, rgba(91,124,141,0.3) 0%, transparent 50%)',
                }} />

                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                    <button
                        onClick={() => router.back()}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '12px',
                            padding: '10px 20px',
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            marginBottom: '40px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                            e.currentTarget.style.transform = 'translateX(-4px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                            e.currentTarget.style.transform = 'translateX(0)';
                        }}
                    >
                        ← Back
                    </button>

                    <div style={{ maxWidth: '900px' }}>
                        <div style={{
                            display: 'inline-block',
                            padding: '8px 20px',
                            background: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '999px',
                            fontSize: '13px',
                            fontWeight: '600',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            marginBottom: '24px'
                        }}>
                            {program.badge}
                        </div>

                        <h1 style={{
                            fontSize: 'clamp(40px, 6vw, 64px)',
                            fontWeight: '700',
                            lineHeight: '1.1',
                            marginBottom: '24px',
                            letterSpacing: '-0.02em'
                        }}>
                            {program.title}
                        </h1>

                        <p style={{
                            fontSize: '20px',
                            lineHeight: '1.6',
                            opacity: 0.95,
                            maxWidth: '700px',
                            marginBottom: '40px'
                        }}>
                            {program.heroDescription}
                        </p>

                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <a
                                href="/contact"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '16px 32px',
                                    background: '#fff',
                                    color: '#3a5a6b',
                                    borderRadius: '12px',
                                    fontWeight: '600',
                                    fontSize: '16px',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                                }}
                            >
                                {program.primaryCTA} →
                            </a>
                            <a
                                href="/programs"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '16px 32px',
                                    background: 'rgba(255,255,255,0.15)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    color: '#fff',
                                    borderRadius: '12px',
                                    fontWeight: '600',
                                    fontSize: '16px',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                                }}
                            >
                                View All Programs
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Stats Section */}
            <section style={{
                padding: '80px 24px',
                background: '#fafafa'
            }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '32px',
                        textAlign: 'center'
                    }}>
                        {program.stats.map((stat, idx) => (
                            <div key={idx}>
                                <div style={{ fontSize: '48px', fontWeight: '700', color: accentColor, marginBottom: '8px' }}>{stat.value}</div>
                                <div style={{ fontSize: '14px', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section style={{ padding: '100px 24px', background: '#fff' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto 80px' }}>
                        <h2 style={{
                            fontSize: 'clamp(32px, 4vw, 48px)',
                            fontWeight: '700',
                            marginBottom: '24px',
                            color: '#1a1a1a',
                            textAlign: 'center'
                        }}>
                            {program.sectionTitle}
                        </h2>
                        <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#666', textAlign: 'center' }}>
                            {program.sectionDescription}
                        </p>
                    </div>

                    <h3 style={{
                        fontSize: '32px',
                        fontWeight: '700',
                        marginBottom: '40px',
                        color: '#1a1a1a'
                    }}>
                        {program.featuresTitle}
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '24px',
                        marginBottom: '80px'
                    }}>
                        {program.features.map((item, idx) => (
                            <div key={idx} style={{
                                padding: '32px',
                                background: '#fff',
                                border: '1px solid #e5e5e5',
                                borderRadius: '16px',
                                transition: 'all 0.3s ease',
                                cursor: 'default'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                                    e.currentTarget.style.borderColor = accentColor;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.borderColor = '#e5e5e5';
                                }}>
                                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{item.icon}</div>
                                <h4 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>
                                    {item.title}
                                </h4>
                                <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#666' }}>
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <h3 style={{
                        fontSize: '32px',
                        fontWeight: '700',
                        marginBottom: '40px',
                        color: '#1a1a1a'
                    }}>
                        {program.detailsTitle}
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '24px',
                        marginBottom: '60px'
                    }}>
                        {program.details.map((item, idx) => (
                            <div key={idx} style={{
                                padding: '40px',
                                background: 'linear-gradient(135deg, #f6f8f9 0%, #ffffff 100%)',
                                border: '1px solid #e5e5e5',
                                borderRadius: '20px',
                                textAlign: 'center',
                                transition: 'all 0.3s ease'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = `linear-gradient(135deg, ${accentColor} 0%, #4a6b7c 100%)`;
                                    e.currentTarget.style.color = '#fff';
                                    const label = e.currentTarget.querySelector('.detail-label') as HTMLElement;
                                    const value = e.currentTarget.querySelector('.detail-value') as HTMLElement;
                                    if (label) label.style.color = 'rgba(255,255,255,0.9)';
                                    if (value) value.style.color = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #f6f8f9 0%, #ffffff 100%)';
                                    e.currentTarget.style.color = 'inherit';
                                    const label = e.currentTarget.querySelector('.detail-label') as HTMLElement;
                                    const value = e.currentTarget.querySelector('.detail-value') as HTMLElement;
                                    if (label) label.style.color = '#999';
                                    if (value) value.style.color = '#1a1a1a';
                                }}>
                                <div style={{ fontSize: '48px', marginBottom: '16px' }}>{item.icon}</div>
                                <div className="detail-label" style={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    color: '#999',
                                    marginBottom: '8px',
                                    transition: 'color 0.3s ease'
                                }}>
                                    {item.label}
                                </div>
                                <div className="detail-value" style={{
                                    fontSize: '20px',
                                    fontWeight: '600',
                                    color: '#1a1a1a',
                                    transition: 'color 0.3s ease'
                                }}>
                                    {item.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: '100px 24px',
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                color: '#fff',
                textAlign: 'center'
            }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: 'clamp(32px, 4vw, 48px)',
                        fontWeight: '700',
                        marginBottom: '24px',
                        lineHeight: '1.2',
                        color: '#fff'
                    }}>
                        {program.ctaTitle}
                    </h2>
                    <p style={{
                        fontSize: '18px',
                        lineHeight: '1.6',
                        opacity: 0.9,
                        marginBottom: '40px'
                    }}>
                        {program.ctaDescription}
                    </p>
                    <a
                        href="/contact"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '18px 40px',
                            background: accentColor,
                            color: '#fff',
                            borderRadius: '12px',
                            fontWeight: '600',
                            fontSize: '18px',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            boxShadow: `0 8px 30px rgba(91,124,141,0.3)`
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = `0 12px 40px rgba(91,124,141,0.4)`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = `0 8px 30px rgba(91,124,141,0.3)`;
                        }}
                    >
                        {program.ctaButtonText} →
                    </a>
                </div>
            </section>
        </>
    );
}
