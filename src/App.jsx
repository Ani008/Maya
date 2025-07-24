import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import MainPage from "./Components/MainPage";
import DebrisCard from "./Components/DebrisCard";
import DebrisCountCard from "./Components/DebrisCountCard";
import SatellitePage from "./Pages/SatellitePage";
import HeatMap from "./Components/HeatMap_EarthModel"; 

// Wrap the Routes and UI in a separate component to use hooks
function AppContent() {
  const [selectedDebris, setSelectedDebris] = useState(null);
  const location = useLocation(); // 👈 Get current route path

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white">
      <Navbar />

      {/* Show these cards only on the main page */}
      {location.pathname === "/home" && (
        <div className="absolute top-16 right-5 z-50">
          <DebrisCard objectInfo={selectedDebris} />
          <DebrisCountCard />
        </div>
      )}

      <Routes>
        <Route path="/home" element={<MainPage onDebrisSelect={setSelectedDebris} />} />
        <Route path="/satellitepath" element={<SatellitePage />} />
        <Route path="/heatmap" element={<HeatMap />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
