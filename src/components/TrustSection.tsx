"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/context/ThemeContext";
import {
  ShieldCheck,
  Lock,
  UserCheck,
  Scale,
  Eye,
  CheckCircle2,
  Activity,
  Shield,
  FileCheck,
} from "lucide-react";

const DARK_TOTAL_FRAMES = 30;
const LIGHT_TOTAL_FRAMES = 40;

const getFrameSrc = (isLight: boolean, index: number) => {
  const num = String(index).padStart(3, "0");
  if (isLight) {
    return `/Man_and_woman_exchanging_challenge_light/webp_frames/frame_${num}.webp`;
  }
  return `/Two_people_holding_glowing_smart__202609071445_frames/Two_people_holding_glowing_smart__202609071445_frames/frame_${num}.png`;
};

export default function TrustSection() {
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const node1Ref = useRef<HTMLDivElement>(null);
  const node2Ref = useRef<HTMLDivElement>(null);
  const node3Ref = useRef<HTMLDivElement>(null);
  const node4Ref = useRef<HTMLDivElement>(null);

  const [activeTrustPillar, setActiveTrustPillar] = useState<number | null>(null);

  const darkImagesRef = useRef<HTMLImageElement[]>([]);
  const lightImagesRef = useRef<HTMLImageElement[]>([]);
  const currentProgressRef = useRef(0);
  const currentFrameRef = useRef(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Sync themeRef
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // Minimal Trust Bar items (6 core pillars)
  const trustBarItems = [
    {
      id: "escrow",
      title: "ESCROW",
      desc: "Funds protected until terms are met",
      detail: "100% segregated mutual lock the instant both accept. Payout guaranteed to winner.",
      icon: Lock,
    },
    {
      id: "verification",
      title: "VERIFICATION",
      desc: "Participants and outcomes verified",
      detail: "Automated official league feeds and public consensus data settle every wager.",
      icon: Eye,
    },
    {
      id: "identity",
      title: "IDENTITY",
      desc: "Real people, verified identities",
      detail: "Mandatory KYC checks ensure you always challenge real friends, never house bots.",
      icon: UserCheck,
    },
    {
      id: "transparency",
      title: "TRANSPARENCY",
      desc: "Clear terms before acceptance",
      detail: "Zero hidden juice or variable odds. Both parties agree on exact payout before locking.",
      icon: FileCheck,
    },
    {
      id: "security",
      title: "DATA SECURITY",
      desc: "Secure handling of account information",
      detail: "256-bit bank-grade encryption with multi-factor authentication on every transfer.",
      icon: ShieldCheck,
    },
    {
      id: "responsible",
      title: "RESPONSIBLE PLAY",
      desc: "Built with responsible participation in mind",
      detail: "Personal deposit caps, voluntary cooling-off periods, and strict 21+ verification.",
      icon: Scale,
    },
  ];

  // Draw frame with object-fit: cover scaling on canvas
  const drawFrame = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const scale = Math.max(width / imgWidth, height / imgHeight);
    const scaledWidth = imgWidth * scale;
    const scaledHeight = imgHeight * scale;

    const x = (width - scaledWidth) / 2;
    // Pin top when scaledHeight > height so heads and concourse lighting are never clipped
    const excessHeight = scaledHeight - height;
    const y = excessHeight > 0
      ? 0
      : (height - scaledHeight) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
    ctx.restore();
  }, []);

  const drawProgress = useCallback((progress: number, overrideTheme?: "dark" | "light") => {
    const activeTheme = overrideTheme || themeRef.current;
    const isLight = activeTheme === "light";
    const total = isLight ? LIGHT_TOTAL_FRAMES : DARK_TOTAL_FRAMES;
    const images = isLight ? lightImagesRef.current : darkImagesRef.current;

    const frameIndex = Math.min(
      total - 1,
      Math.max(0, Math.floor(progress * total))
    );
    currentFrameRef.current = frameIndex;

    const img = images[frameIndex];
    if (img && img.complete && img.naturalWidth > 0) {
      drawFrame(img);
    } else if (img) {
      img.onload = () => {
        if (themeRef.current === activeTheme) {
          drawFrame(img);
        }
      };
    }
  }, [drawFrame]);

  // Preload frames (active theme first for instant interactivity, secondary in background)
  useEffect(() => {
    let isMounted = true;
    const isLightInitial = theme === "light";
    const primaryTotal = isLightInitial ? LIGHT_TOTAL_FRAMES : DARK_TOTAL_FRAMES;
    const secondaryTotal = isLightInitial ? DARK_TOTAL_FRAMES : LIGHT_TOTAL_FRAMES;

    const darkImages: HTMLImageElement[] = [];
    const lightImages: HTMLImageElement[] = [];

    let primaryLoaded = 0;

    const onPrimaryLoad = (idx: number, img: HTMLImageElement) => {
      if (!isMounted) return;
      primaryLoaded++;

      if (idx === 1 && canvasRef.current) {
        drawFrame(img);
      }

      if (primaryLoaded >= primaryTotal) {
        setImagesLoaded(true);
      }
    };

    // 1. Preload active theme first
    for (let i = 1; i <= primaryTotal; i++) {
      const img = new Image();
      img.src = getFrameSrc(isLightInitial, i);
      img.onload = () => onPrimaryLoad(i, img);
      img.onerror = () => onPrimaryLoad(i, img);

      if (isLightInitial) {
        lightImages.push(img);
      } else {
        darkImages.push(img);
      }
    }

    if (isLightInitial) {
      lightImagesRef.current = lightImages;
    } else {
      darkImagesRef.current = darkImages;
    }

    // 2. Preload secondary theme in background
    const secondaryIsLight = !isLightInitial;
    for (let i = 1; i <= secondaryTotal; i++) {
      const img = new Image();
      img.src = getFrameSrc(secondaryIsLight, i);
      if (secondaryIsLight) {
        lightImages.push(img);
      } else {
        darkImages.push(img);
      }
    }

    if (secondaryIsLight) {
      lightImagesRef.current = lightImages;
    } else {
      darkImagesRef.current = darkImages;
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Redraw when theme changes
  useEffect(() => {
    if (imagesLoaded) {
      drawProgress(currentProgressRef.current, theme);
    }
  }, [theme, imagesLoaded, drawProgress]);

  // GSAP ScrollTrigger Sequence - Pinned for ~180vh
  useEffect(() => {
    if (typeof window === "undefined" || !imagesLoaded) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const pinEl = pinWrapperRef.current;
    if (!pinEl) return;

    const isLight = themeRef.current === "light";

    // Draw initial frame
    drawProgress(0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: "top top",
          end: "+=180%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            currentProgressRef.current = p;
            drawProgress(p);
          },
        },
      });

      // Canvas opacity curve
      if (canvasRef.current) {
        tl.fromTo(
          canvasRef.current,
          { opacity: isLight ? 0.95 : 0.25 },
          { opacity: 1.0, ease: "power1.inOut", duration: 0.4 },
          0
        );
        tl.to(
          canvasRef.current,
          { opacity: isLight ? 0.95 : 0.35, ease: "power1.out", duration: 0.15 },
          0.85
        );
      }

      // 0–20%: Initial Header "TRUST IS BUILT IN"
      if (introRef.current) {
        tl.fromTo(
          introRef.current,
          { opacity: 1, y: 0 },
          { opacity: 0, y: -24, ease: "power2.in", duration: 0.12 },
          0.16
        );
      }

      // 20–40%: Node 01 - VERIFIED PEOPLE ("Know who you're challenging")
      if (node1Ref.current) {
        tl.fromTo(
          node1Ref.current,
          { opacity: 0, y: 24, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.08 },
          0.20
        );
        tl.to(
          node1Ref.current,
          { opacity: 0, y: -20, scale: 0.96, ease: "power2.in", duration: 0.06 },
          0.38
        );
      }

      // 40–60%: Node 02 - TERMS LOCKED ("Person A → Kutt ← Person B")
      if (node2Ref.current) {
        tl.fromTo(
          node2Ref.current,
          { opacity: 0, y: 24, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.08 },
          0.40
        );
        tl.to(
          node2Ref.current,
          { opacity: 0, y: -20, scale: 0.96, ease: "power2.in", duration: 0.06 },
          0.58
        );
      }

      // 60–80%: Node 03 - OBJECTIVE OUTCOME ("The central connection becomes brighter")
      if (node3Ref.current) {
        tl.fromTo(
          node3Ref.current,
          { opacity: 0, y: 24, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.08 },
          0.60
        );
        tl.to(
          node3Ref.current,
          { opacity: 0, y: -20, scale: 0.96, ease: "power2.in", duration: 0.06 },
          0.78
        );
      }

      // 80–100%: Node 04 - FAIR SETTLEMENT (Instant Payout)
      if (node4Ref.current) {
        tl.fromTo(
          node4Ref.current,
          { opacity: 0, y: 24, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.08 },
          0.80
        );
        tl.to(
          node4Ref.current,
          { opacity: 0, y: -16, ease: "power2.in", duration: 0.08 },
          0.94
        );
      }
    }, pinEl);

    // Canvas resize handler
    const handleResize = () => {
      drawProgress(currentProgressRef.current);
    };

    window.addEventListener("resize", handleResize);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
      ctx.revert();
    };
  }, [imagesLoaded, drawProgress]);

  return (
    <div className="w-full relative">
      {/* ========================================================================= */}
      {/* 1. CINEMATIC SCROLL-PINNED SECTION (180vh sequence)                       */}
      {/* ========================================================================= */}
      <section
        id="trust"
        ref={pinWrapperRef}
        className="relative h-[100dvh] min-h-[560px] w-full bg-kutt-bg light:bg-[#F8FAFC] overflow-hidden flex flex-col justify-center items-center select-none"
      >
        {/* Canvas Scrubber for smartphone connection frames */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none will-change-transform object-cover"
        />

        {/* Ambient Dark Gradient Overlays (hidden in light mode so no wash out) */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#06080A] via-transparent to-[#06080A] opacity-90 light:hidden" />
        <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-[#06080A]/40 to-[#06080A]/90 light:hidden" />

        {/* 0–20%: INTRO STAGE (Independent full-screen overlay) */}
        <div
          ref={introRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none"
        >
          <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 rounded-full bg-white/[0.04] light:bg-white/90 border border-white/[0.1] light:border-slate-200 text-[10px] sm:text-[11px] font-mono font-semibold text-kutt-muted light:text-slate-700 uppercase tracking-wider light:shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-kutt-green light:text-emerald-600 shrink-0" />
              <span className="hidden sm:inline">Know who you&apos;re playing • Know what&apos;s at stake • Know how it ends</span>
              <span className="sm:hidden">Verified P2P • Locked Escrow • Fair Settlement</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-white light:text-slate-950 tracking-tight uppercase">
              Trust Is Built In.
            </h2>

            <p className="max-w-xl mx-auto text-xs sm:text-base lg:text-lg text-kutt-muted light:text-slate-600 font-normal light:font-medium leading-relaxed px-2">
              Every Kutt starts with clear terms, verified participants, and a defined outcome.
            </p>
          </div>
        </div>

        {/* 20–40%: NODE 01 - VERIFIED PEOPLE (Independent full-screen overlay) */}
        <div
          ref={node1Ref}
          className="absolute inset-0 z-20 flex items-center justify-center text-center px-4 pointer-events-none opacity-0"
        >
          <div className="max-w-md w-full mx-auto rounded-2xl bg-[#06080A]/90 light:bg-white/95 border border-white/10 light:border-slate-200/90 backdrop-blur-xl p-5 sm:p-8 shadow-2xl light:shadow-2xl light:shadow-slate-900/15 space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.06] light:bg-emerald-50 border border-white/10 light:border-emerald-200 text-kutt-green light:text-emerald-700 mb-1">
              <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="block text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-kutt-green light:text-emerald-700">
              01 • PROTOCOL NODE
            </span>
            <h3 className="text-xl sm:text-3xl font-black font-display text-white light:text-slate-950 tracking-tight uppercase">
              Verified People
            </h3>
            <p className="text-xs sm:text-sm text-kutt-muted light:text-slate-600 leading-relaxed font-normal">
              Know who you&apos;re challenging. Real identities and confirmed friends. Zero anonymous house bots or rigged odds.
            </p>
          </div>
        </div>

        {/* 40–60%: NODE 02 - TERMS LOCKED (Independent full-screen overlay) */}
        <div
          ref={node2Ref}
          className="absolute inset-0 z-20 flex items-center justify-center text-center px-4 pointer-events-none opacity-0"
        >
          <div className="max-w-md sm:max-w-lg w-full mx-auto rounded-2xl bg-[#06080A]/90 light:bg-white/95 border border-kutt-green/30 light:border-emerald-500/30 backdrop-blur-xl p-5 sm:p-8 shadow-[0_0_40px_rgba(0,255,102,0.1)] light:shadow-2xl light:shadow-slate-900/15 space-y-3 sm:space-y-4">
            <span className="block text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-kutt-green light:text-emerald-700">
              02 • ESCROW NODE
            </span>
            <h3 className="text-xl sm:text-3xl font-black font-display text-white light:text-slate-950 tracking-tight uppercase">
              Terms Locked
            </h3>

            {/* Animated P2P Connection Diagram: Person A → Kutt ← Person B */}
            <div className="p-2.5 sm:p-3.5 rounded-xl bg-white/[0.04] light:bg-slate-50 border border-white/10 light:border-slate-200 flex items-center justify-between text-xs gap-1 sm:gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-500/20 text-blue-400 font-bold font-mono text-[9px] sm:text-[10px] flex items-center justify-center border border-blue-500/30 shrink-0">
                  PA
                </span>
                <span className="font-semibold text-white light:text-slate-900 text-[11px] sm:text-xs truncate">Person A</span>
              </div>

              <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-full bg-kutt-green/15 light:bg-emerald-100 border border-kutt-green/40 light:border-emerald-300 text-kutt-green light:text-emerald-800 font-mono font-bold text-[9px] sm:text-[10px] shrink-0">
                <span>→</span>
                <Lock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>KUTT ESCROW</span>
                <span>←</span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <span className="font-semibold text-white light:text-slate-900 text-[11px] sm:text-xs truncate">Person B</span>
                <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold font-mono text-[9px] sm:text-[10px] flex items-center justify-center border border-amber-500/30 shrink-0">
                  PB
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-kutt-muted light:text-slate-600 leading-relaxed font-normal">
              Stakes are securely locked in segregated escrow the instant both parties accept. You are 100% guaranteed to be paid.
            </p>
          </div>
        </div>

        {/* 60–80%: NODE 03 - OBJECTIVE OUTCOME (Independent full-screen overlay) */}
        <div
          ref={node3Ref}
          className="absolute inset-0 z-20 flex items-center justify-center text-center px-4 pointer-events-none opacity-0"
        >
          <div className="max-w-md w-full mx-auto rounded-2xl bg-[#06080A]/90 light:bg-white/95 border border-white/10 light:border-slate-200/90 backdrop-blur-xl p-5 sm:p-8 shadow-2xl light:shadow-2xl light:shadow-slate-900/15 space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.06] light:bg-emerald-50 border border-white/10 light:border-emerald-200 text-emerald-400 light:text-emerald-700 mb-1">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="block text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400 light:text-emerald-700">
              03 • VERIFICATION NODE
            </span>
            <h3 className="text-xl sm:text-3xl font-black font-display text-white light:text-slate-950 tracking-tight uppercase">
              Objective Outcome
            </h3>
            <p className="text-xs sm:text-sm text-kutt-muted light:text-slate-600 leading-relaxed font-normal">
              The central connection illuminates. Official league APIs and immutable public consensus records resolve every call.
            </p>
          </div>
        </div>

        {/* 80–100%: NODE 04 - FAIR SETTLEMENT (Independent full-screen overlay) */}
        <div
          ref={node4Ref}
          className="absolute inset-0 z-20 flex items-center justify-center text-center px-4 pointer-events-none opacity-0"
        >
          <div className="max-w-md w-full mx-auto rounded-2xl bg-[#06080A]/90 light:bg-white/95 border border-kutt-green/40 light:border-emerald-500/30 backdrop-blur-xl p-5 sm:p-8 shadow-[0_0_40px_rgba(0,255,102,0.12)] light:shadow-2xl light:shadow-slate-900/15 space-y-2.5 sm:space-y-3">
            <div className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-kutt-green text-black mb-1">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span className="block text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-kutt-green light:text-emerald-700">
              04 • SETTLEMENT NODE
            </span>
            <h3 className="text-xl sm:text-3xl font-black font-display text-white light:text-slate-950 tracking-tight uppercase">
              Fair Settlement
            </h3>
            <p className="text-xs sm:text-sm text-kutt-muted light:text-slate-600 leading-relaxed font-normal">
              Funds disperse instantaneously to the winner&apos;s account. Zero bookmaker holding periods, zero arbitrary withdrawal limits.
            </p>
          </div>
        </div>

        {/* Bottom subtle scroll cue */}
        <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-kutt-muted light:text-slate-500">
          <span>Scroll To Explore Verification</span>
          <span className="w-1.5 h-1.5 rounded-full bg-kutt-green light:bg-emerald-600 animate-pulse" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MINIMAL HORIZONTAL TRUST BAR (Moved directly underneath)               */}
      {/* ========================================================================= */}
      <section className="relative py-14 sm:py-18 bg-kutt-bg light:bg-[#F8FAFC] border-t border-white/[0.08] light:border-slate-200 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Eyebrow */}
          <div className="text-center mb-8">
            <span className="text-[10px] font-mono uppercase tracking-widest text-kutt-muted light:text-slate-500">
              INSTITUTIONAL GRADE STANDARDS • 6-PILLAR PROTOCOL
            </span>
          </div>

          {/* Minimal 2-Row Horizontal Trust Grid */}
          <div className="rounded-2xl border border-white/[0.08] light:border-slate-200/90 divide-y divide-white/[0.08] light:divide-slate-200 bg-white/[0.01] light:bg-white light:shadow-xl light:shadow-slate-200/40 overflow-hidden">
            {/* ROW 1: ESCROW | VERIFICATION | IDENTITY */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] light:divide-slate-200">
              {trustBarItems.slice(0, 3).map((item, idx) => {
                const Icon = item.icon;
                const isSelected = activeTrustPillar === idx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTrustPillar(isSelected ? null : idx)}
                    className={`p-5 sm:p-6 text-left transition-colors group relative cursor-pointer ${
                      isSelected
                        ? "bg-white/[0.04] light:bg-emerald-50/60"
                        : "hover:bg-white/[0.02] light:hover:bg-slate-50/80"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold tracking-widest uppercase text-white light:text-slate-900 group-hover:text-kutt-green light:group-hover:text-emerald-700 transition-colors flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-kutt-green light:text-emerald-600" />
                        {item.title}
                      </span>
                      <span className="text-[10px] text-kutt-muted light:text-slate-400 font-mono">0{idx + 1}</span>
                    </div>
                    <p className="text-xs text-kutt-muted light:text-slate-600 font-normal leading-relaxed">
                      {item.desc}
                    </p>
                    {isSelected && (
                      <p className="mt-2.5 pt-2.5 border-t border-white/[0.06] light:border-emerald-100 text-[11px] text-kutt-green/90 light:text-emerald-700 font-mono">
                        {item.detail}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ROW 2: TRANSPARENCY | DATA SECURITY | RESPONSIBLE PLAY */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] light:divide-slate-200">
              {trustBarItems.slice(3, 6).map((item, idx) => {
                const Icon = item.icon;
                const actualIndex = idx + 3;
                const isSelected = activeTrustPillar === actualIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTrustPillar(isSelected ? null : actualIndex)}
                    className={`p-5 sm:p-6 text-left transition-colors group relative cursor-pointer ${
                      isSelected
                        ? "bg-white/[0.04] light:bg-emerald-50/60"
                        : "hover:bg-white/[0.02] light:hover:bg-slate-50/80"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold tracking-widest uppercase text-white light:text-slate-900 group-hover:text-kutt-green light:group-hover:text-emerald-700 transition-colors flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-kutt-green light:text-emerald-600" />
                        {item.title}
                      </span>
                      <span className="text-[10px] text-kutt-muted light:text-slate-400 font-mono">0{actualIndex + 1}</span>
                    </div>
                    <p className="text-xs text-kutt-muted light:text-slate-600 font-normal leading-relaxed">
                      {item.desc}
                    </p>
                    {isSelected && (
                      <p className="mt-2.5 pt-2.5 border-t border-white/[0.06] light:border-emerald-100 text-[11px] text-kutt-green/90 light:text-emerald-700 font-mono">
                        {item.detail}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Minimal Footer Badges Strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-8 lg:gap-10 text-[10px] sm:text-[11px] font-mono text-kutt-muted light:text-slate-600 text-center">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-kutt-green light:text-emerald-600 shrink-0" />
              256-Bit SSL Encryption
            </span>
            <span className="hidden sm:inline text-white/10 light:text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-kutt-green light:text-emerald-600 shrink-0" />
              100% Segregated Solvency
            </span>
            <span className="hidden sm:inline text-white/10 light:text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-kutt-green light:text-emerald-600 shrink-0" />
              Automated League Feeds
            </span>
            <span className="hidden sm:inline text-white/10 light:text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-kutt-green light:text-emerald-600 shrink-0" />
              Mandatory 21+ Age Verification
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
