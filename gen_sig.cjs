const fs = require('fs');
const https = require('https');
const { execSync } = require('child_process');
const path = require('path');

const projectDir = 'C:\\Users\\heman\\.gemini\\antigravity\\scratch\\luxe-beauty-portfolio';

async function main() {
    // Install text-to-svg
    console.log("Installing text-to-svg...");
    execSync('npm install text-to-svg', { stdio: 'inherit', cwd: projectDir });

    const TextToSVG = require(path.join(projectDir, 'node_modules', 'text-to-svg'));

    // Download a luxury font
    const fontUrl = "https://raw.githubusercontent.com/google/fonts/main/ofl/pinyonscript/PinyonScript-Regular.ttf";
    const fontPath = path.join(projectDir, "PinyonScript-Regular.ttf");
    
    console.log("Downloading font...");
    await new Promise((resolve, reject) => {
        const file = fs.createWriteStream(fontPath);
        https.get(fontUrl, response => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            } else if (response.statusCode === 404) {
                console.log("PinyonScript not found, trying GreatVibes...");
                const fallbackUrl = "https://raw.githubusercontent.com/google/fonts/main/ofl/greatvibes/GreatVibes-Regular.ttf";
                https.get(fallbackUrl, res => {
                    res.pipe(file);
                    file.on('finish', () => { file.close(); resolve(); });
                }).on('error', err => reject(err));
            } else {
                reject(new Error(`Failed to download font: ${response.statusCode}`));
            }
        }).on('error', err => reject(err));
    });

    console.log("Generating SVG...");
    const textToSVG = TextToSVG.loadSync(fontPath);
    
    const attributes = { fill: '#1a1a1a', stroke: 'none' };
    const options = { x: 0, y: 0, fontSize: 120, anchor: 'top', attributes: attributes };
    
    const svg = textToSVG.getSVG('Abhilasha', options);
    
    const outputPath = path.join(projectDir, 'public', 'images', 'branding', 'signature-abhilasha.svg');
    fs.writeFileSync(outputPath, svg);
    console.log("Saved to " + outputPath);
    
    // Cleanup
    fs.unlinkSync(fontPath);
}

main().catch(console.error);
