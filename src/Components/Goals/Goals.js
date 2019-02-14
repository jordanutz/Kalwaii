import React, {Component} from 'react'
import './Goals.scss'

import WeightDisplay from '../WeightDisplay/WeightDisplay'
import WeightUpdate from '../WeightUpdate/WeightUpdate'

class Goals extends Component {
  render () {
    return (
      <div className="Goals">
        <WeightDisplay />
        <WeightUpdate />
      </div>
    )
  }
}

export default Goals
