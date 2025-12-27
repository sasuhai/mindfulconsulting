'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db, storage } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
        'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1452457807411-4979b707c5be?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=600&fit=crop',
    ];
    const hash = albumId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return placeholders[hash % placeholders.length];
};

export default function AdminGalleryPage() {
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imageRefreshKey, setImageRefreshKey] = useState(Date.now());

    useEffect(() => {
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

    const saveAlbum = async (album: Album) => {
        try {
            await setDoc(doc(db, 'photo_albums', album.id), album);
            alert('✅ Album saved successfully!');
            fetchAlbums();
            setIsEditing(false);
            setEditingAlbum(null);
        } catch (error) {
            console.error('Error saving album:', error);
            alert('❌ Failed to save album');
        }
    };

    const deleteAlbum = async (albumId: string) => {
        if (!confirm('Are you sure you want to delete this album?')) return;

        try {
            await deleteDoc(doc(db, 'photo_albums', albumId));
            alert('✅ Album deleted successfully!');
            fetchAlbums();
        } catch (error) {
            console.error('Error deleting album:', error);
            alert('❌ Failed to delete album');
        }
    };

    const startNewAlbum = () => {
        setEditingAlbum({
            id: Date.now().toString(),
            title: '',
            description: '',
            thumbnailUrl: '',
            icloudUrl: '',
            photoCount: 0,
            date: new Date().toISOString().split('T')[0]
        });
        setIsEditing(true);
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
            
            const response = await fetch('/api/upload-gallery-hero', {
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

    return (
        <div className="main-wrapper" style={{ paddingTop: '100px', paddingBottom: '60px', minHeight: '100vh', background: 'var(--color-background)' }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
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
                            Photo Albums
                        </h1>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                            Manage iCloud shared album links
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={startNewAlbum}

                            style={{
                                padding: '12px 24px',
                                fontSize: '14px',
                                fontWeight: '600',
                                borderRadius: '8px',
                                border: 'none',
                                background: 'var(--color-accent)',
                                color: '#fff',
                                cursor: 'pointer'
                            }}
                        >
                            ➕ Add New Album
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


                {/* Hero Image Upload */}
                <div style={{
                    padding: '20px',
                    background: 'var(--color-surface)',
                    borderRadius: '12px',
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
                                src={`/gallery-hero.jpg?${imageRefreshKey}`}
                                alt="Gallery Hero Background" 
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
                            <p style={{ fontSize: '12px', color: '#999' }}>/gallery-hero.jpg</p>
                        </div>

                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploadingImage}
                                style={{ display: 'none' }}
                                id="galleryHeroImageUpload"
                            />
                            <label
                                htmlFor="galleryHeroImageUpload"
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
                {/* Instructions */}
                <div style={{
                    padding: '20px',
                    background: '#e3f2fd',
                    border: '1px solid #90caf9',
                    borderRadius: '12px',
                    marginBottom: '32px'
                }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#1976d2' }}>
                        💡 How to Use
                    </h3>
                    <ol style={{ fontSize: '14px', lineHeight: '1.8', color: '#0d47a1', paddingLeft: '20px', margin: 0 }}>
                        <li>Create a shared album in iOS Photos app</li>
                        <li>Get the public iCloud link (Share → Copy Link)</li>
                        <li>Click "Add New Album" above</li>
                        <li>Fill in the album details and paste the iCloud link</li>
                        <li>Add a thumbnail image URL (can be from any photo in the album)</li>
                        <li>Save - the album will appear on the public gallery page</li>
                    </ol>
                </div>

                {/* Albums List */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
                        <h3 style={{ fontSize: '18px' }}>Loading albums...</h3>
                    </div>
                ) : albums.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '80px 20px',
                        background: 'var(--color-surface)',
                        borderRadius: '12px',
                        border: '2px dashed var(--color-border)'
                    }}>
                        <div style={{ fontSize: '64px', marginBottom: '16px' }}>📸</div>
                        <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>No albums yet</h3>
                        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
                            Click "Add New Album" to create your first album
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '16px' }}>
                        {albums.map((album) => (
                            <AlbumRow
                                key={album.id}
                                album={album}
                                onEdit={() => {
                                    setEditingAlbum(album);
                                    setIsEditing(true);
                                }}
                                onDelete={() => deleteAlbum(album.id)}
                            />
                        ))}
                    </div>
                )}

                {/* Edit Modal */}
                {isEditing && editingAlbum && (
                    <EditModal
                        album={editingAlbum}
                        onSave={saveAlbum}
                        onCancel={() => {
                            setIsEditing(false);
                            setEditingAlbum(null);
                        }}
                        onChange={setEditingAlbum}
                    />
                )}
            </div>
        </div>
    );
}

function AlbumRow({ album, onEdit, onDelete }: {
    album: Album;
    onEdit: () => void;
    onDelete: () => void;
}) {
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
                src={album.thumbnailUrl}
                alt={album.title}
                style={{
                    width: '120px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                }}
            />

            {/* Details */}
            <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                    {album.title}
                </h3>
                {album.description && (
                    <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                        {album.description}
                    </p>
                )}
                <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                    {album.photoCount && <span>📸 {album.photoCount} photos</span>}
                    {album.date && <span>📅 {new Date(album.date).toLocaleDateString()}</span>}
                    <a
                        href={album.icloudUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
                    >
                        🔗 View iCloud Album
                    </a>
                </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px' }}>
                <button
                    onClick={onEdit}
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
            </div>
        </div>
    );
}

function EditModal({ album, onSave, onCancel, onChange }: {
    album: Album;
    onSave: (album: Album) => void;
    onCancel: () => void;
    onChange: (album: Album) => void;
}) {
    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
        }}>
            <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '32px',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto'
            }}>
                <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>
                    {album.title ? 'Edit Album' : 'New Album'}
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                            Album Title *
                        </label>
                        <input
                            type="text"
                            value={album.title}
                            onChange={(e) => onChange({ ...album, title: e.target.value })}
                            placeholder="e.g., Leadership Workshop 2024"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                fontSize: '14px'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                            Description
                        </label>
                        <textarea
                            value={album.description}
                            onChange={(e) => onChange({ ...album, description: e.target.value })}
                            placeholder="Brief description of the album"
                            rows={3}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                fontSize: '14px',
                                fontFamily: 'inherit'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                            iCloud Shared Album URL *
                        </label>
                        <input
                            type="url"
                            value={album.icloudUrl}
                            onChange={(e) => onChange({ ...album, icloudUrl: e.target.value })}
                            placeholder="https://www.icloud.com/sharedalbum/..."
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                fontSize: '14px'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                            Thumbnail Image URL (Optional)
                        </label>
                        <input
                            type="url"
                            value={album.thumbnailUrl}
                            onChange={(e) => onChange({ ...album, thumbnailUrl: e.target.value })}
                            placeholder="Leave empty for default placeholder"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ddd',
                                fontSize: '14px',
                                marginBottom: '8px'
                            }}
                        />
                        <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
                            💡 Tip: Right-click a photo in your iCloud album → "Copy Image Address" and paste here
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                                Photo Count
                            </label>
                            <input
                                type="number"
                                value={album.photoCount || ''}
                                onChange={(e) => onChange({ ...album, photoCount: parseInt(e.target.value) || 0 })}
                                placeholder="0"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px'
                                }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                                Date
                            </label>
                            <input
                                type="date"
                                value={album.date}
                                onChange={(e) => onChange({ ...album, date: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #ddd',
                                    fontSize: '14px'
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                    <button
                        onClick={() => onSave({
                            ...album,
                            thumbnailUrl: album.thumbnailUrl || getPlaceholderImage(album.id)
                        })}
                        disabled={!album.title || !album.icloudUrl}
                        style={{
                            flex: 1,
                            padding: '14px',
                            background: 'var(--color-accent)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '15px',
                            fontWeight: '600',
                            cursor: album.title && album.icloudUrl ? 'pointer' : 'not-allowed',
                            opacity: album.title && album.icloudUrl ? 1 : 0.5
                        }}
                    >
                        Save Album
                    </button>
                    <button
                        onClick={onCancel}
                        style={{
                            flex: 1,
                            padding: '14px',
                            background: '#f5f5f5',
                            color: '#666',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '15px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
