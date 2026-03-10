const fs = require('fs');
const path = require('path');

const dir = 'd:/E Drooop - Copy/frontend';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldTruck = '<div class="loader-truck"><i class="fas fa-truck-moving"></i></div>';
const newLogo = '<div class="loader-truck"><img src="../pictures/logo.jpeg" alt="E-Drop Logo" style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%; box-shadow: 0 0 20px rgba(255, 107, 53, 0.5);"></div>';

for (const file of htmlFiles) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    if (content.includes(oldTruck)) {
        content = content.replace(oldTruck, newLogo);
        fs.writeFileSync(filePath, content);
        console.log(`Replaced in ${file}`);
    }
}
console.log('Finished updating preloader logos.');
