"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Debounced ScrollTrigger refresh on window resize & orientation change
    let resizeTimer: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", handleLoad);

    // Refresh for dynamic frame/image loads
    const initialRefreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1200);

    // Intercept anchor link clicks for smooth scrolling via Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");

      if (!target) return;

      const href = target.getAttribute("href");

      if (!href) return;

      // Click on Logo / Top "#"
      if (href === "#") {
        e.preventDefault();

        lenis.scrollTo(0, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        history.pushState(null, "", " ");
        return;
      }

      // Click on Section Anchors "#section"
      if (href.startsWith("#") && href.length > 1) {
        try {
          // Explicitly tell TypeScript that we want an HTMLElement
          const element = document.querySelector<HTMLElement>(href);

          if (element) {
            e.preventDefault();

            lenis.scrollTo(element, {
              offset: -40,
              duration: 1.4,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });

            history.pushState(null, "", href);
          }
        } catch {
          // If invalid selector, fallback to standard behavior
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Make Lenis globally accessible if needed
    (window as unknown as { lenis?: typeof lenis }).lenis = lenis;

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      clearTimeout(resizeTimer);
      clearTimeout(initialRefreshTimer);

      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      window.removeEventListener("load", handleLoad);

      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
