import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Terminal, ArrowRight, Star } from 'lucide-react';
import StarRating from './StarRating';
import BadgeChip from './BadgeChip';

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

  const cleanCategoryName = categoryNames[bot.category] || bot.category;

  const handleBuyClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBuy) onBuy(bot);
  };

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
          <button
            onClick={handleBuyClick}
            className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center btn-shimmer"
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}
