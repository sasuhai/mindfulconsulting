'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

interface Settings {
    email: string;
    phoneNumber: string;
    address: string;
    adminPasscode: string;
}

export default function SettingsPage() {
    const [settings, setSettings] = useState<Settings>({
        email: '',
        phoneNumber: '',
        address: '',
        adminPasscode: 'mind'
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showPasscode, setShowPasscode] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const docRef = doc(db, 'settings', 'general');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setSettings(docSnap.data() as Settings);
            } else {
                // Initialize with default values
                await setDoc(docRef, {
                    email: '',
                    phoneNumber: '',
                    address: '',
                    adminPasscode: 'mind'
                });
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
            showMessage('error', 'Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const docRef = doc(db, 'settings', 'general');
            await setDoc(docRef, settings);
            showMessage('success', 'Settings saved successfully!');
        } catch (error) {
            console.error('Error saving settings:', error);
            showMessage('error', 'Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleChange = (field: keyof Settings, value: string) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    if (loading) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', color: '#666' }}>Loading settings...</div>
            </div>
        );
    }

    return (
        <div className="main-wrapper" style={{
            paddingTop: '120px',
            padding: '120px 16px 40px',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
            {/* Header */}
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '8px', color: '#1a1a1a' }}>
                    Settings
                </h1>
                <p style={{ color: '#666', fontSize: '16px' }}>
                    Manage your contact information and admin access
                </p>
            </div>

            {/* Message */}
            {message && (
                <div style={{
                    padding: '16px 20px',
                    borderRadius: '8px',
                    marginBottom: '24px',
                    background: message.type === 'success' ? '#d1fae5' : '#fee2e2',
                    color: message.type === 'success' ? '#065f46' : '#991b1b',
                    border: `1px solid ${message.type === 'success' ? '#6ee7b7' : '#fca5a5'}`
                }}>
                    {message.text}
                </div>
            )}

            {/* Settings Form */}
            <div style={{
                background: '#fff',
                borderRadius: '12px',
                border: '1px solid #e5e5e5',
                padding: '32px'
            }}>
                {/* Email */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#1a1a1a'
                    }}>
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        placeholder="contact@mindfulconsulting.com"
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            fontSize: '16px',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />

                    {/* Warning Box */}
                    <div style={{
                        marginTop: '12px',
                        padding: '12px 16px',
                        background: '#fef3c7',
                        border: '1px solid #fbbf24',
                        borderRadius: '8px'
                    }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'start' }}>
                            <span style={{ fontSize: '18px' }}>⚠️</span>
                            <div>
                                <p style={{ fontSize: '13px', fontWeight: '600', color: '#92400e', marginBottom: '4px' }}>
                                    Important: Do Not Change This Email
                                </p>
                                <p style={{ fontSize: '12px', color: '#78350f', lineHeight: '1.5' }}>
                                    This email is configured in Firebase Cloud Functions for sending contact form messages.
                                    Changing it requires updating the backend configuration.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Technical Info - Collapsible */}
                    <details style={{ marginTop: '12px' }}>
                        <summary style={{
                            fontSize: '12px',
                            color: '#3b82f6',
                            cursor: 'pointer',
                            userSelect: 'none',
                            padding: '8px 0'
                        }}>
                            📖 Technical Documentation (Click to expand)
                        </summary>
                        <div style={{
                            marginTop: '8px',
                            padding: '12px',
                            background: '#f9fafb',
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            fontSize: '12px',
                            color: '#4b5563',
                            lineHeight: '1.6'
                        }}>
                            <p style={{ marginBottom: '8px' }}><strong>Current Setup:</strong></p>
                            <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
                                <li>Email: <code style={{ background: '#e5e7eb', padding: '2px 6px', borderRadius: '3px' }}>mindfulconsulting.my@gmail.com</code></li>
                                <li>Service: Gmail SMTP</li>
                                <li>Authentication: App Password</li>
                            </ul>

                            <p style={{ marginBottom: '8px' }}><strong>To Change Email:</strong></p>
                            <ol style={{ marginLeft: '20px', marginBottom: '12px' }}>
                                <li>Update <code style={{ background: '#e5e7eb', padding: '2px 6px', borderRadius: '3px' }}>functions/.env</code> file:
                                    <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '8px', borderRadius: '4px', marginTop: '4px', overflow: 'auto' }}>
                                        EMAIL_USER=new-email@gmail.com{'\n'}EMAIL_PASSWORD=new-app-password
                                    </pre>
                                </li>
                                <li>Generate new Gmail App Password for the new email</li>
                                <li>Redeploy Cloud Function: <code style={{ background: '#e5e7eb', padding: '2px 6px', borderRadius: '3px' }}>firebase deploy --only functions</code></li>
                                <li>Update this field in Settings</li>
                            </ol>

                            <p style={{ marginBottom: '4px' }}><strong>Files to Update:</strong></p>
                            <ul style={{ marginLeft: '20px' }}>
                                <li><code style={{ background: '#e5e7eb', padding: '2px 6px', borderRadius: '3px' }}>/functions/.env</code> - Email credentials</li>
                                <li><code style={{ background: '#e5e7eb', padding: '2px 6px', borderRadius: '3px' }}>/functions/src/index.ts</code> - Recipient email (line 42)</li>
                            </ul>
                        </div>
                    </details>
                </div>

                {/* Phone Number */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#1a1a1a'
                    }}>
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        value={settings.phoneNumber}
                        onChange={(e) => handleChange('phoneNumber', e.target.value)}
                        placeholder="+60 12-345 6789"
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            fontSize: '16px',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                </div>

                {/* Address */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#1a1a1a'
                    }}>
                        Address
                    </label>
                    <textarea
                        value={settings.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        placeholder="Enter your business address"
                        rows={3}
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            fontSize: '16px',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                            fontFamily: 'inherit',
                            resize: 'vertical'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                </div>

                {/* Admin Passcode */}
                <div style={{ marginBottom: '32px' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: '#1a1a1a'
                    }}>
                        Admin Passcode
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPasscode ? 'text' : 'password'}
                            value={settings.adminPasscode}
                            onChange={(e) => handleChange('adminPasscode', e.target.value)}
                            placeholder="Enter admin passcode"
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                paddingRight: '100px',
                                fontSize: '16px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPasscode(!showPasscode)}
                            style={{
                                position: 'absolute',
                                right: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                padding: '6px 12px',
                                fontSize: '13px',
                                fontWeight: '500',
                                color: '#3b82f6',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                borderRadius: '4px'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#eff6ff'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            {showPasscode ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <p style={{ fontSize: '13px', color: '#666', marginTop: '6px' }}>
                        This passcode is required to access the admin dashboard
                    </p>
                </div>

                {/* Save Button */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        style={{
                            padding: '12px 32px',
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#fff',
                            background: saving ? '#9ca3af' : '#3b82f6',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: saving ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            if (!saving) e.currentTarget.style.background = '#2563eb';
                        }}
                        onMouseLeave={(e) => {
                            if (!saving) e.currentTarget.style.background = '#3b82f6';
                        }}
                    >
                        {saving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 640px) {
                    code {
                        font-size: 11px !important;
                        word-break: break-all;
                    }
                    pre {
                        font-size: 10px !important;
                    }
                }
            `}</style>
        </div>
    );
}
