'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Link from 'next/link';

interface MissionContent {
    heroStatus: string;
    heroTitle: string;
    heroSubtitle: string;
    heroButtonText: string;
    coreValuesTitle: string;
    coreValuesSubtitle: string;
    values: Array<{
        number: string;
        title: string;
        description: string;
        quote: string;
        color: string;
    }>;
    howWeWorkTitle: string;
    howWeWorkSubtitle: string;
    howWeWorkPrinciples: Array<{
        icon: string;
        text: string;
    }>;
    howWeWorkClosing: string;
    whatWeDoTitle: string;
    services: Array<{
        icon: string;
        title: string;
        description: string;
    }>;
    whoWeServeTitle: string;
    audiences: string[];
    whoWeServeClosing: string;
    whoWeServeButtonText: string;
}

export default function AdminMissionPage() {
    const [content, setContent] = useState<MissionContent>({
        heroStatus: 'Our Purpose',
        heroTitle: 'Mission',
        heroSubtitle: 'To support leaders in their journey of self-discovery, enabling them to lead with purpose, open pathways for others, and awaken the power already within.',
        heroButtonText: 'Begin Your Journey →',

        coreValuesTitle: 'Core Values',
        coreValuesSubtitle: 'The principles that guide everything we do',
        values: [
            {
                number: '1️⃣',
                title: 'Inspire',
                description: 'We inspire individuals and organisations by being fully present — listening deeply, honouring each person\'s journey, and awakening clarity, courage, and possibility from within.',
                quote: 'Inspiration begins when people feel truly seen and heard.',
                color: '#7a8a6f'
            },
            {
                number: '2️⃣',
                title: 'Serve',
                description: 'We help wholeheartedly — with sincerity, humility, and commitment. Our work is grounded in genuine care, ethical practice, and the belief that meaningful change happens through trust and human connection.',
                quote: 'Service is not a transaction, but a relationship.',
                color: '#8b7355'
            },
            {
                number: '3️⃣',
                title: 'Grow',
                description: 'We honour nature as teacher and guide — embracing balance, cycles, and sustainability in leadership, learning, and life. Growth is nurtured, not forced.',
                quote: 'True growth follows natural rhythms.',
                color: '#5b7c8d'
            }
        ],

        howWeWorkTitle: 'How We Work',
        howWeWorkSubtitle: 'We work through partnership, not prescription.',
        howWeWorkPrinciples: [
            { icon: '👂', text: 'We listen first — deeply and without judgment' },
            { icon: '🤝', text: 'We respect each person\'s pace, readiness, and context' },
            { icon: '✨', text: 'We co-create paths forward rather than impose solutions' },
            { icon: '⚖️', text: 'We balance reflection with practical action' }
        ],
        howWeWorkClosing: 'Our approach honours the belief that meaningful growth unfolds naturally when the right conditions are present.',

        whatWeDoTitle: 'What We Do',
        services: [
            {
                icon: '🎯',
                title: 'Leadership Coaching',
                description: 'One-to-one coaching that supports leaders in gaining clarity, strengthening presence, and leading with authenticity and purpose.'
            },
            {
                icon: '👥',
                title: 'Executive & Team Development',
                description: 'Facilitated conversations and programs that build trust, alignment, and shared responsibility within leadership teams.'
            },
            {
                icon: '🧘',
                title: 'Mindful Leadership Workshops',
                description: 'Interactive sessions designed to cultivate awareness, communication, and sustainable leadership practices.'
            },
            {
                icon: '💭',
                title: 'Reflection & Growth Conversations',
                description: 'Structured spaces for leaders to pause, reflect, and explore challenges, transitions, or next chapters.'
            }
        ],

        whoWeServeTitle: 'Who We Serve',
        audiences: [
            'Leaders in transition or new roles',
            'Managers growing into leadership responsibility',
            'Organisations seeking more human-centred leadership',
            'Individuals exploring purpose, clarity, and direction'
        ],
        whoWeServeClosing: 'If you are open to reflection and growth, we are ready to walk alongside you.',
        whoWeServeButtonText: 'Start a Conversation →'
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imageRefreshKey, setImageRefreshKey] = useState(Date.now());

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const docRef = doc(db, 'pages', 'mission');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setContent(docSnap.data() as MissionContent);
            }
        } catch (error) {
            console.error('Error fetching mission content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');

        try {
            const docRef = doc(db, 'pages', 'mission');
            await setDoc(docRef, content);
            setMessage('✅ Mission content saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Error saving mission content:', error);
            setMessage('❌ Failed to save. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setMessage('❌ Please select an image file');
            return;
        }

        setUploadingImage(true);
        setMessage('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const response = await fetch('/api/upload-mission-hero', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Failed to upload image');
            }
            
            setImageRefreshKey(Date.now());
            setMessage('✅ Hero image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            setMessage('❌ Failed to upload image. Please try again.');
        } finally {
            setUploadingImage(false);
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
                    <div style={{ marginBottom: '32px' }}>
                        <h1 className="heading-1 mb-4">Edit Mission Page</h1>
                        <p className="body-text text-secondary">
                            Update all content that appears on the Mission page
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
                                                src={`/mission-hero.png?${imageRefreshKey}`}
                                                alt="Mission Hero Background" 
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
                                            <p style={{ fontSize: '12px', color: '#999' }}>/mission-hero.png</p>
                                        </div>

                                        <div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                disabled={uploadingImage}
                                                style={{ display: 'none' }}
                                                id="missionHeroImageUpload"
                                            />
                                            <label
                                                htmlFor="missionHeroImageUpload"
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
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Status Badge
                                    </label>
                                    <input
                                        type="text"
                                        value={content.heroStatus}
                                        onChange={(e) => setContent({ ...content, heroStatus: e.target.value })}
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
                                        Title
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

                        {/* Core Values Section */}
                        <div style={{ padding: '32px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e5e5' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#1a1a1a' }}>
                                💎 Core Values Section
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Section Title
                                    </label>
                                    <input
                                        type="text"
                                        value={content.coreValuesTitle}
                                        onChange={(e) => setContent({ ...content, coreValuesTitle: e.target.value })}
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
                                        value={content.coreValuesSubtitle}
                                        onChange={(e) => setContent({ ...content, coreValuesSubtitle: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #d2d2d7',
                                            fontSize: '16px'
                                        }}
                                    />
                                </div>

                                {content.values.map((value, idx) => (
                                    <div key={idx} style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px', marginTop: '16px' }}>
                                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Value {idx + 1}</h3>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '12px' }}>
                                                <div>
                                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500' }}>
                                                        Emoji
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={value.number}
                                                        onChange={(e) => {
                                                            const newValues = [...content.values];
                                                            newValues[idx].number = e.target.value;
                                                            setContent({ ...content, values: newValues });
                                                        }}
                                                        style={{
                                                            width: '100%',
                                                            padding: '8px',
                                                            borderRadius: '6px',
                                                            border: '1px solid #d2d2d7',
                                                            fontSize: '14px'
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500' }}>
                                                        Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={value.title}
                                                        onChange={(e) => {
                                                            const newValues = [...content.values];
                                                            newValues[idx].title = e.target.value;
                                                            setContent({ ...content, values: newValues });
                                                        }}
                                                        style={{
                                                            width: '100%',
                                                            padding: '8px',
                                                            borderRadius: '6px',
                                                            border: '1px solid #d2d2d7',
                                                            fontSize: '14px'
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500' }}>
                                                    Description
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    value={value.description}
                                                    onChange={(e) => {
                                                        const newValues = [...content.values];
                                                        newValues[idx].description = e.target.value;
                                                        setContent({ ...content, values: newValues });
                                                    }}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px',
                                                        borderRadius: '6px',
                                                        border: '1px solid #d2d2d7',
                                                        fontSize: '14px',
                                                        fontFamily: 'inherit',
                                                        resize: 'vertical'
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500' }}>
                                                    Quote
                                                </label>
                                                <input
                                                    type="text"
                                                    value={value.quote}
                                                    onChange={(e) => {
                                                        const newValues = [...content.values];
                                                        newValues[idx].quote = e.target.value;
                                                        setContent({ ...content, values: newValues });
                                                    }}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px',
                                                        borderRadius: '6px',
                                                        border: '1px solid #d2d2d7',
                                                        fontSize: '14px'
                                                    }}
                                                />
                                            </div>

                                            <div>
                                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500' }}>
                                                    Color
                                                </label>
                                                <input
                                                    type="color"
                                                    value={value.color}
                                                    onChange={(e) => {
                                                        const newValues = [...content.values];
                                                        newValues[idx].color = e.target.value;
                                                        setContent({ ...content, values: newValues });
                                                    }}
                                                    style={{
                                                        width: '100px',
                                                        height: '40px',
                                                        borderRadius: '6px',
                                                        border: '1px solid #d2d2d7',
                                                        cursor: 'pointer'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* How We Work Section */}
                        <div style={{ padding: '32px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e5e5' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#1a1a1a' }}>
                                🔄 How We Work Section
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Section Title
                                    </label>
                                    <input
                                        type="text"
                                        value={content.howWeWorkTitle}
                                        onChange={(e) => setContent({ ...content, howWeWorkTitle: e.target.value })}
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
                                        value={content.howWeWorkSubtitle}
                                        onChange={(e) => setContent({ ...content, howWeWorkSubtitle: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #d2d2d7',
                                            fontSize: '16px'
                                        }}
                                    />
                                </div>

                                {content.howWeWorkPrinciples.map((principle, idx) => (
                                    <div key={idx} style={{ padding: '16px', background: '#f9f9f9', borderRadius: '8px' }}>
                                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Principle {idx + 1}</h3>
                                        <div>

                                            <div>
                                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500' }}>
                                                    Text
                                                </label>
                                                <input
                                                    type="text"
                                                    value={principle.text}
                                                    onChange={(e) => {
                                                        const newPrinciples = [...content.howWeWorkPrinciples];
                                                        newPrinciples[idx].text = e.target.value;
                                                        setContent({ ...content, howWeWorkPrinciples: newPrinciples });
                                                    }}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px',
                                                        borderRadius: '6px',
                                                        border: '1px solid #d2d2d7',
                                                        fontSize: '14px'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Closing Statement
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={content.howWeWorkClosing}
                                        onChange={(e) => setContent({ ...content, howWeWorkClosing: e.target.value })}
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

                        {/* What We Do Section */}
                        <div style={{ padding: '32px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e5e5' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#1a1a1a' }}>
                                ⚡ What We Do Section
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Section Title
                                    </label>
                                    <input
                                        type="text"
                                        value={content.whatWeDoTitle}
                                        onChange={(e) => setContent({ ...content, whatWeDoTitle: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #d2d2d7',
                                            fontSize: '16px'
                                        }}
                                    />
                                </div>

                                {content.services.map((service, idx) => (
                                    <div key={idx} style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
                                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Service {idx + 1}</h3>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <div>

                                                <div>
                                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500' }}>
                                                        Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={service.title}
                                                        onChange={(e) => {
                                                            const newServices = [...content.services];
                                                            newServices[idx].title = e.target.value;
                                                            setContent({ ...content, services: newServices });
                                                        }}
                                                        style={{
                                                            width: '100%',
                                                            padding: '8px',
                                                            borderRadius: '6px',
                                                            border: '1px solid #d2d2d7',
                                                            fontSize: '14px'
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500' }}>
                                                    Description
                                                </label>
                                                <textarea
                                                    rows={2}
                                                    value={service.description}
                                                    onChange={(e) => {
                                                        const newServices = [...content.services];
                                                        newServices[idx].description = e.target.value;
                                                        setContent({ ...content, services: newServices });
                                                    }}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px',
                                                        borderRadius: '6px',
                                                        border: '1px solid #d2d2d7',
                                                        fontSize: '14px',
                                                        fontFamily: 'inherit',
                                                        resize: 'vertical'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Who We Serve Section */}
                        <div style={{ padding: '32px', background: '#fff', borderRadius: '12px', border: '1px solid #e5e5e5' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#1a1a1a' }}>
                                👥 Who We Serve Section
                            </h2>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Section Title
                                    </label>
                                    <input
                                        type="text"
                                        value={content.whoWeServeTitle}
                                        onChange={(e) => setContent({ ...content, whoWeServeTitle: e.target.value })}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: '1px solid #d2d2d7',
                                            fontSize: '16px'
                                        }}
                                    />
                                </div>

                                {content.audiences.map((audience, idx) => (
                                    <div key={idx} style={{ padding: '16px', background: '#f9f9f9', borderRadius: '8px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '500' }}>
                                            Audience {idx + 1}
                                        </label>
                                        <input
                                            type="text"
                                            value={audience}
                                            onChange={(e) => {
                                                const newAudiences = [...content.audiences];
                                                newAudiences[idx] = e.target.value;
                                                setContent({ ...content, audiences: newAudiences });
                                            }}
                                            style={{
                                                width: '100%',
                                                padding: '8px',
                                                borderRadius: '6px',
                                                border: '1px solid #d2d2d7',
                                                fontSize: '14px'
                                            }}
                                        />
                                    </div>
                                ))}

                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
                                        Closing Statement
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={content.whoWeServeClosing}
                                        onChange={(e) => setContent({ ...content, whoWeServeClosing: e.target.value })}
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
                                        value={content.whoWeServeButtonText}
                                        onChange={(e) => setContent({ ...content, whoWeServeButtonText: e.target.value })}
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
