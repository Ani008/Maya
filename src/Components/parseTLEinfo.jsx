import * as satellite from "satellite.js";

/**
 * Parses TLE line1 and line2 into usable satellite data
 */
export default function parseTLEInfo(name, line1, line2) {
  try {
    const satrec = satellite.twoline2satrec(line1, line2);
    const now = new Date();
    const gmst = satellite.gstime(now);
    const posVel = satellite.propagate(satrec, now);

    if (!posVel.position) return null;

    const geo = satellite.eciToGeodetic(posVel.position, gmst);
    const lat = satellite.degreesLat(geo.latitude);
    const lon = satellite.degreesLong(geo.longitude);
    const alt = geo.height.toFixed(2); // in km

    const info = {
      name: name.trim(),
      noradId: line1.slice(2, 7),
      inclination: satrec.inclo.toFixed(2),
      eccentricity: satrec.ecco.toFixed(6),
      meanMotion: satrec.no.toFixed(4),
      altitude: alt,
      latitude: lat,
      longitude: lon,
      epoch: parseEpochFromLine1(line1),
    };

    return info;
  } catch (err) {
    console.error("Failed to parse TLE:", err);
    return null;
  }

}

/**
 * Optional utility to parse a readable epoch from line1
 */
function parseEpochFromLine1(line1) {
  const epochYear = parseInt(line1.slice(18, 20));
  const epochDay = parseFloat(line1.slice(20, 32));

  const fullYear = epochYear < 57 ? 2000 + epochYear : 1900 + epochYear;
  const epochDate = new Date(fullYear, 0); // Jan 1
  epochDate.setDate(epochDate.getDate() + epochDay - 1);

  return epochDate.toUTCString();
}



