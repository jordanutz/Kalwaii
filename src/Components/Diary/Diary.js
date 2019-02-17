import React, {Component} from 'react'
import './Diary.scss'

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

class Diary extends Component {

  render () {

    // <Summary />
    // <MealLog />
    // <Details />

    return (
      <main>
        <div className="DiaryHealth">
            <h2>Caloric Breakdown</h2>
        </div>
        <div className="DiaryUser">
          <div className="UserInformation">
            <img src={this.props.profile[0].photo} />
            <h1> Welcome back, {this.props.profile[0].username}!</h1>
            <Calendar />
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
