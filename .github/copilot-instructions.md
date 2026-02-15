# GitHub Copilot Instructions for Beamo Website v2

## Project Overview

This is a modern static website for Beamo built with vanilla HTML, CSS, and JavaScript. The project uses a clean separation between source code (`src/`) and production build output (`public/`).

**Key Purpose**: A landing page for Beamo featuring flexible workspaces and digital solutions with brand colors:
- Primary: #00B8A8 (teal)
- Secondary: #B4EB45 (lime green)
- Accents: #F9F871 (yellow), #6DD794 (green), #FFCC96 (peach)
- Text: #4d4d4d (dark gray)

## Technology Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Build Tools**: 
  - `cssnano` for CSS minification
  - `terser` for JavaScript minification
  - `live-server` for local development
- **Deployment**: GitHub Pages (via `gh-pages` branch)
- **Node.js**: v14 or higher

## Development Workflow

### Important Rules

1. **NEVER edit files in `public/` directory** - These are auto-generated build outputs
2. **ONLY edit source files in `src/` directory**:
   - `src/index.html` - Main HTML (references non-minified files)
   - `src/css/styles.css` - Unminified CSS with comments
   - `src/js/main.js` - Unminified JavaScript with comments
   - `src/assets/` - Images, icons, and static assets

3. **Build process automatically**:
   - Updates HTML file references from `.css`/`.js` to `.min.css`/`.min.js`
   - Minifies CSS (~24% reduction)
   - Minifies JavaScript (~55% reduction)
   - Copies all assets

### Development Commands

```bash
npm run dev      # Start live development server (serves from src/)
npm run build    # Build production files to public/
npm run clean    # Remove public/ directory
npm run deploy   # Build and deploy to GitHub Pages
```

### Testing Changes

1. Use `npm run dev` to test changes locally at http://localhost:8080
2. Run `npm run build` to verify production output before committing
3. Only commit changes in `src/` directory (never commit `public/`)

## File Organization

```
beamo-website-v2/
├── src/                    # SOURCE FILES - Edit these
│   ├── index.html         # Main HTML file
│   ├── css/styles.css     # Unminified CSS
│   ├── js/main.js         # Unminified JavaScript
│   └── assets/            # Static assets
└── public/                # BUILD OUTPUT - Auto-generated, never edit
    ├── index.html         # Copied from src (with updated references)
    ├── css/styles.min.css # Minified CSS
    ├── js/main.min.js     # Minified JavaScript
    └── assets/            # Copied from src
```

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Maintain accessibility with proper ARIA labels
- Reference non-minified files in `src/index.html` (build process updates them)

### CSS
- Use descriptive class names
- Group related styles together
- Add comments for complex sections
- Apply brand colors consistently:
  - Primary teal (#00B8A8) for main CTAs and branding
  - Lime green (#B4EB45) for secondary elements
  - Accent colors for highlights and variety

### JavaScript
- Use modern ES6+ syntax
- Add JSDoc comments for functions
- Handle errors gracefully
- Keep code modular and readable

### Design Principles
- Clean, modern typography with generous whitespace
- Smooth scroll navigation between sections
- Subtle hover animations on interactive elements
- Fully responsive (mobile-first approach)
- Minimal aesthetic with brand colors as accents

## Key Features

The website includes these sections:
1. Navigation Bar - Sticky with logo and section links
2. Hero Section - Main headline with CTA and mesh gradient background
3. Services Overview - Detailed sections for Flexible Workspace and Digital Solutions
4. About Us - Mission and differentiators
5. Our Customers - Horizontally scrolling logo carousel
6. Testimonials - Client testimonials carousel/grid
7. FAQ - Accordion-style questions
8. Contact/CTA Footer - Contact form and social links

## Deployment

- **Automatic**: Push to `main` branch triggers GitHub Actions workflow
- **Manual**: Run `npm run deploy` to build and push to `gh-pages` branch
- Site is served from the `public/` directory on the `gh-pages` branch

## Common Tasks

### Adding a new page section
1. Edit `src/index.html` to add the HTML structure
2. Edit `src/css/styles.css` to add styles
3. Edit `src/js/main.js` if interactivity is needed
4. Test with `npm run dev`
5. Build with `npm run build` to verify

### Updating styles
1. Edit `src/css/styles.css` (never edit `public/css/styles.min.css`)
2. Test changes with `npm run dev`
3. Verify minified output with `npm run build`

### Adding assets (images, icons, etc.)
1. Place files in `src/assets/` directory
2. Reference them in HTML as `assets/filename.ext`
3. Build process will copy them to `public/assets/`

## Quality Standards

- Validate HTML/CSS for standards compliance
- Test across different browsers and devices
- Ensure accessibility (WCAG 2.1 AA minimum)
- Optimize images before adding to `src/assets/`
- Keep file sizes minimal for fast loading
- Maintain consistent code formatting

## Git Workflow

1. Make changes only in `src/` directory
2. Test locally with `npm run dev`
3. Build and verify with `npm run build`
4. Commit only source files (changes in `src/`)
5. Push to trigger automatic deployment OR run `npm run deploy`

## Dependencies

When suggesting new dependencies:
- Prefer vanilla JavaScript solutions when possible
- Keep build tools minimal and focused
- Ensure compatibility with the existing build process
- Update `package.json` devDependencies only if necessary
