import React, {Component} from 'react'
import './Diary.scss'
import axios from 'axios'
import { Progress } from 'antd';

// Child Components
import MealLog from '../MealLog/MealLog'
import Details from '../Details/Details'

// Redux
import {connect} from 'react-redux'
import {getProfile} from '../../redux/reducer'

// React-Calendar
import Calendar from 'react-calendar'

// Images
import CalendarIcon from './assets/calendar.svg'

class Diary extends Component {
  constructor () {
    super()
    this.state = {
      nutrition: {},
      date: new Date(),
      toggleCalendar: false,
      toggleDetails: false,
      toggleGoal: false,
      totalCalories: null,
      totalCarbohydrates: null,
      totalFat: null,
      totalProtein: null,
      totalSugar: null,
      totalSaturatedFat: null,
      totalUnsaturatedFat: null,
      totalCholesterol: null,
      totalSodium: null,
      totalPotassium: null
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
        totalProtein: res.data.protein,
        totalSugar: res.data.sugar,
        totalSaturatedFat: res.data.saturatedFat,
        totalUnsaturatedFat: res.data.unsaturatedFat,
        totalCholesterol: res.data.cholesterol,
        totalSodium: res.data.sodium,
        totalPotassium: res.data.potassium
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

  handleToggleDetails = () => {
    this.setState({
      toggleDetails: !this.state.toggleDetails
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
    const displayTotalSugar = this.state.totalSugar ? this.state.totalSugar : 0
    const displayTotalSaturatedFat = this.state.totalSaturatedFat ? this.state.totalSaturatedFat : 0
    const displayTotalUnsaturatedFat = this.state.totalUnsaturatedFat ? this.state.totalUnsaturatedFat : 0
    const displayTotalCholesterol = this.state.totalCholesterol ? this.state.totalCholesterol : 0
    const displayTotalSodium = this.state.totalSodium ? this.state.totalSodium : 0
    const displayTotalPotassium = this.state.totalPotassium ? this.state.totalPotassium : 0

    const displayCaloricIntake = this.state.nutrition.calories ? parseInt(this.state.nutrition.calories) - displayTotalCalories : null
    const caloriesPercentage = this.state.nutrition.standardCalories && displayTotalCalories ? parseInt(Math.floor((displayTotalCalories / this.state.nutrition.standardCalories) * 100)) : 0
    const carbohydratesPercentage = this.state.nutrition.carbohydratesMax && displayTotalCarbohydrates ? parseInt(Math.floor((displayTotalCarbohydrates / this.state.nutrition.carbohydratesMax) * 100)) : 0
    const fatPercentage = this.state.nutrition.fatMax && displayTotalFat ? parseInt(Math.floor((displayTotalFat / this.state.nutrition.fatMax) * 100)) : 0
    const proteinPercentage = this.state.nutrition.proteinMax && displayTotalProtein ? parseInt(Math.floor((displayTotalFat / this.state.nutrition.proteinMax) * 100)) : 0

    const displayDetails = this.state.toggleDetails &&
      <Details
        value={this.state.toggleDetails}
        caloricIntake={this.state.nutrition.standardCalories}
        consumedCalories={displayTotalCalories}
        displayDate={displayDate}
        maxCarbohydrates={this.state.nutrition.carbohydratesMax}
        maxFat={this.state.nutrition.fatMax}
        maxProtein={this.state.nutrition.proteinMax}
        consumedCarbohydrates={displayTotalCarbohydrates}
        consumedFat={displayTotalFat}
        consumedProtein={displayTotalProtein}
        toggleDetails={this.handleToggleDetails}
        caloriesPercentage={caloriesPercentage}
        carbohydratesPercentage={carbohydratesPercentage}
        fatPercentage={fatPercentage}
        proteinPercentage={proteinPercentage}
        totalSugar={displayTotalSugar}
        totalSaturatedFat={displayTotalSaturatedFat}
        totalUnsaturatedFat={displayTotalUnsaturatedFat}
        totalCholesterol={displayTotalCholesterol}
        totalSodium={displayTotalSodium}
        totalPotassium={displayTotalPotassium}
        />

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
                <h2 id="Main" onClick={this.handleToggleDetails}>Details</h2>
                {displayDetails}
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
