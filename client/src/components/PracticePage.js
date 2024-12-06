import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/PracticePage.css";

function PracticePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { startBPM, endBPM, bpmIncrement, measureInterval, noteSpeeds } =
    location.state || {};

  const [currentBPM, setCurrentBPM] = useState(startBPM); // 현재 BPM
  const [countdown, setCountdown] = useState(3); // 3초 카운트다운
  const [currentMeasure, setCurrentMeasure] = useState(0); // 현재 몇 번째 마디인지
  const [noteIndex, setNoteIndex] = useState(0); // 현재 마디의 n분음표 설정 인덱스
  const [isRunning, setIsRunning] = useState(false); // 현재 실행 상태
  const [audio] = useState(new Audio("/click-sound.mp3")); // 메트로놈 소리 파일 경로
  const [noteCount, setNoteCount] = useState(0); // 현재 마디에서 몇 번째 n분음표인지
  let intervalId = null;

  const playMetronome = () => {
    audio.currentTime = 0;
    audio.play();
  };

  // n분음표에 따른 소리 주기 계산
  const calculateInterval = () => {
    const noteSpeed = noteSpeeds[noteIndex];
    switch (noteSpeed) {
      case "4분음표":
        return (60 / currentBPM) * 1000; // 1박자 시간
      case "8분음표":
        return (60 / currentBPM) * 1000 / 2; // 1박자 2등분
      case "16분음표":
        return (60 / currentBPM) * 1000 / 4; // 1박자 4등분
      default:
        return (60 / currentBPM) * 1000;
    }
  };

  const calculateNotesPerMeasure = () => {
    const noteSpeed = noteSpeeds[noteIndex];
    switch (noteSpeed) {
      case "4분음표":
        return 4;
      case "8분음표":
        return 8;
      case "16분음표":
        return 16;
      default:
        return 4;
    }
  };

  // 카운트다운 로직
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setIsRunning(true); // 카운트다운 후 시작
    }
  }, [countdown]);

  // 메트로놈 연습 로직
  useEffect(() => {
    if (isRunning) {
      const notesPerMeasure = calculateNotesPerMeasure(); // 현재 마디의 소리 횟수
      intervalId = setInterval(() => {
        playMetronome(); // 메트로놈 소리 재생

        setNoteCount((prev) => {
          const newNoteCount = prev + 1;

          if (newNoteCount >= notesPerMeasure) {
            // 현재 마디 끝난 경우
            setNoteCount(0); // 마디 소리 횟수 초기화
            setCurrentMeasure((prev) => {
              const newMeasure = prev + 1;

              // BPM 증가 조건
              if (newMeasure % measureInterval === 0 && currentBPM < endBPM) {
                setCurrentBPM((prevBPM) => Math.min(prevBPM + bpmIncrement, endBPM));
              }

              // 다음 마디의 n분음표로 이동
              setNoteIndex((prevIndex) => (prevIndex + 1) % noteSpeeds.length);

              return newMeasure;
            });
          }

          return newNoteCount;
        });
      }, calculateInterval());
    }

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 클리어
  }, [isRunning, currentBPM, noteIndex]);

  // 연습 멈춤/재개 핸들러
  const toggleRunning = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalId); // 실행 중지
    } else {
      setIsRunning(true); // 실행 재개
    }
  };

  // 다시 설정 핸들러
  const resetPractice = () => {
    clearInterval(intervalId);
    setCurrentBPM(startBPM);
    setCurrentMeasure(1);
    setNoteIndex(0);
    setNoteCount(0);
    setCountdown(3);
    setIsRunning(false);
  };

  return (
    <div className="practice-container">
      {countdown > 0 ? (
        <h1 className="countdown">{countdown}</h1>
      ) : (
        <div>
          <h1>현재 BPM: {currentBPM}</h1>
          <h2>현재 속도: {noteSpeeds[noteIndex]}</h2>
          <h3>현재 마디: {currentMeasure+1}</h3>
         
          <div className="button-group">
            <button onClick={toggleRunning} className="control-btn">
              {isRunning ? "멈춤" : "다시 시작"}
            </button>
            <button onClick={resetPractice} className="control-btn reset-btn">
              다시 설정
            </button>
            <button onClick={() => navigate("/")} className="control-btn">
              홈으로
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PracticePage;
