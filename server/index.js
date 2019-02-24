const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
require('dotenv').config()
const session = require('express-session')
const app = express()
const axios = require('axios')

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

// Auth0

app.get('/auth/callback', (req, res) => {
  // console.log('herro from auth callback')
  const payload = {
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    code: req.query.code,
    grant_type: "authorization_code",
    redirect_uri: `http://${req.headers.host}/auth/callback`
  };

  function tradeCodeForAccessToken() {
    // console.log('trade code for access token')
    return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);
    }

  function tradeAccessTokenForUserInfo(accessTokenResponse) {
    // console.log('trade access token for admin')
    const accessToken = accessTokenResponse.data.access_token;
    return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`);
    }

  function storeUserInfoDatabase (response) {
    // console.log('store user info db')
    const auth0Id = response.data.sub;
    // console.log(response.data);

  const db = req.app.get('db');
    return db.get_user(auth0Id).then(users => {
      if(users.length) {
        const user = users[0];
        req.session.user = user;
        res.redirect('/');
      } else {
        const userArray = [
          auth0Id,
          response.data.name,
          response.data.email,
          response.data.picture
        ];
        return db.create_user(userArray).then(newUser => {
          req.session.user = newUser[0];
          res.redirect('/');
        }).catch(error => {
          console.log('error in db.get_user', error);
          res.status(500).send('Unexpected error');
        })
      }
    }).catch(error => {
      console.log('error in db.get_user', error);
      res.status(500).send('Unexpected error');
    })
  }

  tradeCodeForAccessToken()
      .then(tradeAccessTokenForUserInfo)
      .then(storeUserInfoDatabase)
      .catch(error => {
        console.log('Server error', error)
        res.status(500).send('An error occurred on the server. Check terminal')
      });
  });

app.get('/api/user-data', (req, res) => {
  // console.log(req.session.user)
  res.json(req.session.user);
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.send();
});

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

massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('Database is kickin')
})

PORT = 6500;

app.listen(PORT, ()=> {
  console.log(`Blasting off on Port ${PORT} 🚀 `)
})
