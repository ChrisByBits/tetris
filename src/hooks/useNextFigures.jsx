import { useState, useCallback } from "react";
import { randFigure } from "../utils/figures";

const pushNewFigure = (array) => {
  const lastFigure = array[array.length - 1];
  let newFigure;
  do {
    newFigure = randFigure();
  } while(lastFigure === newFigure);

  array.push(newFigure);
}

export const createNewFiguresArray = () => {
  const array = [];
  array.push(randFigure());
  for (let i = 0; i < 4; i++) {
    pushNewFigure(array);
  }
  return array;
}

export const useNextFigures = () => {
  const [nextFigures, setNextFigures] = useState(createNewFiguresArray());

  const updateNextFigures = useCallback(() => {
    setNextFigures(prevState => {
      const auxiliarArray = [...prevState];
      auxiliarArray.shift();
      pushNewFigure(auxiliarArray);
      return  auxiliarArray;
    })}, []);

  return [nextFigures, setNextFigures, updateNextFigures];
}