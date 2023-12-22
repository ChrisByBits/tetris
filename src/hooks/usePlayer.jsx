import { useCallback, useState } from 'react';
import { randFigure } from '../utils/figures';
import { checkCollision } from '../utils/collisions';
import { COLUMNS } from './useBoard';


export const usePlayer = (nextFigures) => {
  const [player, setPlayer] = useState( {
    shape: randFigure().shape,
    position: {x: 0, y: 0},
    collided: false
  });

  const respawn = useCallback(() => {
    setPlayer({
      shape: nextFigures[0].shape,
      position: {x: COLUMNS / 2 - 2, y: 0},
      collided: false
    })
}, [nextFigures]);

  const updatePosition = ({ posX, posY, collided}) => {
    setPlayer(prevState => ({
        ...prevState, //spread the previous state to use it
        position: {x: (prevState.position.x + posX), y: (prevState.position.y + posY)}, 
        collided
      }));
  };
  
  const rotateShape = (shape, side) => {
    const transposedMatrix = shape.map((cell, index) => shape.map(column => column[index]));
    if (side === 1 )  //right
      return transposedMatrix.map(row => row.reverse());
      /* Example: 
      
      [ 1, 2, 3 ]    [ 1, 4, 7 ]    [ 7, 4, 1 ]
      [ 4, 5, 6 ] => [ 2, 5, 8 ] => [ 8, 5, 2 ]
      [ 7, 8, 9 ]    [ 3, 6, 9 ]    [ 9, 6, 3 ] */

    else  // left 
      return transposedMatrix.reverse();
      /* Example: 
      
      [ 1, 2, 3 ]    [ 1, 4, 7 ]    [ 3, 6, 9 ]
      [ 4, 5, 6 ] => [ 2, 5, 8 ] => [ 2, 5, 8 ]
      [ 7, 8, 9 ]    [ 3, 6, 9 ]    [ 1, 4, 7 ] */
    
  }

  const rotate = (board, side) => {
    const auxPlayer = JSON.parse(JSON.stringify(player));

    auxPlayer.shape = rotateShape(auxPlayer.shape, side);

    const posX = auxPlayer.position.x;

    let offset = 1;

    while (checkCollision(auxPlayer, board, { posX: 0, posY: 0 })) {
      auxPlayer.position.x += offset;

      offset = -(offset + (offset > 0 ? 1 : -1));

      if (offset > auxPlayer.shape[0].length) {
        rotateShape(auxPlayer.shape, -side);
        auxPlayer.position.x = posX;
        return;
      }
      
    }

    setPlayer(auxPlayer);
  }

  return [player, respawn, updatePosition, rotate];
}