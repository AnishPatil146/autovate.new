import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Briefcase, TrendingUp, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { SEOPage } from '../utils/seoHelper';

export default function CaseStudies() {
  const cases = [
    {
      title: 'How Koko Brands Recovered $12,800/mo in Abandoned Carts',
      company: 'Koko Brands (E-Commerce)',
      metric: '$12,800/mo',
      metricLabel: 'Recovered Sales',
      botName: 'Cart Recovery Loop',
      botSlug: 'cart-recovery-loop',
      problem: 'Koko Brands suffered from a 72% cart abandonment rate. Generic recovery emails were failing, landing in spam folders, or being ignored. The brand was leaving thousands in sales on the table every single week.',
      solution: 'Deployed the Cart Recovery Loop bot. The workflow hooks into Shopify. When a checkout is abandoned, the bot waits 30 minutes, generates a personalized 10% coupon code via Shopify, and delivers a WhatsApp message showing items remaining in the cart.',
      results: [
        'WhatsApp open rates reached 94%',
        'Recovered 22% of abandoned shopping carts',
        'Added $12,800 in high-margin monthly sales'
      ]
    },
    {
      title: 'Apex Legal Group Cut Contract Review Turnarounds by 80%',
      company: 'Apex Legal Partners (Law Firm)',
      metric: '80% Less',
      metricLabel: 'Review Time',
      botName: 'Contract Reviewer',
      botSlug: 'contract-reviewer',
      problem: 'Apex Legal spent hours of attorney billable time manually reviewing NDAs and vendor agreements. High-volume review cycles bottlenecked business negotiations, delayed signings, and burned out junior associates.',
      solution: 'Implemented the Contract Reviewer bot. Deployed on Google Drive + OpenAI API. Associates drop incoming agreements in a folder. The AI scans clauses, highlights missing guidelines, rates risk levels, and exports clean risk summaries.',
      results: [
        'Contract turnarounds dropped from 3 days to 45 seconds',
        'Junior associates reclaimed 18 hours/week',
        'Reduced client intake delays by 75%'
      ]
    },
    {
      title: 'How Shanti Yoga Studio Re-engaged 43 Members In 30 Days',
      company: 'Shanti Yoga Studios (Fitness Studio)',
      metric: '43 members',
      metricLabel: 'Recovered Churn',
      botName: 'Retention Re-engager',
      botSlug: 'retention-re-engager',
      problem: 'Shanti Yoga was bleeding recurring memberships. Members who stopped visiting the studio were ignored until they cancelled their plans. Manual tracking was impossible for the small front-desk staff.',
      solution: 'Deployed the Retention Re-engager bot. Connected to the studio scanner database. The bot audits scans nightly. If a member hasn\'t visited for 14 consecutive days, it triggers an automated, friendly check-in message on WhatsApp.',
      results: [
        'Recovered 43 inactive members in month one',
        'Saved $1,800/month in membership subscriptions',
        '95% of members praised the friendly check-in'
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-24 bg-background pb-20">
      <SEOPage
        title="Client Case Studies | Automation Results"
        description="Read how our clients saved thousands. Real case studies on Cart Recovery, Contract Review, and Gym Retention AI automations."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Direct operational numbers
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-headingText font-display leading-none">
            Proven Client Results
          </h1>
          <p className="text-bodyText text-sm md:text-base">
            No theories. No vague projections. Read how real business owners implemented our automated blueprints to reclaim time and slash overheads.
          </p>
        </div>

        {/* Case Studies Lists */}
        <div className="space-y-16">
          {cases.map((cs, idx) => (
            <div
              key={idx}
              className="bg-card border border-cardBorder rounded-3xl p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative overflow-hidden"
            >
              {/* Background gradient highlights */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

              {/* Left side: Results metrics */}
              <div className="lg:col-span-4 bg-background/60 border border-zinc-850 rounded-2xl p-6 text-center space-y-3 shrink-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-bodyText/70">Key Metric Saved</span>
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-primary leading-none">
                  {cs.metric}
                </div>
                <p className="text-xs uppercase tracking-wider font-mono text-zinc-450 font-bold">{cs.metricLabel}</p>
                
                <div className="h-px bg-zinc-800 my-4"></div>
                
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-mono text-zinc-550 block">Bot Blueprint Deployed</span>
                  <Link
                    to={`/bot/${cs.botSlug}`}
                    className="font-bold text-xs text-headingText font-display hover:text-primary transition-colors flex items-center justify-center"
                  >
                    {cs.botName} Blueprint <ArrowRight className="w-3.5 h-3.5 ml-1 text-primary shrink-0" />
                  </Link>
                </div>
              </div>

              {/* Right side: Problem & Solution text */}
              <div className="lg:col-span-8 text-left space-y-6">
                <div>
                  <span className="text-[10px] font-mono text-secondary uppercase tracking-widest block font-bold mb-1">
                    {cs.company}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-headingText font-display">
                    {cs.title}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold font-mono text-bodyText/70 uppercase">The Problem</h4>
                    <p className="text-bodyText text-xs sm:text-sm leading-relaxed">{cs.problem}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold font-mono text-bodyText/70 uppercase">The Deployment</h4>
                    <p className="text-bodyText text-xs sm:text-sm leading-relaxed">{cs.solution}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-zinc-850">
                  <h4 className="text-xs font-bold font-mono text-bodyText/70 uppercase">Measurable Results</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {cs.results.map((res, rIdx) => (
                      <li key={rIdx} className="flex items-start text-xs text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-tertiary mr-2 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Global Strategy Call Action Banner */}
        <section className="bg-gradient-to-r from-zinc-900 to-neutralDark border border-cardBorder rounded-3xl p-10 text-center space-y-6">
          <div className="space-y-2 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-headingText font-display">Replicate These Numbers In Your Business</h3>
            <p className="text-bodyText text-xs sm:text-sm">
              We design, configure, and connect custom AI automation swarms that integrate into your systems. Reclaim 20+ hours a week.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-black font-semibold rounded-full shadow-glow text-xs font-display uppercase tracking-wider"
          >
            Book Free strategy Call
          </Link>
        </section>

      </div>
    </div>
  );
}
