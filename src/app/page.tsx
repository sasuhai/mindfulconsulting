import Link from 'next/link';

export default function Home() {
  return (
    <div className="main-wrapper">
      {/* Hero Section */}
      <section className="section" style={{ paddingTop: '160px', paddingBottom: '120px', textAlign: 'left', overflow: 'hidden' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
          {/* Left Content */}
          <div style={{ maxWidth: '700px' }}>
            <div className="fade-in-up" style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 12px', borderRadius: '999px', border: '1px solid #e5e5e5', marginBottom: '32px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#555' }}>
              <span style={{ width: '8px', height: '8px', background: 'var(--color-accent)', borderRadius: '50%', marginRight: '8px' }}></span>
              Leadership Development
            </div>

            <h1 className="display-hero mb-6 fade-in-up delay-1" style={{ marginBottom: '32px', color: '#111' }}>
              Developing Mindful Leaders for Complex Organizations
            </h1>

            <p className="body-large mb-8 fade-in-up delay-2" style={{ marginBottom: '48px', fontSize: '20px', lineHeight: '1.6' }}>
              We help senior leaders and organizations navigate change with clarity, calm, and confidence through mindfulness-based leadership development.
            </p>

            <div className="flex items-center gap-4 fade-in-up delay-2" style={{ display: 'flex', gap: '16px' }}>
              <Link href="/programs" className="btn btn-primary btn-icon-anim" style={{ height: '56px', padding: '0 32px', fontSize: '16px' }}>
                Start Journey <span className="icon-arrow">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="fade-in-up delay-2" style={{ position: 'relative' }}>
            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 24px 48px rgba(0,0,0,0.12)', border: '8px solid #ffffff' }}>
              <img src="/hero.png" alt="Malaysian Corporate Leadership" style={{ width: '100%', height: 'auto', display: 'block' }} />
              {/* Optional overlay gradient if needed for text readability, but not needed here as image is on right */}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators / Logos */}
      <section className="section" style={{ paddingTop: '0', paddingBottom: '80px', textAlign: 'center' }}>
        <div className="container">
          <p className="text-sm font-medium text-secondary mb-8" style={{ color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
            TRUSTED BY LEADING ORGANIZATIONS
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', opacity: 0.6, flexWrap: 'wrap' }}>
            {/* Placeholders for logos */}
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#888' }}>Petronas</span>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#888' }}>Maybank</span>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#888' }}>Khazanah</span>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#888' }}>Sime Darby</span>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#888' }}>TNB</span>
          </div>
        </div>
      </section>

      {/* Services / Offerings Grid */}
      <section className="section bg-surface" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="container">
          <div className="text-center mb-16" style={{ marginBottom: '64px' }}>
            <h2 className="heading-1 mb-4">Holistic Leadership Solutions</h2>
            <p className="body-large">Tailored programs to elevate your organization's potential.</p>
          </div>

          <div className="grid-3-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {[
              { title: 'Executive Leadership', desc: 'Strategic thinking and presence for C-suite and senior executives.' },
              { title: 'Team Effectiveness', desc: 'Building high-trust, high-performance teams through psychological safety.' },
              { title: 'Mindful Transformation', desc: 'Navigating organizational change with resilience and emotional intelligence.' },
              { title: 'Culture & Values', desc: 'Embedding core values to drive behavior and sustainable growth.' },
              { title: 'Emotional Intelligence', desc: 'Enhancing self-awareness and empathy for better decision making.' },
              { title: 'Custom Solutions', desc: 'Bespoke programs designed to address your specific business challenges.' },
            ].map((item, index) => (
              <div key={index} style={{ background: '#fff', padding: '40px', borderRadius: '18px', boxShadow: 'var(--shadow-sm)' }}>
                <h3 className="heading-2 mb-2" style={{ fontSize: '24px', marginBottom: '16px' }}>{item.title}</h3>
                <p className="body-text text-secondary" style={{ color: 'var(--color-text-secondary)', marginBottom: '24px' }}>{item.desc}</p>
                <Link href={`/programs`} className="btn-secondary" style={{ padding: 0 }}>Learn more &rarr;</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section text-center" style={{ position: 'relative', overflow: 'hidden', padding: '160px 0' }}>
        {/* Background Image & Overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -2 }}>
          <img src="/cta_bg.png" alt="Malaysian Leadership Community" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: -1 }}></div>

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
