import React, { useState } from 'react';
import faqsData from '../../data/faqs.json';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      
      {/* Light highlights */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
            Frequently asked questions
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-display">
            Clear Answers to Your Questions
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto">
            Everything you need to know about purchasing, deploying, and running our pre-configured AI automation templates.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {faqsData.map((faq, idx) => {
            const isOpen = openIdx === idx;
            
            return (
              <div
                key={idx}
                className="bg-card border border-zinc-800/80 rounded-xl overflow-hidden transition-all duration-300 hover:border-zinc-700/80"
              >
                {/* Header click bar */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-sm md:text-base text-zinc-100 flex items-center pr-4 font-display">
                    <HelpCircle className="w-4 h-4 text-primary mr-3 shrink-0" />
                    {faq.q}
                  </span>
                  
                  <span className="p-1 rounded bg-zinc-800 text-zinc-400 group-hover:text-white shrink-0">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>

                {/* Animated Dropdown Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 text-zinc-450 border-t border-zinc-850 text-xs md:text-sm leading-relaxed text-zinc-400 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
