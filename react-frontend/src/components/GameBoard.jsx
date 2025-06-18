import { memo } from 'react';
import Cell from './Cell';

// Memoized GameBoard component
const GameBoard = memo(({ board, onCellClick, gameOver }) => {
  return (
    <div className="game-board" role="grid" aria-label="Tic Tac Toe game board">
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={onCellClick}
          disabled={gameOver || cell !== ''}
          index={index}
        />
      ))}
    </div>
  );
});

GameBoard.displayName = 'GameBoard';

export default GameBoard;