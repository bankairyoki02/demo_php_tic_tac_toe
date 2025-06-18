import { useState, useCallback, useMemo } from 'react';

// Game utility functions
const GameUtils = {
  checkWinner: (board) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const pattern of winPatterns) {
      if (board[pattern[0]] !== '' &&
          board[pattern[0]] === board[pattern[1]] &&
          board[pattern[1]] === board[pattern[2]]) {
        return board[pattern[0]];
      }
    }

    return null;
  },

  isBoardFull: (board) => {
    return !board.includes('');
  },

  getEmptyCells: (board) => {
    return board.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
  }
};

// Custom hook for game state management (React 18 pattern)
export const useGameState = () => {
  const [gameState, setGameState] = useState({
    board: Array(9).fill(''),
    currentPlayer: 'X',
    gameOver: false,
    winner: null
  });

  // Memoized game status calculations
  const gameStatus = useMemo(() => {
    const winner = GameUtils.checkWinner(gameState.board);
    const isFull = GameUtils.isBoardFull(gameState.board);
    const isGameOver = winner !== null || isFull;

    return {
      winner,
      isFull,
      isGameOver,
      isDraw: isFull && !winner
    };
  }, [gameState.board]);

  // Handle cell click with automatic batching (React 18 feature)
  const makeMove = useCallback((position) => {
    if (gameState.gameOver || gameState.board[position] !== '') {
      return false;
    }

    setGameState(prevState => {
      const newBoard = [...prevState.board];
      newBoard[position] = prevState.currentPlayer;

      const winner = GameUtils.checkWinner(newBoard);
      const isFull = GameUtils.isBoardFull(newBoard);

      return {
        board: newBoard,
        currentPlayer: winner || isFull ? prevState.currentPlayer : (prevState.currentPlayer === 'X' ? 'O' : 'X'),
        gameOver: winner !== null || isFull,
        winner: winner || (isFull ? 'tie' : null)
      };
    });

    return true;
  }, [gameState.gameOver, gameState.board]);

  // Reset game
  const resetGame = useCallback(() => {
    setGameState({
      board: Array(9).fill(''),
      currentPlayer: 'X',
      gameOver: false,
      winner: null
    });
  }, []);

  // Get available moves (useful for AI implementation)
  const getAvailableMoves = useCallback(() => {
    return GameUtils.getEmptyCells(gameState.board);
  }, [gameState.board]);

  return {
    gameState,
    gameStatus,
    makeMove,
    resetGame,
    getAvailableMoves,
    GameUtils
  };
};

export default useGameState;