# Google Photos Integration Setup Guide

## 📸 Overview
This guide will help you connect your Google Photos album to your website gallery. Photos will be displayed directly from Google Photos (no Firebase storage used).

---

## 🔧 Step 1: Google Cloud Console Setup

### 1.1 Create/Select Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click the project dropdown (top left)
4. Click "New Project"
   - **Project Name**: `Mindful Consulting Gallery`
   - Click "Create"
5. Wait for project creation (~30 seconds)

### 1.2 Enable Photos Library API
1. In the search bar, type "Photos Library API"
2. Click on "Photos Library API"
3. Click the blue "Enable" button
4. Wait for it to enable (~10 seconds)

### 1.3 Configure OAuth Consent Screen
1. Go to "APIs & Services" → "OAuth consent screen" (left sidebar)
2. Select "External" user type
3. Click "Create"
4. Fill in required fields:
   - **App name**: `Mindful Consulting Gallery`
   - **User support email**: Your email
   - **Developer contact**: Your email
5. Click "Save and Continue"
6. Click "Save and Continue" on Scopes page (skip for now)
7. Click "Save and Continue" on Test users page
8. Click "Back to Dashboard"

### 1.4 Create OAuth Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "+ Create Credentials" → "OAuth client ID"
3. Select "Web application"
4. Fill in:
   - **Name**: `Gallery Web Client`
   - **Authorized JavaScript origins**: 
     - `http://localhost:3000` (for testing)
     - `https://mindfulconsulting-538b9.web.app` (for production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/api/auth/google/callback`
     - `https://mindfulconsulting-538b9.web.app/api/auth/google/callback`
5. Click "Create"
6. **IMPORTANT**: Copy and save:
   - ✅ **Client ID** (looks like: `xxxxx.apps.googleusercontent.com`)
   - ✅ **Client Secret** (random string)

---

## 📱 Step 2: Google Photos Album Setup

### 2.1 Install Google Photos App
1. Download "Google Photos" from App Store (if not installed)
2. Sign in with the same Google account used above
3. Enable backup (Settings → Back up & sync)

### 2.2 Create Shared Album
1. Open Google Photos app
2. Go to "Sharing" tab (bottom)
3. Tap "Create shared album" or "+"
4. Name it: `Mindful Consulting Gallery`
5. Add photos from your iOS Photos
6. Tap "Share" → Get link
7. **IMPORTANT**: Copy the album link

### 2.3 Get Album ID
The album link looks like:
```
https://photos.app.goo.gl/xxxxxxxxxxxxx
```
We'll use this link to get the album ID (I'll help with this in the admin interface)

---

## 🔐 Step 3: Add Credentials to Your Site

### 3.1 Add to Firebase Config
1. Go to your Firebase Console
2. Project Settings → Service accounts
3. Click "Generate new private key"
4. Save the JSON file securely

### 3.2 Add Environment Variables
Create a file `.env.local` in your project root:

```env
# Google Photos API
GOOGLE_PHOTOS_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
GOOGLE_PHOTOS_CLIENT_SECRET=your_client_secret_here
GOOGLE_PHOTOS_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# For production, use:
# GOOGLE_PHOTOS_REDIRECT_URI=https://mindfulconsulting-538b9.web.app/api/auth/google/callback
```

**Replace with your actual values from Step 1.4**

---

## ✅ Step 4: Test the Connection

### 4.1 In Admin Interface
1. Go to `http://localhost:3000/admin/gallery`
2. Click "Connect Google Photos"
3. Sign in with your Google account
4. Grant permissions to access photos
5. You'll be redirected back to admin
6. Click "Sync from Google Photos"
7. Your photos should appear!

### 4.2 View Gallery
1. Go to `http://localhost:3000/gallery`
2. You should see your photos
3. Click any photo to view full size
4. Test search and filters

---

## 🔄 Daily Usage

### Adding New Photos
1. Add photos to your iOS Photos app
2. They auto-sync to Google Photos (if backup enabled)
3. Add them to your shared album in Google Photos
4. Go to `/admin/gallery`
5. Click "Sync from Google Photos"
6. New photos appear on your website!

### Editing Captions
1. Go to `/admin/gallery`
2. Click "Edit Caption" on any photo
3. Type new caption
4. Click "Save"
5. Caption updates on public gallery

---

## 🆘 Troubleshooting

### "Access Denied" Error
- Make sure you added the correct redirect URIs in Step 1.4
- Check that Photos Library API is enabled

### "Album Not Found"
- Verify the album is shared
- Make sure you're using the correct Google account

### Photos Not Syncing
- Check Google Photos app backup is enabled
- Verify photos are in the shared album
- Try clicking "Sync" again after a few minutes

### Images Not Loading
- Check browser console for errors
- Verify Google Photos URLs are accessible
- Try refreshing the page

---

## 📊 What Gets Stored Where

**Google Photos** (Free):
- ✅ All original photos
- ✅ Full resolution
- ✅ Automatic backups

**Firebase** (Minimal):
- ✅ Photo IDs (~20 bytes each)
- ✅ Google Photos URLs (~100 bytes each)
- ✅ Captions (~50 bytes each)
- ✅ Metadata (~30 bytes each)
- **Total**: ~200 bytes per photo

**Example**: 100 photos = ~20KB Firebase storage (basically free!)

---

## 🔒 Security Notes

1. **API Keys**: Keep your Client Secret private
2. **OAuth**: Only you can authorize the connection
3. **Album Access**: Only photos in the shared album are accessible
4. **Revoke Access**: You can revoke access anytime in Google Account settings

---

## 📞 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all steps were completed
3. Check browser console for error messages
4. Contact support with error details

---

## ✅ Checklist

Before proceeding, make sure you have:

- [ ] Created Google Cloud project
- [ ] Enabled Photos Library API
- [ ] Created OAuth credentials
- [ ] Copied Client ID and Client Secret
- [ ] Created shared album in Google Photos
- [ ] Added photos to the album
- [ ] Added credentials to `.env.local`
- [ ] Tested connection in admin interface

---

**Once complete, your gallery will automatically display photos from Google Photos with zero Firebase storage costs!** 🎉
