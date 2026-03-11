const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public');
const files = fs.readdirSync(dir);

(async () => {
    console.log('Starting image conversion to WebP...');
    for (const file of files) {
        if (!file.match(/\.(png|jpe?g)$/i) || file.includes('search.png')) {
            continue;
        }

        const filePath = path.join(dir, file);
        const nameWithoutExt = file.replace(/\.[^/.]+$/, "");
        const webpPath = path.join(dir, nameWithoutExt + '.webp');

        try {
            console.log(`Converting ${file} to WebP...`);
            await sharp(filePath)
                .resize({ width: 1920, withoutEnlargement: true })
                .webp({ quality: 80, effort: 4 })
                .toFile(webpPath);

            // Delete original file after successful conversion
            fs.unlinkSync(filePath);
            console.log(`Successfully converted ${file} to ${nameWithoutExt}.webp`);
        } catch (error) {
            console.error(`Failed to convert ${file}:`, error.message);
        }
    }
    console.log('Finished converting images!');
})();
