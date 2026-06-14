import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Check, MessageSquare, RotateCcw, Sparkles } from 'lucide-react';
import StarRating from './StarRating';
import BadgeChip from './BadgeChip';
import BuyNowButton from './BuyNowButton';

export default function BotCard({ bot, onQuickView, onBuy }) {
  // Map category IDs to clean names
  const categoryNames = {
    'core-bots': 'Core Bot',
    'saas': 'SaaS',
    'fitness': 'Fitness',
    'marketing': 'Marketing',
    'travel': 'Travel',
    'education': 'Education',
    'finance': 'Finance',
    'legal': 'Legal',
    'e-commerce': 'E-Commerce',
    'real-estate': 'Real Estate',
    'healthcare': 'Healthcare',
    'wealth-trading': 'Wealth & Trading',
    'web3': 'Web3',
    'ai-swarm': 'AI Swarm',
    'ml-engine': 'ML Engine'
  };

  const [isConnected, setIsConnected] = useState(false);
  const cleanCategoryName = categoryNames[bot.category] || bot.category;

  const handleBuyClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsConnected(true);
    if (onBuy) onBuy(bot);
  };

  if (isConnected) {
    const waText = encodeURIComponent(`Hi Autovate! I'd like to connect with your team to setup the "${bot.name}" blueprint.`);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-card border border-emerald-500/35 shadow-[0_8px_30px_rgba(16,185,129,0.1)] transition-all duration-200 h-full p-5 text-center min-h-[300px]"
      >
        {/* Popular Badge Ribbon */}
        {bot.reviewsCount > 150 && (
          <div className="absolute top-0 right-0 overflow-hidden w-28 h-28 pointer-events-none">
            <div className="absolute top-4 -right-8 w-28 py-1 bg-quaternary text-white font-mono text-[9px] font-bold text-center rotate-45 uppercase tracking-wider shadow-sm">
              Hot Sell
            </div>
          </div>
        )}

        <div className="flex-grow flex flex-col items-center justify-center space-y-4 py-4">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <Check className="w-7 h-7 stroke-[3]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold font-display text-headingText uppercase tracking-tight">Request Received!</h3>
            <p className="text-[11px] text-bodyText leading-relaxed max-w-[200px] mx-auto">
              Connecting you with our engineers for the <span className="text-primary font-semibold">{bot.name}</span> setup.
            </p>
          </div>
        </div>
        
        <div className="space-y-2 pt-4 border-t border-cardBorder">
          <a
            href={`https://wa.me/919096861443?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-display font-bold uppercase tracking-wider rounded-xl shadow-sm text-[10px] flex items-center justify-center gap-1.5 transition-all active:scale-98"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsConnected(false); }}
            className="w-full py-2 border border-cardBorder hover:border-white/20 text-bodyText/80 hover:text-white rounded-xl text-[9px] font-medium tracking-wide flex items-center justify-center gap-1 transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Back to details</span>
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-card border border-cardBorder hover:border-primary/30 hover:shadow-[0_8px_30px_rgba(0,245,255,0.05)] transition-all duration-200 h-full p-5"
    >
      {/* Popular Badge Ribbon */}
      {bot.reviewsCount > 150 && (
        <div className="absolute top-0 right-0 overflow-hidden w-28 h-28 pointer-events-none">
          <div className="absolute top-4 -right-8 w-28 py-1 bg-quaternary text-white font-mono text-[9px] font-bold text-center rotate-45 uppercase tracking-wider shadow-sm">
            Hot Sell
          </div>
        </div>
      )}

      {/* Card Header & Badges */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <BadgeChip text={cleanCategoryName} type="primary" />
          <div className="flex items-center space-x-1">
            <span className="text-bodyText/70 font-mono text-xs">{bot.reviewsCount} sold</span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/bot/${bot.slug}`} className="block">
          <h3 className="text-lg font-bold font-display text-headingText group-hover:text-primary transition-colors pr-4 uppercase">
            {bot.name}
          </h3>
        </Link>

        {/* Blueprint Indicator */}
        <div className="flex items-center space-x-1.5 text-[10px] font-mono font-bold uppercase text-emerald-500 text-left">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Pre-Built Blueprint Included</span>
        </div>

        {/* Short Description */}
        <p className="text-bodyText text-xs line-clamp-2 leading-relaxed">
          {bot.description}
        </p>

        {/* Star Rating Info */}
        <div className="flex items-center space-x-2 pt-1">
          <StarRating rating={bot.rating} />
          <span className="text-xs font-bold font-mono text-headingText">{bot.rating}</span>
          <span className="text-[10px] text-bodyText/70">({bot.reviewsCount})</span>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1 pt-2">
          {bot.techStack.map((tech) => (
            <span key={tech} className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono bg-background border border-cardBorder text-bodyText uppercase">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer & Purchase Actions */}
      <div className="pt-5 mt-5 border-t border-cardBorder flex items-center justify-between">
        {/* Price Tag */}
        <div className="flex flex-col text-left">
          <span className="text-[9px] uppercase tracking-wider font-mono text-bodyText/70 font-bold">Price</span>
          <span className="text-xl font-bold font-mono text-primary">${bot.price}</span>
        </div>

        {/* Actions Button Row */}
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onQuickView(bot); }}
            className="p-2 bg-background border border-cardBorder hover:border-primary/40 text-bodyText hover:text-primary rounded-xl transition-all"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
          <BuyNowButton
            onClick={handleBuyClick}
            className="px-4 h-[36px] rounded-xl text-[10px]"
          >
            Connect with us
          </BuyNowButton>
        </div>
      </div>
    </motion.div>
  );
}
