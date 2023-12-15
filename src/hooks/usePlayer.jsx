import { useCallback, useState } from 'react';
import { randFigure } from '../figures';
import { COLUMNS } from './useBoard';


export const usePlayer = () => {
  const [player, setPlayer] = useState( {
    shape: randFigure().shape,
    position: {x: 0, y: 0},
    collided: false
  });

  const respawn = useCallback(() => {
    setPlayer({
      shape: randFigure().shape,
      position: {x: COLUMNS / 2 - 2, y: 0},
      collided: false
    })}, [])

  const updatePosition = ({ posX, posY, collided}) => {
    setPlayer(prevState => ({
        ...prevState, //spread the previous state to use it
        position: {x: (prevState.position.x + posX), y: (prevState.position.y + posY)}, 
        collided
      }));
  };


  return [player, respawn, updatePosition];
}