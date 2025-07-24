// Satellite.jsx
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as satellite from "satellite.js";
import satellitePosition from "../utils/satellitePositionRef";



const TLE = [
  "1 25544U 98067A   24186.52723979  .00010111  00000+0  18756-3 0  9999",
  "2 25544  51.6426 254.4371 0004555 179.1735 304.8420 15.50446848427995",
];

export default function Satellite() {
  const satelliteRef = useRef();
  const gltf = useGLTF("/satellite.glb");

  const satrec = satellite.twoline2satrec(TLE[0], TLE[1]);
  const timeRef = useRef(Date.now()); // starting time

  useFrame(() => {
    const speed = 200; // 600x time speed-up
    const simulatedTime = new Date(timeRef.current + performance.now() * speed);

    const posVel = satellite.propagate(satrec, simulatedTime);
    const gmst = satellite.gstime(simulatedTime);

    if (!posVel.position) return;

    const geo = satellite.eciToGeodetic(posVel.position, gmst);
    const lat = satellite.degreesLat(geo.latitude);
    const lon = satellite.degreesLong(geo.longitude);
    const alt = geo.height; // in kilometers

    const earthRadius = 5;
    const radius = earthRadius + (alt / 6371) * earthRadius;

    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    satelliteRef.current.position.set(x, y, z);
    satellitePosition.set(x, y, z);

    satelliteRef.current.lookAt(0, 0, 0);
  });

  return <primitive ref={satelliteRef} object={gltf.scene} scale={0.05} />;
}
