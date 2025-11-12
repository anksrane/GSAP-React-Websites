// src/sections/PlusBackgroundSection/PlusBackgroundSection.jsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PlusScene from "../plus3D/PlusScene";
import "./PlusBackgroundSection.css";

gsap.registerPlugin(ScrollTrigger);

const images = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  src: `https://placehold.co/300x400?text=${i + 1}`,
}));

const PlusBackgroundSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {  

    const ctx = gsap.context(() => {
      const imagesLeft = gsap.utils.toArray(".image-item.left img");
      const imagesRight = gsap.utils.toArray(".image-item.right img");

      imagesLeft.forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: 50, opacity: 0, scale: 1.2 },
          {
            opacity: 1,
            xPercent: 0,
            scale: 1,
            duration: 1.2,
            ease: "circ.inOut",
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );
      });

      imagesRight.forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -50, opacity: 0, scale: 1.2 },
          {
            opacity: 1,
            xPercent: 0,
            scale: 1,
            duration: 1.2,
            ease: "circ.inOut",
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );
      });

      // ✅ Wait until all images inside the container are fully loaded
      const imagesEl = containerRef.current?.querySelectorAll("img");
      let loaded = 0;

      imagesEl?.forEach((img) => {
        if (img.complete) {
          loaded++;
        } else {
          img.addEventListener("load", () => {
            loaded++;
            if (loaded === imagesEl.length) {
              console.log("✅ All images loaded — refreshing ScrollTrigger");
              ScrollTrigger.refresh();
            }
          });
        }
      });        

      setTimeout(() => ScrollTrigger.refresh(), 300);
    },containerRef);
    return () => ctx.revert();
  }, {scope: containerRef});

  return (
    <div className="outerconatiner">
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
     </div>
  );
};

export default PlusBackgroundSection;
