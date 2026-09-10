"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/context/ThemeContext";
import {
  Sliders,
  Send,
  Lock,
  Trophy,
  ArrowRight,
  Zap,
  ChevronRight,
} from "lucide-react";

const DARK_TOTAL_FRAMES = 48;
const LIGHT_TOTAL_FRAMES = 35;

const getFrameSrc = (isLight: boolean, index: number) => {
  const frameNum = String(index).padStart(3, "0");
  if (isLight) {
    return `/Two_men_interacting_with_phones_light/webp_frames/frame_${frameNum}.webp`;
  }
  return `/how_it_works_frames/frame_${frameNum}.png`;
};

export default function HowItWorks() {
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hud1Ref = useRef<HTMLDivElement>(null);
  const hud2Ref = useRef<HTMLDivElement>(null);
  const hud3Ref = useRef<HTMLDivElement>(null);
  const hud4Ref = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const darkImagesRef = useRef<HTMLImageElement[]>([]);
  const lightImagesRef = useRef<HTMLImageElement[]>([]);
  const currentProgressRef = useRef(0);
  const currentFrameRef = useRef(0);
  const currentStepRef = useRef(0);

  // Keep themeRef synced
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // Direct DOM update helper - Zero React re-renders on scroll
  const updateStepUI = (stepIndex: number) => {
    if (!containerRef.current) return;
    const isLight = themeRef.current === "light";

    const cards = containerRef.current.querySelectorAll<HTMLDivElement>(".step-card");
    cards.forEach((card, idx) => {
      const bar = card.querySelector<HTMLDivElement>(".step-bar");
      if (idx === stepIndex) {
        card.classList.add(
          isLight ? "border-emerald-500" : "border-kutt-green",
          isLight ? "shadow-md" : "shadow-neon",
          "glass-panel-glow"
        );
        card.classList.remove("opacity-60", "border-white/5", "light:border-slate-200/80");
        if (bar) bar.style.width = "100%";
      } else {
        card.classList.remove("border-kutt-green", "shadow-neon", "border-emerald-500", "shadow-md");
        card.classList.add("opacity-60", "border-white/5", "light:border-slate-200/80");
        if (bar) bar.style.width = "0%";
      }
    });

    const crumbs = containerRef.current.querySelectorAll<HTMLSpanElement>(".step-crumb");
    crumbs.forEach((crumb, idx) => {
      if (idx === stepIndex) {
        crumb.classList.add("text-kutt-green", "light:text-emerald-700", "font-bold");
      } else {
        crumb.classList.remove("text-kutt-green", "light:text-emerald-700", "font-bold");
      }
    });
  };

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
    const y = (height - scaledHeight) / 2;

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

  // Preload frames (active theme first for fast loading, secondary in background)
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
      setLoadProgress(Math.round((primaryLoaded / primaryTotal) * 100));

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
      updateStepUI(currentStepRef.current);
    }
  }, [theme, imagesLoaded, drawProgress]);

  // GSAP ScrollTrigger Sequence
  useEffect(() => {
    if (!imagesLoaded) return;

    gsap.registerPlugin(ScrollTrigger);

    const progressObj = { progress: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=320%",
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            currentProgressRef.current = progressObj.progress;
            drawProgress(progressObj.progress);

            // Sync step UI without triggering React component re-renders
            const progress = self.progress;
            const newStep = progress < 0.25 ? 0 : progress < 0.5 ? 1 : progress < 0.75 ? 2 : 3;
            if (newStep !== currentStepRef.current) {
              currentStepRef.current = newStep;
              updateStepUI(newStep);
            }
          },
        },
      });

      // 1. Scrub frames from 0.0 to 1.0 across timeline
      tl.to(progressObj, {
        progress: 1,
        ease: "none",
        duration: 4,
      }, 0);

      // Phase 1 HUD: Friend A Make your call (0 - 1.0)
      tl.fromTo(
        hud1Ref.current,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.3 },
        0.1
      );
      tl.to(hud1Ref.current, { opacity: 0, y: -20, duration: 0.3 }, 0.85);

      // Phase 2 HUD: Challenge travels across to Friend B (1.0 - 2.0)
      tl.fromTo(
        hud2Ref.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, ease: "power2.out", duration: 0.3 },
        1.1
      );
      tl.to(hud2Ref.current, { opacity: 0, scale: 0.95, duration: 0.3 }, 1.85);

      // Phase 3 HUD: Lock in escrow (2.0 - 3.0)
      tl.fromTo(
        hud3Ref.current,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, ease: "power2.out", duration: 0.3 },
        2.1
      );
      tl.to(hud3Ref.current, { opacity: 0, y: -20, duration: 0.3 }, 2.85);

      // Phase 4 HUD: Game conclusion & Winner (3.0 - 3.8)
      tl.fromTo(
        hud4Ref.current,
        { opacity: 0, scale: 0.85, y: 30 },
        { opacity: 1, scale: 1, y: 0, ease: "back.out(1.5)", duration: 0.4 },
        3.1
      );
      tl.to(hud4Ref.current, { opacity: 0, scale: 0.9, duration: 0.3 }, 3.7);

      // Outro Tagline over final stadium frame (3.7 - 4.0)
      tl.fromTo(
        outroRef.current,
        { opacity: 0, y: 30, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out", duration: 0.4 },
        3.7
      );
    }, containerRef);

    const handleResize = () => {
      drawProgress(currentProgressRef.current);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, [imagesLoaded, drawProgress]);

  const stepDetails = [
    {
      num: "01",
      icon: Sliders,
      label: "Make Your Call",
      headline: "Set Your Bet & Stakes",
      desc: "Pick your team, customize the point spread or moneyline, and choose the stakes. No rigid bookmaker limits—your bet, your terms.",
      badge: "0% — 25%",
    },
    {
      num: "02",
      icon: Send,
      label: "Challenge A Friend",
      headline: "Send It Phone-to-Phone",
      desc: "Send the challenge directly to your buddy via link or chat, or post it to the feed for any verified rival to take the other side.",
      badge: "25% — 50%",
    },
    {
      num: "03",
      icon: Lock,
      label: "Lock It In",
      headline: "Mutual Acceptance & Escrow",
      desc: "Both of you review and confirm. Funds are locked into bank-grade escrow before tip-off. No backing out, no excuses.",
      badge: "50% — 75%",
    },
    {
      num: "04",
      icon: Trophy,
      label: "See Who's Right",
      headline: "Live Settlement & Bragging Rights",
      desc: "Official league scores verify the outcome. The winner gets paid instantly, and the rivalry leaderboard updates forever.",
      badge: "75% — 100%",
    },
  ];

  return (
    <div className="w-full relative">
      <section
        ref={containerRef}
        id="how-it-works"
        className="relative w-full h-screen bg-kutt-bg light:bg-[#F8FAFC] overflow-hidden select-none flex flex-col justify-between pt-20 sm:pt-24 pb-4 sm:pb-6"
      >
        {/* Background ambient lighting */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-kutt-green/5 blur-[140px] pointer-events-none rounded-full light:hidden" />

        {/* Top Header */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-kutt-green/10 light:bg-emerald-50 border border-kutt-green/30 light:border-emerald-200 text-[11px] font-bold text-kutt-green light:text-emerald-700 uppercase tracking-wider mb-2">
            <Zap className="w-3 h-3" />
            <span>The Social Way To Bet</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-display text-white light:text-slate-950 tracking-tight">
            How Kutt Works
          </h2>
          {/* Human Storyline Breadcrumb */}
          <div className="mt-2 hidden sm:flex items-center justify-center gap-3 text-xs font-semibold text-kutt-muted light:text-slate-500">
            <span className="step-crumb text-kutt-green light:text-emerald-700 font-bold transition-colors">
              Make A Call
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-white/20 light:text-slate-400" />
            <span className="step-crumb transition-colors">
              Challenge A Friend
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-white/20 light:text-slate-400" />
            <span className="step-crumb transition-colors">
              Lock It In
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-white/20 light:text-slate-400" />
            <span className="step-crumb transition-colors">
              See Who Was Right
            </span>
          </div>
        </div>

        {/* Centerpiece: Cinematic Canvas + Interactive HUD Layer */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex-1 flex items-center justify-center my-1.5">
          <div className="relative w-full aspect-[16/9] max-h-[44vh] sm:max-h-[48vh] rounded-2xl overflow-hidden glass-panel-glow border border-kutt-green/30 light:border-slate-200/90 light:shadow-2xl">
            {/* Canvas Scrubber */}
            <canvas ref={canvasRef} className="w-full h-full object-cover" />

            {/* Vignette Gradients (hidden in light mode so no dark or white wash-out overlay exists) */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-kutt-bg/90 via-transparent to-kutt-bg/40 light:hidden" />

            {/* HUD OVERLAY 1: Friend A Make Call (0% - 25%) */}
            <div
              ref={hud1Ref}
              className="absolute top-3 left-3 sm:top-6 sm:left-6 z-20 pointer-events-none opacity-0 max-w-[85%] sm:max-w-xs"
            >
              <div className="glass-panel-glow light:bg-white/95 light:border-slate-200/90 rounded-xl p-3 sm:p-3.5 border border-kutt-green/40 shadow-neon light:shadow-xl">
                <div className="flex items-center gap-2 mb-1.5 text-[9px] sm:text-[10px] font-mono text-kutt-green light:text-emerald-700 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-kutt-green animate-ping" />
                  Friend A • Creating Call
                </div>
                <p className="text-xs font-bold text-white light:text-slate-900">
                  &quot;Celtics -4.5 vs Lakers. $50 on it.&quot;
                </p>
                <div className="mt-2 pt-2 border-t border-white/10 light:border-slate-100 flex items-center justify-between text-[10px] text-kutt-muted light:text-slate-500">
                  <span>Stakes: $50</span>
                  <span className="text-kutt-green light:text-emerald-600 font-semibold">Custom Line</span>
                </div>
              </div>
            </div>

            {/* HUD OVERLAY 2: Challenge Travels to Friend B (25% - 50%) */}
            <div
              ref={hud2Ref}
              className="absolute inset-0 z-20 pointer-events-none opacity-0 flex items-center justify-center px-3 sm:px-4"
            >
              <div className="glass-panel-glow light:bg-white/95 light:border-slate-200/90 rounded-2xl p-3.5 sm:p-5 border border-kutt-green shadow-neon-lg light:shadow-xl text-center max-w-md">
                <div className="flex items-center justify-center gap-1.5 sm:gap-3 text-[10px] sm:text-xs font-bold text-white light:text-slate-900 mb-2 flex-wrap">
                  <span className="px-2 sm:px-2.5 py-1 rounded-lg bg-white/10 light:bg-slate-100">Friend A (Sim)</span>
                  <span className="flex items-center gap-1 text-kutt-green light:text-emerald-600 text-[10px] sm:text-[11px]">
                    <span>── challenge ──→</span>
                  </span>
                  <span className="px-2 sm:px-2.5 py-1 rounded-lg bg-kutt-green/20 text-kutt-green border border-kutt-green/40 light:bg-emerald-100 light:text-emerald-800">
                    Friend B (Jordan)
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-white light:text-slate-900">
                  &quot;Jordan, you taking Lakers +4.5 tonight?&quot;
                </p>
                <p className="text-[10px] sm:text-[11px] text-kutt-muted light:text-slate-500 mt-1">
                  Challenge delivered straight to phone • Awaiting acceptance
                </p>
              </div>
            </div>

            {/* HUD OVERLAY 3: Mutual Lock & Escrow (50% - 75%) */}
            <div
              ref={hud3Ref}
              className="absolute top-3 right-3 sm:top-6 sm:right-6 z-20 pointer-events-none opacity-0 max-w-[85%] sm:max-w-xs"
            >
              <div className="glass-panel-glow light:bg-white/95 light:border-slate-200/90 rounded-xl p-3 sm:p-3.5 border border-kutt-green/40 shadow-neon light:shadow-xl">
                <div className="flex items-center gap-2 mb-1.5 text-[9px] sm:text-[10px] font-bold text-kutt-green light:text-emerald-700 uppercase tracking-wider">
                  <Lock className="w-3.5 h-3.5" />
                  Challenge Confirmed!
                </div>
                <p className="text-xs font-bold text-white light:text-slate-900">
                  Jordan: &quot;Accepted. You&apos;re on.&quot;
                </p>
                <div className="mt-2 pt-2 border-t border-white/10 light:border-slate-100 flex items-center justify-between text-[10px] text-kutt-muted light:text-slate-500">
                  <span>$100 Pot Locked</span>
                  <span className="text-kutt-green light:text-emerald-600 font-semibold">Ready for Tip-Off</span>
                </div>
              </div>
            </div>

            {/* HUD OVERLAY 4: Final Whistle & Winner (75% - 100%) */}
            <div
              ref={hud4Ref}
              className="absolute inset-0 z-20 pointer-events-none opacity-0 flex items-center justify-center px-4"
            >
              <div className="glass-panel-glow light:bg-white/95 light:border-slate-200/90 rounded-2xl p-5 border border-kutt-green shadow-neon-lg light:shadow-xl text-center max-w-md">
                <div className="w-12 h-12 rounded-full bg-kutt-green text-black mx-auto flex items-center justify-center mb-3 shadow-neon">
                  <Trophy className="w-6 h-6 fill-black" />
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-kutt-green light:text-emerald-700 mb-1">
                  Final Buzzer • Score Verified
                </div>
                <h3 className="text-lg font-black font-display text-white light:text-slate-900">
                  Celtics 112, Lakers 104
                </h3>
                <p className="text-xs text-white/90 light:text-slate-700 mt-1 font-medium">
                  Sim won by 8 points (Covered -4.5)!
                </p>
                <div className="mt-3 pt-3 border-t border-white/10 light:border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-kutt-muted light:text-slate-500">Payout:</span>
                  <span className="text-kutt-green light:text-emerald-600 font-extrabold text-sm">$100 Instant Transfer</span>
                </div>
              </div>
            </div>

            {/* OUTRO BANNER AT 100% */}
            <div
              ref={outroRef}
              className="absolute inset-0 z-30 pointer-events-none opacity-0 flex flex-col items-center justify-center text-center bg-black/60 light:bg-slate-950/80 backdrop-blur-md px-4"
            >
              <p className="text-xs uppercase tracking-widest text-kutt-green font-bold mb-2">
                The Peer-to-Peer Verdict
              </p>
              <h3 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight">
                Your call. Their challenge. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-kutt-green to-white light:from-emerald-400 light:to-white">
                  One outcome.
                </span>
              </h3>
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-kutt-muted light:text-slate-300">
                <span>Scroll down to create your first wager below</span>
                <ArrowRight className="w-3.5 h-3.5 text-kutt-green animate-bounce" />
              </div>
            </div>
          </div>
        </div>

        {/* Synchronized 4-Step Cards */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stepDetails.map((s, idx) => {
              const Icon = s.icon;
              const isFirst = idx === 0;

              return (
                <div
                  key={s.num}
                  className={`step-card rounded-xl p-3.5 sm:p-4 transition-all duration-300 flex flex-col justify-between ${
                    isFirst
                      ? "glass-panel-glow border-kutt-green shadow-neon light:bg-white light:border-emerald-500 light:shadow-md"
                      : "glass-panel border-white/5 opacity-60 light:opacity-90 light:bg-white light:border-slate-200/80"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-xs font-black font-mono ${
                          isFirst ? "text-kutt-green light:text-emerald-700" : "text-kutt-muted light:text-slate-400"
                        }`}
                      >
                        {s.num}
                      </span>
                      <Icon
                        className={`w-4 h-4 ${
                          isFirst ? "text-kutt-green light:text-emerald-700" : "text-kutt-muted light:text-slate-400"
                        }`}
                      />
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white light:text-slate-900 mb-1">
                      {s.label}
                    </h4>
                    <p className="text-[11px] text-kutt-muted light:text-slate-600 leading-relaxed line-clamp-2">
                      {s.desc}
                    </p>
                  </div>

                  {/* Active progress bar indicator */}
                  <div className="mt-3 pt-2 border-t border-white/5 light:border-slate-100">
                    <div className="w-full bg-white/5 light:bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div
                        style={{ width: isFirst ? "100%" : "0%" }}
                        className="step-bar h-full bg-kutt-green light:bg-emerald-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
