# Google Photos Integration - Quick Reference

## 🎯 What Was Fixed

**Problem**: Clicking "Connect Google Photos" in `/admin/gallery` resulted in a "Page Not Found" error in production.

**Root Cause**: The `/api/auth/google` route didn't exist.

**Solution**: Created the necessary Next.js API routes for Google OAuth authentication.

---

## 📁 New Files Created

```
src/app/api/
├── auth/
│   └── google/
│       ├── route.ts              # Initiates OAuth flow
│       └── callback/
│           └── route.ts          # Handles OAuth callback
└── gallery/
    └── sync-icloud/
        └── route.ts              # Syncs photos from Google Photos
```

---

## ⚙️ Environment Variables Needed

Add these to your `.env.local` file (local) and production environment:

```env
GOOGLE_PHOTOS_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_PHOTOS_CLIENT_SECRET=your_client_secret
```

**Where to get these:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to: **APIs & Services** → **Credentials**
3. Find your OAuth 2.0 Client ID
4. Copy the Client ID and Client Secret

---

## 🔗 Google Cloud Console Setup

**Important**: Add these redirect URIs to your OAuth client:

### Development
```
http://localhost:3000/api/auth/google/callback
```

### Production
```
https://mindfulconsulting-538b9.web.app/api/auth/google/callback
```

**How to add:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Under "Authorized redirect URIs", click **+ ADD URI**
5. Add both URIs above
6. Click **SAVE**

---

## 🚀 Deployment Checklist

### For Local Testing
- [x] API routes created
- [ ] Add credentials to `.env.local`
- [ ] Add redirect URI to Google Cloud Console
- [ ] Restart dev server (if needed)
- [ ] Test at `http://localhost:3000/admin/gallery`

### For Production
- [ ] Add `GOOGLE_PHOTOS_CLIENT_ID` to production environment
- [ ] Add `GOOGLE_PHOTOS_CLIENT_SECRET` to production environment
- [ ] Add production redirect URI to Google Cloud Console
- [ ] Build and deploy: `npm run build && firebase deploy`
- [ ] Test at `https://mindfulconsulting-538b9.web.app/admin/gallery`

---

## 🧪 How to Test

1. **Go to admin gallery**: `/admin/gallery`
2. **Click "Connect Google Photos"**
   - Should redirect to Google OAuth page
   - NOT show "Page Not Found" ❌
3. **Authorize the app**
   - Select your Google account
   - Grant permissions
4. **Should redirect back** with success message
5. **Click "Sync from Google Photos"**
   - Should fetch and save photos

---

## 🔍 Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| "Page Not Found" | API routes not deployed | Rebuild and redeploy |
| "Not configured" | Missing env vars | Add `GOOGLE_PHOTOS_CLIENT_ID` and `GOOGLE_PHOTOS_CLIENT_SECRET` |
| "Redirect URI mismatch" | URI not in Google Console | Add exact redirect URI to OAuth client |
| "Authentication expired" | Token expired | Click "Connect Google Photos" again |

---

## 📊 Flow Diagram

```
User clicks "Connect Google Photos"
    ↓
/api/auth/google
    ↓
Redirects to Google OAuth
    ↓
User authorizes
    ↓
/api/auth/google/callback
    ↓
Exchange code for tokens
    ↓
Store in secure cookies
    ↓
Redirect to /admin/gallery?auth=success
    ↓
User clicks "Sync from Google Photos"
    ↓
/api/gallery/sync-icloud
    ↓
Fetch photos from Google Photos API
    ↓
Save to Firebase Firestore
    ↓
Display in gallery
```

---

## 🔐 Security Features

- ✅ Access tokens stored in HTTP-only cookies (not accessible via JavaScript)
- ✅ Tokens expire after 1 hour
- ✅ Refresh tokens last 30 days
- ✅ Only read-only access to Photos Library API
- ✅ Secure HTTPS in production

---

## 📝 Next Steps

1. **Add environment variables** to `.env.local`
2. **Update Google Cloud Console** with redirect URIs
3. **Test locally** to ensure everything works
4. **Add environment variables to production**
5. **Deploy to production**
6. **Test in production**

---

**Status**: ✅ API routes created and ready to use!

**Action Required**: Add Google Photos API credentials to environment variables.
