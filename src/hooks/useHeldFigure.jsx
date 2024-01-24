import { useState } from 'react';


export const useHeldFigure = (player, setPlayer, nextFigures, updateNextFigures) => {
  const [heldFigure, setHeldFigure] = useState([]);

  const changeFigure = () => {

    if (heldFigure.length === 0) {
      setHeldFigure(player.shape);
      setPlayer(prevState => ({ ...prevState, shape: nextFigures[0].shape }))
      updateNextFigures()
    } 
    else {
      const tempFigure = player.shape;
      setPlayer(prevState => ({ ...prevState, shape: heldFigure }));
      setHeldFigure(tempFigure);
    }
  };
  return [ heldFigure, changeFigure ];
};