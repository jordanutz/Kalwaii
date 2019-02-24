import React, {Component} from 'react'
import './Diary.scss'
import axios from 'axios'

// Child Components
import MealLog from '../MealLog/MealLog'

// Redux
import {connect} from 'react-redux'
import {getProfile} from '../../redux/reducer'

// React-Calendar
import Calendar from 'react-calendar'
import CalendarIcon from './assets/calendar.svg'

class Diary extends Component {
  constructor () {
    super()
    this.state = {
      nutrition: {},
      date: new Date(),
      toggleCalendar: false,
      toggleGoal: false,
      totalCalories: null
    }
  }

  componentDidUpdate (prevState, prevProps) {
    if (prevProps.date !== this.state.date)
      this.getTotalCalories()
  }

  componentDidMount () {
    this.getCaloricExpenditure()
    this.getTotalCalories()
    window.scrollTo(0, 0)
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

  getTotalCalories = () => {

    const day = this.state.date.getDate()
    const month = this.state.date.toLocaleString('en-us', { month: 'short' })
    const year = this.state.date.getFullYear()

    const formattedDate = month + ' ' + day + ' ' + year

    axios.get(`/api/user/summary?user=${this.props.profile[0].user_id}&date=${formattedDate}`).then(res => {
      this.setState({
        totalCalories: res.data.calories
      })
    })
  }

  toggleCalendar = () => {
    this.setState({
      toggleCalendar: !this.state.toggleCalendar
    })
  }

  handleToggleGoal = () => {
    this.setState({
      toggleGoal: !this.state.toggleGoal
    })
  }

  editGoal = (id, event) => {
    const userGoal = {
      goal: event.target.name
    }
    axios.put(`/api/summary/${id}`, userGoal).then(res => {
      this.props.getProfile(res.data)
      this.getCaloricExpenditure()
    })
    this.setState({
      toggleGoal: false
    })
  }

  render () {

    console.log(this.state.totalCalories)

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
        next2Label={false}
        />
    </div>

    const displayGoal = this.props.profile[0].goal === 'health' ? 'Be Healthy' : null ||
      this.props.profile[0].goal === 'stronger' ? 'Get Stronger' : null ||
      this.props.profile[0].goal === 'weight' ? 'Lose Weight' : null

    const displayEditGoal = this.state.toggleGoal &&
        <div className="EditGoal">
          <button name='health' onClick={(event) => this.editGoal(this.props.profile[0].user_id, event)}>Be Healthy</button>
          <button name='weight' onClick={(event) => this.editGoal(this.props.profile[0].user_id, event)}>Lose Weight</button>
          <button name='stronger' onClick={(event) => this.editGoal(this.props.profile[0].user_id, event)}>Get Stronger</button>
        </div>

      const displayTotalCalories = this.state.totalCalories ? this.state.totalCalories : 0

    return (
      <main>
        <div className="DiaryHealth">
          <div className="DiaryCalories">

            <div className="DiaryTotalCalories">
              <h1>{this.state.nutrition.calories ? parseInt(this.state.nutrition.calories) - displayTotalCalories : null}</h1>
              <h2>Calories Left</h2>
            </div>


          </div>
        </div>
        <div className="DiaryUser">
          <div className="UserInformation">
            <img id="border" src={this.props.profile[0].photo} alt="User Icon"/>
            <h1> Welcome back, {this.props.profile[0].username}!</h1>
            <h2 onClick={this.handleToggleGoal}>Goal: {displayGoal}</h2>
            {displayEditGoal}
              <div className="DiaryCalendar">
                <img src={CalendarIcon} alt="Calendar"/>
                <h2 onClick={this.toggleCalendar}>{displayDate}</h2>
              </div>
              {displayCalendar}
          </div>
          <div className="DiaryMealLog">
            <MealLog date={this.state.date} displayDate={displayDate} nutrition={this.state.nutrition} totalCalories={displayTotalCalories}/>
          </div>
          <div className="DiaryMacronutrients" style={{display: 'none'}}>
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
            <div className="DiaryTotalCalories">
              <h3>{displayTotalCalories} Calories</h3>
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

const mapDispatchToProps = {
  getProfile
}


export default connect(mapStateToProps, mapDispatchToProps)(Diary)
