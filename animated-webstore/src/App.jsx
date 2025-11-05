import React, { useState } from "react";
import MainLoading from "./components/MainLoading"; // adjust path
import Hero from "./components/Hero";
import "./App.css";

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      {!loadingComplete && (
        <MainLoading onFinish={() => setLoadingComplete(true)} />
      )}
      {loadingComplete && <Hero />}
    </>
  );
}

export default App;
