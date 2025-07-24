// SatellitePage.jsx
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import SatelliteInfoCard from "../Components/SatellitePage_SatellitePageInfoCard";

const gsat7Data = {
  name: "GSAT-7 (Rukmini)",
  type: "Military Communications Satellite",
  operator: "ISRO / Indian Navy",
  launchDate: "August 30, 2013",
  purpose: "Secure naval communication for Indian Armed Forces",
  orbitType: "Geostationary (GEO)",
  status: "Active",
};


function SatelliteModel() {
  const gltf = useGLTF("/satellite.glb");
  const modelRef = useRef();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005; // rotate around Y-axis
    }
  });

  return <primitive object={gltf.scene} ref={modelRef} scale={0.4} />;
}

export default function SatellitePage() {
  return (
    <div className="relative w-full h-screen bg-black">
      <Canvas camera={{ position: [0, 0, 2], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Suspense fallback={null}>
          <SatelliteModel />
        </Suspense>

        <OrbitControls enableZoom={true} autoRotate={false} />
        {/* autoRotate set to false */}
      </Canvas>

      <div className="absolute top-20 right-10 z-50">
        <SatelliteInfoCard satellite={gsat7Data} />
      </div>
    </div>
  );
}
