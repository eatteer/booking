import React from 'react'
import { Oval } from 'react-loader-spinner'

const Loader = () => {
  return (
    <Oval
      height="42"
      width="42"
      color='grey'
      ariaLabel='loading'
    />
  )
}

export default Loader