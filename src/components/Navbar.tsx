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
                            href="/mission"
                            className={`nav-link ${isActive('/mission') ? 'active' : ''}`}
                        >
                            Mission
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
                            href="/gallery"
                            className={`nav-link ${isActive('/gallery') ? 'active' : ''}`}
                        >
                            Gallery
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


                    {/* Admin Dashboard & Theme Toggle - Desktop Only */}
                    <div className="theme-toggle-desktop" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Link
                            href="/admin"
                            title="Admin Dashboard"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                transition: 'background-color 0.2s',
                                color: 'var(--color-text-primary)'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                            </svg>
                        </Link>
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
                    href="/mission"
                    className={`nav-link ${isActive('/mission') ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                >
                    Mission
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
                    href="/gallery"
                    className={`nav-link ${isActive('/gallery') ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                >
                    Gallery
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

                {/* Admin Dashboard & Theme Toggle in Mobile Menu */}
                <div style={{ padding: '12px 0', borderTop: '1px solid var(--color-border)', marginTop: '8px', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Link
                        href="/admin"
                        className="nav-link"
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                        <span>Admin Settings</span>
                    </Link>
                    <ThemeToggle />
                </div>

                <Link href="/register" className="btn btn-primary w-full text-center justify-center mt-2" onClick={() => setIsMenuOpen(false)}>
                    Get Started
                </Link>
            </div>
        </>
    );
}
