'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface HomeContent {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle1: string;
    heroSubtitle2: string;
    heroButtonText: string;
    trustIndicatorsText: string;
    trainingProgramsTitle: string;
    trainingProgramsSubtitle: string;
    videoUrl: string;
    videoTitle: string;
    videoDescription: string;
    videoClosing: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButtonText: string;
}

export default function AdminHomePage() {
    const [content, setContent] = useState<HomeContent>({
        heroBadge: 'Leadership Development',
        heroTitle: 'Growth with Presence',
        heroSubtitle1: 'Mindful Consulting partners with organizations and individuals to develop conscious, effective leadership grounded in presence, clarity, and human connection.',
        heroSubtitle2: 'We believe leadership is not a fixed destination, but a continuous process of growth—shaped by awareness, thoughtful dialogue, and purposeful action. Our work integrates mindfulness with practical business realities, helping leaders navigate complexity while staying grounded, empathetic, and decisive.',
        heroButtonText: 'Our Mission',
        trustIndicatorsText: 'TRUSTED BY LEADING INDUSTRIES',
        trainingProgramsTitle: 'Our Training Programs',
        trainingProgramsSubtitle: 'Tailored programs to elevate your organization\'s potential.',
        videoUrl: '9rdrvvEl2vQ',
        videoTitle: 'The Ten Voices That Define the Experience',
        videoDescription: 'We\'ve asked AI to analyze from thousands of participants to distill the essence of their experience. These are 10 testimonials represent the most powerful and consistent themes that emerge time and again: practical application, masterful facilitation, and profound personal transformation.',
        videoClosing: 'These are their words!',
        ctaTitle: 'Ready to transform your leadership?',
        ctaDescription: 'Join the hundreds of leaders who have elevated their impact with Mindful Consulting.',
        ctaButtonText: 'Request a Proposal'
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imageRefreshKey, setImageRefreshKey] = useState(Date.now());
    const [uploadingCtaImage, setUploadingCtaImage] = useState(false);
    const [ctaImageRefreshKey, setCtaImageRefreshKey] = useState(Date.now());

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const docRef = doc(db, 'pages', 'home');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setContent(docSnap.data() as HomeContent);
            }
        } catch (error) {
            console.error('Error fetching home content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');

        try {
            const docRef = doc(db, 'pages', 'home');
            await setDoc(docRef, content);
            setMessage('✅ Home page content saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error saving home content:', error);
            setMessage('❌ Failed to save. Please try again.');
        } finally {
            setSaving(false);
        }
    };
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setMessage('❌ Please select an image file');
            return;
        }

        setUploadingImage(true);
        setMessage('');

        try {
            // Upload to server via API
            const formData = new FormData();
            formData.append('file', file);
            
            const response = await fetch('/api/upload-hero', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Failed to upload image');
            }
            
            // Refresh the image preview
            setImageRefreshKey(Date.now());
            setMessage('✅ Image uploaded successfully! The hero background has been updated.');
        } catch (error) {
            console.error('Error uploading image:', error);
            setMessage('❌ Failed to upload image. Please try again.');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleCtaImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setMessage('❌ Please select an image file');
            return;
        }

        setUploadingCtaImage(true);
        setMessage('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const response = await fetch('/api/upload-home-cta', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Failed to upload image');
            }
            
            setCtaImageRefreshKey(Date.now());
            setMessage('✅ CTA background image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            setMessage('❌ Failed to upload image. Please try again.');
        } finally {
            setUploadingCtaImage(false);
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
                        <h1 className="heading-1 mb-4">Edit Home Page</h1>
                        <p className="body-text text-secondary">
                            Update all content that appears on the Home page
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


                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                    Hero Background Image
                                </label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {/* Current Image Preview */}
                                    <div style={{
                                        border: '2px dashed #d2d2d7',
                                        borderRadius: '8px',
                                        padding: '16px',
                                        background: '#f9f9f9'
                                    }}>
                                        <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>Current Image:</p>
                                        <img
                                            src={`/hero.png?${imageRefreshKey}`}
                                            onError={(e) => console.error('Image load error:', '/hero.png')}
                                            onLoad={() => console.log('Image loaded successfully:', '/hero.png')}


                                            style={{
                                                width: '100%',
                                                maxHeight: '200px',
                                                minHeight: '200px',
                                                objectFit: 'cover',
                                                borderRadius: '6px',
                                                display: 'block',
                                                backgroundColor: '#e5e5e5',
                                                marginBottom: '8px'
                                            }}
                                        />
                                        <p style={{ fontSize: '12px', color: '#999', wordBreak: 'break-all' }}>
                                            /hero.png
                                        </p>
                                    </div>

                                    {/* Upload New Image */}
                                    <div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={uploadingImage}
                                            style={{ display: 'none' }}
                                            id="heroImageUpload"
                                        />
                                        <label
                                            htmlFor="heroImageUpload"
                                            style={{
                                                display: 'inline-block',
                                                padding: '10px 20px',
                                                background: uploadingImage ? '#ccc' : '#3b82f6',
                                                color: '#fff',
                                                borderRadius: '6px',
                                                cursor: uploadingImage ? 'not-allowed' : 'pointer',
                                                fontSize: '14px',
                                                fontWeight: '500'
                                            }}
                                        >
                                            {uploadingImage ? '⏳ Uploading...' : '📤 Upload New Image'}
                                        </label>
                                        <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                                            Recommended: High-quality image, at least 1920x1080px
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                                        Subtitle (First Paragraph)
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={content.heroSubtitle1}
                                        onChange={(e) => setContent({ ...content, heroSubtitle1: e.target.value })}
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
                                        Subtitle (Second Paragraph)
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={content.heroSubtitle2}
                                        onChange={(e) => setContent({ ...content, heroSubtitle2: e.target.value })}
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
                                        Button Text
                                    </label>
                                    <input
                                        type="text"
                                        value={content.heroButtonText}
                                        onChange={(e) => setContent({ ...content, heroButtonText: e.target.value })}
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

                        {/* CTA Section Image */}
                        <div style={{
                            background: '#fff',
                            borderRadius: '12px',
                            border: '1px solid #e5e5e5',
                            padding: '32px',
                            marginTop: '24px'
                        }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#1a1a1a' }}>
                                📣 Bottom CTA Section
                            </h2>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                    Call to Action Background Image
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
                                            src={`/cta_bg.png?${ctaImageRefreshKey}`}
                                            alt="CTA Background" 
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
                                        <p style={{ fontSize: '12px', color: '#999' }}>/cta_bg.png</p>
                                    </div>

                                    <div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleCtaImageUpload}
                                            disabled={uploadingCtaImage}
                                            style={{ display: 'none' }}
                                            id="ctaImageUpload"
                                        />
                                        <label
                                            htmlFor="ctaImageUpload"
                                            style={{
                                                display: 'inline-block',
                                                padding: '10px 20px',
                                                background: uploadingCtaImage ? '#ccc' : '#3b82f6',
                                                color: '#fff',
                                                borderRadius: '6px',
                                                cursor: uploadingCtaImage ? 'not-allowed' : 'pointer',
                                                fontSize: '14px',
                                                fontWeight: '500'
                                            }}
                                        >
                                            {uploadingCtaImage ? '⏳ Uploading...' : '📤 Upload New CTA Image'}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Trust Indicators Section */}
                        <div style={{ padding: '32px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e5e5' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#1a1a1a' }}>
                                🏢 Trust Indicators Section
                            </h2>

                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                    Section Text
                                </label>
                                <input
                                    type="text"
                                    value={content.trustIndicatorsText}
                                    onChange={(e) => setContent({ ...content, trustIndicatorsText: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        border: '1px solid #d2d2d7',
                                        fontSize: '16px'
                                    }}
                                />
                                <p style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>
                                    Note: Industry cards are fixed and cannot be edited here
                                </p>
                            </div>
                        </div>

                        {/* Training Programs Section */}
                        <div style={{ padding: '32px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e5e5' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#1a1a1a' }}>
                                📚 Training Programs Section
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Section Title
                                    </label>
                                    <input
                                        type="text"
                                        value={content.trainingProgramsTitle}
                                        onChange={(e) => setContent({ ...content, trainingProgramsTitle: e.target.value })}
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
                                    <input
                                        type="text"
                                        value={content.trainingProgramsSubtitle}
                                        onChange={(e) => setContent({ ...content, trainingProgramsSubtitle: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #d2d2d7',
                                            fontSize: '16px'
                                        }}
                                    />
                                </div>
                                <p style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>
                                    Note: Training programs are managed in the Training Programs admin section
                                </p>
                            </div>
                        </div>

                        {/* Video Testimonials Section */}
                        <div style={{ padding: '32px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e5e5' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#1a1a1a' }}>
                                🎬 Video Testimonials Section
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        YouTube Video ID
                                    </label>
                                    <input
                                        type="text"
                                        value={content.videoUrl}
                                        onChange={(e) => setContent({ ...content, videoUrl: e.target.value })}
                                        placeholder="e.g., 9rdrvvEl2vQ"
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #d2d2d7',
                                            fontSize: '16px'
                                        }}
                                    />
                                    <p style={{ fontSize: '13px', color: '#666', marginTop: '8px' }}>
                                        Enter the YouTube video ID (the part after "v=" in the URL, e.g., from https://youtube.com/watch?v=9rdrvvEl2vQ, enter "9rdrvvEl2vQ")
                                    </p>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Video Title
                                    </label>
                                    <input
                                        type="text"
                                        value={content.videoTitle}
                                        onChange={(e) => setContent({ ...content, videoTitle: e.target.value })}
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
                                        Video Description
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={content.videoDescription}
                                        onChange={(e) => setContent({ ...content, videoDescription: e.target.value })}
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
                                        Closing Text (Italic)
                                    </label>
                                    <input
                                        type="text"
                                        value={content.videoClosing}
                                        onChange={(e) => setContent({ ...content, videoClosing: e.target.value })}
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

                        {/* Call to Action Section */}
                        <div style={{ padding: '32px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e5e5' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#1a1a1a' }}>
                                📣 Call to Action Section
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        CTA Title
                                    </label>
                                    <input
                                        type="text"
                                        value={content.ctaTitle}
                                        onChange={(e) => setContent({ ...content, ctaTitle: e.target.value })}
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
                                        CTA Description
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={content.ctaDescription}
                                        onChange={(e) => setContent({ ...content, ctaDescription: e.target.value })}
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
                                        Button Text
                                    </label>
                                    <input
                                        type="text"
                                        value={content.ctaButtonText}
                                        onChange={(e) => setContent({ ...content, ctaButtonText: e.target.value })}
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
