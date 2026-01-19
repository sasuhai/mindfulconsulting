'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import TrainingsGrid from '@/components/TrainingsGrid';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

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

export default function Home() {
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

  useEffect(() => {
    // Fetch content from Firebase
    const fetchContent = async () => {
      try {
        const docRef = doc(db, 'pages', 'home');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setContent(docSnap.data() as HomeContent);
        }
      } catch (error) {
        console.error('Error fetching home content:', error);
      }
    };

    fetchContent();

    // Trigger animations on mount
    const heroImage = document.getElementById('heroImage');
    const heroOverlay = document.getElementById('heroOverlay');
    const heroBackgroundText = document.getElementById('heroBackgroundText');
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const heroButton = document.getElementById('heroButton');
    const heroLogos = document.getElementById('heroLogos');

    setTimeout(() => {
      if (heroImage) {
        heroImage.style.opacity = '1';
        heroImage.style.transform = 'scale(1)';
        heroImage.style.filter = 'brightness(0.7) blur(0px)';
      }
      if (heroOverlay) heroOverlay.style.opacity = '1';
      if (heroBackgroundText) {
        heroBackgroundText.style.opacity = '1';
        heroBackgroundText.style.transform = 'scale(1)';
      }
    }, 100);

    setTimeout(() => {
      if (heroTitle) {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0) translateX(0)';
        heroTitle.style.filter = 'blur(0)';
      }
    }, 800);

    setTimeout(() => {
      if (heroSubtitle) {
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0) translateX(0)';
        heroSubtitle.style.filter = 'blur(0)';
      }
    }, 1200);

    setTimeout(() => {
      if (heroButton) {
        heroButton.style.opacity = '1';
        heroButton.style.transform = 'translateY(0)';
      }
    }, 1600);

    setTimeout(() => {
      if (heroLogos) {
        heroLogos.style.opacity = '1';
        heroLogos.style.transform = 'translateY(0)';
      }
    }, 2000);
  }, []);

  return (
    <div className="main-wrapper">
      {/* Hero Section - Fullscreen */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}>
        {/* Background Image */}
        <img
          id="heroImage"
          src="/hero.png"
          alt="Mindful Consulting Leadership"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 0,
            opacity: 0,
            transform: 'scale(1.25)',
            filter: 'brightness(0.56) blur(10px)',
            transition: 'all 2s ease-out'
          }}
        />

        {/* Overlay */}
        <div
          id="heroOverlay"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(250,250,250,0.5) 0%, rgba(250,250,250,0.3) 40%, rgba(250,250,250,0.1) 70%, rgba(250,250,250,0) 100%)',
            zIndex: 10,
            opacity: 0,
            transition: 'opacity 1.5s ease-out'
          }}
        />


        {/* Large Background Text */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 15,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          overflow: 'hidden',
          pointerEvents: 'none',
          paddingBottom: '5vh',
          paddingLeft: '2vw'
        }}>
          <div
            id="heroBackgroundText"
            style={{
              fontSize: 'clamp(120px, 20vw, 280px)',
              fontWeight: '900',
              color: 'rgba(255,255,255,0.15)',
              letterSpacing: '-0.05em',
              lineHeight: '0.9',
              textTransform: 'uppercase',
              userSelect: 'none',
              opacity: 0,
              transform: 'scale(1.2)',
              transition: 'all 2s ease-out'
            }}
          >
            MINDFUL
          </div>
        </div>

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 20,
          maxWidth: '1200px',
          padding: '0 clamp(20px, 5vw, 48px)',
          width: '100%',
          margin: '0 auto'
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 16px',
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,0.3)',
            marginBottom: '32px',
            fontSize: '12px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: '#fff',
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{ width: '8px', height: '8px', background: 'var(--color-accent)', borderRadius: '50%', marginRight: '8px' }}></span>
            {content.heroBadge}
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
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: '600',
              lineHeight: '1.1',
              letterSpacing: '-0.03em',
              marginBottom: '32px',
              color: '#fff',
              maxWidth: '900px'
            }}>
              {content.heroTitle}
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
              maxWidth: '700px',
              fontSize: 'clamp(18px, 2vw, 22px)',
              color: '#fff',
              marginBottom: '20px',
              lineHeight: '1.6'
            }}>
              {content.heroSubtitle1}
            </p>
            <p style={{
              maxWidth: '700px',
              fontSize: 'clamp(16px, 1.8vw, 18px)',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '48px',
              lineHeight: '1.6'
            }}>
              {content.heroSubtitle2}
            </p>
          </div>

          {/* Button */}
          <div
            id="heroButton"
            style={{
              marginBottom: '48px',
              opacity: 0,
              transform: 'translateY(40px)',
              transition: 'all 1s ease-out'
            }}
          >
            <Link href="/mission" className="btn btn-primary btn-icon-anim" style={{
              height: '56px',
              padding: '0 32px',
              fontSize: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#3b82f6',
              color: '#fff'
            }}>
              {content.heroButtonText} <span className="icon-arrow">&rarr;</span>
            </Link>
          </div>

          {/* HRDCorp Certification Logos */}
          <div
            id="heroLogos"
            style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              flexWrap: 'wrap',
              opacity: 0,
              transform: 'translateY(40px)',
              transition: 'all 1s ease-out'
            }}
          >
            <img src="/hrdcorp-claimable.png" alt="HRDCorp Claimable" style={{ height: '64px', width: 'auto' }} />
            <img src="/hrdcorp-registered.png" alt="HRDCorp Registered Training Provider" style={{ height: '64px', width: 'auto' }} />
          </div>
        </div>
      </section>

      {/* Trust Indicators / Industries */}
      <section className="section" style={{ paddingTop: '80px', paddingBottom: '80px', textAlign: 'center' }}>
        <div className="container">
          <p className="text-sm font-medium text-secondary mb-8 trust-text" style={{ color: 'var(--color-text-secondary)', marginBottom: '48px' }}>
            {content.trustIndicatorsText}
          </p>
          <div className="industry-cards-container">
            <div className="industry-card">
              <img src="/industry-oil-gas.png" alt="Oil & Gas Industry" />
              <div className="industry-card-label">Oil & Gas</div>
            </div>
            <div className="industry-card">
              <img src="/industry-finance.png" alt="Finance Industry" />
              <div className="industry-card-label">Finance</div>
            </div>
            <div className="industry-card">
              <img src="/industry-manufacturing.png" alt="Manufacturing Industry" />
              <div className="industry-card-label">Manufacturing</div>
            </div>
            <div className="industry-card">
              <img src="/industry-healthcare.png" alt="Healthcare Industry" />
              <div className="industry-card-label">Healthcare</div>
            </div>
            <div className="industry-card">
              <img src="/industry-education.png" alt="Education Industry" />
              <div className="industry-card-label">Education</div>
            </div>
            <div className="industry-card">
              <img src="/industry-technology.png" alt="Technology Industry" />
              <div className="industry-card-label">Technology</div>
            </div>
            <div className="industry-card">
              <img src="/industry-public-sector.png" alt="Public Sector" />
              <div className="industry-card-label">Public Sector</div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section className="section bg-surface" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container">
          <div className="text-center mb-16" style={{ marginBottom: '64px' }}>
            <h2 className="heading-1 mb-4">{content.trainingProgramsTitle}</h2>
            <p className="body-large">{content.trainingProgramsSubtitle}</p>
          </div>

          <TrainingsGrid />
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #f1f5f9 100%)',
        padding: '120px 0'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {/* Title */}
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '24px',
            color: '#1e293b',
            letterSpacing: '-0.02em',
            lineHeight: '1.2'
          }}>
            {content.videoTitle}
          </h2>

          {/* Video Container */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '900px',
            margin: '0 auto 40px',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
            background: '#000'
          }}>
            {/* 16:9 Aspect Ratio Container */}
            <div style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: 0,
              overflow: 'hidden'
            }}>
              <iframe
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
                src={`https://www.youtube.com/embed/${content.videoUrl}?autoplay=1&loop=1&playlist=${content.videoUrl}&mute=1&controls=1&modestbranding=1&rel=0`}
                title={content.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>


          {/* Description */}
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: 'clamp(16px, 2vw, 18px)',
              lineHeight: '1.8',
              color: '#475569',
              marginBottom: '0'
            }}>
              {content.videoDescription}
              <br />
              <span style={{
                fontWeight: '600',
                color: '#1e293b',
                fontStyle: 'italic',
                marginTop: '12px',
                display: 'inline-block'
              }}>
                {content.videoClosing}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section text-center" style={{ position: 'relative', overflow: 'hidden', padding: '160px 0' }}>
        {/* Background Image & Overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -2 }}>
          <img src="/cta_bg.png" alt="Malaysian Leadership Community" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="cta-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: -1 }}></div>

        <div className="container">
          <h2 className="heading-1 mb-6" style={{ marginBottom: '24px', color: '#ffffff' }}>{content.ctaTitle}</h2>
          <p className="body-large mb-8" style={{ marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px', color: 'rgba(255,255,255,0.9)' }}>
            {content.ctaDescription}
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ background: '#ffffff', color: '#000000' }}>
            {content.ctaButtonText}
          </Link>
        </div>
      </section>
    </div>
  );
}
