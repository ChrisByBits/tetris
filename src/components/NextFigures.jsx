import './styles/NextFigures.css'

import Block from './Block';

const NextFigures = ({figuresArray}) => {

  const renderArray = () => {
    return figuresArray.map((figure, figureIndex) => (
      <div id={"next-figure: " + figureIndex} key={figureIndex} className="figure">
        {figure.shape.map((row, rowIndex) => (
          // checks if at least one element in the row is non-zero
          row.some(cell => cell !== 0) ? (
            <div id={"next-figure: " + figureIndex + ", row: " + rowIndex} key={figureIndex + '-' + rowIndex} className="row">
              {row.map((cell, columnIndex) => (
                <Block key={columnIndex} id={"nf" + figureIndex + '-' + rowIndex + '-' + columnIndex} value={cell} />
              ))}
            </div>
          ) : null 
        ))}
      </div>
    ));
  };

  return (
    <div id="next-figures">
      <h2>NEXT: </h2>
      <div id="figures">
        {renderArray()}
      </div>
      
    </div>
  );
}

export default NextFigures;