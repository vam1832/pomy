import React, { useState } from 'react';
import CountdownTimer from './components/CountdownTimer/CountdownTimer';
// import Popup from './components/Popup';
// import ThemeSelector from './components/ThemeSelector';
import "./App.css"

const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  return (
    <div>
      <CountdownTimer isRunning={isRunning} time={time} handleStart={handleStart} handleReset={handleReset} videoId={"H1iboKia3AQ"} />
    </div>
  );
};

export default App;
