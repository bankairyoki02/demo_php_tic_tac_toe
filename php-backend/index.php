<?php
session_start();

// Initialize game state
if (!isset($_SESSION['board'])) {
    $_SESSION['board'] = array_fill(0, 9, '');
    $_SESSION['currentPlayer'] = 'X';
    $_SESSION['gameOver'] = false;
    $_SESSION['winner'] = null;
}

// Handle game moves
if (isset($_POST['action']) && $_POST['action'] === 'move' && isset($_POST['position'])) {
    $position = intval($_POST['position']);

    if (!$_SESSION['gameOver'] && $_SESSION['board'][$position] === '') {
        $_SESSION['board'][$position] = $_SESSION['currentPlayer'];

        // Check for winner
        $winner = checkWinner($_SESSION['board']);
        if ($winner) {
            $_SESSION['winner'] = $winner;
            $_SESSION['gameOver'] = true;
        } elseif (!in_array('', $_SESSION['board'])) {
            $_SESSION['gameOver'] = true;
            $_SESSION['winner'] = 'tie';
        } else {
            $_SESSION['currentPlayer'] = ($_SESSION['currentPlayer'] === 'X') ? 'O' : 'X';
        }
    }
}

// Handle game reset
if (isset($_POST['action']) && $_POST['action'] === 'reset') {
    $_SESSION['board'] = array_fill(0, 9, '');
    $_SESSION['currentPlayer'] = 'X';
    $_SESSION['gameOver'] = false;
    $_SESSION['winner'] = null;
}

function checkWinner($board) {
    $winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    foreach ($winPatterns as $pattern) {
        if ($board[$pattern[0]] !== '' &&
            $board[$pattern[0]] === $board[$pattern[1]] &&
            $board[$pattern[1]] === $board[$pattern[2]]) {
            return $board[$pattern[0]];
        }
    }

    return null;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic Tac Toe - PHP</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Tic Tac Toe</h1>

        <div class="game-info">
            <?php if (!$_SESSION['gameOver']): ?>
                <p>Current Player: <span class="current-player"><?php echo $_SESSION['currentPlayer']; ?></span></p>
            <?php else: ?>
                <?php if ($_SESSION['winner'] === 'tie'): ?>
                    <p class="game-result">It's a tie!</p>
                <?php else: ?>
                    <p class="game-result">Player <?php echo $_SESSION['winner']; ?> wins!</p>
                <?php endif; ?>
            <?php endif; ?>
        </div>

        <div class="game-board">
            <?php for ($i = 0; $i < 9; $i++): ?>
                <form method="post" style="display: inline;">
                    <input type="hidden" name="action" value="move">
                    <input type="hidden" name="position" value="<?php echo $i; ?>">
                    <button
                        type="submit"
                        class="cell <?php echo $_SESSION['board'][$i] ? 'filled' : ''; ?>"
                        <?php echo ($_SESSION['gameOver'] || $_SESSION['board'][$i] !== '') ? 'disabled' : ''; ?>
                    >
                        <?php echo $_SESSION['board'][$i]; ?>
                    </button>
                </form>
            <?php endfor; ?>
        </div>

        <form method="post" class="reset-form">
            <input type="hidden" name="action" value="reset">
            <button type="submit" class="reset-btn">New Game</button>
        </form>
    </div>

    <script src="script.js"></script>
</body>
</html>
