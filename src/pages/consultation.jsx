import React from 'react';
import { Link } from 'react-router-dom';
import { SEOPage } from '../utils/seoHelper';
import { ArrowLeft, Clock, Video, Calendar, ShieldCheck, Zap } from 'lucide-react';

export default function Consultation() {
  return (
    <div className="min-h-screen pt-24 bg-card pb-20">
      <SEOPage
        title="Book a 30-Min Strategy Call"
        description="Schedule a 30-minute AI and WhatsApp automation consultation with Autovate. Build workflows that run your business 24/7."
      />

      <div className="max-w-[1280px] mx-auto px-6 md:px-16 py-10 space-y-12">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center text-xs font-mono text-bodyText hover:text-primary transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Home
        </Link>

        {/* Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context Info */}
          <div className="lg:col-span-4 space-y-8 text-left">
            <div className="space-y-4">
              <span className="text-[11px] font-mono tracking-[0.15em] text-primary uppercase font-bold block">
                STRATEGY CALL
              </span>
              <h1 className="text-4xl md:text-5xl font-black font-display text-headingText uppercase tracking-tight leading-[1.0]">
                Book a 30-Min Automation Audit
              </h1>
              <p className="text-sm text-bodyText leading-relaxed">
                Meet with our lead solutions architect to map out your operational bottlenecks. Learn how official WhatsApp APIs and custom CRM syncs can save you 15+ hours weekly.
              </p>
            </div>

            {/* Meeting Details */}
            <div className="space-y-4 pt-4 border-t border-cardBorder text-xs text-bodyText">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-background text-primary border border-cardBorder">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-headingText">Duration</h4>
                  <p>30 Minutes</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-background text-primary border border-cardBorder">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-headingText">Location</h4>
                  <p>Google Meet / Zoom Video Call</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-background text-primary border border-cardBorder">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-headingText">What we cover</h4>
                  <p>WhatsApp APIs, Google Sheets workflows, webhook mapping, costing, and live timeline estimation.</p>
                </div>
              </div>
            </div>

            {/* Trust badge */}
            <div className="p-4 bg-background rounded-xl border border-cardBorder flex items-start gap-3 text-left">
              <ShieldCheck className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-headingText">Zero-obligation audit</h4>
                <p className="text-[11px] text-bodyText mt-0.5">We share direct feedback and cost blueprint options on the call.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Calendly Scheduler */}
          <div className="lg:col-span-8 bg-card border border-cardBorder rounded-2xl shadow-sm overflow-hidden min-h-[650px] relative">
            <iframe
              src="https://calendly.com/anishpatil146/30min?back=1&month=2026-06"
              width="100%"
              height="650px"
              frameBorder="0"
              title="Calendly Scheduler"
              className="w-full h-[650px]"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
