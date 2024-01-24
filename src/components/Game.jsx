import React, { useState, useEffect, useCallback } from 'react';

import './styles/Game.css'

import { checkCollision } from '../utils/collisions';

import Stats from './Stats';
import Board from './Board'
import NextFigures from './NextFigures'
import HeldFigure from './HeldFigure';
import Menu from './Menu';

import { usePlayer } from '../hooks/usePlayer';
import { createNewFiguresArray, useNextFigures } from '../hooks/useNextFigures';
import { createEmptyBoard, useBoard } from '../hooks/useBoard';
import { useInterval } from '../hooks/useInterval';
import { useStats } from '../hooks/useStats';
import { useHeldFigure } from '../hooks/useHeldFigure';
import { useMenu } from '../hooks/useMenu';

import music from '../audios/music.mp3'


const Game = () => {
  const [nextFigures, setNextFigures, updateNextFigures] = useNextFigures();
  const [player, setPlayer, resetPosition, updatePosition, rotate] = usePlayer(nextFigures); 
  const [rows, setRows, score, setScore, level, setLevel] = useStats();
  const [isGameStarted, setIsGameStarted, isGamePaused, setIsGamePaused, isGameOver, setIsGameOver] = useMenu();

  const calculateScore = useCallback((erasedRows) => {
    
    const points = [40, 100, 300, 1200];
    setRows(prevRows => prevRows + erasedRows);
    setScore(prevScore => prevScore + points[erasedRows - 1] * (level + 1));
    
  }, [level]);

  const [board, setBoard ] = useBoard(player, resetPosition, updateNextFigures, calculateScore);
  const [heldFigure, changeFigure] = useHeldFigure(player, setPlayer, nextFigures, updateNextFigures);

  const [fallTime, setFallTime] = useState(null);
  const [audio] = useState(new Audio(music));

  const [volume, setVolume] = useState(50);

  const playAudio = () => {
    audio.volume = volume / 100;
    audio.play();
  }

  const handleChangeVolume = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    audio.volume = newVolume / 100;
  };

  const start = () => {
    setScore(0);
    setLevel(0);
    setRows(0);
    setIsGameStarted(true);
    setIsGameOver(false);
    setNextFigures(createNewFiguresArray());
    setBoard(createEmptyBoard());
    resetPosition();
    setFallTime(1000);
    playAudio();
  }

  const moveLat = (side) => {
    if (!checkCollision(player, board, { posX: side, posY: 0 }))
      updatePosition({ posX: side, posY: 0});
  }

  const fall = () => {
    if (!isGameOver){
      if (rows > (level + 1) * 5) {
        setLevel(prevState => prevState + 1);
        setFallTime(1000 / (level + 1) * 200);
      }

      if (!checkCollision(player, board, { posX: 0, posY: 1 }))
        updatePosition({ posX: 0, posY: 1, collided: false });
      else {
        if (player.position.y <= 1) {

          setFallTime(0);
          setIsGameOver(true);
        }
        
        updatePosition({ posX: 0, posY: 0, collided: true });
      }
    }
  }

  const hardFall = () => {
    let iterator = 0;
    while(!checkCollision(player, board, { posX: 0, posY: iterator + 1 }))
      iterator++;
    updatePosition({ posX: 0, posY: iterator, collided: true });
    // since the collision is being detected in the current cell, it goes back one row
  }

  const moveDown = () => {
    setFallTime(null);
    fall();
  }


  useEffect(() => {
    if(!isGameOver) {
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
          case 'c': {
            changeFigure();
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
    }
  }, [moveLat, moveDown, hardFall, rotate, changeFigure, isGameOver] // the effect must be run again if these functions change, but with the player position updated
  );

  useEffect(() => {
    const reactivateInterval = (event) => {
      if (!isGameOver) {
        if (event.key === 'ArrowDown') {
          setFallTime(1000 / (level + 1));
        }
      }
    }
    document.addEventListener('keyup', reactivateInterval);
    return () => {
      document.removeEventListener('keyup', reactivateInterval);
    };
  }, [setFallTime, level, isGameOver])

  useInterval(() => {
    fall();
  }, fallTime);

  return (
    <div id ="game">
      {!isGameOver ? (
        <>
          <div id="left-side">
            <HeldFigure heldFigure = {heldFigure}/>
            <Stats score = {score} level = {level} rows = {rows} />
          </div>
          <Board board = {board} isGamePaused = {isGamePaused}/>
          <NextFigures figuresArray = {nextFigures}/>
        </>
      )
      :
      <Menu 
        isGameStarted={isGameStarted} 
        isGamePaused={isGamePaused} 
        isGameOver={isGameOver}
        start={start} 
        volume={volume} 
        handleChangeVolume={handleChangeVolume}
        score = {score} 
        level = {level} 
        rows = {rows}
      />
    }
    </div>
  );
}

export default React.memo(Game)