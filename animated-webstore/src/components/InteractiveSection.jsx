import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./InteractiveSection.css";

const images = [
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=800&q=80",
];

function InteractiveSection() {
  const sectionRef = useRef(null);
  const squareRef = useRef(null);
  const imgRef = useRef(null);
  const lastChangeRef = useRef(0);
  const [activeImage, setActiveImage] = useState(0);

  useGSAP(() => {
    // center square at start
    gsap.set(squareRef.current, { x: 0, y: 0 });
  }, []);

  // mouse movement handler
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      // animate square to follow smoothly
      gsap.to(squareRef.current, {
        x: mouseX,
        y: mouseY,
        duration: 0.4,
        ease: "power3.out",
      });

      // random image change logic (every ~200ms)
      const now = Date.now();
      if (now - lastChangeRef.current > 200) {
        const newImg = Math.floor(Math.random() * images.length);
        if (newImg !== activeImage) {
          // fade out + swap + fade in
          gsap.to(imgRef.current, {
            opacity: 0,
            duration: 0.25,
            onComplete: () => {
              setActiveImage(newImg);
              gsap.to(imgRef.current, { opacity: 1, duration: 0.4 });
            },
          });
        }
        lastChangeRef.current = now;
      }
    };

    const handleMouseLeave = () => {
      // return to center
      gsap.to(squareRef.current, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [activeImage]);

  return (
    <section ref={sectionRef} className="interactive-section">
      <h1 className="background-text">Explore&nbsp;More</h1>

      <div ref={squareRef} className="floating-square">
        <img
          ref={imgRef}
          src={images[activeImage]}
          alt="moving"
          className="floating-img"
        />
      </div>
    </section>
  );
}

export default InteractiveSection;
