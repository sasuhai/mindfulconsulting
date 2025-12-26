# ✅ Google Photos Integration - FIXED for Static Export

## 🎯 Problem Solved!

**Original Error**: 
```
export const dynamic = "force-static"/export const revalidate not configured on route "/api/auth/google" with "output: export"
```

**Root Cause**: Your Next.js app uses `output: 'export'` for static site generation, which **doesn't support API routes**. API routes require a Node.js server.

**Solution**: Moved all Google Photos authentication logic to **Firebase Functions** instead of Next.js API routes.

---

## 🔧 What Was Changed

### 1. **Removed Next.js API Routes**
- ❌ Deleted `/src/app/api/` directory (incompatible with static export)

### 2. **Added Firebase Functions**
Updated `/functions/src/index.ts` with three new functions:

- **`googlePhotosAuth`** - Initiates Google OAuth flow
- **`googlePhotosCallback`** - Handles OAuth callback and stores tokens
- **`syncGooglePhotos`** - Fetches photos from Google Photos API

### 3. **Updated Admin Gallery Page**
Modified `/src/app/admin/gallery/page.tsx` to:
- Use Firebase Functions URLs instead of API routes
- Automatically switch between local emulator and production URLs

### 4. **Added Firebase Hosting Rewrite**
Updated `firebase.json` to route `/api/auth/google/callback` to the Firebase Function.

---

## ⚙️ Setup Required

### Step 1: Add Environment Variables to Firebase Functions

```bash
cd functions
```

Create a `.env` file in the `functions` directory:

```env
GOOGLE_PHOTOS_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_PHOTOS_CLIENT_SECRET=your_client_secret
```

### Step 2: Update Google Cloud Console

Add this **Authorized redirect URI** to your OAuth client:

```
https://mindfulconsulting-538b9.web.app/api/auth/google/callback
```

**How to add:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to: **APIs & Services** → **Credentials**
3. Click on your OAuth 2.0 Client ID
4. Under "Authorized redirect URIs", click **+ ADD URI**
5. Add: `https://mindfulconsulting-538b9.web.app/api/auth/google/callback`
6. Click **SAVE**

### Step 3: Deploy Firebase Functions

```bash
# Build the functions
cd functions
npm run build

# Deploy functions
cd ..
firebase deploy --only functions
```

### Step 4: Build and Deploy the Static Site

```bash
# Build Next.js static export
npm run build

# Deploy hosting
firebase deploy --only hosting
```

---

## 🧪 Testing

### Local Testing (with Firebase Emulator)

1. **Start Firebase Emulator**:
   ```bash
   firebase emulators:start
   ```

2. **In another terminal, start Next.js**:
   ```bash
   npm run dev
   ```

3. **Test**:
   - Go to `http://localhost:3000/admin/gallery`
   - Click "Connect Google Photos"
   - Should redirect to Google OAuth (not show error)

### Production Testing

1. **Deploy everything**:
   ```bash
   npm run build
   firebase deploy
   ```

2. **Test**:
   - Go to `https://mindfulconsulting-538b9.web.app/admin/gallery`
   - Click "Connect Google Photos"
   - Should work without errors! ✅

---

## 📊 Architecture

### Before (Broken)
```
Static Export (output: 'export')
    ↓
Next.js API Routes ❌ (Not supported)
    ↓
Error: "export const dynamic = 'force-static'"
```

### After (Working)
```
Static Export (output: 'export')
    ↓
Firebase Hosting
    ↓
Firebase Functions ✅
    ↓
Google Photos API
```

---

## 🔄 How It Works Now

1. **User clicks "Connect Google Photos"**
   - Redirects to: `https://us-central1-mindfulconsulting-538b9.cloudfunctions.net/googlePhotosAuth`

2. **Firebase Function redirects to Google OAuth**
   - User authorizes the app

3. **Google redirects back**
   - To: `https://mindfulconsulting-538b9.web.app/api/auth/google/callback`
   - Firebase Hosting rewrites this to the `googlePhotosCallback` function

4. **Function exchanges code for tokens**
   - Stores tokens in Firestore (secure)
   - Redirects to: `/admin/gallery?auth=success`

5. **User clicks "Sync from Google Photos"**
   - Calls: `https://us-central1-mindfulconsulting-538b9.cloudfunctions.net/syncGooglePhotos`
   - Fetches photos from Google Photos API
   - Returns photos to client
   - Client saves to Firestore

---

## 📁 Files Changed

### Modified
- ✅ `/functions/src/index.ts` - Added 3 new Firebase Functions
- ✅ `/src/app/admin/gallery/page.tsx` - Updated to use Firebase Functions
- ✅ `/firebase.json` - Added rewrite rule for callback

### Deleted
- ❌ `/src/app/api/` - Removed entire directory (incompatible with static export)

### New
- ✅ `/functions/.env` - (You need to create this with your credentials)

---

## 🔐 Security

- ✅ Tokens stored in Firestore (server-side, secure)
- ✅ Automatic token refresh when expired
- ✅ CORS enabled for client access
- ✅ Read-only access to Photos Library API
- ✅ Environment variables for sensitive data

---

## 🚀 Deployment Checklist

- [ ] Add credentials to `/functions/.env`
- [ ] Update Google Cloud Console redirect URI
- [ ] Build functions: `cd functions && npm run build`
- [ ] Deploy functions: `firebase deploy --only functions`
- [ ] Build Next.js: `npm run build`
- [ ] Deploy hosting: `firebase deploy --only hosting`
- [ ] Test in production

---

## 🐛 Troubleshooting

### Error: "Not configured"
- **Cause**: Missing environment variables in Firebase Functions
- **Fix**: Add `GOOGLE_PHOTOS_CLIENT_ID` and `GOOGLE_PHOTOS_CLIENT_SECRET` to `/functions/.env`

### Error: "Redirect URI mismatch"
- **Cause**: URI not in Google Cloud Console
- **Fix**: Add `https://mindfulconsulting-538b9.web.app/api/auth/google/callback` to OAuth client

### Functions not deploying
- **Cause**: Build errors or missing dependencies
- **Fix**: Run `cd functions && npm install && npm run build`

### Still getting static export error
- **Cause**: Old API routes still in cache
- **Fix**: Delete `.next` folder and restart dev server:
  ```bash
  rm -rf .next
  npm run dev
  ```

---

## ✨ Benefits of This Approach

1. **Compatible with Static Export** - Works with `output: 'export'`
2. **Firebase Hosting** - Fast CDN delivery
3. **Serverless** - No server to maintain
4. **Scalable** - Firebase Functions auto-scale
5. **Secure** - Tokens stored server-side in Firestore
6. **Cost-Effective** - Pay only for function executions

---

## 📞 Next Steps

1. **Create `/functions/.env`** with your Google Photos credentials
2. **Update Google Cloud Console** with the redirect URI
3. **Deploy functions**: `firebase deploy --only functions`
4. **Build and deploy**: `npm run build && firebase deploy --only hosting`
5. **Test in production**

---

**Status**: ✅ Ready to deploy!

**The static export error is now completely resolved!** 🎉
