# Tic-Tac-Toe Game - PHP Backend & React Frontend

This repository contains two separate implementations of a tic-tac-toe game:

1. **PHP Backend** - Server-side implementation using PHP sessions
2. **React Frontend** - Modern client-side implementation using React 18

Both implementations are now properly separated into their own directories for better organization and development workflow.

## 📁 Project Structure

```
demo_php_tic_tac_toe/
├── php-backend/            # PHP Implementation
│   ├── index.php          # Main PHP game logic
│   ├── styles.css         # CSS for PHP version
│   ├── script.js          # JavaScript for PHP version
│   ├── demo.html          # HTML demo file
│   └── README.md          # PHP backend documentation
├── react-frontend/        # React Implementation
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── App.jsx        # Main App component
│   │   └── TicTacToe.jsx  # Main game component
│   ├── public/            # Static assets
│   ├── package.json       # Node.js dependencies
│   ├── vite.config.js     # Vite configuration
│   └── README.md          # React frontend documentation
├── README.md              # This file
├── MIGRATION_GUIDE.md     # Migration documentation
└── MODERNIZATION_SUMMARY.md # Modernization details
```

## 🚀 Quick Start

### PHP Backend
```bash
cd php-backend
php -S localhost:8000
# Open http://localhost:8000 in your browser
```

### React Frontend
```bash
cd react-frontend
npm install
npm run dev
# Open http://localhost:12000 in your browser
```

## 🛠️ Technology Stack

### PHP Backend
- **PHP** - Server-side logic with sessions
- **HTML/CSS** - Traditional web interface
- **JavaScript** - Client-side enhancements

### React Frontend
- **React 18** - Latest React with concurrent features
- **Vite** - Next generation frontend tooling
- **JavaScript ES6+** - Modern JavaScript features
- **CSS3** - Custom CSS with animations and responsive design
- **ESLint** - Code linting and quality assurance

## 🔄 Comparison: PHP vs React

Both implementations provide the same tic-tac-toe game functionality but with different approaches:

### PHP Backend
- **Server-side logic** using PHP sessions
- **Form-based interactions** with page reloads
- **Traditional web development** approach
- **Simple deployment** - just needs PHP server

### React Frontend
- **Client-side logic** using React state
- **Instant interactions** without page reloads
- **Modern component-based** architecture
- **Advanced tooling** with Vite, ESLint, and hot reload

## 📖 Documentation

For detailed information about each implementation:

- **PHP Backend**: See [php-backend/README.md](php-backend/README.md)
- **React Frontend**: See [react-frontend/README.md](react-frontend/README.md)
- **Migration Guide**: See [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md)
- **Modernization Summary**: See [MODERNIZATION_SUMMARY.md](MODERNIZATION_SUMMARY.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**Two implementations, one game - choose your preferred technology stack!**