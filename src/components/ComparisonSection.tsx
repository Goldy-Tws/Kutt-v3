"use client";

import { Check, X, ShieldX, ShieldCheck, Zap, Scale } from "lucide-react";

export default function ComparisonSection() {
  const comparisonItems = [
    {
      feature: "Who Is On The Other Side?",
      traditional: "A faceless corporation and math algorithm designed to extract vig.",
      kutt: "A real friend, coworker, or recognizable sports fan.",
      kuttAdvantage: true,
    },
    {
      feature: "The 'House Edge' / Vig",
      traditional: "High hidden vig (often 10% - 15% juice built into every single spread).",
      kutt: "Zero bookmaker vig. Flat transparent platform fee only.",
      kuttAdvantage: true,
    },
    {
      feature: "Customization of Terms",
      traditional: "Rigid, fixed lines determined solely by bookmakers.",
      kutt: "100% customizable: set your own spread, odds, or unique prop bet.",
      kuttAdvantage: true,
    },
    {
      feature: "What Happens When You Win Often?",
      traditional: "House limits your stakes, lowers max payouts, or restricts accounts.",
      kutt: "Your status rises! Climb community leaderboards and build your rivalry record.",
      kuttAdvantage: true,
    },
    {
      feature: "Community & Trash Talk",
      traditional: "Lonely, sterile terminal. Zero social interaction with counterparties.",
      kutt: "Built-in direct messaging, group banter, and real-time trash talk.",
      kuttAdvantage: true,
    },
    {
      feature: "Beyond Traditional Sports",
      traditional: "Restricted strictly to standard casino and commercial sport lines.",
      kutt: "Any verifiable outcome: Oscars, election dates, esports, and personal handshakes.",
      kuttAdvantage: true,
    },
  ];

  return (
    <section id="vs-house" className="relative py-28 bg-kutt-surface light:bg-[#F1F5F9] border-t border-kutt-border/60 light:border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 light:bg-white border border-white/10 light:border-slate-200 text-xs font-semibold text-kutt-textLight light:text-slate-700 uppercase tracking-wider mb-4 light:shadow-sm">
            <Scale className="w-3.5 h-3.5 text-kutt-green light:text-emerald-600" />
            <span>The Paradigm Shift</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white light:text-slate-950 tracking-tight">
            Traditional Sportsbook vs. Kutt
          </h2>
          <p className="mt-4 text-base sm:text-lg text-kutt-muted light:text-slate-600">
            The house is built to win. Kutt is built for people who want to compete directly with each other.
          </p>
        </div>

        {/* Comparison Table / Cards - Responsive Mobile & Desktop Layout */}
        <div className="overflow-hidden rounded-2xl glass-panel light:bg-white border border-kutt-border light:border-slate-200/90 shadow-2xl light:shadow-xl light:shadow-slate-200/50">
          {/* Desktop Table Header (hidden on mobile) */}
          <div className="hidden md:grid md:grid-cols-12 bg-kutt-card/80 light:bg-slate-50 border-b border-kutt-border light:border-slate-200 text-xs font-bold uppercase tracking-wider text-kutt-muted light:text-slate-500">
            <div className="md:col-span-4 p-5">Dimension</div>
            <div className="md:col-span-4 p-5 border-l border-kutt-border light:border-slate-200 text-red-400/90 light:text-red-600 flex items-center gap-2">
              Traditional Sportsbooks
            </div>
            <div className="md:col-span-4 p-5 border-l border-kutt-green/30 light:border-emerald-200 bg-kutt-green/10 light:bg-emerald-50 text-kutt-green light:text-emerald-700 flex items-center gap-2">
              Kutt Social P2P
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="divide-y divide-white/10 md:divide-white/5 light:divide-slate-200">
            {comparisonItems.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 text-sm hover:bg-white/[0.02] light:hover:bg-slate-50/60 transition-colors p-4 md:p-0 gap-3 md:gap-0"
              >
                {/* Dimension Title */}
                <div className="md:col-span-4 md:p-5 font-bold text-white light:text-slate-900 flex items-center text-sm sm:text-base md:text-sm">
                  <span className="md:hidden inline-block w-2 h-2 rounded-full bg-kutt-green light:bg-emerald-600 mr-2" />
                  {item.feature}
                </div>

                {/* Traditional Book Column / Mobile Card */}
                <div className="md:col-span-4 md:p-5 md:border-l border-white/5 light:border-slate-200 bg-red-950/20 md:bg-transparent light:bg-red-50/60 md:light:bg-transparent rounded-xl md:rounded-none p-3.5 md:p-5 border border-red-500/20 light:border-red-100 md:border-y-0 md:border-r-0 text-kutt-muted light:text-slate-600 flex flex-col md:flex-row md:items-start gap-2 md:gap-2.5">
                  <div className="flex items-center gap-1.5 md:hidden text-[11px] font-mono uppercase font-bold text-red-400 light:text-red-600">
                    <X className="w-3.5 h-3.5 text-red-400 light:text-red-600 shrink-0" />
                    <span>Traditional Sportsbook</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-red-400 light:text-red-600 shrink-0 mt-0.5 hidden md:block" />
                    <span className="text-xs sm:text-sm leading-relaxed">{item.traditional}</span>
                  </div>
                </div>

                {/* Kutt Social P2P Column / Mobile Card */}
                <div className="md:col-span-4 md:p-5 md:border-l border-kutt-green/20 light:border-slate-200 bg-kutt-green/[0.04] md:bg-kutt-green/[0.02] light:bg-emerald-50/40 md:light:bg-emerald-50/20 rounded-xl md:rounded-none p-3.5 md:p-5 border border-kutt-green/30 light:border-emerald-200 md:border-y-0 md:border-r-0 text-white light:text-slate-900 flex flex-col md:flex-row md:items-start gap-2 md:gap-2.5">
                  <div className="flex items-center gap-1.5 md:hidden text-[11px] font-mono uppercase font-bold text-kutt-green light:text-emerald-700">
                    <Check className="w-3.5 h-3.5 text-kutt-green light:text-emerald-600 shrink-0" />
                    <span>Kutt Social P2P</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-kutt-green light:text-emerald-600 shrink-0 mt-0.5 hidden md:block" />
                    <span className="text-xs sm:text-sm font-medium leading-relaxed">{item.kutt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 text-center">
          <p className="text-sm text-kutt-muted light:text-slate-600">
            &quot;Turn the bets you already make into an actual, social, trackable experience.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}
