# Autovate Automation Marketplace

A complete, conversion-optimized, and fully production-ready React.js + Tailwind CSS application representing a next-generation marketplace that sells AI Automation Bots and services to businesses.

Built with a dark aesthetic (#090909 base), Electric Cyan primary accents, Hot Orange buy targets, and Soft Emerald review badges, integrating high-fidelity interactions, scroll indicators, and conversion optimization widgets.

---

## 🚀 Live Demo & Quick Deploy

Deploy your own version of this marketplace in under 10 minutes on Vercel or Netlify.

### Option 1: Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run the command: `vercel`
3. Link your project, keep default configurations, and deploy.

### Option 2: Deploy to Netlify
1. Run local build: `npm run build`
2. Drag and drop the compiled `/dist` directory directly onto [Netlify Drop](https://app.netlify.com/drop) or link your git repo.

---

## 🛠️ Technology Stack & Integrations

- **Core Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v3 + Custom Grids & Glassmorphism Properties
- **Motion & Transitions**: Framer Motion
- **Routing**: React Router DOM (Multi-page client routing)
- **Analytics & tracking placeholders**: Complete integration scripts inside [analytics.js](file:///src/utils/analytics.js) for:
  - Google Analytics 4 (GA4)
  - Meta/Facebook Pixel
  - Hotjar Screen-recording
  - Custom Checkout Events
- **Ecosystem Connections**: Labeled integration TODO hooks for payment providers (Stripe/Razorpay), Calendly calendars, and custom forms.

---

## 📂 File Architecture

The codebase is organized as follows:
- `/src`
  - `/data`
    - [products.json](file:///src/data/products.json): All 71 bots with detailed outcomes, includes lists, test questions, comparisons, and custom reviews.
    - [categories.json](file:///src/data/categories.json): Industry category metadata, icons, and pain points.
    - [testimonials.json](file:///src/data/testimonials.json): Social proof metrics from different niches.
    - [faqs.json](file:///src/data/faqs.json): Global FAQ questions.
  - `/components`
    - `/layout`: Frosted sticky [Navbar.jsx](file:///src/components/layout/Navbar.jsx) and dynamic [Footer.jsx](file:///src/components/layout/Footer.jsx).
    - `/ui`: Conversion items like [ROICalculator.jsx](file:///src/components/ui/ROICalculator.jsx), [ExitIntentPopup.jsx](file:///src/components/ui/ExitIntentPopup.jsx), and floating [WhatsAppButton.jsx](file:///src/components/ui/WhatsAppButton.jsx).
  - `/pages`: 12 connected router pages including [Home.jsx](file:///src/pages/Home.jsx), [Marketplace.jsx](file:///src/pages/Marketplace.jsx), [ProductDetail.jsx](file:///src/pages/ProductDetail.jsx), and [CategoryPage.jsx](file:///src/pages/CategoryPage.jsx).

---

## 💻 Local Development

Follow these steps to run the development server locally:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Dev Server**:
   ```bash
   npm run dev
   ```

3. **Build Production Asset Bundles**:
   ```bash
   npm run build
   ```
   *Compiles all JS and CSS assets directly to the `/dist` output folder.*
