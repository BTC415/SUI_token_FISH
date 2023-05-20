import React from 'react';

const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div className={isDanger ? 'countdown danger' : 'countdown'}>
      <p>{value}</p>
      <br></br>
      <span>{type}</span>
    </div>
  );
};

export default DateTimeDisplay;
