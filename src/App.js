import React, { Component } from 'react'
import './Reset.scss'

import Navigation from './Components/Navigation/Navigation'
import Footer from './Components/Footer/Footer'
import routes from './routes'
import {withRouter} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        {routes}
        <Footer />
      </div>
    );
  }
}

export default withRouter(App)
