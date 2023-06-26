import React, { useState, useEffect } from 'react';
import styles from './CountdownTimer.module.scss';
import CountdownButton from './CountdownButton/CountdownButton';
import { VscDebugRestart } from "react-icons/vsc";

const CountdownTimer = ({ defaultTime = '00:05', videoIdYT }) => {
  const parseTime = (timeString) => {
    const [minutes, seconds] = timeString.split(':');
    return parseInt(minutes) * 60 + parseInt(seconds);
  };

  const [defaultTimeCountdown, setDefaultTimeCountdown] = useState(defaultTime)
  const [time, setTime] = useState(parseTime(defaultTime));
  const [isRunning, setIsRunning] = useState(false);
  const [activeButton, setActiveButton] = useState("pomodoro");
  const [isAnimating, setIsAnimating] = useState(false);
  const [videoId, setVideoId] = useState(videoIdYT)

  useEffect(() => {
    let intervalId;

    if (isRunning && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      stopVideoAudio();
      const notification = new Audio('src/sounds/notification_pomodoro.mp3');
      notification.play();
      setTime(parseTime(defaultTime));
      setIsRunning(false);
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, time]);

  const handleStart = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
    if (!isRunning) {
      playVideoAudio();
    } else {
      pauseVideoAudio();
    }
  };

  const handleReset = () => {
    setTime(parseTime(defaultTimeCountdown));
    setIsRunning(false);
    stopVideoAudio();
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const playVideoAudio = () => {
    const iframe = document.getElementById('youtube-iframe');
    iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
  };

  const pauseVideoAudio = () => {
    const iframe = document.getElementById('youtube-iframe');
    iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo' }), '*');
  };

  const stopVideoAudio = () => {
    const iframe = document.getElementById('youtube-iframe');
    iframe.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'stopVideo' }), '*');
  };

  const handleButtonClick = (buttonId) => {
    stopVideoAudio()
    setActiveButton(buttonId);
    handleReset();
    if (buttonId === "pomodoro") {
      setTime(parseTime('35:00'))
      setDefaultTimeCountdown('35:00')
      setVideoId("H1iboKia3AQ")
    } else if (buttonId === "short_break") {
      setTime(parseTime('10:00'))
      setDefaultTimeCountdown('10:00')
      setVideoId("novideo")
    } else if (buttonId === "long_break") {
      setTime(parseTime('25:00'))
      setDefaultTimeCountdown('25:00')
      setVideoId("novideo")
    }
  };

  const handleClick = () => {
    handleReset();
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <div className={styles["countdown-timer"]}>
      <div className={styles["countdown-states"]}>
        <CountdownButton
          isActive={activeButton === "pomodoro"}
          onClick={() => handleButtonClick("pomodoro")}
          text={"pomodoro"}
          width={100}
        />
        <CountdownButton
          isActive={activeButton === "short_break"}
          onClick={() => handleButtonClick("short_break")}
          text={"short break"}
          width={100}
        />
        <CountdownButton
          isActive={activeButton === "long_break"}
          onClick={() => handleButtonClick("long_break")}
          text={"long break"}
          width={100}
        />
      </div>
      <h1 className={styles["countdown-timer__time"]}>{formatTime(time)}</h1>
      <div className={styles["countdown-timer__buttons"]}>
        <CountdownButton
          onClick={handleStart}
          text={isRunning ? 'Pause' : 'Start'}
          isActive={isRunning}
          width={100}
          height={40}
          backgroundColor='black'
          borderColor='black'
          fontSize='1rem'
        />
        <VscDebugRestart
          color='white'
          size={38}
          cursor={"pointer"}
          onClick={handleClick}
          className={isAnimating ? styles['animated-icon'] : ""}
        />
      </div>
      <iframe
        id="youtube-iframe"
        width="0"
        height="0"
        className={styles['yt-iframe']}
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default CountdownTimer;
