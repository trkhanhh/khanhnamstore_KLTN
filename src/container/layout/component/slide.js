import React from 'react'

const Slide = ({ image, currentIndex, index }) => {
  return (
    <div
      className={currentIndex === index ? 'mySlides' : 'mySlides hidden'}
      style={{ height: '100%' }}
    >
      <div className="numbertext">
        {index + 1} / {currentIndex + 1}
      </div>
      <img
        src={image}
        style={{ width: '100%', height: '100%' }}
        alt={`Image ${index + 1}`}
        className="object-cover"
      />
    </div>
  )
}

export default Slide
