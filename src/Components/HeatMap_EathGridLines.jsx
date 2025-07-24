// EarthGrid.jsx
import React, { useMemo, useState } from "react";
import * as THREE from "three";

export default function EarthGrid({
  radius = 4,
  latStep = 10,
  lonStep = 10,
  heatmapBins = {},
}) {
  const [hovered, setHovered] = useState(null);

  const getColors = (count) => {
    if (count > 15) return ["#f6a3a3", "#d40000"]; // red
    if (count > 5) return ["#fff3a3", "#f9c802"]; // yellow
    if (count > 0) return ["#a8e6a3", "#3b9f38"]; // green
    return [null, null];
  };

  // Line grid generation
  const lineGeometry = useMemo(() => {
    const lines = [];

    // Longitude lines
    for (let lon = 0; lon < 360; lon += lonStep) {
      for (let lat = -90; lat < 90; lat++) {
        const latRad = THREE.MathUtils.degToRad(lat);
        const lonRad = THREE.MathUtils.degToRad(lon);

        const x = radius * Math.cos(latRad) * Math.cos(lonRad);
        const y = radius * Math.sin(latRad);
        const z = radius * Math.cos(latRad) * Math.sin(lonRad);

        const latRadNext = THREE.MathUtils.degToRad(lat + 1);
        const x2 = radius * Math.cos(latRadNext) * Math.cos(lonRad);
        const y2 = radius * Math.sin(latRadNext);
        const z2 = radius * Math.cos(latRadNext) * Math.sin(lonRad);

        lines.push(new THREE.Vector3(x, y, z), new THREE.Vector3(x2, y2, z2));
      }
    }

    // Latitude lines
    for (let lat = -90 + latStep; lat <= 90 - latStep; lat += latStep) {
      for (let lon = 0; lon < 360; lon++) {
        const latRad = THREE.MathUtils.degToRad(lat);
        const lonRad = THREE.MathUtils.degToRad(lon);

        const x = radius * Math.cos(latRad) * Math.cos(lonRad);
        const y = radius * Math.sin(latRad);
        const z = radius * Math.cos(latRad) * Math.sin(lonRad);

        const lonRadNext = THREE.MathUtils.degToRad(lon + 1);
        const x2 = radius * Math.cos(latRad) * Math.cos(lonRadNext);
        const y2 = y;
        const z2 = radius * Math.cos(latRad) * Math.sin(lonRadNext);

        lines.push(new THREE.Vector3(x, y, z), new THREE.Vector3(x2, y2, z2));
      }
    }

    return new THREE.BufferGeometry().setFromPoints(lines);
  }, [radius, latStep, lonStep]);

  const heatmapPatches = [];
  for (let lat = -90; lat < 90; lat += latStep) {
    for (let lon = -180; lon < 180; lon += lonStep) {
      const latBin = Math.floor((lat + 90) / latStep);
      const lonBin = Math.floor((lon + 180) / lonStep);
      const binKey = `${latBin}-${lonBin}`;
      const count = heatmapBins[binKey] || 0;
      const [baseColor, hoverColor] = getColors(count);
      if (!baseColor) continue;

      const latMid = lat + latStep / 2;
      const lonMid = lon + lonStep / 2;

      const phi = (90 - latMid) * (Math.PI / 180);
      const theta = (lonMid + 180) * (Math.PI / 180);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      const position = new THREE.Vector3(x, y, z);
      const normal = position.clone().normalize();
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        normal
      );

      heatmapPatches.push(
        <mesh
          key={binKey}
          position={position}
          quaternion={quaternion}
          onPointerOver={() => setHovered(binKey)}
          onPointerOut={() => setHovered(null)}
        >
          <planeGeometry args={[latStep * 0.05, lonStep * 0.05]} />
          <meshStandardMaterial
            color={hovered === binKey ? hoverColor : baseColor}
            transparent
            opacity={0.7}
            depthTest={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      );
    }
  }

  return (
    <>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="cyan" transparent opacity={0.3} />
      </lineSegments>
      <group>{heatmapPatches}</group>
    </>
  );
}
