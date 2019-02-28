import React, {Component} from 'react'
import './Navigation.scss'
import axios from 'axios'
import {logIn, logOut} from '../../redux/reducer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Hamburger from '../Header/assets/hamburger.svg'

class Navigation extends Component {
  constructor () {
    super()
    this.state = {
      navigation: false
    }
  }

  login = () => {
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`)
    const scope= encodeURIComponent('openid profile email')
    window.location= `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`
  }

  componentDidMount () {
    axios.get('/api/user-data').then(response => {
      const user = response.data;
      this.props.logIn(user);
    })
  }

  logout = () => {
   axios.post('/api/logout').then(res => {
     window.location.href='/'
   })
   .catch(error => console.log(error))
 }

 toggleNavigation = () => {
   console.log('hit')
   this.setState({
     navigation: !this.state.navigation
   })
 }

  render () {
    const displayAccount = this.props.user && <Link style={{textDecoration: 'none', color: 'white'}} to={`/profile/${this.props.user.id}`}><span>My Profile</span></Link>
    const displayLogin = this.props.user ? <button onClick={this.logout}>Logout</button> : <button onClick={this.login}>Login</button>
    const displayNavigation = this.state.navigation &&
      <div className="MobileLinks">
        <li>Features</li>
        <li>Articles</li>
        <li>Blog</li>
        {displayLogin}
      </div>

    return (
      <nav>
        {displayNavigation}
        <div className="NavigationSecondary">
          <ul id="NavigationLinks">
            <Link style={{ textDecoration: 'none' }} to='/'><h1>Kalwaii</h1></Link>
          </ul>
          <ul id="NavigationLogin">
            <img id="Hamburger" src={Hamburger} onClick={this.toggleNavigation} />
            {displayAccount}
            {displayLogin}
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logIn,
  logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
