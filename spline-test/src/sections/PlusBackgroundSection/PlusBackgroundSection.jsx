// src/sections/PlusBackgroundSection/PlusBackgroundSection.jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PlusScene from "../plus3D/PlusScene";
import "./PlusBackgroundSection.css";

const images = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  // you can replace this placeholder url with your real image paths later
  src: `https://placehold.co/300x400?text=${i + 1}`,
}));

const PlusBackgroundSection = () => {
  const containerRef = useRef(null);
  useGSAP(() => {
    const imagesLeft = gsap.utils.toArray(".image-item.left img");
    const imagesRight = gsap.utils.toArray(".image-item.right img");

    gsap.fromTo(
      imagesLeft,
      { opacity: 0.5, xPercent: 50 },
      {
        opacity: 1,
        xPercent: 0,
        duration: 1.2,
        stagger: 0.15,
        // ease: "circ.inOut",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
        },
      }
    );

    gsap.fromTo(
      imagesRight,
      { opacity: 0.5, xPercent: -50 },
      {
        opacity: 1,
        xPercent: 0,
        duration: 1.2,
        stagger: 0.15,
        // ease: "circ.inOut",         
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
        },
      }
    );
  }, []);

  return (
    <section className="plus-bg-section" ref={containerRef}>
      {/* Fixed centered 3D plus */}
      <div className="plus-fixed" aria-hidden="true">
        <PlusScene />
      </div>

      {/* Scrolling images overlay */}
      <div className="images-scroll">
        <div className="images-grid">
          {images.map((img, idx) => {
            // even index -> left column, odd -> right column
            const side = idx % 2 === 0 ? "left" : "right";
            return (
              <div key={img.id} className={`image-item ${side}`}>
                <img src={img.src} alt={`img-${img.id}`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlusBackgroundSection;
