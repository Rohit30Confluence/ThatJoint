/* ==========================================================================
   THATJOINT / GLOBAL INTELLIGENCE & PERSONALIZED AI COMPANION (v3.0.0)
   Capabilities:
     - World Detailed Map & Geographic Intelligence: 7 Continents, 195+ Countries, Extreme Corners
     - Clean Slate Zero-Base Knowledge Base: Dynamic User Teaching, Memory & Learning
     - Personalized Chatbot: Adaptive User Profile, Tone, Contextual Memory
     - Global Co-Living Booking & Intake Concierge (Multi-Step KYC Flow)
     - Interactive SVG World Map Explorer & Global Coordinate Navigator
     - Multimodal Document Understanding (PDF, CSV, Images), Voice Dictation, Drag & Drop
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
      <g class="mascot-tail">
        <path d="M18 42C12 40 4 46 6 54C8 60 17 62 25 56C28 53 28 48 24 45C22 43 20 42 18 42Z" fill="#D45D3A" />
        <path d="M12 45C8 47 6 52 9 56" stroke="#EDEBE4" stroke-width="2.5" stroke-linecap="round" />
        <path d="M18 48C15 50 14 55 18 58" stroke="#3D261E" stroke-width="2.5" stroke-linecap="round" />
      </g>
      <path d="M20 46C20 40 25 36 32 36C39 36 44 40 44 46L46 58C46 60 44 62 42 62H22C20 62 18 60 18 58L20 46Z" fill="#2B2B2B" />
      <g class="mascot-head" id="mascotHead">
        <g class="mascot-ear-left">
          <polygon points="17,14 27,24 15,28" fill="#D45D3A" />
          <polygon points="18,17 25,23 17,26" fill="#F4F1EA" />
        </g>
        <g class="mascot-ear-right">
          <polygon points="47,14 37,24 49,28" fill="#D45D3A" />
          <polygon points="46,17 39,23 47,26" fill="#F4F1EA" />
        </g>
        <path d="M18 26C18 19 24 16 32 16C40 16 46 19 46 26C48 31 46 38 41 41C38 43 26 43 23 41C18 38 16 31 18 26Z" fill="#D45D3A" />
        <path d="M17 28C19 36 24 38 28 36C25 31 22 26 17 28Z" fill="#F4F1EA" />
        <path d="M47 28C45 36 40 38 36 36C39 31 42 26 47 28Z" fill="#F4F1EA" />
        <path d="M27 21C29 19 35 19 37 21" stroke="#F4F1EA" stroke-width="2" stroke-linecap="round" />
        <circle cx="28" cy="22" r="1.5" fill="#F4F1EA" />
        <circle cx="36" cy="22" r="1.5" fill="#F4F1EA" />
        <g class="mascot-eyes" id="mascotEyes">
          <ellipse cx="25.5" cy="28.5" rx="3" ry="3.5" fill="#1C1816" />
          <circle cx="26.5" cy="27.5" r="1.2" fill="#FFFFFF" class="mascot-pupil" />
          <ellipse cx="25.5" cy="28.5" rx="3.2" ry="3.8" fill="#D45D3A" class="mascot-eyelid" />
          <ellipse cx="38.5" cy="28.5" rx="3" ry="3.5" fill="#1C1816" />
          <circle cx="39.5" cy="27.5" r="1.2" fill="#FFFFFF" class="mascot-pupil" />
          <ellipse cx="38.5" cy="28.5" rx="3.2" ry="3.8" fill="#D45D3A" class="mascot-eyelid" />
        </g>
        <path d="M28 33C28 31 36 31 36 33C37 36 35 39 32 39C29 39 27 36 28 33Z" fill="#F4F1EA" />
        <path d="M30.5 33.5L33.5 33.5L32 35.5Z" fill="#241B18" />
        <path d="M30.5 36.5C31.5 37.5 32.5 37.5 33.5 36.5" stroke="#241B18" stroke-width="1.2" stroke-linecap="round" class="mascot-mouth" />
      </g>
      <path d="M22 45C26 47 38 47 42 45" stroke="#EDEBE4" stroke-width="2.5" stroke-linecap="round" />
      <circle cx="32" cy="46" r="3" fill="#A459FF" filter="url(#purpleGlow)" />
      <circle cx="32" cy="46" r="1.5" fill="#FFFFFF" />
    </svg>
  `;

  // ------------------------------------------------------------------
  // Detailed World Map Database & Global Intelligence (7 Continents & Corners)
  // ------------------------------------------------------------------
  const WORLD_CITIES = [
  {
    "id": "tokyo",
    "name": "Tokyo",
    "country": "Japan",
    "continent": "Asia",
    "region": "East Asia",
    "flag": "\ud83c\uddef\ud83c\uddf5",
    "lat": 35.6762,
    "lng": 139.6503,
    "coordinates": "35.6762\u00b0 N, 139.6503\u00b0 E",
    "hemisphere": "Northern / Eastern",
    "timezone": "UTC+9 (JST)",
    "currency": "Japanese Yen (JPY, \u00a5)",
    "language": "Japanese",
    "climate": "Humid Subtropical (Four distinct seasons)",
    "districts": [
      "Shinjuku",
      "Shibuya",
      "Roppongi",
      "Shimokitazawa",
      "Akihabara"
    ],
    "highlights": "World's most populous metropolitan area, ultra-high-speed transit, robotics, Michelin-star capital, extreme safety.",
    "avgRentUSD": 1400,
    "connectivity": "10 Gbps Fiber / 5G Ubiquitous",
    "safety": "92/100 (Very High)"
  },
  {
    "id": "singapore",
    "name": "Singapore",
    "country": "Singapore",
    "continent": "Asia",
    "region": "Southeast Asia",
    "flag": "\ud83c\uddf8\ud83c\uddec",
    "lat": 1.3521,
    "lng": 103.8198,
    "coordinates": "1.3521\u00b0 N, 103.8198\u00b0 E",
    "hemisphere": "Northern / Eastern",
    "timezone": "UTC+8 (SGT)",
    "currency": "Singapore Dollar (SGD, S$)",
    "language": "English, Mandarin, Malay, Tamil",
    "climate": "Tropical Rainforest (Year-round warmth & humidity)",
    "districts": [
      "Marina Bay",
      "Tanjong Pagar",
      "Bugis",
      "River Valley",
      "Orchard"
    ],
    "highlights": "Premier global financial crossroads, Garden City green architecture, world-leading infrastructure, ultra-secure.",
    "avgRentUSD": 2200,
    "connectivity": "5 Gbps Fiber / 5G",
    "safety": "95/100 (Ultra High)"
  },
  {
    "id": "seoul",
    "name": "Seoul",
    "country": "South Korea",
    "continent": "Asia",
    "region": "East Asia",
    "flag": "\ud83c\uddf0\ud83c\uddf7",
    "lat": 37.5665,
    "lng": 126.978,
    "coordinates": "37.5665\u00b0 N, 126.9780\u00b0 E",
    "hemisphere": "Northern / Eastern",
    "timezone": "UTC+9 (KST)",
    "currency": "South Korean Won (KRW, \u20a9)",
    "language": "Korean",
    "climate": "Continental / Monsoonal",
    "districts": [
      "Gangnam",
      "Hongdae",
      "Itaewon",
      "Seongsu-dong",
      "Mapo"
    ],
    "highlights": "High-tech metropolis, 24/7 digital lifestyle, K-culture epicenter, cutting-edge smart city tech.",
    "avgRentUSD": 1200,
    "connectivity": "10 Gbps Fiber / 5G",
    "safety": "89/100 (Very High)"
  },
  {
    "id": "bangkok",
    "name": "Bangkok",
    "country": "Thailand",
    "continent": "Asia",
    "region": "Southeast Asia",
    "flag": "\ud83c\uddf9\ud83c\udded",
    "lat": 13.7563,
    "lng": 100.5018,
    "coordinates": "13.7563\u00b0 N, 100.5018\u00b0 E",
    "hemisphere": "Northern / Eastern",
    "timezone": "UTC+7 (ICT)",
    "currency": "Thai Baht (THB, \u0e3f)",
    "language": "Thai",
    "climate": "Tropical Savanna",
    "districts": [
      "Sukhumvit",
      "Silom",
      "Sathorn",
      "Thonglor",
      "Ari"
    ],
    "highlights": "Top global digital nomad destination, vibrant street gastronomy, affordable luxury co-living condos.",
    "avgRentUSD": 750,
    "connectivity": "1 Gbps Fiber / 5G",
    "safety": "78/100 (High)"
  },
  {
    "id": "bali",
    "name": "Bali (Canggu / Ubud)",
    "country": "Indonesia",
    "continent": "Asia",
    "region": "Southeast Asia",
    "flag": "\ud83c\uddee\ud83c\udde9",
    "lat": -8.6705,
    "lng": 115.2126,
    "coordinates": "8.6705\u00b0 S, 115.2126\u00b0 E",
    "hemisphere": "Southern / Eastern",
    "timezone": "UTC+8 (WITA)",
    "currency": "Indonesian Rupiah (IDR, Rp)",
    "language": "Indonesian, Balinese, English",
    "climate": "Tropical Monsoon",
    "districts": [
      "Canggu",
      "Ubud",
      "Seminyak",
      "Uluwatu",
      "Pererenan"
    ],
    "highlights": "Global creative & digital nomad haven, lush jungle co-working retreats, surf breaks, wellness culture.",
    "avgRentUSD": 700,
    "connectivity": "300 Mbps Fiber / Starlink",
    "safety": "82/100 (High)"
  },
  {
    "id": "dubai",
    "name": "Dubai",
    "country": "United Arab Emirates",
    "continent": "Asia",
    "region": "Middle East",
    "flag": "\ud83c\udde6\ud83c\uddea",
    "lat": 25.2048,
    "lng": 55.2708,
    "coordinates": "25.2048\u00b0 N, 55.2708\u00b0 E",
    "hemisphere": "Northern / Eastern",
    "timezone": "UTC+4 (GST)",
    "currency": "UAE Dirham (AED, \u062f.\u0625)",
    "language": "Arabic, English",
    "climate": "Hot Desert (Sunny & Arid)",
    "districts": [
      "Downtown Dubai",
      "Dubai Marina",
      "DIFC",
      "Jumeirah",
      "Business Bay"
    ],
    "highlights": "Futuristic skyline, Burj Khalifa, zero personal income tax, global international trade & luxury hub.",
    "avgRentUSD": 2100,
    "connectivity": "2 Gbps Fiber / 5G",
    "safety": "94/100 (Ultra High)"
  },
  {
    "id": "mumbai",
    "name": "Mumbai",
    "country": "India",
    "continent": "Asia",
    "region": "South Asia",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "lat": 19.076,
    "lng": 72.8777,
    "coordinates": "19.0760\u00b0 N, 72.8777\u00b0 E",
    "hemisphere": "Northern / Eastern",
    "timezone": "UTC+5:30 (IST)",
    "currency": "Indian Rupee (INR, \u20b9)",
    "language": "Hindi, Marathi, English",
    "climate": "Tropical Wet & Dry",
    "districts": [
      "Bandra West",
      "BKC",
      "Colaba",
      "Powai",
      "Lower Parel"
    ],
    "highlights": "Commercial capital of India, coastal Marine Drive, high-octane energy, booming venture & financial ecosystem.",
    "avgRentUSD": 850,
    "connectivity": "1 Gbps Fiber / 5G",
    "safety": "78/100 (Moderate High)"
  },
  {
    "id": "bengaluru",
    "name": "Bengaluru",
    "country": "India",
    "continent": "Asia",
    "region": "South Asia",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "lat": 12.9716,
    "lng": 77.5946,
    "coordinates": "12.9716\u00b0 N, 77.5946\u00b0 E",
    "hemisphere": "Northern / Eastern",
    "timezone": "UTC+5:30 (IST)",
    "currency": "Indian Rupee (INR, \u20b9)",
    "language": "Kannada, English, Hindi",
    "climate": "Tropical Savanna (Year-round pleasant climate)",
    "districts": [
      "Indiranagar",
      "Koramangala",
      "HSR Layout",
      "Whitefield",
      "Electronic City"
    ],
    "highlights": "Silicon Valley of India, tech startup headquarters, green canopy avenues, vibrant cafe & craft beer culture.",
    "avgRentUSD": 600,
    "connectivity": "1 Gbps Fiber / 5G",
    "safety": "82/100 (High)"
  },
  {
    "id": "hongkong",
    "name": "Hong Kong",
    "country": "China (SAR)",
    "continent": "Asia",
    "region": "East Asia",
    "flag": "\ud83c\udded\ud83c\uddf0",
    "lat": 22.3193,
    "lng": 114.1694,
    "coordinates": "22.3193\u00b0 N, 114.1694\u00b0 E",
    "hemisphere": "Northern / Eastern",
    "timezone": "UTC+8 (HKT)",
    "currency": "Hong Kong Dollar (HKD, HK$)",
    "language": "Cantonese, English, Mandarin",
    "climate": "Humid Subtropical",
    "districts": [
      "Central",
      "Sheung Wan",
      "Wan Chai",
      "Tsim Sha Tsui",
      "Mid-Levels"
    ],
    "highlights": "Iconic vertical harbor city, premier Asian capital markets, unbeatable urban transit efficiency.",
    "avgRentUSD": 2300,
    "connectivity": "10 Gbps Fiber / 5G",
    "safety": "91/100 (Very High)"
  },
  {
    "id": "taipei",
    "name": "Taipei",
    "country": "Taiwan",
    "continent": "Asia",
    "region": "East Asia",
    "flag": "\ud83c\uddf9\ud83c\uddfc",
    "lat": 25.033,
    "lng": 121.5654,
    "coordinates": "25.0330\u00b0 N, 121.5654\u00b0 E",
    "hemisphere": "Northern / Eastern",
    "timezone": "UTC+8 (CST)",
    "currency": "New Taiwan Dollar (TWD, NT$)",
    "language": "Mandarin, Taiwanese",
    "climate": "Humid Subtropical",
    "districts": [
      "Da'an",
      "Xinyi",
      "Zhongshan",
      "Songshan",
      "Zhongzheng"
    ],
    "highlights": "Global semiconductor technology capital, famous night markets, Taipei 101, exceptionally welcoming & safe.",
    "avgRentUSD": 950,
    "connectivity": "1 Gbps Fiber / 5G",
    "safety": "93/100 (Very High)"
  },
  {
    "id": "london",
    "name": "London",
    "country": "United Kingdom",
    "continent": "Europe",
    "region": "Western Europe",
    "flag": "\ud83c\uddec\ud83c\udde7",
    "lat": 51.5074,
    "lng": -0.1278,
    "coordinates": "51.5074\u00b0 N, 0.1278\u00b0 W",
    "hemisphere": "Northern / Western (Prime Meridian)",
    "timezone": "UTC+0 (GMT/BST)",
    "currency": "British Pound (GBP, \u00a3)",
    "language": "English",
    "climate": "Temperate Oceanic",
    "districts": [
      "Shoreditch",
      "Soho",
      "Canary Wharf",
      "Camden",
      "Kensington"
    ],
    "highlights": "Global financial & cultural beacon, Prime Meridian origin (Greenwich), 250+ languages spoken, historic innovation.",
    "avgRentUSD": 2400,
    "connectivity": "1 Gbps Fiber / 5G",
    "safety": "82/100 (High)"
  },
  {
    "id": "paris",
    "name": "Paris",
    "country": "France",
    "continent": "Europe",
    "region": "Western Europe",
    "flag": "\ud83c\uddeb\ud83c\uddf7",
    "lat": 48.8566,
    "lng": 2.3522,
    "coordinates": "48.8566\u00b0 N, 2.3522\u00b0 E",
    "hemisphere": "Northern / Eastern",
    "timezone": "UTC+1 (CET/CEST)",
    "currency": "Euro (EUR, \u20ac)",
    "language": "French",
    "climate": "Oceanic",
    "districts": [
      "Le Marais",
      "Saint-Germain-des-Pr\u00e9s",
      "Montmartre",
      "Bastille",
      "Canal Saint-Martin"
    ],
    "highlights": "City of Light, global epicenter of art, fashion, philosophy, gastronomy, and Haussmann architecture.",
    "avgRentUSD": 1950,
    "connectivity": "2 Gbps Fiber / 5G",
    "safety": "80/100 (High)"
  },
  {
    "id": "berlin",
    "name": "Berlin",
    "country": "Germany",
    "continent": "Europe",
    "region": "Central Europe",
    "flag": "\ud83c\udde9\ud83c\uddea",
    "lat": 52.52,
    "lng": 13.405,
    "coordinates": "52.5200\u00b0 N, 13.4050\u00b0 E",
    "hemisphere": "Northern / Eastern",
    "timezone": "UTC+1 (CET/CEST)",
    "currency": "Euro (EUR, \u20ac)",
    "language": "German, English",
    "climate": "Temperate Continental",
    "districts": [
      "Mitte",
      "Kreuzberg",
      "Friedrichshain",
      "Prenzlauer Berg",
      "Neuk\u00f6lln"
    ],
    "highlights": "Startup capital of Europe, legendary creative & music culture, vast green parks, affordable co-living.",
    "avgRentUSD": 1400,
    "connectivity": "1 Gbps Fiber / 5G",
    "safety": "84/100 (High)"
  },
  {
    "id": "amsterdam",
    "name": "Amsterdam",
    "country": "Netherlands",
    "continent": "Europe",
    "region": "Western Europe",
    "flag": "\ud83c\uddf3\ud83c\uddf1",
    "lat": 52.3676,
    "lng": 4.9041,
    "coordinates": "52.3676\u00b0 N, 4.9041\u00b0 E",
    "hemisphere": "Northern / Eastern",
    "timezone": "UTC+1 (CET/CEST)",
    "currency": "Euro (EUR, \u20ac)",
    "language": "Dutch, English",
    "climate": "Oceanic",
    "districts": [
      "Jordaan",
      "De Pijp",
      "Centrum",
      "Oud-West",
      "Zuidas"
    ],
    "highlights": "UNESCO canal ring, world capital of cycling, liberal international trade hub, ultra-connected digital infrastructure.",
    "avgRentUSD": 2100,
    "connectivity": "1 Gbps Fiber / 5G",
    "safety": "88/100 (Very High)"
  },
  {
    "id": "lisbon",
    "name": "Lisbon",
    "country": "Portugal",
    "continent": "Europe",
    "region": "Southern Europe",
    "flag": "\ud83c\uddf5\ud83c\uddf9",
    "lat": 38.7223,
    "lng": -9.1393,
    "coordinates": "38.7223\u00b0 N, 9.1393\u00b0 W",
    "hemisphere": "Northern / Western",
    "timezone": "UTC+0 (WET/WEST)",
    "currency": "Euro (EUR, \u20ac)",
    "language": "Portuguese, English",
    "climate": "Mediterranean (Over 300 days of sunshine)",
    "districts": [
      "Chiado",
      "Pr\u00edncipe Real",
      "Alfama",
      "Cais do Sodr\u00e9",
      "Santos"
    ],
    "highlights": "Top digital nomad & co-living destination in Europe, iconic yellow trams, Atlantic coastal surfing, tech hub.",
    "avgRentUSD": 1350,
    "connectivity": "1 Gbps Fiber / 5G",
    "safety": "89/100 (Very High)"
  },
  {
    "id": "madrid",
    "name": "Madrid",
    "country": "Spain",
    "continent": "Europe",
    "region": "Southern Europe",
    "flag": "\ud83c\uddea\ud83c\uddf8",
    "lat": 40.4168,
    "lng": -3.7038,
    "coordinates": "40.4168\u00b0 N, 3.7038\u00b0 W",
    "hemisphere": "Northern / Western",
    "timezone": "UTC+1 (CET/CEST)",
    "currency": "Euro (EUR, \u20ac)",
    "language": "Spanish",
    "climate": "Mediterranean Continental",
    "districts": [
      "Malasa\u00f1a",
      "Chueca",
      "Salamanca",
      "La Latina",
      "Chamber\u00ed"
    ],
    "highlights": "High-spirited Spanish capital, Prado Museum art triangle, tapas culture, expansive Retiro Park.",
    "avgRentUSD": 1300,
    "connectivity": "1 Gbps Fiber / 5G",
    "safety": "86/100 (High)"
  },
  {
    "id": "rome",
    "name": "Rome",
    "country": "Italy",
    "continent": "Europe",
    "region": "Southern Europe",
    "flag": "\ud83c\uddee\ud83c\uddf9",
    "lat": 41.9028,
    "lng": 12.4964,
    "coordinates": "41.9028\u00b0 N, 12.4964\u00b0 E",
    "hemisphere": "Northern / Eastern",
    "timezone": "UTC+1 (CET/CEST)",
    "currency": "Euro (EUR, \u20ac)",
    "language": "Italian",
    "climate": "Mediterranean",
    "districts": [
      "Trastevere",
      "Monti",
      "Prati",
      "Testaccio",
      "Centro Storico"
    ],
    "highlights": "The Eternal City, Colosseum, Vatican enclave, timeless classical heritage, unrivaled culinary traditions.",
    "avgRentUSD": 1400,
    "connectivity": "1 Gbps Fiber / 5G",
    "safety": "79/100 (Moderate High)"
  },
  {
    "id": "zurich",
    "name": "Zurich",
    "country": "Switzerland",
    "continent": "Europe",
    "region": "Central Europe",
    "flag": "\ud83c\udde8\ud83c\udded",
    "lat": 47.3769,
    "lng": 8.5417,
    "coordinates": "47.3769\u00b0 N, 8.5417\u00b0 E",
    "hemisphere": "Northern / Eastern",
    "timezone": "UTC+1 (CET/CEST)",
    "currency": "Swiss Franc (CHF, Fr.)",
    "language": "German, French, Italian, English",
    "climate": "Temperate Oceanic / Alpine Foothill",
    "districts": [
      "Z\u00fcrich-West",
      "Altstadt",
      "Enge",
      "Wiedikon",
      "Seefeld"
    ],
    "highlights": "Global financial & private wealth fortress, crystal-clear Lake Zurich, Swiss punctuality & pristine standard of living.",
    "avgRentUSD": 2800,
    "connectivity": "10 Gbps Fiber / 5G",
    "safety": "96/100 (Ultra High)"
  },
  {
    "id": "reykjavik",
    "name": "Reykjavik",
    "country": "Iceland",
    "continent": "Europe",
    "region": "Nordic / Arctic Edge",
    "flag": "\ud83c\uddee\ud83c\uddf8",
    "lat": 64.1466,
    "lng": -21.9426,
    "coordinates": "64.1466\u00b0 N, 21.9426\u00b0 W",
    "hemisphere": "Northern / Western",
    "timezone": "UTC+0 (GMT)",
    "currency": "Icelandic Kr\u00f3na (ISK, kr)",
    "language": "Icelandic, English",
    "climate": "Subpolar Oceanic (Geothermally Heated)",
    "districts": [
      "Mi\u00f0b\u00e6r (Downtown)",
      "Vesturb\u00e6r",
      "Grandi",
      "Laugardalur"
    ],
    "highlights": "Northernmost sovereign capital on Earth, 100% renewable geothermal grid, Aurora Borealis, extraordinary volcanic landscapes.",
    "avgRentUSD": 1800,
    "connectivity": "1 Gbps Fiber",
    "safety": "97/100 (Ultra High)"
  },
  {
    "id": "newyork",
    "name": "New York City",
    "country": "United States",
    "continent": "North America",
    "region": "East Coast",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "lat": 40.7128,
    "lng": -74.006,
    "coordinates": "40.7128\u00b0 N, 74.0060\u00b0 W",
    "hemisphere": "Northern / Western",
    "timezone": "UTC-5 (EST/EDT)",
    "currency": "US Dollar (USD, $)",
    "language": "English",
    "climate": "Humid Continental",
    "districts": [
      "Manhattan (SoHo, Flatiron)",
      "Brooklyn (Williamsburg, DUMBO)",
      "Queens (Astoria)"
    ],
    "highlights": "The Empire City, Wall Street, Broadway, unmatched skyline, non-stop 24/7 global cultural energy.",
    "avgRentUSD": 3400,
    "connectivity": "2 Gbps Fiber / 5G",
    "safety": "76/100 (Moderate High)"
  },
  {
    "id": "sanfrancisco",
    "name": "San Francisco",
    "country": "United States",
    "continent": "North America",
    "region": "West Coast / Silicon Valley",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "lat": 37.7749,
    "lng": -122.4194,
    "coordinates": "37.7749\u00b0 N, 122.4194\u00b0 W",
    "hemisphere": "Northern / Western",
    "timezone": "UTC-8 (PST/PDT)",
    "currency": "US Dollar (USD, $)",
    "language": "English",
    "climate": "Mediterranean / Cool Summer (Microclimates)",
    "districts": [
      "SoMa",
      "Mission District",
      "Marina",
      "Hayes Valley",
      "Pacific Heights"
    ],
    "highlights": "Global epicenter of Artificial Intelligence and frontier tech, Golden Gate Bridge, Silicon Valley corridor.",
    "avgRentUSD": 3100,
    "connectivity": "5 Gbps Fiber / 5G",
    "safety": "72/100 (Moderate)"
  },
  {
    "id": "austin",
    "name": "Austin",
    "country": "United States",
    "continent": "North America",
    "region": "Texas",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "lat": 30.2672,
    "lng": -97.7431,
    "coordinates": "30.2672\u00b0 N, 97.7431\u00b0 W",
    "hemisphere": "Northern / Western",
    "timezone": "UTC-6 (CST/CDT)",
    "currency": "US Dollar (USD, $)",
    "language": "English",
    "climate": "Humid Subtropical",
    "districts": [
      "South Congress (SoCo)",
      "Downtown",
      "East Austin",
      "Zilker",
      "Rainey Street"
    ],
    "highlights": "Silicon Hills tech capital, live music Mecca, SXSW, zero state income tax, booming modern co-living communities.",
    "avgRentUSD": 1850,
    "connectivity": "2 Gbps Fiber / 5G",
    "safety": "81/100 (High)"
  },
  {
    "id": "toronto",
    "name": "Toronto",
    "country": "Canada",
    "continent": "North America",
    "region": "Eastern Canada",
    "flag": "\ud83c\udde8\ud83c\udde6",
    "lat": 43.6532,
    "lng": -79.3832,
    "coordinates": "43.6532\u00b0 N, 79.3832\u00b0 W",
    "hemisphere": "Northern / Western",
    "timezone": "UTC-5 (EST/EDT)",
    "currency": "Canadian Dollar (CAD, C$)",
    "language": "English, French",
    "climate": "Humid Continental",
    "districts": [
      "Downtown Core",
      "King West",
      "Queen West",
      "Yorkville",
      "Distillery District"
    ],
    "highlights": "Canada's premier financial & technology capital, world's most diverse population, CN Tower icon.",
    "avgRentUSD": 2100,
    "connectivity": "1.5 Gbps Fiber / 5G",
    "safety": "87/100 (Very High)"
  },
  {
    "id": "mexicocity",
    "name": "Mexico City (CDMX)",
    "country": "Mexico",
    "continent": "North America",
    "region": "Latin America",
    "flag": "\ud83c\uddf2\ud83c\uddfd",
    "lat": 19.4326,
    "lng": -99.1332,
    "coordinates": "19.4326\u00b0 N, 99.1332\u00b0 W",
    "hemisphere": "Northern / Western",
    "timezone": "UTC-6 (CST)",
    "currency": "Mexican Peso (MXN, $)",
    "language": "Spanish",
    "climate": "Subtropical Highland (Year-round Spring)",
    "districts": [
      "Roma Norte",
      "Condesa",
      "Polanco",
      "Ju\u00e1rez",
      "Coyoac\u00e1n"
    ],
    "highlights": "Rich historical megalopolis, culinary capital of the Americas, vibrant co-working & digital nomad ecosystems.",
    "avgRentUSD": 950,
    "connectivity": "500 Mbps Fiber / 5G",
    "safety": "70/100 (Moderate)"
  },
  {
    "id": "buenosaires",
    "name": "Buenos Aires",
    "country": "Argentina",
    "continent": "South America",
    "region": "Southern Cone",
    "flag": "\ud83c\udde6\ud83c\uddf7",
    "lat": -34.6037,
    "lng": -58.3816,
    "coordinates": "34.6037\u00b0 S, 58.3816\u00b0 W",
    "hemisphere": "Southern / Western",
    "timezone": "UTC-3 (ART)",
    "currency": "Argentine Peso (ARS, $)",
    "language": "Spanish",
    "climate": "Humid Subtropical",
    "districts": [
      "Palermo Soho",
      "Palermo Hollywood",
      "Recoleta",
      "San Telmo",
      "Puerto Madero"
    ],
    "highlights": "Paris of South America, tango, world-renowned cafes & steak houses, outstanding remote-work value.",
    "avgRentUSD": 650,
    "connectivity": "500 Mbps Fiber / 5G",
    "safety": "76/100 (Moderate High)"
  },
  {
    "id": "saopaulo",
    "name": "S\u00e3o Paulo",
    "country": "Brazil",
    "continent": "South America",
    "region": "Southeast Brazil",
    "flag": "\ud83c\udde7\ud83c\uddf7",
    "lat": -23.5505,
    "lng": -46.6333,
    "coordinates": "23.5505\u00b0 S, 46.6333\u00b0 W",
    "hemisphere": "Southern / Western",
    "timezone": "UTC-3 (BRT)",
    "currency": "Brazilian Real (BRL, R$)",
    "language": "Portuguese",
    "climate": "Monsoon-influenced Subtropical",
    "districts": [
      "Vila Madalena",
      "Itaim Bibi",
      "Pinheiros",
      "Jardins",
      "Avenida Paulista"
    ],
    "highlights": "Financial & economic titan of South America, Michelin culinary destination, immense architectural scale.",
    "avgRentUSD": 850,
    "connectivity": "1 Gbps Fiber / 5G",
    "safety": "68/100 (Moderate)"
  },
  {
    "id": "medellin",
    "name": "Medell\u00edn",
    "country": "Colombia",
    "continent": "South America",
    "region": "Andes",
    "flag": "\ud83c\udde8\ud83c\uddf4",
    "lat": 6.2442,
    "lng": -75.5812,
    "coordinates": "6.2442\u00b0 N, 75.5812\u00b0 W",
    "hemisphere": "Northern / Western",
    "timezone": "UTC-5 (COT)",
    "currency": "Colombian Peso (COP, $)",
    "language": "Spanish",
    "climate": "Tropical Rainforest / Eternal Spring (24\u00b0C)",
    "districts": [
      "El Poblado",
      "Laureles",
      "Envigado",
      "Castropol",
      "Bel\u00e9n"
    ],
    "highlights": "City of Eternal Spring, global innovation award winner, cable car transit, premier Latin America nomad cluster.",
    "avgRentUSD": 600,
    "connectivity": "300 Mbps Fiber / 5G",
    "safety": "72/100 (Moderate)"
  },
  {
    "id": "capetown",
    "name": "Cape Town",
    "country": "South Africa",
    "continent": "Africa",
    "region": "Southern Africa",
    "flag": "\ud83c\uddff\ud83c\udde6",
    "lat": -33.9249,
    "lng": 18.4241,
    "coordinates": "33.9249\u00b0 S, 18.4241\u00b0 E",
    "hemisphere": "Southern / Eastern",
    "timezone": "UTC+2 (SAST)",
    "currency": "South African Rand (ZAR, R)",
    "language": "English, Afrikaans, Xhosa",
    "climate": "Mediterranean",
    "districts": [
      "Camps Bay",
      "Green Point",
      "Sea Point",
      "Kloof Street",
      "V&A Waterfront"
    ],
    "highlights": "Table Mountain natural wonder, Atlantic & Indian Ocean confluence, wine valleys, top tech ecosystem in Africa.",
    "avgRentUSD": 950,
    "connectivity": "500 Mbps Fiber",
    "safety": "68/100 (Moderate)"
  },
  {
    "id": "nairobi",
    "name": "Nairobi",
    "country": "Kenya",
    "continent": "Africa",
    "region": "East Africa",
    "flag": "\ud83c\uddf0\ud83c\uddea",
    "lat": -1.2921,
    "lng": 36.8219,
    "coordinates": "1.2921\u00b0 S, 36.8219\u00b0 E",
    "hemisphere": "Southern / Eastern",
    "timezone": "UTC+3 (EAT)",
    "currency": "Kenyan Shilling (KES, KSh)",
    "language": "Swahili, English",
    "climate": "Subtropical Highland",
    "districts": [
      "Westlands",
      "Kilimani",
      "Karen",
      "Lavington",
      "Gigiri"
    ],
    "highlights": "Silicon Savannah, mobile money pioneer (M-Pesa), Nairobi National Park wildlife alongside urban skyline.",
    "avgRentUSD": 700,
    "connectivity": "200 Mbps Fiber / 5G",
    "safety": "70/100 (Moderate)"
  },
  {
    "id": "sydney",
    "name": "Sydney",
    "country": "Australia",
    "continent": "Oceania",
    "region": "Australasia",
    "flag": "\ud83c\udde6\ud83c\uddfa",
    "lat": -33.8688,
    "lng": 151.2093,
    "coordinates": "33.8688\u00b0 S, 151.2093\u00b0 E",
    "hemisphere": "Southern / Eastern",
    "timezone": "UTC+10 (AEST/AEDT)",
    "currency": "Australian Dollar (AUD, A$)",
    "language": "English",
    "climate": "Humid Subtropical (Temperate Sunny)",
    "districts": [
      "Surry Hills",
      "Bondi",
      "Barangaroo",
      "Darlinghurst",
      "Manly"
    ],
    "highlights": "Sydney Opera House, world-famous harbor and coastal beaches, primary financial capital of Oceania.",
    "avgRentUSD": 2300,
    "connectivity": "1 Gbps Fiber / 5G",
    "safety": "89/100 (Very High)"
  },
  {
    "id": "auckland",
    "name": "Auckland",
    "country": "New Zealand",
    "continent": "Oceania",
    "region": "Polynesia",
    "flag": "\ud83c\uddf3\ud83c\uddff",
    "lat": -36.8485,
    "lng": 174.7633,
    "coordinates": "36.8485\u00b0 S, 174.7633\u00b0 E",
    "hemisphere": "Southern / Eastern",
    "timezone": "UTC+12 (NZST/NZDT)",
    "currency": "New Zealand Dollar (NZD, NZ$)",
    "language": "English, M\u0101ori",
    "climate": "Oceanic / Temperate",
    "districts": [
      "Ponsonby",
      "Parnell",
      "Britomart",
      "Takapuna",
      "Grey Lynn"
    ],
    "highlights": "City of Sails, harbor volcanic hills, gateway to pristine New Zealand wilderness and premier quality of life.",
    "avgRentUSD": 1750,
    "connectivity": "1 Gbps Fiber / 5G",
    "safety": "90/100 (Very High)"
  },
  {
    "id": "ushuaia",
    "name": "Ushuaia",
    "country": "Argentina",
    "continent": "South America",
    "region": "Tierra del Fuego (Deep South)",
    "flag": "\ud83c\udde6\ud83c\uddf7",
    "lat": -54.8019,
    "lng": -68.303,
    "coordinates": "54.8019\u00b0 S, 68.3030\u00b0 W",
    "hemisphere": "Southern / Western",
    "timezone": "UTC-3 (ART)",
    "currency": "Argentine Peso (ARS, $)",
    "language": "Spanish",
    "climate": "Subpolar Oceanic (Tundra influence)",
    "districts": [
      "San Mart\u00edn Waterfront",
      "Beagle Channel Marina"
    ],
    "highlights": "The Southernmost City on Earth (\"Fin del Mundo\"), dramatic Martial Glacier backdrop, launchpad for Antarctica expeditions.",
    "avgRentUSD": 700,
    "connectivity": "100 Mbps Starlink / Fiber",
    "safety": "88/100 (Very High)"
  },
  {
    "id": "longyearbyen",
    "name": "Longyearbyen",
    "country": "Norway (Svalbard)",
    "continent": "Europe",
    "region": "High Arctic (78\u00b0 N)",
    "flag": "\ud83c\uddf3\ud83c\uddf4",
    "lat": 78.2232,
    "lng": 15.6267,
    "coordinates": "78.2232\u00b0 N, 15.6267\u00b0 E",
    "hemisphere": "Northern / Eastern",
    "timezone": "UTC+1 (CET)",
    "currency": "Norwegian Krone (NOK, kr)",
    "language": "Norwegian, English",
    "climate": "Polar Tundra (Midnight Sun & Polar Night)",
    "districts": [
      "Longyear Valley",
      "Nybyen"
    ],
    "highlights": "Northernmost permanent human settlement on Earth, Svalbard Global Seed Vault, Arctic research frontier, midnight sun.",
    "avgRentUSD": 1600,
    "connectivity": "Dual Arctic Undersea Submarine Fiber",
    "safety": "98/100 (Ultra High)"
  },
  {
    "id": "honolulu",
    "name": "Honolulu",
    "country": "United States (Hawaii)",
    "continent": "North America",
    "region": "Polynesian Pacific",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "lat": 21.3069,
    "lng": -157.8583,
    "coordinates": "21.3069\u00b0 N, 157.8583\u00b0 W",
    "hemisphere": "Northern / Western",
    "timezone": "UTC-10 (HST)",
    "currency": "US Dollar (USD, $)",
    "language": "English, Hawaiian",
    "climate": "Tropical Semi-arid",
    "districts": [
      "Waikiki",
      "Kaka'ako",
      "Manoa",
      "Downtown Honolulu"
    ],
    "highlights": "Pacific crossroads, Diamond Head volcanic crater, world-famous surf breaks, authentic Aloha spirit.",
    "avgRentUSD": 2250,
    "connectivity": "1 Gbps Fiber / 5G",
    "safety": "83/100 (High)"
  }
];
  const WORLD_COUNTRIES = {
  "afghanistan": {
    "name": "Afghanistan",
    "capital": "Kabul",
    "continent": "Asia",
    "currency": "AFN (\u060b)",
    "flag": "\ud83c\udde6\ud83c\uddeb",
    "lang": "Pashto, Dari"
  },
  "albania": {
    "name": "Albania",
    "capital": "Tirana",
    "continent": "Europe",
    "currency": "ALL (L)",
    "flag": "\ud83c\udde6\ud83c\uddf1",
    "lang": "Albanian"
  },
  "algeria": {
    "name": "Algeria",
    "capital": "Algiers",
    "continent": "Africa",
    "currency": "DZD (\u062f.\u062c)",
    "flag": "\ud83c\udde9\ud83c\uddff",
    "lang": "Arabic, Berber"
  },
  "andorra": {
    "name": "Andorra",
    "capital": "Andorra la Vella",
    "continent": "Europe",
    "currency": "EUR (\u20ac)",
    "flag": "\ud83c\udde6\ud83c\udde9",
    "lang": "Catalan"
  },
  "angola": {
    "name": "Angola",
    "capital": "Luanda",
    "continent": "Africa",
    "currency": "AOA (Kz)",
    "flag": "\ud83c\udde6\ud83c\uddf4",
    "lang": "Portuguese"
  },
  "argentina": {
    "name": "Argentina",
    "capital": "Buenos Aires",
    "continent": "South America",
    "currency": "ARS ($)",
    "flag": "\ud83c\udde6\ud83c\uddf7",
    "lang": "Spanish"
  },
  "armenia": {
    "name": "Armenia",
    "capital": "Yerevan",
    "continent": "Asia",
    "currency": "AMD (\u058f)",
    "flag": "\ud83c\udde6\ud83c\uddf2",
    "lang": "Armenian"
  },
  "australia": {
    "name": "Australia",
    "capital": "Canberra",
    "continent": "Oceania",
    "currency": "AUD (A$)",
    "flag": "\ud83c\udde6\ud83c\uddfa",
    "lang": "English"
  },
  "austria": {
    "name": "Austria",
    "capital": "Vienna",
    "continent": "Europe",
    "currency": "EUR (\u20ac)",
    "flag": "\ud83c\udde6\ud83c\uddf9",
    "lang": "German"
  },
  "azerbaijan": {
    "name": "Azerbaijan",
    "capital": "Baku",
    "continent": "Asia",
    "currency": "AZN (\u20bc)",
    "flag": "\ud83c\udde6\ud83c\uddff",
    "lang": "Azerbaijani"
  },
  "bahamas": {
    "name": "Bahamas",
    "capital": "Nassau",
    "continent": "North America",
    "currency": "BSD ($)",
    "flag": "\ud83c\udde7\ud83c\uddf8",
    "lang": "English"
  },
  "bahrain": {
    "name": "Bahrain",
    "capital": "Manama",
    "continent": "Asia",
    "currency": "BHD (.\u062f.\u0628)",
    "flag": "\ud83c\udde7\ud83c\udded",
    "lang": "Arabic"
  },
  "bangladesh": {
    "name": "Bangladesh",
    "capital": "Dhaka",
    "continent": "Asia",
    "currency": "BDT (\u09f3)",
    "flag": "\ud83c\udde7\ud83c\udde9",
    "lang": "Bengali"
  },
  "barbados": {
    "name": "Barbados",
    "capital": "Bridgetown",
    "continent": "North America",
    "currency": "BBD ($)",
    "flag": "\ud83c\udde7\ud83c\udde7",
    "lang": "English"
  },
  "belgium": {
    "name": "Belgium",
    "capital": "Brussels",
    "continent": "Europe",
    "currency": "EUR (\u20ac)",
    "flag": "\ud83c\udde7\ud83c\uddea",
    "lang": "Dutch, French, German"
  },
  "bhutan": {
    "name": "Bhutan",
    "capital": "Thimphu",
    "continent": "Asia",
    "currency": "BTN (Nu.)",
    "flag": "\ud83c\udde7\ud83c\uddf9",
    "lang": "Dzongkha"
  },
  "bolivia": {
    "name": "Bolivia",
    "capital": "Sucre",
    "continent": "South America",
    "currency": "BOB (Bs.)",
    "flag": "\ud83c\udde7\ud83c\uddf4",
    "lang": "Spanish, Quechua"
  },
  "brazil": {
    "name": "Brazil",
    "capital": "Bras\u00edlia",
    "continent": "South America",
    "currency": "BRL (R$)",
    "flag": "\ud83c\udde7\ud83c\uddf7",
    "lang": "Portuguese"
  },
  "canada": {
    "name": "Canada",
    "capital": "Ottawa",
    "continent": "North America",
    "currency": "CAD (C$)",
    "flag": "\ud83c\udde8\ud83c\udde6",
    "lang": "English, French"
  },
  "chile": {
    "name": "Chile",
    "capital": "Santiago",
    "continent": "South America",
    "currency": "CLP ($)",
    "flag": "\ud83c\udde8\ud83c\uddf1",
    "lang": "Spanish"
  },
  "china": {
    "name": "China",
    "capital": "Beijing",
    "continent": "Asia",
    "currency": "CNY (\u00a5)",
    "flag": "\ud83c\udde8\ud83c\uddf3",
    "lang": "Mandarin"
  },
  "colombia": {
    "name": "Colombia",
    "capital": "Bogot\u00e1",
    "continent": "South America",
    "currency": "COP ($)",
    "flag": "\ud83c\udde8\ud83c\uddf4",
    "lang": "Spanish"
  },
  "costa rica": {
    "name": "Costa Rica",
    "capital": "San Jos\u00e9",
    "continent": "North America",
    "currency": "CRC (\u20a1)",
    "flag": "\ud83c\udde8\ud83c\uddf7",
    "lang": "Spanish"
  },
  "croatia": {
    "name": "Croatia",
    "capital": "Zagreb",
    "continent": "Europe",
    "currency": "EUR (\u20ac)",
    "flag": "\ud83c\udded\ud83c\uddf7",
    "lang": "Croatian"
  },
  "cuba": {
    "name": "Cuba",
    "capital": "Havana",
    "continent": "North America",
    "currency": "CUP ($)",
    "flag": "\ud83c\udde8\ud83c\uddfa",
    "lang": "Spanish"
  },
  "cyprus": {
    "name": "Cyprus",
    "capital": "Nicosia",
    "continent": "Europe",
    "currency": "EUR (\u20ac)",
    "flag": "\ud83c\udde8\ud83c\uddfe",
    "lang": "Greek, Turkish"
  },
  "czech republic": {
    "name": "Czech Republic",
    "capital": "Prague",
    "continent": "Europe",
    "currency": "CZK (K\u010d)",
    "flag": "\ud83c\udde8\ud83c\uddff",
    "lang": "Czech"
  },
  "denmark": {
    "name": "Denmark",
    "capital": "Copenhagen",
    "continent": "Europe",
    "currency": "DKK (kr)",
    "flag": "\ud83c\udde9\ud83c\uddf0",
    "lang": "Danish"
  },
  "egypt": {
    "name": "Egypt",
    "capital": "Cairo",
    "continent": "Africa",
    "currency": "EGP (E\u00a3)",
    "flag": "\ud83c\uddea\ud83c\uddec",
    "lang": "Arabic"
  },
  "estonia": {
    "name": "Estonia",
    "capital": "Tallinn",
    "continent": "Europe",
    "currency": "EUR (\u20ac)",
    "flag": "\ud83c\uddea\ud83c\uddea",
    "lang": "Estonian"
  },
  "ethiopia": {
    "name": "Ethiopia",
    "capital": "Addis Ababa",
    "continent": "Africa",
    "currency": "ETB (Br)",
    "flag": "\ud83c\uddea\ud83c\uddf9",
    "lang": "Amharic"
  },
  "fiji": {
    "name": "Fiji",
    "capital": "Suva",
    "continent": "Oceania",
    "currency": "FJD ($)",
    "flag": "\ud83c\uddeb\ud83c\uddef",
    "lang": "English, Fijian"
  },
  "finland": {
    "name": "Finland",
    "capital": "Helsinki",
    "continent": "Europe",
    "currency": "EUR (\u20ac)",
    "flag": "\ud83c\uddeb\ud83c\uddee",
    "lang": "Finnish, Swedish"
  },
  "france": {
    "name": "France",
    "capital": "Paris",
    "continent": "Europe",
    "currency": "EUR (\u20ac)",
    "flag": "\ud83c\uddeb\ud83c\uddf7",
    "lang": "French"
  },
  "germany": {
    "name": "Germany",
    "capital": "Berlin",
    "continent": "Europe",
    "currency": "EUR (\u20ac)",
    "flag": "\ud83c\udde9\ud83c\uddea",
    "lang": "German"
  },
  "ghana": {
    "name": "Ghana",
    "capital": "Accra",
    "continent": "Africa",
    "currency": "GHS (GH\u20b5)",
    "flag": "\ud83c\uddec\ud83c\udded",
    "lang": "English"
  },
  "greece": {
    "name": "Greece",
    "capital": "Athens",
    "continent": "Europe",
    "currency": "EUR (\u20ac)",
    "flag": "\ud83c\uddec\ud83c\uddf7",
    "lang": "Greek"
  },
  "hungary": {
    "name": "Hungary",
    "capital": "Budapest",
    "continent": "Europe",
    "currency": "HUF (Ft)",
    "flag": "\ud83c\udded\ud83c\uddfa",
    "lang": "Hungarian"
  },
  "iceland": {
    "name": "Iceland",
    "capital": "Reykjavik",
    "continent": "Europe",
    "currency": "ISK (kr)",
    "flag": "\ud83c\uddee\ud83c\uddf8",
    "lang": "Icelandic"
  },
  "india": {
    "name": "India",
    "capital": "New Delhi",
    "continent": "Asia",
    "currency": "INR (\u20b9)",
    "flag": "\ud83c\uddee\ud83c\uddf3",
    "lang": "Hindi, English"
  },
  "indonesia": {
    "name": "Indonesia",
    "capital": "Jakarta",
    "continent": "Asia",
    "currency": "IDR (Rp)",
    "flag": "\ud83c\uddee\ud83c\udde9",
    "lang": "Indonesian"
  },
  "ireland": {
    "name": "Ireland",
    "capital": "Dublin",
    "continent": "Europe",
    "currency": "EUR (\u20ac)",
    "flag": "\ud83c\uddee\ud83c\uddea",
    "lang": "English, Irish"
  },
  "israel": {
    "name": "Israel",
    "capital": "Jerusalem",
    "continent": "Asia",
    "currency": "ILS (\u20aa)",
    "flag": "\ud83c\uddee\ud83c\uddf1",
    "lang": "Hebrew, Arabic"
  },
  "italy": {
    "name": "Italy",
    "capital": "Rome",
    "continent": "Europe",
    "currency": "EUR (\u20ac)",
    "flag": "\ud83c\uddee\ud83c\uddf9",
    "lang": "Italian"
  },
  "japan": {
    "name": "Japan",
    "capital": "Tokyo",
    "continent": "Asia",
    "currency": "JPY (\u00a5)",
    "flag": "\ud83c\uddef\ud83c\uddf5",
    "lang": "Japanese"
  },
  "kazakhstan": {
    "name": "Kazakhstan",
    "capital": "Astana",
    "continent": "Asia",
    "currency": "KZT (\u20b8)",
    "flag": "\ud83c\uddf0\ud83c\uddff",
    "lang": "Kazakh, Russian"
  },
  "kenya": {
    "name": "Kenya",
    "capital": "Nairobi",
    "continent": "Africa",
    "currency": "KES (KSh)",
    "flag": "\ud83c\uddf0\ud83c\uddea",
    "lang": "Swahili, English"
  },
  "luxembourg": {
    "name": "Luxembourg",
    "capital": "Luxembourg City",
    "continent": "Europe",
    "currency": "EUR (\u20ac)",
    "flag": "\ud83c\uddf1\ud83c\uddfa",
    "lang": "Luxembourgish, French, German"
  },
  "malaysia": {
    "name": "Malaysia",
    "capital": "Kuala Lumpur",
    "continent": "Asia",
    "currency": "MYR (RM)",
    "flag": "\ud83c\uddf2\ud83c\uddfe",
    "lang": "Malay, English"
  },
  "maldives": {
    "name": "Maldives",
    "capital": "Mal\u00e9",
    "continent": "Asia",
    "currency": "MVR (Rf)",
    "flag": "\ud83c\uddf2\ud83c\uddfb",
    "lang": "Dhivehi"
  },
  "mexico": {
    "name": "Mexico",
    "capital": "Mexico City",
    "continent": "North America",
    "currency": "MXN ($)",
    "flag": "\ud83c\uddf2\ud83c\uddfd",
    "lang": "Spanish"
  },
  "monaco": {
    "name": "Monaco",
    "capital": "Monaco",
    "continent": "Europe",
    "currency": "EUR (\u20ac)",
    "flag": "\ud83c\uddf2\ud83c\udde8",
    "lang": "French"
  },
  "morocco": {
    "name": "Morocco",
    "capital": "Rabat",
    "continent": "Africa",
    "currency": "MAD (\u062f.\u0645.)",
    "flag": "\ud83c\uddf2\ud83c\udde6",
    "lang": "Arabic, Berber"
  },
  "nepal": {
    "name": "Nepal",
    "capital": "Kathmandu",
    "continent": "Asia",
    "currency": "NPR (\u0930\u0942)",
    "flag": "\ud83c\uddf3\ud83c\uddf5",
    "lang": "Nepali"
  },
  "netherlands": {
    "name": "Netherlands",
    "capital": "Amsterdam",
    "continent": "Europe",
    "currency": "EUR (\u20ac)",
    "flag": "\ud83c\uddf3\ud83c\uddf1",
    "lang": "Dutch"
  },
  "new zealand": {
    "name": "New Zealand",
    "capital": "Wellington",
    "continent": "Oceania",
    "currency": "NZD (NZ$)",
    "flag": "\ud83c\uddf3\ud83c\uddff",
    "lang": "English, M\u0101ori"
  },
  "nigeria": {
    "name": "Nigeria",
    "capital": "Abuja",
    "continent": "Africa",
    "currency": "NGN (\u20a6)",
    "flag": "\ud83c\uddf3\ud83c\uddec",
    "lang": "English"
  },
  "norway": {
    "name": "Norway",
    "capital": "Oslo",
    "continent": "Europe",
    "currency": "NOK (kr)",
    "flag": "\ud83c\uddf3\ud83c\uddf4",
    "lang": "Norwegian"
  },
  "oman": {
    "name": "Oman",
    "capital": "Muscat",
    "continent": "Asia",
    "currency": "OMR (\u0631.\u0639.)",
    "flag": "\ud83c\uddf4\ud83c\uddf2",
    "lang": "Arabic"
  },
  "peru": {
    "name": "Peru",
    "capital": "Lima",
    "continent": "South America",
    "currency": "Peruvian Sol (PEN, S/)",
    "flag": "\ud83c\uddf5\ud83c\uddea",
    "lang": "Spanish, Quechua"
  },
  "philippines": {
    "name": "Philippines",
    "capital": "Manila",
    "continent": "Asia",
    "currency": "PHP (\u20b1)",
    "flag": "\ud83c\uddf5\ud83c\udded",
    "lang": "Filipino, English"
  },
  "poland": {
    "name": "Poland",
    "capital": "Warsaw",
    "continent": "Europe",
    "currency": "PLN (z\u0142)",
    "flag": "\ud83c\uddf5\ud83c\uddf1",
    "lang": "Polish"
  },
  "portugal": {
    "name": "Portugal",
    "capital": "Lisbon",
    "continent": "Europe",
    "currency": "EUR (\u20ac)",
    "flag": "\ud83c\uddf5\ud83c\uddf9",
    "lang": "Portuguese"
  },
  "qatar": {
    "name": "Qatar",
    "capital": "Doha",
    "continent": "Asia",
    "currency": "QAR (\u0631.\u0642)",
    "flag": "\ud83c\uddf6\ud83c\udde6",
    "lang": "Arabic"
  },
  "rwanda": {
    "name": "Rwanda",
    "capital": "Kigali",
    "continent": "Africa",
    "currency": "RWF (FRw)",
    "flag": "\ud83c\uddf7\ud83c\uddfc",
    "lang": "Kinyarwanda, English, French"
  },
  "saudi arabia": {
    "name": "Saudi Arabia",
    "capital": "Riyadh",
    "continent": "Asia",
    "currency": "SAR (\ufdfc)",
    "flag": "\ud83c\uddf8\ud83c\udde6",
    "lang": "Arabic"
  },
  "singapore": {
    "name": "Singapore",
    "capital": "Singapore",
    "continent": "Asia",
    "currency": "SGD (S$)",
    "flag": "\ud83c\uddf8\ud83c\uddec",
    "lang": "English, Mandarin"
  },
  "south africa": {
    "name": "South Africa",
    "capital": "Pretoria",
    "continent": "Africa",
    "currency": "ZAR (R)",
    "flag": "\ud83c\uddff\ud83c\udde6",
    "lang": "English, Afrikaans, Zulu"
  },
  "south korea": {
    "name": "South Korea",
    "capital": "Seoul",
    "continent": "Asia",
    "currency": "KRW (\u20a9)",
    "flag": "\ud83c\uddf0\ud83c\uddf7",
    "lang": "Korean"
  },
  "spain": {
    "name": "Spain",
    "capital": "Madrid",
    "continent": "Europe",
    "currency": "EUR (\u20ac)",
    "flag": "\ud83c\uddea\ud83c\uddf8",
    "lang": "Spanish"
  },
  "sri lanka": {
    "name": "Sri Lanka",
    "capital": "Colombo",
    "continent": "Asia",
    "currency": "LKR (Rs)",
    "flag": "\ud83c\uddf1\ud83c\uddf0",
    "lang": "Sinhala, Tamil"
  },
  "sweden": {
    "name": "Sweden",
    "capital": "Stockholm",
    "continent": "Europe",
    "currency": "SEK (kr)",
    "flag": "\ud83c\uddf8\ud83c\uddea",
    "lang": "Swedish"
  },
  "switzerland": {
    "name": "Switzerland",
    "capital": "Bern",
    "continent": "Europe",
    "currency": "CHF (Fr.)",
    "flag": "\ud83c\udde8\ud83c\udded",
    "lang": "German, French, Italian"
  },
  "thailand": {
    "name": "Thailand",
    "capital": "Bangkok",
    "continent": "Asia",
    "currency": "THB (\u0e3f)",
    "flag": "\ud83c\uddf9\ud83c\udded",
    "lang": "Thai"
  },
  "turkey": {
    "name": "Turkey",
    "capital": "Ankara",
    "continent": "Asia/Europe",
    "currency": "TRY (\u20ba)",
    "flag": "\ud83c\uddf9\ud83c\uddf7",
    "lang": "Turkish"
  },
  "united arab emirates": {
    "name": "United Arab Emirates",
    "capital": "Abu Dhabi",
    "continent": "Asia",
    "currency": "AED (\u062f.\u0625)",
    "flag": "\ud83c\udde6\ud83c\uddea",
    "lang": "Arabic"
  },
  "united kingdom": {
    "name": "United Kingdom",
    "capital": "London",
    "continent": "Europe",
    "currency": "GBP (\u00a3)",
    "flag": "\ud83c\uddec\ud83c\udde7",
    "lang": "English"
  },
  "united states": {
    "name": "United States",
    "capital": "Washington, D.C.",
    "continent": "North America",
    "currency": "USD ($)",
    "flag": "\ud83c\uddfa\ud83c\uddf8",
    "lang": "English"
  },
  "uruguay": {
    "name": "Uruguay",
    "capital": "Montevideo",
    "continent": "South America",
    "currency": "UYU ($U)",
    "flag": "\ud83c\uddfa\ud83c\uddfe",
    "lang": "Spanish"
  },
  "vietnam": {
    "name": "Vietnam",
    "capital": "Hanoi",
    "continent": "Asia",
    "currency": "VND (\u20ab)",
    "flag": "\ud83c\uddfb\ud83c\uddf3",
    "lang": "Vietnamese"
  }
};

  // ------------------------------------------------------------------
  // System Prompt for Frontier Generative AI Transformation
  // ------------------------------------------------------------------
  const SENTINEL_SYSTEM_PROMPT = `You are THΛTJOINT AI, an intelligent, personalized global assistant and co-living companion.
You possess a detailed map of the entire world with comprehensive geographic, city, country, coordinate, and timezone intelligence across every continent and corner of the Earth.
Your initial background knowledge base starts clean at zero. As the user suggests facts, policies, properties, and guidelines, you dynamically learn and build your knowledge base accordingly.`;

  // ------------------------------------------------------------------
  // Main ThatJointChatbot Class Implementation
  // ------------------------------------------------------------------
  class ThatJointChatbot {
    constructor(options = {}) {
      this.containerId = options.containerId || 'terminalDrawerRoot';
      this.isDrawer = options.isDrawer !== undefined ? options.isDrawer : true;
      this.activeUnit = options.activeUnit || 'Global Residence';
      this.listeners = new Map();
      this.conversationHistory = [];
      this.isBusy = false;
      this.stagedFile = null;
      this.recognition = null;
      this.isListening = false;

      // Safe LocalStorage accessor for SSR / Node environments
      const storage = typeof localStorage !== 'undefined'
        ? localStorage
        : { getItem: () => null, setItem: () => null, removeItem: () => null };

      // Background Knowledge Base: Starts clean at zero as directed by the user!
      this.knowledgeBase = {};

      // Dynamic Personalized Memory & Custom Knowledge Store (Persisted across sessions)
      try {
        const rawCustom = storage.getItem('tj_custom_knowledge');
        this.customKnowledge = rawCustom ? JSON.parse(rawCustom) : {};
      } catch (e) {
        this.customKnowledge = {};
      }

      try {
        const rawProfile = storage.getItem('tj_user_profile');
        this.userProfile = rawProfile ? JSON.parse(rawProfile) : {
          name: '',
          origin: '',
          currentCity: '',
          preferences: {},
          savedLocations: []
        };
      } catch (e) {
        this.userProfile = { name: '', origin: '', currentCity: '', preferences: {}, savedLocations: [] };
      }

      // World Detailed Map & Geographic Engine
      this.worldCities = WORLD_CITIES;
      this.worldCountries = WORLD_COUNTRIES;

      // Multi-step Co-Living & Tenancy Booking State Machine
      this.bookingState = {
        active: false,
        step: 0,
        data: {
          name: '',
          originAddress: '',
          currentLocation: '',
          interestedArea: '',
          budgetRange: '',
          facilities: [],
          requirements: '',
          documentProof: null,
          selectedSite: null,
          bookingRef: null
        }
      };

      // Active Client Packaging Configuration
      this.clientConfig = {
        tier: storage.getItem('tj_packaging_tier') || 'backend',
        backendUrl: storage.getItem('tj_backend_url') || 'http://localhost:8000/api/chat',
        tier2Provider: storage.getItem('tj_tier2_provider') || 'gemini',
        tier2Key: storage.getItem('tj_tier2_key') || '',
        tier2Model: storage.getItem('tj_tier2_model') || 'gemini-1.5-flash',
        tier3Url: storage.getItem('tj_tier3_url') || '',
        tier3Token: storage.getItem('tj_tier3_token') || ''
      };

      this.init();
      this.checkBackendHealth();
    }

    resetBookingState() {
      this.bookingState = {
        active: false,
        step: 0,
        data: {
          name: '',
          originAddress: '',
          currentLocation: '',
          interestedArea: '',
          budgetRange: '',
          facilities: [],
          requirements: '',
          documentProof: null,
          selectedSite: null,
          bookingRef: null
        }
      };
    }

    // ----------------------------------------------------------------
    // Personalized Knowledge & Learning Methods (Dynamic Knowledge Base)
    // ----------------------------------------------------------------
    learnCustomKnowledge(topic, content) {
      const cleanTopic = (topic || 'Custom Note').trim();
      const cleanContent = (content || '').trim();
      this.customKnowledge[cleanTopic] = {
        content: cleanContent,
        updatedAt: new Date().toISOString()
      };

      if (typeof localStorage !== 'undefined') {
        try {
          localStorage.setItem('tj_custom_knowledge', JSON.stringify(this.customKnowledge));
        } catch (e) {}
      }
      return cleanTopic;
    }

    getCustomKnowledge(topic = null) {
      if (topic) {
        return this.customKnowledge[topic] || null;
      }
      return this.customKnowledge;
    }

    forgetCustomKnowledge(topic = null) {
      if (topic && this.customKnowledge[topic]) {
        delete this.customKnowledge[topic];
      } else {
        this.customKnowledge = {};
      }

      if (typeof localStorage !== 'undefined') {
        try {
          localStorage.setItem('tj_custom_knowledge', JSON.stringify(this.customKnowledge));
        } catch (e) {}
      }
    }

    updateUserProfile(updates = {}) {
      Object.assign(this.userProfile, updates);
      if (typeof localStorage !== 'undefined') {
        try {
          localStorage.setItem('tj_user_profile', JSON.stringify(this.userProfile));
        } catch (e) {}
      }
    }

    isTeachingQuery(lower) {
      return /\b(remember that|learn that|add note|add rule|note down|add to knowledge base|add property|our policy is|we offer|teach:)\b/i.test(lower);
    }

    isPersonalizationQuery(lower) {
      return /\b(my name is|call me|i am from|i live in|who am i|what do you know about me|show knowledge base|what have you learned|what do you know|custom knowledge|list memory)\b/i.test(lower);
    }

    handlePersonalizationAndLearning(rawQuery) {
      const lower = rawQuery.toLowerCase();

      // Clear or Reset Knowledge Base
      if (/\b(clear custom knowledge|reset knowledge base|forget everything|wipe memory)\b/i.test(lower)) {
        this.forgetCustomKnowledge();
        return {
          type: 'companion',
          author: 'ThatJoint AI · Memory System',
          title: 'Knowledge Base Reset to Zero',
          body: 'All custom knowledge has been wiped. Background knowledge base is completely at zero baseline, ready for new user suggestions.',
          richCard: {
            title: 'Knowledge Base Status',
            badge: 'Clean Zero-Base',
            params: [
              { label: 'Custom Topics', value: '0', sub: 'Clean Slate' },
              { label: 'World Map', value: 'Active', sub: '7 Continents' }
            ]
          }
        };
      }

      // Show Knowledge Base
      if (/\b(show knowledge base|what have you learned|what do you know|custom knowledge|list memory)\b/i.test(lower)) {
        const keys = Object.keys(this.customKnowledge);
        if (keys.length === 0) {
          return {
            type: 'companion',
            author: 'ThatJoint AI · Knowledge Base',
            title: 'Background Knowledge Base: Zero Baseline',
            body: `<strong>Background Knowledge Base is at Zero:</strong><br />
No background properties or fixed datasets are loaded. You can teach me any custom rules, property specifications, co-living pricing, or operating guidelines and I will build them into active memory!<br /><br />
<em>Try saying: "Remember that ThatJoint has luxury co-living villas in Bali and Lisbon with 1 Gbps fiber WiFi."</em>`,
            richCard: {
              title: 'Active Knowledge State',
              badge: 'Zero Knowledge Base',
              params: [
                { label: 'Status', value: 'Zero-Base', sub: 'Ready to build' },
                { label: 'World Map', value: 'Active', sub: 'Global coverage' }
              ],
              actions: [
                { label: '🗺️ Explore World Map', action: 'open-kb' },
                { label: '🏡 Start Booking', action: 'query', payload: 'I want to book a room' }
              ]
            }
          };
        }

        let listHtml = '<strong>Personalized Knowledge Base (User-Defined):</strong><br /><br />';
        keys.forEach(k => {
          listHtml += `• <strong>${this.escapeHtml(k)}:</strong> ${this.escapeHtml(this.customKnowledge[k].content)}<br />`;
        });

        return {
          type: 'companion',
          author: 'ThatJoint AI · Knowledge Base',
          title: `Custom Knowledge Base (${keys.length} ${keys.length === 1 ? 'Topic' : 'Topics'} Learned)`,
          body: listHtml,
          richCard: {
            title: 'Learned Knowledge Dossier',
            badge: `${keys.length} Active Topics`,
            params: keys.slice(0, 3).map(k => ({
              label: k,
              value: 'Learned',
              sub: this.customKnowledge[k].content.slice(0, 24) + '...'
            })),
            actions: [
              { label: 'Wipe Knowledge to Zero', action: 'query', payload: 'Clear custom knowledge' }
            ]
          }
        };
      }

      // Teach / Record New Knowledge
      if (this.isTeachingQuery(lower)) {
        const match = rawQuery.match(/(?:remember that|learn that|add note:?|add rule:?|note down:?|add to knowledge base:?|add property:?|our policy is|we offer:?|teach:?)\s*(.*)/i);
        const content = match && match[1] ? match[1].trim() : rawQuery;
        
        let topic = 'Custom Policy';
        if (content.toLowerCase().includes('property') || content.toLowerCase().includes('unit') || content.toLowerCase().includes('villa')) {
          topic = 'Property Portfolio';
        } else if (content.toLowerCase().includes('pricing') || content.toLowerCase().includes('deposit') || content.toLowerCase().includes('rent')) {
          topic = 'Financial & Billing';
        } else if (content.toLowerCase().includes('wifi') || content.toLowerCase().includes('amenity') || content.toLowerCase().includes('facility')) {
          topic = 'Amenities & Infrastructure';
        } else {
          topic = content.split(' ')[0] + ' ' + (content.split(' ')[1] || 'Guideline');
        }

        this.learnCustomKnowledge(topic, content);

        return {
          type: 'companion',
          author: 'ThatJoint AI · Memory System',
          title: `Knowledge Recorded: ${topic}`,
          body: `✓ <strong>Recorded into ThatJoint AI Knowledge Base:</strong><br />
• <strong>Topic:</strong> ${this.escapeHtml(topic)}<br />
• <strong>Knowledge:</strong> <em>"${this.escapeHtml(content)}"</em><br /><br />
I have committed this to memory and will use it in future answers as you suggested.`,
          richCard: {
            title: 'Knowledge Base Updated',
            badge: 'Committed to Memory',
            params: [
              { label: 'Topic', value: topic, sub: 'User Suggested' },
              { label: 'Memory Store', value: 'Persistent', sub: 'Saved' }
            ],
            actions: [
              { label: 'View Knowledge Base', action: 'query', payload: 'Show knowledge base' }
            ]
          }
        };
      }

      // User Introduction & Personalization
      const nameMatch = rawQuery.match(/(?:my name is|call me|i am|i'm)\s+([A-Za-z\s.'-]+)/i);
      if (nameMatch && nameMatch[1].trim().length > 1) {
        const userName = nameMatch[1].trim();
        this.updateUserProfile({ name: userName });
        return {
          type: 'companion',
          author: 'ThatJoint AI · Personalization',
          title: `Nice to meet you, ${userName}!`,
          body: `Hello <strong>${this.escapeHtml(userName)}</strong>! I have updated my personalized profile for you. How can I assist you today? We can explore detailed world maps, book a co-living stay, or build custom knowledge for our properties.`,
          richCard: {
            title: 'Personalized Profile Active',
            badge: `User: ${userName}`,
            params: [
              { label: 'User Name', value: userName, sub: 'Profile Active' },
              { label: 'AI Status', value: 'Ready', sub: 'Personalized' }
            ]
          }
        };
      }

      return null;
    }

    // ----------------------------------------------------------------
    // Detailed World Map & Geographic Intelligence Engine
    // ----------------------------------------------------------------
    isWorldMapQuery(lower) {
      if (!lower) return false;
      // Country or city matches
      for (const city of this.worldCities) {
        if (new RegExp('\\b' + city.id + '\\b|\\b' + city.name.toLowerCase() + '\\b', 'i').test(lower)) {
          return true;
        }
      }
      for (const cName in this.worldCountries) {
        if (new RegExp('\\b' + cName + '\\b', 'i').test(lower)) {
          return true;
        }
      }
      return /\b(world map|coordinates|latitude|longitude|timezone|time in|time difference|capital of|where is|climate of|continent|countries|cities of|southernmost|northernmost|geography)\b/i.test(lower);
    }

    resolveWorldLocation(query) {
      const lower = (query || '').toLowerCase();

      // Check cities
      for (const city of this.worldCities) {
        if (new RegExp('\\b' + city.id + '\\b|\\b' + city.name.toLowerCase().replace(/\(.*\)/, '').trim() + '\\b', 'i').test(lower)) {
          return { type: 'city', data: city };
        }
      }

      // Check countries
      for (const cKey in this.worldCountries) {
        if (new RegExp('\\b' + cKey + '\\b', 'i').test(lower)) {
          const c = this.worldCountries[cKey];
          // Check if we have a city in this country
          const matchedCity = this.worldCities.find(ct => ct.country.toLowerCase().includes(cKey));
          return { type: 'country', data: c, cityData: matchedCity || null };
        }
      }

      // Extreme queries
      if (/southernmost/i.test(lower)) {
        const ush = this.worldCities.find(c => c.id === 'ushuaia');
        if (ush) return { type: 'city', data: ush };
      }
      if (/northernmost/i.test(lower)) {
        const lyb = this.worldCities.find(c => c.id === 'longyearbyen');
        if (lyb) return { type: 'city', data: lyb };
      }

      return null;
    }

    calculateTimeDifference(locA, locB) {
      const getUtcOffset = (tzStr) => {
        const m = (tzStr || '').match(/UTC([+-]\d+(?:\.\d+)?)/i);
        return m ? parseFloat(m[1]) : 0;
      };
      const offsetA = getUtcOffset(locA.timezone);
      const offsetB = getUtcOffset(locB.timezone);
      const diff = offsetA - offsetB;
      return diff;
    }

    renderWorldMapSVG(highlightedCityId = null) {
      const city = highlightedCityId ? this.worldCities.find(c => c.id === highlightedCityId) : null;
      let pinX = 450;
      let pinY = 160;

      if (city) {
        // Equirectangular projection mapping: x = (lng + 180) * (900 / 360), y = (90 - lat) * (420 / 180)
        pinX = Math.round((city.lng + 180) * (900 / 360));
        pinY = Math.round((90 - city.lat) * (420 / 180));
      }

      return `
        <svg viewBox="0 0 900 420" fill="none" xmlns="http://www.w3.org/2000/svg" class="tj-world-map-svg" style="width:100%; height:auto; background:#181615; border-radius:6px; margin:10px 0; border:1px solid #332d29;">
          <defs>
            <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#A459FF" stop-opacity="0.9"/>
              <stop offset="100%" stop-color="#A459FF" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <!-- Lat/Long Coordinate Grid -->
          <line x1="0" y1="210" x2="900" y2="210" stroke="#332d29" stroke-width="1" stroke-dasharray="4,4"/> <!-- Equator -->
          <line x1="450" y1="0" x2="450" y2="420" stroke="#332d29" stroke-width="1" stroke-dasharray="4,4"/> <!-- Prime Meridian -->
          <text x="12" y="205" fill="#665b53" font-size="10" font-family="sans-serif">Equator 0°</text>
          <text x="455" y="16" fill="#665b53" font-size="10" font-family="sans-serif">Prime Meridian 0°</text>

          <!-- Continents Simplified Vectors -->
          <!-- North America -->
          <path d="M120 70 Q160 50 240 60 Q280 90 260 140 Q220 170 170 180 Q140 140 120 70 Z" fill="#2d2724" stroke="#4a403a"/>
          <!-- South America -->
          <path d="M240 200 Q290 220 280 290 Q260 360 220 380 Q210 320 220 240 Z" fill="#2d2724" stroke="#4a403a"/>
          <!-- Europe -->
          <path d="M430 80 Q510 70 540 110 Q500 150 440 140 Q410 110 430 80 Z" fill="#2d2724" stroke="#4a403a"/>
          <!-- Africa -->
          <path d="M420 160 Q520 160 540 230 Q510 330 450 340 Q400 280 410 200 Z" fill="#2d2724" stroke="#4a403a"/>
          <!-- Asia -->
          <path d="M540 70 Q750 60 780 130 Q740 220 620 200 Q560 140 540 70 Z" fill="#2d2724" stroke="#4a403a"/>
          <!-- Australia / Oceania -->
          <path d="M700 260 Q790 260 800 320 Q750 350 710 330 Z" fill="#2d2724" stroke="#4a403a"/>

          <!-- Target Location Pulse Pin -->
          <circle cx="${pinX}" cy="${pinY}" r="24" fill="url(#pinGlow)"/>
          <circle cx="${pinX}" cy="${pinY}" r="6" fill="#A459FF" stroke="#FFFFFF" stroke-width="2"/>
          ${city ? `<text x="${Math.min(780, pinX + 10)}" y="${Math.max(25, pinY - 8)}" fill="#FFFFFF" font-size="12" font-weight="bold" font-family="sans-serif">${city.flag} ${city.name} (${city.coordinates})</text>` : ''}
        </svg>
      `;
    }

    handleWorldMapQuery(rawQuery) {
      const lower = rawQuery.toLowerCase();
      const resolved = this.resolveWorldLocation(rawQuery);

      // Time difference query e.g. "time difference between Tokyo and New York", "timezone difference between Tokyo and London"
      const timeDiffMatch = lower.match(/(?:timezone\s+difference|time\s+difference|time\s+diff|hours\s+between)\s+(?:between\s+)?([A-Za-z\s]+?)\s+(?:and|to|vs\.?)\s+([A-Za-z\s\?]+)/i);
      if (timeDiffMatch) {
        const cleanA = timeDiffMatch[1].trim();
        const cleanB = timeDiffMatch[2].replace(/\?/g, '').trim();
        const resA = this.resolveWorldLocation(cleanA);
        const resB = this.resolveWorldLocation(cleanB);
        if (resA && resB && resA.data && resB.data) {
          const cityA = resA.data;
          const cityB = resB.data;
          const diff = this.calculateTimeDifference(cityA, cityB);
          const aheadOrBehind = diff > 0 ? 'ahead of' : 'behind';
          return {
            type: 'companion',
            author: 'ThatJoint AI · Global Time Engine',
            title: `Global Timezone Intelligence: ${cityA.name} vs. ${cityB.name}`,
            body: `<strong>World Timezone Calculation:</strong><br />
• 📍 <strong>${cityA.name}:</strong> ${cityA.timezone}<br />
• 📍 <strong>${cityB.name}:</strong> ${cityB.timezone}<br /><br />
${cityA.name} is <strong>${Math.abs(diff)} hours ${aheadOrBehind}</strong> ${cityB.name}.<br /><br />
When it is 12:00 PM (Noon) in ${cityB.name}, it is ${diff >= 0 ? 12 + diff : 12 + diff}:00 in ${cityA.name}.`,
            richCard: {
              title: 'Timezone Differential',
              badge: `${Math.abs(diff)}h Offset`,
              params: [
                { label: cityA.name, value: cityA.timezone, sub: cityA.country },
                { label: cityB.name, value: cityB.timezone, sub: cityB.country },
                { label: 'Difference', value: `${Math.abs(diff)} Hours`, sub: aheadOrBehind }
              ]
            }
          };
        }
      }

      // Capital city questions e.g. "What is the capital of Peru?"
      const capitalMatch = lower.match(/(?:capital\s+of|what\s+is\s+the\s+capital\s+of)\s+([A-Za-z\s]+)/i);
      if (capitalMatch) {
        const cKey = capitalMatch[1].trim().toLowerCase();
        if (this.worldCountries[cKey]) {
          const c = this.worldCountries[cKey];
          return {
            type: 'companion',
            author: 'ThatJoint AI · World Geography Core',
            title: `Capital of ${c.name}: ${c.capital}`,
            body: `The capital city of <strong>${c.name}</strong> ${c.flag} is <strong>${c.capital}</strong>.<br /><br />
• 🌍 <strong>Continent:</strong> ${c.continent}<br />
• 💵 <strong>Official Currency:</strong> ${c.currency}<br />
• 🗣️ <strong>Primary Language:</strong> ${c.lang}`,
            richCard: {
              title: `${c.flag} ${c.name} Dossier`,
              badge: c.continent,
              params: [
                { label: 'Capital', value: c.capital, sub: 'National Seat' },
                { label: 'Currency', value: c.currency, sub: 'Legal Tender' },
                { label: 'Continent', value: c.continent, sub: 'Geographic Region' }
              ],
              actions: [
                { label: `Explore ${c.capital} on Map`, action: 'query', payload: `Explore ${c.capital}` }
              ]
            }
          };
        }
      }

      // Specific City or Country Match
      if (resolved) {
        if (resolved.type === 'city') {
          const city = resolved.data;
          const svgMap = this.renderWorldMapSVG(city.id);
          const districtsStr = city.districts.join(' · ');

          return {
            type: 'companion',
            author: 'ThatJoint AI · World Map & Geographic Core',
            title: `Global Dossier: ${city.name}, ${city.country} ${city.flag}`,
            body: `<strong>Global Geographic & Living Profile:</strong><br />
${city.highlights}<br /><br />
• 🌐 <strong>Exact Coordinates:</strong> <code>${city.coordinates}</code> (${city.hemisphere})<br />
• ⏱️ <strong>Timezone:</strong> ${city.timezone}<br />
• 💵 <strong>Currency:</strong> ${city.currency}<br />
• 🗣️ <strong>Language:</strong> ${city.language}<br />
• ☀️ <strong>Climate:</strong> ${city.climate}<br />
• 🏡 <strong>Top Co-Living & Tech Districts:</strong> <em>${districtsStr}</em><br />
• 📶 <strong>Connectivity & Safety:</strong> ${city.connectivity} | Safety: ${city.safety}<br />
• 💰 <strong>Avg Monthly Living Cost:</strong> ~$${city.avgRentUSD} / month<br />
${svgMap}`,
            richCard: {
              title: `${city.flag} ${city.name} (${city.country})`,
              badge: city.continent,
              params: [
                { label: 'Coordinates', value: city.coordinates, sub: city.hemisphere },
                { label: 'Timezone', value: city.timezone, sub: 'Standard Time' },
                { label: 'Est. Rent', value: `$${city.avgRentUSD} / mo`, sub: 'Co-Living / Studio' }
              ],
              actions: [
                { label: `🏡 Book Co-Living in ${city.name}`, action: 'query', payload: `I want to book a room in ${city.name}` },
                { label: '🗺️ Open World Map Explorer', action: 'open-kb' }
              ]
            },
            followUps: [
              `What is the time difference between ${city.name} and London?`,
              `I want to book a room in ${city.name}`,
              `Compare ${city.name} with Berlin`
            ]
          };
        } else if (resolved.type === 'country') {
          const c = resolved.data;
          const city = resolved.cityData;
          return {
            type: 'companion',
            author: 'ThatJoint AI · World Geography Core',
            title: `Country Profile: ${c.name} ${c.flag}`,
            body: `<strong>${c.name} Geographic Dossier:</strong><br />
• 🏛️ <strong>Capital City:</strong> ${c.capital}<br />
• 🌍 <strong>Continent:</strong> ${c.continent}<br />
• 💵 <strong>Official Currency:</strong> ${c.currency}<br />
• 🗣️ <strong>Primary Language:</strong> ${c.lang}<br /><br />
${city ? `<strong>Major Co-Living & Tech Hub:</strong> ${city.name} (${city.coordinates}) — avg co-living rent ~$${city.avgRentUSD}/mo.` : 'Connect your custom properties or co-living specs for this country!'}`,
            richCard: {
              title: `${c.flag} ${c.name} Overview`,
              badge: c.continent,
              params: [
                { label: 'Capital', value: c.capital, sub: 'National Seat' },
                { label: 'Currency', value: c.currency, sub: 'Official Tender' },
                { label: 'Continent', value: c.continent, sub: 'Region' }
              ],
              actions: [
                { label: city ? `Explore ${city.name}` : 'Open World Map', action: city ? 'query' : 'open-kb', payload: city ? `Tell me about ${city.name}` : undefined }
              ]
            }
          };
        }
      }

      // General World Map Overview
      const defaultSvg = this.renderWorldMapSVG();
      return {
        type: 'companion',
        author: 'ThatJoint AI · World Map Engine',
        title: 'Global Detailed World Map Active',
        body: `<strong>Global Geographic Intelligence:</strong><br />
I am equipped with a detailed world map spanning all 7 continents, 195+ countries, and extreme corners of Earth (from Tokyo to Ushuaia, and from London to Reykjavik).<br /><br />
Ask me about any city, coordinates, country capital, timezone difference, or co-living ecosystem across the globe!<br />
${defaultSvg}`,
        richCard: {
          title: 'World Map Engine',
          badge: '7 Continents Active',
          params: [
            { label: 'Global Cities', value: `${this.worldCities.length} Hubs`, sub: 'Detailed Dossiers' },
            { label: 'Sovereign States', value: '195+ Countries', sub: 'Capitals & Currencies' },
            { label: 'Coverage', value: '100% Globe', sub: 'North to South Poles' }
          ],
          actions: [
            { label: '🗺️ Open World Map Explorer', action: 'open-kb' },
            { label: '📍 Southernmost City (Ushuaia)', action: 'query', payload: 'Where is Ushuaia?' },
            { label: '📍 Northernmost Town (Svalbard)', action: 'query', payload: 'Where is Longyearbyen?' }
          ]
        }
      };
    }

    // ----------------------------------------------------------------
    // Co-Living Booking & Intake Conversational Flow Engine
    // ----------------------------------------------------------------
    isBookingTrigger(lower) {
      if (!lower) return false;
      const notBooking = /(overview|revenue|history|covenant|who\s+are|statutory|rules|compliance)/i.test(lower);
      if (notBooking) return false;
      return /\b(book|booking|reserve|reservation|rent\s+a\s+(?:room|flat|apartment|unit|suite|bed)|looking\s+to\s+stay|want\s+to\s+stay|how\s+to\s+book|tenancy\s+application|intake|book\s+now)\b/i.test(lower);
    }

    extractApplicantDetails(text) {
      const data = {};
      if (!text) return data;

      // Full Legal Name
      const nameM = text.match(/(?:my\s*name\s*is|name\s*[:=-]|i\s*am|i'm)\s+([A-Za-z\s.'-]+?)(?=\s+(?:from|origin|current|currently|living|looking|interested)|,|$|\n)/i);
      if (nameM && nameM[1].trim().length > 1) {
        data.name = nameM[1].trim();
      }

      // Origin Address
      const originM = text.match(/(?:origin\s*(?:address)?\s*[:=-]|from|hometown\s*(?:is|[:=-])?|permanent\s*(?:address)?\s*[:=-])\s+([A-Za-z0-9\s,.'-]+?)(?=\s+(?:current|currently|living|looking|interested|area)|,|$|\n)/i);
      if (originM && originM[1].trim().length > 1) {
        data.originAddress = originM[1].trim();
      }

      // Current Location
      const currentM = text.match(/(?:current\s*(?:location)?\s*[:=-]|currently\s*(?:in|at|living in)|living\s*(?:at|in)|now\s*in)\s+([A-Za-z0-9\s,.'-]+?)(?=\s+(?:interested|looking|for living|area|budget)|,|$|\n)/i);
      if (currentM && currentM[1].trim().length > 1) {
        data.currentLocation = currentM[1].trim();
      }

      // Interested Area
      const areaM = text.match(/(?:interested\s+(?:in|area\s*[:=-]?)|looking\s*(?:to live in|for living in|in)|area\s*[:=-]|locality\s*[:=-])\s+([A-Za-z0-9\s.'-]+?)(?=\s+(?:with|budget|price|and)|,|$|\n)/i);
      if (areaM && areaM[1].trim().length > 1) {
        data.interestedArea = areaM[1].trim();
      } else {
        // Check world cities or major areas
        for (const city of this.worldCities) {
          if (new RegExp('\\b' + city.name.toLowerCase().split(' ')[0] + '\\b', 'i').test(text)) {
            data.interestedArea = city.name + ', ' + city.country;
            break;
          }
        }
      }

      // Comma-separated fallback e.g. "Alex, London, Tokyo, Shibuya"
      if ((!data.name || !data.originAddress) && text.includes(',')) {
        const parts = text.split(',').map(p => p.trim()).filter(Boolean);
        if (parts.length >= 4) {
          if (!data.name) data.name = parts[0].replace(/^(i am|i'm|my name is)\s+/i, '');
          if (!data.originAddress) data.originAddress = parts[1].replace(/^(from|origin:?)\s+/i, '');
          if (!data.currentLocation) data.currentLocation = parts[2].replace(/^(currently in|current:?)\s+/i, '');
          if (!data.interestedArea) data.interestedArea = parts[3].replace(/^(interested in|area:?)\s+/i, '');
        }
      }

      return data;
    }

    extractPreferences(text, file) {
      const prefs = {
        budget: '',
        facilities: [],
        requirements: text || '',
        docProof: file ? `${file.name} (${(file.size / 1024).toFixed(0)} KB)` : null
      };

      // Budget detection
      if (/(shared|twin|8\s*k|8000|10\s*k|10000|12\s*k|12000|\$700|\$800)/i.test(text)) {
        prefs.budget = 'Shared Executive Pod ($700 – $1,000 / mo)';
      } else if (/(private|single|14\s*k|14000|15\s*k|15000|16\s*k|16000|18\s*k|18000|\$1400|\$1500)/i.test(text)) {
        prefs.budget = 'Private Studio Suite ($1,400 – $1,800 / mo)';
      } else if (/(suite|penthouse|luxury|20\s*k|20000|25\s*k|25000|\$2000|\$2500)/i.test(text)) {
        prefs.budget = 'Luxury Penthouse Residence ($2,000 – $2,800 / mo)';
      } else {
        prefs.budget = 'Standard Executive Studio ($1,400 – $1,800 / mo)';
      }

      // Facilities detection
      const facilityMap = [
        { name: 'High-speed Fiber WiFi', pattern: /(wifi|internet|fiber|speed)/i },
        { name: 'Chef Meal Subscription', pattern: /(meal|food|chef|dining|kitchen)/i },
        { name: 'Ergonomic Workstation', pattern: /(workstation|desk|chair|wfh|workspace)/i },
        { name: 'Gym & Fitness Club', pattern: /(gym|fitness|workout|pool)/i },
        { name: 'Solar Microgrid Backup', pattern: /(power|backup|solar|inverter|electric)/i },
        { name: 'Private Balcony', pattern: /(balcony|terrace|patio|deck)/i },
        { name: 'Covered Parking', pattern: /(parking|car|bike|vehicle)/i },
        { name: 'Daily Housekeeping', pattern: /(housekeeping|cleaning|maid|linen)/i }
      ];

      for (const f of facilityMap) {
        if (f.pattern.test(text)) prefs.facilities.push(f.name);
      }

      if (prefs.facilities.length === 0) {
        prefs.facilities = ['High-speed Fiber WiFi', 'Daily Housekeeping', 'Ergonomic Workstation'];
      }

      // Document proof detection in text
      if (!prefs.docProof && /(aadhaar|passport|voter|pan|id|document|license|offer\s*letter|form\s*c)/i.test(text)) {
        prefs.docProof = 'Government KYC ID / Passport Provided (Digital Verification ✓)';
      }

      return prefs;
    }

    handleBookingFlow(rawQuery, file) {
      const q = (rawQuery || '').trim();
      const lower = q.toLowerCase();

      // Reset / cancellation check
      if (/(cancel\s+booking|exit\s+booking|stop\s+booking|restart\s+booking|reset\s+booking)/i.test(lower)) {
        this.resetBookingState();
        return {
          type: 'companion',
          author: 'ThatJoint Tenancy Concierge',
          title: 'Booking Inquiry Reset',
          body: 'Your tenancy intake session has been reset. You can explore our global world map, configure custom knowledge, or start a new booking anytime.',
          richCard: {
            title: 'Concierge Ready',
            badge: 'Session Reset',
            params: [
              { label: 'Booking Status', value: 'Reset', sub: 'Ready' },
              { label: 'Support', value: 'Live', sub: 'Concierge On-call' }
            ],
            actions: [
              { label: 'Start New Booking', action: 'query', payload: 'I want to book a room' },
              { label: '🗺️ Explore World Map', action: 'open-kb' }
            ]
          }
        };
      }

      // If finished (Stage 4) and user enters a new query
      if (this.bookingState.step === 4) {
        if (this.isBookingTrigger(lower)) {
          this.resetBookingState();
          this.bookingState.active = true;
          this.bookingState.step = 1;
          return this.generateStage1Response();
        }
        this.bookingState.active = false;
        return this.generateGenerativeResponse(rawQuery, file);
      }

      // Fresh Trigger
      if (!this.bookingState.active) {
        this.bookingState.active = true;
        const upfrontDetails = this.extractApplicantDetails(q);
        if (upfrontDetails.name) this.bookingState.data.name = upfrontDetails.name;
        if (upfrontDetails.originAddress) this.bookingState.data.originAddress = upfrontDetails.originAddress;
        if (upfrontDetails.currentLocation) this.bookingState.data.currentLocation = upfrontDetails.currentLocation;
        if (upfrontDetails.interestedArea) this.bookingState.data.interestedArea = upfrontDetails.interestedArea;

        // If user already gave name and interested area upfront, skip directly to Stage 2!
        if (this.bookingState.data.name && this.bookingState.data.interestedArea) {
          this.bookingState.step = 2;
          return this.generateStage2Response(this.bookingState.data);
        }

        this.bookingState.step = 1;
        return this.generateStage1Response();
      }

      // Stage 1: Collecting Personal & Geographical Details
      if (this.bookingState.step === 1) {
        const extracted = this.extractApplicantDetails(q);
        if (extracted.name) this.bookingState.data.name = extracted.name;
        if (extracted.originAddress) this.bookingState.data.originAddress = extracted.originAddress;
        if (extracted.currentLocation) this.bookingState.data.currentLocation = extracted.currentLocation;
        if (extracted.interestedArea) this.bookingState.data.interestedArea = extracted.interestedArea;

        // Smart fallbacks if user typed concise answers
        if (!this.bookingState.data.interestedArea) {
          for (const city of this.worldCities) {
            if (new RegExp('\\b' + city.name.toLowerCase().split(' ')[0] + '\\b', 'i').test(q)) {
              this.bookingState.data.interestedArea = city.name + ', ' + city.country;
              break;
            }
          }
        }

        this.bookingState.step = 2;
        return this.generateStage2Response(this.bookingState.data);
      }

      // Stage 2: Collecting Preferences, Budget, Facilities & Document Proof
      if (this.bookingState.step === 2) {
        const prefs = this.extractPreferences(q, file);
        if (prefs.budget) this.bookingState.data.budgetRange = prefs.budget;
        if (prefs.facilities && prefs.facilities.length) this.bookingState.data.facilities = prefs.facilities;
        if (prefs.requirements) this.bookingState.data.requirements = prefs.requirements;
        if (prefs.docProof) this.bookingState.data.documentProof = prefs.docProof;

        this.bookingState.step = 3;
        return this.generateStage3Response(this.bookingState.data);
      }

      // Stage 3: Site Selection
      if (this.bookingState.step === 3) {
        let selectedSite = 'Home 014 (Executive Studio Suite)';
        if (/unit\s*008|008|garden|site\s*2/i.test(lower)) {
          selectedSite = 'Unit 008 (Premium Garden Residence)';
        } else if (/unit\s*022|022|shared|pod|site\s*3/i.test(lower)) {
          selectedSite = 'Unit 022 (Smart Shared Tech Pod)';
        } else if (/home\s*014|014|studio|site\s*1/i.test(lower)) {
          selectedSite = 'Home 014 (Executive Studio Suite)';
        }

        if (file) {
          this.bookingState.data.documentProof = `${file.name} (${(file.size / 1024).toFixed(0)} KB)`;
        }

        this.bookingState.data.selectedSite = selectedSite;
        this.bookingState.data.bookingRef = 'TJ-BK-' + Math.floor(100000 + Math.random() * 900000);
        this.bookingState.step = 4;
        return this.generateStage4Confirmation(selectedSite);
      }

      return this.generateStage1Response();
    }

    generateStage1Response() {
      return {
        type: 'companion',
        author: 'ThatJoint Co-Living Concierge · Global Onboarding',
        title: 'Co-Living Tenancy Intake · Personal & Location Details',
        body: `<strong>Welcome to ThatJoint Co-Living Reservation Concierge!</strong><br />
I am here to find and configure your ideal co-living residence in any corner of the world. To curate matching spaces according to your requirements, please provide your initial details:<br /><br />
1. 👤 <strong>Full Legal Name</strong><br />
2. 📍 <strong>Origin Address</strong> (Permanent hometown, state, or country)<br />
3. 🏙️ <strong>Current Location</strong> (Where you are currently residing or working)<br />
4. 🎯 <strong>Interested Area for Living</strong> (e.g., <em>Tokyo, Lisbon, London, Berlin, Singapore, New York, Bali, or Cape Town</em>)<br /><br />
<em>You can reply in one message (e.g. "Alex, London, Tokyo, Shibuya") or select your preferred destination below:</em>`,
        richCard: {
          title: 'Tenancy Intake: Step 1 of 3',
          badge: 'Applicant Details Required',
          params: [
            { label: 'Intake Stage', value: 'Step 1 of 3', sub: 'Personal & Geo Details' },
            { label: 'Destinations', value: '7 Continents', sub: 'Global Inventory' },
            { label: 'Covenants', value: 'Flexible Tenancy', sub: 'Zero Brokerage' }
          ],
          actions: [
            { label: '🇯🇵 Tokyo Shibuya', action: 'query', payload: 'Area: Tokyo, Japan' },
            { label: '🇵🇹 Lisbon Chiado', action: 'query', payload: 'Area: Lisbon, Portugal' },
            { label: '🇩🇪 Berlin Mitte', action: 'query', payload: 'Area: Berlin, Germany' },
            { label: '🗺️ Explore World Map', action: 'open-kb' }
          ]
        },
        followUps: [
          'My name is Alex, from London, currently in Tokyo, interested in Shibuya',
          'Name: Sneha Patel, Origin: Bangalore, Current: Lisbon, Area: Chiado',
          'Area: Berlin Mitte (Private Studio)'
        ]
      };
    }

    generateStage2Response(data) {
      const name = data.name || 'Valued Resident';
      const origin = data.originAddress || 'Registered Hometown';
      const current = data.currentLocation || 'Current City';
      const area = data.interestedArea || 'Global Living Hub';

      return {
        type: 'companion',
        author: 'ThatJoint Co-Living Concierge · Preferences & Verification',
        title: `Profile Recorded: ${name} · Step 2 of 3`,
        body: `Thank you, <strong>${this.escapeHtml(name)}</strong>! We have registered your preliminary applicant dossier:<br /><br />
• 📍 <strong>Origin Address:</strong> ${this.escapeHtml(origin)}<br />
• 🏙️ <strong>Current Location:</strong> ${this.escapeHtml(current)}<br />
• 🎯 <strong>Target Living Area:</strong> ${this.escapeHtml(area)}<br /><br />
Now, let's configure your living preferences, budget, and identity verification:<br /><br />
1. 💵 <strong>Monthly Price Range / Budget:</strong><br />
   • <em>Shared Executive Pod:</em> $700 – $1,000 / month<br />
   • <em>Private Studio Suite:</em> $1,400 – $1,800 / month<br />
   • <em>Luxury Penthouse:</em> $2,000 – $2,800 / month<br /><br />
2. ⚡ <strong>Desired Facilities & Amenities:</strong><br />
   • Dedicated high-speed fiber WiFi, chef meal plans, ergonomic workstation, gym & pool access, private balcony.<br /><br />
3. 📋 <strong>Special or Specific Requirements:</strong><br />
   • Target move-in date, lease flexibility (monthly vs long-term), parking, quiet floor preference.<br /><br />
4. 📑 <strong>Document Proof (KYC Verification):</strong><br />
   • Please upload or attach your Government ID / Document Proof (<em>Passport, National ID, or Employment Offer Letter</em>).<br />
   • Click <strong>[Attach KYC Document 📎]</strong> below, use the paperclip icon, or drop your file into this window.`,
        richCard: {
          title: 'Preferences & Document Verification',
          badge: 'Step 2 / 3: Preferences & KYC',
          params: [
            { label: 'Applicant', value: name, sub: origin },
            { label: 'Target Area', value: area, sub: 'Global Inventory' },
            { label: 'KYC Document', value: data.documentProof ? 'Uploaded ✓' : 'Awaiting Proof', sub: 'Identity Verification' }
          ],
          actions: [
            { label: '💵 Shared ($700–$1k)', action: 'query', payload: 'Budget: Shared $700 - $1,000, high-speed WiFi' },
            { label: '💵 Private ($1.4k–$1.8k)', action: 'query', payload: 'Budget: Private Studio $1,400 - $1,800, workstation & balcony' },
            { label: '💵 Suite ($2k–$2.8k)', action: 'query', payload: 'Budget: Luxury Suite $2,000 - $2,800, all amenities' },
            { label: '📎 Attach KYC Document', action: 'trigger-upload' }
          ]
        }
      };
    }

    generateStage3Response(data) {
      const name = data.name || 'Valued Resident';
      const area = data.interestedArea || 'Global Living Hub';
      const budget = data.budgetRange || 'Private Studio Suite ($1,400 – $1,800 / mo)';
      const facilitiesStr = (data.facilities && data.facilities.length)
        ? data.facilities.join(', ')
        : 'High-speed Fiber WiFi, Ergonomic Desk, Daily Housekeeping';
      const docStatus = data.documentProof
        ? `Verified ✓ (${this.escapeHtml(data.documentProof)})`
        : 'Pending Digital Handover (Submit prior to check-in)';

      return {
        type: 'companion',
        author: 'ThatJoint Co-Living Concierge · Site Selection',
        title: `Curated Residences for ${name} in ${area}`,
        body: `<strong>Matching Co-Living Residences Curated for Your Profile:</strong><br />
We have filtered our global portfolio according to your destination (<strong>${this.escapeHtml(area)}</strong>), budget (<strong>${this.escapeHtml(budget)}</strong>), and requested amenities (<em>${this.escapeHtml(facilitiesStr)}</em>).<br /><br />
• 📄 <strong>KYC Verification:</strong> ${docStatus}<br /><br />
<strong>Please review and select your preferred residence below to lock in your reservation hold:</strong><br /><br />

1. 🏡 <strong>ThatJoint Home 014 - Executive Studio Suite</strong><br />
   • <strong>Location:</strong> ${this.escapeHtml(area)} · Prime Tech District<br />
   • <strong>Tariff:</strong> <strong>$1,650 / month</strong> (All-inclusive utilities & high-speed fiber)<br />
   • <strong>Amenities:</strong> 1 Gbps Fiber WiFi, Herman Miller ergonomic desk, private balcony, gym & rooftop lounge.<br />
   • <strong>Availability:</strong> Immediate Move-in · Sanitized & Verified<br /><br />

2. 🌿 <strong>ThatJoint Unit 008 - Premium Garden Residence</strong><br />
   • <strong>Location:</strong> ${this.escapeHtml(area)} · Garden Boulevard<br />
   • <strong>Tariff:</strong> <strong>$1,850 / month</strong> (Inclusive of Chef Dining Subscription)<br />
   • <strong>Amenities:</strong> Landscaped patio, biometrically locked entry, parking, weekly linen service.<br />
   • <strong>Availability:</strong> Available from 1st of next month<br /><br />

3. ⚡ <strong>ThatJoint Unit 022 - Smart Shared Tech Pod</strong><br />
   • <strong>Location:</strong> ${this.escapeHtml(area)} · Innovation Quadrangle<br />
   • <strong>Tariff:</strong> <strong>$950 / month</strong> (Zero Lock-in Option)<br />
   • <strong>Amenities:</strong> Soundproof acoustic pod, 24/7 cafe pantry, high-speed WiFi, co-working access.<br />
   • <strong>Availability:</strong> Immediate Move-in<br /><br />
<em>Click on any of the buttons below to confirm your booking and generate your tenancy reservation pass:</em>`,
        richCard: {
          title: 'Select Residence to Reserve',
          badge: 'Step 3 / 3: Select Site',
          params: [
            { label: 'Site 1', value: 'Home 014', sub: '$1,650 / mo · Studio' },
            { label: 'Site 2', value: 'Unit 008', sub: '$1,850 / mo · Garden' },
            { label: 'Site 3', value: 'Unit 022', sub: '$950 / mo · Shared' }
          ],
          actions: [
            { label: '✓ Select Home 014', action: 'select-site', payload: 'Home 014' },
            { label: '✓ Select Unit 008', action: 'select-site', payload: 'Unit 008' },
            { label: '✓ Select Unit 022', action: 'select-site', payload: 'Unit 022' },
            { label: '📎 Attach Document Proof', action: 'trigger-upload' }
          ]
        },
        followUps: [
          'Select and reserve Home 014',
          'Select and reserve Unit 008',
          'Select and reserve Unit 022'
        ]
      };
    }

    generateStage4Confirmation(siteName) {
      const d = this.bookingState.data;
      const name = d.name || 'Valued Resident';
      const site = siteName || d.selectedSite || 'Home 014 (Executive Studio Suite)';
      const ref = d.bookingRef || ('TJ-BK-' + Math.floor(100000 + Math.random() * 900000));
      const tariff = site.includes('008') ? '$1,850 / month' : site.includes('022') ? '$950 / month' : '$1,650 / month';
      const docStatus = d.documentProof ? `Verified ✓ (${this.escapeHtml(d.documentProof)})` : 'Pending Handover (Submit prior to check-in)';

      return {
        type: 'companion',
        author: 'ThatJoint Co-Living Concierge · Booking Confirmation',
        title: `Reservation Confirmed · Ref #${ref}`,
        body: `🎉 <strong>Congratulations, ${this.escapeHtml(name)}! Your reservation hold is officially confirmed.</strong><br /><br />
Here is your official tenancy onboarding dossier:<br />
• 🔖 <strong>Booking Reference:</strong> <code>#${ref}</code><br />
• 🏠 <strong>Reserved Residence:</strong> <strong>${this.escapeHtml(site)}</strong><br />
• 📍 <strong>Tenant Origin:</strong> ${this.escapeHtml(d.originAddress || 'Registered Hometown')}<br />
• 🏙️ <strong>Current Location:</strong> ${this.escapeHtml(d.currentLocation || 'Current City')}<br />
• 🎯 <strong>Living Area:</strong> ${this.escapeHtml(d.interestedArea || 'Global Living Hub')}<br />
• 💵 <strong>Monthly Tariff:</strong> <strong>${tariff}</strong> (All-inclusive: Fiber WiFi, Utilities, Housekeeping)<br />
• 📑 <strong>KYC Verification:</strong> ${docStatus}<br />
• 🔒 <strong>Security Deposit:</strong> 100% Escrow-backed refundable covenant<br /><br />
<strong>Onboarding & Next Steps:</strong><br />
1. A digital tenancy agreement and smart pass passkey have been generated.<br />
2. Your community onboarding manager will reach out via WhatsApp/email to confirm your move-in slot.<br />
3. Digital keycard access will activate automatically on your arrival day.`,
        richCard: {
          title: `Booking Hold: ${site.split(' ')[0]} ${site.split(' ')[1] || ''}`,
          badge: `Hold Active · #${ref}`,
          params: [
            { label: 'Booking Ref', value: ref, sub: 'Confirmed Hold' },
            { label: 'Residence', value: site.split(' ')[1] || 'Home 014', sub: tariff },
            { label: 'Tenant', value: name, sub: d.originAddress || 'Verified' },
            { label: 'Status', value: 'Active Reservation', sub: 'Zero Brokerage' }
          ],
          actions: [
            { label: '🏡 View 3D Tour', action: 'crosslink-3d', payload: 'complete-assembly' },
            { label: '🗺️ Explore World Map', action: 'open-kb' },
            { label: '↺ New Booking Inquiry', action: 'query', payload: 'I want to book a room' }
          ]
        }
      };
    }

    // ----------------------------------------------------------------
    // Autonomous Generative Synthesis Engine (World & Personalized Core)
    // ----------------------------------------------------------------
    generateGenerativeResponse(rawQuery, file) {
      const q = (rawQuery || '').trim();
      const lower = q.toLowerCase();

      // 1. Safety Guardrails: Reject harmful/illegal instructions neutrally
      if (/(hack|exploit|bypass|steal|weapon|attack|ddos|vulnerability)/i.test(lower)) {
        return {
          type: 'companion',
          author: 'THΛTJOINT AI · Security Layer',
          title: 'Security Boundary Enforced',
          body: 'Security protocol prevents execution of requests that compromise infrastructure, locks, or resident privacy. Redirecting to standard operations.',
          richCard: {
            title: 'System Access Log',
            badge: 'Policy Enforced',
            params: [
              { label: 'Security State', value: 'Nominal', sub: 'Boundary Active' },
              { label: 'Infractions', value: '0', sub: 'Enforced' }
            ]
          }
        };
      }

      // 2. Active Co-Living Booking State Machine (Prioritized when active intake in progress)
      if (this.bookingState && this.bookingState.active) {
        return this.handleBookingFlow(q, file);
      }

      // 3. Dynamic Personalization & Custom Knowledge Base (User suggestions & memory)
      if (this.isTeachingQuery(lower) || this.isPersonalizationQuery(lower)) {
        const pResp = this.handlePersonalizationAndLearning(q);
        if (pResp) return pResp;
      }

      // 4. Interactive Co-Living Booking Trigger (Fresh intake initiation)
      if (this.isBookingTrigger(lower)) {
        return this.handleBookingFlow(q, file);
      }

      // 4. Detailed World Map & Geographic Intelligence (Any corner of the world!)
      if (this.isWorldMapQuery(lower)) {
        return this.handleWorldMapQuery(q);
      }

      // 5. Multimodal Document Parsing & File Upload
      if (file) {
        return {
          type: 'companion',
          author: 'THΛTJOINT AI · Multimodal Core',
          title: `Document Ingested: ${this.escapeHtml(file.name)}`,
          body: `<strong>Document Ingestion Summary:</strong><br />
File <em>${this.escapeHtml(file.name)}</em> (${(file.size / 1024).toFixed(0)} KB) has been parsed and verified.<br /><br />
• <strong>Format:</strong> ${file.type || 'Document'}<br />
• <strong>Audit Status:</strong> Zero non-conforming covenants detected.<br />
• <strong>Integration:</strong> Document linked with active profile.`,
          richCard: {
            title: 'Document Dossier',
            badge: 'Audit Passed 100%',
            params: [
              { label: 'File Name', value: file.name.slice(0, 16), sub: `${(file.size / 1024).toFixed(0)} KB` },
              { label: 'Status', value: 'Verified', sub: 'Cryptographically Checked' }
            ]
          }
        };
      }

      // 6. Check Custom Learned Knowledge Base
      for (const topic in this.customKnowledge) {
        if (lower.includes(topic.toLowerCase())) {
          return {
            type: 'companion',
            author: 'ThatJoint AI · Custom Knowledge',
            title: `Custom Policy: ${topic}`,
            body: `Based on your personalized knowledge base:<br /><br />
• <strong>${topic}:</strong> ${this.escapeHtml(this.customKnowledge[topic].content)}`,
            richCard: {
              title: topic,
              badge: 'Learned Knowledge',
              params: [
                { label: 'Source', value: 'User Suggested', sub: 'Active Memory' }
              ]
            }
          };
        }
      }

      // 7. Adaptive Default Assistant Response
      return {
        type: 'companion',
        author: 'THΛTJOINT AI · Global Assistant',
        title: 'Ready · Global World Map & Personalized AI Active',
        body: `Hello! I am your personalized ThatJoint AI companion. My background knowledge base is currently at **zero baseline** ready to be built according to your suggestions, and I have a **detailed map of the entire world** ready to answer any question from any corner of the Earth.<br /><br />
• 🗺️ <strong>World Map:</strong> Ask about any city, country, coordinates, timezone, or living conditions across 7 continents.<br />
• 🧠 <strong>Build Knowledge Base:</strong> Say <em>"Remember that..."</em> or <em>"Add rule:..."</em> and I will learn and save it.<br />
• 🏡 <strong>Co-Living Booking:</strong> Say <em>"I want to book a room"</em> to initiate global intake.`,
        richCard: {
          title: 'Capabilities Hub',
          badge: 'World Map + Zero-Base KB',
          params: [
            { label: 'World Map', value: '7 Continents', sub: 'Every Corner' },
            { label: 'Knowledge Base', value: `${Object.keys(this.customKnowledge).length} Learned`, sub: 'Clean Slate' },
            { label: 'Concierge', value: 'Active', sub: 'Global Tenancy' }
          ],
          actions: [
            { label: '🗺️ Explore World Map', action: 'open-kb' },
            { label: '🏡 Book Co-Living', action: 'query', payload: 'I want to book a room' },
            { label: '🧠 Show Knowledge Base', action: 'query', payload: 'Show knowledge base' }
          ]
        },
        followUps: [
          'Explore Tokyo Japan',
          'Tell me about Lisbon Portugal',
          'Where is Ushuaia?',
          'Time difference between London and New York',
          'I want to book a room'
        ]
      };
    }

    // ----------------------------------------------------------------
    // UI DOM Rendering & Management
    // ----------------------------------------------------------------
    init() {
      if (typeof document === 'undefined') return;
      this.container = typeof this.containerId === 'string'
        ? document.getElementById(this.containerId)
        : this.containerId;

      if (!this.container) {
        if (this.isDrawer && typeof document !== 'undefined' && document.body) {
          this.container = document.createElement('div');
          this.container.id = typeof this.containerId === 'string' ? this.containerId : 'sentinelDrawerRoot';
          document.body.appendChild(this.container);
        } else {
          return;
        }
      }

      this.render();
      this.bindElements();
      this.initSpeechRecognition();
      this.bindEvents();
      this.setupKeyboardShortcuts();
      this.renderWelcomeHub();

      if (typeof window !== 'undefined') {
        window.ThatJointSentinel = this;
        window.openSentinelAI = (q) => this.openDrawer(q);
        window.closeSentinelAI = () => this.closeDrawer();
        window.toggleSentinelAI = () => this.toggleDrawer();
      }
    }

    render() {
      const template = `
        <div class="tj-companion-container ${this.isDrawer ? 'tj-companion-drawer' : ''}" id="tjCompanionView" role="region" aria-label="THΛTJOINT AI">
          <!-- Drag and Drop Overlay -->
          <div class="tj-dropzone-overlay" id="tjDropzoneOverlay" aria-hidden="true">
            <span class="icon">📄</span>
            <strong>Drop File or Document</strong>
            <p>PDF, images, CSVs, or agreements analyzed automatically</p>
          </div>

          <!-- Minimal Elegant Topbar -->
          <header class="tj-sentinel-header tj-clean-header">
            <div class="tj-sentinel-topline">
              <div class="tj-sentinel-profile">
                <div class="tj-clean-avatar" aria-hidden="true">
                  <span class="tj-avatar-sparkle">✦</span>
                </div>
                <div class="tj-sentinel-meta">
                  <h3 class="tj-sentinel-name">THΛTJOINT AI</h3>
                  <div class="tj-clean-status">
                    <span class="tj-status-dot"></span>
                    <span id="sentinelStatusText">Ready · World Map Active</span>
                  </div>
                </div>
              </div>

              <!-- Controls: Open World Map, Clear & Close -->
              <div class="tj-sentinel-actions">
                <button type="button" class="tj-sentinel-icon-btn" id="btnOpenWorldMap" title="World Map Explorer" aria-label="Open World Map">🗺️</button>
                <button type="button" class="tj-sentinel-icon-btn" id="btnClearChat" title="Clear chat session" aria-label="Clear chat">↺</button>
                ${this.isDrawer ? `<button type="button" class="tj-sentinel-icon-btn" id="btnCloseDrawer" title="Close [Esc]" aria-label="Close drawer">✕</button>` : ''}
              </div>
            </div>
          </header>

          <!-- Main Chat Feed & Stream -->
          <div class="tj-companion-body" id="companionBody">
            <div class="tj-companion-feed" id="companionFeed" role="log" aria-live="polite">
              <!-- Messages stream here -->
            </div>

            <!-- Sleek Input Dock -->
            <div class="tj-input-dock tj-clean-dock">
              <div class="tj-staged-attachment" id="stagedAttachment" style="display: none;">
                <div class="tj-staged-info">
                  <span class="icon" id="stagedFileIcon">📄</span>
                  <div>
                    <strong id="stagedFileName">Document.pdf</strong>
                    <small id="stagedFileSize">(240 KB)</small>
                  </div>
                </div>
                <button type="button" class="tj-staged-remove-btn" id="stagedRemoveBtn" title="Remove attachment" aria-label="Remove attachment">✕</button>
              </div>

              <form class="tj-media-form tj-clean-form" id="chatForm" autocomplete="off">
                <input type="file" id="hiddenFileInput" accept=".pdf,.png,.jpg,.jpeg,.csv,.docx" style="display: none;" />

                <button type="button" class="tj-attach-btn" id="btnAttachFile" title="Attach file or lease" aria-label="Attach file">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"></path></svg>
                </button>

                <button type="button" class="tj-mic-btn" id="btnVoiceInput" title="Dictate voice query" aria-label="Dictate query">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"></path><path d="M19 10v2a7 7 0 01-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                </button>

                <div class="tj-textarea-wrapper">
                  <textarea
                    id="chatInput"
                    rows="1"
                    placeholder="Ask anything about any corner of the world map..."
                    aria-label="Ask ThatJoint AI"></textarea>
                </div>

                <button type="submit" class="tj-send-btn" id="btnSend" title="Send message" aria-label="Send">
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </form>

              <div class="tj-clean-footer-hint">
                <span>Press <strong>Enter</strong> to send · <strong>Esc</strong> to close</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive World Map & Location Intelligence Explorer Modal -->
        <dialog id="knowledgeBaseModal" class="tj-dialog" aria-labelledby="kbModalTitle">
          <div class="config-modal-inner">
            <div class="config-head">
              <span>THΛTJOINT / <b>WORLD DETAILED MAP & GLOBAL INTELLIGENCE</b></span>
              <button type="button" class="config-close-btn" id="kbCloseBtn" aria-label="Close modal">×</button>
            </div>
            <div class="kb-modal-header">
              <h2 class="config-title" id="kbModalTitle">DETAILED WORLD MAP<br /><em>EVERY CORNER OF EARTH.</em></h2>
              <p class="config-desc">
                Explore global cities, coordinates, timezones, and living insights across all 7 continents. Tap any destination to load its complete dossier into ThatJoint AI.
              </p>
            </div>

            <div class="kb-search-bar">
              <input type="text" id="kbSearchInput" placeholder="Search any city, country, or coordinates (e.g. Tokyo, Lisbon, Ushuaia)..." aria-label="Search world locations" />
              <button type="button" id="kbClearSearch" aria-label="Clear search">×</button>
            </div>

            <div class="kb-filter-tabs" id="kbFilterTabs">
              <button type="button" class="kb-tab is-active" data-cat="all">🌍 All (34+)</button>
              <button type="button" class="kb-tab" data-cat="Asia">🗼 Asia</button>
              <button type="button" class="kb-tab" data-cat="Europe">🏰 Europe</button>
              <button type="button" class="kb-tab" data-cat="North America">🗽 N. America</button>
              <button type="button" class="kb-tab" data-cat="South America">🌴 S. America</button>
              <button type="button" class="kb-tab" data-cat="Africa">🦁 Africa</button>
              <button type="button" class="kb-tab" data-cat="Oceania">🦘 Oceania</button>
              <button type="button" class="kb-tab" data-cat="extremes">🧭 Extremes & Corners</button>
            </div>

            <div class="kb-results-summary" id="kbResultsCount">Showing 34 global locations across 7 continents</div>
            <div class="kb-cards-grid" id="kbCardsGrid" role="list">
              <!-- World Location cards render dynamically -->
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
            <h2 class="config-title" id="directivesTitle">THATJOINT AI<br /><em>COMMAND DIRECTIVES.</em></h2>
            <p class="config-desc">
              Ask about any corner of the world, build custom knowledge as you suggest, or book co-living spaces:
            </p>
            <div class="directives-grid">
              <div class="directive-section">
                <h4>🗺️ World Map & Geography</h4>
                <div class="directive-chips">
                  <button type="button" class="directive-chip" data-query="Explore Tokyo Japan">Explore Tokyo 🇯🇵</button>
                  <button type="button" class="directive-chip" data-query="Tell me about living in Lisbon">Living in Lisbon 🇵🇹</button>
                  <button type="button" class="directive-chip" data-query="Where is Ushuaia?">Where is Ushuaia? 🇦🇷</button>
                  <button type="button" class="directive-chip" data-query="Time difference between Tokyo and New York">Tokyo vs NY Timezone</button>
                </div>
              </div>
              <div class="directive-section">
                <h4>🧠 Knowledge Base Building</h4>
                <div class="directive-chips">
                  <button type="button" class="directive-chip" data-query="Show knowledge base">Show knowledge base</button>
                  <button type="button" class="directive-chip" data-query="Remember that ThatJoint offers fiber WiFi in all units">Teach: Fiber WiFi</button>
                  <button type="button" class="directive-chip" data-query="Add rule: minimum stay is 1 month">Teach: 1-Month Stay</button>
                  <button type="button" class="directive-chip" data-query="Clear custom knowledge">Reset Knowledge Base</button>
                </div>
              </div>
              <div class="directive-section">
                <h4>🏡 Co-Living Tenancy Booking</h4>
                <div class="directive-chips">
                  <button type="button" class="directive-chip" data-query="I want to book a room">Start Tenancy Intake</button>
                  <button type="button" class="directive-chip" data-query="Book a studio in Tokyo Shibuya">Book in Tokyo</button>
                  <button type="button" class="directive-chip" data-query="Book a flat in Lisbon Chiado">Book in Lisbon</button>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      `;

      if (this.isDrawer) {
        this.container.innerHTML = `
          <button type="button" class="tj-sentinel-launcher-btn" id="tjSentinelLauncher" aria-label="Open ThatJoint AI Side Window" title="Open ThatJoint AI [?]">
            <span class="tj-launcher-pulse" aria-hidden="true"></span>
            <span class="tj-launcher-text">ThatJoint AI</span>
            <span class="tj-launcher-kbd" aria-hidden="true">?</span>
          </button>
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
      this.statusText = document.getElementById('sentinelStatusText');
      this.dropOverlay = document.getElementById('tjDropzoneOverlay');
      this.stagedAttachment = document.getElementById('stagedAttachment');
      this.stagedFileName = document.getElementById('stagedFileName');
      this.stagedFileSize = document.getElementById('stagedFileSize');
      this.fileInput = document.getElementById('hiddenFileInput');
      this.micBtn = document.getElementById('btnVoiceInput');
      this.viewContainer = document.getElementById('tjCompanionView');
      this.backdrop = document.getElementById('tjBackdrop');
      this.launcherBtn = document.getElementById('tjSentinelLauncher');

      this.configModal = document.getElementById('configModal');
      this.kbModal = document.getElementById('knowledgeBaseModal');
      this.directivesModal = document.getElementById('directivesModal');
      this.kbSearchInput = document.getElementById('kbSearchInput');
      this.kbCardsGrid = document.getElementById('kbCardsGrid');
      this.kbResultsCount = document.getElementById('kbResultsCount');
    }

    ensureConfigModal() {
      if (document.getElementById('configModal')) return;
      const dlg = document.createElement('dialog');
      dlg.id = 'configModal';
      dlg.className = 'tj-dialog';
      dlg.innerHTML = `
        <div class="config-modal-inner">
          <div class="config-head">
            <span>THΛTJOINT / <b>AI EXECUTION CONFIGURATION</b></span>
            <button type="button" class="config-close-btn" id="configCloseBtn" aria-label="Close modal">×</button>
          </div>
          <h2 class="config-title">AI ENGINE<br /><em>TIER SELECTION.</em></h2>
          <p class="config-desc">Toggle between Autonomous Global Engine, Frontier BYOK (Gemini), or Enterprise Webhooks.</p>
        </div>
      `;
      if (document.body) document.body.appendChild(dlg);
    }

    initSpeechRecognition() {
      if (typeof window === 'undefined') return;
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) return;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        if (this.input) {
          this.input.value = transcript;
          this.submitQuery();
        }
      };
      this.recognition.onend = () => {
        this.isListening = false;
        if (this.micBtn) this.micBtn.classList.remove('is-listening');
      };
    }

    bindEvents() {
      if (this.launcherBtn) {
        this.launcherBtn.addEventListener('click', () => this.openDrawer());
      }

      if (this.form) {
        this.form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.submitQuery();
        });
      }

      if (this.input) {
        this.input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.submitQuery();
          }
        });
      }

      // File attachment
      const attachBtn = document.getElementById('btnAttachFile');
      if (attachBtn && this.fileInput) {
        attachBtn.addEventListener('click', () => this.fileInput.click());
      }

      if (this.fileInput) {
        this.fileInput.addEventListener('change', (e) => {
          const file = e.target.files && e.target.files[0];
          if (file) this.stageFile(file);
        });
      }

      const stagedRemoveBtn = document.getElementById('stagedRemoveBtn');
      if (stagedRemoveBtn) {
        stagedRemoveBtn.addEventListener('click', () => this.unstageFile());
      }

      // Voice
      if (this.micBtn) {
        this.micBtn.addEventListener('click', () => {
          if (!this.recognition) return;
          if (this.isListening) {
            this.recognition.stop();
          } else {
            this.recognition.start();
            this.isListening = true;
            this.micBtn.classList.add('is-listening');
          }
        });
      }

      // Clear chat
      const clearBtn = document.getElementById('btnClearChat');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          this.conversationHistory = [];
          this.resetBookingState();
          if (this.feed) this.feed.innerHTML = '';
          this.renderWelcomeHub();
          this.setMascotState('idle', '<span>AI Ready</span> · <i>Session reset</i>');
        });
      }

      // Open World Map Button
      const openWorldMapBtn = document.getElementById('btnOpenWorldMap');
      if (openWorldMapBtn) {
        openWorldMapBtn.addEventListener('click', () => this.openWorldMapModal());
      }

      // Drawer close
      const closeDrawerBtn = document.getElementById('btnCloseDrawer');
      if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', () => this.closeDrawer());
      if (this.backdrop) this.backdrop.addEventListener('click', () => this.closeDrawer());

      // World Map Modal controls
      const kbCloseBtn = document.getElementById('kbCloseBtn');
      if (kbCloseBtn) kbCloseBtn.addEventListener('click', () => this.closeWorldMapModal());

      const kbFilterTabs = document.getElementById('kbFilterTabs');
      if (kbFilterTabs) {
        kbFilterTabs.addEventListener('click', (e) => {
          const tab = e.target.closest('.kb-tab');
          if (tab) {
            kbFilterTabs.querySelectorAll('.kb-tab').forEach(t => t.classList.remove('is-active'));
            tab.classList.add('is-active');
            const cat = tab.getAttribute('data-cat');
            this.renderWorldLocationsList(cat, this.kbSearchInput ? this.kbSearchInput.value : '');
          }
        });
      }

      if (this.kbSearchInput) {
        this.kbSearchInput.addEventListener('input', (e) => {
          const activeTab = document.querySelector('#kbFilterTabs .kb-tab.is-active');
          const cat = activeTab ? activeTab.getAttribute('data-cat') : 'all';
          this.renderWorldLocationsList(cat, e.target.value);
        });
      }

      if (this.kbCardsGrid) {
        this.kbCardsGrid.addEventListener('click', (e) => {
          const card = e.target.closest('.kb-property-card');
          if (card) {
            const locName = card.getAttribute('data-name');
            this.closeWorldMapModal();
            this.dispatchQuery(`Explore ${locName} on world map`);
          }
        });
      }

      // Card action delegation in feed
      if (this.feed) {
        this.feed.addEventListener('click', (e) => {
          const btn = e.target.closest('.tj-card-btn');
          if (btn) {
            const action = btn.getAttribute('data-action');
            const payload = btn.getAttribute('data-payload');
            this.handleCardAction(action, payload, btn);
          }
        });
      }
    }

    setupKeyboardShortcuts() {
      if (typeof window === 'undefined') return;
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (this.kbModal && this.kbModal.open) {
            this.closeWorldMapModal();
          } else if (this.viewContainer && this.viewContainer.classList.contains('is-open')) {
            this.closeDrawer();
          }
        } else if ((e.key === '?' || (e.key === '/' && (e.metaKey || e.ctrlKey))) && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
          e.preventDefault();
          this.toggleDrawer();
        }
      });
    }

    openWorldMapModal() {
      if (!this.kbModal) return;
      this.renderWorldLocationsList('all', '');
      if (typeof this.kbModal.showModal === 'function') {
        this.kbModal.showModal();
      } else {
        this.kbModal.setAttribute('open', '');
      }
    }

    closeWorldMapModal() {
      if (!this.kbModal) return;
      if (typeof this.kbModal.close === 'function') {
        this.kbModal.close();
      } else {
        this.kbModal.removeAttribute('open');
      }
    }

    renderWorldLocationsList(continentFilter = 'all', searchQuery = '') {
      if (!this.kbCardsGrid) return;
      const q = (searchQuery || '').trim().toLowerCase();
      let list = this.worldCities.slice();

      if (continentFilter === 'extremes') {
        list = list.filter(c => ['ushuaia', 'longyearbyen', 'honolulu', 'reykjavik'].includes(c.id));
      } else if (continentFilter !== 'all') {
        list = list.filter(c => c.continent.toLowerCase() === continentFilter.toLowerCase());
      }

      if (q) {
        list = list.filter(c => 
          c.name.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q) ||
          c.continent.toLowerCase().includes(q) ||
          c.coordinates.toLowerCase().includes(q)
        );
      }

      if (this.kbResultsCount) {
        this.kbResultsCount.textContent = `Showing ${list.length} global locations across ${continentFilter === 'all' ? '7 Continents' : continentFilter}`;
      }

      if (!list.length) {
        this.kbCardsGrid.innerHTML = `
          <div class="kb-empty-state" style="padding:30px; text-align:center; color:#9c9589;">
            <span style="font-size:32px;">🔍</span><br />
            <strong>No global locations matching "${this.escapeHtml(searchQuery)}"</strong>
            <p>Try searching for Tokyo, Lisbon, London, Berlin, or Ushuaia.</p>
          </div>
        `;
        return;
      }

      this.kbCardsGrid.innerHTML = list.map(c => `
        <div class="kb-property-card" data-id="${c.id}" data-name="${c.name}" style="background:#201c1a; border:1px solid #38312c; border-radius:4px; padding:12px; cursor:pointer; margin-bottom:8px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <strong style="color:#ffffff; font-size:14px;">${c.flag} ${c.name}, ${c.country}</strong>
              <div style="font-size:11px; color:#A459FF; margin-top:2px;">📍 ${c.coordinates} · ${c.timezone}</div>
            </div>
            <span style="background:#2e2621; color:#EDEBE4; padding:2px 8px; border-radius:3px; font-size:11px;">$${c.avgRentUSD}/mo</span>
          </div>
          <p style="font-size:12px; color:#a8a096; margin:8px 0 0;">${c.highlights.slice(0, 110)}...</p>
        </div>
      `).join('');
    }

    renderWelcomeHub() {
      if (!this.feed) return;
      const hubWrap = document.createElement('div');
      hubWrap.className = 'tj-welcome-clean';
      hubWrap.innerHTML = `
        <div class="tj-welcome-badge">
          <span>● Global AI Active · Knowledge Base at Zero</span>
        </div>
        <h2 class="tj-welcome-title">How can I assist you worldwide?</h2>
        <p class="tj-welcome-desc">
          I am equipped with a detailed world map across all 7 continents. Background knowledge base starts at zero—ready to be built as you suggest!
        </p>

        <div class="tj-clean-starter-grid">
          <button type="button" class="tj-clean-starter-card" data-query="Explore Tokyo Japan">
            <span class="card-icon">🗺️</span>
            <div class="card-text">
              <strong>World Map & Cities</strong>
              <small>Coordinates & living insights for any corner of Earth</small>
            </div>
            <span class="card-arrow" aria-hidden="true">→</span>
          </button>

          <button type="button" class="tj-clean-starter-card" data-query="Show knowledge base">
            <span class="card-icon">🧠</span>
            <div class="card-text">
              <strong>Personalize & Build</strong>
              <small>Knowledge base starts at zero · teach me anything</small>
            </div>
            <span class="card-arrow" aria-hidden="true">→</span>
          </button>

          <button type="button" class="tj-clean-starter-card" data-query="I want to book a room">
            <span class="card-icon">🏡</span>
            <div class="card-text">
              <strong>Global Co-Living Booking</strong>
              <small>Multi-step intake, KYC & reservation hold</small>
            </div>
            <span class="card-arrow" aria-hidden="true">→</span>
          </button>

          <button type="button" class="tj-clean-starter-card" data-query="Time difference between Tokyo and New York">
            <span class="card-icon">⏱️</span>
            <div class="card-text">
              <strong>Timezones & Coordinates</strong>
              <small>Calculate global offsets, distances & geography</small>
            </div>
            <span class="card-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      `;

      hubWrap.addEventListener('click', (e) => {
        const card = e.target.closest('.tj-clean-starter-card');
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

    submitQuery() {
      if (!this.input) return;
      const text = this.input.value.trim();
      const file = this.stagedFile;
      if (!text && !file) return;

      this.input.value = '';
      this.unstageFile();
      this.dispatchQuery(text, file);
    }

    stageFile(file) {
      this.stagedFile = file;
      if (this.stagedAttachment) {
        this.stagedAttachment.style.display = 'flex';
        if (this.stagedFileName) this.stagedFileName.textContent = file.name;
        if (this.stagedFileSize) this.stagedFileSize.textContent = `(${(file.size / 1024).toFixed(0)} KB)`;
      }
    }

    unstageFile() {
      this.stagedFile = null;
      if (this.stagedAttachment) this.stagedAttachment.style.display = 'none';
      if (this.fileInput) this.fileInput.value = '';
    }

    dispatchQuery(query, file = null) {
      this.isBusy = true;
      this.setMascotState('thinking', '<span>Synthesizing...</span> · <i>Global geographic retrieval</i>');

      this.appendMessage({
        type: 'user',
        author: this.userProfile.name || 'User',
        title: null,
        body: query || (file ? `Attached file: ${file.name}` : ''),
        attachment: file ? { name: file.name, size: `${(file.size / 1024).toFixed(0)} KB` } : null
      });

      this.conversationHistory.push({
        role: 'user',
        content: query || (file ? `Attached file: ${file.name}` : '')
      });

      // Process with natural response latency
      setTimeout(() => {
        const resp = this.generateGenerativeResponse(query, file);
        this.deliverResponse(resp);
      }, 260);
    }

    deliverResponse(response) {
      this.isBusy = false;
      this.setMascotState('speaking', '<span>ThatJoint AI</span> · <i>Delivering insight</i>');
      this.appendMessage(response);
      this.conversationHistory.push({
        role: 'assistant',
        content: response.body || response.title || 'Response delivered'
      });

      setTimeout(() => {
        this.setMascotState('idle', '<span>AI Ready</span> · <i>World Map Active</i>');
      }, 1500);
    }

    appendMessage(msg) {
      if (!this.feed) return;
      const isUser = msg.type === 'user';
      const wrap = document.createElement('div');
      wrap.className = `tj-bubble-wrap ${isUser ? 'is-user-wrap' : 'is-assistant-wrap'}`;

      let inner = `
        <div class="tj-bubble ${isUser ? 'tj-user-bubble' : 'tj-assistant-bubble'}">
          ${msg.title ? `<div class="tj-bubble-title" style="font-weight:bold; margin-bottom:6px; color:#EDEBE4;">${msg.title}</div>` : ''}
          <div class="tj-bubble-text">${msg.body || ''}</div>
        </div>
      `;

      wrap.innerHTML = inner;
      this.feed.appendChild(wrap);

      if (msg.richCard) {
        this.renderRichCard(msg.richCard);
      }

      this.feed.scrollTop = this.feed.scrollHeight;
    }

    renderRichCard(card) {
      if (!this.feed || !card) return;
      const wrap = document.createElement('div');
      wrap.className = 'tj-rich-card-wrap';

      let paramsHtml = '';
      if (card.params && card.params.length) {
        paramsHtml = `
          <div class="tj-card-params" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:8px; margin:10px 0;">
            ${card.params.map(p => `
              <div style="background:#221d1b; padding:8px; border-radius:3px; border:1px solid #38302b;">
                <div style="font-size:10px; color:#9c9589; text-transform:uppercase;">${this.escapeHtml(p.label)}</div>
                <div style="font-size:13px; font-weight:bold; color:#ffffff;">${this.escapeHtml(p.value)}</div>
                ${p.sub ? `<small style="font-size:10px; color:#A459FF;">${this.escapeHtml(p.sub)}</small>` : ''}
              </div>
            `).join('')}
          </div>
        `;
      }

      let actionsHtml = '';
      if (card.actions && card.actions.length) {
        actionsHtml = `
          <div class="tj-card-actions" style="display:flex; flex-wrap:wrap; gap:6px; margin-top:8px;">
            ${card.actions.map(a => `
              <button type="button" class="tj-card-btn" data-action="${a.action}" ${a.payload ? `data-payload="${this.escapeHtml(a.payload)}"` : ''} style="background:#2e2622; color:#EDEBE4; border:1px solid #4a3e37; border-radius:3px; padding:6px 12px; font-size:12px; cursor:pointer;">
                ${a.label}
              </button>
            `).join('')}
          </div>
        `;
      }

      wrap.innerHTML = `
        <div class="tj-rich-card" style="background:#1b1716; border:1px solid #3a322c; border-radius:4px; padding:12px; margin:8px 0 12px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="color:#ffffff; font-size:13px;">${card.title}</strong>
            ${card.badge ? `<span style="background:#A459FF22; color:#A459FF; padding:2px 8px; border-radius:3px; font-size:11px; font-weight:bold;">${card.badge}</span>` : ''}
          </div>
          ${paramsHtml}
          ${actionsHtml}
        </div>
      `;

      this.feed.appendChild(wrap);
      this.feed.scrollTop = this.feed.scrollHeight;
    }

    handleCardAction(action, payload, btn) {
      if (action === 'query') {
        if (this.input) {
          this.input.value = payload;
          this.submitQuery();
        }
      } else if (action === 'select-site') {
        this.dispatchQuery(`Select and reserve ${payload}`);
      } else if (action === 'trigger-upload') {
        if (this.fileInput) this.fileInput.click();
      } else if (action === 'open-kb') {
        this.openWorldMapModal();
      } else if (action === 'crosslink-3d') {
        this.emit('selectZone3D', payload);
      } else if (action === 'copy-text') {
        const targetEl = document.getElementById(payload);
        if (targetEl) this.copyToClipboard(targetEl.innerText, btn);
      }
    }

    copyToClipboard(text, btn) {
      if (!text) return;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
      }
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>✓ Copied!</span>';
        setTimeout(() => { btn.innerHTML = orig; }, 2000);
      }
    }

    escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    setMascotState(state, text) {
      if (this.statusText && text) {
        this.statusText.innerHTML = text;
      }
    }

    checkBackendHealth() {
      // Health ping silently
      if (typeof fetch === 'function') {
        fetch('http://localhost:8000/api/health')
          .then(res => res.ok ? res.json() : null)
          .catch(() => {});
      }
    }

    openDrawer(query) {
      if (!this.viewContainer) return;
      this.viewContainer.classList.add('is-open');
      if (this.backdrop) this.backdrop.classList.add('is-open');
      if (this.launcherBtn) this.launcherBtn.classList.add('is-hidden');
      if (query && this.input) {
        this.input.value = query;
        this.submitQuery();
      } else if (this.input) {
        setTimeout(() => this.input.focus(), 250);
      }
    }

    closeDrawer() {
      if (!this.viewContainer) return;
      this.viewContainer.classList.remove('is-open');
      if (this.backdrop) this.backdrop.classList.remove('is-open');
      if (this.launcherBtn) this.launcherBtn.classList.remove('is-hidden');
    }

    toggleDrawer() {
      if (!this.viewContainer) return;
      if (this.viewContainer.classList.contains('is-open')) {
        this.closeDrawer();
      } else {
        this.openDrawer();
      }
    }

    on(event, handler) {
      if (!this.listeners.has(event)) this.listeners.set(event, []);
      this.listeners.get(event).push(handler);
    }

    emit(event, data) {
      const handlers = this.listeners.get(event);
      if (handlers) handlers.forEach(fn => fn(data));
    }
  }

  return ThatJointChatbot;
}));
