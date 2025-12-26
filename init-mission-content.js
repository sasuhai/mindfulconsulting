// Run this script to initialize mission page content in Firebase
// Usage: node init-mission-content.js

const admin = require('firebase-admin');
const serviceAccount = require('./mindfulconsulting-538b9-firebase-adminsdk-ql2oi-7e3f2e3c74.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const missionContent = {
    heroStatus: 'Our Purpose',
    heroTitle: 'Mission',
    heroSubtitle: 'To support leaders in their journey of self-discovery, enabling them to lead with purpose, open pathways for others, and awaken the power already within.',
    heroButtonText: 'Begin Your Journey →',

    coreValuesTitle: 'Core Values',
    coreValuesSubtitle: 'The principles that guide everything we do',
    values: [
        {
            number: '1️⃣',
            title: 'Inspire',
            description: 'We inspire individuals and organisations by being fully present — listening deeply, honouring each person\'s journey, and awakening clarity, courage, and possibility from within.',
            quote: 'Inspiration begins when people feel truly seen and heard.',
            color: '#7a8a6f'
        },
        {
            number: '2️⃣',
            title: 'Serve',
            description: 'We help wholeheartedly — with sincerity, humility, and commitment. Our work is grounded in genuine care, ethical practice, and the belief that meaningful change happens through trust and human connection.',
            quote: 'Service is not a transaction, but a relationship.',
            color: '#8b7355'
        },
        {
            number: '3️⃣',
            title: 'Grow',
            description: 'We honour nature as teacher and guide — embracing balance, cycles, and sustainability in leadership, learning, and life. Growth is nurtured, not forced.',
            quote: 'True growth follows natural rhythms.',
            color: '#5b7c8d'
        }
    ],

    howWeWorkTitle: 'How We Work',
    howWeWorkSubtitle: 'We work through partnership, not prescription.',
    howWeWorkPrinciples: [
        { icon: '👂', text: 'We listen first — deeply and without judgment' },
        { icon: '🤝', text: 'We respect each person\'s pace, readiness, and context' },
        { icon: '✨', text: 'We co-create paths forward rather than impose solutions' },
        { icon: '⚖️', text: 'We balance reflection with practical action' }
    ],
    howWeWorkClosing: 'Our approach honours the belief that meaningful growth unfolds naturally when the right conditions are present.',

    whatWeDoTitle: 'What We Do',
    services: [
        {
            icon: '🎯',
            title: 'Leadership Coaching',
            description: 'One-to-one coaching that supports leaders in gaining clarity, strengthening presence, and leading with authenticity and purpose.'
        },
        {
            icon: '👥',
            title: 'Executive & Team Development',
            description: 'Facilitated conversations and programs that build trust, alignment, and shared responsibility within leadership teams.'
        },
        {
            icon: '🧘',
            title: 'Mindful Leadership Workshops',
            description: 'Interactive sessions designed to cultivate awareness, communication, and sustainable leadership practices.'
        },
        {
            icon: '💭',
            title: 'Reflection & Growth Conversations',
            description: 'Structured spaces for leaders to pause, reflect, and explore challenges, transitions, or next chapters.'
        }
    ],

    whoWeServeTitle: 'Who We Serve',
    audiences: [
        'Leaders in transition or new roles',
        'Managers growing into leadership responsibility',
        'Organisations seeking more human-centred leadership',
        'Individuals exploring purpose, clarity, and direction'
    ],
    whoWeServeClosing: 'If you are open to reflection and growth, we are ready to walk alongside you.',
    whoWeServeButtonText: 'Start a Conversation →'
};

async function initMissionContent() {
    try {
        await db.collection('pages').doc('mission').set(missionContent);
        console.log('✅ Mission content initialized successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error initializing mission content:', error);
        process.exit(1);
    }
}

initMissionContent();
