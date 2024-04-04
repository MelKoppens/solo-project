import React, {useState, useEffect} from 'react';
import Row from './row.jsx';

const Board = (props) => {
  // states for each of our boxes
  const emptyArray42 = new Array(42).fill(' ');
  const [entries, setEntries] = useState(emptyArray42);
  const [circleTurn, setCircleTurn] = useState(true);
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState('Good Luck! O goes first');
  const [oScore, setOScore] = useState(0);
  const [xScore, setXScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // function to change box states
  const changeBoxState = (rowNum, boxNum) => {

    // if the column is full, do not change the state
    if (entries[boxNum] !== ' ') return;

    let newArr;
    // ***  function to find correct box to change and animate drop ***
    async function animate(box) {
      // const stateIdx = (7 * row) + box + 7;
      while (entries[box] === ' ') {

        // change specific box depending on whos turn it is
        (circleTurn) 
          ? newArr = entries.toSpliced(box, 1, 'o') 
          : newArr = entries.toSpliced(box, 1, 'x');
        if (box >= 7) newArr = newArr.toSpliced(box - 7, 1, ' ');
    
        // set the change
        setEntries(newArr);

        // animate the box at certain step speed
        await waitForMe(80);
        box+=7;
      }
      checkSetWinner(newArr);
    }

    animate(boxNum);

    /*
    // *** find correct box to change (instant change) ***
    let bottomRowNum = 5;
    while (entries[(7 * bottomRowNum) + boxNum] !== ' ') {
      bottomRowNum--;
      // if the column is full, do not change the state
      if (bottomRowNum === -1) return;
    }

    const stateIdx = (7 * bottomRowNum) + boxNum;

    // change specific box depending on whos turn it is
    // setCount(count+1);

    let newArr;
    (circleTurn) 
      ? newArr = entries.toSpliced(stateIdx, 1, 'o') 
      : newArr = entries.toSpliced(stateIdx, 1, 'x');

    // set the change
    setEntries(newArr);
    */

    // generic wait function
    function waitForMe(ms) {
      return new Promise( resolve => {
        setTimeout(() => resolve(''), ms);
      })
    };

    // change turns
    setCircleTurn(!circleTurn);

    // Tests if there is 4 in a row
    // checkFour is a helper function, returns winner if any else returns ' '
    function checkFour(arr, mode) {
      let iEnd, jEnd, offset, step;
      let winner = ' ';
      switch (mode) {
        case 'row': iEnd = 6; jEnd = 4; offset = 0; step = 1; break;
        case 'column': iEnd = 3; jEnd = 7; offset = 0; step = 7; break;
        case 'down-d': iEnd = 3; jEnd = 4; offset = 0; step = 8; break;
        case 'up-d': iEnd = 3; jEnd = 4; offset = 3; step = 6; break;
      }
      outerLoop: for (let i = 0; i < iEnd; i++) {
        innerLoop: for (let j = 0; j < jEnd; j++) {
          if (arr[7 * i + j + offset] === arr[7 * i + j + offset + step] &&
            arr[7 * i + j + offset + step] === arr[7 * i + j + offset + 2 * step] &&
            arr[7 * i + j + offset + 2 * step] === arr[7 * i + j + offset + 3 * step]) {
            if (arr[7 * i + j + offset] !== ' ') {
              winner = arr[7 * i + j + offset];
              break outerLoop;
            } 
          }
        }
      }
      return winner;
    };

    // checks if there is a winner, if so adjusts the score and sets game over
    function checkSetWinner(arr) {
      let winner = ' ';
      let modes = ['row', 'column', 'down-d', 'up-d'];

      for (let i = 0; i < 4; i++) {
        winner = checkFour(arr, modes[i]);
        if (winner !== ' ') break;
      }
      
      if (winner !== ' ') {
        console.log('Winner!!!');
        (winner === 'o')
          ? setOScore(oScore + 1)
          : setXScore(xScore + 1);
        
        // update winner message
        setGameOver(true);
        setMsg('Winner: ' + winner.toUpperCase());
      }
    };
  };

  // funtion to reset game
  const resetGame = () => {
    setEntries(emptyArray42);
    setCount(0);
    setGameOver(false);
    // randomize who goes first LOL
    const firstTurn = (Math.random() >= 0.5);
    setCircleTurn(firstTurn);

    let newMsg = '';
    (firstTurn) 
      ? newMsg = 'game reset! O goes first'
      : newMsg = 'game reset! X goes first';
    
    setMsg(newMsg);
  };

  const resetMatch = () => {
    // reset game 
    resetGame();

    // also reset scores for new match
    setOScore(0);
    setXScore(0);
  }
  
  // *** BE CAREFUL OF USING USEEFFECT WITH NON-ASYNC EVENTS
  // YOU COULD END UP RE-RENDING PARTS OF THE PROGRAMMING THAT YOU DIDN'T KNOW YOU WERE RE-RENDERING
  // IF YOU CAN, UTILIZE CONDITIONS THAT CALL USESTATE INSTEAD ***

  return (
    <div>
      <div className="header">
        {/* <h2><span style={{color: 'red'}}>Tic</span> <span style={{color: 'blue'}}>Tac</span> <span style={{color: 'red'}}>Toe</span></h2> */}
        <h1>4-in-a-row</h1>
      </div>

      <div>
        <Row rowNum={0} handleClick={changeBoxState} gameOver={gameOver} states={entries.slice(0,7)}/>
        <Row rowNum={1} handleClick={changeBoxState} gameOver={gameOver} states={entries.slice(7,14)}/>
        <Row rowNum={2} handleClick={changeBoxState} gameOver={gameOver} states={entries.slice(14,21)}/>
        <Row rowNum={3} handleClick={changeBoxState} gameOver={gameOver} states={entries.slice(21,28)}/>
        <Row rowNum={4} handleClick={changeBoxState} gameOver={gameOver} states={entries.slice(28,35)}/>
        <Row rowNum={5} handleClick={changeBoxState} gameOver={gameOver} states={entries.slice(35,42)}/>
      </div>
      
      <div className="footer">
        <p style={{color: 'red'}}>O: {oScore}</p>
        <button className="reset" onClick={resetGame}>Next Game</button>
        <button className="reset" onClick={resetMatch}>New Match</button>
        <p style={{color: 'blue'}}>X: {xScore}</p>
      </div>

      <div>
        <h3 className="msg">{msg}</h3>
      </div>
    </div>
  );
};
  
export default Board;