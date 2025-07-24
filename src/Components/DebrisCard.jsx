import React from "react";

const DebrisCard = ({ objectInfo }) => {
  const data = {
    name: objectInfo?.name || "No object selected",
    noradId: objectInfo?.noradId || "—",
    altitude: objectInfo?.altitude || "—",
    inclination: objectInfo?.inclination || "—",
    eccentricity: objectInfo?.eccentricity || "—",
    meanMotion: objectInfo?.meanMotion || "—",
    latitude: objectInfo?.latitude || "—",
    longitude: objectInfo?.longitude || "—",
  };

  return (
    <div className="w-full bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-green-400">OBJECT INFO</h2>

        <h3 className="text-2xl font-bold text-white">{data.name}</h3>
        <p className="text-gray-300">NORAD ID: {data.noradId || "N/A"}</p>

        <div className="space-y-2 text-gray-300">
          <p>
            <span className="font-semibold">Country:</span> Unknown
          </p>{" "}
          {/* Not available in TLE */}
          <p>
            <span className="font-semibold">Type:</span> Debris
          </p>{" "}
          {/* You can make this dynamic if needed */}
          <p>
            <span className="font-semibold">Altitude:</span> {data.altitude}km
          </p>
          <p>
            <span className="font-semibold">Inclination:</span>{" "}
            {data.inclination}°
          </p>
          <p>
            <span className="font-semibold">Eccentricity:</span>{" "}
            {data.eccentricity}
          </p>
          <p>
            <span className="font-semibold">Mean Motion:</span>{" "}
            {data.meanMotion}rev/day
          </p>
          <p>
            <span className="font-semibold">Latitude:</span>{" "}
            {typeof data.latitude === "number"
              ? `${data.latitude.toFixed(2)}°`
              : data.latitude}
          </p>
          <p>
            <span className="font-semibold">Longitude:</span>{" "}
            {typeof data.longitude === "number"
              ? `${data.longitude.toFixed(2)}°`
              : data.longitude}
          </p>
        </div>

        <button
          disabled={!objectInfo}
          className={`w-full py-3 font-bold rounded-md transition-colors duration-200 ${
            objectInfo
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-600 text-gray-300 cursor-not-allowed"
          }`}
        >
          Track A Debris
        </button>
      </div>
    </div>
  );
};

export default DebrisCard;
