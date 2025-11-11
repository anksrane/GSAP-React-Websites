import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Syncs mesh rotation with scroll + pauses idle spin while scrolling
 * @param {React.RefObject} groupRef - Ref to the rotating group
 */
export const useScrollRotate = (groupRef) => {
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    // ✅ Idle slow rotation
    const idle = gsap.to(group.rotation, {
      y: "+=360",
      duration: 60,
      ease: "none",
      repeat: -1,
    });

    // ✅ Scroll-triggered fast rotation
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      markers: true,
      onUpdate: (self) => {
        const velocity = Math.abs(self.getVelocity()) / 2000; // normalize speed
        const dir = self.direction === 1 ? 1 : -1;
        const spin = Math.min(velocity, 4) * dir * 0.4; // cap spin speed
        gsap.to(group.rotation, {
          y: `+=${spin}`,
          duration: 0.2,
          ease: "power2.out",
          overwrite: true,
        });
      },
      onEnter: () => idle.pause(),
      onLeave: () => idle.pause(),
      onEnterBack: () => idle.pause(),
      onLeaveBack: () => idle.pause(),
      onScrubComplete: () => idle.play(), // resume idle when scroll stops
    });

    return () => {
      idle.kill();
      ScrollTrigger.killAll();
    };
  }, [groupRef]);
};
