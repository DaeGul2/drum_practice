import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AutoBPMSettings from "./components/AutoBPMSettings";
import FixedBPMSettings from "./components/FixedBPMSettings";
import PracticePage from "./components/PracticePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auto-bpm" element={<AutoBPMSettings />} />
        <Route path="/fixed-bpm" element={<FixedBPMSettings />} />
        <Route path="/practice" element={<PracticePage />} />
      </Routes>
    </Router>
  );
}

export default App;
