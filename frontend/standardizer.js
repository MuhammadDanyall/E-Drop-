const fs = require('fs');
const path = require('path');

const dir = 'd:/E Drooop - Copy/frontend';
const htmlFiles = [
    'about.html',
    'ecab.html',
    'ecargo.html',
    'eshipping.html',
    'faq.html',
    'privacy-policy.html',
    'terms-conditions.html'
]; 

let indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf-8');

// Extract header
const headerMatch = indexHtml.match(/<header class="header">[\s\S]*?<\/header>/);
let header = headerMatch[0];
// Ensure standard links
header = header.replace(/href="#/g, 'href="index.html#');
header = header.replace(/href="index\.html#"/g, 'href="#"');

// Update index itself to have absolute links so it matches everywhere literally
indexHtml = indexHtml.replace(/<header class="header">[\s\S]*?<\/header>/, header);
fs.writeFileSync(path.join(dir, 'index.html'), indexHtml);

// Re-read indexHtml to catch the modified header or anything else
indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf-8');
const footerMatch = indexHtml.match(/<footer class="footer">[\s\S]*?<\/footer>/);
const footer = footerMatch[0];

for (const file of htmlFiles) {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) {
        console.log('Skipping ' + file);
        continue;
    }
    
    let content = fs.readFileSync(filePath, 'utf-8');
    
    if (content.match(/<header class="header">[\s\S]*?<\/header>/)) {
        content = content.replace(/<header class="header">[\s\S]*?<\/header>/, header);
    } else {
        console.log('No header found in ' + file);
    }
    
    if (content.match(/<footer class="footer">[\s\S]*?<\/footer>/)) {
        content = content.replace(/<footer class="footer">[\s\S]*?<\/footer>/, footer);
    } else {
         console.log('No footer found in ' + file);
    }
    
    fs.writeFileSync(filePath, content);
}
console.log('Done standardizing navbars and footers.');
