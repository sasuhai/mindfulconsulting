'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

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
    createdAt?: string;
    updatedAt?: string;
}

export default function ProgramDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [training, setTraining] = useState<Training | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTraining();
    }, [params.id]);

    const fetchTraining = async () => {
        try {
            const docRef = doc(db, 'trainings', params.id as string);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setTraining({ id: docSnap.id, ...docSnap.data() } as Training);
            } else {
                console.error('Training not found');
            }
        } catch (error) {
            console.error('Error fetching training:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="main-wrapper" style={{ paddingTop: '120px', minHeight: '100vh' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{ height: '40px', background: 'var(--color-border)', borderRadius: '8px', marginBottom: '24px', width: '60%' }}></div>
                    <div style={{ height: '200px', background: 'var(--color-border)', borderRadius: '16px' }}></div>
                </div>
            </div>
        );
    }

    if (!training) {
        return (
            <div className="main-wrapper" style={{ paddingTop: '120px', minHeight: '100vh', textAlign: 'center' }}>
                <div className="container">
                    <h1 className="heading-1" style={{ marginBottom: '24px' }}>Training Not Found</h1>
                    <p style={{ marginBottom: '32px', color: 'var(--color-text-secondary)' }}>
                        The training program you're looking for doesn't exist.
                    </p>
                    <Link href="/" className="btn btn-primary">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="main-wrapper" style={{ paddingTop: '100px', paddingBottom: '80px', background: 'var(--color-background)' }}>
            {/* Hero Section */}
            <section style={{
                background: 'linear-gradient(135deg, var(--color-accent) 0%, #6366f1 100%)',
                padding: '80px 0',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Animated Background Pattern */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.1,
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                    animation: 'float 20s ease-in-out infinite'
                }}></div>

                <div className="container" style={{ maxWidth: '1000px', position: 'relative', zIndex: 1 }}>
                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        style={{
                            background: 'rgba(255,255,255,0.2)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            color: '#fff',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            marginBottom: '32px',
                            backdropFilter: 'blur(10px)',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    >
                        ← Back
                    </button>

                    {/* Training ID Badge */}
                    <div style={{ marginBottom: '20px' }}>
                        <span style={{
                            display: 'inline-block',
                            background: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            color: '#fff',
                            padding: '8px 16px',
                            borderRadius: '999px',
                            fontSize: '12px',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            border: '1px solid rgba(255,255,255,0.3)'
                        }}>
                            {training.trainingId}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="fade-in-up" style={{
                        fontSize: '48px',
                        fontWeight: '700',
                        color: '#fff',
                        marginBottom: '24px',
                        lineHeight: '1.2',
                        textShadow: '0 2px 20px rgba(0,0,0,0.1)'
                    }}>
                        {training.title}
                    </h1>

                    {/* Summary */}
                    <p className="fade-in-up delay-1" style={{
                        fontSize: '20px',
                        color: 'rgba(255,255,255,0.95)',
                        lineHeight: '1.6',
                        marginBottom: '32px',
                        maxWidth: '800px'
                    }}>
                        {training.summary}
                    </p>

                    {/* Meta Info Cards */}
                    <div className="fade-in-up delay-2" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <div style={{
                            background: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '12px',
                            padding: '20px 24px'
                        }}>
                            <div>
                                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '4px' }}>Duration</div>
                                <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>{training.duration}</div>
                            </div>
                        </div>

                        <div style={{
                            background: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '12px',
                            padding: '20px 24px'
                        }}>
                            <div>
                                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', marginBottom: '4px' }}>Target Audience</div>
                                <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>{training.targetAudience}</div>
                            </div>
                        </div>

                        {training.catalogUrl && (
                            <a
                                href={training.catalogUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    background: 'rgba(255,255,255,0.95)',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '20px 32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    textDecoration: 'none',
                                    color: 'var(--color-accent)',
                                    fontWeight: '600',
                                    fontSize: '16px',
                                    transition: 'all 0.3s',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                }}
                            >
                                <span>📄</span>
                                Download Catalog
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section style={{ padding: '80px 0' }}>
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
                        {/* Main Content Card */}
                        <div className="fade-in-up delay-3" style={{
                            background: '#fff',
                            borderRadius: '24px',
                            padding: '48px',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                            border: '1px solid #f0f0f0'
                        }}>
                            <h2 style={{
                                fontSize: '28px',
                                fontWeight: '700',
                                marginBottom: '32px',
                                color: '#111',
                                borderBottom: '3px solid var(--color-accent)',
                                paddingBottom: '16px',
                                display: 'inline-block'
                            }}>
                                Program Details
                            </h2>

                            {/* Rich HTML Content */}
                            <div
                                className="rich-content"
                                style={{
                                    fontSize: '16px',
                                    lineHeight: '1.8',
                                    color: '#333'
                                }}
                                dangerouslySetInnerHTML={{ __html: training.detailedDescription }}
                            />
                        </div>

                        {/* CTA Card */}
                        <div className="fade-in-up delay-4" style={{
                            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                            borderRadius: '24px',
                            padding: '48px',
                            textAlign: 'center',
                            border: '2px solid #e0e0e0'
                        }}>
                            <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: '#111' }}>
                                Ready to Transform Your Team?
                            </h3>
                            <p style={{ fontSize: '16px', color: '#666', marginBottom: '32px', lineHeight: '1.6' }}>
                                Get in touch with us to discuss how this program can benefit your organization.
                            </p>
                            <Link
                                href="/contact"
                                className="btn btn-primary"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '16px 32px',
                                    fontSize: '16px',
                                    fontWeight: '600'
                                }}
                            >
                                Contact Us <span>→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Floating Animation Keyframes */}
            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .rich-content h1, .rich-content h2, .rich-content h3 {
          margin-top: 32px;
          margin-bottom: 16px;
          font-weight: 700;
          color: #111;
        }

        .rich-content h1 { font-size: 32px; }
        .rich-content h2 { font-size: 28px; }
        .rich-content h3 { font-size: 24px; }

        .rich-content p {
          margin-bottom: 16px;
        }

        .rich-content ul, .rich-content ol {
          margin-left: 24px;
          margin-bottom: 16px;
        }

        .rich-content li {
          margin-bottom: 8px;
        }

        .rich-content strong, .rich-content b {
          font-weight: 700;
          color: #111;
        }

        .rich-content em, .rich-content i {
          font-style: italic;
        }

        .rich-content a {
          color: var(--color-accent);
          text-decoration: underline;
        }

        .rich-content a:hover {
          text-decoration: none;
        }
      `}</style>
        </div>
    );
}
