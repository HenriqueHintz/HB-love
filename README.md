# Nossa Jornada Juntos 🥂✨
**A Premium Noir Cinematic Progressive Web App (PWA) for Couples**

![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue)
![Vite](https://img.shields.io/badge/Vite-5.2.0-646CFF)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC)

A beautifully crafted, mobile-first Web Application designed to celebrate relationship milestones, manage shared goals, and immortalize memories. Engineered with a sophisticated "Noir Cinematic" design system featuring glassmorphism, gold accents, and fluid animations.

---

## 📸 Key Features

- **🎬 Noir Cinematic UI:** Deep dark mode integration (`#0A0A0C`), sleek glassmorphism panels, and elegant Playfair Display typography.
- **📱 PWA & Offline Support:** Fully installable on iOS and Android with a custom "Add to Home Screen" prompt. Operates seamlessly without an internet connection.
- **💾 Local Persistence:** Zero data-loss architecture. All state is eagerly synchronized to browser storage using Zustand's persist middleware.
- **📌 Interactive Kanban Board:** Drag-and-drop shared goals across categories (Spirituality, Health, Experiences, Finances) with real-time progress calculation.
- **🎞️ Timeline & Memories Gallery:** Chronological milestone tracking with support for image, video, and document uploads.
- **🏆 Gamification System:** Unlockable achievements and relationship trajectory tracking.
- **🔐 PIN Authentication:** Client-side lock screen mechanism to maintain privacy.

## 🛠️ Tech Stack & Architecture

This project was built with a modern, highly scalable React ecosystem tailored for high performance and strict type safety:

- **Core:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/) (Fast HMR & Optimized Bundles)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (Utility-first, Custom Noir Variant Theme)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (Flux principles with auto-persistence)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) (Spring-physics driven interactions, stagger animations)
- **Drag & Drop:** [@dnd-kit/core](https://dndkit.com/) (Accessible, lightweight drag-and-drop toolkit)
- **Icons:** [Lucide React](https://lucide.dev/) (Clean, consistent SVG iconography)

## 📂 Project Structure

```bash
📦 src
 ┣ 📂 components
 ┃ ┣ 📂 kanban     # DnD context, columns, and task cards
 ┃ ┣ 📂 layout     # AppShell, Sidebar, Ambient Backgrounds
 ┃ ┗ 📂 ui         # Atomic design primitives (Button, Card, FAB, Lightbox)
 ┣ 📂 data         # Initial state and mock scaffolding
 ┣ 📂 hooks        # Custom React hooks (useFileUpload)
 ┣ 📂 pages        # Domain-driven route views (Inicio, Painel, Memorias)
 ┣ 📂 store        # Global Zustand state controllers
 ┣ 📂 styles       # Design tokens (colors, typography, spacing)
 ┣ 📂 types        # Centralized TypeScript definitions
 ┗ 📂 utils        # Helpers (animation presets, UUID generators)
```

## 🚀 Getting Started

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HenriqueHintz/HB-love.git
   cd HB-love
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📱 Mobile Installation (PWA)

To install the app on a mobile device:
1. Open the hosted URL in Safari (iOS) or Chrome (Android).
2. Wait for the custom "Instale nosso app 💖" prompt or tap the browser's share icon.
3. Select **"Add to Home Screen"**.
4. The app will now be available in your app drawer, running completely full-screen independent of the browser UI.

---

*Designed and engineered with passion for a premium user experience.*
