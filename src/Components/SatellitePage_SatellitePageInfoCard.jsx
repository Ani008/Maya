import React from "react";

const SatellitePage_SatellitePageInfoCard = ({satellite})=>{
    if(!satellite) return null;

    const{
        name,
        type,
        operator,
        launchDate,
        purpose,
        orbitType,
        status,
    } = satellite;

     return (
    <div className="max-w-lg mx-auto bg-gray-900 text-white rounded-xl shadow-lg p-6 border border-blue-600">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">{name}</h2>
      <div className="space-y-2 text-sm">
        <p><strong>Type:</strong> {type}</p>
        <p><strong>Operator:</strong> {operator}</p>
        <p><strong>Launch Date:</strong> {launchDate}</p>
        <p><strong>Purpose:</strong> {purpose}</p>
        <p><strong>Orbit Type:</strong> {orbitType}</p>
        <p><strong>Status:</strong> {status}</p>

        <p><strong>Source:</strong> Wikipedia </p>
      </div>
    </div>
  );
};

export default SatellitePage_SatellitePageInfoCard;