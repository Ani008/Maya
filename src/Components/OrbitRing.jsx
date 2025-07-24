import React from "react";
import * as THREE from "three";
import * as satellite from "satellite.js";

export default function OrbitRing() {
  // Use the same TLE as your Satellite.jsx
  const TLE = [
    "1 25544U 98067A   24186.52723979  .00010111  00000+0  18756-3 0  9999",
    "2 25544  51.6426 254.4371 0004555 179.1735 304.8420 15.50446848427995",
  ];

  const satrec = satellite.twoline2satrec(TLE[0], TLE[1]);

  const points = [];
  const gmst = satellite.gstime(new Date());

  for (let i = 0; i < 90; i++) {
    const time = new Date(Date.now() + i * 60 * 1000); // every minute for 90 mins
    const posVel = satellite.propagate(satrec, time);
    if (!posVel.position) continue;

    const geo = satellite.eciToGeodetic(posVel.position, gmst);
    const lat = satellite.degreesLat(geo.latitude);
    const lon = satellite.degreesLong(geo.longitude);
    const alt = geo.height;

    const earthRadius = 5;
    const radius = earthRadius + (alt / 6371) * earthRadius;

    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    points.push(new THREE.Vector3(x, y, z));
  }

  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.TubeGeometry(curve, 300, 0.002, 8, true);
  const material = new THREE.MeshBasicMaterial({
    color: "aqua",
    transparent: true,
    opacity: 0.6,
  });

  return <mesh geometry={geometry} material={material} />;
}
