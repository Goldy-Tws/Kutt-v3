"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageSquare, Users, Trophy, UserCheck, Sparkles, Activity } from "lucide-react";

export default function SocialLayer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  const liveFeeds = [
    {
      id: 1,
      user1: "Sim Harmon",
      user2: "Jordan Vance",
      avatar1: "SH",
      avatar2: "JV",
      wager: "Boston Celtics -4.5 vs Lakers",
      pot: "$100 Pot",
      status: "Accepted & In Escrow",
      chatter: "Sim: 'Dinner is on you after the 4th quarter!'",
    },
    {
      id: 2,
      user1: "Marcus Taylor",
      user2: "Chris Evans",
      avatar1: "MT",
      avatar2: "CE",
      wager: "Chiefs 30+ pts vs Bills",
      pot: "$250 Pot",
      status: "Live 3rd Quarter",
      chatter: "Marcus: 'Mahomes already has 2 TDs in the half.'",
    },
    {
      id: 3,
      user1: "Sarah Jenkins",
      user2: "Elena Rostova",
      avatar1: "SJ",
      avatar2: "ER",
      wager: "Best Director Academy Award",
      pot: "$60 Pot",
      status: "Verified & Settled",
      chatter: "Elena: 'Paid instantly! Good call on Nolan.'",
    },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Subtle background scale: 1.00 -> 1.03 & upward shift
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.0, y: 0 },
          {
            scale: 1.03,
            y: -25,
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

      // 2. Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 3. Stagger 3 cards: Profile & H2H -> Chat -> Groups / Leaderboard
      if (cardsRef.current) {
        gsap.fromTo(
          ".social-card",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.12,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 4. Live Activity Feed reveal
      if (feedRef.current) {
        gsap.fromTo(
          feedRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: feedRef.current,
              start: "top 90%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    // Refresh ScrollTrigger calculations after mounting
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="social"
      className="relative py-16 sm:py-20 lg:py-24 bg-kutt-bg light:bg-[#F8FAFC] border-t border-white/[0.06] light:border-slate-200 overflow-hidden"
    >
      {/* Background: Faint Friends & Rooftop Atmosphere */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none will-change-transform bg-cover bg-center origin-center opacity-[0.15] light:opacity-[0.06] filter blur-[1px]"
        style={{
          backgroundImage: "url('/socialbg.png')",
        }}
      />

      {/* Dark gradient veil for high contrast and smooth edge transitions */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-kutt-bg/92 via-kutt-bg/85 to-kutt-bg/96 light:from-[#F8FAFC]/95 light:via-[#F8FAFC]/85 light:to-[#F8FAFC]/95"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Social Story */}
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] light:bg-white border border-white/[0.1] light:border-slate-200 text-[11px] font-semibold text-kutt-muted light:text-slate-700 uppercase tracking-widest mb-4 light:shadow-sm">
            <Users className="w-3.5 h-3.5 text-kutt-green light:text-emerald-600" />
            <span>friendship • rivalry • community</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display text-white light:text-slate-950 tracking-tight uppercase">
            The Game Is Better Together.
          </h2>

          <p className="mt-3 text-sm sm:text-base lg:text-lg text-kutt-muted light:text-slate-600 font-normal">
            Challenge your friends. Talk your trash. Keep the score.
          </p>
        </div>

        {/* 3 Staggered Social Pillar Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-12 sm:mb-16">
          {/* Pillar 1: Profile & Lifetime H2H */}
          <div className="social-card group rounded-2xl bg-white/[0.03] light:bg-white border border-white/[0.08] light:border-slate-200/90 hover:border-white/20 light:hover:border-slate-300 light:shadow-md light:shadow-slate-200/30 p-5 sm:p-6 transition-colors flex flex-col justify-between backdrop-blur-sm">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] light:bg-slate-100 border border-white/[0.08] light:border-slate-200 flex items-center justify-center text-kutt-green light:text-emerald-600 mb-4 group-hover:scale-105 transition-transform">
                <UserCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-kutt-muted light:text-slate-400 block mb-1">
                01 • Head-to-Head History
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white light:text-slate-900 mb-2">
                Lifetime Rivalry Records
              </h3>
              <p className="text-xs sm:text-sm text-kutt-muted light:text-slate-600 leading-relaxed">
                Every wager between you and your buddies is permanently recorded. No forgotten bets, no excuses, and absolute bragging rights across multi-year rivalries.
              </p>
            </div>

            {/* Micro H2H Preview */}
            <div className="mt-5 pt-4 border-t border-white/[0.06] light:border-slate-100 bg-white/[0.02] light:bg-slate-50 -mx-1 px-3 py-2.5 rounded-xl flex items-center justify-between text-xs">
              <span className="font-semibold text-white light:text-slate-900">You vs. Marcus T.</span>
              <span className="font-mono text-kutt-green light:text-emerald-600 font-bold">15 — 5 • +$340</span>
            </div>
          </div>

          {/* Pillar 2: Real-Time Chat & Banter */}
          <div className="social-card group rounded-2xl bg-white/[0.04] light:bg-white border border-kutt-green/30 light:border-emerald-300 p-5 sm:p-6 transition-colors flex flex-col justify-between backdrop-blur-sm shadow-[0_0_25px_rgba(0,255,102,0.05)] light:shadow-md light:shadow-emerald-500/10">
            <div>
              <div className="w-10 h-10 rounded-xl bg-kutt-green text-black flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5 fill-black" />
              </div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-kutt-green light:text-emerald-700 block mb-1">
                02 • Real-Time Banter
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white light:text-slate-900 mb-2">
                In-Wager Live Chat
              </h3>
              <p className="text-xs sm:text-sm text-kutt-muted light:text-slate-600 leading-relaxed">
                Direct 1-on-1 banter and group reactions right inside the wager thread while the 4th quarter unfolds. When the buzzer sounds, payouts and receipts land instantly.
              </p>
            </div>

            {/* Micro Chat Snippet */}
            <div className="mt-5 pt-4 border-t border-white/[0.06] light:border-slate-100 bg-white/[0.02] light:bg-slate-50 -mx-1 px-3 py-2.5 rounded-xl flex items-center gap-2 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-kutt-green shrink-0 animate-pulse" />
              <span className="text-kutt-muted light:text-slate-600 truncate italic">
                JV: &quot;Dinner is on you after this 3-pointer 🍽️&quot;
              </span>
            </div>
          </div>

          {/* Pillar 3: Groups & Leaderboards */}
          <div className="social-card group rounded-2xl bg-white/[0.03] light:bg-white border border-white/[0.08] light:border-slate-200/90 hover:border-white/20 light:hover:border-slate-300 light:shadow-md light:shadow-slate-200/30 p-5 sm:p-6 transition-colors flex flex-col justify-between backdrop-blur-sm">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] light:bg-slate-100 border border-white/[0.08] light:border-slate-200 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-105 transition-transform">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-kutt-muted light:text-slate-400 block mb-1">
                03 • Community Circles
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white light:text-slate-900 mb-2">
                Private Groups & Standings
              </h3>
              <p className="text-xs sm:text-sm text-kutt-muted light:text-slate-600 leading-relaxed">
                Invite-only hubs for your college crew, fantasy league, or golf squad. See who dominates the circle, who pays immediately, and who owns the group crown.
              </p>
            </div>

            {/* Micro Leaderboard Preview */}
            <div className="mt-5 pt-4 border-t border-white/[0.06] light:border-slate-100 bg-white/[0.02] light:bg-slate-50 -mx-1 px-3 py-2.5 rounded-xl flex items-center justify-between text-xs">
              <span className="text-white light:text-slate-900 font-medium">#1 Jordan V. (18-4)</span>
              <span className="text-amber-400 font-mono text-[11px] font-semibold">Group Leader 👑</span>
            </div>
          </div>
        </div>

        {/* Live Peer Activity Feed */}
        <div
          ref={feedRef}
          className="rounded-2xl bg-white/[0.02] light:bg-white border border-white/[0.08] light:border-slate-200/90 p-5 sm:p-7 backdrop-blur-sm light:shadow-xl light:shadow-slate-200/40"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-white/[0.06] light:border-slate-100 gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-kutt-green animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-white light:text-slate-900">
                Live Peer Activity Feed
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-kutt-muted light:text-slate-500">
              <Activity className="w-3.5 h-3.5 text-kutt-green light:text-emerald-600" />
              <span>Real-Time P2P Settlement Feed</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {liveFeeds.map((feed) => (
              <div
                key={feed.id}
                className="bg-white/[0.02] light:bg-slate-50 rounded-xl p-3.5 border border-white/[0.06] light:border-slate-200 hover:border-white/20 light:hover:border-slate-300 light:hover:bg-white light:hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <div className="flex items-center gap-1.5 min-w-0 flex-1 mr-2">
                      <span className="w-6 h-6 rounded-full bg-white/10 light:bg-slate-200 text-white light:text-slate-900 font-bold text-[10px] flex items-center justify-center border border-white/10 light:border-slate-300 shrink-0">
                        {feed.avatar1}
                      </span>
                      <span className="text-kutt-muted light:text-slate-400 text-[10px] font-mono shrink-0">vs</span>
                      <span className="w-6 h-6 rounded-full bg-kutt-green/20 text-kutt-green font-bold text-[10px] flex items-center justify-center border border-kutt-green/30 shrink-0">
                        {feed.avatar2}
                      </span>
                      <span className="text-xs font-medium text-white light:text-slate-900 ml-1 truncate">
                        {feed.user1.split(" ")[0]} vs {feed.user2.split(" ")[0]}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-kutt-green light:text-emerald-600 shrink-0">{feed.pot}</span>
                  </div>

                  <p className="text-xs font-semibold text-white light:text-slate-900 truncate mb-1">
                    {feed.wager}
                  </p>
                  <p className="text-[10px] text-kutt-muted light:text-slate-500 font-medium mb-3">
                    Status: <span className="text-white light:text-slate-900">{feed.status}</span>
                  </p>
                </div>

                <div className="bg-black/30 light:bg-slate-100 rounded-lg p-2 text-[11px] text-kutt-muted light:text-slate-600 italic flex items-center gap-1.5 border border-white/[0.04] light:border-slate-200">
                  <MessageSquare className="w-3 h-3 text-kutt-green light:text-emerald-600 shrink-0 not-italic" />
                  <span className="truncate">{feed.chatter}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
