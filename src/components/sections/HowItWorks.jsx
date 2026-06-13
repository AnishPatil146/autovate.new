import React from 'react';
import { Search, ShoppingCart, Cpu, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorks({ showHeader = true }) {
  const steps = [
    {
      num: '01',
      title: 'Browse & Choose',
      desc: 'Filter our catalog of 70+ battle-tested bots. Select the template that automates your specific manual workflow.',
      icon: Search,
      color: 'text-primary border-primary/20 bg-primary/5',
    },
    {
      num: '02',
      title: 'Purchase & Download',
      desc: 'Buy instantly. Receive your Make.com blueprints, n8n JSON scripts, or Zapier templates in your inbox within seconds.',
      icon: ShoppingCart,
      color: 'text-secondary border-secondary/20 bg-secondary/5',
    },
    {
      num: '03',
      title: 'Paste & Configure',
      desc: 'Load the files into your accounts. Paste your API keys and follow our 10-minute setup tutorials. No coding required.',
      icon: Cpu,
      color: 'text-tertiary border-tertiary/20 bg-tertiary/5',
    },
    {
      num: '04',
      title: 'Scale & Monitor',
      desc: 'Your bot runs 24/7 in the cloud. Monitor data inputs, lead alerts, and efficiency savings from your dashboard.',
      icon: BarChart3,
      color: 'text-primary border-primary/20 bg-primary/5',
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      
      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {showHeader && (
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
              Instant operational efficiency
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-headingText font-display">
              From Zero to Automated in 15 Minutes
            </h2>
            <p className="text-bodyText text-sm md:text-base">
              No development teams needed. No high project pricing. Just choose, download, paste, and run.
            </p>
          </div>
        )}

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Connector Flow Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-px bg-zinc-800 -translate-y-12 z-0"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative z-10 flex flex-col items-center text-center space-y-4 group">
                
                {/* Icon Circle */}
                <div className={`w-20 h-20 rounded-full border flex items-center justify-center relative ${step.color} transition-all duration-300 group-hover:scale-105 group-hover:border-primary/40`}>
                  <Icon className="w-8 h-8" />
                  
                  {/* Step Number Badge */}
                  <span className="absolute -top-1.5 -right-1.5 font-mono text-[10px] font-bold text-black bg-primary px-2 py-0.5 rounded-full">
                    {step.num}
                  </span>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-display text-headingText group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-bodyText text-xs leading-relaxed max-w-[240px] mx-auto">
                    {step.desc}
                  </p>
                </div>

              </div>
            );
          })}

        </div>

        {/* CTA link below steps */}
        <div className="text-center pt-12">
          <Link
            to="/how-it-works"
            className="inline-flex items-center text-xs text-primary hover:underline font-mono uppercase tracking-wider group"
          >
            See Detailed Deploy Walkthrough <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
