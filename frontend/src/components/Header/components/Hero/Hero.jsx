import { Link } from 'react-router-dom'
import styles from './Hero.module.css'

const Hero = () => {
  return (
    <div className={styles.container}>
      <h1>A lifetime of discounts? It's Genius</h1>
      <p>Get rewarded for your travels - Unlock instant savings of 10% or more with a free Booking account</p>
      <Link to='/login'>
        <button className="button light">Login</button>
      </Link>
    </div>
  )
}

export default Hero