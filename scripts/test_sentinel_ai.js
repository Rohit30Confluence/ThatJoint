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
if (failed > 0) {
  process.exit(1);
} else {
  console.log('All Sentinel AI intent and knowledge base tests passed successfully!');
}
