import React, { useState } from 'react'
import { IoAdd, IoRemove } from 'react-icons/io5'
import './Quantifier.css'

const Quantifier = (props) => {
  const { quantity, increment, decrement } = props
  return (
    <div className="quantifier">
      <button className='quantifier__button' type='button' onClick={decrement}>
        <IoRemove />
      </button>
      <p className='quantifier__value'>{quantity}</p>
      <button className='quantifier__button' type='button' onClick={increment}>
        <IoAdd />
      </button>
    </div>
  )
}

export const useQuantifier = (startValue, minValue) => {
  const [quantity, setQuantity] = useState(startValue)

  const increment = () => {
    setQuantity(prev => prev + 1)
  }
  const decrement = () => {
    setQuantity(prev => {
      const newValue = prev - 1
      if (newValue <= minValue) return minValue
      return newValue
    })
  }

  return { quantity, increment, decrement }
}

export default Quantifier