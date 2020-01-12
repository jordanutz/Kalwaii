import React, { Component } from 'react'
import './Reset.scss'

import Navigation from './Components/Navigation/Navigation'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import routes from './routes'
import {withRouter} from 'react-router-dom'


class App extends Component {


  render() {

    const displayNavigation = this.props.location.pathname === '/' ? <Header /> : <Navigation />
    const displayFooter = this.props.location.pathname === '/'  && <Footer /> 
    
    return (
      <div className="App">
        {displayNavigation}
        {routes}
      </div>
    )
  }
}

export default withRouter(App)
