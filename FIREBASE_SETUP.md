# Firebase Setup Guide

## Step 1: Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **mindfulconsulting-538b9**
3. Click the gear icon ⚙️ → **Project settings**
4. Scroll down to **Your apps** section
5. If you don't have a web app, click **Add app** → Web (</>) icon
6. Copy the config values

## Step 2: Enable Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode** (or test mode for development)
4. Select location: **asia-southeast1** (Singapore - closest to Malaysia)
5. Click **Enable**

## Step 3: Enable Firebase Storage

1. In Firebase Console, go to **Storage**
2. Click **Get started**
3. Accept default security rules
4. Click **Done**

## Step 4: Create .env.local File

Create a file named `.env.local` in the project root with this content:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=mindfulconsulting-538b9.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=mindfulconsulting-538b9
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=mindfulconsulting-538b9.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id-here
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id-here
```

Replace `your-api-key-here`, `your-sender-id-here`, and `your-app-id-here` with actual values from Firebase Console.

## Step 5: Restart Dev Server

After creating `.env.local`:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 6: Test

Visit http://localhost:3000/admin/trainings and try saving a training program.

## Troubleshooting

If you see "Saving..." forever:
- Check browser console for errors (F12 → Console tab)
- Verify all environment variables are set correctly
- Make sure Firestore and Storage are enabled in Firebase Console
- Restart the dev server after adding `.env.local`
