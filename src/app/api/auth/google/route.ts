import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    // Google OAuth 2.0 configuration
    const clientId = process.env.GOOGLE_PHOTOS_CLIENT_ID || '745116723030-trjq578k40d2dvgeho47hb04678j9cek.apps.googleusercontent.com';
    const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_PHOTOS_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback';

    // Scopes needed for Google Photos
    const scopes = [
        'https://www.googleapis.com/auth/photoslibrary.readonly',
        'https://www.googleapis.com/auth/photoslibrary.sharing'
    ];

    // Build OAuth URL
    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.append('client_id', clientId);
    authUrl.searchParams.append('redirect_uri', redirectUri);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('scope', scopes.join(' '));
    authUrl.searchParams.append('access_type', 'offline');
    authUrl.searchParams.append('prompt', 'consent');

    // Redirect to Google OAuth
    return NextResponse.redirect(authUrl.toString());
}
