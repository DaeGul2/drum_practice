import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FixedBPMSettings.css";

function FixedBPMSettings() {
  const [bpm, setBPM] = useState(60);
  const navigate = useNavigate();

  const startPractice = () => {
    navigate("/practice", { state: { bpm } });
  };

  return (
    <div className="fixed-settings-container">
      <h1>고정 BPM 설정</h1>
      <div className="form-group">
        <label>고정 BPM:</label>
        <input
          type="number"
          value={bpm}
          onChange={(e) => setBPM(Number(e.target.value))}
        />
      </div>
      <button onClick={startPractice} className="start-btn">
        시작
      </button>
    </div>
  );
}

export default FixedBPMSettings;
