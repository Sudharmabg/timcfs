const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public');
const files = fs.readdirSync(dir);

(async () => {
    console.log('🚀 Starting aggressive image optimization...');
    for (const file of files) {
        // Now including .webp files for re-processing
        if (!file.match(/\.(png|jpe?g|webp)$/i) || file.includes('navlogo.png') || file.includes('search.png')) {
            continue;
        }

        const filePath = path.join(dir, file);
        const nameWithoutExt = file.replace(/\.[^/.]+$/, "");
        const webpPath = path.join(dir, nameWithoutExt + (file.endsWith('.webp') ? '_new.webp' : '.webp'));

        try {
            console.log(`📦 Optimizing ${file}...`);
            await sharp(filePath)
                .resize({ 
                    width: 1200, 
                    withoutEnlargement: true 
                })
                .webp({ 
                    quality: 75,
                    effort: 6 
                })
                .toFile(webpPath);

            // Replace original with optimized one
            if (file.endsWith('.webp')) {
                fs.unlinkSync(filePath);
                fs.renameSync(webpPath, filePath);
            } else {
                fs.unlinkSync(filePath);
            }
            console.log(`✅ Optimized ${file}`);
        } catch (error) {
            console.error(`❌ Failed to optimize ${file}:`, error.message);
        }
    }
    console.log('✨ Finished aggressive image optimization!');
})();
