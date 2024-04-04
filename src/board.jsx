import React, {useState, useEffect} from 'react';
import Row from './row.jsx';

const Board = (props) => {
  // states for each of our boxes
  const emptyArray42 = new Array(42).fill(' ');
  const [entries, setEntries] = useState(emptyArray42);
  // console.log(entries);
  const [circleTurn, setCircleTurn] = useState(true);
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState('Good Luck! O goes first');
  const [oScore, setOScore] = useState(0);
  const [xScore, setXScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  // can't do below, even if we don't plan any re-rending with circleTurn
  // any dynamic state change must use hooks
  // let circleTurn = true;

  // function to change box states
  const changeBoxState = (rowNum, boxNum) => {
    // find correct index to change
    let bottomRowNum = 5;
    while (entries[(7 * bottomRowNum) + boxNum] !== ' ') {
      bottomRowNum--;
      // if the column is full, do not change the state
      if (bottomRowNum === -1) return;
    }

    const stateIdx = (7 * bottomRowNum) + boxNum;

    // console.log('changing box between o and x', stateIdx);
    // console.log('entries[stateIdx]: ', entries[stateIdx]);

    // change specific box depending on whos turn it is
    setCount(count+1);
    console.log('count: 37' + count);

    let newArr;
    (circleTurn) 
      ? newArr = entries.toSpliced(stateIdx, 1, 'o') 
      : newArr = entries.toSpliced(stateIdx, 1, 'x');

    // set the change
    setEntries(newArr);
    console.log('entries[stateIdx] line 46: ', entries[stateIdx]);

    // change turns
    setCircleTurn(!circleTurn);

    // Tests if there is 4 in a row
    let winner = ' ';

    // rows
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          'o' === newArr[7 * i + j] && 
          newArr[7 * i + j] === newArr[7 * i + j + 1] &&
          newArr[7 * i + j + 1] === newArr[7 * i + j + 2] &&
          newArr[7 * i + j + 2] === newArr[7 * i + j + 3]) {
          winner = 'o';
        } else if (
          'x' === newArr[7 * i + j] &&
          newArr[7 * i + j] === newArr[7 * i + j + 1] &&
          newArr[7 * i + j + 1] === newArr[7 * i + j + 2] &&
          newArr[7 * i + j + 2] === newArr[7 * i + j + 3]) {
          winner = 'x';
        }
      }
    }

    // colums
    for (let j = 0; j < 7; j++) {
      for (let i = 0; i < 3; i++) {
        if (
          'o' === newArr[7 * i + j] && 
          newArr[7 * i + j] === newArr[7 * i + j + 7] &&
          newArr[7 * i + j + 7] === newArr[7 * i + j + 14] &&
          newArr[7 * i + j + 14] === newArr[7 * i + j + 21]) {
          winner = 'o';
        } else if (
          'x' === newArr[7 * i + j] && 
          newArr[7 * i + j] === newArr[7 * i + j + 7] &&
          newArr[7 * i + j + 7] === newArr[7 * i + j + 14] &&
          newArr[7 * i + j + 14] === newArr[7 * i + j + 21]) {
          winner = 'x';
        }
      }
    }

    // down-diagonals
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          'o' === newArr[7 * i + j] && 
          newArr[7 * i + j] === newArr[7 * i + j + 8] &&
          newArr[7 * i + j + 8] === newArr[7 * i + j + 16] &&
          newArr[7 * i + j + 16] === newArr[7 * i + j + 24]) {
          winner = 'o';
        } else if (
          'x' === newArr[7 * i + j] &&
          newArr[7 * i + j] === newArr[7 * i + j + 8] &&
          newArr[7 * i + j + 8] === newArr[7 * i + j + 16] &&
          newArr[7 * i + j + 16] === newArr[7 * i + j + 24]) {
          winner = 'x';
        }
      }
    }

    // up-diagonals
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          'o' === newArr[7 * i + j + 21] && 
          newArr[7 * i + j + 21] === newArr[7 * i + j + 15] &&
          newArr[7 * i + j + 15] === newArr[7 * i + j + 9] &&
          newArr[7 * i + j + 9] === newArr[7 * i + j + 3]) {
          winner = 'o';
        } else if (
          'x' === newArr[7 * i + j + 21] && 
          newArr[7 * i + j + 21] === newArr[7 * i + j + 15] &&
          newArr[7 * i + j + 15] === newArr[7 * i + j + 9] &&
          newArr[7 * i + j + 9] === newArr[7 * i + j + 3]) {
          winner = 'x';
        }
      }
    }
    


    

    if (winner !== ' ') {
      console.log('Winner!!!');
      (winner === 'o')
        ? setOScore(oScore + 1)
        : setXScore(xScore + 1);
      
      // update winner message
      setGameOver(true);
      setMsg('Winner: ' + winner);
    }


    
    // const winArr = [];
    // // rows
    // winArr.push([(newArr[0] === newArr[1] && newArr[1] === newArr[2]), newArr[0]]);
    // winArr.push([(newArr[3] === newArr[4] && newArr[4] === newArr[5]), newArr[3]]);
    // winArr.push([(newArr[6] === newArr[7] && newArr[7] === newArr[8]), newArr[6]]);
    // // cols
    // winArr.push([(newArr[0] === newArr[3] && newArr[3] === newArr[6]), newArr[0]]);
    // winArr.push([(newArr[1] === newArr[4] && newArr[4] === newArr[7]), newArr[1]]);
    // winArr.push([(newArr[2] === newArr[5] && newArr[5] === newArr[8]), newArr[2]]);
    // // diags
    // winArr.push([(newArr[0] === newArr[4] && newArr[4] === newArr[8]), newArr[0]]);
    // winArr.push([(newArr[2] === newArr[4] && newArr[4] === newArr[6]), newArr[6]]);


    // for (let i = 0; i < winArr.length; i++) {
    //   // is it true? if false, then skip below
    //   if (winArr[i][0] && winArr[i][1] !== '') {
        
    //     // increment winner's score
    //     (winArr[i][1] === 'o')
    //       ? setOScore(oScore + 1)
    //       : setXScore(xScore + 1);

    //     // update winner message
    //     // setGameOver(true);
    //     // setMsg('Winner: ' + winArr[i][1]);

    //   }
    // }

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
  
  // winner detection
  // all 3 values in row are same
  // all 3 values in column are same
  // diagonals
  // consider useEffect 
  // *** BE CAREFUL OF USING USEEFFECT WITH NON-ASYNC EVENTS
  // YOU COULD END UP RE-RENDING PARTS OF THE PROGRAMMING THAT YOU DIDN'T KNOW YOU WERE RE-RENDERING
  // IF YOU CAN, UTILIZE CONDITIONS THAT CALL USESTATE INSTEAD ***

  return (
    <div>
      <div className="header">
        {/* <h2><span style={{color: 'red'}}>Tic</span> <span style={{color: 'blue'}}>Tac</span> <span style={{color: 'red'}}>Toe</span></h2> */}
        <h2>4 in a row</h2>
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