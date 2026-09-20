const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// SVG for standard icon (512x512)
const standardSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#0369a1" />
    </linearGradient>
    <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#ffffff" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.25" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="512" height="512" rx="104" fill="url(#bgGrad)" />

  <!-- Bridge Arch Accent -->
  <path d="M 80 340 Q 256 160 432 340" stroke="url(#bridgeGrad)" stroke-width="24" stroke-linecap="round" fill="none" opacity="0.35" />
  <path d="M 120 370 Q 256 220 392 370" stroke="#ffffff" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.2" />

  <!-- Main Car Emblem -->
  <g filter="url(#shadow)" transform="translate(106, 140)">
    <!-- Car body -->
    <path d="M45 130 C45 110, 65 95, 95 85 L125 40 C135 25, 155 18, 175 18 L215 18 C235 18, 255 25, 265 40 L295 85 C325 95, 345 110, 345 130 L345 190 C345 200, 335 210, 325 210 L315 210 C305 210, 295 200, 295 190 L295 180 L95 180 L95 190 C95 200, 85 210, 75 210 L65 210 C55 210, 45 200, 45 190 Z" fill="#ffffff" />

    <!-- Windshield -->
    <path d="M128 50 L106 85 L284 85 L262 50 C258 44, 250 40, 242 40 L148 40 C140 40, 132 44, 128 50 Z" fill="#0284c7" />

    <!-- Headlights -->
    <ellipse cx="90" cy="140" rx="20" ry="12" fill="#38bdf8" />
    <ellipse cx="300" cy="140" rx="20" ry="12" fill="#38bdf8" />

    <!-- Wheels -->
    <rect x="85" y="195" width="40" height="18" rx="8" fill="#0f172a" />
    <rect x="265" y="195" width="40" height="18" rx="8" fill="#0f172a" />

    <!-- Front Grille Line -->
    <line x1="150" y1="145" x2="240" y2="145" stroke="#0284c7" stroke-width="8" stroke-linecap="round" />
  </g>

  <!-- Location Pulse Dot on Bridge -->
  <circle cx="256" cy="130" r="16" fill="#38bdf8" />
  <circle cx="256" cy="130" r="28" stroke="#ffffff" stroke-width="4" fill="none" opacity="0.6" />
</svg>
`;

// SVG for Maskable Icon (safe zone padded, full bleed 512x512)
const maskableSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#0369a1" />
    </linearGradient>
    <linearGradient id="bridgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#ffffff" />
    </linearGradient>
  </defs>

  <!-- Solid background for full maskable bleed -->
  <rect width="512" height="512" fill="url(#bgGrad)" />

  <!-- Bridge Arch Accent (Scaled within 80% safe zone) -->
  <path d="M 100 330 Q 256 180 412 330" stroke="url(#bridgeGrad)" stroke-width="20" stroke-linecap="round" fill="none" opacity="0.35" />

  <!-- Scaled Emblem centered in safe zone -->
  <g transform="translate(136, 160) scale(0.8)">
    <!-- Car body -->
    <path d="M45 130 C45 110, 65 95, 95 85 L125 40 C135 25, 155 18, 175 18 L215 18 C235 18, 255 25, 265 40 L295 85 C325 95, 345 110, 345 130 L345 190 C345 200, 335 210, 325 210 L315 210 C305 210, 295 200, 295 190 L295 180 L95 180 L95 190 C95 200, 85 210, 75 210 L65 210 C55 210, 45 200, 45 190 Z" fill="#ffffff" />

    <!-- Windshield -->
    <path d="M128 50 L106 85 L284 85 L262 50 C258 44, 250 40, 242 40 L148 40 C140 40, 132 44, 128 50 Z" fill="#0284c7" />

    <!-- Headlights -->
    <ellipse cx="90" cy="140" rx="20" ry="12" fill="#38bdf8" />
    <ellipse cx="300" cy="140" rx="20" ry="12" fill="#38bdf8" />

    <!-- Wheels -->
    <rect x="85" y="195" width="40" height="18" rx="8" fill="#0f172a" />
    <rect x="265" y="195" width="40" height="18" rx="8" fill="#0f172a" />

    <!-- Front Grille Line -->
    <line x1="150" y1="145" x2="240" y2="145" stroke="#0284c7" stroke-width="8" stroke-linecap="round" />
  </g>

  <!-- Location Pulse Dot -->
  <circle cx="256" cy="150" r="14" fill="#38bdf8" />
</svg>
`;

async function generate() {
  const stdBuf = Buffer.from(standardSvg);
  const maskBuf = Buffer.from(maskableSvg);

  // 1. 512x512 icon
  await sharp(stdBuf)
    .resize(512, 512)
    .png()
    .toFile(path.join(iconsDir, 'icon-512x512.png'));
  console.log('✓ Created icon-512x512.png');

  // 2. 192x192 icon
  await sharp(stdBuf)
    .resize(192, 192)
    .png()
    .toFile(path.join(iconsDir, 'icon-192x192.png'));
  console.log('✓ Created icon-192x192.png');

  // 3. 512x512 maskable icon
  await sharp(maskBuf)
    .resize(512, 512)
    .png()
    .toFile(path.join(iconsDir, 'icon-maskable-512x512.png'));
  console.log('✓ Created icon-maskable-512x512.png');

  // 4. Apple Touch Icon 180x180
  await sharp(stdBuf)
    .resize(180, 180)
    .png()
    .toFile(path.join(iconsDir, 'apple-touch-icon.png'));
  console.log('✓ Created apple-touch-icon.png');

  // Also write SVG source
  fs.writeFileSync(path.join(iconsDir, 'icon.svg'), standardSvg.trim());
  console.log('✓ Created icon.svg');
}

generate().catch(console.error);
