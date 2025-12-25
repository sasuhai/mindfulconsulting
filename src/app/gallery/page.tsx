'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

interface Photo {
    id: string;
    url: string;
    thumbnailUrl: string;
    caption?: string;
    date?: string;
    album?: string;
}

export default function GalleryPage() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [filterAlbum, setFilterAlbum] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');

    const accentColor = '#7a8a6f';

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'gallery_photos'));
            const photosData: Photo[] = [];
            querySnapshot.forEach((doc) => {
                photosData.push({ id: doc.id, ...doc.data() } as Photo);
            });
            setPhotos(photosData.sort((a, b) => (b.date || '').localeCompare(a.date || '')));
        } catch (error) {
            console.error('Error fetching photos:', error);
        } finally {
            setLoading(false);
        }
    };

    // Get unique albums
    const albums = ['all', ...Array.from(new Set(photos.map(p => p.album).filter(Boolean)))];

    // Filter photos
    const filteredPhotos = photos.filter(photo => {
        const albumMatch = filterAlbum === 'all' || photo.album === filterAlbum;
        const searchMatch = !searchQuery ||
            photo.caption?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            photo.album?.toLowerCase().includes(searchQuery.toLowerCase());
        return albumMatch && searchMatch;
    });

    return (
        <div className="main-wrapper">
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                padding: '120px 24px 80px',
                background: `linear-gradient(135deg, ${accentColor} 0%, #5a6a4f 100%)`,
                color: '#fff',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.1,
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '48px 48px'
                }} />

                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 10, textAlign: 'center' }}>
                    <div style={{
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
                        marginBottom: '24px'
                    }}>
                        Our Journey
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(36px, 5vw, 56px)',
                        fontWeight: '300',
                        lineHeight: '1.2',
                        marginBottom: '24px',
                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
                    }}>
                        Photo Gallery
                    </h1>

                    <p style={{
                        fontSize: '18px',
                        lineHeight: '1.6',
                        opacity: 0.95,
                        maxWidth: '700px',
                        margin: '0 auto'
                    }}>
                        Moments from our workshops, training sessions, and leadership development programs
                    </p>
                </div>
            </section>

            {/* Filters & Controls */}
            <section style={{ padding: '40px 24px', background: '#fafafa', borderBottom: '1px solid #e5e5e5' }}>
                <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* Left side - Filters */}
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                            {/* Search */}
                            <input
                                type="text"
                                placeholder="Search photos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    padding: '10px 16px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    background: '#fff',
                                    fontSize: '14px',
                                    minWidth: '200px'
                                }}
                            />

                            {/* Album Filter */}
                            <select
                                value={filterAlbum}
                                onChange={(e) => setFilterAlbum(e.target.value)}
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
                                {albums.map(album => (
                                    <option key={album} value={album}>
                                        {album === 'all' ? 'All Albums' : album}
                                    </option>
                                ))}
                            </select>

                            <div style={{ fontSize: '14px', color: '#666' }}>
                                {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? 's' : ''}
                            </div>
                        </div>

                        {/* Right side - View Mode */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                onClick={() => setViewMode('grid')}
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: viewMode === 'grid' ? accentColor : '#fff',
                                    color: viewMode === 'grid' ? '#fff' : '#666',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Grid
                            </button>
                            <button
                                onClick={() => setViewMode('masonry')}
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: viewMode === 'masonry' ? accentColor : '#fff',
                                    color: viewMode === 'masonry' ? '#fff' : '#666',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                Masonry
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Photo Grid */}
            <section style={{ padding: '80px 24px', background: '#fff' }}>
                <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                            <div style={{ fontSize: '64px', marginBottom: '16px' }}>⏳</div>
                            <h3 style={{ fontSize: '20px', color: '#666' }}>Loading photos...</h3>
                        </div>
                    ) : filteredPhotos.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                            <div style={{ fontSize: '64px', marginBottom: '16px' }}>📸</div>
                            <h3 style={{ fontSize: '20px', marginBottom: '8px', color: '#666' }}>No photos found</h3>
                            <p style={{ color: '#999' }}>Try adjusting your filters</p>
                        </div>
                    ) : (
                        <div style={{
                            display: viewMode === 'grid' ? 'grid' : 'columns',
                            gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : undefined,
                            columns: viewMode === 'masonry' ? '3 300px' : undefined,
                            gap: '24px',
                            columnGap: viewMode === 'masonry' ? '24px' : undefined
                        }}>
                            {filteredPhotos.map((photo, idx) => (
                                <PhotoCard
                                    key={photo.id}
                                    photo={photo}
                                    index={idx}
                                    onClick={() => setSelectedPhoto(photo)}
                                    accentColor={accentColor}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            {selectedPhoto && (
                <Lightbox
                    photo={selectedPhoto}
                    onClose={() => setSelectedPhoto(null)}
                    onNext={() => {
                        const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
                        const nextIndex = (currentIndex + 1) % filteredPhotos.length;
                        setSelectedPhoto(filteredPhotos[nextIndex]);
                    }}
                    onPrev={() => {
                        const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
                        const prevIndex = currentIndex === 0 ? filteredPhotos.length - 1 : currentIndex - 1;
                        setSelectedPhoto(filteredPhotos[prevIndex]);
                    }}
                />
            )}

            {/* Note about iCloud Integration */}
            <section style={{ padding: '60px 24px', background: '#fafafa', textAlign: 'center' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ fontSize: '32px', marginBottom: '16px' }}>☁️</div>
                    <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#666' }}>
                        Connected to iCloud Shared Album
                    </h3>
                    <p style={{ fontSize: '14px', color: '#999', marginBottom: '20px' }}>
                        Photos are synced from your iOS shared album. Updates may take a few minutes to appear.
                    </p>
                    <button
                        onClick={fetchPhotos}
                        disabled={loading}
                        style={{
                            padding: '12px 24px',
                            background: accentColor,
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.6 : 1
                        }}
                    >
                        {loading ? 'Refreshing...' : '🔄 Refresh Photos'}
                    </button>
                </div>
            </section>
        </div>
    );
}

function PhotoCard({ photo, index, onClick, accentColor }: {
    photo: Photo;
    index: number;
    onClick: () => void;
    accentColor: string;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                breakInside: 'avoid',
                marginBottom: '24px',
                transition: 'all 0.3s ease',
                transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: isHovered ? '0 12px 30px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.1)',
                animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`
            }}
        >
            {/* Image */}
            <div style={{ position: 'relative', background: '#f0f0f0' }}>
                {!imageLoaded && (
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#f0f0f0'
                    }}>
                        <div style={{ fontSize: '24px' }}>⏳</div>
                    </div>
                )}
                <img
                    src={photo.thumbnailUrl}
                    alt={photo.caption || 'Photo'}
                    onLoad={() => setImageLoaded(true)}
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        transition: 'transform 0.3s ease',
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                    }}
                />

                {/* Overlay on hover */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '20px'
                }}>
                    <div style={{ color: '#fff', fontSize: '24px' }}>🔍</div>
                </div>
            </div>

            {/* Caption */}
            {photo.caption && (
                <div style={{
                    padding: '16px',
                    background: '#fff'
                }}>
                    <h3 style={{
                        fontSize: '15px',
                        fontWeight: '600',
                        marginBottom: '4px',
                        color: '#1a1a1a'
                    }}>
                        {photo.caption}
                    </h3>
                    {photo.album && (
                        <div style={{
                            display: 'inline-block',
                            padding: '4px 8px',
                            background: `${accentColor}20`,
                            color: accentColor,
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '600',
                            marginTop: '8px'
                        }}>
                            {photo.album}
                        </div>
                    )}
                </div>
            )}

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
        </div>
    );
}

function Lightbox({ photo, onClose, onNext, onPrev }: {
    photo: Photo;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose, onNext, onPrev]);

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.95)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                backdropFilter: 'blur(10px)'
            }}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: '#fff',
                    fontSize: '32px',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            >
                ✕
            </button>

            {/* Previous Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                style={{
                    position: 'absolute',
                    left: '20px',
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: '#fff',
                    fontSize: '32px',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                ←
            </button>

            {/* Next Button */}
            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                style={{
                    position: 'absolute',
                    right: '20px',
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: '#fff',
                    fontSize: '32px',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                →
            </button>

            {/* Image Container */}
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px'
                }}
            >
                <img
                    src={photo.url}
                    alt={photo.caption || 'Photo'}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '80vh',
                        objectFit: 'contain',
                        borderRadius: '8px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
                    }}
                />

                {/* Caption */}
                {photo.caption && (
                    <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        padding: '16px 24px',
                        borderRadius: '12px',
                        color: '#fff',
                        textAlign: 'center',
                        maxWidth: '600px'
                    }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                            {photo.caption}
                        </h3>
                        {photo.album && (
                            <p style={{ fontSize: '14px', opacity: 0.8 }}>
                                {photo.album}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
