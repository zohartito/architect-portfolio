const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');
const toIco = require('to-ico');

// Create the public directory if it doesn't exist
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Function to create a canvas with the ZT logo
function createLogoCanvas(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Clear background
  ctx.clearRect(0, 0, size, size);

  // Draw rounded rectangle background
  const radius = size * 0.15; // Equivalent to rx="15" in 100x100
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(size - radius, 0);
  ctx.quadraticCurveTo(size, 0, size, radius);
  ctx.lineTo(size, size - radius);
  ctx.quadraticCurveTo(size, size, size - radius, size);
  ctx.lineTo(radius, size);
  ctx.quadraticCurveTo(0, size, 0, size - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();

  // Fill with exact color from SVG
  ctx.fillStyle = '#4A90E2';
  ctx.fill();

  // Set text properties
  const fontSize = size * 0.48; // Equivalent to 48 in 100x100
  ctx.fillStyle = 'white';
  ctx.font = `bold ${fontSize}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw text
  ctx.fillText('ZT', size / 2, size / 2);

  return canvas;
}

// Generate different sizes for various devices and contexts
const sizes = {
  favicon16: 16,
  favicon32: 32,
  favicon48: 48,
  favicon64: 64,
  apple180: 180,
  android192: 192,
  android512: 512
};

// Store PNG buffers for ICO generation (only the most common favicon sizes)
const icoSizes = [16, 32, 48];
const pngBuffers = [];

// Generate and save PNG files
Object.entries(sizes).forEach(([name, size]) => {
  const canvas = createLogoCanvas(size);
  const buffer = canvas.toBuffer('image/png');
  
  // Store buffers for ICO generation
  if (icoSizes.includes(size)) {
    pngBuffers.push(buffer);
  }
  
  // Determine filename based on size and purpose
  let fileName;
  if (name.startsWith('favicon')) {
    fileName = `favicon-${size}x${size}.png`;
  } else if (name.startsWith('apple')) {
    fileName = 'apple-touch-icon.png';
  } else if (name.startsWith('android')) {
    fileName = `android-chrome-${size}x${size}.png`;
  }
  
  fs.writeFileSync(path.join(publicDir, fileName), buffer);
  console.log(`Generated ${fileName}`);
});

// Generate favicon.ico with multiple sizes
toIco(pngBuffers).then(buf => {
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), buf);
  console.log('Generated favicon.ico with sizes:', icoSizes.join('x, ') + 'x');
}).catch(err => {
  console.error('Error generating favicon.ico:', err);
});

console.log('All icons generated successfully!'); 