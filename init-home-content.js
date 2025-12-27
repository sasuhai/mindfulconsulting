// Run this script to initialize home page content in Firebase
// Usage: node init-home-content.js

const admin = require('firebase-admin');
const serviceAccount = require('./mindfulconsulting-538b9-firebase-adminsdk-ql2oi-7e3f2e3c74.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const homeContent = {
    heroBadge: 'Leadership Development',
    heroTitle: 'Growth with Presence',
    heroSubtitle1: 'Mindful Consulting partners with organizations and individuals to develop conscious, effective leadership grounded in presence, clarity, and human connection.',
    heroSubtitle2: 'We believe leadership is not a fixed destination, but a continuous process of growth—shaped by awareness, thoughtful dialogue, and purposeful action. Our work integrates mindfulness with practical business realities, helping leaders navigate complexity while staying grounded, empathetic, and decisive.',
    heroButtonText: 'Our Mission',
    trustIndicatorsText: 'TRUSTED BY LEADING INDUSTRIES',
    trainingProgramsTitle: 'Our Training Programs',
    trainingProgramsSubtitle: 'Tailored programs to elevate your organization\'s potential.',
    videoTitle: 'The Ten Voices That Define the Experience',
    videoDescription: 'We\'ve asked AI to analyze from thousands of participants to distill the essence of their experience. These are 10 testimonials represent the most powerful and consistent themes that emerge time and again: practical application, masterful facilitation, and profound personal transformation.',
    videoClosing: 'These are their words!',
    ctaTitle: 'Ready to transform your leadership?',
    ctaDescription: 'Join the hundreds of leaders who have elevated their impact with Mindful Consulting.',
    ctaButtonText: 'Request a Proposal'
};

async function initializeHomeContent() {
    try {
        await db.collection('pages').doc('home').set(homeContent);
        console.log('✅ Home page content initialized successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error initializing home content:', error);
        process.exit(1);
    }
}

initializeHomeContent();
