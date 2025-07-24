import React from "react";

const WarningCard = ({ collision, onDismiss}) => {
  if (!collision) return null;

  const {
    name = "Unknown Object",
    noradId = "N/A",
    distance,
    timestamp,
  } = collision;

  return (
    <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col space-y-6 border border-red-500">
      <h2 className="text-2xl font-bold text-yellow-300 flex items-center gap-2">
        Potential Collision Alert
      </h2>

      <div className="space-y-2 text-white text-sm">
        <p><span className="font-semibold">Name:</span> {name}</p>
        <p><span className="font-semibold">NORAD ID:</span> {noradId}</p>
        <p>
          <span className="font-semibold">Estimated Distance:</span>{" "}
          {distance ? `${distance.toFixed(2)} km` : "N/A"}
        </p>
        <p>
          <span className="font-semibold">Time Detected:</span>{" "}
          {timestamp ? new Date(timestamp).toUTCString() : "N/A"}
        </p>
      </div>

      <div className="mt-4 flex justify-between gap-2">
        <button onClick={onDismiss} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md">Dismiss</button>
        <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md">Track Object</button>
        <button className="px-4 py-2 bg-gray-300 hover:bg-white text-black rounded-md">More Info</button>
      </div>
    </div>
  );
};

export default WarningCard;
