# Tel-Ran Web development. Max Burlutsky. Homework 35.
# Project: Twitter Lite — Tag Channels + Offline‑first (RTK/RTK Query)

This document describes a showcase architecture for **Vite + React + TypeScript + Redux Toolkit/RTK Query** that combines:
1) “Tag channels” with i18n/RTL and polished UX; and
2) **Offline‑first** behavior: cached browsing, local drafts, deferred publishing, and background sync.

Data sources:
- **DummyJSON**: `auth/login`, `users` — sign‑in and user profiles.
- **JSONPlaceholder**: `posts`, `comments` — feed and discussions.
- **DiceBear**: avatars by deterministic seed (consistent, cacheable).

> Since JSONPlaceholder posts and DummyJSON users are different datasets, we apply a **deterministic author mapping**: `mappedAuthorId = hash(post.userId) % dummyUsersCount` so every post resolves to a rich profile (name/title/avatar).

---

## 1. Goals & Showcase Features

- Tag‑based channels (#tech, #music, #sport, …), favorites, quick switching.
- Infinite scroll with pagination, skeleton loaders, robust empty/error states.
- Local actions (like/retweet/bookmark) with **optimistic updates** and rollback.
- **Offline‑first**: browse cached channels offline; local **drafts** and a **deferred actions queue**.
- i18n (en/ru) and proper **RTL** (he).
- Channel insights (Top authors, frequent tags, average post length).

---

## 2. Architecture & Layers

**UI**: React + routing (`/channel/:tag`, `/post/:id`, `/profile/:id`).  
**State**: Redux Toolkit; **RTK Query** for all network I/O.  
**Normalization**: `createEntityAdapter` for `users`, `posts`, `comments`.  
**Storage**: in‑memory store + IndexedDB (via localForage) for persistence/offline.  
**Caching/Sync**: RTK Query cache tags, invalidation, and a background sync queue.

---

## 3. Proposed Project Structure

```
src/
  app/
    store.ts                 // RTK + RTK Query setup
    i18n/                    // locales (en, ru, he) + RTL wiring
    providers/               // AppProvider, ThemeProvider, IntlProvider
    routes/                  // route declarations
  shared/
    api/clients/             // baseQuery with auth token, retry, error serialization
    lib/                     // utils: hash, formatDate, debounce, etc.
    ui/                      // base UI: Button, Card, Avatar, Skeleton
    constants/               // tag presets, page sizes
    types/                   // shared DTO/Domain types
  entities/
    user/
      model/                 // slice + entityAdapter + selectors
      api/                   // rtkq endpoints: getUsers, getUserById
      ui/                    // UserCard, UserLink
    post/
      model/                 // slice + entityAdapter + selectors
      api/                   // rtkq: getPosts, getPostsByTag, getPost, likePost*
      ui/                    // PostCard, PostList
    comment/
      model/                 // slice + entityAdapter + selectors
      api/                   // rtkq: getCommentsByPost, addComment*
      ui/                    // Comment, CommentList
  features/
    auth/
      model/                 // authSlice (token, profile), route guards
      api/                   // rtkq: login, me?
      ui/                    // LoginForm, AuthGate
    channels/
      model/                 // channelsSlice (favorites, activeTag, ordering)
      ui/                    // ChannelTabs, ChannelPicker
    compose/
      model/                 // composeSlice (drafts, validation)
      ui/                    // ComposeBox, DraftList
    offline/
      model/                 // offlineSlice (queue, networkStatus)
      workers/               // sw registration, background sync helpers
      lib/                   // persistence (IndexedDB), migrations
      ui/                    // OfflineBadge, SyncQueuePanel
    settings/
      model/                 // settingsSlice (theme, locale, rtl)
      ui/                    // ThemeSwitch, LocaleSwitch, RtlToggle
    analytics/
      model/                 // derived selectors for channel insights
      ui/                    // ChannelInsights
  pages/
    FeedPage/
    PostPage/
    ProfilePage/
    SettingsPage/
  app.css / styles/          // theming & responsive
  main.tsx
  App.tsx
```

\* `likePost`, `addComment` are local/demo mutations: optimistic updates + persisting intents to the offline queue.

---

## 4. RTK Query Endpoints

**Auth (DummyJSON)**  
- `POST /auth/login` → `token`, `user`  
- `GET /users?limit=&skip=` (profiles pagination)

**Posts (JSONPlaceholder)**  
- `GET /posts?_limit=&_page=` (or `_start/_limit`)  
- `GET /posts/:id`  
- `GET /posts/:id/comments`  
- Pseudo‑mutations: `likePost`, `bookmarkPost` (client‑only optimistic updates + queue markers).

**Avatars (DiceBear)**  
- Seeded avatar URLs (no network calls required via RTKQ unless wrapping for cache policy).

**Tags/Channels**  
- Tags derived from content (hashtags or dictionary) + presets (`#tech`, `#music`, …).  
- Cache keys: `['posts','tag',tag,{page}]`, `['post',id]`, `['comments',postId]`, `['users',{page}]`.

---

## 5. Offline‑first Strategy

- **Persistence**: IndexedDB (via localForage) for `posts`, `users`, `channels`, `settings`, and the **offline queue**.
- **Service Worker**:
  - Cache static assets (app shell).
  - Cache GET requests (stale‑while‑revalidate).
  - Background sync for the deferred queue (pseudo‑mutations) when the network is back.
- **Queue/Sync**:
  - Offline: store intents (like/bookmark/addComment) into the queue.
  - Online: replay intents, confirm local state, mark entries as synced.
- **Conflicts**: since server mutations don’t exist here, conflicts are client‑side only. Policy: “client wins” with an optional “Reset to server data”.

---

## 6. UI States & Accessibility

- Skeletons, meaningful empty/error states, actions “Retry”, “Clear channel cache”, toasts.
- i18n switching; proper RTL layout (he).
- Keyboard navigation, aria attributes, focus‑traps for modals.

---

## 7. Types & Validation

- Separate DTOs (API responses) from domain/view models.
- Mapping JSONPlaceholder.post.userId → DummyJSON.user (via `hash % usersCount`).
- (Optional) `zod` for data validation and persistence migrations.

---

## 8. Testing

- **Unit**: slice reducers, entityAdapter selectors.
- **Integration**: RTK Query + MSW (mock /posts, /users, /auth).
- **E2E (optional)**: offline mode and queue replay checks.

---

## 9. Roadmap

### Phase 0 — Bootstrap
[x] Vite + React + TS, ESLint/Prettier, path aliases.
- Install RTK/RTK Query, react‑router, i18n, localForage.
- Basic page/layout scaffolding.

### Phase 1 — Auth + Users (DummyJSON)
- RTKQ endpoints: `login`, `getUsers`.
- `authSlice` (token, profile), route guards.
- `user` entityAdapter + selectors; DiceBear avatars.

### Phase 2 — Posts + Comments (JSONPlaceholder)
- RTKQ: `getPosts`, `getPost`, `getCommentsByPost`; pagination/infinite‑scroll.
- `post`/`comment` entityAdapters; loading/empty/error states.

### Phase 3 — Channels + Insights
- `channelsSlice`: favorites, activeTag, ordering.
- Tag derivation, post filtering by tag, ChannelInsights.

### Phase 4 — Offline‑first
- IndexedDB persist (selected slices).
- SW: app‑shell + GET cache (stale‑while‑revalidate).
- Offline queue: like/bookmark/addComment (optimistic → replay). UI: OfflineBadge, QueuePanel.

### Phase 5 — UX Polish & a11y
- Skeletons, toasts, empty states, Retry/Reset.
- i18n/RTL, keyboard/aria, microcopy.

### Phase 6 — Tests & Docs
- Unit/Integration/MSW, (opt.) E2E.
- README with architecture and screenshots, “user journey” demo script.

---

## 10. Definition of Done

- Successful login and profiles fetch.
- Feed with pagination and tag filters.
- Stable avatars; correct author mapping.
- Offline browsing of cached data; queueing and replay of local actions.
- Strong typing, selectors, and clear loading state machine.
- Documentation and baseline tests in place.
