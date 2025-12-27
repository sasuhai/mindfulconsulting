'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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

const INITIAL_PRIVACY_DATA: PrivacyData = {
    lastUpdated: 'December 25, 2025',
    introduction: 'Your privacy is important to us. This policy outlines how we collect, use, and protect your information.',
    contactEmail: 'hello@mindfulconsulting.com',
    contactPhone: '+60 3 1234 5678',
    sections: [
        {
            title: 'Information We Collect',
            content: 'We collect information that you provide directly to us, including when you:',
            items: [
                'Fill out a contact form or request information',
                'Register for our programs or events',
                'Subscribe to our newsletter',
                'Communicate with us via email or phone'
            ]
        },
        {
            title: 'How We Use Your Information',
            content: 'We use the information we collect to:',
            items: [
                'Provide, maintain, and improve our services',
                'Send you information about our programs and services',
                'Respond to your inquiries and requests',
                'Comply with legal obligations'
            ]
        },
        {
            title: 'Information Sharing',
            content: 'We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:',
            items: [
                'With your consent',
                'To comply with legal obligations',
                'With service providers who assist us in operating our business'
            ]
        },
        {
            title: 'Data Security',
            content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
            items: []
        },
        {
            title: 'Your Rights',
            content: 'You have the right to:',
            items: [
                'Access your personal information',
                'Request correction of inaccurate information',
                'Request deletion of your information',
                'Opt-out of marketing communications'
            ]
        },
        {
            title: 'Cookies',
            content: 'We use cookies and similar tracking technologies to improve your browsing experience and analyze website traffic. You can control cookies through your browser settings.',
            items: []
        },
        {
            title: 'Changes to This Policy',
            content: 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.',
            items: []
        }
    ]
};

export default function AdminPrivacyPage() {
    const [privacyData, setPrivacyData] = useState<PrivacyData | null>(null);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

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
        }
    };

    const seedInitialData = async () => {
        if (!confirm('This will create/update the Privacy Policy page with initial data. Continue?')) return;

        setLoading(true);
        try {
            await setDoc(doc(db, 'pages', 'privacy'), INITIAL_PRIVACY_DATA);
            alert('✅ Privacy policy data seeded successfully!');
            fetchPrivacyData();
        } catch (error) {
            console.error('Error seeding data:', error);
            alert('Failed to seed data: ' + (error as any).message);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!privacyData) return;

        setLoading(true);
        try {
            await setDoc(doc(db, 'pages', 'privacy'), privacyData);
            alert('✅ Privacy policy updated successfully!');
            setShowForm(false);
            fetchPrivacyData();
        } catch (error) {
            console.error('Error saving privacy data:', error);
            alert('Failed to save: ' + (error as any).message);
        } finally {
            setLoading(false);
        }
    };

    const updateSection = (index: number, field: keyof PrivacySection, value: any) => {
        if (!privacyData) return;
        const newSections = [...privacyData.sections];
        newSections[index] = { ...newSections[index], [field]: value };
        setPrivacyData({ ...privacyData, sections: newSections });
    };

    const updateSectionItem = (sectionIdx: number, itemIdx: number, value: string) => {
        if (!privacyData) return;
        const newSections = [...privacyData.sections];
        const newItems = [...(newSections[sectionIdx].items || [])];
        newItems[itemIdx] = value;
        newSections[sectionIdx] = { ...newSections[sectionIdx], items: newItems };
        setPrivacyData({ ...privacyData, sections: newSections });
    };

    const addSectionItem = (sectionIdx: number) => {
        if (!privacyData) return;
        const newSections = [...privacyData.sections];
        const newItems = [...(newSections[sectionIdx].items || []), ''];
        newSections[sectionIdx] = { ...newSections[sectionIdx], items: newItems };
        setPrivacyData({ ...privacyData, sections: newSections });
    };

    const removeSectionItem = (sectionIdx: number, itemIdx: number) => {
        if (!privacyData) return;
        const newSections = [...privacyData.sections];
        const newItems = (newSections[sectionIdx].items || []).filter((_, i) => i !== itemIdx);
        newSections[sectionIdx] = { ...newSections[sectionIdx], items: newItems };
        setPrivacyData({ ...privacyData, sections: newSections });
    };

    return (
        <div className="main-wrapper" style={{ paddingTop: '100px', paddingBottom: '60px', minHeight: '100vh', background: 'var(--color-background)' }}>
            <div className="container" style={{ maxWidth: '1400px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <Link
                        href="/admin"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: 'var(--color-text-secondary)',
                            textDecoration: 'none',
                            fontSize: '14px',
                            transition: 'color 0.2s'
                        }}
                    >
                        ← Back to Dashboard
                    </Link>
                </div>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div>
                        <h1 className="heading-1" style={{ fontSize: '32px', marginBottom: '4px' }}>
                            Privacy Policy
                        </h1>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                            Manage privacy policy content
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {!privacyData && (
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
                        )}
                        {privacyData && !showForm && (
                            <button
                                onClick={() => setShowForm(true)}
                                className="btn btn-primary"
                                style={{ padding: '12px 24px' }}
                            >
                                Edit Privacy Policy
                            </button>
                        )}
                    </div>
                </div>

                {/* Preview Card */}
                {privacyData && !showForm && (
                    <div style={{
                        background: 'var(--color-surface)',
                        borderRadius: '12px',
                        padding: '32px',
                        border: '1px solid var(--color-border)',
                    }}>
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                                Last Updated
                            </div>
                            <div style={{ fontSize: '16px', fontWeight: '600' }}>{privacyData.lastUpdated}</div>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                                Introduction
                            </div>
                            <div style={{ fontSize: '14px', lineHeight: '1.6' }}>{privacyData.introduction}</div>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                                Sections ({privacyData.sections.length})
                            </div>
                            <div style={{ display: 'grid', gap: '12px' }}>
                                {privacyData.sections.map((section, idx) => (
                                    <div key={idx} style={{
                                        padding: '16px',
                                        background: 'var(--color-background)',
                                        borderRadius: '8px',
                                        border: '1px solid var(--color-border)'
                                    }}>
                                        <div style={{ fontWeight: '600', marginBottom: '4px' }}>{section.title}</div>
                                        <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                                            {section.items && section.items.length > 0 ? `${section.items.length} items` : 'No items'}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                            <div>
                                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                                    Contact Email
                                </div>
                                <div style={{ fontSize: '14px' }}>{privacyData.contactEmail}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                                    Contact Phone
                                </div>
                                <div style={{ fontSize: '14px' }}>{privacyData.contactPhone}</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* No Data State */}
                {!privacyData && !loading && (
                    <div style={{
                        textAlign: 'center',
                        padding: '80px 20px',
                        background: 'var(--color-surface)',
                        borderRadius: '12px',
                        border: '2px dashed var(--color-border)',
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
                        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>No privacy policy data</h3>
                        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
                            Click "Seed Initial Data" to create the privacy policy
                        </p>
                    </div>
                )}

                {/* Edit Form Modal */}
                {showForm && privacyData && (
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
                                        Edit Privacy Policy
                                    </h2>
                                    <button
                                        onClick={() => { setShowForm(false); fetchPrivacyData(); }}
                                        style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSave} style={{ padding: '32px' }}>
                                {/* Basic Info */}
                                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', borderBottom: '2px solid var(--color-accent)', paddingBottom: '8px' }}>
                                    Basic Information
                                </h3>
                                <div style={{ display: 'grid', gap: '16px', marginBottom: '32px' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Last Updated</label>
                                        <input
                                            value={privacyData.lastUpdated}
                                            onChange={(e) => setPrivacyData({ ...privacyData, lastUpdated: e.target.value })}
                                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Introduction</label>
                                        <textarea
                                            value={privacyData.introduction}
                                            onChange={(e) => setPrivacyData({ ...privacyData, introduction: e.target.value })}
                                            rows={3}
                                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', fontFamily: 'inherit' }}
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Contact Email</label>
                                            <input
                                                type="email"
                                                value={privacyData.contactEmail}
                                                onChange={(e) => setPrivacyData({ ...privacyData, contactEmail: e.target.value })}
                                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Contact Phone</label>
                                            <input
                                                value={privacyData.contactPhone}
                                                onChange={(e) => setPrivacyData({ ...privacyData, contactPhone: e.target.value })}
                                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Sections */}
                                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', borderBottom: '2px solid var(--color-accent)', paddingBottom: '8px' }}>
                                    Content Sections
                                </h3>
                                {privacyData.sections.map((section, sectionIdx) => (
                                    <div key={sectionIdx} style={{ marginBottom: '32px', padding: '24px', background: 'var(--color-surface)', borderRadius: '12px' }}>
                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Section Title</label>
                                            <input
                                                value={section.title}
                                                onChange={(e) => updateSection(sectionIdx, 'title', e.target.value)}
                                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                            />
                                        </div>
                                        <div style={{ marginBottom: '16px' }}>
                                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Content</label>
                                            <textarea
                                                value={section.content}
                                                onChange={(e) => updateSection(sectionIdx, 'content', e.target.value)}
                                                rows={3}
                                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', fontFamily: 'inherit' }}
                                            />
                                        </div>
                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                                <label style={{ fontSize: '13px', fontWeight: '600' }}>List Items (optional)</label>
                                                <button
                                                    type="button"
                                                    onClick={() => addSectionItem(sectionIdx)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        fontSize: '12px',
                                                        background: 'var(--color-accent)',
                                                        color: '#fff',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    + Add Item
                                                </button>
                                            </div>
                                            {section.items && section.items.map((item, itemIdx) => (
                                                <div key={itemIdx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                                    <input
                                                        value={item}
                                                        onChange={(e) => updateSectionItem(sectionIdx, itemIdx, e.target.value)}
                                                        placeholder="List item..."
                                                        style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '13px' }}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSectionItem(sectionIdx, itemIdx)}
                                                        style={{
                                                            padding: '8px 12px',
                                                            background: '#ef4444',
                                                            color: '#fff',
                                                            border: 'none',
                                                            borderRadius: '6px',
                                                            cursor: 'pointer',
                                                            fontSize: '12px'
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}

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
                                        onClick={() => { setShowForm(false); fetchPrivacyData(); }}
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
