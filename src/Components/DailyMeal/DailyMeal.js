import React, {Component} from 'react'
import './DailyMeal.scss'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import MagnifierTool from './assets/magnifier-tool.svg'
import Add from '../MealLog/assets/add.svg'
import Garbage from './assets/garbage.svg'

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
    this.getSelectedFoods()
    window.scrollTo(0, 0)
  }

  getSelectedFoods = () => {
    axios.get(`/api/selected?user=${this.props.user.id}&meal=${this.props.match.params.id}&date=${this.props.location.state.formattedDate}&totalCalories=${this.state.totalCalories}`)
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
    axios.delete(`/api/foodlog?id=${id}&user=${this.props.user.id}&meal=${this.props.match.params.id}&date=${this.props.location.state.formattedDate}`).then(res => {
      this.setState({
        selected: res.data
      })
    })
    this.getSelectedFoods()
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
                date: this.props.location.state.date,
                formattedDate: this.props.location.state.formattedDate,
                displayDate: this.props.location.state.displayDate
              }
            }} style={{ textDecoration: 'none', color: 'black' }}>
            <div className="SearchResult" key={result.id}>
              <div className="SearchDetails">
                <h1>{result.name}</h1>
                <h2>Calories: {result.calories}</h2>
              </div>
              <div className="SearchSelection">
                <img src={Add} alt="Add Icon" />
              </div>
            </div>
        </Link>
        )
    })

    const displaySelected = this.state.selected && this.state.selected.map( selection => {
      return (
        <div className="SelectedFood" key={selection.id}>
          <h1>{selection.name}</h1>
          <h2>{selection.calories * selection.quantity}</h2>
          <h3>{selection.quantity}, {selection.preparation}</h3>
          <img src={Garbage} onClick={() => this.deleteSelection(selection.id)} alt="Delete Icon"/>
        </div>
      )
    })

    const displaySearch = this.state.search.length === 0 ? null : <h3>{this.state.search.length + ' '} of 40 Results</h3>

    return (
        <div className="DailyMeal">
            <div className="DailyMealHeader">
              {breakfastHeader}
              {lunchHeader}
              {dinnerHeader}
              {snackHeader}
              <h2>{this.props.location.state.displayDate}</h2>
            </div>
            <div className="DailyMealSecondary">
            <div className="DailyMealMain">

              <div className="DailyMealSearch">
                <img id="Magnifier" src={MagnifierTool} alt="Magnify Glass"/>
                <input placeholder="Search food or brand" onChange={(event) => this.searchFood(event)} />
              </div>

              <div className="DailyMealSubheader">
                <h1>Total Calories: {this.state.totalCalories} </h1>
                <h2>Recommended Calories: {this.props.location.state.breakfastCalories && this.props.location.state.breakfastCalories}
                  {this.props.location.state.lunchCalories && this.props.location.state.lunchCalories}
                  {this.props.location.state.dinnerCalories && this.props.location.state.dinnerCalories}
                  {this.props.location.state.snackCalories && this.props.location.state.snackCalories}</h2>
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
