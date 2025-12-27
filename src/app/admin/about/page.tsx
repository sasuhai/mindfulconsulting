'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Link from 'next/link';

interface CredentialItem {
    title: string;
    description: string;
}

interface FocusAreaItem {
    title: string;
    description: string;
}

interface AboutContent {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    workshopsIntro: string;
    ogyBadge: string;
    ogyName: string;
    ogyIntro: string;
    ogyParagraph1: string;
    ogyParagraph2: string;
    ogyParagraph3: string;
    credentialsTitle: string;
    credentials: CredentialItem[];
    focusAreasTitle: string;
    focusAreas: FocusAreaItem[];
    quoteText: string;
    quoteAuthor: string;
}

export default function AdminAboutPage() {
    const [content, setContent] = useState<AboutContent>({
        heroBadge: 'Leadership Development Experts',
        heroTitle: 'Our Services',
        heroSubtitle: 'At Mindful Consulting, we create safe, thoughtful spaces where leaders can pause, reflect, and move forward with presence—supporting growth that is both human and sustainable.',
        workshopsIntro: 'Designed to be interactive, reflective, and immediately applicable:',
        ogyBadge: 'About Ogy',
        ogyName: 'Fauzihain (Ogy)',
        ogyIntro: 'Leadership consultant, facilitator, and mentor with 24 years of corporate experience across the oil & gas, banking, and research sectors, and 8 years as a dedicated leadership consultant and facilitator.',
        ogyParagraph1: 'Ogy is driven by a simple yet powerful purpose: to help people know something they didn\'t know before and do something they could not do before. Her work focuses on enabling sustainable behavior change through self-awareness, practical application, and continuous personal growth.',
        ogyParagraph2: 'She is known for her highly experiential and learner-centered facilitation style. She emphasizes real-life application, reflective learning, and the sharing of lived experiences to ensure that participants translate insight into action.',
        ogyParagraph3: 'Her leadership perspective is shaped by both Eastern and Western influences, with international exposure spanning Houston, Dallas, Melbourne, Jakarta, Malaysia, Brunei, Turkmenistan, Iraq, and Egypt.',
        credentialsTitle: 'Credentials & Expertise',
        credentials: [
            { title: 'ICF-ACC Certified', description: 'International Coaching Federation - Associate Certified Coach' },
            { title: 'Since 2017', description: 'Leadership Consultant & Facilitator with proven track record' },
            { title: 'ExxonMobil Mentor of the Year', description: 'Recognized in 2010 for outstanding dedication to mentoring' },
            { title: 'Certified Yoga Teacher', description: 'Integrating mindfulness and well-being into leadership' },
            { title: 'Global Experience', description: 'International exposure across multiple continents' },
            { title: '24+ Years Corporate', description: 'Oil & gas, banking, and research sectors expertise' }
        ],
        focusAreasTitle: 'Areas of Focus',
        focusAreas: [
            { title: 'Empowering Leaders', description: 'Developing mindful, authentic leaders who create psychological safety and inspire sustainable change.' },
            { title: 'Confident Communicators', description: 'Building public speaking capabilities and effective communication skills through experiential learning.' },
            { title: 'Whole-Person Growth', description: 'Fostering holistic development through self-awareness, mindfulness, and continuous personal evolution.' }
        ],
        quoteText: 'The quality of our lives depends not on whether or not we have conflicts, but on how we respond to them.',
        quoteAuthor: 'Thomas Crum'
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [uploadingHeroImage, setUploadingHeroImage] = useState(false);
    const [uploadingFounderPhoto, setUploadingFounderPhoto] = useState(false);
    const [heroImageRefreshKey, setHeroImageRefreshKey] = useState(Date.now());
    const [founderPhotoRefreshKey, setFounderPhotoRefreshKey] = useState(Date.now());

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const docRef = doc(db, 'pages', 'about');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setContent(docSnap.data() as AboutContent);
            }
        } catch (error) {
            console.error('Error fetching about content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');

        try {
            const docRef = doc(db, 'pages', 'about');
            await setDoc(docRef, content);
            setMessage('✅ About page content saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error saving about content:', error);
            setMessage('❌ Failed to save. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setMessage('❌ Please select an image file');
            return;
        }

        setUploadingHeroImage(true);
        setMessage('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const response = await fetch('/api/upload-about-hero', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Failed to upload hero image');
            }
            
            setHeroImageRefreshKey(Date.now());
            setMessage('✅ Hero image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading hero image:', error);
            setMessage('❌ Failed to upload hero image. Please try again.');
        } finally {
            setUploadingHeroImage(false);
        }
    };

    const handleFounderPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setMessage('❌ Please select an image file');
            return;
        }

        setUploadingFounderPhoto(true);
        setMessage('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const response = await fetch('/api/upload-founder-photo', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Failed to upload founder photo');
            }
            
            setFounderPhotoRefreshKey(Date.now());
            setMessage('✅ Founder photo uploaded successfully!');
        } catch (error) {
            console.error('Error uploading founder photo:', error);
            setMessage('❌ Failed to upload founder photo. Please try again.');
        } finally {
            setUploadingFounderPhoto(false);
        }
    };

    const seedInitialData = async () => {
        if (!confirm('This will initialize the About page with default content. Continue?')) {
            return;
        }

        setSaving(true);
        setMessage('');

        try {
            const defaultContent: AboutContent = {
                heroBadge: 'Leadership Development Experts',
                heroTitle: 'Our Services',
                heroSubtitle: 'At Mindful Consulting, we create safe, thoughtful spaces where leaders can pause, reflect, and move forward with presence—supporting growth that is both human and sustainable.',
                workshopsIntro: 'Designed to be interactive, reflective, and immediately applicable:',
                ogyBadge: 'About Ogy',
                ogyName: 'Fauzihain (Ogy)',
                ogyIntro: 'Leadership consultant, facilitator, and mentor with 24 years of corporate experience across the oil & gas, banking, and research sectors, and 8 years as a dedicated leadership consultant and facilitator.',
                ogyParagraph1: 'Ogy is driven by a simple yet powerful purpose: to help people know something they didn\'t know before and do something they could not do before. Her work focuses on enabling sustainable behavior change through self-awareness, practical application, and continuous personal growth.',
                ogyParagraph2: 'She is known for her highly experiential and learner-centered facilitation style. She emphasizes real-life application, reflective learning, and the sharing of lived experiences to ensure that participants translate insight into action.',
                ogyParagraph3: 'Her leadership perspective is shaped by both Eastern and Western influences, with international exposure spanning Houston, Dallas, Melbourne, Jakarta, Malaysia, Brunei, Turkmenistan, Iraq, and Egypt.',
                credentialsTitle: 'Credentials & Expertise',
                credentials: [
                    { title: 'ICF-ACC Certified', description: 'International Coaching Federation - Associate Certified Coach' },
                    { title: 'Since 2017', description: 'Leadership Consultant & Facilitator with proven track record' },
                    { title: 'ExxonMobil Mentor of the Year', description: 'Recognized in 2010 for outstanding dedication to mentoring' },
                    { title: 'Certified Yoga Teacher', description: 'Integrating mindfulness and well-being into leadership' },
                    { title: 'Global Experience', description: 'International exposure across multiple continents' },
                    { title: '24+ Years Corporate', description: 'Oil & gas, banking, and research sectors expertise' }
                ],
                focusAreasTitle: 'Areas of Focus',
                focusAreas: [
                    { title: 'Empowering Leaders', description: 'Developing mindful, authentic leaders who create psychological safety and inspire sustainable change.' },
                    { title: 'Confident Communicators', description: 'Building public speaking capabilities and effective communication skills through experiential learning.' },
                    { title: 'Whole-Person Growth', description: 'Fostering holistic development through self-awareness, mindfulness, and continuous personal evolution.' }
                ],
                quoteText: 'The quality of our lives depends not on whether or not we have conflicts, but on how we respond to them.',
                quoteAuthor: 'Thomas Crum'
            };

            const docRef = doc(db, 'pages', 'about');
            await setDoc(docRef, defaultContent);
            setContent(defaultContent);
            setMessage('✅ Initial data seeded successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error seeding initial data:', error);
            setMessage('❌ Failed to seed data. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="main-wrapper">
                <section className="section">
                    <div className="container" style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
                        <h3>Loading...</h3>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="main-wrapper">
            <section className="section bg-surface">
                <div className="container" style={{ maxWidth: '1000px' }}>
                    {/* Header */}
                    <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
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

                    <div style={{ marginBottom: '32px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <h1 className="heading-1">Edit About Page</h1>
                            <button
                                onClick={seedInitialData}
                                disabled={saving}
                                style={{
                                    padding: '10px 20px',
                                    background: '#10b981',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: saving ? 'not-allowed' : 'pointer',
                                    opacity: saving ? 0.7 : 1
                                }}
                            >
                                🌱 Seed Initial Data
                            </button>
                        </div>
                        <p className="body-text text-secondary">
                            Update the content that appears on the About page
                        </p>
                    </div>

                    {message && (
                        <div style={{
                            padding: '16px 24px',
                            background: message.includes('✅') ? '#d1fae5' : '#fee2e2',
                            color: message.includes('✅') ? '#065f46' : '#991b1b',
                            borderRadius: '8px',
                            marginBottom: '24px',
                            fontWeight: '500'
                        }}>
                            {message}
                        </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                        {/* Hero Section */}
                        <div style={{ padding: '32px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e5e5' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#1a1a1a' }}>
                                🎯 Hero Section
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Hero Background Image
                                    </label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div style={{ 
                                            border: '2px dashed #d2d2d7', 
                                            borderRadius: '8px', 
                                            padding: '16px',
                                            background: '#f9f9f9'
                                        }}>
                                            <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>Current Image:</p>
                                            <img 
                                                src={`/about-hero.png?${heroImageRefreshKey}`}
                                                alt="About Hero Background" 
                                                style={{ 
                                                    width: '100%', 
                                                    maxHeight: '200px', 
                                                    minHeight: '200px',
                                                    objectFit: 'cover', 
                                                    borderRadius: '6px',
                                                    marginBottom: '8px',
                                                    display: 'block',
                                                    backgroundColor: '#e5e5e5'
                                                }} 
                                            />
                                            <p style={{ fontSize: '12px', color: '#999' }}>/about-hero.png</p>
                                        </div>

                                        <div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleHeroImageUpload}
                                                disabled={uploadingHeroImage}
                                                style={{ display: 'none' }}
                                                id="heroImageUpload"
                                            />
                                            <label
                                                htmlFor="heroImageUpload"
                                                style={{
                                                    display: 'inline-block',
                                                    padding: '10px 20px',
                                                    background: uploadingHeroImage ? '#ccc' : '#3b82f6',
                                                    color: '#fff',
                                                    borderRadius: '6px',
                                                    cursor: uploadingHeroImage ? 'not-allowed' : 'pointer',
                                                    fontSize: '14px',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                {uploadingHeroImage ? '⏳ Uploading...' : '📤 Upload New Hero Image'}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Badge Text
                                    </label>
                                    <input
                                        type="text"
                                        value={content.heroBadge}
                                        onChange={(e) => setContent({ ...content, heroBadge: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #d2d2d7',
                                            fontSize: '16px'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Main Title
                                    </label>
                                    <input
                                        type="text"
                                        value={content.heroTitle}
                                        onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #d2d2d7',
                                            fontSize: '16px'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Subtitle
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={content.heroSubtitle}
                                        onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #d2d2d7',
                                            fontSize: '16px',
                                            fontFamily: 'inherit',
                                            resize: 'vertical'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Workshops Introduction Text
                                    </label>
                                    <input
                                        type="text"
                                        value={content.workshopsIntro}
                                        onChange={(e) => setContent({ ...content, workshopsIntro: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #d2d2d7',
                                            fontSize: '16px'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Ogy Section */}
                        <div style={{ padding: '32px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e5e5' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#1a1a1a' }}>
                                👤 About Ogy Section
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Founder Photo
                                    </label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div style={{ 
                                            border: '2px dashed #d2d2d7', 
                                            borderRadius: '8px', 
                                            padding: '16px',
                                            background: '#f9f9f9'
                                        }}>
                                            <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>Current Photo:</p>
                                            <img 
                                                src={`/founder.jpg?${founderPhotoRefreshKey}`}
                                                alt="Founder Photo" 
                                                style={{ 
                                                    width: '200px', 
                                                    height: '200px',
                                                    objectFit: 'cover', 
                                                    borderRadius: '50%',
                                                    marginBottom: '8px',
                                                    display: 'block',
                                                    backgroundColor: '#e5e5e5'
                                                }} 
                                            />
                                            <p style={{ fontSize: '12px', color: '#999' }}>/founder.jpg</p>
                                        </div>

                                        <div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFounderPhotoUpload}
                                                disabled={uploadingFounderPhoto}
                                                style={{ display: 'none' }}
                                                id="founderPhotoUpload"
                                            />
                                            <label
                                                htmlFor="founderPhotoUpload"
                                                style={{
                                                    display: 'inline-block',
                                                    padding: '10px 20px',
                                                    background: uploadingFounderPhoto ? '#ccc' : '#3b82f6',
                                                    color: '#fff',
                                                    borderRadius: '6px',
                                                    cursor: uploadingFounderPhoto ? 'not-allowed' : 'pointer',
                                                    fontSize: '14px',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                {uploadingFounderPhoto ? '⏳ Uploading...' : '📤 Upload New Photo'}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Badge Text
                                    </label>
                                    <input
                                        type="text"
                                        value={content.ogyBadge}
                                        onChange={(e) => setContent({ ...content, ogyBadge: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #d2d2d7',
                                            fontSize: '16px'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={content.ogyName}
                                        onChange={(e) => setContent({ ...content, ogyName: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #d2d2d7',
                                            fontSize: '16px'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Introduction (Bold Paragraph)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={content.ogyIntro}
                                        onChange={(e) => setContent({ ...content, ogyIntro: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #d2d2d7',
                                            fontSize: '16px',
                                            fontFamily: 'inherit',
                                            resize: 'vertical'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Paragraph 1
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={content.ogyParagraph1}
                                        onChange={(e) => setContent({ ...content, ogyParagraph1: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #d2d2d7',
                                            fontSize: '16px',
                                            fontFamily: 'inherit',
                                            resize: 'vertical'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Paragraph 2
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={content.ogyParagraph2}
                                        onChange={(e) => setContent({ ...content, ogyParagraph2: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #d2d2d7',
                                            fontSize: '16px',
                                            fontFamily: 'inherit',
                                            resize: 'vertical'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Paragraph 3
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={content.ogyParagraph3}
                                        onChange={(e) => setContent({ ...content, ogyParagraph3: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #d2d2d7',
                                            fontSize: '16px',
                                            fontFamily: 'inherit',
                                            resize: 'vertical'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Credentials Section */}
                        <div style={{ padding: '32px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e5e5' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#1a1a1a' }}>
                                🏆 Credentials & Expertise
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Section Title
                                    </label>
                                    <input
                                        type="text"
                                        value={content.credentialsTitle}
                                        onChange={(e) => setContent({ ...content, credentialsTitle: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #d2d2d7',
                                            fontSize: '16px'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '16px', fontSize: '14px', fontWeight: '600' }}>
                                        Credential Items
                                    </label>
                                    {content.credentials && content.credentials.map((cred, index) => (
                                        <div key={index} style={{ marginBottom: '16px', padding: '16px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                                <span style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280' }}>Item {index + 1}</span>
                                                <button
                                                    onClick={() => {
                                                        const newCredentials = content.credentials.filter((_, i) => i !== index);
                                                        setContent({ ...content, credentials: newCredentials });
                                                    }}
                                                    style={{
                                                        padding: '4px 12px',
                                                        background: '#ef4444',
                                                        color: '#fff',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        fontSize: '12px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Title"
                                                value={cred.title}
                                                onChange={(e) => {
                                                    const newCredentials = [...content.credentials];
                                                    newCredentials[index].title = e.target.value;
                                                    setContent({ ...content, credentials: newCredentials });
                                                }}
                                                style={{
                                                    width: '100%',
                                                    padding: '10px',
                                                    borderRadius: '6px',
                                                    border: '1px solid #d1d5db',
                                                    fontSize: '14px',
                                                    marginBottom: '8px'
                                                }}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Description"
                                                value={cred.description}
                                                onChange={(e) => {
                                                    const newCredentials = [...content.credentials];
                                                    newCredentials[index].description = e.target.value;
                                                    setContent({ ...content, credentials: newCredentials });
                                                }}
                                                style={{
                                                    width: '100%',
                                                    padding: '10px',
                                                    borderRadius: '6px',
                                                    border: '1px solid #d1d5db',
                                                    fontSize: '14px'
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            setContent({
                                                ...content,
                                                credentials: [...content.credentials, { title: '', description: '' }]
                                            });
                                        }}
                                        style={{
                                            padding: '10px 20px',
                                            background: '#3b82f6',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        + Add Credential
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Focus Areas Section */}
                        <div style={{ padding: '32px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e5e5' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#1a1a1a' }}>
                                🎯 Areas of Focus
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Section Title
                                    </label>
                                    <input
                                        type="text"
                                        value={content.focusAreasTitle}
                                        onChange={(e) => setContent({ ...content, focusAreasTitle: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #d2d2d7',
                                            fontSize: '16px'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '16px', fontSize: '14px', fontWeight: '600' }}>
                                        Focus Area Items
                                    </label>
                                    {content.focusAreas && content.focusAreas.map((area, index) => (
                                        <div key={index} style={{ marginBottom: '16px', padding: '16px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                                <span style={{ fontSize: '13px', fontWeight: '600', color: '#6b7280' }}>Item {index + 1}</span>
                                                <button
                                                    onClick={() => {
                                                        const newFocusAreas = content.focusAreas.filter((_, i) => i !== index);
                                                        setContent({ ...content, focusAreas: newFocusAreas });
                                                    }}
                                                    style={{
                                                        padding: '4px 12px',
                                                        background: '#ef4444',
                                                        color: '#fff',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        fontSize: '12px',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Title"
                                                value={area.title}
                                                onChange={(e) => {
                                                    const newFocusAreas = [...content.focusAreas];
                                                    newFocusAreas[index].title = e.target.value;
                                                    setContent({ ...content, focusAreas: newFocusAreas });
                                                }}
                                                style={{
                                                    width: '100%',
                                                    padding: '10px',
                                                    borderRadius: '6px',
                                                    border: '1px solid #d1d5db',
                                                    fontSize: '14px',
                                                    marginBottom: '8px'
                                                }}
                                            />
                                            <textarea
                                                placeholder="Description"
                                                rows={2}
                                                value={area.description}
                                                onChange={(e) => {
                                                    const newFocusAreas = [...content.focusAreas];
                                                    newFocusAreas[index].description = e.target.value;
                                                    setContent({ ...content, focusAreas: newFocusAreas });
                                                }}
                                                style={{
                                                    width: '100%',
                                                    padding: '10px',
                                                    borderRadius: '6px',
                                                    border: '1px solid #d1d5db',
                                                    fontSize: '14px',
                                                    fontFamily: 'inherit',
                                                    resize: 'vertical'
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            setContent({
                                                ...content,
                                                focusAreas: [...content.focusAreas, { title: '', description: '' }]
                                            });
                                        }}
                                        style={{
                                            padding: '10px 20px',
                                            background: '#3b82f6',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        + Add Focus Area
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Quote Section */}
                        <div style={{ padding: '32px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e5e5' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#1a1a1a' }}>
                                💬 Quote Section
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Quote Text
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={content.quoteText}
                                        onChange={(e) => setContent({ ...content, quoteText: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #d2d2d7',
                                            fontSize: '16px',
                                            fontFamily: 'inherit',
                                            resize: 'vertical'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Quote Author
                                    </label>
                                    <input
                                        type="text"
                                        value={content.quoteAuthor}
                                        onChange={(e) => setContent({ ...content, quoteAuthor: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #d2d2d7',
                                            fontSize: '16px'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div style={{ position: 'sticky', bottom: '24px', zIndex: 100 }}>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                style={{
                                    width: '100%',
                                    padding: '16px 32px',
                                    background: saving ? '#9ca3af' : 'var(--color-accent)',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '18px',
                                    fontWeight: '600',
                                    cursor: saving ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                }}
                            >
                                {saving ? 'Saving...' : '💾 Save All Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
