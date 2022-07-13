import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

/* Services */
import { getStayDetail } from '../../services/stays'

/* Components */
import Layout from '../../components/Layout/Layout'
import Header from '../../components/Header/Header'
import Navbar from '../../components/Navbar/Navbar'
import Slider from '../../components/Slider/Slider'
import { Modal, useModal } from '../../components/Modal/Modal'
import Reservation from './components/Reservation/Reservation'
import Footer from '../../components/Footer/Footer'

/* Styles */
import styles from './StayDetail.module.css'

const StayDetail = () => {
  const { id } = useParams()
  const { data: stay } = useQuery(['stayDetail', id], () => getStayDetail(id))

  /* States */
  const [isOpenSlider, setIsOpenSlider] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  /* Hooks */
  const { isOpen, openModal, closeModal } = useModal()

  /* Handlers */
  const _setStartIndex = (index) => {
    setStartIndex(index)
    setIsOpenSlider(true)
  }

  const _closeSlider = () => {
    setIsOpenSlider(false)
  }

  return (
    <Layout>
      <Navbar />
      <Header type='list' />
      {stay && (
        <main className={styles.main}>

          {/* Images slider */}
          {isOpenSlider && (
            <Slider
              isOpen={isOpenSlider}
              onCloseSlider={_closeSlider}
              images={stay.images}
              startIndex={startIndex}
            />
          )}

          <header className={styles.header}>
            <h1>{stay.name}</h1>
            <h2>{stay.address.country} - {stay.address.city}</h2>
            <h3>{stay.address.location}</h3>
            {stay.address.distanceFrom && (
              <h4>{stay.address.distanceFrom}</h4>
            )}
            <button className='button primary' onClick={openModal}>See availability</button>
          </header>

          {/* Images */}
          <div className={styles.images}>
            {stay.images.map((image, index) => {
              const key = `${stay.name}${index}`
              return (
                <img
                  key={key}
                  className={styles.image}
                  src={image}
                  alt="Stay"
                  onClick={() => _setStartIndex(index)}
                />
              )
            })}
          </div>

          {/* Description */}
          <div className={styles.description}>
            <h2>{stay.title}</h2>
            <p>{stay.description}</p>
          </div>
        </main>
      )}

      {isOpen && (
        <Modal
          title='Select your room'
          isOpen={isOpen}
          onCloseModal={closeModal}
        >
          <Reservation stay={stay} />
        </Modal>
      )}

      <Footer />
    </Layout>
  )
}



export default StayDetail