export const checkCollision = (player, board, { posX, posY }) => {
  console.log(posY);
  console.log(player);
  console.log(board);
  for (let y = 0; y < player.shape.length; y++) {
    for (let x = 0; x < player.shape[y].length; x++) {
      if (player.shape[y][x] !== 0) {
        const newY = y + player.position.y + posY;
        const newX = x + player.position.x + posX;

        if ( newY < 0 || newY >= board.length || newX < 0 || newX >= board[0].length )
          return true;

        if ( board[newY][newX].state !== 'erase' )
          return true;   
        
      }
    }
  }

  return false;
};