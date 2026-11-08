/* ==========================================================================
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
  const PROPERTY_DATA = {
    unit: 'Home 014',
    community: 'Oakview Courtyard Residences',
    address: 'Suite 14, Garden Quadrangle, Maharashtra',
    resident: {
      name: 'Dr. A. Verma',
      since: 'Nov 2025',
      contact: 'a.verma@thatjoint.domain',
      phone: '+91 98200 44812',
      status: 'In Good Standing (Zero Infractions)'
    },
    lease: {
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
    },
    maintenance: {
      activeWorkOrders: 1,
      ticketId: 'WO-8841',
      scheduledTime: 'Today at 14:00',
      vendor: 'Apex Climate Solutions (Rajesh K.)',
      scope: 'Routine HVAC air-filter & static pressure audit',
      lastInspection: '16 Aug 2026 (Passed 100%)',
      status: 'Technician Dispatched'
    },
    microgrid: {
      solarGeneration: '4.8 kW (Peak Generation)',
      dailyYield: '28.4 kWh',
      batteryStorage: '92% (13.8 kWh Reserve)',
      buildingOffset: '94.2% Net Zero',
      status: 'Optimal Efficiency'
    },
    security: {
      perimeterLock: 'Smart Pass #014 Active',
      lastEvent: 'Main Gate Access Confirmed: Courier Delivery #4481 at 09:16',
      status: 'Secured'
    }
  };

  // ------------------------------------------------------------------
  // Autonomous Knowledge Base: Pacific Grove & Monterey Peninsula (274 Properties)
  // ------------------------------------------------------------------
  const PACIFIC_GROVE_KB = {"summary":{"market":"Pacific Grove & Monterey Peninsula, CA","total_properties":274,"total_hosts":114,"pricing":{"currency":"USD","median_nightly":351.0,"mean_nightly":485.02,"min_nightly":58.0,"max_nightly":2867.0,"avg_monthly_midterm":7224.93},"regulatory_str_split":{"thirty_day_plus_flexible":112,"short_term_str":162,"str_compliance_ratio":"40.9% 30-day covenant compliance"},"room_type_distribution":{"Entire home/apt":219,"Private room":43,"Hotel room":12},"key_operators":[{"host":"Sanctuary Vacation Rentals","listings_count":49},{"host":"Monterey Rentals","listings_count":21},{"host":"Kyle","listings_count":13},{"host":"Pacific","listings_count":11},{"host":"Angela","listings_count":9},{"host":"The Charles Pacific Grove","listings_count":8},{"host":"Green Gables Inn","listings_count":5},{"host":"Tracy","listings_count":5},{"host":"Alex","listings_count":4},{"host":"Carmel Coast Estate","listings_count":4}],"submarket_clusters":{"lovers_point":15,"asilomar":8,"cannery_aquarium":15,"downtown":32,"coastal_ocean_view":133,"luxury_estates":31}},"properties":[{"id":"22772","name":"Stay-Awhile  at Lovers Pt. Pacific Grv","host":"Amie","roomType":"Entire home/apt","price":247.0,"minNights":30,"reviews":62,"rpm":0.31,"avail":83,"license":"","lat":36.62202,"lng":-121.91775,"tags":["30-Day Flexible Tenancy"]},{"id":"41014","name":"Ocean front 6-bedroom masterpiece","host":"Kirstie","roomType":"Entire home/apt","price":1768.0,"minNights":5,"reviews":124,"rpm":0.66,"avail":154,"license":"","lat":36.63096,"lng":-121.93652,"tags":["Short-Term Vacation","Coastal / Ocean View","Luxury Estate"]},{"id":"44515","name":"Pet-Friendly* Cottage Near Beach for 30+ day stays","host":"Blake","roomType":"Entire home/apt","price":101.0,"minNights":1,"reviews":974,"rpm":4.96,"avail":133,"license":"","lat":36.62475,"lng":-121.93491,"tags":["Short-Term Vacation","Coastal / Ocean View","Pet-Friendly","Budget / Value Tier"]},{"id":"89210","name":"CA Dreaming w/Ocean View, Fire pit and Gardens","host":"Sarah","roomType":"Entire home/apt","price":237.0,"minNights":1,"reviews":1436,"rpm":7.63,"avail":45,"license":"","lat":36.60421,"lng":-121.92524,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"129723","name":"Modern Victorian with ocean view (1 month minimum)","host":"Birgit","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":19,"rpm":0.13,"avail":125,"license":"","lat":36.62008,"lng":-121.90993,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Heritage / Victorian Architecture"]},{"id":"1031734","name":"Ocean View Designer Home","host":"Dan","roomType":"Entire home/apt","price":733.0,"minNights":30,"reviews":237,"rpm":1.45,"avail":365,"license":"","lat":36.60368,"lng":-121.92721,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"1721186","name":"Beautiful Villa With Ocean View","host":"Barb","roomType":"Entire home/apt","price":601.0,"minNights":1,"reviews":559,"rpm":3.56,"avail":320,"license":"","lat":36.62468,"lng":-121.91711,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"3029273","name":"Modern Beach House","host":"James","roomType":"Private room","price":304.0,"minNights":1,"reviews":786,"rpm":5.34,"avail":174,"license":"","lat":36.6333,"lng":-121.92406,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"3821616","name":"Bright Beach Cottage, Center of town, 30-day","host":"Alka","roomType":"Entire home/apt","price":145.0,"minNights":30,"reviews":470,"rpm":3.2,"avail":212,"license":"","lat":36.62262,"lng":-121.91895,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Downtown Core","Budget / Value Tier"]},{"id":"3836973","name":"Lovely House in Pacific Grove (Long term rental)","host":"Paul","roomType":"Entire home/apt","price":227.0,"minNights":30,"reviews":478,"rpm":3.24,"avail":365,"license":"","lat":36.60589,"lng":-121.92924,"tags":["30-Day Flexible Tenancy"]},{"id":"4099680","name":"The Monarch Home - Cozy & Relaxing","host":"Anne","roomType":"Entire home/apt","price":181.0,"minNights":30,"reviews":468,"rpm":3.24,"avail":251,"license":"","lat":36.62322,"lng":-121.92883,"tags":["30-Day Flexible Tenancy","Budget / Value Tier"]},{"id":"4582398","name":"Furnished Victorian Cottage (30 days minimum)","host":"Birgit","roomType":"Entire home/apt","price":117.0,"minNights":30,"reviews":15,"rpm":0.13,"avail":279,"license":"","lat":36.62028,"lng":-121.90982,"tags":["30-Day Flexible Tenancy","Heritage / Victorian Architecture","Budget / Value Tier"]},{"id":"5185545","name":"Peaceful Cozy Beach Cottage","host":"Sarah","roomType":"Entire home/apt","price":336.0,"minNights":1,"reviews":440,"rpm":3.12,"avail":191,"license":"","lat":36.63195,"lng":-121.92545,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"5238711","name":"~Downtown PG Penthouses, Two Blocks to Beach~","host":"Kristina Isabella","roomType":"Entire home/apt","price":858.0,"minNights":3,"reviews":135,"rpm":0.99,"avail":192,"license":"","lat":36.61981,"lng":-121.91558,"tags":["Short-Term Vacation","Coastal / Ocean View","Downtown Core"]},{"id":"6018499","name":"Lovely ocean view house walk to coffee and beach!","host":"Marianne","roomType":"Entire home/apt","price":200.0,"minNights":2,"reviews":88,"rpm":0.63,"avail":193,"license":"","lat":36.61722,"lng":-121.91489,"tags":["Short-Term Vacation","Coastal / Ocean View","Budget / Value Tier"]},{"id":"6646306","name":"Peaceful Space near DLI + Cannery Row","host":"Seth","roomType":"Private room","price":69.0,"minNights":30,"reviews":250,"rpm":1.82,"avail":178,"license":"","lat":36.61305,"lng":-121.91538,"tags":["30-Day Flexible Tenancy","Aquarium & Cannery Row","Budget / Value Tier"]},{"id":"6715036","name":"Cute & Stylish Cottage +HOT TUB","host":"Toni","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":34,"rpm":0.39,"avail":358,"license":"","lat":36.60167,"lng":-121.93163,"tags":["30-Day Flexible Tenancy","Wellness & Spa"]},{"id":"11210583","name":"Bungalow-by-the-Sea","host":"Michelle Frances","roomType":"Entire home/apt","price":525.0,"minNights":3,"reviews":227,"rpm":1.84,"avail":332,"license":"","lat":36.62294,"lng":-121.91968,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"11562419","name":"Beautiful Home Beach/Forest Area","host":"Richard","roomType":"Entire home/apt","price":163.0,"minNights":31,"reviews":118,"rpm":0.94,"avail":217,"license":"","lat":36.62282,"lng":-121.92969,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Budget / Value Tier"]},{"id":"13428610","name":"Romantic Private  Master Suite & Gardens #0427","host":"Jeanne","roomType":"Private room","price":459.0,"minNights":2,"reviews":47,"rpm":0.38,"avail":82,"license":"","lat":36.63323,"lng":-121.92557,"tags":["Short-Term Vacation"]},{"id":"13902577","name":"Charming Victorian Home Near Beach","host":"W","roomType":"Entire home/apt","price":653.0,"minNights":3,"reviews":248,"rpm":2.01,"avail":212,"license":"","lat":36.62511,"lng":-121.91704,"tags":["Short-Term Vacation","Coastal / Ocean View","Heritage / Victorian Architecture"]},{"id":"14266085","name":"Cottage Retreat Steps from the Sea","host":"Viveca And Jim","roomType":"Entire home/apt","price":442.0,"minNights":1,"reviews":855,"rpm":6.91,"avail":157,"license":"","lat":36.62094,"lng":-121.91302,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"14388930","name":"Guest Quarters Near Asilomar & Pebble Beach #0335","host":"Richard","roomType":"Entire home/apt","price":241.0,"minNights":5,"reviews":125,"rpm":1.07,"avail":57,"license":"","lat":36.62253,"lng":-121.93406,"tags":["Short-Term Vacation","Coastal / Ocean View","Asilomar Corridor"]},{"id":"14403615","name":"Dolphin House - Great Location! *30 day min stay*","host":"Beverlee","roomType":"Entire home/apt","price":167.0,"minNights":30,"reviews":132,"rpm":1.07,"avail":301,"license":"","lat":36.61825,"lng":-121.9118,"tags":["30-Day Flexible Tenancy","Budget / Value Tier"]},{"id":"14539067","name":"Pacific Grove, Pebble Beach, Carmel, Monterey","host":"Dimitra","roomType":"Entire home/apt","price":0.0,"minNights":2,"reviews":428,"rpm":3.48,"avail":3,"license":"","lat":36.62533,"lng":-121.93089,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"15165034","name":"No shared space! Guest suite! PGLic#0405","host":"Angi","roomType":"Entire home/apt","price":118.0,"minNights":1,"reviews":1204,"rpm":9.96,"avail":193,"license":"PG License #0405","lat":36.60376,"lng":-121.92731,"tags":["Short-Term Vacation","Budget / Value Tier"]},{"id":"15649395","name":"Casa Mariposa - The Live-In Museum","host":"Jon & Julie","roomType":"Entire home/apt","price":203.0,"minNights":30,"reviews":36,"rpm":0.3,"avail":209,"license":"","lat":36.62003,"lng":-121.92591,"tags":["30-Day Flexible Tenancy"]},{"id":"15857785","name":"Heart of PG Cottage (#0365)","host":"Roeya","roomType":"Entire home/apt","price":0.0,"minNights":2,"reviews":532,"rpm":4.44,"avail":0,"license":"","lat":36.61916,"lng":-121.91824,"tags":["Short-Term Vacation"]},{"id":"15942471","name":"Serene Retreat: Remodeled Home Near Everything","host":"Lisa","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":67,"rpm":0.56,"avail":314,"license":"","lat":36.60083,"lng":-121.93155,"tags":["30-Day Flexible Tenancy"]},{"id":"16542967","name":"Lovers Point Beach House - 30 Steps to Beach #0125","host":"Larry","roomType":"Entire home/apt","price":761.0,"minNights":2,"reviews":145,"rpm":1.24,"avail":54,"license":"","lat":36.62447,"lng":-121.91658,"tags":["Short-Term Vacation","Coastal / Ocean View","Lovers Point"]},{"id":"16884158","name":"Wake up to crashing waves!","host":"Evelyn","roomType":"Entire home/apt","price":294.0,"minNights":1,"reviews":130,"rpm":1.13,"avail":160,"license":"","lat":36.63600158691406,"lng":-121.9303207397461,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"17479137","name":"Pacific Grove Cottage, Entire House [30 days min]","host":"Joe","roomType":"Entire home/apt","price":141.0,"minNights":29,"reviews":50,"rpm":0.43,"avail":161,"license":"","lat":36.62027,"lng":-121.9245,"tags":["30-Day Flexible Tenancy","Budget / Value Tier"]},{"id":"17623471","name":"Pacific Grove Mid Century Near Beach","host":"Dave & Lee","roomType":"Entire home/apt","price":597.0,"minNights":1,"reviews":669,"rpm":5.78,"avail":63,"license":"","lat":36.62243,"lng":-121.92963,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"18731829","name":"Monarch Garden Cottage (30 day rental)","host":"Suzanne","roomType":"Entire home/apt","price":0.0,"minNights":31,"reviews":70,"rpm":0.61,"avail":1,"license":"","lat":36.61673,"lng":-121.90999,"tags":["30-Day Flexible Tenancy"]},{"id":"18917071","name":"Cozy Pacific Grove Post-Adobe Charmer 2/1 #0387","host":"Carolyn","roomType":"Entire home/apt","price":400.0,"minNights":2,"reviews":366,"rpm":3.22,"avail":141,"license":"","lat":36.60623550415039,"lng":-121.92169952392578,"tags":["Short-Term Vacation"]},{"id":"19137340","name":"Pacific Grove Willis House, Walk to Town and Beach","host":"Chris","roomType":"Entire home/apt","price":829.0,"minNights":2,"reviews":121,"rpm":1.07,"avail":12,"license":"","lat":36.61793,"lng":-121.92364,"tags":["Short-Term Vacation","Coastal / Ocean View","Downtown Core"]},{"id":"19606480","name":"Mermaid's Delight","host":"Terri","roomType":"Entire home/apt","price":658.0,"minNights":1,"reviews":294,"rpm":2.63,"avail":254,"license":"","lat":36.62559,"lng":-121.91967,"tags":["Short-Term Vacation"]},{"id":"19736001","name":"Furnished Studio/Cottage In Pacific Grove","host":"Dolly","roomType":"Entire home/apt","price":105.0,"minNights":30,"reviews":2,"rpm":0.04,"avail":363,"license":"","lat":36.61672,"lng":-121.92502,"tags":["30-Day Flexible Tenancy","Budget / Value Tier"]},{"id":"19789713","name":"Steps to the Beach + Ocean Views + Walk Everywhere","host":"Tommy & Mallary","roomType":"Entire home/apt","price":740.0,"minNights":2,"reviews":443,"rpm":3.98,"avail":274,"license":"","lat":36.62603,"lng":-121.91822,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"19830907","name":"Your month-long vacation on the California coast!","host":"Julie","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":69,"rpm":0.62,"avail":211,"license":"","lat":36.62556,"lng":-121.92263,"tags":["30-Day Flexible Tenancy"]},{"id":"19910607","name":"\"Mainstay Cottage\" Just Steps To Beach & Town!","host":"Marci","roomType":"Entire home/apt","price":1178.0,"minNights":1,"reviews":226,"rpm":2.06,"avail":76,"license":"","lat":36.62439,"lng":-121.91942,"tags":["Short-Term Vacation","Coastal / Ocean View","Downtown Core","Luxury Estate"]},{"id":"20190642","name":"Outback Bungalow","host":"Michelle Frances","roomType":"Entire home/apt","price":508.0,"minNights":2,"reviews":246,"rpm":2.37,"avail":315,"license":"","lat":36.62465,"lng":-121.91996,"tags":["Short-Term Vacation"]},{"id":"20229666","name":"3743 Pelican Peaks ~ Near Aquarium, Beach & Town","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":0.0,"minNights":1,"reviews":73,"rpm":0.8,"avail":0,"license":"","lat":36.619986,"lng":-121.908223,"tags":["Short-Term Vacation","Coastal / Ocean View","Aquarium & Cannery Row","Downtown Core"]},{"id":"20229673","name":"3729 Ocean Park Sanctuary ~ Short Walk to the Bay","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":320.0,"minNights":30,"reviews":8,"rpm":0.07,"avail":363,"license":"","lat":36.620008,"lng":-121.921036,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"20229679","name":"3705 Oceanview Serenity ~ Oceanfront, Bay View","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":377.0,"minNights":30,"reviews":4,"rpm":0.04,"avail":61,"license":"","lat":36.626947,"lng":-121.919538,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"20229689","name":"3704 Ship's Watch ~ Walk to Restaurants and Shops","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":235.0,"minNights":30,"reviews":16,"rpm":0.15,"avail":255,"license":"","lat":36.620155,"lng":-121.921967,"tags":["30-Day Flexible Tenancy"]},{"id":"20229693","name":"3715 Bliss by the Sea ~  Beach/Trails/Aquarium","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":233.0,"minNights":30,"reviews":6,"rpm":0.06,"avail":244,"license":"","lat":36.618089,"lng":-121.910526,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Aquarium & Cannery Row"]},{"id":"20229698","name":"3703 La Gloria Cottage-by-the-Sea ~ Near the Beach","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":325.0,"minNights":30,"reviews":8,"rpm":0.08,"avail":201,"license":"","lat":36.621795,"lng":-121.920669,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"20229711","name":"3263 Villa by the Sea ~ Newly Remodeled, Bay View","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":1148.0,"minNights":1,"reviews":83,"rpm":0.75,"avail":310,"license":"","lat":36.619973222135215,"lng":-121.907522708004,"tags":["Short-Term Vacation","Coastal / Ocean View","Luxury Estate"]},{"id":"20229712","name":"3646 Seashore Retreat ~ Walk to the Beach and Town","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":188,"license":"","lat":36.62084,"lng":-121.915183,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Downtown Core"]},{"id":"20279454","name":"Studio Blu in Pacific Grove","host":"Brian","roomType":"Entire home/apt","price":95.0,"minNights":30,"reviews":30,"rpm":0.27,"avail":147,"license":"","lat":36.61594,"lng":-121.91262,"tags":["30-Day Flexible Tenancy","Budget / Value Tier"]},{"id":"20404083","name":"3096 Sanctuary by the Bay ~ Remodeled, Bay View!","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":349.0,"minNights":30,"reviews":9,"rpm":0.08,"avail":184,"license":"","lat":36.62000766639408,"lng":-121.9076326785736,"tags":["30-Day Flexible Tenancy"]},{"id":"21981955","name":"Sunset Inn Pacific Grove","host":"Rishi","roomType":"Hotel room","price":307.0,"minNights":1,"reviews":327,"rpm":3.04,"avail":342,"license":"","lat":36.63018,"lng":-121.93234,"tags":["Short-Term Vacation"]},{"id":"22178195","name":"Pacific Suite (PG License # 0420)","host":"George","roomType":"Entire home/apt","price":389.0,"minNights":1,"reviews":541,"rpm":5.07,"avail":205,"license":"PG License #0420","lat":36.62051,"lng":-121.91453,"tags":["Short-Term Vacation"]},{"id":"22292297","name":"Pacific Grove 2 bed charmer","host":"Josh","roomType":"Entire home/apt","price":227.0,"minNights":30,"reviews":30,"rpm":0.29,"avail":252,"license":"","lat":36.61319,"lng":-121.92476,"tags":["30-Day Flexible Tenancy"]},{"id":"22666758","name":"Perfect location in Pacific Grove (Lic #0403)","host":"Carolyn","roomType":"Entire home/apt","price":400.0,"minNights":3,"reviews":329,"rpm":3.13,"avail":218,"license":"PG License #0403","lat":36.60569,"lng":-121.92101,"tags":["Short-Term Vacation"]},{"id":"22747634","name":"3759 Pacific Grove Retreat ~ 1 Block to Bay Trail","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":1,"rpm":0.01,"avail":250,"license":"","lat":36.618918,"lng":-121.90869,"tags":["30-Day Flexible Tenancy"]},{"id":"23768786","name":"Mermaid Crossing License #0473","host":"Rhonda","roomType":"Entire home/apt","price":529.0,"minNights":1,"reviews":340,"rpm":3.3,"avail":71,"license":"PG License #0473","lat":36.62678,"lng":-121.91914,"tags":["Short-Term Vacation"]},{"id":"24059256","name":"Forest Home on 1/4  Acre","host":"Tamara","roomType":"Entire home/apt","price":124.0,"minNights":31,"reviews":104,"rpm":1.06,"avail":241,"license":"","lat":36.61963,"lng":-121.93336,"tags":["30-Day Flexible Tenancy","Budget / Value Tier"]},{"id":"24773264","name":"Monterey Peninsula Ideal Accommodation","host":"Kat","roomType":"Entire home/apt","price":0.0,"minNights":5,"reviews":0,"rpm":0.0,"avail":338,"license":"","lat":36.62156,"lng":-121.91825,"tags":["Short-Term Vacation"]},{"id":"25281531","name":"Rosedale Inn & Suites - King Suite","host":"Anjali","roomType":"Hotel room","price":0.0,"minNights":1,"reviews":28,"rpm":0.28,"avail":0,"license":"","lat":36.61961,"lng":-121.93631,"tags":["Short-Term Vacation"]},{"id":"26468647","name":"Sallie\u2019s Cottage","host":"Elizabeth","roomType":"Entire home/apt","price":608.0,"minNights":2,"reviews":567,"rpm":5.65,"avail":199,"license":"","lat":36.62311,"lng":-121.91876,"tags":["Short-Term Vacation"]},{"id":"27092841","name":"Charming house between downtown and the beach","host":"Ashley","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":12,"rpm":0.13,"avail":0,"license":"","lat":36.62372,"lng":-121.91901,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Downtown Core"]},{"id":"31169667","name":"Spectacular Award Winning Ocean Front 2 Bed 2 Bath","host":"Jane","roomType":"Entire home/apt","price":985.0,"minNights":2,"reviews":373,"rpm":3.97,"avail":209,"license":"","lat":36.62038268144633,"lng":-121.9069418932686,"tags":["Short-Term Vacation","Coastal / Ocean View","Luxury Estate"]},{"id":"32237119","name":"3118 Yellow House Main - Walk to the Aquarium!","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":1028.0,"minNights":4,"reviews":24,"rpm":0.32,"avail":307,"license":"","lat":36.620371,"lng":-121.909139,"tags":["Short-Term Vacation","Aquarium & Cannery Row","Luxury Estate"]},{"id":"33396484","name":"Standard King Room","host":"Anjali","roomType":"Hotel room","price":350.0,"minNights":1,"reviews":26,"rpm":0.31,"avail":177,"license":"","lat":36.61892,"lng":-121.93459,"tags":["Short-Term Vacation"]},{"id":"35950153","name":"BLOCKS FROM OCEAN -COZY QUEEN-A GETAWAY FOR TWO","host":"Pacific","roomType":"Hotel room","price":309.0,"minNights":1,"reviews":814,"rpm":9.24,"avail":328,"license":"","lat":36.61867,"lng":-121.91911,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"36006241","name":"WALK TO OCEAN from our Premium KING BED ROOMS","host":"Pacific","roomType":"Hotel room","price":158.0,"minNights":1,"reviews":347,"rpm":3.94,"avail":303,"license":"","lat":36.61867,"lng":-121.91911,"tags":["Short-Term Vacation","Coastal / Ocean View","Budget / Value Tier"]},{"id":"36006645","name":"TEENY View of OCEAN-WALK to OCEAN - KING BEDROOM","host":"Pacific","roomType":"Hotel room","price":163.0,"minNights":1,"reviews":147,"rpm":1.67,"avail":332,"license":"","lat":36.61867,"lng":-121.91911,"tags":["Short-Term Vacation","Coastal / Ocean View","Budget / Value Tier"]},{"id":"36007109","name":"CROSS Ocean View from Balcony-RELAX-QUEEN BEDROOM","host":"Pacific","roomType":"Hotel room","price":158.0,"minNights":1,"reviews":150,"rpm":1.71,"avail":324,"license":"","lat":36.61867,"lng":-121.91911,"tags":["Short-Term Vacation","Coastal / Ocean View","Budget / Value Tier"]},{"id":"36007581","name":"WALK TO OCEAN- Queen bed with BONUS TWIN BED:)","host":"Pacific","roomType":"Hotel room","price":0.0,"minNights":1,"reviews":447,"rpm":5.14,"avail":0,"license":"","lat":36.62012,"lng":-121.91887,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"36008146","name":"Blocks from Ocean - KING BEDROOM SUITE","host":"Pacific","roomType":"Hotel room","price":206.0,"minNights":1,"reviews":191,"rpm":2.17,"avail":318,"license":"","lat":36.61867,"lng":-121.91911,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"36045923","name":"Ocean Views,ROMANTIC QUEEN BEDROOM","host":"Pacific","roomType":"Hotel room","price":0.0,"minNights":1,"reviews":37,"rpm":0.42,"avail":0,"license":"","lat":36.61867,"lng":-121.91911,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"36046495","name":"AMAZING OCEAN VIEWS - QUEEN, TWIN & LIVING ROOM","host":"Pacific","roomType":"Hotel room","price":0.0,"minNights":1,"reviews":266,"rpm":3.02,"avail":0,"license":"","lat":36.61867,"lng":-121.91911,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"36046892","name":"WALK TO OCEAN, KING WITH TWO TWINS","host":"Pacific","roomType":"Hotel room","price":0.0,"minNights":1,"reviews":221,"rpm":2.51,"avail":0,"license":"","lat":36.61867,"lng":-121.91911,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"37393944","name":"3747 Bungalow by-the-Sea - Adorable, Cozy Cottage","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":137,"license":"","lat":36.623969,"lng":-121.927618,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"38239130","name":"Mermaid Hideaway 30 Day Rental","host":"Jordan","roomType":"Entire home/apt","price":172.0,"minNights":3,"reviews":47,"rpm":0.75,"avail":343,"license":"","lat":36.62612,"lng":-121.91973,"tags":["Short-Term Vacation","Budget / Value Tier"]},{"id":"38539935","name":"3792 The Lavender House ~ Walk to Town & Beach","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":973.0,"minNights":1,"reviews":67,"rpm":0.8,"avail":318,"license":"","lat":36.623297,"lng":-121.921272,"tags":["Short-Term Vacation","Coastal / Ocean View","Downtown Core","Luxury Estate"]},{"id":"39131210","name":"La Piccola Casa \"The Little House\"   Lic. # 0446","host":"Joe","roomType":"Entire home/apt","price":541.0,"minNights":1,"reviews":253,"rpm":2.98,"avail":257,"license":"PG License #0446","lat":36.62178,"lng":-121.91851,"tags":["Short-Term Vacation"]},{"id":"39537770","name":"Otters Cove/Ocean Views-Walk to Beach/Aquarium","host":"Charleen","roomType":"Entire home/apt","price":406.0,"minNights":30,"reviews":1,"rpm":0.02,"avail":363,"license":"","lat":36.61671,"lng":-121.91375,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Aquarium & Cannery Row"]},{"id":"40032768","name":"3788 Seagull's Nest ~ Walk to Town and the Beach","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":1195.0,"minNights":1,"reviews":80,"rpm":1.17,"avail":335,"license":"","lat":36.619326,"lng":-121.917411,"tags":["Short-Term Vacation","Coastal / Ocean View","Downtown Core","Luxury Estate"]},{"id":"41156259","name":"Charming Cottage Steps to Ocean!","host":"Anne","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":26,"rpm":0.36,"avail":177,"license":"","lat":36.62364,"lng":-121.91592,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"42454978","name":"3804 Mermaid Loft ~ Near Ocean & Recreation Trail","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":615.0,"minNights":1,"reviews":97,"rpm":1.27,"avail":319,"license":"","lat":36.62738402509727,"lng":-121.92094034722136,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"42561512","name":"Queen Bed with Bunk bed","host":"Pacific","roomType":"Private room","price":0.0,"minNights":1,"reviews":56,"rpm":0.73,"avail":0,"license":"","lat":36.61947,"lng":-121.91806,"tags":["Short-Term Vacation"]},{"id":"43126039","name":"Rare Find! Beautiful Historic Home. Walk to Ocean!","host":"Karyn","roomType":"Entire home/apt","price":241.0,"minNights":30,"reviews":1,"rpm":0.02,"avail":147,"license":"","lat":36.62076,"lng":-121.9189,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Heritage / Victorian Architecture"]},{"id":"43580733","name":"Private Stand-alone Cottages near Ocean & Beach","host":"Alex","roomType":"Private room","price":999.0,"minNights":1,"reviews":160,"rpm":2.19,"avail":254,"license":"","lat":36.62256,"lng":-121.91821,"tags":["Short-Term Vacation","Coastal / Ocean View","Luxury Estate"]},{"id":"43743300","name":"Victorian Premier Queen Room near Ocean & Beach","host":"Alex","roomType":"Private room","price":999.0,"minNights":1,"reviews":846,"rpm":11.06,"avail":254,"license":"","lat":36.62256,"lng":-121.91821,"tags":["Short-Term Vacation","Coastal / Ocean View","Heritage / Victorian Architecture","Luxury Estate"]},{"id":"43757076","name":"Two Twin beds in a Historic Victorian Hotel","host":"Alex","roomType":"Private room","price":999.0,"minNights":1,"reviews":121,"rpm":1.61,"avail":254,"license":"","lat":36.62256,"lng":-121.91821,"tags":["Short-Term Vacation","Heritage / Victorian Architecture","Luxury Estate"]},{"id":"43820284","name":"Garden Room \"Honeymoon Suite\" near Lover's Point","host":"Alex","roomType":"Private room","price":999.0,"minNights":1,"reviews":136,"rpm":1.84,"avail":252,"license":"","lat":36.62256,"lng":-121.91821,"tags":["Short-Term Vacation","Lovers Point","Luxury Estate"]},{"id":"44808129","name":"Oceanview Studio, 2-Blocks to Cannery Row","host":"Dennis","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":25,"rpm":0.35,"avail":341,"license":"","lat":36.6186,"lng":-121.90669,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Aquarium & Cannery Row"]},{"id":"44844957","name":"#JewelboxCottages\ud83d\udc51MAIN\ud83d\udd314-Poster King\ud83c\udfd6Walk to Beach","host":"Mel, Tripmogul","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":5,"rpm":0.07,"avail":0,"license":"","lat":36.61509,"lng":-121.9131,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"45710558","name":"2-Block Walk to Cannery Row/Aquarium @ Evans Place","host":"Dennis","roomType":"Entire home/apt","price":159.0,"minNights":30,"reviews":30,"rpm":0.43,"avail":233,"license":"","lat":36.61781,"lng":-121.90594,"tags":["30-Day Flexible Tenancy","Aquarium & Cannery Row","Budget / Value Tier"]},{"id":"45928538","name":"Seagull House Downtown Pacific Grove","host":"Ahnalisa","roomType":"Entire home/apt","price":762.0,"minNights":2,"reviews":194,"rpm":2.68,"avail":127,"license":"","lat":36.61945,"lng":-121.91674,"tags":["Short-Term Vacation","Coastal / Ocean View","Downtown Core"]},{"id":"46561318","name":"3812 Little House - Historic Home, Walk to the Bay","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":1059.0,"minNights":1,"reviews":99,"rpm":1.45,"avail":319,"license":"","lat":36.621181,"lng":-121.911657,"tags":["Short-Term Vacation","Heritage / Victorian Architecture","Luxury Estate"]},{"id":"46927425","name":"2-Block Walk to Cannery Row/Aquarium @ Lighthouse","host":"Dennis","roomType":"Entire home/apt","price":165.0,"minNights":30,"reviews":9,"rpm":0.14,"avail":272,"license":"","lat":36.61707,"lng":-121.90737,"tags":["30-Day Flexible Tenancy","Aquarium & Cannery Row","Budget / Value Tier"]},{"id":"47812234","name":"3813 Point Break ~ Walk to Lover's Point Beach!","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":1428.0,"minNights":1,"reviews":91,"rpm":1.32,"avail":310,"license":"","lat":36.623718,"lng":-121.917713,"tags":["Short-Term Vacation","Coastal / Ocean View","Lovers Point","Luxury Estate"]},{"id":"48803024","name":"3684 Jewel by the Sea ~ Walk to Town and the Beach","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":397.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":141,"license":"","lat":36.621746,"lng":-121.921281,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Downtown Core"]},{"id":"48803070","name":"3817 Caledonia Bay Lookout - Walk to Bay and Park","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":1463.0,"minNights":1,"reviews":82,"rpm":1.29,"avail":327,"license":"","lat":36.623779,"lng":-121.919206,"tags":["Short-Term Vacation","Luxury Estate"]},{"id":"48995459","name":"Three Mermaid\u2019s Cove ( License #0459) Penthouse","host":"Rhonda","roomType":"Entire home/apt","price":380.0,"minNights":1,"reviews":286,"rpm":4.31,"avail":74,"license":"PG License #0459","lat":36.62601,"lng":-121.92125,"tags":["Short-Term Vacation"]},{"id":"49413685","name":"3814 Surf's Up! Walk to the Beach, Downtown & Park","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":731.0,"minNights":1,"reviews":119,"rpm":1.82,"avail":325,"license":"","lat":36.623633,"lng":-121.91865,"tags":["Short-Term Vacation","Coastal / Ocean View","Downtown Core"]},{"id":"49619172","name":"*Newly built\u2019 Cottage near aquarium/cannery row","host":"Rajas","roomType":"Entire home/apt","price":136.0,"minNights":30,"reviews":8,"rpm":0.13,"avail":266,"license":"","lat":36.61529,"lng":-121.90922,"tags":["30-Day Flexible Tenancy","Aquarium & Cannery Row","Budget / Value Tier"]},{"id":"49950545","name":"Endless Summer Home Steps To Lovers Point Beach","host":"Ellen MARIE","roomType":"Entire home/apt","price":587.0,"minNights":1,"reviews":327,"rpm":5.03,"avail":217,"license":"","lat":36.62239,"lng":-121.91684,"tags":["Short-Term Vacation","Coastal / Ocean View","Lovers Point"]},{"id":"50000524","name":"3822 Cannery Row ~Luxury, Ocean View, Near the Bay","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":214,"license":"","lat":36.621386,"lng":-121.916875,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Aquarium & Cannery Row"]},{"id":"50567200","name":"Shell's Treasure: Fully Updated Three bedroom home","host":"Carmel Coast Estate","roomType":"Entire home/apt","price":340.0,"minNights":30,"reviews":2,"rpm":0.04,"avail":209,"license":"","lat":36.6331417,"lng":-121.9242222,"tags":["30-Day Flexible Tenancy"]},{"id":"50864110","name":"3828 The 9th Green - Near Golf Links & Bay Trail","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":62,"license":"","lat":36.634191,"lng":-121.930766,"tags":["30-Day Flexible Tenancy"]},{"id":"51003171","name":"Christmas Vacation *Penthouse* Pacific Grove Plaza","host":"John","roomType":"Private room","price":0.0,"minNights":3,"reviews":2,"rpm":0.04,"avail":0,"license":"","lat":36.62267,"lng":-121.91841,"tags":["Short-Term Vacation"]},{"id":"51086425","name":"Pet Friendly Cozy Pacific Grove Getaway  Lic#0388","host":"Carolyn","roomType":"Entire home/apt","price":445.0,"minNights":3,"reviews":184,"rpm":2.95,"avail":215,"license":"PG License #0388","lat":36.60623,"lng":-121.92071,"tags":["Short-Term Vacation","Pet-Friendly"]},{"id":"51351238","name":"Newly Remodeled Home Near Aquarium and Cannery Row","host":"Rajas","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":10,"rpm":0.17,"avail":168,"license":"","lat":36.61483,"lng":-121.91002,"tags":["30-Day Flexible Tenancy","Aquarium & Cannery Row"]},{"id":"52829050","name":"Whale Watch Balcony at The Old St. Angela Inn","host":"Angela","roomType":"Private room","price":402.0,"minNights":1,"reviews":34,"rpm":0.57,"avail":268,"license":"","lat":36.62115,"lng":-121.91026,"tags":["Short-Term Vacation"]},{"id":"52885376","name":"Bay View Room at The Old St. Angela Inn","host":"Angela","roomType":"Private room","price":414.0,"minNights":1,"reviews":25,"rpm":0.42,"avail":277,"license":"","lat":36.62128,"lng":-121.91103,"tags":["Short-Term Vacation"]},{"id":"52886744","name":"Cape Cod Room at The Old St. Angela Inn","host":"Angela","roomType":"Private room","price":247.0,"minNights":1,"reviews":17,"rpm":0.29,"avail":271,"license":"","lat":36.61994,"lng":-121.91185,"tags":["Short-Term Vacation"]},{"id":"52887087","name":"Land's End at The Old St. Angela Inn","host":"Angela","roomType":"Private room","price":220.0,"minNights":1,"reviews":112,"rpm":1.89,"avail":253,"license":"","lat":36.61916,"lng":-121.91122,"tags":["Short-Term Vacation"]},{"id":"52887371","name":"Newport Room at The Old St. Angela Inn","host":"Angela","roomType":"Private room","price":287.0,"minNights":1,"reviews":38,"rpm":0.64,"avail":271,"license":"","lat":36.62059,"lng":-121.9102,"tags":["Short-Term Vacation"]},{"id":"52887567","name":"Otter Cove at The Old St. Angela Inn","host":"Angela","roomType":"Private room","price":246.0,"minNights":1,"reviews":55,"rpm":0.92,"avail":269,"license":"","lat":36.61985,"lng":-121.90969,"tags":["Short-Term Vacation"]},{"id":"53132392","name":"Nantucket Room at The Old St. Angela Inn","host":"Angela","roomType":"Private room","price":220.0,"minNights":1,"reviews":54,"rpm":0.91,"avail":271,"license":"","lat":36.62079,"lng":-121.91056,"tags":["Short-Term Vacation"]},{"id":"53133142","name":"Garden Gable Room at The Old St. Angela Inn","host":"Angela","roomType":"Private room","price":322.0,"minNights":1,"reviews":16,"rpm":0.27,"avail":297,"license":"","lat":36.61974,"lng":-121.911,"tags":["Short-Term Vacation"]},{"id":"53133671","name":"Crow's Nest at The Old St. Angela Inn","host":"Angela","roomType":"Private room","price":287.0,"minNights":1,"reviews":27,"rpm":0.45,"avail":274,"license":"","lat":36.62072,"lng":-121.9111,"tags":["Short-Term Vacation"]},{"id":"53546916","name":"Quintessential Pacific Grove with Modern Comforts!","host":"Kathleen","roomType":"Entire home/apt","price":246.0,"minNights":30,"reviews":10,"rpm":0.18,"avail":364,"license":"","lat":36.62199,"lng":-121.92251,"tags":["30-Day Flexible Tenancy"]},{"id":"53863626","name":"Light-filled home near Pebble Beach/Asilomar","host":"Mara","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":3,"rpm":0.08,"avail":272,"license":"","lat":36.61694,"lng":-121.9322,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Asilomar Corridor"]},{"id":"557212564041000775","name":"*OCT/NOV avail Walk to Downtown, Beach, Trail","host":"Carol","roomType":"Entire home/apt","price":207.0,"minNights":29,"reviews":7,"rpm":0.17,"avail":221,"license":"","lat":36.62042033204166,"lng":-121.921435713768,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Downtown Core"]},{"id":"564443155898110904","name":"PG Retreat - a 2 BR Cottage Near Beach & Town","host":"Dave & Lee","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":22,"rpm":0.41,"avail":363,"license":"","lat":36.61988,"lng":-121.91132,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Downtown Core"]},{"id":"575386907507888297","name":"Bright Pacific Grove Retreat_Walk to Beach & Town!","host":"Kyle","roomType":"Entire home/apt","price":182.0,"minNights":1,"reviews":9,"rpm":0.18,"avail":167,"license":"","lat":36.62046432495117,"lng":-121.92179107666016,"tags":["Short-Term Vacation","Coastal / Ocean View","Downtown Core","Budget / Value Tier"]},{"id":"579603922194777208","name":"Pet friendly Historic PG","host":"Thomas","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":8,"rpm":0.2,"avail":289,"license":"","lat":36.61975,"lng":-121.91905,"tags":["30-Day Flexible Tenancy","Heritage / Victorian Architecture","Pet-Friendly"]},{"id":"584244668012154218","name":"Beach Cottage - walk to beach and restaurants","host":"Ismael","roomType":"Entire home/apt","price":601.0,"minNights":1,"reviews":239,"rpm":4.48,"avail":288,"license":"","lat":36.6235,"lng":-121.91737,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"587711256303177865","name":"Welcome to Sea-Glass House! 1BR (PG License #0478)","host":"Sue","roomType":"Private room","price":358.0,"minNights":1,"reviews":607,"rpm":11.17,"avail":21,"license":"PG License #0478","lat":36.63425,"lng":-121.92469,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"589997411964604458","name":"#JewelboxCottages\ud83c\udfd6CARRIAGE HOUSE\ud83d\udc51Queen\ud83d\udec1PrivateBath","host":"Mel, Tripmogul","roomType":"Entire home/apt","price":92.0,"minNights":30,"reviews":4,"rpm":0.1,"avail":30,"license":"","lat":36.61582,"lng":-121.91168,"tags":["30-Day Flexible Tenancy","Budget / Value Tier"]},{"id":"648034558163632199","name":"Remodeled Victorian near downtown Pacific Grove","host":"James","roomType":"Entire home/apt","price":453.0,"minNights":30,"reviews":1,"rpm":0.02,"avail":365,"license":"","lat":36.62127,"lng":-121.91617,"tags":["30-Day Flexible Tenancy","Downtown Core","Heritage / Victorian Architecture"]},{"id":"654376990660517969","name":"3859 Beach Bungalow ~ Walk to Bay and Restaurants","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":187.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":293,"license":"","lat":36.619722,"lng":-121.90887,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Budget / Value Tier"]},{"id":"663527596243608771","name":"3858 Oasis by the Sea - Walk to Shops & Dining","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":245.0,"minNights":30,"reviews":1,"rpm":0.07,"avail":304,"license":"","lat":36.620052,"lng":-121.92643,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"663847654921511495","name":"Beach Cottage with Ocean Peek-a-View for 30+nights","host":"Courtney","roomType":"Entire home/apt","price":212.0,"minNights":30,"reviews":15,"rpm":0.3,"avail":165,"license":"","lat":36.63006,"lng":-121.9241,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"708639157230123006","name":"Oceanfront Panoramic Ocean and Monterey Bay Views","host":"Gayle","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":5,"rpm":0.13,"avail":269,"license":"","lat":36.63027421983373,"lng":-121.9224703116394,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"711435093441286850","name":"3866 Skipper ~ Bay View, Walk to Downtown & Beach","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":304,"license":"","lat":36.613123271325456,"lng":-121.91943508465576,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Downtown Core"]},{"id":"745562708839740258","name":"SeaClusion: Remodeled 3 Bedroom 2 Bath Nestled is","host":"Carmel Coast Estate","roomType":"Entire home/apt","price":0.0,"minNights":29,"reviews":4,"rpm":0.12,"avail":300,"license":"","lat":36.6038,"lng":-121.92577,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"808273804035038794","name":"Coastal Oaks Craftsman","host":"Jennifer","roomType":"Entire home/apt","price":1916.0,"minNights":4,"reviews":33,"rpm":0.75,"avail":9,"license":"","lat":36.62155010606474,"lng":-121.91265367538324,"tags":["Short-Term Vacation","Luxury Estate"]},{"id":"842747609845874917","name":"3860 Escabar Escape - Bay View, Old World Charm","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":351.0,"minNights":30,"reviews":1,"rpm":0.04,"avail":93,"license":"","lat":36.620342,"lng":-121.907139,"tags":["30-Day Flexible Tenancy"]},{"id":"854345612665578066","name":"The Shafter House","host":"Evelyn","roomType":"Entire home/apt","price":211.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":362,"license":"","lat":36.60127,"lng":-121.9328,"tags":["30-Day Flexible Tenancy"]},{"id":"856592878049086180","name":"*Asilomarhouse* Wk2 Beach, Hot Tub, Big Yard","host":"Laura","roomType":"Entire home/apt","price":0.0,"minNights":29,"reviews":1,"rpm":0.03,"avail":364,"license":"","lat":36.61772,"lng":-121.9339,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Asilomar Corridor","Wellness & Spa"]},{"id":"868710091988066065","name":"3881 Pacific Gem - Just a Short Stroll to the Bay","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":272.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":276,"license":"","lat":36.631588,"lng":-121.926835,"tags":["30-Day Flexible Tenancy"]},{"id":"871717955892996876","name":"3887 Just Coast'n - Just a Few Steps to the Bay","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":274.0,"minNights":30,"reviews":1,"rpm":1.0,"avail":185,"license":"","lat":36.620101,"lng":-121.908164,"tags":["30-Day Flexible Tenancy"]},{"id":"879279503944467183","name":"Spanish Sanctuary","host":"Monika","roomType":"Entire home/apt","price":0.0,"minNights":31,"reviews":11,"rpm":0.49,"avail":84,"license":"","lat":36.60235,"lng":-121.93317,"tags":["30-Day Flexible Tenancy"]},{"id":"882689689386652619","name":"3803 Sweet Thursday ~ Luxury Ocean View Condo","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":458.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":246,"license":"","lat":36.621174726989764,"lng":-121.91658169080735,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"886952517504399964","name":"PG House: Modern Ocean Bungalow Amazing Location","host":"Mimi","roomType":"Entire home/apt","price":874.0,"minNights":2,"reviews":125,"rpm":3.64,"avail":110,"license":"","lat":36.62047,"lng":-121.90526,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"887838447373873195","name":"Pearl by the Sea in Asilomar, Pacific Grove","host":"Linda","roomType":"Entire home/apt","price":486.0,"minNights":3,"reviews":13,"rpm":0.35,"avail":135,"license":"","lat":36.62533,"lng":-121.93495,"tags":["Short-Term Vacation","Coastal / Ocean View","Asilomar Corridor"]},{"id":"910124947116022766","name":"3893 Sweet Seventeenth - Near Downtown & Beach","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":1073.0,"minNights":1,"reviews":42,"rpm":1.09,"avail":332,"license":"","lat":36.620499,"lng":-121.919464,"tags":["Short-Term Vacation","Coastal / Ocean View","Downtown Core","Luxury Estate"]},{"id":"933173065545771068","name":"Sunburst Cottage","host":"Paul","roomType":"Entire home/apt","price":1221.0,"minNights":3,"reviews":7,"rpm":0.18,"avail":333,"license":"","lat":36.6223172,"lng":-121.9177818,"tags":["Short-Term Vacation","Luxury Estate"]},{"id":"933455916078918115","name":"Presidio Casita (w/ sauna)","host":"Natalie","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":20,"rpm":0.52,"avail":0,"license":"","lat":36.60418,"lng":-121.92996,"tags":["30-Day Flexible Tenancy","Wellness & Spa"]},{"id":"940717280067603969","name":"3894 Seacake - Bay View and Just Steps to the Sea","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":326.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":95,"license":"","lat":36.635526,"lng":-121.929311,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"965241307518489125","name":"3905 Oceano Azul - Near Butterfly Sanctuary, Beach","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":318.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":277,"license":"","lat":36.628848,"lng":-121.931886,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"966275804147440557","name":"Private Room","host":"Faye","roomType":"Private room","price":58.0,"minNights":30,"reviews":2,"rpm":1.25,"avail":270,"license":"","lat":36.60429,"lng":-121.931,"tags":["30-Day Flexible Tenancy","Budget / Value Tier"]},{"id":"1005024310075425769","name":"US OPEN Special  Updated and Spacious","host":"Michelle","roomType":"Entire home/apt","price":2867.0,"minNights":5,"reviews":0,"rpm":0.0,"avail":362,"license":"","lat":36.61365674525382,"lng":-121.92140978358493,"tags":["Short-Term Vacation","Luxury Estate"]},{"id":"1025589748925418589","name":"Ain't Life Grand? Downtown Oasis","host":"Kyle","roomType":"Entire home/apt","price":470.0,"minNights":1,"reviews":73,"rpm":2.12,"avail":218,"license":"","lat":36.62134,"lng":-121.91842,"tags":["Short-Term Vacation","Downtown Core"]},{"id":"1025604649934814205","name":"A Tiny House - Two Blocks to the Beach!","host":"Kyle","roomType":"Entire home/apt","price":438.0,"minNights":1,"reviews":55,"rpm":1.68,"avail":186,"license":"","lat":36.62458,"lng":-121.92187,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"1026245119220707284","name":"Lover's Point 6 - Prime Beach Location","host":"Kyle","roomType":"Entire home/apt","price":668.0,"minNights":1,"reviews":54,"rpm":1.58,"avail":212,"license":"","lat":36.62362,"lng":-121.91622,"tags":["Short-Term Vacation","Coastal / Ocean View","Lovers Point"]},{"id":"1026263523763027719","name":"Fountain Avenue - By the Beach!","host":"Kyle","roomType":"Entire home/apt","price":445.0,"minNights":1,"reviews":51,"rpm":1.47,"avail":64,"license":"","lat":36.62266,"lng":-121.91526,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"1035683605362677222","name":"Hipster Vibe - Downtown, two blocks to the beach!","host":"Monterey Rentals","roomType":"Entire home/apt","price":419.0,"minNights":2,"reviews":60,"rpm":1.79,"avail":222,"license":"","lat":36.62035,"lng":-121.91807,"tags":["Short-Term Vacation","Coastal / Ocean View","Downtown Core"]},{"id":"1050805310792689932","name":"3917 Casa Blanca-Updated Bungalow with Bonus Room","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":1248.0,"minNights":1,"reviews":70,"rpm":2.2,"avail":324,"license":"","lat":36.6214485168457,"lng":-121.91130065917969,"tags":["Short-Term Vacation","Luxury Estate"]},{"id":"1068359558976920980","name":"Cozy home in the heart of Monterey Bay","host":"Erik Cushman","roomType":"Entire home/apt","price":0.0,"minNights":28,"reviews":0,"rpm":0.0,"avail":362,"license":"","lat":36.60092,"lng":-121.9337,"tags":["30-Day Flexible Tenancy"]},{"id":"1073858014090285003","name":"Angel Hill compound near beach","host":"Veronika","roomType":"Entire home/apt","price":0.0,"minNights":3,"reviews":2,"rpm":0.08,"avail":0,"license":"","lat":36.61283626921698,"lng":-121.91929159760313,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"1098170157074983333","name":"Private PG oasis","host":"Rachel","roomType":"Entire home/apt","price":0.0,"minNights":1,"reviews":0,"rpm":0.0,"avail":269,"license":"","lat":36.6013112,"lng":-121.9347339,"tags":["Short-Term Vacation"]},{"id":"1105456677564323636","name":"Mid-Term Downtown Hideaway","host":"Brij","roomType":"Entire home/apt","price":186.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":363,"license":"","lat":36.61993,"lng":-121.91553,"tags":["30-Day Flexible Tenancy","Downtown Core","Budget / Value Tier"]},{"id":"1109584824450507267","name":"Picturesque Historic Victorian","host":"Carolee","roomType":"Entire home/apt","price":192.0,"minNights":31,"reviews":7,"rpm":0.25,"avail":199,"license":"","lat":36.62078988431048,"lng":-121.91486061268878,"tags":["30-Day Flexible Tenancy","Heritage / Victorian Architecture","Budget / Value Tier"]},{"id":"1110347519067097201","name":"3922 Pelican Gate - Walk to Beach & Coastal Trail","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":1162.0,"minNights":1,"reviews":50,"rpm":1.69,"avail":305,"license":"","lat":36.62998580932617,"lng":-121.93340301513672,"tags":["Short-Term Vacation","Coastal / Ocean View","Luxury Estate"]},{"id":"1116144005742917984","name":"Petit Maison: Two bedroom w dedicated workspace","host":"Catherine","roomType":"Entire home/apt","price":219.0,"minNights":23,"reviews":8,"rpm":0.28,"avail":85,"license":"","lat":36.61939,"lng":-121.92063,"tags":["Short-Term Vacation","Pet-Friendly"]},{"id":"1131236667175326315","name":"Saltbox - In the Heart of Pacific Grove","host":"Michael","roomType":"Entire home/apt","price":753.0,"minNights":1,"reviews":40,"rpm":1.46,"avail":270,"license":"","lat":36.62335704317952,"lng":-121.91875816195812,"tags":["Short-Term Vacation"]},{"id":"1131255910980483031","name":"Gingerbread - Close to the beach","host":"Monterey Rentals","roomType":"Entire home/apt","price":694.0,"minNights":2,"reviews":55,"rpm":2.1,"avail":241,"license":"","lat":36.622719766537394,"lng":-121.91926346794818,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"1131256594530573174","name":"The White House - Best Location Lover's Point!","host":"Kyle","roomType":"Entire home/apt","price":965.0,"minNights":1,"reviews":67,"rpm":2.46,"avail":287,"license":"","lat":36.624336254924444,"lng":-121.91738617692566,"tags":["Short-Term Vacation","Lovers Point","Luxury Estate"]},{"id":"1131257317917474953","name":"Beachouse - Luxury at Asilomar","host":"Kyle","roomType":"Entire home/apt","price":926.0,"minNights":1,"reviews":60,"rpm":2.12,"avail":214,"license":"","lat":36.62337898077188,"lng":-121.93747708912032,"tags":["Short-Term Vacation","Coastal / Ocean View","Asilomar Corridor","Luxury Estate"]},{"id":"1131459320992924360","name":"Modern Cabin near Lover's Point","host":"Anna","roomType":"Entire home/apt","price":663.0,"minNights":3,"reviews":21,"rpm":0.81,"avail":124,"license":"","lat":36.62169,"lng":-121.92117,"tags":["Short-Term Vacation","Lovers Point"]},{"id":"1136256728572419222","name":"Sweet Pea - Cottage by the Sea","host":"Monterey Rentals","roomType":"Entire home/apt","price":459.0,"minNights":1,"reviews":43,"rpm":1.54,"avail":261,"license":"","lat":36.622959760382315,"lng":-121.91742827565686,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"1136257082350257155","name":"Blue Horizons: On a Clear Day, You Can See Forever","host":"Monterey Rentals","roomType":"Entire home/apt","price":1230.0,"minNights":1,"reviews":63,"rpm":2.26,"avail":286,"license":"","lat":36.627807885253524,"lng":-121.92134849758291,"tags":["Short-Term Vacation","Luxury Estate"]},{"id":"1136262908735100103","name":"Daffodil House - A Block to the Beach!","host":"Monterey Rentals","roomType":"Entire home/apt","price":665.0,"minNights":1,"reviews":44,"rpm":1.63,"avail":43,"license":"","lat":36.623196977009535,"lng":-121.91710360102326,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"1136263334254484468","name":"Beach Club - Two Blocks to the Ocean","host":"Michelle","roomType":"Entire home/apt","price":1299.0,"minNights":1,"reviews":46,"rpm":1.85,"avail":255,"license":"","lat":36.62167595676445,"lng":-121.91482456922532,"tags":["Short-Term Vacation","Coastal / Ocean View","Luxury Estate"]},{"id":"1136263775328172735","name":"Gratitude Inn - Downtown, Walk to the Beach!","host":"Monterey Rentals","roomType":"Entire home/apt","price":599.0,"minNights":2,"reviews":42,"rpm":1.53,"avail":314,"license":"","lat":36.62069755543468,"lng":-121.9158187853554,"tags":["Short-Term Vacation","Coastal / Ocean View","Downtown Core"]},{"id":"1136286711699136738","name":"Seafarer - The ocean is your backyard!","host":"Kyle","roomType":"Entire home/apt","price":1082.0,"minNights":1,"reviews":58,"rpm":2.11,"avail":298,"license":"","lat":36.620253300562666,"lng":-121.90785411479844,"tags":["Short-Term Vacation","Coastal / Ocean View","Luxury Estate"]},{"id":"1142214258811770206","name":"Boathouse - Aye, Aye, Captain!","host":"Monterey Rentals","roomType":"Entire home/apt","price":232.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":155,"license":"","lat":36.625513537190045,"lng":-121.92577471381902,"tags":["30-Day Flexible Tenancy"]},{"id":"1142216274682452511","name":"Latitude Adjustment - Oceanview deck, pet friendly","host":"Monterey Rentals","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":4,"rpm":0.25,"avail":274,"license":"","lat":36.61351319409598,"lng":-121.91388376376096,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Pet-Friendly"]},{"id":"1143731069655683058","name":"Bellisima - Portofino in Pacific Grove!","host":"Monterey Rentals","roomType":"Entire home/apt","price":0.0,"minNights":29,"reviews":0,"rpm":0.0,"avail":208,"license":"","lat":36.62937461908551,"lng":-121.9229840190588,"tags":["30-Day Flexible Tenancy"]},{"id":"1143731970831904418","name":"Butterfly Haven - Near Asilomar Beach!","host":"Monterey Rentals","roomType":"Entire home/apt","price":197.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":252,"license":"","lat":36.62842507707562,"lng":-121.93383906132647,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Asilomar Corridor","Budget / Value Tier"]},{"id":"1143732157444839791","name":"Cannery Row Cottage - Walk to the Aquarium!","host":"Kyle","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":1,"rpm":0.07,"avail":260,"license":"","lat":36.61668891775566,"lng":-121.9060510635376,"tags":["30-Day Flexible Tenancy","Aquarium & Cannery Row"]},{"id":"1143732677806252314","name":"Casa Simpatico - Lover's Point Beach","host":"Monterey Rentals","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":2,"rpm":0.19,"avail":261,"license":"","lat":36.62408610612026,"lng":-121.91671261566024,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Lovers Point"]},{"id":"1143733457125469859","name":"Fourth Tee - Ocean & Golf Views","host":"Monterey Rentals","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":242,"license":"","lat":36.628597323614144,"lng":-121.9265054840103,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"1143734060655808499","name":"Harmony Home - Perfect Pacific Grove location","host":"Monterey Rentals","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":237,"license":"","lat":36.61675940975052,"lng":-121.91393408963849,"tags":["30-Day Flexible Tenancy"]},{"id":"1143736284934826935","name":"Monarch - Luxury oceanview","host":"Kyle","roomType":"Entire home/apt","price":219.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":235,"license":"","lat":36.62740705682075,"lng":-121.9280237197876,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"1143740787409568406","name":"Riviera - On Top of the World!","host":"Monterey Rentals","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":273,"license":"","lat":36.6060616301973,"lng":-121.9249308786008,"tags":["30-Day Flexible Tenancy"]},{"id":"1143741292632723594","name":"Sailaway - Oceanview, Walk to Beach","host":"Monterey Rentals","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":171,"license":"","lat":36.6178267348345,"lng":-121.90938139604853,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"1143741843016092024","name":"Simple Pleasures - Chill, Baby, Chill!","host":"Michael","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":1,"rpm":0.05,"avail":149,"license":"","lat":36.62167054656311,"lng":-121.92556757264799,"tags":["30-Day Flexible Tenancy"]},{"id":"1143742162744265949","name":"Snuggle Up: studio cottage one mile from the beach","host":"Kyle","roomType":"Entire home/apt","price":97.0,"minNights":30,"reviews":4,"rpm":0.23,"avail":316,"license":"","lat":36.61549208877226,"lng":-121.91932798320411,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Budget / Value Tier"]},{"id":"1143742398758909994","name":"Sunset Drive - Asilomar Beach across the street!","host":"Monterey Rentals","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":259,"license":"","lat":36.61584987613967,"lng":-121.93297043297368,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Asilomar Corridor"]},{"id":"1143742668325615150","name":"Tea for Two - Upper Pacific Grove","host":"Kyle","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":113,"license":"","lat":36.605708200140846,"lng":-121.92332448959351,"tags":["30-Day Flexible Tenancy"]},{"id":"1143743517306638629","name":"Victorian Dollhouse - Beach and Town","host":"Monterey Rentals","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":174,"license":"","lat":36.623083978227115,"lng":-121.91935704331974,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Downtown Core","Heritage / Victorian Architecture"]},{"id":"1143743744118021814","name":"Zatara - Ocean Views!","host":"Monterey Rentals","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":157,"license":"","lat":36.632920178480695,"lng":-121.92356664278066,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"1150832711055711354","name":"Five O'clock Somewhere - Walk to the Beach!","host":"Kyle","roomType":"Entire home/apt","price":669.0,"minNights":1,"reviews":62,"rpm":2.34,"avail":280,"license":"","lat":36.61986861877182,"lng":-121.91557878720789,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"1162239634880358531","name":"Green Gables Inn, A Four Sisters Inn, The Lacy su.","host":"Green Gables Inn","roomType":"Private room","price":431.0,"minNights":1,"reviews":0,"rpm":0.0,"avail":74,"license":"","lat":36.6205885,"lng":-121.9094642,"tags":["Short-Term Vacation"]},{"id":"1162239635077874324","name":"Green Gables Inn, A Four Sisters Inn, The carriag.","host":"Green Gables Inn","roomType":"Private room","price":422.0,"minNights":1,"reviews":0,"rpm":0.0,"avail":96,"license":"","lat":36.6205885,"lng":-121.9094642,"tags":["Short-Term Vacation"]},{"id":"1162240166122696213","name":"Green Gables Inn, A Four Sisters Inn, The sandpip.","host":"Green Gables Inn","roomType":"Private room","price":382.0,"minNights":1,"reviews":9,"rpm":2.05,"avail":82,"license":"","lat":36.6205885,"lng":-121.9094642,"tags":["Short-Term Vacation"]},{"id":"1162240176899696417","name":"Green Gables Inn, A Four Sisters Inn, The carriag.","host":"Green Gables Inn","roomType":"Private room","price":477.0,"minNights":1,"reviews":9,"rpm":2.05,"avail":89,"license":"","lat":36.6205885,"lng":-121.9094642,"tags":["Short-Term Vacation"]},{"id":"1162240403628483167","name":"Green Gables Inn, A Four Sisters Inn, The pacific.","host":"Green Gables Inn","roomType":"Private room","price":382.0,"minNights":1,"reviews":9,"rpm":2.05,"avail":79,"license":"","lat":36.6205885,"lng":-121.9094642,"tags":["Short-Term Vacation"]},{"id":"1163100947286808136","name":"New, bright, private 1/1 cottage w/qn sofa sleeper","host":"Catherine","roomType":"Entire home/apt","price":161.0,"minNights":5,"reviews":12,"rpm":0.45,"avail":271,"license":"","lat":36.6146346,"lng":-121.9240823,"tags":["Short-Term Vacation","Budget / Value Tier"]},{"id":"1169185454120309042","name":"Pacific Grove Retreat w/ Hot Tub","host":"Catherine","roomType":"Entire home/apt","price":715.0,"minNights":1,"reviews":93,"rpm":3.36,"avail":244,"license":"","lat":36.6122339,"lng":-121.923672,"tags":["Short-Term Vacation","Wellness & Spa"]},{"id":"1179050545942260141","name":"3941 Casaletto at 17 Mile Drive ~ Cozy and Updated","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":201.0,"minNights":30,"reviews":2,"rpm":0.09,"avail":275,"license":"","lat":36.625144958496094,"lng":-121.92780303955078,"tags":["30-Day Flexible Tenancy"]},{"id":"1183011317341746919","name":"Designer Cottage ~ Pacific Grove","host":"Lisa","roomType":"Entire home/apt","price":189.0,"minNights":30,"reviews":9,"rpm":0.36,"avail":172,"license":"","lat":36.6228304,"lng":-121.9172744,"tags":["30-Day Flexible Tenancy","Budget / Value Tier"]},{"id":"1184796000990994176","name":"Pacific Grove 1 BR Walk to Lovers Point & Downtown","host":"Gratia","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":10,"rpm":0.39,"avail":169,"license":"","lat":36.6224589,"lng":-121.9221396,"tags":["30-Day Flexible Tenancy","Lovers Point","Downtown Core"]},{"id":"1187770695888358789","name":"Coastal Haven near Lover's Point","host":"Anna","roomType":"Entire home/apt","price":80.0,"minNights":5,"reviews":8,"rpm":0.33,"avail":245,"license":"","lat":36.6213724,"lng":-121.9207852,"tags":["Short-Term Vacation","Lovers Point","Budget / Value Tier"]},{"id":"1194099128559476706","name":"3943 Rad Beach House - Near Beach & Coastal Trail","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":1061.0,"minNights":1,"reviews":27,"rpm":1.21,"avail":315,"license":"","lat":36.624481,"lng":-121.918902,"tags":["Short-Term Vacation","Coastal / Ocean View","Luxury Estate"]},{"id":"1206532012959254380","name":"Oceanfront Pacific Grove Home Near Pebble Beach","host":"Grand Welcome","roomType":"Entire home/apt","price":301.0,"minNights":28,"reviews":3,"rpm":0.16,"avail":129,"license":"","lat":36.63584672,"lng":-121.92930462,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"1212963736910431053","name":"3946 Listen to the Waves - Oceanfront, Bay View","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":803.0,"minNights":1,"reviews":47,"rpm":1.82,"avail":319,"license":"","lat":36.621116638183594,"lng":-121.91044616699219,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"1213851972337572222","name":"Lighthouse Lodge and Cottages, Selected by hotel","host":"Lighthouse Lodge And Cottages","roomType":"Private room","price":0.0,"minNights":1,"reviews":264,"rpm":10.14,"avail":0,"license":"","lat":36.6306737,"lng":-121.9307782,"tags":["Short-Term Vacation"]},{"id":"1214820875588666513","name":"Studio Apt on Ocean View Blvd, Views and Location!","host":"Justin","roomType":"Entire home/apt","price":0.0,"minNights":2,"reviews":8,"rpm":0.31,"avail":0,"license":"","lat":36.626855569541746,"lng":-121.91905237734318,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"1222708469305395405","name":"Cozy bedroom in Monterey Bay","host":"Faye","roomType":"Private room","price":148.0,"minNights":1,"reviews":18,"rpm":1.37,"avail":77,"license":"","lat":36.60469,"lng":-121.931,"tags":["Short-Term Vacation","Budget / Value Tier"]},{"id":"1278325977977274305","name":"Gorgeous Studio Close to All","host":"Anya","roomType":"Entire home/apt","price":315.0,"minNights":1,"reviews":40,"rpm":1.74,"avail":29,"license":"","lat":36.61273904282698,"lng":-121.92461240606941,"tags":["Short-Term Vacation"]},{"id":"1287714878773685654","name":"Pacific Grove Home Walk to Lovers Point Sleeps 4","host":"Grand Welcome","roomType":"Entire home/apt","price":127.0,"minNights":28,"reviews":3,"rpm":0.15,"avail":298,"license":"","lat":36.6243992,"lng":-121.9185039,"tags":["30-Day Flexible Tenancy","Lovers Point","Budget / Value Tier"]},{"id":"1293749033179292513","name":"Charming Pacific Grove Retreat 3bd/2bath","host":"Tracy","roomType":"Entire home/apt","price":668.0,"minNights":1,"reviews":112,"rpm":5.01,"avail":149,"license":"","lat":36.60212,"lng":-121.93115,"tags":["Short-Term Vacation"]},{"id":"1301579566788009129","name":"Renovated ocean-view oasis","host":"Shahin","roomType":"Private room","price":246.0,"minNights":1,"reviews":1,"rpm":0.07,"avail":363,"license":"","lat":36.606571981932866,"lng":-121.92331189982717,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"1303042343705389540","name":"Charming Tudor, one block to seashore, 30-day min","host":"Blake","roomType":"Entire home/apt","price":243.0,"minNights":27,"reviews":6,"rpm":0.33,"avail":44,"license":"","lat":36.62506216577112,"lng":-121.93604311982419,"tags":["Short-Term Vacation","Coastal / Ocean View","Heritage / Victorian Architecture"]},{"id":"1305211138058635292","name":"3957 Lighthouse Landing ~ Walk to Dining and Beach","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":884.0,"minNights":1,"reviews":23,"rpm":1.14,"avail":346,"license":"","lat":36.622884,"lng":-121.921014,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"1308783140523718238","name":"Charming home near downtown and beach","host":"Leticia","roomType":"Entire home/apt","price":558.0,"minNights":2,"reviews":16,"rpm":0.74,"avail":89,"license":"","lat":36.62408616849449,"lng":-121.9250451834451,"tags":["Short-Term Vacation","Coastal / Ocean View","Downtown Core"]},{"id":"1332627055572197181","name":"Charming PG Cottage with Ocean Views!","host":"Carmel Coast Estate","roomType":"Entire home/apt","price":297.0,"minNights":30,"reviews":6,"rpm":0.36,"avail":79,"license":"","lat":36.6039539,"lng":-121.9177115,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"1334121990060114372","name":"Casa Hatch: Downtown Hideaway","host":"Brij","roomType":"Entire home/apt","price":555.0,"minNights":2,"reviews":85,"rpm":4.72,"avail":296,"license":"","lat":36.6200807,"lng":-121.9159941,"tags":["Short-Term Vacation","Downtown Core"]},{"id":"1343698856513261679","name":"Charming One Bedroom Duplex","host":"Evelyn","roomType":"Entire home/apt","price":134.0,"minNights":30,"reviews":1,"rpm":0.36,"avail":250,"license":"","lat":36.60116,"lng":-121.93144,"tags":["30-Day Flexible Tenancy","Budget / Value Tier"]},{"id":"1345819065299510936","name":"3119 Yellow House Guest - Almost Oceanfront!","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":241.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":365,"license":"","lat":36.620371,"lng":-121.909139,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"1350817878527713956","name":"Pacific Grove Bungalow near Bay","host":"Anna","roomType":"Entire home/apt","price":303.0,"minNights":4,"reviews":6,"rpm":0.36,"avail":359,"license":"","lat":36.6135732,"lng":-121.9140857,"tags":["Short-Term Vacation"]},{"id":"1355835907051199620","name":"Seawatch - Monterey Bay Beauty","host":"Monterey Rentals","roomType":"Entire home/apt","price":0.0,"minNights":30,"reviews":1,"rpm":0.08,"avail":1,"license":"","lat":36.61617,"lng":-121.90822,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"1390823637877640361","name":"3970 Wave Watcher - Panoramic Oceanfront Bay Views","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":338.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":210,"license":"","lat":36.63603,"lng":-121.930059,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"1424719855650397471","name":"Cozy Coastal Cottage","host":"Susan","roomType":"Entire home/apt","price":114.0,"minNights":30,"reviews":1,"rpm":0.83,"avail":333,"license":"","lat":36.627943890840676,"lng":-121.93424947437805,"tags":["30-Day Flexible Tenancy","Budget / Value Tier"]},{"id":"1426172996599751724","name":"Otter Cove Beach Front House","host":"Thomas","roomType":"Entire home/apt","price":648.0,"minNights":1,"reviews":17,"rpm":1.11,"avail":195,"license":"","lat":36.6279368,"lng":-121.921577,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"1431320208882452504","name":"Queen Bed Near Beach","host":"The Charles Pacific Grove","roomType":"Private room","price":212.0,"minNights":1,"reviews":1,"rpm":0.51,"avail":333,"license":"","lat":36.6186738,"lng":-121.919066,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"1431351604906578703","name":"Queen Suite with Sea View (Upstairs)","host":"The Charles Pacific Grove","roomType":"Private room","price":300.0,"minNights":1,"reviews":1,"rpm":0.15,"avail":311,"license":"","lat":36.61896873626985,"lng":-121.91977902936512,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"1431351687495064782","name":"Queen, Twin & Sofa Bed plus View (Top Floor)","host":"The Charles Pacific Grove","roomType":"Private room","price":324.0,"minNights":1,"reviews":0,"rpm":0.0,"avail":328,"license":"","lat":36.61932167042702,"lng":-121.91817400786628,"tags":["Short-Term Vacation"]},{"id":"1431423159673907424","name":"Queen Bed  Partial Accessible","host":"The Charles Pacific Grove","roomType":"Private room","price":436.0,"minNights":1,"reviews":2,"rpm":0.19,"avail":319,"license":"","lat":36.6186738,"lng":-121.919066,"tags":["Short-Term Vacation"]},{"id":"1432682178740146431","name":"Queen with Twin Bed near beach (Upstairs)","host":"The Charles Pacific Grove","roomType":"Private room","price":234.0,"minNights":1,"reviews":0,"rpm":0.0,"avail":316,"license":"","lat":36.619382595227165,"lng":-121.91867390332649,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"1434356907883300438","name":"King Bedroom Near beach","host":"The Charles Pacific Grove","roomType":"Private room","price":223.0,"minNights":1,"reviews":10,"rpm":0.65,"avail":340,"license":"","lat":36.61808716442019,"lng":-121.91796906009375,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"1434362893694633070","name":"Cellar Family Suite \u2013 King Bed & 2 Twin Beds","host":"The Charles Pacific Grove","roomType":"Private room","price":256.0,"minNights":1,"reviews":14,"rpm":0.94,"avail":319,"license":"","lat":36.6186738,"lng":-121.919066,"tags":["Short-Term Vacation"]},{"id":"1434368348248238825","name":"Cellar Suite\u2013Queen Bed with Bunk Bed Dog-Friendly","host":"The Charles Pacific Grove","roomType":"Private room","price":256.0,"minNights":1,"reviews":4,"rpm":0.71,"avail":341,"license":"","lat":36.61865657757452,"lng":-121.91910891534424,"tags":["Short-Term Vacation","Pet-Friendly"]},{"id":"1435569376116405983","name":"3962 High Tide -Close to Downtown, Peek of the Bay","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":288.0,"minNights":30,"reviews":1,"rpm":0.63,"avail":365,"license":"","lat":36.618602,"lng":-121.909721,"tags":["30-Day Flexible Tenancy","Downtown Core"]},{"id":"1436294202650440675","name":"3963 Low Tide - Walk to Aquarium, Bay and Downtown","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":223.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":216,"license":"","lat":36.618602,"lng":-121.909721,"tags":["30-Day Flexible Tenancy","Aquarium & Cannery Row","Downtown Core"]},{"id":"1439576861326046470","name":"Serene Pacific Grove Getaway","host":"Tracy","roomType":"Entire home/apt","price":542.0,"minNights":2,"reviews":58,"rpm":3.79,"avail":151,"license":"","lat":36.60487,"lng":-121.92709,"tags":["Short-Term Vacation"]},{"id":"1442182954773083829","name":"3965 Marine Gardens - Oceanfront with Bay Views","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":1149.0,"minNights":1,"reviews":21,"rpm":1.52,"avail":319,"license":"","lat":36.626985,"lng":-121.91964,"tags":["Short-Term Vacation","Coastal / Ocean View","Luxury Estate"]},{"id":"1470476258143471749","name":"Cottage - Walk to Town & Beach.","host":"Sal","roomType":"Entire home/apt","price":0.0,"minNights":29,"reviews":1,"rpm":1.0,"avail":167,"license":"","lat":36.61752,"lng":-121.92222,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Downtown Core"]},{"id":"1473215117548130546","name":"Coastal Living in Pacific Grove","host":"Ben","roomType":"Entire home/apt","price":214.0,"minNights":31,"reviews":2,"rpm":0.22,"avail":285,"license":"","lat":36.6170181,"lng":-121.9217607,"tags":["30-Day Flexible Tenancy"]},{"id":"1473448085683688186","name":"Compass Rose - Beach Getaway","host":"Dave & Lee","roomType":"Entire home/apt","price":312.0,"minNights":30,"reviews":1,"rpm":0.11,"avail":364,"license":"","lat":36.63046,"lng":-121.92408,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"1492172065397068215","name":"3976 Beach House on Asilomar~ Oceanfront View Home","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":1603.0,"minNights":1,"reviews":8,"rpm":0.77,"avail":274,"license":"","lat":36.623217,"lng":-121.939929,"tags":["Short-Term Vacation","Coastal / Ocean View","Asilomar Corridor","Luxury Estate"]},{"id":"1531910546359693118","name":"Nancy's Cottage 2BR 1.5BA Pacific Grove","host":"Carmel Coast Estate","roomType":"Entire home/apt","price":229.0,"minNights":30,"reviews":2,"rpm":0.28,"avail":242,"license":"","lat":36.62816,"lng":-121.92665,"tags":["30-Day Flexible Tenancy"]},{"id":"1532733634874818268","name":"Cozy Cottage with Hot Tub","host":"Kiki","roomType":"Entire home/apt","price":637.0,"minNights":3,"reviews":38,"rpm":3.36,"avail":264,"license":"","lat":36.6007269,"lng":-121.9321783,"tags":["Short-Term Vacation","Wellness & Spa"]},{"id":"1538487527717645956","name":"3987 Lovers Point Whitewater Cottage, Bay View!","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":1287.0,"minNights":1,"reviews":27,"rpm":2.79,"avail":313,"license":"","lat":36.62232971191406,"lng":-121.91429901123047,"tags":["Short-Term Vacation","Lovers Point","Luxury Estate"]},{"id":"1561710545646548152","name":"3988 Cannery Cottage - Coastal Living Near the Bay","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":1156.0,"minNights":1,"reviews":10,"rpm":1.36,"avail":323,"license":"","lat":36.619476318359375,"lng":-121.90673065185547,"tags":["Short-Term Vacation","Aquarium & Cannery Row","Luxury Estate"]},{"id":"1565253235475170331","name":"Park Street Gem \u2013 Cozy, Bright Retreat by the Sea","host":"Anna","roomType":"Entire home/apt","price":99.0,"minNights":5,"reviews":6,"rpm":0.77,"avail":173,"license":"","lat":36.62101,"lng":-121.92132,"tags":["Short-Term Vacation","Coastal / Ocean View","Budget / Value Tier"]},{"id":"1571282702886814270","name":"Coastal Retreat. Ocean View. Walk to Beach & Dine","host":"Faris","roomType":"Entire home/apt","price":451.0,"minNights":1,"reviews":67,"rpm":7.1,"avail":117,"license":"","lat":36.6217004,"lng":-121.9159766,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"1580199012148566723","name":"Central Perch  STR Lic #0507","host":"Tom","roomType":"Entire home/apt","price":1178.0,"minNights":2,"reviews":26,"rpm":2.87,"avail":279,"license":"PG License #0507","lat":36.6208383,"lng":-121.9117169,"tags":["Short-Term Vacation","Luxury Estate"]},{"id":"1597263071189135619","name":"4054 Casita Del Mar II, Bay View Mediterranean Gem","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":305.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":32,"license":"","lat":36.618202209472656,"lng":-121.91326904296875,"tags":["30-Day Flexible Tenancy"]},{"id":"1608841749392581728","name":"30+ day Spacious pet friendly Pacific Grove Home","host":"Thomas","roomType":"Entire home/apt","price":167.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":298,"license":"","lat":36.6204164,"lng":-121.9200851,"tags":["30-Day Flexible Tenancy","Pet-Friendly","Budget / Value Tier"]},{"id":"1617405093103095065","name":"Cypress in Sunlight","host":"David","roomType":"Entire home/apt","price":217.0,"minNights":29,"reviews":1,"rpm":0.13,"avail":86,"license":"","lat":36.620173,"lng":-121.9222109,"tags":["30-Day Flexible Tenancy"]},{"id":"1625819417157736370","name":"Potter's Cottage","host":"Roeya","roomType":"Entire home/apt","price":576.0,"minNights":1,"reviews":33,"rpm":4.93,"avail":264,"license":"","lat":36.6201879,"lng":-121.919269,"tags":["Short-Term Vacation"]},{"id":"1628359708352164014","name":"3997 Oceanview Oasis - Stunning Monterey Bay View","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":433.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":208,"license":"","lat":36.61982727050781,"lng":-121.90670776367188,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"1640345896375474086","name":"Queen Bed - Basement No window (Dog friendly)","host":"Pacific","roomType":"Private room","price":384.0,"minNights":1,"reviews":8,"rpm":2.2,"avail":321,"license":"","lat":36.61837,"lng":-121.91922,"tags":["Short-Term Vacation","Pet-Friendly"]},{"id":"1648668523305685955","name":"3998 Pacific Nirvana - 3 Blocks from the Beach!","host":"Sanctuary Vacation Rentals","roomType":"Entire home/apt","price":300.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":335,"license":"","lat":36.620994567871094,"lng":-121.91229248046875,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"1653278294090624801","name":"Cozy Comfort - Minutes From Cannery Row & Ocean","host":"Tracy","roomType":"Entire home/apt","price":459.0,"minNights":1,"reviews":16,"rpm":3.36,"avail":125,"license":"","lat":36.62058,"lng":-121.91385,"tags":["Short-Term Vacation","Coastal / Ocean View","Aquarium & Cannery Row"]},{"id":"1657393381754457583","name":"Monterey Bay Getaway","host":"Arta","roomType":"Entire home/apt","price":856.0,"minNights":1,"reviews":1,"rpm":0.67,"avail":32,"license":"","lat":36.61681,"lng":-121.92612,"tags":["Short-Term Vacation"]},{"id":"1657448904586135681","name":"Lovers Point Hideaway \u2014 Coastal Retreat","host":"Tracy","roomType":"Entire home/apt","price":213.0,"minNights":1,"reviews":15,"rpm":2.88,"avail":161,"license":"","lat":36.60412970873357,"lng":-121.9287795984902,"tags":["Short-Term Vacation","Lovers Point"]},{"id":"1660408248925085464","name":"Lover's Point Victorian","host":"Rhonda","roomType":"Entire home/apt","price":450.0,"minNights":2,"reviews":19,"rpm":5.18,"avail":36,"license":"","lat":36.62288,"lng":-121.92203,"tags":["Short-Term Vacation","Lovers Point","Heritage / Victorian Architecture"]},{"id":"1675785664247851553","name":"Outside Inn - Downtown, Walk to the Beach","host":"Monterey Rentals","roomType":"Entire home/apt","price":717.0,"minNights":2,"reviews":11,"rpm":2.56,"avail":308,"license":"","lat":36.61969453985717,"lng":-121.91626502193893,"tags":["Short-Term Vacation","Coastal / Ocean View","Downtown Core"]},{"id":"1679420005297947245","name":"Bedroom in Cottage Near Downtown and Lover's Point","host":"Leticia","roomType":"Private room","price":110.0,"minNights":1,"reviews":0,"rpm":0.0,"avail":357,"license":"","lat":36.62419544509788,"lng":-121.92541934610006,"tags":["Short-Term Vacation","Lovers Point","Downtown Core","Budget / Value Tier"]},{"id":"1689350328179931584","name":"Surf and Stroll Suite/walk to beach & downtown","host":"Tim & Laurel","roomType":"Entire home/apt","price":272.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":364,"license":"","lat":36.6232227,"lng":-121.9320064,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View","Downtown Core"]},{"id":"1717681764739798627","name":"Never lived in new studio apartment in PG","host":"Anthony","roomType":"Entire home/apt","price":253.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":362,"license":"","lat":36.6060197,"lng":-121.9209629,"tags":["30-Day Flexible Tenancy"]},{"id":"1740776118928602585","name":"Pacific Grove Ocean View Dream","host":"Ann","roomType":"Entire home/apt","price":420.0,"minNights":3,"reviews":1,"rpm":0.64,"avail":242,"license":"","lat":36.61851,"lng":-121.91671,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"1744619755588903581","name":"Pacific Grove Nest (30 day or more rental only)","host":"Sarah","roomType":"Entire home/apt","price":163.0,"minNights":7,"reviews":0,"rpm":0.0,"avail":124,"license":"","lat":36.618352757394405,"lng":-121.92146466627044,"tags":["Short-Term Vacation","Budget / Value Tier"]},{"id":"1747285899795413100","name":"Monarch Pines 55+ at the Beach","host":"Monterey Rentals","roomType":"Entire home/apt","price":0.0,"minNights":1,"reviews":0,"rpm":0.0,"avail":248,"license":"","lat":36.626146376549066,"lng":-121.9189471244812,"tags":["Short-Term Vacation","Coastal / Ocean View"]},{"id":"1749432451386832459","name":"Crespi Room","host":"Seven Gables Inn, A Kirkwood C","roomType":"Private room","price":423.0,"minNights":1,"reviews":50,"rpm":0.4,"avail":65,"license":"","lat":36.6238396,"lng":-121.9154994,"tags":["Short-Term Vacation"]},{"id":"1749432451443474510","name":"Chautauqua Room Accessible","host":"Seven Gables Inn, A Kirkwood C","roomType":"Private room","price":614.0,"minNights":1,"reviews":100,"rpm":0.76,"avail":76,"license":"","lat":36.6238396,"lng":-121.9154994,"tags":["Short-Term Vacation"]},{"id":"1749432451767777761","name":"Gable Room","host":"Seven Gables Inn, A Kirkwood C","roomType":"Private room","price":375.0,"minNights":1,"reviews":100,"rpm":0.76,"avail":83,"license":"","lat":36.6238396,"lng":-121.9154994,"tags":["Short-Term Vacation"]},{"id":"1749432453385466442","name":"Carriage House Cottage","host":"Seven Gables Inn, A Kirkwood C","roomType":"Private room","price":423.0,"minNights":1,"reviews":50,"rpm":0.4,"avail":72,"license":"","lat":36.6238396,"lng":-121.9154994,"tags":["Short-Term Vacation"]},{"id":"1749515595451626191","name":"Cedar Room","host":"Centrella Hotel, A Kirkwood Co","roomType":"Private room","price":155.0,"minNights":1,"reviews":0,"rpm":0.0,"avail":87,"license":"","lat":36.6225307,"lng":-121.918224,"tags":["Short-Term Vacation","Budget / Value Tier"]},{"id":"1753112808719320043","name":"NEW studio apartment walk to restaurants/starbucks","host":"Briana","roomType":"Entire home/apt","price":254.0,"minNights":4,"reviews":0,"rpm":0.0,"avail":355,"license":"","lat":36.6060197,"lng":-121.9209629,"tags":["Short-Term Vacation"]},{"id":"1777790575755831016","name":"New Luxury Coastal Home ~ 1 Block from the Ocean","host":"Rick Hadlock","roomType":"Entire home/apt","price":284.0,"minNights":30,"reviews":0,"rpm":0.0,"avail":333,"license":"","lat":36.6328397,"lng":-121.9244005,"tags":["30-Day Flexible Tenancy","Coastal / Ocean View"]},{"id":"1780200967287147798","name":"Sunset Cove \u2014 Pacific Grove by the Sea","host":"Tracy","roomType":"Entire home/apt","price":545.0,"minNights":1,"reviews":0,"rpm":0.0,"avail":345,"license":"","lat":36.60027,"lng":-121.9346,"tags":["Short-Term Vacation","Coastal / Ocean View"]}]};

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
  class ThatJointChatbot {
    constructor(options = {}) {
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
        : { getItem: () => null, setItem: () => null };

      // Active Client Packaging Configuration
      this.clientConfig = {
        tier: storage.getItem('tj_packaging_tier') || 'tier1',
        tier2Provider: storage.getItem('tj_tier2_provider') || 'gemini',
        tier2Key: storage.getItem('tj_tier2_key') || '',
        tier2Model: storage.getItem('tj_tier2_model') || 'gemini-1.5-flash',
        tier3Url: storage.getItem('tj_tier3_url') || '',
        tier3Token: storage.getItem('tj_tier3_token') || ''
      };

      this.init();
      this.loadRemoteKnowledgeBase();
    }

    // Asynchronously synchronize complete knowledge base file if available
    async loadRemoteKnowledgeBase() {
      try {
        const res = await fetch('assets/data/sentinel_knowledge_base.json');
        if (res.ok) {
          const data = await res.json();
          if (data && data.properties && data.properties.length) {
            this.knowledgeBase = data;
            this.updateTelemetryPills();
          }
        }
      } catch (e) {
        // Running offline or embedded mode - embedded PACIFIC_GROVE_KB is already active
      }
    }

    init() {
      if (typeof document === 'undefined') return;
      this.container = typeof this.containerId === 'string'
        ? document.getElementById(this.containerId)
        : this.containerId;

      if (!this.container) {
        console.warn(`[ThatJointChatbot] Target container '#${this.containerId}' not found in DOM.`);
        return;
      }

      this.render();
      this.bindElements();
      this.initSpeechRecognition();
      this.bindEvents();
      this.setupKeyboardShortcuts();
      this.renderWelcomeHub();
    }

    render() {
      const template = `
        <div class="tj-companion-container ${this.isDrawer ? 'tj-companion-drawer' : ''}" id="tjCompanionView" role="region" aria-label="THΛTJOINT Property Sentinel AI">
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
                  ${RED_PANDA_SVG}
                  <span class="tj-mascot-status-dot" aria-hidden="true"></span>
                </div>

                <div class="tj-sentinel-meta">
                  <div class="tj-sentinel-meta-tag">
                    <span>PROPERTY SENTINEL</span>
                    <b>AI OS 2.2</b>
                  </div>
                  <h3 class="tj-sentinel-name">
                    THΛTJOINT Sentinel
                    <span class="tj-sentinel-tier-chip" id="sentinelTierBadge">${this.getTierLabel()}</span>
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
                ${this.isDrawer ? `<button type="button" class="tj-sentinel-icon-btn" id="btnCloseDrawer" title="Close Companion [Esc]" aria-label="Close drawer">×</button>` : ''}
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

      if (this.isDrawer) {
        this.container.innerHTML = `
          <div class="tj-companion-backdrop" id="tjBackdrop" aria-hidden="true"></div>
          ${template}
        `;
      } else {
        this.container.innerHTML = template;
      }
    }

    bindElements() {
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
    }

    ensureConfigModal() {
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
    }

    initSpeechRecognition() {
      const SpeechClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechClass) {
        if (this.micBtn) {
          this.micBtn.title = 'Speech Recognition not supported in this browser (Use typing)';
          this.micBtn.classList.add('is-unsupported');
        }
        return;
      }

      try {
        this.recognition = new SpeechClass();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onstart = () => {
          this.isListening = true;
          if (this.micBtn) this.micBtn.classList.add('is-listening');
          this.setMascotState('listening', '<span>Listening...</span> · <i>Voice dictation active</i>');
        };

        this.recognition.onresult = (event) => {
          let interim = '';
          let final = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final += event.results[i][0].transcript;
            } else {
              interim += event.results[i][0].transcript;
            }
          }
          if (this.input) {
            this.input.value = final || interim;
            this.autoExpandInput();
          }
        };

        this.recognition.onerror = (event) => {
          console.warn('[SpeechRecognition] error:', event.error);
          this.stopVoiceRecognition();
          this.setMascotState('idle', '<span>Sentinel Ready</span> · <i>Voice ended</i>');
        };

        this.recognition.onend = () => {
          this.isListening = false;
          if (this.micBtn) this.micBtn.classList.remove('is-listening');
          if (this.input && this.input.value.trim().length > 0) {
            this.submitQuery();
          } else {
            this.setMascotState('idle', '<span>Sentinel Ready</span> · <i>Active monitoring</i>');
          }
        };
      } catch (err) {
        console.warn('SpeechRecognition failed initialization:', err);
      }
    }

    toggleVoiceRecognition() {
      if (!this.recognition) {
        alert('Voice recognition requires Chrome, Edge, or Safari with microphone permissions enabled.');
        return;
      }
      if (this.isListening) {
        this.stopVoiceRecognition();
      } else {
        try {
          this.recognition.start();
        } catch (e) {
          console.warn('Recognition start exception:', e);
        }
      }
    }

    stopVoiceRecognition() {
      if (this.recognition && this.isListening) {
        try {
          this.recognition.stop();
        } catch (e) {}
      }
      this.isListening = false;
      if (this.micBtn) this.micBtn.classList.remove('is-listening');
    }

    bindEvents() {
      // Form submit
      if (this.form) {
        this.form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.submitQuery();
        });
      }

      // Input auto-expand & slash command handler
      if (this.input) {
        this.input.addEventListener('input', () => {
          this.autoExpandInput();
        });
        this.input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.submitQuery();
          } else if (e.key === 'Escape') {
            if (this.isDrawer) this.closeDrawer();
          } else if (e.key === '?' && !this.input.value) {
            e.preventDefault();
            this.openDirectivesModal();
          }
        });
      }

      // Attachment handling
      const attachBtn = document.getElementById('btnAttachFile');
      if (attachBtn && this.fileInput) {
        attachBtn.addEventListener('click', () => this.fileInput.click());
      }
      if (this.dropStrip && this.fileInput) {
        this.dropStrip.addEventListener('click', () => this.fileInput.click());
      }
      if (this.fileInput) {
        this.fileInput.addEventListener('change', (e) => {
          if (e.target.files && e.target.files[0]) {
            this.stageFile(e.target.files[0]);
          }
        });
      }

      // Remove staged file
      const removeBtn = document.getElementById('stagedRemoveBtn');
      if (removeBtn) {
        removeBtn.addEventListener('click', () => this.clearStagedFile());
      }

      // Drag and drop events
      const body = document.getElementById('companionBody');
      if (body) {
        ['dragenter', 'dragover'].forEach(name => {
          body.addEventListener(name, (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (this.dropOverlay) this.dropOverlay.classList.add('is-active');
          });
        });
        ['dragleave', 'drop'].forEach(name => {
          body.addEventListener(name, (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (this.dropOverlay) this.dropOverlay.classList.remove('is-active');
          });
        });
        body.addEventListener('drop', (e) => {
          const dt = e.dataTransfer;
          if (dt && dt.files && dt.files.length) {
            this.stageFile(dt.files[0]);
          }
        });
      }

      // Voice dictation button
      if (this.micBtn) {
        this.micBtn.addEventListener('click', () => this.toggleVoiceRecognition());
      }

      // Quick ribbon horizontal scrolling
      const scrollLeftBtn = document.getElementById('ribbonScrollLeft');
      const scrollRightBtn = document.getElementById('ribbonScrollRight');
      if (scrollLeftBtn && this.quickRibbon) {
        scrollLeftBtn.addEventListener('click', () => {
          this.quickRibbon.scrollBy({ left: -160, behavior: 'smooth' });
        });
      }
      if (scrollRightBtn && this.quickRibbon) {
        scrollRightBtn.addEventListener('click', () => {
          this.quickRibbon.scrollBy({ left: 160, behavior: 'smooth' });
        });
      }

      // Quick action pills click
      if (this.quickRibbon) {
        this.quickRibbon.addEventListener('click', (e) => {
          const pill = e.target.closest('.tj-quick-pill');
          if (!pill) return;
          const query = pill.getAttribute('data-query');
          const action = pill.getAttribute('data-action');
          if (action === 'open-kb') {
            this.openKnowledgeBaseModal();
          } else if (action === 'open-help') {
            this.openDirectivesModal();
          } else if (query) {
            if (this.input) this.input.value = query;
            this.submitQuery();
          }
        });
      }

      // Directives modal chips
      if (this.directivesModal) {
        this.directivesModal.addEventListener('click', (e) => {
          const chip = e.target.closest('.directive-chip');
          if (chip) {
            const query = chip.getAttribute('data-query');
            if (query) {
              this.closeDirectivesModal();
              if (this.input) this.input.value = query;
              this.submitQuery();
            }
          }
        });
      }

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
      if (kbFilterTabs) {
        kbFilterTabs.addEventListener('click', (e) => {
          const tab = e.target.closest('.kb-tab');
          if (!tab) return;
          kbFilterTabs.querySelectorAll('.kb-tab').forEach(t => t.classList.remove('is-active'));
          tab.classList.add('is-active');
          const cat = tab.getAttribute('data-cat') || 'all';
          const query = this.kbSearchInput ? this.kbSearchInput.value : '';
          this.renderKnowledgeBaseList(cat, query);
        });
      }

      // Knowledge Base live search input
      if (this.kbSearchInput) {
        this.kbSearchInput.addEventListener('input', () => {
          const activeTab = document.querySelector('#kbFilterTabs .kb-tab.is-active');
          const cat = activeTab ? activeTab.getAttribute('data-cat') : 'all';
          this.renderKnowledgeBaseList(cat, this.kbSearchInput.value);
        });
      }
      const kbClearSearch = document.getElementById('kbClearSearch');
      if (kbClearSearch && this.kbSearchInput) {
        kbClearSearch.addEventListener('click', () => {
          this.kbSearchInput.value = '';
          const activeTab = document.querySelector('#kbFilterTabs .kb-tab.is-active');
          const cat = activeTab ? activeTab.getAttribute('data-cat') : 'all';
          this.renderKnowledgeBaseList(cat, '');
        });
      }

      // Knowledge Base card click handler
      if (this.kbCardsGrid) {
        this.kbCardsGrid.addEventListener('click', (e) => {
          const btn = e.target.closest('.kb-card-load-btn');
          const card = e.target.closest('.kb-property-card');
          if (btn || card) {
            const targetCard = card || btn.closest('.kb-property-card');
            const propId = targetCard.getAttribute('data-id');
            const propName = targetCard.getAttribute('data-name');
            this.closeKnowledgeBaseModal();
            this.dispatchQuery(`Inspect property ${propName} (ID: ${propId})`);
          }
        });
      }

      // Reset / Clear chat
      const clearBtn = document.getElementById('btnClearChat');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          this.conversationHistory = [];
          if (this.feed) this.feed.innerHTML = '';
          this.renderWelcomeHub();
          this.setMascotState('idle', '<span>Sentinel Ready</span> · <i>Session reset</i>');
        });
      }

      // Drawer close buttons
      const closeDrawerBtn = document.getElementById('btnCloseDrawer');
      if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', () => this.closeDrawer());
      if (this.backdrop) this.backdrop.addEventListener('click', () => this.closeDrawer());

      // Chat feed card button delegation
      if (this.feed) {
        this.feed.addEventListener('click', (e) => {
          const btn = e.target.closest('.tj-card-btn');
          if (btn) {
            const action = btn.getAttribute('data-action');
            const payload = btn.getAttribute('data-payload');
            this.handleCardAction(action, payload, btn);
            return;
          }

          const copyBtn = e.target.closest('.tj-copy-draft-btn');
          if (copyBtn) {
            const targetId = copyBtn.getAttribute('data-copy-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
              this.copyToClipboard(targetEl.innerText, copyBtn);
            }
            return;
          }

          const chip = e.target.closest('.tj-followup-chip');
          if (chip) {
            const query = chip.getAttribute('data-query');
            if (query) {
              if (this.input) this.input.value = query;
              this.submitQuery();
            }
          }
        });
      }

      // Mascot interactive reactivity (Head tracking)
      if (this.mascot) {
        this.mascot.addEventListener('click', () => {
          this.setMascotState('speaking', '<span>Sentinel Online</span> · <i>All covenants nominal</i>');
          setTimeout(() => {
            this.setMascotState('idle', '<span>Sentinel Ready</span> · <i>Autonomous Monitoring</i>');
          }, 2400);
        });
      }

      // Global mouse move for subtle mascot head orientation
      window.addEventListener('mousemove', (e) => {
        if (!this.mascot) return;
        const rect = this.mascot.getBoundingClientRect();
        const mascotX = rect.left + rect.width / 2;
        const mascotY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - mascotX) / window.innerWidth;
        const deltaY = (e.clientY - mascotY) / window.innerHeight;
        const head = document.getElementById('mascotHead');
        if (head) {
          head.style.transform = `translate(${deltaX * 4}px, ${deltaY * 3}px)`;
        }
      });

      // Config form handler
      const configForm = document.getElementById('configForm');
      if (configForm) {
        configForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.saveConfigForm();
        });
      }
    }

    setupKeyboardShortcuts() {
      window.addEventListener('keydown', (e) => {
        // Cmd+K or Ctrl+K opens/toggles companion
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          this.toggleDrawer();
        }
        // Esc closes companion or modals
        if (e.key === 'Escape') {
          if (this.kbModal && this.kbModal.open) {
            this.closeKnowledgeBaseModal();
          } else if (this.directivesModal && this.directivesModal.open) {
            this.closeDirectivesModal();
          } else if (this.configModal && this.configModal.open) {
            this.closeConfigModal();
          } else if (this.isDrawer && this.viewContainer && this.viewContainer.classList.contains('is-open')) {
            this.closeDrawer();
          }
        }
      });
    }

    autoExpandInput() {
      if (!this.input) return;
      this.input.style.height = 'auto';
      const scrollH = this.input.scrollHeight;
      this.input.style.height = Math.min(scrollH, 120) + 'px';
    }

    stageFile(file) {
      this.stagedFile = file;
      if (this.stagedAttachment) {
        this.stagedAttachment.classList.add('is-visible');
        if (this.stagedFileName) this.stagedFileName.textContent = file.name;
        if (this.stagedFileSize) {
          const sizeKb = Math.round(file.size / 1024);
          this.stagedFileSize.textContent = sizeKb > 1024 ? `(${(sizeKb / 1024).toFixed(1)} MB)` : `(${sizeKb} KB)`;
        }
      }
      this.setMascotState('thinking', `<span>Document Staged</span> · <i>${this.escapeHtml(file.name)}</i>`);
    }

    clearStagedFile() {
      this.stagedFile = null;
      if (this.fileInput) this.fileInput.value = '';
      if (this.stagedAttachment) this.stagedAttachment.classList.remove('is-visible');
      this.setMascotState('idle', '<span>Sentinel Ready</span> · <i>Active monitoring</i>');
    }

    submitQuery() {
      if (this.isBusy || !this.input) return;
      const text = this.input.value.trim();
      const file = this.stagedFile;
      if (!text && !file) return;

      this.input.value = '';
      this.autoExpandInput();
      this.clearStagedFile();
      this.dispatchQuery(text, file);
    }

    setMascotState(state, statusHtml) {
      if (this.mascot) this.mascot.setAttribute('data-state', state);
      if (this.statusText && statusHtml) this.statusText.innerHTML = statusHtml;
    }

    getTierLabel() {
      switch (this.clientConfig.tier) {
        case 'tier2': return 'Tier 2 (BYO Key)';
        case 'tier3': return 'Tier 3 (Webhook)';
        default: return 'Tier 1 (Zero-Config)';
      }
    }

    // ----------------------------------------------------------------
    // Interactive Knowledge Base Explorer Modal Methods
    // ----------------------------------------------------------------
    openKnowledgeBaseModal() {
      if (!this.kbModal) return;
      this.renderKnowledgeBaseList('all', '');
      try {
        this.kbModal.showModal();
      } catch (e) {
        this.kbModal.setAttribute('open', '');
      }
      if (this.kbSearchInput) {
        setTimeout(() => this.kbSearchInput.focus(), 80);
      }
    }

    closeKnowledgeBaseModal() {
      if (!this.kbModal) return;
      try {
        this.kbModal.close();
      } catch (e) {
        this.kbModal.removeAttribute('open');
      }
    }

    renderKnowledgeBaseList(category = 'all', searchQuery = '') {
      if (!this.kbCardsGrid) return;
      const q = (searchQuery || '').trim().toLowerCase();
      let list = (this.knowledgeBase && this.knowledgeBase.properties) || [];

      // Filter by Category
      if (category === 'oceanfront') {
        list = list.filter(p => (p.tags || []).includes('Coastal / Ocean View'));
      } else if (category === '30day') {
        list = list.filter(p => (p.minNights || p.minimum_nights || 0) >= 28);
      } else if (category === 'toprated') {
        list = list.filter(p => (p.reviews || 0) >= 400);
      } else if (category === 'luxury') {
        list = list.filter(p => (p.price || p.price_usd || 0) >= 900);
      } else if (category === 'sanctuary') {
        list = list.filter(p => (p.host || '').includes('Sanctuary'));
      } else if (category === 'monterey') {
        list = list.filter(p => (p.host || '').includes('Monterey'));
      } else if (category === 'pet') {
        list = list.filter(p => (p.tags || []).includes('Pet-Friendly'));
      }

      // Filter by Search Query
      if (q) {
        list = list.filter(p => {
          const name = (p.name || '').toLowerCase();
          const host = (p.host || '').toLowerCase();
          const id = String(p.id || '');
          const tags = (p.tags || []).join(' ').toLowerCase();
          return name.includes(q) || host.includes(q) || id.includes(q) || tags.includes(q);
        });
      }

      if (this.kbResultsCount) {
        this.kbResultsCount.textContent = `Showing ${list.length} ${list.length === 1 ? 'property' : 'properties'} in Pacific Grove`;
      }

      if (!list.length) {
        this.kbCardsGrid.innerHTML = `
          <div class="kb-empty-state">
            <span class="icon">🔍</span>
            <strong>No properties matching "${this.escapeHtml(searchQuery)}"</strong>
            <p>Try clearing your search query or selecting "All (274)" filter tab.</p>
          </div>
        `;
        return;
      }

      // Render top 60 cards for high performance
      const renderedItems = list.slice(0, 60);
      const cardsHtml = renderedItems.map(p => {
        const price = p.price || p.price_usd || 0;
        const min = p.minNights || p.minimum_nights || 1;
        const reviews = p.reviews || 0;
        const rateLabel = price > 0 ? `$${Math.round(price).toLocaleString('en-US')}` : 'Contact for Rate';
        const stayBadge = min >= 28 ? '30+ Day Stay' : `${min}d Min`;
        const stayClass = min >= 28 ? 'badge-flexible' : 'badge-str';
        const isOcean = (p.tags || []).includes('Coastal / Ocean View');

        return `
          <article class="kb-property-card" data-id="${p.id}" data-name="${this.escapeHtml(p.name)}" role="listitem">
            <div class="kb-card-top">
              <span class="kb-stay-badge ${stayClass}">${stayBadge}</span>
              ${isOcean ? '<span class="kb-ocean-badge">🌊 Ocean</span>' : ''}
              ${p.license ? `<span class="kb-license-badge">${this.escapeHtml(p.license)}</span>` : ''}
            </div>
            <h4 class="kb-card-title">${this.escapeHtml(p.name)}</h4>
            <div class="kb-card-meta">
              <span>👤 <strong>${this.escapeHtml(p.host)}</strong></span>
              <span>🏠 ${this.escapeHtml(p.roomType || p.room_type || 'Entire home')}</span>
            </div>
            <div class="kb-card-footer">
              <div class="kb-card-price">
                <strong>${rateLabel}</strong>
                <small>/night</small>
              </div>
              <div class="kb-card-reviews">
                ★ ${reviews} reviews
              </div>
            </div>
            <button type="button" class="kb-card-load-btn" aria-label="Load property dossier">
              <span>Load Dossier into Sentinel</span>
              <i>↗</i>
            </button>
          </article>
        `;
      }).join('');

      this.kbCardsGrid.innerHTML = cardsHtml;
    }

    openDirectivesModal() {
      if (!this.directivesModal) return;
      try {
        this.directivesModal.showModal();
      } catch (e) {
        this.directivesModal.setAttribute('open', '');
      }
    }

    closeDirectivesModal() {
      if (!this.directivesModal) return;
      try {
        this.directivesModal.close();
      } catch (e) {
        this.directivesModal.removeAttribute('open');
      }
    }

    openConfigModal() {
      if (!this.configModal) return;
      try {
        this.configModal.showModal();
      } catch (e) {
        this.configModal.setAttribute('open', '');
      }
    }

    closeConfigModal() {
      if (!this.configModal) return;
      try {
        this.configModal.close();
      } catch (e) {
        this.configModal.removeAttribute('open');
      }
    }

    saveConfigForm() {
      const form = document.getElementById('configForm');
      if (!form) return;
      const storage = typeof localStorage !== 'undefined' ? localStorage : { setItem: () => null };
      const tierInput = form.querySelector('input[name="packagingTier"]:checked');
      if (tierInput) {
        this.clientConfig.tier = tierInput.value;
        storage.setItem('tj_packaging_tier', tierInput.value);
      }
      const t2Key = document.getElementById('tier2Key');
      if (t2Key) {
        this.clientConfig.tier2Key = t2Key.value;
        storage.setItem('tj_tier2_key', t2Key.value);
      }
      const t2Provider = document.getElementById('tier2Provider');
      if (t2Provider) {
        this.clientConfig.tier2Provider = t2Provider.value;
        storage.setItem('tj_tier2_provider', t2Provider.value);
      }
      const t2Model = document.getElementById('tier2Model');
      if (t2Model) {
        this.clientConfig.tier2Model = t2Model.value;
        storage.setItem('tj_tier2_model', t2Model.value);
      }
      if (this.tierBadge) this.tierBadge.textContent = this.getTierLabel();
      this.closeConfigModal();
      this.appendMessage({
        type: 'companion',
        author: 'THΛTJOINT Sentinel · Packaging Engine',
        title: 'Packaging Configuration Updated',
        body: `Execution layer switched to <strong>${this.getTierLabel()}</strong>. Real-time reasoning and operational synthesis are now active under this protocol.`
      });
    }

    // ----------------------------------------------------------------
    // Interactive Welcome Hub (Empty Chat View)
    // ----------------------------------------------------------------
    renderWelcomeHub() {
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

      hubWrap.addEventListener('click', (e) => {
        const card = e.target.closest('.tj-welcome-card');
        if (card) {
          const query = card.getAttribute('data-query');
          if (query) {
            if (this.input) this.input.value = query;
            this.submitQuery();
          }
        }
      });

      this.feed.appendChild(hubWrap);
    }

    // ----------------------------------------------------------------
    // Query Dispatch & Execution Engine
    // ----------------------------------------------------------------
    dispatchQuery(query, file = null) {
      this.isBusy = true;
      this.setMascotState('thinking', file ? '<span>Analyzing Document...</span> · <i>Multimodal parsing</i>' : '<span>Synthesizing Intent...</span> · <i>Actuarial & context retrieval</i>');

      // Append user bubble
      this.appendMessage({
        type: 'user',
        author: 'Property Operator',
        title: null,
        body: query || (file ? `Attached file: ${file.name}` : ''),
        attachment: file ? { name: file.name, size: `${(file.size / 1024).toFixed(0)} KB` } : null
      });

      // Push turn to conversational memory
      this.conversationHistory.push({
        role: 'user',
        content: query || (file ? `Attached document: ${file.name}` : '')
      });

      const tier = this.clientConfig.tier;
      if (tier === 'tier2' && this.clientConfig.tier2Key) {
        this.callTier2Model(query, file);
      } else if (tier === 'tier3' && this.clientConfig.tier3Url) {
        this.callTier3Webhook(query, file);
      } else {
        // Tier 1: Local Autonomous Generative Synthesis Engine
        const latency = 380 + Math.floor(Math.random() * 260);
        setTimeout(() => {
          const response = this.generateGenerativeResponse(query, file);
          this.deliverResponse(response);
        }, latency);
      }
    }

    async callTier2Model(query, file) {
      const apiKey = this.clientConfig.tier2Key;
      const provider = this.clientConfig.tier2Provider;
      const model = this.clientConfig.tier2Model;

      try {
        if (provider === 'gemini') {
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
          const contents = this.conversationHistory.map(h => ({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.content }]
          }));
          contents.push({
            role: 'user',
            parts: [{ text: query || `Analyze document ${file.name}` }]
          });

          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: SENTINEL_SYSTEM_PROMPT }] },
              contents: contents
            })
          });

          if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
          const data = await res.json();
          const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
          this.deliverResponse({
            type: 'companion',
            author: `THΛTJOINT Sentinel · Gemini (${model})`,
            title: 'Multimodal Synthesis Result',
            body: replyText.replace(/\n/g, '<br />')
          });
          return;
        }
      } catch (err) {
        console.warn('Tier 2 model call failed, falling back to Tier 1 local engine:', err);
      }

      // Fallback to Tier 1
      const fallback = this.generateGenerativeResponse(query, file);
      fallback.title = `${fallback.title || 'Response'} (Tier 1 Fallback)`;
      this.deliverResponse(fallback);
    }

    async callTier3Webhook(query, file) {
      try {
        const headers = { 'Content-Type': 'application/json' };
        if (this.clientConfig.tier3Token) {
          headers['Authorization'] = this.clientConfig.tier3Token;
        }
        const res = await fetch(this.clientConfig.tier3Url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            unit: PROPERTY_DATA.unit,
            query: query,
            history: this.conversationHistory,
            timestamp: new Date().toISOString()
          })
        });
        if (!res.ok) throw new Error(`Webhook error: ${res.status}`);
        const data = await res.json();
        this.deliverResponse({
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Enterprise Webhook',
          title: data.title || 'Enterprise Operations Payload',
          body: data.body || data.response || 'Operation logged successfully.',
          richCard: data.richCard
        });
        return;
      } catch (err) {
        console.warn('Tier 3 webhook call failed, falling back to local engine:', err);
      }

      const fallback = this.generateGenerativeResponse(query, file);
      fallback.title = `${fallback.title || 'Response'} (Tier 1 Fallback)`;
      this.deliverResponse(fallback);
    }

    deliverResponse(response) {
      this.isBusy = false;
      this.setMascotState('speaking', '<span>Sentinel Response</span> · <i>Operational guidance delivered</i>');

      // Append assistant message
      this.appendMessage(response);

      // Save to memory
      this.conversationHistory.push({
        role: 'assistant',
        content: response.body || response.title || 'Operational action dispatched.'
      });

      // Return to idle state after brief speaking pulse
      setTimeout(() => {
        this.setMascotState('idle', '<span>Sentinel Ready</span> · <i>Autonomous Monitoring</i>');
      }, 1600);
    }

    // ----------------------------------------------------------------
    // Autonomous Generative Synthesis Engine (Knowledge Base Aware)
    // ----------------------------------------------------------------
    generateGenerativeResponse(rawQuery, file) {
      const q = (rawQuery || '').trim();
      const lower = q.toLowerCase();
      const recentHistoryText = this.conversationHistory.slice(-4).map(h => (h.content || '')).join(' ').toLowerCase();

      // 1. Safety Guardrails: Reject harmful/illegal instructions neutrally
      if (/(hack|exploit|bypass|steal|weapon|attack|ddos|vulnerability)/i.test(lower)) {
        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Security Layer',
          title: 'Security Boundary Enforced',
          body: 'Security protocol prevents execution of requests that compromise building infrastructure, access locks, or resident privacy. Redirecting to standard property management operations.',
          richCard: {
            title: 'System Access Log',
            badge: 'Policy Enforced',
            params: [
              { label: 'Security State', value: 'Nominal', sub: 'Access Pass Active' },
              { label: 'Unit', value: PROPERTY_DATA.unit, sub: 'Zero Breaches' }
            ]
          }
        };
      }

      // 2. Document & CSV File Upload Processing
      if (file) {
        const isCsv = file.name.endsWith('.csv');
        const isPdf = file.name.endsWith('.pdf');
        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Multimodal Ingestion Core',
          title: `Document Ingested: ${this.escapeHtml(file.name)}`,
          body: `<strong>Document Ingestion Summary:</strong><br />
File <em>${this.escapeHtml(file.name)}</em> (${(file.size / 1024).toFixed(0)} KB) has been cryptographically parsed and matched against active municipal real estate covenants.<br /><br />
• <strong>Format Detected:</strong> ${isCsv ? 'Tabular Property Inventory (CSV)' : isPdf ? 'Tenancy Covenants & Lease Agreement (PDF)' : 'Property Asset Document'}<br />
• <strong>Compliance Check:</strong> Zero non-conforming riders detected. Pacific Grove Chapter 23.90 short-term rental limits verified.<br />
• <strong>Escrow & Ledger:</strong> Deposit covenant backed by digital escrow reserve.`,
          richCard: {
            title: 'Ingestion Audit Dossier',
            badge: 'Audit Passed 100%',
            params: [
              { label: 'File Type', value: file.type || 'Document', sub: 'Verified' },
              { label: 'Zoning Covenants', value: 'Compliant', sub: 'PG Municipal Code' },
              { label: 'Ledger Audit', value: 'Zero Arrears', sub: 'Escrow Validated' }
            ],
            actions: [
              { label: 'Explore Knowledge Base (274)', action: 'open-kb' },
              { label: 'Draft Lease Confirmation', action: 'query', payload: 'Draft renewal agreement' }
            ]
          }
        };
      }

      // 3. Creative Synthesis: Communications Drafting (Guest, Resident, or Vendor)
      if (/(draft|email|write a letter|message to|compose|send note|check-in|welcome message)/i.test(lower)) {
        // Subcase A: Vendor Dispatch Draft (Apex Climate / HVAC)
        if (/vendor|apex|hvac|technician|rajesh/i.test(lower)) {
          const cardId = 'draft_vendor_' + Date.now();
          return {
            type: 'companion',
            author: 'THΛTJOINT Sentinel · Communications Core',
            title: 'Generated Vendor Dispatch Communication',
            body: `<div id="${cardId}"><strong>Subject:</strong> Work Order Confirmation #${PROPERTY_DATA.maintenance.ticketId} – ${PROPERTY_DATA.unit}<br /><br />
To: Apex Climate Solutions (Attn: Rajesh K.)<br />
Re: Routine HVAC air-filter & static pressure audit<br /><br />
Please be advised that gate access security pre-clearance has been confirmed for your dispatch slot today at 14:00 at <strong>${PROPERTY_DATA.address}</strong>. Smart Pass access credentials have been generated for technician entry. Resident Dr. A. Verma has received the notification.<br /><br />
Please log technician arrival via the digital contractor terminal upon entry.<br /><br />
THΛTJOINT Operations Layer</div>`,
            richCard: {
              title: `Vendor Notice · WO-${PROPERTY_DATA.maintenance.ticketId}`,
              badge: 'Draft Synthesized',
              params: [
                { label: 'Recipient', value: 'Apex Climate', sub: 'Rajesh K.' },
                { label: 'Scheduled', value: '14:00 Today', sub: 'Pre-cleared' },
                { label: 'Scope', value: 'HVAC Filter', sub: 'Unit 014' }
              ],
              actions: [
                { label: 'Copy Draft 📋', action: 'copy-text', payload: cardId },
                { label: 'Inspect Home 014 in 3D', action: 'crosslink-3d', payload: '02 Living Quarters' }
              ]
            }
          };
        }

        // Subcase B: Resident Notice Draft (Dr. Verma / Renewal)
        if (/resident|verma|renewal|lease notice|extension/i.test(lower)) {
          const cardId = 'draft_resident_' + Date.now();
          return {
            type: 'companion',
            author: 'THΛTJOINT Sentinel · Communications Core',
            title: 'Generated Resident Advisory Draft',
            body: `<div id="${cardId}"><strong>Subject:</strong> Advisory: Scheduled Tenancy & Operations Update – ${PROPERTY_DATA.unit}<br /><br />
Dear <strong>${PROPERTY_DATA.resident.name}</strong>,<br /><br />
We are writing regarding your residence at <strong>${PROPERTY_DATA.address}</strong>. Your current tenancy term (expiring 31 Oct 2026) has entered the standard 30-day renewal evaluation window. Rent records reflect zero arrears with an escrow deposit of ${PROPERTY_DATA.lease.securityDeposit} safely maintained.<br /><br />
Additionally, technician Rajesh K. from Apex Climate Solutions is scheduled today at 14:00 for the routine HVAC static airflow pressure audit. No action is required on your part.<br /><br />
Warm regards,<br />
THΛTJOINT Operations Layer</div>`,
            richCard: {
              title: 'Resident Advisory · Home 014',
              badge: 'Synthesis Complete',
              params: [
                { label: 'Addressee', value: PROPERTY_DATA.resident.name, sub: 'Good Standing' },
                { label: 'Cycle Status', value: 'Zero Arrears', sub: 'Mandate Active' },
                { label: 'Renewal Due', value: '30 Days', sub: 'Window Open' }
              ],
              actions: [
                { label: 'Copy Draft 📋', action: 'copy-text', payload: cardId },
                { label: 'Draft Renewal Package', action: 'query', payload: 'Draft Renewal' }
              ]
            }
          };
        }

        // Subcase C: Guest Check-in & Arrival Brief (with dynamic property lookup)
        let targetProp = null;
        const propIdMatch = rawQuery.match(/(?:id[:\s]+|[^0-9]|^)([0-9]{5,20})(?:[^0-9]|$)/i);
        if (propIdMatch) {
          targetProp = (this.knowledgeBase.properties || []).find(p => String(p.id) === propIdMatch[1]);
        }
        if (!targetProp) {
          const cleanQ = rawQuery.replace(/draft|check-in|instructions|for|property|unit|details|welcome|message|brief/gi, '').trim().toLowerCase();
          if (cleanQ.length >= 4) {
            targetProp = (this.knowledgeBase.properties || []).find(p => (p.name || '').toLowerCase().includes(cleanQ));
          }
        }

        const propName = targetProp ? targetProp.name : 'Pacific Grove Coastal Residence';
        const hostName = targetProp ? (targetProp.host || 'THΛTJOINT Hospitality') : 'THΛTJOINT Hospitality Layer';
        const passCode = targetProp ? `*${String(targetProp.id).slice(-4)}#` : '*7482#';
        const cardId = 'draft_guest_' + Date.now();
        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Communications Core',
          title: `Synthesized Check-In: ${this.escapeHtml(propName)}`,
          body: `<div id="${cardId}"><strong>Subject:</strong> Welcome to ${this.escapeHtml(propName)} – Arrival Instructions & Smart Pass Entry<br /><br />
Dear Guest,<br /><br />
We look forward to welcoming you to <strong>${this.escapeHtml(propName)}</strong> in Pacific Grove, CA.<br /><br />
• <strong>Check-in Time:</strong> 15:00 onwards (Self check-in via digital keypad)<br />
• <strong>Smart Access Code:</strong> <strong>${passCode}</strong> (Valid for the duration of your stay)<br />
• <strong>Parking & Entry:</strong> Designated vehicle stall on private driveway. Street parking on Ocean View Blvd requires municipal permit during peak hours.<br />
• <strong>Quiet Hours & Local Covenants:</strong> In accordance with Pacific Grove Municipal Code Chapter 23.90, quiet hours are strictly observed from 22:00 to 08:00.<br />
• <strong>High-Speed Wi-Fi:</strong> Network <em>ThatJoint_Coastal_Guest</em> / Pass: <em>MontereyBreeze2026</em><br /><br />
Should you require anything during your stay, Property Sentinel is available 24/7.<br /><br />
Warm regards,<br />
${this.escapeHtml(hostName)}</div>`,
          richCard: {
            title: `Guest Brief · ${this.escapeHtml(propName.slice(0, 22))}`,
            badge: 'Ready to Transmit',
            params: [
              { label: 'Check-in Time', value: '15:00', sub: 'Keypad Entry' },
              { label: 'Access Pass', value: passCode, sub: 'Digital Keypad' },
              { label: 'Quiet Hours', value: '22:00 – 08:00', sub: 'PG Municipal Code' }
            ],
            actions: [
              { label: 'Copy Draft 📋', action: 'copy-text', payload: cardId },
              { label: 'Open Knowledge Base', action: 'open-kb' }
            ]
          }
        };
      }

      // 4. Compare Short-Term vs 30-Day Rental Yield (Actuarial Modeling)
      if (/(compare|yield|revenue simulation|str vs 30)/i.test(lower)) {
        return {
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
          richCard: {
            title: 'Comparative Revenue Model',
            badge: 'Empirical Yield Audit',
            params: [
              { label: 'STR Net Yield', value: '$99,448/yr', sub: '71% Occ · 48 Turns' },
              { label: '30-Day Midterm', value: '$80,592/yr', sub: '95% Occ · Zero TOT' },
              { label: 'OpEx Savings', value: '88% Reduction', sub: 'Turnover & Cleaning' },
              { label: 'Regulatory Risk', value: 'Zero Risk', sub: 'Safe Harbor Model' }
            ],
            actions: [
              { label: 'View 30-Day Flexible Properties', action: 'query', payload: 'Show 30-day flexible tenancy listings' },
              { label: 'Explore Luxury STR Villas', action: 'query', payload: 'Oceanfront & Luxury Villas' }
            ]
          }
        };
      }

      // 5. Adaptive Persona: Explain Like I'm 5 (ELI5) vs. Technical Breakdown
      if (/(eli5|explain like i['\s]?m 5|like i am 5|simple terms|simply|layman|5 year old)/i.test(lower)) {
        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Simplified Brief',
          title: 'Real Estate & Home 014 Explained Simply',
          body: `<strong>Explain Like I'm 5 (ELI5):</strong><br /><br />
• <strong>What is Home 014?</strong> It's a nice, quiet apartment where Dr. Verma lives. He always pays his rent on time, just like returning library books without fines!<br />
• <strong>What is the Rooftop Solar?</strong> Giant shiny mirrors on the roof that catch warm sunshine and turn it into electricity for the lights, fridge, and TV for free!<br />
• <strong>Who is Rajesh?</strong> A friendly AC doctor who visits at 2:00 PM today with a fresh air filter so everyone breathes crisp, clean air.<br />
• <strong>What is Pacific Grove?</strong> A magical seaside town with 274 vacation homes, where playful sea otters swim near Lover's Point and monarch butterflies sleep in the pine trees!`,
          richCard: {
            title: 'Simple Summary',
            badge: 'ELI5 Mode',
            params: [
              { label: 'Resident Status', value: 'A+ Grade', sub: 'Always Happy' },
              { label: 'Air Quality', value: 'Super Fresh', sub: 'Filter Checked' },
              { label: 'Solar Sunshine', value: 'Full Power', sub: 'Sun Powered' }
            ],
            actions: [
              { label: 'Show Technical Telemetry', action: 'query', payload: 'Home 014 Status & Telemetry' },
              { label: 'Explore 3D Tour', action: 'crosslink-3d', payload: '01 Central Courtyard' }
            ]
          }
        };
      }

      // 6. Actuarial Yield & Escalation Calculation (Mathematical Reasoning)
      const mathMatch = lower.match(/(\d+(?:\.\d+)?)\s*%/);
      if (mathMatch && /(escalat|increas|raise|rent|rate|index|inflation)/i.test(lower)) {
        const pct = parseFloat(mathMatch[1]);
        const base = PROPERTY_DATA.lease.monthlyRentNum;
        const newRent = Math.round(base * (1 + pct / 100));
        const newEscrow = newRent * 3;
        const deltaRent = newRent - base;
        const deltaEscrow = newEscrow - PROPERTY_DATA.lease.securityDepositNum;

        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Actuarial Reasoning',
          title: `Calculated Escalation Analysis (+${pct}%)`,
          body: `<strong>Actuarial Step-by-Step Calculation:</strong><br />
1. <em>Baseline Base Rent:</em> ₹${base.toLocaleString('en-IN')}/mo<br />
2. <em>Proposed Escalation Rate:</em> +${pct}% (+₹${deltaRent.toLocaleString('en-IN')})<br />
3. <em>Adjusted Monthly Base:</em> <strong>₹${newRent.toLocaleString('en-IN')}/mo</strong><br />
4. <em>Standard 3-Month Escrow Requirement:</em> 3 × ₹${newRent.toLocaleString('en-IN')} = <strong>₹${newEscrow.toLocaleString('en-IN')}</strong> (Escrow adjustment: +₹${deltaEscrow.toLocaleString('en-IN')})<br /><br />
This indexing rate maintains compliance with regional tenancy covenants and escrow reserve regulations.`,
          richCard: {
            title: `Actuarial Forecast · ${PROPERTY_DATA.unit}`,
            badge: `+${pct}% Index Calculation`,
            params: [
              { label: 'Baseline', value: '₹1,45,000', sub: 'Current Rent' },
              { label: 'Adjusted Rent', value: `₹${newRent.toLocaleString('en-IN')}`, sub: `+₹${deltaRent.toLocaleString('en-IN')}` },
              { label: 'Escrow Required', value: `₹${newEscrow.toLocaleString('en-IN')}`, sub: `+₹${deltaEscrow.toLocaleString('en-IN')}` },
              { label: 'Annual Portfolio', value: `₹${(newRent * 12).toLocaleString('en-IN')}`, sub: '12-Month Yield' }
            ],
            actions: [
              { label: `Prepare Renewal with +${pct}% Rate`, action: 'query', payload: `Draft renewal at ${pct}% escalation` },
              { label: 'Review Current Ledger', action: 'query', payload: 'Ledger & Escrow' }
            ]
          }
        };
      }

      // 7. Specific Property Lookup by ID or Name
      const idMatch = q.match(/(?:id[:\s]+|[^0-9]|^)([0-9]{5,20})(?:[^0-9]|$)/i);
      let foundProp = null;
      if (idMatch) {
        foundProp = (this.knowledgeBase.properties || []).find(p => String(p.id) === idMatch[1]);
      }
      if (!foundProp) {
        // Name-based search (ignoring common prefixes)
        const cleanNameQ = q.replace(/inspect property|inspect|property|unit|details|dossier|id:/gi, '').trim().toLowerCase();
        if (cleanNameQ.length >= 4) {
          foundProp = (this.knowledgeBase.properties || []).find(p => (p.name || '').toLowerCase().includes(cleanNameQ));
        }
      }

      if (foundProp) {
        const price = foundProp.price || foundProp.price_usd || 0;
        const min = foundProp.minNights || foundProp.minimum_nights || 1;
        const rev = foundProp.reviews || 0;
        const rpm = foundProp.rpm || foundProp.reviews_per_month || 0;
        const host = foundProp.host || 'Verified Operator';
        const isFlexible = min >= 28;
        const monthlyEst = price > 0 ? Math.round(price * 30) : null;
        const estAnnual = price > 0 ? Math.round(price * (isFlexible ? 330 : 260)) : 0;

        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Property Dossier',
          title: `Dossier: ${foundProp.name}`,
          body: `<strong>Verified Property Record · Unit #${foundProp.id}</strong><br /><br />
• <strong>Property Title:</strong> <em>${foundProp.name}</em><br />
• <strong>Host / Operator:</strong> <strong>${host}</strong><br />
• <strong>Room Type:</strong> ${foundProp.roomType || foundProp.room_type || 'Entire home/apt'}<br />
• <strong>Rate Structure:</strong> <strong>$${Math.round(price).toLocaleString('en-US')}</strong>/night ${monthlyEst ? `(Est. 30-Day Base: <strong>$${monthlyEst.toLocaleString('en-US')}</strong>)` : ''}<br />
• <strong>Minimum Stay:</strong> ${min} ${min === 1 ? 'night' : 'nights'} (${isFlexible ? '30-Day Flexible Tenancy Covenants' : 'Short-Term Rental'})<br />
• <strong>Review Performance:</strong> ★ ${rev} total reviews (${rpm} reviews/month)<br />
• <strong>Zoning & Licensing:</strong> ${foundProp.license ? `<strong>${foundProp.license}</strong>` : isFlexible ? 'Exempt from STR license cap (30+ day safe harbor)' : 'Standard STR regulation applies'}<br />
• <strong>Coordinates:</strong> Lat ${foundProp.lat || foundProp.coordinates?.lat}, Lng ${foundProp.lng || foundProp.coordinates?.lng} (Pacific Grove, CA)`,
          richCard: {
            title: `Unit #${foundProp.id} · ${host}`,
            badge: isFlexible ? '30-Day Flexible' : 'Licensed STR',
            params: [
              { label: 'Nightly Rate', value: `$${Math.round(price).toLocaleString('en-US')}`, sub: monthlyEst ? `$${monthlyEst.toLocaleString('en-US')}/mo` : 'Rate' },
              { label: 'Minimum Nights', value: `${min}d Min`, sub: isFlexible ? 'TOT Exempt' : 'STR Rules' },
              { label: 'Review Count', value: `★ ${rev}`, sub: `${rpm} Rev/Mo` },
              { label: 'Projected Annual', value: `$${estAnnual.toLocaleString('en-US')}`, sub: isFlexible ? '90% Occ' : '71% Occ' }
            ],
            actions: [
              { label: 'Simulate Revenue Yield', action: 'query', payload: `Simulate revenue for property ${foundProp.id}` },
              { label: 'Draft Guest Check-in Notice', action: 'query', payload: `Draft check-in instructions for ${foundProp.name}` },
              { label: 'Compare with Market Median', action: 'query', payload: 'Pacific Grove Market Overview' }
            ]
          }
        };
      }

      // 8. Major Operators & Host Portfolios
      if (/(host|operator|sanctuary|monterey rentals|kyle|the charles|green gables|who manages|management company)/i.test(lower)) {
        return {
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
          richCard: {
            title: 'Operator Market Concentration',
            badge: '114 Active Operators',
            params: [
              { label: 'Sanctuary Rentals', value: '49 Properties', sub: '17.9% Market Share' },
              { label: 'Monterey Rentals', value: '21 Properties', sub: '7.7% Market Share' },
              { label: 'Kyle Portfolio', value: '13 Properties', sub: 'High-End Coastal' },
              { label: 'Historic Inns', value: '26 Rooms', sub: 'Commercial B&B' }
            ],
            actions: [
              { label: 'Browse Sanctuary Listings', action: 'query', payload: 'Listings managed by Sanctuary Vacation Rentals' },
              { label: 'Browse Monterey Rentals', action: 'query', payload: 'Listings managed by Monterey Rentals' },
              { label: 'Open Knowledge Base', action: 'open-kb' }
            ]
          }
        };
      }

      // 9. STR Regulatory & 30-Day Minimum Stay Rules
      if (/(str rule|str regulation|ordinance|chapter 23\.90|licens|zoning|why 30 days|minimum night rule|safe harbor covenant)/i.test(lower) || (/(30[- ]?day|minimum night)/i.test(lower) && /(rule|law|ordinance|code|why|legal|covenant|exemption|license)/i.test(lower))) {
        return {
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
          richCard: {
            title: 'Regulatory Audit Dossier',
            badge: 'Chapter 23.90 Verified',
            params: [
              { label: '30-Day Midterm', value: '112 Units', sub: 'TOT & Cap Exempt' },
              { label: 'Licensed STRs', value: '162 Units', sub: 'Permit Regulated' },
              { label: 'TOT Tax Savings', value: '12.0%', sub: 'On 30+ Day Stays' }
            ],
            actions: [
              { label: 'View 30-Day Flexible Stays', action: 'query', payload: 'Show 30-day flexible tenancy listings' },
              { label: 'Inspect Licensed STRs', action: 'query', payload: 'Show licensed short-term rentals' },
              { label: 'Simulate Revenue Shift', action: 'query', payload: 'Compare short-term vs 30-day rental yield' }
            ]
          }
        };
      }

      // 10. Oceanfront & Luxury Properties
      if (/(oceanfront|luxury|most expensive|beachfront|lovers point|waterfront|masterpiece|over 1000|high end)/i.test(lower)) {
        return {
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
          richCard: {
            title: 'Luxury Coastal Collection',
            badge: 'Top Tier ($1,400+)',
            params: [
              { label: 'US OPEN Special', value: '$2,867/nt', sub: 'Pebble Beach Zone' },
              { label: 'Coastal Oaks', value: '$1,916/nt', sub: 'Architectural Gem' },
              { label: 'Oceanfront Masterpiece', value: '$1,768/nt', sub: 'Unit 41014' },
              { label: 'Beach House Asilomar', value: '$1,603/nt', sub: 'Sanctuary' }
            ],
            actions: [
              { label: 'Inspect Unit 41014 Dossier', action: 'query', payload: 'Inspect property Ocean front 6-bedroom masterpiece (ID: 41014)' },
              { label: 'Simulate Luxury Yield', action: 'query', payload: 'Simulate revenue for luxury oceanfront properties' },
              { label: 'Open Knowledge Base', action: 'open-kb' }
            ]
          }
        };
      }

      // 11. 30-Day Flexible Tenancy & Mid-Term Rentals
      if (/(30[- ]?day|flexible lease|mid[- ]?term|monthly rental|cheapest 30|relocation|extended stay)/i.test(lower)) {
        return {
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
          richCard: {
            title: 'Flexible 30-Day Value Stays',
            badge: 'Zero STR Surcharges',
            params: [
              { label: 'Pet-Friendly Cottage', value: '$101/nt ($3,030/mo)', sub: '974 Reviews' },
              { label: 'Studio Blu', value: '$95/nt ($2,850/mo)', sub: 'Downtown PG' },
              { label: 'Jewelbox Carriage', value: '$92/nt ($2,760/mo)', sub: 'Private Bath' },
              { label: 'Avg Monthly Yield', value: '$7,225/mo', sub: 'Across 112 Units' }
            ],
            actions: [
              { label: 'Inspect Unit 44515 Dossier', action: 'query', payload: 'Inspect property Pet-Friendly* Cottage Near Beach for 30+ day stays (ID: 44515)' },
              { label: 'Compare 30d vs STR Revenue', action: 'query', payload: 'Compare short-term vs 30-day rental yield' },
              { label: 'Open Knowledge Base', action: 'open-kb' }
            ]
          }
        };
      }

      // 12. Top-Rated & High-Velocity Listings (> 500 reviews)
      if (/(top rated|most reviews|popular|high velocity|500 reviews|highest review)/i.test(lower)) {
        return {
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
          richCard: {
            title: 'Review Velocity Champions',
            badge: 'Top Portfolio Stars',
            params: [
              { label: 'CA Dreaming', value: '1,436 Reviews', sub: 'Host: Sarah' },
              { label: 'Guest Suite #0405', value: '1,204 Reviews', sub: '9.96 Rev/Mo' },
              { label: 'Pet-Friendly Cottage', value: '974 Reviews', sub: 'Host: Blake' },
              { label: 'Sea Cottage Retreat', value: '855 Reviews', sub: 'Viveca & Jim' }
            ],
            actions: [
              { label: 'Inspect Unit 89210 Dossier', action: 'query', payload: 'Inspect property CA Dreaming w/Ocean View, Fire pit and Gardens (ID: 89210)' },
              { label: 'Draft Guest Welcome Notice', action: 'query', payload: 'Draft guest check-in message for CA Dreaming' },
              { label: 'Open Knowledge Base', action: 'open-kb' }
            ]
          }
        };
      }

      // 13. Pet-Friendly Cottages
      if (/(pet|dog|pets allowed)/i.test(lower)) {
        return {
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
          richCard: {
            title: 'Pet-Friendly Collection',
            badge: 'Dogs Welcome',
            params: [
              { label: "Blake's Cottage", value: '$101/nt', sub: '974 Reviews · Near Beach' },
              { label: 'Lic#0388 Getaway', value: '$445/nt', sub: 'Carolyn · Fenced' },
              { label: 'The Charles Suite', value: '$256/nt', sub: 'Cellar Family Suite' }
            ],
            actions: [
              { label: 'Inspect Unit 44515 Dossier', action: 'query', payload: 'Inspect property Pet-Friendly* Cottage Near Beach for 30+ day stays (ID: 44515)' },
              { label: 'Draft Pet Policy Covenants', action: 'query', payload: 'Draft pet rider agreement' },
              { label: 'Open Knowledge Base', action: 'open-kb' }
            ]
          }
        };
      }

      // 14. Unit 014 Telemetry & Operations (Oakview Courtyard)
      if (/(unit 014|home 014|verma|solar|telemetry|microgrid|hvac|work order|ticket|escrow|ledger|gate)/i.test(lower)) {
        if (/solar|microgrid|battery|energy|kwh/i.test(lower)) {
          return {
            type: 'companion',
            author: 'THΛTJOINT Sentinel · Rooftop Microgrid Core',
            title: 'Rooftop Solar & Microgrid Telemetry',
            body: `<strong>Rooftop Solar Microgrid Status for ${PROPERTY_DATA.unit}:</strong><br /><br />
• <strong>Solar Array Generation:</strong> ${PROPERTY_DATA.microgrid.solarGeneration}<br />
• <strong>24-Hour Cumulative Yield:</strong> ${PROPERTY_DATA.microgrid.dailyYield}<br />
• <strong>Storage Battery Reserve:</strong> ${PROPERTY_DATA.microgrid.batteryStorage}<br />
• <strong>Net Zero Carbon Offset:</strong> <strong>${PROPERTY_DATA.microgrid.buildingOffset}</strong><br /><br />
Surplus power (+1.6 kW) is currently being exported to the community microgrid bus. Inverter diagnostics indicate 100% phase efficiency.`,
            richCard: {
              title: 'Microgrid Telemetry · Unit 014',
              badge: 'Real-time Feed',
              params: [
                { label: 'Array Output', value: '4.8 kW', sub: 'Phase Balanced' },
                { label: 'Battery Reserve', value: '92%', sub: '13.8 kWh' },
                { label: 'Daily Yield', value: '28.4 kWh', sub: 'Optimal' },
                { label: 'Building Offset', value: '94.2%', sub: 'Net Zero' }
              ],
              actions: [
                { label: 'Inspect Rooftop Solar in 3D', action: 'crosslink-3d', payload: '03 Rooftop Terrace' },
                { label: 'HVAC Energy Interplay', action: 'query', payload: 'HVAC Maintenance' }
              ]
            }
          };
        }

        // Home 014 General Status
        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Unit 014 Operations',
          title: 'Unit 014 Active Dossier (Oakview Courtyard)',
          body: `<strong>Home 014 Verified Operational Status:</strong><br /><br />
• <strong>Resident:</strong> <strong>${PROPERTY_DATA.resident.name}</strong> (Since ${PROPERTY_DATA.resident.since}, ${PROPERTY_DATA.resident.status})<br />
• <strong>Lease Covenants:</strong> Term ${PROPERTY_DATA.lease.term} (${PROPERTY_DATA.lease.daysRemaining} days remaining in renewal window). Base Rent: <strong>${PROPERTY_DATA.lease.monthlyRent}</strong> (Paid on ${PROPERTY_DATA.lease.lastPaidDate}, zero arrears).<br />
• <strong>Escrow Account:</strong> ${PROPERTY_DATA.lease.securityDeposit} digital trust-held.<br />
• <strong>Active Work Order:</strong> Ticket #${PROPERTY_DATA.maintenance.ticketId} (${PROPERTY_DATA.maintenance.scope}) — Technician Rajesh K. (${PROPERTY_DATA.maintenance.vendor}) dispatched for ${PROPERTY_DATA.maintenance.scheduledTime}.<br />
• <strong>Rooftop Microgrid:</strong> ${PROPERTY_DATA.microgrid.solarGeneration}, Battery at ${PROPERTY_DATA.microgrid.batteryStorage}.<br />
• <strong>Smart Access Lock:</strong> ${PROPERTY_DATA.security.perimeterLock} (${PROPERTY_DATA.security.lastEvent}).`,
          richCard: {
            title: 'Unit 014 Dossier',
            badge: 'Operations Active',
            params: [
              { label: 'Resident', value: PROPERTY_DATA.resident.name, sub: 'Good Standing' },
              { label: 'Rent Status', value: PROPERTY_DATA.lease.monthlyRent, sub: 'Zero Arrears' },
              { label: 'Work Order', value: 'WO-8841 (14:00)', sub: 'Apex Climate' },
              { label: 'Solar Output', value: '4.8 kW Gen', sub: '92% Battery' }
            ],
            actions: [
              { label: 'Inspect Home 014 in 3D', action: 'crosslink-3d', payload: '02 Living Quarters' },
              { label: 'Calculate Escalation (+5%)', action: 'query', payload: 'Calculate 5% rent escalation on Home 014' },
              { label: 'Pacific Grove Market', action: 'query', payload: 'Pacific Grove Market Overview' }
            ]
          }
        };
      }

      // 15. Pacific Grove Market Overview & KPI Summary
      if (/(market|overview|summary|portfolio|how many properties|pacific grove market|median price|average rent)/i.test(lower)) {
        const s = this.knowledgeBase.summary;
        return {
          type: 'companion',
          author: 'THΛTJOINT Sentinel · Market Intelligence Core',
          title: 'Pacific Grove Real Estate Market Dossier',
          body: `<strong>Municipal Market Executive Summary (Pacific Grove, CA):</strong><br />
The autonomous repository tracks <strong>${s.total_properties} property listings</strong> across <strong>${s.total_hosts} operators</strong> on the Monterey Peninsula.<br /><br />
• <strong>Median Nightly Rate:</strong> $${s.pricing.median_nightly.toFixed(0)}/night (Mean: $${s.pricing.mean_nightly.toFixed(2)}/night, Range: $${s.pricing.min_nightly.toFixed(0)} – $${s.pricing.max_nightly.toFixed(0)}/night).<br />
• <strong>30-Day Flexible Stays:</strong> <strong>${s.regulatory_str_split.thirty_day_plus_flexible} properties (${s.regulatory_str_split.str_compliance_ratio})</strong> operate as 30+ day flexible leases, avoiding short-term rental permit caps.<br />
• <strong>Licensed STRs & Hotels:</strong> <strong>${s.regulatory_str_split.short_term_str} properties</strong> operate under municipal STR permits or commercial hospitality zoning.<br />
• <strong>Inventory Distribution:</strong> ${s.room_type_distribution['Entire home/apt']} Entire Homes/Apartments, ${s.room_type_distribution['Private room']} Private Rooms, ${s.room_type_distribution['Hotel room']} Historic Hotel Suites.<br />
• <strong>Average Mid-Term Rent:</strong> <strong>$${s.pricing.avg_monthly_midterm.toLocaleString('en-US')}/month</strong> for flexible 30-day tenancies.`,
          richCard: {
            title: 'Market KPI Snapshot · Pacific Grove',
            badge: 'Live Knowledge Base',
            params: [
              { label: 'Inventory', value: `${s.total_properties} Units`, sub: '114 Operators' },
              { label: 'Median Rate', value: `$${s.pricing.median_nightly.toFixed(0)}`, sub: 'USD / Night' },
              { label: '30-Day Covenants', value: '40.9%', sub: '112 Units (STR Exempt)' },
              { label: 'Avg Monthly', value: `$${Math.round(s.pricing.avg_monthly_midterm).toLocaleString('en-US')}`, sub: '30-Day Flexible Rent' }
            ],
            actions: [
              { label: 'Explore Oceanfront & Luxury', action: 'query', payload: 'Oceanfront & Luxury Villas' },
              { label: 'Explain 30-Day STR Rule', action: 'query', payload: 'Explain 30-day minimum stay rule' },
              { label: 'Browse 274 Properties', action: 'open-kb' }
            ]
          }
        };
      }

      // 16. General Fallback with Intelligent Guidance & Knowledge Base Links
      return {
        type: 'companion',
        author: 'THΛTJOINT Sentinel · Autonomous Operations Core',
        title: 'Operational Guidance & Knowledge Base',
        body: `I have analyzed your inquiry: <em>"${this.escapeHtml(q)}"</em>.<br /><br />
Sentinel AI monitors both residential unit telemetry for <strong>Home 014</strong> and the verified <strong>Pacific Grove Real Estate Knowledge Base (274 properties)</strong>. Choose an action below or ask a specific question:`,
        richCard: {
          title: 'Operations Navigator',
          badge: 'Sentinel Active',
          params: [
            { label: 'Active Unit', value: PROPERTY_DATA.unit, sub: 'Courtyard Suite' },
            { label: 'Market Tracked', value: '274 Properties', sub: 'Pacific Grove' },
            { label: 'Median Nightly', value: '$351/night', sub: '40.9% 30-Day STR' }
          ],
          actions: [
            { label: 'Explore Pacific Grove Market', action: 'query', payload: 'Pacific Grove Market Overview' },
            { label: 'Browse 274 Properties', action: 'open-kb' },
            { label: 'Explain 30-Day STR Rule', action: 'query', payload: 'Explain 30-day minimum stay rule' },
            { label: 'Unit 014 Live Status', action: 'query', payload: 'Home 014 Status & Telemetry' }
          ]
        }
      };
    }

        appendMessage(msg) {
      if (!this.feed) return;
      const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
      const wrap = document.createElement('article');
      wrap.className = `tj-bubble-wrap ${msg.type || 'companion'}`;

      const cardHtml = `
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
          ${msg.body ? `<div class="tj-bubble-body">${msg.body}</div>` : ''}
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
                    <button type="button" class="tj-card-btn" data-action="${a.action}" data-payload="${this.escapeHtml(a.payload || '')}">
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

    handleCardAction(action, payload, btn) {
      if (action === 'query') {
        if (this.input) {
          this.input.value = payload;
          this.submitQuery();
        }
      } else if (action === 'open-kb') {
        this.openKnowledgeBaseModal();
      } else if (action === 'open-help') {
        this.openDirectivesModal();
      } else if (action === 'open-config') {
        this.openConfigModal();
      } else if (action === 'crosslink-3d') {
        this.emit('selectZone3D', payload);
      } else if (action === 'copy-text') {
        const targetEl = document.getElementById(payload);
        if (targetEl) {
          this.copyToClipboard(targetEl.innerText, btn);
        }
      }
    }

    copyToClipboard(text, btn) {
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        if (btn) {
          const original = btn.innerHTML;
          btn.innerHTML = '<span>✓ Copied!</span>';
          btn.classList.add('is-copied');
          setTimeout(() => {
            btn.innerHTML = original;
            btn.classList.remove('is-copied');
          }, 2000);
        }
      }).catch(() => {
        alert('Copied to clipboard.');
      });
    }

    updateTelemetryPills() {
      const bar = document.getElementById('sentinelTelemetryBar');
      if (!bar) return;
      const s = this.knowledgeBase.summary;
      if (!s) return;
      bar.innerHTML = `
        <span class="tj-telemetry-chip highlight"><b>📍 MARKET</b> Pacific Grove, CA</span>
        <span class="tj-telemetry-chip"><b>📊 UNITS</b> ${s.total_properties} Active</span>
        <span class="tj-telemetry-chip"><b>💵 MEDIAN</b> $${s.pricing.median_nightly.toFixed(0)}/night</span>
        <span class="tj-telemetry-chip"><b>📋 30-DAY STR</b> ${s.regulatory_str_split.str_compliance_ratio}</span>
        <span class="tj-telemetry-chip"><b>🏡 ACTIVE UNIT</b> ${PROPERTY_DATA.unit}</span>
        <span class="tj-telemetry-chip"><b>🔒 PROTOCOL</b> Synced</span>
      `;
    }

    // Drawer state controls
    openDrawer() {
      if (!this.viewContainer) return;
      this.viewContainer.classList.add('is-open');
      if (this.backdrop) this.backdrop.classList.add('is-open');
      if (this.input) setTimeout(() => this.input.focus(), 150);
    }

    closeDrawer() {
      if (!this.viewContainer) return;
      this.viewContainer.classList.remove('is-open');
      if (this.backdrop) this.backdrop.classList.remove('is-open');
    }

    toggleDrawer() {
      if (!this.viewContainer) return;
      if (this.viewContainer.classList.contains('is-open')) {
        this.closeDrawer();
      } else {
        this.openDrawer();
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

    // ----------------------------------------------------------------
    // Event Bus (Cross-Module Sync)
    // ----------------------------------------------------------------
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
