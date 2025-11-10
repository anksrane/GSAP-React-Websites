// src/app/sections/Plus3D/PlusMesh.jsx
import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Color } from "three";
import { useEffect, useState } from "react";
import { useScrollRotate } from "./useScrollRotate";

const PlusMesh = () => {
  const group = useRef();
  useScrollRotate(group);
  const { size } = useThree();
  const [scale, setScale] = useState(1);  

  useEffect(() => {
    if (size.width < 600) setScale(0.7); // mobile
    else if (size.width < 1024) setScale(0.9); // tablet
    else setScale(1); // desktop
  }, [size.width]);  

  // Fetch CSS colors dynamically
  const getCssColor = (varName) =>
    getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();  

  const plus1Color = new Color(getCssColor("--plus-primary") || "#00aaff");
  const plus2Color = new Color(getCssColor("--plus-secondary") || "#ffaa00");      

  // Continuous idle rotation
  useFrame((_, delta) => {
    group.current.rotation.y += delta * 0.2;
    group.current.rotation.x += delta * 0.2;
  });

  return (
    <group ref={group} scale={[scale, scale, scale]}>
      {/* ===== Plus Sign 1 — Normal ===== */}
      <group>
        {/* Vertical bar */}
        <mesh>
          <boxGeometry args={[0.3, 1.8, 0.3]} />
          <meshStandardMaterial color={plus1Color} metalness={0.5} roughness={0.2} />
        </mesh>

        {/* Horizontal bar */}
        <mesh>
          <boxGeometry args={[1.8, 0.3, 0.3]} />
          <meshStandardMaterial color={plus1Color} metalness={0.5} roughness={0.2} />
        </mesh>
      </group>

      {/* ===== Plus Sign 2 — Rotated 90° around Y-axis ===== */}
      <group rotation={[0, Math.PI / 2, 0]}>
        {/* Vertical bar */}
        <mesh>
          <boxGeometry args={[0.3, 1.8, 0.3]} />
          <meshStandardMaterial color={plus2Color} metalness={0.5} roughness={0.2} />
        </mesh>

        {/* Horizontal bar */}
        <mesh>
          <boxGeometry args={[1.8, 0.3, 0.3]} />
          <meshStandardMaterial color={plus2Color} metalness={0.5} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
};

export default PlusMesh;

// import React, { useRef } from "react";
// import { useFrame } from "@react-three/fiber";

// const PlusMesh = () => {
//   const group = useRef();

//   // Continuous slow rotation (idle)
//   useFrame((state, delta) => {
//     group.current.rotation.y += delta * 0.2; // adjust idle speed
//   });

//   return (
//     <group ref={group}>
//       {/* Vertical bar */}
//       <mesh position={[0, 0, 0]}>
//         <boxGeometry args={[0.3, 1.2, 0.3]} />
//         <meshStandardMaterial color="#00aaff" />
//       </mesh>

//       {/* Horizontal bar */}
//       <mesh position={[0, 0, 0]}>
//         <boxGeometry args={[1.2, 0.3, 0.3]} />
//         <meshStandardMaterial color="#00aaff" />
//       </mesh>
//     </group>
//   );
// };

// export default PlusMesh;
