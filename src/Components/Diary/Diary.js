import React, {Component} from 'react'
import './Diary.scss'
import axios from 'axios'

// Child Components
import Summary from '../Summary/Summary'
import MealLog from '../MealLog/MealLog'
import Details from '../Details/Details'

// Redux
import {connect} from 'react-redux'

// React-Calendar
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

    const curr_date = this.state.date.getDate()
    const curr_month = this.state.date.getMonth() + 1
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

    return (
      <main>
        <div className="DiaryHealth">
          <div className="DiaryCalories">
            <h1>{this.state.nutrition.calories}</h1>
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
        </div>
        <div className="DiaryUser">
          <div className="UserInformation">
            <img id="border" src={this.props.profile[0].photo} />
            <h1> Welcome back, {this.props.profile[0].username}!</h1>
              <div className="DiaryCalendar">
                <img src={CalendarIcon} />
                <h2 onClick={this.toggleCalendar}>{displayDate}</h2>
              </div>
              {displayCalendar}
          </div>
          <div className="DiaryMealLog">
            <MealLog date={this.state.date}/>
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
