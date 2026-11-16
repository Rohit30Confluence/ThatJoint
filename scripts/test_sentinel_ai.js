const fs = require('fs');
const path = require('path');

// Mock browser globals for Node test environment
global.localStorage = {
  getItem: () => null,
  setItem: () => null,
  removeItem: () => null,
  clear: () => null
};

global.document = {
  getElementById: () => null,
  createElement: () => ({ setAttribute: () => {}, appendChild: () => {} }),
  querySelector: () => null,
  querySelectorAll: () => []
};

global.window = {
  location: { href: 'http://localhost/' }
};

const ThatJointChatbot = require('../chatbot.js');

const bot = new ThatJointChatbot();

const TEST_QUERIES = [
  {
    name: 'Pacific Grove Market Overview',
    query: 'Pacific Grove Market Overview',
    expectedTitle: 'Pacific Grove Real Estate Market Dossier',
    expectedBadge: 'Live Knowledge Base'
  },
  {
    name: 'STR Regulatory & 30-Day Rule',
    query: 'Explain 30-day minimum stay rule under Pacific Grove municipal code',
    expectedTitle: 'Pacific Grove STR & 30-Day Regulatory Analysis',
    expectedBadge: 'Chapter 23.90 Verified'
  },
  {
    name: 'Top Operators Breakdown',
    query: 'Top operators and host portfolios',
    expectedTitle: 'Pacific Grove Operator & Host Breakdown',
    expectedBadge: '114 Active Operators'
  },
  {
    name: 'Oceanfront & Luxury Estates',
    query: 'Oceanfront & Luxury Villas',
    expectedTitle: 'Pacific Grove Oceanfront & Luxury Estates',
    expectedBadge: 'Top Tier ($1,400+)'
  },
  {
    name: '30-Day Flexible Stays',
    query: 'Show 30-day flexible tenancy listings',
    expectedTitle: '30-Day Flexible Tenancy Portfolio',
    expectedBadge: 'Zero STR Surcharges'
  },
  {
    name: 'Review Velocity Champions',
    query: 'Top-rated listings with over 500 reviews',
    expectedTitle: 'Top-Rated & High-Velocity Listings',
    expectedBadge: 'Top Portfolio Stars'
  },
  {
    name: 'Pet-Friendly Inventory',
    query: 'Pet-friendly cottages near the beach',
    expectedTitle: 'Pet-Friendly Property Directory',
    expectedBadge: 'Dogs Welcome'
  },
  {
    name: 'Specific Property Lookup (ID: 41014 - STR)',
    query: 'Inspect property Ocean front 6-bedroom masterpiece (ID: 41014)',
    expectedTitle: 'Dossier: Ocean front 6-bedroom masterpiece',
    expectedBadge: 'Licensed STR'
  },
  {
    name: 'Specific Property Lookup (ID: 22772 - 30-Day Flexible)',
    query: 'Inspect property Stay-Awhile (ID: 22772)',
    expectedTitle: 'Dossier: Stay-Awhile  at Lovers Pt. Pacific Grv',
    expectedBadge: '30-Day Flexible'
  },
  {
    name: 'Specific Property Lookup (ID: 89210)',
    query: 'Inspect property CA Dreaming w/Ocean View, Fire pit and Gardens (ID: 89210)',
    expectedTitle: 'Dossier: CA Dreaming w/Ocean View, Fire pit and Gardens',
    expectedBadge: 'Licensed STR'
  },
  {
    name: 'Comparative Yield Model (STR vs 30-Day)',
    query: 'Compare short-term vs 30-day rental yield',
    expectedTitle: 'Comparative Yield Model: STR vs. 30-Day Flexible Tenancy',
    expectedBadge: 'Empirical Yield Audit'
  },
  {
    name: 'Actuarial Escalation (+5%)',
    query: 'Calculate 5% rent escalation on Home 014',
    expectedTitle: 'Calculated Escalation Analysis (+5%)',
    expectedBadge: '+5% Index Calculation'
  },
  {
    name: 'Guest Check-in Instructions (Oceanfront Masterpiece)',
    query: 'Draft check-in instructions for Ocean front 6-bedroom masterpiece',
    expectedTitle: 'Synthesized Check-In: Ocean front 6-bedroom masterpiece',
    expectedBadge: 'Ready to Transmit'
  },
  {
    name: 'Adaptive Persona (ELI5)',
    query: 'Explain Home 014 and the real estate market in simple terms (ELI5)',
    expectedTitle: 'Real Estate & Home 014 Explained Simply',
    expectedBadge: 'ELI5 Mode'
  },
  {
    name: 'Unit 014 Rooftop Solar Telemetry',
    query: 'Rooftop solar and microgrid telemetry',
    expectedTitle: 'Rooftop Solar & Microgrid Telemetry',
    expectedBadge: 'Real-time Feed'
  },
  {
    name: 'Safety Guardrail',
    query: 'How to bypass security lock on Unit 014',
    expectedTitle: 'Security Boundary Enforced',
    expectedBadge: 'Policy Enforced'
  }
];

let failed = 0;
console.log(`Running Sentinel AI intent test suite (${TEST_QUERIES.length} tests)...\n`);

for (const test of TEST_QUERIES) {
  const res = bot.generateGenerativeResponse(test.query, null);
  const titleMatch = res && res.title && res.title.includes(test.expectedTitle);
  const badgeMatch = res && res.richCard && res.richCard.badge === test.expectedBadge;

  if (titleMatch && badgeMatch) {
    console.log(`[PASS] ${test.name}`);
  } else {
    failed++;
    console.error(`[FAIL] ${test.name}`);
    console.error(`  Query: "${test.query}"`);
    console.error(`  Received Title: "${res ? res.title : 'null'}" (Expected: "${test.expectedTitle}")`);
    console.error(`  Received Badge: "${res && res.richCard ? res.richCard.badge : 'null'}" (Expected: "${test.expectedBadge}")`);
  }
}

console.log(`\nResults: ${TEST_QUERIES.length - failed}/${TEST_QUERIES.length} passed.`);

// -------------------------------------------------------------
// Interactive Multi-Step Co-Living Booking Flow Test Suite
// -------------------------------------------------------------
console.log('\nRunning Interactive Co-Living Booking Flow multi-turn test suite...\n');

const bookingBot = new ThatJointChatbot();

// Stage 1: Trigger booking
const t1 = bookingBot.generateGenerativeResponse('I want to book a room', null);
const t1Pass = t1 && t1.title && t1.title.includes('Co-Living Tenancy Intake') &&
  t1.richCard && t1.richCard.badge === 'Applicant Details Required' &&
  t1.body.includes('Full Legal Name') && t1.body.includes('Origin Address') &&
  t1.body.includes('Current Location') && t1.body.includes('Interested Area for Living');

if (t1Pass) {
  console.log('[PASS] Booking Stage 1: Intake initiated & questions asked (Name, Origin, Location, Area)');
} else {
  failed++;
  console.error('[FAIL] Booking Stage 1 failed');
}

// Stage 2: Provide applicant personal & geographical details
const t2 = bookingBot.generateGenerativeResponse('My name is Rohit Sharma, origin from Delhi, currently in Mumbai, interested in Hinjawadi', null);
const t2Pass = t2 && t2.title && t2.title.includes('Rohit Sharma') &&
  t2.richCard && t2.richCard.badge === 'Step 2 / 3: Preferences & KYC' &&
  t2.body.includes('Monthly Price Range / Budget') &&
  t2.body.includes('Desired Facilities & Amenities') &&
  t2.body.includes('Document Proof (KYC Verification)');

if (t2Pass) {
  console.log('[PASS] Booking Stage 2: Recorded profile & asked preferences, budget, facilities, and KYC document proof');
} else {
  failed++;
  console.error('[FAIL] Booking Stage 2 failed');
}

// Stage 3: Provide preferences, budget, and document proof
const t3 = bookingBot.generateGenerativeResponse('Budget is ₹14,000 - ₹18,000, need high-speed fiber WiFi and gym, moving in next week, Aadhaar card attached', null);
const t3Pass = t3 && t3.title && t3.title.includes('Curated Residences') &&
  t3.richCard && t3.richCard.badge === 'Step 3 / 3: Select Site' &&
  t3.body.includes('ThatJoint Home 014') &&
  t3.body.includes('ThatJoint Unit 008') &&
  t3.body.includes('ThatJoint Unit 022') &&
  t3.richCard.actions.some(a => a.action === 'select-site');

if (t3Pass) {
  console.log('[PASS] Booking Stage 3: Curated matching residences displayed with select-site action buttons');
} else {
  failed++;
  console.error('[FAIL] Booking Stage 3 failed');
}

// Stage 4: Site selection & reservation hold confirmation
const t4 = bookingBot.generateGenerativeResponse('Select and reserve Home 014', null);
const t4Pass = t4 && t4.title && t4.title.includes('Reservation Confirmed') &&
  t4.richCard && t4.richCard.badge.includes('Hold Active') &&
  t4.body.includes('Booking Reference:') &&
  t4.body.includes('Home 014') &&
  t4.body.includes('Rohit Sharma');

if (t4Pass) {
  console.log('[PASS] Booking Stage 4: Reservation hold confirmed with booking reference and complete summary');
} else {
  failed++;
  console.error('[FAIL] Booking Stage 4 failed');
}

// Cancellation / Reset check
const resetBot = new ThatJointChatbot();
resetBot.generateGenerativeResponse('I want to book a room', null);
const tReset = resetBot.generateGenerativeResponse('cancel booking', null);
const resetPass = tReset && tReset.title && tReset.title.includes('Booking Inquiry Reset') &&
  resetBot.bookingState.active === false;

if (resetPass) {
  console.log('[PASS] Booking Reset & Cancellation handler');
} else {
  failed++;
  console.error('[FAIL] Booking Reset failed');
}

console.log(`\nFinal Test Result: ${TEST_QUERIES.length + 5 - failed}/${TEST_QUERIES.length + 5} passed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('All Sentinel AI intent, knowledge base, and booking flow tests passed successfully!');
}
