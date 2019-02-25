import React, {Component} from 'react'
import './Details.scss'
import {Bar} from 'react-chartjs-2';


class Details extends Component {

  render () {

    const chartData = {
        labels: ['Calories'],
        datasets:[
          {
            label:'Population',
            data:[
              617594,
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
            ]
          }
        ]
      }


    return (
      <div className="Details">
        <div className="DetailsHeader"></div>
        <div className="DetailsSecondary">

          <h2>Daily Intake</h2>
            <Bar data={chartData} />



          <h2>Goal Intake</h2>
          <h2>Your Intake</h2>
          <h2>Comparison</h2>
          <h2>Details</h2>

        </div>
      </div>
    )
  }
}

export default Details
