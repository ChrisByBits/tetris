import './Stats.css'

const Stats = ({score, level, rows}) => {

  return (
    <div id="stats">
      <h2>SCORE: {score}</h2>
      <h2>LEVEL: {level}</h2>
      <h2>ROWS: {rows}</h2>
    </div>
  );
}

export default Stats;