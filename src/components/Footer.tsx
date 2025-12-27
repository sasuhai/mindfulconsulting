'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function Footer() {
    const [settings, setSettings] = useState({
        email: 'hello@mindfulconsulting.com',
        phoneNumber: '+60 3 1234 5678',
        address: 'Kuala Lumpur, Malaysia'
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const docRef = doc(db, 'settings', 'general');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setSettings({
                    email: data.email || 'hello@mindfulconsulting.com',
                    phoneNumber: data.phoneNumber || '+60 3 1234 5678',
                    address: data.address || 'Kuala Lumpur, Malaysia'
                });
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        }
    };

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

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img
                            src="/footer-qr-code.png"
                            alt="Scan QR Code"
                            style={{ width: '180px', height: 'auto' }}
                        />
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
                        <h4 className="footer-heading">Connect</h4>
                        <ul className="footer-links">
                            <li><a href={`mailto:${settings.email}`}>{settings.email}</a></li>
                            <li><a href={`tel:${settings.phoneNumber.replace(/\s/g, '')}`}>{settings.phoneNumber}</a></li>
                            <li><span>{settings.address}</span></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        Idiahus &copy; {new Date().getFullYear()} Mindful Consulting. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
