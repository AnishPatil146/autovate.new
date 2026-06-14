import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Phone, Home as HomeIcon, Clock, CreditCard, ShoppingCart, Brain, Sun, Moon } from 'lucide-react';
import GradientButton from '../ui/GradientButton';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [marketplaceTheme, setMarketplaceTheme] = useState(() => {
    try {
      return localStorage.getItem('marketplace-theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    const handleThemeChange = () => {
      try {
        setMarketplaceTheme(localStorage.getItem('marketplace-theme') || 'dark');
      } catch {
        setMarketplaceTheme('dark');
      }
    };
    window.addEventListener('marketplace-theme-changed', handleThemeChange);
    
    const handleStorageChange = (e) => {
      if (e.key === 'marketplace-theme') {
        setMarketplaceTheme(e.newValue || 'dark');
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('marketplace-theme-changed', handleThemeChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const isLight = marketplaceTheme === 'light';

  const toggleTheme = () => {
    const nextTheme = marketplaceTheme === 'light' ? 'dark' : 'light';
    try {
      localStorage.setItem('marketplace-theme', nextTheme);
    } catch (e) {
      console.warn(e);
    }
    setMarketplaceTheme(nextTheme);
    window.dispatchEvent(new Event('marketplace-theme-changed'));
  };

  // Handle scroll event to change background styling shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  const [prevPath, setPrevPath] = useState(location.pathname);
  if (location.pathname !== prevPath) {
    setIsOpen(false);
    setPrevPath(location.pathname);
  }

  const navItems = [
    { name: 'Home', path: '/', icon: 'Home' },
    { name: 'Marketplace', path: '/marketplace', icon: 'ShoppingCart' },
    { name: 'How It Works', path: '/how-it-works', icon: 'Clock' },
    { name: 'Pricing', path: '/pricing', icon: 'CreditCard' },
    { name: 'Diagnosis', path: '/diagnosis', icon: 'Brain' },
    { name: 'Contact', path: '/contact', icon: 'Phone' },
  ];

  const getIcon = (iconName) => {
    const style = `w-[18px] h-[18px] mr-1.5 ${isLight ? 'text-zinc-900' : 'text-headingText'} group-hover:scale-115 transition-transform duration-150 shrink-0`;
    switch (iconName) {
      case 'Home': return <HomeIcon className={style} />;
      case 'ShoppingCart': return <ShoppingCart className={style} />;
      case 'Clock': return <Clock className={style} />;
      case 'CreditCard': return <CreditCard className={style} />;
      case 'Brain': return <Brain className={style} />;
      case 'Phone': return <Phone className={style} />;
      default: return null;
    }
  };

  const handleNavClick = (path) => {
    setIsOpen(false);
    if (path.startsWith('/#')) {
      const elementId = path.substring(2);
      setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 h-[76px] flex items-center border-b ${
        isLight
          ? scrolled
            ? 'bg-[#FAF8F5]/90 border-zinc-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-md'
            : 'bg-transparent border-transparent'
          : scrolled
            ? 'bg-background/90 border-cardBorder/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md'
            : 'bg-background/70 border-transparent backdrop-blur-md'
      }`}
    >
      <div className="max-w-[1280px] w-full mx-auto px-6 md:px-16">
        <div className="flex items-center justify-between w-full">
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.img
              src="/logo.png"
              alt="Autovate Logo"
              whileHover={{ rotate: -3, scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="w-9 h-9 object-contain rounded-lg border border-cardBorder bg-white p-0.5 shadow-sm"
            />
            <span className={`text-xl font-bold font-display tracking-tight uppercase ${isLight ? 'text-zinc-900' : 'text-headingText'}`}>
              Autovate
            </span>
          </Link>
 
          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = item.path === '/' 
                ? location.pathname === '/' 
                : location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`relative px-2 py-2.5 text-sm font-medium font-sans hover:text-primary transition-colors flex items-center group ${
                    isLight ? 'text-zinc-800 hover:text-black' : 'text-headingText/85 hover:text-primary'
                  }`}
                >
                  <span>{item.name}</span>
                  
                  {/* Underline slides in from left on hover using Tailwind transitions */}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />

                  {/* Active dot indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="activeDot"
                      className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                        isLight ? 'bg-zinc-900' : 'bg-tertiary'
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Call Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full border transition-all hover:scale-105 active:scale-95 ${
                isLight 
                  ? 'text-zinc-800 border-zinc-200 hover:bg-zinc-150/50 bg-white' 
                  : 'text-primary border-cardBorder hover:bg-background bg-card'
              }`}
              aria-label="Toggle theme"
            >
              {marketplaceTheme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4 text-primary animate-pulse" />
              )}
            </button>
            <GradientButton
              href="tel:+919096861443"
              variant="outline"
              size="sm"
              icon={<Phone className="w-3.5 h-3.5" />}
              className="hidden lg:inline-flex"
            >
              Call Us
            </GradientButton>
            <motion.a
              href="https://wa.me/919096861443"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, brightness: 1.08 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold font-display uppercase tracking-wider bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full transition-all shadow-[0_4px_14px_rgba(37,211,102,0.35)] btn-shimmer"
            >
              <svg className="w-3.5 h-3.5 mr-2 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFF" d="M12.003 21c-1.74 0-3.41-.49-4.86-1.4l-.35-.22-3.61.95.96-3.52-.24-.38A9.87 9.87 0 0 1 2.15 11.19c.005-5.46 4.45-9.9 9.91-9.9 2.65 0 5.14 1.03 7.01 2.9a9.83 9.83 0 0 1 2.91 7.02c-.005 5.46-4.45 9.9-9.91 9.9h-.07z" style={{ fill: '#25D366' }} />
                <path fill="#FFF" d="M12.003 0C5.38 0 .01 5.37.006 11.99c0 2.11.55 4.18 1.6 6L0 24l6.15-1.61c1.78.97 3.79 1.48 5.84 1.48h.01c6.62 0 12-5.37 12-11.99c0-3.21-1.25-6.22-3.51-8.48A11.9 11.9 0 0 0 12.003 0zm5.52 17.02c-.23.64-1.34 1.22-1.85 1.3-.5.08-1.52.12-3.11-.53a10.2 10.2 0 0 1-4.71-4.14c-.81-1.08-1.45-2.45-1.45-3.87 0-1.46.77-2.18 1.05-2.47.27-.3.6-.37.79-.37.2 0 .39 0 .56.01.18 0 .42-.07.65.48.24.58.82 2 .89 2.15.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.16-.32.37-.46.5-.15.15-.3.31-.13.6.17.3 1.09 3.01 2.5 4.27 1.4 1.25 2.58 1.64 2.95 1.82.37.18.59.15.8-.08.23-.26.96-1.12 1.22-1.51.27-.39.53-.33.9-.19.36.14 2.3.1 2.7.29.39.2.65.3.72.43.08.13.08.76-.15 1.4z" />
              </svg>
              WhatsApp Us
            </motion.a>
          </div>

          {/* Mobile Theme Toggle & Mobile hamburger menu toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all hover:scale-105 active:scale-95 ${
                isLight 
                  ? 'text-zinc-800 border-zinc-200 hover:bg-zinc-150/50 bg-white' 
                  : 'text-primary border-cardBorder hover:bg-background bg-card'
              }`}
              aria-label="Toggle theme"
            >
              {marketplaceTheme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4 text-primary animate-pulse" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none ${
                isLight ? 'text-zinc-900 hover:text-zinc-700' : 'text-headingText hover:text-tertiary'
              }`}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {isOpen && (
        <div className={`absolute top-[76px] left-0 w-full border-b py-6 px-6 space-y-6 flex flex-col z-50 shadow-2xl ${
          isLight ? 'bg-[#FAF8F5] border-zinc-200' : 'bg-[#111116] border-cardBorder'
        }`}>
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`text-base font-medium py-2 px-3 rounded-lg transition-colors flex items-center ${
                  isLight ? 'text-zinc-800 hover:bg-zinc-150/50 hover:text-black' : 'text-headingText hover:bg-background hover:text-primary'
                }`}
              >
                {getIcon(item.icon)}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
          
          <div className="pt-4 border-t border-cardBorder flex flex-col space-y-3">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`inline-flex items-center justify-center w-full py-3 font-display font-bold uppercase tracking-wider rounded-full text-xs border gap-2 transition-all ${
                isLight 
                  ? 'text-zinc-800 border-zinc-200 hover:bg-zinc-150/50 bg-white' 
                  : 'text-headingText border-cardBorder hover:bg-background bg-card'
              }`}
            >
              {marketplaceTheme === 'light' ? (
                <>
                  <Moon className="w-3.5 h-3.5" /> Dark Mode
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-primary" /> Light Mode
                </>
              )}
            </button>

            <GradientButton
              href="tel:+919096861443"
              variant="outline"
              size="sm"
              fullWidth
              icon={<Phone className="w-3.5 h-3.5" />}
            >
              Call Us
            </GradientButton>
            <a
              href="https://wa.me/919096861443"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-display font-bold uppercase tracking-wider rounded-full shadow-[0_4px_12px_rgba(37,211,102,0.3)] text-xs gap-2"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFF" d="M12.003 21c-1.74 0-3.41-.49-4.86-1.4l-.35-.22-3.61.95.96-3.52-.24-.38A9.87 9.87 0 0 1 2.15 11.19c.005-5.46 4.45-9.9 9.91-9.9 2.65 0 5.14 1.03 7.01 2.9a9.83 9.83 0 0 1 2.91 7.02c-.005 5.46-4.45 9.9-9.91 9.9h-.07z" style={{ fill: '#25D366' }} />
                <path fill="#FFF" d="M12.003 0C5.38 0 .01 5.37.006 11.99c0 2.11.55 4.18 1.6 6L0 24l6.15-1.61c1.78.97 3.79 1.48 5.84 1.48h.01c6.62 0 12-5.37 12-11.99c0-3.21-1.25-6.22-3.51-8.48A11.9 11.9 0 0 0 12.003 0zm5.52 17.02c-.23.64-1.34 1.22-1.85 1.3-.5.08-1.52.12-3.11-.53a10.2 10.2 0 0 1-4.71-4.14c-.81-1.08-1.45-2.45-1.45-3.87 0-1.46.77-2.18 1.05-2.47.27-.3.6-.37.79-.37.2 0 .39 0 .56.01.18 0 .42-.07.65.48.24.58.82 2 .89 2.15.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.16-.32.37-.46.5-.15.15-.3.31-.13.6.17.3 1.09 3.01 2.5 4.27 1.4 1.25 2.58 1.64 2.95 1.82.37.18.59.15.8-.08.23-.26.96-1.12 1.22-1.51.27-.39.53-.33.9-.19.36.14 2.3.1 2.7.29.39.2.65.3.72.43.08.13.08.76-.15 1.4z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
