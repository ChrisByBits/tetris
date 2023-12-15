import React, { useState } from 'react';

import Board from './Board'

import { usePlayer } from '../hooks/usePlayer';
import { useBoard } from '../hooks/useBoard';

const Game = () => {
  const [player, reset] = usePlayer();
  const [board, setBoard] = useBoard(player, reset);
  const [gameOver, setGameOver] = useState(false);
  const [fallTime, setFallTime] = useState(null);

  return (
    <div>
      <Board board = {board}/>
    </div>
  );
}

export default Game