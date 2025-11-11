import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import PlusMesh from "./PlusMesh";
import "./Plus3D.css";

const PlusScene = () => {
  return (
    <div className="plus3d-wrapper">
      <Canvas camera={{ position: [4, 0, 4] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <PlusMesh />
        </Suspense>
        {/* Remove or limit OrbitControls for production */}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default PlusScene;
