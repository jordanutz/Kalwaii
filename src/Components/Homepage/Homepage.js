import React from 'react'
import './Homepage.scss'

// Images
import Laptop from '../../assets/laptop.svg'
import Tree from '../../assets/tree.svg'
import Bananas from '../../assets/bananas.svg'
import Strawberry from '../../assets/strawberry.svg'
import Jigglypuff from '../../assets/Jigglypuff.png'
import Cherry from '../../assets/Cherry.svg'
import Peach from '../../assets/Peach.svg'

const Homepage = (props) => {
  return (
    <div className="Homepage">
      <div className="HomepageHeader">
        <h1>It's time to ditch MyFitnessPal.</h1>
        <p>Finding the right diet or exercise isn’t rocket science. Actually taking the right action can seem like it. With Kalwaii, take control of your goals: track your calories, create customized meal plans that suit your needs using our food database, and log your progress. Simplify your life. </p>
        <h2>Superior Features</h2>
      </div>
      <div className="HomepageMain">
        <img id="Laptop" src={Laptop} alt="Laptop Icon" />
        <img id="Tree" src={Tree} alt="Tree Icon" />
        <img id="Bananas" src={Bananas} alt="Banana Icon" />
        <img id="Strawberry" src={Strawberry} alt="Strawberry Icon" />
        <img id="Jigglypuff" src={Jigglypuff} alt="Jigglypuff Icon" />
        <img id="Cherry" src={Cherry} alt="Cherry Icon" />
        <img id="Peach" src={Peach} alt="Peach Icon" />
        <div id="Border"></div>
      </div>
    </div>
  )
}

export default Homepage
