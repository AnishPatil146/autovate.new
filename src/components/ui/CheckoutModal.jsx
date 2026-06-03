import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, QrCode, Mail, FileCheck, CreditCard } from 'lucide-react';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutModal({ bot, isOpen, onClose, onConfirm }) {
  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // 'razorpay' | 'qr'
  const [email, setEmail] = useState('');
  const [utr, setUtr] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!bot || !isOpen) return null;

  const handleRazorpayPayment = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address first.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      setError('Failed to load Razorpay SDK. Please check your internet connection.');
      setIsSubmitting(false);
      return;
    }

    const keyId = import.meta.env?.VITE_RAZORPAY_KEY_ID || 'rzp_test_e895bBeb93e94d';
    // Amount in INR: convert USD to INR (e.g. 1 USD = 80 INR) and Razorpay expects paise (so * 100)
    const amountInINR = Math.round(bot.price * 80 * 100);

    const options = {
      key: keyId,
      amount: amountInINR,
      currency: 'INR',
      name: 'Autovate',
      description: `Purchase ${bot.name} Blueprint`,
      image: '/logo.png',
      handler: function (response) {
        setIsSubmitting(false);
        onConfirm(bot, email, response.razorpay_payment_id || 'rzp_mock_payment_id');
      },
      prefill: {
        name: 'Autovate Customer',
        email: email,
      },
      notes: {
        bot_id: bot.id,
        bot_name: bot.name,
      },
      theme: {
        color: '#00F5FF', // Electric Cyan
      },
      modal: {
        ondismiss: function () {
          setIsSubmitting(false);
        }
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError('Failed to open Razorpay checkout modal.');
      setIsSubmitting(false);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!utr || utr.trim().length < 6) {
      setError('Please enter a valid 6-12 digit Transaction UTR / Ref Number.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Simulate verification delay
    setTimeout(() => {
      setIsSubmitting(false);
      onConfirm(bot, email, utr);
    }, 1500);
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
          className="relative w-full max-w-lg bg-card border border-primary/20 rounded-2xl shadow-glow overflow-hidden z-10 p-6 md:p-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-6">
            
            {/* Header info */}
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono text-primary uppercase tracking-widest block">Secure UPI Checkout</span>
              <h3 className="text-xl font-bold font-display text-white">Complete Your Purchase</h3>
              <p className="text-zinc-400 text-xs">
                You are purchasing the <span className="text-white font-bold">{bot.name}</span> for <span className="text-primary font-mono font-bold">${bot.price}</span>.
              </p>
            </div>

            {/* Payment Method Switcher */}
            <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800/80">
              <button
                type="button"
                onClick={() => setPaymentMethod('razorpay')}
                className={`flex-1 py-2 text-xs font-bold font-display uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'razorpay' 
                    ? 'bg-primary text-black' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" /> Pay Online
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('qr')}
                className={`flex-1 py-2 text-xs font-bold font-display uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'qr' 
                    ? 'bg-primary text-black' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/40'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" /> Scan QR Code
              </button>
            </div>

            {paymentMethod === 'razorpay' ? (
              <div className="space-y-4">
                <div className="space-y-1 text-left">
                  <label className="text-xs font-mono text-zinc-400 flex items-center">
                    <Mail className="w-3.5 h-3.5 mr-1.5 text-primary" /> Delivery Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-primary text-sm text-white placeholder-zinc-600 transition-colors"
                  />
                  <span className="text-[9px] text-zinc-500 block">We will send your blueprint files and video guide link here.</span>
                </div>

                {error && <p className="text-red-500 text-xs pl-1 font-mono text-left">{error}</p>}

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-1/3 py-3.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-white rounded-full text-xs font-bold font-display uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleRazorpayPayment}
                    disabled={isSubmitting}
                    className="w-full sm:w-2/3 py-3.5 bg-primary text-black font-bold font-display uppercase tracking-wider rounded-full shadow-lg hover:shadow-primary/10 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-xs animate-pulse"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <span className="animate-spin h-3.5 w-3.5 border-2 border-black border-t-transparent rounded-full mr-2"></span>
                        Initiating Payment...
                      </span>
                    ) : (
                      <span>Pay & Download Blueprint</span>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleManualSubmit} className="space-y-4 text-left">
                {/* QR display block */}
                <div className="flex flex-col items-center bg-zinc-950/80 p-4 rounded-xl border border-zinc-800/80 space-y-3">
                  <div className="relative w-40 aspect-[0.4] overflow-hidden rounded-lg border border-zinc-800 shadow-lg">
                    <img
                      src="/payment-qr.png"
                      alt="GLOWGRIP UPI Payment QR"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-mono text-zinc-400 flex items-center justify-center">
                      <QrCode className="w-3.5 h-3.5 mr-1 text-primary" /> Scan & Pay with GPay, PhonePe, Paytm, or BHIM
                    </p>
                    <p className="text-[9px] text-zinc-500 mt-0.5">UPI ID: GLOWGRIP (Razorpay Merchant)</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400 flex items-center">
                    <Mail className="w-3.5 h-3.5 mr-1.5 text-primary" /> Delivery Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-primary text-sm text-white placeholder-zinc-650 transition-colors"
                  />
                  <span className="text-[9px] text-zinc-500 block">We will send your blueprint files and video guide link here.</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-400 flex items-center">
                    <FileCheck className="w-3.5 h-3.5 mr-1.5 text-primary" /> Transaction UTR / Ref Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={utr}
                    onChange={(e) => setUtr(e.target.value)}
                    placeholder="Enter 12-digit transaction ID"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl focus:outline-none focus:border-primary text-sm text-white placeholder-zinc-650 transition-colors"
                  />
                  <span className="text-[9px] text-zinc-500 block">Enter the UTR or Reference ID from your UPI app receipt to confirm the scan.</span>
                </div>

                {error && <p className="text-red-500 text-xs pl-1 font-mono">{error}</p>}

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-1/3 py-3.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-white rounded-full text-xs font-bold font-display uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-2/3 py-3.5 bg-quaternary text-white font-bold font-display uppercase tracking-wider rounded-full shadow-lg hover:shadow-quaternary/20 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-xs"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <span className="animate-spin h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                        Verifying UTR...
                      </span>
                    ) : (
                      <span>Confirm Payment & Download</span>
                    )}
                  </button>
                </div>
              </form>
            )}

            <div className="pt-3 border-t border-zinc-900 text-center flex items-center justify-center space-x-2 text-[10px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-tertiary" />
              <span>Instant Verification | 30-Day Setup Guarantee</span>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
