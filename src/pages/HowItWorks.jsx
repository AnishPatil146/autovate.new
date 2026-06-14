import { Play, CheckCircle2, Search, PhoneCall, Calendar, Zap } from 'lucide-react';
import { SEOPage } from '../utils/seoHelper';
import { Link } from 'react-router-dom';

export default function HowItWorksPage() {
  const detailedSteps = [
    {
      step: '01',
      title: 'Browse & Select Blueprint',
      desc: 'Explore our catalog of 71 pre-engineered AI automation blueprints. Filter by your industry or tech stack (Make, Zapier, n8n, or Node) to find the exact workflow that solves your operational bottleneck.',
      bullets: [
        'Filter by industry specific categories',
        'Review direct outcomes & tech stacks',
        'Select multiple blueprints for custom integrations'
      ],
      icon: Search
    },
    {
      step: '02',
      title: 'Connect With Us',
      desc: 'Click "Connect with us" on any card to request a bot setup. Fill out your contact email or company details, and our visual routing connects you directly to our automation design engineers.',
      bullets: [
        'Simple request form takes under 10 seconds',
        'Instant WhatsApp redirection options',
        'No upfront card or payment details required'
      ],
      icon: PhoneCall
    },
    {
      step: '03',
      title: 'Book a Strategy Consultation',
      desc: 'Upon sending your request, schedule a 30-minute discovery call via the embedded Calendly widget. Our experts will outline the exact automation layout, integrations, and customization pricing.',
      bullets: [
        'Consult directly with senior automation architects',
        'Get custom pricing matching your transaction volume',
        'Map out custom API credentials and endpoints'
      ],
      icon: Calendar
    },
    {
      step: '04',
      title: 'Guided Expert Deployment',
      desc: 'Sit back while our engineering team configures and deploys the blueprint directly inside your account. We help you securely connect your API keys (like OpenAI) and CRM to go live instantly.',
      bullets: [
        'Hands-off configuration and server setup',
        'Full security reviews of your API integrations',
        'Go live in minutes and monitor automated savings'
      ],
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen pt-24 bg-background pb-20">
      <SEOPage
        title="How It Works | Deploy AI Automations"
        description="Learn how to deploy Autovate's AI automation bots. Zero coding needed. 4 steps to complete direct automation integrations."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-24">
        
        {/* Page Title */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
            Zero development friction
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-headingText font-display leading-none">
            Deploy AI in Hours, Not Weeks
          </h1>
          <p className="text-bodyText text-sm md:text-base">
            Skip expensive dev cycles. Our pre-configured templates allow any business to implement advanced AI and automate processes instantly.
          </p>
        </div>

        {/* Video Tutorial Placeholder Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-bold font-display text-headingText">Watch How It Works in 60 Seconds</h3>
            <p className="text-xs text-bodyText/70 font-mono">See a WhatsApp AI Bot loaded and running in Make.com in real-time.</p>
          </div>
          
          <div className="relative aspect-video rounded-3xl bg-background/80 border border-primary/20 overflow-hidden flex items-center justify-center group cursor-pointer shadow-glow">
            {/* Background mockup illustration placeholder */}
            <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80')` }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-black/80 to-transparent"></div>
            
            {/* Play Button Icon */}
            <div className="relative z-10 w-20 h-20 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center text-primary group-hover:scale-108 group-hover:bg-primary/25 transition-all duration-300">
              <Play className="w-8 h-8 fill-current" />
            </div>
            
            <div className="absolute bottom-4 left-6 text-left">
              <span className="text-[10px] font-mono text-zinc-450 uppercase tracking-widest text-bodyText">WATCH PROMO VIDEO</span>
              <h4 className="text-sm font-bold text-headingText font-display">Autovate Deployments Workflow Guide</h4>
            </div>
          </div>
        </section>

        {/* Visual Flowchart Diagram */}
        <section className="py-12 bg-neutralDark/40 border border-cardBorder rounded-3xl p-8 max-w-4xl mx-auto space-y-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl"></div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-display text-headingText">Automation Pipeline Topology</h3>
            <p className="text-xs text-bodyText/70 font-mono">Visual schematic of your bot workflow integration.</p>
          </div>

          {/* Simple Responsive SVG Flow Chart */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 pt-4">
            <div className="flex flex-col items-center bg-card border border-cardBorder p-4 rounded-xl w-44">
              <span className="text-[9px] font-mono text-bodyText/70 uppercase">Input Trigger</span>
              <span className="font-bold text-xs text-headingText font-display mt-1">1. User Event</span>
              <p className="text-[9px] text-bodyText mt-2">Webhook, Form Submission, Email Inbound</p>
            </div>
            
            <div className="w-1.5 h-6 md:w-6 md:h-1.5 bg-primary/30 rounded"></div>

            <div className="flex flex-col items-center bg-card border border-primary/30 p-4 rounded-xl w-44 shadow-glow/10">
              <span className="text-[9px] font-mono text-primary uppercase">Integration</span>
              <span className="font-bold text-xs text-headingText font-display mt-1">2. Autovate Bot</span>
              <p className="text-[9px] text-bodyText mt-2">Make.com Blueprint, n8n Script files</p>
            </div>

            <div className="w-1.5 h-6 md:w-6 md:h-1.5 bg-primary/30 rounded"></div>

            <div className="flex flex-col items-center bg-card border border-cardBorder p-4 rounded-xl w-44">
              <span className="text-[9px] font-mono text-tertiary uppercase">LLM / Action</span>
              <span className="font-bold text-xs text-headingText font-display mt-1">3. OpenAI / API</span>
              <p className="text-[9px] text-bodyText mt-2">Bespoke prompts, data cleaning, routing</p>
            </div>
          </div>
        </section>

        {/* Detailed 4 Steps List */}
        <section className="space-y-16">
          <div className="text-left space-y-2 border-b border-cardBorder pb-4 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-headingText">Full Process Breakdown</h3>
            <p className="text-xs sm:text-sm text-bodyText/70">Read the detailed sequence to integrate blueprints.</p>
          </div>

          <div className="space-y-12">
            {detailedSteps.map((row, idx) => {
              const Icon = row.icon;
              return (
                <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Step counter & icon */}
                  <div className="lg:col-span-3 flex items-center lg:flex-col lg:items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-card border border-cardBorder flex items-center justify-center text-primary shrink-0">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-mono text-primary font-bold">STEP {row.step}</span>
                      <h4 className="font-bold text-headingText font-display text-sm whitespace-nowrap">{row.title.split(' ')[0]} {row.title.split(' ')[1]}</h4>
                    </div>
                  </div>

                  {/* Middle Column: Text desc */}
                  <div className="lg:col-span-5 text-left space-y-3">
                    <h3 className="text-lg font-bold font-display text-headingText">{row.title}</h3>
                    <p className="text-bodyText text-xs sm:text-sm leading-relaxed">{row.desc}</p>
                  </div>

                  {/* Right Column: Outcomes Checklist */}
                  <div className="lg:col-span-4 bg-background/60 border border-cardBorder p-5 rounded-2xl text-left">
                    <h5 className="text-[10px] font-mono text-bodyText/70 uppercase tracking-wider mb-3">Checklist Steps</h5>
                    <ul className="space-y-2 text-xs text-bodyText">
                      {row.bullets.map((bullet, bidx) => (
                        <li key={bidx} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-tertiary shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              );
            })}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="bg-gradient-to-r from-zinc-900 to-neutralDark border border-cardBorder rounded-3xl p-10 text-center space-y-6">
          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-headingText font-display">Ready to Reclaim Your Time?</h3>
            <p className="text-bodyText text-xs sm:text-sm">
              Deploy our automated templates and slash busywork. Join thousands of SMBs running our bots 24/7.
            </p>
          </div>
          <Link
            to="/marketplace"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-black font-semibold rounded-full shadow-glow text-xs font-display uppercase tracking-wider hover:bg-primary/95"
          >
            Start Browsing 70+ Bots
          </Link>
        </section>

      </div>
    </div>
  );
}
