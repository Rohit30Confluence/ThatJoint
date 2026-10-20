/* ==========================================================================
   THATJOINT / 3D Building Tour Visualizer Engine
   Vanilla Three.js architectural isometric visualizer.
   Procedural courtyard miniature, smooth camera transitions, 3D hotspots,
   and cross-module synchronization with the Operational Intelligence Terminal.
   ========================================================================== */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ThatJointBuildingTour = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Zone camera positions and look targets (isometric orientation)
  const TOUR_ZONES = {
    'assembly': {
      id: 'assembly',
      label: 'Complete Assembly',
      number: '00',
      camPos: { x: 26, y: 22, z: 26 },
      target: { x: 0, y: 4.2, z: 0 },
      description: 'Overall architectural massing, dual-volume courtyard assembly.'
    },
    'courtyard': {
      id: 'courtyard',
      label: 'Ground Courtyard',
      number: '01',
      camPos: { x: 14, y: 7.5, z: 14 },
      target: { x: 0.8, y: 1.5, z: 0.2 },
      description: 'Recessed timber entry portal, gravel pathways, and sage courtyard court.'
    },
    'living': {
      id: 'living',
      label: 'Living Quarters (Home 014)',
      number: '02',
      camPos: { x: 12, y: 11, z: 16 },
      target: { x: 1.2, y: 5.6, z: 1.8 },
      description: 'Offset cantilevered limestone volume, timber balcony, Unit 014 suite.'
    },
    'rooftop': {
      id: 'rooftop',
      label: 'Rooftop Terrace',
      number: '03',
      camPos: { x: 13, y: 17, z: 13 },
      target: { x: -0.6, y: 8.4, z: -0.4 },
      description: 'Solar photovoltaic array, pergola shading, and rooftop green planter.'
    }
  };

  // Hotspots anchored in 3D world space
  const HOTSPOTS_DATA = [
    {
      id: 'unit-014',
      zone: 'living',
      title: 'Home 014 / Suite',
      badge: '01 / Active Unit',
      worldPos: { x: 1.8, y: 6.2, z: 2.8 },
      signal: 'Unit 014: HVAC Inspection Scheduled Today 14:00 · Lease Active (Renewal in 30d)',
      prompt: 'Status Home 014'
    },
    {
      id: 'courtyard-entry',
      zone: 'courtyard',
      title: 'Courtyard & Gate',
      badge: '02 / Access Layer',
      worldPos: { x: 3.4, y: 1.8, z: -0.8 },
      signal: 'Main Gate: Access Logged 09:16 · Courier delivery verified (Pass #4481)',
      prompt: 'Inspect Main Gate Access'
    },
    {
      id: 'rooftop-solar',
      zone: 'rooftop',
      title: 'Solar Microgrid',
      badge: '03 / Energy',
      worldPos: { x: -1.4, y: 9.1, z: -1.2 },
      signal: 'Rooftop Solar: 4.8 kW Peak Generation · Battery Storage at 92% (13.8 kWh)',
      prompt: 'Solar Microgrid Generation'
    },
    {
      id: 'ops-desk',
      zone: 'courtyard',
      title: 'Operations Desk',
      badge: '04 / Telemetry',
      worldPos: { x: -3.2, y: 1.8, z: 1.8 },
      signal: 'Building Ops Desk: All 4 Subsystems Synced · Zero Critical Alerts on Record',
      prompt: 'Audit Maintenance Queue'
    }
  ];

  class ThatJointBuildingTour {
    constructor(options = {}) {
      this.containerId = options.containerId || 'tourRoot';
      this.container = typeof this.containerId === 'string'
        ? document.getElementById(this.containerId)
        : this.containerId;

      this.currentZone = 'assembly';
      this.listeners = new Map();
      this.hotspotElements = [];
      this.isTransitioning = false;
      this.transitionProgress = 1;
      this.activeUnitGlow = null;

      this.init();
    }

    init() {
      if (!this.container) return;

      // Check for WebGL capability
      if (!this.checkWebGLSupport()) {
        this.renderFallback();
        return;
      }

      this.renderDomStructure();
      this.initThreeScene();
      this.buildProceduralArchitecture();
      this.initHotspots();
      this.bindEvents();
      this.startRenderLoop();
    }

    checkWebGLSupport() {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    }

    renderFallback() {
      this.container.innerHTML = `
        <div class="tj-tour-wrapper">
          <div class="tj-tour-fallback">
            <img src="assets/story-courtyard-concept.png" alt="THATJOINT Courtyard Residence Architecture" />
            <p><strong>THΛTJOINT 3D Visualizer</strong><br/>Interactive WebGL acceleration is not available in this browser session. Exploring static architectural isometric drawing.</p>
          </div>
        </div>
      `;
    }

    renderDomStructure() {
      this.container.innerHTML = `
        <div class="tj-tour-wrapper" id="tjTourWrapper" role="region" aria-label="Interactive 3D Architectural Building Tour">
          <!-- Canvas Layer -->
          <div class="tj-tour-canvas-container" id="tjCanvasContainer" tabindex="0" aria-label="3D Building Canvas - Drag to rotate, scroll to zoom"></div>

          <!-- Hotspots Projection Layer -->
          <div class="tj-hotspot-container" id="tjHotspotContainer"></div>

          <!-- Top HUD: Badge + Floor/Zone Selector -->
          <div class="tj-tour-hud-top">
            <div class="tj-tour-title-badge">
              <span><i aria-hidden="true"></i>Digital Twin / Isometric</span>
              <strong id="tjTourCurrentZoneTitle">Courtyard Assembly</strong>
            </div>

            <nav class="tj-tour-zones" role="tablist" aria-label="Building Zones">
              <button type="button" class="tj-tour-zone-btn is-active" data-zone="assembly" role="tab" aria-selected="true">
                <span>00</span> Assembly
              </button>
              <button type="button" class="tj-tour-zone-btn" data-zone="courtyard" role="tab" aria-selected="false">
                <span>01</span> Courtyard
              </button>
              <button type="button" class="tj-tour-zone-btn" data-zone="living" role="tab" aria-selected="false">
                <span>02</span> Home 014
              </button>
              <button type="button" class="tj-tour-zone-btn" data-zone="rooftop" role="tab" aria-selected="false">
                <span>03</span> Rooftop
              </button>
            </nav>
          </div>

          <!-- Bottom HUD: Hint & Cross-Link Action -->
          <div class="tj-tour-hud-bottom">
            <div class="tj-tour-hint">
              <span>Drag to rotate</span>
              <span aria-hidden="true">·</span>
              <span>Scroll to zoom</span>
              <span aria-hidden="true">·</span>
              <b>Click hotspots for signals</b>
            </div>

            <div class="tj-tour-actions">
              <button type="button" class="tj-tour-action-btn" id="tjBtnResetCam">
                <span>Reset View</span>
              </button>
              <button type="button" class="tj-tour-action-btn" id="tjBtnOpenChatbot">
                <span>Query Unit in Terminal</span>
                <i>↗</i>
              </button>
            </div>
          </div>
        </div>
      `;

      this.canvasContainer = document.getElementById('tjCanvasContainer');
      this.hotspotContainer = document.getElementById('tjHotspotContainer');
      this.currentZoneTitle = document.getElementById('tjTourCurrentZoneTitle');
    }

    initThreeScene() {
      const width = this.canvasContainer.clientWidth || 800;
      const height = this.canvasContainer.clientHeight || 560;

      // Scene
      this.scene = new THREE.Scene();

      // Camera: Narrow-angle perspective providing authentic architectural isometric view
      this.camera = new THREE.PerspectiveCamera(32, width / height, 0.5, 500);
      const initialZone = TOUR_ZONES[this.currentZone];
      this.camera.position.set(initialZone.camPos.x, initialZone.camPos.y, initialZone.camPos.z);
      this.camTarget = new THREE.Vector3(initialZone.target.x, initialZone.target.y, initialZone.target.z);
      this.camera.lookAt(this.camTarget);

      // Renderer
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      if (THREE.sRGBEncoding) this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const canvas = this.renderer.domElement;
      canvas.className = 'tj-tour-canvas';
      this.canvasContainer.appendChild(canvas);

      // Controls (OrbitControls)
      if (typeof THREE.OrbitControls !== 'undefined') {
        this.controls = new THREE.OrbitControls(this.camera, canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 16;
        this.controls.maxDistance = 55;
        // Clamp polar angles to maintain isometric perspective
        this.controls.minPolarAngle = Math.PI / 4.2; // ~42 deg
        this.controls.maxPolarAngle = Math.PI / 2.3; // ~78 deg
        this.controls.target.copy(this.camTarget);
      }

      // Lighting system matching pale stone editorial aesthetic
      this.setupLighting();

      // Transition animation state
      this.camStartPos = new THREE.Vector3();
      this.camEndPos = new THREE.Vector3();
      this.targetStart = new THREE.Vector3();
      this.targetEnd = new THREE.Vector3();
    }

    setupLighting() {
      // Warm subtle ambient light
      const ambientLight = new THREE.AmbientLight(0xfff8f2, 0.75);
      this.scene.add(ambientLight);

      // Directional Sun Light (from upper-left)
      const sunLight = new THREE.DirectionalLight(0xfffcf5, 1.25);
      sunLight.position.set(-24, 42, 22);
      sunLight.castShadow = true;
      sunLight.shadow.mapSize.width = 1024;
      sunLight.shadow.mapSize.height = 1024;
      sunLight.shadow.camera.near = 10;
      sunLight.shadow.camera.far = 100;
      sunLight.shadow.camera.left = -20;
      sunLight.shadow.camera.right = 20;
      sunLight.shadow.camera.top = 20;
      sunLight.shadow.camera.bottom = -20;
      sunLight.shadow.bias = -0.0005;
      this.scene.add(sunLight);

      // Soft hemisphere light (sky blue, ground warm grey)
      const hemiLight = new THREE.HemisphereLight(0xdee9ee, 0xc4c2ba, 0.6);
      hemiLight.position.set(0, 30, 0);
      this.scene.add(hemiLight);

      // Subtle fill light for courtyard interior
      const fillLight = new THREE.DirectionalLight(0xe4edff, 0.35);
      fillLight.position.set(20, 15, -15);
      this.scene.add(fillLight);
    }

    buildProceduralArchitecture() {
      this.buildingGroup = new THREE.Group();
      this.scene.add(this.buildingGroup);

      // Palette definition (limestone, plaster, warm oak, dark bronze, foliage, solar)
      const mats = {
        baseSlab: new THREE.MeshStandardMaterial({ color: 0xd6dcde, roughness: 0.8, metalness: 0.05 }),
        groundPaver: new THREE.MeshStandardMaterial({ color: 0xe2e5e4, roughness: 0.75 }),
        limestoneWall: new THREE.MeshStandardMaterial({ color: 0xedebe4, roughness: 0.7, metalness: 0.02 }),
        whitePlaster: new THREE.MeshStandardMaterial({ color: 0xfbfbf8, roughness: 0.65 }),
        oakTimber: new THREE.MeshStandardMaterial({ color: 0x826447, roughness: 0.7, metalness: 0.05 }),
        darkBronze: new THREE.MeshStandardMaterial({ color: 0x242426, roughness: 0.45, metalness: 0.4 }),
        glassWindow: new THREE.MeshPhysicalMaterial({
          color: 0xdbeef5,
          roughness: 0.1,
          transmission: 0.85,
          transparent: true,
          opacity: 0.65
        }),
        sageFoliage: new THREE.MeshStandardMaterial({ color: 0x7c9284, roughness: 0.85 }),
        treeTrunk: new THREE.MeshStandardMaterial({ color: 0x5a483a, roughness: 0.8 }),
        solarPanel: new THREE.MeshStandardMaterial({ color: 0x1a2632, roughness: 0.25, metalness: 0.8 }),
        waterGravel: new THREE.MeshStandardMaterial({ color: 0xb5c0be, roughness: 0.9 }),
        unitGlow: new THREE.MeshBasicMaterial({ color: 0xa459ff, transparent: true, opacity: 0.35 })
      };

      this.mats = mats;

      // 1. Ground Landscaped Base Slab
      const baseGeo = new THREE.BoxGeometry(22, 0.6, 20);
      const baseMesh = new THREE.Mesh(baseGeo, mats.baseSlab);
      baseMesh.position.set(0, -0.3, 0);
      baseMesh.receiveShadow = true;
      this.buildingGroup.add(baseMesh);

      // Courtyard gravel/stone inset
      const courtGravel = new THREE.Mesh(new THREE.BoxGeometry(7, 0.1, 7), mats.waterGravel);
      courtGravel.position.set(1.5, 0.05, -0.5);
      courtGravel.receiveShadow = true;
      this.buildingGroup.add(courtGravel);

      // 2. Ground Floor Volumes (L-shaped with courtyard void)
      // East Wing (Ground Entrance & Operations)
      const gEastGeo = new THREE.BoxGeometry(7.5, 3.8, 6.5);
      const gEast = new THREE.Mesh(gEastGeo, mats.whitePlaster);
      gEast.position.set(-4.5, 1.9, 2.5);
      gEast.castShadow = true;
      gEast.receiveShadow = true;
      this.buildingGroup.add(gEast);

      // Entrance Recessed Oak Portal
      const portalOak = new THREE.Mesh(new THREE.BoxGeometry(4.2, 3.6, 1.2), mats.oakTimber);
      portalOak.position.set(2.8, 1.8, 4.2);
      portalOak.castShadow = true;
      this.buildingGroup.add(portalOak);

      // Bronze Glass Doors on Ground Portal
      const entryGlass = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.8, 0.2), mats.glassWindow);
      entryGlass.position.set(2.8, 1.5, 4.85);
      this.buildingGroup.add(entryGlass);

      // Ground Living Pavilion (West/North)
      const gNorthGeo = new THREE.BoxGeometry(13.5, 3.8, 5.5);
      const gNorth = new THREE.Mesh(gNorthGeo, mats.limestoneWall);
      gNorth.position.set(-1.5, 1.9, -4.5);
      gNorth.castShadow = true;
      gNorth.receiveShadow = true;
      this.buildingGroup.add(gNorth);

      // Large Courtyard Floor-to-Ceiling Glazing
      const gGlass = new THREE.Mesh(new THREE.BoxGeometry(6.4, 3.2, 0.2), mats.glassWindow);
      gGlass.position.set(1.5, 1.6, -1.8);
      this.buildingGroup.add(gGlass);

      // Slender dark bronze mullion frames
      const mullionGeo = new THREE.BoxGeometry(0.12, 3.2, 0.25);
      [-1.8, 0, 1.8].forEach(xOff => {
        const mul = new THREE.Mesh(mullionGeo, mats.darkBronze);
        mul.position.set(1.5 + xOff, 1.6, -1.8);
        this.buildingGroup.add(mul);
      });

      // 3. First Floor: Offset Cantilevered Volume (Home 014 Living Quarters)
      const f1Geo = new THREE.BoxGeometry(10.5, 3.6, 8.5);
      const f1Mesh = new THREE.Mesh(f1Geo, mats.limestoneWall);
      f1Mesh.position.set(1.2, 5.6, 1.8);
      f1Mesh.castShadow = true;
      f1Mesh.receiveShadow = true;
      this.buildingGroup.add(f1Mesh);

      // Unit 014 Illuminated Window Suite
      const u14Glass = new THREE.Mesh(new THREE.BoxGeometry(4.8, 2.4, 0.25), mats.glassWindow);
      u14Glass.position.set(1.2, 5.6, 6.1);
      this.buildingGroup.add(u14Glass);

      // Unit 014 Active Highlight Glow Plane (Subtle indicator)
      const glowGeo = new THREE.BoxGeometry(5.2, 2.6, 0.1);
      this.activeUnitGlow = new THREE.Mesh(glowGeo, mats.unitGlow);
      this.activeUnitGlow.position.set(1.2, 5.6, 6.15);
      this.activeUnitGlow.visible = false;
      this.buildingGroup.add(this.activeUnitGlow);

      // Unit 014 Private Timber Balcony
      const balcFloor = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.25, 2.0), mats.oakTimber);
      balcFloor.position.set(1.2, 3.9, 7.1);
      balcFloor.castShadow = true;
      this.buildingGroup.add(balcFloor);

      // Bronze Balcony Railing
      const railGeo = new THREE.BoxGeometry(4.8, 1.0, 0.08);
      const railMesh = new THREE.Mesh(railGeo, mats.darkBronze);
      railMesh.position.set(1.2, 4.4, 8.1);
      this.buildingGroup.add(railMesh);

      // Second First-Floor Block (Connecting volume)
      const f1NorthGeo = new THREE.BoxGeometry(8.5, 3.6, 5.5);
      const f1North = new THREE.Mesh(f1NorthGeo, mats.whitePlaster);
      f1North.position.set(-3.5, 5.6, -3.2);
      f1North.castShadow = true;
      f1North.receiveShadow = true;
      this.buildingGroup.add(f1North);

      // 4. Rooftop Terrace & Solar Microgrid Assembly
      // Stepped Rooftop Canopy volume
      const roofCoreGeo = new THREE.BoxGeometry(4.5, 2.4, 4.5);
      const roofCore = new THREE.Mesh(roofCoreGeo, mats.whitePlaster);
      roofCore.position.set(-3.0, 8.4, -2.5);
      roofCore.castShadow = true;
      this.buildingGroup.add(roofCore);

      // Rooftop Timber Pergola
      const pergolaBeams = new THREE.Group();
      for (let i = 0; i < 5; i++) {
        const beam = new THREE.Mesh(new THREE.BoxGeometry(5.5, 0.15, 0.25), mats.oakTimber);
        beam.position.set(1.2, 8.6, 1.0 + i * 0.9);
        pergolaBeams.add(beam);
      }
      this.buildingGroup.add(pergolaBeams);

      // Solar Photovoltaic Array (6 angled solar panels facing southwest)
      const solarGroup = new THREE.Group();
      solarGroup.position.set(-1.5, 8.2, -1.2);
      solarGroup.rotation.x = 0.26; // ~15 deg tilt
      for (let r = 0; r < 2; r++) {
        for (let c = 0; c < 3; c++) {
          const panel = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 1.1), mats.solarPanel);
          panel.position.set((c - 1) * 1.8, 0, (r - 0.5) * 1.3);
          panel.castShadow = true;
          solarGroup.add(panel);
        }
      }
      this.buildingGroup.add(solarGroup);

      // 5. Landscaping: Sculptural Courtyard Sage Tree & Planter Boxes
      const treeGroup = new THREE.Group();
      treeGroup.position.set(1.8, 0, -0.6);
      
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 2.6, 8), mats.treeTrunk);
      trunk.position.set(0, 1.3, 0);
      trunk.castShadow = true;
      treeGroup.add(trunk);

      // Sage foliage canopy (minimalist organic clusters)
      const f1 = new THREE.Mesh(new THREE.DodecahedronGeometry(1.2, 1), mats.sageFoliage);
      f1.position.set(0.1, 2.8, 0.1);
      f1.castShadow = true;
      treeGroup.add(f1);

      const f2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.9, 1), mats.sageFoliage);
      f2.position.set(-0.6, 3.2, -0.4);
      f2.castShadow = true;
      treeGroup.add(f2);

      const f3 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.8, 1), mats.sageFoliage);
      f3.position.set(0.7, 3.0, 0.5);
      f3.castShadow = true;
      treeGroup.add(f3);

      this.buildingGroup.add(treeGroup);

      // Courtyard Garden Planter Borders
      const planterBox = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.5, 0.9), mats.oakTimber);
      planterBox.position.set(-2.5, 0.25, 0.5);
      planterBox.castShadow = true;
      this.buildingGroup.add(planterBox);

      const planterGreens = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.4, 0.7), mats.sageFoliage);
      planterGreens.position.set(-2.5, 0.6, 0.5);
      this.buildingGroup.add(planterGreens);
    }

    initHotspots() {
      if (!this.hotspotContainer) return;
      this.hotspotContainer.innerHTML = '';
      this.hotspotElements = [];

      HOTSPOTS_DATA.forEach((data, index) => {
        const el = document.createElement('div');
        el.className = 'tj-hotspot';
        el.setAttribute('data-id', data.id);
        el.setAttribute('data-zone', data.zone);

        el.innerHTML = `
          <div class="tj-hotspot-pin" aria-label="${data.title}">
            <span>0${index + 1}</span>
          </div>
          <div class="tj-hotspot-popover">
            <div class="tj-hotspot-popover-head">
              <span>${data.badge}</span>
              <b>● Live</b>
            </div>
            <h5>${data.title}</h5>
            <p>${data.signal}</p>
            <button type="button" class="tj-hotspot-popover-btn" data-prompt="${data.prompt}">
              <span>Query in Terminal</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        `;

        el.addEventListener('click', (e) => {
          const btn = e.target.closest('.tj-hotspot-popover-btn');
          if (btn) {
            const prompt = btn.getAttribute('data-prompt');
            this.emit('queryTerminal', prompt);
          } else {
            this.toggleHotspot(el);
          }
        });

        this.hotspotContainer.appendChild(el);
        this.hotspotElements.push({
          el: el,
          data: data,
          worldVec: new THREE.Vector3(data.worldPos.x, data.worldPos.y, data.worldPos.z)
        });
      });
    }

    toggleHotspot(activeEl) {
      this.hotspotElements.forEach(item => {
        if (item.el === activeEl) {
          item.el.classList.toggle('is-active');
        } else {
          item.el.classList.remove('is-active');
        }
      });
    }

    bindEvents() {
      // Floor / Zone Buttons
      const zoneButtons = this.container.querySelectorAll('.tj-tour-zone-btn');
      zoneButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const zoneKey = btn.getAttribute('data-zone');
          this.switchZone(zoneKey);
        });
      });

      // Reset Camera Button
      const btnReset = document.getElementById('tjBtnResetCam');
      if (btnReset) {
        btnReset.addEventListener('click', () => {
          this.switchZone('assembly');
        });
      }

      // Query Unit in Chatbot Button
      const btnChatbot = document.getElementById('tjBtnOpenChatbot');
      if (btnChatbot) {
        btnChatbot.addEventListener('click', () => {
          this.emit('queryTerminal', 'Status Home 014');
        });
      }

      // ResizeObserver
      if (window.ResizeObserver && this.canvasContainer) {
        this.resizeObserver = new ResizeObserver(() => {
          this.handleResize();
        });
        this.resizeObserver.observe(this.canvasContainer);
      } else {
        window.addEventListener('resize', () => this.handleResize());
      }
    }

    switchZone(zoneKey) {
      const zone = TOUR_ZONES[zoneKey];
      if (!zone || !this.camera) return;

      this.currentZone = zoneKey;

      // Update button states
      const zoneButtons = this.container.querySelectorAll('.tj-tour-zone-btn');
      zoneButtons.forEach(btn => {
        const isMatch = btn.getAttribute('data-zone') === zoneKey;
        btn.classList.toggle('is-active', isMatch);
        btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
      });

      if (this.currentZoneTitle) {
        this.currentZoneTitle.textContent = zone.label;
      }

      // Home 014 highlight glow
      if (this.activeUnitGlow) {
        this.activeUnitGlow.visible = (zoneKey === 'living');
      }

      // Prepare smooth lerp transition
      this.camStartPos.copy(this.camera.position);
      this.camEndPos.set(zone.camPos.x, zone.camPos.y, zone.camPos.z);

      if (this.controls) {
        this.targetStart.copy(this.controls.target);
      } else {
        this.targetStart.copy(this.camTarget);
      }
      this.targetEnd.set(zone.target.x, zone.target.y, zone.target.z);

      this.transitionProgress = 0;
      this.isTransitioning = true;

      this.emit('zoneChange', zone);
    }

    handleResize() {
      if (!this.canvasContainer || !this.renderer || !this.camera) return;
      const width = this.canvasContainer.clientWidth;
      const height = this.canvasContainer.clientHeight;
      if (width === 0 || height === 0) return;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    }

    updateHotspotPositions() {
      if (!this.hotspotElements.length || !this.camera || !this.canvasContainer) return;

      const width = this.canvasContainer.clientWidth;
      const height = this.canvasContainer.clientHeight;
      const halfW = width / 2;
      const halfH = height / 2;
      const projVec = new THREE.Vector3();

      this.hotspotElements.forEach(item => {
        projVec.copy(item.worldVec);
        projVec.project(this.camera);

        // Check if hotspot is behind camera
        if (projVec.z > 1) {
          item.el.classList.add('is-hidden');
          return;
        }

        const screenX = (projVec.x * halfW) + halfW;
        const screenY = -(projVec.y * halfH) + halfH;

        // Check bounds within canvas
        if (screenX < 20 || screenX > width - 20 || screenY < 20 || screenY > height - 20) {
          item.el.classList.add('is-hidden');
          return;
        }

        item.el.classList.remove('is-hidden');
        item.el.style.left = `${screenX.toFixed(1)}px`;
        item.el.style.top = `${screenY.toFixed(1)}px`;
      });
    }

    startRenderLoop() {
      const animate = () => {
        this.animFrameId = requestAnimationFrame(animate);

        // Smooth camera lerp transition
        if (this.isTransitioning) {
          this.transitionProgress += 0.035; // ~30 frames smooth cubic
          const t = Math.min(this.transitionProgress, 1);
          // Ease-out cubic formula
          const easeT = 1 - Math.pow(1 - t, 3);

          this.camera.position.lerpVectors(this.camStartPos, this.camEndPos, easeT);
          if (this.controls) {
            this.controls.target.lerpVectors(this.targetStart, this.targetEnd, easeT);
          }

          if (t >= 1) {
            this.isTransitioning = false;
          }
        }

        if (this.controls) {
          this.controls.update();
        }

        if (this.renderer && this.scene && this.camera) {
          this.renderer.render(this.scene, this.camera);
        }

        this.updateHotspotPositions();
      };

      animate();
    }

    // Cleanup & context disposal for memory safety
    dispose() {
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
      }
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
      if (this.controls) {
        this.controls.dispose();
      }
      if (this.buildingGroup) {
        this.buildingGroup.traverse(child => {
          if (child.isMesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(m => m.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
      }
      if (this.renderer) {
        this.renderer.dispose();
        if (this.renderer.domElement && this.renderer.domElement.parentNode) {
          this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
        }
      }
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

  return ThatJointBuildingTour;
}));
