import React, { useState } from "react";
import WarningCard from "./WarningCard";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function WarningStack({ collisions = [] }) {
  const [showAll, setShowAll] = useState(false);

  if (collisions.length === 0) return null;

  const latest = collisions[0];
  const rest = collisions.slice(1);

  return (
    <div className="w-full max-w-md space-y-4">
      <WarningCard collision={latest} />

      {rest.length > 0 && (
        <div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1 text-sm text-yellow-300 hover:text-yellow-400 mt-1"
          >
            {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {showAll ? "Hide older alerts" : `Show ${rest.length} more warnings`}
          </button>

          {showAll && (
            <div className="mt-3 max-h-96 overflow-y-auto space-y-3 pr-1">
              {rest.map((col, idx) => (
                <WarningCard key={idx} collision={col} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
