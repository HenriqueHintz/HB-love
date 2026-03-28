const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('c:/Users/ricop/Documents/Metas e Planos casal/src');

const replacements = [
    { from: /text-\[#F0EDE8\]/g, to: 'text-app-text' },
    { from: /text-\[#9A9590\]/g, to: 'text-app-text-secondary' },
    { from: /text-\[#5A5650\]/g, to: 'text-app-text-muted' },
    { from: /bg-\[#0A0A0C\]/g, to: 'bg-app-bg' },
    { from: /bg-\[#141418\]/g, to: 'bg-app-surface' },
    { from: /bg-\[#1C1C22\]/g, to: 'bg-app-surface-light' },
    { from: /border-\[#1C1C22\]/g, to: 'border-app-surface-light' },
    { from: /border-white\/60/g, to: 'border-app-border-light' },
    { from: /border-white\/6/g, to: 'border-app-border-light' },
    { from: /border-white\/4/g, to: 'border-app-border-light' },
    { from: /border-white\/10/g, to: 'border-app-border' },
    { from: /border-white\/20/g, to: 'border-app-border' },
    { from: /bg-white\/5/g, to: 'bg-app-border-light' },
    { from: /bg-white\/10/g, to: 'bg-app-border' },
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    replacements.forEach(r => {
        content = content.replace(r.from, r.to);
    });
    
    // SVG stroke/fills and inline styles
    content = content.replace(/="#F0EDE8"/g, '="var(--app-text)"');
    content = content.replace(/="#9A9590"/g, '="var(--app-text-secondary)"');
    content = content.replace(/="#5A5650"/g, '="var(--app-text-muted)"');
    content = content.replace(/="#0A0A0C"/g, '="var(--app-bg)"');
    
    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log('Updated', file);
    }
});
