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
      console.log(calories)
    })
    .catch(error => console.log('Unexpected error retrieving meal log calories', error))
  }
}
