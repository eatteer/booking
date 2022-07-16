import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getStaysCountByCity } from '../../../../services/stays'
import { useSearchContext } from '../../../../context/SearchContext'
import { Oval } from 'react-loader-spinner'
import styles from './FeaturedCities.module.css'

const images = [
  "https://www.semana.com/resizer/2noyXlnQe0xA-d-VdDa6-acgYhk=/1200x675/filters:format(jpg):quality(50)//cloudfront-us-east-1.images.arcpublishing.com/semana/KI2722K53VBFVN7BR7OMCXSPWM.jpg",
  "https://viajes.nationalgeographic.com.es/medio/2017/02/09/shutterstock-302415089_6b607cdb.jpg",
  "https://images.unsplash.com/photo-1519197924294-4ba991a11128?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2Fyc2F3JTJDJTIwcG9sYW5kfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
]

const FeaturedCities = () => {
  const { data: stays, isLoading } = useQuery('staysCountByCity', getStaysCountByCity)

  const { setDestination } = useSearchContext()
  const navigate = useNavigate()

  const _navigateStays = (destination) => {
    setDestination(destination)
    navigate('/stays')
  }

  return (

    <div className={styles.container}>
      {isLoading && [...Array(3).keys()].map(_ => {
        return (
          <div className={styles.skeleton}></div>
        )
      })}
      {stays && stays.map((stay, index) => {
        const { city, count } = stay
        const key = `${city}${count}]`
        return (
          <div
            key={key}
            className={styles.card}
            onClick={() => _navigateStays(city)}
          >
            <img
              src={images[index]}
              alt={city}
            />
            <div className={styles.overlay}></div>
            <div className={styles.details}>
              <h4>{city}</h4>
              <p>{count} stays</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}


export default FeaturedCities