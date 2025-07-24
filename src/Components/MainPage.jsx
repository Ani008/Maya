import React, { useRef, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Preload } from "@react-three/drei";
import Satellite from "./Satellite";
import Debris from"./Debris";
import WarningStack from "./WarningStack";




// Main App component
export default function MainPage({onDebrisSelect}) {



const [collisionLog, setCollisionLog] = useState([]);


const handleCollision = (collision) => {

  const id = `${collision.noradId}-${collision.timestamp.slice(0, 19)}`;
  const isDuplicate = collisionLog.some(
    (item) => `${item.noradId}-${item.timestamp.slice(0, 19)}` === id
  );
  if (isDuplicate) return;

  setCollisionLog((prev) => [collision, ...prev.slice(0, 49)]);
};




// Earth component to load and rotate the GLB model
function Earth({ rotationSpeed = 0.001 }) {
  const gltf = useGLTF("/earth-compressed.glb");
  const earthRef = useRef();

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += rotationSpeed;
    }
  });

  return <primitive object={gltf.scene} ref={earthRef} scale={0.03} />;
}














  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 20 }}
        style={{ background: "#000000" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[0, 2, 2]} intensity={1.5} color="yellow" />

        <Suspense fallback={null}>
          <Earth />
          <Satellite />

          <Debris earthRadius={0.03} onHover={onDebrisSelect} onCollision={handleCollision} />
          <Preload all />
        </Suspense>

        <OrbitControls
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          enableZoom
          minDistance={5}
          maxDistance={80}
        />
      </Canvas>

      
          <div className="fixed bottom-4 left-4 space-y-4 z-50">
            <WarningStack collisions={collisionLog} />

          </div>

    </div>
  );
}
