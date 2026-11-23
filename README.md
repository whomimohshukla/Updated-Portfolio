# Mimoh Shukla — Portfolio

A personal portfolio site for Mimoh Shukla, an AI and full-stack engineer. Built with React, Vite and Tailwind CSS. It has a dark terminal-inspired look, but the writing is plain and human so visitors can quickly find what they need.

## What's on the site

- **About** — a short introduction and ways to get in touch
- **Skills** — tools grouped by frontend, backend, databases, AI, cloud and dev tools
- **Projects** — eight shipped products, each with a short description, tech stack, live demo and source code
- **Experience** — roles at Taurgo and SmallFare with short, readable bullet points
- **GitHub** — live profile stats, a contribution calendar and recently pushed repositories
- **Contact** — email, GitHub, LinkedIn and Discord

There is also a sticky navigation bar, a back-to-top button and a small "get in touch" form that opens your email app with the message prefilled.

## Tech stack

- React 19
- Vite 7
- Tailwind CSS 4
- react-icons
- EmailJS is installed but the contact form currently uses `mailto`

## Getting started

Prerequisites: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the URL Vite prints in your terminal (usually `http://localhost:5173`).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — create a production build in `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

## GitHub data

The GitHub section works without any configuration using public APIs. For more accurate contribution totals per year and a higher rate limit, add a token:

```
VITE_GH_TOKEN=your_token_here
```

Put this in `.env.local` in the project root. A fine-grained token with no scopes is enough for public data. Never commit env files.

## Project structure

```
public/            images, logos and résumés served as-is
src/App.jsx        all page content and components
src/main.jsx       React entry point
src/tailwind.css   theme, base styles and animations
index.html         page metadata
```

## Deployment

Any static host works: Vercel, Netlify, Cloudflare Pages or GitHub Pages.

```bash
npm run build
```

Then deploy the `dist/` folder. For non-root paths, set `base` in `vite.config.js`.

## Editing the content

Almost all wording lives in `src/App.jsx`:

- `NAV_ITEMS` — navigation labels and section anchors
- `SKILL_GROUPS` — skills and their categories
- `PROJECTS` — project descriptions, tags and links
- `EXPERIENCE` — roles and achievement bullets
- `SOCIALS` — contact links
- `EMAIL`, `LINKEDIN`, `DISCORD` — contact details near the top

Page title and description live in `index.html`.
