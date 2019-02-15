module.exports = {
  createProfile: (req, res) => {
    console.log(req.body)
    const {id, goal, gender, age, height, weight, physicalLevel, bodyFat} = req.body
    const db = req.app.get('db')
    let genderMultiplier;
    let leanFactorMultiplier;
    let activityCoefficient;

    if (gender.male) {
     genderMultiplier = 1.0
   } else {
     genderMultiplier = 0.9
   }

  if (bodyFat < 10 && gender.male) {
    leanFactorMultiplier = 1.15
  } else if ( (bodyFat >= 10 && bodyFat <= 14) && gender.male) {
    leanFactorMultiplier = 1.0
  } else if ( (bodyFat >= 15 && bodyFat <= 20) && gender.male) {
    leanFactorMultiplier = 0.95
  } else if ( (bodyFat >= 21 && bodyFat <= 28) && gender.male) {
    leanFactorMultiplier = 0.9
  } else if (bodyFat >= 28 && gender.male) {
    leanFactorMultiplier = 0.85
  } else if ( (bodyFat >= 0 && bodyFat <= 14) && gender.female) {
    leanFactorMultiplier = 1.15
  } else if ( (bodyFat >= 15 && bodyFat <= 18) && gender.female) {
    leanFactorMultiplier = 1.0
  } else if ( (bodyFat >= 19 && bodyFat <= 28) && gender.female) {
    leanFactorMultiplier = 0.95
  } else if ( (bodyFat >= 29 && bodyFat <= 38) && gender.female ) {
    leanFactorMultiplier = 0.9
  } else {
    leanFactorMultiplier = 0.85
  }

  if (physicalLevel.sedentary) {
    activityCoefficient = 1.3
  } else if (physicalLevel.light) {
    activityCoefficient = 1.55
  } else if (physicalLevel.moderate) {
    activityCoefficient = 1.65
  } else {
    activityCoefficient = 1.8
  }

  db.create_profile([id,
    goal,
    gender,
    age,
    height,
    weight,
    physicalLevel,
    bodyFat,
    genderMultiplier,
    leanFactorMultiplier,
    activityCoefficient])
    .then(profile => res.status(200).send(profile))
  }
}
