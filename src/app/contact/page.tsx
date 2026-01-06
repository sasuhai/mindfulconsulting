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

    // Hero animations
    useEffect(() => {
        const heroImage = document.getElementById('contactHeroImage');
        const heroOverlay = document.getElementById('contactHeroOverlay');
        const heroTitle = document.getElementById('contactHeroTitle');
        const heroSubtitle = document.getElementById('contactHeroSubtitle');

        setTimeout(() => {
            if (heroImage) {
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'scale(1)';
                heroImage.style.filter = 'brightness(1.1) blur(0px)';
            }
        }, 100);

        setTimeout(() => { if (heroOverlay) heroOverlay.style.opacity = '1'; }, 300);
        setTimeout(() => {
            if (heroTitle) {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
                heroTitle.style.filter = 'blur(0px)';
            }
        }, 800);
        setTimeout(() => {
            if (heroSubtitle) {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
                heroSubtitle.style.filter = 'blur(0px)';
            }
        }, 1000);
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

    const handleWhatsApp = () => {
        if (!validateForm()) {
            return;
        }
        // Use the first phone number for WhatsApp
        const firstPhone = settings.phoneNumber.split('\n')[0] || '';
        // Remove + and spaces from phone number, keeping only digits
        const cleanPhone = firstPhone.replace(/[^\d]/g, '');
        // Format message for WhatsApp
        const whatsappMessage = `Hello!%0A%0AName: ${encodeURIComponent(formData.name)}%0AEmail: ${encodeURIComponent(formData.email)}%0A%0AMessage:%0A${encodeURIComponent(formData.message)}`;
        // Open WhatsApp
        window.open(`https://wa.me/${cleanPhone}?text=${whatsappMessage}`, '_blank');
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

            {/* Hero Section with Photo Background */}
            <section style={{
                position: 'relative',
                minHeight: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                color: '#fff',
                marginTop: '80px'
            }}>
                {/* Background Image */}
                <img
                    id="contactHeroImage"
                    src="/contact-hero.jpg"
                    alt="Contact Us"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        zIndex: 0,
                        opacity: 0,
                        transform: 'scale(1.1)',
                        filter: 'brightness(1.1)',
                        transition: 'all 2s ease-out'
                    }}
                />

                {/* Gradient Overlay */}
                <div
                    id="contactHeroOverlay"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, rgba(122,138,111,0.5) 0%, rgba(90,106,79,0.5) 100%)',
                        zIndex: 1,
                        opacity: 0,
                        transition: 'opacity 1.5s ease-out'
                    }}
                />

                <div className="container" style={{ maxWidth: '800px', textAlign: 'center', position: 'relative', zIndex: 20, padding: '0 24px' }}>
                    <h1
                        id="contactHeroTitle"
                        className="heading-1"
                        style={{
                            fontSize: 'clamp(36px, 5vw, 56px)',
                            fontWeight: '600',
                            lineHeight: '1.3',
                            marginBottom: '24px',
                            color: '#fff',
                            opacity: 0,
                            transform: 'translateY(40px)',
                            filter: 'blur(10px)',
                            transition: 'all 1.4s ease-out'
                        }}
                    >
                        Get in Touch
                    </h1>
                    <p
                        id="contactHeroSubtitle"
                        className="body-large"
                        style={{
                            fontSize: 'clamp(18px, 2.5vw, 22px)',
                            lineHeight: '1.7',
                            opacity: 0,
                            fontWeight: '300',
                            maxWidth: '600px',
                            margin: '0 auto',
                            color: '#fff',
                            transform: 'translateY(50px)',
                            filter: 'blur(10px)',
                            transition: 'all 1.4s ease-out'
                        }}
                    >
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

                                {/* Buttons Container */}
                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                    {/* Send Email Button */}
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        style={{
                                            flex: '1',
                                            minWidth: '200px',
                                            padding: '14px 28px',
                                            background: submitting ? '#9ca3af' : 'var(--color-accent)',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '8px',
                                            fontSize: '16px',
                                            fontWeight: '600',
                                            cursor: submitting ? 'not-allowed' : 'pointer',
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!submitting) {
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        <span>📧</span>
                                        {submitting ? 'Sending...' : 'Send Email'}
                                    </button>

                                    {/* Send WhatsApp Button */}
                                    <button
                                        type="button"
                                        onClick={handleWhatsApp}
                                        style={{
                                            flex: '1',
                                            minWidth: '200px',
                                            padding: '14px 28px',
                                            background: '#25D366',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '8px',
                                            fontSize: '16px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '8px'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.3)';
                                            e.currentTarget.style.background = '#20BA5A';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                            e.currentTarget.style.background = '#25D366';
                                        }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        Send WhatsApp
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="contact-info">
                            <div style={{ marginBottom: '40px' }}>
                                <h3 className="text-lg font-bold mb-2">Office</h3>
                                <p
                                    className="body-text text-secondary"
                                    dangerouslySetInnerHTML={{ __html: settings.address.replace(/\n/g, '<br />') }}
                                />
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
                                    {settings.phoneNumber.split('\n').filter(p => p.trim()).map((phone, i) => (
                                        <a key={i} href={`tel:${phone.replace(/[^\d+]/g, '')}`} style={{ color: 'inherit', textDecoration: 'none', display: 'block', marginBottom: '4px' }}>
                                            {phone}
                                        </a>
                                    ))}
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
