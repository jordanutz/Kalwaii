import React, {Component} from 'react'
import './Summary.scss'

import Macronutrients from '../Macronutrients/Macronutrients'
import CaloricIntake from '../CaloricIntake/CaloricIntake'

class Summary extends Component {
  render () {
    return (
      <div className="Summary">
        <Macronutrients />
        <CaloricIntake />
      </div>
    )
  }
}

export default Summary
