import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../data/products.json';
import { SEOPage } from '../utils/seoHelper';
import StarRating from '../components/ui/StarRating';
import BadgeChip from '../components/ui/BadgeChip';
import BotCard from '../components/ui/BotCard';
import QuickViewModal from '../components/ui/QuickViewModal';
import { ArrowLeft, Check, AlertTriangle, ShieldCheck, FileCheck } from 'lucide-react';
import { useCheckout } from '../context/CheckoutContext';

export default function ProductDetail() {
  const { slug } = useParams();
  const { triggerCheckout } = useCheckout();
  const [faqOpen, setFaqOpen] = useState({});
  const [selectedBot, setSelectedBot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Find bot by slug
  const bot = productsData.find(b => b.slug === slug) || null;

  // Find 3 related bots from the same category (excluding current)
  const related = React.useMemo(() => {
    if (!bot) return [];
    const matches = productsData
      .filter(b => b.category === bot.category && b.id !== bot.id)
      .slice(0, 3);
    
    // If we don't have enough matching category, fill with popular bots
    if (matches.length < 3) {
      const fallbacks = productsData
        .filter(b => b.id !== bot.id && !matches.some(m => m.id === b.id))
        .sort((a, b) => b.reviewsCount - a.reviewsCount)
        .slice(0, 3 - matches.length);
      return [...matches, ...fallbacks];
    }
    return matches;
  }, [bot]);

  const toggleFaq = (idx) => {
    setFaqOpen(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleBuy = () => {
    if (bot) triggerCheckout(bot);
  };

  const handleRelatedQuickView = (relatedBot) => {
    setSelectedBot(relatedBot);
    setIsModalOpen(true);
  };

  const handleRelatedBuy = (relatedBot) => {
    triggerCheckout(relatedBot);
  };

  if (!bot) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 pt-24 bg-card text-bodyText">
        <AlertTriangle className="w-16 h-16 text-yellow-500" />
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold font-display text-headingText">Bot Blueprint Not Found</h2>
          <p className="text-bodyText text-sm max-w-sm">
            We couldn't locate this specific automation template. It may have been renamed or archived.
          </p>
        </div>
        <Link
          to="/marketplace"
          className="px-6 py-3 bg-primary text-white hover:bg-primary/90 font-semibold text-xs font-display uppercase tracking-wider rounded-full transition-colors"
        >
          Return to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-card pb-20 text-bodyText font-sans antialiased">
      <SEOPage
        title={`${bot.name} Blueprint`}
        description={`Deploy the ${bot.name} in under 15 minutes. ${bot.description} ${bot.outcomes[0]}`}
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-10 space-y-16">
        
        {/* Breadcrumb Back Link */}
        <Link to="/marketplace" className="inline-flex items-center text-xs font-mono text-bodyText hover:text-primary transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Marketplace catalog
        </Link>

        {/* Hero Section of Bot Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Core specifications */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <BadgeChip text={bot.category.replace('-', ' ')} type="primary" />
              <BadgeChip text="Instant Download" type="success" />
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-headingText font-display leading-none uppercase">
              {bot.name} Blueprint
            </h1>
            
            <p className="text-bodyText text-base md:text-lg leading-relaxed">
              {bot.description}. Pre-built configuration file designed for rapid deployment.
            </p>

            <div className="flex flex-wrap items-center gap-4 py-2 border-y border-cardBorder">
              <div className="flex items-center space-x-2">
                <StarRating rating={bot.rating} size="lg" />
                <span className="font-mono font-bold text-headingText text-lg">{bot.rating}</span>
                <span className="text-bodyText/70 text-xs">({bot.reviewsCount} verified reviews)</span>
              </div>
              
              <div className="hidden sm:block h-6 w-px bg-[#E2E8F0]"></div>

              <div className="text-xs font-mono text-bodyText/70">
                <span className="text-headingText font-bold">100% Secure Checkout</span> | Lifetime updates included
              </div>
            </div>

            {/* What it does */}
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-bold font-display text-headingText uppercase">What This Bot Executes</h3>
              <ul className="space-y-3">
                {bot.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start text-sm text-bodyText leading-relaxed">
                    <Check className="w-4 h-4 text-tertiary mr-3 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who it's for */}
            <div className="space-y-2 pt-2">
              <h3 className="text-lg font-bold font-display text-headingText uppercase">Ideal Target Operator</h3>
              <p className="text-sm text-bodyText leading-relaxed">{bot.targetUser}</p>
            </div>
          </div>

          {/* Right Block: Conversion Box (Checkout CTA & What's Included) */}
          <div className="lg:col-span-5 bg-background border border-cardBorder rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/3 rounded-full blur-2xl"></div>

            <div className="space-y-1 text-center md:text-left">
              <span className="text-[10px] font-mono uppercase tracking-wider text-bodyText/70">One-Time Download Fee</span>
              <div className="text-5xl font-extrabold font-mono text-primary">${bot.price}</div>
              <p className="text-xs text-bodyText/70 font-mono mt-1">No monthly software overheads</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleBuy}
                className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold font-display uppercase tracking-widest rounded-full shadow-sm hover:opacity-95 transition-all duration-300 transform active:scale-98 text-xs flex items-center justify-center space-x-2 btn-shimmer"
                id="bot-buy-now-cta"
              >
                <span>Buy Now — Deploy Today</span>
              </button>
              
              <Link
                to="/consultation"
                className="w-full py-4 bg-card border border-cardBorder hover:border-primary text-headingText hover:text-primary font-bold font-display uppercase tracking-widest rounded-full transition-all text-xs flex items-center justify-center shadow-sm"
              >
                Request Custom setup (+$99)
              </Link>
            </div>

            {/* What is Included block */}
            <div className="space-y-3 pt-4 border-t border-cardBorder text-left">
              <h4 className="text-xs uppercase font-mono text-bodyText/70 font-bold tracking-wider">Deployment Package Contents</h4>
              <ul className="space-y-2 text-xs text-bodyText">
                {bot.includes.map((inc, idx) => (
                  <li key={idx} className="flex items-center space-x-2.5">
                    <FileCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech badges */}
            <div className="space-y-2 text-left pt-2">
              <h4 className="text-xs uppercase font-mono text-bodyText/70 tracking-wider">Integration Ecosystem</h4>
              <div className="flex flex-wrap gap-1">
                {bot.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 bg-background border border-cardBorder rounded font-mono text-[10px] text-bodyText/80 uppercase">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-bodyText/70 font-mono flex items-center justify-center pt-2 space-x-4 border-t border-cardBorder/40">
              <span className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 text-tertiary mr-1 shrink-0" /> Lifetime Updates</span>
              <span className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 text-tertiary mr-1 shrink-0" /> 30-Day Guarantee</span>
            </div>

          </div>
        </div>

        {/* Before vs After comparison Table */}
        <section className="space-y-6 pt-8 text-left">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-headingText uppercase">Before vs After Automation</h3>
            <p className="text-xs sm:text-sm text-bodyText/80">
              See the immediate operational transformations that occur after deploying this template.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Before block */}
            <div className="bg-red-50 border border-red-200/60 rounded-2xl p-6 space-y-3">
              <div className="flex items-center space-x-2 text-red-600">
                <span className="p-1 rounded-lg bg-red-100 font-bold font-mono text-xs">BEFORE</span>
                <span className="font-semibold text-sm">Manual Bottlenecks</span>
              </div>
              <p className="text-bodyText text-xs sm:text-sm leading-relaxed">{bot.beforeAfter.before}</p>
            </div>

            {/* After block */}
            <div className="bg-emerald-50 border border-emerald-200/60 rounded-2xl p-6 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-600">
                <span className="p-1 rounded-lg bg-emerald-100 font-bold font-mono text-xs">AFTER</span>
                <span className="font-semibold text-sm">Autovate Deployments</span>
              </div>
              <p className="text-bodyText text-xs sm:text-sm leading-relaxed">{bot.beforeAfter.after}</p>
            </div>

          </div>
        </section>

        {/* 3 Specific testimonials for this bot */}
        <section className="space-y-6 pt-8 text-left">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-headingText uppercase">Verified Operator Reviews</h3>
            <p className="text-xs sm:text-sm text-bodyText/80">Hear from business owners who deployed this specific blueprint in their operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bot.testimonials.map((test, idx) => (
              <div key={idx} className="bg-card border border-cardBorder rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-sm">
                <div className="space-y-3">
                  <div className="flex text-yellow-400">
                    <StarRating rating={5} />
                  </div>
                  <p className="text-bodyText text-xs sm:text-sm italic leading-relaxed">
                    "{test.quote}"
                  </p>
                </div>
                <div className="text-bodyText/70 font-mono text-[10px] pt-4 border-t border-cardBorder">
                  — {test.user}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ list for this bot */}
        <section className="space-y-6 pt-8 text-left max-w-4xl">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-headingText uppercase">Product FAQ</h3>
            <p className="text-xs sm:text-sm text-bodyText/80">Specific answers about deploying the {bot.name}.</p>
          </div>

          <div className="space-y-3">
            {bot.faqs.map((faq, idx) => {
              const isOpen = !!faqOpen[idx];
              return (
                <div key={idx} className="bg-card border border-cardBorder rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4.5 text-left text-xs sm:text-sm text-headingText font-semibold font-display uppercase"
                  >
                    <span>{faq.q}</span>
                    <span className="text-bodyText">{isOpen ? '-' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="p-4.5 pt-0 text-bodyText text-xs sm:text-sm leading-relaxed border-t border-cardBorder">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Related Bots Grid */}
        <section className="space-y-6 pt-8">
          <div className="text-left space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-headingText uppercase">Recommended Stack Additions</h3>
            <p className="text-xs sm:text-sm text-bodyText/80">Deploy these complementary templates to further streamline your operations.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((rBot) => (
              <BotCard
                key={rBot.id}
                bot={rBot}
                onQuickView={handleRelatedQuickView}
                onBuy={handleRelatedBuy}
              />
            ))}
          </div>
        </section>

      </div>

      {/* Related Quick View Modal */}
      <QuickViewModal
        bot={selectedBot}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBuy={handleRelatedBuy}
      />

    </div>
  );
}
