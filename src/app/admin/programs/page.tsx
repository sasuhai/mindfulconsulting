'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';

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
    id?: string;
    programId: 'leadership' | 'executive' | 'team';
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

const INITIAL_PROGRAMS: Program[] = [
    {
        programId: 'leadership',
        title: 'Leadership Development',
        badge: '🎯 Professional Development',
        heroDescription: 'Cultivate mindful leadership that inspires teams and drives sustainable organizational growth through proven methodologies and transformative practices.',
        heroGradient: 'linear-gradient(135deg, #7a8a6f 0%, #5a6a4f 50%, #4a5a3f 100%)',
        primaryCTA: 'Get Started',
        stats: [
            { value: '3-6', label: 'Months Duration' },
            { value: '8-12', label: 'Participants' },
            { value: '100%', label: 'Customizable' },
            { value: '24/7', label: 'Support Access' }
        ],
        sectionTitle: 'Transform Your Leadership Journey',
        sectionDescription: 'Our comprehensive leadership development program is designed to help leaders at all levels develop the mindfulness, emotional intelligence, and strategic thinking skills needed to navigate today\'s complex business environment.',
        featuresTitle: 'What You\'ll Learn',
        features: [
            { icon: '🧠', title: 'Self-Awareness & Emotional Intelligence', description: 'Develop deep understanding of your leadership style and emotional patterns' },
            { icon: '✨', title: 'Authentic Leadership Presence', description: 'Build genuine influence and inspire trust through authentic communication' },
            { icon: '💬', title: 'Mindful Communication', description: 'Master techniques for clear, compassionate, and effective dialogue' },
            { icon: '🚀', title: 'High-Performing Teams', description: 'Create engaged, motivated teams that consistently deliver results' },
            { icon: '🌊', title: 'Change & Resilience', description: 'Navigate uncertainty with clarity, confidence, and adaptive thinking' },
            { icon: '🎯', title: 'Strategic Vision', description: 'Align team efforts with organizational goals and long-term success' }
        ],
        detailsTitle: 'Program Details',
        details: [
            { label: 'Duration', value: '3-6 months', icon: '⏱️' },
            { label: 'Format', value: 'In-person & Virtual', icon: '🌐' },
            { label: 'Group Size', value: '8-12 participants', icon: '👥' }
        ],
        ctaTitle: 'Ready to Transform Your Leadership?',
        ctaDescription: 'Join hundreds of leaders who have transformed their approach to leadership through our mindful, evidence-based programs.',
        ctaButtonText: 'Start Your Journey Today'
    },
    {
        programId: 'executive',
        title: 'Executive Coaching',
        badge: '👔 Executive Excellence',
        heroDescription: 'One-on-one coaching for senior leaders seeking to enhance their impact and navigate complex challenges with clarity and confidence.',
        heroGradient: 'linear-gradient(135deg, #8b7355 0%, #6b5d4f 50%, #5b4d3f 100%)',
        primaryCTA: 'Schedule a Consultation',
        stats: [
            { value: '6-12', label: 'Months Duration' },
            { value: '1-on-1', label: 'Personalized' },
            { value: '100%', label: 'Confidential' },
            { value: '24/7', label: 'Support Access' }
        ],
        sectionTitle: 'Elevate Your Executive Presence',
        sectionDescription: 'Our executive coaching program provides personalized support for C-suite executives and senior leaders. Through a mindful, evidence-based approach, we help you unlock your full potential and lead with greater presence and purpose.',
        featuresTitle: 'Coaching Focus Areas',
        features: [
            { icon: '🎯', title: 'Strategic Thinking & Decision-Making', description: 'Develop clarity and confidence in complex strategic decisions' },
            { icon: '👑', title: 'Executive Presence & Influence', description: 'Build authentic authority and inspire trust at the highest levels' },
            { icon: '🧘', title: 'Stress Management & Resilience', description: 'Master techniques to maintain peak performance under pressure' },
            { icon: '⚖️', title: 'Work-Life Integration', description: 'Create sustainable success across all areas of your life' },
            { icon: '🌟', title: 'Organizational Culture Transformation', description: 'Lead cultural change with vision and authenticity' },
            { icon: '🔄', title: 'Succession Planning & Transitions', description: 'Navigate leadership transitions with grace and effectiveness' }
        ],
        detailsTitle: 'Coaching Details',
        details: [
            { label: 'Duration', value: '6-12 months', icon: '⏱️' },
            { label: 'Format', value: '1-on-1 Sessions', icon: '🤝' },
            { label: 'Frequency', value: 'Bi-weekly or Monthly', icon: '📅' }
        ],
        ctaTitle: 'Ready to Elevate Your Leadership?',
        ctaDescription: 'Experience personalized coaching that transforms your leadership approach and amplifies your impact.',
        ctaButtonText: 'Book Your Consultation'
    },
    {
        programId: 'team',
        title: 'Team Effectiveness',
        badge: '🤝 Team Transformation',
        heroDescription: 'Transform your team\'s collaboration, communication, and performance through mindful practices and proven methodologies.',
        heroGradient: 'linear-gradient(135deg, #5b7c8d 0%, #4a6b7c 50%, #3a5a6b 100%)',
        primaryCTA: 'Transform Your Team',
        stats: [
            { value: '2-4', label: 'Months Duration' },
            { value: '5-15', label: 'Team Members' },
            { value: '100%', label: 'Engagement' },
            { value: '∞', label: 'Impact' }
        ],
        sectionTitle: 'Build High-Performing Teams',
        sectionDescription: 'Our team effectiveness program helps teams build trust, improve communication, and achieve breakthrough results. Through experiential learning and mindfulness practices, teams develop the skills and awareness needed to perform at their best.',
        featuresTitle: 'Key Outcomes',
        features: [
            { icon: '🛡️', title: 'Psychological Safety & Trust', description: 'Create an environment where team members feel safe to take risks and be vulnerable' },
            { icon: '💬', title: 'Communication & Active Listening', description: 'Master the art of clear, empathetic communication and deep listening' },
            { icon: '⚡', title: 'Constructive Conflict Resolution', description: 'Transform disagreements into opportunities for growth and innovation' },
            { icon: '🎯', title: 'Aligned Vision & Purpose', description: 'Unite your team around a shared vision and compelling purpose' },
            { icon: '✅', title: 'Accountability & Commitment', description: 'Foster a culture of ownership and mutual accountability' },
            { icon: '🚀', title: 'Sustainable High Performance', description: 'Achieve consistent excellence without burnout or turnover' }
        ],
        detailsTitle: 'Program Details',
        details: [
            { label: 'Duration', value: '2-4 months', icon: '⏱️' },
            { label: 'Format', value: 'Workshops & Coaching', icon: '🎓' },
            { label: 'Team Size', value: '5-15 members', icon: '👥' }
        ],
        ctaTitle: 'Ready to Transform Your Team?',
        ctaDescription: 'Unlock your team\'s full potential and create a culture of excellence, collaboration, and sustainable high performance.',
        ctaButtonText: 'Start Your Team\'s Journey'
    }
];

export default function AdminPrograms() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'programs'));
            const programsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Program[];
            setPrograms(programsData);
        } catch (error) {
            console.error('Error fetching programs:', error);
        }
    };

    const seedInitialData = async () => {
        if (!confirm('This will create/update the three program pages with initial data. Continue?')) return;

        setLoading(true);
        try {
            for (const program of INITIAL_PROGRAMS) {
                await setDoc(doc(db, 'programs', program.programId), program);
            }
            alert('✅ Initial data seeded successfully!');
            fetchPrograms();
        } catch (error) {
            console.error('Error seeding data:', error);
            alert('Failed to seed data: ' + (error as any).message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (program: Program) => {
        setSelectedProgram(program);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProgram) return;

        setLoading(true);
        try {
            await setDoc(doc(db, 'programs', selectedProgram.programId), selectedProgram);
            alert('✅ Program updated successfully!');
            setShowForm(false);
            setSelectedProgram(null);
            fetchPrograms();
        } catch (error) {
            console.error('Error saving program:', error);
            alert('Failed to save: ' + (error as any).message);
        } finally {
            setLoading(false);
        }
    };

    const updateFeature = (index: number, field: keyof ProgramFeature, value: string) => {
        if (!selectedProgram) return;
        const newFeatures = [...selectedProgram.features];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        setSelectedProgram({ ...selectedProgram, features: newFeatures });
    };

    const updateDetail = (index: number, field: keyof ProgramDetail, value: string) => {
        if (!selectedProgram) return;
        const newDetails = [...selectedProgram.details];
        newDetails[index] = { ...newDetails[index], [field]: value };
        setSelectedProgram({ ...selectedProgram, details: newDetails });
    };

    const updateStat = (index: number, field: keyof ProgramStat, value: string) => {
        if (!selectedProgram) return;
        const newStats = [...selectedProgram.stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setSelectedProgram({ ...selectedProgram, stats: newStats });
    };

    return (
        <div className="main-wrapper" style={{ paddingTop: '100px', paddingBottom: '60px', minHeight: '100vh', background: 'var(--color-background)' }}>
            <div className="container" style={{ maxWidth: '1400px' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div>
                        <h1 className="heading-1" style={{ fontSize: '32px', marginBottom: '4px' }}>
                            Program Pages
                        </h1>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                            Manage Leadership, Executive, and Team program pages
                        </p>
                    </div>
                    <button
                        onClick={seedInitialData}
                        disabled={loading}
                        style={{
                            padding: '12px 24px',
                            fontSize: '14px',
                            fontWeight: '600',
                            borderRadius: '8px',
                            border: '1px solid var(--color-accent)',
                            background: 'var(--color-accent)',
                            color: '#fff',
                            cursor: 'pointer'
                        }}
                    >
                        {loading ? 'Seeding...' : '🌱 Seed Initial Data'}
                    </button>
                </div>

                {/* Program Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                    {programs.map((program) => (
                        <div
                            key={program.programId}
                            style={{
                                background: 'var(--color-surface)',
                                borderRadius: '12px',
                                padding: '24px',
                                border: '1px solid var(--color-border)',
                            }}
                        >
                            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', fontWeight: '600' }}>
                                {program.programId}
                            </div>
                            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
                                {program.title}
                            </h3>
                            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '16px', lineHeight: '1.5' }}>
                                {program.heroDescription.substring(0, 100)}...
                            </p>
                            <button
                                onClick={() => handleEdit(program)}
                                className="btn btn-primary"
                                style={{ width: '100%', padding: '10px' }}
                            >
                                Edit Program
                            </button>
                        </div>
                    ))}
                </div>

                {programs.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: '80px 20px',
                        background: 'var(--color-surface)',
                        borderRadius: '12px',
                        border: '2px dashed var(--color-border)',
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
                        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>No programs yet</h3>
                        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
                            Click "Seed Initial Data" to create the three program pages
                        </p>
                    </div>
                )}

                {/* Edit Form Modal */}
                {showForm && selectedProgram && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px',
                        backdropFilter: 'blur(4px)',
                    }}>
                        <div style={{
                            background: 'var(--color-background)',
                            borderRadius: '16px',
                            maxWidth: '1200px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflow: 'auto',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                        }}>
                            <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--color-border)', position: 'sticky', top: 0, background: 'var(--color-background)', zIndex: 10 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h2 style={{ fontSize: '20px', fontWeight: '600' }}>
                                        Edit {selectedProgram.title}
                                    </h2>
                                    <button
                                        onClick={() => { setShowForm(false); setSelectedProgram(null); }}
                                        style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSave} style={{ padding: '32px' }}>
                                {/* Hero Section */}
                                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', borderBottom: '2px solid var(--color-accent)', paddingBottom: '8px' }}>
                                    Hero Section
                                </h3>
                                <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Title</label>
                                        <input
                                            value={selectedProgram.title}
                                            onChange={(e) => setSelectedProgram({ ...selectedProgram, title: e.target.value })}
                                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Badge Text</label>
                                        <input
                                            value={selectedProgram.badge}
                                            onChange={(e) => setSelectedProgram({ ...selectedProgram, badge: e.target.value })}
                                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Hero Description</label>
                                        <textarea
                                            value={selectedProgram.heroDescription}
                                            onChange={(e) => setSelectedProgram({ ...selectedProgram, heroDescription: e.target.value })}
                                            rows={3}
                                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', fontFamily: 'inherit' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Primary CTA Button Text</label>
                                        <input
                                            value={selectedProgram.primaryCTA}
                                            onChange={(e) => setSelectedProgram({ ...selectedProgram, primaryCTA: e.target.value })}
                                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                        />
                                    </div>
                                </div>

                                {/* Stats Section */}
                                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', borderBottom: '2px solid var(--color-accent)', paddingBottom: '8px' }}>
                                    Stats (4 items)
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
                                    {selectedProgram.stats.map((stat, idx) => (
                                        <div key={idx} style={{ padding: '16px', background: 'var(--color-surface)', borderRadius: '8px' }}>
                                            <div style={{ marginBottom: '8px' }}>
                                                <label style={{ fontSize: '12px', fontWeight: '600' }}>Value</label>
                                                <input
                                                    value={stat.value}
                                                    onChange={(e) => updateStat(idx, 'value', e.target.value)}
                                                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '12px', fontWeight: '600' }}>Label</label>
                                                <input
                                                    value={stat.label}
                                                    onChange={(e) => updateStat(idx, 'label', e.target.value)}
                                                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Main Section */}
                                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', borderBottom: '2px solid var(--color-accent)', paddingBottom: '8px' }}>
                                    Main Content Section
                                </h3>
                                <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Section Title</label>
                                        <input
                                            value={selectedProgram.sectionTitle}
                                            onChange={(e) => setSelectedProgram({ ...selectedProgram, sectionTitle: e.target.value })}
                                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Section Description</label>
                                        <textarea
                                            value={selectedProgram.sectionDescription}
                                            onChange={(e) => setSelectedProgram({ ...selectedProgram, sectionDescription: e.target.value })}
                                            rows={3}
                                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', fontFamily: 'inherit' }}
                                        />
                                    </div>
                                </div>

                                {/* Features */}
                                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', borderBottom: '2px solid var(--color-accent)', paddingBottom: '8px' }}>
                                    {selectedProgram.featuresTitle} (6 items)
                                </h3>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Features Section Title</label>
                                    <input
                                        value={selectedProgram.featuresTitle}
                                        onChange={(e) => setSelectedProgram({ ...selectedProgram, featuresTitle: e.target.value })}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
                                    {selectedProgram.features.map((feature, idx) => (
                                        <div key={idx} style={{ padding: '16px', background: 'var(--color-surface)', borderRadius: '8px' }}>
                                            <div style={{ marginBottom: '8px' }}>
                                                <label style={{ fontSize: '12px', fontWeight: '600' }}>Icon (emoji)</label>
                                                <input
                                                    value={feature.icon}
                                                    onChange={(e) => updateFeature(idx, 'icon', e.target.value)}
                                                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                                                />
                                            </div>
                                            <div style={{ marginBottom: '8px' }}>
                                                <label style={{ fontSize: '12px', fontWeight: '600' }}>Title</label>
                                                <input
                                                    value={feature.title}
                                                    onChange={(e) => updateFeature(idx, 'title', e.target.value)}
                                                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '12px', fontWeight: '600' }}>Description</label>
                                                <textarea
                                                    value={feature.description}
                                                    onChange={(e) => updateFeature(idx, 'description', e.target.value)}
                                                    rows={2}
                                                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--color-border)', fontFamily: 'inherit', fontSize: '13px' }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Details */}
                                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', borderBottom: '2px solid var(--color-accent)', paddingBottom: '8px' }}>
                                    {selectedProgram.detailsTitle} (3 items)
                                </h3>
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Details Section Title</label>
                                    <input
                                        value={selectedProgram.detailsTitle}
                                        onChange={(e) => setSelectedProgram({ ...selectedProgram, detailsTitle: e.target.value })}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
                                    {selectedProgram.details.map((detail, idx) => (
                                        <div key={idx} style={{ padding: '16px', background: 'var(--color-surface)', borderRadius: '8px' }}>
                                            <div style={{ marginBottom: '8px' }}>
                                                <label style={{ fontSize: '12px', fontWeight: '600' }}>Icon (emoji)</label>
                                                <input
                                                    value={detail.icon}
                                                    onChange={(e) => updateDetail(idx, 'icon', e.target.value)}
                                                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                                                />
                                            </div>
                                            <div style={{ marginBottom: '8px' }}>
                                                <label style={{ fontSize: '12px', fontWeight: '600' }}>Label</label>
                                                <input
                                                    value={detail.label}
                                                    onChange={(e) => updateDetail(idx, 'label', e.target.value)}
                                                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                                                />
                                            </div>
                                            <div>
                                                <label style={{ fontSize: '12px', fontWeight: '600' }}>Value</label>
                                                <input
                                                    value={detail.value}
                                                    onChange={(e) => updateDetail(idx, 'value', e.target.value)}
                                                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Section */}
                                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', borderBottom: '2px solid var(--color-accent)', paddingBottom: '8px' }}>
                                    Call-to-Action Section
                                </h3>
                                <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>CTA Title</label>
                                        <input
                                            value={selectedProgram.ctaTitle}
                                            onChange={(e) => setSelectedProgram({ ...selectedProgram, ctaTitle: e.target.value })}
                                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>CTA Description</label>
                                        <textarea
                                            value={selectedProgram.ctaDescription}
                                            onChange={(e) => setSelectedProgram({ ...selectedProgram, ctaDescription: e.target.value })}
                                            rows={2}
                                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', fontFamily: 'inherit' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>CTA Button Text</label>
                                        <input
                                            value={selectedProgram.ctaButtonText}
                                            onChange={(e) => setSelectedProgram({ ...selectedProgram, ctaButtonText: e.target.value })}
                                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                        />
                                    </div>
                                </div>

                                {/* Submit Buttons */}
                                <div style={{ display: 'flex', gap: '12px', paddingTop: '24px', borderTop: '1px solid var(--color-border)', position: 'sticky', bottom: 0, background: 'var(--color-background)' }}>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn btn-primary"
                                        style={{ flex: 1, padding: '12px' }}
                                    >
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setShowForm(false); setSelectedProgram(null); }}
                                        className="btn btn-outline"
                                        style={{ flex: 1, padding: '12px' }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
