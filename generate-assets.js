const Jimp = require('jimp');

async function generate() {
  console.log('Reading logo.png...');
  const logo = await Jimp.read('assets/logo.png');
  
  // 1. icon.png (1024x1024)
  console.log('Generating icon.png...');
  const icon = await new Jimp(1024, 1024, 0xFFFFFFFF);
  const logoForIcon = logo.clone().scaleToFit(900, 900);
  icon.composite(logoForIcon, (1024 - logoForIcon.bitmap.width) / 2, (1024 - logoForIcon.bitmap.height) / 2);
  await icon.writeAsync('assets/icon.png');
  
  // 2. adaptive-icon.png (1024x1024 transparent foreground)
  console.log('Generating adaptive-icon.png...');
  const adaptive = await new Jimp(1024, 1024, 0x00000000);
  const logoForAdaptive = logo.clone().scaleToFit(700, 700);
  adaptive.composite(logoForAdaptive, (1024 - logoForAdaptive.bitmap.width) / 2, (1024 - logoForAdaptive.bitmap.height) / 2);
  await adaptive.writeAsync('assets/adaptive-icon.png');
  
  // 3. splash.png (1242x2436)
  console.log('Generating splash.png...');
  const splash = await new Jimp(1242, 2436, 0xFFFFFFFF);
  const logoForSplash = logo.clone().scaleToFit(800, 800);
  splash.composite(logoForSplash, (1242 - logoForSplash.bitmap.width) / 2, (2436 - logoForSplash.bitmap.height) / 2);
  await splash.writeAsync('assets/splash.png');
  
  // 4. favicon.png (48x48)
  console.log('Generating favicon.png...');
  const favicon = await new Jimp(48, 48, 0x00000000);
  const logoForFavicon = logo.clone().scaleToFit(48, 48);
  favicon.composite(logoForFavicon, (48 - logoForFavicon.bitmap.width) / 2, (48 - logoForFavicon.bitmap.height) / 2);
  await favicon.writeAsync('assets/favicon.png');

  // 5. notification-icon.png (96x96, white silhouette)
  console.log('Generating notification-icon.png...');
  const notif = await new Jimp(96, 96, 0x00000000);
  const logoForNotif = logo.clone().scaleToFit(96, 96);
  
  logoForNotif.scan(0, 0, logoForNotif.bitmap.width, logoForNotif.bitmap.height, function(x, y, idx) {
    var alpha = this.bitmap.data[idx + 3];
    if (alpha > 50) {
      this.bitmap.data[idx + 0] = 255;
      this.bitmap.data[idx + 1] = 255;
      this.bitmap.data[idx + 2] = 255;
      this.bitmap.data[idx + 3] = 255;
    } else {
      this.bitmap.data[idx + 3] = 0;
    }
  });
  notif.composite(logoForNotif, (96 - logoForNotif.bitmap.width) / 2, (96 - logoForNotif.bitmap.height) / 2);
  await notif.writeAsync('assets/notification-icon.png');

  console.log('All images generated successfully!');
}

generate().catch(console.error);
