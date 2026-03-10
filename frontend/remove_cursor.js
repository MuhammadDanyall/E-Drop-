const fs = require('fs');
const path = require('path');

const dir = 'd:/E Drooop - Copy/frontend';

// 1. Remove from all HTML files
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
for (const file of htmlFiles) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(/<div class="custom-cursor-dot"><\/div>\s*<div class="custom-cursor-outline"><\/div>/gi, '');
    fs.writeFileSync(filePath, content);
}
console.log('Removed cursor HTML');

// 2. Remove cursor styling from styles.css
const cssPath = path.join(dir, 'styles.css');
let css = fs.readFileSync(cssPath, 'utf-8');
css = css.replace(/\/\* --- Custom Cursor --- \*\/\s*body\s*\{[^}]+\}\s*\.custom-cursor-dot\s*\{[^}]+\}\s*\.custom-cursor-outline\s*\{[^}]+\}\s*\/\* Cursor Hover States \*\/\s*\.custom-cursor-dot\.hover\s*\{[^}]+\}\s*\.custom-cursor-outline\.hover\s*\{[^}]+\}\s*\/\* Removing custom cursor on touch devices to prevent bugs \*\/\s*@media\s*\(pointer:\s*coarse\)\s*\{\s*body\s*\{[^}]+\}\s*\.custom-cursor-dot,\s*\.custom-cursor-outline\s*\{[^}]+\}\s*\}/, '');
// Let's use a simpler regex or targeted replacement for CSS:
css = css.replace(/body\s*\{\s*cursor:\s*none;\s*\/\*\s*Hide default cursor\s*\*\/\s*\}/gi, '');
css = css.replace(/\.custom-cursor-dot\s*\{[\s\S]*?\}/gi, '');
css = css.replace(/\.custom-cursor-outline\s*\{[\s\S]*?\}/gi, '');
css = css.replace(/\.custom-cursor-dot\.hover\s*\{[\s\S]*?\}/gi, '');
css = css.replace(/\.custom-cursor-outline\.hover\s*\{[\s\S]*?\}/gi, '');
css = css.replace(/@media \(pointer: coarse\) \{[\s\S]*?\}/gi, function(match) {
    if(match.includes('.custom-cursor-dot')) return '';
    return match;
});

fs.writeFileSync(cssPath, css);
console.log('Removed cursor CSS');

// 3. Remove cursor JS logic from script.js
const jsPath = path.join(dir, 'script.js');
let js = fs.readFileSync(jsPath, 'utf-8');

// Use simple replacement for the exact block inserted earlier
const jsToRemove = `    // --- Custom Cursor Logic ---
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const cursorOutline = document.querySelector('.custom-cursor-outline');

    if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = \`\${posX}px\`;
            cursorDot.style.top = \`\${posY}px\`;

            // Adding a slight delay to the outline for a fluid effect
            cursorOutline.animate({
                left: \`\${posX}px\`,
                top: \`\${posY}px\`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effects to all clickable elements
        const clickables = document.querySelectorAll('a, button, .service-card, .team-member, input, textarea, .faq-question');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorOutline.classList.add('hover');
                if(el.classList.contains('magnetic')) {
                    el.classList.add('hovered');
                }
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorOutline.classList.remove('hover');
                if(el.classList.contains('magnetic')) {
                    el.classList.remove('hovered');
                    el.style.transform = '';
                }
            });
        });
        
        // Advanced Magnetic effect logic for hero buttons or prominent links
        const magnetics = document.querySelectorAll('.magnetic');
        magnetics.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const h = rect.width / 2;
                const w = rect.height / 2;
                const x = e.clientX - rect.left - h;
                const y = e.clientY - rect.top - w;
                
                // Pull the button towards the cursor slightly
                btn.style.transform = \`translate(\${x * 0.15}px, \${y * 0.15}px) scale(1.05)\`;
            });
        });
    }`;

js = js.replace(jsToRemove, '');
fs.writeFileSync(jsPath, js);
console.log('Removed cursor JS');
