import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import productsData from '../data/products.json';
import { SEOPage } from '../utils/seoHelper';
import BotCard from '../components/ui/BotCard';
import QuickViewModal from '../components/ui/QuickViewModal';
import { 
  CheckCircle2, Calendar, Clock, User, Mail, FileText, Check, 
  CalendarCheck, ArrowLeft, ArrowRight, MessageSquare, RotateCcw
} from 'lucide-react';
import { useCheckout } from '../context/CheckoutContext';
import { motion, AnimatePresence } from 'framer-motion';

// Calendly Inline Embed Component
function CalendlyEmbed({ email, botName }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      try {
        document.body.removeChild(script);
      } catch (e) {
        // Safe catch
      }
    };
  }, []);

  const calendlyUrl = `https://calendly.com/anishpatil146/30min?email=${encodeURIComponent(email)}&a1=${encodeURIComponent(botName)}`;

  return (
    <div 
      className="calendly-inline-widget w-full rounded-2xl border border-cardBorder/40 overflow-hidden" 
      data-url={calendlyUrl}
      style={{ minWidth: '320px', height: '680px', background: 'transparent' }} 
    />
  );
}

export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const botName = searchParams.get('bot') || 'AI Bot Blueprint';
  const botPrice = searchParams.get('price') || '49';
  const urlEmail = searchParams.get('email') || '';
  const { triggerCheckout } = useCheckout();
  
  const [selectedBot, setSelectedBot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Booking Widget States
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingStep, setBookingStep] = useState(1); // 1: Select Slot, 2: Details Form, 3: Booked Success
  
  // Form details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(urlEmail);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pick 3 popular bots as upsells (excluding current bot)
  const upsells = productsData
    .filter(b => b.name !== botName)
    .sort((a, b) => b.reviewsCount - a.reviewsCount)
    .slice(0, 3);

  // Generate next 5 business days
  const availableDays = useMemo(() => {
    const days = [];
    let current = new Date();
    // Start from tomorrow
    current.setDate(current.getDate() + 1);
    
    while (days.length < 5) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude Sunday (0) and Saturday (6)
        days.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }
    return days;
  }, []);

  const timeSlots = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const handleGmailCompose = () => {
    const subject = encodeURIComponent(`Meeting Confirmed: Autovate Strategy Session for ${botName}`);
    const body = encodeURIComponent(
      `Hi ${fullName || 'there'},\n\n` +
      `This is a confirmation receipt that your 30-minute expert automation session has been successfully scheduled.\n\n` +
      `📅 SESSION DETAILS:\n` +
      `- Blueprint: ${botName}\n` +
      `- Date: ${formatDate(selectedDay)}\n` +
      `- Time: ${selectedTime}\n` +
      `- Goals/Problems: ${notes || 'Not specified'}\n\n` +
      `Our automation engineers will prepare a custom working framework for your business and join the call to walk you through the pricing and integration requirements.\n\n` +
      `Looking forward to meeting you!\n\n` +
      `Best regards,\n` +
      `Autovate Automation Team`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  const handleEmailFallback = () => {
    const subject = encodeURIComponent(`Meeting Confirmed: Autovate Strategy Session for ${botName}`);
    const body = encodeURIComponent(
      `Hi ${fullName || 'there'},\n\n` +
      `This is your receipt that your 30-minute expert automation session is scheduled.\n\n` +
      `📅 SESSION DETAILS:\n` +
      `- Blueprint: ${botName}\n` +
      `- Date: ${formatDate(selectedDay)}\n` +
      `- Time: ${selectedTime}\n` +
      `- Goals/Problems: ${notes || 'Not specified'}\n\n` +
      `We will connect at the scheduled time to discuss pricing and integration.\n\n` +
      `Best regards,\n` +
      `Autovate Team`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setBookingStep(2);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setBookingStep(3);
    }, 1500);
  };

  const handleQuickView = (bot) => {
    setSelectedBot(bot);
    setIsModalOpen(true);
  };

  // Determine marketplace theme for styling
  const isLight = typeof window !== 'undefined' && document.documentElement.classList.contains('theme-light');

  return (
    <div className="min-h-screen pt-24 bg-background pb-20 font-sans">
      <SEOPage
        title="Request Submitted | Autovate"
        description="Thank you for connecting with us! Please book your expert strategy session to finalize setup and details."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Success Header */}
        <div className="bg-card border border-emerald-500/25 rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-glow relative overflow-hidden">
          {/* Motion Background Graphics */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>

          <div className="inline-flex p-3.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_24px_rgba(16,185,129,0.15)]">
            <CheckCircle2 className="w-12 h-12 stroke-[2]" />
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-[10px] font-mono text-primary uppercase tracking-widest block font-bold">CONNECT REQUEST RECEIVED</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-headingText font-display leading-tight uppercase">
              Thank You For Connecting!
            </h1>
            <p className="text-bodyText text-xs sm:text-sm leading-relaxed">
              We've successfully logged your request for the <span className="text-headingText font-bold">{botName}</span> integration. 
              To help us tailor the perfect solution, please book a 30-minute expert meeting below.
            </p>
          </div>
        </div>

        {/* Dynamic Booking Calendar & Motion graphic container */}
        <div className="bg-card border border-cardBorder rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="p-6 md:p-10 border-b border-cardBorder bg-[#111116]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="text-left space-y-1">
              <span className="text-[10px] font-mono text-primary uppercase tracking-widest block font-bold">STEP 2 OF 2</span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-headingText uppercase">
                Schedule Your 30-Min Strategy Call
              </h2>
              <p className="text-xs text-bodyText/80">
                Pick a slot where our experts will walk you through customized pricing, bot mechanics, and solving your problems.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-xl shrink-0">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-white">30-Min Live Call</span>
            </div>
          </div>

          <div className="p-4 md:p-8 bg-[#111116]/10">
            <CalendlyEmbed email={urlEmail} botName={botName} />
          </div>
        </div>

        {/* Recommended blueprints section */}
        <section className="space-y-6">
          <div className="text-left space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-headingText uppercase">Recommended blueprints</h3>
            <p className="text-xs sm:text-sm text-bodyText/70">Deploy these complementary blueprints to further scale your operations.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upsells.map((upsellBot) => (
              <BotCard
                key={upsellBot.id}
                bot={upsellBot}
                onQuickView={handleQuickView}
                onBuy={triggerCheckout}
              />
            ))}
          </div>
        </section>

      </div>

      {/* Detail Overlay modal */}
      <QuickViewModal
        bot={selectedBot}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBuy={(b) => {
          setIsModalOpen(false);
          triggerCheckout(b);
        }}
      />

    </div>
  );
}
