import React, { useState, useEffect } from 'react';

import Board from './Board'

import { usePlayer } from '../hooks/usePlayer';
import { createEmptyBoard, useBoard } from '../hooks/useBoard';

const Game = () => {
  const [player, reset, updatePosition] = usePlayer();
  const [board, setBoard] = useBoard(player, reset);
  const [gameOver, setGameOver] = useState(false);
  const [fallTime, setFallTime] = useState(null);

  console.log(board)

  const start = () => {
    setBoard(createEmptyBoard());
    reset();
  }

  const moveLat = (side) => {
    updatePosition({ posX: side, posY: 0, collided: false });
  }

  const fall = () => {
    updatePosition({ posX: 0, posY: 1 });
  }

  useEffect(() => {
    const movePlayer = (event) => {
      switch (event.key) {
        case 'ArrowLeft': {
          moveLat(-1);
          break;
        }
        case 'ArrowRight': {
          moveLat(1);
          break;
        }
        case 'ArrowDown': {
          fall();
          break;
        }
        default:
          break;
      }
    };

    document.addEventListener('keydown', movePlayer);
    return () => {
      document.removeEventListener('keydown', movePlayer);
    };
  }, []);

  return (
    <div>
      <Board board = {board}/>
    </div>
  );
}

export default Game