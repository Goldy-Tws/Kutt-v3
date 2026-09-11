"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ArrowRight,
  Mic,
  Tv,
  Sparkles,
  Youtube,
  Instagram,
  Share2
} from "lucide-react";

export default function MediaSocialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const supportingRef = useRef<HTMLParagraphElement>(null);

  const podcastCardRef = useRef<HTMLDivElement>(null);
  const espnCardRef = useRef<HTMLDivElement>(null);
  const socialCardRef = useRef<HTMLDivElement>(null);

  const threadNodeRef = useRef<HTMLDivElement>(null);
  const threadPathStemRef = useRef<SVGPathElement>(null);
  const threadPathLeftRef = useRef<SVGPathElement>(null);
  const threadPathRightRef = useRef<SVGPathElement>(null);
  const mobileThreadPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // If prefers-reduced-motion, reveal immediately without scroll animations
    if (prefersReducedMotion) {
      gsap.set(
        [
          eyebrowRef.current,
          headlineRef.current,
          supportingRef.current,
          podcastCardRef.current,
          espnCardRef.current,
          socialCardRef.current,
          threadNodeRef.current,
        ],
        { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ========================================================
      // DESKTOP & TABLET ANIMATION (min-width: 1024px)
      // ========================================================
      mm.add("(min-width: 1024px)", () => {
        // Setup initial states
        gsap.set(eyebrowRef.current, { opacity: 0, y: 20 });
        gsap.set(headlineRef.current, { opacity: 0, y: 35 });
        gsap.set(supportingRef.current, { opacity: 0, y: 20 });

        gsap.set(podcastCardRef.current, { opacity: 0, scale: 0.94, y: 50 });
        gsap.set(espnCardRef.current, { opacity: 0, x: -50, rotation: -2 });
        gsap.set(socialCardRef.current, { opacity: 0, x: 50, rotation: 2 });
        gsap.set(threadNodeRef.current, { opacity: 0, scale: 0.8 });

        // Prepare SVG thread path stroke lengths
        const paths = [
          threadPathStemRef.current,
          threadPathLeftRef.current,
          threadPathRightRef.current,
        ].filter(Boolean) as SVGPathElement[];

        paths.forEach((p) => {
          const length = p.getTotalLength?.() || 150;
          gsap.set(p, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 0,
          });
        });

        // Master Scrubbed Timeline triggering as section enters viewport
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 70%",
            scrub: 1,
          },
        });

        // --------------------------------------------------------
        // PHASE 01 — INTRO
        // --------------------------------------------------------
        tl.to(
          eyebrowRef.current,
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
          0
        )
          .to(
            headlineRef.current,
            { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
            0.05
          )
          .to(
            supportingRef.current,
            { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
            0.1
          );

        // --------------------------------------------------------
        // PHASE 02 — MEDIA CARDS ENTER
        // --------------------------------------------------------
        tl.to(
          podcastCardRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.35,
            ease: "power3.out",
          },
          0.15
        )
          .to(
            espnCardRef.current,
            {
              opacity: 1,
              x: 0,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out",
            },
            0.22
          )
          .to(
            socialCardRef.current,
            {
              opacity: 1,
              x: 0,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out",
            },
            0.26
          );

        // --------------------------------------------------------
        // PHASE 03 — KUTT GREEN THREAD
        // Progressive SVG draw connecting Podcast -> KUTT -> ESPN & Social
        // --------------------------------------------------------
        // 1. Stem down from Podcast to central KUTT node
        if (threadPathStemRef.current) {
          tl.to(
            threadPathStemRef.current,
            {
              opacity: 1,
              strokeDashoffset: 0,
              duration: 0.18,
              ease: "none",
            },
            0.35
          );
        }

        // 2. Central KUTT node lights up
        tl.to(
          threadNodeRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.15,
            ease: "back.out(1.7)",
          },
          0.45
        );

        // 3. Branches split left to ESPN and right to Social
        if (threadPathLeftRef.current && threadPathRightRef.current) {
          tl.to(
            [threadPathLeftRef.current, threadPathRightRef.current],
            {
              opacity: 1,
              strokeDashoffset: 0,
              duration: 0.22,
              ease: "none",
            },
            0.5
          );
        }

        // --------------------------------------------------------
        // PHASE 04 — MEDIA FOCUS
        // Podcast card becomes slightly more prominent (scale: 1 -> 1.02)
        // --------------------------------------------------------
        tl.to(
          podcastCardRef.current,
          {
            scale: 1.02,
            duration: 0.2,
            ease: "power1.inOut",
          },
          0.65
        );

        // --------------------------------------------------------
        // PHASE 05 — SETTLE
        // Cards settle gracefully, green thread softens, everything interactive
        // --------------------------------------------------------
        tl.to(
          paths,
          {
            opacity: 0.5,
            duration: 0.15,
            ease: "power1.out",
          },
          0.8
        );
      });

      // ========================================================
      // MOBILE ANIMATION (< 1024px)
      // Natural stack reveal without pinning or horizontal overflow
      // ========================================================
      mm.add("(max-width: 1023px)", () => {
        // Setup initial states (no aggressive x translations)
        gsap.set([eyebrowRef.current, headlineRef.current, supportingRef.current], {
          opacity: 0,
          y: 20,
        });
        gsap.set([podcastCardRef.current, espnCardRef.current, socialCardRef.current], {
          opacity: 0,
          y: 30,
        });

        const mobilePath = mobileThreadPathRef.current;
        if (mobilePath) {
          const length = mobilePath.getTotalLength?.() || 400;
          gsap.set(mobilePath, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 0,
          });
        }

        const tlMobile = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 75%",
            scrub: 1,
          },
        });

        // Intro reveal
        tlMobile
          .to(
            [eyebrowRef.current, headlineRef.current, supportingRef.current],
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              duration: 0.25,
              ease: "power2.out",
            }
          )
          .to(
            podcastCardRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            },
            "-=0.1"
          );

        // Animate vertical thread on mobile
        if (mobilePath) {
          tlMobile.to(
            mobilePath,
            {
              opacity: 0.6,
              strokeDashoffset: 0,
              duration: 0.35,
              ease: "none",
            },
            "-=0.1"
          );
        }

        tlMobile
          .to(
            espnCardRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            },
            "-=0.2"
          )
          .to(
            socialCardRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            },
            "-=0.15"
          );
      });
    }, sectionRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="media"
      ref={sectionRef}
      className="relative bg-kutt-bg light:bg-[#F8FAFC] border-t border-kutt-border/60 light:border-slate-200 transition-colors duration-300 pt-10 sm:pt-14 pb-16 sm:pb-24 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-kutt-green/[0.04] light:bg-emerald-500/[0.04] blur-[150px] pointer-events-none rounded-full" />

      {/* Main Content Container */}
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
        {/* ==================================================== */}
        {/* SECTION HEADER (Eyebrow, Headline, Supporting text)   */}
        {/* ==================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-kutt-green/10 border border-kutt-green/30 text-xs font-bold text-kutt-green uppercase tracking-wider mb-4 light:bg-emerald-50 light:border-emerald-200 light:text-emerald-700 light:shadow-sm"
          >

            <span>KUTT, OUT IN THE WORLD</span>
          </div>

          <h2
            ref={headlineRef}
            className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-white light:text-slate-900 tracking-tight leading-tight"
          >
            SEE WHAT&apos;S HAPPENING AT KUTT.
          </h2>

          <p
            ref={supportingRef}
            className="mt-3 sm:mt-4 text-xs sm:text-base text-kutt-muted light:text-slate-600 max-w-xl mx-auto leading-relaxed font-normal light:font-medium"
          >
            From the conversations behind KUTT to the brands and people we&apos;re building with — follow along.
          </p>
        </div>

        {/* ==================================================== */}
        {/* EDITORIAL MEDIA ECOSYSTEM STRUCTURE                  */}
        {/* ==================================================== */}
        <div className="relative w-full">
          {/* Mobile Vertical Connecting Thread Guide */}
          <div className="lg:hidden absolute left-6 top-10 bottom-10 w-0.5 pointer-events-none z-0">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 2 800"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                ref={mobileThreadPathRef}
                d="M 1 0 L 1 800"
                stroke="#00FF66"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* ================================================ */}
          {/* CARD 01 — CEO / FEATURED PODCAST (Primary Story)  */}
          {/* ================================================ */}
          <div
            ref={podcastCardRef}
            className="group relative rounded-3xl bg-[#11181A] light:bg-white border border-white/10 light:border-slate-200/90 p-5 sm:p-7 shadow-2xl light:shadow-xl light:shadow-slate-200/50 hover:border-[#00FF66]/50 light:hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1.5 z-10"
          >
            <div className="flex flex-col md:flex-row gap-6 lg:gap-8 items-center">
              {/* Media Preview / Video Frame Area */}
              <div className="relative w-full md:w-3/5 aspect-[16/9] rounded-2xl overflow-hidden bg-black shadow-lg border border-white/10 light:border-slate-200">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/HQlPCgRNJNQ?si=ClTybcgCXOVgUswU"
                  title="The Conversation Behind KUTT — CEO Podcast"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              {/* Editorial Information & Content */}
              <div className="w-full md:w-2/5 flex flex-col justify-between space-y-4">
                <div>
                  {/* Category Label */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 light:bg-slate-100 border border-white/10 light:border-slate-200 text-[11px] font-bold text-slate-300 light:text-slate-700 uppercase tracking-wider mb-2.5">
                    <Mic className="w-3 h-3 text-[#00FF66] light:text-emerald-600" />
                    <span>FEATURED CONVERSATION</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-white light:text-slate-900 tracking-tight leading-snug">
                    THE CONVERSATION BEHIND KUTT.
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-kutt-muted light:text-slate-600 leading-relaxed font-normal light:font-medium">
                    An in-depth dialogue on the origins of KUTT, removing the bookmaker house edge, and creating the future of peer-to-peer social competition.
                  </p>
                </div>

                {/* CTA Action */}
                <div className="pt-2">
                  <a
                    href="https://youtu.be/HQlPCgRNJNQ?si=ClTybcgCXOVgUswU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-kutt-green hover:bg-kutt-mint light:bg-[#00E85D] light:hover:bg-[#00FF66] transition-all duration-300 shadow-neon light:shadow-md light:shadow-emerald-500/20 group/btn"
                  >
                    <span>WATCH THE PODCAST</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================== */}
          {/* DESKTOP DIGITAL GREEN THREAD JUNCTION              */}
          {/* ================================================== */}
          <div className="hidden lg:flex relative w-full h-14 items-center justify-center my-[-2px] pointer-events-none z-0">
            <svg
              className="absolute inset-0 w-full h-full overflow-visible"
              viewBox="0 0 1000 56"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Vertical Stem from Podcast bottom (center 500, 0) to KUTT node (500, 24) */}
              <path
                ref={threadPathStemRef}
                d="M 500 0 L 500 24"
                stroke="#00FF66"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* Fork Left: from KUTT node (500, 32) down to ESPN card top (250, 56) */}
              <path
                ref={threadPathLeftRef}
                d="M 500 32 C 500 48, 250 40, 250 56"
                stroke="#00FF66"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* Fork Right: from KUTT node (500, 32) down to Social card top (750, 56) */}
              <path
                ref={threadPathRightRef}
                d="M 500 32 C 500 48, 750 40, 750 56"
                stroke="#00FF66"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Central KUTT Digital Junction Node */}
            <div
              ref={threadNodeRef}
              className="relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#080D13] light:bg-white border border-[#00FF66]/50 shadow-sm shadow-[#00FF66]/20 light:shadow-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
              <span className="text-[10px] font-black tracking-widest uppercase font-mono text-white light:text-slate-800">
                KUTT
              </span>
            </div>
          </div>

          {/* ================================================ */}
          {/* SECONDARY ROW: CARD 02 (ESPN) & CARD 03 (SOCIAL)  */}
          {/* ================================================ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch relative z-10 mt-6 lg:mt-0">
            {/* ---------------------------------------------- */}
            {/* CARD 02 — ESPN PARTNERSHIP (Credibility Story)  */}
            {/* ---------------------------------------------- */}
            <div
              ref={espnCardRef}
              className="lg:col-span-6 group relative rounded-3xl bg-[#11181A] light:bg-white border border-white/10 light:border-slate-200/90 p-5 sm:p-7 shadow-2xl light:shadow-xl light:shadow-slate-200/50 hover:border-[#00FF66]/50 light:hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Category Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 light:bg-slate-100 border border-white/10 light:border-slate-200 text-[11px] font-bold text-slate-300 light:text-slate-700 uppercase tracking-wider mb-3">
                  <Tv className="w-3 h-3 text-[#00FF66] light:text-emerald-600" />
                  <span>FEATURED WITH ESPN</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-white light:text-slate-900 tracking-tight mb-4">
                  KUTT × ESPN
                </h3>

                {/* Real Media Area for ESPN Feature */}
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-black shadow-lg border border-white/10 light:border-slate-200 mb-4">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/khkSGSpbjkc?si=eNPQIwZUKLkFe9zM"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* CTA Link */}
              <div className="pt-2 border-t border-white/5 light:border-slate-100 flex items-center justify-between">
                <span className="text-xs text-kutt-muted light:text-slate-500 font-medium">
                  National Broadcast Spotlight
                </span>
                <a
                  href="https://youtu.be/khkSGSpbjkc?si=eNPQIwZUKLkFe9zM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#00FF66] hover:text-kutt-mint light:text-emerald-700 light:hover:text-emerald-800 group/link"
                >
                  <span>WATCH THE FEATURE</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>

            {/* ---------------------------------------------- */}
            {/* CARD 03 — SOCIALS (Community Ecosystem)        */}
            {/* ---------------------------------------------- */}
            <div
              ref={socialCardRef}
              className="lg:col-span-6 group relative rounded-3xl bg-[#11181A] light:bg-white border border-white/10 light:border-slate-200/90 p-5 sm:p-7 shadow-2xl light:shadow-xl light:shadow-slate-200/50 hover:border-[#00FF66]/50 light:hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Category Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 light:bg-slate-100 border border-white/10 light:border-slate-200 text-[11px] font-bold text-slate-300 light:text-slate-700 uppercase tracking-wider mb-3">
                  <Share2 className="w-3 h-3 text-[#00FF66] light:text-emerald-600" />
                  <span>FOLLOW KUTT</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-white light:text-slate-900 tracking-tight mb-4">
                  KEEP UP WITH KUTT.
                </h3>

                {/* 4 Dedicated Social Interaction Rows */}
                <div className="space-y-2.5">
                  {/* 1. Instagram */}
                  <a
                    href="#"
                    className="group/row flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] light:bg-slate-50 light:hover:bg-emerald-50/70 border border-white/[0.06] hover:border-[#00FF66]/40 light:border-slate-200/80 light:hover:border-emerald-300 transition-all duration-200 hover:translate-x-1.5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-4 rounded-full bg-[#00FF66] opacity-0 group-hover/row:opacity-100 transition-opacity duration-200" />
                      <div className="w-8 h-8 rounded-lg bg-white/5 light:bg-white border border-white/10 light:border-slate-200 flex items-center justify-center text-slate-200 light:text-slate-800 group-hover/row:text-[#00FF66] light:group-hover/row:text-emerald-700 transition-colors">
                        <Instagram className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-white light:text-slate-800">
                        Instagram
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-kutt-muted light:text-slate-400 group-hover/row:text-[#00FF66] light:group-hover/row:text-emerald-700 transition-all group-hover/row:translate-x-1" />
                  </a>

                  {/* 2. X (Formerly Twitter) */}
                  <a
                    href="#"
                    className="group/row flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] light:bg-slate-50 light:hover:bg-emerald-50/70 border border-white/[0.06] hover:border-[#00FF66]/40 light:border-slate-200/80 light:hover:border-emerald-300 transition-all duration-200 hover:translate-x-1.5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-4 rounded-full bg-[#00FF66] opacity-0 group-hover/row:opacity-100 transition-opacity duration-200" />
                      <div className="w-8 h-8 rounded-lg bg-white/5 light:bg-white border border-white/10 light:border-slate-200 flex items-center justify-center text-slate-200 light:text-slate-800 group-hover/row:text-[#00FF66] light:group-hover/row:text-emerald-700 transition-colors">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-white light:text-slate-800">
                        X
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-kutt-muted light:text-slate-400 group-hover/row:text-[#00FF66] light:group-hover/row:text-emerald-700 transition-all group-hover/row:translate-x-1" />
                  </a>

                  {/* 3. TikTok */}
                  <a
                    href="#"
                    className="group/row flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] light:bg-slate-50 light:hover:bg-emerald-50/70 border border-white/[0.06] hover:border-[#00FF66]/40 light:border-slate-200/80 light:hover:border-emerald-300 transition-all duration-200 hover:translate-x-1.5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-4 rounded-full bg-[#00FF66] opacity-0 group-hover/row:opacity-100 transition-opacity duration-200" />
                      <div className="w-8 h-8 rounded-lg bg-white/5 light:bg-white border border-white/10 light:border-slate-200 flex items-center justify-center text-slate-200 light:text-slate-800 group-hover/row:text-[#00FF66] light:group-hover/row:text-emerald-700 transition-colors">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.28 6.28 0 0 0 1.88-4.46V8.75a8.28 8.28 0 0 0 4.84 1.55v-3.5a4.85 4.85 0 0 1-.95-.11z" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-white light:text-slate-800">
                        TikTok
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-kutt-muted light:text-slate-400 group-hover/row:text-[#00FF66] light:group-hover/row:text-emerald-700 transition-all group-hover/row:translate-x-1" />
                  </a>

                  {/* 4. YouTube */}
                  <a
                    href="#"
                    className="group/row flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] light:bg-slate-50 light:hover:bg-emerald-50/70 border border-white/[0.06] hover:border-[#00FF66]/40 light:border-slate-200/80 light:hover:border-emerald-300 transition-all duration-200 hover:translate-x-1.5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-4 rounded-full bg-[#00FF66] opacity-0 group-hover/row:opacity-100 transition-opacity duration-200" />
                      <div className="w-8 h-8 rounded-lg bg-white/5 light:bg-white border border-white/10 light:border-slate-200 flex items-center justify-center text-slate-200 light:text-slate-800 group-hover/row:text-[#00FF66] light:group-hover/row:text-emerald-700 transition-colors">
                        <Youtube className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-white light:text-slate-800">
                        YouTube
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-kutt-muted light:text-slate-400 group-hover/row:text-[#00FF66] light:group-hover/row:text-emerald-700 transition-all group-hover/row:translate-x-1" />
                  </a>
                </div>
              </div>

              {/* Slogan footnote */}
              <div className="pt-3 border-t border-white/5 light:border-slate-100 flex items-center justify-between text-xs text-kutt-muted light:text-slate-500">
                <span>Community Updates & Discussions</span>
                <span className="font-mono text-[11px] text-[#00FF66] light:text-emerald-700 font-semibold">
                  @kuttapp
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
