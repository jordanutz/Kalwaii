import React, {Component} from 'react'
import './Diary.scss'
import axios from 'axios'

import Summary from '../Summary/Summary'
import MealLog from '../MealLog/MealLog'
import Details from '../Details/Details'

import {connect} from 'react-redux'

import Snack from './assets/snack.svg'
import Breakfast from './assets/breakfast.svg'
import Lunch from './assets/lunch.svg'
import Dinner from './assets/dinner.svg'
import Add from './assets/add.svg'

import Calendar from 'react-calendar'
import CalendarIcon from './assets/calendar.svg'

class Diary extends Component {
  constructor () {
    super()
    this.state = {
      nutrition: {},
      date: new Date(),
      toggleCalendar: false
    }
  }

  componentDidMount() {
    this.getCaloricExpenditure()
  }

  handleDate = (date) => {
    // var curr_date = date.getDate();
    // var curr_month = date.getMonth() + 1; //Months are zero based
    // var curr_year = date.getFullYear()
    this.setState({
      date: date,
      toggleCalendar: false
    })
  }

  getCaloricExpenditure = () => {
    axios.get(`/api/user/summary/${this.props.profile[0].user_id}`).then(res => {
      this.setState({
        nutrition: res.data
      })
    })
  }

  toggleCalendar = () => {
    this.setState({
      toggleCalendar: !this.state.toggleCalendar
    })
  }


  render () {

    console.log(this.state.date)

    const curr_date = this.state.date.getDate();
    const curr_month = this.state.date.getMonth() + 1; //Months are zero based
    const curr_year = this.state.date.getFullYear()
    const displayDate = curr_month + "/" + curr_date + "/" + curr_year
    const displayCalendar = this.state.toggleCalendar &&
      <div className="Calendar">
        <Calendar
        onChange={this.handleDate}
        value={this.state.date}
        prev2Label={false}
        prev2Label={false}
        next2Label={false}
        />
      </div>
    // <Summary />
    // <MealLog />
    // <Details />

    return (
      <main>
        <div className="DiaryHealth">
          <div className="DiaryCalories">
            <h1>{this.state.nutrition.calories}</h1>
          </div>
        </div>
        <div className="DiaryUser">
          <div className="UserInformation">
            <img src={this.props.profile[0].photo} />
            <h1> Welcome back, {this.props.profile[0].username}!</h1>
              <div className="DiaryCalendar">
                <img src={CalendarIcon} />
                <h2 onClick={this.toggleCalendar}>{displayDate}</h2>
              </div>
              {displayCalendar}
              <div className="DiaryMacronutrients">
                <div className="Macronutrient">
                  <h3>Carbohydrates</h3>
                  <h4>{this.state.nutrition.carbohydratesMin}g - {this.state.nutrition.carbohydratesMax}g</h4>
                </div>
                <div className="Macronutrient">
                  <h3>Fat</h3>
                  <h4>{this.state.nutrition.fatMin}g - {this.state.nutrition.fatMax}g</h4>
                </div>
                <div className="Macronutrient">
                  <h3>Protein</h3>
                  <h4>{this.state.nutrition.proteinMin}g - {this.state.nutrition.proteinMax}g</h4>
                </div>
              </div>
          </div>
          <div className="DiaryMealLog">
            <div className="MealLog">
              <div className="MealLogImage">
                <img src={Breakfast} />
              </div>
              <div className="MealLogDetails">
                <h2> Add Breakfast</h2>
                <h3>Recommended Calories:</h3>
              </div>
              <img id="Add" src={Add} />
            </div>
            <div className="MealLog">
              <div className="MealLogImage">
                <img src={Lunch} />
              </div>
              <div className="MealLogDetails">
                <h2>Add Lunch</h2>
                <h3>Recommended Calories:</h3>
              </div>
              <img id="Add" src={Add} />
            </div>
            <div className="MealLog">
              <div className="MealLogImage">
                <img src={Dinner} />
              </div>
              <div className="MealLogDetails">
                <h2>Add Dinner</h2>
                <h3>Recommended Calories:</h3>
              </div>
              <img id="Add" src={Add} />
            </div>
            <div className="MealLog">
              <div className="MealLogImage">
                <img src={Snack} />
              </div>
              <div className="MealLogDetails">
                <h2>Add Snack</h2>
                <h3>Recommended Calories:</h3>
              </div>
              <img id="Add" src={Add} />
            </div>
          </div>
        </div>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps)(Diary)
