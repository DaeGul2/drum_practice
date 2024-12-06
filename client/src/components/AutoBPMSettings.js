import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AutoBPMSettings.css";

function AutoBPMSettings() {
  const [startBPM, setStartBPM] = useState(60);
  const [endBPM, setEndBPM] = useState(120);
  const [bpmIncrement, setBPMIncrement] = useState(2); // 몇 BPM씩 증가할지 설정
  const [measureInterval, setMeasureInterval] = useState(4);
  const [noteSpeeds, setNoteSpeeds] = useState([]);
  const navigate = useNavigate();

  // 마디 수가 변경될 때 noteSpeeds 배열 초기화
  useEffect(() => {
    const newSpeeds = Array(measureInterval).fill("4분음표");
    setNoteSpeeds(newSpeeds);
  }, [measureInterval]);

  const handleNoteSpeedChange = (index, value) => {
    const updatedSpeeds = [...noteSpeeds];
    updatedSpeeds[index] = value;
    setNoteSpeeds(updatedSpeeds);
  };

  const startPractice = () => {
    navigate("/practice", {
      state: { startBPM, endBPM, bpmIncrement, measureInterval, noteSpeeds },
    });
  };

  return (
    <div className="auto-settings-container">
      <h1>자동 BPM 설정</h1>
      <div className="form-group">
        <label>시작 BPM:</label>
        <input
          type="number"
          value={startBPM}
          onChange={(e) => setStartBPM(Number(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label>최종 BPM:</label>
        <input
          type="number"
          value={endBPM}
          onChange={(e) => setEndBPM(Number(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label>몇 BPM씩 증가:</label>
        <input
          type="number"
          value={bpmIncrement}
          onChange={(e) => setBPMIncrement(Number(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label>몇 마디마다 속도 증가:</label>
        <input
          type="number"
          value={measureInterval}
          onChange={(e) => setMeasureInterval(Number(e.target.value))}
        />
      </div>
      <div className="form-group">
        <h3>마디별 속도 설정</h3>
        {noteSpeeds.map((speed, index) => (
          <div key={index} className="note-speed">
            <label>{index + 1}번째 마디:</label>
            <select
              value={speed}
              onChange={(e) => handleNoteSpeedChange(index, e.target.value)}
            >
              <option value="4분음표">4분음표</option>
              <option value="8분음표">8분음표</option>
              <option value="16분음표">16분음표</option>
            </select>
          </div>
        ))}
      </div>
      <button onClick={startPractice} className="start-btn">
        시작
      </button>
    </div>
  );
}

export default AutoBPMSettings;
