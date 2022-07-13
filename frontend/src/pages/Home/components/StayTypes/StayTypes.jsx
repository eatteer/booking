import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getStayTypesCount } from '../../../../services/stays'
import { useSearchContext } from '../../../../context/SearchContext'
import styles from './StayTypes.module.css'
import { Oval } from 'react-loader-spinner'

const images = [
  "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
  "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
  "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
  "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
  "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
]

const StayTypes = () => {
  const { data: stays, isLoading } = useQuery('stayTypesCount', getStayTypesCount)

  const navigate = useNavigate()
  const { setType } = useSearchContext()

  const _navigateStays = (type) => {
    setType(type)
    navigate('/stays')
  }

  return (
    <div className={styles.container}>
      {isLoading && (
        <Oval
          height="42"
          width="42"
          color='grey'
          ariaLabel='loading'
        />
      )}
      {stays && stays.map((stay, index) => {
        const { type, count } = stay
        const key = `${type}${count}]`
        return (
          <div
            key={key}
            className={styles.card}
            onClick={() => _navigateStays(type)}
          >
            <img
              src={images[index]}
              alt='Featured property'
            />
            <div className={styles.overlay}></div>
            <div className={styles.details}>
              <h4>{type}</h4>
              <p>{count} stays</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StayTypes