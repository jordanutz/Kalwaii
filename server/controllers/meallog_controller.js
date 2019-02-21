module.exports = {
  getMealLog: (req, res) => {
    const db = req.app.get('db')
    db.get_meal_log()
    .then(mealLog => res.status(200).send(mealLog))
    .catch(error => console.log('Unexpected error in retrieving logs', error))
  }
}
