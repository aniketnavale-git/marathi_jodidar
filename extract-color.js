const Jimp = require('jimp');

async function getThemeColor() {
  const logo = await Jimp.read('assets/logo.png');
  let colorCounts = {};
  
  logo.scan(0, 0, logo.bitmap.width, logo.bitmap.height, function(x, y, idx) {
    var r = this.bitmap.data[idx + 0];
    var g = this.bitmap.data[idx + 1];
    var b = this.bitmap.data[idx + 2];
    var a = this.bitmap.data[idx + 3];
    
    if (a > 200) { 
      // ignore pure white and pure black to find the actual brand color
      if ((r > 245 && g > 245 && b > 245) || (r < 15 && g < 15 && b < 15)) return;
      
      const hex = '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
      
      // Quantize slightly to group similar colors
      const quantizedHex = hex.substring(0, 6) + '0'; 
      
      colorCounts[hex] = (colorCounts[hex] || 0) + 1;
    }
  });

  let dominantColor = '#E65100'; // Default fallback
  let maxCount = 0;
  for (const [color, count] of Object.entries(colorCounts)) {
    if (count > maxCount) {
      maxCount = count;
      dominantColor = color;
    }
  }
  
  console.log('DOMINANT_COLOR:', dominantColor);
}

getThemeColor().catch(console.error);
