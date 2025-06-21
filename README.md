# 🐦 Flappy Bird Clone

A modern HTML5 Flappy Bird game built with Phaser 3, featuring responsive design and local score persistence.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Play%20Now-brightgreen)](https://gpavlov951.github.io/flappy-bird-udemy-course/game/)

## 🎮 Game Features

- **Classic Gameplay**: Navigate through pipes by clicking or tapping
- **Score Tracking**: Best scores saved locally in browser storage
- **Responsive Design**: Works on desktop and mobile devices
- **Pause Functionality**: Pause and resume gameplay
- **Retro Graphics**: Pixel-perfect sprites and animations

## 🚀 Quick Start

### Prerequisites
- Node.js (v12 or higher)
- npm

### Installation & Development

```bash
# Clone the repository
git clone https://github.com/gpavlov951/flappy-bird-udemy-course.git
cd flappy-bird-udemy-course

# Install dependencies
npm install

# Start development server
npm start
```

The game will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

## 🎯 How to Play

1. Click anywhere on the screen (or tap on mobile) to make the bird flap
2. Navigate through the green pipes without touching them
3. Try to achieve the highest score possible
4. Your best score is automatically saved and displayed

## 🛠️ Technical Stack

- **Game Engine**: Phaser 3.24.1
- **Build Tool**: Webpack 4
- **Language**: JavaScript (ES6+)
- **Styling**: CSS3

## 📁 Project Structure

```
├── src/
│   ├── scenes/          # Game scenes (menu, play, score, etc.)
│   ├── storage/         # Local storage utilities
│   └── utils/           # Helper functions
├── assets/              # Game sprites and images
├── game/                # Built game files
└── style/               # CSS stylesheets
```

## 🎓 Learning Resource

This project was created following the [Udemy Phaser Course](https://www.udemy.com/share/103KUA/), demonstrating practical game development concepts including:

- Game scene management
- Sprite animation and physics
- Collision detection
- Local storage integration
- Responsive game design

## 🤝 Contributing

Contributions are welcome! Here's how you can help improve the game:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes locally with `npm start`
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Ideas for Contributions
- 🎨 New sprites or visual effects
- 🔊 Sound effects and background music
- 🏆 Additional game modes or difficulty levels
- 📱 Enhanced mobile experience
- 🐛 Bug fixes and performance improvements
- 📚 Documentation improvements

### Code Style
- Use ES6+ JavaScript features
- Follow existing code structure and naming conventions
- Test your changes thoroughly before submitting

## 📜 License

This project is licensed under the ISC License.

---

**Enjoy the game!** 🎮
