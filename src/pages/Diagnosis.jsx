import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Check, ArrowRight, ChevronLeft, Brain, Zap, Clock, RefreshCw, MessageSquare
} from 'lucide-react';
import { SEOPage } from '../utils/seoHelper';
import ROICalculator from '../components/ui/ROICalculator';

const questions = [
  {
    id: 'industry',
    step: 'Step 1 of 6',
    text: 'What type of business do you run?',
    sub: 'This helps us recommend the most relevant automations for your industry.',
    type: 'single',
    options: [
      { label: 'Retail / FMCG / Distribution' },
      { label: 'Healthcare / Clinic / Wellness' },
      { label: 'Real estate / Construction' },
      { label: 'Education / Coaching / Training' },
      { label: 'Food & Beverage / Restaurant' },
      { label: 'Services / Consulting / Agency' },
      { label: 'E-commerce / D2C Brand' },
      { label: 'Manufacturing / B2B' },
    ]
  },
  {
    id: 'teamSize',
    step: 'Step 2 of 6',
    text: 'How big is your team?',
    sub: 'We tailor automation complexity to your team size.',
    type: 'single',
    options: [
      { label: 'Just me (solo)' },
      { label: '2–10 people' },
      { label: '11–50 people' },
      { label: '50+ people' },
    ]
  },
  {
    id: 'painPoints',
    step: 'Step 3 of 6',
    text: 'What are your biggest pain points?',
    sub: 'Select all that apply — this shapes the priority level of our recommendations.',
    type: 'multi',
    options: [
      { label: 'Leads fall through the cracks' },
      { label: 'Too much manual / repetitive work' },
      { label: 'Late payments & invoice chasing' },
      { label: 'Missed follow-ups with customers' },
      { label: 'Reaching customers is slow & expensive' },
      { label: 'Poor customer support response time' },
      { label: 'No visibility on leads and sales pipeline' },
      { label: 'Team not aligned or slow to respond' },
    ]
  },
  {
    id: 'currentTools',
    step: 'Step 4 of 6',
    text: 'What tools do you currently use?',
    sub: 'We integrate with everything — this helps us recommend the best connection.',
    type: 'multi',
    options: [
      { label: 'WhatsApp Business' },
      { label: 'Excel / Google Sheets' },
      { label: 'A CRM (HubSpot, Zoho, etc.)' },
      { label: 'Shopify / WooCommerce' },
      { label: 'Instagram / Facebook Ads' },
      { label: 'Email tools (Mailchimp, etc.)' },
      { label: 'None — managing manually' },
      { label: 'Custom / other tools' },
    ]
  },
  {
    id: 'monthlyLeads',
    step: 'Step 5 of 6',
    text: 'How many leads or customers do you handle monthly?',
    sub: 'This helps us estimate your time savings and ROI from automation.',
    type: 'single',
    options: [
      { label: 'Less than 50' },
      { label: '50 – 200' },
      { label: '200 – 500' },
      { label: '500 – 2,000' },
      { label: '2,000+' },
    ]
  },
  {
    id: 'goal',
    step: 'Step 6 of 6',
    text: 'What is your #1 goal right now?',
    sub: 'Be specific — this shapes the entire recommendation.',
    type: 'single',
    options: [
      { label: 'Increase revenue & close more deals' },
      { label: 'Save time — reduce manual work' },
      { label: 'Improve customer experience & retention' },
      { label: 'Grow faster — reach more customers' },
      { label: 'Fix operations — reduce errors & delays' },
      { label: 'Get visibility — know what\'s happening' },
    ]
  }
];

export default function Diagnosis() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryHours = searchParams.get('hours');
  const queryRate = searchParams.get('rate');

  const [currentQ, setCurrentQ] = useState(() => {
    // Start directly on Step 1 (index 0) if we have custom query variables
    return (queryHours && queryRate) ? 0 : -1;
  });
  const [answers, setAnswers] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  // Sync state with search params during render instead of in useEffect
  const [prevParams, setPrevParams] = useState({ hours: queryHours, rate: queryRate });
  if (queryHours !== prevParams.hours || queryRate !== prevParams.rate) {
    setPrevParams({ hours: queryHours, rate: queryRate });
    if (queryHours && queryRate) {
      setCurrentQ(0);
    }
  }

  const startDiagnosis = () => {
    setCurrentQ(0);
    setAnswers({});
    setResult(null);
  };

  const handleRestart = () => {
    setSearchParams({});
    setCurrentQ(-1);
    setAnswers({});
    setResult(null);
  };

  const handleSelect = (qId, val, isMulti) => {
    if (isMulti) {
      const currentVals = answers[qId] || [];
      if (currentVals.includes(val)) {
        setAnswers({ ...answers, [qId]: currentVals.filter(v => v !== val) });
      } else {
        setAnswers({ ...answers, [qId]: [...currentVals, val] });
      }
    } else {
      setAnswers({ ...answers, [qId]: val });
    }
  };

  const goBack = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    } else {
      setCurrentQ(-1);
    }
  };

  const goNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      runAnalysis();
    }
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentQ(questions.length); // loading state index

    setTimeout(() => {
      calculateDiagnosis();
      setIsAnalyzing(false);
    }, 2000);
  };

  const calculateDiagnosis = () => {
    const pain = answers.painPoints || [];
    const goal = answers.goal || '';
    const industry = answers.industry || '';
    const teamSize = answers.teamSize || '';
    const monthlyLeads = answers.monthlyLeads || '';

    // 1. DYNAMIC ROI RANGES SPLIT CALCULATOR
    let baseHoursPerWeek = 10;
    let teamMultiplier;
    let leadFactor;

    // Splitting team size ranges
    switch (teamSize) {
      case 'Just me (solo)':
        baseHoursPerWeek = 12;
        teamMultiplier = 1.0;
        break;
      case '2–10 people':
        baseHoursPerWeek = 8;
        teamMultiplier = 4.0; // average 4 employees saving time
        break;
      case '11–50 people':
        baseHoursPerWeek = 6;
        teamMultiplier = 18.0; // average 18 employees saving time
        break;
      case '50+ people':
        baseHoursPerWeek = 5;
        teamMultiplier = 55.0; // average 55 employees saving time
        break;
      default:
        teamMultiplier = 1.0;
    }

    // Splitting monthly lead count ranges
    switch (monthlyLeads) {
      case 'Less than 50':
        leadFactor = 0.5;
        break;
      case '50 – 200':
        leadFactor = 1.0;
        break;
      case '200 – 500':
        leadFactor = 1.6;
        break;
      case '500 – 2,000':
        leadFactor = 2.4;
        break;
      case '2,000+':
        leadFactor = 3.8;
        break;
      default:
        leadFactor = 1.0;
    }

    // Adjusting based on complexity factors (pain points and goal focus)
    let painMultiplier = 1.0;
    if (pain.includes('Too much manual / repetitive work')) painMultiplier += 0.25;
    if (pain.includes('Late payments & invoice chasing')) painMultiplier += 0.15;
    if (pain.includes('Poor customer support response time')) painMultiplier += 0.2;

    // Connect custom parameters from the ROI Calculator if available
    const hasCustomROI = !!(queryHours && queryRate);
    const customHours = queryHours ? Number(queryHours) : null;
    const customRate = queryRate ? Number(queryRate) : null;

    const totalHoursSaved = customHours || Math.min(
      Math.round(baseHoursPerWeek * teamMultiplier * leadFactor * painMultiplier),
      500 // cap maximum weekly hours saved at a realistic enterprise level
    );

    const laborRate = customRate || 22; // Average blended hourly employee cost in dollars
    const monthlySavings = Math.round(totalHoursSaved * 4.33 * laborRate);

    const speedupMultiplier = Math.round(6 + leadFactor * 4); // 6x to 22x faster follow-up
    const goLiveDays = (teamSize === '11–50 people' || teamSize === '50+ people') ? '5–7 days' : '3–5 days';

    // 2. DYNAMIC SOLUTIONS RECOMMENDATION MATRIX
    const recommendedList = [];

    // Check rules to add matching automations
    if (pain.includes('Leads fall through the cracks') || goal.includes('revenue') || goal.includes('Grow')) {
      recommendedList.push({
        rank: 1,
        name: 'Lead Generation Bot',
        priority: 'High',
        color: '#005CEB', // Cyan
        emoji: '🎯',
        why: `Your goal is to scale revenue, but manual follow-up leads to lost deals. This bot qualifies prospects via WhatsApp in real time 24/7.`,
        impact: ['Instant Lead Capture', 'Auto CRM Sync', 'Zero Lead Bleeding'],
        steps: ['Prospect clicks ad or message widget', 'AI bot qualifies lead and captures details', 'Hot leads forwarded directly to sales reps']
      });
    }

    if (pain.includes('Late payments & invoice chasing')) {
      recommendedList.push({
        rank: recommendedList.length + 1,
        name: 'Payment Reminders Bot',
        priority: 'High',
        color: '#8B5CF6', // Purple
        emoji: '💳',
        why: `Chasing manual invoices is causing cash flow friction. We'll set up automated WhatsApp billing alerts synchronized directly with your accounts ledger.`,
        impact: ['Recover Cash 48% Faster', 'Zero Chasing Overhead', 'Friendly WhatsApp Escalation'],
        steps: ['Invoice generated in accounting tool', 'System schedules reminders on WhatsApp', 'Bot offers quick UPI payment links directly']
      });
    }

    if (pain.includes('Poor customer support response time') || pain.includes('Reaching customers is slow')) {
      recommendedList.push({
        rank: recommendedList.length + 1,
        name: 'Customer Support Bot',
        priority: 'High',
        color: '#34A853', // Emerald
        emoji: '💬',
        why: `Slow support response kills retention. Setting up an official WhatsApp API support engine will resolve 70% of support tickets instantly without human friction.`,
        impact: ['Cut Response Times to 0', '24/7 FAQ Auto-Replies', 'Instant Agent Handoff'],
        steps: ['Customer asks queries on WhatsApp', 'AI bot responds instantly matching training', 'Complex queries routed to human live chat']
      });
    }

    if (pain.includes('Missed follow-ups with customers') || goal.includes('Improve customer experience')) {
      recommendedList.push({
        rank: recommendedList.length + 1,
        name: 'Follow-up Drip Sequence',
        priority: 'Medium',
        color: '#005CEB', // Indigo
        emoji: '📬',
        why: `Inconsistent follow-ups lead to cold prospects. We will deploy automated WhatsApp sequence flows triggered immediately after initial interactions.`,
        impact: ['Structured Multi-Touch Flows', 'Higher Close Rates', 'Personalized Timing'],
        steps: ['Lead gets marked as interested', 'Drip system schedules follow-ups (D1, D3, D7)', 'Customer replies automatically halt sequence']
      });
    }

    // Default Fallbacks if list is short
    if (recommendedList.length < 3) {
      recommendedList.push({
        rank: recommendedList.length + 1,
        name: 'CRM Workflow Automation',
        priority: 'Medium',
        color: '#8B5CF6', // Purple
        emoji: '⚙️',
        why: `Eliminate spreadsheets. We will connect your forms, WhatsApp chats, and client info directly to a central CRM to build absolute operational transparency.`,
        impact: ['No Spreadsheet Admin', 'Automatic Lead Assignment', 'Clear Pipeline Visuals'],
        steps: ['Contact details hit database', 'Lead is dynamically assigned to sales reps', 'Automated check-in task logged for team']
      });
    }

    if (recommendedList.length < 3) {
      recommendedList.push({
        rank: recommendedList.length + 1,
        name: 'Appointment Booking Automation',
        priority: 'Medium',
        color: '#34A853', // Purple
        emoji: '📅',
        why: `Booking back-and-forth is causing lead friction. Connecting Google Calendar/Calendly with instant WhatsApp reminders will save hours of scheduling admin weekly.`,
        impact: ['Self-Serve Bookings', 'No-Show Rate Cut by 60%', 'Dynamic Slot Management'],
        steps: ['User gets personalized booking link', 'User picks convenient slot on calendar', 'WhatsApp reminds user 2 hours before slot']
      });
    }

    // Sort to rank 1, 2, 3
    const finalRecommendations = recommendedList.slice(0, 3).map((rec, i) => ({
      ...rec,
      rank: i + 1
    }));

    setResult({
      headline: totalHoursSaved > 40 ? 'Massive Automation Potential Identified' : 'High Operational Efficiency Opportunity',
      summary: `Your team size (${teamSize}) and lead volume (${monthlyLeads}) show that manual bottlenecks are holding back growth. Automating these workflows will reclaim valuable productive hours and scale conversions.`,
      automations: finalRecommendations,
      timeline: [
        { week: 'Week 1', text: '<strong>Design & Map</strong> — We map out your custom automation blueprints and configure visual variables.' },
        { week: 'Week 2', text: '<strong>Build & Integrate</strong> — Connect APIs, WhatsApp gateways, and CRM hooks in sandbox environments.' },
        { week: 'Week 3', text: '<strong>Test & Go Live</strong> — Complete testing cycles, launch the flows, and train your staff.' }
      ],
      roi: [
        { value: `${totalHoursSaved} hrs`, label: 'saved per week', color: '#005CEB' },
        { value: `${speedupMultiplier}x`, label: 'faster lead contact', color: '#34A853' },
        { value: `$${monthlySavings.toLocaleString()}`, label: 'monthly capital saved', color: '#8B5CF6' },
        { value: goLiveDays, label: 'time to go live', color: '#005CEB' }
      ],
      hasCustomROI,
      whatsappMessage: `Hi Autovate! I just completed the business diagnosis quiz.
Recommendations: ${finalRecommendations.map(r => r.name).join(', ')}
Industry: ${industry}
Team Size: ${teamSize}
Monthly Leads: ${monthlyLeads}
Estimated Weekly Savings: ${totalHoursSaved} hours ($${monthlySavings.toLocaleString()}/mo)${hasCustomROI ? ` (Calibrated via ROI Calculator using ${queryHours} hrs @ $${queryRate}/hr)` : ''}
Can we schedule a strategy call?`
    });
  };

  const isAnswered = (q) => {
    if (q.type === 'multi') {
      return (answers[q.id] || []).length > 0;
    }
    return !!answers[q.id];
  };

  return (
    <div className="min-h-screen pt-24 bg-card pb-20 text-bodyText font-sans antialiased relative overflow-hidden">
      <SEOPage
        title="Business Automation Diagnosis | Autovate"
        description="Take our quick 2-minute diagnostic questionnaire to calculate your exact ROI potential and receive personalized AI automation blueprint advice."
      />

      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-orange-500/3 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 relative z-10">
        
        {/* HERO HEADER */}
        {currentQ < questions.length && (
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-primary font-bold flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> AI Diagnostic Assistant
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-headingText font-display leading-none uppercase">
              Find Your Perfect <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-indigo-400">Automation Plan</span>
            </h1>
            <p className="text-bodyText text-sm sm:text-base leading-relaxed">
              Answer 6 quick questions. Our simulation engine will diagnose exactly which automations you need, compute your estimated weekly ROI, and draft a timeline.
            </p>
          </div>
        )}

        {/* STEPPER PROGRESS */}
        {currentQ >= 0 && currentQ < questions.length && (
          <div className="max-w-2xl mx-auto mb-8 bg-[#0c0c0c] border border-cardBorder rounded-xl p-4">
            <div className="flex justify-between items-center text-xs font-mono font-bold text-bodyText/70 mb-2">
              <span>QUESTION {currentQ + 1} OF {questions.length}</span>
              <span className="text-primary">{Math.round((currentQ / questions.length) * 100)}% COMPLETE</span>
            </div>
            <div className="w-full h-1.5 bg-card rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 rounded-full"
                style={{ width: `${(currentQ / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Calibration Banner */}
        {currentQ >= 0 && currentQ < questions.length && queryHours && queryRate && (
          <div className="max-w-2xl mx-auto mb-6 bg-primary/10 border border-primary/20 text-primary py-2 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 font-mono">
            <Zap className="w-4 h-4 text-secondary fill-current animate-pulse shrink-0" />
            <span>ROI Calibration Active: Using {queryHours} hrs wasted/wk @ ${queryRate}/hr</span>
          </div>
        )}

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            
            {/* -1: START SCREEN */}
            {currentQ === -1 && (
              <div className="space-y-8">
                <motion.div
                  key="start"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-[#0c0c0c] border border-cardBorder rounded-2xl p-8 text-center space-y-6 shadow-xl"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto shadow-glow">
                    <Brain className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold uppercase tracking-tight text-headingText font-display">Begin Your Operations Assessment</h2>
                    <p className="text-bodyText text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                      No sign-up or phone numbers required. Instant simulation results calculated based on target business volume and labor variables.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-left">
                    <div className="bg-[#111] border border-cardBorder p-3.5 rounded-xl space-y-1.5">
                      <Clock className="w-4 h-4 text-primary" />
                      <h4 className="text-[10px] font-mono font-bold uppercase text-headingText">2 Min Quiz</h4>
                      <p className="text-[9px] text-bodyText/70">Short operational filters</p>
                    </div>
                    <div className="bg-[#111] border border-cardBorder p-3.5 rounded-xl space-y-1.5">
                      <Zap className="w-4 h-4 text-orange-400" />
                      <h4 className="text-[10px] font-mono font-bold uppercase text-headingText">ROI Calculator</h4>
                      <p className="text-[9px] text-bodyText/70">Dynamic hours split saving</p>
                    </div>
                    <div className="bg-[#111] border border-cardBorder p-3.5 rounded-xl space-y-1.5">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <h4 className="text-[10px] font-mono font-bold uppercase text-headingText">Custom Roadmap</h4>
                      <p className="text-[9px] text-bodyText/70">Structured go-live timeline</p>
                    </div>
                  </div>

                  <button
                    onClick={startDiagnosis}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-glowSecondary transition-all btn-shimmer"
                  >
                    Start Free Diagnosis <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </motion.div>

                {/* Embedded ROI Calculator for Calibration */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="space-y-4"
                >
                  <div className="text-center">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-bodyText/70 uppercase font-bold">
                      Or Calibrate ROI Inputs First
                    </span>
                  </div>
                  <ROICalculator />
                </motion.div>
              </div>
            )}

            {/* QUESTIONS RENDERING */}
            {currentQ >= 0 && currentQ < questions.length && (
              <motion.div
                key={`q-${currentQ}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="bg-[#0c0c0c] border border-cardBorder rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl text-left"
              >
                <div>
                  <span className="text-[9px] font-mono font-bold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                    {questions[currentQ].step}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold font-display uppercase text-headingText mt-3 leading-tight">
                    {questions[currentQ].text}
                  </h2>
                  <p className="text-bodyText text-xs mt-1 leading-relaxed">
                    {questions[currentQ].sub}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {questions[currentQ].options.map((opt) => {
                    const qId = questions[currentQ].id;
                    const isMulti = questions[currentQ].type === 'multi';
                    const selected = isMulti 
                      ? (answers[qId] || []).includes(opt.label)
                      : answers[qId] === opt.label;

                    return (
                      <button
                        key={opt.label}
                        onClick={() => handleSelect(qId, opt.label, isMulti)}
                        className={`flex items-center space-x-3 p-4 rounded-xl border text-xs text-left font-sans transition-all ${
                          selected 
                            ? 'bg-primary/10 border-primary/50 text-white font-bold' 
                            : 'bg-background border-cardBorder text-bodyText hover:text-headingText hover:border-cardBorder'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-all ${
                          selected 
                            ? 'bg-primary border-primary text-black' 
                            : 'border-cardBorder bg-[#111]'
                        }`}>
                          {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="leading-tight">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Nav buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-cardBorder">
                  <button
                    onClick={goBack}
                    className="flex items-center space-x-1.5 py-2.5 px-4 rounded-lg bg-[#111] border border-cardBorder hover:border-cardBorder text-bodyText hover:text-headingText text-xs font-semibold transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={goNext}
                    disabled={!isAnswered(questions[currentQ])}
                    className="flex items-center space-x-1 py-2.5 px-6 rounded-lg bg-white disabled:bg-zinc-800 text-black disabled:text-zinc-600 disabled:cursor-not-allowed text-xs font-bold uppercase tracking-wider hover:bg-zinc-100 transition-all shadow-md"
                  >
                    <span>{currentQ === questions.length - 1 ? 'Analyze Business' : 'Next'}</span>
                    {currentQ < questions.length - 1 && <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </motion.div>
            )}

            {/* LOADING/ANALYZING STATE */}
            {currentQ === questions.length && isAnalyzing && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-[#0c0c0c] border border-cardBorder rounded-2xl p-12 text-center space-y-6 shadow-xl"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mx-auto">
                  <RefreshCw className="w-7 h-7 animate-spin text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-display uppercase text-headingText tracking-wide">Compiling Diagnosis Report...</h3>
                  <p className="text-bodyText/70 text-xs max-w-sm mx-auto leading-relaxed">
                    Our local simulation logic is checking constraints, splitting operational ranges, and resolving ideal integration steps.
                  </p>
                </div>
                <div className="flex justify-center space-x-1.5 pt-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100"></span>
                  <span className="w-2 h-2 rounded-full bg-secondary animate-bounce delay-200"></span>
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-bounce delay-300"></span>
                </div>
              </motion.div>
            )}

            {/* RESULTS RENDERING */}
            {result && !isAnalyzing && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Result Header Card */}
                <div className="bg-[#0c0c0c] border border-cardBorder rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                  <div>
                    <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-primary uppercase bg-primary/10 border border-primary/20 px-3 py-1 rounded-full inline-block">
                      Diagnostic Report Complete
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-headingText mt-3 uppercase tracking-tight leading-none">
                      {result.headline}
                    </h2>
                  </div>
                  <div className="h-px bg-card w-full my-1"></div>
                  <p className="text-bodyText text-xs sm:text-sm leading-relaxed">
                    {result.summary}
                  </p>
                </div>

                {/* Estimated Impact / Dynamic ROI Grid */}
                <div className="space-y-3 text-left">
                  <h3 className="text-xs uppercase font-mono font-bold tracking-widest text-bodyText/70">Estimated Project Impact</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {result.roi.map((rc, idx) => (
                      <div key={idx} className="bg-[#0c0c0c] border border-cardBorder rounded-xl p-5 hover:border-cardBorder transition-all flex flex-col justify-between">
                        <div className="text-2xl sm:text-3xl font-bold font-mono" style={{ color: rc.color }}>
                          {rc.value}
                        </div>
                        <div className="text-[10px] uppercase font-mono text-bodyText/70 tracking-wider mt-1.5 font-bold">
                          {rc.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  {result.hasCustomROI && (
                    <div className="mt-3 text-center bg-primary/5 p-3 rounded-xl border border-primary/20 flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4 text-secondary fill-current shrink-0" />
                      <p className="text-[11px] font-mono text-zinc-300">
                        Calibrated using custom calculator inputs: <span className="text-primary font-bold">{queryHours} hrs</span> wasted/wk @ <span className="text-primary font-bold">${queryRate}/hr</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Recommended Automations List */}
                <div className="space-y-4 text-left">
                  <h3 className="text-xs uppercase font-mono font-bold tracking-widest text-bodyText/70">Recommended Automations Suite</h3>
                  <div className="space-y-4">
                    {result.automations.map((item, idx) => (
                      <div 
                        key={idx}
                        className="bg-[#0c0c0c] border border-cardBorder rounded-2xl overflow-hidden hover:border-cardBorder transition-all"
                      >
                        {/* Accent Bar */}
                        <div className="h-[3px]" style={{ backgroundColor: item.color }}></div>
                        <div className="p-5 sm:p-6 space-y-4">
                          {/* Header */}
                          <div className="flex items-start space-x-3.5">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-zinc-850 bg-background/80 text-xl shadow-sm">
                              {item.emoji}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center space-x-2 text-[9px] font-mono text-bodyText/70 uppercase font-bold">
                                <span>RECOMMENDATION #{item.rank}</span>
                                <span>•</span>
                                <span className={`px-2 py-0.5 rounded text-[8px] font-bold tracking-wide border ${
                                  item.priority === 'High' 
                                    ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                                    : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                                }`}>
                                  {item.priority} Priority
                                </span>
                              </div>
                              <h4 className="text-base sm:text-lg font-bold text-headingText uppercase font-display leading-none">
                                {item.name}
                              </h4>
                            </div>
                          </div>

                          {/* Why */}
                          <p className="text-xs text-bodyText leading-relaxed">
                            {item.why}
                          </p>

                          {/* Impact Chips */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {item.impact.map((chip, cIdx) => (
                              <span 
                                key={cIdx}
                                className="px-2 py-0.5 rounded border border-cardBorder bg-[#111] text-[9px] font-mono text-bodyText/70 uppercase tracking-wider font-bold"
                              >
                                {chip}
                              </span>
                            ))}
                          </div>

                          {/* Steps Accordion Simulation */}
                          <div className="bg-background border border-cardBorder rounded-xl p-3.5 space-y-2.5">
                            <div className="text-[9px] uppercase font-mono text-bodyText/70 tracking-wider font-bold">
                              How it runs for you
                            </div>
                            <div className="space-y-2">
                              {item.steps.map((step, sIdx) => (
                                <div key={sIdx} className="flex items-start space-x-2.5 text-xs text-bodyText">
                                  <span className="font-mono text-[10px] font-bold shrink-0 mt-0.5" style={{ color: item.color }}>
                                    0{sIdx + 1}
                                  </span>
                                  <span className="leading-relaxed">{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline Roadmap */}
                <div className="space-y-3 text-left">
                  <h3 className="text-xs uppercase font-mono font-bold tracking-widest text-bodyText/70">Deploy Timeline Roadmap</h3>
                  <div className="bg-[#0c0c0c] border border-cardBorder rounded-2xl p-5 sm:p-6 space-y-4">
                    {result.timeline.map((row, rIdx) => (
                      <div key={rIdx} className="flex items-start space-x-4">
                        <span className="text-[10px] font-mono font-bold text-black bg-secondary border border-secondary px-2 py-1 rounded shrink-0 w-16 text-center uppercase tracking-wider">
                          {row.week}
                        </span>
                        <p 
                          className="text-xs text-bodyText leading-normal pt-0.5"
                          dangerouslySetInnerHTML={{ __html: row.text }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action card */}
                <div className="bg-[#0c0c0c] border border-cardBorder rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-headingText">Deploy Your Plan in 3-7 Days</h3>
                    <p className="text-bodyText text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                      Submit your diagnostic findings directly to our engineering team on WhatsApp to review feasibility.
                    </p>
                  </div>

                  <div className="pt-2 max-w-sm mx-auto space-y-3">
                    <a
                      href={`https://wa.me/919096861443?text=${encodeURIComponent(result.whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold font-display uppercase tracking-widest text-xs rounded-xl transition-all text-center flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(37,211,102,0.35)]"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FFF" d="M12.003 21c-1.74 0-3.41-.49-4.86-1.4l-.35-.22-3.61.95.96-3.52-.24-.38A9.87 9.87 0 0 1 2.15 11.19c.005-5.46 4.45-9.9 9.91-9.9 2.65 0 5.14 1.03 7.01 2.9a9.83 9.83 0 0 1 2.91 7.02c-.005 5.46-4.45 9.9-9.91 9.9h-.07z" style={{ fill: '#25D366' }} />
                        <path fill="#FFF" d="M12.003 0C5.38 0 .01 5.37.006 11.99c0 2.11.55 4.18 1.6 6L0 24l6.15-1.61c1.78.97 3.79 1.48 5.84 1.48h.01c6.62 0 12-5.37 12-11.99c0-3.21-1.25-6.22-3.51-8.48A11.9 11.9 0 0 0 12.003 0zm5.52 17.02c-.23.64-1.34 1.22-1.85 1.3-.5.08-1.52.12-3.11-.53a10.2 10.2 0 0 1-4.71-4.14c-.81-1.08-1.45-2.45-1.45-3.87 0-1.46.77-2.18 1.05-2.47.27-.3.6-.37.79-.37.2 0 .39 0 .56.01.18 0 .42-.07.65.48.24.58.82 2 .89 2.15.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.16-.32.37-.46.5-.15.15-.3.31-.13.6.17.3 1.09 3.01 2.5 4.27 1.4 1.25 2.58 1.64 2.95 1.82.37.18.59.15.8-.08.23-.26.96-1.12 1.22-1.51.27-.39.53-.33.9-.19.36.14 2.3.1 2.7.29.39.2.65.3.72.43.08.13.08.76-.15 1.4z" />
                      </svg>
                      Send Plan to Anish via WhatsApp
                    </a>
                    <button
                      onClick={handleRestart}
                      className="w-full py-3 border border-cardBorder hover:border-zinc-700 bg-background text-bodyText hover:text-headingText rounded-xl text-xs font-bold tracking-wider transition-all"
                    >
                      Restart Assessment
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
