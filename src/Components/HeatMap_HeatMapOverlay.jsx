import React, { useState } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";

export default function HeatmapOverlay({ heatmapBins, radius = 4.1 }) {
  const [hoveredBin, setHoveredBin] = useState(null);

  const latStep = 10;
  const lonStep = 10;


  const getColors = (count) => {
    if (count > 15) return ["#f6a3a3", "#d40000", "High"]; // red
    if (count > 5) return ["#fff3a3", "#f9c802", "Medium"]; // yellow
    if (count > 0) return ["#a8e6a3", "#3b9f38", "Low"]; // green
    return [null, null, null];
  };

  return (
    <>
      {Object.entries(heatmapBins).map(([key, count], idx) => {
        const [latBin, lonBin] = key.split("-").map(Number);

        // ✅ FIX: Define lat and lon correctly
        const lat = latBin * latStep - 90 + latStep / 2;
        const lon = lonBin * lonStep - 180 + lonStep / 2;

        const latRad = THREE.MathUtils.degToRad(lat);
        const lonRad = THREE.MathUtils.degToRad(lon);

        const x = radius * Math.cos(latRad) * Math.cos(lonRad);
        const y = radius * Math.sin(latRad);
        const z = radius * Math.cos(latRad) * Math.sin(lonRad);

        const [baseColor, hoverColor, threatLevel] = getColors(count);
        if (!baseColor) return null;

        const isHovered = hoveredBin === key;

        return (
          <mesh
            key={idx}
            position={[x, y, z]}
            onPointerOver={() => setHoveredBin(key)}
            onPointerOut={() => setHoveredBin(null)}
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color={isHovered ? hoverColor : baseColor}
              transparent
              opacity={0.8}
              depthTest={false}
            />
            {isHovered && (
              <Html distanceFactor={10}>
                <div className="bg-white bg-opacity-90 text-black px-4 py-2 rounded-xl text-sm shadow-lg whitespace-nowrap border-l-4 border-red-500">
                  <div className="font-semibold">Location</div>
                  <div>
                    Lat: {lat.toFixed(1)}°, Lon: {lon.toFixed(1)}°
                  </div>
                  <div>
                    Debris: <span className="font-medium">{count}</span>
                  </div>
                  <div>
                    Threat:{" "}
                    <span className="font-bold text-red-600">
                      {threatLevel}
                    </span>
                  </div>
                </div>
              </Html>
            )}
          </mesh>
        );
      })}
    </>
  );
}
