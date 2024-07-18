import React, { useState, useEffect } from "react";

const CountUp = ({ start, end, duration, suffix = "" }) => {
  const [currentNumber, setCurrentNumber] = useState(start);

  useEffect(() => {
    const increment = (end - start) / (duration / 100);
    const timer = setInterval(() => {
      setCurrentNumber((prevNumber) => {
        const updatedNumber = prevNumber + increment;
        if (updatedNumber >= end) {
          clearInterval(timer);
          return end;
        }
        return updatedNumber;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [start, end, duration]);

  return <h2>{Math.floor(currentNumber)}{suffix}</h2>;
};

export default CountUp;
