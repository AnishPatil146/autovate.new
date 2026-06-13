import React, { useState } from 'react';
import productsData from '../data/products.json';
import { SEOPage } from '../utils/seoHelper';
import { Send, PhoneCall, HelpCircle, AlertCircle, Calendar, MessageSquare, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    bot: 'general',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }
    
    // Simulate API webhook integration
    // TODO: Connect form with Zapier or Make webhook endpoint
    console.log('[Integration] Contact submission:', formData);
    setIsSubmitted(true);
    setError('');
  };

  const contactFaqs = [
    { q: 'Do you offer custom bots?', a: 'Yes! If you have a complex operational workflow requiring deep database syncing, bespoke integrations, or custom ML model training, you can book a strategy call. Our developers will build and deploy a solution for a flat project price.' },
    { q: 'What if it doesn\'t work?', a: 'We offer a 30-day money-back guarantee. Every blueprint comes with setup video tutorials. If you run into API error blocks or setup bottlenecks, join our customer Discord or email our engineers. If we can\'t get it running, you get a full refund.' }
  ];

  return (
    <div className="min-h-screen pt-24 bg-background pb-20">
      <SEOPage
        title="Contact & Support | Request Custom Bot"
        description="Book a strategy call or ask a support query. Connect with our automation engineers, access our WhatsApp helpline, or fill out a ticket."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* Page Title */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
            Support & consultations
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-headingText font-display leading-none">
            Get Automated Help
          </h1>
          <p className="text-bodyText text-sm md:text-base">
            Reach out to our solution architects. Book a strategy consultation, open a support ticket, or chat directly via WhatsApp.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-card border border-cardBorder rounded-3xl p-6 md:p-8 space-y-6">
            
            <div className="text-left space-y-2 border-b border-zinc-850 pb-4">
              <h3 className="text-xl font-bold font-display text-headingText">Send a Message</h3>
              <p className="text-xs text-bodyText/70">We respond to support tickets and custom requests in under 2 hours.</p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-450 text-bodyText">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 bg-card border border-cardBorder rounded-xl focus:outline-none focus:border-primary text-sm text-headingText transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-450 text-bodyText">Work Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 bg-card border border-cardBorder rounded-xl focus:outline-none focus:border-primary text-sm text-headingText transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-450 text-bodyText">Company Name</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Apex Digital"
                      className="w-full px-4 py-3 bg-card border border-cardBorder rounded-xl focus:outline-none focus:border-primary text-sm text-headingText transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-zinc-450 text-bodyText">Related Bot Blueprint</label>
                    <select
                      value={formData.bot}
                      onChange={(e) => setFormData({ ...formData, bot: e.target.value })}
                      className="w-full px-4 py-3 bg-card border border-cardBorder rounded-xl focus:outline-none focus:border-primary text-sm text-zinc-300 transition-colors cursor-pointer"
                    >
                      <option value="general">General Strategy Question</option>
                      <option value="custom">Custom Build Request</option>
                      {productsData.map((bot) => (
                        <option key={bot.id} value={bot.slug}>{bot.name} (${bot.price})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-zinc-450 text-bodyText">How can we help your operations? *</label>
                  <textarea
                    rows="5"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your current manual workflow bottleneck..."
                    className="w-full px-4 py-3 bg-card border border-cardBorder rounded-xl focus:outline-none focus:border-primary text-sm text-headingText placeholder-zinc-550 transition-colors"
                  ></textarea>
                </div>

                {error && (
                  <div className="flex items-center space-x-2 text-xs text-red-500 pl-2">
                    <AlertCircle className="w-4 h-4" /> <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 bg-secondary text-black font-bold font-display uppercase tracking-widest rounded-full shadow-glowSecondary hover:bg-secondary/90 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Ticket Query</span>
                </button>
                
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-headingText font-display">Ticket Filed Successfully!</h3>
                  <p className="text-bodyText text-xs max-w-sm mx-auto">
                    Message received! We have dispatched a confirmation email and will follow up within 2 business hours.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-zinc-800 text-headingText rounded-full text-xs font-medium hover:bg-zinc-700 transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            )}

          </div>

          {/* Right Column: Helplines & Schedulers */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* WhatsApp CTA */}
            <div className="bg-card border border-cardBorder rounded-3xl p-6 text-left space-y-4">
              <div className="flex items-center space-x-3 text-[#25D366]">
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#FFF" d="M12.003 21c-1.74 0-3.41-.49-4.86-1.4l-.35-.22-3.61.95.96-3.52-.24-.38A9.87 9.87 0 0 1 2.15 11.19c.005-5.46 4.45-9.9 9.91-9.9 2.65 0 5.14 1.03 7.01 2.9a9.83 9.83 0 0 1 2.91 7.02c-.005 5.46-4.45 9.9-9.91 9.9h-.07z" style={{ fill: '#25D366' }} />
                  <path fill="#FFF" d="M12.003 0C5.38 0 .01 5.37.006 11.99c0 2.11.55 4.18 1.6 6L0 24l6.15-1.61c1.78.97 3.79 1.48 5.84 1.48h.01c6.62 0 12-5.37 12-11.99c0-3.21-1.25-6.22-3.51-8.48A11.9 11.9 0 0 0 12.003 0zm5.52 17.02c-.23.64-1.34 1.22-1.85 1.3-.5.08-1.52.12-3.11-.53a10.2 10.2 0 0 1-4.71-4.14c-.81-1.08-1.45-2.45-1.45-3.87 0-1.46.77-2.18 1.05-2.47.27-.3.6-.37.79-.37.2 0 .39 0 .56.01.18 0 .42-.07.65.48.24.58.82 2 .89 2.15.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.16-.32.37-.46.5-.15.15-.3.31-.13.6.17.3 1.09 3.01 2.5 4.27 1.4 1.25 2.58 1.64 2.95 1.82.37.18.59.15.8-.08.23-.26.96-1.12 1.22-1.51.27-.39.53-.33.9-.19.36.14 2.3.1 2.7.29.39.2.65.3.72.43.08.13.08.76-.15 1.4z" />
                </svg>
                <h4 className="font-bold text-white font-display text-sm">Direct WhatsApp Helpline</h4>
              </div>
              <p className="text-bodyText text-xs leading-relaxed">
                Need answers right away? Chat with a solutions architect. Send us a message on our business WhatsApp hotline.
              </p>
              <a
                href="https://wa.me/919096861443?text=Hello%20Autovate!%20I'd%20like%20to%20ask%20a%20question%20about%20an%20AI%20automation%20blueprint."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center py-3 bg-[#25D366] text-white font-bold font-display uppercase tracking-wider rounded-full hover:bg-[#20ba5a] text-xs shadow-[0_4px_14px_rgba(37,211,102,0.35)] transition-all duration-200"
              >
                Start WhatsApp Chat
              </a>
            </div>

            {/* Calendly Embed Placeholder */}
            <div className="bg-neutralDark/40 border border-cardBorder rounded-3xl p-6 text-left space-y-4">
              <div className="flex items-center space-x-3 text-primary">
                <Calendar className="w-6 h-6" />
                <h4 className="font-bold text-headingText font-display text-sm">Calendly Scheduler</h4>
              </div>
              <p className="text-bodyText text-xs leading-relaxed">
                Book a 15-minute screen-share call. Let us review your operational stack and suggest the best bots.
              </p>
              
              {/* Calendly Placeholder Mockup */}
              <div className="p-4 bg-background/80 border border-cardBorder rounded-xl text-center space-y-2">
                <span className="text-[10px] font-mono text-bodyText/70 uppercase">Consultant Availability</span>
                <div className="font-bold text-xs text-headingText font-display">Available Today: 4 Slots Open</div>
                <button
                  onClick={() => alert("Calendly Embed Open: In production, insert your Calendly inline embed code here.")}
                  className="px-4 py-2 bg-card hover:bg-zinc-850 border border-cardBorder text-zinc-300 hover:text-headingText rounded-lg text-[10px] font-mono uppercase tracking-wider w-full"
                >
                  Schedule Strategy Session
                </button>
              </div>
            </div>

            {/* Support FAQs */}
            <div className="space-y-3">
              {contactFaqs.map((faq, idx) => (
                <div key={idx} className="bg-card border border-cardBorder p-4 rounded-2xl text-left space-y-2">
                  <h4 className="font-bold text-headingText font-display text-xs flex items-center">
                    <HelpCircle className="w-3.5 h-3.5 text-primary mr-2 shrink-0" />
                    {faq.q}
                  </h4>
                  <p className="text-bodyText text-[11px] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
