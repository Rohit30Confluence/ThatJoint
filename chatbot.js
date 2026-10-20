/* ==========================================================================
   THATJOINT / INTELLIGENCE Terminal Engine
   ES6+ modular component for the Operational Intelligence Chatbot interface.
   Synchronized with 3D Building Visualizer and property signals.
   ========================================================================== */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ThatJointChatbot = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Authentic property dataset grounded in THΛTJOINT design system
  const PROPERTY_KNOWLEDGE = {
    unit: 'Home 014',
    address: 'Oakview Courtyard Residences, Suite 14',
    model: 'Single-Family / Courtyard Residence',
    resident: 'Dr. A. Verma',
    leaseStatus: 'Active (Renewal in 30 days)',
    leasePeriod: '01 Nov 2025 – 31 Oct 2026',
    rentAmount: '₹1,45,000 / mo',
    lastPayment: '₹1,45,000 received on 18 Oct 2026 (Clear)',
    nextDue: '01 Nov 2026',
    depositHeld: '₹4,35,000 (Escrow Account Verified)',
    hvacStatus: 'Filter inspection scheduled for today at 14:00',
    climateTelemetry: {
      indoorTemp: '22.8°C',
      targetTemp: '22.0°C',
      relativeHumidity: '48%',
      filterPressure: '0.88 ΔP (Nominal)',
      airflowRate: '420 CFM'
    },
    solarTelemetry: {
      currentOutput: '4.8 kW (Peak generation)',
      dailyYield: '28.4 kWh',
      batteryStorage: '92% charged (13.8 kWh reserve)',
      gridExport: '1.6 kW export'
    },
    accessLog: [
      { time: '09:16:40', event: 'Main Gate Access Confirmed (Courier Delivery #4481)' },
      { time: '08:05:12', event: 'Pedestrian Courtyard Portal (Resident Keycard #014)' },
      { time: 'Yesterday 17:42', event: 'Service Bay Gate (HVAC Diagnostic Vendor #8841)' }
    ],
    workOrders: [
      { id: 'WO-8841', item: 'HVAC Filter & Duct Review', priority: 'Routine', schedule: 'Today 14:00', technician: 'Rajesh K. (Apex Climate)', status: 'Assigned' },
      { id: 'WO-8839', item: 'Courtyard Drip Irrigation Solenoid', priority: 'Low', schedule: 'Tomorrow 10:30', technician: 'Greenleaf Landscape', status: 'Pending' },
      { id: 'WO-8820', item: 'Acoustic Balcony Seal Verification', priority: 'Low', schedule: 'Completed 16 Oct', technician: 'In-House Ops', status: 'Closed' }
    ]
  };

  class ThatJointChatbot {
    constructor(options = {}) {
      this.containerId = options.containerId || 'chatbotRoot';
      this.container = typeof this.containerId === 'string'
        ? document.getElementById(this.containerId)
        : this.containerId;
      
      this.isDrawer = options.isDrawer !== undefined ? options.isDrawer : false;
      this.activeUnit = options.activeUnit || 'Home 014';
      this.listeners = new Map();
      this.isOpen = false;
      this.isStreaming = false;

      this.init();
    }

    init() {
      if (!this.container) return;
      this.render();
      this.bindEvents();
      this.setupKeyboardShortcuts();
      this.postInitialGreeting();
    }

    render() {
      const template = `
        <div class="tj-terminal-container ${this.isDrawer ? 'tj-terminal-drawer' : ''}" id="tjTerminalView" role="region" aria-label="Operational Intelligence Terminal">
          <!-- Header & System Meta -->
          <header class="tj-terminal-header">
            <div class="tj-terminal-topbar">
              <div class="tj-terminal-brand">
                <span class="tj-terminal-badge" aria-hidden="true">Ω</span>
                <h3 class="tj-terminal-title">THΛTJOINT<span>/</span>INTELLIGENCE <em>Terminal v2.6</em></h3>
              </div>
              <div class="tj-terminal-controls">
                <button type="button" class="tj-terminal-btn-icon" id="tjBtnClear" title="Clear terminal history" aria-label="Clear chat session">↺</button>
                <button type="button" class="tj-terminal-btn-icon" id="tjBtnToggleMeta" title="Toggle operations context" aria-label="Toggle operations context drawer">▤</button>
                ${this.isDrawer ? `<button type="button" class="tj-terminal-btn-icon" id="tjBtnCloseDrawer" title="Close terminal [Esc]" aria-label="Close terminal">×</button>` : ''}
              </div>
            </div>
            <div class="tj-terminal-metabar">
              <div class="tj-terminal-meta-left">
                <div class="tj-terminal-unit-tag" id="tjActiveUnitTag">
                  <span>ACTIVE NODE</span>
                  <strong id="tjUnitLabel">${this.activeUnit}</strong>
                </div>
                <div class="tj-terminal-ping">
                  <i aria-hidden="true"></i>
                  <span>18ms · Synced</span>
                </div>
              </div>
              <div class="tj-terminal-chips">
                <span class="tj-chip is-active"><b>01</b> AUDIT PASS</span>
                <span class="tj-chip is-active"><b>02</b> LEASE ACTIVE</span>
                <span class="tj-chip"><b>03</b> IOT ONLINE</span>
                <span class="tj-chip"><b>04</b> WORK ORDERS: 01</span>
              </div>
            </div>
          </header>

          <!-- Split Body Workspace -->
          <div class="tj-terminal-body">
            <!-- Left: Chat Feed & Input -->
            <div class="tj-terminal-feed-col">
              <div class="tj-terminal-feed" id="tjChatFeed" role="log" aria-live="polite">
                <!-- Messages appended dynamically -->
              </div>

              <!-- Typing Indicator -->
              <div class="tj-typing-indicator" id="tjTypingIndicator" aria-hidden="true">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span style="margin-left: 6px;">Querying Operations Layer...</span>
              </div>

              <!-- Input Area -->
              <div class="tj-terminal-input-wrap">
                <!-- Operational Prompt Pills -->
                <div class="tj-prompt-pills" role="toolbar" aria-label="Pre-baked operational queries">
                  <button type="button" class="tj-prompt-pill" data-query="Status Home 014">Status Home 014</button>
                  <button type="button" class="tj-prompt-pill" data-query="Audit Maintenance Queue">Audit Maintenance Queue</button>
                  <button type="button" class="tj-prompt-pill" data-query="Ledger & Rent Dues">Ledger & Rent Dues</button>
                  <button type="button" class="tj-prompt-pill" data-query="HVAC Climate Telemetry">HVAC Climate Telemetry</button>
                  <button type="button" class="tj-prompt-pill" data-query="Solar Microgrid Generation">Solar Generation</button>
                  <button type="button" class="tj-prompt-pill" data-query="Lease Timeline & Renewal">Lease Timeline</button>
                  <button type="button" class="tj-prompt-pill" data-query="Inspect Main Gate Access">Access Logs</button>
                </div>

                <!-- Input Field -->
                <form class="tj-terminal-form" id="tjChatForm" autocomplete="off">
                  <textarea class="tj-terminal-input" id="tjChatInput" rows="1" placeholder="Query property signals, work orders, telemetry, or documents..." aria-label="Terminal query input"></textarea>
                  <button type="submit" class="tj-terminal-send-btn" id="tjSendBtn">
                    <span>Execute</span>
                    <span aria-hidden="true">↗</span>
                  </button>
                </form>
              </div>
            </div>

            <!-- Right: Meta Drawer / Operations Column (Desktop) -->
            <aside class="tj-terminal-meta-col" id="tjMetaCol" aria-label="Property Operational Context">
              <!-- Section 1: Live Ledger Preview -->
              <section class="tj-meta-section">
                <header class="tj-meta-section-head">
                  <b>01 / Live Ledger</b>
                  <span>● Current</span>
                </header>
                <div class="tj-ledger-card">
                  <div class="tj-ledger-row">
                    <span>Monthly Rent</span>
                    <strong>${PROPERTY_KNOWLEDGE.rentAmount}</strong>
                  </div>
                  <div class="tj-ledger-row">
                    <span>Payment Status</span>
                    <small>● Received (18 Oct)</small>
                  </div>
                  <div class="tj-ledger-row">
                    <span>Next Cycle</span>
                    <strong>01 Nov 2026</strong>
                  </div>
                  <div class="tj-ledger-row">
                    <span>Escrow Deposit</span>
                    <span class="tj-ledger-tag">Verified Escrow</span>
                  </div>
                </div>
              </section>

              <!-- Section 2: Maintenance Queue -->
              <section class="tj-meta-section">
                <header class="tj-meta-section-head">
                  <b>02 / Maintenance Queue</b>
                  <span>02 Active</span>
                </header>
                <div class="tj-queue-list">
                  ${PROPERTY_KNOWLEDGE.workOrders.slice(0, 2).map(wo => `
                    <div class="tj-queue-item">
                      <div class="tj-queue-item-head">
                        <span>${wo.id}</span>
                        <b>${wo.status}</b>
                      </div>
                      <strong>${wo.item}</strong>
                      <p>${wo.schedule} · ${wo.technician}</p>
                    </div>
                  `).join('')}
                </div>
              </section>

              <!-- Section 3: Active Lease Timeline -->
              <section class="tj-meta-section">
                <header class="tj-meta-section-head">
                  <b>03 / Lease Lifecycle</b>
                  <span>Nov 25 – Oct 26</span>
                </header>
                <div class="tj-timeline-track">
                  <div class="tj-timeline-step is-done">
                    <span>01 / Move-In</span>
                    <strong>Agreement Executed (Nov 2025)</strong>
                  </div>
                  <div class="tj-timeline-step is-done">
                    <span>02 / Mid-Term</span>
                    <strong>Annual Inspection Passed</strong>
                  </div>
                  <div class="tj-timeline-step is-current">
                    <span>03 / Renewal Window</span>
                    <strong>30-Day Evaluation Active</strong>
                  </div>
                  <div class="tj-timeline-step">
                    <span>04 / Execution</span>
                    <strong>Lease Extension Pending</strong>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </div>
      `;

      if (this.isDrawer) {
        // Also ensure backdrop exists
        let backdrop = document.getElementById('tjTerminalBackdrop');
        if (!backdrop) {
          backdrop = document.createElement('div');
          backdrop.id = 'tjTerminalBackdrop';
          backdrop.className = 'tj-terminal-backdrop';
          document.body.appendChild(backdrop);
        }
        this.backdrop = backdrop;
      }

      this.container.innerHTML = template;
      this.feed = document.getElementById('tjChatFeed');
      this.form = document.getElementById('tjChatForm');
      this.input = document.getElementById('tjChatInput');
      this.typing = document.getElementById('tjTypingIndicator');
      this.metaCol = document.getElementById('tjMetaCol');
      this.terminalView = document.getElementById('tjTerminalView');
    }

    bindEvents() {
      if (!this.form || !this.input) return;

      // Handle form submission
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitQuery();
      });

      // Handle auto-expanding textarea & Enter key (Shift+Enter for newline)
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.submitQuery();
        }
      });

      this.input.addEventListener('input', () => {
        this.input.style.height = 'auto';
        this.input.style.height = Math.min(this.input.scrollHeight, 110) + 'px';
      });

      // Handle prompt pills
      const pills = this.container.querySelectorAll('.tj-prompt-pill');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          const query = pill.getAttribute('data-query');
          if (query) {
            this.input.value = query;
            this.submitQuery();
          }
        });
      });

      // Clear button
      const btnClear = document.getElementById('tjBtnClear');
      if (btnClear) {
        btnClear.addEventListener('click', () => {
          if (this.feed) {
            this.feed.innerHTML = '';
            this.postInitialGreeting();
          }
        });
      }

      // Toggle Meta Column (useful for tablet/mobile or compact view)
      const btnToggleMeta = document.getElementById('tjBtnToggleMeta');
      if (btnToggleMeta && this.metaCol) {
        btnToggleMeta.addEventListener('click', () => {
          this.metaCol.classList.toggle('is-visible-mobile');
        });
      }

      // Close drawer button
      if (this.isDrawer) {
        const btnClose = document.getElementById('tjBtnCloseDrawer');
        if (btnClose) {
          btnClose.addEventListener('click', () => this.close());
        }
        if (this.backdrop) {
          this.backdrop.addEventListener('click', () => this.close());
        }
      }

      // Delegate message card action buttons
      this.feed.addEventListener('click', (e) => {
        const btn = e.target.closest('.tj-msg-btn');
        if (!btn) return;
        const action = btn.getAttribute('data-action');
        const payload = btn.getAttribute('data-payload');
        this.handleMessageAction(action, payload);
      });
    }

    setupKeyboardShortcuts() {
      // Global shortcut: Cmd+K or Ctrl+K to toggle terminal
      document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          this.toggle();
        }
        if (e.key === 'Escape' && this.isOpen && this.isDrawer) {
          this.close();
        }
      });
    }

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }

    open() {
      if (!this.isDrawer) return;
      this.isOpen = true;
      if (this.terminalView) this.terminalView.classList.add('is-open');
      if (this.backdrop) this.backdrop.classList.add('is-active');
      document.body.classList.add('terminal-open');
      setTimeout(() => {
        if (this.input) this.input.focus();
      }, 100);
      this.emit('open');
    }

    close() {
      if (!this.isDrawer) return;
      this.isOpen = false;
      if (this.terminalView) this.terminalView.classList.remove('is-open');
      if (this.backdrop) this.backdrop.classList.remove('is-active');
      document.body.classList.remove('terminal-open');
      this.emit('close');
    }

    setActiveUnit(unitName) {
      this.activeUnit = unitName;
      const unitLabel = document.getElementById('tjUnitLabel');
      if (unitLabel) unitLabel.textContent = unitName;
      this.emit('unitChange', unitName);
    }

    postInitialGreeting() {
      this.appendMessage({
        type: 'system',
        source: 'Operations Layer · Node 014',
        title: 'Operational Terminal Connected',
        body: `THΛTJOINT Intelligence runtime active. Linked to <strong>${PROPERTY_KNOWLEDGE.address}</strong>. All telemetry channels (rent collection, HVAC sensor matrix, solar microgrid, and smart perimeter locks) are synchronized.`,
        metrics: [
          { label: 'Occupancy', value: '100% · Single Family', sub: 'Healthy' },
          { label: 'Next Due', value: '01 Nov', sub: '₹1,45,000' },
          { label: 'Work Orders', value: '01 Scheduled', sub: '14:00 Today' }
        ],
        actions: [
          { label: 'Inspect Unit 014 Status', action: 'query', payload: 'Status Home 014' },
          { label: 'Audit Maintenance Queue', action: 'query', payload: 'Audit Maintenance Queue' },
          { label: 'Open 3D Tour', action: 'crosslink-3d', payload: '02 Living Quarters' }
        ]
      });
    }

    submitQuery() {
      if (this.isStreaming || !this.input) return;
      const text = this.input.value.trim();
      if (!text) return;

      // Post user message
      this.appendMessage({
        type: 'user',
        source: 'Console Operator',
        body: this.escapeHtml(text)
      });

      this.input.value = '';
      this.input.style.height = 'auto';

      // Process query
      this.processQuery(text);
    }

    processQuery(query) {
      this.showTyping(true);
      this.isStreaming = true;

      // Simulated network/processing latency
      const latency = Math.floor(Math.random() * 300) + 400;

      setTimeout(() => {
        const response = this.generateResponse(query);
        this.showTyping(false);
        this.appendMessage(response);
        this.isStreaming = false;

        // If response triggered cross-link signal, emit it
        if (response.crossLinkUnit) {
          this.emit('focusUnit', response.crossLinkUnit);
        }
      }, latency);
    }

    generateResponse(rawQuery) {
      const q = rawQuery.toLowerCase();

      // 1. Home 014 status query
      if (q.includes('014') || q.includes('status') || q.includes('home')) {
        return {
          type: 'system',
          source: 'Operations Layer · Unit 014 Core',
          title: 'Unit 014 / Comprehensive Diagnostics',
          body: `Address: <strong>${PROPERTY_KNOWLEDGE.address}</strong>.<br/>Lease active with resident <strong>${PROPERTY_KNOWLEDGE.resident}</strong>. Rent payments up-to-date with zero outstanding dues. Routine filter inspection dispatched for 14:00 today.`,
          metrics: [
            { label: 'Lease Status', value: 'Active', sub: '30-Day Renewal' },
            { label: 'Ledger State', value: 'Clear', sub: 'Last Paid Oct 18' },
            { label: 'HVAC Airflow', value: '420 CFM', sub: 'Nominal Pressure' }
          ],
          actions: [
            { label: 'Highlight in 3D Tour', action: 'crosslink-3d', payload: '02 Living Quarters' },
            { label: 'Inspect Maintenance Details', action: 'query', payload: 'Audit Maintenance Queue' },
            { label: 'View Solar Generation', action: 'query', payload: 'Solar Microgrid Generation' }
          ],
          crossLinkUnit: 'Home 014'
        };
      }

      // 2. Maintenance / Work Orders
      if (q.includes('maintenance') || q.includes('repair') || q.includes('queue') || q.includes('work order') || q.includes('ticket')) {
        const woList = PROPERTY_KNOWLEDGE.workOrders.map(w => `• <strong>${w.id}</strong>: ${w.item} (${w.priority}) — <em>${w.status}</em> [${w.schedule}]`).join('<br/>');
        return {
          type: 'system',
          source: 'Field Operations Engine',
          title: 'Maintenance Dispatch Ledger',
          body: `Live dispatch status for property portfolio:<br/><br/>${woList}`,
          metrics: [
            { label: 'Active Tickets', value: '01 Assigned', sub: 'WO-8841' },
            { label: 'Vendor Assigned', value: 'Apex Climate', sub: 'Rajesh K.' },
            { label: 'Average SLA', value: '2.4 Hours', sub: 'Target < 4.0h' }
          ],
          actions: [
            { label: 'Schedule New Inspection', action: 'action-pilot', payload: 'Schedule Inspection' },
            { label: 'Check HVAC Telemetry', action: 'query', payload: 'HVAC Climate Telemetry' }
          ]
        };
      }

      // 3. Ledger & Rent
      if (q.includes('ledger') || q.includes('rent') || q.includes('payment') || q.includes('dues') || q.includes('deposit')) {
        return {
          type: 'system',
          source: 'Financial Operations Core',
          title: 'Connected Rent Ledger · Home 014',
          body: `Rental collection status: <strong>${PROPERTY_KNOWLEDGE.rentAmount}</strong> for cycle ending 31 Oct. Transaction settled via digital mandate on 18 Oct 2026. Security escrow balance: <strong>${PROPERTY_KNOWLEDGE.depositHeld}</strong> verified under automated trust rules.`,
          metrics: [
            { label: 'Current Balance', value: '₹0.00', sub: 'Zero Arrears' },
            { label: 'Escrow Reserve', value: '₹4,35,000', sub: '100% Protected' },
            { label: 'Collection Rate', value: '98.8%', sub: 'Portfolio Average' }
          ],
          actions: [
            { label: 'Generate Rent Receipt PDF', action: 'action-receipt', payload: 'Receipt-OCT-2026' },
            { label: 'Lease Timeline', action: 'query', payload: 'Lease Timeline & Renewal' }
          ]
        };
      }

      // 4. HVAC & Climate
      if (q.includes('hvac') || q.includes('climate') || q.includes('temp') || q.includes('air') || q.includes('sensor')) {
        const t = PROPERTY_KNOWLEDGE.climateTelemetry;
        return {
          type: 'system',
          source: 'Environmental IoT Subsystem',
          title: 'HVAC Sensor Matrix & Air Quality',
          body: `Internal climate stabilized at <strong>${t.indoorTemp}</strong> (target: ${t.targetTemp}). Dynamic humidity reading is <strong>${t.relativeHumidity}</strong> with filter differential pressure <strong>${t.filterPressure}</strong>. Upcoming routine filter cycle at 14:00 today.`,
          metrics: [
            { label: 'Indoor Temp', value: t.indoorTemp, sub: 'Set: ' + t.targetTemp },
            { label: 'Airflow Rate', value: t.airflowRate, sub: 'Air Quality: Good' },
            { label: 'Filter State', value: '88% Clean', sub: 'Inspect Today' }
          ],
          actions: [
            { label: 'Dispatch Filter Inspection', action: 'query', payload: 'Audit Maintenance Queue' },
            { label: 'Highlight Living Quarters in 3D', action: 'crosslink-3d', payload: '02 Living Quarters' }
          ]
        };
      }

      // 5. Solar & Energy
      if (q.includes('solar') || q.includes('energy') || q.includes('power') || q.includes('battery') || q.includes('grid')) {
        const s = PROPERTY_KNOWLEDGE.solarTelemetry;
        return {
          type: 'system',
          source: 'Rooftop Microgrid Gateway',
          title: 'Solar Photovoltaic Array Telemetry',
          body: `Rooftop solar capacity operating under clear sky conditions. Real-time generation: <strong>${s.currentOutput}</strong>. Energy storage reserve: <strong>${s.batteryStorage}</strong>. Grid surplus feeding active community offset.`,
          metrics: [
            { label: 'Instant Power', value: s.currentOutput, sub: '12 Panels Active' },
            { label: 'Daily Yield', value: s.dailyYield, sub: 'Offset: 94%' },
            { label: 'Battery Reserve', value: s.batteryStorage, sub: '13.8 kWh capacity' }
          ],
          actions: [
            { label: 'View Rooftop Terrace in 3D', action: 'crosslink-3d', payload: '03 Rooftop Terrace' }
          ]
        };
      }

      // 6. Access & Perimeter
      if (q.includes('access') || q.includes('gate') || q.includes('lock') || q.includes('security') || q.includes('log')) {
        const logs = PROPERTY_KNOWLEDGE.accessLog.map(l => `• <strong>${l.time}</strong>: ${l.event}`).join('<br/>');
        return {
          type: 'system',
          source: 'Perimeter & Access Control Layer',
          title: 'Encrypted Access Log Audit',
          body: `Access logs authenticated against cryptographic resident tokens:<br/><br/>${logs}`,
          metrics: [
            { label: 'Perimeter State', value: 'Secured', sub: 'Smart Lock Online' },
            { label: 'Verified Passes', value: '03 Today', sub: '0 Anomalies' }
          ],
          actions: [
            { label: 'View Courtyard Gate in 3D', action: 'crosslink-3d', payload: '01 Ground Courtyard' }
          ]
        };
      }

      // 7. Lease Timeline
      if (q.includes('lease') || q.includes('renewal') || q.includes('timeline') || q.includes('contract')) {
        return {
          type: 'system',
          source: 'Lease Governance Contract',
          title: 'Lease Term & Renewal Projection',
          body: `Lease period: <strong>${PROPERTY_KNOWLEDGE.leasePeriod}</strong>. Automated 30-day renewal cycle initiated. Tenant notification drafted with current benchmark index rates. Zero penalty infractions on record.`,
          metrics: [
            { label: 'Term Remaining', value: '30 Days', sub: 'Expiry: 31 Oct' },
            { label: 'Renewal Sentiment', value: 'High (94%)', sub: 'No disputes' }
          ],
          actions: [
            { label: 'Review Ledger Record', action: 'query', payload: 'Ledger & Rent Dues' },
            { label: 'Request Pilot Demo', action: 'action-pilot', payload: 'Pilot Request' }
          ]
        };
      }

      // Default contextual intelligence response
      return {
        type: 'system',
        source: 'Operations Semantic Engine',
        title: 'Operations Query Resolved',
        body: `Processed telemetry inquiry: <em>"${this.escapeHtml(rawQuery)}"</em>. Connected to property records for <strong>${PROPERTY_KNOWLEDGE.address}</strong>. All building telemetry, ledger balances, and maintenance dispatch queues are active and in compliance with operations policy.`,
        metrics: [
          { label: 'Property', value: 'Home 014', sub: 'Oakview' },
          { label: 'System Health', value: '100%', sub: 'Zero Warnings' },
          { label: 'Response Time', value: '14ms', sub: 'Edge Compute' }
        ],
        actions: [
          { label: 'Inspect Unit 014 Status', action: 'query', payload: 'Status Home 014' },
          { label: 'Open 3D Model', action: 'crosslink-3d', payload: '00 Complete Assembly' },
          { label: 'Audit Maintenance Queue', action: 'query', payload: 'Audit Maintenance Queue' }
        ]
      };
    }

    appendMessage(msg) {
      if (!this.feed) return;

      const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const el = document.createElement('article');
      el.className = `tj-msg tj-msg-${msg.type || 'system'}`;

      let contentHtml = `
        <div class="tj-msg-meta">
          <span class="tj-msg-source">${msg.source || 'Operations Layer'}</span>
          <time datetime="${new Date().toISOString()}">${timeStr}</time>
        </div>
        <div class="tj-msg-card">
          ${msg.title ? `<h4>${msg.title}</h4>` : ''}
          ${msg.body ? `<p>${msg.body}</p>` : ''}
          ${msg.metrics && msg.metrics.length ? `
            <div class="tj-msg-grid">
              ${msg.metrics.map(m => `
                <div class="tj-msg-metric">
                  <span>${m.label}</span>
                  <strong>${m.value}</strong>
                  ${m.sub ? `<small>${m.sub}</small>` : ''}
                </div>
              `).join('')}
            </div>
          ` : ''}
          ${msg.actions && msg.actions.length ? `
            <div class="tj-msg-actions">
              ${msg.actions.map(a => `
                <button type="button" class="tj-msg-btn" data-action="${a.action}" data-payload="${this.escapeHtml(a.payload)}">
                  <span>${a.label}</span>
                  <i>↗</i>
                </button>
              `).join('')}
            </div>
          ` : ''}
        </div>
      `;

      el.innerHTML = contentHtml;
      this.feed.appendChild(el);
      this.feed.scrollTop = this.feed.scrollHeight;
    }

    handleMessageAction(action, payload) {
      if (action === 'query') {
        if (this.input) {
          this.input.value = payload;
          this.submitQuery();
        }
      } else if (action === 'crosslink-3d') {
        this.emit('selectZone3D', payload);
      } else if (action === 'action-pilot') {
        const pilotBtn = document.querySelector('.open-demo');
        if (pilotBtn) pilotBtn.click();
      } else if (action === 'action-receipt') {
        alert('Receipt OCT-2026: Generated and verified with digital watermark (Prototype preview).');
      }
    }

    showTyping(show) {
      if (!this.typing) return;
      this.typing.classList.toggle('is-active', !!show);
      if (show && this.feed) {
        this.feed.scrollTop = this.feed.scrollHeight;
      }
    }

    escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    // Event bus for cross-module integration
    on(event, handler) {
      if (!this.listeners.has(event)) {
        this.listeners.set(event, []);
      }
      this.listeners.get(event).push(handler);
    }

    emit(event, data) {
      if (this.listeners.has(event)) {
        this.listeners.get(event).forEach(handler => handler(data));
      }
    }
  }

  return ThatJointChatbot;
}));
