import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./MainLoading.css";

function MainLoading({ onFinish }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [hasLoopedOnce, setHasLoopedOnce] = useState(false);

  useGSAP(() => {
    // set initial state
    gsap.set(containerRef.current, { backgroundColor: "#000", opacity: 1 });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      if (!hasLoopedOnce) {
        setHasLoopedOnce(true);

        // Step 1 → background color transition to purple
        gsap.to(containerRef.current, {
          backgroundColor: "#8000ff",
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            // Step 2 → fade out the loader
            gsap.to(containerRef.current, {
              opacity: 0,
              duration: 0.8,
              ease: "power2.inOut",
              onComplete: () => {
                // Step 3 → trigger Hero
                onFinish && onFinish();
              },
            });
          },
        });
      }

      // manually restart video loop
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [hasLoopedOnce, onFinish]);

  return (
    <div ref={containerRef} className="main-loading-outer-container">
      <video
        ref={videoRef}
        className="loading-video"
        src="/video/loader-video.mp4"
        autoPlay
        muted
        playsInline
      />
      <h3 className="loading-heading">Loading</h3>
    </div>
  );
}

export default MainLoading;