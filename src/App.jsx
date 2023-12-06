import { useState } from 'react'
import './App.css'
import Board from './Board.jsx'

const App = () => {
  const [pieceX, setPieceX] = useState(5);
  const [pieceY, setPieceY] = useState(5);

  return (
    <div id="app">
      <Board />
    </div>
  )
};

export default App
