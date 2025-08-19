An interactive developer portfolio for Mimoh Shukla built with React, Vite, and Tailwind CSS. It features a terminal-style navigation, animated reveals, and GitHub activity widgets.

## Features

- Terminal-like command input to navigate sections and open external links
  - Available commands: `help`, `projects`, `skills`, `contact`, `about`, `top`, `github`, `linkedin`, `clear`
- Smooth reveal-on-scroll animations for sections and UI elements
- Skills and tooling icons powered by `react-icons`
- GitHub contributions calendar with year filter
  - Uses GitHub GraphQL API when a token is provided for accurate per-year totals
  - Falls back to public contributions APIs/images without a token
- GitHub stats cards and streak widgets
- Responsive layout with Tailwind CSS v4
- Fast dev experience with Vite and React 19

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- ESLint 9
- react-icons

## Skills

- Front-end: React, Vite, Tailwind CSS
- Languages: JavaScript/TypeScript
- Tooling: ESLint, react-icons
- Back-end/Infra: BullMQ, Redis

## Getting Started

Prerequisites:
- Node.js 18+ and npm

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Lint the project:

```bash
npm run lint
```

## Environment Variables (optional)

Some GitHub features work better with an access token (higher rate limits and accurate per-year contributions via GraphQL):

Create a `.env.local` (or `.env`) file in the project root:

```
VITE_GH_TOKEN=ghp_your_personal_access_token
```

Notes:
- Only the `VITE_`-prefixed variables are exposed to the client by Vite.
- Use a fine-scoped token. For public data, no scopes are required.
- Never commit `.env*` files to source control.

## Scripts

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Production build
- `npm run preview` — Preview built app locally
- `npm run lint` — Run ESLint

## Project Structure

```
├─ public/               # Static assets served as-is
├─ src/
│  ├─ App.jsx            # Main UI: terminal, sections, GitHub widgets
│  ├─ main.jsx           # App entry, mounts React root
│  ├─ tailwind.css       # Tailwind imports
│  ├─ assets/            # Local images/assets
│  └─ (styles)           # Other CSS files
├─ index.html            # Root HTML
├─ vite.config.js        # Vite config
├─ tailwind.config.js    # Tailwind CSS config
├─ eslint.config.js      # ESLint config
└─ package.json
```

## Customization

- Update profile links (GitHub/LinkedIn) inside `src/App.jsx` terminal commands.
- Tweak skills and icons using `react-icons` imports in `src/App.jsx`.
- Modify colors, spacing, and theme in `tailwind.config.js` or utility classes.
- Replace or extend GitHub widgets (stats, streak, activity graph) by editing the image URLs in `App.jsx`.

## Deployment

Any static hosting provider works (Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.).

1) Build the site

```bash
npm run build
```

2) Deploy the `dist/` folder output to your host of choice:
- Vercel/Netlify: Connect repo and configure the build command `npm run build` and output `dist`.
- GitHub Pages: Push the `dist/` contents to the `gh-pages` branch (or use an action).

If you require client-side routing with non-root base paths, configure `base` in `vite.config.js` accordingly.

## Accessibility & UX

- Keyboard-friendly terminal input with visible focus and ARIA label.
- Smooth scrolling and content reveal animations with IntersectionObserver.
- High-contrast green accent color for key interactive elements.

## License

This project is provided as-is under the MIT license. You are free to adapt and use it for your personal portfolio.

## Acknowledgements

- Vite, React, Tailwind CSS
- GitHub Readme Stats, Streak Stats, Activity Graph
- GitHub Contributions calendar APIs
