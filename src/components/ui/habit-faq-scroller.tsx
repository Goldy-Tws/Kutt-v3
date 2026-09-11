"use client";

import React from "react";
import { HelpCircle, Sparkles } from "lucide-react";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  tag?: string;
}

export interface FaqRow {
  id: string;
  speed?: string;
  direction?: "left" | "right";
  faqItems: FaqItem[];
}

export interface FaqData {
  mainTitle: string;
  mainSubtitle: string;
  badge?: string;
  rows: FaqRow[];
}

/**
 * FaqCard
 * Reusable card for a single FAQ item styled with Kutt's dark glassmorphism aesthetic.
 */
export const FaqCard: React.FC<FaqItem> = ({ question, answer, tag }) => {
  return (
    <div className="flex flex-col justify-between items-start gap-4 p-5 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-kutt-green/40 hover:bg-white/[0.04] transition-all duration-300 w-[270px] sm:w-[360px] md:w-[400px] flex-shrink-0 backdrop-blur-sm group/card shadow-lg hover:shadow-[0_0_30px_rgba(0,255,102,0.06)] faq-card light:bg-white light:border-slate-200/90 light:shadow-md light:shadow-slate-200/40 light:hover:border-emerald-500 light:hover:shadow-lg">
      <div className="space-y-3 w-full">
        {tag && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono font-semibold uppercase tracking-wider text-kutt-muted light:bg-emerald-50 light:border-emerald-200 light:text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-kutt-green light:bg-emerald-500" />
            <span>{tag}</span>
          </div>
        )}
        <h3 className="text-base sm:text-lg font-bold font-display text-white tracking-tight group-hover/card:text-kutt-green transition-colors faq-title light:text-slate-900 light:group-hover/card:text-emerald-600">
          {question}
        </h3>
        <p className="text-xs sm:text-sm text-kutt-muted leading-relaxed font-normal faq-answer light:text-slate-600">
          {answer}
        </p>
      </div>

      <div className="w-full pt-3 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-kutt-muted light:border-slate-100 light:text-slate-500">
        <span>Kutt Protocol</span>
        <span className="text-kutt-green/80 light:text-emerald-600 font-semibold">Verified</span>
      </div>
    </div>
  );
};

/**
 * HorizontalScroller
 * Wraps children and creates a seamless horizontal looping animation.
 * Automatically pauses on hover so users can easily read.
 */
export const HorizontalScroller: React.FC<{
  children: React.ReactNode;
  speed?: string;
  direction?: "left" | "right";
}> = ({ children, speed = "40s", direction = "left" }) => {
  const animationClass =
    direction === "right" ? "animate-scroll-horizontal-reverse" : "animate-scroll-horizontal";

  const style = { "--scroll-duration": speed } as React.CSSProperties;

  return (
    <div className="w-full overflow-hidden group relative scroller-mask py-2">
      <div
        className={`flex ${animationClass} group-hover:[animation-play-state:paused]`}
        style={style}
      >
        <div className="flex items-stretch justify-center flex-shrink-0 gap-5 sm:gap-6 px-3">
          {children}
        </div>
        {/* Duplicate items for seamless continuous looping */}
        <div
          className="flex items-stretch justify-center flex-shrink-0 gap-5 sm:gap-6 px-3"
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * FaqSection
 * Assembles title, subtitle, and multiple horizontal scrolling rows.
 */
const FaqSection: React.FC<{ data: FaqData }> = ({ data }) => {
  return (
    <div className="relative flex flex-col items-center gap-10 sm:gap-14 w-full">
      {/* Section Header */}
      <div className="flex flex-col items-center gap-4 text-center z-10 max-w-3xl px-4">
        {data.badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-xs font-semibold text-kutt-textLight uppercase tracking-wider mb-1 light:bg-emerald-50 light:border-emerald-200 light:text-emerald-800">
            <HelpCircle className="w-3.5 h-3.5 text-kutt-green light:text-emerald-600" />
            <span>{data.badge}</span>
          </div>
        )}
        <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight uppercase light:text-slate-900">
          {data.mainTitle}
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-kutt-muted max-w-2xl font-normal leading-relaxed light:text-slate-600">
          {data.mainSubtitle}
        </p>
      </div>

      {/* Horizontal Scroller Rows */}
      <div className="flex flex-col gap-5 sm:gap-6 z-10 w-full overflow-hidden">
        {data.rows.map((row) => (
          <HorizontalScroller key={row.id} speed={row.speed} direction={row.direction}>
            {row.faqItems.map((item) => (
              <FaqCard
                key={item.id}
                id={item.id}
                question={item.question}
                answer={item.answer}
                tag={item.tag}
              />
            ))}
          </HorizontalScroller>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
