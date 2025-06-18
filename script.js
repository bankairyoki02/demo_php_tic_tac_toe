// Game state management (similar to React state)
class TicTacToeGame {
    constructor() {
        this.initializeEventListeners();
        this.addClickAnimations();
    }

    initializeEventListeners() {
        // Add click animations to cells
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', this.handleCellClick.bind(this));
        });

        // Add hover effects
        cells.forEach(cell => {
            cell.addEventListener('mouseenter', this.handleCellHover.bind(this));
            cell.addEventListener('mouseleave', this.handleCellLeave.bind(this));
        });

        // Add reset button animation
        const resetBtn = document.querySelector('.reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', this.handleResetClick.bind(this));
        }
    }

    handleCellClick(event) {
        const cell = event.target;
        if (!cell.disabled && cell.textContent.trim() === '') {
            // Add click animation
            cell.style.transform = 'scale(0.95)';
            setTimeout(() => {
                cell.style.transform = 'scale(1)';
            }, 100);
        }
    }

    handleCellHover(event) {
        const cell = event.target;
        if (!cell.disabled && cell.textContent.trim() === '') {
            cell.style.backgroundColor = '#e2e8f0';
        }
    }

    handleCellLeave(event) {
        const cell = event.target;
        if (!cell.disabled && cell.textContent.trim() === '') {
            cell.style.backgroundColor = '#f7fafc';
        }
    }

    handleResetClick(event) {
        // Add loading animation to reset button
        const btn = event.target;
        btn.textContent = 'Resetting...';
        btn.disabled = true;

        // Re-enable after form submission
        setTimeout(() => {
            btn.textContent = 'New Game';
            btn.disabled = false;
        }, 500);
    }

    addClickAnimations() {
        // Add entrance animation to the game board
        const gameBoard = document.querySelector('.game-board');
        if (gameBoard) {
            gameBoard.style.opacity = '0';
            gameBoard.style.transform = 'translateY(20px)';

            setTimeout(() => {
                gameBoard.style.transition = 'all 0.5s ease';
                gameBoard.style.opacity = '1';
                gameBoard.style.transform = 'translateY(0)';
            }, 100);
        }

        // Add stagger animation to cells
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
            cell.style.opacity = '0';
            cell.style.transform = 'scale(0.8)';

            setTimeout(() => {
                cell.style.transition = 'all 0.3s ease';
                cell.style.opacity = '1';
                cell.style.transform = 'scale(1)';
            }, 200 + (index * 50));
        });
    }

    // Method to get current game state (useful for React conversion)
    getCurrentGameState() {
        const cells = document.querySelectorAll('.cell');
        const board = Array.from(cells).map(cell => cell.textContent.trim());
        const currentPlayerElement = document.querySelector('.current-player');
        const gameResultElement = document.querySelector('.game-result');

        return {
            board,
            currentPlayer: currentPlayerElement ? currentPlayerElement.textContent : null,
            gameOver: !!gameResultElement,
            winner: gameResultElement ? gameResultElement.textContent : null
        };
    }

    // Method to update UI (similar to React component update)
    updateUI(gameState) {
        // This method structure will be helpful when converting to React
        console.log('Current game state:', gameState);
    }
}

// Initialize the game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const game = new TicTacToeGame();

    // Add some debugging info for development
    console.log('Tic Tac Toe Game initialized');
    console.log('Current game state:', game.getCurrentGameState());
});

// Utility functions that will be useful in React conversion
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

// Export for potential module use (helpful for React conversion)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TicTacToeGame, GameUtils };
}
