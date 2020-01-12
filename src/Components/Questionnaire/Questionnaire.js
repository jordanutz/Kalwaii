import React, {Component} from 'react'
import './Questionnaire.scss'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {DropdownButton, Dropdown} from 'react-bootstrap'
import {getProfile} from '../../redux/reducer'
import {connect} from 'react-redux'

import Sushi from './assets/sushi.svg'

class Questionnaire extends Component {
  constructor () {
    super()
    this.state = {
      goalToggle: {
        health: false,
        weight: false,
        stronger: false
      },
      gender: {
        male: false,
        female: false
      },
      age: '',
      height: '',
      weight: '',
      physicalLevel: {
        sedentary: false,
        light: false,
        moderate: false,
        high: false
      },
      bodyFat: '',
      toggleQuestionnare: {
        goals: true,
        age: false,
        details: false
      }
    }
  }

    goalToggleHealth = () => {
      this.setState({
        goalToggle: {
          health: !this.state.goalToggle.health
        },
        toggleQuestionnare: {
          goals: false,
          age: true,
          details: false
        }
      })
    }

    goalToggleWeight = () => {
      this.setState({
        goalToggle: {
          weight: !this.state.goalToggle.weight
        },
        toggleQuestionnare: {
          goals: false,
          age: true,
          details: false
        }
      })
    }

    goalToggleStrong = () => {
      this.setState({
        goalToggle: {
          stronger: !this.state.goalToggle.stronger
        },
        toggleQuestionnare: {
          goals: false,
          age: true,
          details: false
        }
      })
    }

    goalToggleMale = () => {
      this.setState({
        gender: {
          male: !this.state.gender.male
        },
        toggleQuestionnare: {
          goals: false,
          age: false,
          details: true
        }
      })
    }

    goalToggleFemale = () => {
      this.setState({
        gender: {
          female: !this.state.gender.female
        },
        toggleQuestionnare: {
          goals: false,
          age: false,
          details: true
        }
      })
    }

    handleInput = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }

    toggleSedentary = () => {
      this.setState({
        physicalLevel: {
          sedentary: !this.state.physicalLevel.sedentary,
          light: false,
          moderate: false,
          high: false
        }
      })
    }

    toggleLight = () => {
      this.setState({
        physicalLevel: {
          sedentary: false,
          light: !this.state.physicalLevel.low,
          moderate: false,
          high: false
        }
      })
    }

    toggleModerate = () => {
      this.setState({
        physicalLevel: {
          sedentary: false,
          light: false,
          moderate: !this.state.physicalLevel.moderate,
          high: false
        }
      })
    }

    toggleHigh = () => {
      this.setState({
        physicalLevel: {
          sedentary: false,
          light: false,
          moderate: false,
          high: !this.state.physicalLevel.high
        }
      })
    }

    submitProfile = (id, goalToggle, gender, age, height, weight, physicalLevel, bodyFat) => {

      const userProfile = {
        id: id,
        goal: Object.keys(goalToggle)[0],
        gender: Object.keys(gender)[0],
        age: age,
        height: height,
        weight: weight /= 2.2,
        physicalLevel: Object.keys(physicalLevel)[0],
        bodyFat: bodyFat
      }
      axios.post('/api/user/profile', userProfile).then(res => {
        this.props.getProfile(res.data)
      })
    }

   render () {

     const {goalToggle,
       gender,
       age,
       height,
       weight,
       physicalLevel,
       bodyFat,
       toggleQuestionnare} = this.state

     const {goalToggleWeight,
       goalToggleHealth,
       goalToggleStrong,
       goalToggleFemale,
       goalToggleMale,
       handleInput,
       toggleLight,
       toggleSedentary,
       toggleModerate,
       toggleHigh,
       submitProfile} = this

     const displayDropdown = physicalLevel.sedentary ? "Sedentary Activity" : null ||
       physicalLevel.light ? "Light Activity" : null ||
       physicalLevel.moderate ? "Moderate Activity" : null ||
       physicalLevel.high ? "High Activity" : null || "Physical Activity Level"

     const displayGoals = toggleQuestionnare.goals &&
       <div className="QuestionnaireSelection" value={toggleQuestionnare.goals}>
         <h1>{`Hi, ${this.props.user[0].name}`}</h1>
         <h2>Let's set up your profile. How can we help you?</h2>
         <button className="QuestionnaireButton" onClick={goalToggleHealth}><h4>Be Healthier</h4><p>Eat well, train well, live well.</p></button>
         <button className="QuestionnaireButton" onClick={goalToggleWeight}><h4>Lose Weight</h4><p>Get lean without getting mean.</p></button>
         <button className="QuestionnaireButton" onClick={goalToggleStrong}><h4>Get Stronger</h4><p>Bulk up the sensible way.</p></button>
       </div>

      const displayAge = toggleQuestionnare.age &&
        <div className="QuestionnaireSelection" value={toggleQuestionnare.age}>
          <h1>Alright!</h1>
          <h2>Let's get some basics down first.</h2>
          <button className="QuestionnaireButton" onClick={goalToggleFemale}>Female</button>
          <button className="QuestionnaireButton" onClick={goalToggleMale}>Male</button>
        </div>

      const displayDetails = toggleQuestionnare.details &&
        <div className="QuestionnaireSelection" value={toggleQuestionnare.details}>
          <h1>Physical Details</h1>
          <input placeholder="Your age" name="age" onChange={(name, event) => handleInput(name, event)}/>
          <input placeholder="Your height (in)" name="height" onChange={(name, event) => handleInput(name, event)}/>
          <button id="Decrement" className="HeightSelection">-</button><button id="Increment" className="HeightSelection">+</button>
          <input placeholder="Your weight (lbs)" name="weight" onChange={(name, event) => handleInput(name, event)} />
          <DropdownButton variant="light" id="dropdown-basic-button" title={displayDropdown}>
            <Dropdown.Item onClick={toggleSedentary}>Sedentary</Dropdown.Item>
            <Dropdown.Item onClick={toggleLight}>Light Activity</Dropdown.Item>
            <Dropdown.Item onClick={toggleModerate}>Moderate Activity</Dropdown.Item>
            <Dropdown.Item onClick={toggleHigh}>High Activity</Dropdown.Item>
          </DropdownButton>
          <span><input placeholder="Body Fat %" name="bodyFat" onChange={(name, event) => handleInput(name, event)} />%</span>
          <button className="QuestionnaireButton" onClick={() => submitProfile(this.props.match.params.id, goalToggle, gender, age, height, weight, physicalLevel, bodyFat)}>Submit</button>
        </div>

    return (
      <div className="Questionnaire">
        <img id="Sushi" src={Sushi} alt="Sushi Icon" />
        <div className="QuestionnaireMain">
          <div className="QuestionnaireSelection">
            {displayGoals}
            {displayAge}
            {displayDetails}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.user,
    profile: state.profile
  }
}

const mapDispatchToProps = {
  getProfile
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Questionnaire))
