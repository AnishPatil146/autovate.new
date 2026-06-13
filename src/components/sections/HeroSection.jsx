import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import CounterStat from '../ui/CounterStat';

export default function HeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Resize canvas
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * -0.3 - 0.05; // upwards slow drift
        this.color = `rgba(0, 229, 255, ${Math.random() * 0.3 + 0.05})`; // electric cyan tint
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reset if goes off top or sides
        if (this.y < 0) {
          this.y = canvas.height;
          this.x = Math.random() * canvas.width;
        }
        if (this.x < 0 || this.x > canvas.width) {
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    const particleCount = 60;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Subtle background grid glow
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height * 0.4, 0,
        canvas.width / 2, canvas.height * 0.4, canvas.width * 0.5
      );
      gradient.addColorStop(0, 'rgba(0, 229, 255, 0.04)');
      gradient.addColorStop(0.5, 'rgba(255, 77, 0, 0.01)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
<<<<<<< HEAD
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-grid-pattern bg-grid-size bg-background border-b border-zinc-900">
=======
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-grid-pattern bg-grid-size bg-background border-b border-cardBorder">
>>>>>>> 7c7a27fe6b08e8e9b9a8c72288108a8a9639bc98
      
      {/* HTML5 Canvas Background Particle Flow */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Decorative large glow orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Asymmetric Hero content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Urgent Tag */}
<<<<<<< HEAD
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800/80 text-zinc-400">
=======
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-card border border-cardBorder/80 text-bodyText">
>>>>>>> 7c7a27fe6b08e8e9b9a8c72288108a8a9639bc98
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300">
                Next-Gen Automation Marketplace
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
<<<<<<< HEAD
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display leading-[1.05] tracking-tight text-white">
                Stop Wasting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary">30 Hours/Week</span> on Tasks a $49 Bot Can Handle
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl max-w-xl font-sans leading-relaxed">
=======
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display leading-[1.05] tracking-tight text-headingText">
                Stop Wasting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary">30 Hours/Week</span> on Tasks a $49 Bot Can Handle
              </h1>
              <p className="text-bodyText text-lg md:text-xl max-w-xl font-sans leading-relaxed">
>>>>>>> 7c7a27fe6b08e8e9b9a8c72288108a8a9639bc98
                Deploy ready-to-use AI automation bots in minutes. Zero development overhead. Eliminate repetitive busywork and scale your operations instantly.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/marketplace"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-black font-semibold rounded-full shadow-glow hover:bg-primary/95 transition-all duration-300 transform active:scale-98 text-sm uppercase tracking-wider font-display group"
                id="hero-primary-cta"
              >
                Browse 70+ Bots <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
<<<<<<< HEAD
                className="inline-flex items-center justify-center px-8 py-4 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 font-semibold rounded-full transition-all duration-300 transform active:scale-98 text-sm uppercase tracking-wider font-display"
=======
                className="inline-flex items-center justify-center px-8 py-4 bg-card border border-cardBorder text-zinc-300 hover:text-headingText hover:border-zinc-700 font-semibold rounded-full transition-all duration-300 transform active:scale-98 text-sm uppercase tracking-wider font-display"
>>>>>>> 7c7a27fe6b08e8e9b9a8c72288108a8a9639bc98
                id="hero-secondary-cta"
              >
                Book Free Bot Strategy Call
              </Link>
            </div>

            {/* Micro Trust badges */}
<<<<<<< HEAD
            <div className="flex flex-wrap gap-y-2 gap-x-6 text-xs text-zinc-500 font-mono">
=======
            <div className="flex flex-wrap gap-y-2 gap-x-6 text-xs text-bodyText/70 font-mono">
>>>>>>> 7c7a27fe6b08e8e9b9a8c72288108a8a9639bc98
              <span className="flex items-center"><ShieldCheck className="w-4 h-4 text-tertiary mr-1.5" /> Instant File Delivery</span>
              <span className="flex items-center"><Zap className="w-4 h-4 text-primary mr-1.5" /> Fully Customizable Code</span>
              <span className="flex items-center"><ShieldCheck className="w-4 h-4 text-tertiary mr-1.5" /> 30-Day Money-Back Guarantee</span>
            </div>

          </div>

          {/* Right Block: Interactive Demo Showcase / Visual Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-full max-w-md aspect-square rounded-3xl bg-neutralDark/40 border border-primary/10 shadow-glow p-6 md:p-8 backdrop-blur-sm relative overflow-hidden flex flex-col justify-between">
              
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>

              {/* Bot Header Simulation */}
<<<<<<< HEAD
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
=======
              <div className="flex items-center justify-between border-b border-cardBorder/80 pb-4">
>>>>>>> 7c7a27fe6b08e8e9b9a8c72288108a8a9639bc98
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-mono text-sm font-bold">
                    AB
                  </div>
                  <div>
<<<<<<< HEAD
                    <h3 className="text-sm font-bold text-white">Autovate System</h3>
=======
                    <h3 className="text-sm font-bold text-headingText">Autovate System</h3>
>>>>>>> 7c7a27fe6b08e8e9b9a8c72288108a8a9639bc98
                    <p className="text-[10px] text-tertiary flex items-center font-mono">
                      <span className="h-1.5 w-1.5 rounded-full bg-tertiary mr-1 animate-pulse"></span> ACTIVE (71 BOTS LOADED)
                    </p>
                  </div>
                </div>
<<<<<<< HEAD
                <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-full">v2.4.0</span>
              </div>

              {/* Terminal Logs Simulation */}
              <div className="my-6 space-y-3 font-mono text-[10px] text-zinc-400 overflow-hidden flex-grow flex flex-col justify-end">
                <p className="text-zinc-650">[19:42:01] INITIALIZING AUTOMATION SYSTEM...</p>
                <p className="text-zinc-400">&gt; Loading templates from products.json...</p>
                <p className="text-primary">&gt; 15 industries configured successfully.</p>
                <p className="text-zinc-400">&gt; Connecting WhatsApp Business API API gateway...</p>
                <p className="text-tertiary">&gt; WhatsApp AI Bot listening on port 443 [SUCCESS]</p>
                <p className="text-zinc-400">&gt; Initializing CRM Enricher data pipelines...</p>
=======
                <span className="text-[10px] font-mono text-bodyText/70 bg-card border border-cardBorder px-2.5 py-1 rounded-full">v2.4.0</span>
              </div>

              {/* Terminal Logs Simulation */}
              <div className="my-6 space-y-3 font-mono text-[10px] text-bodyText overflow-hidden flex-grow flex flex-col justify-end">
                <p className="text-zinc-650">[19:42:01] INITIALIZING AUTOMATION SYSTEM...</p>
                <p className="text-bodyText">&gt; Loading templates from products.json...</p>
                <p className="text-primary">&gt; 15 industries configured successfully.</p>
                <p className="text-bodyText">&gt; Connecting WhatsApp Business API API gateway...</p>
                <p className="text-tertiary">&gt; WhatsApp AI Bot listening on port 443 [SUCCESS]</p>
                <p className="text-bodyText">&gt; Initializing CRM Enricher data pipelines...</p>
>>>>>>> 7c7a27fe6b08e8e9b9a8c72288108a8a9639bc98
                <p className="text-secondary">&gt; Alert: B2B Scraper generated 412 leads today.</p>
              </div>

              {/* Live Preview Button */}
              <Link
                to="/how-it-works"
<<<<<<< HEAD
                className="w-full py-3 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
=======
                className="w-full py-3 bg-card hover:bg-zinc-850 border border-cardBorder hover:border-zinc-700 text-zinc-300 hover:text-headingText rounded-xl text-xs font-bold font-display uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
>>>>>>> 7c7a27fe6b08e8e9b9a8c72288108a8a9639bc98
              >
                <Play className="w-3.5 h-3.5 fill-current text-primary" />
                <span>Watch Bot In 60 Seconds</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Stats Bar (Animated) */}
<<<<<<< HEAD
        <div className="mt-16 md:mt-24 border-t border-zinc-900 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center bg-card/40 border border-zinc-900 rounded-2xl py-6 px-4 md:px-8">
=======
        <div className="mt-16 md:mt-24 border-t border-cardBorder pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center bg-card/40 border border-cardBorder rounded-2xl py-6 px-4 md:px-8">
>>>>>>> 7c7a27fe6b08e8e9b9a8c72288108a8a9639bc98
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-extrabold text-primary font-display">
                <CounterStat target="71" suffix="+" />
              </div>
<<<<<<< HEAD
              <p className="text-xs uppercase tracking-wider font-mono text-zinc-500">Battle-Tested Bots</p>
=======
              <p className="text-xs uppercase tracking-wider font-mono text-bodyText/70">Battle-Tested Bots</p>
>>>>>>> 7c7a27fe6b08e8e9b9a8c72288108a8a9639bc98
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-extrabold text-primary font-display">
                <CounterStat target="15" suffix="+" />
              </div>
<<<<<<< HEAD
              <p className="text-xs uppercase tracking-wider font-mono text-zinc-500">Target Industries</p>
=======
              <p className="text-xs uppercase tracking-wider font-mono text-bodyText/70">Target Industries</p>
>>>>>>> 7c7a27fe6b08e8e9b9a8c72288108a8a9639bc98
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-extrabold text-primary font-display">
                <CounterStat target="4.8" suffix=" Avg" />
              </div>
<<<<<<< HEAD
              <p className="text-xs uppercase tracking-wider font-mono text-zinc-500">Verified Rating</p>
=======
              <p className="text-xs uppercase tracking-wider font-mono text-bodyText/70">Verified Rating</p>
>>>>>>> 7c7a27fe6b08e8e9b9a8c72288108a8a9639bc98
            </div>
            <div className="space-y-1">
              <div className="text-3xl md:text-4xl font-extrabold text-primary font-display">
                <CounterStat target="10000" suffix="+" />
              </div>
<<<<<<< HEAD
              <p className="text-xs uppercase tracking-wider font-mono text-zinc-500">Active Purchases</p>
=======
              <p className="text-xs uppercase tracking-wider font-mono text-bodyText/70">Active Purchases</p>
>>>>>>> 7c7a27fe6b08e8e9b9a8c72288108a8a9639bc98
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
