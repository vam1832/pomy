import React from 'react';
import styles from './CountdownButton.module.scss';

const CountdownButton = ({
  isActive = false,
  onClick,
  text,
  fontSize = ".8rem",
  width = 90,
  height = 28,
  buttonColor = '#fff',
  backgroundColor = 'transparent',
  borderColor = 'white',
  textColor = 'white',
  hoverButtonColor = "black",
  hoverBackgroundColor = "white",
  hoverBorderColor = "white",
  hoverTextColor = "black"
}) => {
  const buttonStyle = {
    '--buton-font-size': fontSize,
    '--button-width': `${width}px`,
    '--button-height': `${height}px`,
    '--button-color': buttonColor,
    '--button-background-color':  backgroundColor,
    '--button-border-color': borderColor,
    '--button-text-color': textColor,
    '--button-hover-color': hoverButtonColor,
    '--button-hover-background-color': hoverBackgroundColor,
    '--button-hover-border-color': hoverBorderColor,
    '--button-hover-text-color': hoverTextColor,
  };

  const handleClick = () => {
    onClick();
  };

  return (
    <button className={`${styles.countdown_button} ${isActive ? styles.active : ''}`} style={buttonStyle} onClick={handleClick}>
      {text}
    </button>
  );
};

export default CountdownButton;
