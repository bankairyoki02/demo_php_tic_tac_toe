import { useState, memo } from 'react';

// Memoized ResetButton component
const ResetButton = memo(({ onReset }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = () => {
    setIsLoading(true);
    
    // Add a small delay for better UX
    setTimeout(() => {
      onReset();
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="reset-form">
      <button 
        className="reset-btn" 
        onClick={handleReset}
        disabled={isLoading}
        aria-label="Start a new game"
      >
        {isLoading ? 'Resetting...' : 'New Game'}
      </button>
    </div>
  );
});

ResetButton.displayName = 'ResetButton';

export default ResetButton;