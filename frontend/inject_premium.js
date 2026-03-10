const fs = require('fs');
const path = require('path');

const dir = 'd:/E Drooop - Copy/frontend';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const premiumHtml = `
    <!-- Premium Preloader -->
    <div id="preloader">
        <div class="preloader-content">
            <div class="loader-truck"><i class="fas fa-truck-moving"></i></div>
            <div class="loader-track">
                <div class="loader-progress"></div>
            </div>
            <div class="loader-text">E-DROP</div>
        </div>
    </div>

    <!-- Custom Cursor -->
    <div class="custom-cursor-dot"></div>
    <div class="custom-cursor-outline"></div>
`;

for (const file of htmlFiles) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Only inject if not already present
    if (!content.includes('id="preloader"')) {
        content = content.replace(/<body>/, '<body>\n' + premiumHtml);
        fs.writeFileSync(filePath, content);
        console.log(`Injected premium HTML into ${file}`);
    } else {
        console.log(`Already injected in ${file}`);
    }
}
console.log('Done.');
