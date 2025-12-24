'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <nav className="navbar glass">
                <div className="navbar-content">
                    <Link href="/" className="brand-logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src="/logo.png" alt="Mindful Consulting" style={{ height: '40px', width: 'auto' }} />
                        <span style={{ fontWeight: '700', fontSize: '18px' }}>Mindful Consulting</span>
                    </Link>

                    <div className="nav-links">
                        <Link href="/about" className="nav-link">About</Link>
                        <Link href="/programs" className="nav-link">Programs</Link>
                        <Link href="/calendar" className="nav-link">Calendar</Link>
                        <Link href="/insights" className="nav-link">Insights</Link>
                        <Link href="/contact" className="nav-link">Contact</Link>
                    </div>

                    <div className="navbar-cta-desktop">
                        <Link href="/register" className="btn btn-primary">
                            Get Started
                        </Link>
                    </div>

                    {/* Theme Toggle */}
                    <ThemeToggle />

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
                <Link href="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</Link>
                <Link href="/programs" className="nav-link" onClick={() => setIsMenuOpen(false)}>Programs</Link>
                <Link href="/calendar" className="nav-link" onClick={() => setIsMenuOpen(false)}>Calendar</Link>
                <Link href="/insights" className="nav-link" onClick={() => setIsMenuOpen(false)}>Insights</Link>
                <Link href="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                <Link href="/register" className="btn btn-primary w-full text-center justify-center mt-2" onClick={() => setIsMenuOpen(false)}>
                    Get Started
                </Link>
            </div>
        </>
    );
}
