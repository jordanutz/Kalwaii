import React, {Component} from 'react'
import './Diary.scss'

import Summary from '../Summary/Summary'
import MealLog from '../MealLog/MealLog'
import Details from '../Details/Details'

class Diary extends Component {
  render () {
    return (
      <div className="Diary">
        <Summary />
        <MealLog />
        <Details />
      </div>
    )
  }
}

export default Diary
