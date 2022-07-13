import React, { useEffect, useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import styles from './Modal.module.css'

export const Modal = ({ isOpen, onCloseModal, title, children }) => {
  const backgroundRef = useRef()

  const _closeModal = (e) => {
    if (e.target === e.currentTarget) {
      onCloseModal()
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

  return (
    <div
      ref={backgroundRef}
      className={`${styles.background} ${isOpen ? styles.visible : ''}`}
      onClick={_closeModal}
    >
      <div className={styles.modalContainer}>
        <header className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <IoClose
            className={styles.closeButton}
            onClick={onCloseModal} size={24}
          />
        </header>
        <div >{children}</div>
      </div>
    </div>
  )
}

export const useModal = (isDefaultOpen = false) => {
  const [isOpen, setIsOpen] = useState(isDefaultOpen)

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  return { isOpen, openModal, closeModal }
}