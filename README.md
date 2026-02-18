# Beamo Website

A modern, responsive landing page for Beamo - showcasing flexible workspace solutions and digital services. Built with vanilla HTML, CSS, and JavaScript, this project emphasizes clean code architecture with a clear separation between source files and optimized production builds.

**Key Features:**
- 🎨 Modern design with brand-focused color palette (teal #00B8A8, lime green #B4EB45)
- 📱 Mobile-first responsive design
- ⚡ Optimized performance with minified assets (~38% size reduction)
- 🚀 Automated CI/CD deployment to GitHub Pages
- ♿ Accessibility-focused with semantic HTML and ARIA labels

**Sections:**
- **Navigation**: Sticky header with logo and smooth scroll links to all sections
- **Hero**: Eye-catching introduction with headline, CTA button, and mesh gradient background
- **Services**: Detailed overview of Flexible Workspace and Digital Solutions offerings
- **About Us**: Mission statement and key differentiators that set Beamo apart
- **Customers**: Horizontally scrolling carousel showcasing client logos
- **FAQ**: Accordion-style frequently asked questions for quick answers
- **Contact**: Contact form and social media links for easy engagement

## Project Structure

```
beamo-website/
├── src/                    # Source files (edit these)
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── assets/
├── scripts/                # Build and deployment scripts
│   ├── deploy.js
│   ├── gh-pages.config.js
│   └── inject-version.js
├── public/                 # Build output (auto-generated)
│   ├── index.html
│   ├── css/
│   │   └── styles.min.css
│   ├── js/
│   │   └── main.min.js
│   └── assets/
├── package.json
└── .gitignore
```

## Development Workflow

### Prerequisites

- Node.js (v20 or higher)
- npm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/lkgarcia/beamo-website.git
cd beamo-website
```

2. Install dependencies:
```bash
npm install
```

### Development

To develop locally with live reload:

```bash
npm run dev
```

This will start a development server at `http://localhost:8080` serving files from the `src/` directory.

**Edit source files in the `src/` directory only.** The `public/` directory is auto-generated and should not be edited manually.

**Important:** The `src/index.html` file references non-minified files (`styles.css` and `main.js`). During the build process, these references are automatically updated to point to the minified versions (`styles.min.css` and `main.min.js`) in the `public/` directory.

### Building

To create production-ready files:

```bash
npm run build
```

This command:
1. Cleans the `public/` directory
2. Copies HTML from `src/` to `public/` (automatically updating file references to minified versions)
3. Copies assets from `src/` to `public/`
4. Minifies CSS: `src/css/styles.css` → `public/css/styles.min.css` (~24% reduction)
5. Minifies JavaScript: `src/js/main.js` → `public/js/main.min.js` (~55% reduction)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (serves from `src/`) |
| `npm run build` | Build production files to `public/` |
| `npm test` | Run build validation tests |
| `npm run clean` | Remove the `public/` directory |
| `npm run copy:html` | Copy HTML from src to public |
| `npm run copy:assets` | Copy assets from src to public |
| `npm run minify:css` | Minify CSS files |
| `npm run minify:js` | Minify JavaScript files |
| `npm run deploy` | Build and deploy to GitHub Pages |

## Deployment

The website is deployed to GitHub Pages from the `public/` directory.

### Automated CI/CD Deployment

When you push changes to the `main` branch, the GitHub Actions workflow automatically:

1. **Validates the build**: Runs `npm test` to ensure the build completes successfully
2. **Caches dependencies**: Uses optimized caching based on `package-lock.json` hash for faster builds
3. **Extracts version**: Reads the current version from `package.json`
4. **Bumps version**: Automatically increments the patch version (e.g., 2.0.0 → 2.0.1)
5. **Creates git tag**: Tags the new version in the repository
6. **Builds the site**: Generates production-ready files in the `public/` directory
7. **Deploys to GitHub Pages**: Pushes the `public/` directory to the `gh-pages` branch
8. **Provides feedback**: Shows success/failure status in the workflow logs

The workflow includes the `[skip ci]` marker in version bump commits to prevent infinite deployment loops.

### Manual Deployment

To build and deploy manually:

```bash
npm run deploy
```

This command will:
1. Run the build process
2. Push the `public/` directory to the `gh-pages` branch

### Configuration

Deployment settings are configured in `scripts/gh-pages.config.js`, which includes:
- Repository URL (with GitHub token support for CI/CD)
- Git user configuration
- Target branch (`gh-pages`)
- Commit message
- Silent mode for secure token handling

You can modify this file to customize deployment behavior.

## Performance Optimizations

The build process includes:

- **CSS Minification**: Removes comments, whitespace, and optimizes rules (~24% size reduction)
- **JavaScript Minification**: Removes comments, whitespace, and shortens variable names (~55% size reduction)
- **Overall Size Reduction**: ~38% average reduction in file sizes

### Before vs After

| File | Original | Minified | Reduction |
|------|----------|----------|-----------|
| styles.css | 24 KB | 18 KB | 23.8% |
| main.js | 9.3 KB | 4.2 KB | 54.6% |

## File Organization

### Source Files (`src/`)

These are the files you should edit:

- `src/index.html` - Main HTML file (references non-minified `.css` and `.js` files)
- `src/css/styles.css` - Unminified CSS with comments and formatting
- `src/js/main.js` - Unminified JavaScript with comments
- `src/assets/` - Images, icons, and other static assets

### Build Scripts (`scripts/`)

These scripts handle the build and deployment process:

- `scripts/inject-version.js` - Injects version from `package.json` into HTML and updates asset paths to minified versions
- `scripts/deploy.js` - Programmatic deployment script using gh-pages API
- `scripts/gh-pages.config.js` - Deployment configuration (repo, branch, user, etc.)

### Build Output (`public/`)

**Do not edit these files directly.** They are auto-generated by `npm run build`:

- `public/index.html` - Copied from src
- `public/css/styles.min.css` - Minified CSS
- `public/js/main.min.js` - Minified JavaScript
- `public/assets/` - Copied from src

The `public/` directory is git-ignored (except `.gitkeep`) to keep version control clean. It's generated fresh during each build and deployment.

## Contributing

1. Make changes in the `src/` directory
2. Test locally with `npm run dev`
3. Build with `npm run build` to verify production output
4. Commit only source files (changes in `src/`)
5. Deploy with `npm run deploy`

## License

MIT
