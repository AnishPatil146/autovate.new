import { Link } from 'react-router-dom';
import { Check, ShieldCheck, Sparkles, Building, CalendarCheck } from 'lucide-react';
import { SEOPage } from '../utils/seoHelper';
import GradientButton from '../components/ui/GradientButton';

export default function Pricing() {
  const bundles = [
    {
      name: 'Starter Stack',
      desc: 'Perfect for small businesses looking to automate their most critical manual processes.',
      priceText: 'Save 20%',
      priceSubtitle: 'Choose any 3 bots',
      badge: 'Most Popular',
      badgeType: 'popular',
      features: [
        'Select any 3 automation blueprints',
        'Pre-built blueprint configuration packages',
        'Video setup guides & checklists',
        'Standard setup helpline access',
        '3-Month updates for selected bots',
        'Save 20% off individual catalog pricing'
      ],
      ctaText: 'Discuss Starter Stack',
      ctaPath: '/consultation',
      borderClass: 'border-cardBorder hover:border-primary shadow-sm',
      tagColor: 'text-primary bg-primary/10 border-primary/20',
      priceColor: 'text-primary',
      btnGradient: 'from-primary to-secondary'
    },
    {
      name: 'Growth Pack',
      desc: 'Build comprehensive workflows that cross department lines and eliminate team friction.',
      priceText: 'Save 30%',
      priceSubtitle: 'Choose any 7 bots',
      badge: 'Best Value',
      badgeType: 'value',
      features: [
        'Select any 7 automation blueprints',
        'Pre-built blueprint configuration packages',
        'Detailed setup video playlists',
        'Priority Slack & email support',
        '3-Month updates for selected bots',
        'Save 30% off individual catalog pricing',
        'Bonus: Free Bot Setup Checklist PDF print-out'
      ],
      ctaText: 'Discuss Growth Pack',
      ctaPath: '/consultation',
      borderClass: 'border-cardBorder hover:border-quaternary md:scale-105 z-10 shadow-md',
      tagColor: 'text-quaternary bg-quaternary/10 border-quaternary/20',
      priceColor: 'text-quaternary',
      btnGradient: 'from-quaternary to-secondary'
    },
    {
      name: 'Full Arsenal',
      desc: 'Gain total industry leverage by deploying all automations in a single category suite.',
      priceText: 'Save 40%',
      priceSubtitle: 'All bots in one category',
      badge: 'Max Savings',
      badgeType: 'success',
      features: [
        'Unlock all bots in one industry category',
        'Pre-built blueprint configuration packages',
        'Detailed category setup guides',
        'Priority Slack & email support',
        '3-Month updates for all suite bots',
        'Save 40% off individual catalog pricing',
        'Bonus: 1-hour developer onboarding strategy call'
      ],
      ctaText: 'Discuss Full Category Stack',
      ctaPath: '/consultation',
      borderClass: 'border-cardBorder hover:border-secondary shadow-sm',
      tagColor: 'text-secondary bg-secondary/10 border-secondary/20',
      priceColor: 'text-secondary',
      btnGradient: 'from-primary to-quaternary'
    }
  ];

  const comparisonFeatures = [
    { name: 'Core bot blueprints', individual: '✓ One by one', bundle: '✓ 3 or 7 included', enterprise: '✓ Unlimited custom blueprints' },
    { name: 'Blueprint file formats', individual: 'Make, Zapier, n8n', bundle: 'Make, Zapier, n8n', enterprise: 'Tailored scripts, APIs, Node, Google API' },
    { name: 'Deploy tutorial videos', individual: '✓ Standard videos', bundle: '✓ Detailed playlists', enterprise: '✓ Custom screen-recording guides' },
    { name: 'Onboarding strategy call', individual: '—', bundle: '— (Growth/Arsenal gets bonus)', enterprise: '✓ Dedicated solution architect' },
    { name: 'Developer setup support', individual: '—', bundle: 'Optional add-on', enterprise: '✓ Included end-to-end integration' },
    { name: 'Discount rate margins', individual: 'Flat List Price', bundle: 'Save 20% to 40%', enterprise: 'Custom Contract Pricing' },
    { name: 'License updates scope', individual: '3-Month updates & support', bundle: '3-Month updates & support', enterprise: 'SLA Maintenance contract support' }
  ];

  return (
    <div className="min-h-screen pt-24 bg-card pb-20 text-bodyText font-sans antialiased">
      <SEOPage
        title="Pricing Plans & Bundles | Save Up To 40%"
        description="Save on AI automation deployments. Browse our Starter Stack, Growth Pack, or Full Category Arsenal bundles. Save up to 40%."
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-10 space-y-20">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-primary font-bold flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> High-volume discount stacks
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-headingText font-display leading-none uppercase">
            Affordable AI Bundles
          </h1>
          <p className="text-bodyText text-sm md:text-base leading-relaxed">
            Own the blueprints forever. Buy individual bots from the <Link to="/marketplace" className="text-primary hover:underline font-mono">Marketplace</Link> or scale your systems with our premium bundle packages.
          </p>
        </div>

        {/* Bundle Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 items-stretch">
          {bundles.map((bundle) => (
            <div
              key={bundle.name}
              className={`flex flex-col justify-between p-8 bg-card border rounded-2xl relative transition-all duration-300 hover:shadow-cardHover cursor-pointer ${bundle.borderClass}`}
            >
              {/* Badge */}
              <div className="absolute top-4 right-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold font-mono uppercase tracking-wide border ${bundle.tagColor}`}>
                  {bundle.badge}
                </span>
              </div>

              {/* Title & Price */}
              <div className="space-y-4 text-left">
                <h3 className="text-2xl font-bold font-display text-headingText uppercase">{bundle.name}</h3>
                <p className="text-bodyText text-xs leading-relaxed min-h-[36px]">
                  {bundle.desc}
                </p>
                <div className="py-2 border-y border-cardBorder">
                  <div className={`text-3xl font-bold font-mono ${bundle.priceColor}`}>{bundle.priceText}</div>
                  <span className="text-[10px] uppercase font-mono text-bodyText/70">{bundle.priceSubtitle}</span>
                </div>
              </div>

              {/* Features list */}
              <ul className="space-y-3.5 my-8 text-left flex-grow">
                {bundle.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-xs text-bodyText leading-relaxed">
                    <Check className="w-4 h-4 text-tertiary mr-2 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Action Button - Targets consultation scheduling page */}
              <GradientButton
                to="/consultation"
                size="sm"
                fullWidth
                icon={<CalendarCheck className="w-4 h-4" />}
                className="btn-shimmer"
              >
                {bundle.ctaText}
              </GradientButton>

            </div>
          ))}
        </div>

        {/* Enterprise Block */}
        <section className="bg-background border border-cardBorder rounded-2xl p-8 md:p-12 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-primary/3 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center text-primary space-x-2">
                <Building className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-widest font-bold">Enterprise operations</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-headingText font-display uppercase leading-tight">Need Tailored Bots & SLA Support?</h2>
              <p className="text-bodyText text-xs sm:text-sm leading-relaxed max-w-2xl">
                For organizations requiring custom workflow designs, deep internal database integrations, bespoke ML model training, or fully managed support SLA agreements.
              </p>
            </div>
            
            <div className="lg:col-span-4 text-center lg:text-right">
              <GradientButton
                to="/consultation"
                size="md"
              >
                Book Enterprise Audit Call
              </GradientButton>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="space-y-6 pt-6 text-left">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-headingText uppercase">Compare Plan Offerings</h3>
            <p className="text-xs sm:text-sm text-bodyText/80">Compare individual bot purchases, bundle licenses, and enterprise contract designs.</p>
          </div>

          <div className="overflow-x-auto no-scrollbar border border-cardBorder rounded-2xl bg-card">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-cardBorder text-bodyText/80 font-mono text-xs uppercase tracking-wider">
                  <th className="p-4 pl-6 font-medium">Deliverables & Features</th>
                  <th className="p-4 font-medium">Individual Bot</th>
                  <th className="p-4 font-medium text-primary">Bundle Pack</th>
                  <th className="p-4 pr-6 font-medium">Enterprise Custom</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] text-xs sm:text-sm text-bodyText">
                {comparisonFeatures.map((row, idx) => (
                  <tr key={idx} className="hover:bg-background transition-colors">
                    <td className="p-4 pl-6 font-medium text-headingText">{row.name}</td>
                    <td className="p-4 text-bodyText/80">{row.individual}</td>
                    <td className="p-4 text-primary font-medium">{row.bundle}</td>
                    <td className="p-4 pr-6 text-bodyText/80">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Micro Trust badges */}
        <div className="text-center pt-4 text-xs text-bodyText/80 font-mono flex flex-wrap justify-center gap-6">
          <span>✓ Guided Setup & Deployments</span>
          <span>✓ Secure Integration Protocols</span>
          <span>✓ 30-Day Setup Guarantee</span>
        </div>

      </div>
    </div>
  );
}
