import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Homepage from './Components/Homepage/Homepage'
import Profile from './Components/Profile/Profile'

export default (
  <Switch>
    <Route exact path='/' component={Homepage} />
    <Route path='/profile/:id' component={Profile} />
  </Switch>
)
