import './Block.css'

const Block = ({value}) => {
  const colors = {
    1: 'cyan',
    2: 'blue',
    3: 'orange',
    4: 'red',
    5: 'yellow',
    6: 'green',
    7: 'violet',
  };

  return (
    <div className= {`block ${colors[value]}`}>
    </div>
  )
}

export default Block