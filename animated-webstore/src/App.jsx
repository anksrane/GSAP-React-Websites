import React, { useState } from "react";
import MainLoading from "./components/MainLoading"; 
import Hero from "./components/Hero";
import InteractiveSection from "./components/InteractiveSection";
import WordsFlow from "./components/WordsFlow/WordsFlow";
import "./App.css";

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      {!loadingComplete && (
        <MainLoading onFinish={() => setLoadingComplete(true)} />
      )}
      {loadingComplete && (<><Hero /><InteractiveSection /><WordsFlow /></>)}
    </>
  );
}

export default App;
