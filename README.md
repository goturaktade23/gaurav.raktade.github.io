# Gaurav Raktade — Personal Portfolio Website

A premium, production-ready personal portfolio built with **HTML5, CSS3, and Vanilla JavaScript** — no frameworks, no build tools, no backend. Just open `index.html` and it works.

🔗 **Live preview:** open `index.html` directly in any modern browser, or deploy in minutes with the steps below.

---

## ✨ Features

- **Apple-inspired dark theme** with blue/cyan gradient accents and glassmorphism cards
- **Typing animation** in the hero section cycling through role titles
- **Animated gradient background** with drifting radial glows and a subtle grid
- **Floating particles** rising through the hero backdrop
- **Scroll-triggered fade-in / slide-up animations** on every section
- **Animated stat counters** (years of experience, companies, technologies)
- **Elegant vertical timeline** for work experience
- **Sticky navigation** with active-section highlighting and a scroll progress bar
- **Scroll-to-top button**
- **Fully responsive** — tested down to 320px mobile widths
- **Accessible** — semantic HTML, ARIA labels, visible focus states, skip-to-content link, and `prefers-reduced-motion` support
- **SEO-ready** — meta description/keywords, Open Graph, Twitter Cards, and Schema.org `Person` JSON-LD structured data
- **Fast & lightweight** — no external JS frameworks, optimized images, minimal HTTP requests

All content (experience, education, certifications, skills) is sourced directly from the attached resume. No fabricated projects, companies, or achievements.

---

## 📁 Folder Structure

```
portfolio/
├── index.html              # Main HTML file (all sections)
├── style.css                # All styling, design tokens, animations
├── script.js                 # All interactivity (vanilla JS)
├── README.md                  # This file
├── robots.txt                  # Search engine crawler rules
├── sitemap.xml                  # XML sitemap
├── favicon.ico                   # Site favicon (multi-resolution)
└── assets/
    ├── resume.pdf                # Downloadable resume (from "Download Resume" button)
    └── images/
        └── profile.jpg             # Profile photo used in hero section
```

> Note: all icons (social links, skill categories, contact items) are inline SVGs directly in `index.html` — no separate icon files are needed, which keeps the site fast and dependency-free.

---

## 🚀 Quick Start (Local)

No installation needed. Just open the file:

```bash
# Option 1: double-click index.html in your file explorer

# Option 2: from a terminal
open index.html        # macOS
start index.html        # Windows
xdg-open index.html      # Linux
```

For the best experience (and to avoid any browser file:// restrictions on some setups), you can also serve it locally:

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000

# Node (if you have npx)
npx serve .
```

---

## 🌐 Deployment

### Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g. `portfolio` or `yourusername.github.io`).
2. Push this folder's contents to the repository root:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In your repository, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, select **Deploy from a branch**.
5. Choose the `main` branch and `/ (root)` folder, then click **Save**.
6. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a few minutes.

> If you name your repository `<your-username>.github.io`, your site will be live at the root domain `https://<your-username>.github.io/`.

### Deploy to Netlify

**Option A — Drag and drop:**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the entire `portfolio` folder onto the page.
3. Netlify will instantly deploy and give you a live URL.

**Option B — Git-based deploy:**
1. Push this folder to a GitHub/GitLab/Bitbucket repository.
2. In Netlify, click **Add new site → Import an existing project**.
3. Connect your repository.
4. Build settings: leave **Build command** empty and set **Publish directory** to `.` (or `portfolio` if it's nested).
5. Click **Deploy site**.

### Deploy to Vercel

1. Push this folder to a GitHub/GitLab/Bitbucket repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework Preset: choose **Other**.
4. Leave Build Command empty and set Output Directory to `.` (or the folder containing `index.html`).
5. Click **Deploy**.

---

## 🎨 Customization Guide

### Update your photo
Replace `assets/images/profile.jpg` with a new image of the same approximate aspect ratio (square works best, since it's cropped into a circle).

### Update your resume PDF
Replace `assets/resume.pdf` with your latest resume. Keep the filename the same so the "Download Resume" buttons keep working — or update the `href="assets/resume.pdf"` references in `index.html` if you rename it.

### Change colors
All colors are defined as CSS custom properties at the top of `style.css` under `:root`. Key variables:

```css
--accent-cyan: #22d3ee;
--accent-blue: #3b82f6;
--bg-1: #0a0f1a;
```

Change these values to re-theme the entire site instantly.

### Change fonts
The site uses **Poppins** (display/body) and **JetBrains Mono** (for the typed role text and timestamps), loaded via Google Fonts in `index.html`. Swap the `<link>` tag and the `--font-display` / `--font-mono` variables in `style.css` to use different fonts.

### Edit content
All text content lives directly in `index.html` — section by section, in the order they appear on the page (Hero → About → Stats → Experience → Skills → Education → Contact). Update the text directly; no template engine or data file is used.

### Update social links
Search `index.html` for `linkedin.com`, `github.com`, and `mailto:` — update these href values in the hero section, contact section, and footer (they appear in multiple places for convenience).

### Adjust animations
Animation timing and easing live in `style.css` as CSS custom properties:
```css
--t-fast: 180ms;
--t-med: 420ms;
--t-slow: 700ms;
--ease: cubic-bezier(0.16, 1, 0.3, 1);
```
The site also respects `prefers-reduced-motion` automatically — all animations are disabled for users who have that OS setting enabled.

---

## 🛠️ Built With

- HTML5 (semantic markup)
- CSS3 (custom properties, Grid, Flexbox, backdrop-filter, clamp())
- Vanilla JavaScript (ES6+, IntersectionObserver API)
- [Poppins](https://fonts.google.com/specimen/Poppins) & [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts

No React, no Angular, no Vue, no backend, no build step.

---

## 📄 License

This project is personal portfolio content belonging to Gaurav Raktade. Feel free to use the code structure as a template for your own portfolio, but please replace all personal content, photos, and resume data with your own.
