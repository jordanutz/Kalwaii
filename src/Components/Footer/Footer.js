import React from 'react'
import './Footer.scss'
import {connect} from 'react-redux'

const Footer = (props) => {

  const displayRegister = props.user ? null :
    <div className="FooterRegister">
      <p>Ready to try Kawaii? It's free!</p>
      <button>Sign Up Now</button>
    </div>

  return (
    <footer>
      <div className="FooterContainer">
        <div className="FooterCompany">
          <ul>
            <li id="Header">Company</li>
            <li>About</li>
            <li>Blog</li>
            <li>Jobs</li>
          </ul>
        </div>

        <div className="FooterResources">
          <ul>
            <li id="Header">Resources</li>
            <li>Guidelines</li>
            <li>Feedback</li>
            <li>Careers </li>
            <li>Terms of Service</li>
          </ul>
        </div>

        <div className="FooterConnect">
          <ul>
            <li id="Header">Connect</li>
            <li>Contact Us</li>
            <li>Press Information</li>
            <li>Health Education</li>
          </ul>
        </div>

        <div className="FooterDeveloper">
          <ul>
            <li id="Header">More</li>
            <li>Meet The Developer</li>
            <li>Testimonies</li>
          </ul>
        </div>
      </div>

      {displayRegister}

    </footer>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Footer)
