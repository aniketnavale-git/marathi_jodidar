const Jimp = require('jimp');

async function generate() {
  console.log('Reading logo.png...');
  const logo = await Jimp.read('assets/logo.png');
  
  // 1. App Icon (512x512) - icon.png
  console.log('Generating App Icon (512x512)...');
  const icon = await new Jimp(512, 512, 0xFFFFFFFF);
  const logoForIcon = logo.clone().scaleToFit(400, 400);
  icon.composite(logoForIcon, (512 - logoForIcon.bitmap.width) / 2, (512 - logoForIcon.bitmap.height) / 2);
  await icon.writeAsync('assets/icon.png');
  
  // 2. Adaptive Icon Foreground (1024x1024 transparent)
  console.log('Generating Adaptive Icon Foreground...');
  const adaptiveFg = await new Jimp(1024, 1024, 0x00000000);
  const logoForAdaptive = logo.clone().scaleToFit(700, 700);
  adaptiveFg.composite(logoForAdaptive, (1024 - logoForAdaptive.bitmap.width) / 2, (1024 - logoForAdaptive.bitmap.height) / 2);
  await adaptiveFg.writeAsync('assets/adaptive-icon-foreground.png');
  
  // 3. Adaptive Icon Background (1024x1024 solid white)
  console.log('Generating Adaptive Icon Background...');
  const adaptiveBg = await new Jimp(1024, 1024, 0xFFFFFFFF);
  await adaptiveBg.writeAsync('assets/adaptive-icon-background.png');
  
  // 4. Splash Screen Logo (usually just the logo itself on transparent background, e.g. 512x512)
  console.log('Generating Splash Screen Logo...');
  const splash = await new Jimp(512, 512, 0x00000000);
  const logoForSplash = logo.clone().scaleToFit(400, 400);
  splash.composite(logoForSplash, (512 - logoForSplash.bitmap.width) / 2, (512 - logoForSplash.bitmap.height) / 2);
  await splash.writeAsync('assets/splash-logo.png');

  // 5. Notification Icon (96x96 white silhouette)
  console.log('Generating Notification Icon...');
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
  
  // 6. Play Store Icon (512x512, no transparency, white background)
  console.log('Generating Play Store Icon...');
  const playStore = await new Jimp(512, 512, 0xFFFFFFFF);
  const logoForPlayStore = logo.clone().scaleToFit(400, 400);
  playStore.composite(logoForPlayStore, (512 - logoForPlayStore.bitmap.width) / 2, (512 - logoForPlayStore.bitmap.height) / 2);
  await playStore.writeAsync('assets/play-store-icon.png');

  console.log('All images generated successfully based on your list!');
}

generate().catch(console.error);
