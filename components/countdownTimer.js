import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from './useCountdown';

const ExpiredNotice = () => {
  return (
    <ShowCounter
        days={0}
        hours={0}
        minutes={0}
        seconds={0}
      />
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      <div
        rel="noopener noreferrer"
        className="countdown-link"
      >
        {/* <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
        <p>:</p> */}
        <DateTimeDisplay value={hours} type={'Hour'} isDanger={false} />
        
        <DateTimeDisplay value={minutes} type={'Minute'} isDanger={false} />
        
        <DateTimeDisplay value={seconds} type={'Second'} isDanger={false} />
      </div>
    </div>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } 
  else if(new Date().getTime() < Date.UTC(2023, 4, 21, 8, 0, 0))  {
    return <ExpiredNotice />;
  } 
   else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
