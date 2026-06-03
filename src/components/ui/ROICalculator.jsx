import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Clock, HelpCircle, ArrowRight } from 'lucide-react';

export default function ROICalculator() {
  const [hours, setHours] = useState(15);
  const [rate, setRate] = useState(35);
  const averageBotCost = 49; // representative cost of a core bot

  const monthlyLoss = Math.round(hours * 4.33 * rate);
  const yearlyLoss = monthlyLoss * 12;
  const breakEvenDays = Math.ceil((averageBotCost / (monthlyLoss / 30)) * 10) / 10;

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl bg-neutralDark/60 border border-primary/10 shadow-glow p-6 md:p-8 backdrop-blur-sm relative overflow-hidden">
      {/* Background glow highlights */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side: Inputs */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold font-display text-white">ROI Calculator</h3>
            <p className="text-sm text-zinc-400">
              Calculate how much time and capital your business is losing on manual workflows.
            </p>
          </div>

          {/* Input 1: Hours per week */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-300 font-medium flex items-center">
                <Clock className="w-4 h-4 mr-2 text-primary" /> Hours wasted/week
              </span>
              <span className="font-mono text-primary font-bold">{hours} hours</span>
            </div>
            <input
              type="range"
              min="2"
              max="60"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>2 hours</span>
              <span>30 hours</span>
              <span>60 hours</span>
            </div>
          </div>

          {/* Input 2: Hourly Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-300 font-medium flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-primary" /> Employee hourly rate
              </span>
              <span className="font-mono text-primary font-bold">${rate}/hr</span>
            </div>
            <input
              type="range"
              min="15"
              max="150"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>$15/hr</span>
              <span>$80/hr</span>
              <span>$150/hr</span>
            </div>
          </div>
        </div>

        {/* Right Side: Math Results & Conversion CTA */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 text-center space-y-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wider font-mono text-zinc-500">Current Cost of Busywork</p>
            <div className="text-4xl font-bold font-mono text-secondary">
              ${monthlyLoss.toLocaleString()}<span className="text-lg font-normal text-zinc-400">/mo</span>
            </div>
            <p className="text-xs text-zinc-400">
              Or <span className="text-white font-bold">${yearlyLoss.toLocaleString()}/year</span> lost to repetitive tasks.
            </p>
          </div>

          <div className="h-px bg-zinc-800 my-4"></div>

          <div className="space-y-2 text-sm text-zinc-300">
            <div className="flex justify-between">
              <span>Average Bot Cost:</span>
              <span className="font-mono text-white font-bold">${averageBotCost} (One-Time)</span>
            </div>
            <div className="flex justify-between">
              <span>Break-Even Time:</span>
              <span className="font-mono text-tertiary font-bold">{breakEvenDays} Days</span>
            </div>
          </div>

          <div className="pt-2">
            <div className="text-xs text-zinc-400 mb-3 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800/80">
              You are losing <span className="text-red-500 font-bold">${monthlyLoss}</span> every month. Reclaim it today.
            </div>
            <Link
              to={`/diagnosis?hours=${hours}&rate=${rate}`}
              className="inline-flex w-full items-center justify-center px-5 py-3 bg-primary text-black font-semibold rounded-full hover:bg-primary/90 transition-colors group font-display text-sm"
            >
              Find Your Solution Bot <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
