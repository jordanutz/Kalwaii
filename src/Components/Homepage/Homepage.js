import React from 'react'
import './Homepage.scss'
import {Carousel} from 'react-bootstrap'

// Images
import Laptop from '../../assets/laptop.svg'
import Tree from '../../assets/tree.svg'
import Bananas from '../../assets/bananas.svg'
import Strawberry from '../../assets/strawberry.svg'
import Jigglypuff from '../../assets/Jigglypuff.png'
import Cherry from '../../assets/Cherry.svg'
import Peach from '../../assets/Peach.svg'
import LifeScore from './assets/lifescore.svg'
import Recipes from './assets/recipes.svg'
import Bottle from './assets/bottle.svg'
import Scale from './assets/scale.svg'
import Sync from './assets/sync.svg'

const Homepage = (props) => {

  return (
    <div className="Homepage">
      <div className="HomepageHeader">
        <h1>It's time to ditch MyFitnessPal.</h1>
        <p>Finding the right diet or exercise isn’t rocket science. Actually taking the right action can seem like it. With Kalwaii, take control of your goals: track your calories, create customized meal plans that suit your needs using our food database, and log your progress. Simplify your life. </p>
        <h2>Superior Features</h2>
        <div className="HomepageCarousel">
          <Carousel controls={false}>
            <Carousel.Item>
              <div className="CarouselHeader">
                <img id="Width" src={Bottle} alt="Bottle Icon" />
                <h3>3 Week Weight Loss Program</h3>
              </div>
              <h4>Kickstart some serious weight loss with our 3 Week Weight Loss Plan, complete with shopping list and meal planner.</h4>
            </Carousel.Item>
            <Carousel.Item>
              <div className="CarouselHeader">
                <img src={Scale} alt="Scale Icon" />
                <h3>Macro & Net Carb Tracking</h3>
              </div>
              <h4>No carb need ever go unchecked again with our expert tracking functions.</h4>
            </Carousel.Item>
            <Carousel.Item>
              <div className="CarouselHeader">
                <img src={Recipes} alt="Recipes Icon" />
                <h3>1000+ Healthy Recipes</h3>
              </div>
              <h4>Mmmmmmmmm - we’ve got delicious recipes for any taste and every reason! And they’re good. REALLY good!</h4>
            </Carousel.Item>
            <Carousel.Item>
              <div className="CarouselHeader">
                <img id="Width" src={LifeScore} alt="Life Score Icon" />
                <h3>Life Score</h3>
              </div>
              <h4>To help you keep your eyes on the prize, you’ll get insights and advice every step of the way - you’re never alone with Kawaii.</h4>
            </Carousel.Item>
            <Carousel.Item>
              <div className="CarouselHeader">
                <img id="Width" src={Sync} alt="Sync Icon" />
                <h3>Sync with Health Apps</h3>
              </div>
              <h4>Kawaii speaks with most other leading health apps, meaning you can enjoy a smoother road to health.</h4>
            </Carousel.Item>
          </Carousel>
        </div>
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
