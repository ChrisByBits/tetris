export const figures = {
  0: {
    color: 'none', 
    shape : [[0]]
  },
  1: {
    color: 'cyan', 
    shape: [[0, 0, 0, 0], 
            [1, 1, 1, 1], 
            [0, 0, 0, 0], 
            [0, 0, 0, 0]]
  },
  2: {
    color: 'blue',
    shape: [[0, 0, 0],
            [2, 0, 0],
            [2, 2, 2]]
  },
  3: {
    color: 'orange',
    shape: [[0, 0, 0],
            [0, 0, 3], 
            [3, 3, 3]] 
  },
  4: {
    color: 'red',
    shape: [[4, 4], 
            [4, 4]]
  },
  5: {
    color: 'yellow',
    shape: [[0, 5, 5],
            [5, 5, 0], 
            [0, 0, 0]]
  },
  6: {
    color: 'green',
    shape: [[0, 0, 0], 
            [6, 6, 6], 
            [0, 6, 0]]
  },
  7: {
    color: 'violet',
    shape: [[7, 7, 0], 
            [0, 7, 7],
            [0, 0, 0]]
  }
};

export const randFigure = () => {
   return figures[Math.floor(Math.random() * (Object.keys(figures).length - 1)  + 1)]
}