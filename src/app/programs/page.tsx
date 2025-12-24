import Link from 'next/link';

export default function ProgramsPage() {
    const programs = [
        {
            id: 'leadership-mastery',
            title: 'Strategic Leadership Mastery',
            category: 'Executive Leadership',
            duration: '3 Days',
            description: 'A comprehensive program for senior executives to refine their strategic thinking and leadership presence.',
        },
        {
            id: 'mindful-manager',
            title: 'The Mindful Manager',
            category: 'Management',
            duration: '2 Days',
            description: 'Equipping new and mid-level managers with emotional intelligence tools for better team management.',
        },
        {
            id: 'team-synergy',
            title: 'High-Performance Team Synergy',
            category: 'Team Effectiveness',
            duration: '1 Day Workshop',
            description: 'Unlock team potential by building trust, psychological safety, and effective communication channels.',
        },
        {
            id: 'change-navigators',
            title: 'Change Navigators',
            category: 'Transformation',
            duration: 'Virtual Series (4 Weeks)',
            description: 'Leading your organization through disruption and uncertainty with resilience.',
        }
    ];

    return (
        <div className="main-wrapper">
            <section className="section bg-surface text-center">
                <div className="container">
                    <h1 className="heading-1 mb-4">Our Training Programs</h1>
                    <p className="body-large" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        Transformative learning experiences designed for the modern leader.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
                        {programs.map((program) => (
                            <div key={program.id} style={{ border: '1px solid var(--color-border)', borderRadius: '18px', padding: '32px', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.2s' }} className="program-card">
                                <span style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: '600', marginBottom: '12px', display: 'block' }}>
                                    {program.category}
                                </span>
                                <h3 className="heading-2 mb-2" style={{ fontSize: '24px', marginBottom: '16px' }}>
                                    {program.title}
                                </h3>
                                <p className="body-text mb-4 " style={{ color: 'var(--color-text-secondary)', marginBottom: '24px', flexGrow: 1 }}>
                                    {program.description}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #eee', paddingTop: '24px' }}>
                                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{program.duration}</span>
                                    <Link href={`/programs/${program.id}`} style={{ fontWeight: '500', color: 'var(--color-accent)' }}>
                                        View Details &rarr;
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
