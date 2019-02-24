import React, { Component } from 'react'
import './Reset.scss'

import Navigation from './Components/Navigation/Navigation'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import routes from './routes'
import {withRouter} from 'react-router-dom'

import {connect} from 'react-redux'

class App extends Component {

  render() {

    console.log(this.props)

    const displayNavigation = this.props.user && this.props.location.pathname === `/profile/${this.props.user.id}` ? <Navigation /> : <Header />

    return (
      <div className="App">
        {displayNavigation}
        {routes}
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(App))
