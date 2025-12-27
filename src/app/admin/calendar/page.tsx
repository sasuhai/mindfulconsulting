'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc } from 'firebase/firestore';

interface CalendarEvent {
    id: string;
    title: string;
    type: 'workshop' | 'coaching' | 'training' | 'consultation';
    date: string;
    time: string;
    duration: string;
    location: string;
    status: 'available' | 'limited' | 'full';
    spotsLeft?: number;
    description: string;
}

const INITIAL_EVENTS: Omit<CalendarEvent, 'id'>[] = [
    {
        title: 'Mindful Leadership Workshop',
        type: 'workshop',
        date: '2026-01-15',
        time: '9:00 AM - 5:00 PM',
        duration: '1 day',
        location: 'Kuala Lumpur',
        status: 'available',
        spotsLeft: 8,
        description: 'Interactive workshop on developing mindful leadership practices'
    },
    {
        title: 'Executive Coaching Session',
        type: 'coaching',
        date: '2026-01-20',
        time: '2:00 PM - 4:00 PM',
        duration: '2 hours',
        location: 'Virtual',
        status: 'limited',
        spotsLeft: 2,
        description: 'One-on-one executive coaching for senior leaders'
    },
    {
        title: 'Team Effectiveness Program',
        type: 'training',
        date: '2026-01-25',
        time: '9:00 AM - 12:00 PM',
        duration: '3 hours',
        location: 'Petaling Jaya',
        status: 'available',
        spotsLeft: 12,
        description: 'Build high-performing teams through trust and collaboration'
    },
    {
        title: 'Leadership Development Series',
        type: 'training',
        date: '2026-02-05',
        time: '9:00 AM - 5:00 PM',
        duration: '3 days',
        location: 'Kuala Lumpur',
        status: 'available',
        spotsLeft: 10,
        description: 'Comprehensive 3-day leadership development program'
    },
    {
        title: 'Free Consultation',
        type: 'consultation',
        date: '2026-02-10',
        time: '10:00 AM - 11:00 AM',
        duration: '1 hour',
        location: 'Virtual',
        status: 'available',
        spotsLeft: 5,
        description: 'Complimentary consultation to discuss your leadership needs'
    },
    {
        title: 'Mindfulness for Leaders',
        type: 'workshop',
        date: '2026-02-18',
        time: '2:00 PM - 6:00 PM',
        duration: '4 hours',
        location: 'Virtual',
        status: 'full',
        spotsLeft: 0,
        description: 'Practical mindfulness techniques for busy leaders'
    }
];

export default function AdminCalendarPage() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imageRefreshKey, setImageRefreshKey] = useState(Date.now());
    const [formData, setFormData] = useState<Omit<CalendarEvent, 'id'>>({
        title: '',
        type: 'workshop',
        date: '',
        time: '',
        duration: '',
        location: '',
        status: 'available',
        spotsLeft: 0,
        description: ''
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'calendar_events'));
            const eventsData: CalendarEvent[] = [];
            querySnapshot.forEach((doc) => {
                eventsData.push({ id: doc.id, ...doc.data() } as CalendarEvent);
            });
            setEvents(eventsData.sort((a, b) => a.date.localeCompare(b.date)));
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const seedInitialData = async () => {
        if (!confirm('This will create initial calendar events. Continue?')) return;

        setLoading(true);
        try {
            for (const event of INITIAL_EVENTS) {
                await addDoc(collection(db, 'calendar_events'), event);
            }
            alert('✅ Calendar events seeded successfully!');
            fetchEvents();
        } catch (error) {
            console.error('Error seeding data:', error);
            alert('Failed to seed data: ' + (error as any).message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingEvent) {
                await setDoc(doc(db, 'calendar_events', editingEvent.id), formData);
                alert('✅ Event updated successfully!');
            } else {
                await addDoc(collection(db, 'calendar_events'), formData);
                alert('✅ Event created successfully!');
            }
            setShowForm(false);
            setEditingEvent(null);
            resetForm();
            fetchEvents();
        } catch (error) {
            console.error('Error saving event:', error);
            alert('Failed to save event: ' + (error as any).message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (event: CalendarEvent) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            type: event.type,
            date: event.date,
            time: event.time,
            duration: event.duration,
            location: event.location,
            status: event.status,
            spotsLeft: event.spotsLeft,
            description: event.description
        });
        setShowForm(true);
    };

    const handleDelete = async (eventId: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return;

        setLoading(true);
        try {
            await deleteDoc(doc(db, 'calendar_events', eventId));
            alert('✅ Event deleted successfully!');
            fetchEvents();
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Failed to delete event: ' + (error as any).message);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            type: 'workshop',
            date: '',
            time: '',
            duration: '',
            location: '',
            status: 'available',
            spotsLeft: 0,
            description: ''
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('❌ Please select an image file');
            return;
        }

        setUploadingImage(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const response = await fetch('/api/upload-calendar-hero', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Failed to upload image');
            }
            
            setImageRefreshKey(Date.now());
            alert('✅ Hero image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('❌ Failed to upload image. Please try again.');
        } finally {
            setUploadingImage(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'available': return '#10b981';
            case 'limited': return '#f59e0b';
            case 'full': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'workshop': return '🎓';
            case 'coaching': return '🎯';
            case 'training': return '📚';
            case 'consultation': return '💬';
            default: return '📅';
        }
    };

    return (
        <div className="main-wrapper" style={{ paddingTop: '100px', paddingBottom: '60px', minHeight: '100vh', background: 'var(--color-background)' }}>
            <div className="container" style={{ maxWidth: '1400px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <Link
                        href="/admin"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: 'var(--color-text-secondary)',
                            textDecoration: 'none',
                            fontSize: '14px',
                            transition: 'color 0.2s'
                        }}
                    >
                        ← Back to Dashboard
                    </Link>
                </div>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                        <h1 className="heading-1" style={{ fontSize: '32px', marginBottom: '4px' }}>
                            Calendar Events
                        </h1>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                            Manage training calendar, workshops, and coaching sessions

                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        {events.length === 0 && (
                            <button
                                onClick={seedInitialData}
                                disabled={loading}
                                style={{
                                    padding: '12px 24px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    borderRadius: '8px',
                                    border: '1px solid var(--color-accent)',
                                    background: 'var(--color-accent)',
                                    color: '#fff',
                                    cursor: 'pointer'
                                }}
                            >
                                {loading ? 'Seeding...' : '🌱 Seed Initial Data'}
                            </button>
                        )}
                        <button
                            onClick={() => {
                                setEditingEvent(null);
                                resetForm();
                                setShowForm(true);
                            }}
                            className="btn btn-primary"
                            style={{ padding: '12px 24px' }}
                        >
                            + Add New Event
                        </button>
                    </div>
                </div>


                {/* Hero Image Upload */}
                <div style={{
                    background: 'var(--color-surface)',
                    borderRadius: '12px',
                    padding: '24px',
                    border: '1px solid var(--color-border)',
                    marginBottom: '32px'
                }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                        🖼️ Hero Background Image
                    </h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ 
                            border: '2px dashed #d2d2d7', 
                            borderRadius: '8px', 
                            padding: '16px',
                            background: '#f9f9f9'
                        }}>
                            <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>Current Image:</p>
                            <img 
                                src={`/calendar-hero.png?${imageRefreshKey}`}
                                alt="Calendar Hero Background" 
                                style={{ 
                                    width: '100%', 
                                    maxHeight: '200px', 
                                    minHeight: '200px',
                                    objectFit: 'cover', 
                                    borderRadius: '6px',
                                    marginBottom: '8px',
                                    display: 'block',
                                    backgroundColor: '#e5e5e5'
                                }} 
                            />
                            <p style={{ fontSize: '12px', color: '#999' }}>/calendar-hero.png</p>
                        </div>

                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploadingImage}
                                style={{ display: 'none' }}
                                id="calendarHeroImageUpload"
                            />
                            <label
                                htmlFor="calendarHeroImageUpload"
                                style={{
                                    display: 'inline-block',
                                    padding: '10px 20px',
                                    background: uploadingImage ? '#ccc' : '#3b82f6',
                                    color: '#fff',
                                    borderRadius: '6px',
                                    cursor: uploadingImage ? 'not-allowed' : 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500'
                                }}
                            >
                                {uploadingImage ? '⏳ Uploading...' : '📤 Upload New Image'}
                            </label>
                        </div>
                    </div>
                </div>
                {/* Stats */}
                {events.length > 0 && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                        marginBottom: '32px'
                    }}>
                        <div style={{ padding: '20px', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-accent)', marginBottom: '4px' }}>
                                {events.length}
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Total Events</div>
                        </div>
                        <div style={{ padding: '20px', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: '28px', fontWeight: '700', color: '#10b981', marginBottom: '4px' }}>
                                {events.filter(e => e.status === 'available').length}
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Available</div>
                        </div>
                        <div style={{ padding: '20px', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: '28px', fontWeight: '700', color: '#f59e0b', marginBottom: '4px' }}>
                                {events.filter(e => e.status === 'limited').length}
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Limited</div>
                        </div>
                        <div style={{ padding: '20px', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: '28px', fontWeight: '700', color: '#ef4444', marginBottom: '4px' }}>
                                {events.filter(e => e.status === 'full').length}
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Fully Booked</div>
                        </div>
                    </div>
                )}

                {/* Events List */}
                {events.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '80px 20px',
                        background: 'var(--color-surface)',
                        borderRadius: '12px',
                        border: '2px dashed var(--color-border)',
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
                        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>No calendar events</h3>
                        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
                            Click "Seed Initial Data" to create sample events
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '16px' }}>
                        {events.map((event) => (
                            <div
                                key={event.id}
                                style={{
                                    padding: '24px',
                                    background: 'var(--color-surface)',
                                    borderRadius: '12px',
                                    border: '1px solid var(--color-border)',
                                    display: 'grid',
                                    gridTemplateColumns: '1fr auto',
                                    gap: '24px',
                                    alignItems: 'start'
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                                        <span style={{ fontSize: '24px' }}>{getTypeIcon(event.type)}</span>
                                        <div>
                                            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                                                {event.title}
                                            </h3>
                                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                                <span style={{
                                                    padding: '4px 12px',
                                                    background: getStatusColor(event.status) + '20',
                                                    color: getStatusColor(event.status),
                                                    borderRadius: '6px',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    textTransform: 'uppercase'
                                                }}>
                                                    {event.status}
                                                </span>
                                                <span style={{
                                                    padding: '4px 12px',
                                                    background: 'var(--color-background)',
                                                    borderRadius: '6px',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    textTransform: 'capitalize'
                                                }}>
                                                    {event.type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
                                        {event.description}
                                    </p>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '13px' }}>
                                        <div>
                                            <span style={{ color: 'var(--color-text-secondary)' }}>📅 Date:</span>{' '}
                                            <strong>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong>
                                        </div>
                                        <div>
                                            <span style={{ color: 'var(--color-text-secondary)' }}>⏰ Time:</span>{' '}
                                            <strong>{event.time}</strong>
                                        </div>
                                        <div>
                                            <span style={{ color: 'var(--color-text-secondary)' }}>⏱️ Duration:</span>{' '}
                                            <strong>{event.duration}</strong>
                                        </div>
                                        <div>
                                            <span style={{ color: 'var(--color-text-secondary)' }}>📍 Location:</span>{' '}
                                            <strong>{event.location}</strong>
                                        </div>
                                        {event.spotsLeft !== undefined && (
                                            <div>
                                                <span style={{ color: 'var(--color-text-secondary)' }}>👥 Spots Left:</span>{' '}
                                                <strong style={{ color: getStatusColor(event.status) }}>{event.spotsLeft}</strong>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        onClick={() => handleEdit(event)}
                                        style={{
                                            padding: '8px 16px',
                                            background: 'var(--color-accent)',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '6px',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(event.id)}
                                        style={{
                                            padding: '8px 16px',
                                            background: '#ef4444',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '6px',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Edit/Add Form Modal */}
                {showForm && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px',
                        backdropFilter: 'blur(4px)',
                    }}>
                        <div style={{
                            background: 'var(--color-background)',
                            borderRadius: '16px',
                            maxWidth: '800px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflow: 'auto',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                        }}>
                            <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--color-border)', position: 'sticky', top: 0, background: 'var(--color-background)', zIndex: 10 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h2 style={{ fontSize: '20px', fontWeight: '600' }}>
                                        {editingEvent ? 'Edit Event' : 'Add New Event'}
                                    </h2>
                                    <button
                                        onClick={() => { setShowForm(false); setEditingEvent(null); resetForm(); }}
                                        style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} style={{ padding: '32px' }}>
                                <div style={{ display: 'grid', gap: '20px' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Event Title *</label>
                                        <input
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                            placeholder="e.g., Mindful Leadership Workshop"
                                        />
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Event Type *</label>
                                            <select
                                                required
                                                value={formData.type}
                                                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                            >
                                                <option value="workshop">Workshop</option>
                                                <option value="training">Training</option>
                                                <option value="coaching">Coaching</option>
                                                <option value="consultation">Consultation</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Status *</label>
                                            <select
                                                required
                                                value={formData.status}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                            >
                                                <option value="available">Available</option>
                                                <option value="limited">Limited</option>
                                                <option value="full">Full</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Date *</label>
                                            <input
                                                required
                                                type="date"
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                            />
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Time *</label>
                                            <input
                                                required
                                                value={formData.time}
                                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                                placeholder="e.g., 9:00 AM - 5:00 PM"
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Duration *</label>
                                            <input
                                                required
                                                value={formData.duration}
                                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                                placeholder="e.g., 1 day, 3 hours"
                                            />
                                        </div>

                                        <div>
                                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Spots Left</label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={formData.spotsLeft}
                                                onChange={(e) => setFormData({ ...formData, spotsLeft: parseInt(e.target.value) || 0 })}
                                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Location *</label>
                                        <input
                                            required
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)' }}
                                            placeholder="e.g., Kuala Lumpur, Virtual"
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600' }}>Description *</label>
                                        <textarea
                                            required
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            rows={3}
                                            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--color-border)', fontFamily: 'inherit' }}
                                            placeholder="Brief description of the event"
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '12px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--color-border)' }}>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn btn-primary"
                                        style={{ flex: 1, padding: '12px' }}
                                    >
                                        {loading ? 'Saving...' : (editingEvent ? 'Update Event' : 'Create Event')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setShowForm(false); setEditingEvent(null); resetForm(); }}
                                        className="btn btn-outline"
                                        style={{ flex: 1, padding: '12px' }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
