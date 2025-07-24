import React, { useEffect, useState } from "react";

const DebrisCountCard = () => {
  const [debrisCount, setDebrisCount] = useState(0);

  useEffect(() => {
    fetch("/tle_data.json")
      .then((res) => res.json())
      .then((data) => {
        setDebrisCount(data.length);
      })
      .catch((err) => {
        console.error("Error loading debris data:", err);
      });
  }, []);

  return (
    <div className="mt-4 w-full bg-gray-900 p-4 rounded-lg shadow-md text-center">
      <p className="text-lg text-green-400 font-semibold">
        Total Debris Tracked:{" "}
        <span className="text-white text-xl">{debrisCount.toLocaleString()}</span>
      </p>
    </div>
  );
};

export default DebrisCountCard;
