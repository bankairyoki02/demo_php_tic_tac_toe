import { useState, memo } from 'react';

// Memoized Cell component for better performance (React 18 optimization)
const Cell = memo(({ value, onClick, disabled, index }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!disabled && value === '') {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 100);
      onClick(index);
    }
  };

  return (
    <button
      className={`cell ${value ? 'filled' : ''} ${isAnimating ? 'animating' : ''}`}
      onClick={handleClick}
      disabled={disabled}
      style={{
        transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
        transition: 'transform 0.1s ease'
      }}
      aria-label={`Cell ${index + 1}, ${value || 'empty'}`}
    >
      {value}
    </button>
  );
});

Cell.displayName = 'Cell';

export default Cell;