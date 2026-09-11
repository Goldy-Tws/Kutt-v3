"use client";

import KuttLogo from "./KuttLogo";
import { ArrowUpRight, ShieldCheck, Zap, Smartphone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-kutt-bg border-t border-kutt-border/60 overflow-hidden pt-24 pb-12 light:bg-[#F8FAFC] light:border-slate-200">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-kutt-green/10 blur-[140px] pointer-events-none rounded-full light:opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Massive Final CTA Banner */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-14 mb-16 sm:mb-20 text-center border border-kutt-green/40 shadow-2xl light:bg-white light:border-emerald-500/30 light:shadow-2xl light:shadow-slate-200/60">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-kutt-green/10 border border-kutt-green/30 text-xs font-bold text-kutt-green uppercase tracking-wider mb-5 sm:mb-6 light:bg-emerald-50 light:border-emerald-200 light:text-emerald-700 light:shadow-sm">
            <Zap className="w-3.5 h-3.5 light:text-emerald-600" />
            <span>Ready To Prove Your Point?</span>
          </div>

          <h2 className="text-2xl sm:text-5xl md:text-6xl font-black font-display text-white light:text-slate-950 tracking-tight leading-tight max-w-3xl mx-auto">
            Stop Saying &quot;I Bet You.&quot; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kutt-green via-kutt-mint to-white light:from-emerald-600 light:via-teal-600 light:to-slate-950 text-glow light:[text-shadow:none]">
              Put It On Kutt.
            </span>
          </h2>

          <p className="mt-4 sm:mt-5 text-xs sm:text-base text-kutt-muted light:text-slate-600 max-w-xl mx-auto leading-relaxed font-normal light:font-medium">
            Join thousands of sports fans, college rivalries, and friend circles who wager directly against each other with zero house vig.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <a
              href="#simulator"
              className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-kutt-green hover:bg-kutt-mint light:bg-[#00E85D] light:hover:bg-[#00FF66] transition-all duration-300 shadow-neon-lg light:shadow-md light:shadow-emerald-500/25 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Create Your First Wager</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="#simulator"
              className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-semibold text-white/90 hover:text-white light:text-slate-800 light:hover:text-slate-950 bg-kutt-card/60 hover:bg-kutt-card light:bg-slate-100 light:hover:bg-slate-200 border border-white/10 hover:border-kutt-green/40 light:border-slate-300 light:hover:border-emerald-500 backdrop-blur-md transition-all flex items-center justify-center gap-2 light:shadow-sm"
            >
              <Smartphone className="w-4 h-4 text-kutt-green light:text-emerald-600" />
              <span>Download for iOS & Android</span>
            </a>
          </div>

          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-kutt-muted light:text-slate-500">
            <span className="flex items-center gap-1.5 text-kutt-green light:text-emerald-700 font-semibold">
              <ShieldCheck className="w-4 h-4 shrink-0 light:text-emerald-600" /> 100% Escrow Solvency
            </span>
            <span className="hidden sm:inline text-white/20 light:text-slate-300">•</span>
            <span className="light:text-slate-600">Zero House Vig on Friends</span>
            <span className="hidden sm:inline text-white/20 light:text-slate-300">•</span>
            <span className="light:text-slate-600">Instant Automated Settlement</span>
          </div>
        </div>

        {/* Footer Navigation & Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-kutt-border/60 light:border-slate-200">
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <KuttLogo className="h-8 sm:h-9 w-auto" />
            <p className="text-xs text-kutt-muted leading-relaxed max-w-sm light:text-slate-600">
              KUTT is the peer-to-peer social betting platform where you challenge real people, customize terms, and compete on verifiable outcomes.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 light:text-slate-900">Platform</h4>
            <ul className="space-y-2.5 text-xs text-kutt-muted light:text-slate-600">
              <li><a href="#how-it-works" className="hover:text-white transition-colors light:hover:text-emerald-700">How It Works</a></li>
              <li><a href="#vs-house" className="hover:text-white transition-colors light:hover:text-emerald-700">Kutt vs Sportsbooks</a></li>
              <li><a href="#simulator" className="hover:text-white transition-colors light:hover:text-emerald-700">Interactive Bet Simulator</a></li>
              <li><a href="#social" className="hover:text-white transition-colors light:hover:text-emerald-700">Social & Rivalries</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 light:text-slate-900">Trust & Legal</h4>
            <ul className="space-y-2.5 text-xs text-kutt-muted light:text-slate-600">
              <li><a href="#trust" className="hover:text-white transition-colors light:hover:text-emerald-700">Bank-Grade Escrow</a></li>
              <li><a href="#trust" className="hover:text-white transition-colors light:hover:text-emerald-700">KYC & Identity Verification</a></li>
              <li><a href="#trust" className="hover:text-white transition-colors light:hover:text-emerald-700">Geolocation & Eligibility</a></li>
              <li><a href="#trust" className="hover:text-white transition-colors light:hover:text-emerald-700">Responsible Gaming (21+)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 light:text-slate-900">Stay Connected</h4>
            <p className="text-xs text-kutt-muted mb-3 light:text-slate-600">
              Get invited to private tournaments and high-stakes community pools.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email..."
                className="w-full bg-kutt-surface border border-kutt-border rounded-lg px-3 py-2 text-xs text-white placeholder:text-kutt-muted focus:outline-none focus:border-kutt-green light:bg-white light:border-slate-300 light:text-slate-900 light:placeholder:text-slate-400 light:focus:border-emerald-500"
              />
              <button className="px-4 py-2 rounded-lg bg-kutt-green text-black font-bold text-xs uppercase tracking-wider hover:bg-kutt-mint transition-colors shrink-0">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Responsible Gaming & Legal Disclaimer */}
        <div className="pt-8 space-y-4 text-[11px] text-kutt-muted/70 leading-relaxed light:text-slate-500">
          <p>
            <strong>Responsible Gaming Notice:</strong> KUTT is committed to responsible wagering. Must be 21+ and physically located in a jurisdiction where peer-to-peer social wagering is legally authorized. Participation is void where prohibited by law.
          </p>
          <p>
            If you or someone you know has a gambling problem and wants help, call the National Council on Problem Gambling helpline at <strong>1-800-522-4700</strong> or visit <a href="https://www.ncpgambling.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-white light:hover:text-slate-900">ncpgambling.org</a>.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-kutt-muted light:text-slate-500">
            <p className="text-center sm:text-left">© {new Date().getFullYear()} KUTT Inc. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6 text-center">
              <a href="#" className="hover:text-white transition-colors light:hover:text-slate-900">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors light:hover:text-slate-900">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors light:hover:text-slate-900">House Rules</a>
              <a href="#" className="hover:text-white transition-colors light:hover:text-slate-900">Security</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
