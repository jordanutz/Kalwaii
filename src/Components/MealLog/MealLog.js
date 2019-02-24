import React, {Component} from 'react'
import './MealLog.scss'

import Snack from './assets/snack.svg'
import Breakfast from './assets/breakfast.svg'
import Lunch from './assets/lunch.svg'
import Dinner from './assets/dinner.svg'
import Add from './assets/add.svg'

import {Link} from 'react-router-dom'
import axios from 'axios'

import {connect} from 'react-redux'

class MealLog extends Component {
  constructor () {
    super()
    this.state = {
      mealLog: []
    }
  }

  componentDidMount() {
    this.getMealLogs()
    window.scrollTo(0, 0)
  }

  getMealLogs = () => {
    axios.get('/api/meal-logs').then(res => {
      this.setState({
        mealLog: res.data
      })
    })
  }

  render () {

    const {mealLog} = this.state

    const displayMealLog = mealLog.map(log => {

    const breakfastIcon = log.meal === 'Breakfast' && <img src={Breakfast} alt="Breakfast"/>
    const lunchIcon = log.meal === 'Lunch' && <img src={Lunch} alt="Lunch" />
    const dinnerIcon = log.meal === 'Dinner' && <img src={Dinner} alt="Dinner"/>
    const snackIcon = log.meal === 'Snack' && <img src={Snack} alt="Snack" />
    const recommendedBreakfast = log.meal === 'Breakfast' ? Math.round((this.props.nutrition.calories * 0.25)) + ' - ' + Math.round((this.props.nutrition.calories * 0.35)) : null
    const recommendedLunch = log.meal === 'Lunch' ? Math.round((this.props.nutrition.calories * 0.30)) + ' - ' + Math.round((this.props.nutrition.calories * 0.40)) : null
    const recommendedDinner = log.meal === 'Dinner' ? Math.round((this.props.nutrition.calories * 0.40)) + ' - ' + Math.round((this.props.nutrition.calories * 0.50)) : null
    const recommendedSnack = log.meal === 'Snack' ? Math.round((this.props.nutrition.calories * 0.05)) : null

        return (
          <div className="IndividualMealLog" key={log.id}>
            <div className="MealLogImage">
              {breakfastIcon}
              {lunchIcon}
              {dinnerIcon}
              {snackIcon}
            </div>
            <div className="MealLogDetails">
              <h2>Add {log.meal}</h2>
              <h3>Recommended Calories: {recommendedBreakfast} {recommendedLunch} {recommendedDinner} {recommendedSnack}</h3>
            </div>
            <Link to={{
                pathname: `/profile/${this.props.profile[0].user_id}/foodlog/${log.id}`,
                state: {
                  date: this.props.date,
                  displayDate: this.props.displayDate,
                  breakfastCalories: recommendedBreakfast,
                  lunchCalories: recommendedLunch,
                  dinnerCalories: recommendedDinner,
                  snackCalories: recommendedSnack
                }
              }}><img id="Add" src={Add} alt="Add Food"/></Link>
          </div>
        )
      })

    return (
      <div className="MealLog">
        <h1>Total Calories: {this.props.totalCalories}</h1>
        {displayMealLog}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps)(MealLog)
