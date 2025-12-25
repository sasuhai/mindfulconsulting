'use client';

import { useState, useEffect, ReactNode } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface AdminGuardProps {
    children: ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passcode, setPasscode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [correctPasscode, setCorrectPasscode] = useState('mind');

    useEffect(() => {
        // Check if already authenticated in session
        const authenticated = sessionStorage.getItem('admin_authenticated');
        if (authenticated === 'true') {
            setIsAuthenticated(true);
            setLoading(false);
        } else {
            fetchPasscode();
        }
    }, []);

    const fetchPasscode = async () => {
        try {
            const docRef = doc(db, 'settings', 'general');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setCorrectPasscode(data.adminPasscode || 'mind');
            }
        } catch (error) {
            console.error('Error fetching passcode:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (passcode === correctPasscode) {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin_authenticated', 'true');
            setError('');
        } else {
            setError('Incorrect passcode. Please try again.');
            setPasscode('');
        }
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f9fafb'
            }}>
                <div style={{ fontSize: '18px', color: '#666' }}>Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '24px'
            }}>
                <div style={{
                    background: '#fff',
                    borderRadius: '16px',
                    padding: '48px',
                    maxWidth: '400px',
                    width: '100%',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                }}>
                    {/* Lock Icon */}
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 24px',
                        fontSize: '32px'
                    }}>
                        🔒
                    </div>

                    <h1 style={{
                        fontSize: '24px',
                        fontWeight: '600',
                        textAlign: 'center',
                        marginBottom: '8px',
                        color: '#1a1a1a'
                    }}>
                        Admin Access
                    </h1>

                    <p style={{
                        textAlign: 'center',
                        color: '#666',
                        marginBottom: '32px',
                        fontSize: '14px'
                    }}>
                        Enter your passcode to continue
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '24px' }}>
                            <input
                                type="password"
                                value={passcode}
                                onChange={(e) => setPasscode(e.target.value)}
                                placeholder="Enter passcode"
                                autoFocus
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    fontSize: '16px',
                                    border: error ? '2px solid #ef4444' : '2px solid #e5e7eb',
                                    borderRadius: '8px',
                                    outline: 'none',
                                    transition: 'border-color 0.2s',
                                    textAlign: 'center',
                                    letterSpacing: '2px'
                                }}
                                onFocus={(e) => {
                                    if (!error) e.target.style.borderColor = '#3b82f6';
                                }}
                                onBlur={(e) => {
                                    if (!error) e.target.style.borderColor = '#e5e7eb';
                                }}
                            />
                            {error && (
                                <p style={{
                                    color: '#ef4444',
                                    fontSize: '13px',
                                    marginTop: '8px',
                                    textAlign: 'center'
                                }}>
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '14px',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#fff',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
                            }}
                        >
                            Unlock
                        </button>
                    </form>

                    <p style={{
                        textAlign: 'center',
                        color: '#9ca3af',
                        fontSize: '12px',
                        marginTop: '24px'
                    }}>
                        Protected by Mindful Consulting
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
