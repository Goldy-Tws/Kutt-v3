import HeroCanvasScroll from "@/components/HeroCanvasScroll";
import ProblemSection from "@/components/ProblemSection";
import HowItWorks from "@/components/HowItWorks";
import WagerSimulator from "@/components/WagerSimulator";
import ComparisonSection from "@/components/ComparisonSection";
import SocialLayer from "@/components/SocialLayer";
import MarketsSection from "@/components/MarketsSection";
import TrustSection from "@/components/TrustSection";
import FAQSection from "@/components/FAQSection";
import MediaSocialSection from "@/components/MediaSocialSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-kutt-bg text-kutt-textLight light:bg-[#F8FAFC] light:text-slate-800">
      {/* SECTION 1: HERO CANVAS SCROLL */}
      <HeroCanvasScroll />

      {/* SECTION 2: THE PROBLEM (HANDSHAKE BETS TODAY VS KUTT) */}
      <ProblemSection />

      {/* SECTION 3: HOW IT WORKS (4-STEP P2P PROTOCOL) */}
      <HowItWorks />

      {/* SECTION 4: INTERACTIVE WAGER SIMULATOR */}
      <WagerSimulator />

      {/* SECTION 5: TRADITIONAL SPORTSBOOK VS KUTT */}
      <ComparisonSection />

      {/* SECTION 6: THE SOCIAL LAYER & RIVALRIES */}
      <SocialLayer />

      {/* SECTION 7: MARKETS (BIGGER THAN SPORTS) */}
      <MarketsSection />

      {/* SECTION 8: TRUST, SECURITY & ESCROW */}
      <TrustSection />

      {/* SECTION 9: FREQUENTLY ASKED QUESTIONS */}
      <FAQSection />

      {/* SECTION 10: MEDIA & SOCIAL ECOSYSTEM */}
      <MediaSocialSection />

      {/* SECTION 11: FINAL CTA & FOOTER */}
      <Footer />
    </main>
  );
}
