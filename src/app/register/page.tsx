export default function RegisterPage() {
    return (
        <div className="main-wrapper">
            <section className="section bg-surface text-center">
                <div className="container">
                    <h1 className="heading-1 mb-4">Register for a Program</h1>
                    <p className="body-large" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        Secure your spot in our upcoming leadership development sessions.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ maxWidth: '600px' }}>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Select Program</label>
                            <select style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d2d2d7', fontSize: '16px', background: 'white' }}>
                                <option>Strategic Leadership Mastery</option>
                                <option>The Mindful Manager</option>
                                <option>High-Performance Team Synergy</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Full Name</label>
                            <input type="text" className="w-full p-3 rounded-lg border border-gray-300" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d2d2d7', fontSize: '16px' }} />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email Address</label>
                            <input type="email" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d2d2d7', fontSize: '16px' }} />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Complete Registration</button>
                    </form>
                </div>
            </section>
        </div>
    );
}
