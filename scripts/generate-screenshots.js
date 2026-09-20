const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const screenshotsDir = path.join(__dirname, '..', 'public', 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// 1. Desktop Screenshot SVG (1280x720)
const desktopSvg = `
<svg width="1280" height="720" viewBox="0 0 1280 720" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1280" height="720" fill="#f8fafc" />

  <!-- Navbar -->
  <rect width="1280" height="64" fill="#ffffff" />
  <line x1="0" y1="64" x2="1280" y2="64" stroke="#e2e8f0" stroke-width="1" />
  <rect x="48" y="16" width="32" height="32" rx="8" fill="#0284c7" />
  <text x="92" y="38" font-family="-apple-system, sans-serif" font-size="18" font-weight="bold" fill="#0f172a">RideBridge</text>
  <rect x="1100" y="14" width="130" height="36" rx="10" fill="#0284c7" />
  <text x="1135" y="37" font-family="-apple-system, sans-serif" font-size="13" font-weight="bold" fill="#ffffff">Post a Trip</text>

  <!-- Hero -->
  <rect x="0" y="65" width="1280" height="340" fill="#f0f9ff" />
  <rect x="480" y="100" width="320" height="28" rx="14" fill="#ffffff" stroke="#bae6fd" />
  <text x="510" y="119" font-family="-apple-system, sans-serif" font-size="12" font-weight="bold" fill="#0369a1">DIRECT PEER-TO-PEER CARPOOLING</text>
  <text x="320" y="180" font-family="-apple-system, sans-serif" font-size="38" font-weight="800" fill="#0f172a">I’m already going there. Let’s share the journey.</text>
  <text x="390" y="220" font-family="-apple-system, sans-serif" font-size="16" fill="#64748b">Connect directly with drivers already traveling along your route.</text>

  <!-- Search Card -->
  <rect x="240" y="270" width="800" height="80" rx="16" fill="#ffffff" stroke="#e2e8f0" />
  <rect x="260" y="285" width="220" height="50" rx="12" fill="#f8fafc" stroke="#e2e8f0" />
  <text x="280" y="315" font-family="-apple-system, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">Pune (Swargate)</text>
  <rect x="500" y="285" width="220" height="50" rx="12" fill="#f8fafc" stroke="#e2e8f0" />
  <text x="520" y="315" font-family="-apple-system, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">Hyderabad (Gachibowli)</text>
  <rect x="740" y="285" width="140" height="50" rx="12" fill="#f8fafc" stroke="#e2e8f0" />
  <text x="760" y="315" font-family="-apple-system, sans-serif" font-size="14" font-weight="bold" fill="#0f172a">25 Sep 2026</text>
  <rect x="900" y="285" width="120" height="50" rx="12" fill="#0284c7" />
  <text x="930" y="315" font-family="-apple-system, sans-serif" font-size="14" font-weight="bold" fill="#ffffff">Find Rides</text>

  <!-- Cards Grid -->
  <rect x="120" y="440" width="320" height="220" rx="16" fill="#ffffff" stroke="#e2e8f0" />
  <text x="140" y="475" font-family="-apple-system, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">Pune ➔ Hyderabad</text>
  <text x="140" y="505" font-family="-apple-system, sans-serif" font-size="13" fill="#64748b">Vikram Joshi • 4.95 ★ (Verified Driver)</text>
  <rect x="140" y="530" width="120" height="26" rx="8" fill="#ecfdf5" stroke="#a7f3d0" />
  <text x="155" y="548" font-family="-apple-system, sans-serif" font-size="12" font-weight="bold" fill="#065f46">2 Seats Available</text>
  <rect x="140" y="590" width="280" height="40" rx="10" fill="#0284c7" />
  <text x="240" y="615" font-family="-apple-system, sans-serif" font-size="13" font-weight="bold" fill="#ffffff">View Trip</text>

  <rect x="480" y="440" width="320" height="220" rx="16" fill="#ffffff" stroke="#e2e8f0" />
  <text x="500" y="475" font-family="-apple-system, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">Pune ➔ Solapur</text>
  <text x="500" y="505" font-family="-apple-system, sans-serif" font-size="13" fill="#64748b">Ananya Deshmukh • 4.88 ★</text>
  <rect x="500" y="530" width="120" height="26" rx="8" fill="#f0f9ff" stroke="#bae6fd" />
  <text x="515" y="548" font-family="-apple-system, sans-serif" font-size="12" font-weight="bold" fill="#0369a1">3 Seats Available</text>
  <rect x="500" y="590" width="280" height="40" rx="10" fill="#0284c7" />
  <text x="600" y="615" font-family="-apple-system, sans-serif" font-size="13" font-weight="bold" fill="#ffffff">View Trip</text>

  <rect x="840" y="440" width="320" height="220" rx="16" fill="#ffffff" stroke="#e2e8f0" />
  <text x="860" y="475" font-family="-apple-system, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">Mumbai ➔ Pune</text>
  <text x="860" y="505" font-family="-apple-system, sans-serif" font-size="13" fill="#64748b">Rajesh Nair • 4.7 ★ (EV Ride)</text>
  <rect x="860" y="530" width="120" height="26" rx="8" fill="#ecfdf5" stroke="#a7f3d0" />
  <text x="875" y="548" font-family="-apple-system, sans-serif" font-size="12" font-weight="bold" fill="#065f46">1 Seat Available</text>
  <rect x="860" y="590" width="280" height="40" rx="10" fill="#0284c7" />
  <text x="960" y="615" font-family="-apple-system, sans-serif" font-size="13" font-weight="bold" fill="#ffffff">View Trip</text>
</svg>
`;

// 2. Mobile Screenshot SVG (750x1334)
const mobileSvg = `
<svg width="750" height="1334" viewBox="0 0 750 1334" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="750" height="1334" fill="#f8fafc" />

  <!-- Top Bar -->
  <rect width="750" height="96" fill="#ffffff" />
  <line x1="0" y1="96" x2="750" y2="96" stroke="#e2e8f0" stroke-width="1" />
  <rect x="36" y="24" width="48" height="48" rx="12" fill="#0284c7" />
  <text x="96" y="56" font-family="-apple-system, sans-serif" font-size="24" font-weight="bold" fill="#0f172a">RideBridge</text>
  <rect x="560" y="24" width="150" height="48" rx="12" fill="#0284c7" />
  <text x="600" y="54" font-family="-apple-system, sans-serif" font-size="16" font-weight="bold" fill="#ffffff">Post Trip</text>

  <!-- Hero & Search -->
  <rect x="0" y="97" width="750" height="440" fill="#f0f9ff" />
  <text x="36" y="160" font-family="-apple-system, sans-serif" font-size="14" font-weight="bold" fill="#0369a1">DIRECT PEER CARPOOLING</text>
  <text x="36" y="210" font-family="-apple-system, sans-serif" font-size="34" font-weight="800" fill="#0f172a">I’m already going there.</text>
  <text x="36" y="255" font-family="-apple-system, sans-serif" font-size="34" font-weight="800" fill="#0284c7">Let’s share the journey.</text>

  <!-- Mobile Search Input Box -->
  <rect x="36" y="280" width="678" height="230" rx="20" fill="#ffffff" stroke="#e2e8f0" />
  <rect x="56" y="300" width="638" height="56" rx="12" fill="#f8fafc" stroke="#e2e8f0" />
  <text x="80" y="335" font-family="-apple-system, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">Leaving: Pune (Swargate)</text>
  <rect x="56" y="370" width="638" height="56" rx="12" fill="#f8fafc" stroke="#e2e8f0" />
  <text x="80" y="405" font-family="-apple-system, sans-serif" font-size="16" font-weight="bold" fill="#0f172a">Going: Hyderabad (Gachibowli)</text>
  <rect x="56" y="440" width="638" height="56" rx="12" fill="#0284c7" />
  <text x="310" y="475" font-family="-apple-system, sans-serif" font-size="18" font-weight="bold" fill="#ffffff">Find Rides</text>

  <!-- Trip Card 1 -->
  <rect x="36" y="560" width="678" height="280" rx="20" fill="#ffffff" stroke="#e2e8f0" />
  <text x="64" y="605" font-family="-apple-system, sans-serif" font-size="22" font-weight="bold" fill="#0f172a">Pune ➔ Hyderabad</text>
  <text x="64" y="640" font-family="-apple-system, sans-serif" font-size="15" fill="#64748b">25 Sep 2026 • 08:00 AM • 2 seats left</text>
  <text x="64" y="680" font-family="-apple-system, sans-serif" font-size="15" font-weight="bold" fill="#0f172a">Vikram Joshi ★ 4.95 (Verified)</text>
  <rect x="64" y="740" width="622" height="56" rx="14" fill="#0284c7" />
  <text x="310" y="775" font-family="-apple-system, sans-serif" font-size="17" font-weight="bold" fill="#ffffff">View Trip Details</text>

  <!-- Trip Card 2 -->
  <rect x="36" y="870" width="678" height="280" rx="20" fill="#ffffff" stroke="#e2e8f0" />
  <text x="64" y="915" font-family="-apple-system, sans-serif" font-size="22" font-weight="bold" fill="#0f172a">Pune ➔ Solapur</text>
  <text x="64" y="950" font-family="-apple-system, sans-serif" font-size="15" fill="#64748b">25 Sep 2026 • 07:30 AM • 3 seats left</text>
  <text x="64" y="990" font-family="-apple-system, sans-serif" font-size="15" font-weight="bold" fill="#0f172a">Ananya Deshmukh ★ 4.88 (Verified)</text>
  <rect x="64" y="1050" width="622" height="56" rx="14" fill="#0284c7" />
  <text x="310" y="1085" font-family="-apple-system, sans-serif" font-size="17" font-weight="bold" fill="#ffffff">View Trip Details</text>

  <!-- Mobile Bottom Nav Bar -->
  <rect y="1234" width="750" height="100" fill="#ffffff" stroke="#e2e8f0" />
  <text x="65" y="1290" font-family="-apple-system, sans-serif" font-size="14" font-weight="bold" fill="#0284c7">Home</text>
  <text x="220" y="1290" font-family="-apple-system, sans-serif" font-size="14" font-weight="bold" fill="#64748b">Trips</text>
  <text x="365" y="1290" font-family="-apple-system, sans-serif" font-size="14" font-weight="bold" fill="#64748b">Requests</text>
  <text x="515" y="1290" font-family="-apple-system, sans-serif" font-size="14" font-weight="bold" fill="#64748b">Messages</text>
  <text x="650" y="1290" font-family="-apple-system, sans-serif" font-size="14" font-weight="bold" fill="#64748b">Profile</text>
</svg>
`;

async function generateScreenshots() {
  await sharp(Buffer.from(desktopSvg))
    .resize(1280, 720)
    .png()
    .toFile(path.join(screenshotsDir, 'screenshot-desktop.png'));
  console.log('✓ Created screenshot-desktop.png');

  await sharp(Buffer.from(mobileSvg))
    .resize(750, 1334)
    .png()
    .toFile(path.join(screenshotsDir, 'screenshot-mobile.png'));
  console.log('✓ Created screenshot-mobile.png');
}

generateScreenshots().catch(console.error);
