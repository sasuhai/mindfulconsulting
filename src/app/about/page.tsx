export default function AboutPage() {
    return (
        <div className="main-wrapper">
            <section className="section bg-surface text-center" style={{ paddingBottom: '60px' }}>
                <div className="container">
                    <h1 className="heading-1 mb-4">Our Story & Philosophy</h1>
                    <p className="body-large" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        Bridging the gap between mindfulness and modern corporate leadership.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
                        <div>
                            <h2 className="heading-2 mb-4" style={{ marginBottom: '24px' }}>Who We Are</h2>
                            <p className="body-text mb-4" style={{ marginBottom: '16px' }}>
                                Mindful Consulting was founded on the belief that true leadership starts from within. We combine decades of corporate experience with evidence-based mindfulness practices to help leaders navigate complexity with clarity.
                            </p>
                            <p className="body-text">
                                Our approach is human-centric, data-driven, and results-oriented. We don't just teach theory; we facilitate transformation.
                            </p>
                        </div>
                        <div style={{ background: '#eee', height: '400px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                            {/* Image Placeholder */}
                            Team Image Placeholder
                        </div>
                    </div>
                </div>
            </section>

            <section className="section text-center">
                <div className="container">
                    <h2 className="heading-2 mb-8">Our Values</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
                        <div style={{ padding: '32px', background: '#f5f5f7', borderRadius: '12px' }}>
                            <h3 className="text-xl font-bold mb-2">Integrity</h3>
                            <p className="text-sm text-gray-600">We walk the talk and lead by example.</p>
                        </div>
                        <div style={{ padding: '32px', background: '#f5f5f7', borderRadius: '12px' }}>
                            <h3 className="text-xl font-bold mb-2">Empathy</h3>
                            <p className="text-sm text-gray-600">Understanding the human behind the role.</p>
                        </div>
                        <div style={{ padding: '32px', background: '#f5f5f7', borderRadius: '12px' }}>
                            <h3 className="text-xl font-bold mb-2">Excellence</h3>
                            <p className="text-sm text-gray-600">Delivering world-class quality in everything we do.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
