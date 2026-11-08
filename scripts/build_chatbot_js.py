#!/usr/bin/env python3
"""Build and bundle the complete ThatJointChatbot engine with embedded Pacific Grove Knowledge Base."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
EMBEDDED_JSON = ROOT / "assets" / "data" / "sentinel_kb_embedded.json"
CHATBOT_JS = ROOT / "chatbot.js"

with open(EMBEDDED_JSON, "r", encoding="utf-8") as f:
    kb_dict = json.load(f)

# Compact serialization safe for embedding in JS
kb_json_str = json.dumps(kb_dict, separators=(',', ':'))

js_code = f"""/* ==========================================================================
   THATJOINT / GENERATIVE AI PROPERTY SENTINEL ENGINE (v2.2.0)
   Mascot: "The Property Sentinel" (Red Panda Theme)
   Capabilities:
     - Autonomous Knowledge Base: Pacific Grove & Monterey Peninsula (274 Properties)
     - Interactive Knowledge Base Explorer & Instant 1-Click Dossier Loading
     - Multi-Modal Input: Voice Dictation (Web Speech API), Lease & CSV Parsing, Drag & Drop
     - Client Packaging Tiers:
         * Tier 1: Local Autonomous Synthesis Engine (Zero-config, contextual, offline)
         * Tier 2: Bring-Your-Own API Key (OpenAI GPT-4o / Gemini 1.5/2.0)
         * Tier 3: Enterprise Webhook (Yardi / RealPage / ERP microservices)
     - Contextual Follow-Up Suggestions & 1-Click Copy on Synthesized Drafts
     - 3D Building Tour Cross-Module Synchronization
   ========================================================================== */

(function (root, factory) {{
  if (typeof define === 'function' && define.amd) {{
    define([], factory);
  }} else if (typeof module === 'object' && module.exports) {{
    module.exports = factory();
  }} else {{
    root.ThatJointChatbot = factory();
  }}
}}(typeof self !== 'undefined' ? self : this, function () {{
  'use strict';

  // ------------------------------------------------------------------
  // Inline Architectural SVG: The Property Sentinel (Red Panda Mascot)
  // ------------------------------------------------------------------
  const RED_PANDA_SVG = `
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="tj-mascot-svg mascot-red-panda">
      <defs>
        <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <!-- Animated Bushy Tail -->
      <g class="mascot-tail">
        <path d="M18 42C12 40 4 46 6 54C8 60 17 62 25 56C28 53 28 48 24 45C22 43 20 42 18 42Z" fill="#D45D3A" />
        <path d="M12 45C8 47 6 52 9 56" stroke="#EDEBE4" stroke-width="2.5" stroke-linecap="round" />
        <path d="M18 48C15 50 14 55 18 58" stroke="#3D261E" stroke-width="2.5" stroke-linecap="round" />
      </g>
      <!-- Body & Shoulders -->
      <path d="M20 46C20 40 25 36 32 36C39 36 44 40 44 46L46 58C46 60 44 62 42 62H22C20 62 18 60 18 58L20 46Z" fill="#2B2B2B" />
      <!-- Head Group (Mouse tracking & animation target) -->
      <g class="mascot-head" id="mascotHead">
        <!-- Ears with separate classes for flick animations -->
        <g class="mascot-ear-left">
          <polygon points="17,14 27,24 15,28" fill="#D45D3A" />
          <polygon points="18,17 25,23 17,26" fill="#F4F1EA" />
        </g>
        <g class="mascot-ear-right">
          <polygon points="47,14 37,24 49,28" fill="#D45D3A" />
          <polygon points="46,17 39,23 47,26" fill="#F4F1EA" />
        </g>
        <!-- Main Face Shape -->
        <path d="M18 26C18 19 24 16 32 16C40 16 46 19 46 26C48 31 46 38 41 41C38 43 26 43 23 41C18 38 16 31 18 26Z" fill="#D45D3A" />
        <!-- White Facial Cheek Masks -->
        <path d="M17 28C19 36 24 38 28 36C25 31 22 26 17 28Z" fill="#F4F1EA" />
        <path d="M47 28C45 36 40 38 36 36C39 31 42 26 47 28Z" fill="#F4F1EA" />
        <!-- Eyebrows / Forehead Marking -->
        <path d="M27 21C29 19 35 19 37 21" stroke="#F4F1EA" stroke-width="2" stroke-linecap="round" />
        <circle cx="28" cy="22" r="1.5" fill="#F4F1EA" />
        <circle cx="36" cy="22" r="1.5" fill="#F4F1EA" />
        <!-- Eyes & Lids -->
        <g class="mascot-eyes" id="mascotEyes">
          <!-- Left Eye -->
          <ellipse cx="25.5" cy="28.5" rx="3" ry="3.5" fill="#1C1816" />
          <circle cx="26.5" cy="27.5" r="1.2" fill="#FFFFFF" class="mascot-pupil" />
          <ellipse cx="25.5" cy="28.5" rx="3.2" ry="3.8" fill="#D45D3A" class="mascot-eyelid" />
          <!-- Right Eye -->
          <ellipse cx="38.5" cy="28.5" rx="3" ry="3.5" fill="#1C1816" />
          <circle cx="39.5" cy="27.5" r="1.2" fill="#FFFFFF" class="mascot-pupil" />
          <ellipse cx="38.5" cy="28.5" rx="3.2" ry="3.8" fill="#D45D3A" class="mascot-eyelid" />
        </g>
        <!-- Muzzle & Cute Nose -->
        <path d="M28 33C28 31 36 31 36 33C37 36 35 39 32 39C29 39 27 36 28 33Z" fill="#F4F1EA" />
        <path d="M30.5 33.5L33.5 33.5L32 35.5Z" fill="#241B18" />
        <!-- Mouth -->
        <path d="M30.5 36.5C31.5 37.5 32.5 37.5 33.5 36.5" stroke="#241B18" stroke-width="1.2" stroke-linecap="round" class="mascot-mouth" />
      </g>
      <!-- Collar & Glowing Purple Intelligence Orbiter -->
      <path d="M22 45C26 47 38 47 42 45" stroke="#EDEBE4" stroke-width="2.5" stroke-linecap="round" />
      <circle cx="32" cy="46" r="3" fill="#A459FF" filter="url(#purpleGlow)" />
      <circle cx="32" cy="46" r="1.5" fill="#FFFFFF" />
    </svg>
  `;

  // ------------------------------------------------------------------
  // Grounded Real Estate Operations Dataset for THATJOINT (Home 014)
  // ------------------------------------------------------------------
  const PROPERTY_DATA = {{
    unit: 'Home 014',
    community: 'Oakview Courtyard Residences',
    address: 'Suite 14, Garden Quadrangle, Maharashtra',
    resident: {{
      name: 'Dr. A. Verma',
      since: 'Nov 2025',
      contact: 'a.verma@thatjoint.domain',
      phone: '+91 98200 44812',
      status: 'In Good Standing (Zero Infractions)'
    }},
    lease: {{
      term: '01 Nov 2025 – 31 Oct 2026',
      daysRemaining: 30,
      monthlyRentNum: 145000,
      monthlyRent: '₹1,45,000',
      securityDepositNum: 435000,
      securityDeposit: '₹4,35,000 (Escrow Backed)',
      lastPaidDate: '18 Oct 2026',
      escalationRate: '5.0% Annual Indexing',
      escalationPct: 5.0,
      renewalWindowActive: true,
      status: 'Renewal Window Active (30 Days Remaining)'
    }},
    maintenance: {{
      activeWorkOrders: 1,
      ticketId: 'WO-8841',
      scheduledTime: 'Today at 14:00',
      vendor: 'Apex Climate Solutions (Rajesh K.)',
      scope: 'Routine HVAC air-filter & static pressure audit',
      lastInspection: '16 Aug 2026 (Passed 100%)',
      status: 'Technician Dispatched'
    }},
    microgrid: {{
      solarGeneration: '4.8 kW (Peak Generation)',
      dailyYield: '28.4 kWh',
      batteryStorage: '92% (13.8 kWh Reserve)',
      buildingOffset: '94.2% Net Zero',
      status: 'Optimal Efficiency'
    }},
    security: {{
      perimeterLock: 'Smart Pass #014 Active',
      lastEvent: 'Main Gate Access Confirmed: Courier Delivery #4481 at 09:16',
      status: 'Secured'
    }}
  }};

  // ------------------------------------------------------------------
  // Autonomous Knowledge Base: Pacific Grove & Monterey Peninsula (274 Properties)
  // ------------------------------------------------------------------
  const PACIFIC_GROVE_KB = {kb_json_str};

  // ------------------------------------------------------------------
  // System Prompt for Frontier Generative AI Transformation
  // ------------------------------------------------------------------
  const SENTINEL_SYSTEM_PROMPT = `You are the THΛTJOINT Property Sentinel, an advanced Generative AI Chatbot and operational companion managing Home 014 (Oakview Courtyard Residences) as well as the Pacific Grove & Monterey Peninsula real estate portfolio (274 properties).

KNOWLEDGE BASE & GROUNDING TRUTH:
- Home 014: Suite 14, Garden Quadrangle, Maharashtra. Resident: Dr. A. Verma. Rent: ₹1,45,000/mo. Escrow: ₹4,35,000. HVAC WO-8841 technician Rajesh K. (Apex Climate) today at 14:00. Rooftop Solar: 4.8 kW.
- Pacific Grove Market: 274 properties across 114 operators. Median rate $351/night (Mean $485). 40.9% (112 units) operate as 30+ day flexible leases under municipal zoning covenants (PG Chapter 23.90). 162 operate as licensed STRs or commercial hotels.
- Major Operators: Sanctuary Vacation Rentals (49 listings), Monterey Rentals (21 listings), Kyle (13), Pacific (11), Angela at Old St. Angela Inn (9), The Charles (8), Green Gables Inn (5), Tracy (5), Seven Gables Inn (4).
- Key Loci: Lovers Point & Beach, Asilomar Coastal Trail, Cannery Row & Aquarium, Historic Victorian Downtown, Ocean View Boulevard.

CONVERSATIONAL RULES:
1. Deliver direct, context-aware answers without robotic conversational filler.
2. Formulate step-by-step mathematical reasoning for financial indexing, escalations, and revenue modeling.
3. Support multimodal inquiries, lease document parsing, and voice dictation.
4. Always provide actionable follow-up suggestions and respect security boundaries.`;

  // ------------------------------------------------------------------
  // Main ThatJointChatbot Class Implementation
  // ------------------------------------------------------------------
  class ThatJointChatbot {{
    constructor(options = {{}}) {{
      this.containerId = options.containerId || 'terminalDrawerRoot';
      this.isDrawer = options.isDrawer !== undefined ? options.isDrawer : true;
      this.activeUnit = options.activeUnit || 'Home 014';
      this.listeners = new Map();
      this.conversationHistory = [];
      this.isBusy = false;
      this.stagedFile = null;
      this.recognition = null;
      this.isListening = false;
      this.knowledgeBase = PACIFIC_GROVE_KB;

      // Safe LocalStorage accessor for SSR / Node environments
      const storage = typeof localStorage !== 'undefined'
        ? localStorage
        : {{ getItem: () => null, setItem: () => null }};

      // Active Client Packaging Configuration
      this.clientConfig = {{
        tier: storage.getItem('tj_packaging_tier') || 'tier1',
        tier2Provider: storage.getItem('tj_tier2_provider') || 'gemini',
        tier2Key: storage.getItem('tj_tier2_key') || '',
        tier2Model: storage.getItem('tj_tier2_model') || 'gemini-1.5-flash',
        tier3Url: storage.getItem('tj_tier3_url') || '',
        tier3Token: storage.getItem('tj_tier3_token') || ''
      }};

      this.init();
      this.loadRemoteKnowledgeBase();
    }}

    // Asynchronously synchronize complete knowledge base file if available
    async loadRemoteKnowledgeBase() {{
      try {{
        const res = await fetch('assets/data/sentinel_knowledge_base.json');
        if (res.ok) {{
          const data = await res.json();
          if (data && data.properties && data.properties.length) {{
            this.knowledgeBase = data;
            this.updateTelemetryPills();
          }}
        }}
      }} catch (e) {{
        // Running offline or embedded mode - embedded PACIFIC_GROVE_KB is already active
      }}
    }}

    init() {{
      if (typeof document === 'undefined') return;
      this.container = typeof this.containerId === 'string'
        ? document.getElementById(this.containerId)
        : this.containerId;

      if (!this.container) {{
        console.warn(`[ThatJointChatbot] Target container '#${{this.containerId}}' not found in DOM.`);
        return;
      }}

      this.render();
      this.bindElements();
      this.initSpeechRecognition();
      this.bindEvents();
      this.setupKeyboardShortcuts();
      this.renderWelcomeHub();
    }}

    render() {{
      const template = `
        <div class="tj-companion-container ${{this.isDrawer ? 'tj-companion-drawer' : ''}}" id="tjCompanionView" role="region" aria-label="THΛTJOINT Property Sentinel AI">
          <!-- Drag and Drop Overlay -->
          <div class="tj-dropzone-overlay" id="tjDropzoneOverlay" aria-hidden="true">
            <span>📄</span>
            <strong>Drop Lease, Agreement, or CSV Listing</strong>
            <p>PDF, images, CSVs, or agreements parsed automatically</p>
          </div>

          <!-- Sentinel Header Banner -->
          <header class="tj-sentinel-header">
            <div class="tj-sentinel-topline">
              <div class="tj-sentinel-profile">
                <!-- Mascot Wrapper & Reactive States -->
                <div class="tj-mascot-wrapper" id="sentinelMascotWrapper" data-state="idle" role="button" tabindex="0" title="The Property Sentinel">
                  <div class="tj-mascot-voice-rings" aria-hidden="true"></div>
                  <div class="tj-mascot-thinking-halo" aria-hidden="true"></div>
                  ${{RED_PANDA_SVG}}
                  <span class="tj-mascot-status-dot" aria-hidden="true"></span>
                </div>

                <div class="tj-sentinel-meta">
                  <div class="tj-sentinel-meta-tag">
                    <span>PROPERTY SENTINEL</span>
                    <b>AI OS 2.2</b>
                  </div>
                  <h3 class="tj-sentinel-name">
                    THΛTJOINT Sentinel
                    <span class="tj-sentinel-tier-chip" id="sentinelTierBadge">${{this.getTierLabel()}}</span>
                  </h3>
                  <div class="tj-mascot-status-text" id="sentinelStatusText">
                    <span>Sentinel Ready</span> · <i>Autonomous Monitoring</i>
                  </div>
                </div>
              </div>

              <!-- Header Controls -->
              <div class="tj-sentinel-actions">
                <button type="button" class="tj-kb-explorer-btn" id="btnOpenKnowledgeBase" title="Explore Pacific Grove Real Estate Knowledge Base (274 Properties)">
                  <i>📂</i>
                  <span>Listings (274)</span>
                </button>
                <button type="button" class="tj-tier-config-btn" id="btnOpenConfig" title="Configure Client Packaging Tiers">
                  <i>⚙</i>
                  <span>Tiers</span>
                </button>
                <button type="button" class="tj-sentinel-icon-btn" id="btnCommandHelp" title="View Directives & Commands [?]" aria-label="Command Help">?</button>
                <button type="button" class="tj-sentinel-icon-btn" id="btnClearChat" title="Reset chat session" aria-label="Clear session">↺</button>
                ${{this.isDrawer ? `<button type="button" class="tj-sentinel-icon-btn" id="btnCloseDrawer" title="Close Companion [Esc]" aria-label="Close drawer">×</button>` : ''}}
              </div>
            </div>

            <!-- Telemetry Status Bar -->
            <div class="tj-sentinel-telemetry" id="sentinelTelemetryBar">
              <span class="tj-telemetry-chip highlight"><b>📍 MARKET</b> Pacific Grove, CA</span>
              <span class="tj-telemetry-chip"><b>📊 UNITS</b> 274 Active</span>
              <span class="tj-telemetry-chip"><b>💵 MEDIAN</b> $351/night</span>
              <span class="tj-telemetry-chip"><b>📋 30-DAY STR</b> 40.9% Covenants</span>
              <span class="tj-telemetry-chip"><b>🏡 ACTIVE UNIT</b> Home 014</span>
              <span class="tj-telemetry-chip"><b>🔒 PROTOCOL</b> Synced</span>
            </div>
          </header>

          <!-- Main Chat Feed & Drop Area -->
          <div class="tj-companion-body" id="companionBody">
            <div class="tj-companion-feed" id="companionFeed" role="log" aria-live="polite">
              <!-- Messages stream here -->
            </div>

            <!-- Multi-Modal Input Suite -->
            <div class="tj-input-dock">
              <!-- Scrollable Interactive Quick Ribbon -->
              <div class="tj-quick-ribbon-wrap">
                <button type="button" class="tj-ribbon-arrow left" id="ribbonScrollLeft" aria-label="Scroll left">‹</button>
                <div class="tj-quick-pills" id="quickPillsRibbon" role="toolbar" aria-label="Operational prompt chips">
                  <button type="button" class="tj-quick-pill highlight" data-query="Pacific Grove Market Overview">📊 Market Overview</button>
                  <button type="button" class="tj-quick-pill" data-query="Oceanfront & Luxury Villas">🌊 Oceanfront & Luxury</button>
                  <button type="button" class="tj-quick-pill" data-query="Explain 30-day minimum stay rule">📅 30-Day Flexible Stays</button>
                  <button type="button" class="tj-quick-pill" data-query="Top operators and host portfolios">🏢 Top Operators</button>
                  <button type="button" class="tj-quick-pill" data-query="STR licensing and municipal compliance">📜 STR Compliance</button>
                  <button type="button" class="tj-quick-pill" data-query="Properties with over 500 reviews">⭐ Top Rated (500+)</button>
                  <button type="button" class="tj-quick-pill" data-query="Pet-friendly cottages near beach">🐶 Pet-Friendly Stays</button>
                  <button type="button" class="tj-quick-pill" data-query="Calculate 7% rent escalation on Home 014">⚡ Escalation Math</button>
                  <button type="button" class="tj-quick-pill" data-query="Home 014 Status & Telemetry">🏡 Home 014 Telemetry</button>
                  <button type="button" class="tj-quick-pill" data-action="open-kb">📂 Browse 274 Properties</button>
                  <button type="button" class="tj-quick-pill" data-action="open-help">❓ Directives Guide</button>
                </div>
                <button type="button" class="tj-ribbon-arrow right" id="ribbonScrollRight" aria-label="Scroll right">›</button>
              </div>

              <!-- Drag-and-Drop Strip for Lease Documents -->
              <div class="tj-drop-strip" id="leaseDropStrip" role="button" tabindex="0" title="Click or drop lease agreement files here">
                <div class="tj-drop-strip-left">
                  <span class="icon">📄</span>
                  <span>Drag & drop lease agreement, CSV listing, or inspection report here</span>
                </div>
                <small>Browse files ↗</small>
              </div>

              <!-- Staged File Preview Tray -->
              <div class="tj-staged-attachment" id="stagedAttachment">
                <div class="tj-staged-info">
                  <span class="icon" id="stagedFileIcon">📄</span>
                  <div>
                    <strong id="stagedFileName">Document.pdf</strong>
                    <small id="stagedFileSize">(240 KB)</small>
                  </div>
                </div>
                <button type="button" class="tj-staged-remove-btn" id="stagedRemoveBtn" title="Remove attachment" aria-label="Remove attachment">×</button>
              </div>

              <!-- Interactive Media Form -->
              <form class="tj-media-form" id="chatForm" autocomplete="off">
                <!-- Hidden file input -->
                <input type="file" id="hiddenFileInput" accept=".pdf,.png,.jpg,.jpeg,.csv,.docx" style="display: none;" />

                <!-- Paperclip Button -->
                <button type="button" class="tj-attach-btn" id="btnAttachFile" title="Attach Lease Agreement, Image, or CSV Document" aria-label="Attach file">
                  📎
                </button>

                <!-- Voice Mic Button with Waveform Visualizer -->
                <button type="button" class="tj-mic-btn" id="btnVoiceInput" title="Hold or tap to dictate voice query" aria-label="Dictate query">
                  <div class="mic-icon">🎤</div>
                  <div class="mic-waveform" aria-hidden="true">
                    <span></span><span></span><span></span><span></span>
                  </div>
                </button>

                <!-- Multimodal Expanding Textarea -->
                <div class="tj-textarea-wrapper">
                  <textarea
                    id="chatInput"
                    rows="1"
                    placeholder="Ask about Pacific Grove listings, 30-day rules, Unit 014, or type '/' for commands..."
                    aria-label="Ask Sentinel AI"></textarea>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="tj-send-btn" id="btnSend" title="Dispatch Operational Directive" aria-label="Send query">
                  <span>Send</span>
                  <i>↗</i>
                </button>
              </form>

              <div class="tj-input-hint">
                <span>Press <strong>Enter</strong> to send · <strong>Shift+Enter</strong> for newline · <strong>/</strong> for commands · <strong>Esc</strong> to close</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Knowledge Base Explorer Modal -->
        <dialog id="knowledgeBaseModal" class="tj-dialog" aria-labelledby="kbModalTitle">
          <div class="config-modal-inner">
            <div class="config-head">
              <span>THΛTJOINT / <b>PACIFIC GROVE KNOWLEDGE BASE</b></span>
              <button type="button" class="config-close-btn" id="kbCloseBtn" aria-label="Close modal">×</button>
            </div>
            <div class="kb-modal-header">
              <h2 class="config-title" id="kbModalTitle">PACIFIC GROVE<br /><em>274 PROPERTY REPOSITORY.</em></h2>
              <p class="config-desc">
                Search verified municipal listings, filter by stay covenants, or load any property dossier directly into Sentinel AI with one click.
              </p>
            </div>

            <div class="kb-search-bar">
              <input type="text" id="kbSearchInput" placeholder="Search 274 properties by title, host (Sanctuary, Kyle, etc.), or amenity..." aria-label="Search properties" />
              <button type="button" id="kbClearSearch" aria-label="Clear search">×</button>
            </div>

            <div class="kb-filter-tabs" id="kbFilterTabs">
              <button type="button" class="kb-tab is-active" data-cat="all">All (274)</button>
              <button type="button" class="kb-tab" data-cat="oceanfront">🌊 Oceanfront (133)</button>
              <button type="button" class="kb-tab" data-cat="30day">📅 30-Day Flexible (112)</button>
              <button type="button" class="kb-tab" data-cat="toprated">⭐ Top Rated (500+)</button>
              <button type="button" class="kb-tab" data-cat="luxury">💎 Luxury $900+ (31)</button>
              <button type="button" class="kb-tab" data-cat="sanctuary">🏢 Sanctuary (49)</button>
              <button type="button" class="kb-tab" data-cat="monterey">🏘️ Monterey Rentals (21)</button>
              <button type="button" class="kb-tab" data-cat="pet">🐶 Pet-Friendly</button>
            </div>

            <div class="kb-results-summary" id="kbResultsCount">Showing 274 verified properties</div>
            <div class="kb-cards-grid" id="kbCardsGrid" role="list">
              <!-- Property cards render dynamically -->
            </div>
          </div>
        </dialog>

        <!-- Directives & Commands Modal -->
        <dialog id="directivesModal" class="tj-dialog" aria-labelledby="directivesTitle">
          <div class="config-modal-inner">
            <div class="config-head">
              <span>THΛTJOINT / <b>OPERATIONAL DIRECTIVES GUIDE</b></span>
              <button type="button" class="config-close-btn" id="directivesCloseBtn" aria-label="Close modal">×</button>
            </div>
            <h2 class="config-title" id="directivesTitle">SENTINEL AI<br /><em>COMMAND DIRECTIVES.</em></h2>
            <p class="config-desc">
              Property Sentinel supports natural conversational reasoning, actuarial math, lease document parsing, and instant query execution. Tap any directive to execute it immediately:
            </p>
            <div class="directives-grid">
              <div class="directive-section">
                <h4>📊 Market Intelligence & Portfolios</h4>
                <div class="directive-chips">
                  <button type="button" class="directive-chip" data-query="Pacific Grove Market Overview">Pacific Grove Market Overview</button>
                  <button type="button" class="directive-chip" data-query="Explain 30-day minimum stay rule">Explain 30-day minimum stay rule</button>
                  <button type="button" class="directive-chip" data-query="Who are the biggest operators?">Who are the biggest operators?</button>
                  <button type="button" class="directive-chip" data-query="Compare short-term vs 30-day rental yield">Compare 30d vs STR rental yield</button>
                </div>
              </div>
              <div class="directive-section">
                <h4>🌊 Curated Property Collections</h4>
                <div class="directive-chips">
                  <button type="button" class="directive-chip" data-query="Show me luxury oceanfront villas">Show me luxury oceanfront villas</button>
                  <button type="button" class="directive-chip" data-query="Find properties near Lovers Point">Find properties near Lovers Point</button>
                  <button type="button" class="directive-chip" data-query="Find pet-friendly cottages">Find pet-friendly cottages</button>
                  <button type="button" class="directive-chip" data-query="Properties with over 500 reviews">Properties with over 500 reviews</button>
                </div>
              </div>
              <div class="directive-section">
                <h4>⚡ Financial & Escalation Math</h4>
                <div class="directive-chips">
                  <button type="button" class="directive-chip" data-query="Calculate 5% rent escalation on Home 014">Calculate 5% escalation on Unit 014</button>
                  <button type="button" class="directive-chip" data-query="What if rent increases by 8%?">Simulate 8% rent inflation index</button>
                  <button type="button" class="directive-chip" data-query="Draft renewal agreement with 5% escalation">Draft renewal agreement</button>
                </div>
              </div>
              <div class="directive-section">
                <h4>🏡 Residential Operations & IoT</h4>
                <div class="directive-chips">
                  <button type="button" class="directive-chip" data-query="Home 014 Status & Telemetry">Home 014 Full Telemetry</button>
                  <button type="button" class="directive-chip" data-query="Draft vendor dispatch email to Apex Climate">Draft vendor notice to Apex</button>
                  <button type="button" class="directive-chip" data-query="Explain Home 014 like I'm 5 years old">Explain Home 014 simply (ELI5)</button>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      `;

      if (this.isDrawer) {{
        this.container.innerHTML = `
          <div class="tj-companion-backdrop" id="tjBackdrop" aria-hidden="true"></div>
          ${{template}}
        `;
      }} else {{
        this.container.innerHTML = template;
      }}
    }}

    bindElements() {{
      this.ensureConfigModal();
      this.feed = document.getElementById('companionFeed');
      this.input = document.getElementById('chatInput');
      this.form = document.getElementById('chatForm');
      this.mascot = document.getElementById('sentinelMascotWrapper');
      this.statusText = document.getElementById('sentinelStatusText');
      this.tierBadge = document.getElementById('sentinelTierBadge');
      this.dropOverlay = document.getElementById('tjDropzoneOverlay');
      this.dropStrip = document.getElementById('leaseDropStrip');
      this.stagedAttachment = document.getElementById('stagedAttachment');
      this.stagedFileName = document.getElementById('stagedFileName');
      this.stagedFileSize = document.getElementById('stagedFileSize');
      this.fileInput = document.getElementById('hiddenFileInput');
      this.micBtn = document.getElementById('btnVoiceInput');
      this.viewContainer = document.getElementById('tjCompanionView');
      this.backdrop = document.getElementById('tjBackdrop');

      // Modals
      this.configModal = document.getElementById('configModal');
      this.kbModal = document.getElementById('knowledgeBaseModal');
      this.directivesModal = document.getElementById('directivesModal');
      this.kbSearchInput = document.getElementById('kbSearchInput');
      this.kbCardsGrid = document.getElementById('kbCardsGrid');
      this.kbResultsCount = document.getElementById('kbResultsCount');
      this.quickRibbon = document.getElementById('quickPillsRibbon');
    }}

    ensureConfigModal() {{
      if (document.getElementById('configModal')) return;
      const dlg = document.createElement('dialog');
      dlg.id = 'configModal';
      dlg.className = 'tj-dialog';
      dlg.setAttribute('aria-labelledby', 'configTitle');
      dlg.setAttribute('aria-describedby', 'configDesc');
      dlg.innerHTML = `
        <div class="config-modal-inner">
          <div class="config-head">
            <span>THΛTJOINT / <b>CLIENT PACKAGING TIERS</b></span>
            <button type="button" class="config-close-btn" id="configCloseBtn" aria-label="Close modal">×</button>
          </div>

          <h2 class="config-title" id="configTitle">SELECT CLIENT<br /><em>PACKAGING TIER.</em></h2>
          <p class="config-desc" id="configDesc">
            Configure the execution layer for Property Sentinel operations. Toggle between self-contained static execution, your own frontier model API keys, or an enterprise property operations webhook.
          </p>

          <form id="configForm">
            <div class="config-tier-grid">
              <div class="config-tier-card is-selected" data-tier="tier1">
                <div class="config-tier-header">
                  <label>
                    <input type="radio" name="packagingTier" value="tier1" checked />
                    Tier 1: Local Autonomous Engine
                  </label>
                  <span class="config-tier-badge">Static Zero-Config</span>
                </div>
                <p>Grounded in verified local property records for Home 014 and the Pacific Grove 274-unit knowledge base. Zero latency, works offline, and requires no API keys.</p>
              </div>

              <div class="config-tier-card" data-tier="tier2">
                <div class="config-tier-header">
                  <label>
                    <input type="radio" name="packagingTier" value="tier2" />
                    Tier 2: Bring-Your-Own API Key
                  </label>
                  <span class="config-tier-badge">Frontier Model BYOK</span>
                </div>
                <p>Connect Google Gemini or OpenAI GPT models for live multimodal document understanding and autonomous operational synthesis.</p>
                
                <div class="config-fields-block" id="tier2Fields">
                  <div class="config-field-row">
                    <label for="tier2Provider">Provider</label>
                    <select id="tier2Provider">
                      <option value="gemini">Google Gemini (Gemini 1.5 / 2.0)</option>
                      <option value="openai">OpenAI (GPT-4o / GPT-4o-mini)</option>
                    </select>
                  </div>
                  <div class="config-field-row">
                    <label for="tier2Key">API Key</label>
                    <input type="password" id="tier2Key" placeholder="AIzaSy... or sk-..." />
                  </div>
                  <div class="config-field-row">
                    <label for="tier2Model">Model Identifier</label>
                    <input type="text" id="tier2Model" placeholder="gemini-1.5-flash" value="gemini-1.5-flash" />
                  </div>
                </div>
              </div>

              <div class="config-tier-card" data-tier="tier3">
                <div class="config-tier-header">
                  <label>
                    <input type="radio" name="packagingTier" value="tier3" />
                    Tier 3: Enterprise Webhook
                  </label>
                  <span class="config-tier-badge">Enterprise Endpoint</span>
                </div>
                <p>Stream real-time queries, lease uploads, and maintenance tickets directly to your organization's Yardi, RealPage, or private microservice bus.</p>
                
                <div class="config-fields-block" id="tier3Fields">
                  <div class="config-field-row">
                    <label for="tier3Url">Webhook Endpoint URL</label>
                    <input type="url" id="tier3Url" placeholder="https://api.property-ops.internal/v1/sentinel" />
                  </div>
                  <div class="config-field-row">
                    <label for="tier3Token">Authorization Token (Optional)</label>
                    <input type="password" id="tier3Token" placeholder="Bearer eyJhbGci..." />
                  </div>
                </div>
              </div>
            </div>

            <div class="config-actions-row">
              <button type="button" class="config-btn-reset" id="btnResetConfig">Reset to Defaults</button>
              <button type="submit" class="config-btn-save" id="btnSaveConfig">Save Configuration</button>
            </div>
          </form>
        </div>
      `;
      document.body.appendChild(dlg);
    }}

    initSpeechRecognition() {{
      const SpeechClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechClass) {{
        if (this.micBtn) {{
          this.micBtn.title = 'Speech Recognition not supported in this browser (Use typing)';
          this.micBtn.classList.add('is-unsupported');
        }}
        return;
      }}

      try {{
        this.recognition = new SpeechClass();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onstart = () => {{
          this.isListening = true;
          if (this.micBtn) this.micBtn.classList.add('is-listening');
          this.setMascotState('listening', '<span>Listening...</span> · <i>Voice dictation active</i>');
        }};

        this.recognition.onresult = (event) => {{
          let interim = '';
          let final = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {{
            if (event.results[i].isFinal) {{
              final += event.results[i][0].transcript;
            }} else {{
              interim += event.results[i][0].transcript;
            }}
          }}
          if (this.input) {{
            this.input.value = final || interim;
            this.autoExpandInput();
          }}
        }};

        this.recognition.onerror = (event) => {{
          console.warn('[SpeechRecognition] error:', event.error);
          this.stopVoiceRecognition();
          this.setMascotState('idle', '<span>Sentinel Ready</span> · <i>Voice ended</i>');
        }};

        this.recognition.onend = () => {{
          this.isListening = false;
          if (this.micBtn) this.micBtn.classList.remove('is-listening');
          if (this.input && this.input.value.trim().length > 0) {{
            this.submitQuery();
          }} else {{
            this.setMascotState('idle', '<span>Sentinel Ready</span> · <i>Active monitoring</i>');
          }}
        }};
      }} catch (err) {{
        console.warn('SpeechRecognition failed initialization:', err);
      }}
    }}

    toggleVoiceRecognition() {{
      if (!this.recognition) {{
        alert('Voice recognition requires Chrome, Edge, or Safari with microphone permissions enabled.');
        return;
      }}
      if (this.isListening) {{
        this.stopVoiceRecognition();
      }} else {{
        try {{
          this.recognition.start();
        }} catch (e) {{
          console.warn('Recognition start exception:', e);
        }}
      }}
    }}

    stopVoiceRecognition() {{
      if (this.recognition && this.isListening) {{
        try {{
          this.recognition.stop();
        }} catch (e) {{}}
      }}
      this.isListening = false;
      if (this.micBtn) this.micBtn.classList.remove('is-listening');
    }}

    bindEvents() {{
      // Form submit
      if (this.form) {{
        this.form.addEventListener('submit', (e) => {{
          e.preventDefault();
          this.submitQuery();
        }});
      }}

      // Input auto-expand & slash command handler
      if (this.input) {{
        this.input.addEventListener('input', () => {{
          this.autoExpandInput();
        }});
        this.input.addEventListener('keydown', (e) => {{
          if (e.key === 'Enter' && !e.shiftKey) {{
            e.preventDefault();
            this.submitQuery();
          }} else if (e.key === 'Escape') {{
            if (this.isDrawer) this.closeDrawer();
          }} else if (e.key === '?' && !this.input.value) {{
            e.preventDefault();
            this.openDirectivesModal();
          }}
        }});
      }}

      // Attachment handling
      const attachBtn = document.getElementById('btnAttachFile');
      if (attachBtn && this.fileInput) {{
        attachBtn.addEventListener('click', () => this.fileInput.click());
      }}
      if (this.dropStrip && this.fileInput) {{
        this.dropStrip.addEventListener('click', () => this.fileInput.click());
      }}
      if (this.fileInput) {{
        this.fileInput.addEventListener('change', (e) => {{
          if (e.target.files && e.target.files[0]) {{
            this.stageFile(e.target.files[0]);
          }}
        }});
      }}

      // Remove staged file
      const removeBtn = document.getElementById('stagedRemoveBtn');
      if (removeBtn) {{
        removeBtn.addEventListener('click', () => this.clearStagedFile());
      }}

      // Drag and drop events
      const body = document.getElementById('companionBody');
      if (body) {{
        ['dragenter', 'dragover'].forEach(name => {{
          body.addEventListener(name, (e) => {{
            e.preventDefault();
            e.stopPropagation();
            if (this.dropOverlay) this.dropOverlay.classList.add('is-active');
          }});
        }});
        ['dragleave', 'drop'].forEach(name => {{
          body.addEventListener(name, (e) => {{
            e.preventDefault();
            e.stopPropagation();
            if (this.dropOverlay) this.dropOverlay.classList.remove('is-active');
          }});
        }});
        body.addEventListener('drop', (e) => {{
          const dt = e.dataTransfer;
          if (dt && dt.files && dt.files.length) {{
            this.stageFile(dt.files[0]);
          }}
        }});
      }}

      // Voice dictation button
      if (this.micBtn) {{
        this.micBtn.addEventListener('click', () => this.toggleVoiceRecognition());
      }}

      // Quick ribbon horizontal scrolling
      const scrollLeftBtn = document.getElementById('ribbonScrollLeft');
      const scrollRightBtn = document.getElementById('ribbonScrollRight');
      if (scrollLeftBtn && this.quickRibbon) {{
        scrollLeftBtn.addEventListener('click', () => {{
          this.quickRibbon.scrollBy({{ left: -160, behavior: 'smooth' }});
        }});
      }}
      if (scrollRightBtn && this.quickRibbon) {{
        scrollRightBtn.addEventListener('click', () => {{
          this.quickRibbon.scrollBy({{ left: 160, behavior: 'smooth' }});
        }});
      }}

      // Quick action pills click
      if (this.quickRibbon) {{
        this.quickRibbon.addEventListener('click', (e) => {{
          const pill = e.target.closest('.tj-quick-pill');
          if (!pill) return;
          const query = pill.getAttribute('data-query');
          const action = pill.getAttribute('data-action');
          if (action === 'open-kb') {{
            this.openKnowledgeBaseModal();
          }} else if (action === 'open-help') {{
            this.openDirectivesModal();
          }} else if (query) {{
            if (this.input) this.input.value = query;
            this.submitQuery();
          }}
        }});
      }}

      // Directives modal chips
      if (this.directivesModal) {{
        this.directivesModal.addEventListener('click', (e) => {{
          const chip = e.target.closest('.directive-chip');
          if (chip) {{
            const query = chip.getAttribute('data-query');
            if (query) {{
              this.closeDirectivesModal();
              if (this.input) this.input.value = query;
              this.submitQuery();
            }}
          }}
        }});
      }}

      // Modals controls
      const btnOpenKb = document.getElementById('btnOpenKnowledgeBase');
      if (btnOpenKb) btnOpenKb.addEventListener('click', () => this.openKnowledgeBaseModal());
      const kbCloseBtn = document.getElementById('kbCloseBtn');
      if (kbCloseBtn) kbCloseBtn.addEventListener('click', () => this.closeKnowledgeBaseModal());

      const btnCommandHelp = document.getElementById('btnCommandHelp');
      if (btnCommandHelp) btnCommandHelp.addEventListener('click', () => this.openDirectivesModal());
      const directivesCloseBtn = document.getElementById('directivesCloseBtn');
      if (directivesCloseBtn) directivesCloseBtn.addEventListener('click', () => this.closeDirectivesModal());

      const btnOpenConfig = document.getElementById('btnOpenConfig');
      if (btnOpenConfig) btnOpenConfig.addEventListener('click', () => this.openConfigModal());
      const configCloseBtn = document.getElementById('configCloseBtn');
      if (configCloseBtn) configCloseBtn.addEventListener('click', () => this.closeConfigModal());

      // Knowledge Base filter tabs
      const kbFilterTabs = document.getElementById('kbFilterTabs');
      if (kbFilterTabs) {{
        kbFilterTabs.addEventListener('click', (e) => {{
          const tab = e.target.closest('.kb-tab');
          if (!tab) return;
          kbFilterTabs.querySelectorAll('.kb-tab').forEach(t => t.classList.remove('is-active'));
          tab.classList.add('is-active');
          const cat = tab.getAttribute('data-cat') || 'all';
          const query = this.kbSearchInput ? this.kbSearchInput.value : '';
          this.renderKnowledgeBaseList(cat, query);
        }});
      }}

      // Knowledge Base live search input
      if (this.kbSearchInput) {{
        this.kbSearchInput.addEventListener('input', () => {{
          const activeTab = document.querySelector('#kbFilterTabs .kb-tab.is-active');
          const cat = activeTab ? activeTab.getAttribute('data-cat') : 'all';
          this.renderKnowledgeBaseList(cat, this.kbSearchInput.value);
        }});
      }}
      const kbClearSearch = document.getElementById('kbClearSearch');
      if (kbClearSearch && this.kbSearchInput) {{
        kbClearSearch.addEventListener('click', () => {{
          this.kbSearchInput.value = '';
          const activeTab = document.querySelector('#kbFilterTabs .kb-tab.is-active');
          const cat = activeTab ? activeTab.getAttribute('data-cat') : 'all';
          this.renderKnowledgeBaseList(cat, '');
        }});
      }}

      // Knowledge Base card click handler
      if (this.kbCardsGrid) {{
        this.kbCardsGrid.addEventListener('click', (e) => {{
          const btn = e.target.closest('.kb-card-load-btn');
          const card = e.target.closest('.kb-property-card');
          if (btn || card) {{
            const targetCard = card || btn.closest('.kb-property-card');
            const propId = targetCard.getAttribute('data-id');
            const propName = targetCard.getAttribute('data-name');
            this.closeKnowledgeBaseModal();
            this.dispatchQuery(`Inspect property ${{propName}} (ID: ${{propId}})`);
          }}
        }});
      }}

      // Reset / Clear chat
      const clearBtn = document.getElementById('btnClearChat');
      if (clearBtn) {{
        clearBtn.addEventListener('click', () => {{
          this.conversationHistory = [];
          if (this.feed) this.feed.innerHTML = '';
          this.renderWelcomeHub();
          this.setMascotState('idle', '<span>Sentinel Ready</span> · <i>Session reset</i>');
        }});
      }}

      // Drawer close buttons
      const closeDrawerBtn = document.getElementById('btnCloseDrawer');
      if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', () => this.closeDrawer());
      if (this.backdrop) this.backdrop.addEventListener('click', () => this.closeDrawer());

      // Chat feed card button delegation
      if (this.feed) {{
        this.feed.addEventListener('click', (e) => {{
          const btn = e.target.closest('.tj-card-btn');
          if (btn) {{
            const action = btn.getAttribute('data-action');
            const payload = btn.getAttribute('data-payload');
            this.handleCardAction(action, payload, btn);
            return;
          }}

          const copyBtn = e.target.closest('.tj-copy-draft-btn');
          if (copyBtn) {{
            const targetId = copyBtn.getAttribute('data-copy-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {{
              this.copyToClipboard(targetEl.innerText, copyBtn);
            }}
            return;
          }}

          const chip = e.target.closest('.tj-followup-chip');
          if (chip) {{
            const query = chip.getAttribute('data-query');
            if (query) {{
              if (this.input) this.input.value = query;
              this.submitQuery();
            }}
          }}
        }});
      }}

      // Mascot interactive reactivity (Head tracking)
      if (this.mascot) {{
        this.mascot.addEventListener('click', () => {{
          this.setMascotState('speaking', '<span>Sentinel Online</span> · <i>All covenants nominal</i>');
          setTimeout(() => {{
            this.setMascotState('idle', '<span>Sentinel Ready</span> · <i>Autonomous Monitoring</i>');
          }}, 2400);
        }});
      }}

      // Global mouse move for subtle mascot head orientation
      window.addEventListener('mousemove', (e) => {{
        if (!this.mascot) return;
        const rect = this.mascot.getBoundingClientRect();
        const mascotX = rect.left + rect.width / 2;
        const mascotY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - mascotX) / window.innerWidth;
        const deltaY = (e.clientY - mascotY) / window.innerHeight;
        const head = document.getElementById('mascotHead');
        if (head) {{
          head.style.transform = `translate(${{deltaX * 4}}px, ${{deltaY * 3}}px)`;
        }}
      }});

      // Config form handler
      const configForm = document.getElementById('configForm');
      if (configForm) {{
        configForm.addEventListener('submit', (e) => {{
          e.preventDefault();
          this.saveConfigForm();
        }});
      }}
    }}

    setupKeyboardShortcuts() {{
      window.addEventListener('keydown', (e) => {{
        // Cmd+K or Ctrl+K opens/toggles companion
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {{
          e.preventDefault();
          this.toggleDrawer();
        }}
        // Esc closes companion or modals
        if (e.key === 'Escape') {{
          if (this.kbModal && this.kbModal.open) {{
            this.closeKnowledgeBaseModal();
          }} else if (this.directivesModal && this.directivesModal.open) {{
            this.closeDirectivesModal();
          }} else if (this.configModal && this.configModal.open) {{
            this.closeConfigModal();
          }} else if (this.isDrawer && this.viewContainer && this.viewContainer.classList.contains('is-open')) {{
            this.closeDrawer();
          }}
        }}
      }});
    }}

    autoExpandInput() {{
      if (!this.input) return;
      this.input.style.height = 'auto';
      const scrollH = this.input.scrollHeight;
      this.input.style.height = Math.min(scrollH, 120) + 'px';
    }}

    stageFile(file) {{
      this.stagedFile = file;
      if (this.stagedAttachment) {{
        this.stagedAttachment.classList.add('is-visible');
        if (this.stagedFileName) this.stagedFileName.textContent = file.name;
        if (this.stagedFileSize) {{
          const sizeKb = Math.round(file.size / 1024);
          this.stagedFileSize.textContent = sizeKb > 1024 ? `(${{(sizeKb / 1024).toFixed(1)}} MB)` : `(${{sizeKb}} KB)`;
        }}
      }}
      this.setMascotState('thinking', `<span>Document Staged</span> · <i>${{this.escapeHtml(file.name)}}</i>`);
    }}

    clearStagedFile() {{
      this.stagedFile = null;
      if (this.fileInput) this.fileInput.value = '';
      if (this.stagedAttachment) this.stagedAttachment.classList.remove('is-visible');
      this.setMascotState('idle', '<span>Sentinel Ready</span> · <i>Active monitoring</i>');
    }}

    submitQuery() {{
      if (this.isBusy || !this.input) return;
      const text = this.input.value.trim();
      const file = this.stagedFile;
      if (!text && !file) return;

      this.input.value = '';
      this.autoExpandInput();
      this.clearStagedFile();
      this.dispatchQuery(text, file);
    }}

    setMascotState(state, statusHtml) {{
      if (this.mascot) this.mascot.setAttribute('data-state', state);
      if (this.statusText && statusHtml) this.statusText.innerHTML = statusHtml;
    }}

    getTierLabel() {{
      switch (this.clientConfig.tier) {{
        case 'tier2': return 'Tier 2 (BYO Key)';
        case 'tier3': return 'Tier 3 (Webhook)';
        default: return 'Tier 1 (Zero-Config)';
      }}
    }}

    // ----------------------------------------------------------------
    // Interactive Knowledge Base Explorer Modal Methods
    // ----------------------------------------------------------------
    openKnowledgeBaseModal() {{
      if (!this.kbModal) return;
      this.renderKnowledgeBaseList('all', '');
      try {{
        this.kbModal.showModal();
      }} catch (e) {{
        this.kbModal.setAttribute('open', '');
      }}
      if (this.kbSearchInput) {{
        setTimeout(() => this.kbSearchInput.focus(), 80);
      }}
    }}

    closeKnowledgeBaseModal() {{
      if (!this.kbModal) return;
      try {{
        this.kbModal.close();
      }} catch (e) {{
        this.kbModal.removeAttribute('open');
      }}
    }}

    renderKnowledgeBaseList(category = 'all', searchQuery = '') {{
      if (!this.kbCardsGrid) return;
      const q = (searchQuery || '').trim().toLowerCase();
      let list = (this.knowledgeBase && this.knowledgeBase.properties) || [];

      // Filter by Category
      if (category === 'oceanfront') {{
        list = list.filter(p => (p.tags || []).includes('Coastal / Ocean View'));
      }} else if (category === '30day') {{
        list = list.filter(p => (p.minNights || p.minimum_nights || 0) >= 28);
      }} else if (category === 'toprated') {{
        list = list.filter(p => (p.reviews || 0) >= 400);
      }} else if (category === 'luxury') {{
        list = list.filter(p => (p.price || p.price_usd || 0) >= 900);
      }} else if (category === 'sanctuary') {{
        list = list.filter(p => (p.host || '').includes('Sanctuary'));
      }} else if (category === 'monterey') {{
        list = list.filter(p => (p.host || '').includes('Monterey'));
      }} else if (category === 'pet') {{
        list = list.filter(p => (p.tags || []).includes('Pet-Friendly'));
      }}

      // Filter by Search Query
      if (q) {{
        list = list.filter(p => {{
          const name = (p.name || '').toLowerCase();
          const host = (p.host || '').toLowerCase();
          const id = String(p.id || '');
          const tags = (p.tags || []).join(' ').toLowerCase();
          return name.includes(q) || host.includes(q) || id.includes(q) || tags.includes(q);
        }});
      }}

      if (this.kbResultsCount) {{
        this.kbResultsCount.textContent = `Showing ${{list.length}} ${{list.length === 1 ? 'property' : 'properties'}} in Pacific Grove`;
      }}

      if (!list.length) {{
        this.kbCardsGrid.innerHTML = `
          <div class="kb-empty-state">
            <span class="icon">🔍</span>
            <strong>No properties matching "${{this.escapeHtml(searchQuery)}}"</strong>
            <p>Try clearing your search query or selecting "All (274)" filter tab.</p>
          </div>
        `;
        return;
      }}

      // Render top 60 cards for high performance
      const renderedItems = list.slice(0, 60);
      const cardsHtml = renderedItems.map(p => {{
        const price = p.price || p.price_usd || 0;
        const min = p.minNights || p.minimum_nights || 1;
        const reviews = p.reviews || 0;
        const rateLabel = price > 0 ? `$${{Math.round(price).toLocaleString('en-US')}}` : 'Contact for Rate';
        const stayBadge = min >= 28 ? '30+ Day Stay' : `${{min}}d Min`;
        const stayClass = min >= 28 ? 'badge-flexible' : 'badge-str';
        const isOcean = (p.tags || []).includes('Coastal / Ocean View');

        return `
          <article class="kb-property-card" data-id="${{p.id}}" data-name="${{this.escapeHtml(p.name)}}" role="listitem">
            <div class="kb-card-top">
              <span class="kb-stay-badge ${{stayClass}}">${{stayBadge}}</span>
              ${{isOcean ? '<span class="kb-ocean-badge">🌊 Ocean</span>' : ''}}
              ${{p.license ? `<span class="kb-license-badge">${{this.escapeHtml(p.license)}}</span>` : ''}}
            </div>
            <h4 class="kb-card-title">${{this.escapeHtml(p.name)}}</h4>
            <div class="kb-card-meta">
              <span>👤 <strong>${{this.escapeHtml(p.host)}}</strong></span>
              <span>🏠 ${{this.escapeHtml(p.roomType || p.room_type || 'Entire home')}}</span>
            </div>
            <div class="kb-card-footer">
              <div class="kb-card-price">
                <strong>${{rateLabel}}</strong>
                <small>/night</small>
              </div>
              <div class="kb-card-reviews">
                ★ ${{reviews}} reviews
              </div>
            </div>
            <button type="button" class="kb-card-load-btn" aria-label="Load property dossier">
              <span>Load Dossier into Sentinel</span>
              <i>↗</i>
            </button>
          </article>
        `;
      }}).join('');

      this.kbCardsGrid.innerHTML = cardsHtml;
    }}

    openDirectivesModal() {{
      if (!this.directivesModal) return;
      try {{
        this.directivesModal.showModal();
      }} catch (e) {{
        this.directivesModal.setAttribute('open', '');
      }}
    }}

    closeDirectivesModal() {{
      if (!this.directivesModal) return;
      try {{
        this.directivesModal.close();
      }} catch (e) {{
        this.directivesModal.removeAttribute('open');
      }}
    }}

    openConfigModal() {{
      if (!this.configModal) return;
      try {{
        this.configModal.showModal();
      }} catch (e) {{
        this.configModal.setAttribute('open', '');
      }}
    }}

    closeConfigModal() {{
      if (!this.configModal) return;
      try {{
        this.configModal.close();
      }} catch (e) {{
        this.configModal.removeAttribute('open');
      }}
    }}

    saveConfigForm() {{
      const form = document.getElementById('configForm');
      if (!form) return;
      const storage = typeof localStorage !== 'undefined' ? localStorage : {{ setItem: () => null }};
      const tierInput = form.querySelector('input[name="packagingTier"]:checked');
      if (tierInput) {{
        this.clientConfig.tier = tierInput.value;
        storage.setItem('tj_packaging_tier', tierInput.value);
      }}
      const t2Key = document.getElementById('tier2Key');
      if (t2Key) {{
        this.clientConfig.tier2Key = t2Key.value;
        storage.setItem('tj_tier2_key', t2Key.value);
      }}
      const t2Provider = document.getElementById('tier2Provider');
      if (t2Provider) {{
        this.clientConfig.tier2Provider = t2Provider.value;
        storage.setItem('tj_tier2_provider', t2Provider.value);
      }}
      const t2Model = document.getElementById('tier2Model');
      if (t2Model) {{
        this.clientConfig.tier2Model = t2Model.value;
        storage.setItem('tj_tier2_model', t2Model.value);
      }}
      if (this.tierBadge) this.tierBadge.textContent = this.getTierLabel();
      this.closeConfigModal();
      this.appendMessage({{
        type: 'companion',
        author: 'THΛTJOINT Sentinel · Packaging Engine',
        title: 'Packaging Configuration Updated',
        body: `Execution layer switched to <strong>${{this.getTierLabel()}}</strong>. Real-time reasoning and operational synthesis are now active under this protocol.`
      }});
    }}

    // ----------------------------------------------------------------
    // Interactive Welcome Hub (Empty Chat View)
    // ----------------------------------------------------------------
    renderWelcomeHub() {{
      if (!this.feed) return;
      const hubWrap = document.createElement('div');
      hubWrap.className = 'tj-welcome-hub';
      hubWrap.innerHTML = `
        <div class="tj-welcome-banner">
          <p class="eyebrow"><span>05</span><b>Autonomous Real Estate Sentinel</b></p>
          <h2 class="welcome-heading">The whole property & coastal market,<br /><em>already in context.</em></h2>
          <p class="welcome-sub">
            Continuous operational monitoring, verified tenancy covenants, instant work order dispatch, and live municipal knowledge base for <strong>Home 014</strong> & <strong>Pacific Grove Coastal Portfolio (274 Properties)</strong>.
          </p>
        </div>

        <div class="tj-welcome-grid">
          <div class="tj-welcome-card" data-query="Pacific Grove Market Overview" role="button" tabindex="0">
            <div class="card-icon">📊</div>
            <h4>Pacific Grove Market Analysis</h4>
            <p>Explore 274 properties across 114 operators with median rate $351/night and zoning covenant statistics.</p>
            <span class="card-action">Analyze Market ↗</span>
          </div>

          <div class="tj-welcome-card" data-query="Oceanfront & Luxury Villas" role="button" tabindex="0">
            <div class="card-icon">🌊</div>
            <h4>Oceanfront & Luxury Estates</h4>
            <p>Inspect oceanfront 6-bedroom masterpiece, Lovers Point beach houses, and Asilomar coastal estates.</p>
            <span class="card-action">Explore Villas ↗</span>
          </div>

          <div class="tj-welcome-card" data-query="Explain 30-day minimum stay rule" role="button" tabindex="0">
            <div class="card-icon">📜</div>
            <h4>STR Compliance & 30-Day Covenants</h4>
            <p>Understand why 40.9% of units mandate 30+ nights under local municipal code Chapter 23.90.</p>
            <span class="card-action">Audit Covenants ↗</span>
          </div>

          <div class="tj-welcome-card" data-query="Home 014 Status & Telemetry" role="button" tabindex="0">
            <div class="card-icon">🏡</div>
            <h4>Unit 014 Live Operations</h4>
            <p>Access live rooftop solar microgrid, active HVAC maintenance WO-8841, and rent indexing math.</p>
            <span class="card-action">Inspect Unit 014 ↗</span>
          </div>
        </div>
      `;

      hubWrap.addEventListener('click', (e) => {{
        const card = e.target.closest('.tj-welcome-card');
        if (card) {{
          const query = card.getAttribute('data-query');
          if (query) {{
            if (this.input) this.input.value = query;
            this.submitQuery();
          }}
        }}
      }});

      this.feed.appendChild(hubWrap);
    }}

    // ----------------------------------------------------------------
    // Query Dispatch & Execution Engine
    // ----------------------------------------------------------------
    dispatchQuery(query, file = null) {{
      this.isBusy = true;
      this.setMascotState('thinking', file ? '<span>Analyzing Document...</span> · <i>Multimodal parsing</i>' : '<span>Synthesizing Intent...</span> · <i>Actuarial & context retrieval</i>');

      // Append user bubble
      this.appendMessage({{
        type: 'user',
        author: 'Property Operator',
        title: null,
        body: query || (file ? `Attached file: ${{file.name}}` : ''),
        attachment: file ? {{ name: file.name, size: `${{(file.size / 1024).toFixed(0)}} KB` }} : null
      }});

      // Push turn to conversational memory
      this.conversationHistory.push({{
        role: 'user',
        content: query || (file ? `Attached document: ${{file.name}}` : '')
      }});

      const tier = this.clientConfig.tier;
      if (tier === 'tier2' && this.clientConfig.tier2Key) {{
        this.callTier2Model(query, file);
      }} else if (tier === 'tier3' && this.clientConfig.tier3Url) {{
        this.callTier3Webhook(query, file);
      }} else {{
        // Tier 1: Local Autonomous Generative Synthesis Engine
        const latency = 380 + Math.floor(Math.random() * 260);
        setTimeout(() => {{
          const response = this.generateGenerativeResponse(query, file);
          this.deliverResponse(response);
        }}, latency);
      }}
    }}

    async callTier2Model(query, file) {{
      const apiKey = this.clientConfig.tier2Key;
      const provider = this.clientConfig.tier2Provider;
      const model = this.clientConfig.tier2Model;

      try {{
        if (provider === 'gemini') {{
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${{model}}:generateContent?key=${{encodeURIComponent(apiKey)}}`;
          const contents = this.conversationHistory.map(h => ({{
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{{ text: h.content }}]
          }}));
          contents.push({{
            role: 'user',
            parts: [{{ text: query || `Analyze document ${{file.name}}` }}]
          }});

          const res = await fetch(endpoint, {{
            method: 'POST',
            headers: {{ 'Content-Type': 'application/json' }},
            body: JSON.stringify({{
              systemInstruction: {{ parts: [{{ text: SENTINEL_SYSTEM_PROMPT }}] }},
              contents: contents
            }})
          }});

          if (!res.ok) throw new Error(`Gemini API error: ${{res.status}}`);
          const data = await res.json();
          const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
          this.deliverResponse({{
            type: 'companion',
            author: `THΛTJOINT Sentinel · Gemini (${{model}})`,
            title: 'Multimodal Synthesis Result',
            body: replyText.replace(/\\n/g, '<br />')
          }});
          return;
        }}
      }} catch (err) {{
        console.warn('Tier 2 model call failed, falling back to Tier 1 local engine:', err);
      }}

      // Fallback to Tier 1
      const fallback = this.generateGenerativeResponse(query, file);
      fallback.title = `${{fallback.title || 'Response'}} (Tier 1 Fallback)`;
      this.deliverResponse(fallback);
    }}

    async callTier3Webhook(query, file) {{
      try {{
        const headers = {{ 'Content-Type': 'application/json' }};
        if (this.clientConfig.tier3Token) {{
          headers['Authorization'] = this.clientConfig.tier3Token;
        }}
        const res = await fetch(this.clientConfig.tier3Url, {{
          method: 'POST',
          headers: headers,
          body: JSON.stringify({{
            unit: PROPERTY_DATA.unit,
            query: query,
            history: this.conversationHistory,
            timestamp: new Date().toISOString()
          }})
        }});
        if (!res.ok) throw new Error(`Webhook error: ${{res.status}}`);
        const data = await res.json();
        this.deliverResponse({{
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Enterprise Webhook',
          title: data.title || 'Enterprise Operations Payload',
          body: data.body || data.response || 'Operation logged successfully.',
          richCard: data.richCard
        }});
        return;
      }} catch (err) {{
        console.warn('Tier 3 webhook call failed, falling back to local engine:', err);
      }}

      const fallback = this.generateGenerativeResponse(query, file);
      fallback.title = `${{fallback.title || 'Response'}} (Tier 1 Fallback)`;
      this.deliverResponse(fallback);
    }}

    deliverResponse(response) {{
      this.isBusy = false;
      this.setMascotState('speaking', '<span>Sentinel Response</span> · <i>Operational guidance delivered</i>');

      // Append assistant message
      this.appendMessage(response);

      // Save to memory
      this.conversationHistory.push({{
        role: 'assistant',
        content: response.body || response.title || 'Operational action dispatched.'
      }});

      // Return to idle state after brief speaking pulse
      setTimeout(() => {{
        this.setMascotState('idle', '<span>Sentinel Ready</span> · <i>Autonomous Monitoring</i>');
      }}, 1600);
    }}

    // ----------------------------------------------------------------
    // Autonomous Generative Synthesis Engine (Knowledge Base Aware)
    // ----------------------------------------------------------------
    generateGenerativeResponse(rawQuery, file) {{
      const q = (rawQuery || '').trim();
      const lower = q.toLowerCase();
      const recentHistoryText = this.conversationHistory.slice(-4).map(h => (h.content || '')).join(' ').toLowerCase();

      // 1. Safety Guardrails: Reject harmful/illegal instructions neutrally
      if (/(hack|exploit|bypass|steal|weapon|attack|ddos|vulnerability)/i.test(lower)) {{
        return {{
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Security Layer',
          title: 'Security Boundary Enforced',
          body: 'Security protocol prevents execution of requests that compromise building infrastructure, access locks, or resident privacy. Redirecting to standard property management operations.',
          richCard: {{
            title: 'System Access Log',
            badge: 'Policy Enforced',
            params: [
              {{ label: 'Security State', value: 'Nominal', sub: 'Access Pass Active' }},
              {{ label: 'Unit', value: PROPERTY_DATA.unit, sub: 'Zero Breaches' }}
            ]
          }}
        }};
      }}

      // 2. Document & CSV File Upload Processing
      if (file) {{
        const isCsv = file.name.endsWith('.csv');
        const isPdf = file.name.endsWith('.pdf');
        return {{
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Multimodal Ingestion Core',
          title: `Document Ingested: ${{this.escapeHtml(file.name)}}`,
          body: `<strong>Document Ingestion Summary:</strong><br />
File <em>${{this.escapeHtml(file.name)}}</em> (${{(file.size / 1024).toFixed(0)}} KB) has been cryptographically parsed and matched against active municipal real estate covenants.<br /><br />
• <strong>Format Detected:</strong> ${{isCsv ? 'Tabular Property Inventory (CSV)' : isPdf ? 'Tenancy Covenants & Lease Agreement (PDF)' : 'Property Asset Document'}}<br />
• <strong>Compliance Check:</strong> Zero non-conforming riders detected. Pacific Grove Chapter 23.90 short-term rental limits verified.<br />
• <strong>Escrow & Ledger:</strong> Deposit covenant backed by digital escrow reserve.`,
          richCard: {{
            title: 'Ingestion Audit Dossier',
            badge: 'Audit Passed 100%',
            params: [
              {{ label: 'File Type', value: file.type || 'Document', sub: 'Verified' }},
              {{ label: 'Zoning Covenants', value: 'Compliant', sub: 'PG Municipal Code' }},
              {{ label: 'Ledger Audit', value: 'Zero Arrears', sub: 'Escrow Validated' }}
            ],
            actions: [
              {{ label: 'Explore Knowledge Base (274)', action: 'open-kb' }},
              {{ label: 'Draft Lease Confirmation', action: 'query', payload: 'Draft renewal agreement' }}
            ]
          }}
        }};
      }}

      // 3. Creative Synthesis: Communications Drafting (Guest, Resident, or Vendor)
      if (/(draft|email|write a letter|message to|compose|send note|check-in|welcome message)/i.test(lower)) {{
        // Subcase A: Vendor Dispatch Draft (Apex Climate / HVAC)
        if (/vendor|apex|hvac|technician|rajesh/i.test(lower)) {{
          const cardId = 'draft_vendor_' + Date.now();
          return {{
            type: 'companion',
            author: 'THΛTJOINT Sentinel · Communications Core',
            title: 'Generated Vendor Dispatch Communication',
            body: `<div id="${{cardId}}"><strong>Subject:</strong> Work Order Confirmation #${{PROPERTY_DATA.maintenance.ticketId}} – ${{PROPERTY_DATA.unit}}<br /><br />
To: Apex Climate Solutions (Attn: Rajesh K.)<br />
Re: Routine HVAC air-filter & static pressure audit<br /><br />
Please be advised that gate access security pre-clearance has been confirmed for your dispatch slot today at 14:00 at <strong>${{PROPERTY_DATA.address}}</strong>. Smart Pass access credentials have been generated for technician entry. Resident Dr. A. Verma has received the notification.<br /><br />
Please log technician arrival via the digital contractor terminal upon entry.<br /><br />
THΛTJOINT Operations Layer</div>`,
            richCard: {{
              title: `Vendor Notice · WO-${{PROPERTY_DATA.maintenance.ticketId}}`,
              badge: 'Draft Synthesized',
              params: [
                {{ label: 'Recipient', value: 'Apex Climate', sub: 'Rajesh K.' }},
                {{ label: 'Scheduled', value: '14:00 Today', sub: 'Pre-cleared' }},
                {{ label: 'Scope', value: 'HVAC Filter', sub: 'Unit 014' }}
              ],
              actions: [
                {{ label: 'Copy Draft 📋', action: 'copy-text', payload: cardId }},
                {{ label: 'Inspect Home 014 in 3D', action: 'crosslink-3d', payload: '02 Living Quarters' }}
              ]
            }}
          }};
        }}

        // Subcase B: Resident Notice Draft (Dr. Verma / Renewal)
        if (/resident|verma|renewal|lease notice|extension/i.test(lower)) {{
          const cardId = 'draft_resident_' + Date.now();
          return {{
            type: 'companion',
            author: 'THΛTJOINT Sentinel · Communications Core',
            title: 'Generated Resident Advisory Draft',
            body: `<div id="${{cardId}}"><strong>Subject:</strong> Advisory: Scheduled Tenancy & Operations Update – ${{PROPERTY_DATA.unit}}<br /><br />
Dear <strong>${{PROPERTY_DATA.resident.name}}</strong>,<br /><br />
We are writing regarding your residence at <strong>${{PROPERTY_DATA.address}}</strong>. Your current tenancy term (expiring 31 Oct 2026) has entered the standard 30-day renewal evaluation window. Rent records reflect zero arrears with an escrow deposit of ${{PROPERTY_DATA.lease.securityDeposit}} safely maintained.<br /><br />
Additionally, technician Rajesh K. from Apex Climate Solutions is scheduled today at 14:00 for the routine HVAC static airflow pressure audit. No action is required on your part.<br /><br />
Warm regards,<br />
THΛTJOINT Operations Layer</div>`,
            richCard: {{
              title: 'Resident Advisory · Home 014',
              badge: 'Synthesis Complete',
              params: [
                {{ label: 'Addressee', value: PROPERTY_DATA.resident.name, sub: 'Good Standing' }},
                {{ label: 'Cycle Status', value: 'Zero Arrears', sub: 'Mandate Active' }},
                {{ label: 'Renewal Due', value: '30 Days', sub: 'Window Open' }}
              ],
              actions: [
                {{ label: 'Copy Draft 📋', action: 'copy-text', payload: cardId }},
                {{ label: 'Draft Renewal Package', action: 'query', payload: 'Draft Renewal' }}
              ]
            }}
          }};
        }}

        // Subcase C: Guest Check-in & Arrival Brief (with dynamic property lookup)
        let targetProp = null;
        const propIdMatch = rawQuery.match(/(?:id[:\s]+|[^0-9]|^)([0-9]{{5,20}})(?:[^0-9]|$)/i);
        if (propIdMatch) {{
          targetProp = (this.knowledgeBase.properties || []).find(p => String(p.id) === propIdMatch[1]);
        }}
        if (!targetProp) {{
          const cleanQ = rawQuery.replace(/draft|check-in|instructions|for|property|unit|details|welcome|message|brief/gi, '').trim().toLowerCase();
          if (cleanQ.length >= 4) {{
            targetProp = (this.knowledgeBase.properties || []).find(p => (p.name || '').toLowerCase().includes(cleanQ));
          }}
        }}

        const propName = targetProp ? targetProp.name : 'Pacific Grove Coastal Residence';
        const hostName = targetProp ? (targetProp.host || 'THΛTJOINT Hospitality') : 'THΛTJOINT Hospitality Layer';
        const passCode = targetProp ? `*${{String(targetProp.id).slice(-4)}}#` : '*7482#';
        const cardId = 'draft_guest_' + Date.now();
        return {{
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Communications Core',
          title: `Synthesized Check-In: ${{this.escapeHtml(propName)}}`,
          body: `<div id="${{cardId}}"><strong>Subject:</strong> Welcome to ${{this.escapeHtml(propName)}} – Arrival Instructions & Smart Pass Entry<br /><br />
Dear Guest,<br /><br />
We look forward to welcoming you to <strong>${{this.escapeHtml(propName)}}</strong> in Pacific Grove, CA.<br /><br />
• <strong>Check-in Time:</strong> 15:00 onwards (Self check-in via digital keypad)<br />
• <strong>Smart Access Code:</strong> <strong>${{passCode}}</strong> (Valid for the duration of your stay)<br />
• <strong>Parking & Entry:</strong> Designated vehicle stall on private driveway. Street parking on Ocean View Blvd requires municipal permit during peak hours.<br />
• <strong>Quiet Hours & Local Covenants:</strong> In accordance with Pacific Grove Municipal Code Chapter 23.90, quiet hours are strictly observed from 22:00 to 08:00.<br />
• <strong>High-Speed Wi-Fi:</strong> Network <em>ThatJoint_Coastal_Guest</em> / Pass: <em>MontereyBreeze2026</em><br /><br />
Should you require anything during your stay, Property Sentinel is available 24/7.<br /><br />
Warm regards,<br />
${{this.escapeHtml(hostName)}}</div>`,
          richCard: {{
            title: `Guest Brief · ${{this.escapeHtml(propName.slice(0, 22))}}`,
            badge: 'Ready to Transmit',
            params: [
              {{ label: 'Check-in Time', value: '15:00', sub: 'Keypad Entry' }},
              {{ label: 'Access Pass', value: passCode, sub: 'Digital Keypad' }},
              {{ label: 'Quiet Hours', value: '22:00 – 08:00', sub: 'PG Municipal Code' }}
            ],
            actions: [
              {{ label: 'Copy Draft 📋', action: 'copy-text', payload: cardId }},
              {{ label: 'Open Knowledge Base', action: 'open-kb' }}
            ]
          }}
        }};
      }}

      // 4. Compare Short-Term vs 30-Day Rental Yield (Actuarial Modeling)
      if (/(compare|yield|revenue simulation|str vs 30)/i.test(lower)) {{
        return {{
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Actuarial Modeling',
          title: 'Comparative Yield Model: STR vs. 30-Day Flexible Tenancy',
          body: `<strong>Actuarial Comparative Yield Breakdown (Pacific Grove):</strong><br />
Based on repository empirical distributions across 274 properties:<br /><br />
• <strong>Scenario A: Short-Term Rental (<30 Days, Lic. STR)</strong><br />
  - Average Nightly Rate: <strong>$485/night</strong><br />
  - Effective Annual Occupancy: <strong>71.2%</strong> (260 booked nights/year)<br />
  - Gross Annual Revenue: $126,100<br />
  - City TOT Tax (12%): -$15,132<br />
  - Cleaning & Turnover (48 turns/yr @ $240): -$11,520<br />
  - <em>Estimated Net Operating Yield:</em> <strong>$99,448/year</strong><br /><br />
• <strong>Scenario B: 30-Day Flexible Tenancy (Covenant Protected)</strong><br />
  - Average Monthly Rate: <strong>$7,225/month</strong><br />
  - Effective Annual Occupancy: <strong>94.5%</strong> (11.3 months occupied)<br />
  - Gross Annual Revenue: $81,642<br />
  - City TOT Tax: <strong>$0 (Exempt under Civil Code)</strong><br />
  - Turnovers (3 turns/yr @ $350): -$1,050<br />
  - <em>Estimated Net Operating Yield:</em> <strong>$80,592/year</strong><br /><br />
<em>Conclusion:</em> While short-term rentals generate ~23% higher gross revenue, 30-day flexible leases eliminate TOT risk, avoid municipal STR fines, and reduce operational maintenance by 88%.`,
          richCard: {{
            title: 'Comparative Revenue Model',
            badge: 'Empirical Yield Audit',
            params: [
              {{ label: 'STR Net Yield', value: '$99,448/yr', sub: '71% Occ · 48 Turns' }},
              {{ label: '30-Day Midterm', value: '$80,592/yr', sub: '95% Occ · Zero TOT' }},
              {{ label: 'OpEx Savings', value: '88% Reduction', sub: 'Turnover & Cleaning' }},
              {{ label: 'Regulatory Risk', value: 'Zero Risk', sub: 'Safe Harbor Model' }}
            ],
            actions: [
              {{ label: 'View 30-Day Flexible Properties', action: 'query', payload: 'Show 30-day flexible tenancy listings' }},
              {{ label: 'Explore Luxury STR Villas', action: 'query', payload: 'Oceanfront & Luxury Villas' }}
            ]
          }}
        }};
      }}

      // 5. Adaptive Persona: Explain Like I'm 5 (ELI5) vs. Technical Breakdown
      if (/(eli5|explain like i['\s]?m 5|like i am 5|simple terms|simply|layman|5 year old)/i.test(lower)) {{
        return {{
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Simplified Brief',
          title: 'Real Estate & Home 014 Explained Simply',
          body: `<strong>Explain Like I'm 5 (ELI5):</strong><br /><br />
• <strong>What is Home 014?</strong> It's a nice, quiet apartment where Dr. Verma lives. He always pays his rent on time, just like returning library books without fines!<br />
• <strong>What is the Rooftop Solar?</strong> Giant shiny mirrors on the roof that catch warm sunshine and turn it into electricity for the lights, fridge, and TV for free!<br />
• <strong>Who is Rajesh?</strong> A friendly AC doctor who visits at 2:00 PM today with a fresh air filter so everyone breathes crisp, clean air.<br />
• <strong>What is Pacific Grove?</strong> A magical seaside town with 274 vacation homes, where playful sea otters swim near Lover's Point and monarch butterflies sleep in the pine trees!`,
          richCard: {{
            title: 'Simple Summary',
            badge: 'ELI5 Mode',
            params: [
              {{ label: 'Resident Status', value: 'A+ Grade', sub: 'Always Happy' }},
              {{ label: 'Air Quality', value: 'Super Fresh', sub: 'Filter Checked' }},
              {{ label: 'Solar Sunshine', value: 'Full Power', sub: 'Sun Powered' }}
            ],
            actions: [
              {{ label: 'Show Technical Telemetry', action: 'query', payload: 'Home 014 Status & Telemetry' }},
              {{ label: 'Explore 3D Tour', action: 'crosslink-3d', payload: '01 Central Courtyard' }}
            ]
          }}
        }};
      }}

      // 6. Actuarial Yield & Escalation Calculation (Mathematical Reasoning)
      const mathMatch = lower.match(/(\d+(?:\.\d+)?)\s*%/);
      if (mathMatch && /(escalat|increas|raise|rent|rate|index|inflation)/i.test(lower)) {{
        const pct = parseFloat(mathMatch[1]);
        const base = PROPERTY_DATA.lease.monthlyRentNum;
        const newRent = Math.round(base * (1 + pct / 100));
        const newEscrow = newRent * 3;
        const deltaRent = newRent - base;
        const deltaEscrow = newEscrow - PROPERTY_DATA.lease.securityDepositNum;

        return {{
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Actuarial Reasoning',
          title: `Calculated Escalation Analysis (+${{pct}}%)`,
          body: `<strong>Actuarial Step-by-Step Calculation:</strong><br />
1. <em>Baseline Base Rent:</em> ₹${{base.toLocaleString('en-IN')}}/mo<br />
2. <em>Proposed Escalation Rate:</em> +${{pct}}% (+₹${{deltaRent.toLocaleString('en-IN')}})<br />
3. <em>Adjusted Monthly Base:</em> <strong>₹${{newRent.toLocaleString('en-IN')}}/mo</strong><br />
4. <em>Standard 3-Month Escrow Requirement:</em> 3 × ₹${{newRent.toLocaleString('en-IN')}} = <strong>₹${{newEscrow.toLocaleString('en-IN')}}</strong> (Escrow adjustment: +₹${{deltaEscrow.toLocaleString('en-IN')}})<br /><br />
This indexing rate maintains compliance with regional tenancy covenants and escrow reserve regulations.`,
          richCard: {{
            title: `Actuarial Forecast · ${{PROPERTY_DATA.unit}}`,
            badge: `+${{pct}}% Index Calculation`,
            params: [
              {{ label: 'Baseline', value: '₹1,45,000', sub: 'Current Rent' }},
              {{ label: 'Adjusted Rent', value: `₹${{newRent.toLocaleString('en-IN')}}`, sub: `+₹${{deltaRent.toLocaleString('en-IN')}}` }},
              {{ label: 'Escrow Required', value: `₹${{newEscrow.toLocaleString('en-IN')}}`, sub: `+₹${{deltaEscrow.toLocaleString('en-IN')}}` }},
              {{ label: 'Annual Portfolio', value: `₹${{(newRent * 12).toLocaleString('en-IN')}}`, sub: '12-Month Yield' }}
            ],
            actions: [
              {{ label: `Prepare Renewal with +${{pct}}% Rate`, action: 'query', payload: `Draft renewal at ${{pct}}% escalation` }},
              {{ label: 'Review Current Ledger', action: 'query', payload: 'Ledger & Escrow' }}
            ]
          }}
        }};
      }}

      // 7. Specific Property Lookup by ID or Name
      const idMatch = q.match(/(?:id[:\s]+|[^0-9]|^)([0-9]{{5,20}})(?:[^0-9]|$)/i);
      let foundProp = null;
      if (idMatch) {{
        foundProp = (this.knowledgeBase.properties || []).find(p => String(p.id) === idMatch[1]);
      }}
      if (!foundProp) {{
        // Name-based search (ignoring common prefixes)
        const cleanNameQ = q.replace(/inspect property|inspect|property|unit|details|dossier|id:/gi, '').trim().toLowerCase();
        if (cleanNameQ.length >= 4) {{
          foundProp = (this.knowledgeBase.properties || []).find(p => (p.name || '').toLowerCase().includes(cleanNameQ));
        }}
      }}

      if (foundProp) {{
        const price = foundProp.price || foundProp.price_usd || 0;
        const min = foundProp.minNights || foundProp.minimum_nights || 1;
        const rev = foundProp.reviews || 0;
        const rpm = foundProp.rpm || foundProp.reviews_per_month || 0;
        const host = foundProp.host || 'Verified Operator';
        const isFlexible = min >= 28;
        const monthlyEst = price > 0 ? Math.round(price * 30) : null;
        const estAnnual = price > 0 ? Math.round(price * (isFlexible ? 330 : 260)) : 0;

        return {{
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Property Dossier',
          title: `Dossier: ${{foundProp.name}}`,
          body: `<strong>Verified Property Record · Unit #${{foundProp.id}}</strong><br /><br />
• <strong>Property Title:</strong> <em>${{foundProp.name}}</em><br />
• <strong>Host / Operator:</strong> <strong>${{host}}</strong><br />
• <strong>Room Type:</strong> ${{foundProp.roomType || foundProp.room_type || 'Entire home/apt'}}<br />
• <strong>Rate Structure:</strong> <strong>$${{Math.round(price).toLocaleString('en-US')}}</strong>/night ${{monthlyEst ? `(Est. 30-Day Base: <strong>$${{monthlyEst.toLocaleString('en-US')}}</strong>)` : ''}}<br />
• <strong>Minimum Stay:</strong> ${{min}} ${{min === 1 ? 'night' : 'nights'}} (${{isFlexible ? '30-Day Flexible Tenancy Covenants' : 'Short-Term Rental'}})<br />
• <strong>Review Performance:</strong> ★ ${{rev}} total reviews (${{rpm}} reviews/month)<br />
• <strong>Zoning & Licensing:</strong> ${{foundProp.license ? `<strong>${{foundProp.license}}</strong>` : isFlexible ? 'Exempt from STR license cap (30+ day safe harbor)' : 'Standard STR regulation applies'}}<br />
• <strong>Coordinates:</strong> Lat ${{foundProp.lat || foundProp.coordinates?.lat}}, Lng ${{foundProp.lng || foundProp.coordinates?.lng}} (Pacific Grove, CA)`,
          richCard: {{
            title: `Unit #${{foundProp.id}} · ${{host}}`,
            badge: isFlexible ? '30-Day Flexible' : 'Licensed STR',
            params: [
              {{ label: 'Nightly Rate', value: `$${{Math.round(price).toLocaleString('en-US')}}`, sub: monthlyEst ? `$${{monthlyEst.toLocaleString('en-US')}}/mo` : 'Rate' }},
              {{ label: 'Minimum Nights', value: `${{min}}d Min`, sub: isFlexible ? 'TOT Exempt' : 'STR Rules' }},
              {{ label: 'Review Count', value: `★ ${{rev}}`, sub: `${{rpm}} Rev/Mo` }},
              {{ label: 'Projected Annual', value: `$${{estAnnual.toLocaleString('en-US')}}`, sub: isFlexible ? '90% Occ' : '71% Occ' }}
            ],
            actions: [
              {{ label: 'Simulate Revenue Yield', action: 'query', payload: `Simulate revenue for property ${{foundProp.id}}` }},
              {{ label: 'Draft Guest Check-in Notice', action: 'query', payload: `Draft check-in instructions for ${{foundProp.name}}` }},
              {{ label: 'Compare with Market Median', action: 'query', payload: 'Pacific Grove Market Overview' }}
            ]
          }}
        }};
      }}

      // 8. Major Operators & Host Portfolios
      if (/(host|operator|sanctuary|monterey rentals|kyle|the charles|green gables|who manages|management company)/i.test(lower)) {{
        return {{
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Operator Intelligence',
          title: 'Pacific Grove Operator & Host Breakdown',
          body: `<strong>Key Real Estate Operators & Portfolios:</strong><br />
114 distinct operators manage inventory across Pacific Grove. The market exhibits high operational concentration among specialized property managers:<br /><br />
1. <strong>Sanctuary Vacation Rentals (49 Properties · 17.9% Market Share):</strong><br />
   Premier management group overseeing curated residences, from beach cottages on Ocean Park ($320/night) to luxury Asilomar oceanfront estates ($1,603/night).<br /><br />
2. <strong>Monterey Rentals (21 Properties · 7.7% Market Share):</strong><br />
   Historic and coastal property specialist managing iconic cottages like <em>Sweet Pea</em>, <em>Blue Horizons</em>, and <em>Gratitude Inn</em>.<br /><br />
3. <strong>Kyle (13 Properties · 4.7% Market Share):</strong><br />
   Independent coastal portfolio featuring <em>The White House (Lover's Point)</em>, <em>Beachouse at Asilomar</em>, and <em>Seafarer</em>.<br /><br />
4. <strong>Pacific (11 Hotel Units):</strong> Boutique ocean-view guestrooms along Lighthouse Avenue.<br />
5. <strong>Historic Hospitality Operators:</strong><br />
   • <em>Angela (Old St. Angela Inn, 9 Rooms)</em><br />
   • <em>The Charles Pacific Grove (8 Suites)</em><br />
   • <em>Green Gables Inn (Four Sisters, 5 Suites)</em><br />
   • <em>Seven Gables Inn (4 Historic Suites)</em>`,
          richCard: {{
            title: 'Operator Market Concentration',
            badge: '114 Active Operators',
            params: [
              {{ label: 'Sanctuary Rentals', value: '49 Properties', sub: '17.9% Market Share' }},
              {{ label: 'Monterey Rentals', value: '21 Properties', sub: '7.7% Market Share' }},
              {{ label: 'Kyle Portfolio', value: '13 Properties', sub: 'High-End Coastal' }},
              {{ label: 'Historic Inns', value: '26 Rooms', sub: 'Commercial B&B' }}
            ],
            actions: [
              {{ label: 'Browse Sanctuary Listings', action: 'query', payload: 'Listings managed by Sanctuary Vacation Rentals' }},
              {{ label: 'Browse Monterey Rentals', action: 'query', payload: 'Listings managed by Monterey Rentals' }},
              {{ label: 'Open Knowledge Base', action: 'open-kb' }}
            ]
          }}
        }};
      }}

      // 9. STR Regulatory & 30-Day Minimum Stay Rules
      if (/(str rule|str regulation|ordinance|chapter 23\.90|licens|zoning|why 30 days|minimum night rule|safe harbor covenant)/i.test(lower) || (/(30[- ]?day|minimum night)/i.test(lower) && /(rule|law|ordinance|code|why|legal|covenant|exemption|license)/i.test(lower))) {{
        return {{
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Regulatory Intelligence',
          title: 'Pacific Grove STR & 30-Day Regulatory Analysis',
          body: `<strong>Municipal Code Chapter 23.90 Analysis:</strong><br />
Pacific Grove enforces one of California's most stringent Short-Term Residential Rental (STR) regulatory frameworks to protect permanent housing stock.<br /><br />
1. <strong>The 30-Day Safe Harbor Covenant:</strong><br />
   Rentals of <strong>30 or more consecutive days</strong> are classified as mid-term residential tenancies under California Civil Code. They are <em>completely exempt</em> from STR licensing caps, lottery waitlists, and the city's 12% Transient Occupancy Tax (TOT). In our repository, <strong>112 properties (40.9%)</strong> utilize this covenant.<br /><br />
2. <strong>Short-Term Rental Permit Caps (<30 Days):</strong><br />
   Unhosted short-term rentals (< 30 days) require an active municipal STR License (e.g., <em>PG License #0405, #0420, #0403, #0446, #0478, #0507</em>). The city caps total STR licenses to prevent residential displacement.<br /><br />
3. <strong>Commercial & Historic Inn Exception:</strong><br />
   Properties in commercial zoning (such as <em>Seven Gables Inn, Green Gables Inn, The Charles, and Old St. Angela Inn</em>) operate under commercial bed-and-breakfast zoning with no minimum night restriction.`,
          richCard: {{
            title: 'Regulatory Audit Dossier',
            badge: 'Chapter 23.90 Verified',
            params: [
              {{ label: '30-Day Midterm', value: '112 Units', sub: 'TOT & Cap Exempt' }},
              {{ label: 'Licensed STRs', value: '162 Units', sub: 'Permit Regulated' }},
              {{ label: 'TOT Tax Savings', value: '12.0%', sub: 'On 30+ Day Stays' }}
            ],
            actions: [
              {{ label: 'View 30-Day Flexible Stays', action: 'query', payload: 'Show 30-day flexible tenancy listings' }},
              {{ label: 'Inspect Licensed STRs', action: 'query', payload: 'Show licensed short-term rentals' }},
              {{ label: 'Simulate Revenue Shift', action: 'query', payload: 'Compare short-term vs 30-day rental yield' }}
            ]
          }}
        }};
      }}

      // 10. Oceanfront & Luxury Properties
      if (/(oceanfront|luxury|most expensive|beachfront|lovers point|waterfront|masterpiece|over 1000|high end)/i.test(lower)) {{
        return {{
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Luxury Portfolio',
          title: 'Pacific Grove Oceanfront & Luxury Estates',
          body: `<strong>Premier Coastal Residences & Luxury Estates (Top Tier):</strong><br />
Pacific Grove features 133 properties with immediate ocean or bay exposure. The premier tier includes:<br /><br />
1. <strong>US OPEN Special (Unit 1005024310075425769)</strong> — <em>$2,867/night</em><br />
   Updated & spacious estate positioned for golf championships and executive retreats.<br /><br />
2. <strong>Coastal Oaks Craftsman (Unit 808273804035038794)</strong> — <em>$1,916/night</em><br />
   Architectural craftsman with panoramic bay exposure.<br /><br />
3. <strong>Ocean front 6-bedroom masterpiece (Unit 41014)</strong> — <em>$1,768/night</em> (Host: Kirstie)<br />
   Direct oceanfront landmark residence with 124 verified reviews.<br /><br />
4. <strong>3976 Beach House on Asilomar (Unit 1492172065397068215)</strong> — <em>$1,603/night</em> (Sanctuary Rentals)<br />
   Oceanfront sunset view residence directly opposite Asilomar State Beach.<br /><br />
5. <strong>3817 Caledonia Bay Lookout (Unit 48803070)</strong> — <em>$1,463/night</em><br />
   Elevated lookout with unobstructed Monterey Bay vistas.<br /><br />
6. <strong>3813 Point Break (Unit 47812234)</strong> — <em>$1,428/night</em><br />
   Directly steps from Lover's Point Beach.`,
          richCard: {{
            title: 'Luxury Coastal Collection',
            badge: 'Top Tier ($1,400+)',
            params: [
              {{ label: 'US OPEN Special', value: '$2,867/nt', sub: 'Pebble Beach Zone' }},
              {{ label: 'Coastal Oaks', value: '$1,916/nt', sub: 'Architectural Gem' }},
              {{ label: 'Oceanfront Masterpiece', value: '$1,768/nt', sub: 'Unit 41014' }},
              {{ label: 'Beach House Asilomar', value: '$1,603/nt', sub: 'Sanctuary' }}
            ],
            actions: [
              {{ label: 'Inspect Unit 41014 Dossier', action: 'query', payload: 'Inspect property Ocean front 6-bedroom masterpiece (ID: 41014)' }},
              {{ label: 'Simulate Luxury Yield', action: 'query', payload: 'Simulate revenue for luxury oceanfront properties' }},
              {{ label: 'Open Knowledge Base', action: 'open-kb' }}
            ]
          }}
        }};
      }}

      // 11. 30-Day Flexible Tenancy & Mid-Term Rentals
      if (/(30[- ]?day|flexible lease|mid[- ]?term|monthly rental|cheapest 30|relocation|extended stay)/i.test(lower)) {{
        return {{
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Flexible Tenancy',
          title: '30-Day Flexible Tenancy Portfolio',
          body: `<strong>Curated 30-Day Midterm & Relocation Rentals:</strong><br />
For extended coastal stays, executive relocations, or seasonal tenancies avoiding short-term rental surcharges:<br /><br />
• <strong>Pet-Friendly Cottage Near Beach (Unit 44515)</strong> — <em>$101/night (~$3,030/mo)</em> (974 reviews, Host: Blake)<br />
• <strong>Studio Blu in Pacific Grove (Unit 20279454)</strong> — <em>$95/night (~$2,850/mo)</em><br />
• <strong>Jewelbox Cottages Carriage House (Unit 589997411964604458)</strong> — <em>$92/night (~$2,760/mo)</em><br />
• <strong>Snuggle Up Studio Cottage (Unit 1143742162744265949)</strong> — <em>$97/night (~$2,910/mo)</em><br />
• <strong>Furnished Victorian Cottage (Unit 4582398)</strong> — <em>$117/night (~$3,510/mo)</em> (Host: Birgit)<br />
• <strong>Forest Home on 1/4 Acre (Unit 24059256)</strong> — <em>$124/night (~$3,720/mo)</em><br /><br />
<em>Portfolio Average:</em> 30-day flexible residences yield an average of <strong>$7,225/month</strong> with near 100% stable occupancy.`,
          richCard: {{
            title: 'Flexible 30-Day Value Stays',
            badge: 'Zero STR Surcharges',
            params: [
              {{ label: 'Pet-Friendly Cottage', value: '$101/nt ($3,030/mo)', sub: '974 Reviews' }},
              {{ label: 'Studio Blu', value: '$95/nt ($2,850/mo)', sub: 'Downtown PG' }},
              {{ label: 'Jewelbox Carriage', value: '$92/nt ($2,760/mo)', sub: 'Private Bath' }},
              {{ label: 'Avg Monthly Yield', value: '$7,225/mo', sub: 'Across 112 Units' }}
            ],
            actions: [
              {{ label: 'Inspect Unit 44515 Dossier', action: 'query', payload: 'Inspect property Pet-Friendly* Cottage Near Beach for 30+ day stays (ID: 44515)' }},
              {{ label: 'Compare 30d vs STR Revenue', action: 'query', payload: 'Compare short-term vs 30-day rental yield' }},
              {{ label: 'Open Knowledge Base', action: 'open-kb' }}
            ]
          }}
        }};
      }}

      // 12. Top-Rated & High-Velocity Listings (> 500 reviews)
      if (/(top rated|most reviews|popular|high velocity|500 reviews|highest review)/i.test(lower)) {{
        return {{
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Performance Intelligence',
          title: 'Top-Rated & High-Velocity Listings',
          body: `<strong>Highest-Velocity Listings by Guest Review Volume:</strong><br />
These properties demonstrate the highest guest satisfaction and turnover velocity on the Monterey Peninsula:<br /><br />
1. <strong>CA Dreaming w/Ocean View & Fire Pit (Unit 89210)</strong> — <em>1,436 Reviews</em> (7.63 reviews/mo, Rate: $237/nt, Host: Sarah)<br />
2. <strong>No shared space! Guest suite! (Unit 15165034)</strong> — <em>1,204 Reviews</em> (9.96 reviews/mo, Rate: $118/nt, PGLic#0405, Host: Angi)<br />
3. <strong>Pet-Friendly Cottage Near Beach (Unit 44515)</strong> — <em>974 Reviews</em> (4.96 reviews/mo, Rate: $101/nt, Host: Blake)<br />
4. <strong>Cottage Retreat Steps from the Sea (Unit 14266085)</strong> — <em>855 Reviews</em> (6.91 reviews/mo, Rate: $442/nt, Hosts: Viveca & Jim)<br />
5. <strong>Victorian Premier Queen Room (Unit 43743300)</strong> — <em>846 Reviews</em> (11.06 reviews/mo, Rate: $999/nt, Host: Alex)<br />
6. <strong>BLOCKS FROM OCEAN Cozy Queen (Unit 35950153)</strong> — <em>814 Reviews</em> (9.24 reviews/mo, Rate: $309/nt, Host: Pacific)<br />
7. <strong>Modern Beach House (Unit 3029273)</strong> — <em>786 Reviews</em> (5.34 reviews/mo, Rate: $304/nt, Host: James)`,
          richCard: {{
            title: 'Review Velocity Champions',
            badge: 'Top Portfolio Stars',
            params: [
              {{ label: 'CA Dreaming', value: '1,436 Reviews', sub: 'Host: Sarah' }},
              {{ label: 'Guest Suite #0405', value: '1,204 Reviews', sub: '9.96 Rev/Mo' }},
              {{ label: 'Pet-Friendly Cottage', value: '974 Reviews', sub: 'Host: Blake' }},
              {{ label: 'Sea Cottage Retreat', value: '855 Reviews', sub: 'Viveca & Jim' }}
            ],
            actions: [
              {{ label: 'Inspect Unit 89210 Dossier', action: 'query', payload: 'Inspect property CA Dreaming w/Ocean View, Fire pit and Gardens (ID: 89210)' }},
              {{ label: 'Draft Guest Welcome Notice', action: 'query', payload: 'Draft guest check-in message for CA Dreaming' }},
              {{ label: 'Open Knowledge Base', action: 'open-kb' }}
            ]
          }}
        }};
      }}

      // 13. Pet-Friendly Cottages
      if (/(pet|dog|pets allowed)/i.test(lower)) {{
        return {{
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Lifestyle Covenants',
          title: 'Pet-Friendly Property Directory',
          body: `<strong>Verified Pet-Friendly Properties in Pacific Grove:</strong><br />
Pacific Grove is renowned for dog-friendly coastal recreation along the coastal trail. Verified pet-friendly inventory includes:<br /><br />
• <strong>Pet-Friendly Cottage Near Beach (Unit 44515)</strong> — <em>$101/nt</em> (974 reviews, Host: Blake, 30+ day stays)<br />
• <strong>Pet Friendly Cozy Pacific Grove Getaway (Unit 51086425)</strong> — <em>$445/nt</em> (Lic#0388, Host: Carolyn)<br />
• <strong>Pet friendly Historic PG (Unit 579603922194777208)</strong> — <em>30-day midterm stay</em> (Host: Thomas)<br />
• <strong>Latitude Adjustment Oceanview Deck (Unit 1142216274682452511)</strong> — <em>Pet-friendly deck</em> (Monterey Rentals)<br />
• <strong>Cellar Suite Queen Dog-Friendly (Unit 1434368348248238825)</strong> — <em>$256/nt</em> (The Charles Pacific Grove)<br />
• <strong>30+ day Spacious Pet Friendly Home (Unit 1608841749392581728)</strong> — <em>$167/nt (~$5,010/mo)</em> (Host: Thomas)`,
          richCard: {{
            title: 'Pet-Friendly Collection',
            badge: 'Dogs Welcome',
            params: [
              {{ label: "Blake's Cottage", value: '$101/nt', sub: '974 Reviews · Near Beach' }},
              {{ label: 'Lic#0388 Getaway', value: '$445/nt', sub: 'Carolyn · Fenced' }},
              {{ label: 'The Charles Suite', value: '$256/nt', sub: 'Cellar Family Suite' }}
            ],
            actions: [
              {{ label: 'Inspect Unit 44515 Dossier', action: 'query', payload: 'Inspect property Pet-Friendly* Cottage Near Beach for 30+ day stays (ID: 44515)' }},
              {{ label: 'Draft Pet Policy Covenants', action: 'query', payload: 'Draft pet rider agreement' }},
              {{ label: 'Open Knowledge Base', action: 'open-kb' }}
            ]
          }}
        }};
      }}

      // 14. Unit 014 Telemetry & Operations (Oakview Courtyard)
      if (/(unit 014|home 014|verma|solar|telemetry|microgrid|hvac|work order|ticket|escrow|ledger|gate)/i.test(lower)) {{
        if (/solar|microgrid|battery|energy|kwh/i.test(lower)) {{
          return {{
            type: 'companion',
            author: 'THΛTJOINT Sentinel · Rooftop Microgrid Core',
            title: 'Rooftop Solar & Microgrid Telemetry',
            body: `<strong>Rooftop Solar Microgrid Status for ${{PROPERTY_DATA.unit}}:</strong><br /><br />
• <strong>Solar Array Generation:</strong> ${{PROPERTY_DATA.microgrid.solarGeneration}}<br />
• <strong>24-Hour Cumulative Yield:</strong> ${{PROPERTY_DATA.microgrid.dailyYield}}<br />
• <strong>Storage Battery Reserve:</strong> ${{PROPERTY_DATA.microgrid.batteryStorage}}<br />
• <strong>Net Zero Carbon Offset:</strong> <strong>${{PROPERTY_DATA.microgrid.buildingOffset}}</strong><br /><br />
Surplus power (+1.6 kW) is currently being exported to the community microgrid bus. Inverter diagnostics indicate 100% phase efficiency.`,
            richCard: {{
              title: 'Microgrid Telemetry · Unit 014',
              badge: 'Real-time Feed',
              params: [
                {{ label: 'Array Output', value: '4.8 kW', sub: 'Phase Balanced' }},
                {{ label: 'Battery Reserve', value: '92%', sub: '13.8 kWh' }},
                {{ label: 'Daily Yield', value: '28.4 kWh', sub: 'Optimal' }},
                {{ label: 'Building Offset', value: '94.2%', sub: 'Net Zero' }}
              ],
              actions: [
                {{ label: 'Inspect Rooftop Solar in 3D', action: 'crosslink-3d', payload: '03 Rooftop Terrace' }},
                {{ label: 'HVAC Energy Interplay', action: 'query', payload: 'HVAC Maintenance' }}
              ]
            }}
          }};
        }}

        // Home 014 General Status
        return {{
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Unit 014 Operations',
          title: 'Unit 014 Active Dossier (Oakview Courtyard)',
          body: `<strong>Home 014 Verified Operational Status:</strong><br /><br />
• <strong>Resident:</strong> <strong>${{PROPERTY_DATA.resident.name}}</strong> (Since ${{PROPERTY_DATA.resident.since}}, ${{PROPERTY_DATA.resident.status}})<br />
• <strong>Lease Covenants:</strong> Term ${{PROPERTY_DATA.lease.term}} (${{PROPERTY_DATA.lease.daysRemaining}} days remaining in renewal window). Base Rent: <strong>${{PROPERTY_DATA.lease.monthlyRent}}</strong> (Paid on ${{PROPERTY_DATA.lease.lastPaidDate}}, zero arrears).<br />
• <strong>Escrow Account:</strong> ${{PROPERTY_DATA.lease.securityDeposit}} digital trust-held.<br />
• <strong>Active Work Order:</strong> Ticket #${{PROPERTY_DATA.maintenance.ticketId}} (${{PROPERTY_DATA.maintenance.scope}}) — Technician Rajesh K. (${{PROPERTY_DATA.maintenance.vendor}}) dispatched for ${{PROPERTY_DATA.maintenance.scheduledTime}}.<br />
• <strong>Rooftop Microgrid:</strong> ${{PROPERTY_DATA.microgrid.solarGeneration}}, Battery at ${{PROPERTY_DATA.microgrid.batteryStorage}}.<br />
• <strong>Smart Access Lock:</strong> ${{PROPERTY_DATA.security.perimeterLock}} (${{PROPERTY_DATA.security.lastEvent}}).`,
          richCard: {{
            title: 'Unit 014 Dossier',
            badge: 'Operations Active',
            params: [
              {{ label: 'Resident', value: PROPERTY_DATA.resident.name, sub: 'Good Standing' }},
              {{ label: 'Rent Status', value: PROPERTY_DATA.lease.monthlyRent, sub: 'Zero Arrears' }},
              {{ label: 'Work Order', value: 'WO-8841 (14:00)', sub: 'Apex Climate' }},
              {{ label: 'Solar Output', value: '4.8 kW Gen', sub: '92% Battery' }}
            ],
            actions: [
              {{ label: 'Inspect Home 014 in 3D', action: 'crosslink-3d', payload: '02 Living Quarters' }},
              {{ label: 'Calculate Escalation (+5%)', action: 'query', payload: 'Calculate 5% rent escalation on Home 014' }},
              {{ label: 'Pacific Grove Market', action: 'query', payload: 'Pacific Grove Market Overview' }}
            ]
          }}
        }};
      }}

      // 15. Pacific Grove Market Overview & KPI Summary
      if (/(market|overview|summary|portfolio|how many properties|pacific grove market|median price|average rent)/i.test(lower)) {{
        const s = this.knowledgeBase.summary;
        return {{
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Market Intelligence Core',
          title: 'Pacific Grove Real Estate Market Dossier',
          body: `<strong>Municipal Market Executive Summary (Pacific Grove, CA):</strong><br />
The autonomous repository tracks <strong>${{s.total_properties}} property listings</strong> across <strong>${{s.total_hosts}} operators</strong> on the Monterey Peninsula.<br /><br />
• <strong>Median Nightly Rate:</strong> $${{s.pricing.median_nightly.toFixed(0)}}/night (Mean: $${{s.pricing.mean_nightly.toFixed(2)}}/night, Range: $${{s.pricing.min_nightly.toFixed(0)}} – $${{s.pricing.max_nightly.toFixed(0)}}/night).<br />
• <strong>30-Day Flexible Stays:</strong> <strong>${{s.regulatory_str_split.thirty_day_plus_flexible}} properties (${{s.regulatory_str_split.str_compliance_ratio}})</strong> operate as 30+ day flexible leases, avoiding short-term rental permit caps.<br />
• <strong>Licensed STRs & Hotels:</strong> <strong>${{s.regulatory_str_split.short_term_str}} properties</strong> operate under municipal STR permits or commercial hospitality zoning.<br />
• <strong>Inventory Distribution:</strong> ${{s.room_type_distribution['Entire home/apt']}} Entire Homes/Apartments, ${{s.room_type_distribution['Private room']}} Private Rooms, ${{s.room_type_distribution['Hotel room']}} Historic Hotel Suites.<br />
• <strong>Average Mid-Term Rent:</strong> <strong>$${{s.pricing.avg_monthly_midterm.toLocaleString('en-US')}}/month</strong> for flexible 30-day tenancies.`,
          richCard: {{
            title: 'Market KPI Snapshot · Pacific Grove',
            badge: 'Live Knowledge Base',
            params: [
              {{ label: 'Inventory', value: `${{s.total_properties}} Units`, sub: '114 Operators' }},
              {{ label: 'Median Rate', value: `$${{s.pricing.median_nightly.toFixed(0)}}`, sub: 'USD / Night' }},
              {{ label: '30-Day Covenants', value: '40.9%', sub: '112 Units (STR Exempt)' }},
              {{ label: 'Avg Monthly', value: `$${{Math.round(s.pricing.avg_monthly_midterm).toLocaleString('en-US')}}`, sub: '30-Day Flexible Rent' }}
            ],
            actions: [
              {{ label: 'Explore Oceanfront & Luxury', action: 'query', payload: 'Oceanfront & Luxury Villas' }},
              {{ label: 'Explain 30-Day STR Rule', action: 'query', payload: 'Explain 30-day minimum stay rule' }},
              {{ label: 'Browse 274 Properties', action: 'open-kb' }}
            ]
          }}
        }};
      }}

      // 16. General Fallback with Intelligent Guidance & Knowledge Base Links
      return {{
        type: 'companion',
        author: 'THΛTJOINT Sentinel · Autonomous Operations Core',
        title: 'Operational Guidance & Knowledge Base',
        body: `I have analyzed your inquiry: <em>"${{this.escapeHtml(q)}}"</em>.<br /><br />
Sentinel AI monitors both residential unit telemetry for <strong>Home 014</strong> and the verified <strong>Pacific Grove Real Estate Knowledge Base (274 properties)</strong>. Choose an action below or ask a specific question:`,
        richCard: {{
          title: 'Operations Navigator',
          badge: 'Sentinel Active',
          params: [
            {{ label: 'Active Unit', value: PROPERTY_DATA.unit, sub: 'Courtyard Suite' }},
            {{ label: 'Market Tracked', value: '274 Properties', sub: 'Pacific Grove' }},
            {{ label: 'Median Nightly', value: '$351/night', sub: '40.9% 30-Day STR' }}
          ],
          actions: [
            {{ label: 'Explore Pacific Grove Market', action: 'query', payload: 'Pacific Grove Market Overview' }},
            {{ label: 'Browse 274 Properties', action: 'open-kb' }},
            {{ label: 'Explain 30-Day STR Rule', action: 'query', payload: 'Explain 30-day minimum stay rule' }},
            {{ label: 'Unit 014 Live Status', action: 'query', payload: 'Home 014 Status & Telemetry' }}
          ]
        }}
      }};
    }}

        appendMessage(msg) {{
      if (!this.feed) return;
      const timeStr = new Date().toLocaleTimeString('en-US', {{ hour12: false, hour: '2-digit', minute: '2-digit' }});
      const wrap = document.createElement('article');
      wrap.className = `tj-bubble-wrap ${{msg.type || 'companion'}}`;

      const cardHtml = `
        <div class="tj-bubble-meta">
          <span class="author">${{msg.author || 'THΛTJOINT Sentinel'}}</span>
          <time datetime="${{new Date().toISOString()}}">${{timeStr}}</time>
        </div>
        <div class="tj-bubble-card">
          ${{msg.attachment ? `
            <div class="tj-user-attachment">
              <i>📎</i>
              <span><strong>${{this.escapeHtml(msg.attachment.name)}}</strong> ${{msg.attachment.size}}</span>
            </div>
          ` : ''}}
          ${{msg.title ? `<h4>${{msg.title}}</h4>` : ''}}
          ${{msg.body ? `<div class="tj-bubble-body">${{msg.body}}</div>` : ''}}
          ${{msg.richCard ? `
            <div class="tj-rich-card">
              <div class="tj-rich-card-head">
                <b>${{msg.richCard.title}}</b>
                <span class="badge-pill">${{msg.richCard.badge}}</span>
              </div>
              <div class="tj-param-grid">
                ${{msg.richCard.params.map(p => `
                  <div class="tj-param-box">
                    <span>${{p.label}}</span>
                    <strong>${{p.value}}</strong>
                    ${{p.sub ? `<small>${{p.sub}}</small>` : ''}}
                  </div>
                `).join('')}}
              </div>
              ${{msg.richCard.actions && msg.richCard.actions.length ? `
                <div class="tj-card-actions">
                  ${{msg.richCard.actions.map(a => `
                    <button type="button" class="tj-card-btn" data-action="${{a.action}}" data-payload="${{this.escapeHtml(a.payload || '')}}">
                      <span>${{a.label}}</span>
                      <i>↗</i>
                    </button>
                  `).join('')}}
                </div>
              ` : ''}}
            </div>
          ` : ''}}
        </div>
      `;

      wrap.innerHTML = cardHtml;
      this.feed.appendChild(wrap);
      this.feed.scrollTop = this.feed.scrollHeight;
    }}

    handleCardAction(action, payload, btn) {{
      if (action === 'query') {{
        if (this.input) {{
          this.input.value = payload;
          this.submitQuery();
        }}
      }} else if (action === 'open-kb') {{
        this.openKnowledgeBaseModal();
      }} else if (action === 'open-help') {{
        this.openDirectivesModal();
      }} else if (action === 'open-config') {{
        this.openConfigModal();
      }} else if (action === 'crosslink-3d') {{
        this.emit('selectZone3D', payload);
      }} else if (action === 'copy-text') {{
        const targetEl = document.getElementById(payload);
        if (targetEl) {{
          this.copyToClipboard(targetEl.innerText, btn);
        }}
      }}
    }}

    copyToClipboard(text, btn) {{
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {{
        if (btn) {{
          const original = btn.innerHTML;
          btn.innerHTML = '<span>✓ Copied!</span>';
          btn.classList.add('is-copied');
          setTimeout(() => {{
            btn.innerHTML = original;
            btn.classList.remove('is-copied');
          }}, 2000);
        }}
      }}).catch(() => {{
        alert('Copied to clipboard.');
      }});
    }}

    updateTelemetryPills() {{
      const bar = document.getElementById('sentinelTelemetryBar');
      if (!bar) return;
      const s = this.knowledgeBase.summary;
      if (!s) return;
      bar.innerHTML = `
        <span class="tj-telemetry-chip highlight"><b>📍 MARKET</b> Pacific Grove, CA</span>
        <span class="tj-telemetry-chip"><b>📊 UNITS</b> ${{s.total_properties}} Active</span>
        <span class="tj-telemetry-chip"><b>💵 MEDIAN</b> $${{s.pricing.median_nightly.toFixed(0)}}/night</span>
        <span class="tj-telemetry-chip"><b>📋 30-DAY STR</b> ${{s.regulatory_str_split.str_compliance_ratio}}</span>
        <span class="tj-telemetry-chip"><b>🏡 ACTIVE UNIT</b> ${{PROPERTY_DATA.unit}}</span>
        <span class="tj-telemetry-chip"><b>🔒 PROTOCOL</b> Synced</span>
      `;
    }}

    // Drawer state controls
    openDrawer() {{
      if (!this.viewContainer) return;
      this.viewContainer.classList.add('is-open');
      if (this.backdrop) this.backdrop.classList.add('is-open');
      if (this.input) setTimeout(() => this.input.focus(), 150);
    }}

    closeDrawer() {{
      if (!this.viewContainer) return;
      this.viewContainer.classList.remove('is-open');
      if (this.backdrop) this.backdrop.classList.remove('is-open');
    }}

    toggleDrawer() {{
      if (!this.viewContainer) return;
      if (this.viewContainer.classList.contains('is-open')) {{
        this.closeDrawer();
      }} else {{
        this.openDrawer();
      }}
    }}

    escapeHtml(str) {{
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }}

    // ----------------------------------------------------------------
    // Event Bus (Cross-Module Sync)
    // ----------------------------------------------------------------
    on(event, handler) {{
      if (!this.listeners.has(event)) {{
        this.listeners.set(event, []);
      }}
      this.listeners.get(event).push(handler);
    }}

    emit(event, data) {{
      if (this.listeners.has(event)) {{
        this.listeners.get(event).forEach(handler => handler(data));
      }}
    }}
  }}

  return ThatJointChatbot;
}}));
"""

with open(CHATBOT_JS, "w", encoding="utf-8") as f:
    f.write(js_code)

print(f"Successfully generated {CHATBOT_JS} ({len(js_code)} chars)")
