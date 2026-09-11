"use client";

import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, CheckCircle2, RefreshCw, ShieldCheck } from "lucide-react";

export default function WagerSimulator() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const builderRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const [category, setCategory] = useState("nba");
  const [stake, setStake] = useState(50);
  const [selectedFriend, setSelectedFriend] = useState("jordan");
  const [betSent, setBetSent] = useState(false);
  const [betAccepted, setBetAccepted] = useState(false);

  const categories = [
    { id: "nba", name: "NBA Basketball", matchup: "Boston Celtics vs. LA Lakers", pick: "Celtics -4.5 Spread" },
    { id: "nfl", name: "NFL Football", matchup: "Kansas City Chiefs vs. Buffalo Bills", pick: "Chiefs Moneyline" },
    { id: "ucl", name: "Champions League", matchup: "Real Madrid vs. Man City", pick: "Over 2.5 Total Goals" },
    { id: "culture", name: "Pop Culture", matchup: "Academy Awards 2026", pick: "Best Picture Winner" },
    { id: "custom", name: "Custom Handshake", matchup: "Pickleball Rematch 1v1", pick: "You win 2 sets to 0" },
  ];

  const friends = [
    { id: "jordan", name: "Jordan V.", record: "12-8", avatar: "JV", color: "from-blue-500 to-indigo-600" },
    { id: "marcus", name: "Marcus T.", record: "15-5", avatar: "MT", color: "from-amber-500 to-orange-600" },
    { id: "alex", name: "Alex Chen", record: "9-11", avatar: "AC", color: "from-emerald-500 to-teal-600" },
  ];

  const currentCategory = categories.find((c) => c.id === category) || categories[0];
  const currentFriend = friends.find((f) => f.id === selectedFriend) || friends[0];

  const handleSendChallenge = () => {
    setBetSent(true);
    setBetAccepted(false);

    // Simulate opponent accepting after 1.2s
    setTimeout(() => {
      setBetAccepted(true);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#00FF66", "#38EF7D", "#FFFFFF"],
      });
    }, 1200);
  };

  const handleReset = () => {
    setBetSent(false);
    setBetAccepted(false);
  };

  const totalPot = stake * 2;
  const platformFee = Math.round(totalPot * 0.03 * 100) / 100; // 3% fee
  const winnerPayout = totalPot - platformFee;

  // Subtle Scroll-Driven Reveal & Background Slow Scale
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 0. Very slow subtle 1-2% scale on the background image as section scrolls
      if (bgImageRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { scale: 1 },
          {
            scale: 1.025,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // 1. Header fade & slide up
      if (headerRef.current) {
        tl.from(headerRef.current, {
          y: 16,
          opacity: 0,
          duration: 0.45,
          ease: "power2.out",
        });
      }

      // 2. Builder container stagger
      if (builderRef.current) {
        tl.from(
          builderRef.current.children,
          {
            y: 14,
            opacity: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }

      // 3. Right preview fade & slide
      if (previewRef.current) {
        tl.from(
          previewRef.current,
          {
            y: 16,
            opacity: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.25"
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="simulator"
      className="relative py-12 sm:py-16 lg:py-20 bg-kutt-bg light:bg-[#F8FAFC] border-t border-white/[0.06] light:border-slate-200 overflow-hidden"
    >
      {/* Background Court Image with subtle slow scale and dark gradient veil */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 pointer-events-none will-change-transform bg-cover bg-center origin-center light:opacity-25"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(6, 8, 10, 0.90) 0%, rgba(6, 8, 10, 0.94) 50%, rgba(6, 8, 10, 0.97) 100%), url('/simulator-court-bg.png')`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Compact & Confident */}
        <div ref={headerRef} className="max-w-2xl mx-auto text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display text-white light:text-slate-950 tracking-tight">
            Build Your Kutt
          </h2>
          <p className="mt-2 text-xs sm:text-sm lg:text-base text-kutt-muted light:text-slate-600">
            Choose the event. Pick your opponent. Set the terms.
          </p>
        </div>

        {/* 2-Column Grid: Left Builder + Right Preview with equal height stretch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-stretch">
          {/* LEFT: Builder Controls (7 cols) */}
          <div
            ref={builderRef}
            className="lg:col-span-7 rounded-2xl bg-white/[0.02] light:bg-white border border-white/[0.08] light:border-slate-200/90 light:shadow-xl light:shadow-slate-200/40 p-4 sm:p-6 flex flex-col justify-between gap-5"
          >
            {/* Upper Group: Steps 1, 2, 3 */}
            <div className="space-y-4 sm:space-y-5">
              {/* Step 1: Event & Category Selection */}
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-kutt-muted light:text-slate-500 mb-2 block">
                  1. Select Event Category
                </label>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {categories.map((cat) => {
                    const isSelected = category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setCategory(cat.id);
                          handleReset();
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          isSelected
                            ? "bg-white text-black font-semibold shadow-sm light:bg-slate-900 light:text-white"
                            : "bg-white/[0.04] text-kutt-muted hover:text-white hover:bg-white/[0.07] border border-white/[0.06] light:bg-slate-100 light:text-slate-600 light:hover:text-slate-900 light:border-slate-200"
                        }`}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>

                {/* Active Event Row */}
                <div className="mt-3 pt-3 border-t border-white/[0.06] light:border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div>
                    <span className="text-[10px] font-mono text-kutt-muted light:text-slate-400 uppercase">Matchup</span>
                    <p className="text-xs sm:text-sm font-semibold text-white light:text-slate-900 mt-0.5">{currentCategory.matchup}</p>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-[10px] font-mono text-kutt-muted light:text-slate-400 uppercase">Your Proposed Call</span>
                    <p className="text-xs sm:text-sm font-semibold text-kutt-green light:text-emerald-600 mt-0.5">{currentCategory.pick}</p>
                  </div>
                </div>
              </div>

              {/* Step 2: Opponent Selection */}
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-kutt-muted light:text-slate-500 mb-2 block">
                  2. Pick Your Opponent
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                  {friends.map((friend) => {
                    const isSelected = selectedFriend === friend.id;
                    return (
                      <button
                        key={friend.id}
                        type="button"
                        onClick={() => {
                          setSelectedFriend(friend.id);
                          handleReset();
                        }}
                        className={`p-2.5 rounded-xl text-left transition-all border ${
                          isSelected
                            ? "bg-white/[0.06] border-white/30 shadow-sm light:bg-emerald-50/70 light:border-emerald-500"
                            : "bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04] light:bg-slate-50 light:border-slate-200 light:hover:border-slate-300 light:hover:bg-slate-100"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-full bg-gradient-to-br ${friend.color} flex items-center justify-center text-white font-bold text-xs shrink-0`}
                          >
                            {friend.avatar}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-semibold text-white light:text-slate-900 truncate">{friend.name}</p>
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-kutt-green light:bg-emerald-600" />}
                            </div>
                            <p className="text-[10px] text-kutt-muted light:text-slate-500 font-mono mt-0.5">W-L {friend.record}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Stake Slider */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-kutt-muted light:text-slate-500">
                    3. Your Stake
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black font-display text-white light:text-slate-900">${stake}</span>
                    <span className="text-xs text-kutt-muted light:text-slate-400">/ person</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={stake}
                  aria-label="Stake amount per person"
                  onChange={(e) => {
                    setStake(Number(e.target.value));
                    handleReset();
                  }}
                  className="w-full h-1.5 bg-white/10 light:bg-slate-200 rounded-lg appearance-none cursor-pointer accent-kutt-green focus:outline-none"
                />

                <div className="flex justify-between text-[10px] font-mono text-kutt-muted light:text-slate-400 mt-1.5">
                  <span>$10</span>
                  <span>$250</span>
                  <span>$500</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-1">
              {!betSent ? (
                <button
                  type="button"
                  onClick={handleSendChallenge}
                  className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-kutt-green hover:bg-kutt-mint transition-colors shadow-sm light:shadow-md light:shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 fill-black" />
                  <span>Send Challenge to {currentFriend.name}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full py-3 rounded-xl text-xs font-semibold text-kutt-muted hover:text-white border border-white/10 hover:border-white/20 bg-white/[0.03] light:bg-slate-100 light:border-slate-200 light:text-slate-700 light:hover:text-slate-900 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset & Build Another Kutt</span>
                </button>
              )}
            </div>
          </div>

          {/* RIGHT: Live Preview "Your Kutt" (5 cols) - Equal Height Stretched */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              ref={previewRef}
              className="h-full rounded-2xl bg-white/[0.03] light:bg-white border border-white/[0.08] light:border-slate-200/90 light:shadow-xl light:shadow-slate-200/40 p-4 sm:p-6 relative backdrop-blur-sm flex flex-col justify-between gap-4"
            >
              {/* Upper Group: Header, Matchup Rows, Financial Breakdown */}
              <div className="space-y-4">
                {/* Preview Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] light:border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-white light:text-slate-900">
                    Your Kutt
                  </span>

                  {/* Status Indicator */}
                  {!betSent && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-kutt-muted light:text-slate-600 bg-white/[0.04] light:bg-slate-100 border border-white/[0.08] light:border-slate-200 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                      Ready to Send
                    </span>
                  )}
                  {betSent && !betAccepted && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 light:text-amber-700 bg-amber-500/10 light:bg-amber-50 border border-amber-500/30 light:border-amber-200 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      Challenge Sent
                    </span>
                  )}
                  {betAccepted && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-kutt-green light:text-emerald-700 bg-kutt-green/10 light:bg-emerald-50 border border-kutt-green/30 light:border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-kutt-green light:text-emerald-600" />
                      Challenge Accepted
                    </span>
                  )}
                </div>

                {/* Matchup Summary Rows */}
                <div className="space-y-2.5 text-xs pb-3 border-b border-white/[0.06] light:border-slate-100">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-kutt-muted light:text-slate-500 shrink-0">Event</span>
                    <span className="font-semibold text-white light:text-slate-900 text-right">{currentCategory.matchup}</span>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-kutt-muted light:text-slate-500 shrink-0">Your Call</span>
                    <span className="font-semibold text-kutt-green light:text-emerald-600 text-right">{currentCategory.pick}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-kutt-muted light:text-slate-500">Challenger</span>
                    <span className="font-medium text-white light:text-slate-900">You (${stake})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-kutt-muted light:text-slate-500">Opponent</span>
                    <span className="font-medium text-white light:text-slate-900">{currentFriend.name} (${stake})</span>
                  </div>
                </div>

                {/* Financial Calculation */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-kutt-muted light:text-slate-500">
                    <span>Total Pot</span>
                    <span className="text-white light:text-slate-900 font-mono">${totalPot}.00</span>
                  </div>
                  <div className="flex justify-between text-kutt-muted light:text-slate-500">
                    <span>Platform Fee (3%)</span>
                    <span className="text-white light:text-slate-900 font-mono">-${platformFee.toFixed(2)}</span>
                  </div>
                  <div className="pt-2.5 border-t border-white/[0.06] light:border-slate-100 flex justify-between items-baseline">
                    <span className="text-xs font-bold uppercase tracking-wider text-white light:text-slate-900">Winner Takes</span>
                    <span className="text-2xl sm:text-3xl font-black font-display text-kutt-green light:text-emerald-600">
                      ${winnerPayout.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Anchored Status / Guarantee (Aligns with left Action CTA) */}
              <div className="pt-1">
                {!betSent && (
                  <div className="p-3 rounded-xl bg-white/[0.02] light:bg-slate-50 border border-white/[0.06] light:border-slate-200 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] light:bg-white border border-white/[0.08] light:border-slate-200 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-kutt-green light:text-emerald-600" />
                    </div>
                    <div className="text-xs min-w-0">
                      <p className="font-medium text-white light:text-slate-900">P2P Escrow Protected</p>
                      <p className="text-[11px] text-kutt-muted light:text-slate-500 truncate">Funds secured upon acceptance • 0% house vig</p>
                    </div>
                  </div>
                )}

                {betSent && !betAccepted && (
                  <div className="p-3 rounded-xl bg-amber-500/[0.06] border border-amber-500/30 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                    </div>
                    <div className="text-xs min-w-0">
                      <p className="font-semibold text-amber-300 truncate">Awaiting {currentFriend.name}...</p>
                      <p className="text-[11px] text-kutt-muted truncate">Push challenge dispatched to mobile app</p>
                    </div>
                  </div>
                )}

                {betAccepted && (
                  <div className="p-3 rounded-xl bg-kutt-green/[0.06] border border-kutt-green/30 flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${currentFriend.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                    >
                      {currentFriend.avatar}
                    </div>
                    <div className="text-xs min-w-0">
                      <p className="font-semibold text-white light:text-slate-900 truncate">{currentFriend.name} accepted your challenge!</p>
                      <p className="text-[11px] text-kutt-green light:text-emerald-600 font-medium truncate">Stakes secured in escrow • Payout ready</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
