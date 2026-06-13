import React from 'react';
import { Star, MessageSquareCode } from 'lucide-react';

export default function SocialProofTicker() {
  const snippets = [
    { text: "Cart Recovery Loop recovered $12K/month in abandoned sales!", author: "Shopify Owner" },
    { text: "Contract Reviewer bot cut review turnaround times by 80%", author: "Legal Partner" },
    { text: "Retention Re-engager recovered 43 inactive gym members", author: "Yoga Studio" },
    { text: "WhatsApp AI Bot reduced ticket backlogs to zero instantly", author: "SaaS VP of Support" },
    { text: "AI Voice Caller booked 24 discovery calls in under 5 days", author: "B2B Founder" },
    { text: "Meeting Intel saved our project management team 4 hours/week", author: "Agile PM Lead" },
    { text: "Invoice Processor eliminated invoice data entry errors", author: "Financial CFO" },
    { text: "B2B Scraper generated 400 clean leads in our first week!", author: "Sales Director" }
  ];

  // Duplicate items to ensure a seamless looping effect
  const doubleSnippets = [...snippets, ...snippets];

  return (
<<<<<<< HEAD
    <div className="bg-zinc-950/60 border-y border-zinc-900/60 py-4.5 overflow-hidden animate-marquee-hover-pause">
=======
    <div className="bg-background/60 border-y border-cardBorder/60 py-4.5 overflow-hidden animate-marquee-hover-pause">
>>>>>>> 7c7a27fe6b08e8e9b9a8c72288108a8a9639bc98
      <div className="animate-marquee flex items-center space-x-12">
        {doubleSnippets.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-3 shrink-0">
            {/* Star icons */}
            <div className="flex space-x-0.5 text-yellow-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>

            {/* Quote text */}
<<<<<<< HEAD
            <span className="text-xs md:text-sm font-semibold tracking-tight text-white">
=======
            <span className="text-xs md:text-sm font-semibold tracking-tight text-headingText">
>>>>>>> 7c7a27fe6b08e8e9b9a8c72288108a8a9639bc98
              "{item.text}"
            </span>

            {/* Separator / author */}
            <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full uppercase">
              {item.author}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
