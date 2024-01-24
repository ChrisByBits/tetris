import { useState } from 'react';

export const useMenu = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(true);

  return [isGameStarted, setIsGameStarted, isGamePaused, setIsGamePaused, isGameOver, setIsGameOver];
};