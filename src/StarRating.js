import React, { useState } from 'react'
import Star from "./Star";

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px'
}

const startContainerStyle = {
  display: 'flex',
}

const textStyle = {
  lineHeight: '1',
  margin: '0'
}

const StarRating = ({maxRating = 5}) => {
  const [tempRating, setTempRating] = useState(0);
  const [rating, setRating] = useState(0);
  const handleRating = (i) => () => {
    setRating(i);
  }

  return (
    <div style={containerStyle}>
      <div style={startContainerStyle}>
        {Array.from(
          {length: maxRating},
          (_,i) =>
            (<Star key={i}
              onRate={handleRating(i + 1)}
              onHoverIn={() => setTempRating(i+1)}
              onHoverOut={()=> setTempRating(0)}
              full={tempRating ? tempRating >= i + 1 : rating >= i + 1 }
            />)
        )}
      </div>
      <p style={textStyle}>{tempRating || rating || ''}</p>
    </div>
  )
}

export default StarRating
