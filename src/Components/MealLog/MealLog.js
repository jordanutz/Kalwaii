import React, {Component} from 'react'
import './MealLog.scss'

import Calendar from '../Calendar/Calendar'
import DailyMeal from '../DailyMeal/DailyMeal'


class MealLog extends Component {
  render () {
    return (
      <div className="MealLog">
        <Calendar />
        <DailyMeal />
      </div>
    )
  }
}

export default MealLog
