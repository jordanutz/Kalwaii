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

    // console.log(this.state)

      const {mealLog} = this.state

      const displayMealLog = mealLog.map(log => {

      const BreakfastIcon = log.meal === 'Breakfast' && <img src={Breakfast} alt="Breakfast"/>
    const LunchIcon = log.meal === 'Lunch' && <img src={Lunch} alt="Lunch" />
  const DinnerIcon = log.meal === 'Dinner' && <img src={Dinner} alt="Dinner"/>
const SnackIcon = log.meal === 'Snack' && <img src={Snack} alt="Snack" />

      return (
        <div className="IndividualMealLog" key={log.id}>
          <div className="MealLogImage">
            {BreakfastIcon}
            {LunchIcon}
            {DinnerIcon}
            {SnackIcon}
          </div>
          <div className="MealLogDetails">
            <h2>Add {log.meal}</h2>
            <h3>Recommended Calories:</h3>
          </div>
          <Link to={{
              pathname: `/profile/${this.props.profile[0].user_id}/foodlog/${log.id}`,
              state: {
                date: this.props.date,
                displayDate: this.props.displayDate
              }
            }}><img id="Add" src={Add} alt="Add Food"/></Link>
        </div>
      )
    })

    return (
      <div className="MealLog">
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
