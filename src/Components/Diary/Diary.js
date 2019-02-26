import React, {Component} from 'react'
import './Diary.scss'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Progress } from 'antd';

// Child Components
import MealLog from '../MealLog/MealLog'
import Details from '../Details/Details'

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
      totalCalories: null,
      totalCarbohydrates: null,
      totalFat: null,
      totalProtein: null
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
        totalCalories: res.data.calories,
        totalCarbohydrates: res.data.carbohydrates,
        totalFat: res.data.fat,
        totalProtein: res.data.protein
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

    // Calendar Formatted Date
    const curr_date = this.state.date.getDate()
    const curr_month = this.state.date.getMonth() + 1
    const curr_year = this.state.date.getFullYear()
    const displayDate = curr_month + "/" + curr_date + "/" + curr_year

    // Fornatted Date for Database
    const day = this.state.date.getDate()
    const month = this.state.date.toLocaleString('en-us', { month: 'short' })
    const year = this.state.date.getFullYear()
    const formattedDate = month + ' ' + day + ' ' + year
    console.log(formattedDate)

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
      const displayTotalCarbohydrates = this.state.totalCarbohydrates ? this.state.totalCarbohydrates : 0
      const displayTotalFat = this.state.totalFat ? this.state.totalFat : 0
      const displayTotalProtein = this.state.totalProtein ? this.state.totalProtein : 0
      const displayCaloricIntake = this.state.nutrition.calories ? parseInt(this.state.nutrition.calories) - displayTotalCalories : null
      const caloriesPercentage = this.state.nutrition.standardCalories && displayTotalCalories ? parseInt(Math.floor((displayTotalCalories / this.state.nutrition.standardCalories) * 100)) : 100
      const carbohydratesPercentage = this.state.nutrition.carbohydratesMax && displayTotalCarbohydrates ? parseInt(Math.floor((displayTotalCarbohydrates / this.state.nutrition.carbohydratesMax) * 100)) : 100
      const fatPercentage = this.state.nutrition.fatMax && displayTotalFat ? parseInt(Math.floor((displayTotalFat / this.state.nutrition.fatMax) * 100)) : 100
      const proteinPercentage = this.state.nutrition.proteinMax && displayTotalProtein ? parseInt(Math.floor((displayTotalFat / this.state.nutrition.proteinMax) * 100)) : 100

    return (
      <main>

        <div className="DiaryHealth">
          <div className="DiaryCalories">

            <div className="DiaryTotalCalories">
                <Progress style={{color: 'white'}}
                  type="circle"
                  percent={caloriesPercentage}
                  format={() => displayCaloricIntake}
                  strokeWidth={3}
                  width={175}
                  />
                <h2>Calories Left</h2>
            </div>

            <div className="Nester">
              <div className="DiaryMacronutrients">
                <div className="Macronutrient">
                  <h3>Carbohydrates</h3>
                  <Progress percent={carbohydratesPercentage} showInfo={false}  />
                  <h4>{this.state.nutrition.carbohydratesMax - displayTotalCarbohydrates}g left</h4>
                </div>
                <div className="Macronutrient">
                  <h3>Fat</h3>
                  <Progress percent={fatPercentage} showInfo={false} />
                  <h4>{this.state.nutrition.fatMax - displayTotalFat}g left</h4>
                </div>
                <div className="Macronutrient">
                  <h3>Protein</h3>
                  <Progress percent={proteinPercentage} showInfo={false} />
                  <h4>{this.state.nutrition.proteinMax - displayTotalProtein}g left</h4>
                </div>
              </div>

              <div className="DiaryDetails">
                <Link to={{
                    pathname: '/details',
                    state: {
                      totalCalories: this.state.totalCalories
                    }
                  }}
                  style={{textDecoration: 'none', color: 'white'}}>Details</Link>
              </div>
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
            <MealLog
              date={this.state.date}
              displayDate={displayDate}
              nutrition={this.state.nutrition}
              totalCalories={displayTotalCalories}
              formattedDate={formattedDate}
              />
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
