import React, {Component} from 'react'
import './DailyMeal.scss'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import MagnifierTool from './assets/magnifier-tool.svg'

class DailyMeal extends Component {
  constructor () {
    super()
    this.state = {
      search: [],
      searchInput: '',
      selected: null,
      totalCalories: null
    }
  }

  componentDidMount() {

    const month = this.props.location.state.date.toLocaleString('en-us', { month: 'short' });
    const day = this.props.location.state.date.getDate()
    const year = this.props.location.state.date.getFullYear()

    const formattedDate = month + ' ' + day + ' ' + year

    axios.get(`/api/selected?user=${this.props.user.id}&meal=${this.props.match.params.id}&date=${formattedDate}`)
    .then(res => {
      this.setState({
        selected: res.data.foods,
        totalCalories: res.data.totalCalories
      })
    })
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

  deleteSelection = (id) => {
    console.log(id)
  }

  render () {
    const breakfastHeader = this.props.match.params.id === '1' && <h1>Breakfast</h1>
    const lunchHeader = this.props.match.params.id === '2' && <h1>Lunch</h1>
    const dinnerHeader = this.props.match.params.id === '3' && <h1>Dinner</h1>
    const snackHeader = this.props.match.params.id === '4' && <h1>Snack</h1>

    const displayResults = this.state.search.map(result => {
      return (
          <Link
            key={result.id}
            to={{
              pathname: `/food/${result.id}`,
              state: {
                meal: this.props.match.params.id,
                date: this.props.location.state.date
              }
            }} style={{ textDecoration: 'none', color: 'black' }}>
            <div className="SearchResult" key={result.id}>
              <div className="SearchDetails">
                <h1>{result.name}</h1>
                <h2>Calories: {result.calories}</h2>
              </div>
              <div className="SearchSelection">
                <button>Add</button>
              </div>
            </div>
        </Link>
        )
    })

    const displaySelected = this.state.selected && this.state.selected.map( (selection, index) => {
      console.log(selection.id)
      return (
        <div className="SelectedFood" key={index}>
          <h1>{selection.name}</h1>
          <h2>{selection.calories * selection.quantity} Calories</h2>
          <h2>{selection.quantity}, {selection.preparation}</h2>
          <button onClick={() => this.deleteSelection(selection.id)}>Delete</button>
        </div>
      )
    })

    const displaySearch = this.state.search.length === 0 ? <h1>Search Results</h1> : <h3>{this.state.search.length + ' '} of 40 Results</h3>

    return (
        <div className="DailyMeal">
          <div className="DailyMealSecondary">
            <div className="DailyMealHeader">
              {breakfastHeader}
              {lunchHeader}
              {dinnerHeader}
              {snackHeader}
              <h2>{this.props.location.state.displayDate}</h2>
            </div>
            <div className="DailyMealMain">

              <div className="DailyMealSearch">
                <img id="Magnifier" src={MagnifierTool} alt="Magnify Glass"/>
                <input placeholder="Search food or brand" onChange={(event) => this.searchFood(event)} />
              </div>

              <div className="DailyMealSubheader">
                <h1>Total Calories: {this.state.totalCalories} </h1>
                <h2>Recommended Calories:</h2>
              </div>

              <div className="DailyMealResults">
                 {displaySearch}
                {displayResults}
              </div>

              <div className="DailyMealSelected">
                {displaySelected}
              </div>
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,

  }
}

export default connect(mapStateToProps)(DailyMeal)
