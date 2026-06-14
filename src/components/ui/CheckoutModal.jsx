import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Mail } from 'lucide-react';
import BuyNowButton from './BuyNowButton';

export default function CheckoutModal({ bot, isOpen, onClose, onConfirm }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!bot || !isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Simulate connection request submission
    setTimeout(() => {
      setIsSubmitting(false);
      const mockRefId = 'req_' + Math.random().toString(36).substring(2, 9).toUpperCase();
      onConfirm(bot, email, mockRefId);
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
        {/* Backdrop click to close */}
        <div className="absolute inset-0" onClick={onClose}></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-md bg-card border border-primary/20 rounded-2xl shadow-glow overflow-hidden z-10 p-6 md:p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-bodyText hover:text-headingText bg-card border border-cardBorder hover:bg-zinc-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-6">
            
            {/* Header info */}
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono text-primary uppercase tracking-widest block font-bold">Request Setup & Access</span>
              <h3 className="text-xl font-bold font-display text-headingText uppercase">Connect with us</h3>
              <p className="text-bodyText text-xs leading-relaxed">
                You are requesting access for the <span className="text-headingText font-bold">{bot.name}</span> setup (Value: <span className="text-primary font-mono font-bold">${bot.price}</span>).
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-bodyText flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-1.5 text-primary" /> Delivery Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 bg-card border border-cardBorder rounded-xl focus:outline-none focus:border-primary text-sm text-headingText placeholder-zinc-650 transition-colors"
                />
                <span className="text-[9px] text-bodyText/70 block leading-relaxed">
                  We will send your blueprint files and video guide link here.
                </span>
              </div>

              {error && <p className="text-red-500 text-xs pl-1 font-mono">{error}</p>}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-1/3 py-3.5 bg-card hover:bg-zinc-850 border border-cardBorder text-bodyText hover:text-headingText rounded-full text-xs font-bold font-display uppercase tracking-wider transition-colors active:scale-98"
                >
                  Cancel
                </button>
                <BuyNowButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-2/3 rounded-full h-[46px]"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
                </BuyNowButton>
              </div>
            </form>

            <div className="pt-4 border-t border-cardBorder text-center flex items-center justify-center space-x-2 text-[10px] text-bodyText/70">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Instant Response | 30-Day Setup Guarantee</span>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
