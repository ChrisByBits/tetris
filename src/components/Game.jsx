import React, { useState, useEffect } from 'react';
import { checkCollision } from '../utils/collisions';
import Board from './Board'

import { usePlayer } from '../hooks/usePlayer';
import { createEmptyBoard, useBoard } from '../hooks/useBoard';

const Game = () => {
  const [player, resetPosition, updatePosition] = usePlayer();
  const [board, setBoard] = useBoard(player, resetPosition);
  const [gameOver, setGameOver] = useState(false);
  const [fallTime, setFallTime] = useState(null);

  const start = () => {
    setGameOver(false);
    setBoard(createEmptyBoard());
    resetPosition();
  }

  const moveLat = (side) => {
    if (!checkCollision(player, board, { posX: side, posY: 0 }))
      updatePosition({ posX: side, posY: 0});
  }

  const moveDown = () => {
    if (!checkCollision(player, board, { posX: 0, posY: 1 }))
      updatePosition({ posX: 0, posY: 1, collided: false });
    else {
      if (player.position.y === 0) 
        setGameOver(true);
      
      updatePosition({ posX: 0, posY: 0, collided: true });
    }
  }

  const fall = () => {
    moveDown()
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
          moveDown();
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
  }, [moveLat, moveDown] // the effect must be run again if these functions change, but with the player position updated
  );

  return (
    <div>
      <Board board = {board}/>
    </div>
  );
}

export default Game