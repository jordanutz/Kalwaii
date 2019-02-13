import React, {Component} from 'react'
import './Profile.scss'

import Diary from './Diary/Diary'
import Questionnaire from './Questionnaire/Questionnaire'
import Goals from './Goals/Goals'
import Dashboard from './Dashboard/Dashboard'

class Profile extends Component {
  render () {
    return (
      <div className="Profile">
        <Diary />
        <Questionnaire />
        <Goals />
        <Dashboard />
      </div>
    )
  }
}

export default Profile
