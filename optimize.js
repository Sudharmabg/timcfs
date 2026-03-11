const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public');
const files = fs.readdirSync(dir);

(async () => {
    console.log('Starting image compression...');
    for (const file of files) {
        if (!file.match(/\.(png|jpe?g)$/i) || file.includes('search.png') || file.includes('navlogo.png')) {
            continue;
        }

        const filePath = path.join(dir, file);
        const tempPath = path.join(dir, 'temp_' + file);

        try {
            console.log(`Compressing ${file}...`);
            await sharp(filePath)
                .resize({ width: 1920, withoutEnlargement: true }) // Downscale massive images to 1080p max
                .jpeg({ quality: 75, force: false }) // 75% quality for JPEG
                .png({ compressionLevel: 8, force: false }) // Higher compression for PNG
                .toFile(tempPath);

            // Replace original file with compressed file
            fs.renameSync(tempPath, filePath);
            console.log(`Successfully compressed ${file}`);
        } catch (error) {
            console.error(`Failed to compress ${file}:`, error.message);
        }
    }
    console.log('Finished compressing all images!');
})();
