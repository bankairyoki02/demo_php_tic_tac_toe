# PHP Tic Tac Toe Game

A modern, responsive tic-tac-toe game built with PHP, HTML, CSS, and JavaScript. This application is structured to be easily convertible to React.js.

## Features

- 🎮 Interactive 3x3 tic-tac-toe game
- 🎨 Modern, responsive design with animations
- 📱 Mobile-friendly interface
- 🔄 Game state management using PHP sessions
- ✨ Smooth CSS animations and transitions
- 🧩 Modular code structure for easy React conversion

## Requirements

- PHP 7.4 or higher
- Web server (Apache, Nginx, or PHP built-in server)
- Modern web browser

## Setup and Installation

1. **Clone or download the files** to your web server directory
2. **Start a local server** (choose one option):

   ```bash
   # Option 1: Using PHP built-in server
   php -S localhost:8000

   # Option 2: Using Apache/Nginx
   # Place files in your web root (htdocs, www, etc.)
   ```

3. **Open in browser**: Navigate to `http://localhost:8000` (or your server URL)

## File Structure

```
php-tictactoe/
├── index.php       # Main game logic and HTML structure
├── styles.css      # CSS styling and animations
├── script.js       # Client-side JavaScript enhancements
└── README.md       # This file
```

## Game Logic

### PHP Backend (`index.php`)
- Session-based state management
- Server-side game logic and validation
- Winner detection algorithm
- Clean separation between logic and presentation

### CSS Styling (`styles.css`)
- Modern gradient background
- Grid-based game board layout
- Hover and click animations
- Responsive design for mobile devices
- CSS animations for game feedback

### JavaScript Enhancements (`script.js`)
- Client-side animations and interactions
- Game state utilities (prepared for React conversion)
- Event handling for enhanced UX
- Modular class structure

## Converting to React

This application is structured to make React conversion straightforward:

### 1. State Management
The PHP session state can be converted to React state:

```javascript
// Current PHP state structure:
$_SESSION['board'] = array_fill(0, 9, '');
$_SESSION['currentPlayer'] = 'X';
$_SESSION['gameOver'] = false;
$_SESSION['winner'] = null;

// React equivalent:
const [gameState, setGameState] = useState({
  board: Array(9).fill(''),
  currentPlayer: 'X',
  gameOver: false,
  winner: null
});
```

### 2. Component Structure
Break down into React components:

```javascript
// Main App component
function TicTacToe() {
  // Game state and logic here
}

// Game board component
function GameBoard({ board, onCellClick, gameOver }) {
  // Board rendering logic
}

// Individual cell component
function Cell({ value, onClick, disabled }) {
  // Cell rendering and click handling
}

// Game info component
function GameInfo({ currentPlayer, winner, gameOver }) {
  // Display current player or winner
}
```

### 3. Game Logic
The `GameUtils` object in `script.js` contains reusable functions:
- `checkWinner(board)` - Winner detection
- `isBoardFull(board)` - Check for tie condition
- `getEmptyCells(board)` - Get available moves

### 4. Styling
The CSS can be converted to:
- CSS Modules
- Styled Components
- Tailwind CSS classes

## Development Notes

### PHP Features Used
- Sessions for state persistence
- Form handling with POST requests
- Template rendering with embedded PHP
- Clean separation of logic and presentation

### JavaScript Features
- ES6 Classes
- Event listeners
- DOM manipulation
- Utility functions for game logic

### CSS Features
- Grid layout for game board
- CSS custom properties (can be easily converted to CSS-in-JS)
- Keyframe animations
- Responsive design with media queries

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues, feature requests, and pull requests to improve the game!
