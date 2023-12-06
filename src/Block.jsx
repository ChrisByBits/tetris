import './Block.css'

const Block = ({value}) => {
  const colors = {
    0: 'none',
    1: 'cyan',
    2: 'blue',
    3: 'orange',
    4: 'red',
    5: 'yellow',
    6: 'green',
    7: 'violet',
  };

  return (
    <div className= {`block ${colors[value]}`} />
  )
}

export default Block