export default function ContactPage() {
    return (
        <div className="main-wrapper">
            <section className="section text-center bg-surface">
                <div className="container">
                    <h1 className="heading-1 mb-4">Get in Touch</h1>
                    <p className="body-large" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        Ready to start your leadership journey? We'd love to hear from you.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }}>
                        {/* Contact Form */}
                        <div>
                            <h2 className="heading-2 mb-6" style={{ marginBottom: '24px' }}>Send us a message</h2>
                            <form className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Name</label>
                                    <input type="text" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d2d2d7', fontSize: '16px' }} placeholder="Your name" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Email</label>
                                    <input type="email" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d2d2d7', fontSize: '16px' }} placeholder="your@email.com" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Message</label>
                                    <textarea rows={4} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d2d2d7', fontSize: '16px', fontFamily: 'inherit' }} placeholder="How can we help you?"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'start' }}>Send Message</button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div style={{ paddingLeft: '32px', borderLeft: '1px solid #eee' }}>
                            <div style={{ marginBottom: '40px' }}>
                                <h3 className="text-lg font-bold mb-2">Office</h3>
                                <p className="body-text text-secondary">
                                    Level 25, Menara 3 Petronas<br />
                                    Persiaran KLCC<br />
                                    50088 Kuala Lumpur
                                </p>
                            </div>
                            <div style={{ marginBottom: '40px' }}>
                                <h3 className="text-lg font-bold mb-2">Email</h3>
                                <p className="body-text text-secondary">hello@mindfulconsulting.com</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-2">Phone</h3>
                                <p className="body-text text-secondary">+60 3 1234 5678</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
