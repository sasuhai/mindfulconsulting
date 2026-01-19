'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, limit, getDocs, doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';

interface DailyStats {
    date: string;
    views: number;
    visitors: number;
    sessions: number;
    pageViews: Record<string, number>;
}

interface TotalStats {
    views: number;
    visitors: number;
    sessions: number;
}

export default function AnalyticsDashboard() {
    const [dailyData, setDailyData] = useState<DailyStats[]>([]);
    const [totalStats, setTotalStats] = useState<TotalStats | null>(null);
    const [filter, setFilter] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                // Fetch Total Stats
                const totalRef = doc(db, 'analytics', 'total');
                const totalSnap = await getDoc(totalRef);
                if (totalSnap.exists()) {
                    setTotalStats(totalSnap.data() as TotalStats);
                }

                // Fetch Daily Stats (last 365 days to support all filters)
                const dailyRef = collection(db, 'analytics', 'daily', 'days');
                const q = query(dailyRef, orderBy('date', 'desc'), limit(365));
                const querySnapshot = await getDocs(q);

                const stats: DailyStats[] = [];
                querySnapshot.forEach((doc) => {
                    stats.push(doc.data() as DailyStats);
                });
                setDailyData(stats);
            } catch (error) {
                console.error('Error fetching analytics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'var(--color-background)',
                color: 'var(--color-text-primary)'
            }}>
                <div className="loader">Loading Analytics...</div>
            </div>
        );
    }

    const todayStats = dailyData[0] || { views: 0, visitors: 0, sessions: 0, pageViews: {} };

    // Aggregation Logic
    const getAggregatedData = () => {
        if (filter === 'daily') return dailyData.slice(0, 14).reverse();

        const groups: Record<string, DailyStats> = {};

        dailyData.forEach(day => {
            let key = '';
            const date = new Date(day.date);

            if (filter === 'weekly') {
                // Simple week key: Year-WeekNum
                const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
                const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
                const weekNum = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
                key = `${date.getFullYear()}-W${weekNum}`;
            } else if (filter === 'monthly') {
                key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
            } else if (filter === 'yearly') {
                key = `${date.getFullYear()}`;
            }

            if (!groups[key]) {
                groups[key] = { date: key, views: 0, visitors: 0, sessions: 0, pageViews: {} };
            }

            groups[key].views += day.views;
            groups[key].visitors += day.visitors;
            groups[key].sessions += day.sessions;

            if (day.pageViews) {
                Object.entries(day.pageViews).forEach(([path, count]) => {
                    groups[key].pageViews[path] = (groups[key].pageViews[path] || 0) + count;
                });
            }
        });

        return Object.values(groups).sort((a, b) => a.date.localeCompare(b.date)).slice(-12);
    };

    const displayData = getAggregatedData();

    // Process page views for table
    const allPageViews: Record<string, number> = {};
    displayData.forEach(day => {
        if (day.pageViews) {
            Object.entries(day.pageViews).forEach(([path, count]) => {
                const displayPath = path === 'home' ? '/' : '/' + path.replace(/_/g, '/');
                allPageViews[displayPath] = (allPageViews[displayPath] || 0) + count;
            });
        }
    });

    const sortedPageViews = Object.entries(allPageViews)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10);

    return (
        <div className="main-wrapper" style={{
            paddingTop: '100px',
            paddingBottom: '60px',
            minHeight: '100vh',
            background: 'var(--color-background)'
        }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                {/* Header */}
                <div style={{ marginBottom: '40px' }}>
                    <Link href="/admin" style={{
                        color: 'var(--color-accent)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '16px'
                    }}>
                        ← Back to Dashboard
                    </Link>
                    <h1 className="heading-1" style={{ fontSize: 'clamp(28px, 5vw, 36px)', marginBottom: '8px' }}>
                        Website Analytics
                    </h1>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
                        <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
                            Overview of your portal's performance and visitor engagement
                        </p>

                        {/* Time Filter Selection */}
                        <div style={{
                            display: 'flex',
                            background: 'var(--color-surface)',
                            padding: '4px',
                            borderRadius: '12px',
                            border: '1px solid var(--color-border)',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            overflowX: 'auto',
                            maxWidth: '100%'
                        }}>
                            {['daily', 'weekly', 'monthly', 'yearly'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f as any)}
                                    style={{
                                        padding: '6px 14px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        background: filter === f ? 'var(--color-accent)' : 'transparent',
                                        color: filter === f ? '#fff' : 'var(--color-text-secondary)',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        textTransform: 'capitalize',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Summary Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '24px',
                    marginBottom: '40px'
                }}>
                    <StatCard
                        title="Page Views"
                        today={todayStats.views}
                        total={totalStats?.views || 0}
                        icon="👁️"
                        color="#4f46e5"
                    />
                    <StatCard
                        title="Unique Visitors"
                        today={todayStats.visitors}
                        total={totalStats?.visitors || 0}
                        icon="👥"
                        color="#10b981"
                    />
                    <StatCard
                        title="Total Sessions"
                        today={todayStats.sessions}
                        total={totalStats?.sessions || 0}
                        icon="🖱️"
                        color="#f59e0b"
                    />
                </div>

                {/* Charts and Tables */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
                    gap: '24px'
                }}>
                    {/* Activity Chart */}
                    <div style={{ ...panelStyle, gridColumn: '1 / -1', padding: 'var(--spacing-md)' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '24px',
                            flexWrap: 'wrap',
                            gap: '16px'
                        }}>
                            <h3 style={{ ...panelTitleStyle, marginBottom: 0 }}>
                                Traffic Trending ({filter.charAt(0).toUpperCase() + filter.slice(1)})
                            </h3>
                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
                                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-accent)' }}></span>
                                    <span>Views</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
                                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></span>
                                    <span>Visitors</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
                                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></span>
                                    <span>Sessions</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ position: 'relative', height: '300px', width: '100%', marginTop: '20px' }}>
                            <svg width="100%" height="100%" viewBox="0 0 1000 300" preserveAspectRatio="none">
                                {(() => {
                                    if (displayData.length === 0) return null;

                                    const maxVal = Math.max(...displayData.map(d => Math.max(d.views, d.visitors, d.sessions)), 10) * 1.2;
                                    const stepX = 1000 / Math.max(displayData.length - 1, 1);

                                    // Generate points
                                    const viewPoints = displayData.map((d, i) => `${i * stepX},${300 - (d.views / maxVal) * 280}`).join(' ');
                                    const visitorPoints = displayData.map((d, i) => `${i * stepX},${300 - (d.visitors / maxVal) * 280}`).join(' ');
                                    const sessionPoints = displayData.map((d, i) => `${i * stepX},${300 - (d.sessions / maxVal) * 280}`).join(' ');

                                    return (
                                        <>
                                            {/* Grid Lines */}
                                            {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
                                                <g key={i}>
                                                    <line x1="0" y1={300 - p * 280} x2="1000" y2={300 - p * 280} stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="4" />
                                                    <text x="0" y={295 - p * 280} fontSize="10" fill="var(--color-text-secondary)">{Math.round(p * maxVal)}</text>
                                                </g>
                                            ))}

                                            {/* Lines */}
                                            <polyline points={viewPoints} fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeLinejoin="round" />
                                            <polyline points={visitorPoints} fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="5,3" strokeLinejoin="round" />
                                            <polyline points={sessionPoints} fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round" />

                                            {/* Points */}
                                            {displayData.map((d, i) => (
                                                <g key={i}>
                                                    <circle cx={i * stepX} cy={300 - (d.views / maxVal) * 280} r="3" fill="var(--color-accent)" />
                                                    <circle cx={i * stepX} cy={300 - (d.sessions / maxVal) * 280} r="3" fill="#f59e0b" />
                                                </g>
                                            ))}
                                        </>
                                    );
                                })()}
                            </svg>

                            {/* X-Axis Labels */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                {displayData.map((d, i) => (
                                    <div key={i} style={{
                                        fontSize: '10px',
                                        color: 'var(--color-text-secondary)',
                                        transform: filter === 'daily' ? 'rotate(-45deg)' : 'none',
                                        transformOrigin: 'top left',
                                        width: '0',
                                        whiteSpace: 'nowrap',
                                        textAlign: 'center'
                                    }}>
                                        {filter === 'daily' ? d.date.split('-').slice(1).join('/') : d.date}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Popular Pages - Enhanced Trending View */}
                    <div style={{ ...panelStyle, gridColumn: '1 / -1' }}>
                        <h3 style={panelTitleStyle}>Top Trending Pages</h3>
                        <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {sortedPageViews.map(([path, count], idx) => {
                                const maxCount = Math.max(...sortedPageViews.map(([, c]) => c as number), 1);
                                const percentage = (count / maxCount) * 100;
                                return (
                                    <div key={idx} style={{ position: 'relative' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                                            <span style={{ fontWeight: '500', color: 'var(--color-text-primary)' }}>{path}</span>
                                            <span style={{ color: 'var(--color-accent)', fontWeight: '600' }}>{count} views</span>
                                        </div>
                                        <div style={{
                                            height: '8px',
                                            background: 'var(--color-border)',
                                            borderRadius: '4px',
                                            overflow: 'hidden'
                                        }}>
                                            <div style={{
                                                width: `${percentage}%`,
                                                height: '100%',
                                                background: 'linear-gradient(90deg, var(--color-accent) 0%, #4f46e5 100%)',
                                                borderRadius: '4px',
                                                transition: 'width 1s ease-out'
                                            }}></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/* Metrics Definition Guide */}
                    <div style={{ marginTop: '60px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: 'var(--color-text-primary)' }}>
                            📊 Metrics Definition Guide
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '24px'
                        }}>
                            <DefinitionItem
                                icon="👁️"
                                title="Page Views"
                                description="The total number of times any page on your portal has been loaded. Each refresh or navigation to a new page counts as one view."
                            />
                            <DefinitionItem
                                icon="👥"
                                title="Unique Visitors"
                                description="The number of distinct individuals visiting your site. Multiple visits from the same browser/person are only counted once per day."
                            />
                            <DefinitionItem
                                icon="🖱️"
                                title="Total Sessions"
                                description="A session represents a single visit from start to finish. A new session is started when a user returns after a period of inactivity."
                            />
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .main-wrapper {
                    padding: 80px 16px 60px !important;
                }
                .container {
                    padding: 0 !important;
                }
                @media (max-width: 600px) {
                    .activity-panel {
                        padding: 16px !important;
                    }
                    svg {
                        height: 200px !important;
                    }
                }
                .loader {
                    font-size: 18px;
                    font-weight: 500;
                    letter-spacing: 0.05em;
                }
            `}</style>
        </div>
    );
}

function StatCard({ title, today, total, icon, color }: any) {
    return (
        <div style={{
            background: 'var(--color-surface)',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '24px' }}>{icon}</span>
                <span style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: '#666',
                    background: '#f3f4f6',
                    padding: '4px 8px',
                    borderRadius: '4px'
                }}>TODAY: {today}</span>
            </div>
            <h3 style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>{title}</h3>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-text-primary)' }}>{total}</div>
        </div>
    );
}

function DefinitionItem({ icon, title, description }: any) {
    return (
        <div style={{
            padding: '20px',
            background: 'var(--color-background)',
            borderRadius: '12px',
            border: '1px solid var(--color-border)',
            transition: 'transform 0.2s ease'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '20px' }}>{icon}</span>
                <h4 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: 'var(--color-text-primary)' }}>{title}</h4>
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.5', color: 'var(--color-text-secondary)', margin: 0 }}>
                {description}
            </p>
        </div>
    );
}

const panelStyle: React.CSSProperties = {
    background: 'var(--color-surface)',
    padding: '32px',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
};

const panelTitleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: '600',
    color: 'var(--color-text-primary)',
    marginBottom: '8px'
};
