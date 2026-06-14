import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import productsData from '../data/products.json';
import { SEOPage } from '../utils/seoHelper';
import StarRating from '../components/ui/StarRating';
import BadgeChip from '../components/ui/BadgeChip';
import BotCard from '../components/ui/BotCard';
import QuickViewModal from '../components/ui/QuickViewModal';
import BuyNowButton from '../components/ui/BuyNowButton';
import { 
  ArrowLeft, Check, AlertTriangle, ShieldCheck, FileCheck, MessageSquare, RotateCcw, 
  Sparkles, XCircle, CheckCircle, Webhook, Terminal, Cpu, GitBranch, Database, Bell 
} from 'lucide-react';
import { useCheckout } from '../context/CheckoutContext';
import { motion } from 'framer-motion';

export default function ProductDetail() {
  const { slug } = useParams();
  const { triggerCheckout } = useCheckout();
  const [faqOpen, setFaqOpen] = useState({});
  const [selectedBot, setSelectedBot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Find bot by slug
  const bot = productsData.find(b => b.slug === slug) || null;

  // Find 3 related bots from the same category (excluding current)
  const related = React.useMemo(() => {
    if (!bot) return [];
    const matches = productsData
      .filter(b => b.category === bot.category && b.id !== bot.id)
      .slice(0, 3);
    
    // If we don't have enough matching category, fill with popular bots
    if (matches.length < 3) {
      const fallbacks = productsData
        .filter(b => b.id !== bot.id && !matches.some(m => m.id === b.id))
        .sort((a, b) => b.reviewsCount - a.reviewsCount)
        .slice(0, 3 - matches.length);
      return [...matches, ...fallbacks];
    }
    return matches;
  }, [bot]);

  const [activeNode, setActiveNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState('webhook');
  const [simulating, setSimulating] = useState(false);
  const [simulationPath, setSimulationPath] = useState('success');
  const [simulationStatus, setSimulationStatus] = useState("System Standby - Ready to Simulate");

  const nodeDetails = React.useMemo(() => {
    if (!bot) return {};
    return {
      webhook: {
        title: "Webhook / Entry Trigger",
        type: "Trigger",
        color: "border-primary text-primary",
        bg: "bg-primary/10",
        description: "Listens for incoming HTTP POST events. Pre-configured for automated Webhooks from third-party systems like " + (bot.techStack[0] || "Typeform") + ".",
        parameters: {
          "Protocol": "HTTPS POST",
          "Endpoint": "https://hooks.autovate.io/v1/" + bot.slug,
          "Content-Type": "application/json",
          "Auth Mode": "HMAC Token Verification",
          "Max Timeout": "30,000ms"
        },
        payloadIn: "// HTTP POST Payload\n{\n  \"event_id\": \"evt_9123a\",\n  \"timestamp\": 1729381200,\n  \"raw_body\": {\n    \"client_email\": \"operator@company.com\",\n    \"message_text\": \"Requesting consultation for automation setup\"\n  }\n}",
        payloadOut: "// Parsed Header & Query Metadata\n{\n  \"source_ip\": \"184.22.91.5\",\n  \"secure_signature\": \"sha256=a8f3b2...\",\n  \"body\": {\n    \"client_email\": \"operator@company.com\",\n    \"message_text\": \"Requesting consultation for automation setup\"\n  }\n}"
      },
      parser: {
        title: "Data Payload Parser",
        type: "JSON Helper",
        color: "border-[#FFB300] text-[#FFB300]",
        bg: "bg-[#FFB300]/10",
        description: "Sanitizes raw strings, strips illegal characters, maps values to standardized keys, and enforces proper field typing.",
        parameters: {
          "Parser Engine": "Autovate JSON-V2",
          "Strict Schema": "Enabled",
          "Allowed Keys": "email, message, name",
          "XSS Protection": "Active (HTML Entity Encoded)",
          "Empty Fields": "Default Fallbacks Applied"
        },
        payloadIn: "// Raw Webhook Data\n{\n  \"body\": {\n    \"client_email\": \"operator@company.com\",\n    \"message_text\": \"Requesting consultation for automation setup\"\n  }\n}",
        payloadOut: "// Structured Schema Format\n{\n  \"email\": \"operator@company.com\",\n  \"message\": \"Requesting consultation for automation setup\",\n  \"intent_source\": \"external_api\",\n  \"cleaned\": true\n}"
      },
      logic: {
        title: bot.techStack.includes('OpenAI') ? "OpenAI / LLM Node" : "Autovate Logic Engine",
        type: "AI Cognitive",
        color: "border-[#00ACC1] text-[#00ACC1]",
        bg: "bg-[#00ACC1]/10",
        description: "Applies LLM capabilities to classify messages, parse intent, evaluate urgency, and generate structured reasoning outputs.",
        parameters: {
          "LLM Provider": bot.techStack.includes('OpenAI') ? "OpenAI API" : "Autovate Cloud",
          "Model Version": bot.techStack.includes('OpenAI') ? "gpt-4o-mini (V2)" : "Claude-3.5-Sonnet",
          "System Prompt": "Identify intent, assign confidence score, and format output as strict JSON",
          "Temperature": "0.15",
          "Seed Lock": "Enabled (deterministic outputs)"
        },
        payloadIn: "// Inputs for Prompt Context\n{\n  \"email\": \"operator@company.com\",\n  \"message\": \"Requesting consultation for automation setup\"\n}",
        payloadOut: "// AI Intent Output\n{\n  \"intent\": \"consultation_request\",\n  \"confidence\": 0.96,\n  \"urgency\": \"medium\",\n  \"requires_crm\": true\n}"
      },
      router: {
        title: "Conditional Flow Router",
        type: "Routing",
        color: "border-purple-500 text-purple-400",
        bg: "bg-purple-500/10",
        description: "Evaluates the AI reasoning confidence. Directs execution to CRM sync if confidence is high, or logs for manual oversight if low.",
        parameters: {
          "Routing Engine": "Expression Matcher v4",
          "Branch Rule A": "IF 'confidence' >= 0.85 -> Success (CRM Integrator)",
          "Branch Rule B": "IF 'confidence' < 0.85 -> Fallback (Error Logger)",
          "Thread Lock": "None (non-blocking execution)"
        },
        payloadIn: "// AI Confidence Score Check\n{\n  \"intent\": \"consultation_request\",\n  \"confidence\": 0.96,\n  \"requires_crm\": true\n}",
        payloadOut: "// Selected Execution Thread\n{\n  \"target_branch\": \"Branch A (Success)\",\n  \"rule_matched\": \"confidence >= 0.85\"\n}"
      },
      crm: {
        title: "CRM & DB Integrator",
        type: "REST Connector",
        color: "border-emerald-500 text-emerald-400",
        bg: "bg-emerald-500/10",
        description: "Integrates with target databases or external CRMs like " + (bot.techStack[bot.techStack.length - 1] || "HubSpot") + " to sync records.",
        parameters: {
          "Target API": bot.techStack[bot.techStack.length - 1] || "External REST Database",
          "Auth Type": "OAuth 2.0 Bearer Token",
          "Method": "POST /contacts",
          "Retry Limit": "3x (Exponential Backoff)",
          "Rate Limit Protection": "Active (Queue & Wait)"
        },
        payloadIn: "// Structured CRM Lead Body\n{\n  \"email\": \"operator@company.com\",\n  \"lead_source\": \"AI Automation\",\n  \"notes\": \"Urgency: Medium. Intent: Consultation Request.\"\n}",
        payloadOut: "// API Handshake Response\n{\n  \"status\": 201,\n  \"id\": \"hub_contact_9182371\",\n  \"synced\": true\n}"
      },
      error: {
        title: "Incident Error Logger",
        type: "Fallback",
        color: "border-red-500 text-red-400",
        bg: "bg-red-500/10",
        description: "Triggered during low confidence scores or exception errors. Logs details in an internal repository for human review.",
        parameters: {
          "Data Sink": "Internal Error Log DB",
          "Notification Level": "High Priority",
          "Incident ID": "inc_err_7712",
          "Auto-Requeue": "Yes (on server fix)",
          "Operator Alert": "Sent to Technical Support"
        },
        payloadIn: "// Low Confidence Payload\n{\n  \"intent\": \"unknown\",\n  \"confidence\": 0.42,\n  \"raw_message\": \"hello...\"\n}",
        payloadOut: "// Incident Ticket Details\n{\n  \"incident_logged\": true,\n  \"ticket_id\": \"tkt_81230\",\n  \"review_status\": \"pending_operator\"\n}"
      },
      alert: {
        title: "Alert & Notification Dispatch",
        type: "Notification",
        color: "border-pink-500 text-pink-400",
        bg: "bg-pink-500/10",
        description: "Posts final notifications, metrics summaries, and audit logs to dedicated team workspace chats or emails.",
        parameters: {
          "Channels": "Slack / Telegram / Discord",
          "Format Style": "Markdown Rich Cards",
          "Audit Log Link": "https://dashboard.autovate.io/logs/17293",
          "Latency SLA": "3s End-to-End SLA Check",
          "Encryption": "AES-256 at Rest"
        },
        payloadIn: "// Alert Summary Payload\n{\n  \"status\": \"Success\",\n  \"lead_id\": \"hub_contact_9182371\",\n  \"latency_seconds\": 1.15\n}",
        payloadOut: "// Chat Webhook Response\n{\n  \"channel\": \"#leads-stream\",\n  \"posted_status\": \"ok\",\n  \"delivered_timestamp\": 1729381203\n}"
      }
    };
  }, [bot]);

  const runSimulation = () => {
    if (simulating) return;
    setSimulating(true);
    
    const steps = [
      { id: 'webhook', status: 'Listening for incoming Webhook payload...', delay: 1200 },
      { id: 'parser', status: 'Parsing payload and cleaning JSON structures...', delay: 1200 },
      { id: 'logic', status: 'Running Cognitive AI Model Analysis...', delay: 1800 },
      { id: 'router', status: 'Evaluating conditional routing conditions...', delay: 1200 },
      { 
        id: simulationPath === 'success' ? 'crm' : 'error', 
        status: simulationPath === 'success' ? 'Syncing structured lead data to CRM database...' : 'Failed threshold check: Logging incident metadata...', 
        delay: 1500 
      },
      { id: 'alert', status: 'Finalizing execution stream and dispatching success alerts...', delay: 1200 }
    ];

    let current = 0;
    const executeStep = () => {
      if (current >= steps.length) {
        setActiveNode(null);
        setSimulating(false);
        setSimulationStatus("Execution Stream Finished (Path: " + simulationPath.toUpperCase() + " | 100% Success)");
        return;
      }
      
      const step = steps[current];
      setActiveNode(step.id);
      setSelectedNode(step.id);
      setSimulationStatus(step.status);
      
      setTimeout(() => {
        current++;
        executeStep();
      }, step.delay);
    };

    executeStep();
  };

  const toggleFaq = (idx) => {
    setFaqOpen(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleBuy = () => {
    setIsConnected(true);
    if (bot) triggerCheckout(bot);
  };

  const handleRelatedQuickView = (relatedBot) => {
    setSelectedBot(relatedBot);
    setIsModalOpen(true);
  };

  const handleRelatedBuy = (relatedBot) => {
    triggerCheckout(relatedBot);
  };

  if (!bot) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 pt-24 bg-card text-bodyText">
        <AlertTriangle className="w-16 h-16 text-yellow-500" />
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold font-display text-headingText">Bot Blueprint Not Found</h2>
          <p className="text-bodyText text-sm max-w-sm">
            We couldn't locate this specific automation template. It may have been renamed or archived.
          </p>
        </div>
        <Link
          to="/marketplace"
          className="px-6 py-3 bg-primary text-white hover:bg-primary/90 font-semibold text-xs font-display uppercase tracking-wider rounded-full transition-colors"
        >
          Return to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-card pb-20 text-bodyText font-sans antialiased">
      <SEOPage
        title={`${bot.name} Blueprint`}
        description={`Deploy the ${bot.name} in under 15 minutes. ${bot.description} ${bot.outcomes[0]}`}
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-10 space-y-16">
        
        {/* Breadcrumb Back Link */}
        <Link to="/marketplace" className="inline-flex items-center text-xs font-mono text-bodyText hover:text-primary transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Marketplace catalog
        </Link>

        {/* Hero Section of Bot Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: Core specifications */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <BadgeChip text={bot.category.replace('-', ' ')} type="primary" />
              <BadgeChip text="Expert-Guided Setup" type="success" />
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-headingText font-display leading-none uppercase">
              {bot.name} Blueprint
            </h1>
            
            <p className="text-bodyText text-base md:text-lg leading-relaxed">
              {bot.description}. Pre-built configuration file designed for rapid deployment.
            </p>

            <div className="flex flex-wrap items-center gap-4 py-2 border-y border-cardBorder">
              <div className="flex items-center space-x-2">
                <StarRating rating={bot.rating} size="lg" />
                <span className="font-mono font-bold text-headingText text-lg">{bot.rating}</span>
                <span className="text-bodyText/70 text-xs">({bot.reviewsCount} verified reviews)</span>
              </div>
              
              <div className="hidden sm:block h-6 w-px bg-[#E2E8F0]"></div>

              <div className="text-xs font-mono text-bodyText/70">
                <span className="text-headingText font-bold">100% Secure Setup</span> | 3-Month updates included
              </div>
            </div>

            {/* What it does */}
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-bold font-display text-headingText uppercase">What This Bot Executes</h3>
              <ul className="space-y-3">
                {bot.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start text-sm text-bodyText leading-relaxed">
                    <Check className="w-4 h-4 text-tertiary mr-3 shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who it's for */}
            <div className="space-y-2 pt-2">
              <h3 className="text-lg font-bold font-display text-headingText uppercase">Ideal Target Operator</h3>
              <p className="text-sm text-bodyText leading-relaxed">{bot.targetUser}</p>
            </div>
          </div>

          {/* Right Block: Conversion Box (Checkout CTA & What's Included) */}
          <div className="lg:col-span-5 bg-background border border-cardBorder rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/3 rounded-full blur-2xl"></div>

            {isConnected ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6 text-center my-auto py-8 w-full"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.15)] mx-auto">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold font-display text-headingText uppercase tracking-tight">Request Received!</h3>
                  <p className="text-xs text-bodyText leading-relaxed max-w-[280px] mx-auto">
                    We've received your request for the <span className="text-primary font-semibold">{bot.name}</span> blueprint setup. Our automation engineers will reach out to you shortly.
                  </p>
                </div>
                
                <div className="space-y-3 pt-6 border-t border-cardBorder">
                  <a
                    href={`https://wa.me/919096861443?text=${encodeURIComponent(`Hi Autovate! I'd like to connect with your team to setup the "${bot.name}" blueprint.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-display font-bold uppercase tracking-wider rounded-full shadow-sm text-xs flex items-center justify-center gap-2 transition-all active:scale-98"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                  <button
                    onClick={() => setIsConnected(false)}
                    className="w-full py-3 border border-cardBorder hover:border-white/20 text-bodyText/80 hover:text-white rounded-full text-xs font-medium tracking-wide flex items-center justify-center gap-1.5 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Back to details</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="space-y-1 text-center md:text-left">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-bodyText/70">3-Month License & Setup</span>
                  <div className="text-5xl font-extrabold font-mono text-primary">${bot.price}</div>
                  <p className="text-xs text-bodyText/70 font-mono mt-1">Billed every 3 months | All updates included</p>
                </div>

                <div className="space-y-3">
                  <BuyNowButton
                    onClick={handleBuy}
                    fullWidth
                    className="rounded-full py-4 h-[50px] shadow-sm font-display tracking-widest"
                    id="bot-buy-now-cta"
                  >
                    Connect with us
                  </BuyNowButton>
                  
                  <a
                    href={`https://wa.me/919096861443?text=${encodeURIComponent(`Hi Autovate! I'd like to chat about the "${bot.name}" blueprint.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-display font-bold uppercase tracking-widest rounded-full shadow-sm text-xs flex items-center justify-center gap-2 transition-all active:scale-98 h-[50px]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                  
                  <Link
                    to="/consultation"
                    className="w-full py-4 bg-card border border-cardBorder hover:border-primary text-headingText hover:text-primary font-bold font-display uppercase tracking-widest rounded-full transition-all text-xs flex items-center justify-center shadow-sm"
                  >
                    Request Custom setup (+$99)
                  </Link>
                </div>

                {/* What is Included block */}
                <div className="space-y-3 pt-4 border-t border-cardBorder text-left">
                  <h4 className="text-xs uppercase font-mono text-bodyText/70 font-bold tracking-wider">Deployment Package Contents</h4>
                  <ul className="space-y-2 text-xs text-bodyText">
                    {bot.includes.map((inc, idx) => (
                      <li key={idx} className="flex items-center space-x-2.5">
                        <FileCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Tech badges */}
            <div className="space-y-2 text-left pt-2">
              <h4 className="text-xs uppercase font-mono text-bodyText/70 tracking-wider">Integration Ecosystem</h4>
              <div className="flex flex-wrap gap-1">
                {bot.techStack.map((tech) => (
                  <span key={tech} className="px-2 py-0.5 bg-background border border-cardBorder rounded font-mono text-[10px] text-bodyText/80 uppercase">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-[10px] text-bodyText/70 font-mono flex items-center justify-center pt-2 space-x-4 border-t border-cardBorder/40">
              <span className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 text-tertiary mr-1 shrink-0" /> 3-Month Updates</span>
              <span className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 text-tertiary mr-1 shrink-0" /> 30-Day Guarantee</span>
            </div>

          </div>
        </div>

        {/* Workflow Diagram & Architecture */}
        <section className="bg-zinc-900/30 border border-cardBorder rounded-3xl p-6 md:p-8 text-left space-y-6">
          <div className="space-y-1">
            <div className="flex items-center text-primary font-bold text-xs uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4 mr-2" /> Blueprint Architecture
            </div>
            <h3 className="text-xl font-bold text-headingText font-display uppercase">
              Workflow Design & Node Specifications
            </h3>
            <p className="text-xs text-bodyText/70 leading-relaxed max-w-2xl">
              Visual pipeline and technical parameter specifications showing how the {bot.name} blueprint routes, processes, and stores data.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 p-6 rounded-2xl bg-zinc-950/40 border border-cardBorder/60">
            {/* Stage 1: Trigger */}
            <div className="flex flex-col justify-between text-left p-5 border border-cardBorder/80 bg-zinc-900/60 rounded-xl w-full lg:max-w-[280px] min-h-[220px] transition-all hover:border-primary/20 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-[#FFB300] uppercase font-bold tracking-wider">01. Entry Trigger</span>
                  <span className="text-[8px] font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded border border-cardBorder">EVENT-DRIVEN</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-headingText uppercase">{bot.techStack[0] || 'Trigger Event'}</h4>
                  <p className="text-[10px] text-bodyText/70 mt-1 leading-relaxed">Listens for incoming payloads and initializes the automation stream.</p>
                </div>
              </div>
              <div className="pt-2.5 border-t border-cardBorder/60 space-y-1.5 font-mono text-[9px] text-zinc-450">
                <div className="flex justify-between"><span>Protocol:</span><span className="text-zinc-300">HTTPS POST</span></div>
                <div className="flex justify-between"><span>Payload:</span><span className="text-zinc-300">application/json</span></div>
                <div className="flex justify-between"><span>Latency:</span><span className="text-emerald-500">&lt; 150ms</span></div>
              </div>
            </div>

            {/* Connection Arrow */}
            <div className="flex flex-col items-center justify-center shrink-0 self-center">
              <span className="text-primary text-xs font-mono font-bold leading-none hidden lg:block">→</span>
              <span className="text-primary text-xs font-mono font-bold leading-none lg:hidden">↓</span>
              <span className="text-[8px] font-mono text-zinc-650 uppercase mt-0.5">Stream</span>
            </div>

            {/* Stage 2: AI Processor */}
            <div className="flex flex-col justify-between text-left p-5 border border-primary/30 bg-primary/5 rounded-xl w-full lg:max-w-[290px] min-h-[220px] shadow-[0_0_20px_rgba(0,245,255,0.02)] transition-all hover:border-primary/50 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-primary uppercase font-bold tracking-wider">02. Logic Engine</span>
                  <span className="text-[8px] font-mono bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/25">AI ACTIVE</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#F8FAFC] uppercase">{bot.techStack.includes('OpenAI') ? 'OpenAI / LLM Node' : 'Autovate Parser'}</h4>
                  <p className="text-[10px] text-[#94A3B8] mt-1 leading-relaxed">Applies system prompts, sanitizes data structures, and formats nodes.</p>
                </div>
              </div>
              <div className="pt-2.5 border-t border-primary/15 space-y-1.5 font-mono text-[9px] text-[#94A3B8]/80">
                <div className="flex justify-between"><span>Model:</span><span className="text-primary">{bot.techStack.includes('OpenAI') ? 'gpt-4o-mini' : 'Rules-Based'}</span></div>
                <div className="flex justify-between"><span>Runtime:</span><span className="text-[#F8FAFC]">Node.js V8</span></div>
                <div className="flex justify-between"><span>Security:</span><span className="text-emerald-500">AES-256 Encrypted</span></div>
              </div>
            </div>

            {/* Connection Arrow */}
            <div className="flex flex-col items-center justify-center shrink-0 self-center">
              <span className="text-primary text-xs font-mono font-bold leading-none hidden lg:block">→</span>
              <span className="text-primary text-xs font-mono font-bold leading-none lg:hidden">↓</span>
              <span className="text-[8px] font-mono text-zinc-650 uppercase mt-0.5">Output</span>
            </div>

            {/* Stage 3: Destination Node */}
            <div className="flex flex-col justify-between text-left p-5 border border-cardBorder/80 bg-zinc-900/60 rounded-xl w-full lg:max-w-[280px] min-h-[220px] transition-all hover:border-tertiary/20 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-[#00ACC1] uppercase font-bold tracking-wider">03. Target Node</span>
                  <span className="text-[8px] font-mono bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded border border-cardBorder">REST API</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-headingText uppercase">{bot.techStack[bot.techStack.length - 1] || 'Destination API'}</h4>
                  <p className="text-[10px] text-bodyText/70 mt-1 leading-relaxed">Pushes cleaned payload to target database or alerting channel.</p>
                </div>
              </div>
              <div className="pt-2.5 border-t border-cardBorder/60 space-y-1.5 font-mono text-[9px] text-zinc-450">
                <div className="flex justify-between"><span>Auth Type:</span><span className="text-zinc-300">OAuth2 / API Key</span></div>
                <div className="flex justify-between"><span>Method:</span><span className="text-zinc-300">POST / PATCH</span></div>
                <div className="flex justify-between"><span>Error Handling:</span><span className="text-emerald-500">3x Auto-Retry</span></div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-cardBorder/60 my-8"></div>

          {/* 6-Stage n8n / Make Node Execution Sequence (Interactive Flow Tree) */}
          <div className="space-y-8">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">Sequential Runtime Logic</span>
              <h4 className="text-lg font-bold text-headingText font-display uppercase">
                Interactive Blueprint Flow Tree & Execution Simulator
              </h4>
              <p className="text-xs text-bodyText/70 leading-relaxed max-w-xl">
                Run the interactive simulation or click nodes in the tree diagram below to inspect input/output schemas, logic paths, and configuration parameters.
              </p>
            </div>

            {/* Simulation Controller */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 p-4.5 bg-zinc-950/40 border border-cardBorder rounded-2xl">
              <div className="space-y-1 text-left">
                <div className="text-[9px] font-mono text-bodyText/50 uppercase tracking-widest">Simulator Monitor</div>
                <div className="text-xs font-bold text-headingText uppercase tracking-wide flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${simulating ? 'bg-primary' : 'bg-emerald-500'}`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${simulating ? 'bg-primary' : 'bg-emerald-500'}`}></span>
                  </span>
                  <span>Status:</span>
                  <span className={simulating ? "text-primary font-mono font-medium" : "text-emerald-500 font-mono font-medium"}>
                    {simulationStatus}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                {/* Branch selection */}
                <div className="flex items-center bg-zinc-900/80 rounded-xl p-1 border border-cardBorder">
                  <button 
                    onClick={() => !simulating && setSimulationPath('success')}
                    disabled={simulating}
                    className={`px-3.5 py-1.5 text-[9px] font-mono uppercase rounded-lg font-bold transition-all ${simulationPath === 'success' ? 'bg-emerald-500/20 text-emerald-450 border border-emerald-500/30' : 'text-bodyText/60 hover:text-white disabled:opacity-50'}`}
                  >
                    Success Path
                  </button>
                  <button 
                    onClick={() => !simulating && setSimulationPath('fail')}
                    disabled={simulating}
                    className={`px-3.5 py-1.5 text-[9px] font-mono uppercase rounded-lg font-bold transition-all ${simulationPath === 'fail' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-bodyText/60 hover:text-white disabled:opacity-50'}`}
                  >
                    Fail Path
                  </button>
                </div>

                <button
                  onClick={runSimulation}
                  disabled={simulating}
                  className="px-6 py-2.5 bg-primary text-white hover:bg-primary/95 disabled:bg-zinc-800 disabled:text-zinc-650 disabled:cursor-not-allowed rounded-xl font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,245,255,0.08)] flex items-center gap-2"
                >
                  {simulating ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Simulating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Run Blueprint</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tree and Inspector Side-by-Side Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Column: Visual Flow Tree */}
              <div className="xl:col-span-7 bg-zinc-950/20 border border-cardBorder/60 rounded-3xl p-6 flex flex-col items-center justify-center space-y-0 min-h-[500px]">
                
                {/* Node renderer helper */}
                {(() => {
                  const renderNode = (id, label, iconComponent, typeLabel) => {
                    const isNodeActive = activeNode === id;
                    const isNodeSelected = selectedNode === id;
                    const details = nodeDetails[id] || {};
                    
                    return (
                      <motion.button
                        key={id}
                        onClick={() => setSelectedNode(id)}
                        whileHover={{ scale: 1.02, border: "1px solid rgba(0, 245, 255, 0.4)" }}
                        whileTap={{ scale: 0.98 }}
                        animate={isNodeActive ? { 
                          scale: [1, 1.03, 1],
                          boxShadow: ["0 0 0px rgba(0,245,255,0)", "0 0 15px rgba(0,245,255,0.25)", "0 0 0px rgba(0,245,255,0)"]
                        } : {}}
                        transition={isNodeActive ? { repeat: Infinity, duration: 1.5 } : {}}
                        className={`w-full max-w-[280px] p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-300 relative overflow-hidden group select-none ${
                          isNodeActive 
                            ? `border-primary bg-primary/10` 
                            : isNodeSelected 
                              ? 'border-primary/50 bg-zinc-900/90 shadow-sm shadow-primary/5' 
                              : 'border-cardBorder bg-zinc-900/40 hover:border-cardBorder/90'
                        }`}
                      >
                        <div className="flex items-center space-x-3.5">
                          <div className={`p-2.5 rounded-xl border transition-transform duration-300 group-hover:rotate-6 ${
                            isNodeActive 
                              ? 'bg-primary/20 border-primary text-primary' 
                              : 'bg-zinc-800/80 border-cardBorder text-bodyText/80'
                          }`}>
                            {iconComponent}
                          </div>
                          <div>
                            <span className="text-[8px] font-mono text-bodyText/60 block uppercase tracking-widest">{typeLabel}</span>
                            <span className="text-xs font-bold text-headingText uppercase tracking-wide">{label}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full ${
                            isNodeActive 
                              ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]' 
                              : isNodeSelected 
                                ? 'bg-primary shadow-[0_0_6px_#00f5ff]' 
                                : 'bg-zinc-700'
                          }`}></div>
                        </div>
                      </motion.button>
                    );
                  };

                  const isActivePath = (targetNode) => activeNode === targetNode;

                  return (
                    <div className="w-full flex flex-col items-center">
                      
                      {/* Node 1: Webhook */}
                      {renderNode('webhook', 'Webhook Trigger', <Webhook className="w-4 h-4" />, 'Node 01: Trigger')}
                      
                      {/* Connector 1 */}
                      <div className="w-[100px] h-8 flex items-center justify-center">
                        <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 32" preserveAspectRatio="none">
                          <motion.line
                            x1="50" y1="0" x2="50" y2="32"
                            stroke={isActivePath('parser') ? "#00f5ff" : "rgba(255, 255, 255, 0.15)"}
                            strokeWidth="2.5"
                            strokeDasharray={isActivePath('parser') ? "5 3" : "none"}
                            animate={isActivePath('parser') ? { strokeDashoffset: [0, -16] } : {}}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                          />
                        </svg>
                      </div>

                      {/* Node 2: Parser */}
                      {renderNode('parser', 'Payload Parser', <Terminal className="w-4 h-4" />, 'Node 02: Helper')}

                      {/* Connector 2 */}
                      <div className="w-[100px] h-8 flex items-center justify-center">
                        <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 32" preserveAspectRatio="none">
                          <motion.line
                            x1="50" y1="0" x2="50" y2="32"
                            stroke={isActivePath('logic') ? "#00f5ff" : "rgba(255, 255, 255, 0.15)"}
                            strokeWidth="2.5"
                            strokeDasharray={isActivePath('logic') ? "5 3" : "none"}
                            animate={isActivePath('logic') ? { strokeDashoffset: [0, -16] } : {}}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                          />
                        </svg>
                      </div>

                      {/* Node 3: Logic Engine */}
                      {renderNode('logic', bot.techStack.includes('OpenAI') ? 'OpenAI / LLM Node' : 'Autovate Logic Engine', <Cpu className="w-4 h-4" />, 'Node 03: AI Engine')}

                      {/* Connector 3 */}
                      <div className="w-[100px] h-8 flex items-center justify-center">
                        <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 32" preserveAspectRatio="none">
                          <motion.line
                            x1="50" y1="0" x2="50" y2="32"
                            stroke={isActivePath('router') ? "#00f5ff" : "rgba(255, 255, 255, 0.15)"}
                            strokeWidth="2.5"
                            strokeDasharray={isActivePath('router') ? "5 3" : "none"}
                            animate={isActivePath('router') ? { strokeDashoffset: [0, -16] } : {}}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                          />
                        </svg>
                      </div>

                      {/* Node 4: Flow Router */}
                      {renderNode('router', 'Conditional Router', <GitBranch className="w-4 h-4" />, 'Node 04: Flow Router')}

                      {/* Connector 4: Branching */}
                      <div className="w-full max-w-[500px] h-12">
                        <svg className="w-full h-12 overflow-visible" viewBox="0 0 100 48" preserveAspectRatio="none">
                          <motion.path
                            d="M 50,0 C 50,24 25,24 25,48"
                            fill="none"
                            stroke={
                              isActivePath('crm') 
                                ? "#10b981" 
                                : (simulating && simulationPath === 'success' && isActivePath('alert')) 
                                  ? "#10b981" 
                                  : "rgba(255, 255, 255, 0.15)"
                            }
                            strokeWidth="2.5"
                            strokeDasharray={isActivePath('crm') ? "5 3" : "none"}
                            animate={isActivePath('crm') ? { strokeDashoffset: [0, -16] } : {}}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                          />
                          <motion.path
                            d="M 50,0 C 50,24 75,24 75,48"
                            fill="none"
                            stroke={
                              isActivePath('error') 
                                ? "#f43f5e" 
                                : (simulating && simulationPath === 'fail' && isActivePath('alert')) 
                                  ? "#f43f5e" 
                                  : "rgba(255, 255, 255, 0.15)"
                            }
                            strokeWidth="2.5"
                            strokeDasharray={isActivePath('error') ? "5 3" : "none"}
                            animate={isActivePath('error') ? { strokeDashoffset: [0, -16] } : {}}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                          />
                        </svg>
                      </div>

                      {/* Node 5: CRM Sync & Error Logger Side-By-Side */}
                      <div className="w-full max-w-[560px] flex items-center justify-between gap-4">
                        <div className="w-1/2 flex justify-end">
                          {renderNode('crm', 'CRM & DB Sync', <Database className="w-4 h-4" />, 'Node 05A: Success')}
                        </div>
                        <div className="w-1/2 flex justify-start">
                          {renderNode('error', 'Error Logger', <XCircle className="w-4 h-4" />, 'Node 05B: Fallback')}
                        </div>
                      </div>

                      {/* Connector 5: Merging */}
                      <div className="w-full max-w-[560px] h-12">
                        <svg className="w-full h-12 overflow-visible" viewBox="0 0 100 48" preserveAspectRatio="none">
                          <motion.path
                            d="M 25,0 C 25,24 50,24 50,48"
                            fill="none"
                            stroke={
                              (isActivePath('alert') && simulationPath === 'success') 
                                ? "#10b981" 
                                : "rgba(255, 255, 255, 0.15)"
                            }
                            strokeWidth="2.5"
                            strokeDasharray={(isActivePath('alert') && simulationPath === 'success') ? "5 3" : "none"}
                            animate={(isActivePath('alert') && simulationPath === 'success') ? { strokeDashoffset: [0, -16] } : {}}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                          />
                          <motion.path
                            d="M 75,0 C 75,24 50,24 50,48"
                            fill="none"
                            stroke={
                              (isActivePath('alert') && simulationPath === 'fail') 
                                ? "#f43f5e" 
                                : "rgba(255, 255, 255, 0.15)"
                            }
                            strokeWidth="2.5"
                            strokeDasharray={(isActivePath('alert') && simulationPath === 'fail') ? "5 3" : "none"}
                            animate={(isActivePath('alert') && simulationPath === 'fail') ? { strokeDashoffset: [0, -16] } : {}}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                          />
                        </svg>
                      </div>

                      {/* Node 6: Alert Dispatch */}
                      {renderNode('alert', 'Alert & Log Dispatch', <Bell className="w-4 h-4" />, 'Node 06: Outputs')}

                    </div>
                  );
                })()}

              </div>

              {/* Right Column: Node Inspector */}
              <div className="xl:col-span-5 h-full">
                {(() => {
                  const inspected = nodeDetails[selectedNode] || nodeDetails.webhook || {};
                  return (
                    <div className="bg-zinc-950/30 border border-cardBorder rounded-3xl p-6 flex flex-col justify-between h-full min-h-[500px] text-left">
                      
                      {/* Inspector Header */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-bodyText/50 uppercase tracking-widest">Node Inspector</span>
                          <span className={`px-2.5 py-0.5 rounded-lg font-mono text-[9px] font-bold uppercase ${inspected.color} ${inspected.bg} border border-current/25`}>
                            {inspected.type}
                          </span>
                        </div>
                        
                        <h4 className="text-sm font-extrabold text-headingText font-display uppercase tracking-wider">
                          {inspected.title}
                        </h4>
                        
                        <p className="text-xs text-bodyText/80 leading-relaxed">
                          {inspected.description}
                        </p>
                      </div>

                      {/* Parameters Table */}
                      <div className="space-y-3 pt-5 border-t border-cardBorder/50">
                        <h5 className="text-[10px] uppercase font-mono text-headingText font-bold tracking-widest">Node Configuration</h5>
                        <div className="space-y-2.5 font-mono text-[9px] text-bodyText bg-zinc-900/60 p-4 rounded-2xl border border-cardBorder/60">
                          {inspected.parameters && Object.entries(inspected.parameters).map(([key, val]) => (
                            <div key={key} className="flex justify-between items-start gap-4">
                              <span className="text-bodyText/50 text-left">{key}:</span>
                              <span className="text-headingText text-right font-medium">{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Payloads Inspector */}
                      <div className="space-y-4 pt-5 border-t border-cardBorder/50 flex-1 flex flex-col justify-end">
                        <h5 className="text-[10px] uppercase font-mono text-headingText font-bold tracking-widest">Payload Inspector</h5>
                        
                        <div className="grid grid-cols-1 gap-4">
                          {/* Input Payload */}
                          <div className="space-y-1.5">
                            <span className="text-[9px] font-mono uppercase text-bodyText/50 tracking-wider">Data Input Payload</span>
                            <pre className="p-3.5 bg-zinc-900/40 border border-cardBorder/40 rounded-2xl text-[9px] font-mono text-primary overflow-x-auto select-all max-h-[140px] scrollbar-thin">
                              <code>{inspected.payloadIn}</code>
                            </pre>
                          </div>
                          
                          {/* Output Payload */}
                          <div className="space-y-1.5">
                            <span className="text-[9px] font-mono uppercase text-bodyText/50 tracking-wider">Data Output Payload</span>
                            <pre className="p-3.5 bg-zinc-900/40 border border-cardBorder/40 rounded-2xl text-[9px] font-mono text-emerald-400 overflow-x-auto select-all max-h-[140px] scrollbar-thin">
                              <code>{inspected.payloadOut}</code>
                            </pre>
                          </div>
                        </div>
                      </div>

                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* Before vs After comparison Table */}
        <section className="space-y-6 pt-8 text-left">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-headingText uppercase">Before vs After Automation</h3>
            <p className="text-xs sm:text-sm text-bodyText/80">
              See the immediate operational transformations that occur after deploying this template.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Before block */}
            <div className="bg-red-950/10 border border-red-500/20 rounded-3xl p-6 md:p-8 space-y-6 flex flex-col justify-between hover:border-red-500/35 transition-all">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-red-400">
                  <div className="p-2 bg-red-500/10 rounded-xl border border-red-500/20">
                    <XCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] font-bold text-red-500 tracking-widest uppercase block">01. PRE-AUTOMATION</span>
                    <span className="font-bold text-sm text-headingText uppercase tracking-wide">Manual Bottlenecks</span>
                  </div>
                </div>
                <p className="text-bodyText/90 text-xs sm:text-sm leading-relaxed">{bot.beforeAfter.before}</p>
              </div>
              
              <div className="pt-4 border-t border-red-500/10 space-y-2 font-mono text-[10px] text-zinc-400">
                <div className="flex justify-between items-center">
                  <span>Processing Latency:</span>
                  <span className="text-red-400 font-semibold uppercase">Hours to Days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Data Integrity:</span>
                  <span className="text-red-400 font-semibold uppercase">Human Error Risk</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Active Labor Cost:</span>
                  <span className="text-red-400 font-semibold uppercase">High Manual Overhead</span>
                </div>
              </div>
            </div>

            {/* After block */}
            <div className="bg-emerald-950/10 border border-emerald-500/20 rounded-3xl p-6 md:p-8 space-y-6 flex flex-col justify-between hover:border-emerald-500/35 transition-all shadow-[0_0_30px_rgba(16,185,129,0.02)]">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-emerald-400">
                  <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] font-bold text-emerald-450 tracking-widest uppercase block">02. POST-DEPLOYMENT</span>
                    <span className="font-bold text-sm text-[#F8FAFC] uppercase tracking-wide">Autovate Deployments</span>
                  </div>
                </div>
                <p className="text-[#94A3B8] text-xs sm:text-sm leading-relaxed">{bot.beforeAfter.after}</p>
              </div>
              
              <div className="pt-4 border-t border-emerald-500/10 space-y-2 font-mono text-[10px] text-[#94A3B8]/80">
                <div className="flex justify-between items-center">
                  <span>Processing Latency:</span>
                  <span className="text-emerald-400 font-semibold uppercase">Real-Time (&lt; 3s)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Data Integrity:</span>
                  <span className="text-emerald-400 font-semibold uppercase">100% LLM Validated</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Active Labor Cost:</span>
                  <span className="text-emerald-450 font-semibold uppercase">Zero Active Hours</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3 Specific testimonials for this bot */}
        <section className="space-y-6 pt-8 text-left">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-headingText uppercase">Verified Operator Reviews</h3>
            <p className="text-xs sm:text-sm text-bodyText/80">Hear from business owners who deployed this specific blueprint in their operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bot.testimonials.map((test, idx) => (
              <div key={idx} className="bg-card border border-cardBorder rounded-2xl p-5 space-y-4 flex flex-col justify-between shadow-sm">
                <div className="space-y-3">
                  <div className="flex text-yellow-400">
                    <StarRating rating={5} />
                  </div>
                  <p className="text-bodyText text-xs sm:text-sm italic leading-relaxed">
                    "{test.quote}"
                  </p>
                </div>
                <div className="text-bodyText/70 font-mono text-[10px] pt-4 border-t border-cardBorder">
                  — {test.user}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ list for this bot */}
        <section className="space-y-6 pt-8 text-left max-w-4xl">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-headingText uppercase">Product FAQ</h3>
            <p className="text-xs sm:text-sm text-bodyText/80">Specific answers about deploying the {bot.name}.</p>
          </div>

          <div className="space-y-3">
            {bot.faqs.map((faq, idx) => {
              const isOpen = !!faqOpen[idx];
              return (
                <div key={idx} className="bg-card border border-cardBorder rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4.5 text-left text-xs sm:text-sm text-headingText font-semibold font-display uppercase"
                  >
                    <span>{faq.q}</span>
                    <span className="text-bodyText">{isOpen ? '-' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="p-4.5 pt-0 text-bodyText text-xs sm:text-sm leading-relaxed border-t border-cardBorder">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Related Bots Grid */}
        <section className="space-y-6 pt-8">
          <div className="text-left space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-headingText uppercase">Recommended Stack Additions</h3>
            <p className="text-xs sm:text-sm text-bodyText/80">Deploy these complementary templates to further streamline your operations.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((rBot) => (
              <BotCard
                key={rBot.id}
                bot={rBot}
                onQuickView={handleRelatedQuickView}
                onBuy={handleRelatedBuy}
              />
            ))}
          </div>
        </section>

      </div>

      {/* Related Quick View Modal */}
      <QuickViewModal
        bot={selectedBot}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBuy={handleRelatedBuy}
      />

    </div>
  );
}
