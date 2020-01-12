import React, {Component} from 'react'
import './Header.scss'
import axios from 'axios'
import {logIn, logOut} from '../../redux/reducer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Hamburger from './assets/hamburger.svg'
import {withRouter} from 'react-router-dom'


class Header extends Component {
  constructor () {
    super()
    this.state = {
      navigation: false, 
      name: '',
      email: '', 
      password: '', 
      toggleLogin: false, 
      toggleRegister: false
    }
  }

  handleName = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handleEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handlePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  login = () => {
    this.setState({
      navigation: !this.state.navigation, 
      toggleLogin: true
    })
  }

  componentDidMount () {
    axios.get('/api/user-data').then(response => {
      const user = response.data;
      this.props.logIn(user);
    })
  }

  logout = () => {
    axios.get('/api/logout').then(res => {
      window.location.href='/'
    })
   .catch(error => console.log(error))
  }

  toggleNavigation = () => {
    this.setState({
      navigation: !this.state.navigation
    })
  }

  toggleLogin = () => {
    this.setState({
      toggleLogin: true, 
      toggleRegister: false, 
      name: '', 
      email: '', 
      password: ''
    })
  }

  toggleRegister = () => {
    this.setState({
      toggleLogin: false, 
      toggleRegister: true, 
      name: '', 
      email: '', 
      password: ''
    })
  }

  registerUser = (name, email, password) => {

    const details = {
      name, 
      email, 
      password
    }

    axios.post('/api/register', details).then(res => {
      this.props.logIn(res.data);
      this.props.history.push(`/profile/${res.data[0].id}`)
    })
  }

  loginUser = (email, password) => {

    const details = {
      email, 
      password
    }

    axios.post('/api/login', details).then(res => {
      this.props.logIn(res.data)
      this.props.history.push(`/profile/${res.data[0].id}`)
    })
  }

  render () {

    const displayAccount = this.props.user && 
      <Link to={`/profile/${this.props.user.id}`} 
            style={{ textDecoration: 'none' }}>
        <span>My Profile</span>
      </Link>

    const displayLogin = this.props.user ? 
      <button onClick={() => this.logout()}>Logout</button> : 
      <button onClick={this.login}>Login</button>

    const displayNavigation = this.state.navigation &&
      <div className="MobileLinks" value={this.state.navigation}>
          <h2>Kalwaii</h2>

          {
           
            this.state.toggleLogin ? 
              <React.Fragment>
                <p>Don't have an account yet? <span onClick={() => this.toggleRegister()}>Register.</span> </p>
                <label>Email</label>
                <input type="text" value={this.state.email} onChange={(e) => this.handleEmail(e)} />
                <label>Password</label>
                <input type="password" value={this.state.password} onChange={(e) => this.handlePassword(e)} />
                <button onClick={() => this.loginUser(this.state.email, this.state.password)}>Login</button>
              </React.Fragment>
            :
              <React.Fragment>
                <p>Already have an account? <span onClick={() => this.toggleLogin()}>Login.</span> </p>
                <label>Name</label>
                <input type="text" value={this.state.name} onChange={(e) => this.handleName(e)} />
                <label>Email</label>
                <input type="text" value={this.state.email} onChange={(e) => this.handleEmail(e)} />
                <label>Password</label>
                <input type="password" value={this.state.password} onChange={(e) => this.handlePassword(e)} />
                <button onClick={() => this.registerUser(this.state.name, this.state.email, this.state.password)}>Register</button>
              </React.Fragment>
              
          }
      </div> 

    return (
      <div className="Header">
          {displayNavigation}
        <div className="HeaderSecondary">
          <ul id="HeaderLinks">
            <Link style={{ textDecoration: 'none' }} to='/'>
              <h1>Kalwaii</h1>
            </Link>
            <div className="HeaderSublinks">
              <li>Features</li>
              <li>Articles</li>
              <li>Blog</li>
            </div>
          </ul>

          <ul id="HeaderLogin">
            <img id="Hamburger" src={Hamburger} onClick={this.toggleNavigation} />
            {displayAccount}
            {displayLogin}
          </ul>
        </div>
      </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
