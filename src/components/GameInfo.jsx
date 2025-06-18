import { memo } from 'react';

// Memoized GameInfo component
const GameInfo = memo(({ currentPlayer, winner, gameOver }) => {
  return (
    <div className="game-info" role="status" aria-live="polite">
      {!gameOver ? (
        <p>Current Player: <span className="current-player">{currentPlayer}</span></p>
      ) : (
        <p className="game-result">
          {winner === 'tie' ? "It's a tie!" : `Player ${winner} wins!`}
        </p>
      )}
    </div>
  );
});

GameInfo.displayName = 'GameInfo';

export default GameInfo;