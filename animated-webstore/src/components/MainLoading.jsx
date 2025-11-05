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
    gsap.set(containerRef.current, { backgroundColor: "#fff", opacity: 1 });
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      if (!hasLoopedOnce) {
        setHasLoopedOnce(true);

        // Step 1 → gradient background transition bottom to top
        gsap.set(containerRef.current, {
          // backgroundImage: "linear-gradient(to top, #8000ff 0%, #6000ff 50%, #fff 100%)",
          backgroundImage: "linear-gradient(to top, #8000ff 50%, #ffffff 50%)",
          backgroundSize: "100% 200%",
          backgroundPosition: "0% 0%",
          backgroundRepeat: "no-repeat",
        });

        gsap.to(containerRef.current, {
          backgroundPosition: "0% 100%",
          duration: 1.4,
          ease: "power2.inOut",
          onComplete: () => {
            // Step 2 → fade out after gradient completes
            // gsap.to(containerRef.current, {
            //   opacity: 0,
            //   duration: 0.8,
            //   ease: "power2.inOut",
            //   onComplete: () => {
            //     onFinish && onFinish();
            //   },
            // });
            gsap.set(containerRef.current, {
              backgroundImage: "linear-gradient(to top, #ffffff 50%, #8000ff 50%)",
              backgroundSize: "100% 200%",
              backgroundPosition: "0% 0%",
            });

            gsap.to(containerRef.current, {
              backgroundPosition: "0% 100%",
              duration: 1.4,
              ease: "power2.inOut",
              onComplete: () => {
                // Step 3 → now hide the loader instantly after second gradient
                gsap.to(containerRef.current, {
                  opacity: 0,
                  duration: 0.2,
                  ease: "power2.out",
                  onComplete: () => onFinish && onFinish(),
                });
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