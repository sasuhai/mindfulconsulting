export default function IndustriesPage() {
    const industries = [
        'Financial Services',
        'Oil and Gas',
        'Manufacturing',
        'Healthcare',
        'Education',
        'Government & Public Sector',
        'Technology & Startups'
    ];

    return (
        <div className="main-wrapper">
            <section className="section bg-surface text-center">
                <div className="container">
                    <h1 className="heading-1 mb-4">Industries Served</h1>
                    <p className="body-large" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        Tailored leadership solutions for every sector.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '32px' }}>
                        {industries.map((ind, i) => (
                            <div key={i} style={{ padding: '32px', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
                                <h3 className="heading-2 mb-2" style={{ fontSize: '24px' }}>{ind}</h3>
                                <p className="body-text text-secondary">
                                    Specific challenges in {ind} require specific leadership approaches. We customize our modules to address the regulatory, operational, and cultural nuances of the {ind} sector.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
