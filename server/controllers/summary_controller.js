module.exports = {
  getSummary: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.get_caloric_expenditure(id)
    .then(calories => {
      calories = calories[0].caloric_expenditure
      const nutritionalInformation = {
        calories: Math.round(calories),
        carbohydratesMin: Math.round((calories * 0.45) / 4),
        carbohydratesMax: Math.round((calories * 0.65) / 4),
        proteinMin: Math.round((calories * 0.10) / 4),
        proteinMax: Math.round((calories * 0.35) / 4),
        fatMin: Math.round((calories * 0.25) / 9),
        fatMax: Math.round((calories * 0.35) / 9)
      }
      res.status(200).send(nutritionalInformation)
    })
    .catch(error => console.log('Unable to retrieve caloric expenditure', error))
  }
}
