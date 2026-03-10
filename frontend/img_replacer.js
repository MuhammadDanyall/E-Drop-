const fs = require('fs');
const path = require('path');

const dir = 'd:/E Drooop - Copy/frontend';
const htmlFiles = ['ecab.html', 'eshipping.html'];

for (const file of htmlFiles) {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace Google Play Badge
    content = content.replace(
        /https:\/\/upload.wikimedia.org\/wikipedia\/commons\/thumb\/e\/ec\/Google_Play_Store_badge_EN.svg\/2560px-Google_Play_Store_badge_EN.svg.png/g,
        '../pictures/google_store.png'
    );
    
    // Replace App Store Badge
    content = content.replace(
        /https:\/\/developer.apple.com\/assets\/elements\/badges\/download-on-the-app-store\/black.svg/g,
        '../pictures/apple_store.png'
    );
    
    // Replace Huawei AppGallery
    content = content.replace(
        /https:\/\/consumer-img.huawei.com\/content\/dam\/huawei-cbg-site\/cn\/mkt\/pdp\/phones\/p60-pro\/p60-pro-appgallery-logo.png/g,
        '../pictures/huawei_store.png'
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Replaced store badges in ${file}`);
}
