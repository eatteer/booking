import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import styles from './Navbar.module.css'

const Navbar = () => {
  const location = useLocation()

  const { accessToken, setAccessToken } = useAuthContext()

  return (
    <nav className={styles.container}>
      <div className={styles.navbar}>
        <Link className={styles.logo} to='/'>
          <h1 >Booking</h1>
        </Link>
        <div className={styles.actions}>
          {accessToken
            ? <button className="button light" onClick={() => setAccessToken(null)}>Logout</button>
            : <>
              <Link to='/login' state={{ from: location }}>
                <button className="button light">Login</button>
              </Link>
              <Link to='/register' state={{ from: location }}>
                <button className="button light">Register</button>
              </Link>
            </>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar