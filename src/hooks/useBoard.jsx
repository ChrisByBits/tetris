import {useState, useEffect} from 'react';

export const ROWS = 21;
export const COLUMNS = 10;

export const createEmptyBoard = () => {
  return Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0).map(() => ({value: 0, state: 'erase'})));
};

export const useBoard = (player, respawn) => {
  const [board, setBoard] = useState(createEmptyBoard());

  useEffect(() => {
    const update = (prevState) => {
      const newState = prevState.map(row => row.map(cell => (cell.state === 'erase' ? {value: 0, state: 'erase'}: cell)));
      
      player.shape.forEach((row, rowIndex) => {
        row.forEach((cellValue, cellIndex) => {
          if (cellValue !== 0){
            newState[rowIndex + player.position.y][cellIndex + player.position.x] = {value: cellValue, state: 'erase'};
          }
        })
      })

      return newState;
    };
    
    setBoard((prevState) => update(prevState));

  }, [player.position.x, player.position.y, player.shape, player.collided]);

  return [board, setBoard];
}