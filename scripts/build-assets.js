import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Main Logo: logo-consulenti-privacy.png
const logoMainSvg = `
<svg width="600" height="150" viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradBrand" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8C82DE" />
      <stop offset="45%" stop-color="#5A4FC0" />
      <stop offset="100%" stop-color="#302687" />
    </linearGradient>
    <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#302687" flood-opacity="0.15" />
    </filter>
  </defs>
  <g transform="translate(15, 20)">
    <!-- Shield / CP emblem -->
    <rect x="0" y="0" width="110" height="110" rx="26" fill="url(#gradBrand)" filter="url(#softGlow)"/>
    <!-- Inner geometric stylized CP / Shield lock -->
    <path d="M 55 24 L 84 37 V 62 C 84 79 72 93 55 98 C 38 93 26 79 26 62 V 37 Z" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linejoin="round"/>
    <path d="M 44 60 L 52 68 L 68 50" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <!-- Text Brand -->
  <text x="145" y="70" font-family="'Poppins', sans-serif" font-size="34" font-weight="800" fill="#302687" letter-spacing="-0.5">CONSULENTI PRIVACY</text>
  <text x="148" y="104" font-family="'Poppins', sans-serif" font-size="14" font-weight="600" fill="#5E5B78" letter-spacing="4.5">COMPLIANCE · NIS2 · AI ACT</text>
</svg>
`;

// 2. Footer Icon: logo-icona-footer.png
const logoFooterSvg = `
<svg width="240" height="240" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="footerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8C82DE" />
      <stop offset="60%" stop-color="#5A4FC0" />
      <stop offset="100%" stop-color="#302687" />
    </linearGradient>
  </defs>
  <rect x="10" y="10" width="220" height="220" rx="52" fill="url(#footerGrad)"/>
  <path d="M 120 48 L 180 75 V 126 C 180 162 155 192 120 202 C 85 192 60 162 60 126 V 75 Z" fill="none" stroke="#FFFFFF" stroke-width="12" stroke-linejoin="round"/>
  <path d="M 98 122 L 114 138 L 148 102" fill="none" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

// Client logos helper
const clientLogos = [
  {
    filename: 'cliente-belle.png',
    svg: `
      <svg width="360" height="100" viewBox="0 0 360 100" xmlns="http://www.w3.org/2000/svg">
        <text x="180" y="60" text-anchor="middle" font-family="'Georgia', serif" font-size="38" font-weight="bold" fill="#1E1B3A" letter-spacing="6">B E L L E</text>
        <text x="180" y="80" text-anchor="middle" font-family="'Poppins', sans-serif" font-size="10" font-weight="600" fill="#5E5B78" letter-spacing="4">BEAUTY &amp; WELLNESS</text>
      </svg>
    `
  },
  {
    filename: 'cliente-babbi.png',
    svg: `
      <svg width="360" height="100" viewBox="0 0 360 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="70" y="24" width="220" height="52" rx="26" fill="#1E1B3A" />
        <text x="180" y="60" text-anchor="middle" font-family="'Poppins', sans-serif" font-size="32" font-weight="900" fill="#FFFFFF" letter-spacing="4">BABBI</text>
      </svg>
    `
  },
  {
    filename: 'cliente-gruppo-carli.png',
    svg: `
      <svg width="360" height="100" viewBox="0 0 360 100" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(60, 26)">
          <path d="M 16 4 C 8 16 8 32 20 40 C 24 24 36 12 16 4 Z" fill="#1E1B3A" />
          <path d="M 28 14 C 24 26 26 36 34 40 C 36 28 42 20 28 14 Z" fill="#5E5B78" />
        </g>
        <text x="110" y="52" font-family="'Poppins', sans-serif" font-size="22" font-weight="800" fill="#1E1B3A" letter-spacing="1">GRUPPO CARLI</text>
        <text x="112" y="68" font-family="'Poppins', sans-serif" font-size="9" font-weight="600" fill="#5E5B78" letter-spacing="3">AGRICOLTURA SOSTENIBILE</text>
      </svg>
    `
  },
  {
    filename: 'cliente-santa-rita.png',
    svg: `
      <svg width="360" height="100" viewBox="0 0 360 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="95" cy="50" r="22" fill="none" stroke="#1E1B3A" stroke-width="3" />
        <path d="M 95 35 L 95 65 M 80 50 L 110 50" stroke="#1E1B3A" stroke-width="3" stroke-linecap="round" />
        <text x="130" y="50" font-family="'Poppins', sans-serif" font-size="21" font-weight="700" fill="#1E1B3A" letter-spacing="1.5">SANTA RITA</text>
        <text x="130" y="68" font-family="'Poppins', sans-serif" font-size="10" font-weight="500" fill="#5E5B78" letter-spacing="1.5">BIO &amp; TRADIZIONE</text>
      </svg>
    `
  },
  {
    filename: 'cliente-urbinati.png',
    svg: `
      <svg width="360" height="100" viewBox="0 0 360 100" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(65, 28)">
          <rect x="0" y="0" width="40" height="40" rx="8" fill="#1E1B3A" />
          <path d="M 12 12 L 20 28 L 28 12" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <text x="120" y="54" font-family="'Poppins', sans-serif" font-size="24" font-weight="800" fill="#1E1B3A" letter-spacing="3">URBINATI</text>
        <text x="122" y="70" font-family="'Poppins', sans-serif" font-size="9" font-weight="600" fill="#5E5B78" letter-spacing="2">HORTICULTURAL AUTOMATION</text>
      </svg>
    `
  },
  {
    filename: 'cliente-pumaisdue.png',
    svg: `
      <svg width="360" height="100" viewBox="0 0 360 100" xmlns="http://www.w3.org/2000/svg">
        <text x="180" y="56" text-anchor="middle" font-family="'Poppins', sans-serif" font-size="26" font-weight="900" fill="#1E1B3A" letter-spacing="2">PUMAISDUE</text>
        <text x="180" y="74" text-anchor="middle" font-family="'Poppins', sans-serif" font-size="9" font-weight="600" fill="#5E5B78" letter-spacing="3">CINEMA · TV · DUBBING</text>
      </svg>
    `
  },
  {
    filename: 'cliente-citrus.png',
    svg: `
      <svg width="360" height="100" viewBox="0 0 360 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="85" cy="50" r="18" fill="#1E1B3A" />
        <circle cx="85" cy="50" r="12" fill="#FFFFFF" />
        <circle cx="85" cy="50" r="5" fill="#1E1B3A" />
        <text x="115" y="58" font-family="'Poppins', sans-serif" font-size="28" font-weight="800" fill="#1E1B3A" letter-spacing="1">citrus</text>
        <text x="215" y="44" font-family="'Poppins', sans-serif" font-size="10" font-weight="600" fill="#5E5B78">®</text>
        <text x="117" y="74" font-family="'Poppins', sans-serif" font-size="9" font-weight="600" fill="#5E5B78" letter-spacing="1.5">L'ORTO ITALIANO</text>
      </svg>
    `
  },
  {
    filename: 'cliente-polidesign.png',
    svg: `
      <svg width="360" height="100" viewBox="0 0 360 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="55" y="32" width="20" height="20" fill="#D92D20" />
        <text x="85" y="52" font-family="'Poppins', sans-serif" font-size="24" font-weight="700" fill="#1E1B3A">POLI<tspan font-weight="300">.design</tspan></text>
        <text x="85" y="68" font-family="'Poppins', sans-serif" font-size="8.5" font-weight="500" fill="#5E5B78" letter-spacing="0.5">FOUNDED BY POLITECNICO DI MILANO</text>
      </svg>
    `
  }
];

async function generate() {
  console.log('Generating main logo...');
  await sharp(Buffer.from(logoMainSvg))
    .png()
    .toFile(path.join(publicDir, 'logo-consulenti-privacy.png'));

  console.log('Generating footer logo...');
  await sharp(Buffer.from(logoFooterSvg))
    .png()
    .toFile(path.join(publicDir, 'logo-icona-footer.png'));

  for (const client of clientLogos) {
    console.log(`Generating ${client.filename}...`);
    await sharp(Buffer.from(client.svg))
      .png()
      .toFile(path.join(publicDir, client.filename));
  }

  console.log('All image assets generated successfully in public/');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
