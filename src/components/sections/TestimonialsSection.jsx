import React, { useState } from 'react';
import testimonialsData from '../../data/testimonials.json';
import { Star, Quote, Sparkles } from 'lucide-react';

export default function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState('All');
  
  const industries = ['All', 'SaaS', 'Marketing', 'Fitness & Local Business', 'Finance', 'E-Commerce'];

  const filteredTestimonials = activeTab === 'All' 
    ? testimonialsData 
    : testimonialsData.filter(t => t.industry === activeTab);

  return (
<<<<<<< HEAD
    <section className="py-24 bg-zinc-950/20 border-y border-zinc-900 relative">
=======
    <section className="py-24 bg-background/20 border-y border-cardBorder relative">
>>>>>>> 7c7a27fe6b08e8e9b9a8c72288108a8a9639bc98
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-4 text-left max-w-xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-primary" /> Proven Client Outcomes
            </span>
<<<<<<< HEAD
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-display">
=======
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-headingText font-display">
>>>>>>> 7c7a27fe6b08e8e9b9a8c72288108a8a9639bc98
              Loved by Operation Leads & Founders
            </h2>
          </div>

          {/* Industry Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pt-6 md:pt-0 pb-1 shrink-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setActiveTab(ind)}
                className={`px-4 py-2 rounded-full text-xs font-medium font-display whitespace-nowrap transition-all border ${
                  activeTab === ind
                    ? 'bg-primary border-primary text-black font-semibold'
<<<<<<< HEAD
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
=======
                    : 'bg-card/60 border-cardBorder text-bodyText hover:text-headingText hover:border-zinc-700'
>>>>>>> 7c7a27fe6b08e8e9b9a8c72288108a8a9639bc98
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-6 bg-card border border-primary/10 rounded-2xl relative overflow-hidden group hover:border-primary/20 transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-zinc-800/40 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                {/* Rating */}
                <div className="flex space-x-0.5 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>

                {/* Quote */}
                <p className="text-zinc-300 text-xs md:text-sm italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              {/* Bottom Client profile */}
              <div className="flex items-center space-x-3 pt-6 mt-6 border-t border-zinc-850/80">
                <img
                  src={item.avatar}
                  alt={item.user}
                  className="w-10 h-10 rounded-full border border-primary/20 object-cover"
                />
                <div className="text-left">
<<<<<<< HEAD
                  <h4 className="text-xs font-bold text-white font-display">{item.user}</h4>
                  <p className="text-[10px] text-zinc-500">{item.role}</p>
=======
                  <h4 className="text-xs font-bold text-headingText font-display">{item.user}</h4>
                  <p className="text-[10px] text-bodyText/70">{item.role}</p>
>>>>>>> 7c7a27fe6b08e8e9b9a8c72288108a8a9639bc98
                </div>
                
                {/* Impact Metric tag */}
                <div className="ml-auto bg-tertiary/10 border border-tertiary/20 text-tertiary font-mono text-[9px] px-2.5 py-1 rounded-md uppercase tracking-wider font-semibold">
                  {item.metric.split(' ')[0]} {item.metric.split(' ')[1]}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
