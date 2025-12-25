'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function ContactPage() {
    const [settings, setSettings] = useState({
        email: 'hello@mindfulconsulting.com',
        phoneNumber: '+60 3 1234 5678',
        address: 'Kuala Lumpur, Malaysia'
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [submitting, setSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setSubmitting(true);

        try {
            // Send email via Firebase Cloud Function
            const functionUrl = process.env.NODE_ENV === 'production'
                ? 'https://us-central1-mindfulconsulting-538b9.cloudfunctions.net/sendContactEmail'
                : '/api/contact';

            const response = await fetch(functionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            // Show success modal
            setShowModal(true);

            // Reset form
            setFormData({
                name: '',
                email: '',
                message: ''
            });
            setErrors({});
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <div className="main-wrapper">
            {/* Success Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    padding: '24px'
                }} onClick={() => setShowModal(false)}>
                    <div style={{
                        background: '#fff',
                        borderRadius: '16px',
                        padding: '48px',
                        maxWidth: '500px',
                        width: '100%',
                        textAlign: 'center',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                    }} onClick={(e) => e.stopPropagation()}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            background: '#10b981',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 24px',
                            fontSize: '32px',
                            color: '#fff'
                        }}>
                            ✓
                        </div>
                        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px', color: '#1a1a1a' }}>
                            Message Sent!
                        </h2>
                        <p style={{ color: '#666', marginBottom: '8px', fontSize: '16px' }}>
                            Thank you for reaching out to us.
                        </p>
                        <p style={{ color: '#666', marginBottom: '32px', fontSize: '16px' }}>
                            We'll get back to you at <strong>{settings.email}</strong> soon.
                        </p>
                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                padding: '12px 32px',
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#fff',
                                background: '#3b82f6',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#3b82f6'}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <section className="section text-center bg-surface">
                <div className="container">
                    <h1 className="heading-1 mb-4">Get in Touch</h1>
                    <p className="body-large" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        Ready to start your leadership journey? We'd love to hear from you.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        gap: '48px'
                    }} className="contact-grid">
                        {/* Contact Form */}
                        <div>
                            <h2 className="heading-2 mb-6" style={{ marginBottom: '24px' }}>Send us a message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: errors.name ? '2px solid #ef4444' : '1px solid #d2d2d7',
                                            fontSize: '16px',
                                            outline: 'none'
                                        }}
                                        placeholder="Your name"
                                    />
                                    {errors.name && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '4px' }}>{errors.name}</p>}
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Email</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: errors.email ? '2px solid #ef4444' : '1px solid #d2d2d7',
                                            fontSize: '16px',
                                            outline: 'none'
                                        }}
                                        placeholder="your@email.com"
                                    />
                                    {errors.email && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '4px' }}>{errors.email}</p>}
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Message</label>
                                    <textarea
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => handleChange('message', e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            borderRadius: '8px',
                                            border: errors.message ? '2px solid #ef4444' : '1px solid #d2d2d7',
                                            fontSize: '16px',
                                            fontFamily: 'inherit',
                                            outline: 'none',
                                            resize: 'vertical'
                                        }}
                                        placeholder="How can we help you?"
                                    ></textarea>
                                    {errors.message && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '4px' }}>{errors.message}</p>}
                                </div>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn btn-primary"
                                    style={{
                                        alignSelf: 'start',
                                        opacity: submitting ? 0.6 : 1,
                                        cursor: submitting ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    {submitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="contact-info">
                            <div style={{ marginBottom: '40px' }}>
                                <h3 className="text-lg font-bold mb-2">Office</h3>
                                <p className="body-text text-secondary" style={{ whiteSpace: 'pre-line' }}>
                                    {settings.address}
                                </p>
                            </div>
                            <div style={{ marginBottom: '40px' }}>
                                <h3 className="text-lg font-bold mb-2">Email</h3>
                                <p className="body-text text-secondary">
                                    <a href={`mailto:${settings.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                        {settings.email}
                                    </a>
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-2">Phone</h3>
                                <p className="body-text text-secondary">
                                    <a href={`tel:${settings.phoneNumber.replace(/\s/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                        {settings.phoneNumber}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                @media (min-width: 768px) {
                    .contact-grid {
                        grid-template-columns: 1fr 1fr !important;
                        gap: 64px !important;
                    }
                    .contact-info {
                        padding-left: 32px;
                        border-left: 1px solid #eee;
                    }
                }
            `}</style>
        </div>
    );
}
