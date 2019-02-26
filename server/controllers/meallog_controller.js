module.exports = {
  getMealLog: (req, res) => {
    const db = req.app.get('db')
    db.get_meal_log()
    .then(mealLog => res.status(200).send(mealLog))
    .catch(error => console.log('Unexpected error in retrieving logs', error))
  },
  getTotalCalories: (req, res) => {
    const db = req.app.get('db')
    const {user, date} = req.query
    db.get_meal_calories([user, date])
    .then(calories => {

    let breakfastCalories = calories.filter(food => food.meal === 'Breakfast').reduce( (total, food, index, array) => {
      return array.length >= 1 ? total + (food.calories * food.quantity) : 0
    }, 0)

    let lunchCalories = calories.filter(food => food.meal === 'Lunch').reduce( (total, food, index, array) => {
      return array.length >= 1 ? total + (food.calories * food.quantity) : 0
    }, 0)

    let dinnerCalories = calories.filter(food => food.meal === 'Dinner').reduce( (total, food, index, array) => {
      return array.length >= 1 ? total + (food.calories * food.quantity) : 0
    }, 0)

    let snackCalories = calories.filter(food => food.meal === 'Snack').reduce( (total, food, index, array) => {
      return array.length >= 1 ? total + (food.calories * food.quantity) : 0
    }, 0)

    let totalCalories = {
      breakfast: breakfastCalories,
      lunch: lunchCalories,
      dinner: dinnerCalories,
      snack: snackCalories
    }

    res.status(200).send(totalCalories)

    })
    .catch(error => console.log('Unexpected error retrieving meal log calories', error))
  }
}
