import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./Hero.css";

function Hero() {
  const text = "Studio Shop Karo".split("");
  const containerRef = useRef(null);

  useGSAP(() => {
    const letters = containerRef.current.querySelectorAll(".hero-word");

    // Start with letters hidden
    gsap.set(letters, { y: 50, opacity: 0 });

    // Animate each letter upward with stagger
    gsap.to(letters, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: {
        each: 0.05, // same as Framer Motion's staggerChildren
        delay: 0.3, // same as delayChildren
      },
    });
  }, []);

  return (
    <section className="hero-section">
      <h1 ref={containerRef} className="hero-text">
        {text.map((word, i) => (
          <span key={i} className="hero-word">
            {word === " " ? "\u00A0" : word}
          </span>
        ))}
      </h1>
    </section>
  );
}

export default Hero;
