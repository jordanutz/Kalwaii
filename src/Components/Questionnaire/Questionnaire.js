import React, {Component} from 'react'
import './Questionnaire.scss'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {DropdownButton, Dropdown} from 'react-bootstrap'

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

    submitProfile = (id, goalToggle, gender, age, height, weight, bodyFat) => {

      const userProfile = {
        id: id,
        goalToggle: goalToggle,
        gender: gender,
        age: age,
        height: height,
        weight: weight,
        bodyFat: bodyFat
      }

      axios.post('/api/user/profile', userProfile).then(res => {

      })
    }

   render () {

     const {goalToggle, gender, age, height, weight, bodyFat} = this.state
     console.log(this.state)

     const displayDropdown = this.state.physicalLevel.sedentary && "Sedentary Activity" ||
       this.state.physicalLevel.light && "Light Activity" ||
       this.state.physicalLevel.moderate && "Moderate Activity" ||
       this.state.physicalLevel.high && "High Activity" || "Physical Activity Level"

     const displayGoals = this.state.toggleQuestionnare.goals &&
       <div className="QuestionnaireSelection" value={this.state.toggleQuestionnare.goals}>
         <h1>Let's set up your profile.</h1>
         <h2>How can we help you?</h2>
         <button className="QuestionnaireButton" onClick={this.goalToggleHealth}><h4>Be Healthier</h4><p>Eat well, train well, live well.</p></button>
         <button className="QuestionnaireButton" onClick={this.goalToggleWeight}><h4>Lose Weight</h4><p>Get lean without getting mean.</p></button>
         <button className="QuestionnaireButton" onClick={this.goalToggleStrong}><h4>Get Stronger</h4><p>Bulk up the sensible way.</p></button>
       </div>

      const displayAge = this.state.toggleQuestionnare.age &&
        <div className="QuestionnaireSelection" value={this.state.toggleQuestionnare.age}>
          <h1>Alright!</h1>
          <h2>Let's get some basics down first.</h2>
          <button className="QuestionnaireButton" onClick={this.goalToggleFemale}>Female</button>
          <button className="QuestionnaireButton" onClick={this.goalToggleMale}>Male</button>
        </div>

      const displayDetails = this.state.toggleQuestionnare.details &&
        <div className="QuestionnaireSelection" value={this.state.toggleQuestionnare.details}>
          <h1>Physical Details</h1>
          <input placeholder="Your age" name="age" onChange={(name, event) => this.handleInput(name, event)}/>
          <input placeholder="Your height (in)" name="height" onChange={(name, event) => this.handleInput(name, event)}/>
          <button id="Decrement" className="HeightSelection">-</button><button id="Increment" className="HeightSelection">+</button>
          <input placeholder="Your weight (lbs)" name="weight" onChange={(name, event) => this.handleInput(name, event)} />
          <DropdownButton variant="light" id="dropdown-basic-button" title={displayDropdown}>
            <Dropdown.Item onClick={this.toggleLight}>Sedentary</Dropdown.Item>
            <Dropdown.Item onClick={this.toggleLight}>Light Activity</Dropdown.Item>
            <Dropdown.Item onClick={this.toggleModerate}>Moderate Activity</Dropdown.Item>
            <Dropdown.Item onClick={this.toggleHigh}>High Activity</Dropdown.Item>
          </DropdownButton>
          <span><input placeholder="Body Fat %" name="bodyFat" onChange={(name, event) => this.handleInput(name, event)} />%</span>
          <button className="QuestionnaireButton" onClick={() => this.submitProfile(this.props.match.params.id, goalToggle, gender, age, weight, height, bodyFat)}>Submit</button>
        </div>

    return (
      <div className="Questionnaire">
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



export default withRouter(Questionnaire)
