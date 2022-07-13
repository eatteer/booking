import React, { useEffect, useRef, useState } from 'react'
import { IoChevronBack, IoChevronForward, IoClose } from 'react-icons/io5'
import styles from './Slider.module.css'

const Slider = ({ onCloseSlider, images, startIndex }) => {
  const backgroundRef = useRef()
  const [currentIndex, setCurrentIndex] = useState(startIndex)

  const _closeSlider = (event) => {
    if (event.target === event.currentTarget) {
      onCloseSlider()
    }
  }

  const _preventScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  useEffect(() => {
    const ref = backgroundRef.current
    ref.addEventListener('wheel', _preventScroll, { passive: false })
    ref.addEventListener('touchmove', _preventScroll, { passive: false })
    return () => {
      ref.removeEventListener('wheel', _preventScroll, { passive: false })
      ref.removeEventListener('touchmove', _preventScroll, { passive: false })
    }
  }, [])

  const __ = (position) => {
    setCurrentIndex(prev => {
      let nextIndex

      if (position === 'next') {
        nextIndex = prev + 1
      }

      if (position === 'prev') {
        nextIndex = prev - 1
      }

      if (images.length === nextIndex) {
        return 0
      }

      if (nextIndex === -1) {
        return images.length - 1
      }

      return nextIndex
    })
  }

  return (
    <div
      ref={backgroundRef}
      className={styles.background}
      onClick={_closeSlider}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <IoClose
            className={styles.closeButton}
            size={24}
            onClick={onCloseSlider}
          />
        </header>
        <div className={styles.images}>
          <button
            className={styles.arrow}
            onClick={() => __('prev')}
          >
            <IoChevronBack />
          </button>
          <div>
            <img className={styles.image} src={images[currentIndex]} alt="" />

          </div>
          <button
            className={styles.arrow}
            onClick={() => __('next')}
          >
            <IoChevronForward />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Slider