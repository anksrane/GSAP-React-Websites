// src/app/components/WordsFlow/WordsFlow.jsx
import React, { useRef } from "react";
import { useGsapWordsFlow } from "../../hooks/useGsapWordsFlow";
import "./WordsFlow.css";

// const wordsArray = Array.from({ length: 50 }, (_, i) => `Word ${i + 1}`);
// const wordsArray = [ "HTML", "CSS", "JAVASCRIPT", "REACT", "REDUX", "TYPESCRIPT", "NODEJS", "EXPRESS", "MONGODB", "SQL", "REST", "API", "GRAPHQL", "VITE", "NEXTJS", "WEBPACK", "BABEL", "GIT", "GITHUB", "LINUX", "DOCKER", "KUBERNETES", "CI/CD", "JEST", "TESTING", "UI", "UX", "FRONTEND", "BACKEND", "FULLSTACK", "AUTHENTICATION", "AUTHORIZATION", "PERFORMANCE", "OPTIMIZATION", "ACCESSIBILITY", "RESPONSIVE", "DESIGN", "ANIMATION", "GSAP", "FRAMERMOTION", "STATE", "HOOKS", "COMPONENTS", "ROUTING", "DEPLOYMENT", "SERVERLESS", "CLOUD", "DATABASE", "ALGORITHM", "DEBUGGING", "VERSIONCONTROL", ];
const wordsArray=["PLUS", "Experience", "Curiosity", "Inquisitive", "Empathetic", "Creatively", "Rational", "Long- Lasting", "Optimal", "Articulate", "Consistency", "Intuitive"];

const WordsFlow = () => {
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  wordRefs.current = [];

  const addToRefs = (el) => {
    if (el && !wordRefs.current.includes(el)) {
      wordRefs.current.push(el);
    }
  };

  useGsapWordsFlow(containerRef, wordRefs);

  return (
    <section>
      <div className="words-flow-section" ref={containerRef}>
        {wordsArray.map((word, i) => (
          <h1
            key={i}
            ref={addToRefs}
            className="flow-word"
            style={{
              opacity: 0.1,
            }}
          >
            {word}
          </h1>
        ))}
      </div>
    </section>
  );
};

export default WordsFlow;
