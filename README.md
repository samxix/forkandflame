# The Fork & Flame — Premium Restaurant Website

# live
https://forkandflame-livid.vercel.app/

A stunning, fully responsive fine-dining restaurant website with a premium
editorial design, smooth animations, a functional shopping cart, table
reservations, and more — built with modern React tooling.

> *"Good Food. Great Moments."* — a chef-led, fire-driven kitchen where every
> evening is a small celebration.

---

## Tech Stack

| Layer            | Technology                          |
| ---------------- | ----------------------------------- |
| Framework        | [React 18](https://react.dev)       |
| Build tool       | [Vite 5](https://vitejs.dev)        |
| Styling          | [Tailwind CSS 3](https://tailwindcss.com) + PostCSS/Autoprefixer |
| Animation        | [Framer Motion 11](https://www.framer.com/motion/) |
| Icons            | [Lucide React](https://lucide.dev)  |
| Fonts            | Playfair Display (serif) · Jost (sans) via Google Fonts |
| Imagery          | Unsplash CDN (real food photography) |

## Design System

| Token         | Value     | Usage                        |
| ------------- | --------- | ---------------------------- |
| Warm cream    | `#F8F5EF` | Page background              |
| Deep forest   | `#183D32` | Primary / headings / buttons |
| Burnt orange  | `#C76B43` | Accent / highlights          |
| Dark charcoal | `#242424` | Body text                    |
| Muted beige   | `#EAE3D8` | Surfaces, borders, cards     |

Typography pairs an **elegant serif** (headings) with a **modern sans-serif**
(body). Components use generous spacing, rounded corners, soft shadows, and
subtle hover lifts for a premium, editorial feel.

---

## Features

### 🏠 Navigation
Sticky navbar that transitions from transparent to frosted-glass on scroll,
animated underline links, cart button with live badge, and an animated mobile
menu.

### 🖼️ Hero
Full-screen layered hero with slow Ken-Burns background, staggered entrance
animations, dual CTAs ("Explore Our Menu" / "Book a Table"), and an
opening-hours information bar.

### 📖 About
Editorial split-image layout with a layered photo collage, chef quote, and
stat cards (years of craft, locally sourced produce, happy guests).

### 🍽️ Interactive Menu
15 dishes across 4 categories (Starters, Main Course, Desserts, Drinks) with
an animated category filter pill, live item counter, and layout-animated
cards. Every card shows a photo, description, price, category badge, and an
**Add to Cart** button.

### 🛒 Online Ordering (Cart)
A slide-in cart drawer with:

- Add / remove items, quantity steppers
- Subtotal, delivery fee ($5.99 — **free over $60** with progress meter), total
- Empty-cart state with call-to-action
- Validated checkout form → order confirmation screen
- **Cart persists in `localStorage`** across reloads

### 📅 Table Reservations
Elegant reservation form (name, email, phone, date, time, guests, special
requests) with full client-side validation — past dates are blocked — and a
personalised success confirmation. *Demo only: real-time confirmation requires
a backend integration.*

### 📸 Gallery
Responsive editorial grid with hover zoom/overlay and a full-screen
**lightbox** supporting keyboard navigation (← / → / Esc).

### ⭐ Testimonials
Customer review cards with avatars, star ratings, and roles.

### 📍 Contact
Demo address, phone, and email; opening hours; an embedded Google Map
(configurable demo location); and a validated contact form.

### ✉️ Footer
Brand block, quick links, contact details, social icons, and a **newsletter**
subscription with inline validation and success feedback.

### ✨ Animations & Interactions
Framer Motion drives scroll-reveal sections, hero entrances, menu card
filtering, cart drawer transitions, modal/lightbox animations, mobile menu
slide, and button micro-interactions — all kept subtle and performant.

---

## Project Structure

```
forkandflame/
├── index.html                  # Entry HTML (fonts, title, meta)
├── vite.config.js
├── tailwind.config.js          # Design tokens (colors, fonts, shadows)
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Section composition + providers
    ├── index.css               # Tailwind + shared component classes
    ├── data/
    │   └── menu.js             # Menu items, testimonials, gallery, config
    ├── context/
    │   └── CartContext.jsx     # Cart state + localStorage persistence
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── About.jsx
        ├── MenuSection.jsx
        ├── CartDrawer.jsx
        ├── Reservation.jsx
        ├── Gallery.jsx
        ├── Testimonials.jsx
        ├── Contact.jsx
        ├── Footer.jsx
        └── Reveal.jsx          # Scroll-reveal + section heading helpers
```

All data lives in `src/data/menu.js`, so dishes, prices, and imagery are
trivial to change in one place.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org) 18+ (tested on Node 24) and npm

### Install & run

```bash
npm install        # install dependencies
npm run dev        # start dev server → http://localhost:5173/
```

### Production build

```bash
npm run build      # outputs optimized site to dist/
npm run preview    # preview the production build locally
```

### Available scripts

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the Vite dev server (auto-opens browser) |
| `npm run build` | Build a production bundle into `dist/` |
| `npm run preview` | Serve the production build for a final check |

---

## Customisation

- **Menu & prices** — edit `src/data/menu.js` (`MENU_ITEMS`, `TESTIMONIALS`,
  `GALLERY`).
- **Delivery rules** — `DELIVERY_FEE` and `FREE_DELIVERY_FROM` in the same file.
- **Contact / map** — `DEMO_CONTACT` (address, phone, email, hours, `mapEmbed`
  URL) in `src/data/menu.js`.
- **Colors & fonts** — `tailwind.config.js`.
- **Backend integration** — reservation and checkout forms are client-side
  demos; connect them to your API by replacing the `submit` handlers in
  `src/components/Reservation.jsx` and `src/components/CartDrawer.jsx`.

---

## Accessibility & Performance

- Semantic HTML (`nav`, `main`, `section`, `figure`, `footer`), labelled
  form fields, ARIA attributes on interactive controls, visible error
  messages, and keyboard support for modal/lightbox navigation.
- Images use Unsplash crop parameters + `loading="lazy"` for fast rendering;
  the production bundle is ~101 kB gzipped.

---

## License

Demo project. The Fork & Flame is a fictional restaurant — all contact
details, reservations, and orders are illustrative only.
