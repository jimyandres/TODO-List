import React from 'react';
import './FetchError.css';

const FetchError = ({ message, onRetry }) => (
  <div className="FetchError">
    <p>Could not fetch todos. {message}</p>
    <button onClick={onRetry} className="btn FetchError">Retry</button>
  </div>
);

export default FetchError;
