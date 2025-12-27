const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const aboutContent = {
    heroBadge: 'Leadership Development Experts',
    heroTitle: 'Our Services',
    heroSubtitle: 'At Mindful Consulting, we create safe, thoughtful spaces where leaders can pause, reflect, and move forward with presence—supporting growth that is both human and sustainable.',
    workshopsIntro: 'Designed to be interactive, reflective, and immediately applicable:',
    ogyBadge: 'About Ogy',
    ogyName: 'Fauzihain (Ogy)',
    ogyIntro: 'Leadership consultant, facilitator, and mentor with 24 years of corporate experience across the oil & gas, banking, and research sectors, and 8 years as a dedicated leadership consultant and facilitator.',
    ogyParagraph1: 'Ogy is driven by a simple yet powerful purpose: to help people know something they didn\'t know before and do something they could not do before. Her work focuses on enabling sustainable behavior change through self-awareness, practical application, and continuous personal growth.',
    ogyParagraph2: 'She is known for her highly experiential and learner-centered facilitation style. She emphasizes real-life application, reflective learning, and the sharing of lived experiences to ensure that participants translate insight into action.',
    ogyParagraph3: 'Her leadership perspective is shaped by both Eastern and Western influences, with international exposure spanning Houston, Dallas, Melbourne, Jakarta, Malaysia, Brunei, Turkmenistan, Iraq, and Egypt.',
    credentialsTitle: 'Credentials & Expertise',
    focusAreasTitle: 'Areas of Focus',
    quoteText: 'The quality of our lives depends not on whether or not we have conflicts, but on how we respond to them.',
    quoteAuthor: 'Thomas Crum'
};

async function initializeAboutContent() {
    try {
        console.log('Initializing About page content...');

        await db.collection('pages').doc('about').set(aboutContent);

        console.log('✅ About page content initialized successfully!');
        console.log('Content:', aboutContent);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error initializing about content:', error);
        process.exit(1);
    }
}

initializeAboutContent();
