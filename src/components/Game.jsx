import React, { useState, useEffect, useCallback } from 'react';

import './Game.css'

import { checkCollision } from '../utils/collisions';

import Stats from './Stats';
import Board from './Board'
import NextFigures from './NextFigures'

import { usePlayer } from '../hooks/usePlayer';
import { createNewFiguresArray, useNextFigures } from '../hooks/useNextFigures';
import { createEmptyBoard, useBoard } from '../hooks/useBoard';
import { useInterval } from '../hooks/useInterval';
import { useStats } from '../hooks/useStats';

import music from '../audios/music.mp3'

const Game = () => {
  const [nextFigures, setNextFigures, updateNextFigures] = useNextFigures();
  const [player, resetPosition, updatePosition, rotate] = usePlayer(nextFigures); 
  const [rows, setRows, score, setScore, level, setLevel] = useStats();

  const calculateScore = useCallback((erasedRows) => {
    
    const points = [40, 100, 300, 1200];
    setRows(prevRows => prevRows + erasedRows);
    setScore(prevScore => prevScore + points[erasedRows - 1] * (level + 1));
    
  }, [level]);

  const [board, setBoard, erasedRows] = useBoard(player, resetPosition, updateNextFigures, calculateScore);

  const [gameOver, setGameOver] = useState(false);
  const [fallTime, setFallTime] = useState(null);

  const start = () => {
    setScore(0);
    setLevel(0);
    setRows(0);
    setGameOver(false);
    setNextFigures(createNewFiguresArray());
    setBoard(createEmptyBoard());
    resetPosition();
    setFallTime(1000);
  }

  const moveLat = (side) => {
    if (!checkCollision(player, board, { posX: side, posY: 0 }))
      updatePosition({ posX: side, posY: 0});
  }

  const fall = () => {
    if (rows > (level + 1) * 5) {
      setFallTime(1000 / (level + 1) * 200);
      setLevel(prevState => prevState + 1);
    }

    if (!checkCollision(player, board, { posX: 0, posY: 1 }))
      updatePosition({ posX: 0, posY: 1, collided: false });
    else {
      if (player.position.y === 0) 
        setGameOver(true);
      
      updatePosition({ posX: 0, posY: 0, collided: true });
    }
  }

  const hardFall = () => {
    let iterator = 0;
    while(!checkCollision(player, board, { posX: 0, posY: iterator }))
      iterator++;
    updatePosition({ posX: 0, posY: iterator - 1, collided: true });
    // since the collision is being detected in the current cell, it goes back one row
  }

  const moveDown = () => {
    setFallTime(null);
    fall();
  }

  useEffect(() => {
    const movePlayer = (event) => {
      switch (event.key.toLowerCase()) {
        case 'arrowleft': {
          moveLat(-1);
          break;
        }
        case 'arrowright': {
          moveLat(1);
          break;
        }
        case 'arrowdown': {
          moveDown();
          break;
        }
        case ' ': {
          hardFall();
          break;
        }
        case 'z': {
          rotate(board, 1);
          break;
        }
        case 'x': {
          rotate(board, -1);
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
  }, [moveLat, moveDown, hardFall, rotate] // the effect must be run again if these functions change, but with the player position updated
  );

  useEffect(() => {
    const reactivateInterval = (event) => {
      if (!gameOver) {
        if (event.key === 'ArrowDown') {
          setFallTime(1000 / (level + 1) + 200);
        }
      }
    }
    document.addEventListener('keyup', reactivateInterval);
    return () => {
      document.removeEventListener('keyup', reactivateInterval);
    };
  }, [setFallTime, level, gameOver])

  useInterval(() => {
    fall();
  }, fallTime);

  useEffect(() => {
    const audio = new Audio(music);
    audio.volume = 0.5;
    audio.play();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <div id ="game">
      <Stats score = {score} level = {level} rows = {rows} />
      <Board board = {board}/>
      <NextFigures figuresArray = {nextFigures}/>
    </div>
  );
}

export default Game