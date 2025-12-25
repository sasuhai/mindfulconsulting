'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function AboutPage() {
    useEffect(() => {
        // Page load animations
        const heroImage = document.getElementById('heroImage');
        const heroOverlay = document.getElementById('heroOverlay');
        const heroStatus = document.getElementById('heroStatus');
        const heroTitle = document.getElementById('heroTitle');
        const heroSubtitle = document.getElementById('heroSubtitle');
        const heroButton = document.getElementById('heroButton');
        const heroText = document.getElementById('heroText');

        setTimeout(() => {
            if (heroImage) {
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'scale(1)';
                heroImage.style.filter = 'brightness(0.56) blur(0px)';
            }
        }, 100);

        setTimeout(() => { if (heroOverlay) heroOverlay.style.opacity = '1'; }, 300);
        setTimeout(() => {
            if (heroStatus) {
                heroStatus.style.opacity = '1';
                heroStatus.style.transform = 'translateY(0) translateX(0)';
                heroStatus.style.filter = 'blur(0px)';
            }
        }, 1000);
        setTimeout(() => {
            if (heroTitle) {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0) translateX(0)';
                heroTitle.style.filter = 'blur(0px)';
            }
        }, 1200);
        setTimeout(() => {
            if (heroSubtitle) {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0) translateX(0)';
                heroSubtitle.style.filter = 'blur(0px)';
            }
        }, 1400);
        setTimeout(() => {
            if (heroButton) {
                heroButton.style.opacity = '1';
                heroButton.style.transform = 'translateY(0) translateX(0)';
                heroButton.style.filter = 'blur(0px)';
            }
        }, 1600);
        setTimeout(() => {
            if (heroText) {
                heroText.style.opacity = '1';
                heroText.style.transform = 'translateY(0)';
                heroText.style.filter = 'blur(0px)';
            }
        }, 1800);

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target as HTMLElement;
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0) translateX(0) scale(1)';
                    target.style.filter = 'blur(0px)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.parallax-element').forEach(el => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: '#09090b', color: '#fafafa', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif', overflowX: 'hidden' }}>
            {/* HERO SECTION */}
            <section style={{ position: 'relative', minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                    id="heroImage"
                    src="/about-hero.png"
                    alt="Mindful Consulting"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'left center',
                        zIndex: 0,
                        opacity: 0,
                        transform: 'scale(1.25)',
                        filter: 'brightness(0.56) blur(10px)',
                        transition: 'all 2s ease-out'
                    }}
                />
                <div
                    id="heroOverlay"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom left, rgba(9,9,11,0.8), rgba(9,9,11,0.6), rgba(9,9,11,0.9))',
                        zIndex: 10,
                        opacity: 0,
                        transition: 'opacity 1.5s ease-out'
                    }}
                />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 20, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '20vh 24px 30vh' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'center', textAlign: 'left' }}>
                        {/* Status Badge */}
                        <div
                            id="heroStatus"
                            style={{
                                opacity: 0,
                                transform: 'translateY(48px) translateX(-20px)',
                                filter: 'blur(10px)',
                                transition: 'all 1.2s ease-out',
                                transitionDelay: '1000ms'
                            }}
                        >
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '4px 16px',
                                background: 'rgba(39,39,42,0.5)',
                                border: '1px solid rgba(82,82,91,0.4)',
                                borderRadius: '999px',
                                fontSize: '14px',
                                marginBottom: '24px',
                                backdropFilter: 'blur(10px)',
                                fontWeight: '500'
                            }}>
                                <span style={{ width: '8px', height: '8px', background: '#d4d4d8', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
                                Leadership Development Experts
                            </span>
                        </div>

                        {/* Title */}
                        <div
                            id="heroTitle"
                            style={{
                                opacity: 0,
                                transform: 'translateY(64px) translateX(-30px)',
                                filter: 'blur(10px)',
                                transition: 'all 1.4s ease-out',
                                transitionDelay: '1200ms'
                            }}
                        >
                            <h1 style={{
                                fontSize: 'clamp(36px, 6vw, 60px)',
                                fontWeight: '600',
                                lineHeight: '1.2',
                                letterSpacing: '-0.035em',
                                marginBottom: '24px',
                                color: '#fff'
                            }}>
                                Our Services
                            </h1>
                        </div>

                        {/* Subtitle */}
                        <div
                            id="heroSubtitle"
                            style={{
                                opacity: 0,
                                transform: 'translateY(80px) translateX(-40px)',
                                filter: 'blur(10px)',
                                transition: 'all 1.4s ease-out',
                                transitionDelay: '1400ms'
                            }}
                        >
                            <p style={{
                                maxWidth: '800px',
                                fontSize: 'clamp(16px, 2vw, 18px)',
                                color: '#d4d4d8',
                                marginBottom: '32px',
                                lineHeight: '1.6'
                            }}>
                                At Mindful Consulting, we create safe, thoughtful spaces where leaders can pause, reflect, and move forward with presence—supporting growth that is both human and sustainable.
                            </p>

                            <h2 style={{
                                fontSize: 'clamp(24px, 3vw, 32px)',
                                fontWeight: '600',
                                color: '#fff',
                                marginBottom: '16px',
                                marginTop: '40px'
                            }}>
                                Workshops
                            </h2>
                            <p style={{
                                maxWidth: '800px',
                                fontSize: 'clamp(15px, 1.8vw, 17px)',
                                color: '#a1a1aa',
                                marginBottom: '20px',
                                lineHeight: '1.6'
                            }}>
                                Designed to be interactive, reflective, and immediately applicable:
                            </p>
                            <ul style={{
                                maxWidth: '800px',
                                fontSize: 'clamp(15px, 1.8vw, 17px)',
                                color: '#d4d4d8',
                                marginBottom: '32px',
                                lineHeight: '1.8',
                                paddingLeft: '20px'
                            }}>
                                <li style={{ marginBottom: '12px' }}><strong style={{ color: '#fff' }}>Leadership Essentials</strong> – Building self-awareness, trust, and influence</li>
                                <li style={{ marginBottom: '12px' }}><strong style={{ color: '#fff' }}>Leading Business Challenges</strong> – Navigating uncertainty, change, and complexity</li>
                                <li style={{ marginBottom: '12px' }}><strong style={{ color: '#fff' }}>Design Thinking</strong> – Human-centered problem solving and innovation</li>
                                <li style={{ marginBottom: '12px' }}><strong style={{ color: '#fff' }}>Difficult Dialogue</strong> – Leading courageous and meaningful conversations</li>
                                <li style={{ marginBottom: '12px' }}><strong style={{ color: '#fff' }}>Synergy 101</strong> – Strengthening collaboration and team effectiveness</li>
                            </ul>

                            <h2 style={{
                                fontSize: 'clamp(24px, 3vw, 32px)',
                                fontWeight: '600',
                                color: '#fff',
                                marginBottom: '16px',
                                marginTop: '32px'
                            }}>
                                Coaching
                            </h2>
                            <ul style={{
                                maxWidth: '800px',
                                fontSize: 'clamp(15px, 1.8vw, 17px)',
                                color: '#d4d4d8',
                                marginBottom: '32px',
                                lineHeight: '1.8',
                                paddingLeft: '20px'
                            }}>
                                <li style={{ marginBottom: '12px' }}><strong style={{ color: '#fff' }}>Individual Coaching</strong> – Supporting leaders to reflect, grow, and lead with intention</li>
                                <li style={{ marginBottom: '12px' }}><strong style={{ color: '#fff' }}>Group Coaching</strong> – Creating shared learning, alignment, and collective accountability</li>
                            </ul>
                        </div>
                        {/* Button */}
                        <div
                            id="heroButton"
                            style={{
                                opacity: 0,
                                transform: 'translateY(96px) translateX(-50px)',
                                filter: 'blur(10px)',
                                transition: 'all 1.4s ease-out',
                                transitionDelay: '1600ms'
                            }}
                        >
                            <Link
                                href="/contact"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    background: '#3b82f6',
                                    color: '#fff',
                                    fontWeight: '500',
                                    borderRadius: '999px',
                                    padding: '8px 24px 8px 8px',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                                    border: '1px solid rgba(59,130,246,0.3)',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
                                onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
                            >
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.1)'
                                }}>
                                    →
                                </span>
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Large Text */}
                <div
                    id="heroText"
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 10,
                        pointerEvents: 'none',
                        userSelect: 'none',
                        overflow: 'hidden',
                        opacity: 0,
                        transform: 'translateY(80px)',
                        filter: 'blur(40px)',
                        transition: 'all 2s ease-out',
                        transitionDelay: '1800ms'
                    }}
                >
                    <h2 style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '24vw',
                        lineHeight: 1,
                        letterSpacing: '-0.045em',
                        color: 'rgba(113,113,122,0.11)',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                        width: '100vw',
                        textAlign: 'center'
                    }}>
                        Mindful
                    </h2>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section style={{ position: 'relative', background: '#09090b', borderTop: '1px solid rgba(39,39,42,0.5)', padding: '128px 0' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                    {/* Main Content - Two Column Layout */}
                    <div className="about-profile-grid">
                        {/* Left: Image with Floating Stats */}
                        <div className="parallax-element" style={{
                            opacity: 0,
                            transform: 'translateX(-60px) translateY(80px)',
                            filter: 'blur(8px)',
                            transition: 'all 1.2s ease-out'
                        }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{
                                    position: 'relative',
                                    overflow: 'hidden',
                                    borderRadius: '16px',
                                    height: '500px',
                                    border: '1px solid rgba(39,39,42,0.5)'
                                }}>
                                    <img
                                        src="/founder.jpg"
                                        alt="Fauzihain (Ogy)"
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'center'
                                        }}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to top, rgba(9,9,11,0.3), transparent)'
                                    }} />
                                </div>

                                {/* Floating Stats Cards */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-24px',
                                    right: '-24px',
                                    background: 'rgba(39,39,42,0.9)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(63,63,70,0.5)',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                                }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '28px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>24+</div>
                                        <div style={{ fontSize: '12px', color: '#a1a1aa' }}>Years Experience</div>
                                    </div>
                                </div>

                                <div style={{
                                    position: 'absolute',
                                    top: '-24px',
                                    left: '-24px',
                                    background: 'rgba(39,39,42,0.9)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(63,63,70,0.5)',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                                }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '28px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>500+</div>
                                        <div style={{ fontSize: '12px', color: '#a1a1aa' }}>Leaders Trained</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Content */}
                        <div className="parallax-element" style={{
                            opacity: 0,
                            transform: 'translateX(60px) translateY(80px)',
                            filter: 'blur(8px)',
                            transition: 'all 1.2s ease-out'
                        }}>
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '4px 16px',
                                background: 'rgba(39,39,42,0.4)',
                                border: '1px solid rgba(63,63,70,0.4)',
                                borderRadius: '999px',
                                fontSize: '14px',
                                marginBottom: '24px',
                                fontWeight: '500',
                                color: '#d4d4d8'
                            }}>
                                About Ogy
                            </span>

                            <h2 style={{
                                fontSize: 'clamp(32px, 5vw, 48px)',
                                fontWeight: '600',
                                letterSpacing: '-0.03em',
                                marginBottom: '32px',
                                color: '#fff'
                            }}>
                                Fauzihain (Ogy)
                            </h2>

                            <div style={{ marginBottom: '40px', color: '#d4d4d8', lineHeight: '1.6' }}>
                                <p style={{ fontSize: '18px', marginBottom: '24px', fontWeight: '500' }}>
                                    Leadership consultant, facilitator, and mentor with 24 years of corporate experience across the oil & gas, banking, and research sectors, and 8 years as a dedicated leadership consultant and facilitator.
                                </p>

                                <p style={{ marginBottom: '24px' }}>
                                    Ogy is driven by a simple yet powerful purpose: to help people know something they didn't know before and do something they could not do before. Her work focuses on enabling sustainable behavior change through self-awareness, practical application, and continuous personal growth.
                                </p>

                                <p style={{ marginBottom: '24px' }}>
                                    She is known for her highly experiential and learner-centered facilitation style. She emphasizes real-life application, reflective learning, and the sharing of lived experiences to ensure that participants translate insight into action.
                                </p>

                                <p>
                                    Her leadership perspective is shaped by both Eastern and Western influences, with international exposure spanning Houston, Dallas, Melbourne, Jakarta, Malaysia, Brunei, Turkmenistan, Iraq, and Egypt.
                                </p>
                            </div>

                            {/* CTA */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                                <Link
                                    href="/programs"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        background: 'var(--color-accent)',
                                        color: '#fff',
                                        fontWeight: '500',
                                        padding: '12px 24px',
                                        borderRadius: '999px',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                                    }}
                                >
                                    Explore Our Programs →
                                </Link>
                                <Link
                                    href="/contact"
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        background: '#27272a',
                                        color: '#fff',
                                        fontWeight: '500',
                                        padding: '12px 24px',
                                        borderRadius: '999px',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s',
                                        border: '1px solid rgba(63,63,70,0.3)'
                                    }}
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Credentials & Achievements Section */}
                    <div style={{ marginBottom: '48px' }}>
                        <h3 className="parallax-element" style={{
                            fontSize: '32px',
                            fontWeight: '600',
                            color: '#fff',
                            marginBottom: '32px',
                            textAlign: 'center',
                            opacity: 0,
                            transform: 'translateY(40px)',
                            filter: 'blur(8px)',
                            transition: 'all 1s ease-out'
                        }}>
                            Credentials & Expertise
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
                            {[
                                {
                                    icon: '📜',
                                    title: 'ICF-ACC Certified',
                                    description: 'International Coaching Federation - Associate Certified Coach',
                                    delay: '100ms'
                                },
                                {
                                    icon: '🎯',
                                    title: 'Since 2017',
                                    description: 'Leadership Consultant & Facilitator with proven track record',
                                    delay: '200ms'
                                },
                                {
                                    icon: '🏆',
                                    title: 'ExxonMobil Mentor of the Year',
                                    description: 'Recognized in 2010 for outstanding dedication to mentoring',
                                    delay: '300ms'
                                },
                                {
                                    icon: '🧘',
                                    title: 'Certified Yoga Teacher',
                                    description: 'Integrating mindfulness and well-being into leadership',
                                    delay: '400ms'
                                },
                                {
                                    icon: '🌏',
                                    title: 'Global Experience',
                                    description: 'International exposure across multiple continents',
                                    delay: '500ms'
                                },
                                {
                                    icon: '💼',
                                    title: '24+ Years Corporate',
                                    description: 'Oil & gas, banking, and research sectors expertise',
                                    delay: '600ms'
                                }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="parallax-element"
                                    style={{
                                        opacity: 0,
                                        transform: 'translateY(60px)',
                                        filter: 'blur(8px)',
                                        transition: 'all 1s ease-out',
                                        transitionDelay: item.delay,
                                        background: 'rgba(39,39,42,0.3)',
                                        border: '1px solid rgba(39,39,42,0.5)',
                                        borderRadius: '16px',
                                        padding: '24px',
                                        textAlign: 'center'
                                    }}
                                >
                                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>{item.icon}</div>
                                    <h4 style={{ fontSize: '18px', fontWeight: '600', color: '#fff', marginBottom: '8px' }}>
                                        {item.title}
                                    </h4>
                                    <p style={{ color: '#a1a1aa', lineHeight: '1.5', fontSize: '14px' }}>
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Focus Areas Section */}
                    <div>
                        <h3 className="parallax-element" style={{
                            fontSize: '32px',
                            fontWeight: '600',
                            color: '#fff',
                            marginBottom: '32px',
                            textAlign: 'center',
                            opacity: 0,
                            transform: 'translateY(40px)',
                            filter: 'blur(8px)',
                            transition: 'all 1s ease-out',
                            transitionDelay: '200ms'
                        }}>
                            Areas of Focus
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                            {[
                                {
                                    icon: '👥',
                                    title: 'Empowering Leaders',
                                    description: 'Developing mindful, authentic leaders who create psychological safety and inspire sustainable change.',
                                    delay: '300ms'
                                },
                                {
                                    icon: '🎤',
                                    title: 'Confident Communicators',
                                    description: 'Building public speaking capabilities and effective communication skills through experiential learning.',
                                    delay: '450ms'
                                },
                                {
                                    icon: '🌱',
                                    title: 'Whole-Person Growth',
                                    description: 'Fostering holistic development through self-awareness, mindfulness, and continuous personal evolution.',
                                    delay: '600ms'
                                }
                            ].map((area, index) => (
                                <div
                                    key={index}
                                    className="parallax-element"
                                    style={{
                                        opacity: 0,
                                        transform: 'translateY(80px)',
                                        filter: 'blur(8px)',
                                        transition: 'all 1s ease-out',
                                        transitionDelay: area.delay,
                                        background: 'linear-gradient(135deg, rgba(39,39,42,0.4) 0%, rgba(39,39,42,0.2) 100%)',
                                        border: '1px solid rgba(63,63,70,0.5)',
                                        borderRadius: '16px',
                                        padding: '32px'
                                    }}
                                >
                                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>{area.icon}</div>
                                    <h4 style={{ fontSize: '22px', fontWeight: '600', color: '#fff', marginBottom: '12px' }}>
                                        {area.title}
                                    </h4>
                                    <p style={{ color: '#d4d4d8', lineHeight: '1.6' }}>
                                        {area.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* QUOTE SECTION */}
            <section style={{ position: 'relative', background: '#09090b', borderTop: '1px solid rgba(39,39,42,0.5)', borderBottom: '1px solid rgba(39,39,42,0.5)', padding: '80px 0' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
                    <div
                        className="parallax-element"
                        style={{
                            position: 'relative',
                            opacity: 0,
                            transform: 'translateY(64px) scale(0.95)',
                            filter: 'blur(8px)',
                            transition: 'all 1.2s ease-out'
                        }}
                    >
                        <div style={{ position: 'absolute', left: '50%', top: 0, transform: 'translate(-50%, -24px)', fontSize: '128px', color: 'rgba(var(--color-accent-rgb), 0.2)', fontWeight: '700', lineHeight: 1 }}>"</div>
                        <blockquote style={{
                            fontSize: 'clamp(20px, 3vw, 28px)',
                            color: '#e4e4e7',
                            fontStyle: 'italic',
                            lineHeight: '1.6',
                            fontWeight: '500',
                            letterSpacing: '-0.02em',
                            paddingTop: '32px'
                        }}>
                            To help people know something they didn't know before and do something they could not do before.
                        </blockquote>
                        <div style={{ marginTop: '32px', color: '#a1a1aa' }}>
                            — Fauzihain (Ogy)
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
        </div>
    );
}
