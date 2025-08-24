import React from 'react';
import './Counter.scss';

interface CounterProps {
  current: number;
  max: number;
}

const Counter: React.FC<CounterProps> = ({ current, max }) => {
  return (
    <span className="Counter">
      <span className="current">{current}</span>/{max}
    </span>
  );
};

export default Counter;
