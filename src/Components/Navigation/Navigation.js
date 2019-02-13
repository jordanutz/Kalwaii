import React, {Component} from 'react'
import './Navigation.scss'

class Navigation extends Component {
  render () {
    return (
      <header>
        <nav>
          <ul>
            <h1>Kalwaii</h1>
            <li>Features</li>
            <li>Articles</li>
            <li>Blog</li>
          </ul>
          <ul>
            <button>Login</button>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Navigation
