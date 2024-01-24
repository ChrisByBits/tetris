import { useCallback } from 'react'
import './styles/Menu.css'



const Menu = ({isGameStarted, isGamePaused, isGameOver, start, volume, handleChangeVolume, score, level, rows}) => {
  const StartGame = () => {
    return (
    <div id="menu-container">
      <h1>TETRIS</h1>
      <button onClick={start}>START GAME</button>
      <label htmlFor="range">MUSIC VOLUME: {Math.round(volume)}%</label>
      <input type="range" 
        id="range" 
        min="1"
        max="100"
        value={volume}
        onChange={handleChangeVolume}></input>
    </div>
    )
  }
  const TryAgain = () => {
    return (
      <div id="menu-container">
        <h1>GAME OVER</h1>
        <div id="final-stats">
          <p>SCORE: {score}</p>
          <p>LEVEL: {level}</p>
          <p>ROWS: {rows}</p>
        </div>
        <button onClick={start}>TRY AGAIN</button>
      </div>
      )
  }

  const renderMenu = useCallback(() => {
    if (isGameOver) {
      if (!isGameStarted) {
        return ( <StartGame />)
      }
      else {
        return (<TryAgain />)
      }
    }
    else {
      return (<div>GAME PAUSED</div>)
    }
  }, [isGameOver, isGameStarted, isGamePaused, start, volume, handleChangeVolume]);


  return (
    <div id="menu">
      {renderMenu()}
    </div>
  );
}

export default Menu;