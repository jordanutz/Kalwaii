module.exports = {
  getSummary: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.get_caloric_expenditure(id)
    .then(summary => {
      let caloricExpenditure = summary[0].caloric_expenditure
      let goal = summary[0].goal

      console.log(goal)

      if (goal === 'stronger') {
        caloricExpenditure += 500
      } else if (goal === 'weight') {
        caloricExpenditure -= 500
      } else {
        caloricExpenditure
      }

      console.log(caloricExpenditure)

      const nutritionalInformation = {
        calories: Math.round(caloricExpenditure),
        carbohydratesMin: Math.round((caloricExpenditure * 0.45) / 4),
        carbohydratesMax: Math.round((caloricExpenditure * 0.65) / 4),
        proteinMin: Math.round((caloricExpenditure * 0.10) / 4),
        proteinMax: Math.round((caloricExpenditure * 0.35) / 4),
        fatMin: Math.round((caloricExpenditure * 0.25) / 9),
        fatMax: Math.round((caloricExpenditure * 0.35) / 9)
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
