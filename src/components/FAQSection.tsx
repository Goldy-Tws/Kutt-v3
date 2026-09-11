"use client";

import FaqSection, { FaqData } from "@/components/ui/habit-faq-scroller";

export default function FAQSection() {
  const kuttFaqData: FaqData = {
    badge: "Got Questions? We Have Answers",
    mainTitle: "Frequently Asked Questions",
    mainSubtitle:
      "Everything you need to know about peer-to-peer social wagering, mutual escrow, and custom handshake bets on Kutt.",
    rows: [
      {
        id: "row-1",
        speed: "45s",
        direction: "left",
        faqItems: [
          {
            id: "faq-1",
            tag: "REAL CURRENCY",
            question: "Is Kutt real money?",
            answer:
              "Yes. Kutt is a licensed peer-to-peer social wagering platform. When you challenge someone or accept a wager, real funds are deposited and held securely in segregated escrow until official outcome settlement.",
          },
          {
            id: "faq-2",
            tag: "PEER TO PEER",
            question: "Who am I betting against?",
            answer:
              "You bet directly against other identifiable people — your friends, coworkers, or verified members of the Kutt community. You see their profile, avatar, and lifetime win-loss record. Never against a bookmaker algorithm.",
          },
          {
            id: "faq-3",
            tag: "100% CUSTOM",
            question: "Can I customize terms & stakes?",
            answer:
              "Absolutely. You are not locked into rigid sportsbook lines. Propose any spread, point total, moneyline, or custom prop. As long as your friend accepts, the wager is officially live.",
          },
          {
            id: "faq-4",
            tag: "SMART ESCROW",
            question: "What if a friend refuses to pay?",
            answer:
              "They can't refuse. Unlike informal handshake bets or Venmo promises, both participants' stakes are locked in mutual escrow before the event starts. The winner is paid out automatically.",
          },
        ],
      },
      {
        id: "row-2",
        speed: "50s",
        direction: "right",
        faqItems: [
          {
            id: "faq-5",
            tag: "ZERO JUICE",
            question: "How does Kutt make money?",
            answer:
              "Traditional sportsbooks extract 10% - 15% hidden vig built into every line. Kutt charges a minimal, transparent platform facilitation fee (3%) on the total pot only upon successful settlement.",
          },
          {
            id: "faq-6",
            tag: "OFFICIAL FEEDS",
            question: "How are outcomes verified?",
            answer:
              "For sports, Kutt connects directly to certified league data feeds for instantaneous score tracking. For pop culture and civic events, outcomes resolve against verified public consensus sources.",
          },
          {
            id: "faq-7",
            tag: "21+ COMPLIANT",
            question: "Where is Kutt available?",
            answer:
              "Kutt is available to verified users aged 21 and older in legally eligible jurisdictions. Geolocation and mandatory identity checks ensure full regulatory compliance.",
          },
          {
            id: "faq-8",
            tag: "PUSH PROTECTION",
            question: "What happens in a tie or push?",
            answer:
              "If an event ends in an exact tie or push according to the agreed terms, both players' stakes are immediately released from escrow and refunded 100% with zero fees deducted.",
          },
        ],
      },
    ],
  };

  return (
    <section id="faq" className="relative py-20 sm:py-28 bg-kutt-bg border-t border-white/[0.06] overflow-hidden light:bg-[#F8FAFC] light:border-slate-200">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-kutt-green/[0.03] rounded-full blur-3xl pointer-events-none light:opacity-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FaqSection data={kuttFaqData} />
      </div>
    </section>
  );
}

