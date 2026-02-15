/**
 * GitHub Pages deployment configuration
 * 
 * This configuration file is used by the gh-pages package to deploy
 * the built site to GitHub Pages. It uses the GITHUB_TOKEN environment
 * variable for authentication in CI/CD environments.
 * 
 * @see https://github.com/tschaub/gh-pages#options
 */

module.exports = {
  // Use GITHUB_TOKEN for authentication in CI/CD, fallback to git credentials locally
  repo: process.env.GITHUB_TOKEN
    ? `https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/lkgarcia/beamo-website-v2.git`
    : undefined, // undefined will use default git credentials
  
  // Configure git user for commits
  user: {
    name: 'github-actions[bot]',
    email: 'github-actions[bot]@users.noreply.github.com'
  },
  
  // Branch to deploy to
  branch: 'gh-pages',
  
  // Include dotfiles in deployment
  dotfiles: false,
  
  // Commit message
  message: 'Deploy to GitHub Pages [skip ci]',
  
  // Silent mode to avoid logging token in error messages
  silent: process.env.GITHUB_TOKEN ? true : false
};
