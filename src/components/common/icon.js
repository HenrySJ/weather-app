import React from 'react'

const icon = ({ icon }) => {
  return (
    <img
      src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
      alt="icon of current weather and sky conditions"
      srcSet=""
    />
  )
}

export default icon
