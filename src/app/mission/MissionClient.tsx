'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

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

const defaultContent: MissionContent = {
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
        { icon: '', text: 'We listen first — deeply and without judgment' },
        { icon: '', text: 'We respect each person\'s pace, readiness, and context' },
        { icon: '', text: 'We co-create paths forward rather than impose solutions' },
        { icon: '', text: 'We balance reflection with practical action' }
    ],
    howWeWorkClosing: 'Our approach honours the belief that meaningful growth unfolds naturally when the right conditions are present.',
    whatWeDoTitle: 'What We Do',
    services: [
        {
            icon: '',
            title: 'Leadership Coaching',
            description: 'One-to-one coaching that supports leaders in gaining clarity, strengthening presence, and leading with authenticity and purpose.'
        },
        {
            icon: '',
            title: 'Executive & Team Development',
            description: 'Facilitated conversations and programs that build trust, alignment, and shared responsibility within leadership teams.'
        },
        {
            icon: '',
            title: 'Mindful Leadership Workshops',
            description: 'Interactive sessions designed to cultivate awareness, communication, and sustainable leadership practices.'
        },
        {
            icon: '',
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
};

export default function MissionPage() {
    const router = useRouter();
    const [scrollY, setScrollY] = useState(0);
    const [content, setContent] = useState<MissionContent>(defaultContent);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        // Fetch content from Firebase
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

        fetchContent();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Trigger animations after content loads
    useEffect(() => {
        if (loading) return;

        const heroImage = document.getElementById('missionHeroImage');
        const heroOverlay = document.getElementById('missionHeroOverlay');
        const heroStatus = document.getElementById('missionHeroStatus');
        const heroTitle = document.getElementById('missionHeroTitle');
        const heroSubtitle = document.getElementById('missionHeroSubtitle');
        const heroButton = document.getElementById('missionHeroButton');

        setTimeout(() => {
            if (heroImage) {
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'scale(1)';
                heroImage.style.filter = 'brightness(0.9) blur(0px)';
            }
        }, 100);

        setTimeout(() => { if (heroOverlay) heroOverlay.style.opacity = '1'; }, 300);
        setTimeout(() => {
            if (heroStatus) {
                heroStatus.style.opacity = '1';
                heroStatus.style.transform = 'translateY(0)';
                heroStatus.style.filter = 'blur(0px)';
            }
        }, 800);
        setTimeout(() => {
            if (heroTitle) {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
                heroTitle.style.filter = 'blur(0px)';
            }
        }, 1000);
        setTimeout(() => {
            if (heroSubtitle) {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
                heroSubtitle.style.filter = 'blur(0px)';
            }
        }, 1200);
        setTimeout(() => {
            if (heroButton) {
                heroButton.style.opacity = '1';
                heroButton.style.transform = 'translateY(0)';
                heroButton.style.filter = 'blur(0px)';
            }
        }, 1400);
    }, [loading]);

    const accentColor = '#7a8a6f';

    if (loading) {
        return (
            <div className="main-wrapper">
                <section className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
                        <h3>Loading...</h3>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="main-wrapper">
            {/* Hero Section with Photo Background */}
            <section style={{
                position: 'relative',
                minHeight: '85vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                color: '#fff'
            }}>
                {/* Background Image with zoom animation */}
                <img
                    id="missionHeroImage"
                    src="/mission-hero.png"
                    alt="Mission"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        zIndex: 0,
                        opacity: 0,
                        transform: 'scale(1.1)',
                        filter: 'brightness(0.9) blur(10px)',
                        transition: 'all 2s ease-out'
                    }}
                />

                {/* Gradient Overlay for better text contrast */}
                <div
                    id="missionHeroOverlay"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(135deg, ${accentColor}88 0%, #5a6a4f88 100%)`,
                        zIndex: 1,
                        opacity: 0,
                        transition: 'opacity 1.5s ease-out'
                    }}
                />

                <div className="container" style={{ maxWidth: '900px', textAlign: 'center', position: 'relative', zIndex: 10, padding: '0 24px' }}>
                    <div
                        id="missionHeroStatus"
                        style={{
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
                            marginBottom: '32px',
                            opacity: 0,
                            transform: 'translateY(30px)',
                            filter: 'blur(10px)',
                            transition: 'all 1.2s ease-out'
                        }}
                    >
                        {content.heroStatus}
                    </div>

                    <h1
                        id="missionHeroTitle"
                        style={{
                            fontSize: 'clamp(36px, 5vw, 56px)',
                            fontWeight: '600',
                            lineHeight: '1.3',
                            marginBottom: '32px',
                            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                            color: '#fff',
                            opacity: 0,
                            transform: 'translateY(40px)',
                            filter: 'blur(10px)',
                            transition: 'all 1.4s ease-out'
                        }}
                    >
                        {content.heroTitle}
                    </h1>

                    <p
                        id="missionHeroSubtitle"
                        style={{
                            fontSize: 'clamp(18px, 2.5vw, 24px)',
                            lineHeight: '1.7',
                            opacity: 0,
                            fontWeight: '300',
                            maxWidth: '800px',
                            margin: '0 auto',
                            transform: 'translateY(50px)',
                            filter: 'blur(10px)',
                            transition: 'all 1.4s ease-out'
                        }}
                    >
                        {content.heroSubtitle}
                    </p>

                    <div
                        id="missionHeroButton"
                        style={{
                            marginTop: '48px',
                            opacity: 0,
                            transform: 'translateY(60px)',
                            filter: 'blur(10px)',
                            transition: 'all 1.4s ease-out'
                        }}
                    >
                        <a
                            href="/contact"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '16px 40px',
                                background: '#3b82f6',
                                color: '#fff',
                                borderRadius: '12px',
                                fontWeight: '600',
                                fontSize: '16px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)';
                                e.currentTarget.style.background = '#2563eb';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)';
                                e.currentTarget.style.background = '#3b82f6';
                            }}
                        >
                            {content.heroButtonText}
                        </a>
                    </div>
                </div>
            </section>

            {/* Core Values Section */}
            <section style={{ padding: '120px 24px', background: '#fff' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 style={{
                            fontSize: 'clamp(32px, 4vw, 48px)',
                            fontWeight: '300',
                            marginBottom: '16px',
                            color: '#1a1a1a',
                            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
                        }}>
                            {content.coreValuesTitle}
                        </h2>
                        <p style={{ fontSize: '18px', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
                            {content.coreValuesSubtitle}
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '32px' }}>
                        {content.values.map((value, idx) => (
                            <ValueCard key={idx} value={value} index={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* How We Work Section */}
            <section style={{
                padding: '120px 24px',
                background: 'linear-gradient(135deg, #f8f9f7 0%, #ffffff 100%)'
            }}>
                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '64px' }}>

                        <h2 style={{
                            fontSize: 'clamp(32px, 4vw, 48px)',
                            fontWeight: '300',
                            marginBottom: '24px',
                            color: '#1a1a1a',
                            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
                        }}>
                            {content.howWeWorkTitle}
                        </h2>
                        <p style={{
                            fontSize: '20px',
                            color: '#666',
                            fontStyle: 'italic',
                            marginBottom: '48px'
                        }}>
                            {content.howWeWorkSubtitle}
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '24px' }}>
                        {content.howWeWorkPrinciples.map((item, idx) => (
                            <PrincipleCard key={idx} item={item} index={idx} />
                        ))}
                    </div>

                    <p style={{
                        textAlign: 'center',
                        fontSize: '18px',
                        color: '#666',
                        marginTop: '64px',
                        lineHeight: '1.8',
                        fontStyle: 'italic',
                        maxWidth: '700px',
                        margin: '64px auto 0'
                    }}>
                        {content.howWeWorkClosing}
                    </p>
                </div>
            </section>

            {/* What We Do Section */}
            <section style={{ padding: '120px 24px', background: '#fff' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 style={{
                            fontSize: 'clamp(32px, 4vw, 48px)',
                            fontWeight: '300',
                            marginBottom: '16px',
                            color: '#1a1a1a',
                            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
                        }}>
                            {content.whatWeDoTitle}
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '24px' }}>
                        {content.services.map((service, idx) => (
                            <ServiceCard key={idx} service={service} index={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Who We Serve Section */}
            <section style={{
                padding: '120px 24px',
                background: `linear-gradient(135deg, ${accentColor} 0%, #5a6a4f 100%)`,
                color: '#fff',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.1,
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '48px 48px'
                }} />

                <div className="container" style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                    <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                        <h2 style={{
                            fontSize: 'clamp(32px, 4vw, 48px)',
                            fontWeight: '300',
                            marginBottom: '24px',
                            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
                        }}>
                            {content.whoWeServeTitle}
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '64px' }}>
                        {content.audiences.map((audience, idx) => (
                            <div
                                key={idx}
                                style={{
                                    padding: '24px',
                                    background: 'rgba(255,255,255,0.15)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    borderRadius: '12px',
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease',
                                    animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <div style={{ fontSize: '32px', marginBottom: '12px' }}></div>
                                <p style={{ fontSize: '15px', lineHeight: '1.6', margin: 0 }}>{audience}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{
                        textAlign: 'center',
                        padding: '48px 32px',
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '16px'
                    }}>
                        <p style={{
                            fontSize: '20px',
                            lineHeight: '1.7',
                            margin: 0,
                            fontStyle: 'italic'
                        }}>
                            {content.whoWeServeClosing}
                        </p>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '48px' }}>
                        <a
                            href="/contact"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '18px 48px',
                                background: '#fff',
                                color: accentColor,
                                borderRadius: '12px',
                                fontWeight: '600',
                                fontSize: '18px',
                                textDecoration: 'none',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.3)';
                            }}
                        >
                            {content.whoWeServeButtonText}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

function ValueCard({ value, index }: { value: any; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{
                padding: '40px',
                background: '#fff',
                border: `2px solid ${isHovered ? value.color : '#e5e5e5'}`,
                borderRadius: '20px',
                transition: 'all 0.4s ease',
                transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: isHovered ? '0 20px 60px rgba(0,0,0,0.15)' : '0 4px 20px rgba(0,0,0,0.05)',
                animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>{value.number}</div>
            <h3 style={{
                fontSize: '28px',
                fontWeight: '600',
                marginBottom: '16px',
                color: value.color,
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
            }}>
                {value.title}
            </h3>
            <p style={{
                fontSize: '15px',
                lineHeight: '1.7',
                color: '#666',
                marginBottom: '24px'
            }}>
                {value.description}
            </p>
            <div style={{
                padding: '16px 20px',
                background: `${value.color}15`,
                borderLeft: `4px solid ${value.color}`,
                borderRadius: '8px'
            }}>
                <p style={{
                    fontSize: '14px',
                    fontStyle: 'italic',
                    color: '#444',
                    margin: 0
                }}>
                    "{value.quote}"
                </p>
            </div>
        </div>
    );
}

function PrincipleCard({ item, index }: { item: any; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{
                padding: '32px 24px',
                background: '#fff',
                borderRadius: '16px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: isHovered ? '0 12px 30px rgba(0,0,0,0.1)' : '0 4px 15px rgba(0,0,0,0.05)',
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444', margin: 0 }}>
                {item.text}
            </p>
        </div>
    );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            style={{
                padding: '40px 32px',
                background: isHovered ? 'linear-gradient(135deg, #7a8a6f 0%, #5a6a4f 100%)' : '#fafafa',
                borderRadius: '16px',
                transition: 'all 0.4s ease',
                transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: isHovered ? '0 20px 50px rgba(122,138,111,0.3)' : 'none',
                color: isHovered ? '#fff' : '#1a1a1a',
                animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            <h3 style={{
                fontSize: '22px',
                fontWeight: '600',
                marginBottom: '16px',
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
            }}>
                {service.title}
            </h3>
            <p style={{
                fontSize: '15px',
                lineHeight: '1.7',
                opacity: isHovered ? 0.95 : 0.8,
                margin: 0
            }}>
                {service.description}
            </p>
        </div>
    );
}
