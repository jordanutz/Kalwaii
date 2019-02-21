import React, {Component} from 'react'
import './DailyMeal.scss'
import axios from 'axios'
import {Link} from 'react-router-dom'

import FoodLog from '../FoodLog/FoodLog'
import MagnifierTool from './assets/magnifier-tool.svg'

class DailyMeal extends Component {
  constructor () {
    super()
    this.state = {
      search: [],
      searchInput: ''
    }
  }

  searchFood = (event) => {
    this.setState({
      searchInput: event.target.value
    })
    axios.get(`/api/search?food=${this.state.searchInput}`).then(res => {
      if (this.state.searchInput === '') {
        this.setState({
          search: []
        })
      } else {
        this.setState({
          search: res.data
        })
      }
    })
  }

  render () {

    const breakfastHeader = this.props.match.params.id === '1' && <h1>Breakfast</h1>
    const lunchHeader = this.props.match.params.id === '2' && <h1>Lunch</h1>
    const dinnerHeader = this.props.match.params.id === '3' && <h1>Dinner</h1>
    const snackHeader = this.props.match.params.id === '4' && <h1>Snack</h1>

  const displayResults = this.state.search.map(result => {
    return (
      <div className="SearchResult" key={result.id}>
        <div className="SearchDetails">
          <h1>{result.name}</h1>
          <h2>Calories: {result.calories}</h2>
          <Link to= {{
              pathname: `/food/${result.id}`,
              state: {
                meal: this.props.match.params.id,
                date: this.props.location.state.date
              }
            }}><button>More Details</button></Link>
        </div>
        <div className="SearchSelection">
          <button>Add</button>
        </div>
      </div>
    )
  })

    return (
        <div className="DailyMeal">
          <div className="DailyMealSecondary">
            <div className="DailyMealHeader">
              {breakfastHeader}
              {lunchHeader}
              {dinnerHeader}
              {snackHeader}
            </div>
            <div className="DailyMealMain">

              <div className="DailyMealSearch">
                <img id="Magnifier" src={MagnifierTool}/>
                <input placeholder="Search food or brand" onChange={(event) => this.searchFood(event)} />
              </div>

              <div className="DailyMealSubheader">
                <h2>Recommended Calories</h2>
              </div>

              <div className="DailyMealResults">
                <h1>Search Results</h1>
                {displayResults}
              </div>

              <div className="DailyMealSelected">
                User selected foods
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default DailyMeal
