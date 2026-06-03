import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import categoriesData from '../data/categories.json';
import productsData from '../data/products.json';
import testimonialsData from '../data/testimonials.json';
import { SEOPage } from '../utils/seoHelper';
import BotCard from '../components/ui/BotCard';
import QuickViewModal from '../components/ui/QuickViewModal';
import { ArrowLeft, AlertCircle, TrendingUp } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useCheckout } from '../context/CheckoutContext';

export default function CategoryPage() {
  const { slug } = useParams();
  const { triggerCheckout } = useCheckout();
  
  const [selectedBot, setSelectedBot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Find category details
  const category = categoriesData.find(c => c.id === slug) || null;

  // Filter products
  const categoryBots = category ? productsData.filter(p => p.category === category.id) : [];

  // Find an industry-related testimonial
  // Testimonial industry name mapping helper
  const testimonial = React.useMemo(() => {
    if (!category) return null;
    const mapping = {
      'core-bots': 'Core Bots',
      'saas': 'SaaS',
      'fitness': 'Fitness & Local Business',
      'marketing': 'Marketing',
      'finance': 'Finance',
      'e-commerce': 'E-Commerce'
    };
    
    const mappedIndustry = mapping[category.id] || '';
    return testimonialsData.find(t => t.industry === mappedIndustry) || testimonialsData[0];
  }, [category]);

  const handleQuickView = (bot) => {
    setSelectedBot(bot);
    setIsModalOpen(true);
  };

  const handleBuy = (bot) => {
    triggerCheckout(bot);
  };

  if (!category) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 pt-24 bg-background">
        <AlertCircle className="w-16 h-16 text-yellow-500" />
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold font-display text-white">Category Not Found</h2>
          <p className="text-zinc-500 text-sm max-w-sm">
            We couldn't locate this specific industry automation category.
          </p>
        </div>
        <Link
          to="/marketplace"
          className="px-6 py-3 bg-primary text-black font-semibold text-xs font-display uppercase tracking-wider rounded-full"
        >
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const IconComponent = Icons[category.icon] || Icons.Cpu;

  return (
    <div className="min-h-screen pt-24 bg-background pb-20 relative overflow-hidden">
      <SEOPage
        title={`${category.name} Automations`}
        description={`Scale your ${category.name} operations. ${category.description} Deploy battle-tested bots instantly.`}
      />

      {/* Large Decorative Watermark in background */}
      <div className="absolute top-20 right-0 text-[10vw] font-extrabold text-zinc-950 font-display select-none pointer-events-none opacity-20 uppercase tracking-widest leading-none">
        {category.name}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 relative z-10">
        
        {/* Back Link */}
        <Link to="/marketplace" className="inline-flex items-center text-xs font-mono text-zinc-500 hover:text-primary transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Marketplace
        </Link>

        {/* Category Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-zinc-900 pb-12">
          
          <div className="lg:col-span-8 space-y-4 text-left">
            <div className="flex items-center space-x-3 text-primary">
              <div className="p-2.5 bg-primary/10 border border-primary/20 rounded-xl">
                <IconComponent className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest font-bold">
                Industry Specific Suite
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display leading-none">
              {category.name} AI Automations
            </h1>
            <p className="text-zinc-400 text-base md:text-lg max-w-2xl leading-relaxed">
              {category.description} Optimize operational workflow speed and slash human labor overheads.
            </p>
          </div>

          <div className="lg:col-span-4 bg-zinc-950/60 border border-zinc-900 rounded-2xl p-6 text-left space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Benchmark Performance</span>
            <div className="text-lg font-bold text-white font-display flex items-center">
              <TrendingUp className="w-4 h-4 text-tertiary mr-2 shrink-0" />
              {category.highlightStat}
            </div>
          </div>

        </div>

        {/* Industry Pain Point Highlight Box */}
        <section className="bg-red-950/5 border border-red-500/10 rounded-3xl p-6 md:p-8 text-left space-y-3">
          <div className="flex items-center text-red-500 font-bold text-xs uppercase tracking-wider font-mono">
            <AlertCircle className="w-4 h-4 mr-2" /> Critical Operational Leak
          </div>
          <h3 className="text-lg font-bold text-white font-display">
            The Industry Bottle-Neck:
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-3xl">
            {category.painPoint} By deploying specific pre-configured bot sequences, you eliminate manual checks, reduce transaction friction, and reclaim lost billable time.
          </p>
        </section>

        {/* List of Bots in this Category */}
        <section className="space-y-8">
          <div className="text-left space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">Available Automation Blueprints</h3>
            <p className="text-xs sm:text-sm text-zinc-500">
              Browse ready-to-deploy blueprints for the {category.name} stack. Click 'Buy Now' to download setup packages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryBots.map((bot) => (
              <BotCard
                key={bot.id}
                bot={bot}
                onQuickView={handleQuickView}
                onBuy={handleBuy}
              />
            ))}
          </div>
        </section>

        {/* Featured Testimonial for Category */}
        {testimonial && (
          <section className="bg-card border border-primary/10 rounded-3xl p-8 relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
            
            <div className="space-y-4 max-w-3xl relative z-10">
              <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                Industry Testimonial
              </span>
              <blockquote className="text-lg text-zinc-200 italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="flex items-center space-x-3 pt-4 border-t border-zinc-800/80">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.user}
                  className="w-10 h-10 rounded-full border border-zinc-800 object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-white font-display">{testimonial.user}</h4>
                  <p className="text-[10px] text-zinc-500">{testimonial.role}</p>
                </div>
                <div className="ml-auto bg-tertiary/10 border border-tertiary/20 text-tertiary font-mono text-[10px] px-3 py-1 rounded-md uppercase font-semibold">
                  {testimonial.metric}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA block */}
        <section className="bg-gradient-to-r from-zinc-900 to-neutralDark border border-zinc-800 rounded-3xl p-10 text-center space-y-6">
          <div className="space-y-2 max-w-xl mx-auto">
            <span className="text-[10px] font-mono text-secondary uppercase font-bold tracking-wider">Start optimizing today</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">Need a Specialized Custom Bot?</h3>
            <p className="text-zinc-400 text-xs sm:text-sm">
              If our {category.name} pre-built blueprints don't cover your specific edge case, our automation engineers can build a tailored solution in hours.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/contact"
              className="px-6 py-3 bg-primary text-black font-semibold text-xs font-display uppercase tracking-wider rounded-full shadow-glow"
            >
              Book {category.name} Strategy Call
            </Link>
            <Link
              to="/marketplace"
              className="px-6 py-3 bg-zinc-800 border border-zinc-700 hover:border-zinc-600 text-white font-semibold text-xs font-display uppercase tracking-wider rounded-full"
            >
              Browse All 70+ Bots
            </Link>
          </div>
        </section>

      </div>

      {/* Quick View Overlay Modal */}
      <QuickViewModal
        bot={selectedBot}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBuy={handleBuy}
      />

    </div>
  );
}
