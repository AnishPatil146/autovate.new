import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import productsData from '../data/products.json';
import { SEOPage } from '../utils/seoHelper';
import BotCard from '../components/ui/BotCard';
import QuickViewModal from '../components/ui/QuickViewModal';
import { Search, ArrowRight } from 'lucide-react';
import { useCheckout } from '../context/CheckoutContext';

export default function NotFound() {
  const navigate = useNavigate();
  const { triggerCheckout } = useCheckout();
  const [searchInput, setSearchInput] = useState('');
  const [selectedBot, setSelectedBot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sort and slice top 3 popular bots
  const popularBots = [...productsData]
    .sort((a, b) => b.reviewsCount - a.reviewsCount)
    .slice(0, 3);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() === '') return;
    navigate(`/marketplace?q=${encodeURIComponent(searchInput.trim())}`);
  };

  const handleQuickView = (bot) => {
    setSelectedBot(bot);
    setIsModalOpen(true);
  };

  const handleBuy = (bot) => {
    triggerCheckout(bot);
  };

  return (
    <div className="min-h-screen pt-24 bg-background pb-20">
      <SEOPage
        title="404 - Blueprint Not Found"
        description="We couldn't locate this page. Search our marketplace of 70+ AI automation bots instead."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* Not Found Block */}
        <div className="bg-card border border-primary/10 rounded-3xl p-10 md:p-14 text-center space-y-6 max-w-2xl mx-auto relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>

          <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary border border-primary/20 font-mono text-xl font-bold">
            404
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-headingText font-display">
              Automation Node Disconnected
            </h1>
            <p className="text-bodyText text-xs sm:text-sm">
              We couldn't find the page you are looking for. The node URL might be broken, or the page has moved.
            </p>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-bodyText/70 w-4 h-4" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search 70+ automation bots..."
              className="w-full pl-11 pr-24 py-3.5 bg-card border border-cardBorder rounded-full focus:outline-none focus:border-primary text-sm text-headingText placeholder-zinc-500 transition-colors"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary text-black font-semibold text-xs rounded-full"
            >
              Search
            </button>
          </form>

          <div className="pt-2">
            <Link
              to="/marketplace"
              className="inline-flex items-center text-xs text-primary hover:underline font-mono uppercase tracking-wider group"
            >
              Browse Full Catalog <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>

        {/* Most Popular Upsell */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-headingText">Featured Marketplace Stacks</h3>
            <p className="text-xs sm:text-sm text-bodyText/70">Deploy our highest rated, verified automation bots.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularBots.map((popBot) => (
              <BotCard
                key={popBot.id}
                bot={popBot}
                onQuickView={handleQuickView}
                onBuy={handleBuy}
              />
            ))}
          </div>
        </section>

      </div>

      {/* Detail Overlay Modal */}
      <QuickViewModal
        bot={selectedBot}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBuy={handleBuy}
      />

    </div>
  );
}
