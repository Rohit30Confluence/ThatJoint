/* ==========================================================================
   THATJOINT / GENERATIVE AI PROPERTY COMPANION ENGINE
   Visual Mascot: "The Property Sentinel" (Red Panda / Equestrian Mode)
   Multi-Modal Suite: Native Voice Input, Document Uploads, Drag & Drop,
   Reactive SVG States, and Real Estate Operations Intelligence.
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

  // ------------------------------------------------------------------
  // High-fidelity Architectural SVGs for The Property Sentinel
  // ------------------------------------------------------------------
  const MASCOT_SVGS = {
    'red-panda': `
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="mascot-svg mascot-red-panda">
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
        <!-- Body / Shoulders -->
        <path d="M20 46C20 40 25 36 32 36C39 36 44 40 44 46L46 58C46 60 44 62 42 62H22C20 62 18 60 18 58L20 46Z" fill="#2B2B2B" />
        <!-- Head Group (Mouse tracking target) -->
        <g class="mascot-head" id="mascotHead">
          <!-- Ears -->
          <polygon points="17,14 27,24 15,28" fill="#D45D3A" />
          <polygon points="18,17 25,23 17,26" fill="#F4F1EA" />
          <polygon points="47,14 37,24 49,28" fill="#D45D3A" />
          <polygon points="46,17 39,23 47,26" fill="#F4F1EA" />
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
    `,
    'equestrian': `
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="mascot-svg mascot-equestrian">
        <defs>
          <filter id="crestGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <!-- Equestrian Neck & Shoulders -->
        <path d="M19 44C21 34 26 27 33 22L41 24C45 32 46 44 48 58H18C18 53 18.5 48 19 44Z" fill="#EDEBE4" />
        <path d="M22 40L20 58H26L27 42Z" fill="#38464A" />
        <!-- Head Group -->
        <g class="mascot-head" id="mascotHead">
          <!-- Ears -->
          <polygon points="34,8 39,18 31,16" fill="#EDEBE4" />
          <polygon points="35,10 38,17 33,15" fill="#A459FF" />
          <polygon points="39,9 43,19 36,17" fill="#EDEBE4" />
          <!-- Mane Facets (Architectural stylized) -->
          <path d="M31 16L27 24L30 26L25 35L29 37L26 46L32 43" stroke="#2B2B2B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Muzzle & Crown -->
          <path d="M33 16L44 19C48 21 51 25 50 30L44 33L36 29L32 23Z" fill="#EDEBE4" />
          <path d="M44 33L47 32C49 31 51 33 50 35L47 38C44 40 40 38 39 36L44 33Z" fill="#D9D6CC" />
          <!-- Nostril -->
          <circle cx="47" cy="35" r="1.2" fill="#2B2B2B" />
          <!-- Eye & Blink Lid -->
          <g class="mascot-eyes" id="mascotEyes">
            <ellipse cx="40" cy="24" rx="2.8" ry="3.2" fill="#161A1C" />
            <circle cx="41" cy="23.2" r="1" fill="#FFFFFF" class="mascot-pupil" />
            <ellipse cx="40" cy="24" rx="3.0" ry="3.5" fill="#EDEBE4" class="mascot-eyelid" />
          </g>
          <!-- Bridle / Intelligence Crest -->
          <path d="M37 20L44 33" stroke="#A459FF" stroke-width="1.5" />
          <path d="M33 24L48 27" stroke="#A459FF" stroke-width="1.5" />
          <polygon points="38,23 41,21 41,25" fill="#A459FF" filter="url(#crestGlow)" />
        </g>
        <!-- Collar Accent -->
        <circle cx="34" cy="46" r="3" fill="#A459FF" filter="url(#crestGlow)" />
        <circle cx="34" cy="46" r="1.5" fill="#FFFFFF" />
      </svg>
    `
  };

  // Property Database grounded in THATJOINT operations
  const PROPERTY_DATA = {
    unit: 'Home 014',
    community: 'Oakview Courtyard Residences',
    address: 'Suite 14, Garden Quadrangle, Maharashtra',
    resident: {
      name: 'Dr. A. Verma',
      since: 'Nov 2025',
      contact: 'a.verma@domain.in',
      status: 'In Good Standing (Zero Infractions)'
    },
    lease: {
      term: '01 Nov 2025 – 31 Oct 2026',
      daysRemaining: 30,
      monthlyRent: '₹1,45,000',
      securityDeposit: '₹4,35,000 (Escrow Backed)',
      lastPaidDate: '18 Oct 2026',
      escalationRate: '5.0% Annual Indexing',
      renewalWindowActive: true
    },
    maintenance: {
      activeWorkOrders: 1,
      scheduledTime: 'Today at 14:00',
      vendor: 'Apex Climate Solutions (Rajesh K.)',
      scope: 'Routine HVAC air-filter & static pressure audit',
      lastInspection: '16 Aug 2026 (Passed)'
    },
    microgrid: {
      solarGeneration: '4.8 kW (Peak Generation)',
      dailyYield: '28.4 kWh',
      batteryStorage: '92% (13.8 kWh Reserve)',
      buildingOffset: '94.2% Net Zero'
    },
    security: {
      perimeterLock: 'Smart Pass #014 Active',
      lastEvent: 'Main Gate Access Confirmed: Courier Delivery #4481 at 09:16'
    }
  };

  // ------------------------------------------------------------------
  // Avatar Controller Class (Coordinates Reactive Visual States)
  // ------------------------------------------------------------------
  class AvatarController {
    constructor(stageEl, statusTextEl) {
      this.stage = stageEl;
      this.statusText = statusTextEl;
      this.theme = localStorage.getItem('tj_sentinel_theme') || 'red-panda';
      this.state = 'idle'; // idle | listening | thinking | speaking
      this.render();
      this.bindMouseTracking();
    }

    render() {
      if (!this.stage) return;
      this.stage.innerHTML = `
        <div class="tj-avatar-voice-rings" aria-hidden="true"></div>
        <div class="tj-avatar-orbiters" aria-hidden="true"></div>
        ${MASCOT_SVGS[this.theme] || MASCOT_SVGS['red-panda']}
        <span class="tj-avatar-status-dot" aria-hidden="true"></span>
      `;
      this.applyState(this.state);
    }

    setTheme(newTheme) {
      if (newTheme !== 'red-panda' && newTheme !== 'equestrian') return;
      this.theme = newTheme;
      localStorage.setItem('tj_sentinel_theme', newTheme);
      this.render();
    }

    toggleTheme() {
      this.setTheme(this.theme === 'red-panda' ? 'equestrian' : 'red-panda');
    }

    applyState(state) {
      this.state = state;
      if (!this.stage) return;
      this.stage.classList.remove('state-idle', 'state-listening', 'state-thinking', 'state-speaking');
      this.stage.classList.add(`state-${state}`);

      if (this.statusText) {
        if (state === 'idle') {
          this.statusText.innerHTML = `<span>Sentinel Ready</span> · <i>Active monitoring</i>`;
        } else if (state === 'listening') {
          this.statusText.innerHTML = `<span>Listening live...</span> · <i style="color:#A459FF">Audio captured</i>`;
        } else if (state === 'thinking') {
          this.statusText.innerHTML = `<span>Analyzing telemetry...</span> · <i style="color:#fbbf24">Processing</i>`;
        } else if (state === 'speaking') {
          this.statusText.innerHTML = `<span>Delivering insights...</span> · <i style="color:#34d399">Transmitting</i>`;
        }
      }
    }

    setIdle() { this.applyState('idle'); }
    setListening() { this.applyState('listening'); }
    setThinking() { this.applyState('thinking'); }
    setSpeaking() { this.applyState('speaking'); }

    bindMouseTracking() {
      if (!this.stage) return;
      window.addEventListener('mousemove', (e) => {
        if (this.state !== 'idle') return;
        const rect = this.stage.getBoundingClientRect();
        const stageCenterX = rect.left + rect.width / 2;
        const stageCenterY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - stageCenterX) / window.innerWidth;
        const deltaY = (e.clientY - stageCenterY) / window.innerHeight;

        const head = this.stage.querySelector('#mascotHead');
        const pupils = this.stage.querySelectorAll('.mascot-pupil');

        if (head) {
          const rotDeg = Math.max(-6, Math.min(6, deltaX * 14));
          const transY = Math.max(-2, Math.min(2, deltaY * 4));
          head.style.transform = `rotate(${rotDeg}deg) translateY(${transY}px)`;
        }

        pupils.forEach(pupil => {
          const pX = Math.max(-1.2, Math.min(1.2, deltaX * 3.5));
          const pY = Math.max(-1.2, Math.min(1.2, deltaY * 3.5));
          pupil.style.transform = `translate(${pX}px, ${pY}px)`;
        });
      }, { passive: true });
    }
  }

  // ------------------------------------------------------------------
  // Main ThatJointChatbot Class
  // ------------------------------------------------------------------
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
      this.isBusy = false;
      this.stagedFile = null;
      this.recognition = null;
      this.isVoiceActive = false;

      this.init();
    }

    init() {
      if (!this.container) return;
      this.render();
      this.avatarController = new AvatarController(
        document.getElementById('tjAvatarStage'),
        document.getElementById('tjSentinelStateText')
      );
      this.initSpeechRecognition();
      this.bindEvents();
      this.setupKeyboardShortcuts();
      this.postWelcomeCard();
    }

    render() {
      const template = `
        <div class="tj-companion-container ${this.isDrawer ? 'tj-companion-drawer' : ''}" id="tjCompanionView" role="region" aria-label="THΛTJOINT Property Sentinel AI">
          <!-- Drag and Drop Overlay -->
          <div class="tj-dropzone-overlay" id="tjDropzoneOverlay" aria-hidden="true">
            <span>📄</span>
            <strong>Drop Lease or Document Here</strong>
            <p>PDF, images, CSVs, or agreements scanned automatically</p>
          </div>

          <!-- Sentinel Header Banner -->
          <header class="tj-sentinel-header">
            <div class="tj-sentinel-topline">
              <div class="tj-sentinel-profile">
                <!-- Avatar Stage -->
                <div class="tj-avatar-stage state-idle" id="tjAvatarStage" title="Click to toggle avatar theme (Red Panda / Stallion)" role="button" tabindex="0" aria-label="Sentinel Avatar">
                  <!-- Injected via AvatarController -->
                </div>
                <div class="tj-sentinel-meta">
                  <div class="tj-sentinel-meta-tag">
                    <span>PROPERTY SENTINEL</span>
                    <b>NODE 014</b>
                  </div>
                  <h3 class="tj-sentinel-name">THΛTJOINT Sentinel <em>Active Companion</em></h3>
                  <div class="tj-sentinel-state-text" id="tjSentinelStateText">
                    <span>Sentinel Ready</span> · <i>Active monitoring</i>
                  </div>
                </div>
              </div>

              <!-- Header Controls -->
              <div class="tj-sentinel-actions">
                <button type="button" class="tj-theme-switch-btn" id="tjThemeSwitchBtn" title="Toggle Avatar Theme">
                  <i aria-hidden="true">🦊/🐴</i>
                  <span id="tjThemeLabel">Switch Avatar</span>
                </button>
                <button type="button" class="tj-sentinel-icon-btn" id="tjBtnClearChat" title="Reset chat history" aria-label="Clear session">↺</button>
                ${this.isDrawer ? `<button type="button" class="tj-sentinel-icon-btn" id="tjBtnCloseDrawer" title="Close Companion [Esc]" aria-label="Close drawer">×</button>` : ''}
              </div>
            </div>

            <!-- Telemetry Status Bar -->
            <div class="tj-sentinel-telemetry">
              <span class="tj-telemetry-chip highlight"><b>🏡 UNIT</b> ${PROPERTY_DATA.unit}</span>
              <span class="tj-telemetry-chip"><b>💳 RENT</b> ${PROPERTY_DATA.lease.monthlyRent}</span>
              <span class="tj-telemetry-chip"><b>🔧 WORK ORDER</b> 14:00 Today</span>
              <span class="tj-telemetry-chip"><b>☀️ SOLAR</b> 4.8 kW Gen</span>
              <span class="tj-telemetry-chip"><b>🔒 LOCK</b> Synced</span>
            </div>
          </header>

          <!-- Main Chat Feed -->
          <div class="tj-companion-body">
            <div class="tj-companion-feed" id="tjChatFeed" role="log" aria-live="polite">
              <!-- Messages stream here -->
            </div>

            <!-- Multi-Modal Input Suite -->
            <div class="tj-input-dock">
              <!-- Pre-baked Quick Action Pills -->
              <div class="tj-quick-pills" role="toolbar" aria-label="Quick operations queries">
                <button type="button" class="tj-quick-pill" data-query="Inspect Home 014 Status">🏡 Home 014 Status</button>
                <button type="button" class="tj-quick-pill" data-query="Analyze Uploaded Lease PDF">📄 Analyze Lease PDF</button>
                <button type="button" class="tj-quick-pill" data-query="Dispatch HVAC Work Order">🔧 Dispatch HVAC Order</button>
                <button type="button" class="tj-quick-pill" data-query="Calculate Rent & Escrow Dues">💳 Rent & Escrow Dues</button>
                <button type="button" class="tj-quick-pill" data-query="Solar Microgrid Telemetry">☀️ Solar Telemetry</button>
              </div>

              <!-- Staged File Preview Tray -->
              <div class="tj-staged-attachment" id="tjStagedAttachment">
                <div class="tj-staged-info">
                  <span class="icon" id="tjStagedIcon">📄</span>
                  <div>
                    <strong id="tjStagedName">Document.pdf</strong>
                    <small id="tjStagedSize">(240 KB)</small>
                  </div>
                </div>
                <button type="button" class="tj-staged-remove-btn" id="tjStagedRemoveBtn" title="Remove attachment" aria-label="Remove attachment">×</button>
              </div>

              <!-- Interactive Media Form -->
              <form class="tj-media-form" id="tjChatForm" autocomplete="off">
                <!-- Hidden native file input -->
                <input type="file" id="tjHiddenFileInput" accept=".pdf,.png,.jpg,.jpeg,.csv,.docx" style="display: none;" />
                
                <!-- Paperclip Button -->
                <button type="button" class="tj-attach-btn" id="tjAttachBtn" title="Attach Lease Agreement, Image, or CSV Document" aria-label="Attach file">
                  📎
                </button>

                <!-- Voice Mic Button with Waveform Visualizer -->
                <button type="button" class="tj-mic-btn" id="tjMicBtn" title="Voice Input (Speech-to-Text)" aria-label="Activate voice recognition">
                  🎙️
                </button>
                <div class="tj-voice-live-waveform" id="tjVoiceWaveform" aria-hidden="true">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>

                <!-- Textarea input -->
                <textarea class="tj-companion-input" id="tjChatInput" rows="1" placeholder="Ask about Unit 014, upload a lease agreement, or tap the mic..." aria-label="Message Property Sentinel"></textarea>

                <!-- Submit Button -->
                <button type="submit" class="tj-companion-send-btn" id="tjSendBtn">
                  <span>Send</span>
                  <span aria-hidden="true">↗</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      `;

      if (this.isDrawer) {
        let backdrop = document.getElementById('tjCompanionBackdrop');
        if (!backdrop) {
          backdrop = document.createElement('div');
          backdrop.id = 'tjCompanionBackdrop';
          backdrop.className = 'tj-companion-backdrop';
          document.body.appendChild(backdrop);
        }
        this.backdrop = backdrop;
      }

      this.container.innerHTML = template;
      this.feed = document.getElementById('tjChatFeed');
      this.form = document.getElementById('tjChatForm');
      this.input = document.getElementById('tjChatInput');
      this.micBtn = document.getElementById('tjMicBtn');
      this.voiceWaveform = document.getElementById('tjVoiceWaveform');
      this.attachBtn = document.getElementById('tjAttachBtn');
      this.fileInput = document.getElementById('tjHiddenFileInput');
      this.stagedAttachment = document.getElementById('tjStagedAttachment');
      this.dropzoneOverlay = document.getElementById('tjDropzoneOverlay');
      this.companionView = document.getElementById('tjCompanionView');
    }

    initSpeechRecognition() {
      const SpeechClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechClass) {
        try {
          this.recognition = new SpeechClass();
          this.recognition.continuous = false;
          this.recognition.interimResults = true;
          this.recognition.lang = 'en-US';

          this.recognition.onstart = () => {
            this.isVoiceActive = true;
            this.micBtn.classList.add('is-listening');
            this.voiceWaveform.classList.add('is-active');
            this.avatarController.setListening();
          };

          this.recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
              transcript += event.results[i][0].transcript;
            }
            if (this.input) {
              this.input.value = transcript;
              this.input.style.height = 'auto';
              this.input.style.height = Math.min(this.input.scrollHeight, 120) + 'px';
            }
          };

          this.recognition.onerror = () => {
            this.stopVoiceInput();
          };

          this.recognition.onend = () => {
            this.stopVoiceInput();
            if (this.input && this.input.value.trim().length > 0) {
              this.submitQuery();
            }
          };
        } catch (e) {
          this.recognition = null;
        }
      }
    }

    toggleVoiceInput() {
      if (!this.recognition) {
        alert('Voice speech recognition is not supported or permitted in this browser window. Please use keyboard input.');
        return;
      }

      if (this.isVoiceActive) {
        this.recognition.stop();
      } else {
        try {
          this.recognition.start();
        } catch (e) {
          this.stopVoiceInput();
        }
      }
    }

    stopVoiceInput() {
      this.isVoiceActive = false;
      if (this.micBtn) this.micBtn.classList.remove('is-listening');
      if (this.voiceWaveform) this.voiceWaveform.classList.remove('is-active');
      if (this.avatarController && !this.isBusy) {
        this.avatarController.setIdle();
      }
    }

    bindEvents() {
      if (!this.form || !this.input) return;

      // Handle submit
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitQuery();
      });

      // Textarea Enter key & auto-expand
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.submitQuery();
        }
      });

      this.input.addEventListener('input', () => {
        this.input.style.height = 'auto';
        this.input.style.height = Math.min(this.input.scrollHeight, 120) + 'px';
      });

      // Mic Button
      if (this.micBtn) {
        this.micBtn.addEventListener('click', () => this.toggleVoiceInput());
      }

      // File Attachment Button
      if (this.attachBtn && this.fileInput) {
        this.attachBtn.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => {
          if (e.target.files && e.target.files[0]) {
            this.stageFile(e.target.files[0]);
          }
        });
      }

      // Remove staged file button
      const removeBtn = document.getElementById('tjStagedRemoveBtn');
      if (removeBtn) {
        removeBtn.addEventListener('click', () => this.unstageFile());
      }

      // Drag and Drop listeners
      if (this.companionView && this.dropzoneOverlay) {
        ['dragenter', 'dragover'].forEach(eventName => {
          this.companionView.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.dropzoneOverlay.classList.add('is-active');
          });
        });

        ['dragleave', 'drop'].forEach(eventName => {
          this.companionView.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.dropzoneOverlay.classList.remove('is-active');
          });
        });

        this.companionView.addEventListener('drop', (e) => {
          if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
            this.stageFile(e.dataTransfer.files[0]);
          }
        });
      }

      // Quick action pills
      const pills = this.container.querySelectorAll('.tj-quick-pill');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          const query = pill.getAttribute('data-query');
          if (query) {
            this.input.value = query;
            this.submitQuery();
          }
        });
      });

      // Avatar click & theme toggle
      const avatarStage = document.getElementById('tjAvatarStage');
      const themeBtn = document.getElementById('tjThemeSwitchBtn');
      const toggleHandler = () => {
        if (this.avatarController) {
          this.avatarController.toggleTheme();
          const label = document.getElementById('tjThemeLabel');
          if (label) {
            label.textContent = this.avatarController.theme === 'red-panda' ? 'Red Panda Active' : 'Stallion Active';
          }
        }
      };
      if (avatarStage) avatarStage.addEventListener('click', toggleHandler);
      if (themeBtn) themeBtn.addEventListener('click', toggleHandler);

      // Clear chat
      const clearBtn = document.getElementById('tjBtnClearChat');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          if (this.feed) {
            this.feed.innerHTML = '';
            this.postWelcomeCard();
          }
        });
      }

      // Drawer Close & Backdrop
      if (this.isDrawer) {
        const closeBtn = document.getElementById('tjBtnCloseDrawer');
        if (closeBtn) closeBtn.addEventListener('click', () => this.close());
        if (this.backdrop) this.backdrop.addEventListener('click', () => this.close());
      }

      // Rich card actions delegation
      this.feed.addEventListener('click', (e) => {
        const btn = e.target.closest('.tj-card-btn');
        if (!btn) return;
        const action = btn.getAttribute('data-action');
        const payload = btn.getAttribute('data-payload');
        this.handleCardAction(action, payload);
      });
    }

    setupKeyboardShortcuts() {
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

    stageFile(file) {
      this.stagedFile = file;
      if (!this.stagedAttachment) return;
      const nameEl = document.getElementById('tjStagedName');
      const sizeEl = document.getElementById('tjStagedSize');
      const iconEl = document.getElementById('tjStagedIcon');

      if (nameEl) nameEl.textContent = file.name;
      if (sizeEl) sizeEl.textContent = `(${Math.round(file.size / 1024)} KB)`;
      if (iconEl) {
        if (file.name.endsWith('.pdf')) iconEl.textContent = '📄';
        else if (file.name.match(/\.(png|jpg|jpeg)$/i)) iconEl.textContent = '🖼️';
        else if (file.name.endsWith('.csv')) iconEl.textContent = '📊';
        else iconEl.textContent = '📑';
      }
      this.stagedAttachment.classList.add('is-visible');
    }

    unstageFile() {
      this.stagedFile = null;
      if (this.stagedAttachment) this.stagedAttachment.classList.remove('is-visible');
      if (this.fileInput) this.fileInput.value = '';
    }

    toggle() {
      if (this.isOpen) this.close();
      else this.open();
    }

    open() {
      if (!this.isDrawer) return;
      this.isOpen = true;
      if (this.companionView) this.companionView.classList.add('is-open');
      if (this.backdrop) this.backdrop.classList.add('is-active');
      document.body.classList.add('terminal-open');
      setTimeout(() => {
        if (this.input) this.input.focus();
      }, 120);
      this.emit('open');
    }

    close() {
      if (!this.isDrawer) return;
      this.isOpen = false;
      if (this.companionView) this.companionView.classList.remove('is-open');
      if (this.backdrop) this.backdrop.classList.remove('is-active');
      document.body.classList.remove('terminal-open');
      this.stopVoiceInput();
      this.emit('close');
    }

    postWelcomeCard() {
      this.appendMessage({
        type: 'companion',
        author: 'THΛTJOINT Sentinel',
        title: 'Greetings. I am your Property Sentinel.',
        body: `I keep continuous watch over <strong>${PROPERTY_DATA.unit} (${PROPERTY_DATA.community})</strong>. My intelligence core coordinates verified leases, rent collections, maintenance tickets, and solar microgrids. How can I assist your operations today?`,
        richCard: {
          title: 'Active Property Dossier · Node 014',
          badge: 'Verified Sentinel Sync',
          params: [
            { label: 'Resident', value: PROPERTY_DATA.resident.name, sub: PROPERTY_DATA.resident.status },
            { label: 'Lease Cycle', value: PROPERTY_DATA.lease.monthlyRent, sub: 'Due 01 Nov' },
            { label: 'Work Order', value: '14:00 Today', sub: 'HVAC Air Filter' },
            { label: 'Solar Output', value: '4.8 kW', sub: '92% Reserve' }
          ],
          actions: [
            { label: 'Inspect Home 014 in 3D', action: 'crosslink-3d', payload: '02 Living Quarters' },
            { label: 'Scan Lease Agreement', action: 'trigger-upload', payload: 'upload' },
            { label: 'Review Maintenance SLA', action: 'query', payload: 'Dispatch HVAC Work Order' }
          ]
        }
      });
    }

    submitQuery() {
      if (this.isBusy || !this.input) return;
      const text = this.input.value.trim();
      const file = this.stagedFile;
      if (!text && !file) return;

      // Post user message
      this.appendMessage({
        type: 'user',
        author: 'Operations Director',
        body: text ? this.escapeHtml(text) : 'Uploaded document for Sentinel audit',
        attachment: file ? { name: file.name, size: `${Math.round(file.size / 1024)} KB` } : null
      });

      this.input.value = '';
      this.input.style.height = 'auto';
      this.unstageFile();

      // Process query through Generative Engine
      this.processQuery(text, file);
    }

    processQuery(query, attachedFile) {
      this.isBusy = true;
      this.avatarController.setThinking();

      // Simulated generative / document-scanning delay
      const latency = attachedFile ? 1400 : 700;

      setTimeout(() => {
        const response = this.generateResponse(query, attachedFile);
        this.appendMessage(response);
        this.avatarController.setSpeaking();

        // Speak aloud briefly if speech synthesis is permitted
        if ('speechSynthesis' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          try {
            const utter = new SpeechSynthesisUtterance(response.voiceText || response.title || 'Operational report ready.');
            utter.rate = 1.05;
            utter.pitch = 1.0;
            utter.onend = () => this.avatarController.setIdle();
            window.speechSynthesis.speak(utter);
          } catch (e) {
            setTimeout(() => this.avatarController.setIdle(), 1200);
          }
        } else {
          setTimeout(() => this.avatarController.setIdle(), 1500);
        }

        this.isBusy = false;
        if (response.crossLinkZone) {
          this.emit('selectZone3D', response.crossLinkZone);
        }
      }, latency);
    }

    generateResponse(rawQuery, file) {
      const q = (rawQuery || '').toLowerCase();

      // 1. Document Upload / Lease Scanning
      if (file || q.includes('lease') || q.includes('upload') || q.includes('pdf') || q.includes('contract')) {
        const fileName = file ? file.name : 'Oakview_Executed_Lease_Form_R26.pdf';
        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Document Intelligence',
          title: 'Document Intelligence / Lease Extraction',
          voiceText: 'Lease extraction complete. Unit 014 lease is active with 30 days remaining in current evaluation window.',
          body: `Scanned <strong>${this.escapeHtml(fileName)}</strong> under residential tenancy governance protocols. All 14 operational covenants, escrow trust accounts, and maintenance SLAs have been extracted and verified.`,
          docScan: true,
          richCard: {
            title: 'Extracted Lease Parameters · Unit 014',
            badge: '100% Verified Compliant',
            params: [
              { label: 'Term Dates', value: PROPERTY_DATA.lease.term, sub: '30 Days Remaining' },
              { label: 'Monthly Base', value: PROPERTY_DATA.lease.monthlyRent, sub: 'Next: 01 Nov' },
              { label: 'Security Escrow', value: PROPERTY_DATA.lease.securityDeposit, sub: 'Digital Trust Held' },
              { label: 'Index Escalation', value: PROPERTY_DATA.lease.escalationRate, sub: 'Effective Nov 2026' }
            ],
            actions: [
              { label: 'Trigger Automated Renewal Notice', action: 'query', payload: 'Send 30-Day Renewal Form' },
              { label: 'Inspect Home 014 3D Model', action: 'crosslink-3d', payload: '02 Living Quarters' }
            ]
          }
        };
      }

      // 2. Unit 014 Status
      if (q.includes('014') || q.includes('status') || q.includes('home') || q.includes('unit')) {
        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Operational Core',
          title: 'Unit 014 Living Quarters Telemetry',
          voiceText: 'Unit 014 is operating normally. Lease is active, and routine HVAC filter inspection is scheduled for 14:00 today.',
          body: `Unit 014 at <strong>${PROPERTY_DATA.community}</strong> is in nominal operating condition. Resident <strong>${PROPERTY_DATA.resident.name}</strong> is current on all dues. Routine filter inspection dispatched for today at 14:00.`,
          crossLinkZone: '02 Living Quarters',
          richCard: {
            title: 'Home 014 Multi-System Overview',
            badge: 'Subsystems Nominal',
            params: [
              { label: 'Occupancy', value: 'Occupied', sub: PROPERTY_DATA.resident.name },
              { label: 'Rent Status', value: 'Settled Oct 18', sub: 'Zero Arrears' },
              { label: 'HVAC Airflow', value: '420 CFM', sub: 'Filter: 88% Clean' },
              { label: 'Perimeter Access', value: 'Secured', sub: 'Smart Pass #014' }
            ],
            actions: [
              { label: 'Highlight Unit 014 in 3D', action: 'crosslink-3d', payload: '02 Living Quarters' },
              { label: 'Dispatch HVAC Order', action: 'query', payload: 'Dispatch HVAC Work Order' },
              { label: 'Review Rent Ledger', action: 'query', payload: 'Calculate Rent & Escrow Dues' }
            ]
          }
        };
      }

      // 3. Maintenance & Work Orders
      if (q.includes('hvac') || q.includes('maintenance') || q.includes('repair') || q.includes('work order') || q.includes('dispatch')) {
        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Dispatch Gateway',
          title: 'Field Operations & Maintenance Queue',
          voiceText: 'Work order 8841 is currently assigned to Apex Climate Solutions for 14:00 today.',
          body: `Active ticket <strong>WO-8841 (Routine HVAC Air-Filter & Duct Review)</strong> is confirmed. Technician <strong>${PROPERTY_DATA.maintenance.vendor}</strong> is scheduled for <strong>${PROPERTY_DATA.maintenance.scheduledTime}</strong>.`,
          richCard: {
            title: 'Active Work Order #8841',
            badge: 'Technician Assigned',
            params: [
              { label: 'Priority', value: 'Routine', sub: 'SLA < 4.0 Hours' },
              { label: 'Assigned Vendor', value: 'Apex Climate', sub: 'Rajesh K. (Certified)' },
              { label: 'Dispatch Slot', value: '14:00 Today', sub: 'Digital Gate Pass Issued' },
              { label: 'Resident Notice', value: 'Delivered', sub: 'Dr. A. Verma' }
            ],
            actions: [
              { label: 'Confirm Work Order Arrival', action: 'notice', payload: 'Vendor check-in logged' },
              { label: 'View Living Quarters in 3D', action: 'crosslink-3d', payload: '02 Living Quarters' }
            ]
          }
        };
      }

      // 4. Rent, Dues & Escrow
      if (q.includes('rent') || q.includes('dues') || q.includes('escrow') || q.includes('payment') || q.includes('ledger') || q.includes('deposit')) {
        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Financial Core',
          title: 'Connected Rent Ledger & Escrow Audit',
          voiceText: 'Rent collection is 100% clear with zero arrears. Security deposit is held in verified escrow.',
          body: `Rent ledger for cycle ending 31 Oct is reconciled. Automated digital mandate cleared on 18 Oct. Security deposit of <strong>${PROPERTY_DATA.lease.securityDeposit}</strong> is held in compliance with digital property escrow guidelines.`,
          richCard: {
            title: 'Financial Health · Unit 014',
            badge: 'Zero Arrears',
            params: [
              { label: 'Monthly Rent', value: PROPERTY_DATA.lease.monthlyRent, sub: 'Paid 18 Oct' },
              { label: 'Next Cycle', value: '01 Nov 2026', sub: 'Mandate Active' },
              { label: 'Escrow Reserve', value: '₹4,35,000', sub: 'Verified Escrow' },
              { label: 'Portfolio Rate', value: '98.8%', sub: 'On-Time Average' }
            ],
            actions: [
              { label: 'Download Verified Receipt PDF', action: 'download-receipt', payload: 'Receipt-OCT-2026' },
              { label: 'Audit Lease Agreement', action: 'query', payload: 'Analyze Uploaded Lease PDF' }
            ]
          }
        };
      }

      // 5. Solar & Microgrid
      if (q.includes('solar') || q.includes('energy') || q.includes('power') || q.includes('microgrid') || q.includes('battery')) {
        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Clean Energy Gateway',
          title: 'Rooftop Microgrid & Energy Telemetry',
          voiceText: 'Rooftop solar is generating 4.8 kilowatts with battery storage at 92%.',
          body: `Rooftop photovoltaic microgrid is operating under peak daylight irradiance. Instant generation: <strong>${PROPERTY_DATA.microgrid.solarGeneration}</strong>. Battery storage reserves: <strong>${PROPERTY_DATA.microgrid.batteryStorage}</strong>.`,
          crossLinkZone: '03 Rooftop Terrace',
          richCard: {
            title: 'Rooftop Microgrid Performance',
            badge: 'Optimal Efficiency',
            params: [
              { label: 'Peak Generation', value: PROPERTY_DATA.microgrid.solarGeneration, sub: '12 Panels Active' },
              { label: 'Daily Yield', value: PROPERTY_DATA.microgrid.dailyYield, sub: 'Offset: 94.2%' },
              { label: 'Battery Storage', value: PROPERTY_DATA.microgrid.batteryStorage, sub: '13.8 kWh reserve' },
              { label: 'Grid Feed', value: '+1.6 kW', sub: 'Export Active' }
            ],
            actions: [
              { label: 'View Rooftop Terrace in 3D', action: 'crosslink-3d', payload: '03 Rooftop Terrace' }
            ]
          }
        };
      }

      // Default contextual response
      return {
        type: 'companion',
        author: 'THΛTJOINT Sentinel',
        title: 'Operational Inquiry Resolved',
        voiceText: 'Telemetry inquiry resolved. All building subsystems and property records are aligned.',
        body: `I have processed your operational request: <em>"${this.escapeHtml(rawQuery)}"</em>. Connected to verified records for <strong>${PROPERTY_DATA.address}</strong>. All building telemetry, ledger balances, and maintenance dispatch queues are active and in compliance with operations policy.`,
        richCard: {
          title: 'Quick Operations Navigation',
          badge: 'Sentinel Active',
          params: [
            { label: 'Active Node', value: PROPERTY_DATA.unit, sub: 'Oakview' },
            { label: 'Operations SLA', value: '100% Pass', sub: '0 Violations' },
            { label: 'System Edge', value: '12ms', sub: 'Live Telemetry' }
          ],
          actions: [
            { label: 'Inspect Home 014 Status', action: 'query', payload: 'Inspect Home 014 Status' },
            { label: 'Scan Lease Agreement', action: 'trigger-upload', payload: 'upload' },
            { label: 'Open 3D Model', action: 'crosslink-3d', payload: '00 Complete Assembly' }
          ]
        }
      };
    }

    appendMessage(msg) {
      if (!this.feed) return;
      const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const wrap = document.createElement('article');
      wrap.className = `tj-bubble-wrap ${msg.type || 'companion'}`;

      let cardHtml = `
        <div class="tj-bubble-meta">
          <span class="author">${msg.author || 'THΛTJOINT Sentinel'}</span>
          <time datetime="${new Date().toISOString()}">${timeStr}</time>
        </div>
        <div class="tj-bubble-card">
          ${msg.attachment ? `
            <div class="tj-user-attachment">
              <i>📎</i>
              <span><strong>${this.escapeHtml(msg.attachment.name)}</strong> ${msg.attachment.size}</span>
            </div>
          ` : ''}
          ${msg.title ? `<h4>${msg.title}</h4>` : ''}
          ${msg.docScan ? `<div class="tj-doc-scan-bar" aria-hidden="true"><i></i></div>` : ''}
          ${msg.body ? `<p>${msg.body}</p>` : ''}
          ${msg.richCard ? `
            <div class="tj-rich-card">
              <div class="tj-rich-card-head">
                <b>${msg.richCard.title}</b>
                <span class="badge-pill">${msg.richCard.badge}</span>
              </div>
              <div class="tj-param-grid">
                ${msg.richCard.params.map(p => `
                  <div class="tj-param-box">
                    <span>${p.label}</span>
                    <strong>${p.value}</strong>
                    ${p.sub ? `<small>${p.sub}</small>` : ''}
                  </div>
                `).join('')}
              </div>
              ${msg.richCard.actions && msg.richCard.actions.length ? `
                <div class="tj-card-actions">
                  ${msg.richCard.actions.map(a => `
                    <button type="button" class="tj-card-btn" data-action="${a.action}" data-payload="${this.escapeHtml(a.payload)}">
                      <span>${a.label}</span>
                      <i>↗</i>
                    </button>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          ` : ''}
        </div>
      `;

      wrap.innerHTML = cardHtml;
      this.feed.appendChild(wrap);
      this.feed.scrollTop = this.feed.scrollHeight;
    }

    handleCardAction(action, payload) {
      if (action === 'query') {
        if (this.input) {
          this.input.value = payload;
          this.submitQuery();
        }
      } else if (action === 'crosslink-3d') {
        this.emit('selectZone3D', payload);
      } else if (action === 'trigger-upload') {
        if (this.fileInput) this.fileInput.click();
      } else if (action === 'download-receipt') {
        alert('Receipt OCT-2026: Cryptographically signed property receipt downloaded (Prototype simulation).');
      } else if (action === 'notice') {
        alert('Operational Notice: ' + payload);
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
