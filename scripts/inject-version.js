#!/usr/bin/env node
/**
 * Build script to inject version from package.json into HTML
 * Reads src/index.html, injects version and updates asset paths, outputs to public/index.html
 * Also processes product pages in src/products/
 */

const fs = require('fs');
const path = require('path');

// Read package.json to get version
const packageJson = require('../package.json');
const version = packageJson.version;

/**
 * Process an HTML file: update asset paths and inject version
 * @param {string} srcPath - source file path
 * @param {string} destPath - destination file path
 * @param {string} [assetPrefix=''] - relative prefix for asset paths (e.g. '../' for subdirectories)
 */
function processHtml(srcPath, destPath, assetPrefix = '') {
  let html = fs.readFileSync(srcPath, 'utf8');

  // Replace asset paths for production using split/join to avoid regex escaping issues
  html = html.split(`${assetPrefix}css/styles.css`).join(`${assetPrefix}css/styles.min.css`);
  html = html.split(`${assetPrefix}js/main.js`).join(`${assetPrefix}js/main.min.js`);

  // Inject version into HTML
  html = html.replace(/id="appVersion"/g, `id="appVersion" data-version="${version}"`);

  // Ensure destination directory exists
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.writeFileSync(destPath, html, 'utf8');
}

// Ensure public directory exists
const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Process index.html
processHtml(
  path.join(__dirname, '../src/index.html'),
  path.join(__dirname, '../public/index.html')
);

// Process product pages in src/products/
const productsSrcDir = path.join(__dirname, '../src/products');
if (fs.existsSync(productsSrcDir)) {
  const productsDestDir = path.join(__dirname, '../public/products');
  if (!fs.existsSync(productsDestDir)) {
    fs.mkdirSync(productsDestDir, { recursive: true });
  }
  const productFiles = fs.readdirSync(productsSrcDir).filter(f => f.endsWith('.html'));
  productFiles.forEach(file => {
    processHtml(
      path.join(productsSrcDir, file),
      path.join(productsDestDir, file),
      '../'
    );
  });
}

console.log(`✓ HTML processed successfully (version: ${version})`);
