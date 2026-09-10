"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "@/context/ThemeContext";
import { ArrowDown, Shield, Users, Zap, CheckCircle2, ChevronRight, MessageSquare } from "lucide-react";

const DARK_TOTAL_FRAMES = 30;
const LIGHT_TOTAL_FRAMES = 32;

const getFrameSrc = (isLight: boolean, index: number) => {
  const frameNum = String(index).padStart(3, "0");
  if (isLight) {
    return `/Two_men_walking_on_court_light/Two_men_walking_on_court_20260910112727_frames/frame_${frameNum}.png`;
  }
  return `/frames/frame_${frameNum}.png`;
};

export default function HeroCanvasScroll() {
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const phoneCardRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const darkImagesRef = useRef<HTMLImageElement[]>([]);
  const lightImagesRef = useRef<HTMLImageElement[]>([]);
  const currentProgressRef = useRef(0);
  const currentFrameRef = useRef(0);

  // Keep themeRef synced
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // Draw a specific image frame on canvas with object-fit cover math
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

    // Prevent top cropping: when scaledHeight > height, pin top (y = 0) so players'
    // heads and arena lighting are never clipped, cropping only excess court floor at the bottom
    const excessHeight = scaledHeight - height;
    const y = excessHeight > 0
      ? 0
      : (height - scaledHeight) / 2;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
    ctx.restore();
  }, []);

  // Draw frame according to current progress (0.0 to 1.0) and theme
  const drawProgress = useCallback((progress: number, overrideTheme?: "dark" | "light") => {
    const activeTheme = overrideTheme || themeRef.current;
    const isLightMode = activeTheme === "light";
    const total = isLightMode ? LIGHT_TOTAL_FRAMES : DARK_TOTAL_FRAMES;
    const images = isLightMode ? lightImagesRef.current : darkImagesRef.current;

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

    const onPrimaryFrameLoad = (idx: number, img: HTMLImageElement) => {
      if (!isMounted) return;
      primaryLoaded++;
      setLoadProgress(Math.round((primaryLoaded / primaryTotal) * 100));

      // Draw initial frame as soon as frame 1 is ready
      if (idx === 1 && canvasRef.current) {
        drawFrame(img);
      }

      if (primaryLoaded >= primaryTotal) {
        setImagesLoaded(true);
      }
    };

    // 1. Load active theme frames first
    for (let i = 1; i <= primaryTotal; i++) {
      const img = new Image();
      img.src = getFrameSrc(isLightInitial, i);
      img.onload = () => onPrimaryFrameLoad(i, img);
      img.onerror = () => onPrimaryFrameLoad(i, img);

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

    // 2. Load secondary theme frames in background
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
  }, []); // Run once on mount

  // Redraw whenever theme changes
  useEffect(() => {
    if (imagesLoaded) {
      drawProgress(currentProgressRef.current, theme);
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
          end: "+=350%",
          pin: true,
          scrub: 0.6,
          onUpdate: () => {
            currentProgressRef.current = progressObj.progress;
            drawProgress(progressObj.progress);
          },
        },
      });

      // 1. Scrub frames from 0.0 to 1.0 across timeline
      tl.to(progressObj, {
        progress: 1,
        ease: "none",
        duration: 3,
      }, 0);

      // 2. Text 1: Bet With People (0% - 25%)
      tl.to(text1Ref.current, {
        opacity: 0,
        y: -40,
        filter: "blur(8px)",
        ease: "power1.in",
        duration: 0.7,
      }, 0.5);

      // 3. Text 2: Camera pushes toward players (30% - 65%)
      tl.fromTo(
        text2Ref.current,
        { opacity: 0, y: 50, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out", duration: 0.6 },
        0.9
      );

      tl.to(text2Ref.current, {
        opacity: 0,
        y: -40,
        filter: "blur(8px)",
        ease: "power1.in",
        duration: 0.5,
      }, 1.7);

      // 4. Camera zoom into the smartphone & Interactive wager HUD (65% - 100%)
      // Anchor origin near upper body (50% 18%) and apply downward translation (y: "6%")
      // so players' heads and hair are never cropped by the viewport top or navbar
      tl.to(canvasRef.current, {
        scale: 1.15,
        x: "-2%",
        y: "6%",
        transformOrigin: "50% 18%",
        ease: "power2.inOut",
        duration: 1.2,
      }, 1.8);

      // Reveal Phone / Live Wager HUD over the focal point
      tl.fromTo(
        phoneCardRef.current,
        {
          opacity: 0,
          scale: 0.6,
          y: 80,
          rotateX: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          ease: "power3.out",
          duration: 0.8,
        },
        2.1
      );

      // Text 3: Phone becomes focal point / Transition to Section 2
      tl.fromTo(
        text3Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.6 },
        2.2
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

  return (
    <div className="w-full relative">
      <div ref={containerRef} className="relative w-full h-screen bg-kutt-bg light:bg-[#F8FAFC] overflow-hidden select-none">
        {/* Loading overlay - persistent in DOM to prevent React reconciliation errors */}
        <div
          className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-kutt-bg light:bg-[#F8FAFC] transition-opacity duration-500 ${
            imagesLoaded ? "opacity-0 pointer-events-none invisible" : "opacity-100 visible"
          }`}
        >
          <div className="w-16 h-16 relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-kutt-green/20 light:border-emerald-500/20 border-t-kutt-green light:border-t-emerald-600 animate-spin" />
            <span className="text-xs font-bold text-kutt-green light:text-emerald-700">{loadProgress}%</span>
          </div>
          <p className="mt-4 text-xs tracking-widest uppercase text-kutt-muted light:text-slate-500 font-medium">
            Loading Cinematic Arena Sequence...
          </p>
        </div>

        {/* Main Canvas Scrubber Container */}
        <div ref={stageRef} className="absolute inset-0 w-full h-full">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover will-change-transform"
          />

          {/* Dark Mode Overlays: Cinematic Vignette & Ambient Glow (hidden in light mode) */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-kutt-bg via-transparent to-kutt-bg/60 transition-opacity duration-300 light:hidden" />
          <div className="absolute inset-0 pointer-events-none bg-radial-glow opacity-80 transition-opacity duration-300 light:hidden" />
        </div>

        {/* OVERLAY 1: Initial Hero State (0% - 25% Scroll) */}
        <div
          ref={text1Ref}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none"
        >
          <div className="pointer-events-auto max-w-4xl mx-auto flex flex-col items-center pt-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-kutt-card/80 border border-kutt-green/40 backdrop-blur-md shadow-neon-border mb-6 light:bg-white/95 light:border-emerald-300 light:shadow-md light:shadow-emerald-500/10">
              <span className="w-2 h-2 rounded-full bg-kutt-green light:bg-emerald-600 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-widest text-kutt-green light:text-emerald-700">
                The Social Betting Platform
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white light:text-slate-950 uppercase leading-[1.0] sm:leading-[0.95] light:drop-shadow-[0_2px_16px_rgba(255,255,255,0.9)]">
              Think You&apos;re Right? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-kutt-green via-kutt-mint to-white light:from-emerald-600 light:via-teal-600 light:to-slate-900 text-glow light:[text-shadow:none]">
                Prove It.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-lg md:text-xl text-kutt-textLight/90 light:text-slate-700 max-w-xl mx-auto font-normal light:font-medium leading-relaxed px-2 light:drop-shadow-[0_1px_8px_rgba(255,255,255,0.9)]">
              Challenge your friends, make your call, and see who gets it right.
            </p>

            {/* CTA Group */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
              <a
                href="#simulator"
                className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-kutt-green hover:bg-kutt-mint light:bg-[#00E85D] light:hover:bg-[#00FF66] transition-all duration-300 shadow-neon-lg light:shadow-md light:shadow-emerald-500/25 flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Challenge a Friend Now</span>
              </a>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-semibold text-white/90 hover:text-white light:text-slate-800 light:hover:text-slate-950 bg-kutt-card/60 hover:bg-kutt-card light:bg-white/95 light:hover:bg-white border border-white/10 hover:border-kutt-green/40 light:border-slate-300 light:hover:border-emerald-500 backdrop-blur-md transition-all flex items-center justify-center gap-2 light:shadow-sm"
              >
                <span>See How It Works</span>
                <ChevronRight className="w-4 h-4 text-kutt-green light:text-emerald-600" />
              </a>
            </div>
          </div>
        </div>

        {/* OVERLAY 2: Camera Pushes Toward Players (30% - 60% Scroll) */}
        <div
          ref={text2Ref}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none opacity-0"
        >
          <div className="max-w-2xl bg-kutt-surface/85 light:bg-white/95 border border-kutt-border light:border-slate-200/90 p-5 sm:p-8 rounded-2xl backdrop-blur-xl shadow-2xl shadow-black/80 light:shadow-2xl light:shadow-slate-900/15">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-kutt-green/10 text-kutt-green light:bg-emerald-50 light:text-emerald-700 border border-kutt-green/30 light:border-emerald-200 text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4">
              <Users className="w-3.5 h-3.5" />
              <span>Direct Head-To-Head Competition</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-white light:text-slate-950 tracking-tight">
              Known Opponents. Real Rivalries.
            </h2>
            <p className="mt-3 text-xs sm:text-base text-kutt-muted light:text-slate-600 leading-relaxed">
              Unlike anonymous sportsbooks where you play against a math model designed to beat you, Kutt connects you with friends and recognizable fans. When you win, you collect directly from them.
            </p>
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-kutt-textLight light:text-slate-700 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-kutt-green light:text-emerald-600 shrink-0" /> 1-on-1 Escrow
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-kutt-green light:text-emerald-600 shrink-0" /> Zero House Vig
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-kutt-green light:text-emerald-600 shrink-0" /> Mutual Acceptance
              </span>
            </div>
          </div>
        </div>

        {/* OVERLAY 3: Focus on Smartphone & Floating Interactive Wager Card (65% - 100% Scroll) */}
        <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center px-4 sm:px-12 md:px-20">
          <div
            ref={phoneCardRef}
            className="pointer-events-auto max-w-md w-full glass-panel-glow rounded-2xl p-4 sm:p-6 shadow-2xl border border-kutt-green/40 light:border-emerald-500/30 opacity-0 transform translate-y-12 light:bg-white/95 light:shadow-2xl light:shadow-slate-900/15"
          >
            {/* Top Status Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-kutt-border light:border-slate-200">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kutt-green light:bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-kutt-green light:bg-emerald-600" />
                </span>
                <span className="text-xs font-bold tracking-wider uppercase text-kutt-green light:text-emerald-700">
                  Live Matchup • In Escrow
                </span>
              </div>
              <span className="text-[11px] font-mono text-kutt-muted light:text-slate-500">ID: #KT-9842</span>
            </div>

            {/* Versus Header */}
            <div className="py-4 flex items-center justify-between">
              {/* Player 1 */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/20 text-white light:from-slate-100 light:to-slate-200 light:border-slate-300 light:text-slate-800 flex items-center justify-center font-bold text-sm shadow-sm">
                  SH
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white light:text-slate-900">Sim H.</p>
                  <p className="text-[10px] text-kutt-green light:text-emerald-600 font-medium">Record: 14-4</p>
                </div>
              </div>

              {/* VS Badge */}
              <div className="px-2.5 py-1 rounded bg-kutt-card border border-kutt-border text-[11px] font-black font-display text-kutt-muted light:bg-slate-100 light:border-slate-200 light:text-slate-600">
                VS
              </div>

              {/* Player 2 */}
              <div className="flex items-center gap-3 flex-row-reverse">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-kutt-green/30 to-kutt-green/10 border border-kutt-green/40 text-kutt-green light:from-emerald-100 light:to-emerald-50 light:border-emerald-300 light:text-emerald-700 flex items-center justify-center font-bold text-sm shadow-sm">
                  JV
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-white light:text-slate-900">Jordan V.</p>
                  <p className="text-[10px] text-kutt-muted light:text-slate-500 font-medium">Record: 11-7</p>
                </div>
              </div>
            </div>

            {/* Wager Terms Card */}
            <div className="bg-kutt-surface/90 border border-kutt-border light:bg-slate-50/90 light:border-slate-200 rounded-xl p-3.5 my-2">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-kutt-muted light:text-slate-500 font-medium">Event: NBA Tonight</span>
                <span className="font-bold text-white light:text-slate-900">Celtics vs Lakers</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-kutt-muted light:text-slate-500">Jordan&apos;s Pick:</span>
                <span className="font-semibold text-kutt-green light:text-emerald-700">Celtics -4.5 Spread</span>
              </div>
              <div className="mt-3 pt-2.5 border-t border-kutt-border/60 light:border-slate-200 flex items-center justify-between">
                <span className="text-xs text-kutt-muted light:text-slate-500">Stakes Locked</span>
                <span className="text-base font-extrabold text-white light:text-slate-900 font-display">
                  $50.00 <span className="text-xs font-normal text-kutt-muted light:text-slate-500">($100 Pot)</span>
                </span>
              </div>
            </div>

            {/* Simulated Trash Talk Snippet */}
            <div className="mt-3 bg-kutt-card/60 border border-kutt-border/60 light:bg-white light:border-slate-200 light:shadow-sm rounded-lg p-2.5 flex items-start gap-2 text-xs">
              <MessageSquare className="w-4 h-4 text-kutt-green light:text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-kutt-textLight light:text-slate-700 text-[11px]">
                <span className="font-bold text-white light:text-slate-900">Jordan:</span> &quot;Celtics are blowing them out by 15. Thanks for the $50 in advance!&quot;
              </p>
            </div>

            {/* Verified Settlement Badge */}
            <div className="mt-4 pt-3 border-t border-kutt-border/80 light:border-slate-200 flex items-center justify-between text-[11px] text-kutt-muted light:text-slate-500">
              <span className="flex items-center gap-1 text-kutt-green light:text-emerald-700 font-medium">
                <Shield className="w-3.5 h-3.5" /> Official API Settlement
              </span>
              <span className="text-white light:text-slate-900 font-medium">Instant Escrow Payout</span>
            </div>
          </div>
        </div>

        {/* Transition prompt at end of hero */}
        <div
          ref={text3Ref}
          className="absolute bottom-8 left-0 right-0 z-30 flex justify-center pointer-events-none opacity-0"
        >
          <div className="bg-kutt-bg/90 border border-kutt-green/40 light:bg-white/95 light:border-emerald-300 light:text-slate-700 px-5 py-2 rounded-full backdrop-blur-md flex items-center gap-2 text-xs text-kutt-textLight shadow-neon-border light:shadow-md light:shadow-emerald-500/15">
            <span>Continue scrolling into the Kutt experience</span>
            <ArrowDown className="w-3.5 h-3.5 text-kutt-green light:text-emerald-600 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
