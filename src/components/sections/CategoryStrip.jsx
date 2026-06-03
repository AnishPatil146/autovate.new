import React from 'react';
import { Link } from 'react-router-dom';
import categoriesData from '../../data/categories.json';
import * as Icons from 'lucide-react';

export default function CategoryStrip() {
  return (
    <section className="py-8 bg-zinc-950/40 border-b border-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Strip Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            Browse by industry stack
          </span>
          <Link to="/marketplace" className="text-xs text-primary hover:underline font-mono">
            View All 15 Categories &gt;
          </Link>
        </div>

        {/* Scroll Container */}
        <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar pb-3 -mx-4 px-4 sm:mx-0 sm:px-0">
          
          {/* Static All Pill */}
          <Link
            to="/marketplace"
            className="flex items-center px-5 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-primary/45 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all font-display"
          >
            All Solutions
          </Link>

          {/* Dynamic Categories */}
          {categoriesData.map((cat) => {
            // Dynamically load Lucide Icon if it exists, default to Cpu
            const IconComponent = Icons[cat.icon] || Icons.Cpu;
            
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="flex items-center px-4.5 py-2.5 bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 hover:text-primary hover:border-primary/30 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all font-display hover:shadow-glow/5"
              >
                <IconComponent className="w-3.5 h-3.5 mr-2 text-zinc-500 group-hover:text-primary shrink-0" />
                {cat.name}
              </Link>
            );
          })}

        </div>

      </div>
    </section>
  );
}
