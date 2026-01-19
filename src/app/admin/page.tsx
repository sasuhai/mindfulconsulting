'use client';

import Link from 'next/link';
import { useState } from 'react';

interface AdminCard {
    title: string;
    description: string;
    icon: string;
    href: string;
    color: string;
    available: boolean;
}

const adminSections: AdminCard[] = [
    {
        title: 'Home Page',
        description: 'Edit hero section, trust indicators, and call-to-action content',
        icon: '',
        href: '/admin/home',
        color: '#6a7a8f',
        available: true
    },
    {
        title: 'About Page',
        description: 'Edit about page hero section, services, and quote content',
        icon: '',
        href: '/admin/about',
        color: '#5b7c8d',
        available: true
    },
    {
        title: 'Mission Page',
        description: 'Edit mission statement, core values, and all mission page content',
        icon: '',
        href: '/admin/mission',
        color: '#7a8a6f',
        available: true
    },
    {
        title: 'Program Pages',
        description: 'Edit Leadership, Executive, and Team Effectiveness program pages',
        icon: '',
        href: '/admin/programs',
        color: '#8b7355',
        available: true
    },
    {
        title: 'Calendar Events',
        description: 'Manage workshops, training sessions, and coaching availability',
        icon: '',
        href: '/admin/calendar',
        color: '#5a7c8d',
        available: true
    },
    {
        title: 'Photo Gallery',
        description: 'Sync photos from iCloud and manage gallery captions',
        icon: '',
        href: '/admin/gallery',
        color: '#6a7a5f',
        available: true
    },
    {
        title: 'Privacy Policy',
        description: 'Edit privacy policy content and contact information',
        icon: '',
        href: '/admin/privacy',
        color: '#6b7c5b',
        available: true
    },
    {
        title: 'Settings',
        description: 'Manage contact info, phone number, address, and admin passcode',
        icon: '',
        href: '/admin/settings',
        color: '#5b7c8d',
        available: true
    },
    {
        title: 'Analytics',
        description: 'View website traffic, page views, and visitor statistics',
        icon: '📊',
        href: '/admin/analytics',
        color: '#4f46e5',
        available: true
    }
];

export default function AdminDashboard() {
    return (
        <div className="main-wrapper" style={{
            paddingTop: '100px',
            paddingBottom: '60px',
            minHeight: '100vh',
            background: 'var(--color-background)'
        }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                {/* Header */}
                <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                    <div style={{
                        fontSize: '48px',
                        marginBottom: '16px',
                        animation: 'fadeIn 0.5s ease-in'
                    }}>
                        🎛️
                    </div>
                    <h1 className="heading-1" style={{
                        fontSize: '40px',
                        marginBottom: '12px',
                        background: 'linear-gradient(135deg, var(--color-accent) 0%, #5a6a4f 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Admin Dashboard
                    </h1>
                    <p style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: '16px',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Manage your website content, training programs, and settings from one central location
                    </p>
                </div>

                {/* Admin Cards Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '24px',
                    marginBottom: '40px'
                }}>
                    {adminSections.map((section, idx) => (
                        <AdminCardComponent key={idx} section={section} />
                    ))}
                </div>

                {/* Quick Stats */}
                <div style={{
                    marginTop: '60px',
                    padding: '32px',
                    background: 'var(--color-surface)',
                    borderRadius: '16px',
                    border: '1px solid var(--color-border)'
                }}>
                    <h2 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '24px',
                        color: 'var(--color-text-primary)'
                    }}>
                        Quick Access
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px'
                    }}>
                        <QuickLink
                            icon="🏠"
                            label="Back to Home"
                            href="/"
                        />
                        <QuickLink
                            icon="👁️"
                            label="View Site"
                            href="/"
                        />
                        <QuickLink
                            icon="📧"
                            label="Contact Messages"
                            href="/admin/trainings"
                        />
                        <QuickLink
                            icon="📊"
                            label="Analytics"
                            href="/admin/analytics"
                        />
                    </div>
                </div>

                {/* Footer Note */}
                <div style={{
                    marginTop: '40px',
                    textAlign: 'center',
                    color: 'var(--color-text-secondary)',
                    fontSize: '13px'
                }}>
                    <p>💡 Tip: Bookmark this page for quick access to admin tools</p>
                </div>
            </div>
        </div>
    );
}

function AdminCardComponent({ section }: { section: AdminCard }) {
    const [isHovered, setIsHovered] = useState(false);

    const cardStyle: React.CSSProperties = {
        position: 'relative',
        padding: '32px',
        background: 'var(--color-surface)',
        borderRadius: '16px',
        border: '2px solid var(--color-border)',
        transition: 'all 0.3s ease',
        cursor: section.available ? 'pointer' : 'not-allowed',
        opacity: section.available ? 1 : 0.6,
        transform: isHovered && section.available ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered && section.available ? '0 12px 40px rgba(0,0,0,0.15)' : 'none',
    };

    const iconStyle: React.CSSProperties = {
        fontSize: '48px',
        marginBottom: '16px',
        display: 'block',
        transition: 'transform 0.3s ease',
        transform: isHovered && section.available ? 'scale(1.1)' : 'scale(1)',
    };

    const titleStyle: React.CSSProperties = {
        fontSize: '22px',
        fontWeight: '600',
        marginBottom: '12px',
        color: 'var(--color-text-primary)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    };

    const descriptionStyle: React.CSSProperties = {
        fontSize: '14px',
        lineHeight: '1.6',
        color: 'var(--color-text-secondary)',
        marginBottom: '20px'
    };

    const buttonStyle: React.CSSProperties = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        background: section.available ? section.color : '#999',
        color: '#fff',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        border: 'none',
        cursor: section.available ? 'pointer' : 'not-allowed',
        opacity: isHovered && section.available ? 0.9 : 1,
    };

    if (!section.available) {
        return (
            <div
                style={cardStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <span style={iconStyle}>{section.icon}</span>
                <h3 style={titleStyle}>
                    {section.title}
                    <span style={{
                        fontSize: '11px',
                        padding: '2px 8px',
                        background: '#fbbf24',
                        color: '#78350f',
                        borderRadius: '4px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Coming Soon
                    </span>
                </h3>
                <p style={descriptionStyle}>{section.description}</p>
                <button style={buttonStyle} disabled>
                    Not Available Yet
                </button>
            </div>
        );
    }

    return (
        <Link
            href={section.href}
            style={{ textDecoration: 'none' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={cardStyle}>
                <span style={iconStyle}>{section.icon}</span>
                <h3 style={titleStyle}>{section.title}</h3>
                <p style={descriptionStyle}>{section.description}</p>
                <div style={buttonStyle}>
                    Manage →
                </div>
            </div>
        </Link>
    );
}

function QuickLink({ icon, label, href }: { icon: string; label: string; href: string }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            href={href}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: isHovered ? 'var(--color-background)' : 'transparent',
                borderRadius: '8px',
                textDecoration: 'none',
                color: 'var(--color-text-primary)',
                transition: 'all 0.2s ease',
                border: '1px solid transparent',
                borderColor: isHovered ? 'var(--color-border)' : 'transparent'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span style={{ fontSize: '20px' }}>{icon}</span>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>{label}</span>
        </Link>
    );
}
