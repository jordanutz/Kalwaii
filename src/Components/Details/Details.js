import React, {Component} from 'react'
import './Details.scss'
import {Doughnut, Bar} from 'react-chartjs-2';
import { Progress } from 'antd';


class Details extends Component {

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {

    const goalIntakeData = {
    	labels: [
    		'Carbohydrates',
    		'Protein',
    		'Fat'
    	],
    	datasets: [{
    		data: [50, 20, 30],
    		backgroundColor: [
    		'#33C9FF',
    		'#F0B67F',
        '#00FF91',
    		],
    		hoverBackgroundColor: [
    		'#33C9FF',
    		'#F0B67F',
        '#00FF91'
    		]
    	}]
    };

    const totalGrams = this.props.consumedCarbohydrates + this.props.consumedProtein + this.props.consumedFat
    const totalCarbohydrates = Math.floor((this.props.consumedCarbohydrates / totalGrams) * 100)
    const totalFat = Math.floor((this.props.consumedFat / totalGrams) * 100)
    const totalProtein = Math.floor((this.props.consumedProtein / totalGrams) * 100)

    console.log(totalGrams)

    const userIntakeData = {
      labels: [
        'Carbohydrates',
        'Protein',
        'Fat'
      ],
      datasets: [{
        data: [ totalCarbohydrates, totalProtein, totalFat ],
        backgroundColor: [
        '#33C9FF',
        '#F0B67F',
        '#00FF91'
        ],
        hoverBackgroundColor: [
        '#33C9FF',
        '#F0B67F',
        '#00FF91'
        ]
      }]
    };




    console.log(this.props)

    return (
      <div className="Details">
        <h1 onClick={this.props.toggleDetails}>Close</h1>
        <div className="DetailsSecondary">

          <div className="DailyIntake">
            <h2>Daily Intake</h2>
            <div className="DailyIntakeHeader">
              <h3>Calories</h3>
              <h3>{this.props.consumedCalories} / {this.props.caloricIntake} Calories</h3>
            </div>
            <Progress id="Padding" percent={this.props.caloriesPercentage} showInfo={false} strokeColor={ this.props.consumedCalories === 0 ? 'white' : '#00FF91'} />
          </div>

          <div className="DailyIntake">
            <div className="DailyIntakeHeader">
              <h3>Carbohydrates</h3>
              <h3>{this.props.consumedCarbohydrates} / {this.props.maxCarbohydrates}g</h3>
            </div>
              <Progress percent={this.props.carbohydratesPercentage} showInfo={false} strokeColor={ this.props.consumedCarbohydrates === 0 ? 'white' : '#00FF91'} />
          </div>

          <div className="DailyIntake">
            <div className="DailyIntakeHeader">
              <h3>Fat</h3>
              <h3>{this.props.consumedFat} / {this.props.maxFat}g</h3>
            </div>
              <Progress percent={this.props.fatPercentage} showInfo={false} strokeColor={ this.props.consumedFat === 0 ? 'white' : '#00FF91'} />
          </div>

          <div className="DailyIntake">
            <div className="DailyIntakeHeader">
              <h3>Protein</h3>
              <h3>{this.props.consumedProtein} / {this.props.maxProtein}g</h3>
            </div>
              <Progress percent={this.props.proteinPercentage} showInfo={false} strokeColor={ this.props.consumedProtein === 0 ? 'white' : '#00FF91'} />
          </div>

          <div className="DetailsGoal">
            <div className="GoalIntake">
              <h2>Goal Intake</h2>
              <Doughnut data={goalIntakeData}
                width={100}
                height={100}
                options={{
		                maintainAspectRatio: true
	                }}
              />

            </div>
            <div className="GoalIntake">
              <h2>User Intake</h2>
                <Doughnut data={userIntakeData}
                  width={100}
                  height={100}
                  options={{
  		                maintainAspectRatio: true
  	                }}
                />
            </div>
          </div>

        </div>



          <h2>Comparison</h2>
          <h2>Details</h2>

      </div>
    )
  }
}

export default Details
