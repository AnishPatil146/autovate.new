import React from 'react';
import { BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { SEOPage } from '../utils/seoHelper';
import { Link } from 'react-router-dom';

export default function Blog() {
  const articles = [
    {
      title: 'How a $39 Bot Replaced Our $3,000/Month VA',
      desc: 'Inside the exact workflow we built to automate lead collection, cleaning, and CRM syncing. Why human VAs fail on data speed.',
      category: 'Case Study',
      readTime: '6 min read',
      img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'The 7 Automations Every SaaS Needs Before Hiring',
      desc: 'Before scaling support rep or SDR count, deploy these 7 automated loops to increase customer retention and reduce onboarding drop-offs.',
      category: 'SaaS Strategy',
      readTime: '8 min read',
      img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'WhatsApp AI Bots: The Unfair Advantage SMBs Are Using',
      desc: 'Why chat support beats standard contact forms every day. How small businesses use WhatsApp vision AI to qualify leads 24/7.',
      category: 'Chat Agents',
      readTime: '5 min read',
      img: 'https://images.unsplash.com/photo-1520607117400-5753375b9b78?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'How to Deploy Your First Make.com Bot in 15 Minutes',
      desc: 'Step-by-step visual blueprint deploy tutorial. How to configure connections, paste OpenAI keys, and run test queries without code.',
      category: 'Tutorials',
      readTime: '7 min read',
      img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Finance Automation 101: Save 10 Hours/Week',
      desc: 'Stop copying billing lines manually. Learn how invoice parsers extract ledger data and sync items with QuickBooks automatically.',
      category: 'Finance Systems',
      readTime: '9 min read',
      img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80'
    },
    {
      title: 'Why 80% of Gym Members Churn (And How to Stop It)',
      desc: 'The science of local business client retention. How simple check-in triggers and comeback offers save gym membership cancellations.',
      category: 'Gym Operations',
      readTime: '5 min read',
      img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div className="min-h-screen pt-24 bg-background pb-20">
      <SEOPage
        title="Resources & Blog | AI Automation Guides"
        description="Read our latest guides on business automation. Learn how to deploy AI bots on Make, reduce churn, and scale operations."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Operations knowledgebase
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white font-display leading-none">
            Automation Resource Hub
          </h1>
          <p className="text-zinc-400 text-sm md:text-base">
            Detailed guides, code setup reviews, client case stories, and strategy tips to help you eliminate operational busywork.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <article
              key={idx}
              className="flex flex-col justify-between bg-card border border-zinc-900 rounded-2xl overflow-hidden group hover:border-primary/15 transition-all duration-300"
            >
              {/* Image Header */}
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-950">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300 opacity-60 group-hover:opacity-80"
                />
                
                {/* Category Pill Tag */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wide bg-zinc-950/85 border border-zinc-800 text-primary">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Text content block */}
              <div className="p-6 flex-grow space-y-3 text-left">
                
                <div className="flex items-center space-x-2 text-[10px] text-zinc-500 font-mono">
                  <Clock className="w-3.5 h-3.5 text-zinc-650" />
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white font-display group-hover:text-primary transition-colors pr-2">
                  {article.title}
                </h3>
                
                <p className="text-zinc-400 text-xs leading-relaxed line-clamp-3">
                  {article.desc}
                </p>
              </div>

              {/* Link Footer */}
              <div className="p-6 pt-0 border-t border-zinc-850/80 mt-4 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Guides</span>
                <Link
                  to="/blog"
                  className="inline-flex items-center text-xs text-primary hover:underline font-mono uppercase tracking-wider group"
                >
                  Read Article <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
