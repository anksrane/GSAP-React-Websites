// src/app/hooks/useGsapWordsFlow.js
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGsapWordsFlow = (containerRef, wordRefs) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const totalWords = wordRefs.current.length;
      const offsets = [];

      // sprinkle offset pattern: 0 → +25 → +50 → +75 → … then reverse
      let step = 50;
      let direction = 1;
      let currentOffset = 0;
      for (let i = 0; i < totalWords; i++) {
        offsets.push(currentOffset);
        currentOffset += step * direction;
        console.log("window.innerWidth: ",window.innerWidth);
        console.log("currentOffset: ",Math.abs(currentOffset));        
        if (Math.abs(currentOffset) >= window.innerWidth) {
          direction *= -1; // reverse when exceeding viewport spread
        }
      }

      // scroll-controlled motion for all words
      gsap.to(wordRefs.current, {
        x: (i) => offsets[i], // sprinkle offset
        // yPercent: -200, 
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 20%",
          end: "bottom 60%",
          markers: true,
          scrub: true,
        },
        stagger: {
          amount: 1.5,
          ease: "power1.inOut",
        },
      });

      // opacity back to 0.5 when leaving center
      gsap.to(wordRefs.current, {
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "center center",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, wordRefs]);
};
