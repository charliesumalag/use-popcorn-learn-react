import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import Star from "./Star";

// Styles
const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  }



  const startContainerStyle = {
    display: 'flex',
  }


const StarRating = ({ maxRating = 5, color = '#fcc419', size = 48, onSetRating  }) => {
  const [tempRating, setTempRating] = useState(0);
    const [rating, setRating] = useState(0);
    const handleRating = (i) => () => {
      setRating(i);
      onSetRating(i);
    }
    const textStyle = {
      lineHeight: '1',
      margin: '0',
      color,
      fontSize: `${size / 1.5}px `,
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
                color={color}
                size={size}
              />)
          )}
        </div>
        <p style={textStyle}>{tempRating || rating || ''}</p>
      </div>
    )
}

export default StarRating
