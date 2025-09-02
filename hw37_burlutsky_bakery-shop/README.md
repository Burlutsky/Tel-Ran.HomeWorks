# Tel-Ran Web development. Max Burlutsky. Homework 37.
# Project: Bakery Shop — Vite + React + Redux Toolkit + TypeScript + MUI

A small demo SPA that showcases **public** and **protected** routes, a **MUI**-based top navigation with tabs and a dropdown, and a simple **mock authentication** flow powered by **Redux Toolkit**.

## Tech Stack

- **Vite** (React + TS)
- **React Router v6** (`Routes`, `Route`, nested routes)
- **Redux Toolkit** (auth state)
- **Material UI (MUI)** for UI (AppBar, Tabs, Tab, Menu, etc.)
- **TypeScript** throughout
- **Alias**: `@` → `./src` (configured in `vite.config.ts`)

---

## Pages & Routes

Public pages:

- **Home** — `/`
- **Orders** — `/orders`
- **Bread** — `/bread`

Protected pages (require login):

- **Shopping Card** — `/card`
- **Diary** — `/diary`

Utility:

- **Login** — `/login`
- **404** — any unknown route → `Error404Page`

> The main navigation is generated from `src/app/navItems.ts`. Protected items are marked with `auth: true`, and dropdowns are defined via `children`.

```ts
// src/app/navItems.ts (excerpt)
export const NAV_ITEMS = [
  { title: 'Home', route: '/' },
  { title: 'Orders', route: '/orders' },
  { title: 'Shopping Card', route: '/card', auth: true }, // protected
  {
    title: 'Products',
    children: [
      { title: 'Bread', route: '/bread' },
      { title: 'Diary', route: '/diary', auth: true }     // protected
    ],
  },
];
```
## Routing Overview
```ts
// Typical structure (simplified)
<Routes>
  <Route element={<MainLayout />}>
    {/* public */}
    <Route index element={<Home />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/bread" element={<BreadPage />} />

    {/* auth-only */}
    <Route element={<ProtectedRoute />}>
      <Route path="/card" element={<ShoppingCard />} />
      <Route path="/diary" element={<Diary />} />
    </Route>

    {/* auth */}
    <Route path="/login" element={<Login />} />

    {/* fallback */}
    <Route path="*" element={<Error404Page />} />
  </Route>
</Routes>
```
- ```MainLayout``` renders the top navigation (```MainNav```) and an ```<Outlet />```.

- ```ProtectedRoute``` redirects unauthenticated users to ```/login``` while preserving the requested location (so after login, the user returns to where they tried to go).

## Mock Authentication

- The **Login** page lives at ```/login``` and uses a MUI form.
- The form performs **basic validation**:
  - Email must look like an email (simple regex).
  - Password must be ≥ **6** characters.
- On success it dispatches ```loginSucceeded``` and navigates to the page the user originally requested.

You can tweak the post-login fallback in the sign-in template if needed (e.g., default to ```/``` when no “from” location is provided).

## Project Structure
```bash
.
├── public/
│   └── images/
│       └── error404.png
├── src/
│   ├── app/
│   │   ├── hooks.ts
│   │   ├── navItems.ts
│   │   └── store.ts
│   ├── components/
│   │   ├── MainNav.tsx
│   │   └── ProtectedRoute.tsx
│   ├── layouts/
│   │   └── MainLayout.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Orders.tsx
│   │   ├── Bread.tsx
│   │   ├── Diary.tsx
│   │   ├── ShoppingCard.tsx
│   │   └── service/
│   │       └── Error404Page.tsx
│   ├── templates/
│   │   ├── SignIn.tsx
│   │   ├── TelRanIcon.tsx
│   │   └── GoogleIcon.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── theme.ts
├── vite.config.ts
├── tsconfig.json
└── package.json
```
## Getting Started
### Prerequisites
- **Node.js 18+** is recommended.

### Install
```bash
npm install
```

### Run Dev Server
```bash
npm run dev
```
Open the URL Vite prints (usually http://localhost:5173).
### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

## Configuration Notes

- Path alias @ → ./src is set in vite.config.ts:
```ts
resolve: { alias: { '@': path.resolve(__dirname, './src') } }
```
- Static assets: place images under public/ and reference as /images/....
- Theming: MUI theme is created with createTheme (see src/App.tsx / src/theme.ts).

## Navigation (MUI)

The top bar uses **MUI AppBar + Tabs**, generating items from ```NAV_ITEMS```.
Dropdown groups are rendered as a **Menu**; protected items can show a lock icon and tooltip.

To add or change menu items:
1. Edit ```src/app/navItems.ts``` (add ```{ title, route, auth }``` items or a ```children``` dropdown).
2. Add a corresponding ```<Route>``` in your router.
3. If the route is private, keep it inside the ```<ProtectedRoute>``` block.

## 404 Page

A simple illustration-based 404 page:
Image lives at ```public/images/error404.png```, rendered with ```Box component="img"``` for responsive layout.

## Extending
- Replace the mock auth with a real API (swap out ```loginSucceeded``` in the form submit).
- Add role-based checks in ```ProtectedRoute```.
- Persist auth state (e.g., to ```localStorage``` or via a real session).

## License

Educational/demo use.
```pgsql
**References (from your current sign-in template for validation and navigation):**
- Email & password validation checks (email regex and min length 6). :contentReference[oaicite:0]{index=0} :contentReference[oaicite:1]{index=1}
- Successful login dispatch and redirect using the preserved `from` location. :contentReference[oaicite:2]{index=2}
- Example of a default `from` fallback that you can adjust (often set to `/dashboard` in templates). :contentReference[oaicite:3]{index=3}

If you want, I can also drop this into a real `README.md` file in your workspace.
```

