import {useState, useEffect} from 'react';

export const ROWS = 21;
export const COLUMNS = 10;

export const createEmptyBoard = () => {
  return Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0).map(() => ({value: 0, state: 'erase'})));
};

export const useBoard = (player, respawn, updateNextFigures) => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [erasedRows, setErasedRows] = useState(0);

  useEffect(() => {

    setErasedRows(0);

    const eraseRows = (newBoard) => {
      return newBoard.reduce((accumulator, row) => {
        if (row.every(cell => cell.value !== 0)) {
          setErasedRows(prev => prev + 1);
          accumulator.unshift(new Array(COLUMNS).fill(0).map(() => ({value: 0, state: 'erase'})));
          return accumulator;
        }
        accumulator.push(row);
        return accumulator;
      }, []);
    };

    const update = (prevState) => {
      const newState = prevState.map(row => row.map(cell => (cell.state === 'erase' ? {value: 0, state: 'erase'}: cell)));

      player.shape.forEach((row, rowIndex) => {
        row.forEach((cellValue, cellIndex) => {
          if (cellValue !== 0){
            newState[rowIndex + player.position.y][cellIndex + player.position.x] = {value: cellValue, state: `${player.collided ? 'merged' : 'erase'}`};
          }
        })
      });

      if (player.collided) {
        updateNextFigures();
        respawn();
        return eraseRows(newState);
      }

      return newState;
    };
    
    setBoard((prevState) => update(prevState));

  }, [player.collided, player.position.x, player.position.y, player.shape, respawn, updateNextFigures]);

  return [board, setBoard];
}