import React from 'react'
import { IoLogoGithub } from 'react-icons/io5'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.footer}>
        <p className={styles.developed}>
          Developed by
          <IoLogoGithub />
          <a href='https://github.com/eatteer'>eatteer</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer