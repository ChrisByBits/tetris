import './Board.css'
import Block from './Block.jsx'

const ROWS  = 21;
const COLUMNS = 10;
const board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0).map(() => 0));


const Board = () => {
  return (
    <div id="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, columnIndex) => (
            <Block key={columnIndex} value={cell}/>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;