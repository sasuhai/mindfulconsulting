'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(path);
    };

    return (
        <>
            <nav className="navbar glass">
                <div className="navbar-content">
                    <Link href="/" className="brand-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src="/logo.png?v=2" alt="Mindful Consulting" style={{ height: '40px', width: 'auto' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span style={{
                                fontFamily: 'Georgia, "Times New Roman", serif',
                                fontWeight: '400',
                                fontSize: '20px',
                                lineHeight: '1',
                                color: 'var(--color-text-primary)'
                            }}>
                                Mindful Consulting
                            </span>
                            <span style={{
                                fontFamily: 'system-ui, -apple-system, sans-serif',
                                fontSize: '9px',
                                letterSpacing: '1.5px',
                                textTransform: 'uppercase',
                                color: '#7a8a6f',
                                lineHeight: '1',
                                fontWeight: '400',
                                textAlign: 'center',
                                display: 'block'
                            }}>
                                Growth with Presence
                            </span>
                        </div>
                    </Link>

                    <div className="nav-links">
                        <Link
                            href="/about"
                            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                        >
                            About
                        </Link>
                        <Link
                            href="/programs"
                            className={`nav-link ${isActive('/programs') ? 'active' : ''}`}
                        >
                            Programs
                        </Link>
                        <Link
                            href="/calendar"
                            className={`nav-link ${isActive('/calendar') ? 'active' : ''}`}
                        >
                            Calendar
                        </Link>
                        <Link
                            href="/insights"
                            className={`nav-link ${isActive('/insights') ? 'active' : ''}`}
                        >
                            Insights
                        </Link>
                        <Link
                            href="/contact"
                            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                        >
                            Contact
                        </Link>
                    </div>

                    <div className="navbar-cta-desktop">
                        <Link href="/register" className="btn btn-primary">
                            Get Started
                        </Link>
                    </div>

                    {/* Theme Toggle - Desktop Only */}
                    <div className="theme-toggle-desktop">
                        <ThemeToggle />
                    </div>

                    {/* Mobile Menu Button - Hamburger */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {isMenuOpen ? (
                                <path d="M18 6L6 18M6 6l12 12" />
                            ) : (
                                <path d="M3 12h18M3 6h18M3 18h18" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
                <Link
                    href="/about"
                    className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                >
                    About
                </Link>
                <Link
                    href="/programs"
                    className={`nav-link ${isActive('/programs') ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                >
                    Programs
                </Link>
                <Link
                    href="/calendar"
                    className={`nav-link ${isActive('/calendar') ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                >
                    Calendar
                </Link>
                <Link
                    href="/insights"
                    className={`nav-link ${isActive('/insights') ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                >
                    Insights
                </Link>
                <Link
                    href="/contact"
                    className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                >
                    Contact
                </Link>

                {/* Theme Toggle in Mobile Menu */}
                <div style={{ padding: '12px 0', borderTop: '1px solid var(--color-border)', marginTop: '8px', paddingTop: '16px' }}>
                    <ThemeToggle />
                </div>

                <Link href="/register" className="btn btn-primary w-full text-center justify-center mt-2" onClick={() => setIsMenuOpen(false)}>
                    Get Started
                </Link>
            </div>
        </>
    );
}
