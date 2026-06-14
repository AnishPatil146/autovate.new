import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, RefreshCw, RotateCcw, X, Info } from 'lucide-react';

const DARK_PALETTES = [
  { name: 'Default Slate & Purple', heading: '#F8FAFC', text: '#94A3B8', primary: '#A855F7' },
  { name: 'Aurora Mint & Emerald', heading: '#ECFDF5', text: '#A7F3D0', primary: '#10B981' },
  { name: 'Sunset Terracotta', heading: '#FFF7ED', text: '#FED7AA', primary: '#F97316' },
  { name: 'Neon Cyber Teal', heading: '#F0FDFA', text: '#99F6E4', primary: '#06B6D4' },
  { name: 'Velvet Orchid Pink', heading: '#FFF1F2', text: '#FDA4AF', primary: '#EC4899' },
  { name: 'Volt Yellow', heading: '#FFFDF5', text: '#FDE047', primary: '#EAB308' },
  { name: 'Electric Cyan', heading: '#ECFEFF', text: '#A5F3FC', primary: '#06B6D4' },
  { name: 'Royal Indigo Blue', heading: '#EEF2FF', text: '#C7D2FE', primary: '#6366F1' },
  { name: 'Hyper Lime Green', heading: '#F0FDF4', text: '#BCF0DA', primary: '#22C55E' },
  { name: 'Soft Orchid Lavender', heading: '#FAF5FF', text: '#E9D5FF', primary: '#D946EF' }
];

const LIGHT_PALETTES = [
  { name: 'Default Slate & Purple', heading: '#18181B', text: '#4B5563', primary: '#9333EA' },
  { name: 'Teal Mint', heading: '#0F766E', text: '#115E59', primary: '#0D9488' },
  { name: 'Sunset Terracotta', heading: '#7C2D12', text: '#9A3412', primary: '#EA580C' },
  { name: 'Royal Indigo Blue', heading: '#1E3A8A', text: '#2563EB', primary: '#4F46E5' },
  { name: 'Deep Forest Green', heading: '#14532D', text: '#166534', primary: '#16A34A' },
  { name: 'Midnight Ocean Navy', heading: '#0F172A', text: '#334155', primary: '#0284C7' },
  { name: 'Crimson Velvet Rose', heading: '#881337', text: '#9F1239', primary: '#DB2777' },
  { name: 'Deep Plum Violet', heading: '#581C87', text: '#6B21A8', primary: '#9333EA' },
  { name: 'Chocolate Amber', heading: '#451A03', text: '#78350F', primary: '#B45309' }
];

export default function FontColorShuffler() {
  const location = useLocation();
  const menuRef = useRef(null);
  
  // Settings
  const [enabled, setEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('font-shuffler-enabled');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [changeOnNav, setChangeOnNav] = useState(() => {
    try {
      const saved = localStorage.getItem('font-shuffler-on-nav');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [changeOnReload, setChangeOnReload] = useState(() => {
    try {
      const saved = localStorage.getItem('font-shuffler-on-reload');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [changeOnClick, setChangeOnClick] = useState(() => {
    try {
      const saved = localStorage.getItem('font-shuffler-on-click');
      return saved !== null ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [currentPalette, setCurrentPalette] = useState(null);
  const [isRotating, setIsRotating] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Save settings helper
  const updateSetting = (key, value, setter) => {
    setter(value);
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };

  // Main logic to change colors
  const shuffleColors = (force = false, specifiedTheme = null) => {
    if (!enabled && !force) return;

    try {
      const themeVal = specifiedTheme || localStorage.getItem('marketplace-theme') || 'dark';
      const isLight = themeVal === 'light';
      const palettes = isLight ? LIGHT_PALETTES : DARK_PALETTES;
      
      let nextIndex = Math.floor(Math.random() * palettes.length);
      const savedIndex = localStorage.getItem('font-shuffler-palette-index');
      
      // Ensure we pick a different one if there's a saved index
      if (savedIndex !== null && parseInt(savedIndex) === nextIndex && palettes.length > 1) {
        nextIndex = (nextIndex + 1) % palettes.length;
      }
      
      localStorage.setItem('font-shuffler-palette-index', nextIndex.toString());
      const palette = palettes[nextIndex];
      
      // Apply CSS variables
      document.documentElement.style.setProperty('--color-heading', palette.heading);
      document.documentElement.style.setProperty('--color-text', palette.text);
      document.documentElement.style.setProperty('--color-primary', palette.primary);
      
      setCurrentPalette(palette);
      
      // Dispatch custom event to notify other modules
      window.dispatchEvent(new CustomEvent('font-shuffler-palette-changed', { detail: palette }));
    } catch (err) {
      console.error('Failed to shuffle font colors:', err);
    }
  };

  // Restore defaults
  const resetToDefaults = () => {
    setIsResetting(true);
    setTimeout(() => {
      try {
        const themeVal = localStorage.getItem('marketplace-theme') || 'dark';
        const isLight = themeVal === 'light';
        const defaultPalette = isLight ? LIGHT_PALETTES[0] : DARK_PALETTES[0];
        
        // Reset properties to stylesheets
        document.documentElement.style.removeProperty('--color-heading');
        document.documentElement.style.removeProperty('--color-text');
        document.documentElement.style.removeProperty('--color-primary');
        
        localStorage.removeItem('font-shuffler-palette-index');
        setCurrentPalette(defaultPalette);
        
        window.dispatchEvent(new CustomEvent('font-shuffler-palette-changed', { detail: defaultPalette }));
      } catch (err) {
        console.error(err);
      }
      setIsResetting(false);
    }, 400);
  };

  // Shuffler trigger click handler
  const handleShuffleClick = (e) => {
    e.stopPropagation();
    setIsRotating(true);
    shuffleColors(true);
    setTimeout(() => setIsRotating(false), 500);
  };

  // 1. Initial Load Effect
  useEffect(() => {
    if (changeOnReload && enabled) {
      shuffleColors();
    } else {
      // Still set current palette info state
      const themeVal = localStorage.getItem('marketplace-theme') || 'dark';
      const isLight = themeVal === 'light';
      const defaultIndex = parseInt(localStorage.getItem('font-shuffler-palette-index') || '0');
      const palettes = isLight ? LIGHT_PALETTES : DARK_PALETTES;
      setCurrentPalette(palettes[defaultIndex] || palettes[0]);
    }
  }, []);

  // 2. Navigation Change Effect
  useEffect(() => {
    if (changeOnNav && enabled) {
      shuffleColors();
    }
  }, [location.pathname]);

  // 3. Click Anywhere Effect
  useEffect(() => {
    if (!changeOnClick || !enabled) return;

    const handleWindowClick = (e) => {
      // Don't trigger if clicking within the shuffler widget itself
      if (menuRef.current && menuRef.current.contains(e.target)) {
        return;
      }
      shuffleColors();
    };

    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, [changeOnClick, enabled]);

  // 4. Listen to Theme Changes from Navbar theme toggle
  useEffect(() => {
    const handleThemeChange = () => {
      // Short timeout to let the documentElement's class finish updating
      setTimeout(() => {
        const themeVal = localStorage.getItem('marketplace-theme') || 'dark';
        if (enabled) {
          shuffleColors(true, themeVal);
        } else {
          // just update current palette info without overriding stylesheet
          const isLight = themeVal === 'light';
          const defaultPalette = isLight ? LIGHT_PALETTES[0] : DARK_PALETTES[0];
          setCurrentPalette(defaultPalette);
        }
      }, 50);
    };

    window.addEventListener('marketplace-theme-changed', handleThemeChange);
    return () => window.removeEventListener('marketplace-theme-changed', handleThemeChange);
  }, [enabled]);

  // Handle clicking outside of menu to close it
  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  return (
    <div ref={menuRef} className="fixed bottom-6 left-6 z-50 flex flex-col items-start font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="mb-4 w-72 rounded-2xl border border-cardBorder bg-[#111116]/95 backdrop-blur-xl p-5 shadow-2xl text-slate-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                <span className="font-semibold text-sm tracking-tight text-white font-display uppercase">Color Shuffler</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Close settings"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Explanation */}
            <p className="text-[11px] text-slate-400 leading-relaxed my-3 flex gap-1.5 items-start">
              <Info className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
              <span>
                Makes typography colors shift dynamically, providing a unique custom theme for each visit.
              </span>
            </p>

            {/* Active Palette Display */}
            {currentPalette && (
              <div className="bg-white/5 border border-white/5 rounded-xl p-3 mb-4">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1.5">
                  Current Color Profile
                </div>
                <div className="text-xs text-white font-medium mb-2.5 truncate">
                  {currentPalette.name}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-white/10 shadow-sm" 
                      style={{ backgroundColor: currentPalette.heading }}
                    />
                    <span className="text-[10px] text-slate-400">Heading</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-white/10 shadow-sm" 
                      style={{ backgroundColor: currentPalette.text }}
                    />
                    <span className="text-[10px] text-slate-400">Text</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-white/10 shadow-sm" 
                      style={{ backgroundColor: currentPalette.primary }}
                    />
                    <span className="text-[10px] text-slate-400">Accent</span>
                  </div>
                </div>
              </div>
            )}

            {/* Toggle Switches */}
            <div className="space-y-3 mb-4">
              {/* Enable Master Switch */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Enable Shuffling</span>
                <button
                  type="button"
                  onClick={() => updateSetting('font-shuffler-enabled', !enabled, setEnabled)}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors focus:outline-none ${
                    enabled ? 'bg-primary' : 'bg-white/10'
                  }`}
                >
                  <motion.div
                    layout
                    className="bg-white w-4 h-4 rounded-full shadow-md"
                    animate={{ x: enabled ? 16 : 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              {enabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 pt-2 border-t border-white/5 overflow-hidden"
                >
                  {/* Change on Reload */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Change on page reload</span>
                    <input
                      type="checkbox"
                      checked={changeOnReload}
                      onChange={(e) => updateSetting('font-shuffler-on-reload', e.target.checked, setChangeOnReload)}
                      className="rounded border-white/10 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 focus:ring-1 h-3.5 w-3.5 cursor-pointer accent-primary"
                    />
                  </div>

                  {/* Change on Navigation */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Change on navigation</span>
                    <input
                      type="checkbox"
                      checked={changeOnNav}
                      onChange={(e) => updateSetting('font-shuffler-on-nav', e.target.checked, setChangeOnNav)}
                      className="rounded border-white/10 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 focus:ring-1 h-3.5 w-3.5 cursor-pointer accent-primary"
                    />
                  </div>

                  {/* Change on Click */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 flex items-center gap-1">
                      <span>Change on every click</span>
                      <span className="bg-primary/25 text-primary text-[9px] px-1 py-0.5 rounded font-bold uppercase scale-90 origin-left">
                        Fun
                      </span>
                    </span>
                    <input
                      type="checkbox"
                      checked={changeOnClick}
                      onChange={(e) => updateSetting('font-shuffler-on-click', e.target.checked, setChangeOnClick)}
                      className="rounded border-white/10 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 focus:ring-1 h-3.5 w-3.5 cursor-pointer accent-primary"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 border-t border-white/5 pt-3">
              <button
                type="button"
                onClick={handleShuffleClick}
                disabled={!enabled}
                className="flex-grow flex items-center justify-center gap-1.5 bg-gradient-to-r from-primary to-secondary hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all py-2 rounded-xl text-white text-xs font-bold shadow-md shadow-primary/20"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
                <span>Shuffle Colors</span>
              </button>
              
              <button
                type="button"
                onClick={resetToDefaults}
                className="flex items-center justify-center hover:bg-white/10 active:scale-95 border border-white/10 transition-all p-2 rounded-xl text-slate-300 hover:text-white"
                title="Reset to Defaults"
                aria-label="Reset to Defaults"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-primary to-secondary text-white rounded-full shadow-[0_8px_30px_rgba(168,85,247,0.35)] hover:scale-110 active:scale-95 transition-all duration-300 relative group"
        aria-label="Font color shuffler settings"
      >
        {/* Pulsing indicator loop */}
        <span 
          className="absolute inset-0 rounded-full bg-primary/30 animate-slow-ping pointer-events-none"
          style={{ animationDuration: '4s' }}
        />
        
        {/* Icon */}
        <Palette className="w-6 h-6 relative z-10 text-white" />
        
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-secondary flex items-center justify-center text-[8px] font-bold text-white leading-none">
            !
          </span>
        </span>

        {/* Hover Label */}
        {!isOpen && (
          <span className="absolute left-16 bg-[#111] border border-primary/30 text-primary text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl">
            Magic Typography Shuffler
          </span>
        )}
      </button>
    </div>
  );
}
