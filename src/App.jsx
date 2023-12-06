import { useState } from 'react'
import './App.css'
import Board from './Board.jsx'

const App = () => {
  const [time, setTime] = useState(1500);

  return (
    <div id="app">
      <Board time = {time}/>
    </div>
  )
};

export default App
