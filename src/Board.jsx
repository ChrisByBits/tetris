import React, { useState, useEffect } from 'react';
import './Board.css';
import Block from './Block';

const ROWS = 21;
const COLUMNS = 10;

const createEmptyBoard = () => {
  return Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0).map(() => 0));
};

const initialPlayerPosition = { row: 0, column: 4 };


const Board = ({time}) => {
  const [board, setBoard] = useState(createEmptyBoard());

  const [playerPosition, setPlayerPosition] = useState(initialPlayerPosition);

  // Example
  const playerBlock = [
    [1, 1],
    [1, 1],
  ];

  const updateBoard = () => {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((row) => row.slice());

      for (let i = 0; i < playerBlock.length; i++) {
        for (let j = 0; j < playerBlock[0].length; j++) {
          const prevRow = playerPosition.row + i - 1;
          const prevColumn = playerPosition.column + j;

          if (prevRow >= 0 && prevRow < ROWS && prevColumn >= 0 && prevColumn < COLUMNS)
            newBoard[prevRow][prevColumn] = 0;
        }
      }

      for (let i = 0; i < playerBlock.length; i++) {
        for (let j = 0; j < playerBlock[0].length; j++) {
          const newRow = playerPosition.row + i;
          const newColumn = playerPosition.column + j;

          if (newRow >= 0 && newRow < ROWS && newColumn >= 0 && newColumn < COLUMNS) {
            newBoard[newRow][newColumn] = playerBlock[i][j];
          }
        }
      }

      return newBoard;
    });
  };

  const movePlayer = (direction) => {
    const newPlayerPosition = { ...playerPosition };

    switch (direction) {
      // Using Math.max/Math.min prevents the block from going out of bounds
      case 'left':
        newPlayerPosition.column = Math.max(0, newPlayerPosition.column - 1);
        break;
      case 'right':
        newPlayerPosition.column = Math.min(COLUMNS - playerBlock[0].length, newPlayerPosition.column + 1); 
        break;
      case 'down':
        newPlayerPosition.row = Math.min(ROWS - playerBlock.length, newPlayerPosition.row + 1);
        break;
      default:
        break;
    }

    setPlayerPosition(newPlayerPosition);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      movePlayer('down');
      updateBoard();
    }, time);

    return () => clearInterval(intervalId);
  }, [playerPosition]);


  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="board-row">
        {row.map((cell, columnIndex) => (
          <Block key={columnIndex} value={cell} />
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

export default Board;