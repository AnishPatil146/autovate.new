import { Link } from 'react-router-dom';
import { MessageSquare, Phone, Calendar } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background text-bodyText py-20 relative overflow-hidden border-t border-cardBorder" id="contact">
      {/* Soft decorative background circles */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-primary/3 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-secondary/3 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 relative z-10 space-y-12">
        
        {/* Logo centered */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <img
            src="/logo.png"
            alt="Autovate Logo"
            className="w-11 h-11 object-contain rounded-lg border border-cardBorder bg-white p-0.5 shadow-sm"
          />
          <span className="text-xs font-mono tracking-[0.15em] text-primary uppercase font-bold">
            Autovate Automations
          </span>
        </div>

        {/* Heading and Subtext */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold text-headingText font-display uppercase tracking-tight leading-[1.0]">
            Let's build the system that runs your business.
          </h2>
          <p className="text-sm text-bodyText max-w-lg mx-auto">
            Empower your operations with official WhatsApp API tools, CRM pipelines, and custom automated workflows designed for the Indian market.
          </p>
        </div>

        {/* Two columns separated by pipe divider */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-0 max-w-3xl mx-auto py-8 border-y border-cardBorder">
          
          {/* Left: Phone Column */}
          <div className="flex-1 flex flex-col justify-center items-center md:items-end md:pr-12 md:border-r md:border-cardBorder space-y-2 text-center md:text-right">
            <span className="text-xs font-mono tracking-[0.15em] text-bodyText uppercase font-bold">
              CALL HELP DESK
            </span>
            <a 
              href="tel:+919096861443" 
              className="text-xl md:text-2xl font-bold font-sans text-headingText hover:text-primary transition-colors flex items-center gap-2"
            >
              <Phone className="w-5 h-5 text-primary" />
              +91 90968 61443
            </a>
          </div>

          {/* Right: Consultation Button Column */}
          <div className="flex-1 flex flex-col justify-center items-center md:items-start md:pl-12 space-y-2">
            <span className="text-xs font-mono tracking-[0.15em] text-bodyText uppercase font-bold">
              BOOK A CONSULTATION
            </span>
            <Link 
              to="/consultation" 
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:opacity-95 text-white font-bold font-sans rounded-full transition-all duration-200 hover:scale-103 shadow-sm text-xs uppercase tracking-wide gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book 30-Min Call
            </Link>
          </div>

        </div>

        {/* Bottom footer text */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-bodyText/80 pt-4">
          <div>
            © {new Date().getFullYear()} Autovate. All rights reserved. Badlapur, Maharashtra, India.
          </div>
          <div className="mt-2 sm:mt-0 font-mono text-primary font-bold uppercase tracking-wider">
            Simple but Premium
          </div>
        </div>

      </div>
    </footer>
  );
}
