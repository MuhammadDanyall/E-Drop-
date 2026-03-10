const fs = require('fs');
const path = require('path');

const dir = 'd:/E Drooop - Copy/frontend';
const htmlFiles = [
    'faq.html',
    'privacy-policy.html',
    'terms-conditions.html'
]; 

const indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf-8');
const headerMatch = indexHtml.match(/<header class="header">[\s\S]*?<\/header>/);
const header = headerMatch[0];

for (const file of htmlFiles) {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf-8');
    
    content = content.replace(/<div class="back-nav">[\s\S]*?<\/div>/, header);
    
    fs.writeFileSync(filePath, content);
}
console.log('Replaced back-nav with common header');
