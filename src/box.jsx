import React from 'react';

const Box = (props) => {

  const updateState = () => {
    // only change box states when game is not over
    if (!props.gameOver) props.handleClick(props.rowNum, props.boxNum);
  };

  // if props.state = x or o
  let textColor = 'blue';
  if (props.state === 'o') {
    textColor = 'red';
  }

  

  return (
    // all this random stuff to make eslint stop crying about accessability
    <div 
      onClick={updateState} 
      onKeyDown={updateState} 
      role="button" 
      tabIndex="0" 
      className="box"
      style={{color: textColor}}
    >
      {props.state}
    </div>
  );
};

export default Box;