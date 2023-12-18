import './Block.css'

import { figures } from '../utils/figures';

const Block = ({id, value}) => {
  return (
    <div id={id} className= {`block ${figures[value].color}`} />
  )
}

export default Block