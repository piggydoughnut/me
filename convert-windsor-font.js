const fs = require("fs");
const path = require("path");

// Path to Windsor font file - update this to your font file location
const fontPath = path.join(__dirname, "public", "fonts", "Windsor-Regular.ttf");

if (!fs.existsSync(fontPath)) {
  console.error(
    `Font file not found at: ${fontPath}\n` +
    "Please download Windsor font and place it at: public/fonts/Windsor-Regular.ttf"
  );
  process.exit(1);
}

// Read font file and convert to base64
const fontBuffer = fs.readFileSync(fontPath);
const base64Font = fontBuffer.toString("base64");

// Create TypeScript file with the base64 font
const tsContent = `// This file contains the Base64-encoded Windsor Regular font
// Generated from: ${path.basename(fontPath)}

export const WindsorRegularBase64 = "${base64Font}";
`;

// Write to fonts directory
const outputPath = path.join(__dirname, "src", "fonts", "windsor.ts");
fs.writeFileSync(outputPath, tsContent);

console.log(`✅ Successfully converted Windsor font to: ${outputPath}`);
console.log(`📦 Font size: ${(fontBuffer.length / 1024).toFixed(2)} KB`);

