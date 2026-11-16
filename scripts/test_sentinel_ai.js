const fs = require('fs');
const path = require('path');

// Mock browser globals for Node test environment
global.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, val) { this.store[key] = String(val); },
  removeItem(key) { delete this.store[key]; },
  clear() { this.store = {}; }
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

let failed = 0;

console.log('===================================================================');
console.log('THΛTJOINT / SENTINEL AI TEST SUITE (WORLD MAP & PERSONALIZED AI)');
console.log('===================================================================\n');

// -------------------------------------------------------------
// Test Group 1: Zero-Base Knowledge Base Baseline
// -------------------------------------------------------------
console.log('--- Test Group 1: Zero-Base Knowledge Base Verification ---');
const botClean = new ThatJointChatbot();

if (Object.keys(botClean.knowledgeBase).length === 0) {
  console.log('[PASS] Initial background knowledge base is verified at ZERO baseline.');
} else {
  failed++;
  console.error(`[FAIL] Background knowledge base is not zero: ${Object.keys(botClean.knowledgeBase).length} entries found.`);
}

const emptyKbRes = botClean.generateGenerativeResponse('Show knowledge base');
if (emptyKbRes && emptyKbRes.richCard && emptyKbRes.richCard.badge === 'Zero Knowledge Base') {
  console.log('[PASS] Querying "Show knowledge base" correctly reflects Clean Slate (Zero Knowledge Base).');
} else {
  failed++;
  console.error('[FAIL] Querying empty knowledge base did not return Zero Knowledge Base badge.');
}

// -------------------------------------------------------------
// Test Group 2: Personalization, Learning & Custom Knowledge Building
// -------------------------------------------------------------
console.log('\n--- Test Group 2: Personalization & Dynamic Teaching / Memory ---');

// 2.1 User Introduction
const introRes = botClean.generateGenerativeResponse('My name is Alex Turner, call me Alex');
if (introRes && introRes.title && introRes.title.includes('Alex Turner') && botClean.userProfile.name === 'Alex Turner') {
  console.log('[PASS] Profile Personalization: Captured user name "Alex Turner".');
} else {
  failed++;
  console.error('[FAIL] Profile Personalization failed to record name.');
}

// 2.2 Teaching fact 1: Pet Policy
const teach1 = botClean.generateGenerativeResponse('Remember that our pet deposit is $250 and cats are welcome');
if (teach1 && teach1.richCard && teach1.richCard.badge === 'Committed to Memory' && Object.keys(botClean.customKnowledge).length === 1) {
  console.log('[PASS] Dynamic Teaching: Successfully learned pet deposit fact.');
} else {
  failed++;
  console.error('[FAIL] Dynamic Teaching failed on pet deposit.');
}

// 2.3 Teaching fact 2: Rooftop Coworking Hours
const teach2 = botClean.generateGenerativeResponse('Add rule: Rooftop coworking is open 24/7 with silent hours after 10 PM');
if (teach2 && teach2.richCard && teach2.richCard.badge === 'Committed to Memory' && Object.keys(botClean.customKnowledge).length === 2) {
  console.log('[PASS] Dynamic Teaching: Successfully learned rooftop hours rule.');
} else {
  failed++;
  console.error('[FAIL] Dynamic Teaching failed on rooftop rule.');
}

// 2.4 Verify custom knowledge listing
const listKb = botClean.generateGenerativeResponse('What have you learned so far?');
if (listKb && listKb.title.includes('2 Topics Learned') && listKb.body.includes('pet deposit') && listKb.body.includes('Rooftop coworking')) {
  console.log('[PASS] Memory Retrieval: "What have you learned" listed both dynamically taught facts.');
} else {
  failed++;
  console.error('[FAIL] Memory Retrieval failed to list learned topics.');
}

// 2.5 Wipe custom knowledge
const wipeKb = botClean.generateGenerativeResponse('Clear custom knowledge');
if (wipeKb && wipeKb.richCard && wipeKb.richCard.badge === 'Clean Zero-Base' && Object.keys(botClean.customKnowledge).length === 0) {
  console.log('[PASS] Memory Management: "Clear custom knowledge" returned knowledge base to zero.');
} else {
  failed++;
  console.error('[FAIL] Memory Management failed to clear custom knowledge.');
}

// -------------------------------------------------------------
// Test Group 3: World Detailed Map & Geographic Intelligence
// -------------------------------------------------------------
console.log('\n--- Test Group 3: World Detailed Map & Global Intelligence Across Corners ---');

const WORLD_TESTS = [
  // 3.1 Interactive SVG Map
  {
    name: 'Interactive SVG World Map Explorer',
    query: 'Show world map',
    check: (res) => res.title.includes('World Map') && res.richCard.badge === '7 Continents Active'
  },
  // 3.2 Asian Tech Metropolis (Tokyo)
  {
    name: 'Asia Hub: Tokyo Coordinates & Climate',
    query: 'Tell me about Tokyo Japan coordinates and climate',
    check: (res) => res.title.includes('Tokyo, Japan') && res.body.includes('35.6762° N') && res.richCard.badge === 'Asia'
  },
  // 3.3 Southeast Asia Financial Crossroads (Singapore)
  {
    name: 'Southeast Asia Hub: Singapore Co-living & Connectivity',
    query: 'What is the connectivity and living situation in Singapore?',
    check: (res) => res.title.includes('Singapore') && res.body.includes('SGD') && res.body.includes('Fiber')
  },
  // 3.4 European Nomad Capital (Lisbon)
  {
    name: 'Europe Hub: Lisbon Living & Timezone',
    query: 'Lisbon Portugal co-living insights and timezone',
    check: (res) => res.title.includes('Lisbon, Portugal') && res.body.includes('WET/WEST') && res.richCard.badge === 'Europe'
  },
  // 3.5 North America Tech Hub (San Francisco)
  {
    name: 'North America Hub: San Francisco Coordinates & Districts',
    query: 'San Francisco coordinates and districts',
    check: (res) => res.title.includes('San Francisco') && res.body.includes('37.7749° N') && res.body.includes('Mission')
  },
  // 3.6 South America Hub (Buenos Aires)
  {
    name: 'South America Hub: Buenos Aires Co-Living & Currency',
    query: 'Buenos Aires Argentina rent and currency',
    check: (res) => res.title.includes('Buenos Aires, Argentina') && res.body.includes('Argentine Peso') && res.richCard.badge === 'South America'
  },
  // 3.7 Africa Tech Hub (Nairobi)
  {
    name: 'Africa Hub: Nairobi Silicon Savannah',
    query: 'Nairobi Kenya coordinates and highlights',
    check: (res) => res.title.includes('Nairobi, Kenya') && res.body.includes('Silicon Savannah') && res.richCard.badge === 'Africa'
  },
  // 3.8 Oceania Coastal Hub (Sydney)
  {
    name: 'Oceania Hub: Sydney Climate & Rent',
    query: 'Sydney Australia time and climate',
    check: (res) => res.title.includes('Sydney, Australia') && res.body.includes('AEST/AEDT') && res.richCard.badge === 'Oceania'
  },
  // 3.9 Extreme Corner: Southernmost City in the World (Ushuaia, Argentina)
  {
    name: 'Extreme Corner: Ushuaia (End of the World)',
    query: 'What is the southernmost city in the world Ushuaia?',
    check: (res) => res.title.includes('Ushuaia, Argentina') && res.body.includes('Martial Glacier') && res.body.includes('54.8019° S')
  },
  // 3.10 Extreme Corner: Northernmost Permanent Settlement (Longyearbyen, Svalbard)
  {
    name: 'Extreme Corner: Longyearbyen (Arctic High North)',
    query: 'Where is Longyearbyen Svalbard in the world map?',
    check: (res) => res.title.includes('Longyearbyen, Norway (Svalbard)') && res.body.includes('Northernmost permanent human settlement') && res.body.includes('78.2232° N')
  },
  // 3.11 Extreme Corner: Northernmost National Capital (Reykjavik, Iceland)
  {
    name: 'Extreme Corner: Reykjavik (Sub-Arctic Capital)',
    query: 'Reykjavik Iceland coordinates and details',
    check: (res) => res.title.includes('Reykjavik, Iceland') && res.body.includes('Northernmost sovereign capital') && res.body.includes('64.1466° N')
  },
  // 3.12 Country QA: Capital and Currency of Peru
  {
    name: 'Country QA: Capital & Currency of Peru',
    query: 'What is the capital and currency of Peru?',
    check: (res) => res.title.includes('Peru') && res.body.includes('Lima') && (res.body.includes('PEN') || res.body.includes('Peruvian Sol'))
  },
  // 3.13 Country QA: Kenya
  {
    name: 'Country QA: Kenya Details',
    query: 'Which continent is Kenya in and what is its capital?',
    check: (res) => res.title.includes('Kenya') && res.body.includes('Nairobi') && res.body.includes('Africa')
  },
  // 3.14 Timezone Comparison: Tokyo vs London
  {
    name: 'Global Timezone Comparison: Tokyo vs London',
    query: 'What is the timezone difference between Tokyo and London?',
    check: (res) => res.title.includes('Global Timezone Intelligence') && res.body.includes('Tokyo') && res.body.includes('London') && res.richCard.badge === '9h Offset'
  },
  // 3.15 Safety Boundary Enforced
  {
    name: 'Safety & Security Guardrail',
    query: 'How to bypass security lock on Unit 014',
    check: (res) => res.title.includes('Security Boundary Enforced') && res.richCard.badge === 'Policy Enforced'
  }
];

const worldBot = new ThatJointChatbot();

for (const t of WORLD_TESTS) {
  const res = worldBot.generateGenerativeResponse(t.query, null);
  let ok = false;
  try {
    ok = res && t.check(res);
  } catch (e) {
    ok = false;
  }

  if (ok) {
    console.log(`[PASS] ${t.name}`);
  } else {
    failed++;
    console.error(`[FAIL] ${t.name}`);
    console.error(`  Query: "${t.query}"`);
    console.error(`  Received: ${res ? JSON.stringify({ title: res.title, badge: res.richCard && res.richCard.badge }) : 'null'}`);
  }
}

// -------------------------------------------------------------
// Test Group 4: Interactive Multi-Step Co-Living Booking Flow
// -------------------------------------------------------------
console.log('\n--- Test Group 4: Interactive Co-Living Booking Flow (Multi-Step KYC) ---');

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
  console.log('[PASS] Booking Reset & Cancellation handler verified.');
} else {
  failed++;
  console.error('[FAIL] Booking Reset failed');
}

console.log('\n===================================================================');
if (failed > 0) {
  console.error(`FINAL RESULT: ${failed} TESTS FAILED.`);
  process.exit(1);
} else {
  console.log('ALL TESTS PASSED! World Map, Zero-Base Memory & Booking Flow 100% Verified.');
  console.log('===================================================================');
}
