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

  // Set transparent background
  ctx.clearRect(0, 0, size, size);

  // Calculate dimensions
  const padding = size * 0.15;
  const innerSize = size - (padding * 2);

  // Create architectural mark
  ctx.save();
  ctx.translate(padding, padding);

  // Draw main shape
  ctx.beginPath();
  
  // Create a modern architectural shape
  const points = [
    [0, 0],                    // Top left
    [innerSize * 0.4, 0],      // Top middle
    [innerSize, 0],            // Top right
    [innerSize, innerSize],    // Bottom right
    [innerSize * 0.6, innerSize], // Bottom middle
    [0, innerSize],            // Bottom left
  ];

  // Draw the shape
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  points.forEach(point => ctx.lineTo(point[0], point[1]));
  ctx.closePath();

  // Fill with gradient
  const gradient = ctx.createLinearGradient(0, 0, innerSize, innerSize);
  gradient.addColorStop(0, '#1a1f2e');
  gradient.addColorStop(1, '#2a3040');
  ctx.fillStyle = gradient;
  ctx.fill();

  // Add subtle highlight
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  ctx.lineTo(points[1][0], points[1][1]);
  ctx.lineTo(points[2][0], points[2][1]);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.lineWidth = Math.max(1, size * 0.04);
  ctx.stroke();

  // Add shadow for depth
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = size * 0.1;
  ctx.shadowOffsetX = size * 0.02;
  ctx.shadowOffsetY = size * 0.02;

  ctx.restore();

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