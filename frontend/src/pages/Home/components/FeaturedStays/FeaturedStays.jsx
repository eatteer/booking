import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getFeaturedStays } from '../../../../services/stays'
import { Oval } from 'react-loader-spinner'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import styles from './FeaturedStays.module.css'

const FeaturedStays = () => {
  const rating = Array.from(Array(5).keys())
  const { data: stays, isLoading } = useQuery('featuredStays', getFeaturedStays)

  const navigate = useNavigate()

  const _navigateToDetails = (id) => {
    navigate(`/stays/${id}`)
  }

  return (
    <div className={styles.container}>
      {isLoading && [...Array(4).keys()].map(_ => {
        return (
          <div className={styles.skeleton}></div>
        )
      })}
      {stays && stays.map(stay => {
        return (
          <div
            key={stay._id}
            className={styles.card}
            onClick={() => _navigateToDetails(stay._id)}
          >
            <div className={styles.imageContainer}>
              <img
                src={stay.images[0]}
                alt={stay.name}
              />
            </div>
            <div className={styles.details}>
              <h2>{stay.name}</h2>
              <h3 >{stay.address.country} - {stay.address.city}</h3>
              <h4 >From ${stay.cheapestPrice}</h4>
              <div>
                {rating.map((e, i) => {
                  const key = `star${i}`
                  if (i < stay.rating) return <AiFillStar key={key} />
                  return <AiOutlineStar key={key} />
                })}
              </div>
            </div>

          </div>
        )
      })}
    </div>
  )
}



export default FeaturedStays