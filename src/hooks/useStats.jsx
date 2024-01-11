import { useState, useEffect, useCallback } from 'react';

export const useStats = () => {
  
  const [rows, setRows] = useState(0);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);

  return [rows, setRows, score, setScore, level, setLevel];
};