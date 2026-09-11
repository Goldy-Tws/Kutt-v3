"use client";

import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Trophy,
  ShieldCheck,
  Clock,
  MessageSquare,
  Lock,
  Smartphone,
  Check,
} from "lucide-react";

export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="relative py-24 sm:py-28 bg-[#F8FAFC] text-slate-900 border-y border-slate-200/80 overflow-hidden"
    >

      {/* Subtle ambient architectural grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>The Handshake Bet, Reimagined</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display text-slate-900 tracking-tight leading-tight">
            You Already Bet With Friends. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900">
              Here&apos;s Why Informal Bets Break.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Millions of bets start with &ldquo;I bet you $50.&rdquo; But between ambiguous terms, forgotten Venmos, and awkward reminders, the experience falls apart.
          </p>
        </div>

        {/* Side-by-Side Comparison: Genuine Chat Reality vs. Official Kutt Ticket */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: The Messy Group Chat Reality */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl shadow-slate-200/50 relative flex flex-col justify-between overflow-hidden">
            <div>
              {/* Phone App Mock Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                    🏈
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      Sunday Football Group (4)
                    </h3>
                    <p className="text-[10px] text-slate-400">Dave, Jordan, Alex, You</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                  Unreliable
                </span>
              </div>

              {/* Realistic Chat Messages */}
              <div className="space-y-3 font-sans mb-6 bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
                {/* Incoming Message from Dave */}
                <div className="flex flex-col items-start max-w-[85%]">
                  <span className="text-[10px] font-semibold text-slate-500 mb-1 ml-1">Dave</span>
                  <div className="bg-white text-slate-800 rounded-2xl rounded-tl-sm px-4 py-2.5 text-xs shadow-sm border border-slate-200/60 leading-relaxed">
                    I bet you $50 Chiefs win by at least a touchdown tomorrow night.
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 ml-1">10:14 PM</span>
                </div>

                {/* Outgoing Message from You */}
                <div className="flex flex-col items-end ml-auto max-w-[85%]">
                  <div className="bg-[#007AFF] text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-xs shadow-sm leading-relaxed">
                    You&apos;re on. Bet.
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 mr-1 flex items-center gap-1">
                    10:16 PM • <Check className="w-3 h-3 text-[#007AFF] inline" />
                  </span>
                </div>

                {/* Dispute the morning after */}
                <div className="flex flex-col items-start max-w-[90%] pt-1">
                  <span className="text-[10px] font-semibold text-rose-500 mb-1 ml-1">
                    Dave (Next Morning)
                  </span>
                  <div className="bg-rose-50 text-rose-900 border border-rose-200/80 rounded-2xl rounded-tl-sm px-4 py-2.5 text-xs leading-relaxed">
                    Wait bro, I meant straight up moneyline, not the spread! And my Venmo is frozen till Friday... 😬
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 ml-1">11:02 AM</span>
                </div>

                {/* Unsettled Pill */}
                <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-amber-900">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" /> Venmo Request ($50.00)
                  </span>
                  <span className="font-bold text-amber-700">Pending (8 days ago)</span>
                </div>
              </div>

              {/* Concrete Friction Points */}
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Ambiguous agreements:</strong> Lines get re-interpreted once the game ends.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Awkward debt collection:</strong> Having to remind and chase friends for payment.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Zero history:</strong> No persistent record of your head-to-head dominance.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Informal handshake bets</span>
              <span className="text-rose-600 font-bold">0% Protection</span>
            </div>
          </div>

          {/* Card 2: The Kutt Solution (Fintech Escrow Ticket) */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 border border-emerald-200 shadow-xl shadow-emerald-500/10 relative flex flex-col justify-between overflow-hidden">
            {/* Emerald Top Accent Stripe */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Kutt Escrow Matchup
                    </h3>
                    <p className="text-[10px] font-mono text-emerald-600">ID: #KT-9842 • VERIFIED</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Mutual Lock
                </span>
              </div>

              {/* Digital Escrow Ticket */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 mb-6 shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between text-xs pb-3 mb-3 border-b border-white/10 gap-2">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Event</span>
                    <span className="font-bold text-xs sm:text-sm text-white">Chiefs vs Ravens</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Agreed Line</span>
                    <span className="font-bold text-xs text-emerald-400">Chiefs -6.5 Spread</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-4 my-2 text-xs">
                  <div className="bg-white/5 rounded-xl p-2.5 sm:p-3 border border-white/5">
                    <span className="text-slate-400 block text-[9px] sm:text-[10px] truncate">Challenger (Dave)</span>
                    <span className="font-bold text-white text-xs sm:text-sm">Chiefs -6.5</span>
                    <span className="block text-[10px] sm:text-[11px] text-slate-300 font-mono mt-0.5">$50.00 Locked</span>
                  </div>
                  <div className="bg-emerald-500/10 rounded-xl p-2.5 sm:p-3 border border-emerald-500/30 text-right">
                    <span className="text-emerald-300 block text-[9px] sm:text-[10px] truncate">Counterparty (You)</span>
                    <span className="font-bold text-emerald-400 text-xs sm:text-sm">Ravens +6.5</span>
                    <span className="block text-[10px] sm:text-[11px] text-emerald-300 font-mono mt-0.5">$50.00 Locked</span>
                  </div>
                </div>

                {/* Escrow Status Banner */}
                <div className="mt-3 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10px] sm:text-[11px]">
                  <span className="text-slate-300 flex items-center gap-1 font-medium">
                    <Lock className="w-3 h-3 text-emerald-400 shrink-0" /> $100 Pot Held in Escrow
                  </span>
                  <span className="text-emerald-400 font-bold">Auto-Paid at Whistle</span>
                </div>
              </div>

              {/* Concrete Advantages */}
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Locked Terms:</strong> Both parties agree to exact spread and stakes before the wager goes live.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Guaranteed Escrow:</strong> Stakes are deposited upfront. Zero debt chasing, zero excuses.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Permanent Record:</strong> Automated settlement instantly disburses funds and logs lifetime stats.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <Trophy className="w-3.5 h-3.5 text-emerald-600" /> Lifetime Head-to-Head Tally
              </span>
              <span className="text-emerald-700 font-bold">100% Guaranteed Payout</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
