import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { SEOPage } from '../utils/seoHelper';
import ROICalculator from '../components/ui/ROICalculator';
import GradientButton from '../components/ui/GradientButton';
import { 
  Phone, MessageCircle, Users, Target, Zap, GitBranch, 
  Clock, Link2, Rocket, PenTool, Wrench, CheckCircle, 
  Upload, Shield, Flame, Thermometer, CalendarCheck, 
  CreditCard, Bot, LayoutDashboard, ArrowRight 
} from 'lucide-react';

// SNAP EASY EASE-OUT CUBIC BEZIER [0.16, 1, 0.3, 1]
const easeOutCubic = [0.16, 1, 0.3, 1];

// Scroll animation variations
const sectionVariants = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: easeOutCubic }
};

const fadeUpVariants = (delay = 0, y = 32) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.4, delay, ease: easeOutCubic }
});

const eyebrowVariants = {
  initial: { opacity: 0, letterSpacing: '0.3em' },
  whileInView: { opacity: 1, letterSpacing: '0.15em' },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.3, ease: easeOutCubic }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.06
    }
  },
  viewport: { once: true, amount: 0.15 }
};

const childCardVariants = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: easeOutCubic }
};

const stepCardVariants = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: easeOutCubic }
};

const stepNumVariants = {
  initial: { scale: 0.6, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  transition: { 
    type: "spring",
    stiffness: 300,
    damping: 15
  }
};

const staggerContainerSteps = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.08
    }
  },
  viewport: { once: true, amount: 0.15 }
};

const pillContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.8
    }
  }
};

const pillItem = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: easeOutCubic } }
};

// 1. STAT: 24/7 pulse flash
function PulseStat() {
  return (
    <motion.span
      animate={{ color: ['#A855F7', '#EC4899', '#F97316', '#A855F7'] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      style={{ textShadow: '0px 1px 8px rgba(168,85,247,0.3)' }}
      className="text-5xl font-black font-display block"
    >
      24/7
    </motion.span>
  );
}

// 2. STAT: Typewriter effect
function TypewriterStat() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [text, setText] = useState('');
  
  useEffect(() => {
    if (isInView) {
      const fullText = 'FAST';
      let current = '';
      let i = 0;
      const interval = setInterval(() => {
        if (i < fullText.length) {
          current += fullText[i];
          setText(current);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 60);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <span ref={ref} className="text-5xl font-black font-display text-quaternary block">
      {text || ' '}
    </span>
  );
}

// 3. STAT: One spring bounce scale
function OneStat() {
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: [0, 1.15, 1], opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, times: [0, 0.7, 1], ease: "easeOut" }}
      className="text-5xl font-black font-display text-secondary block"
    >
      ONE
    </motion.span>
  );
}

// 4. STAT: CountUp 0 to 7 then rewind to 3
function CountRewindStat() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [val, setVal] = useState('0');
  
  useEffect(() => {
    if (isInView) {
      const steps = [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3];
      let i = 0;
      const interval = setInterval(() => {
        if (i < steps.length) {
          setVal(steps[i] === 3 && i > 8 ? '3-7' : `${steps[i]}`);
          i++;
        } else {
          setVal('3-7');
          clearInterval(interval);
        }
      }, 83);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <span ref={ref} className="text-5xl font-black font-display text-tertiary block">
      {val}
    </span>
  );
}

export const workflowThemes = {
  lead: {
    textColor: 'text-primary',
    bgClass: 'bg-gradient-to-br from-primary/10 to-secondary/5',
    borderClass: 'border-primary/20',
    hoverBorder: 'hover:border-primary',
    bgActive: 'bg-gradient-to-r from-primary to-secondary text-black border-transparent shadow-lg shadow-primary/20',
    lineGradient: 'bg-gradient-to-b from-primary to-secondary',
  },
  broadcast: {
    textColor: 'text-quaternary',
    bgClass: 'bg-gradient-to-br from-quaternary/10 to-redAccent/5',
    borderClass: 'border-quaternary/20',
    hoverBorder: 'hover:border-quaternary',
    bgActive: 'bg-gradient-to-r from-quaternary to-redAccent text-white border-transparent shadow-lg shadow-quaternary/20',
    lineGradient: 'bg-gradient-to-b from-quaternary to-redAccent',
  },
  appointment: {
    textColor: 'text-secondary',
    bgClass: 'bg-gradient-to-br from-secondary/10 to-indigo-600/5',
    borderClass: 'border-secondary/20',
    hoverBorder: 'hover:border-secondary',
    bgActive: 'bg-gradient-to-r from-secondary to-indigo-600 text-white border-transparent shadow-lg shadow-secondary/20',
    lineGradient: 'bg-gradient-to-b from-secondary to-indigo-600',
  },
  payment: {
    textColor: 'text-tertiary',
    bgClass: 'bg-gradient-to-br from-tertiary/10 to-emerald-600/5',
    borderClass: 'border-tertiary/20',
    hoverBorder: 'hover:border-tertiary',
    bgActive: 'bg-gradient-to-r from-tertiary to-emerald-600 text-white border-transparent shadow-lg shadow-tertiary/20',
    lineGradient: 'bg-gradient-to-b from-tertiary to-emerald-600',
  },
  support: {
    textColor: 'text-primary',
    bgClass: 'bg-gradient-to-br from-primary/10 to-secondary/5',
    borderClass: 'border-primary/20',
    hoverBorder: 'hover:border-primary',
    bgActive: 'bg-gradient-to-r from-primary to-secondary text-black border-transparent shadow-lg shadow-primary/20',
    lineGradient: 'bg-gradient-to-b from-primary to-secondary',
  },
  crm: {
    textColor: 'text-quaternary',
    bgClass: 'bg-gradient-to-br from-quaternary/10 to-yellowAccent/5',
    borderClass: 'border-quaternary/20',
    hoverBorder: 'hover:border-quaternary',
    bgActive: 'bg-gradient-to-r from-quaternary to-yellowAccent text-black border-transparent shadow-lg shadow-quaternary/20',
    lineGradient: 'bg-gradient-to-b from-quaternary to-yellowAccent',
  }
};

export const gridItemThemes = [
  {
    textColor: 'text-primary',
    bgGradient: 'from-primary/15 to-tertiary/5',
    borderGradient: 'from-primary to-tertiary',
    borderHoverClass: 'hover:border-primary',
  },
  {
    textColor: 'text-quaternary',
    bgGradient: 'from-quaternary/15 to-secondary/5',
    borderGradient: 'from-quaternary to-secondary',
    borderHoverClass: 'hover:border-quaternary',
  },
  {
    textColor: 'text-secondary',
    bgGradient: 'from-secondary/15 to-primary/5',
    borderGradient: 'from-secondary to-primary',
    borderHoverClass: 'hover:border-secondary',
  },
  {
    textColor: 'text-tertiary',
    bgGradient: 'from-tertiary/15 to-quaternary/5',
    borderGradient: 'from-tertiary to-quaternary',
    borderHoverClass: 'hover:border-tertiary',
  }
];

export default function Home() {
  const [activeWorkflow, setActiveWorkflow] = useState('lead');

  // Workflows detail state
  const workflowDetails = {
    lead: {
      name: 'Lead Routing & Alerting',
      icon: Target,
      steps: [
        'Ad campaign captures visitor interest and submits form details.',
        'Immediate webhook triggers the Autovate routing parser.',
        'Lead information is verified and enriched using data APIs.',
        'CRM profile is created automatically with a calculated lead score.',
        'High-priority WhatsApp alert is pushed directly to the sales agent.'
      ],
      resultHot: {
        label: 'HOT LEAD DELIVERED',
        text: 'Average response time drops below 60 seconds. Lead-to-meeting booking rates increase by 2.5x.'
      },
      resultCold: {
        label: 'NURTURING QUEUED',
        text: 'Lower-priority leads are routed to automated email sequences, preserving agent bandwidth.'
      }
    },
    broadcast: {
      name: 'WhatsApp Customer Broadcasts',
      icon: MessageCircle,
      steps: [
        'Select client list or trigger segmentation criteria in CRM.',
        'Campaign manager schedules broadcast or events-based trigger.',
        'Official WhatsApp Business Cloud API dispatches approved templates.',
        'System monitors real-time deliverability, open, and reply rates.',
        'Automated opt-out updates unsubscribe lists instantly.'
      ],
      resultHot: {
        label: '98% OPEN RATES',
        text: 'Dispatched messages achieve immediate visibility, outperforming email open rates by 6x.'
      },
      resultCold: {
        label: 'AUTO-REPLY SENT',
        text: 'Automated follow-ups categorized based on customer response keywords.'
      }
    },
    appointment: {
      name: 'Appointment Scheduling',
      icon: CalendarCheck,
      steps: [
        'Prospect selects a suitable date/time slot via a customized link.',
        'Booking is synced automatically to Google Calendar or Outlook.',
        '24-hour WhatsApp reminder is dispatched with a confirmation request.',
        '1-hour final warning message checks for last-minute cancellations.',
        'Post-call system triggers feedback loop or notes sync.'
      ],
      resultHot: {
        label: 'NO-SHOWS DROPPED BY 80%',
        text: 'Timely automated WhatsApp confirmations drastically reduce missed business consults.'
      },
      resultCold: {
        label: 'AUTOMATIC WAITLIST OFFER',
        text: 'Cancellations instantly trigger automated SMS offers to waitlisted clients.'
      }
    },
    payment: {
      name: 'Payment Gateway Link Generation',
      icon: CreditCard,
      steps: [
        'Sales representative moves deal status to "Closed Won".',
        'Secure API call contacts Stripe, Razorpay, or custom merchant gateway.',
        'Unique UPI/card payment link is compiled and generated.',
        'Link is pushed directly to customer\'s active WhatsApp conversation.',
        'Listener logs payment completion, dispatches invoice, and updates CRM.'
      ],
      resultHot: {
        label: '4x FASTER CLOSES',
        text: 'Enabling payments directly inside WhatsApp reduces checkout friction and increases speed.'
      },
      resultCold: {
        label: 'REMINDER BOT DISPATCHED',
        text: 'Reminders are gently pushed at 12, 24, and 48 hours for pending transactions.'
      }
    },
    support: {
      name: 'Instant WhatsApp Support Replies',
      icon: Bot,
      steps: [
        'Customer messages support ticket to corporate WhatsApp number.',
        'NLP logic parses message context and searches internal vector storage.',
        'Correct documentation match is retrieved and formatted for mobile.',
        'Answer is delivered instantly within a sub-second response window.',
        'Failsafe routes conversation to live agent if unresolved.'
      ],
      resultHot: {
        label: '75% AUTO-RESOLVED',
        text: 'Common queries are handled entirely by the automation agent, eliminating support queues.'
      },
      resultCold: {
        label: 'SLACK TICKET GENERATED',
        text: 'Unresolved issues compile system logs and create a ticket in Zendesk or Slack.'
      }
    },
    crm: {
      name: 'Google Sheets CRM Sync',
      icon: LayoutDashboard,
      steps: [
        'Client submits details on website, social media, or landing page.',
        'Autovate webhook parses raw input parameters in real-time.',
        'Customer records updated inside CRM worksheets instantly.',
        'Calculated fields calculate pipeline values and lead status.',
        'Slack alert pings account managers to check update logs.'
      ],
      resultHot: {
        label: 'ZERO MANUAL ENTRY',
        text: 'Customer profiles and columns populate automatically without human administration.'
      },
      resultCold: {
        label: 'RETARGETING TAGS APPLIED',
        text: 'Inactive records are marked for quarterly reactivation broadcasts.'
      }
    }
  };

  return (
    <div className="bg-card font-sans antialiased text-bodyText">
      <SEOPage
        title="Autovate Automations | AI & WhatsApp Automation Agency"
        description="We build Google-style premium WhatsApp integrations, CRM workflows, and custom business processes based in Badlapur, Maharashtra."
      />

      {/* SECTION 1: HERO SECTION */}
      <section 
        className="bg-background text-headingText pt-36 pb-24 border-b border-cardBorder relative overflow-hidden" 
        id="hero"
      >
        {/* Shifting radial gradient bg */}
        <div className="absolute inset-0 animate-hero-bg opacity-[0.08] pointer-events-none"></div>

        <div className="max-w-[1280px] mx-auto px-6 md:px-16 text-center space-y-8 relative z-10">
          
          <div className="space-y-4">
            {/* Logo: fadeIn, scale(0.9) to 1, duration 400ms */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: easeOutCubic }}
              className="flex justify-center mb-2"
            >
              <img 
                src="/logo.png" 
                alt="Autovate Logo" 
                className="w-14 h-14 object-contain rounded-xl border border-cardBorder bg-white p-1" 
              />
            </motion.div>

            {/* Eyebrow label: fadeIn + letterSpacing 0.3em to 0.15em, duration 500ms, delay 100ms */}
            <motion.span 
              initial={{ opacity: 0, letterSpacing: '0.3em' }}
              animate={{ opacity: 1, letterSpacing: '0.15em' }}
              transition={{ duration: 0.5, delay: 0.1, ease: easeOutCubic }}
              className="text-[11px] font-mono text-primary uppercase font-bold block"
            >
              AUTOMATION & INNOVATION
            </motion.span>
            
            <h1 className="text-5xl md:text-7xl font-extrabold font-display tracking-tight text-headingText uppercase leading-[0.95] max-w-4xl mx-auto overflow-hidden">
              {/* H1 line 1: slideUp, translateY(40px) to 0, duration 600ms, delay 200ms */}
              <motion.span 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: easeOutCubic }}
                className="block"
              >
                Intelligent systems that
              </motion.span>
              {/* H1 line 2: slideUp, translateY(40px) to 0, duration 600ms, delay 320ms */}
              <motion.span 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.32, ease: easeOutCubic }}
                className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              >
                run your business 24/7
              </motion.span>
            </h1>
          </div>

          {/* Body text: fadeIn, duration 400ms, delay 500ms */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5, ease: easeOutCubic }}
            className="text-base md:text-lg max-w-2xl mx-auto text-bodyText font-normal leading-relaxed"
          >
            We design, build, and deploy custom WhatsApp API triggers, live CRM syncs, and intelligent automated workflows. Clean, simple, and engineered to scale Indian SMBs.
          </motion.p>

          {/* CTA buttons: fadeUp stagger, delay 650ms + 720ms */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.65, ease: easeOutCubic }}
              className="w-full sm:w-auto"
            >
              <GradientButton
                to="/consultation"
                size="md"
                icon={<CalendarCheck className="w-4 h-4" />}
                className="w-full sm:w-auto btn-shimmer"
                id="hero-primary-cta"
              >
                Book 30-Min Consultation
              </GradientButton>
            </motion.div>
            
            <motion.a
              href="https://wa.me/919096861443"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.72, ease: easeOutCubic }}
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 border border-cardBorder text-headingText hover:bg-[#25D366] hover:border-[#25D366] hover:text-white font-semibold rounded-full text-sm uppercase tracking-wide gap-2 transition-all duration-200 group"
            >
              <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFF" d="M12.003 21c-1.74 0-3.41-.49-4.86-1.4l-.35-.22-3.61.95.96-3.52-.24-.38A9.87 9.87 0 0 1 2.15 11.19c.005-5.46 4.45-9.9 9.91-9.9 2.65 0 5.14 1.03 7.01 2.9a9.83 9.83 0 0 1 2.91 7.02c-.005 5.46-4.45 9.9-9.91 9.9h-.07z" style={{ fill: '#25D366' }} />
                <path fill="#FFF" d="M12.003 0C5.38 0 .01 5.37.006 11.99c0 2.11.55 4.18 1.6 6L0 24l6.15-1.61c1.78.97 3.79 1.48 5.84 1.48h.01c6.62 0 12-5.37 12-11.99c0-3.21-1.25-6.22-3.51-8.48A11.9 11.9 0 0 0 12.003 0zm5.52 17.02c-.23.64-1.34 1.22-1.85 1.3-.5.08-1.52.12-3.11-.53a10.2 10.2 0 0 1-4.71-4.14c-.81-1.08-1.45-2.45-1.45-3.87 0-1.46.77-2.18 1.05-2.47.27-.3.6-.37.79-.37.2 0 .39 0 .56.01.18 0 .42-.07.65.48.24.58.82 2 .89 2.15.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.16-.32.37-.46.5-.15.15-.3.31-.13.6.17.3 1.09 3.01 2.5 4.27 1.4 1.25 2.58 1.64 2.95 1.82.37.18.59.15.8-.08.23-.26.96-1.12 1.22-1.51.27-.39.53-.33.9-.19.36.14 2.3.1 2.7.29.39.2.65.3.72.43.08.13.08.76-.15 1.4z" />
              </svg>
              WhatsApp Helpline
            </motion.a>
          </div>

          {/* Pill tags: fadeIn left-to-right stagger, delay 800ms+ */}
          <motion.div 
            variants={pillContainer}
            initial="initial"
            animate="animate"
            className="pt-12 border-t border-cardBorder flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-widest font-mono text-bodyText/70"
          >
            <motion.span variants={pillItem}>WhatsApp API</motion.span>
            <motion.span variants={pillItem} className="text-primary">•</motion.span>
            <motion.span variants={pillItem}>CRM Sync</motion.span>
            <motion.span variants={pillItem} className="text-primary">•</motion.span>
            <motion.span variants={pillItem}>Lead Flow</motion.span>
            <motion.span variants={pillItem} className="text-primary">•</motion.span>
            <motion.span variants={pillItem}>Workflow Engineering</motion.span>
          </motion.div>

        </div>
      </section>

      {/* SECTION 2: WHO WE ARE (Service Cards) */}
      <motion.section 
        {...sectionVariants}
        className="py-24 bg-card border-b border-cardBorder" 
        id="services"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 space-y-16">
          
          <div className="space-y-3 text-left">
            <motion.span 
              {...eyebrowVariants}
              className="text-[11px] font-mono tracking-[0.15em] text-primary uppercase font-bold block"
            >
              WHO WE ARE
            </motion.span>
            <motion.h2 
              {...fadeUpVariants(0.1, 32)}
              className="text-3xl md:text-5xl font-bold font-display text-headingText uppercase tracking-tight leading-[1.0]"
            >
              A full-service automation agency
            </motion.h2>
          </div>

          {/* 5 Service cards staggered in-view */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            
            {/* Card 1 */}
            <motion.div 
              variants={childCardVariants}
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", borderColor: 'var(--color-primary)' }}
              transition={{ duration: 0.2 }}
              className="bg-background rounded-xl border border-cardBorder p-6 flex flex-col justify-between min-h-[160px] cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-full h-1 bg-primary rounded-full mr-4 mt-2"></div>
                <MessageCircle className="w-6 h-6 text-primary shrink-0" />
              </div>
              <h3 className="text-base font-bold text-headingText leading-snug">
                WhatsApp Automation
              </h3>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              variants={childCardVariants}
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", borderColor: 'var(--color-quaternary)' }}
              transition={{ duration: 0.2 }}
              className="bg-background rounded-xl border border-cardBorder p-6 flex flex-col justify-between min-h-[160px] cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-full h-1 bg-quaternary rounded-full mr-4 mt-2"></div>
                <Users className="w-6 h-6 text-quaternary shrink-0" />
              </div>
              <h3 className="text-base font-bold text-headingText leading-snug">
                CRM Automation
              </h3>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              variants={childCardVariants}
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", borderColor: 'var(--color-secondary)' }}
              transition={{ duration: 0.2 }}
              className="bg-background rounded-xl border border-cardBorder p-6 flex flex-col justify-between min-h-[160px] cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-full h-1 bg-secondary rounded-full mr-4 mt-2"></div>
                <Target className="w-6 h-6 text-secondary shrink-0" />
              </div>
              <h3 className="text-base font-bold text-headingText leading-snug">
                Lead Generation
              </h3>
            </motion.div>

            {/* Card 4 */}
            <motion.div 
              variants={childCardVariants}
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", borderColor: 'var(--color-tertiary)' }}
              transition={{ duration: 0.2 }}
              className="bg-background rounded-xl border border-cardBorder p-6 flex flex-col justify-between min-h-[160px] cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-full h-1 bg-tertiary rounded-full mr-4 mt-2"></div>
                <Zap className="w-6 h-6 text-tertiary shrink-0" />
              </div>
              <h3 className="text-base font-bold text-headingText leading-snug">
                Process Automation
              </h3>
            </motion.div>

            {/* Card 5 */}
            <motion.div 
              variants={childCardVariants}
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", borderColor: 'var(--color-primary)' }}
              transition={{ duration: 0.2 }}
              className="bg-background rounded-xl border border-cardBorder p-6 flex flex-col justify-between min-h-[160px] cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-full h-1 bg-gradient-to-r from-primary to-quaternary rounded-full mr-4 mt-2"></div>
                <GitBranch className="w-6 h-6 text-primary shrink-0" />
              </div>
              <h3 className="text-base font-bold text-headingText leading-snug">
                Workflow Design
              </h3>
            </motion.div>

          </motion.div>

          {/* Premium Bottom Banner */}
          <motion.div 
            {...fadeUpVariants(0.1, 24)}
            className="bg-background rounded-xl border border-cardBorder p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 text-left shadow-sm"
          >
            <span className="text-xs font-mono tracking-[0.15em] text-primary uppercase font-bold shrink-0">
              OUR MISSION
            </span>
            <div className="hidden md:block h-6 w-px bg-[#E2E8F0] shrink-0"></div>
            <p className="text-bodyText text-sm md:text-base leading-relaxed font-normal">
              To eliminate repetitive, error-prone manual workloads for Indian SMBs and build self-sustaining operations using official APIs and reliable automation frameworks.
            </p>
          </motion.div>

        </div>
      </motion.section>

      {/* SECTION 3: WHY AUTOVATE (Stat Cards with animations) */}
      <motion.section 
        {...sectionVariants}
        className="py-24 bg-background border-b border-cardBorder"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 space-y-16">
          
          <div className="space-y-3 text-left">
            <span className="text-[11px] font-mono tracking-[0.15em] text-primary uppercase font-bold block">
              WHY AUTOVATE
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-headingText uppercase tracking-tight leading-[1.0]">
              Engineered for Speed, Scalability, and Value
            </h2>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Stat 1: 24/7 pulsing */}
            <div className="relative bg-card rounded-xl border border-cardBorder hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-primary transition-all duration-300 p-8 text-left flex flex-col justify-between min-h-[220px]">
              <Clock className="absolute top-6 right-6 w-5 h-5 text-primary opacity-80" />
              <div>
                <PulseStat />
                <h4 className="text-base font-bold text-headingText mt-4 mb-2">Constant Uptime</h4>
              </div>
              <p className="text-xs text-bodyText leading-relaxed">
                Your systems never rest. Automated triggers capture and log client events instantly.
              </p>
            </div>

            {/* Stat 2: Typewriter */}
            <div className="relative bg-card rounded-xl border border-cardBorder hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-quaternary transition-all duration-300 p-8 text-left flex flex-col justify-between min-h-[220px]">
              <Zap className="absolute top-6 right-6 w-5 h-5 text-quaternary opacity-80" />
              <div>
                <TypewriterStat />
                <h4 className="text-base font-bold text-headingText mt-4 mb-2">Instant Response</h4>
              </div>
              <p className="text-xs text-bodyText leading-relaxed">
                Respond within 60 seconds to inbound WhatsApp enquiries before clients buy elsewhere.
              </p>
            </div>

            {/* Stat 3: Spring Bounce */}
            <div className="relative bg-card rounded-xl border border-cardBorder hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-secondary transition-all duration-300 p-8 text-left flex flex-col justify-between min-h-[220px]">
              <Link2 className="absolute top-6 right-6 w-5 h-5 text-secondary opacity-80" />
              <div>
                <OneStat />
                <h4 className="text-base font-bold text-headingText mt-4 mb-2">Unified Flow</h4>
              </div>
              <p className="text-xs text-bodyText leading-relaxed">
                Link CRMs, billing apps, customer records, and messaging tools inside a single data hub.
              </p>
            </div>

            {/* Stat 4: CountUp & Rewind */}
            <div className="relative bg-card rounded-xl border border-cardBorder hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-tertiary transition-all duration-300 p-8 text-left flex flex-col justify-between min-h-[220px]">
              <Rocket className="absolute top-6 right-6 w-5 h-5 text-tertiary opacity-80" />
              <div>
                <CountRewindStat />
                <h4 className="text-base font-bold text-headingText mt-4 mb-2">Days to Deploy</h4>
              </div>
              <p className="text-xs text-bodyText leading-relaxed">
                Deploy templates in record time with secure, pre-tested connection blueprints.
              </p>
            </div>

          </div>

          {/* Payoff Banner */}
          <motion.div 
            {...fadeUpVariants(0.1, 20)}
            className="bg-card rounded-xl border border-cardBorder p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8 text-left"
          >
            <span className="text-xs font-mono tracking-[0.15em] text-primary uppercase font-bold shrink-0">
              THE PAYOFF
            </span>
            <div className="hidden md:block h-6 w-px bg-[#E2E8F0] shrink-0"></div>
            <p className="text-bodyText text-sm md:text-base leading-relaxed">
              Our automation setups save operators over 15+ manual hours weekly per staff member, slashing support queues and admin costs.
            </p>
          </motion.div>

        </div>
      </motion.section>

      {/* SECTION 3.5: ROI CALCULATOR */}
      <section className="py-24 bg-card border-b border-cardBorder">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 text-center space-y-12">
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-[11px] font-mono tracking-[0.15em] text-primary uppercase font-bold block">
              RECLAIM YOUR TIME
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-headingText uppercase tracking-tight leading-[1.0]">
              Calculate Your Operational Waste
            </h2>
            <p className="text-bodyText text-sm md:text-base leading-relaxed">
              Use the calculator below to see how much manual task bottlenecks are costing your business every month.
            </p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* SECTION 4: CALLOUT BANNER */}
      <section className="bg-card py-16 border-b border-cardBorder">
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
          <div className="space-y-2 max-w-xl">
            <span className="text-[11px] font-mono tracking-[0.15em] text-primary uppercase font-bold block">
              OPERATIONAL SCALE
            </span>
            <h3 className="text-2xl md:text-3xl font-bold font-display uppercase tracking-tight text-headingText leading-tight">
              We design and deploy bespoke custom integrations that work together with your existing software stack.
            </h3>
          </div>
          <GradientButton
            to="/consultation"
            size="sm"
            iconRight={<ArrowRight className="w-4 h-4" />}
          >
            Audit My Stack
          </GradientButton>
        </div>
      </section>

      {/* SECTION 5: WORKFLOW GRID */}
      <motion.section 
        {...sectionVariants}
        className="py-24 bg-card border-b border-cardBorder"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cardBorder pb-6">
            <div className="space-y-3 text-left">
              <span className="text-[11px] font-mono tracking-[0.15em] text-primary uppercase font-bold block">
                WHAT WE AUTOMATE
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-display text-headingText uppercase tracking-tight leading-[1.0]">
                Pre-Engineered <span className="bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent">Blueprints</span>
              </h2>
            </div>
            <p className="text-bodyText font-sans font-medium text-sm md:text-base md:text-right shrink-0">
              Every workflow runs 24/7 — no manual work required.
            </p>
          </div>

          {/* 12-item Workflow Grid with hover animations */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            
            {[
              { num: '01', name: 'Lead Routing & Alerting' },
              { num: '02', name: 'WhatsApp Customer Broadcasts' },
              { num: '03', name: 'Google Sheets CRM Sync' },
              { num: '04', name: 'Automated Billing & Invoices' },
              { num: '05', name: 'Custom Dashboard Reports' },
              { num: '06', name: 'Multi-Stage Follow-Ups' },
              { num: '07', name: 'Appointment Scheduling' },
              { num: '08', name: 'Payment Gateway Integration' },
              { num: '09', name: 'Instant WhatsApp Support' },
              { num: '10', name: 'Customer Onboarding Bot' },
              { num: '11', name: 'E-commerce Inventory Alerts' },
              { num: '12', name: 'Database Backup & Sync' }
            ].map((item, index) => {
              const theme = gridItemThemes[index % 4];
              return (
                <motion.div 
                  key={index}
                  variants={childCardVariants}
                  whileHover={{ 
                    x: 2, 
                  }}
                  onClick={() => {
                    const gridItemToWorkflowKey = {
                      '01': 'lead',
                      '02': 'broadcast',
                      '03': 'crm',
                      '04': 'payment',
                      '05': 'crm',
                      '06': 'crm',
                      '07': 'appointment',
                      '08': 'payment',
                      '09': 'support',
                      '10': 'broadcast',
                      '11': 'support',
                      '12': 'crm'
                    };
                    const key = gridItemToWorkflowKey[item.num];
                    if (key) {
                      setActiveWorkflow(key);
                      const el = document.getElementById('how-it-works');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  transition={{ duration: 0.15, ease: easeOutCubic }}
                  className="relative overflow-hidden bg-card rounded-xl border border-cardBorder p-6 text-left hover:border-transparent flex items-center space-x-4 cursor-pointer transition-all duration-300 group"
                >
                  {/* Hover Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`} />
                  
                  {/* Hover Left Gradient Accent line */}
                  <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${theme.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`} />

                  <span className={`relative text-lg font-black font-display ${theme.textColor} z-10 shrink-0 w-6 text-center`}>{item.num}</span>
                  <span className="relative text-sm font-bold text-headingText z-10">{item.name}</span>
                </motion.div>
              );
            })}

          </motion.div>

        </div>
      </motion.section>

      {/* SECTION 6: WORKFLOW DETAIL CARDS (Workflow in Focus) */}
      <motion.section 
        {...sectionVariants}
        className="py-24 bg-background border-b border-cardBorder" 
        id="how-it-works"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 space-y-12">
          
          <div className="space-y-3 text-left">
            <span className="text-[11px] font-mono tracking-[0.15em] text-primary uppercase font-bold block">
              WORKFLOW IN FOCUS
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-headingText uppercase tracking-tight leading-[1.0]">
              Select a system <span className="bg-gradient-to-r from-quaternary via-secondary to-primary bg-clip-text text-transparent">to inspect</span>
            </h2>
          </div>

          {/* Google Chips Switcher */}
          <div className="flex flex-wrap gap-2 pb-4 border-b border-cardBorder overflow-x-auto no-scrollbar">
            {Object.keys(workflowDetails).map((type) => {
              const theme = workflowThemes[type];
              const isActive = activeWorkflow === type;
              const IconComponent = workflowDetails[type].icon;
              return (
                <button
                  key={type}
                  onClick={() => setActiveWorkflow(type)}
                  className={`px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-wide font-bold transition-all border flex items-center gap-2 ${
                    isActive
                      ? theme.bgActive
                      : `bg-card text-headingText border-cardBorder ${theme.hoverBorder}`
                  }`}
                >
                  <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? '' : theme.textColor}`} />
                  <span>{workflowDetails[type].name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Two-Column Workflow Detail Card layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left column: 5 step rows connected by line */}
            <div className="lg:col-span-7 flex flex-col justify-between py-2 text-left relative min-h-[300px]">
              
              {/* Connecting line drawing down - draws after steps start appearing */}
              <motion.div 
                key={activeWorkflow + '_line'}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
                className={`absolute left-[38px] top-6 bottom-6 w-0.5 ${workflowThemes[activeWorkflow].lineGradient} z-0 origin-top`}
              ></motion.div>
              
              <div className="space-y-6 z-10">
                <AnimatePresence mode="popLayout">
                  {workflowDetails[activeWorkflow].steps.map((step, idx) => {
                    const theme = workflowThemes[activeWorkflow];
                    return (
                      <motion.div 
                        key={activeWorkflow + '_step_' + idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3, delay: idx * 0.1, ease: easeOutCubic }}
                        whileHover={{ scale: 1.02 }}
                        className="relative overflow-hidden flex items-center space-x-6 bg-card p-5 rounded-xl border border-cardBorder shadow-sm hover:border-transparent transition-all duration-200 cursor-default group"
                      >
                        {/* Hover Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${theme.bgClass} opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-0`} />
                        
                        {/* Hover Left Gradient Accent line */}
                        <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${theme.lineGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10`} />

                        <span className={`relative text-xl font-black font-display ${theme.textColor} shrink-0 w-8 text-center z-10`}>
                          {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </span>
                        
                        <p className="relative text-bodyText text-sm leading-relaxed font-sans flex items-center z-10">
                          <Zap className={`w-4 h-4 ${theme.textColor} mr-2 shrink-0`} />
                          <span>{step}</span>
                        </p>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Right column: 2 stacked result cards with entrance slide */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6 text-left">
              
              {/* Top Card: Dynamic active colored background */}
              <motion.div 
                key={activeWorkflow + '_result_hot'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7, ease: easeOutCubic }}
                className={`${workflowThemes[activeWorkflow].bgClass} border ${workflowThemes[activeWorkflow].borderClass} rounded-xl p-8 flex-1 flex flex-col justify-center space-y-4 shadow-sm relative overflow-hidden`}
              >
                {/* Hot Lead card: Border pulses green once on enter - box-shadow flash animation 600ms */}
                <motion.div 
                  key={activeWorkflow + '_pulse'}
                  animate={{ 
                    boxShadow: [
                      "inset 0 0 0 0px rgba(34, 197, 94, 0)",
                      "inset 0 0 0 4px rgba(34, 197, 94, 0.5)",
                      "inset 0 0 0 0px rgba(34, 197, 94, 0)"
                    ]
                  }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="absolute inset-0 rounded-xl pointer-events-none"
                />

                <span className={`relative text-xs font-mono tracking-[0.15em] ${workflowThemes[activeWorkflow].textColor} uppercase font-bold flex items-center z-10`}>
                  <Flame className={`w-4 h-4 mr-1.5 shrink-0 ${workflowThemes[activeWorkflow].textColor}`} />
                  {workflowDetails[activeWorkflow].resultHot.label}
                </span>
                <p className={`relative ${workflowThemes[activeWorkflow].textColor} text-sm md:text-base font-sans font-medium leading-relaxed z-10`}>
                  "{workflowDetails[activeWorkflow].resultHot.text}"
                </p>
              </motion.div>

              {/* Bottom Card: Clean neutral grey background */}
              <motion.div 
                key={activeWorkflow + '_result_cold'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8, ease: easeOutCubic }}
                className="bg-card border border-cardBorder rounded-xl p-8 flex-1 flex flex-col justify-center space-y-4 shadow-sm hover:border-slate-700 transition-all duration-200 cursor-default relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800/10 to-slate-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-0" />
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-slate-600 to-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10" />
                <div className="relative z-10 space-y-4">
                  <span className="text-xs font-mono tracking-[0.15em] text-bodyText uppercase font-bold flex items-center">
                    <Thermometer className="w-4 h-4 mr-1.5 shrink-0 text-bodyText" />
                    {workflowDetails[activeWorkflow].resultCold.label}
                  </span>
                  <p className="text-bodyText text-sm font-sans leading-relaxed">
                    "{workflowDetails[activeWorkflow].resultCold.text}"
                  </p>
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </motion.section>

      {/* SECTION 7: PROCESS STEPS (6-Step Build System) */}
      <motion.section 
        {...sectionVariants}
        className="py-24 bg-card border-b border-cardBorder"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 space-y-16">
          
          <div className="space-y-3 text-left">
            <span className="text-[11px] font-mono tracking-[0.15em] text-primary uppercase font-bold block">
              6-STEP BUILD SYSTEM
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-headingText uppercase tracking-tight leading-[1.0]">
              From Audit to Live in 7 Days
            </h2>
          </div>

          {/* 3x2 Grid of 6 Steps with popIn stagger */}
          <motion.div 
            variants={staggerContainerSteps}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            
            {/* Step 1 */}
            <motion.div 
              variants={stepCardVariants}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.06)", borderColor: "var(--color-primary)" }}
              className="bg-card rounded-xl border border-cardBorder p-8 text-left space-y-6 hover:border-primary transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <motion.div 
                  variants={stepNumVariants}
                  className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-display font-black text-xl text-primary"
                >
                  01
                </motion.div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-7 h-7 text-primary group-hover:scale-115 transition-transform duration-150" />
                </div>
              </div>
              <div>
                <h4 className="text-base font-bold text-headingText mb-2">Discovery Audit</h4>
                <p className="text-xs text-bodyText leading-relaxed">
                  Schedule a 30-minute review to locate bottlenecks and mapping requirements.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              variants={stepCardVariants}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.06)", borderColor: "var(--color-quaternary)" }}
              className="bg-card rounded-xl border border-cardBorder p-8 text-left space-y-6 hover:border-quaternary transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <motion.div 
                  variants={stepNumVariants}
                  className="w-10 h-10 rounded-full bg-quaternary/10 border border-quaternary/30 flex items-center justify-center font-display font-black text-xl text-quaternary"
                >
                  02
                </motion.div>
                <div className="w-12 h-12 rounded-xl bg-quaternary/10 flex items-center justify-center shrink-0">
                  <PenTool className="w-7 h-7 text-quaternary group-hover:scale-115 transition-transform duration-150" />
                </div>
              </div>
              <div>
                <h4 className="text-base font-bold text-headingText mb-2">Blueprint Mapping</h4>
                <p className="text-xs text-bodyText leading-relaxed">
                  Our engineers blueprint standard webhooks and API schemas for review.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              variants={stepCardVariants}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.06)", borderColor: "var(--color-secondary)" }}
              className="bg-card rounded-xl border border-cardBorder p-8 text-left space-y-6 hover:border-secondary transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <motion.div 
                  variants={stepNumVariants}
                  className="w-10 h-10 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center font-display font-black text-xl text-secondary"
                >
                  03
                </motion.div>
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                  <Wrench className="w-7 h-7 text-secondary group-hover:scale-115 transition-transform duration-150" />
                </div>
              </div>
              <div>
                <h4 className="text-base font-bold text-headingText mb-2">API Connection Setup</h4>
                <p className="text-xs text-bodyText leading-relaxed">
                  Provide secure official access keys (Google sheets, WhatsApp Business, Razorpay).
                </p>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div 
              variants={stepCardVariants}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.06)", borderColor: "var(--color-tertiary)" }}
              className="bg-card rounded-xl border border-cardBorder p-8 text-left space-y-6 hover:border-tertiary transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <motion.div 
                  variants={stepNumVariants}
                  className="w-10 h-10 rounded-full bg-tertiary/10 border border-tertiary/30 flex items-center justify-center font-display font-black text-xl text-tertiary"
                >
                  04
                </motion.div>
                <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-7 h-7 text-tertiary group-hover:scale-115 transition-transform duration-150" />
                </div>
              </div>
              <div>
                <h4 className="text-base font-bold text-headingText mb-2">Sandbox Validation</h4>
                <p className="text-xs text-bodyText leading-relaxed">
                  Run test calls inside staging containers to verify zero pipeline breaks.
                </p>
              </div>
            </motion.div>

            {/* Step 5 */}
            <motion.div 
              variants={stepCardVariants}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.06)", borderColor: "var(--color-primary)" }}
              className="bg-card rounded-xl border border-cardBorder p-8 text-left space-y-6 hover:border-primary transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <motion.div 
                  variants={stepNumVariants}
                  className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center font-display font-black text-xl text-primary"
                >
                  05
                </motion.div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Upload className="w-7 h-7 text-primary group-hover:scale-115 transition-transform duration-150" />
                </div>
              </div>
              <div>
                <h4 className="text-base font-bold text-headingText mb-2">Training & Handover</h4>
                <p className="text-xs text-bodyText leading-relaxed">
                  Review final code and access custom Loom video guides detailing daily maintenance.
                </p>
              </div>
            </motion.div>

            {/* Step 6: Standing out using premium gradient background */}
            <motion.div 
              variants={stepCardVariants}
              whileHover={{ scale: 1.02, boxShadow: "0 12px 32px rgba(0,0,0,0.12)", borderColor: "var(--color-primary)" }}
              className="bg-gradient-to-br from-primary to-secondary rounded-xl p-8 text-left space-y-6 shadow-md hover:shadow-lg transition-all duration-200 text-white cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <motion.div 
                  variants={stepNumVariants}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-display font-black text-xl text-primary group-hover:text-primary/90 transition-colors duration-200"
                >
                  06
                </motion.div>
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <Shield className="w-7 h-7 text-white/80 group-hover:scale-115 group-hover:text-white transition-all duration-150" />
                </div>
              </div>
              <div>
                <h4 className="text-base font-bold text-headingText mb-2">6-Month Maintenance</h4>
                <p className="text-xs text-white/90 leading-relaxed">
                  Includes Slack-channel support, system upgrades, and API health reviews to prevent breakage.
                </p>
              </div>
            </motion.div>

          </motion.div>

          <div className="pt-4 text-center">
            <span className="text-primary text-base font-bold font-sans">
              Most setups go live in 3–7 business days.
            </span>
          </div>

        </div>
      </motion.section>

      {/* SECTION 8: PRICING PLANS */}
      <motion.section 
        {...sectionVariants}
        className="py-24 bg-background border-b border-cardBorder" 
        id="pricing"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 space-y-16">
          
          <div className="space-y-3 text-left">
            <span className="text-[11px] font-mono tracking-[0.15em] text-primary uppercase font-bold block">
              PRICING PLANS
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-headingText uppercase tracking-tight leading-[1.0]">
              Plans Built for Indian SMBs
            </h2>
          </div>

          {/* 3-Column Pricing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
            
            {/* Plan 1 */}
            <motion.div 
              whileHover={{ y: -6, boxShadow: "0 12px 32px rgba(0,0,0,0.15)" }}
              className="bg-card rounded-xl border border-cardBorder shadow-sm flex flex-col overflow-hidden text-left cursor-pointer transition-colors duration-200"
            >
              <div className="h-1 bg-primary w-full"></div>
              <div className="p-8 space-y-6 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-headingText font-display uppercase">Basic setup</h4>
                  <p className="text-xs text-bodyText">
                    Connect contact forms to Google sheets and WhatsApp alert templates easily.
                  </p>
                </div>
                <ul className="space-y-3 text-xs text-bodyText py-4 border-y border-cardBorder">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> Up to 3 active trigger nodes</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> Clean spreadsheet synchronization</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> 30 days post-launch support</li>
                </ul>
                <div className="pt-2">
                  <Link
                    to="/consultation"
                    className="block w-full py-3 border border-cardBorder text-center text-headingText hover:bg-background font-bold font-sans rounded-lg text-xs uppercase tracking-wider transition-colors"
                  >
                    Discuss Basic Setup
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Plan 2 */}
            <motion.div 
              whileHover={{ y: -6, boxShadow: "0 12px 32px rgba(0,0,0,0.15)" }}
              className="bg-card rounded-xl border border-cardBorder shadow-sm flex flex-col overflow-hidden text-left cursor-pointer transition-colors duration-200"
            >
              <div className="h-1 bg-primary w-full"></div>
              <div className="p-8 space-y-6 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-headingText font-display uppercase">Standard Suite</h4>
                  <p className="text-xs text-bodyText">
                    WhatsApp Cloud APIs, lead alerts, multi-branch routing, and CRM updates.
                  </p>
                </div>
                <ul className="space-y-3 text-xs text-bodyText py-4 border-y border-cardBorder">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> Up to 8 active trigger nodes</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> Official WhatsApp cloud API setups</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-primary shrink-0" /> 90 days Dedicated Slack support</li>
                </ul>
                <div className="pt-2">
                  <GradientButton
                    to="/consultation"
                    size="sm"
                    fullWidth
                  >
                    Select Standard Suite
                  </GradientButton>
                </div>
              </div>
            </motion.div>

            {/* Plan 3: Premium gradient highlight with hover outer glow */}
            <motion.div 
              whileHover={{ 
                y: -6, 
                boxShadow: "0 12px 32px rgba(0,0,0,0.15), 0 0 24px rgba(34, 197, 94, 0.2)"
              }}
              className="bg-gradient-to-br from-primary to-secondary border-0 rounded-xl shadow-md flex flex-col overflow-hidden text-left text-white cursor-pointer"
            >
              <div className="p-8 space-y-6 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-headingText font-display uppercase">Premium Suite</h4>
                  <p className="text-xs text-white/95">
                    Bespoke operations pipelines, inventory syncs, payment links, and vector database AI bots.
                  </p>
                </div>
                <ul className="space-y-3 text-xs py-4 border-y border-white/20" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-headingText shrink-0" /> Unlimited automation connections</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-headingText shrink-0" /> Multi-application CRM connections</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-headingText shrink-0" /> 180 days complete maintenance</li>
                </ul>
                <div className="pt-2">
                  <motion.div whileHover={{ scale: 1.03, brightness: 1.08 }} transition={{ duration: 0.15 }}>
                    <Link
                      to="/consultation"
                      className="block w-full py-3 bg-card text-primary text-center font-bold font-sans rounded-lg text-xs uppercase tracking-wider"
                    >
                      Get Premium custom
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>

          </div>

          <div className="text-center pt-4">
            <span className="text-primary text-base font-bold font-sans">
              Pricing is shared on a quick call.
            </span>
          </div>

        </div>
      </motion.section>

      {/* SECTION 9: CTA BOOKING BANNER */}
      <motion.section 
        {...sectionVariants}
        className="py-24 bg-card border-t border-cardBorder" 
        id="contact"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 text-center space-y-8">
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <motion.span 
              {...eyebrowVariants}
              className="text-[11px] font-mono tracking-[0.15em] text-primary uppercase font-bold block"
            >
              GET STARTED
            </motion.span>
            
            <h2 className="text-4xl md:text-6xl font-extrabold font-display text-headingText uppercase tracking-tight leading-[0.95] max-w-2xl mx-auto overflow-hidden">
              <motion.span 
                initial={{ y: 32, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              >
                Build the system that runs your business
              </motion.span>
            </h2>
            <motion.p 
              {...fadeUpVariants(0.1, 20)}
              className="text-base text-bodyText max-w-md mx-auto"
            >
              Ready to double your operational velocity? Reserve a time slot on our calendar to deploy your first workflow.
            </motion.p>
          </div>

          <motion.div 
            {...fadeUpVariants(0.2, 24)}
            className="pt-4"
          >
              <GradientButton
                to="/consultation"
                size="lg"
                icon={<CalendarCheck className="w-5 h-5" />}
                className="btn-shimmer"
              >
                Book 30-Min Consultation Call
              </GradientButton>
          </motion.div>

        </div>
      </motion.section>

    </div>
  );
}
