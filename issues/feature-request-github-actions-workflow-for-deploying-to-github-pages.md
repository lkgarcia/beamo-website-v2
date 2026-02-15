### Overview
Requesting the creation of a GitHub Actions workflow that automates deploying the website to GitHub Pages to improve efficiency and consistency.

### Workflow Details
- **Trigger:** The workflow should run whenever a pull request is merged into the `main` branch.
- **Steps:**
  1. Checkout the repository.
  2. Set up Node.js.
  3. Install dependencies using the existing `deploy` script defined in the `package.json` file.
  4. Execute `npm run deploy` to build and deploy.

### Permissions
- Ensure GitHub Actions has **read and write permissions**: Adjust in Settings > Actions > General.

### GitHub Pages Setup
- Confirm GitHub Pages is enabled and configured to serve content from the `gh-pages` branch in the repository settings.

### Additional Notes
- This workflow will streamline and fully automate the deployment process, reducing manual intervention and errors.