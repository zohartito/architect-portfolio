const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');
const toIco = require('to-ico');

// Create the public directory if it doesn't exist
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Function to create a canvas with an architectural logo
function createLogoCanvas(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Set background
  ctx.fillStyle = '#1a1f2e';
  ctx.fillRect(0, 0, size, size);

  // Calculate dimensions
  const padding = size * 0.15;
  const innerSize = size - (padding * 2);

  // Create architectural mark
  ctx.save();
  ctx.translate(padding, padding);

  // Add subtle gradient for depth
  const gradient = ctx.createLinearGradient(0, 0, innerSize, innerSize);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(1, '#e0e0e0');
  ctx.fillStyle = gradient;

  // Draw architectural elements
  ctx.beginPath();
  
  // Left vertical line (Z)
  ctx.moveTo(0, 0);
  ctx.lineTo(0, innerSize);
  
  // Diagonal line (Z)
  ctx.lineTo(innerSize, 0);
  
  // Right vertical line (Z)
  ctx.lineTo(innerSize, innerSize);
  
  // Add thickness to the strokes
  ctx.lineWidth = Math.max(1, size * 0.06);
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();

  // Add a subtle shadow for depth
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = size * 0.05;
  ctx.shadowOffsetX = size * 0.02;
  ctx.shadowOffsetY = size * 0.02;

  // Add horizontal elements (suggesting floors/levels)
  const levels = 3;
  const levelHeight = innerSize / (levels + 1);
  
  for (let i = 1; i <= levels; i++) {
    const y = levelHeight * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(innerSize * 0.3, y);
    ctx.lineWidth = Math.max(1, size * 0.03);
    ctx.stroke();
  }

  ctx.restore();

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