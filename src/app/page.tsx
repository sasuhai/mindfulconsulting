import Link from 'next/link';
import TrainingsGrid from '@/components/TrainingsGrid';

export default function Home() {
  return (
    <div className="main-wrapper">
      {/* Hero Section */}
      <section className="section" style={{ paddingTop: '160px', paddingBottom: '120px', textAlign: 'left', overflow: 'hidden' }}>
        <div className="container grid-stack-mobile">
          {/* Left Content */}
          <div style={{ maxWidth: '700px' }}>
            <div className="fade-in-up hero-badge" style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 12px', borderRadius: '999px', border: '1px solid #e5e5e5', marginBottom: '32px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#555' }}>
              <span style={{ width: '8px', height: '8px', background: 'var(--color-accent)', borderRadius: '50%', marginRight: '8px' }}></span>
              Leadership Development
            </div>

            <h1 className="display-hero mb-6 fade-in-up delay-1 hero-heading" style={{ marginBottom: '32px', color: '#111' }}>
              Developing Mindful Leaders for Complex Organizations
            </h1>

            <p className="body-large mb-8 fade-in-up delay-2" style={{ marginBottom: '48px', fontSize: '20px', lineHeight: '1.6' }}>
              We help senior leaders and organizations navigate change with clarity, calm, and confidence through mindfulness-based leadership development.
            </p>

            <div className="flex items-center gap-4 fade-in-up delay-2" style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
              <Link href="/programs" className="btn btn-primary btn-icon-anim" style={{ height: '56px', padding: '0 32px', fontSize: '16px' }}>
                Start Journey <span className="icon-arrow">&rarr;</span>
              </Link>
            </div>

            {/* HRDCorp Certification Logos */}
            <div className="fade-in-up delay-3" style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <img src="/hrdcorp-claimable.png" alt="HRDCorp Claimable" style={{ height: '64px', width: 'auto' }} />
              <img src="/hrdcorp-registered.png" alt="HRDCorp Registered Training Provider" style={{ height: '64px', width: 'auto' }} />
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="fade-in-up delay-2" style={{ position: 'relative' }}>
            <div className="hero-image-wrapper">
              <img src="/hero.png" alt="Malaysian Corporate Leadership" style={{ width: '100%', height: 'auto', display: 'block' }} />
              {/* Optional overlay gradient if needed for text readability, but not needed here as image is on right */}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators / Industries */}
      <section className="section" style={{ paddingTop: '0', paddingBottom: '80px', textAlign: 'center' }}>
        <div className="container">
          <p className="text-sm font-medium text-secondary mb-8 trust-text" style={{ color: 'var(--color-text-secondary)', marginBottom: '48px' }}>
            TRUSTED BY LEADING INDUSTRIES
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
            <h2 className="heading-1 mb-4">Our Training Programs</h2>
            <p className="body-large">Tailored programs to elevate your organization's potential.</p>
          </div>

          <TrainingsGrid />
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
          <h2 className="heading-1 mb-6" style={{ marginBottom: '24px', color: '#ffffff' }}>Ready to transform your leadership?</h2>
          <p className="body-large mb-8" style={{ marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px', color: 'rgba(255,255,255,0.9)' }}>
            Join the hundreds of leaders who have elevated their impact with Mindful Consulting.
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ background: '#ffffff', color: '#000000' }}>
            Request a Proposal
          </Link>
        </div>
      </section>
    </div>
  );
}
