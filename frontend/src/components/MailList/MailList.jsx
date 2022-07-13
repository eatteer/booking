import React from 'react'
import styles from './MailList.module.css'

const MailList = () => {
  return (
    <div className={styles.container}>
      <h2>Save time, save money</h2>
      <p>Subscribe and we'll send the best deals to you</p>
      <form className={styles.form}>
        <input className='input secondary-focus' type='email' placeholder='Your email' />
        <button className='button light'>Subscribe</button>
      </form>
    </div>
  )
}


export default MailList