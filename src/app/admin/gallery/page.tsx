'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

interface Photo {
    id: string;
    url: string;
    thumbnailUrl: string;
    caption?: string;
    date?: string;
    album?: string;
    googlePhotosId?: string;
}

const GOOGLE_PHOTOS_ALBUM_URL = 'https://photos.app.goo.gl/gA8Saubf83j2Cuno9';

export default function AdminGalleryPage() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(false);
    const [syncing, setSyncing] = useState(false);
    const [syncStatus, setSyncStatus] = useState<string>('');
    const [isConnected, setIsConnected] = useState(false);

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

    const syncFromGooglePhotos = async () => {
        setSyncing(true);
        setSyncStatus('Connecting to Google Photos...');

        try {
            // Call our API route to fetch photos from Google Photos
            setSyncStatus('Fetching photos from Google Photos album...');
            const response = await fetch('/api/gallery/sync-icloud', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ albumUrl: GOOGLE_PHOTOS_ALBUM_URL })
            });

            if (!response.ok) {
                throw new Error('Failed to sync from Google Photos');
            }

            const data = await response.json();

            if (data.success) {
                setSyncStatus(`Successfully synced ${data.count} photos!`);
                setTimeout(() => {
                    fetchPhotos();
                    setSyncStatus('');
                }, 2000);
            } else {
                throw new Error(data.error || 'Sync failed');
            }
        } catch (error) {
            console.error('Error syncing from Google Photos:', error);
            setSyncStatus('❌ Sync failed. Please try again or contact support.');
            setTimeout(() => setSyncStatus(''), 5000);
        } finally {
            setSyncing(false);
        }
    };

    const deletePhoto = async (photoId: string) => {
        if (!confirm('Are you sure you want to delete this photo?')) return;

        try {
            await deleteDoc(doc(db, 'gallery_photos', photoId));
            alert('✅ Photo deleted successfully!');
            fetchPhotos();
        } catch (error) {
            console.error('Error deleting photo:', error);
            alert('Failed to delete photo');
        }
    };

    const updateCaption = async (photoId: string, newCaption: string) => {
        try {
            const photo = photos.find(p => p.id === photoId);
            if (!photo) return;

            await setDoc(doc(db, 'gallery_photos', photoId), {
                ...photo,
                caption: newCaption
            });
            alert('✅ Caption updated!');
            fetchPhotos();
        } catch (error) {
            console.error('Error updating caption:', error);
            alert('Failed to update caption');
        }
    };

    return (
        <div className="main-wrapper" style={{ paddingTop: '100px', paddingBottom: '60px', minHeight: '100vh', background: 'var(--color-background)' }}>
            <div className="container" style={{ maxWidth: '1400px' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                        <h1 className="heading-1" style={{ fontSize: '32px', marginBottom: '4px' }}>
                            Photo Gallery
                        </h1>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                            Manage photos from Google Photos Shared Album
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {!isConnected && (
                            <a
                                href="/api/auth/google"
                                style={{
                                    padding: '12px 24px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: '#4285f4',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                🔗 Connect Google Photos
                            </a>
                        )}
                        <button
                            onClick={syncFromGooglePhotos}
                            disabled={syncing}
                            style={{
                                padding: '12px 24px',
                                fontSize: '14px',
                                fontWeight: '600',
                                borderRadius: '8px',
                                border: 'none',
                                background: syncing ? '#999' : 'var(--color-accent)',
                                color: '#fff',
                                cursor: syncing ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            {syncing ? '⏳ Syncing...' : '📸 Sync from Google Photos'}
                        </button>
                        <a
                            href="/gallery"
                            target="_blank"
                            style={{
                                padding: '12px 24px',
                                fontSize: '14px',
                                fontWeight: '600',
                                borderRadius: '8px',
                                border: '1px solid var(--color-border)',
                                background: '#fff',
                                color: 'var(--color-text-primary)',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            👁️ View Gallery
                        </a>
                    </div>
                </div>

                {/* Sync Status */}
                {syncStatus && (
                    <div style={{
                        padding: '16px 24px',
                        background: syncStatus.includes('❌') ? '#fee' : '#efe',
                        border: `1px solid ${syncStatus.includes('❌') ? '#fcc' : '#cfc'}`,
                        borderRadius: '8px',
                        marginBottom: '24px',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}>
                        {syncStatus}
                    </div>
                )}

                {/* Google Photos Album Info */}
                <div style={{
                    padding: '20px',
                    background: 'var(--color-surface)',
                    borderRadius: '12px',
                    border: '1px solid var(--color-border)',
                    marginBottom: '32px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <span style={{ fontSize: '24px' }}>☁️</span>
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                                Connected Google Photos Album
                            </h3>
                            <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                                Photos will be synced from your shared album when you click "Sync from Google Photos"
                            </p>
                        </div>
                    </div>
                    <a
                        href={GOOGLE_PHOTOS_ALBUM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            fontSize: '12px',
                            color: 'var(--color-accent)',
                            textDecoration: 'none',
                            fontFamily: 'monospace'
                        }}
                    >
                        {GOOGLE_PHOTOS_ALBUM_URL}
                    </a>
                </div>

                {/* Stats */}
                {photos.length > 0 && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                        marginBottom: '32px'
                    }}>
                        <div style={{ padding: '20px', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-accent)', marginBottom: '4px' }}>
                                {photos.length}
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Total Photos</div>
                        </div>
                        <div style={{ padding: '20px', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: '28px', fontWeight: '700', color: '#10b981', marginBottom: '4px' }}>
                                {photos.filter(p => p.caption).length}
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>With Captions</div>
                        </div>
                        <div style={{ padding: '20px', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: '28px', fontWeight: '700', color: '#f59e0b', marginBottom: '4px' }}>
                                {new Set(photos.map(p => p.album).filter(Boolean)).size}
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>Albums</div>
                        </div>
                    </div>
                )}

                {/* Photos List */}
                {loading ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '80px 20px',
                        background: 'var(--color-surface)',
                        borderRadius: '12px',
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
                        <h3 style={{ fontSize: '18px' }}>Loading photos...</h3>
                    </div>
                ) : photos.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '80px 20px',
                        background: 'var(--color-surface)',
                        borderRadius: '12px',
                        border: '2px dashed var(--color-border)',
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📸</div>
                        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>No photos yet</h3>
                        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
                            Click "Sync from Google Photos" to import photos from your shared album
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '16px' }}>
                        {photos.map((photo) => (
                            <PhotoRow
                                key={photo.id}
                                photo={photo}
                                onDelete={() => deletePhoto(photo.id)}
                                onUpdateCaption={(caption) => updateCaption(photo.id, caption)}
                            />
                        ))}
                    </div>
                )}

                {/* Instructions */}
                <div style={{
                    marginTop: '40px',
                    padding: '24px',
                    background: '#f0f9ff',
                    border: '1px solid #bae6fd',
                    borderRadius: '12px'
                }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#0369a1' }}>
                        💡 How to Use
                    </h3>
                    <ol style={{ fontSize: '14px', lineHeight: '1.8', color: '#0c4a6e', paddingLeft: '20px' }}>
                        <li>Add photos to your Google Photos Shared Album (auto-syncs from iOS)</li>
                        <li>Click the "📸 Sync from Google Photos" button above</li>
                        <li>Photos will be imported with their captions automatically</li>
                        <li>Edit captions here if needed</li>
                        <li>Photos appear on the public gallery page instantly</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}

function PhotoRow({ photo, onDelete, onUpdateCaption }: {
    photo: Photo;
    onDelete: () => void;
    onUpdateCaption: (caption: string) => void;
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedCaption, setEditedCaption] = useState(photo.caption || '');

    const handleSave = () => {
        onUpdateCaption(editedCaption);
        setIsEditing(false);
    };

    return (
        <div style={{
            padding: '20px',
            background: 'var(--color-surface)',
            borderRadius: '12px',
            border: '1px solid var(--color-border)',
            display: 'grid',
            gridTemplateColumns: '120px 1fr auto',
            gap: '20px',
            alignItems: 'center'
        }}>
            {/* Thumbnail */}
            <img
                src={photo.thumbnailUrl}
                alt={photo.caption || 'Photo'}
                style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                }}
            />

            {/* Details */}
            <div>
                {isEditing ? (
                    <div style={{ marginBottom: '12px' }}>
                        <input
                            value={editedCaption}
                            onChange={(e) => setEditedCaption(e.target.value)}
                            placeholder="Add caption..."
                            style={{
                                width: '100%',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: '1px solid var(--color-border)',
                                fontSize: '14px'
                            }}
                        />
                    </div>
                ) : (
                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                        {photo.caption || <span style={{ color: '#999', fontStyle: 'italic' }}>No caption</span>}
                    </h3>
                )}

                <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                    {photo.album && (
                        <span style={{
                            padding: '4px 8px',
                            background: 'var(--color-accent)20',
                            color: 'var(--color-accent)',
                            borderRadius: '4px',
                            fontWeight: '600'
                        }}>
                            {photo.album}
                        </span>
                    )}
                    {photo.date && (
                        <span>📅 {new Date(photo.date).toLocaleDateString()}</span>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px' }}>
                {isEditing ? (
                    <>
                        <button
                            onClick={handleSave}
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
                            Save
                        </button>
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                setEditedCaption(photo.caption || '');
                            }}
                            style={{
                                padding: '8px 16px',
                                background: '#fff',
                                color: '#666',
                                border: '1px solid var(--color-border)',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setIsEditing(true)}
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
                            Edit Caption
                        </button>
                        <button
                            onClick={onDelete}
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
                    </>
                )}
            </div>
        </div>
    );
}
