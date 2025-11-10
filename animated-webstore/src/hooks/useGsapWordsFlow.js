// src/app/hooks/useGsapWordsFlow.js
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGsapWordsFlow = (containerRef, wordRefs) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalWords = wordRefs.current.length;
      if (!totalWords) return;

      const maxShift = 150; // max horizontal shift in px (adjustable)
      const midRange = maxShift * 0.6; // where word should be at center highlight
      const startY = 150; // start yPercent (starts below)
      const endY = -150; // end yPercent (goes above)

      wordRefs.current.forEach((el, i) => {
        // determine zig-zag direction and small random variation for organic feel
        const baseDirection = i % 4 === 0 ? 1 : i % 4 === 1 ? 1 : i % 4 === 2 ? -1 : -1;
        const jitter = (Math.random() - 0.5) * 0.2 * maxShift; // small random offset
        const xStart = baseDirection * (Math.round(Math.random() * (maxShift * 0.2))) + jitter;
        const xMid = baseDirection * (midRange + Math.random() * 30) + jitter;
        const xEnd = baseDirection * (Math.round(Math.random() * (maxShift * 0.7))) * -1 + jitter; // end moves slightly opposite direction (spray feel)

        // timeline per element: start -> center highlight -> end
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top bottom",    // when element top hits bottom of viewport
            end: "bottom top",      // when element bottom hits top of viewport
            scrub: true,
            duration: 0.5,
            // markers: true, // uncomment for debugging ranges
          },
        });

        // 1) initial state (below, faint)
        tl.set(el, {
          yPercent: startY,
          x: xStart,
          opacity: 0.1,
          force3D: true,
        });

        // 2) move from below to center (first half of timeline)
        tl.to(el, {
          yPercent: 0, // roughly center of element relative to itself; together with element position this moves it into viewport center region
          x: xMid,
          opacity: 1,
          ease: "power1.out",
          duration: 0.5,
        });

        // 3) move from center to above (second half of timeline)
        tl.to(el, {
          yPercent: endY,
          x: xEnd,
          opacity: 0.1,
          ease: "power1.in",
          duration: 0.5,
        });
      });
    }, containerRef);

    return () => {
      // cleanup all ScrollTriggers / timelines created in this context
      ctx.revert();
      // also clear global ScrollTrigger garbage
      ScrollTrigger.getAll().forEach((st) => {
        // safety: remove orphaned triggers if any
        try { st.kill(); } catch (e) {}
      });
    };
  }, [containerRef, wordRefs]);
};
