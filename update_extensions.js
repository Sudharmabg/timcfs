const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(file));
        } else if (file.match(/\.(js|jsx)$/)) {
            results.push(file);
        }
    });
    return results;
}

const files = walkDir(srcDir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Specifically target our known image strings to convert extensions to .webp
    // Excluding: flagcdn
    let replaced = content.replace(/(\/gallery-\d+|\/hero-img|\/team-\d+|\/testimonials-\d+|\/testimonials-sample|\/programs-\d+|\/faq-\d+|\/founders|\/about-us|\/navlogo)\.(jpg|jpeg|JPG|png)/g, '$1.webp');

    if (replaced !== content) {
        fs.writeFileSync(file, replaced, 'utf8');
        console.log('Updated:', file);
    }
});
