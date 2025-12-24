# Fix Firestore Permissions

## Quick Fix: Enable Test Mode (Development Only)

1. Go to **Firestore Database**: https://console.firebase.google.com/project/mindfulconsulting-538b9/firestore

2. Click the **"Rules"** tab

3. Replace the rules with this (allows read/write for 30 days):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 2, 1);
    }
  }
}
```

4. Click **"Publish"**

5. Refresh your admin page: http://localhost:3000/admin/trainings

---

## Production Rules (Use Later)

For production, use these secure rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read for trainings
    match /trainings/{trainingId} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users can write
    }
  }
}
```

---

## Storage Rules

Also update Storage rules:

1. Go to **Storage**: https://console.firebase.google.com/project/mindfulconsulting-538b9/storage

2. Click **"Rules"** tab

3. Use this for development:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.time < timestamp.date(2025, 2, 1);
    }
  }
}
```

4. Click **"Publish"**

---

After updating the rules, your admin page should work!
