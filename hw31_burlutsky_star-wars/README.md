# Star Wars — Vite + React + TypeScript

A demo app with a clean architecture (app / pages / widgets / shared), React Router v7, path aliases, and CSS Modules.  
The **Home** page shows the selected hero’s portrait with a *Far Galaxy* panel; **Star Wars** provides search & details; **About Me** fetches data for the currently selected hero using its `apiId`.

## Stack
- Vite `^6.3.5`
- React `^19.1.0`, React DOM
- React Router DOM `^7.7.1`
- TypeScript `~5.8.3`
- @vitejs/plugin-react `^4.4.1`
- CSS Modules (+ global `index.css`)

> Code style: semicolons everywhere; imports use path aliases.

---

## Quick start
```bash
npm install
npm run dev
# build & preview
npm run build
npm run preview
```
Open `http://localhost:5173/` — it redirects to `/home`.

---

## Project structure (high‑level)
```
src/
├─ app/
│  ├─ layout/
│  │  └─ MainLayout.tsx
│  └─ router.tsx
├─ pages/
│  ├─ Home/
│  │  ├─ Hero.tsx
│  │  ├─ Gallery.tsx
│  │  ├─ FarGalaxy.tsx
│  │  ├─ Hero.module.css
│  │  ├─ Gallery.module.css
│  │  ├─ FarGalaxy.module.css
│  │  └─ index.tsx
│  ├─ StarWars/
│  │  ├─ index.tsx          # search
│  │  ├─ Details.tsx        # details
│  │  └─ Details.module.css
│  ├─ About/
│  │  ├─ index.tsx
│  │  └─ About.module.css
│  └─ Contacts/
│     └─ index.tsx
├─ widgets/
│  ├─ Header/
│  │  ├─ index.tsx
│  │  └─ Header.module.css
│  ├─ Footer/
│  │  ├─ index.tsx
│  │  └─ Footer.module.css
│  └─ Navigation/
│     ├─ index.tsx
│     ├─ NavItem.tsx
│     └─ NavItem.module.css
├─ shared/
│  ├─ api/
│  │  └─ swapi.ts
│  ├─ config/
│  │  ├─ sw.ts              # API baseUrl
│  │  ├─ nav.ts             # nav items
│  │  └─ friends.ts         # heroes with apiId
│  ├─ lib/
│  │  ├─ SWContext.ts
│  │  ├─ tools.ts
│  │  └─ hooks.ts           # useMainHero(friends)
│  └─ types/
│     └─ sw.ts
├─ assets/                  # (optional) imported assets
├─ App.tsx
├─ main.tsx
└─ index.css                # reset + theme + utilities
public/
└─ images/
   ├─ sky.jpg               # global site background
   ├─ luke.jpg              # portraits, etc.
   └─ ...
```

---

## Path aliases
**`tsconfig.app.json`**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@app/*": ["src/app/*"],
      "@pages/*": ["src/pages/*"],
      "@widgets/*": ["src/widgets/*"],
      "@shared/*": ["src/shared/*"],
      "@assets/*": ["src/assets/*"]
    }
  }
}
```

**`vite.config.ts`**
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@assets': path.resolve(__dirname, 'src/assets')
    }
  },
  css: { modules: { localsConvention: 'camelCaseOnly' } }
});
```

---

## Routes
| Path               | Screen                               |
|--------------------|--------------------------------------|
| `/`                | redirect to `/home`                  |
| `/home`            | home (Hero + Gallery)                |
| `/home/:heroId`    | home for selected hero               |
| `/about_me`        | About Me (current hero data)         |
| `/star_wars`       | search page                          |
| `/star_wars/:id`   | details page                         |
| `/contacts`        | demo contact form                    |

- The first nav item is **dynamic**: it shows the current hero’s **name** and links to `/home/:heroId`.
- Details page has a **Back** button that returns to the **previous search list**, preserving `?q=`.

---

## Data & context
- `SWContext` stores `mainHero: string` — the hero **id** (e.g., `"luke"`) and `setMainHero(id)`.
- `useMainHero(friends)` maps that id to a hero object `{ id, name, img, apiId }`.
- Heroes list: `@shared/config/friends.ts`, e.g.:
```ts
export const friends = [
  { name: 'Luke Skywalker', img: 'luke.jpg', id: 'luke', apiId: 'peoples/30' },
  { name: 'R2-D2', img: 'r2d2.jpg', id: 'r2_d2', apiId: 'peoples/3' },
  // ...
];
```
> `apiId` holds the API suffix (e.g., `peoples/30`). Trimming is applied before the request to guard against stray spaces/slashes.

---

## API
**Base URL:** `@shared/config/sw.ts`
```ts
export const baseUrl = 'https://sw-info-api.herokuapp.com/v1/';
```

### Calls
- `searchPeople(query)` → `GET {baseUrl}peoples?search=<q>` → list.
- `getPerson(id)` → `GET {baseUrl}peoples/<id>` → details.
- `getByApiId(apiId)` → `GET {baseUrl}<apiId>` → details by `apiId` from `friends`.

### Images
The API may return either:
1) a **full URL**, e.g., `https://sw-info-api.herokuapp.com/luke_skywalker.jpg` — used as is;  
2) a **file name**, e.g., `luke_skywalker.jpg` — combined with `baseUrl` **without** `/v1/`.

---

## Styling
- Global styles: `index.css` (reset, theme variables, utilities) and **site background** from `public/images/sky.jpg`:
```css
body {
  background: var(--bg) url('/images/sky.jpg') center / cover no-repeat fixed;
}
```
- Component styles via CSS Modules (e.g., `Hero.module.css`, `Details.module.css`).
- Cards/content render on `var(--surface)` with readable `var(--text)`.

---

## Page behavior
- **Home**: portrait on the left, *Far Galaxy* panel on the right (opening crawl normalized — no “poem” effect). Gallery below; clicking a card changes `:heroId`.
- **Star Wars**: search input is synced to `?q=`. Navigating to details carries the same `?q` and a `state.from` value so the **Back** button returns to the **exact list**.
- **Details**: shows `image` if provided by the API, structured key–value fields, and the Back button.
- **About Me**: fetches data using the current hero’s `apiId`. Handles both **person** and **transport** records.

---

## Add a new hero
1) Place a portrait in `public/images/` (e.g., `rey.jpg`).  
2) Add an entry to `@shared/config/friends.ts`:
```ts
{ name: 'Rey', img: 'rey.jpg', id: 'rey', apiId: 'peoples/XX' }
```
3) Check `/home/rey` and `/about_me` (data loads via `apiId`).

---

## Scripts
```bash
npm run dev       # dev server
npm run build     # production build (dist/)
npm run preview   # local preview of the build
```

---

## License
MIT.
