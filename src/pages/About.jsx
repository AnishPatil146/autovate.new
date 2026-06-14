import { Rocket } from 'lucide-react';
import { SEOPage } from '../utils/seoHelper';

export default function About() {
  const compTable = [
    { feature: 'Setup Costs', bot: 'One-Time Flat Fee ($29–$129)', agency: 'High Setup retainer ($2,500+)', va: 'Continuous hourly rates' },
    { feature: 'Deploy Timelines', bot: 'Same-day guided deployment (under 24h)', agency: 'Months of scoping & sprints', va: 'Weeks of screening & training' },
    { feature: 'Error Margin Rates', bot: 'Near 0% (governed by programmatic rules)', agency: 'Depends on developers', va: 'High error rates (manual fatigue)' },
    { feature: 'Availability Scope', bot: '24/7/365 uninterrupted runtime', agency: 'Standard business hours', va: 'Sick days, time-zones limits' },
    { feature: 'System Ownership', bot: '✓ 100% code ownership in your account', agency: 'Lock-in software/proprietary', va: 'Employee attrition risks' }
  ];

  const team = [
    { name: 'Alex Sterling', role: 'Founder & Automation Architect', bio: 'Former RevOps lead. Built 500+ visual templates before starting Autovate.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
    { name: 'Elena Vance', role: 'Lead Solutions Engineer', bio: 'AI integration specialist. Focuses on vector databases, OpenAI prompts, and Node endpoints.', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face' },
    { name: 'Marcus Brody', role: 'Customer Success lead', bio: 'Guides businesses through deploying blueprints. Oversees support tickets and custom projects.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }
  ];

  return (
    <div className="min-h-screen pt-24 bg-background pb-20">
      <SEOPage
        title="About Us & Story | Our Mission"
        description="Learn why we built the Autovate AI automation marketplace. Skip hiring expensive VAs or agencies — deploy pre-configured bots."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-24">
        
        {/* Origin Story Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
              Our Origin Story
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-headingText font-display leading-none">
              Born to Eliminate Operational Busywork
            </h1>
            <p className="text-bodyText text-sm sm:text-base leading-relaxed">
              We spent years consulting for businesses that were drowning in administrative overhead. We saw SDRs manually copy-pasting lead spreadsheets, support teams typing repetitive responses, and managers losing hours to booking conflicts.
            </p>
            <p className="text-bodyText text-sm sm:text-base leading-relaxed">
              Hiring agencies took months and cost thousands. Hiring VAs created coordination lag and training costs. We realized there had to be a better way: a marketplace of **ready-to-deploy AI automation templates** that businesses could own forever for a fraction of the cost.
            </p>
            
            <div className="pt-2">
              <div className="p-5 border-l-2 border-primary bg-primary/5 rounded-r-xl">
                <p className="text-xs sm:text-sm font-semibold tracking-tight text-headingText font-display">
                  Our Mission: Equip every business with the automation advantages of tech giants — without the developer salaries.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-neutralDark/40 border border-cardBorder rounded-3xl p-6 md:p-8 space-y-4 text-center">
            <Rocket className="w-10 h-10 text-primary mx-auto" />
            <h3 className="text-lg font-bold text-headingText font-display">Why Autovate?</h3>
            <p className="text-bodyText text-xs leading-relaxed">
              We build visual, drag-and-drop templates so you are never locked into custom proprietary code. If your business changes, you just click and adjust the modules yourself.
            </p>
            <div className="text-[10px] font-mono text-bodyText/70 pt-2 border-t border-zinc-850">
              70+ Bots | 15 Industries | 10K+ Purchases
            </div>
          </div>

        </div>

        {/* Comparison Section (Bots vs Agency vs VA) */}
        <section className="space-y-6 text-left">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-headingText">Bot vs Agency vs VA</h3>
            <p className="text-xs sm:text-sm text-bodyText/70">Compare the metrics of templates against traditional agency retainer hires or manual VAs.</p>
          </div>

          <div className="overflow-x-auto no-scrollbar border border-zinc-850 rounded-2xl bg-card">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-cardBorder text-bodyText font-mono text-xs uppercase tracking-wider">
                  <th className="p-4 pl-6 font-medium">Metric & Overhead</th>
                  <th className="p-4 font-medium text-primary">Autovate Bots</th>
                  <th className="p-4 font-medium">Agency Setup</th>
                  <th className="p-4 pr-6 font-medium">Hiring VAs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80 text-xs sm:text-sm text-zinc-300">
                {compTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-card/30 transition-colors">
                    <td className="p-4 pl-6 font-medium text-headingText">{row.feature}</td>
                    <td className="p-4 text-primary font-semibold">{row.bot}</td>
                    <td className="p-4 text-bodyText">{row.agency}</td>
                    <td className="p-4 pr-6 text-bodyText">{row.va}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Integration ecosystem list */}
        <section className="space-y-6 text-center max-w-4xl mx-auto">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-headingText">Our Technology Ecosystem</h3>
            <p className="text-xs sm:text-sm text-bodyText/70">We build on industry-leading, secure, visual cloud platforms.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {['Make.com', 'Zapier', 'n8n.io', 'OpenAI API', 'Bland.ai', 'HubSpot API', 'Stripe Payments', 'WhatsApp API'].map((tech) => (
              <span key={tech} className="px-5 py-3 bg-card border border-cardBorder rounded-xl font-mono text-xs text-bodyText uppercase tracking-wider font-semibold hover:border-primary/20 hover:text-headingText transition-all cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="space-y-8 text-left">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-headingText">Our Solution Architects</h3>
            <p className="text-xs sm:text-sm text-bodyText/70">The automation engineers behind the Autovate templates catalog.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((t) => (
              <div key={t.name} className="bg-card border border-cardBorder rounded-2xl p-6 space-y-4 group hover:border-primary/10 transition-colors">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-16 h-16 rounded-full border border-primary/20 object-cover"
                />
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-headingText font-display group-hover:text-primary transition-colors">{t.name}</h4>
                  <p className="text-[10px] font-mono text-zinc-550 text-bodyText/70 uppercase">{t.role}</p>
                </div>
                <p className="text-bodyText text-xs leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
