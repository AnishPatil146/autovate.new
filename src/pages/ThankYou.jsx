import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import productsData from '../data/products.json';
import { SEOPage } from '../utils/seoHelper';
import BotCard from '../components/ui/BotCard';
import QuickViewModal from '../components/ui/QuickViewModal';
import { CheckCircle2, MessageSquare } from 'lucide-react';
import { useCheckout } from '../context/CheckoutContext';

export default function ThankYou() {
  const [searchParams] = useSearchParams();
  const botName = searchParams.get('bot') || 'AI Bot Blueprint';
  const botPrice = searchParams.get('price') || '49';
  const { triggerCheckout } = useCheckout();
  
  const [selectedBot, setSelectedBot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pick 3 popular bots as upsells (excluding the one just bought if possible)
  const upsells = productsData
    .filter(b => b.name !== botName)
    .sort((a, b) => b.reviewsCount - a.reviewsCount)
    .slice(0, 3);

  const handleQuickView = (bot) => {
    setSelectedBot(bot);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen pt-24 bg-background pb-20">
      <SEOPage
        title="Order Confirmed | Welcome to Autovate"
        description="Your order is confirmed! Download your AI automation files and blueprints and deploy in under 15 minutes."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* Success Block */}
        <div className="bg-card border border-primary/20 rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-glow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>

          <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">ORDER COMPLETED</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display leading-none">
              Your Setup Files Are Ready
            </h1>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Thank you for purchasing the <span className="text-white font-bold">{botName} (${botPrice})</span>. The blueprints, API connectors, and video configuration checklists have been dispatched to your email.
            </p>
          </div>

          <div className="h-px bg-zinc-800 max-w-md mx-auto"></div>

          {/* Discord CTA */}
          <div className="max-w-sm mx-auto p-4 bg-zinc-950/60 border border-zinc-900 rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3 text-left">
              <MessageSquare className="w-5 h-5 text-primary shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-white font-display">Join Customer Discord</h4>
                <p className="text-[9px] text-zinc-550 text-zinc-550 text-zinc-500">2,400+ automation developers</p>
              </div>
            </div>
            
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-800 text-[10px] font-mono uppercase tracking-wider text-primary rounded-lg hover:bg-zinc-850"
            >
              Join
            </a>
          </div>

        </div>

        {/* 3 Next Steps to Go Live */}
        <section className="space-y-6 text-left">
          <div className="space-y-2 border-b border-zinc-900 pb-4 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">Next Steps to Go Live</h3>
            <p className="text-xs sm:text-sm text-zinc-500">Follow these 3 actions to deploy your bot blueprint in under 15 minutes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-card border border-zinc-900 p-6 rounded-2xl space-y-3">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-xs text-primary font-bold">1</span>
                <h4 className="font-bold text-white font-display text-xs">Verify Email Inbox</h4>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Open the confirmation email from Autovate. It contains your download links for the blueprints (.json or .zip format).
              </p>
            </div>

            <div className="bg-card border border-zinc-900 p-6 rounded-2xl space-y-3">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-xs text-primary font-bold">2</span>
                <h4 className="font-bold text-white font-display text-xs">Import configuration File</h4>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Log into Make.com or Zapier. Select 'Import Blueprint' and load the downloaded file. It maps all nodes automatically.
              </p>
            </div>

            <div className="bg-card border border-zinc-900 p-6 rounded-2xl space-y-3">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-xs text-primary font-bold">3</span>
                <h4 className="font-bold text-white font-display text-xs">Paste API Keys & Connect</h4>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Open the variables tab. Paste your API keys (like OpenAI or Twilio) into the labeled fields. Hit run to start automating.
              </p>
            </div>

          </div>
        </section>

        {/* Recommended Stack Additions (Upsell Grid) */}
        <section className="space-y-6">
          <div className="text-left space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">Recommended Stack Additions</h3>
            <p className="text-xs sm:text-sm text-zinc-500">Deploy these complementary blueprints to further scale your operations.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upsells.map((upsellBot) => (
              <BotCard
                key={upsellBot.id}
                bot={upsellBot}
                onQuickView={handleQuickView}
                onBuy={triggerCheckout}
              />
            ))}
          </div>
        </section>

      </div>

      {/* Detail Overlay modal */}
      <QuickViewModal
        bot={selectedBot}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBuy={(b) => {
          setIsModalOpen(false);
          triggerCheckout(b);
        }}
      />

    </div>
  );
}
