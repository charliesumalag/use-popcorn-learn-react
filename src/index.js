import React from 'react';
import ReactDOM from 'react-dom/client';
import StarRating from "./StarRating";
import StarRatingVersionOne from './StarRatingVersionOne';
import ChallengeTextExpander from './ChallengeTextExpander';
// import './index.css';
// import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
      {/* <App /> */}
      {/* <StarRating maxRating={6} /> */}
      {/* <StarRatingVersionOne /> */}
      <ChallengeTextExpander />
    </div>

);
