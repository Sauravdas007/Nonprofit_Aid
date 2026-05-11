
# Horizon Aid

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge&logo=vercel" />
</p>

<h3 align="center">
A cinematic nonprofit platform built with React, TypeScript, Tailwind CSS, and GSAP.
</h3>

<p align="center">
  <b>Story-driven UX · Smooth animations · Responsive design · Production-ready architecture</b>
</p>

---
<img width="1918" height="1137" alt="Screenshot 2026-05-11 213217" src="https://github.com/user-attachments/assets/6c5b71a0-9836-4532-9560-a5e3af4adc8a" />
<img width="1907" height="1133" alt="Screenshot 2026-05-11 213231" src="https://github.com/user-attachments/assets/a9b1328c-bffc-4d70-a106-58b4d16fa9e1" />
<img width="1918" height="1132" alt="Screenshot 2026-05-11 213248" src="https://github.com/user-attachments/assets/08eba3f2-cd8f-4d04-af8c-a1111b32f652" />
<img width="1088" height="1112" alt="Screenshot 2026-05-11 213338" src="https://github.com/user-attachments/assets/dd48438a-a63a-48c7-9f04-dae29e9f828a" />
<img width="1493" height="1020" alt="Screenshot 2026-05-11 213426" src="https://github.com/user-attachments/assets/922ad0a6-e998-498e-bcc4-b982455d41a7" />


# 🌍 Overview

**Horizon Aid** is a modern nonprofit fundraising and awareness platform designed to help organizations communicate impact, build trust, and increase donor engagement.

The project combines:

- immersive storytelling,
- elegant motion design,
- accessible UI systems,
- and scalable frontend architecture

to create a polished real-world nonprofit web experience.

It includes a complete donation workflow UI, impact storytelling pages, responsive navigation, animated sections, and reusable UI primitives suitable for production-grade applications.

---

# ✨ Features

## 🎨 Brand & Visual Design

- Deep indigo nonprofit-inspired design system
- Elegant serif + Inter typography pairing
- Responsive sticky navigation
- Cohesive spacing, shadows, and component styling
- Mobile-first responsive layouts

---

## ⚡ Motion & Interactions

- GSAP-powered section reveals
- ScrollTrigger animations
- Hero canvas effects
- Smooth hover states and micro-interactions
- Scroll-aware navbar transitions

---

## 🧩 Reusable UI System

Built using scalable component architecture with reusable primitives:

- Buttons
- Cards
- Dialogs
- Forms
- Selects
- Tabs
- Carousels
- Tooltips
- Charts
- Accordions
- Navigation menus
- Toast notifications
- Drawers
- Dropdowns

…and many more.

---

## 💳 Donation Experience

Dedicated donation flow UI featuring:

- Custom donation amounts
- One-time / recurring donations
- Fund allocation selection
- Donor information forms
- Validation with Zod + React Hook Form
- Conversion-focused CTA sections

---

## 📊 Impact Storytelling

Showcases nonprofit metrics and narratives through:

- Animated statistics
- Program highlights
- Testimonials
- Community stories
- Data visualizations

---

# 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Build Tool | Vite 7 |
| Routing | React Router 7 |
| Styling | Tailwind CSS |
| Motion | GSAP + ScrollTrigger |
| Forms | React Hook Form |
| Validation | Zod |
| Icons | Lucide React |
| Charts | Recharts |
| Linting | ESLint |
| Hosting | Vercel |

---

# 📂 Routes

| Route | Description |
|---|---|
| `/` | Landing page with hero, mission, programs, impact, testimonials |
| `/programs` | Filterable nonprofit programs showcase |
| `/impact` | Statistics, metrics, and impact stories |
| `/about` | Organization mission, team, and values |
| `/donate` | Donation workflow and donor form experience |

---

# 📸 Preview Sections

## 🏠 Home

- Cinematic hero section
- Mission statement
- Program previews
- Animated impact stats
- Testimonials
- Call-to-action sections

---

## 🌱 Programs

- Category-based filtering
- Program detail cards
- Responsive grid layouts
- Reusable card components

---

## 📈 Impact

- Metrics dashboards
- Visual storytelling
- Community outcomes
- Data-driven sections

---

## 🤝 About

- Team introductions
- Organizational mission
- Vision and values
- Nonprofit narrative

---

## ❤️ Donate

- Interactive donation form
- Frequency selection
- Fund allocation
- Form validation
- Accessible form controls

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/Sauravdas007/Nonprofit_Aid.git
```

---

## 2️⃣ Navigate into the Project

```bash
cd Nonprofit_Aid
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

## 4️⃣ Start Development Server

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

# 📜 Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Generate production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint checks |

---

# 🏗 Project Structure

```bash
Nonprofit_Aid/
│
├── public/                     # Static assets
│
├── src/
│   ├── components/
│   │   ├── ui/                 # Reusable UI primitives
│   │   └── sections/           # Page sections
│   │
│   ├── pages/                  # Route pages
│   ├── hooks/                  # Custom hooks
│   ├── lib/                    # Utilities/helpers
│   ├── App.tsx                 # Main app routes
│   ├── main.tsx                # App entry point
│   └── index.css               # Global styles + tokens
│
├── index.html
├── tailwind.config.js
├── vite.config.ts
├── vercel.json
└── package.json
```

---

# 🧠 Architecture Highlights

## ✅ SPA Routing Support

`vercel.json` ensures all routes correctly resolve to `index.html` for React Router deep links.

---

## ✅ Type-Safe Development

TypeScript ensures:

- predictable props,
- safer forms,
- scalable architecture,
- maintainable codebases

---

## ✅ Scalable UI System

Component architecture follows reusable design principles for long-term maintainability and rapid iteration.

---

# 🌐 Deployment

The application is optimized for deployment on **Vercel**.

## Deployment Settings

| Setting | Value |
|---|---|
| Build Command | `npm run build` |
| Output Directory | `dist` |

---

## Deploy Steps

1. Push repository to GitHub
2. Import project into Vercel
3. Configure build settings
4. Deploy

---

# 🔮 Future Improvements

Potential enhancements:

- Stripe integration
- PayPal integration
- CMS support
- Dark mode
- Internationalization (i18n)
- Analytics dashboard
- Accessibility audits
- Backend integration
- Real donation APIs
- Admin dashboard

---

# 🎯 Performance & DX

- Fast HMR with Vite
- Optimized component structure
- Responsive rendering
- Reusable hooks/utilities
- ESLint support
- Clean folder architecture

---

# 🧪 Suggested Enhancements for Production

Before production usage:

- Replace placeholder nonprofit content
- Add legal/privacy pages
- Configure analytics
- Add backend donation APIs
- Set up authentication if needed
- Add monitoring/logging

---

# 👨‍💻 Author

### [Saurav Das](https://github.com/Sauravdas007)

Frontend developer focused on modern React applications, motion-rich interfaces, and scalable UI systems.

---

# 📄 License

This project is currently intended for educational and portfolio purposes.

Add a license file if distributing publicly.

---

# 🙌 Acknowledgements

Built with:

- React
- TypeScript
- Tailwind CSS
- GSAP
- Vite
- Lucide
- React Hook Form
- Zod

---

<p align="center">
  <b>Built with passion for impactful digital experiences.</b>
</p>

<p align="center">
  ⭐ Star the repository if you found it useful.
</p>
