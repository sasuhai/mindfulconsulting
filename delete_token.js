const admin = require('firebase-admin');
const serviceAccount = require('./mindfulconsulting-538b9-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function deleteToken() {
  try {
    await db.collection('google_photos_tokens').doc('current').delete();
    console.log('✅ Token deleted successfully! Now re-authenticate.');
    process.exit(0);
  } catch (error) {
    console.error('Error deleting token:', error);
    process.exit(1);
  }
}

deleteToken();
