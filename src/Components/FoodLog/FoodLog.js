import React, {Component} from 'react'
import './FoodLog.scss'

import Food from './Food/Food'

class FoodLog extends Component {
  render () {
    return (
      <div className="FoodLog">
        <Food />
      </div>
    )
  }
}

export default FoodLog
