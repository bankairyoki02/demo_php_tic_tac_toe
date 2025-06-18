import { useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import GameBoard from './components/GameBoard';
import GameInfo from './components/GameInfo';
import ResetButton from './components/ResetButton';
import './TicTacToe.css';

// Main TicTacToe Component using React 18 patterns
const TicTacToe = () => {
  // Use custom hook for game state management
  const { gameState, makeMove, resetGame } = useGameState();

  // Add entrance animations on component mount
  useEffect(() => {
    const gameBoard = document.querySelector('.game-board');
    const cells = document.querySelectorAll('.cell');

    if (gameBoard) {
      gameBoard.style.opacity = '0';
      gameBoard.style.transform = 'translateY(20px)';

      setTimeout(() => {
        gameBoard.style.transition = 'all 0.5s ease';
        gameBoard.style.opacity = '1';
        gameBoard.style.transform = 'translateY(0)';
      }, 100);
    }

    // Stagger animation for cells
    cells.forEach((cell, index) => {
      cell.style.opacity = '0';
      cell.style.transform = 'scale(0.8)';

      setTimeout(() => {
        cell.style.transition = 'all 0.3s ease';
        cell.style.opacity = '1';
        cell.style.transform = 'scale(1)';
      }, 200 + (index * 50));
    });
  }, []);

  return (
    <div className="container" role="main">
      <h1>Tic Tac Toe</h1>
      
      <GameInfo 
        currentPlayer={gameState.currentPlayer}
        winner={gameState.winner}
        gameOver={gameState.gameOver}
      />

      <GameBoard
        board={gameState.board}
        onCellClick={makeMove}
        gameOver={gameState.gameOver}
      />

      <ResetButton onReset={resetGame} />
    </div>
  );
};

export default TicTacToe;