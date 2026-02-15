#!/usr/bin/env node
/**
 * GitHub Pages deployment script
 * Uses gh-pages package programmatically with configuration from gh-pages.config.js
 */

const ghpages = require('gh-pages');
const path = require('path');

// Load configuration
const config = require('./gh-pages.config.js');

// Directory to publish
const publicDir = path.join(__dirname, '../public');

console.log('Deploying to GitHub Pages...');

// Publish to GitHub Pages
ghpages.publish(publicDir, config, (err) => {
  if (err) {
    console.error(`❌ Deployment failed for directory ${publicDir}:`, err);
    process.exit(1);
  }
  console.log(`✅ Deployment successful! Published ${publicDir} to GitHub Pages.`);
});
