import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/firebase';
import { collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';

export async function POST(request: NextRequest) {
    try {
        const { albumUrl } = await request.json();

        if (!albumUrl) {
            return NextResponse.json({ success: false, error: 'Album URL is required' }, { status: 400 });
        }

        // Get access token from cookies
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('google_access_token')?.value;

        if (!accessToken) {
            return NextResponse.json({
                success: false,
                error: 'Not authenticated. Please connect Google Photos first.'
            }, { status: 401 });
        }

        // Extract album ID from URL
        const albumId = extractAlbumId(albumUrl);

        if (!albumId) {
            return NextResponse.json({
                success: false,
                error: 'Invalid album URL'
            }, { status: 400 });
        }

        // Fetch photos from Google Photos API
        const photos = await fetchPhotosFromGooglePhotos(albumId, accessToken);

        if (photos.length === 0) {
            return NextResponse.json({
                success: true,
                count: 0,
                message: 'No photos found in album'
            });
        }

        // Clear existing photos
        const existingPhotos = await getDocs(collection(db, 'gallery_photos'));
        for (const photoDoc of existingPhotos.docs) {
            await deleteDoc(doc(db, 'gallery_photos', photoDoc.id));
        }

        // Save new photos metadata to Firebase (NOT the actual images)
        for (const photo of photos) {
            await setDoc(doc(db, 'gallery_photos', photo.id), photo);
        }

        return NextResponse.json({
            success: true,
            count: photos.length,
            message: `Successfully synced ${photos.length} photos from Google Photos`
        });

    } catch (error: any) {
        console.error('Error syncing from Google Photos:', error);
        return NextResponse.json({
            success: false,
            error: error.message || 'Failed to sync photos'
        }, { status: 500 });
    }
}

// Extract album ID from Google Photos URL
function extractAlbumId(url: string): string | null {
    try {
        // Google Photos shared album URLs look like:
        // https://photos.app.goo.gl/xxxxx
        const match = url.match(/photos\.app\.goo\.gl\/([a-zA-Z0-9]+)/);
        return match ? match[1] : null;
    } catch {
        return null;
    }
}

// Fetch photos from Google Photos API
async function fetchPhotosFromGooglePhotos(albumId: string, accessToken: string) {
    try {
        // First, we need to get the actual album ID from the short URL
        // Google Photos API requires the full album ID

        // Search for shared albums
        const albumsResponse = await fetch(
            'https://photoslibrary.googleapis.com/v1/sharedAlbums',
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!albumsResponse.ok) {
            throw new Error('Failed to fetch albums from Google Photos');
        }

        const albumsData = await albumsResponse.json();

        // For now, get the first shared album
        // In production, you'd match by the short URL or album title
        const album = albumsData.sharedAlbums?.[0];

        if (!album) {
            throw new Error('No shared albums found');
        }

        // Fetch media items from the album
        const mediaResponse = await fetch(
            'https://photoslibrary.googleapis.com/v1/mediaItems:search',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    albumId: album.id,
                    pageSize: 100
                })
            }
        );

        if (!mediaResponse.ok) {
            throw new Error('Failed to fetch media items from Google Photos');
        }

        const mediaData = await mediaResponse.json();

        if (!mediaData.mediaItems || mediaData.mediaItems.length === 0) {
            return [];
        }

        // Transform Google Photos data to our format
        return mediaData.mediaItems.map((item: any) => ({
            id: `gp-${item.id}`,
            url: item.baseUrl,
            thumbnailUrl: `${item.baseUrl}=w400-h400`,
            caption: item.description || item.filename?.replace(/\.[^/.]+$/, '') || '',
            date: item.mediaMetadata?.creationTime || new Date().toISOString(),
            album: album.title || 'Google Photos',
            googlePhotosId: item.id
        }));

    } catch (error) {
        console.error('Error fetching from Google Photos API:', error);
        throw error;
    }
}
