import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Insights & Thought Leadership',
    description: 'Perspectives on conscious leadership, mindfulness, and organizational change from our experts at Mindful Consulting.',
    keywords: ['leadership insights', 'mindfulness at work', 'conscious leadership articles', 'organizational development blog'],
};

export default function InsightsPage() {
    return (
        <div className="main-wrapper">
            <section className="section bg-surface text-center">
                <div className="container">
                    <h1 className="heading-1 mb-4">Insights & Thought Leadership</h1>
                    <p className="body-large" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        Perspectives on leadership, mindfulness, and organizational change.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <p className="text-center body-text text-secondary">Articles coming soon.</p>
                </div>
            </section>
        </div>
    );
}
