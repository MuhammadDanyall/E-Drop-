const fs = require('fs');
const path = require('path');

const dir = 'd:/E Drooop - Copy/frontend';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

// Selectors for elements we want to animate on scroll if they aren't already
const targets = [
    { regex: /<h2\b([^>]*)>/gi, class: 'animate-on-scroll fade-in-up' },
    { regex: /<div\b([^>]*)class=["']((?:(?!class=["']).)*?service-card((?:(?!class=["']).)*?))["']([^>]*)>/gi, class: 'animate-on-scroll fade-in-up' },
    { regex: /<div\b([^>]*)class=["']((?:(?!class=["']).)*?team-member((?:(?!class=["']).)*?))["']([^>]*)>/gi, class: 'animate-on-scroll fade-in-up' },
    // Enhance hero buttons with magnetic class
    { regex: /<a\b([^>]*)class=["']((?:(?!class=["']).)*?btn((?:(?!class=["']).)*?))["']([^>]*)>/gi, class: 'magnetic' }
];

for (const file of htmlFiles) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    let changed = false;

    // Apply floating-element to some specific hero images directly by file
    if (file === 'index.html') {
        content = content.replace(/class="hero-mockup"/g, 'class="hero-mockup floating-element"');
        content = content.replace(/class="delivery-man"/g, 'class="delivery-man floating-element"');
        changed = true;
    }
    
    // Quick inject animate-on-scroll to sections lacking it
    // We only inject if it doesn't already have animate-on-scroll
    for (const target of targets) {
        content = content.replace(target.regex, (match) => {
            if (!match.includes('animate-on-scroll') && !match.includes('magnetic') && target.class !== 'magnetic') {
                return match.replace(/class=["']/i, `class="${target.class} `);
            }
            if (target.class === 'magnetic' && !match.includes('magnetic') && match.includes('btn')) {
                return match.replace(/class=["']/i, `class="${target.class} `);
            }
            return match;
        });
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log(`Animated elements in ${file}`);
    }
}
console.log('Injection complete');
