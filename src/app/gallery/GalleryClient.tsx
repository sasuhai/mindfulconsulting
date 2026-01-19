'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Album {
    id: string;
    title: string;
    description?: string;
    thumbnailUrl: string;
    icloudUrl: string;
    photoCount?: number;
    date?: string;
}

// Get a varied placeholder image based on album ID
const getPlaceholderImage = (albumId: string): string => {
    const placeholders = [
        'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800&h=600&fit=crop', // Photo wall
        'https://images.unsplash.com/photo-1452457807411-4979b707c5be?w=800&h=600&fit=crop', // Landscape
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', // Mountain
        'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800&h=600&fit=crop', // People
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop', // Camera
        'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop', // Photography
    ];

    // Simple hash function to get consistent index for each album
    const hash = albumId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return placeholders[hash % placeholders.length];
};

export default function GalleryPage() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(true);

    const accentColor = '#7a8a6f';

    useEffect(() => {
        // Hero animations
        const heroImage = document.getElementById('galleryHeroImage');
        const heroOverlay = document.getElementById('galleryHeroOverlay');
        const heroStatus = document.getElementById('galleryHeroStatus');
        const heroTitle = document.getElementById('galleryHeroTitle');
        const heroSubtitle = document.getElementById('galleryHeroSubtitle');

        setTimeout(() => {
            if (heroImage) {
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'scale(1)';
                heroImage.style.filter = 'brightness(0.85)';
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

        fetchAlbums();
    }, []);

    const fetchAlbums = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'photo_albums'));
            const albumsData: Album[] = [];
            querySnapshot.forEach((doc) => {
                albumsData.push({ id: doc.id, ...doc.data() } as Album);
            });
            setAlbums(albumsData.sort((a, b) => (b.date || '').localeCompare(a.date || '')));
        } catch (error) {
            console.error('Error fetching albums:', error);
        } finally {
            setLoading(false);
        }
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
                    id="galleryHeroImage"
                    src="/gallery-hero.jpg"
                    alt="Photo Gallery"
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
                        filter: 'brightness(0.85)',
                        transition: 'all 2s ease-out'
                    }}
                />

                {/* Gradient Overlay */}
                <div
                    id="galleryHeroOverlay"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(9,9,11,0.4), rgba(9,9,11,0.3), rgba(9,9,11,0.5))',
                        zIndex: 10,
                        opacity: 0,
                        transition: 'opacity 1.5s ease-out'
                    }}
                />

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 20, width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
                    {/* Status Badge */}
                    <div
                        id="galleryHeroStatus"
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
                        Our Journey
                    </div>

                    {/* Title */}
                    <h1
                        id="galleryHeroTitle"
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
                        Photo Albums
                    </h1>

                    {/* Subtitle */}
                    <p
                        id="galleryHeroSubtitle"
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
                        Browse our collection of memories from workshops, training sessions, and events
                    </p>
                </div>
            </section>

            {/* Albums Grid */}
            <section style={{ padding: '80px 24px', background: '#fff' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                            <div style={{ fontSize: '64px', marginBottom: '16px' }}>⏳</div>
                            <h3 style={{ fontSize: '20px', color: '#666' }}>Loading albums...</h3>
                        </div>
                    ) : albums.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                            <div style={{ fontSize: '64px', marginBottom: '16px' }}>📸</div>
                            <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#666' }}>No albums yet</h3>
                            <p style={{ color: '#999' }}>Check back soon for new photo albums</p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
                            gap: '24px'
                        }}>
                            {albums.map((album, idx) => (
                                <AlbumCard
                                    key={album.id}
                                    album={album}
                                    index={idx}
                                    accentColor={accentColor}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Info Section */}
            <section style={{ padding: '60px 24px', background: '#fafafa', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ fontSize: '32px', marginBottom: '16px' }}>☁️</div>
                    <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#666' }}>
                        Hosted on iCloud
                    </h3>
                    <p style={{ fontSize: '14px', color: '#999', lineHeight: '1.6' }}>
                        Our photo albums are hosted on iCloud Shared Albums. Click any album to view photos in full resolution.
                    </p>
                </div>
            </section>
        </div>
    );
}

function AlbumCard({ album, index, accentColor }: {
    album: Album;
    index: number;
    accentColor: string;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <a
            href={album.icloudUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                borderRadius: '16px',
                overflow: 'hidden',
                background: '#fff',
                boxShadow: isHovered ? '0 12px 40px rgba(0,0,0,0.15)' : '0 4px 12px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
            }}
        >
            {/* Thumbnail */}
            <div style={{
                position: 'relative',
                paddingTop: '66.67%', // 3:2 aspect ratio
                background: '#f0f0f0',
                overflow: 'hidden'
            }}>
                {!imageLoaded && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#f0f0f0'
                    }}>
                        <div style={{ fontSize: '32px' }}>📸</div>
                    </div>
                )}
                <img
                    src={album.thumbnailUrl || getPlaceholderImage(album.id)}
                    alt={album.title}
                    onLoad={() => setImageLoaded(true)}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                    }}
                />

                {/* Overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
                    opacity: isHovered ? 1 : 0.7,
                    transition: 'opacity 0.3s ease'
                }} />

                {/* Photo Count Badge */}
                {album.photoCount && (
                    <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        background: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(10px)',
                        padding: '8px 16px',
                        borderRadius: '999px',
                        fontSize: '13px',
                        fontWeight: '600',
                        color: '#333',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        <span>📸</span>
                        <span>{album.photoCount}</span>
                    </div>
                )}

                {/* External Link Icon */}
                <div style={{
                    position: 'absolute',
                    bottom: '16px',
                    right: '16px',
                    width: '40px',
                    height: '40px',
                    background: 'rgba(255,255,255,0.95)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'scale(1)' : 'scale(0.8)',
                    transition: 'all 0.3s ease'
                }}>
                    🔗
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '24px' }}>
                <h3 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#1a1a1a'
                }}>
                    {album.title}
                </h3>

                {album.description && (
                    <p style={{
                        fontSize: '14px',
                        color: '#666',
                        lineHeight: '1.6',
                        marginBottom: '12px'
                    }}>
                        {album.description}
                    </p>
                )}

                {album.date && (
                    <div style={{
                        fontSize: '13px',
                        color: '#999',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        <span>📅</span>
                        <span>{new Date(album.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</span>
                    </div>
                )}

                {/* View Album Button */}
                <div style={{
                    marginTop: '16px',
                    padding: '12px 20px',
                    background: isHovered ? accentColor : '#f5f5f5',
                    color: isHovered ? '#fff' : accentColor,
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                }}>
                    <span>View Album</span>
                    <span style={{ fontSize: '16px' }}>→</span>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </a>
    );
}
