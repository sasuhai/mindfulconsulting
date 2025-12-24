import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div>
                        <h3 className="heading-2" style={{ marginBottom: '16px', fontSize: '20px' }}>Mindful Consulting</h3>
                        <p className="body-text" style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                            Developing Mindful Leaders for Complex Organizations.
                        </p>
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
