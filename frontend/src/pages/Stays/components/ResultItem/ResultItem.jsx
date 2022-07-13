import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import styles from './ResultItem.module.css'

const ResultItem = ({ stay }) => {
  const rating = Array.from(Array(5).keys())
  return (
    <div className={styles.card}>
      {/* Image */}
      <img
        className={styles.image}
        src={stay.images[0]}
        alt={stay.name}
      />
      {/* Details */}
      <div className={styles.details}>
        <h3 className={styles.name}>{stay.name}</h3>
        <p className={styles.address}>{stay.address.country} - {stay.address.city}</p>
        <p className={styles.location}>{stay.type} in {stay.address.location}</p>
        {stay.address.distanceFrom && (
          <p className={styles.distanceFrom}>{stay.address.distanceFrom}</p>
        )}
        <div>
          {rating.map((e, i) => {
            const key = `star${i}`
            if (i < stay.rating) return <AiFillStar key={key} />
            return <AiOutlineStar key={key} />
          })}
        </div>
          {/* {stay.featured && (
            <span className={styles.featured}>Featured</span>
          )} */}
        <p className={styles.cheapestPrice}>From ${stay.cheapestPrice}</p>
        <Link to={`/stays/${stay._id}`}>
          <button className={`button primary ${styles.button}`}>See details</button>
        </Link>
      </div>


    </div>
  )
}

export default ResultItem