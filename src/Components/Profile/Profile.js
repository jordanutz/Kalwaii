import React, {Component} from 'react'
import './Profile.scss'

// Components
import Diary from '../Diary/Diary'
import Questionnaire from '../Questionnaire/Questionnaire'
import Goals from '../Goals/Goals'
import Dashboard from '../Dashboard/Dashboard'

// Redux
import {connect} from 'react-redux'
import {getProfile} from '../../redux/reducer'

class Profile extends Component {

  render () {

    const displayProfile = this.props.profile && this.props.user ? <Diary /> : <Questionnaire />

    return (
      <div className="Profile">
        {displayProfile}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    user: state.user
  }
}

const mapDispatchToProps = {
  getProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
