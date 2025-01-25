const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create the public directory if it doesn't exist
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Function to create a canvas with the ZT logo
function createLogoCanvas(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Set background
  ctx.fillStyle = '#1a1f2e';
  ctx.fillRect(0, 0, size, size);

  // Calculate padding and sizes
  const padding = size * 0.2;
  const fontSize = size * 0.4;

  // Set text properties
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;

  // Add subtle gradient
  const gradient = ctx.createLinearGradient(padding, padding, size - padding, size - padding);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(1, '#e0e0e0');
  ctx.fillStyle = gradient;

  // Draw text with slight shadow for depth
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = size * 0.05;
  ctx.shadowOffsetX = size * 0.02;
  ctx.shadowOffsetY = size * 0.02;
  ctx.fillText('ZT', size / 2, size / 2);

  return canvas;
}

// Generate different sizes for various devices and contexts
const sizes = {
  favicon16: 16,
  favicon32: 32,
  favicon48: 48,
  favicon64: 64,
  favicon96: 96,
  favicon128: 128,
  favicon256: 256,
  apple180: 180,
  android192: 192,
  android512: 512
};

// Generate and save PNG files
Object.entries(sizes).forEach(([name, size]) => {
  const canvas = createLogoCanvas(size);
  const buffer = canvas.toBuffer('image/png');
  
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

console.log('All icons generated successfully!'); 