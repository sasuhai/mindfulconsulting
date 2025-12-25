'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import TrainingsGrid from '@/components/TrainingsGrid';

interface Training {
    id?: string;
    trainingId: string;
    title: string;
    shortDescription: string;
    summary: string;
    detailedDescription: string;
    duration: string;
    targetAudience: string;
    catalogUrl?: string;
}

function ProgramsContent() {
    const searchParams = useSearchParams();
    const trainingId = searchParams.get('id');
    const [training, setTraining] = useState<Training | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (trainingId) {
            fetchTraining(trainingId);
        }
    }, [trainingId]);

    const fetchTraining = async (id: string) => {
        try {
            setLoading(true);
            const trainingsRef = collection(db, 'trainings');
            const querySnapshot = await getDocs(trainingsRef);

            const foundTraining = querySnapshot.docs.find(doc => doc.id === id);

            if (foundTraining) {
                setTraining({
                    id: foundTraining.id,
                    ...foundTraining.data()
                } as Training);
            }
        } catch (error) {
            console.error('Error fetching training:', error);
        } finally {
            setLoading(false);
        }
    };

    // Show detail view if training ID is in URL
    if (trainingId && training) {
        return (
            <div style={{ minHeight: '100vh', background: '#09090b', color: '#fafafa', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                {/* Hero Section */}
                <section style={{
                    position: 'relative',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                    padding: '120px 24px 80px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0.1,
                        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }} />

                    <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                        <Link
                            href="/programs"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                color: '#a1a1aa',
                                textDecoration: 'none',
                                marginBottom: '32px',
                                fontSize: '14px',
                                transition: 'color 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#a1a1aa'}
                        >
                            ← Back to Programs
                        </Link>

                        <div style={{
                            display: 'inline-block',
                            padding: '6px 16px',
                            background: 'rgba(var(--color-accent-rgb), 0.1)',
                            border: '1px solid rgba(var(--color-accent-rgb), 0.3)',
                            borderRadius: '999px',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: 'var(--color-accent)',
                            marginBottom: '24px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            {training.trainingId}
                        </div>

                        <h1 style={{
                            fontSize: 'clamp(32px, 5vw, 56px)',
                            fontWeight: '700',
                            lineHeight: '1.2',
                            marginBottom: '24px',
                            background: 'linear-gradient(135deg, #fff 0%, #a1a1aa 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            {training.title}
                        </h1>

                        <p style={{
                            fontSize: '20px',
                            color: '#d4d4d8',
                            maxWidth: '800px',
                            lineHeight: '1.6',
                            marginBottom: '40px'
                        }}>
                            {training.summary}
                        </p>

                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <div style={{
                                background: 'rgba(39,39,42,0.5)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(63,63,70,0.5)',
                                borderRadius: '12px',
                                padding: '16px 24px'
                            }}>
                                <div style={{ fontSize: '12px', color: '#a1a1aa', marginBottom: '4px' }}>Duration</div>
                                <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>{training.duration}</div>
                            </div>

                            <div style={{
                                background: 'rgba(39,39,42,0.5)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(63,63,70,0.5)',
                                borderRadius: '12px',
                                padding: '16px 24px'
                            }}>
                                <div style={{ fontSize: '12px', color: '#a1a1aa', marginBottom: '4px' }}>Target Audience</div>
                                <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>{training.targetAudience}</div>
                            </div>

                            {training.catalogUrl && (
                                <a
                                    href={training.catalogUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        background: 'var(--color-accent)',
                                        border: 'none',
                                        borderRadius: '12px',
                                        padding: '16px 24px',
                                        color: '#fff',
                                        fontWeight: '600',
                                        fontSize: '14px',
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}
                                >
                                    Download Catalog →
                                </a>
                            )}
                        </div>
                    </div>
                </section>

                <section style={{ padding: '80px 24px', background: '#09090b' }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <div
                            style={{ color: '#d4d4d8', lineHeight: '1.8', fontSize: '16px' }}
                            dangerouslySetInnerHTML={{ __html: training.detailedDescription }}
                            className="training-content"
                        />
                    </div>
                </section>

                <section style={{
                    padding: '80px 24px',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
                    borderTop: '1px solid rgba(39,39,42,0.5)'
                }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '16px', color: '#fff' }}>
                            Ready to Transform Your Leadership?
                        </h2>
                        <p style={{ fontSize: '18px', color: '#a1a1aa', marginBottom: '32px' }}>
                            Get in touch with us to learn more about this program.
                        </p>
                        <Link href="/contact" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: 'var(--color-accent)',
                            color: '#fff',
                            fontWeight: '500',
                            padding: '16px 32px',
                            borderRadius: '999px',
                            textDecoration: 'none',
                            fontSize: '16px'
                        }}>
                            Contact Us →
                        </Link>
                    </div>
                </section>

                <style jsx global>{`
                    .training-content h1 { font-size: 32px; font-weight: 600; color: #fff !important; margin: 32px 0 16px; }
                    .training-content h2 { font-size: 28px; font-weight: 600; color: #fff !important; margin: 28px 0 14px; }
                    .training-content h3 { font-size: 24px; font-weight: 600; color: #fff !important; margin: 24px 0 12px; }
                    .training-content p { margin: 16px 0; color: #d4d4d8 !important; }
                    .training-content ul, .training-content ol { margin: 16px 0; padding-left: 24px; }
                    .training-content li { margin: 8px 0; color: #d4d4d8 !important; }
                    .training-content strong { color: #fff !important; font-weight: 600; }
                    .training-content a { color: var(--color-accent) !important; text-decoration: underline; }
                    .training-content * { color: #d4d4d8 !important; }
                    .training-content h1, .training-content h2, .training-content h3, .training-content h4, .training-content h5, .training-content h6 { color: #fff !important; }
                `}</style>
            </div>
        );
    }

    // Show loading state
    if (trainingId && loading) {
        return (
            <div className="main-wrapper">
                <section className="section bg-surface text-center">
                    <div className="container">
                        <div style={{ padding: '60px 0' }}>Loading...</div>
                    </div>
                </section>
            </div>
        );
    }

    // Show programs list
    return (
        <div className="main-wrapper">
            <section className="section bg-surface text-center">
                <div className="container">
                    <h1 className="heading-1 mb-4">Our Training Programs</h1>
                    <p className="body-large" style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '48px' }}>
                        Transformative learning experiences designed for the modern leader.
                    </p>

                    {/* Program Navigation Buttons */}
                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        maxWidth: '900px',
                        margin: '0 auto'
                    }}>
                        <Link
                            href="/programs/leadership"
                            style={{
                                flex: '1',
                                minWidth: '250px',
                                padding: '24px 32px',
                                background: 'linear-gradient(135deg, var(--color-accent) 0%, #6b8e6f 100%)',
                                color: '#fff',
                                textDecoration: 'none',
                                borderRadius: '12px',
                                fontWeight: '600',
                                fontSize: '16px',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                            }}
                        >
                            <span style={{ fontSize: '24px' }}>🎯</span>
                            Leadership Development
                        </Link>

                        <Link
                            href="/programs/executive"
                            style={{
                                flex: '1',
                                minWidth: '250px',
                                padding: '24px 32px',
                                background: 'linear-gradient(135deg, #8b7355 0%, #6b5d4f 100%)',
                                color: '#fff',
                                textDecoration: 'none',
                                borderRadius: '12px',
                                fontWeight: '600',
                                fontSize: '16px',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                            }}
                        >
                            <span style={{ fontSize: '24px' }}>👔</span>
                            Executive Coaching
                        </Link>

                        <Link
                            href="/programs/team"
                            style={{
                                flex: '1',
                                minWidth: '250px',
                                padding: '24px 32px',
                                background: 'linear-gradient(135deg, #5b7c8d 0%, #4a6b7c 100%)',
                                color: '#fff',
                                textDecoration: 'none',
                                borderRadius: '12px',
                                fontWeight: '600',
                                fontSize: '16px',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                            }}
                        >
                            <span style={{ fontSize: '24px' }}>🤝</span>
                            Team Effectiveness
                        </Link>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <TrainingsGrid />
                </div>
            </section>
        </div>
    );
}

export default function ProgramsPage() {
    return (
        <Suspense fallback={
            <div className="main-wrapper">
                <section className="section bg-surface text-center">
                    <div className="container">
                        <div style={{ padding: '60px 0' }}>Loading...</div>
                    </div>
                </section>
            </div>
        }>
            <ProgramsContent />
        </Suspense>
    );
}
