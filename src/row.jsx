import React from 'react';
import Box from './box.jsx';

const Row = (props) => {

  const {rowNum, handleClick, states, gameOver} = props;

  return (
    <div className="row">
      <Box boxNum={0} rowNum={rowNum} handleClick={handleClick} gameOver={gameOver} state={states[0]}/>
      <Box boxNum={1} rowNum={rowNum} handleClick={handleClick} gameOver={gameOver} state={states[1]}/>
      <Box boxNum={2} rowNum={rowNum} handleClick={handleClick} gameOver={gameOver} state={states[2]}/>
      <Box boxNum={3} rowNum={rowNum} handleClick={handleClick} gameOver={gameOver} state={states[3]}/>
      <Box boxNum={4} rowNum={rowNum} handleClick={handleClick} gameOver={gameOver} state={states[4]}/>
      <Box boxNum={5} rowNum={rowNum} handleClick={handleClick} gameOver={gameOver} state={states[5]}/>
      <Box boxNum={6} rowNum={rowNum} handleClick={handleClick} gameOver={gameOver} state={states[6]}/>
    </div>
  );
};

export default Row;