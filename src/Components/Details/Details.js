import React, {Component} from 'react'
import './Details.scss'
import {Doughnut, Bar} from 'react-chartjs-2';
import { Progress } from 'antd';


class Details extends Component {

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {

    console.log(this.props)

    const totalGrams = this.props.consumedCarbohydrates + this.props.consumedProtein + this.props.consumedFat
    const totalCarbohydrates = Math.floor((this.props.consumedCarbohydrates / totalGrams) * 100)
    const totalFat = Math.floor((this.props.consumedFat / totalGrams) * 100)
    const totalProtein = Math.floor((this.props.consumedProtein / totalGrams) * 100)

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

    const comparisonData = {
      labels: [
        'Carbohydrates',
        'Protein',
        'Fat'
      ],
      datasets: [
        {
          label: 'Goal Intake',
          backgroundColor: [
          '#33C9FF',
          '#33C9FF',
          '#33C9FF'
          ],
          borderWidth: 2,
          borderColor: 'white',
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [50, 20, 30]
        },
        {
          label: 'Your Intake',
          backgroundColor: [
          '#00FF91',
          '#00FF91',
          '#00FF91'
          ],
          borderWidth: 2,
          borderColor: 'white',
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [totalCarbohydrates, totalProtein, totalFat],
        }
      ],

    };

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
	                }}/>
            </div>
            <div className="GoalIntake">
              <h2>User Intake</h2>
                <Doughnut data={userIntakeData}
                  width={100}
                  height={100}
                  options={{
  		                maintainAspectRatio: true
  	                }}/>
            </div>
          </div>
          <div className="DetailsComparison">
            <h2>Comparison</h2>
              <Bar
               data={comparisonData}
               width={100}
               height={50}
               options={{
                 maintainAspectRatio: true,
                 scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true,
      
                      }
                    }]
                  }
               }}
             />
          </div>
          <div className="DetailsSummary">
            <h2>Summary</h2>
            <div className="DetailsGrid">
              <h5 id="Bold" className="Margin">Protein</h5><h6 className="Margin">{this.props.consumedProtein}g</h6>
              <h5 id="Bold">Carbohydrates</h5><h6>{this.props.consumedCarbohydrates}g</h6>
              <h5 className="Margin">Sugar</h5><h6 className="Margin">{this.props.totalSugar}g</h6>
              <h5 id="Bold">Fat</h5><h6>{this.props.consumedFat}g</h6>
              <h5>Saturated Fat</h5><h6>{this.props.totalSaturatedFat}g</h6>
              <h5 className="Margin">Unsaturated Fat</h5><h6 className="Margin">{this.props.totalUnsaturatedFat}g</h6>
              <h5 id="Bold">Other</h5><div></div>
              <h5>Cholesterol</h5><h6>{this.props.totalCholesterol}mg</h6>
              <h5>Sodium</h5><h6>{this.props.totalSodium}mg</h6>
              <h5>Potassium</h5><h6>{this.props.totalPotassium}mg</h6>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Details
