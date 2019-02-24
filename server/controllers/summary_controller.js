module.exports = {
  getSummary: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.get_caloric_expenditure(id)
    .then(summary => {

      const calories = parseInt(summary[0].caloric_expenditure)

      const calculatedCalories = summary.reduce( (total, profile) => {
        return profile.goal === 'stronger' && total + 500 ||
        profile.goal === 'weight' && total - 500 ||
        profile.goal === 'health' && total
      }, calories)

      const nutritionalInformation = {
        calories: Math.round(calculatedCalories),
        carbohydratesMin: Math.round((calculatedCalories * 0.45) / 4),
        carbohydratesMax: Math.round((calculatedCalories * 0.65) / 4),
        proteinMin: Math.round((calculatedCalories * 0.10) / 4),
        proteinMax: Math.round((calculatedCalories * 0.35) / 4),
        fatMin: Math.round((calculatedCalories * 0.25) / 9),
        fatMax: Math.round((calculatedCalories * 0.35) / 9)
      }

      res.status(200).send(nutritionalInformation)
    })
    .catch(error => console.log('Unable to retrieve caloric expenditure', error))
  },

  editGoal: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    const {goal} = req.body
    db.edit_goal([id, goal])
    .then(profile => res.status(200).send(profile))
    .catch(error => console.log('Unexpected error editing goal', error))

  }
}
