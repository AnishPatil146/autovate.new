import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, ShieldCheck, Terminal, Cpu, CalendarCheck } from 'lucide-react';
import StarRating from './StarRating';
import BadgeChip from './BadgeChip';
import { Link } from 'react-router-dom';

export default function QuickViewModal({ bot, isOpen, onClose, onBuy }) {
  if (!bot) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          {/* Backdrop Overlay Click to Close */}
          <div className="absolute inset-0" onClick={onClose}></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-card border border-cardBorder rounded-2xl shadow-xl overflow-hidden z-10 p-6 md:p-8"
          >
            {/* Background elements */}
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/3 rounded-full blur-2xl pointer-events-none"></div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-bodyText hover:text-headingText bg-background border border-cardBorder hover:bg-zinc-800 hover:border-zinc-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-6">
              {/* Header Info */}
              <div className="space-y-2 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <BadgeChip text={bot.category.replace('-', ' ')} type="primary" />
                  {bot.rating >= 4.9 && <BadgeChip text="Top Rated" type="success" />}
                </div>
                <h3 className="text-2xl font-bold font-display text-headingText pr-6 uppercase">{bot.name}</h3>
                
                <div className="flex items-center space-x-2.5">
                  <StarRating rating={bot.rating} />
                  <span className="font-mono text-sm font-bold text-headingText">{bot.rating}</span>
                  <span className="text-bodyText/70 text-xs">({bot.reviewsCount} verified reviews)</span>
                </div>
              </div>

              {/* Main Desc & outcomes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-left">
                
                {/* Left side: Outcomes & Target User */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-xs uppercase tracking-wider font-mono text-bodyText/70 flex items-center font-bold">
                      <Cpu className="w-3.5 h-3.5 mr-1.5 text-primary" /> Key Outcomes
                    </h4>
                    <ul className="space-y-2">
                      {bot.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start text-xs text-bodyText">
                          <Check className="w-3.5 h-3.5 text-tertiary mr-2 shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs uppercase tracking-wider font-mono text-bodyText/70 font-bold">Target Audience</h4>
                    <p className="text-xs text-bodyText leading-relaxed">{bot.targetUser}</p>
                  </div>
                </div>

                {/* Right side: Tech Stack & What's Included */}
                <div className="space-y-4 bg-background p-4 rounded-xl border border-cardBorder">
                  <div className="space-y-1.5 text-left">
                    <h4 className="text-xs uppercase tracking-wider font-mono text-bodyText/70 font-bold">Tech Stack</h4>
                    <div className="flex flex-wrap gap-1">
                      {bot.techStack.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 bg-background border border-cardBorder rounded font-mono text-[10px] text-bodyText uppercase">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 text-left">
                    <h4 className="text-xs uppercase tracking-wider font-mono text-bodyText/70 font-bold">What's Included</h4>
                    <ul className="space-y-1 text-xs text-bodyText">
                      {bot.includes.map((inc, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-2"></span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center text-[10px] text-bodyText/70 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-tertiary mr-1.5" />
                    <span>Instant delivery | 30-Day Guarantee</span>
                  </div>
                </div>

              </div>

              {/* Footer Actions */}
              <div className="border-t border-cardBorder pt-5 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col items-center sm:items-start">
                  <span className="text-[10px] uppercase font-mono text-bodyText/70 font-bold">Single Purchase</span>
                  <div className="text-3xl font-bold font-mono text-primary">${bot.price}</div>
                </div>

                <div className="flex flex-wrap gap-3 w-full sm:w-auto justify-center">
                  <Link
                    to={`/bot/${bot.slug}`}
                    onClick={onClose}
                    className="px-5 py-3 border border-cardBorder hover:border-primary hover:bg-background text-headingText hover:text-primary text-xs font-bold font-display uppercase tracking-wider rounded-xl transition-all flex items-center justify-center"
                  >
                    See How It Works <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                  
                  <button
                    onClick={() => {
                      onBuy(bot);
                      onClose();
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center shrink-0 btn-shimmer"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
