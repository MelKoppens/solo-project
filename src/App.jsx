import React from 'react';
import Board from './board.jsx'; // added

export function App() {
  // return (
  //   <div>
  //     <h1>Welcome { new Date().toDateString() }</h1>

  //   </div>
  // );
  return (
    <div>
      <div className="board">
        <Board />
      </div>
    </div>
  );
}

