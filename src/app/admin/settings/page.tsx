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
        <div className="main-wrapper" style={{ paddingTop: '120px', padding: '120px 24px 40px', maxWidth: '800px', margin: '0 auto' }}>
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
        </div>
    );
}
