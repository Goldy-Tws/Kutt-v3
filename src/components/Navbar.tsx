"use client";

import { useState, useEffect } from "react";
import KuttLogo from "./KuttLogo";
import ThemeToggle from "./ThemeToggle";
import { ArrowUpRight, Menu, X, Smartphone, ShieldCheck, Zap } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 light:bg-none light:shadow-none ${
          scrolled
            ? "py-2 bg-kutt-bg/90 light:bg-white/95 backdrop-blur-xl border-b border-kutt-border/70 light:border-slate-200/90 shadow-lg shadow-black/60 light:shadow-none"
            : "py-3.5 bg-gradient-to-b from-kutt-bg/80 via-kutt-bg/40 to-transparent light:bg-white light:border-b light:border-slate-200/90 backdrop-blur-sm light:shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="#" className="flex items-center shrink-0">
            <KuttLogo className="h-7 sm:h-8 w-auto" />
          </a>

          {/* Desktop Navigation Links - Compact, Sleek, Strictly Single Line */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-semibold text-kutt-muted light:text-slate-600 whitespace-nowrap">
            <a
              href="#how-it-works"
              className="hover:text-white light:hover:text-slate-950 transition-colors duration-200"
            >
              How It Works
            </a>
            <a
              href="#problem"
              className="hover:text-white light:hover:text-slate-950 transition-colors duration-200"
            >
              The Problem
            </a>
            <a
              href="#vs-house"
              className="hover:text-white light:hover:text-slate-950 transition-colors duration-200"
            >
              Vs Sportsbooks
            </a>
            <a
              href="#simulator"
              className="hover:text-white light:hover:text-slate-950 transition-colors duration-200 flex items-center gap-1.5"
            >
              <span>Wager Simulator</span>
              <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-kutt-green/15 text-kutt-green border border-kutt-green/30 light:bg-emerald-50 light:text-emerald-700 light:border-emerald-200">
                Live
              </span>
            </a>
            <a
              href="#social"
              className="hover:text-white light:hover:text-slate-950 transition-colors duration-200"
            >
              Social Layer
            </a>
            <a
              href="#trust"
              className="hover:text-white light:hover:text-slate-950 transition-colors duration-200 flex items-center gap-1"
            >
              <ShieldCheck className="w-3 h-3 text-kutt-green light:text-emerald-600" />
              <span>Trust & Security</span>
            </a>
          </nav>

          {/* Action Buttons & Theme Toggle - Compact & Sleek */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <ThemeToggle />

            <a
              href="#simulator"
              className="px-3 py-1.5 rounded-full text-xs font-medium text-kutt-muted hover:text-white light:text-slate-700 light:hover:text-slate-900 border border-white/10 hover:border-white/20 light:border-slate-200 light:hover:border-slate-300 transition-all flex items-center gap-1.5 bg-white/5 light:bg-slate-100 light:hover:bg-slate-200 whitespace-nowrap"
            >
              <Smartphone className="w-3 h-3 text-kutt-green light:text-emerald-600" />
              <span>App</span>
            </a>

            <a
              href="#simulator"
              className="group relative px-4 py-1.5 rounded-full text-xs font-bold text-black uppercase tracking-wider bg-kutt-green hover:bg-kutt-mint transition-all duration-300 shadow-neon light:shadow-md light:shadow-emerald-500/20 flex items-center gap-1.5 whitespace-nowrap overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Zap className="w-3 h-3 fill-black shrink-0" />
              <span>Challenge a Friend</span>
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-kutt-border light:border-slate-200 text-kutt-muted light:text-slate-700 hover:text-white light:hover:text-slate-950 focus:outline-none shrink-0"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-kutt-bg/95 light:bg-white/98 backdrop-blur-2xl lg:hidden flex flex-col justify-between pt-24 pb-8 px-6 border-b border-kutt-border light:border-slate-200 animate-in fade-in duration-200 overflow-y-auto max-h-screen">
          <div className="flex flex-col gap-5 text-base font-semibold">
            {/* Theme Toggle row in Mobile */}
            <div className="flex items-center justify-between pb-3 border-b border-kutt-border light:border-slate-200">
              <span className="text-xs uppercase tracking-wider text-kutt-muted light:text-slate-500 font-mono">
                Theme Mode
              </span>
              <ThemeToggle showLabel />
            </div>

            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white light:text-slate-900 hover:text-kutt-green light:hover:text-emerald-600 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#problem"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white light:text-slate-900 hover:text-kutt-green light:hover:text-emerald-600 transition-colors"
            >
              The Problem With Handshake Bets
            </a>
            <a
              href="#simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="text-kutt-green light:text-emerald-600 hover:underline flex items-center justify-between"
            >
              <span>Interactive Wager Simulator</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-kutt-green/20 text-kutt-green border border-kutt-green/30 light:bg-emerald-50 light:text-emerald-700 light:border-emerald-200">
                Interactive
              </span>
            </a>
            <a
              href="#vs-house"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white light:text-slate-900 hover:text-kutt-green light:hover:text-emerald-600 transition-colors"
            >
              Vs Traditional Sportsbooks
            </a>
            <a
              href="#social"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white light:text-slate-900 hover:text-kutt-green light:hover:text-emerald-600 transition-colors"
            >
              Social Layer & Rivalries
            </a>
            <a
              href="#markets"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white light:text-slate-900 hover:text-kutt-green light:hover:text-emerald-600 transition-colors"
            >
              Markets & Categories
            </a>
            <a
              href="#trust"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white light:text-slate-900 hover:text-kutt-green light:hover:text-emerald-600 transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-kutt-green light:text-emerald-600" />
              <span>Trust, Escrow & Compliance</span>
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white light:text-slate-900 hover:text-kutt-green light:hover:text-emerald-600 transition-colors"
            >
              Frequently Asked Questions
            </a>
          </div>

          <div className="flex flex-col gap-3 pt-6 mt-6 border-t border-kutt-border light:border-slate-200">
            <a
              href="#simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-full text-center font-bold text-xs uppercase tracking-wider text-black bg-kutt-green shadow-neon light:shadow-md flex items-center justify-center gap-2"
            >
              <Zap className="w-3.5 h-3.5 fill-black" />
              <span>Create Wager Now</span>
            </a>
            <p className="text-center text-xs text-kutt-muted light:text-slate-500">
              Must be 21+. Terms & state eligibility apply.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

