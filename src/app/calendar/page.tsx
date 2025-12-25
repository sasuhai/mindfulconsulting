'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

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

// Sample events - in production, this would come from Firebase
const SAMPLE_EVENTS: CalendarEvent[] = [
    {
        id: '1',
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
        id: '2',
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
        id: '3',
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
        id: '4',
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
        id: '5',
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
        id: '6',
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

export default function CalendarPage() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
    const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        // About page-style animations
        const heroImage = document.getElementById('calendarHeroImage');
        const heroOverlay = document.getElementById('calendarHeroOverlay');
        const heroStatus = document.getElementById('calendarHeroStatus');
        const heroTitle = document.getElementById('calendarHeroTitle');
        const heroSubtitle = document.getElementById('calendarHeroSubtitle');

        setTimeout(() => {
            if (heroImage) {
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'scale(1)';
                heroImage.style.filter = 'brightness(0.6) blur(0px)';
            }
        }, 100);

        setTimeout(() => { if (heroOverlay) heroOverlay.style.opacity = '1'; }, 300);
        setTimeout(() => {
            if (heroStatus) {
                heroStatus.style.opacity = '1';
                heroStatus.style.transform = 'translateY(0)';
                heroStatus.style.filter = 'blur(0px)';
            }
        }, 800);
        setTimeout(() => {
            if (heroTitle) {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
                heroTitle.style.filter = 'blur(0px)';
            }
        }, 1000);
        setTimeout(() => {
            if (heroSubtitle) {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
                heroSubtitle.style.filter = 'blur(0px)';
            }
        }, 1200);

        fetchEvents();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'calendar_events'));
            const eventsData: CalendarEvent[] = [];
            querySnapshot.forEach((doc) => {
                eventsData.push({ id: doc.id, ...doc.data() } as CalendarEvent);
            });
            setEvents(eventsData.sort((a, b) => a.date.localeCompare(b.date)));
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredEvents = events.filter(event => {
        const monthMatch = selectedMonth === 'all' || event.date.includes(selectedMonth);
        const typeMatch = selectedType === 'all' || event.type === selectedType;
        return monthMatch && typeMatch;
    });

    const accentColor = '#7a8a6f';

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

    const navigateMonth = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentCalendarDate);
        if (direction === 'prev') {
            newDate.setMonth(newDate.getMonth() - 1);
        } else {
            newDate.setMonth(newDate.getMonth() + 1);
        }
        setCurrentCalendarDate(newDate);
    };

    return (
        <div className="main-wrapper">
            {/* Hero Section with Photo Background */}
            <section style={{
                position: 'relative',
                minHeight: '70vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                color: '#fff'
            }}>
                {/* Background Image with zoom animation */}
                <img
                    id="calendarHeroImage"
                    src="/calendar-hero.png"
                    alt="Calendar Planning"
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
                        filter: 'brightness(0.6) blur(10px)',
                        transition: 'all 2s ease-out'
                    }}
                />

                {/* Gradient Overlay */}
                <div
                    id="calendarHeroOverlay"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(9,9,11,0.7), rgba(9,9,11,0.5), rgba(9,9,11,0.8))',
                        zIndex: 10,
                        opacity: 0,
                        transition: 'opacity 1.5s ease-out'
                    }}
                />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 20, width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
                    {/* Status Badge */}
                    <div
                        id="calendarHeroStatus"
                        style={{
                            display: 'inline-block',
                            padding: '8px 24px',
                            background: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '999px',
                            fontSize: '13px',
                            fontWeight: '600',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            marginBottom: '24px',
                            opacity: 0,
                            transform: 'translateY(30px)',
                            filter: 'blur(10px)',
                            transition: 'all 1.2s ease-out'
                        }}
                    >
                        Schedule & Availability
                    </div>

                    {/* Title */}
                    <h1
                        id="calendarHeroTitle"
                        style={{
                            fontSize: 'clamp(36px, 5vw, 56px)',
                            fontWeight: '600',
                            lineHeight: '1.2',
                            marginBottom: '24px',
                            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
                            color: '#fff',
                            opacity: 0,
                            transform: 'translateY(40px)',
                            filter: 'blur(10px)',
                            transition: 'all 1.4s ease-out'
                        }}
                    >
                        Training Calendar
                    </h1>

                    {/* Subtitle */}
                    <p
                        id="calendarHeroSubtitle"
                        style={{
                            fontSize: '18px',
                            lineHeight: '1.6',
                            maxWidth: '700px',
                            margin: '0 auto',
                            color: '#d4d4d8',
                            opacity: 0,
                            transform: 'translateY(50px)',
                            filter: 'blur(10px)',
                            transition: 'all 1.4s ease-out'
                        }}
                    >
                        Explore our upcoming workshops, training programs, and coaching sessions.
                        Find the perfect time to begin your leadership journey.
                    </p>
                </div>
                <style jsx>{`
                    @keyframes fadeInDown {
                        from { opacity: 0; transform: translateY(-30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes float {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-20px) rotate(5deg); }
                    }
                `}</style>
            </section>

            {/* View Mode Toggle & Filters */}
            < section style={{ padding: '40px 24px', background: '#fafafa', borderBottom: '1px solid #e5e5e5' }
            }>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {/* View Mode Toggle */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                        <div style={{
                            display: 'inline-flex',
                            background: '#fff',
                            borderRadius: '12px',
                            padding: '4px',
                            border: '1px solid #ddd',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                        }}>
                            <button
                                onClick={() => setViewMode('list')}
                                style={{
                                    padding: '10px 24px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: viewMode === 'list' ? accentColor : 'transparent',
                                    color: viewMode === 'list' ? '#fff' : '#666',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                📋 List View
                            </button>
                            <button
                                onClick={() => setViewMode('calendar')}
                                style={{
                                    padding: '10px 24px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: viewMode === 'calendar' ? accentColor : 'transparent',
                                    color: viewMode === 'calendar' ? '#fff' : '#666',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                📅 Calendar View
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#666' }}>Filter by:</span>
                        </div>

                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            style={{
                                padding: '10px 16px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                background: '#fff',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="all">All Types</option>
                            <option value="workshop">Workshops</option>
                            <option value="training">Training</option>
                            <option value="coaching">Coaching</option>
                            <option value="consultation">Consultation</option>
                        </select>

                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            style={{
                                padding: '10px 16px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                background: '#fff',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="all">All Months</option>
                            <option value="2026-01">January 2026</option>
                            <option value="2026-02">February 2026</option>
                            <option value="2026-03">March 2026</option>
                        </select>

                        <div style={{ fontSize: '14px', color: '#666', marginLeft: '8px' }}>
                            Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
                        </div>
                    </div>
                </div>
            </section >

            {/* Calendar or List View */}
            {
                loading ? (
                    <section style={{ padding: '80px 24px', background: '#fff' }}>
                        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                            <div style={{ fontSize: '64px', marginBottom: '16px' }}>⏳</div>
                            <h3 style={{ fontSize: '20px', color: '#666' }}>Loading events...</h3>
                        </div>
                    </section>
                ) : viewMode === 'calendar' ? (
                    <CalendarView
                        events={events}
                        currentDate={currentCalendarDate}
                        onNavigate={navigateMonth}
                        accentColor={accentColor}
                        getStatusColor={getStatusColor}
                        getTypeIcon={getTypeIcon}
                    />
                ) : (
                    <section style={{ padding: '80px 24px', background: '#fff' }}>
                        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                            {filteredEvents.length === 0 && events.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>📅</div>
                                    <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#666' }}>No events scheduled yet</h3>
                                    <p style={{ color: '#999', marginBottom: '20px' }}>Check back soon for upcoming workshops and training sessions</p>
                                    <a href="/admin/calendar" style={{ color: accentColor, textDecoration: 'underline', fontSize: '14px' }}>
                                        Admin: Add events
                                    </a>
                                </div>
                            ) : filteredEvents.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
                                    <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#666' }}>No events found</h3>
                                    <p style={{ color: '#999' }}>Try adjusting your filters</p>
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
                                    {filteredEvents.map((event, idx) => (
                                        <EventCard key={event.id} event={event} index={idx} accentColor={accentColor} getStatusColor={getStatusColor} getTypeIcon={getTypeIcon} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>
                )
            }

            {/* CTA Section */}
            <section style={{
                padding: '100px 24px',
                background: `linear-gradient(135deg, ${accentColor} 0%, #5a6a4f 100%)`,
                color: '#fff',
                textAlign: 'center'
            }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ fontSize: '48px', marginBottom: '24px' }}>📞</div>
                    <h2 style={{
                        fontSize: 'clamp(28px, 4vw, 40px)',
                        fontWeight: '300',
                        marginBottom: '16px',
                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                        Don't See a Suitable Time?
                    </h2>
                    <p style={{ fontSize: '18px', lineHeight: '1.6', opacity: 0.95, marginBottom: '32px' }}>
                        We offer flexible scheduling for private sessions and custom programs.
                        Contact us to discuss your specific needs.
                    </p>
                    <Link
                        href="/contact"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '16px 40px',
                            background: '#fff',
                            color: accentColor,
                            borderRadius: '12px',
                            fontWeight: '600',
                            fontSize: '16px',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)';
                        }}
                    >
                        Schedule a Consultation →
                    </Link>
                </div>
            </section>
        </div >
    );
}

// Calendar View Component
function CalendarView({ events, currentDate, onNavigate, accentColor, getStatusColor, getTypeIcon }: {
    events: CalendarEvent[];
    currentDate: Date;
    onNavigate: (direction: 'prev' | 'next') => void;
    accentColor: string;
    getStatusColor: (status: string) => string;
    getTypeIcon: (type: string) => string;
}) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const getEventsForDay = (day: number) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.filter(e => e.date === dateStr);
    };

    return (
        <section style={{ padding: '80px 24px', background: '#fff' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Month Navigation */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '40px',
                    padding: '20px',
                    background: '#fafafa',
                    borderRadius: '12px'
                }}>
                    <button
                        onClick={() => onNavigate('prev')}
                        style={{
                            padding: '12px 24px',
                            background: '#fff',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '14px',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = accentColor}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                    >
                        ← Previous
                    </button>

                    <h2 style={{
                        fontSize: '28px',
                        fontWeight: '600',
                        color: accentColor,
                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                        {monthNames[month]} {year}
                    </h2>

                    <button
                        onClick={() => onNavigate('next')}
                        style={{
                            padding: '12px 24px',
                            background: '#fff',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '14px',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = accentColor}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                    >
                        Next →
                    </button>
                </div>

                {/* Calendar Grid */}
                <div style={{
                    background: '#fff',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid #e5e5e5',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                }}>
                    {/* Day Headers */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        background: accentColor,
                        color: '#fff'
                    }}>
                        {dayNames.map(day => (
                            <div key={day} style={{
                                padding: '16px',
                                textAlign: 'center',
                                fontWeight: '600',
                                fontSize: '14px',
                                borderRight: '1px solid rgba(255,255,255,0.2)'
                            }}>
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Days */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        gridAutoRows: 'minmax(120px, auto)'
                    }}>
                        {days.map((day, idx) => {
                            const dayEvents = day ? getEventsForDay(day) : [];
                            const isToday = day === new Date().getDate() &&
                                month === new Date().getMonth() &&
                                year === new Date().getFullYear();

                            return (
                                <div
                                    key={idx}
                                    style={{
                                        padding: '12px',
                                        border: '1px solid #e5e5e5',
                                        background: day ? (isToday ? `${accentColor}10` : '#fff') : '#fafafa',
                                        minHeight: '120px',
                                        position: 'relative'
                                    }}
                                >
                                    {day && (
                                        <>
                                            <div style={{
                                                fontSize: '16px',
                                                fontWeight: isToday ? '700' : '600',
                                                color: isToday ? accentColor : '#1a1a1a',
                                                marginBottom: '8px'
                                            }}>
                                                {day}
                                            </div>

                                            {dayEvents.map((event, eventIdx) => (
                                                <div
                                                    key={eventIdx}
                                                    style={{
                                                        padding: '4px 8px',
                                                        marginBottom: '4px',
                                                        background: `${getStatusColor(event.status)}20`,
                                                        borderLeft: `3px solid ${getStatusColor(event.status)}`,
                                                        borderRadius: '4px',
                                                        fontSize: '11px',
                                                        fontWeight: '600',
                                                        color: '#1a1a1a',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform = 'translateX(4px)';
                                                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform = 'translateX(0)';
                                                        e.currentTarget.style.boxShadow = 'none';
                                                    }}
                                                    title={`${event.title} - ${event.time}`}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <span style={{ fontSize: '10px' }}>{getTypeIcon(event.type)}</span>
                                                        <span style={{
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            whiteSpace: 'nowrap'
                                                        }}>
                                                            {event.title}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Legend */}
                <div style={{
                    marginTop: '32px',
                    padding: '24px',
                    background: '#fafafa',
                    borderRadius: '12px',
                    display: 'flex',
                    gap: '24px',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '16px', height: '16px', background: getStatusColor('available'), borderRadius: '4px' }} />
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>Available</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '16px', height: '16px', background: getStatusColor('limited'), borderRadius: '4px' }} />
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>Limited Spots</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '16px', height: '16px', background: getStatusColor('full'), borderRadius: '4px' }} />
                        <span style={{ fontSize: '14px', fontWeight: '500' }}>Fully Booked</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

function EventCard({ event, index, accentColor, getStatusColor, getTypeIcon }: {
    event: CalendarEvent;
    index: number;
    accentColor: string;
    getStatusColor: (status: string) => string;
    getTypeIcon: (type: string) => string;
}) {
    const [isHovered, setIsHovered] = useState(false);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div
            style={{
                background: '#fff',
                borderRadius: '16px',
                overflow: 'hidden',
                border: `2px solid ${isHovered ? accentColor : '#e5e5e5'}`,
                transition: 'all 0.3s ease',
                transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.05)',
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                cursor: 'pointer'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Header with Type Badge */}
            <div style={{
                padding: '24px 24px 16px',
                background: isHovered ? `${accentColor}10` : '#fafafa',
                transition: 'background 0.3s ease'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        background: '#fff',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '600',
                        textTransform: 'capitalize',
                        border: '1px solid #e5e5e5'
                    }}>
                        <span>{getTypeIcon(event.type)}</span>
                        {event.type}
                    </div>
                    <div style={{
                        padding: '6px 12px',
                        background: getStatusColor(event.status),
                        color: '#fff',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        {event.status}
                    </div>
                </div>

                <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#1a1a1a',
                    lineHeight: '1.3'
                }}>
                    {event.title}
                </h3>

                <p style={{
                    fontSize: '14px',
                    color: '#666',
                    lineHeight: '1.5'
                }}>
                    {event.description}
                </p>
            </div>

            {/* Event Details */}
            <div style={{ padding: '20px 24px' }}>
                <div style={{ display: 'grid', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '18px' }}>📅</span>
                        <div>
                            <div style={{ fontSize: '13px', color: '#999', marginBottom: '2px' }}>Date</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>{formatDate(event.date)}</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '18px' }}>⏰</span>
                        <div>
                            <div style={{ fontSize: '13px', color: '#999', marginBottom: '2px' }}>Time & Duration</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>{event.time} ({event.duration})</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '18px' }}>📍</span>
                        <div>
                            <div style={{ fontSize: '13px', color: '#999', marginBottom: '2px' }}>Location</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>{event.location}</div>
                        </div>
                    </div>

                    {event.spotsLeft !== undefined && event.spotsLeft > 0 && (
                        <div style={{
                            marginTop: '8px',
                            padding: '12px',
                            background: `${getStatusColor(event.status)}15`,
                            borderRadius: '8px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '20px', fontWeight: '700', color: getStatusColor(event.status), marginBottom: '2px' }}>
                                {event.spotsLeft}
                            </div>
                            <div style={{ fontSize: '12px', color: '#666', fontWeight: '600' }}>
                                Spot{event.spotsLeft !== 1 ? 's' : ''} Available
                            </div>
                        </div>
                    )}

                    {event.status === 'full' && (
                        <div style={{
                            marginTop: '8px',
                            padding: '12px',
                            background: '#ef444415',
                            borderRadius: '8px',
                            textAlign: 'center',
                            color: '#ef4444',
                            fontSize: '13px',
                            fontWeight: '600'
                        }}>
                            ⚠️ Fully Booked - Join Waitlist
                        </div>
                    )}
                </div>

                <Link
                    href="/contact"
                    style={{
                        display: 'block',
                        marginTop: '20px',
                        padding: '12px',
                        background: isHovered ? accentColor : '#fff',
                        color: isHovered ? '#fff' : accentColor,
                        border: `2px solid ${accentColor}`,
                        borderRadius: '10px',
                        textAlign: 'center',
                        fontWeight: '600',
                        fontSize: '14px',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                    }}
                >
                    {event.status === 'full' ? 'Join Waitlist' : 'Register Now'} →
                </Link>
            </div>
        </div>
    );
}
