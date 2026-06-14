import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, Check, ArrowRight, ChevronDown, ChevronUp, Info, Sun, Moon,
  Cpu, Cloud, Activity, Megaphone, Compass, GraduationCap, DollarSign, Scale, ShoppingCart, Home as HomeIcon,
  HeartPulse, TrendingUp, Coins, Users, Brain, Sparkles, RotateCcw, MessageSquare, Zap, Terminal,
  Code, Globe, Layers, Server, Shield, Key, Lock, Eye, Map, Mail,
  FileText, Folder, PieChart, BarChart, LineChart, Settings, Sliders, Filter, Link, Anchor,
  Award, Bookmark, Briefcase, Calendar, Camera, Cast, Clock, Copy, Download, Upload,
  ExternalLink, Feather, Gift, Grid, Inbox, Laptop, List, Monitor, Music, Package,
  Paperclip, Percent, Pin, Play, Power, Save, Send, Shuffle, Star, Target,
  Wrench, Trash2, Truck, Tv, Video, Wifi, Volume2, Heart, Bell, Book,
  MapPin, HelpCircle, AlertCircle, GitBranch, HardDrive, Hash, Layout, BookOpen, FolderOpen, CheckCircle,
  Database, Phone, User, Share2, Radio
} from 'lucide-react';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import { SEOPage } from '../utils/seoHelper';
import { useCheckout } from '../context/CheckoutContext';
import StarRating from '../components/ui/StarRating';
import GradientButton from '../components/ui/GradientButton';
import BuyNowButton from '../components/ui/BuyNowButton';

// 90 unique Lucide icons (excluding the 5 special ones used specifically for key bots)
const REMAINING_ICONS = [
  Cpu, Cloud, Activity, Megaphone, Compass, GraduationCap, DollarSign, Scale, ShoppingCart, HomeIcon,
  HeartPulse, TrendingUp, Coins, Users, Brain, Sparkles, RotateCcw, MessageSquare, Zap, Terminal,
  Code, Globe, Layers, Server, Shield, Key, Lock, Eye, Map, Mail,
  FileText, Folder, PieChart, BarChart, LineChart, Settings, Sliders, Filter, Link, Anchor,
  Award, Bookmark, Briefcase, Calendar, Camera, Cast, Clock, Copy, Download, Upload,
  ExternalLink, Feather, Gift, Grid, Inbox, Laptop, List, Monitor, Music, Package,
  Paperclip, Percent, Pin, Play, Power, Save, Send, Shuffle, Star, Target,
  Wrench, Trash2, Truck, Tv, Video, Wifi, Volume2, Heart, Bell, Book,
  MapPin, HelpCircle, AlertCircle, GitBranch, HardDrive, Hash, Layout, BookOpen, FolderOpen, CheckCircle
];

// Statically compile list of non-special products so indexes are fixed and stable
const nonSpecialProducts = productsData.filter(p => {
  const n = p.name.toLowerCase();
  const s = p.slug.toLowerCase();
  return !(
    s === 'whatsapp-ai-bot' || n.includes('whatsapp') ||
    s === 'b2b-scraper' || n.includes('scraper') ||
    s === 'ai-voice-caller' || n.includes('voice') || n.includes('caller') || n.includes('phone') ||
    s === 'omni-channel-bot' || n.includes('omni') ||
    s === 'social-pilot' || n.includes('social') || n.includes('pilot') ||
    s === 'crm-enricher' || n.includes('crm') || n.includes('enricher')
  );
});

// Dynamic Card Header styles and icons mapping to match the beige-pastel aesthetic
const getProductHeaderStyles = (product) => {
  if (!product) return { bgStyle: { backgroundColor: '#f4f4f5' }, icon: <Cpu className="w-12 h-12 text-zinc-500 stroke-[1.5]" /> };
  
  const name = product.name.toLowerCase();
  const slug = product.slug.toLowerCase();

  // Find index of the product in the global database (static array)
  const globalIdx = productsData.findIndex(p => p.id === product.id);
  const hue = (globalIdx !== -1 ? globalIdx : 0) * 137 % 360;

  // Compute a highly aesthetic pastel background and high-contrast stroke color
  const bgStyle = { backgroundColor: `hsl(${hue}, 85%, 96%)` };
  const iconColor = `hsl(${hue}, 90%, 45%)`;
  
  // Custom WhatsApp icon SVG path using the dynamic color
  const whatsappSvg = (
    <svg className="w-12 h-12" style={{ color: iconColor }} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.459h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
    </svg>
  );

  // Special mappings (using their specific unique icons, but styled with dynamic unique colors)
  if (slug === 'whatsapp-ai-bot' || name.includes('whatsapp')) {
    return { bgStyle, icon: whatsappSvg };
  }
  if (slug === 'b2b-scraper' || name.includes('scraper')) {
    return { bgStyle, icon: <Database className="w-12 h-12 stroke-[1.5]" style={{ color: iconColor }} /> };
  }
  if (slug === 'ai-voice-caller' || name.includes('voice') || name.includes('caller') || name.includes('phone')) {
    return { bgStyle, icon: <Phone className="w-12 h-12 stroke-[1.5]" style={{ color: iconColor }} /> };
  }
  if (slug === 'omni-channel-bot' || name.includes('omni')) {
    return { bgStyle, icon: <Share2 className="w-12 h-12 stroke-[1.5]" style={{ color: iconColor }} /> };
  }
  if (slug === 'social-pilot' || name.includes('social') || name.includes('pilot')) {
    return { bgStyle, icon: <Radio className="w-12 h-12 stroke-[1.5]" style={{ color: iconColor }} /> };
  }
  if (slug === 'crm-enricher' || name.includes('crm') || name.includes('enricher')) {
    return { bgStyle, icon: <User className="w-12 h-12 stroke-[1.5]" style={{ color: iconColor }} /> };
  }

  // Find index in non-special products list to assign a completely unique icon
  const nonSpecialIdx = nonSpecialProducts.findIndex(p => p.id === product.id);
  if (nonSpecialIdx !== -1) {
    const IconComponent = REMAINING_ICONS[nonSpecialIdx % REMAINING_ICONS.length];
    return { bgStyle, icon: <IconComponent className="w-12 h-12 stroke-[1.5]" style={{ color: iconColor }} /> };
  }

  return { bgStyle, icon: <Cpu className="w-12 h-12 stroke-[1.5]" style={{ color: iconColor }} /> };
};

// Formatting Indian phone numbers (XXXXX XXXXX)
const formatIndianPhone = (value) => {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 5) {
    return digits;
  } else {
    return `${digits.slice(0, 5)} ${digits.slice(5, 10)}`;
  }
};

export default function Marketplace() {
  const { triggerCheckout } = useCheckout();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedWorkflow, setExpandedWorkflow] = useState({}); // ID -> boolean
  const [selectedBundles, setSelectedBundles] = useState([]); // Array of Product IDs
  const [connectedProducts, setConnectedProducts] = useState({});

  // Theme Syncing
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('marketplace-theme') || 'dark';
    } catch (e) {
      return 'dark';
    }
  });
  useEffect(() => {
    const handleThemeChange = () => {
      try {
        setTheme(localStorage.getItem('marketplace-theme') || 'dark');
      } catch (e) {
        setTheme('dark');
      }
    };
    window.addEventListener('marketplace-theme-changed', handleThemeChange);
    const handleStorageChange = (e) => {
      if (e.key === 'marketplace-theme') {
        setTheme(e.newValue || 'dark');
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('marketplace-theme-changed', handleThemeChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const isLight = theme === 'light';

  // Drawer States for custom requirements / WhatsApp negotiations
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerProduct, setDrawerProduct] = useState(null); // null if bundle enquiry
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formBusinessType, setFormBusinessType] = useState('');
  const [formMessage, setFormMessage] = useState('');

  // Dynamically compile categories with their product counts
  const filterPills = useMemo(() => {
    return [
      { id: 'All', name: 'All', count: productsData.length },
      ...categoriesData.map(cat => {
        const count = productsData.filter(p => p.category === cat.id).length;
        return { id: cat.id, name: cat.name, count: count };
      })
    ];
  }, []);

  // Filter products based on active tab and search criteria
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      // Search term matching (Name, Description, Tech Stack)
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.techStack.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Category filter matching
      if (selectedFilter === 'All') {
        return true;
      }
      return product.category === selectedFilter;
    });
  }, [selectedFilter, searchQuery]);

  // Collapsible toggle for outcomes
  const toggleWorkflow = (id) => {
    setExpandedWorkflow(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Toggle selection for bulk custom bundle builds
  const toggleBundleSelection = (id) => {
    setSelectedBundles(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Open WhatsApp enquiry drawer for one specific product
  const openEnquiryDrawer = (product) => {
    setDrawerProduct(product);
    setFormMessage(`Hi Autovate! I'm interested in deploying the "${product.name}" workflow. Let's discuss integrations.`);
    setIsDrawerOpen(true);
  };

  // Open WhatsApp enquiry drawer for multiple selected products (bundle offer)
  const openBundleEnquiry = () => {
    setDrawerProduct(null);
    const selectedNames = productsData
      .filter(p => selectedBundles.includes(p.id))
      .map(p => p.name)
      .join(', ');
    setFormMessage(`Hi Autovate! I'd like to create a custom automation bundle consisting of: ${selectedNames}. Can I get integration layout support?`);
    setIsDrawerOpen(true);
  };

  // Close Slide-Over Drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setDrawerProduct(null);
    setFormName('');
    setFormPhone('');
    setFormBusinessType('');
    setFormMessage('');
  };

  // Form Submit Handler -> Redirects to pre-filled WhatsApp message
  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    if (!formName || !formPhone) return;

    const targetText = drawerProduct
      ? drawerProduct.name
      : productsData
          .filter(p => selectedBundles.includes(p.id))
          .map(p => p.name)
          .join(', ');

    const prefilledText = `Hi Autovate! I'm interested in: ${targetText}.\nName: ${formName}\nWhatsApp: +91 ${formPhone}\nBusiness: ${formBusinessType}\nMessage: ${formMessage}`;
    const encodedText = encodeURIComponent(prefilledText);
    window.open(`https://wa.me/919096861443?text=${encodedText}`, '_blank');
    closeDrawer();
  };

  return (
    <div className={`min-h-screen pb-24 pt-[76px] font-sans transition-colors duration-350 ${
      isLight ? 'bg-[#FAF8F5] text-zinc-900' : 'bg-[#08080C] text-[#94A3B8]'
    }`}>
      <SEOPage
        title="AI Automation Bot Blueprints Marketplace | Autovate"
        description="Browse our 71 pre-engineered AI and WhatsApp automation blueprints. Qualify leads, automate support, and scale operations instantly."
      />

      {/* 1. HERO BANNER */}
      <section className={`w-full pt-16 pb-8 px-6 md:px-16 transition-colors duration-350 ${
        isLight ? 'bg-[#FAF8F5]' : 'bg-[#08080C] bg-gradient-to-b from-[#08080C] to-[#0c0c12] relative overflow-hidden'
      }`}>
        {!isLight && (
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        )}
        <div className="max-w-[1280px] mx-auto text-left space-y-2 relative z-10">
          <h1 className={`text-4xl font-bold tracking-tight font-sans uppercase ${
            isLight ? 'text-zinc-900' : 'text-[#F8FAFC]'
          }`}>
            Marketplace
          </h1>
          <p className={`text-sm md:text-base font-sans ${
            isLight ? 'text-zinc-500' : 'text-[#94A3B8]'
          }`}>
            70+ production-ready AI automation prompts for n8n
          </p>
        </div>
      </section>

      {/* 2. FILTER & SEARCH TOOLBAR */}
      <section className={`w-full pb-8 px-6 md:px-16 transition-colors duration-350 ${
        isLight ? 'bg-[#FAF8F5]' : 'bg-[#0c0c12]'
      }`}>
        <div className="max-w-[1280px] mx-auto space-y-6">
          
          {/* Search & Theme Switcher Box */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
            <div className="relative flex-grow w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, category, or use case..."
                className={`w-full pl-12 pr-12 py-3.5 text-sm rounded-full focus:outline-none focus:ring-1 transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)] ${
                  isLight 
                    ? 'text-zinc-800 bg-white border border-zinc-200/80 focus:border-zinc-400 focus:ring-zinc-400 placeholder-zinc-400' 
                    : 'text-[#F8FAFC] bg-zinc-900 border border-cardBorder focus:border-primary focus:ring-primary placeholder-zinc-500'
                }`}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-650"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>


          </div>

          {/* Category Filter Pills (Horizontal Scrollable Strip) */}
          <div className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar py-1">
            {filterPills.map((pill) => {
              const isActive = selectedFilter === pill.id;
              const pillLabel = pill.name;
              return (
                <button
                  key={pill.id}
                  onClick={() => setSelectedFilter(pill.id)}
                  className={`px-4 py-2 text-xs font-medium whitespace-nowrap rounded-full border transition-all ${
                    isActive
                      ? isLight
                        ? 'bg-black text-white border-black shadow-sm'
                        : 'bg-primary text-black border-primary shadow-sm shadow-primary/20 font-bold'
                      : isLight
                        ? 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
                        : 'bg-zinc-900 text-[#94A3B8] border-cardBorder hover:bg-zinc-850'
                  }`}
                >
                  {pillLabel}
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. DYNAMIC PRODUCTS GRID */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-16 py-12">
        <AnimatePresence mode="wait">
          {filteredProducts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`w-full text-center py-20 rounded-3xl border p-8 max-w-lg mx-auto space-y-4 ${
                isLight ? 'bg-white border-zinc-200' : 'bg-zinc-900 border-cardBorder'
              }`}
            >
              <Info className="w-8 h-8 text-zinc-400 mx-auto" />
              <p className="text-zinc-500 text-sm">No automation templates match your search term or chosen category.</p>
              <button 
                onClick={() => { setSelectedFilter('All'); setSearchQuery(''); }}
                className={`px-5 py-2.5 font-semibold text-xs rounded-full transition-colors ${
                  isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-primary text-black hover:opacity-95'
                }`}
              >
                Clear Search Filter
              </button>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProducts.map((product) => {
                const isExpanded = !!expandedWorkflow[product.id];
                const isSelected = selectedBundles.includes(product.id);
                const headerStyle = getProductHeaderStyles(product);
                
                const isConnected = !!connectedProducts[product.id];
                
                if (isConnected) {
                  const waText = encodeURIComponent(`Hi Autovate! I'd like to connect with your team to setup the "${product.name}" blueprint.`);
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                      key={product.id}
                      className={`relative flex flex-col justify-between rounded-[24px] border h-full p-6 text-center min-h-[420px] transition-all duration-300 ${
                        isLight
                          ? 'bg-white border-emerald-500/40 shadow-[0_8px_30px_rgba(16,185,129,0.04)]'
                          : 'bg-zinc-900 border-emerald-500/35 shadow-[0_8px_30px_rgba(16,185,129,0.1)]'
                      }`}
                    >
                      <div className="flex-grow flex flex-col items-center justify-center space-y-4 py-8">
                        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                          <Check className="w-7 h-7 stroke-[3]" />
                        </div>
                        <div className="space-y-1">
                          <h3 className={`text-sm font-bold font-display uppercase tracking-tight ${isLight ? 'text-zinc-900' : 'text-[#F8FAFC]'}`}>
                            Request Received!
                          </h3>
                          <p className={`text-[11px] leading-relaxed max-w-[200px] mx-auto ${isLight ? 'text-zinc-550' : 'text-[#94A3B8]'}`}>
                            Connecting you with our engineers for the <span className="text-primary font-semibold">{product.name}</span> setup.
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 pt-4 border-t border-cardBorder">
                        <a
                          href={`https://wa.me/919096861443?text=${waText}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-display font-bold uppercase tracking-wider rounded-xl shadow-sm text-[10px] flex items-center justify-center gap-1.5 transition-all active:scale-98"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Chat on WhatsApp</span>
                        </a>
                        <button
                          onClick={(e) => { 
                            e.preventDefault(); 
                            e.stopPropagation(); 
                            setConnectedProducts(prev => ({ ...prev, [product.id]: false })); 
                          }}
                          className={`w-full py-2 border rounded-xl text-[9px] font-medium tracking-wide flex items-center justify-center gap-1 transition-all ${
                            isLight 
                              ? 'border-zinc-200 hover:border-zinc-300 text-zinc-500 hover:text-zinc-800 bg-zinc-50' 
                              : 'border-cardBorder hover:border-white/20 text-bodyText/80 hover:text-white bg-background'
                          }`}
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Back to card</span>
                        </button>
                      </div>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    layout
                    whileHover={{ y: -6, scale: 1.015 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                    key={product.id}
                    onClick={() => toggleBundleSelection(product.id)}
                    className={`relative flex flex-col justify-between group rounded-[24px] cursor-pointer h-full overflow-hidden transition-all duration-300 ${
                      isLight 
                        ? 'bg-white border border-zinc-150 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)]' 
                        : 'bg-zinc-900 border border-cardBorder shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(0,245,255,0.06)]'
                    }`}
                  >
                    
                    {/* Top half - Pastel Background & Large Icon */}
                    <div 
                      className={`h-[160px] w-full flex items-center justify-center relative transition-colors duration-300 ${
                        isLight ? '' : 'bg-zinc-950/65'
                      }`}
                      style={isLight ? headerStyle.bgStyle : {}}
                    >
                      <div className={`p-4 rounded-2xl ${!isLight ? 'bg-zinc-900/60 border border-cardBorder' : ''}`}>
                        {headerStyle.icon}
                      </div>
                      
                      {/* Checkbox (Click to toggle bundle selection) */}
                      <div className="absolute top-4 right-4" onClick={(e) => e.stopPropagation()}>
                        <label className="relative flex items-center justify-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleBundleSelection(product.id)}
                            className="sr-only peer"
                          />
                          <div className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center ${
                            isSelected 
                              ? isLight ? 'bg-black border-black text-white scale-110' : 'bg-primary border-primary text-black scale-110'
                              : isLight 
                                ? 'border-zinc-300 bg-white/80 opacity-80 group-hover:opacity-100 hover:border-zinc-500' 
                                : 'border-zinc-700 bg-zinc-900/80 opacity-80 group-hover:opacity-100 hover:border-primary'
                          }`}>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Bottom half - Content */}
                    <div className={`p-6 flex flex-col justify-between flex-grow space-y-4 transition-colors duration-350 ${
                      isLight ? 'bg-white' : 'bg-zinc-900'
                    }`}>
                      <div className="space-y-3">
                        {/* Header Row: Title & Category Badge */}
                        <div className="flex items-start justify-between gap-2">
                          <h3 className={`text-base font-bold font-sans transition-colors leading-snug text-left uppercase ${
                            isLight ? 'text-zinc-900 group-hover:text-black' : 'text-[#F8FAFC] group-hover:text-primary'
                          }`}>
                            {product.name}
                          </h3>
                          <span className={`shrink-0 text-[9px] font-bold font-sans px-2.5 py-1 rounded-full uppercase tracking-wider ${
                            isLight ? 'bg-zinc-100 text-zinc-550' : 'bg-zinc-800 text-zinc-400 border border-cardBorder'
                          }`}>
                            {product.category.replace('-', ' ')}
                          </span>
                        </div>

                        {/* Description */}
                        <p className={`text-xs leading-relaxed text-left line-clamp-2 ${
                          isLight ? 'text-zinc-500' : 'text-[#94A3B8]/90'
                        }`}>
                          {product.description}
                        </p>
                      </div>

                      <div className="space-y-4">
                        {/* Pricing & Rating Row */}
                        <div className={`flex items-center justify-between pt-3 border-t ${
                          isLight ? 'border-zinc-100' : 'border-cardBorder'
                        }`}>
                          {/* Price */}
                          <div className="text-left">
                            <span className="text-[10px] text-zinc-400 font-medium block uppercase tracking-wider">BLUEPRINT PRICE</span>
                            <span className={`text-xl font-bold ${
                              isLight ? 'text-zinc-900' : 'text-primary'
                            }`}>${product.price}</span>
                          </div>
                          
                          {/* Rating */}
                          <div className={`flex items-center text-xs font-semibold px-2.5 py-1.5 rounded-lg border ${
                            isLight ? 'text-zinc-700 bg-zinc-50 border-zinc-100' : 'text-[#F8FAFC] bg-zinc-900/60 border-cardBorder'
                          }`}>
                            <span className="text-amber-500 mr-1 text-sm leading-none">★</span>
                            <span>{product.rating}</span>
                            <span className="text-zinc-400 ml-1 font-normal">({product.reviewsCount})</span>
                          </div>
                        </div>

                        {/* Outcomes Accordion */}
                        <div className="text-left" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleWorkflow(product.id); }}
                            className={`w-full flex items-center justify-between py-2 px-3 border rounded-lg text-[10px] font-bold transition-all ${
                              isLight 
                                ? 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200/80 hover:border-zinc-300 text-zinc-500' 
                                : 'bg-zinc-950 hover:bg-zinc-900 border-cardBorder text-[#94A3B8]'
                            }`}
                          >
                            <span className="flex items-center space-x-2">
                              <span className={`font-sans tracking-wider ${isLight ? 'text-zinc-800' : 'text-[#F8FAFC]'}`}>TARGET OUTCOMES</span>
                            </span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-zinc-500" /> : <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />}
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                                className={`overflow-hidden border-x border-b rounded-b-lg -mt-1 p-3 space-y-2 ${
                                  isLight ? 'bg-zinc-50/50 border-zinc-200' : 'bg-zinc-950/50 border-cardBorder'
                                }`}
                              >
                                {product.outcomes.map((step, idx) => (
                                  <motion.div 
                                    key={idx}
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.04 }}
                                    className="flex items-start text-[11px]"
                                  >
                                    <span className="text-emerald-500 mr-2 shrink-0">✓</span>
                                    <span className="leading-relaxed text-bodyText">{step}</span>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Tech Chips */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {product.techStack.map((tech) => (
                            <span 
                              key={tech} 
                              className={`px-2.5 py-0.5 rounded-full border text-[9px] font-sans font-medium uppercase tracking-wide transition-colors ${
                                isLight 
                                  ? 'border-zinc-200 bg-zinc-50 text-zinc-500' 
                                  : 'border-cardBorder bg-zinc-950 text-[#94A3B8]/60'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="pt-2 space-y-2.5" onClick={(e) => e.stopPropagation()}>
                          <BuyNowButton
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              setConnectedProducts(prev => ({ ...prev, [product.id]: true }));
                              triggerCheckout(product); 
                            }}
                            fullWidth
                            className="rounded-xl"
                          >
                            Connect with us
                          </BuyNowButton>
                          
                          <button
                            onClick={(e) => { e.stopPropagation(); openEnquiryDrawer(product); }}
                            className={`w-full py-2 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 ${
                              isLight ? 'text-zinc-500 hover:text-zinc-800' : 'text-primary hover:brightness-110'
                            }`}
                          >
                            <span>Enquire on WhatsApp</span>
                          </button>
                        </div>
                      </div>

                    </div>

                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 3.5 MARKETPLACE POLICIES & TERMS */}
      <section className={`max-w-[1280px] mx-auto px-6 md:px-16 py-16 border-t mt-8 transition-colors duration-350 ${
        isLight ? 'border-zinc-200 bg-[#FAF8F5]' : 'border-cardBorder bg-[#08080C]'
      }`}>
        <div className="text-left space-y-3 mb-12">
          <span className={`text-[9px] font-sans font-bold tracking-[0.2em] uppercase px-3.5 py-1.5 rounded-full inline-block border ${
            isLight ? 'text-zinc-500 bg-zinc-100 border-zinc-200/50' : 'text-primary bg-primary/10 border-primary/20'
          }`}>
            Customer Agreements & FAQS
          </span>
          <h2 className={`text-2xl md:text-4xl font-bold font-sans tracking-tight uppercase leading-none ${
            isLight ? 'text-zinc-900' : 'text-[#F8FAFC]'
          }`}>
            Marketplace Policies & Terms
          </h2>
          <p className={`text-xs md:text-sm max-w-xl leading-relaxed ${
            isLight ? 'text-zinc-500' : 'text-[#94A3B8]'
          }`}>
            Please review our digital delivery terms, refund rules, and developer support guidelines before deploying your blueprints.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className={`border rounded-2xl p-5 space-y-4 hover:shadow-sm transition-all duration-300 flex flex-col justify-between ${
            isLight ? 'bg-white border-zinc-200/80 hover:border-zinc-300' : 'bg-zinc-900 border-cardBorder hover:border-zinc-800'
          }`}>
            <div className="space-y-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
                isLight ? 'bg-zinc-50 text-zinc-800 border-zinc-200' : 'bg-zinc-950 text-headingText border-cardBorder'
              }`}>
                <Cloud className="w-5 h-5" />
              </div>
              <h3 className={`text-sm font-bold uppercase font-sans tracking-wider ${isLight ? 'text-zinc-900' : 'text-[#F8FAFC]'}`}>
                Instant Delivery
              </h3>
              <p className={`text-[11px] leading-relaxed ${isLight ? 'text-zinc-500' : 'text-[#94A3B8]/80'}`}>
                Your automation files (.json/.yaml) and setup video tutorials are dispatched to your email address within 10-15 minutes of UTR payment verification.
              </p>
            </div>
            <div className="text-[9px] font-sans font-bold text-zinc-400 uppercase tracking-widest pt-2">Digital Delivery</div>
          </div>

          <div className={`border rounded-2xl p-5 space-y-4 hover:shadow-sm transition-all duration-300 flex flex-col justify-between ${
            isLight ? 'bg-white border-zinc-200/80 hover:border-zinc-300' : 'bg-zinc-900 border-cardBorder hover:border-zinc-800'
          }`}>
            <div className="space-y-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
                isLight ? 'bg-zinc-50 text-zinc-800 border-zinc-200' : 'bg-zinc-950 text-headingText border-cardBorder'
              }`}>
                <Scale className="w-5 h-5" />
              </div>
              <h3 className={`text-sm font-bold uppercase font-sans tracking-wider ${isLight ? 'text-zinc-900' : 'text-[#F8FAFC]'}`}>
                Setup Guarantee
              </h3>
              <p className={`text-[11px] leading-relaxed ${isLight ? 'text-zinc-500' : 'text-[#94A3B8]/80'}`}>
                If you face issues deploying the blueprint, our support team will help you configure it. If it remains unresolved in 14 days, we will issue a full refund.
              </p>
            </div>
            <div className="text-[9px] font-sans font-bold text-zinc-400 uppercase tracking-widest pt-2">Refund Policy</div>
          </div>

          <div className={`border rounded-2xl p-5 space-y-4 hover:shadow-sm transition-all duration-300 flex flex-col justify-between ${
            isLight ? 'bg-white border-zinc-200/80 hover:border-zinc-300' : 'bg-zinc-900 border-cardBorder hover:border-zinc-800'
          }`}>
            <div className="space-y-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
                isLight ? 'bg-zinc-50 text-zinc-800 border-zinc-200' : 'bg-zinc-950 text-headingText border-cardBorder'
              }`}>
                <Users className="w-5 h-5" />
              </div>
              <h3 className={`text-sm font-bold uppercase font-sans tracking-wider ${isLight ? 'text-zinc-900' : 'text-[#F8FAFC]'}`}>
                Single License
              </h3>
              <p className={`text-[11px] leading-relaxed ${isLight ? 'text-zinc-500' : 'text-[#94A3B8]/80'}`}>
                Purchases grant a single-use license for one business entity. Unauthorized resale, distribution, or copying of blueprints is strictly prohibited.
              </p>
            </div>
            <div className="text-[9px] font-sans font-bold text-zinc-400 uppercase tracking-widest pt-2">Usage License</div>
          </div>

          <div className={`border rounded-2xl p-5 space-y-4 hover:shadow-sm transition-all duration-300 flex flex-col justify-between ${
            isLight ? 'bg-white border-zinc-200/80 hover:border-zinc-300' : 'bg-zinc-900 border-cardBorder hover:border-zinc-800'
          }`}>
            <div className="space-y-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${
                isLight ? 'bg-zinc-50 text-zinc-800 border-zinc-200' : 'bg-zinc-950 text-headingText border-cardBorder'
              }`}>
                <Brain className="w-5 h-5" />
              </div>
              <h3 className={`text-sm font-bold uppercase font-sans tracking-wider ${isLight ? 'text-zinc-900' : 'text-[#F8FAFC]'}`}>
                30-Day Support
              </h3>
              <p className={`text-[11px] leading-relaxed ${isLight ? 'text-zinc-500' : 'text-[#94A3B8]/80'}`}>
                Every purchase includes 30 days of email and Discord setup support. Subscriptions to platforms like Make.com, Zapier, or OpenAI are not included.
              </p>
            </div>
            <div className="text-[9px] font-sans font-bold text-zinc-400 uppercase tracking-widest pt-2">Support Terms</div>
          </div>
        </div>
      </section>

      {/* 4. STICKY BUNDLE CHECKOUT BAR */}
      <AnimatePresence>
        {selectedBundles.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className={`fixed bottom-6 left-6 right-6 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl px-6 py-4 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.25)] border z-40 flex items-center justify-between gap-4 transition-all duration-300 ${
              isLight ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-zinc-900 border-primary/20 text-[#F8FAFC]'
            }`}
          >
            <div className="flex items-center space-x-3.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold font-sans ${
                isLight ? 'bg-white text-black' : 'bg-primary text-black'
              }`}>
                {selectedBundles.length}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm font-bold font-sans uppercase tracking-wider">
                  {selectedBundles.length} {selectedBundles.length === 1 ? 'Automation' : 'Automations'} Selected
                </span>
                <span className="text-[10px] text-zinc-400">Request custom bundle integration pricing via WhatsApp.</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedBundles([])}
                className="px-3 py-2 text-xs font-sans text-zinc-400 hover:text-white rounded-lg transition-all"
              >
                Clear
              </button>
              <GradientButton
                onClick={openBundleEnquiry}
                size="sm"
                iconRight={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Enquire Bundle
              </GradientButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. SLIDE-OVER DRAWER FOR WHATSAPP NEGOTIATIONS */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-over Container */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                className={`w-screen max-w-md flex flex-col shadow-2xl border-l transition-colors duration-300 ${
                  isLight 
                    ? 'bg-white text-zinc-900 border-zinc-200' 
                    : 'bg-zinc-900 text-[#F8FAFC] border-cardBorder'
                }`}
              >
                {/* Header */}
                <div className={`px-6 py-6 border-b flex items-center justify-between transition-colors ${
                  isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-950/60 border-cardBorder'
                }`}>
                  <div>
                    <span className={`text-[9px] font-sans font-bold tracking-widest uppercase px-2 py-0.5 rounded border ${
                      isLight ? 'text-zinc-500 bg-zinc-100 border-zinc-200' : 'text-primary bg-primary/10 border-primary/20'
                    }`}>
                      Autovate Helpdesk
                    </span>
                    <h2 className="text-lg font-bold font-sans uppercase tracking-tight mt-2">
                      {drawerProduct ? `Ask about Bot Blueprint` : `Bundle Automation Request`}
                    </h2>
                  </div>
                  <button 
                    onClick={closeDrawer}
                    className={`p-1.5 border rounded-lg transition-all ${
                      isLight 
                        ? 'text-zinc-450 hover:text-zinc-800 bg-white border-zinc-200 hover:bg-zinc-50' 
                        : 'text-zinc-400 hover:text-white bg-zinc-950 border-cardBorder hover:bg-zinc-900'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                  {/* Selected items briefing */}
                  {drawerProduct ? (
                    <div className={`p-4 border rounded-xl flex items-start gap-3.5 ${
                      isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-950/50 border-cardBorder'
                    }`}>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
                        isLight ? 'border-zinc-200 bg-white text-zinc-900' : 'border-cardBorder bg-zinc-900 text-headingText'
                      }`}>
                        {getProductHeaderStyles(drawerProduct).icon}
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-xs uppercase">{drawerProduct.name}</h4>
                        <span className="text-[10px] font-sans font-semibold text-zinc-400 uppercase">{drawerProduct.category.replace('-', ' ')}</span>
                      </div>
                    </div>
                  ) : (
                    <div className={`p-4 border rounded-xl space-y-2.5 text-left ${
                      isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-950/50 border-cardBorder'
                    }`}>
                      <h4 className="font-bold text-xs uppercase">Your Bundle Selections:</h4>
                      <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                        {productsData
                          .filter(p => selectedBundles.includes(p.id))
                          .map(p => (
                            <span 
                              key={p.id}
                              className={`px-2.5 py-1 border rounded-md text-[10px] font-sans font-semibold shadow-sm flex items-center gap-1.5 ${
                                isLight 
                                  ? 'bg-white border-zinc-200 text-zinc-700' 
                                  : 'bg-zinc-900 border-cardBorder text-[#F8FAFC]'
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                              {p.name}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Form fields */}
                  <form onSubmit={handleEnquirySubmit} className="space-y-4 text-left">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="John Doe"
                        className={`w-full px-4 py-2.5 text-xs rounded-lg focus:outline-none focus:ring-1 transition-all ${
                          isLight 
                            ? 'bg-white border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400 text-zinc-900 placeholder-zinc-400' 
                            : 'bg-zinc-950 border-cardBorder focus:border-primary focus:ring-primary text-headingText placeholder-zinc-600'
                        }`}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        WhatsApp Contact *
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400 font-bold font-mono">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={formPhone}
                          onChange={(e) => setFormPhone(formatIndianPhone(e.target.value))}
                          placeholder="98765 43210"
                          className={`w-full pl-12 pr-4 py-2.5 text-xs rounded-lg focus:outline-none focus:ring-1 transition-all ${
                            isLight 
                              ? 'bg-white border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400 text-zinc-900 placeholder-zinc-400' 
                              : 'bg-zinc-950 border-cardBorder focus:border-primary focus:ring-primary text-headingText placeholder-zinc-600'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        Business Domain / Niche
                      </label>
                      <select
                        value={formBusinessType}
                        onChange={(e) => setFormBusinessType(e.target.value)}
                        className={`w-full px-4 py-2.5 text-xs rounded-lg focus:outline-none transition-all cursor-pointer ${
                          isLight 
                            ? 'bg-white border-zinc-200 focus:border-zinc-400 text-zinc-700' 
                            : 'bg-zinc-950 border-cardBorder focus:border-primary text-[#94A3B8]'
                        }`}
                      >
                        <option value="">Select Domain</option>
                        <option value="E-Commerce">E-Commerce & Retail</option>
                        <option value="Real Estate">Real Estate & Construction</option>
                        <option value="SaaS / Software">SaaS & Technology Products</option>
                        <option value="Healthcare / Clinics">Healthcare, Doctors & Clinics</option>
                        <option value="Fitness / Gyms">Gyms, Instructors & Fitness Centers</option>
                        <option value="Agencies / Services">Marketing or Consultative Agency</option>
                        <option value="Other">Other Business Sector</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        Custom Requirements / Stack Details
                      </label>
                      <textarea
                        rows={4}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder="I use HubSpot and need this WhatsApp bot to alert my team in Slack when a lead is qualified..."
                        className={`w-full px-4 py-2.5 text-xs rounded-lg focus:outline-none focus:ring-1 transition-all resize-none ${
                          isLight 
                            ? 'bg-white border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400 text-zinc-900 placeholder-zinc-400' 
                            : 'bg-zinc-950 border-cardBorder focus:border-primary focus:ring-primary text-headingText placeholder-zinc-600'
                        }`}
                      />
                    </div>

                    {/* Submit buttons */}
                    <div className="pt-4 border-t border-zinc-200 space-y-3">
                      <button
                        type="submit"
                        disabled={!formName || !formPhone}
                        className="w-full py-3.5 bg-[#25D366] hover:bg-[#22c35e] disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed text-white font-bold font-sans uppercase tracking-widest text-xs rounded-xl transition-all text-center flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] active:scale-[0.99]"
                      >
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path fill="#FFF" d="M12.003 21c-1.74 0-3.41-.49-4.86-1.4l-.35-.22-3.61.95.96-3.52-.24-.38A9.87 9.87 0 0 1 2.15 11.19c.005-5.46 4.45-9.9 9.91-9.9 2.65 0 5.14 1.03 7.01 2.9a9.83 9.83 0 0 1 2.91 7.02c-.005 5.46-4.45 9.9-9.91 9.9h-.07z" style={{ fill: '#25D366' }} />
                          <path fill="#FFF" d="M12.003 0C5.38 0 .01 5.37.006 11.99c0 2.11.55 4.18 1.6 6L0 24l6.15-1.61c1.78.97 3.79 1.48 5.84 1.48h.01c6.62 0 12-5.37 12-11.99c0-3.21-1.25-6.22-3.51-8.48A11.9 11.9 0 0 0 12.003 0zm5.52 17.02c-.23.64-1.34 1.22-1.85 1.3-.5.08-1.52.12-3.11-.53a10.2 10.2 0 0 1-4.71-4.14c-.81-1.08-1.45-2.45-1.45-3.87 0-1.46.77-2.18 1.05-2.47.27-.3.6-.37.79-.37.2 0 .39 0 .56.01.18 0 .42-.07.65.48.24.58.82 2 .89 2.15.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.16-.32.37-.46.5-.15.15-.3.31-.13.6.17.3 1.09 3.01 2.5 4.27 1.4 1.25 2.58 1.64 2.95 1.82.37.18.59.15.8-.08.23-.26.96-1.12 1.22-1.51.27-.39.53-.33.9-.19.36.14 2.3.1 2.7.29.39.2.65.3.72.43.08.13.08.76-.15 1.4z" />
                        </svg>
                        Send WhatsApp Message
                      </button>
                      <p className="text-[9px] text-center text-zinc-500 leading-normal">
                        This submits a pre-formatted template via WhatsApp to our active automation architects for a rapid response.
                      </p>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
