import React from 'react';
import './styles/Board.css';
import Block from './Block';

const Board = ({ board, isGamePaused }) => {
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
      <div id="difuser" style = {{display: `${!isGamePaused ? 'none': 'block'}`}}/>
    </div>
  );
};

export default Board