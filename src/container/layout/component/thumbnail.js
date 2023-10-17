import React from 'react'

const Thumbnail = ({ image, currentIndex, index }) => {
  return (
    <div className="column" style={{ width: '100%', marginBottom: '19px' }}>
      <img
        className={`demo ${
          currentIndex === index ? 'active' : ''
        } object-cover `}
        src={image}
        alt={`Thumbnail ${index + 1}`}
      />
    </div>
  )
}

export default Thumbnail
