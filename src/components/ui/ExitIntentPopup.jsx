import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Sparkles, Check } from 'lucide-react';

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user already dismissed or joined
    const dismissed = localStorage.getItem('autovate_popup_dismissed');
    if (dismissed) return;

    // Desktop Exit Intent (mouse leave top of screen)
    const handleMouseLeave = (e) => {
      if (e.clientY < 50) {
        setIsOpen(true);
      }
    };
    
    document.addEventListener('mouseleave', handleMouseLeave);

    // Mobile Timer Intent (60 seconds)
    const mobileTimer = setTimeout(() => {
      setIsOpen(true);
    }, 60000);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem('autovate_popup_dismissed', 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    
    // Simulate API registration (ConvertKit/Mailchimp integration hook)
    // TODO: Connect with your ConvertKit or Mailchimp API
    console.log('[Integration] Email Captured:', email);
    
    setIsSubmitted(true);
    setError('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          {/* Overlay click to close */}
          <div className="absolute inset-0" onClick={handleDismiss}></div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-[#111] border border-primary/20 shadow-glow p-8 z-10 text-center"
          >
            {/* Background elements */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-secondary/10 rounded-full blur-2xl pointer-events-none"></div>

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-1 rounded-full text-zinc-500 hover:text-white bg-zinc-800/40 hover:bg-zinc-800 transition-colors"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div className="space-y-6">
                <div className="inline-flex p-3 rounded-full bg-primary/10 text-primary border border-primary/20">
                  <Sparkles className="w-8 h-8" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold tracking-tight text-white font-display">
                    Wait — Don't Leave Empty-Handed!
                  </h3>
                  <p className="text-zinc-400 text-sm max-w-md mx-auto">
                    Get an instant <span className="text-primary font-bold">10% OFF</span> coupon for your first AI bot deployment checklist.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your work email"
                      className="w-full pl-12 pr-4 py-3.5 bg-zinc-900 border border-zinc-700/60 rounded-full focus:outline-none focus:border-primary/60 text-white placeholder-zinc-500 text-sm transition-colors"
                      required
                    />
                  </div>
                  {error && <p className="text-red-500 text-xs text-left pl-4">{error}</p>}
                  
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-secondary text-black font-medium rounded-full shadow-glowSecondary hover:bg-secondary/90 transition-all duration-300 transform active:scale-98 text-sm uppercase tracking-wider font-display"
                  >
                    Reveal My 10% Discount Code
                  </button>
                </form>

                <p className="text-[11px] text-zinc-500">
                  No spam. Unsubscribe anytime. Instantly unlocks code code AUTOVATE10.
                </p>
              </div>
            ) : (
              <div className="space-y-6 py-4">
                <div className="inline-flex p-3 rounded-full bg-tertiary/10 text-tertiary border border-tertiary/20">
                  <Check className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-white font-display">Welcome to Autovate!</h3>
                  <p className="text-zinc-400 text-sm">
                    Use this discount code at checkout for <span className="text-tertiary font-bold">10% OFF</span> your order:
                  </p>
                </div>

                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl max-w-xs mx-auto">
                  <span className="text-2xl font-mono font-bold tracking-widest text-primary">
                    AUTOVATE10
                  </span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleDismiss}
                    className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full transition-colors text-sm font-medium"
                  >
                    Start Browsing Bots
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
