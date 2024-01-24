import './styles/HeldFigure.css'

import Block from './Block';

const HeldFigure = ({heldFigure}) => {
  return (
    <div id="held-figure">
      <h2>HELD: </h2>
      <div id="figure">
        {heldFigure.map((row, rowIndex) => (
            // checks if at least one element in the row is non-zero
            row.some(cell => cell !== 0) ? (
              <div id={"hd-row: " + rowIndex} key={"hd-row: " + rowIndex} className="row">
                {row.map((cell, columnIndex) => (
                  <Block key={columnIndex} id={"hd-row: " + rowIndex + '-' + columnIndex} value={cell} />
                ))}
              </div>
            ) : null 
          ))}
      </div>
    </div>
  )
}

export default HeldFigure