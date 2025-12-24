import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="navbar glass">
            <div className="navbar-content">
                <Link href="/" className="brand-logo">
                    Mindful Consulting
                </Link>

                <div className="nav-links">
                    <Link href="/about" className="nav-link">
                        About
                    </Link>
                    <Link href="/programs" className="nav-link">
                        Programs
                    </Link>
                    <Link href="/calendar" className="nav-link">
                        Calendar
                    </Link>
                    <Link href="/insights" className="nav-link">
                        Insights
                    </Link>
                    <Link href="/contact" className="nav-link">
                        Contact
                    </Link>
                </div>

                <div className="flex items-center">
                    <Link href="/register" className="btn btn-primary">
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}
