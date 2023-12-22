import React from 'react';
import './Board.css';
import Block from './Block';

const Board = ({ board }) => {
  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div id={rowIndex} key={rowIndex} className="board-row">
        {row.map((cell, columnIndex) => (
          <Block key={columnIndex} id = {rowIndex + '-' +columnIndex} value={cell.value} />
        ))}
      </div>
    ));
  };

  return (
    <div id="board">
      {renderBoard()}
    </div>
  );
};

export default Board