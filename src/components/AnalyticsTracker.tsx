'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, updateDoc, increment, setDoc, getDoc } from 'firebase/firestore';

export default function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        const trackView = async () => {
            // Don't track admin pages or local host if needed
            if (pathname.startsWith('/admin') || typeof window === 'undefined') {
                return;
            }

            const today = new Date().toISOString().split('T')[0];
            const visitorId = localStorage.getItem('v_id') || Math.random().toString(36).substring(2, 15);
            const lastVisitDate = localStorage.getItem('v_date');
            const sessionId = sessionStorage.getItem('s_id') || Math.random().toString(36).substring(2, 15);
            const currentSessionId = sessionStorage.getItem('s_id');

            localStorage.setItem('v_id', visitorId);
            sessionStorage.setItem('s_id', sessionId);

            const isNewVisitorToday = lastVisitDate !== today;
            const isNewSession = !currentSessionId;

            if (isNewVisitorToday) {
                localStorage.setItem('v_date', today);
            }

            // Path encoding for Firestore (replace / with _ and remove leading slash)
            const cleanPath = pathname === '/' ? 'home' : pathname.substring(1).replace(/\//g, '_');
            const encodedPath = cleanPath || 'home';

            try {
                // 1. Update Daily Stats
                const dailyRef = doc(db, 'analytics', 'daily', 'days', today);
                const dailySnap = await getDoc(dailyRef);

                const updateData: any = {
                    views: increment(1),
                    [`pageViews.${encodedPath}`]: increment(1),
                    lastUpdated: new Date()
                };

                if (isNewVisitorToday) {
                    updateData.visitors = increment(1);
                }
                if (isNewSession) {
                    updateData.sessions = increment(1);
                }

                if (!dailySnap.exists()) {
                    await setDoc(dailyRef, {
                        date: today,
                        views: 1,
                        visitors: 1,
                        sessions: 1,
                        pageViews: { [encodedPath]: 1 },
                        lastUpdated: new Date()
                    });
                } else {
                    await updateDoc(dailyRef, updateData);
                }

                // 2. Update Total Stats
                const totalRef = doc(db, 'analytics', 'total');
                const totalSnap = await getDoc(totalRef);

                const totalUpdate: any = {
                    views: increment(1),
                    lastUpdated: new Date()
                };

                if (isNewVisitorToday) {
                    totalUpdate.visitors = increment(1);
                }
                if (isNewSession) {
                    totalUpdate.sessions = increment(1);
                }

                if (!totalSnap.exists()) {
                    await setDoc(totalRef, {
                        views: 1,
                        visitors: 1,
                        sessions: 1,
                        lastUpdated: new Date()
                    });
                } else {
                    await updateDoc(totalRef, totalUpdate);
                }

            } catch (error) {
                console.error('Analytics tracking error:', error);
            }
        };

        trackView();
    }, [pathname]);

    return null;
}
