import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";

const StarRatingVersionOne = ({rateCount = 5}) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const stars = [];
    for (let index = 1; index <= rateCount; index++) {
        stars.push(
            <span
                key={index}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(0)}>
                <FaStar size={30} color={(hover || rating) >= index ? "gold" : 'black' } />
            </span>
        )

    }

  return (
    <div>
        {stars}
        <p>{hover ? hover : rating}</p>
    </div>
  )
}

export default StarRatingVersionOne
