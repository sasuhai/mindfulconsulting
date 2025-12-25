import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    // Handle OAuth errors
    if (error) {
        return NextResponse.redirect(new URL(`/admin/gallery?error=${error}`, request.url));
    }

    if (!code) {
        return NextResponse.redirect(new URL('/admin/gallery?error=no_code', request.url));
    }

    try {
        // Exchange code for access token
        const clientId = process.env.GOOGLE_PHOTOS_CLIENT_ID;
        const clientSecret = process.env.GOOGLE_PHOTOS_CLIENT_SECRET;
        const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_PHOTOS_REDIRECT_URI;

        if (!clientId || !clientSecret || !redirectUri) {
            throw new Error('Missing Google OAuth configuration');
        }

        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            }),
        });

        if (!tokenResponse.ok) {
            throw new Error('Failed to exchange code for token');
        }

        const tokens = await tokenResponse.json();

        // Store tokens in cookies (in production, use a more secure method)
        const cookieStore = await cookies();
        cookieStore.set('google_access_token', tokens.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: tokens.expires_in || 3600,
        });

        if (tokens.refresh_token) {
            cookieStore.set('google_refresh_token', tokens.refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 30, // 30 days
            });
        }

        // Redirect back to admin gallery with success
        return NextResponse.redirect(new URL('/admin/gallery?connected=true', request.url));

    } catch (error) {
        console.error('OAuth callback error:', error);
        return NextResponse.redirect(new URL('/admin/gallery?error=auth_failed', request.url));
    }
}
