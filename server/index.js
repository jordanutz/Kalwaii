const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
require('dotenv').config()
const session = require('express-session')
const app = express()
const axios = require('axios')
const path = require('path')
const bcrypt = require('bcryptjs')

// Controllers
const auth = require('./controllers/auth_controller')
const profile = require('./controllers/profile_controller')
const summary = require('./controllers/summary_controller')
const mealLog = require('./controllers/meallog_controller')
const food = require('./controllers/food_controller')

app.use(bodyParser.json())
app.use( express.static( `${__dirname}/../build` ) )
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14
  }
}))

// Authentication 
app.post('/api/register', auth.userRegister)
app.post('/api/login', auth.userLogin)
app.get('/api/user', auth.getUser)
app.get('/api/logout', auth.userLogout)

// User creates profile and submits information that will determine their individualized plan.
app.post('/api/user/profile', profile.createProfile)
app.get('/api/user/profile/:id', profile.getProfile)
app.get('/api/user/summary', summary.getTotalCalories)
app.get('/api/user/summary/:id', summary.getSummary)
app.get('/api/meal-logs', mealLog.getMealLog)
app.get('/api/search', food.getResults)
app.get('/api/foodlog/food/:id', food.getFood)
app.post('/api/foodlog', food.postFood)
app.get('/api/selected', food.getSelectedFoods)
app.put('/api/summary/:id', summary.editGoal)
app.delete('/api/foodlog', food.deleteFood)
app.get('/api/meal-logs/calories', mealLog.getTotalCalories)

massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('Database is kickin')
})

PORT = 6500;

app.listen(PORT, ()=> {
  console.log(`Blasting off on Port ${PORT} 🚀 `)
})
