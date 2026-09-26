# ProLingo: Next-Generation Interactive Programming Learning Platform (Web Edition)
**منصة برو لينجو التفاعلية لتعلم لغات البرمجة (نسخة الويب)**

![ProLingo](https://img.shields.io/badge/ProLingo-Web%20Platform-58cc02?style=for-the-badge&logo=duolingo&logoColor=white)
![Default Language](https://img.shields.io/badge/Default%20Language-English-1cb0f6?style=for-the-badge)
![Arabic Support](https://img.shields.io/badge/Bilingual-Arabic%20RTL-ff9600?style=for-the-badge)

ProLingo is a gamified web platform inspired by Duolingo, built specifically for learning computer programming languages through structured paths, interactive challenges, live code runners, and community leagues.

---

## 🌟 Key Features

### 1. 🗺️ Sinuous Learning Path (Duolingo Tree)
- **Stepping Stone Progression**: Zigzag level path with crowns, stars, and pulsing animations for your active lesson.
- **Unit Guidebooks**: Dedicated cheat sheets and quick reference notes for every unit.
- **Cheering Mascot (Byte the Owl)**: Interactive speech bubbles and guidance.

### 2. 💻 10 Programming Languages & Curricula
- 🐍 **Python**: Variables, F-Strings, Slicing, List Comprehensions, Dictionaries, OOP.
- 🟨 **JavaScript (ES6+)**: let/const, arrow functions, map/filter/reduce, promises, async/await.
- ⚡ **C++**: Boilerplate, standard I/O, pointers, dereferencing, references, memory management.
- 🔷 **TypeScript**: Interfaces, union types, optional properties, generics.
- 🐹 **Go (Golang)**: Package main, short declarations `:=`, zero-values, goroutines.
- 🦀 **Rust**: Mutability `let mut`, ownership, borrowing, `println!` macro.
- ☕ **Java**: Class structures, JVM main entry point, OOP principles.
- 🗄️ **SQL**: Relational queries, SELECT, WHERE, ORDER BY, aggregate functions.
- 🌐 **HTML5 & CSS**: Semantic elements, modern Flexbox centering, CSS Grid.
- 🎯 **C#**: .NET console output, auto-implemented properties, LINQ basics.

### 3. 🧩 Diverse Question Types
- **Multiple Choice Questions (MCQ)**: Conceptual and syntax choices with keyboard shortcuts (1, 2, 3, 4).
- **Output Predictions**: "What will this code print?" with tricky language edge cases.
- **Fill-in-the-Blank**: Clickable token chips bank that snap into code snippets.
- **Bug Hunter**: Click directly on the faulty code line to identify compilation and runtime errors.
- **Parson's Puzzle (Reorder)**: Click and swap code blocks to construct working algorithms.
- **Interactive Terminal Sandbox**: Complete real Python code and execute it live with test validation!
- **Matching Pairs**: Interactive term-to-concept pair matching.

### 4. 🎮 Full Gamification System
- **Hearts / Lives**: 5 hearts max. Lose one on mistakes. Refill with Gems or via **Heart Recovery Practice**!
- **Day Streak (🔥)**: Daily streak counter with streak freeze protection and 7-day visual history.
- **XP & Levels (⚡)**: Earn XP to climb leagues and unlock achievements.
- **Gems (💎)**: Currency to spend in the Shop on power-ups, themes, and skins.

### 5. 🏆 Leagues & Weekly Leaderboards
- **10 Leagues Progression**: Bronze 🥉 ➔ Silver 🥈 ➔ Gold 🥇 ➔ Sapphire 💎 ➔ Ruby 🔴 ➔ Emerald 🟢 ➔ Amethyst 🟣 ➔ Pearl ⚪ ➔ Obsidian ⚫ ➔ Diamond 👑!
- **Live Leaderboard**: 30 competitors per tier with dynamic XP updates.
- **Promotion & Demotion Zones**: Top 3 advance; bottom 5 drop.
- **Countdown Timer**: Displays remaining time until weekly league reset.

### 6. 🛒 The Shop (Store)
- 🧊 **Streak Freeze**: Protect your streak if you miss a day.
- ❤️ **Full Heart Refill**: Restore all 5 hearts instantly.
- ✨ **Super ProLingo (Unlimited Hearts)**: Learn at your own pace without limits.
- 🎲 **Double or Nothing**: Wager 50 gems on a 7-day streak to win 100 gems!
- 🦉 **Mascot Outfits**: Classic Byte, Cyberpunk Byte, Code Wizard Byte.
- 🎨 **Code Themes**: Monokai, Dracula, Synthwave.

### 7. 👤 Profile & Achievements Shelf
- Custom Avatars & Bios.
- Detailed statistics: Streak record, Accuracy %, Challenges solved, Top 3 finishes.
- Tiered Achievements: *Wildfire*, *Sage*, *Polyglot*, *Bug Hunter*.

### 8. 🌐 Bilingual Support (English Default + Arabic RTL)
- Default language is **English**.
- Instant 1-click switch to **العربية** with complete bidirectional layout (`dir="rtl"`).
- All questions, explanations, and UI labels are fully localized.

---

## 🚀 How to Run

### Method 1: Instant Browser Launch (Zero Dependencies)
Double-click:
```bash
open_in_browser.bat
```
Or open `index.html` in Chrome, Edge, Firefox, or Safari. It works 100% offline with `localStorage`!

### Method 2: Local Python Server & Sandbox Runner
Double-click:
```bash
start_server.bat
```
Or run in terminal:
```bash
python server.py
```
This automatically launches `http://localhost:8000` with the Python code execution sandbox and local data persistence in `data/user_profile.json`.

---

## 📁 Directory Structure
```
prolingo-web/
├── css/
│   └── prolingo.css         # Duolingo 3D styling, animations, dark/light themes & RTL
├── js/
│   ├── app.js               # Main application routing and UI renderer
│   ├── curriculum.js        # 10 languages with units, lessons, and questions
│   ├── i18n.js              # English (default) & Arabic localization dictionary
│   ├── lesson.js            # Interactive question runner and Duolingo bottom sheet
│   ├── sound.js             # Web Audio API synthesizer (no external mp3 files)
│   └── state.js             # User progress, hearts, streak, leagues, and quests
├── data/
│   └── user_profile.json    # Local progress storage
├── index.html               # Main SPA web application shell
├── server.py                # Python web server & code runner sandbox
├── start_server.bat         # 1-click server launcher
├── open_in_browser.bat      # 1-click direct browser launcher
└── README.md                # Documentation
```
