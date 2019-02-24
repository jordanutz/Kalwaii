module.exports = {
  getResults: (req, res) => {
    const db = req.app.get('db')
    const {food} = req.query
    db.search_food(food)
    .then(results => res.status(200).send(results))
    .catch(error => console.log('Unexpected error retrieving results', error))
  },
  getFood: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.get_food(id)
    .then(food => res.status(200).send(food))
    .catch(error => console.log('Unexpected error in retrieving food', error))
  },
  postFood: (req, res) => {
    const db = req.app.get('db')
    const {userId, mealId, foodId, date, quantity} = req.body
    db.insert_food([userId, mealId, foodId, date, quantity])
    .then(entry => res.status(200).send(entry))
    .catch(error => console.log('Unexpected error posting log', error))
  },
  getSelectedFoods: (req, res) => {
    const db = req.app.get('db')
    const {user, meal, date} = req.query
    db.get_selected_food([user, meal, date])
    .then(foods => {

      const totalCalories = foods.reduce( (total, food) => {
        return total + (food.calories * food.quantity)
      }, 0);

      const selectedFoods = {
        totalCalories: totalCalories,
        foods: foods
      }

      res.status(200).send(selectedFoods)
    })
    .catch(error => console.log('Unexpected error retrieving selected foods', error))
  },
  deleteFood: (req, res) => {
    const db = req.app.get('db')
    const {id, user, meal, date, totalCalories} = req.query
    db.delete_food([id, user, meal, date])
  }
}
