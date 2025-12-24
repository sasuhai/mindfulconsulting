import TrainingsGrid from '@/components/TrainingsGrid';

export default function ProgramsPage() {
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
                    <TrainingsGrid />
                </div>
            </section>
        </div>
    );
}
