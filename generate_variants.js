const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imgDir = path.join(__dirname, 'public', 'images');
const outputDir = path.join(__dirname);

const variants = [
  {
    name: 'variant_facade.png',
    bg: path.join(imgDir, 'hero.jpg'),
    title: 'ONE BUILDING.<br/>ONE OWNER.<br/><tspan fill="#c9a96a">FIFTY TWO.</tspan>',
    subtitle: 'A four-storied private residence of 4,664 sq ft on Krishna Chandra Dey Sarani — fully sanctioned, actively under construction, and offered in its entirety to a single buyer.'
  },
  {
    name: 'variant_penthouse.png',
    bg: path.join(imgDir, 'tour-penthouse-terrace.webp'),
    title: 'THE PENTHOUSE.<br/>THE TERRACE.<br/><tspan fill="#c9a96a">FIFTY TWO.</tspan>',
    subtitle: 'An exclusive upper-floor retreat featuring a study and a grand 21\'3" x 13\'0" private open terrace overlooking the tree-lined avenues of New Alipore.'
  },
  {
    name: 'variant_interior.png',
    bg: path.join(imgDir, 'tour-living-dining.webp'),
    title: 'YOUR DESIGN.<br/>YOUR LEGACY.<br/><tspan fill="#c9a96a">FIFTY TWO.</tspan>',
    subtitle: 'Two full-floor residences plus penthouse. Fully customizable layouts and premium bespoke finishes tailored to a single family\'s vision.'
  }
];

async function generateVariants() {
  console.log('Starting variant generation...');
  for (const variant of variants) {
    if (!fs.existsSync(variant.bg)) {
      console.error(`Background image not found: ${variant.bg}`);
      continue;
    }

    // Convert title HTML-like tags to SVG tspan format
    const lines = variant.title.split('<br/>');
    let titleSvgText = '';
    let currentY = 510;
    for (const line of lines) {
      titleSvgText += `<text x="90" y="${currentY}" font-family="Marcellus, Georgia, serif" font-size="80" font-weight="normal" fill="#ece7de" letter-spacing="4" text-anchor="start">${line}</text>\n`;
      currentY += 86;
    }

    // Handle multiline subtitle wrap
    const words = variant.subtitle.split(' ');
    let subtitleLines = [];
    let currentLine = '';
    for (const word of words) {
      if ((currentLine + ' ' + word).length > 65) {
        subtitleLines.push(currentLine.trim());
        currentLine = word;
      } else {
        currentLine += ' ' + word;
      }
    }
    if (currentLine) {
      subtitleLines.push(currentLine.trim());
    }

    let subtitleSvgText = '';
    let subY = currentY + 10;
    for (const subLine of subtitleLines) {
      subtitleSvgText += `<text x="90" y="${subY}" font-family="'Hanken Grotesk', system-ui, sans-serif" font-size="20" font-weight="300" fill="rgba(236, 230, 222, 0.75)" letter-spacing="1" text-anchor="start">${subLine}</text>\n`;
      subY += 32;
    }

    // SVG Overlay
    const svgOverlay = `
      <svg width="1080" height="1350" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#121317" stop-opacity="0.65"/>
            <stop offset="35%" stop-color="#121317" stop-opacity="0.15"/>
            <stop offset="100%" stop-color="#121317" stop-opacity="0.96"/>
          </linearGradient>
          <radialGradient id="radial" cx="0.2" cy="0.7" r="0.45">
            <stop offset="0%" stop-color="#c9a96a" stop-opacity="0.22"/>
            <stop offset="100%" stop-color="#121317" stop-opacity="0"/>
          </radialGradient>
        </defs>

        <!-- Gradients -->
        <rect width="1080" height="1350" fill="url(#grad)"/>
        <rect width="1080" height="1350" fill="url(#radial)" style="mix-blend-mode: screen;"/>

        <!-- Watermark / Brand Label -->
        <text x="990" y="100" font-family="'Hanken Grotesk', system-ui, sans-serif" font-size="12" font-weight="600" fill="rgba(236, 230, 222, 0.6)" letter-spacing="4.5" text-anchor="end">FIFTY TWO</text>

        <!-- Vertical Spine Line -->
        <line x1="60" y1="400" x2="60" y2="${subY + 80}" stroke="#c9a96a" stroke-width="1.5" opacity="0.8"/>
        
        <!-- Eyebrow -->
        <line x1="90" y1="365" x2="122" y2="365" stroke="#ff5f3b" stroke-width="1.5"/>
        <text x="136" y="370" font-family="'Hanken Grotesk', system-ui, sans-serif" font-size="15" font-weight="600" fill="#ff5f3b" letter-spacing="3.5" text-anchor="start">NEW ALIPORE · KOLKATA 700053</text>

        <!-- Title Lines -->
        ${titleSvgText}

        <!-- Subtitle Lines -->
        ${subtitleSvgText}

        <!-- CTA Buttons -->
        <!-- Solid Button -->
        <rect x="90" y="${subY + 50}" width="260" height="54" fill="#c9a96a"/>
        <text x="220" y="${subY + 82}" font-family="'Hanken Grotesk', system-ui, sans-serif" font-size="11" font-weight="600" fill="#121317" letter-spacing="2" text-anchor="middle">REQUEST DOSSIER</text>

        <!-- Ghost Button -->
        <rect x="366" y="${subY + 50}" width="260" height="54" fill="rgba(18, 19, 23, 0.25)" stroke="rgba(236, 230, 222, 0.35)" stroke-width="1"/>
        <text x="496" y="${subY + 82}" font-family="'Hanken Grotesk', system-ui, sans-serif" font-size="11" font-weight="600" fill="#ece7de" letter-spacing="2" text-anchor="middle">VIEW PLANS ↓</text>

        <!-- Footer Strip -->
        <line x1="90" y1="1250" x2="990" y2="1250" stroke="rgba(236, 230, 222, 0.1)" stroke-width="1"/>
        <text x="90" y="1290" font-family="'Hanken Grotesk', system-ui, sans-serif" font-size="13" font-weight="normal" fill="#9ba0a8" letter-spacing="0.5" text-anchor="start">Premises No. 52, Krishna Chandra Dey Sarani</text>
        <text x="990" y="1290" font-family="'Hanken Grotesk', system-ui, sans-serif" font-size="13" font-weight="600" fill="rgba(236, 230, 222, 0.78)" letter-spacing="2" text-anchor="end">G+3 · PRICE ON REQUEST</text>
      </svg>
    `;

    try {
      const overlayBuffer = Buffer.from(svgOverlay);

      // Resize and composite background image
      await sharp(variant.bg)
        .resize(1080, 1350, {
          fit: 'cover',
          position: 'center'
        })
        .composite([{ input: overlayBuffer, top: 0, left: 0 }])
        .png({ quality: 95 })
        .toFile(path.join(outputDir, variant.name));

      console.log(`Generated: ${variant.name}`);
    } catch (err) {
      console.error(`Error generating ${variant.name}:`, err);
    }
  }
  console.log('All variants generated successfully!');
}

generateVariants();
