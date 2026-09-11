"use client";

import { Award, Dribbble, Globe2, TrendingUp, CheckCircle2, Sparkles } from "lucide-react";

export default function MarketsSection() {
  const markets = [
    {
      icon: Dribbble,
      title: "Major & College Sports",
      badge: "Top Volume",
      image: "/major&college.png",
      description: "NFL, NBA, MLB, Champions League, UFC, Formula 1, and college rivalries with user-defined lines.",
      examples: ["Super Bowl Spread", "NBA MVP Head-to-Head", "Premier League Top 4 Finish"],
    },
    {
      icon: Award,
      title: "Pop Culture & Entertainment",
      badge: "Fan Favorite",
      image: "/poCulture.png",
      description: "Awards season, box-office blockbusters, reality TV finales, and verifiable streaming milestones.",
      examples: ["Academy Award Best Picture", "Grammys Album of the Year", "Emmy Drama Series"],
    },
    {
      icon: Globe2,
      title: "Civic & Election Milestones",
      badge: "Verifiable Data",
      image: "/civic-milstone.png",
      description: "Major election results, legislative benchmark dates, and public consensus events with trusted official data.",
      examples: ["US Presidential Election", "Mayoral Outcomes", "Policy Ratifications"],
    },
    {
      icon: TrendingUp,
      title: "Custom Handshakes & Props",
      badge: "100% Expressive",
      image: "/custom.png",
      description: "Create bets for your local golf tournament, 5K race times, or workplace challenges with objective proof.",
      examples: ["Local Pickleball Championship", "Fantasy League Last Place Penalty", "Marathon Sub-3hr Finish"],
    },
  ];

  return (
    <section id="markets" className="relative py-20 sm:py-28 bg-kutt-bg light:bg-white border-t border-white/[0.06] light:border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] light:bg-slate-100 border border-white/[0.1] light:border-slate-200 text-xs font-semibold text-kutt-textLight light:text-slate-700 uppercase tracking-wider mb-4">
            <span>Beyond The Traditional Book</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white light:text-slate-950 tracking-tight">
            If It Can Be Verified, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kutt-green to-white light:from-emerald-600 light:to-teal-800">
              It Can Become A Kutt Wager
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-kutt-muted light:text-slate-600">
            Why be restricted to standard casino lines? From Sunday Night Football to the Oscars, challenge your network on anything with an objective outcome.
          </p>
        </div>

        {/* 4 Category Cards with Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {markets.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.02] light:bg-white border border-white/[0.08] light:border-slate-200/90 light:shadow-md light:shadow-slate-200/30 hover:border-kutt-green/40 light:hover:border-emerald-500 light:hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden backdrop-blur-sm hover:shadow-[0_0_30px_rgba(0,255,102,0.06)]"
              >
                <div>
                  {/* Photo Header with Dark Gradient Veil */}
                  <div className="relative h-44 w-full overflow-hidden bg-black/40">
                    <img
                      src={m.image}
                      alt={m.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Gradient blending photo into card surface (hidden in light mode to prevent white washout overlay) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06080A] via-[#06080A]/40 to-transparent light:hidden" />

                    {/* Top Floating Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/70 light:bg-white/90 backdrop-blur-md text-white light:text-slate-900 border border-white/10 light:border-slate-200">
                        {m.badge}
                      </span>
                    </div>

                    {/* Category Icon Pill */}
                    <div className="absolute bottom-3 left-4 z-10 w-9 h-9 rounded-xl bg-black/80 light:bg-white backdrop-blur-md border border-white/10 light:border-slate-200 flex items-center justify-center text-kutt-green light:text-emerald-600 group-hover:bg-kutt-green group-hover:text-black transition-colors light:shadow-md">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <h3 className="text-base font-bold text-white light:text-slate-900 mb-2 group-hover:text-kutt-green light:group-hover:text-emerald-600 transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-xs text-kutt-muted light:text-slate-600 leading-relaxed mb-5">
                      {m.description}
                    </p>

                    <div className="pt-4 border-t border-white/[0.06] light:border-slate-100 space-y-2">
                      <div className="text-[10px] font-mono font-semibold text-kutt-muted light:text-slate-400 uppercase tracking-wider">
                        Popular Examples:
                      </div>
                      {m.examples.map((ex, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-white/90 light:text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-kutt-green light:text-emerald-600 shrink-0" />
                          <span className="truncate">{ex}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
