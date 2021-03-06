import React, {Component} from 'react'
import './FoodProfile.scss'
import axios from 'axios'
import NumericInput from 'react-numeric-input';
import {connect} from 'react-redux'

class FoodProfile extends Component {
  constructor () {
    super()
    this.state = {
      quantity: 1,
      food: {}
    }
  }

  componentDidMount () {
    this.getFood()
    window.scrollTo(0, 0)
  }

  getFood = () => {
    axios.get(`/api/foodlog/food/${this.props.match.params.id}`).then(res => {
      this.setState({
        food: res.data[0]
      })
    })
  }

  inputQuantity = (valueAsNumber) => {
    this.setState({
      quantity: valueAsNumber
    })
  }

  submitLog = (userId, mealId, foodId, date, quantity) => {

    const logDetails = {
      userId: userId,
      mealId: parseInt(mealId),
      foodId: foodId,
      date: this.props.location.state.formattedDate,
      quantity: quantity
    }

    axios.post('/api/foodlog', logDetails).then(res => {

    })
    this.goBack()
  }

  goBack = () => {
    this.props.history.goBack()
  }

  render () {

    const breakfastHeader = this.props.location.state.meal === '1' && <h1>Breakfast</h1>
    const lunchHeader = this.props.location.state.meal === '2' && <h1>Lunch</h1>
    const dinnerHeader = this.props.location.state.meal === '3' && <h1>Dinner</h1>
    const snackHeader = this.props.location.state.meal === '4' && <h1>Snack</h1>

    const {food} = this.state

    return (
      <div className="FoodProfile">
        <div className="FoodProfileHeader">
          <h1>{breakfastHeader} {lunchHeader} {dinnerHeader} {snackHeader}</h1>
          <h2>{this.props.location.state.displayDate}</h2>
        </div>
        <div className="FoodProfileSecondary">
          <div className="FoodProfileMain">
            <h2>{food.name}</h2>
          </div>
          <div className="FoodProfileDetails">
            <div className="FoodProfileAlign">
              <h3>Additional Information</h3>
              <h4>Calories: {food.calories && food.calories * this.state.quantity}</h4>
              <h4>Protein: {food.protein && food.protein * this.state.quantity}g</h4>
              <h4>Carbohydrates: {food.carbohydrates && food.carbohydrates * this.state.quantity}g</h4>
              <h4>Fat: {food.fat && food.fat * this.state.quantity}g</h4>
              <h4>Saturated Fat: {food.saturated_fat && food.saturated_fat * this.state.quantity}g</h4>
              <h4>Unsaturated Fat: {food.unsaturated_fat && food.unsaturated_fat * this.state.quantity}g</h4>
              <h4>Sugar: {food.sugar && food.sugar * this.state.quantity}g</h4>
              <h4>Cholesterol: {food.cholesterol && food.cholesterol * this.state.quantity}g</h4>
              <h4>Sodium: {food.sodium && food.sodium * this.state.quantity}mg</h4>
              <h4>Potassium: {food.potassium && food.potassium * this.state.quantity}mg</h4>
              <div className="FoodProfileServing">
                <NumericInput min={1} value={this.state.quantity} onChange={this.inputQuantity}/>
                <h4>{food.preparation}</h4>
              </div>
              <button onClick={() => this.submitLog(this.props.user[0].id,
                  this.props.location.state.meal,
                  food.id,
                  this.props.location.state.date,
                  this.state.quantity)}>Add To Diary</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(FoodProfile)
