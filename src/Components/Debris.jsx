import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as satellite from "satellite.js";
import parseTLEInfo from "./parseTLEinfo";
import * as THREE from "three";
import satellitePosition from "../utils/satellitePositionRef";

export default function Debris({ earthRadius = 0.03, onHover, onCollision, onHeatmapUpdate}) {
  const groupRef = useRef();
  const [satRecs, setSatRecs] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const reportedCollisions = useRef(new Set());

  function latLonBin(lat, lon, latStep = 10, lonStep = 10) {
  const latBin = Math.floor((lat + 90) / latStep);
  const lonBin = Math.floor((lon + 180) / lonStep);
  return `${latBin}-${lonBin}`;
  }


  // ✅ Load TLE data once
  useEffect(() => {
    async function fetchTLE() {
      const res = await fetch("/tle_data.json");
      const json = await res.json();
      const data = json.map(({ name, line1, line2 }) => ({
        name,
        line1,
        line2,
        noradId: line1.slice(2, 7), // ✅ Extract NORAD ID (standard format)
        satrec: satellite.twoline2satrec(line1, line2),
      }));

      setSatRecs(data.slice(0, 100)); // Limit for performance
    }

    fetchTLE();
  }, []);

  // ✅ Animate debris and detect collisions
  useFrame(() => {
    if (!groupRef.current) return;

    const now = new Date();
    const gmst = satellite.gstime(now);
    let posVel;

    satRecs.forEach((sat, i) => {
      const { satrec, name } = sat;

      try {
        posVel = satellite.propagate(satrec, now);
      } catch (err) {
        console.warn("Propagation failed for", name, err);
        return;
      }

      if (!posVel || !posVel.position || !posVel.velocity) return;

      const positionGd = satellite.eciToGeodetic(posVel.position, gmst);
      const lat = satellite.degreesLat(positionGd.latitude);
      const lon = satellite.degreesLong(positionGd.longitude);
      const alt = positionGd.height;

      const orbitScale = 5;
      const altitudeKm = alt + 6371;
      const radius = (altitudeKm / 6371) * orbitScale;

      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      if (groupRef.current && groupRef.current.children[i]) {
        const mesh = groupRef.current.children[i];
        mesh.position.set(x, y, z);
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
      }

      const debrisPosition = new THREE.Vector3(x, y, z);
      const distance = debrisPosition.distanceTo(satellitePosition);

      if (distance < 0.3) {
        const collisionData = {
          noradId: sat.noradId,
          name: sat.name,
          distance: distance,
          timestamp: now.toISOString(),
        };

        // Avoid repeating same alert using Set
        const key = `${collisionData.noradId}-${collisionData.timestamp.slice(
          0,
          19
        )}`;
        if (!reportedCollisions.current.has(key)) {
          reportedCollisions.current.add(key);
          onCollision?.(collisionData);
        }
      }
      const binCounts = {};

    satRecs.forEach(({ satrec }) => {
    const posVel = satellite.propagate(satrec, new Date());
  

      const bin = latLonBin(lat, lon);
      binCounts[bin] = (binCounts[bin] || 0) + 1;
    });


     onHeatmapUpdate?.(binCounts);
    });
    


  });

  return (
    <group ref={groupRef}>
      {satRecs.map((sat, i) => (
        <mesh
          key={i}
          onPointerOver={(e) => {
            e.stopPropagation();
            const parsed = parseTLEInfo(sat.name, sat.line1, sat.line2);
            setSelectedIndex(i);
            onHover?.({
              name: sat.name,
              line1: sat.line1,
              line2: sat.line2,
              noradId: sat.line1.slice(2, 7),
              ...parsed,
            });
          }}
        >
          <boxGeometry args={[0.05, 0.05, 0.05]} />
          <meshStandardMaterial color={selectedIndex === i ? "red" : "white"} />
        </mesh>
      ))}
    </group>
  );
}
