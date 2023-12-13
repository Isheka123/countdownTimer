import React, { useState, useEffect, useRef } from "react";
import "./Timer.css";

function Timer() {

  // States to manage time and timer control

  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hrs, setHrs] = useState(0);
  const [playState, setPlayState] = useState("paused");
  const [initialVal, setInitialVal] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Function to handle input change

  const handleInputChange = (event) => {
    const { value } = event.target;

    // Update initial value and calculate time in hrs, min, sec
    setInitialVal(value);
    setHrs(Math.floor(value / 60));
    setMin(value % 60);
    setSec(0);

    // Stop the timer if running
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  // Function to start the timer
  const startTimer = () => {
    setIsRunning(true);
    setPlayState("playing");
  };

  // Function to pause the timer
  const pauseTimer = () => {
    setIsRunning(false);
    setPlayState("paused");
  };

  // Function to reset the timer and input
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setPlayState("paused");
    setIsRunning(false);
    setHrs(0);
    setMin(0);
    setSec(0);
    setInitialVal(0);
  };

  // useEffect to manage the countdown logic
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (sec === 0) {
          if (min === 0 && hrs === 0) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
          } else if (min === 0) {
            setHrs((prevhrs) => prevhrs - 1);
            setMin(59);
            setSec(59);
          } else {
            setMin((prevmin) => prevmin - 1);
            setSec(59);
          }
        } else {
          setSec((prevsec) => prevsec - 1);
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, hrs, min, sec]);

  return (
    
    <div className={`timer ${playState}`}>
      <div className="timer_title">
        <h3>Enter minutes</h3>
        <input
          className="box"
          value={isRunning ? initialVal : initialVal !== 0 ? initialVal : ''}
          onChange={handleInputChange}
        />
      </div>
      <div className="play1">
        <svg
          viewBox="0 0 32 32"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 32 32"
          className="play"
          onClick={startTimer}
        >
          <path
            d="M16 0C7.164 0 0 7.164 0 16s7.164 16 16 16 16-7.164 16-16S24.836 0 16 0zm-6 24V8l16.008 8L10 24z"
            fill="#39aae3"
            className="fill-4e4e50"
          ></path>
        </svg>
        <p>{`${hrs.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`}</p>
        <svg
          viewBox="0 0 32 32"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 32 32"
          className="pause"
          onClick={pauseTimer}
        > 
          <path
            d="M14 0H4C1.79 0 0 1.79 0 4v24c0 2.21 1.79 4 4 4h10c2.21 0 4-1.79 4-4V4c0-2.21-1.79-4-4-4zm0 28H4V4h10v24z"
            fill="#39aae3"
            className="fill-4e4e50"
          ></path>
        </svg>
        <svg
          viewBox="0 0 32 32"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 32 32"
          className="reset"
          onClick={resetTimer}
        >
          <path
            d="M16 0C7.164 0 0 7.164 0 16s7.164 16 16 16 16-7.164 16-16S24.836 0 16 0zm0 28C8.268 28 4 23.732 4 16S8.268 4 16 4s12 4.268 12 12-4.268 12-12 12zm-3.5-9.5l9-9"
            fill="#39aae3"
            className="fill-4e4e50"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default Timer;
