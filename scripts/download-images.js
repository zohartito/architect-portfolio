const https = require('https');
const fs = require('fs');
const path = require('path');

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
};

const images = [
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d',
  'https://images.unsplash.com/photo-1600573472592-401b489a3cdc'
];

async function downloadAll() {
  try {
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public');
    }

    // Download hero background
    console.log('Downloading hero background...');
    await downloadImage(
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=3000&auto=format&fit=crop',
      path.join('public', 'hero-bg.jpg')
    );
    console.log('Downloaded hero background');

    // Download project images
    for (let i = 0; i < images.length; i++) {
      const filepath = path.join('public', `architecture${i + 1}.jpg`);
      console.log(`Downloading image ${i + 1}...`);
      await downloadImage(`${images[i]}?q=80&w=2000&auto=format&fit=crop`, filepath);
      console.log(`Downloaded ${filepath}`);
    }
    
    console.log('All images downloaded successfully!');
  } catch (err) {
    console.error('Error downloading images:', err);
  }
}

downloadAll(); 