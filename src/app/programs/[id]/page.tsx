import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ProgramDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Mock Data
    const programs: Record<string, any> = {
        'leadership-mastery': {
            title: 'Strategic Leadership Mastery',
            desc: 'Refining strategic thinking for the C-suite.',
            audience: 'Senior Executives, Directors, VPs',
            modules: ['Strategic Visioning', 'Executive Presence', 'Decision Making under Pressure']
        },
        'mindful-manager': {
            title: 'The Mindful Manager',
            desc: 'Emotional intelligence for modern management.',
            audience: 'New Managers, Team Leads',
            modules: ['Self-Awareness', 'Empathy in Action', 'Conflict Resolution']
        },
        'team-synergy': {
            title: 'High-Performance Team Synergy',
            desc: 'Building trust and psychological safety.',
            audience: 'Intact Teams, Project Squads',
            modules: ['Psychological Safety', 'Values Alignment', 'Collaborative Problem Solving']
        }
    };

    const program = programs[id];

    if (!program) {
        // In a real app we might return notFound() or show a generic fallback
        // using notFound() here:
        // notFound();
        // But for this demo let's just show a generic placeholder if ID not found
        return (
            <div className="main-wrapper">
                <section className="section text-center">
                    <div className="container">
                        <h1 className="heading-1">Program Not Found</h1>
                        <Link href="/programs" className="btn btn-secondary mt-4">Back to Programs</Link>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="main-wrapper">
            <section className="section bg-surface">
                <div className="container">
                    <Link href="/programs" style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '16px', display: 'inline-block' }}>&larr; Back to Programs</Link>
                    <h1 className="display-text mb-4" style={{ fontSize: '48px' }}>{program.title}</h1>
                    <p className="body-large" style={{ maxWidth: '700px' }}>{program.desc}</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="grid-2-col" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '64px' }}>
                        <div>
                            <h2 className="heading-2 mb-4">Program Overview</h2>
                            <p className="body-text mb-8">
                                This intensive program is designed to transform the way you lead. Through a blend of experiential learning, mindfulness practices, and strategic frameworks, you will gain the clarity and confidence needed to drive organizational success.
                            </p>

                            <h3 className="text-xl font-bold mb-4">What You Will Learn</h3>
                            <ul style={{ listStyle: 'disc', paddingLeft: '20px', marginBottom: '40px' }} className="space-y-2">
                                {program.modules && program.modules.map((mod: string, i: number) => (
                                    <li key={i} className="body-text">{mod}</li>
                                ))}
                                <li className="body-text">Action Planning for Impact</li>
                            </ul>
                        </div>

                        <div style={{ background: '#f5f5f7', padding: '32px', borderRadius: '18px', alignSelf: 'start' }}>
                            <h3 className="text-lg font-bold mb-4">Program Details</h3>
                            <div style={{ marginBottom: '24px' }}>
                                <p className="text-sm text-gray-500 font-semibold uppercase">Target Audience</p>
                                <p className="body-text">{program.audience}</p>
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <p className="text-sm text-gray-500 font-semibold uppercase">Format</p>
                                <p className="body-text">In-Person or Virtual</p>
                            </div>
                            <Link href="/register" className="btn btn-primary" style={{ width: '100%' }}>Register Now</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
