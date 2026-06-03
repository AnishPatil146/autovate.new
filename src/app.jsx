import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, useScroll } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/ui/WhatsAppButton';
import ExitIntentPopup from './components/ui/ExitIntentPopup';
import { CheckoutProvider } from './context/CheckoutContext';

// Pages
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import Pricing from './pages/Pricing';
import HowItWorksPage from './pages/HowItWorks';
import CaseStudies from './pages/CaseStudies';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import ThankYou from './pages/ThankYou';
import Consultation from './pages/Consultation';
import Diagnosis from './pages/Diagnosis';
import NotFound from './pages/NotFound';

// Analytics helpers
import { initGA, initPixel, initHotjar, logPageView } from './utils/analytics';

// Component to handle scroll behavior and analytics on route changes
function RouteTracker() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    logPageView(pathname);

    if (hash) {
      const elementId = hash.replace('#', '');
      // Wait slightly for DOM to render before scrolling
      const timer = setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const { scrollYProgress } = useScroll();

  // Initialize analytics and theme on mount
  useEffect(() => {
    initGA();
    initPixel();
    initHotjar();
  }, []);

  useEffect(() => {
    const handleThemeChange = () => {
      try {
        const currentTheme = localStorage.getItem('marketplace-theme') || 'dark';
        if (currentTheme === 'light') {
          document.documentElement.classList.add('theme-light');
        } else {
          document.documentElement.classList.remove('theme-light');
        }
      } catch (e) {
        document.documentElement.classList.remove('theme-light');
      }
    };

    handleThemeChange();
    window.addEventListener('marketplace-theme-changed', handleThemeChange);
    
    return () => {
      window.removeEventListener('marketplace-theme-changed', handleThemeChange);
    };
  }, []);

  return (
    <Router>
      <RouteTracker />
      <CheckoutProvider>
        <div className="flex flex-col min-h-screen bg-background text-bodyText">
          {/* Scroll progress bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-[2px] bg-tertiary z-50 origin-left"
            style={{ scaleX: scrollYProgress }}
          />

          {/* Sticky Global Navigation */}
          <Navbar />
          
          {/* Main Content Area */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/marketplace/:slug" element={<ProductDetail />} />
              <Route path="/bot/:slug" element={<ProductDetail />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/consultation" element={<Consultation />} />
              <Route path="/diagnosis" element={<Diagnosis />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          {/* Global Footer */}
          <Footer />

          {/* Floating conversion triggers */}
          <ExitIntentPopup />
          <WhatsAppButton />
        </div>
      </CheckoutProvider>
    </Router>
  );
}
