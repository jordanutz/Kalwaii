import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Homepage from './Components/Homepage/Homepage'
import Profile from './Components/Profile/Profile'
import DailyMeal from './Components/DailyMeal/DailyMeal'
import FoodProfile from './Components/FoodProfile/FoodProfile'
import Details from './Components/Details/Details'

export default (
  <Switch>
    <Route exact path='/' component={Homepage} />
    <Route exact path='/profile/:id' component={Profile} />
    <Route path='/profile/:id/foodlog/:id' component={DailyMeal} />
    <Route path='/food/:id' component={FoodProfile} />
    <Route path='/details' component={Details} />
  </Switch>
)
