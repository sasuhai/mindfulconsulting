export default function PrivacyPolicyPage() {
    return (
        <div className="main-wrapper">
            <section className="section bg-surface text-center">
                <div className="container">
                    <h1 className="heading-1 mb-4">Privacy Policy</h1>
                    <p className="body-large" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div className="content-section">
                        <p className="body-text text-secondary mb-6">
                            Last updated: December 25, 2025
                        </p>

                        <h2 className="heading-2 mb-4">Information We Collect</h2>
                        <p className="body-text mb-6">
                            We collect information that you provide directly to us, including when you:
                        </p>
                        <ul className="body-text mb-6" style={{ paddingLeft: '24px' }}>
                            <li style={{ marginBottom: '12px' }}>Fill out a contact form or request information</li>
                            <li style={{ marginBottom: '12px' }}>Register for our programs or events</li>
                            <li style={{ marginBottom: '12px' }}>Subscribe to our newsletter</li>
                            <li style={{ marginBottom: '12px' }}>Communicate with us via email or phone</li>
                        </ul>

                        <h2 className="heading-2 mb-4">How We Use Your Information</h2>
                        <p className="body-text mb-6">
                            We use the information we collect to:
                        </p>
                        <ul className="body-text mb-6" style={{ paddingLeft: '24px' }}>
                            <li style={{ marginBottom: '12px' }}>Provide, maintain, and improve our services</li>
                            <li style={{ marginBottom: '12px' }}>Send you information about our programs and services</li>
                            <li style={{ marginBottom: '12px' }}>Respond to your inquiries and requests</li>
                            <li style={{ marginBottom: '12px' }}>Comply with legal obligations</li>
                        </ul>

                        <h2 className="heading-2 mb-4">Information Sharing</h2>
                        <p className="body-text mb-6">
                            We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                        </p>
                        <ul className="body-text mb-6" style={{ paddingLeft: '24px' }}>
                            <li style={{ marginBottom: '12px' }}>With your consent</li>
                            <li style={{ marginBottom: '12px' }}>To comply with legal obligations</li>
                            <li style={{ marginBottom: '12px' }}>With service providers who assist us in operating our business</li>
                        </ul>

                        <h2 className="heading-2 mb-4">Data Security</h2>
                        <p className="body-text mb-6">
                            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                        </p>

                        <h2 className="heading-2 mb-4">Your Rights</h2>
                        <p className="body-text mb-6">
                            You have the right to:
                        </p>
                        <ul className="body-text mb-6" style={{ paddingLeft: '24px' }}>
                            <li style={{ marginBottom: '12px' }}>Access your personal information</li>
                            <li style={{ marginBottom: '12px' }}>Request correction of inaccurate information</li>
                            <li style={{ marginBottom: '12px' }}>Request deletion of your information</li>
                            <li style={{ marginBottom: '12px' }}>Opt-out of marketing communications</li>
                        </ul>

                        <h2 className="heading-2 mb-4">Cookies</h2>
                        <p className="body-text mb-6">
                            We use cookies and similar tracking technologies to improve your browsing experience and analyze website traffic. You can control cookies through your browser settings.
                        </p>

                        <h2 className="heading-2 mb-4">Changes to This Policy</h2>
                        <p className="body-text mb-6">
                            We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
                        </p>

                        <h2 className="heading-2 mb-4">Contact Us</h2>
                        <p className="body-text mb-6">
                            If you have any questions about this privacy policy, please contact us at:
                        </p>
                        <p className="body-text">
                            Email: <a href="mailto:hello@mindfulconsulting.com" style={{ color: 'var(--color-accent)' }}>hello@mindfulconsulting.com</a><br />
                            Phone: <a href="tel:+60312345678" style={{ color: 'var(--color-accent)' }}>+60 3 1234 5678</a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
