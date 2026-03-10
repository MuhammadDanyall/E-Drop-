const fs = require('fs');
const path = require('path');

const dir = 'd:/E Drooop - Copy/frontend';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const imgRegex = /<img[^>]+src=["']?([^"'\s>]+)["']?[^>]*>/gi;

for (const file of htmlFiles) {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    let match;
    while ((match = imgRegex.exec(content)) !== null) {
        const src = match[1];
        if (!src.startsWith('http') && !src.startsWith('data:')) {
            const imgPath = path.resolve(dir, src.split('?')[0]);
            if (!fs.existsSync(imgPath)) {
                console.log(`BROKEN (Local): ${file} -> src="${src}" (Resolved: ${imgPath})`);
            }
        }
    }
}

// Also check for missing quotes around src
const unquotedSrcRegex = /<img[^>]+src=([^"'\s>]+)[^>]*>/gi;
for (const file of htmlFiles) {
    const content = fs.readFileSync(path.join(dir, file), 'utf-8');
    let match;
    while ((match = unquotedSrcRegex.exec(content)) !== null) {
        console.log(`UNQUOTED: ${file} -> src=${match[1]}`);
    }
}
console.log('Done scanning images');
