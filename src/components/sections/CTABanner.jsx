import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HelpCircle, Sparkles } from 'lucide-react';

export default function CTABanner() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      
      {/* Visual background lines and blobs */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid-size opacity-40 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="bg-gradient-to-r from-zinc-900 via-neutralDark to-zinc-900 border border-primary/20 rounded-3xl p-10 md:p-14 shadow-glow space-y-8 relative overflow-hidden">
          
          {/* Subtle light orb in box */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-widest text-secondary font-bold flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-secondary animate-pulse" /> Stop losing time
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-headingText font-display leading-none">
              Find Your Bot in 30 Seconds
            </h2>
            <p className="text-zinc-405 text-bodyText text-sm md:text-base leading-relaxed">
              Why hire an agency or spend $10,000 on custom developers? Join 10,000+ businesses running our ready-to-deploy automation stack 24/7.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/marketplace"
              className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 bg-primary text-black font-semibold rounded-full shadow-glow hover:bg-primary/95 transition-all duration-300 transform active:scale-98 text-sm uppercase tracking-wider font-display group"
            >
              Start Automating Today <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/contact"
              className="inline-flex w-full sm:w-auto items-center justify-center px-8 py-4 bg-card border border-cardBorder hover:border-zinc-700 text-zinc-300 hover:text-headingText font-semibold rounded-full transition-all duration-300 transform active:scale-98 text-sm uppercase tracking-wider font-display"
            >
              Talk to a Solutions Architect
            </Link>
          </div>

          <div className="pt-2 text-bodyText/70 text-xs font-mono flex items-center justify-center space-x-6">
            <span>✓ Flat One-Time Fee</span>
            <span>✓ Setup Video Guides</span>
            <span>✓ 30-Day Money-Back Guarantee</span>
          </div>

        </div>
      </div>
    </section>
  );
}
