import './Block.css'

import { figures } from '../figures';

const Block = ({id, value}) => {
  return (
    <div id={id} className= {`block ${figures[value].color}`} />
  )
}

export default Block