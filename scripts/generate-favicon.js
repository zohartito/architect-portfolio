const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');
const toIco = require('to-ico');

// Create the public directory if it doesn't exist
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Function to create a canvas with a Z logo
function createLogoCanvas(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Clear and set background
  ctx.fillStyle = '#1a1f2e'; // Dark grey background
  ctx.fillRect(0, 0, size, size);

  // Calculate optimal font size (larger to fill the space)
  const fontSize = Math.round(size * 0.8); // Increased from 0.6 to 0.8
  
  // Set text properties for high quality rendering
  ctx.fillStyle = 'white';
  ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Enable font smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Calculate text metrics to center perfectly
  const text = 'Z';
  const metrics = ctx.measureText(text);
  const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
  
  // Draw text with vertical centering compensation
  const yOffset = (size - actualHeight) / 2 + metrics.actualBoundingBoxAscent;
  ctx.fillText(text, size/2, yOffset);

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

// Store PNG buffers for ICO generation
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