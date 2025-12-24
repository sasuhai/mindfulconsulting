'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

interface Training {
    id?: string;
    trainingId: string;
    title: string;
    shortDescription: string;
    summary: string;
    duration: string;
    targetAudience: string;
}

export default function TrainingsGrid() {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'trainings'));
            const trainingsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Training[];
            setTrainings(trainingsData);
        } catch (error) {
            console.error('Error fetching trainings:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                {[1, 2, 3].map((i) => (
                    <div key={i} className="service-card" style={{ minHeight: '200px', background: 'var(--color-surface)', borderRadius: '16px', padding: '32px' }}>
                        <div style={{ height: '20px', background: 'var(--color-border)', borderRadius: '4px', marginBottom: '16px', width: '60%' }}></div>
                        <div style={{ height: '60px', background: 'var(--color-border)', borderRadius: '4px' }}></div>
                    </div>
                ))}
            </div>
        );
    }

    if (trainings.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
                    No training programs available at the moment.
                </p>
            </div>
        );
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {trainings.map((training) => (
                <div
                    key={training.id}
                    className="service-card"
                    style={{
                        background: '#fff',
                        padding: '40px',
                        borderRadius: '18px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        border: '1px solid #f0f0f0',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                    }}
                >
                    <div style={{ marginBottom: '12px' }}>
                        <span style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            color: 'var(--color-accent)'
                        }}>
                            {training.trainingId}
                        </span>
                    </div>
                    <h3 className="heading-3" style={{ marginBottom: '16px', fontSize: '22px' }}>
                        {training.title}
                    </h3>
                    <p className="body-text" style={{ marginBottom: '20px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                        {training.shortDescription}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                        <div>
                            <span>{training.duration}</span>
                        </div>
                        <div>
                            <span>{training.targetAudience}</span>
                        </div>
                    </div>
                    <Link
                        href={`/programs?id=${training.id}`}
                        className="btn-text"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: 'var(--color-accent)',
                            textDecoration: 'none',
                            transition: 'gap 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.gap = '12px'}
                        onMouseLeave={(e) => e.currentTarget.style.gap = '8px'}
                    >
                        Learn More <span>→</span>
                    </Link>
                </div>
            ))}
        </div>
    );
}
