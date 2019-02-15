import React, {Component} from 'react'
import './Profile.scss'

// Components
import Diary from '../Diary/Diary'
import Questionnaire from '../Questionnaire/Questionnaire'
import Goals from '../Goals/Goals'
import Dashboard from '../Dashboard/Dashboard'
import axios from 'axios'

// Redux
import {connect} from 'react-redux'
import {getProfile} from '../../redux/reducer'

class Profile extends Component {

  componentDidMount() {
    axios.get(`/api/user/profile/${this.props.match.params.id}`).then(res => {
      this.props.getProfile(res.data)
    })
  }

  render () {

    console.log(this.props.profile)

    const displayProfile = this.props.profile && this.props.profile.length === 0 ? <Questionnaire /> : <Diary />

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
  }
}

const mapDispatchToProps = {
  getProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
