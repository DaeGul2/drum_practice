import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>드럼 스트로크 연습</h1>
      <div className="button-group">
        <button onClick={() => navigate("/auto-bpm")} className="btn">
          자동 BPM 연습
        </button>
        {/* <button onClick={() => navigate("/fixed-bpm")} className="btn">
          고정 BPM 연습
        </button> */}
      </div>
    </div>
  );
}

export default Home;
