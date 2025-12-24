import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div style={{ textAlign: 'center' }}>
                        <img src="/logo.png?v=2" alt="Mindful Consulting" style={{ height: '78px', width: 'auto', marginBottom: '16px', display: 'inline-block' }} />
                        <div style={{ marginBottom: '16px' }}>
                            <h3 style={{
                                fontFamily: 'Georgia, "Times New Roman", serif',
                                fontWeight: '400',
                                fontSize: '24px',
                                lineHeight: '1.2',
                                marginBottom: '4px',
                                color: 'var(--color-text-primary)',
                                textAlign: 'center'
                            }}>
                                Mindful Consulting
                            </h3>
                            <p style={{
                                fontFamily: 'system-ui, -apple-system, sans-serif',
                                fontSize: '11px',
                                letterSpacing: '1.5px',
                                textTransform: 'uppercase',
                                color: '#7a8a6f',
                                fontWeight: '400',
                                marginBottom: '12px',
                                textAlign: 'center'
                            }}>
                                Growth with Presence
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4 className="footer-heading">Company</h4>
                        <ul className="footer-links">
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-heading">Programs</h4>
                        <ul className="footer-links">
                            <li><Link href="/programs/leadership">Leadership Development</Link></li>
                            <li><Link href="/programs/executive">Executive Coaching</Link></li>
                            <li><Link href="/programs/team">Team Effectiveness</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer-heading">Connect</h4>
                        <ul className="footer-links">
                            <li><a href="mailto:hello@mindfulconsulting.com">hello@mindfulconsulting.com</a></li>
                            <li><a href="tel:+60312345678">+60 3 1234 5678</a></li>
                            <li><span>Kuala Lumpur, Malaysia</span></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        &copy; {new Date().getFullYear()} Mindful Consulting. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
