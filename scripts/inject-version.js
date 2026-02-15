#!/usr/bin/env node
/**
 * Build script to inject version from package.json into HTML
 * Reads src/index.html, injects version and updates asset paths, outputs to public/index.html
 */

const fs = require('fs');
const path = require('path');

// Read package.json to get version
const packageJson = require('../package.json');
const version = packageJson.version;

// Read source HTML
const srcPath = path.join(__dirname, '../src/index.html');
const destPath = path.join(__dirname, '../public/index.html');

let html = fs.readFileSync(srcPath, 'utf8');

// Replace asset paths for production
html = html.replace(/css\/styles\.css/g, 'css/styles.min.css');
html = html.replace(/js\/main\.js/g, 'js/main.min.js');

// Inject version into HTML
html = html.replace(/id="appVersion"/g, `id="appVersion" data-version="${version}"`);

// Ensure public directory exists
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write the output
fs.writeFileSync(destPath, html, 'utf8');

console.log(`✓ HTML processed successfully (version: ${version})`);
