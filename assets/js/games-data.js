/**
 * Game registry
 * ---------------------------------------------------
 * To add a new game to the home page later:
 *   1. Build its page under /games/your-game.html
 *   2. Add one entry below.
 * That's it — the home page renders this list automatically.
 */
const GAMES = [
  {
    slug: "tic-tac-toe",
    title: "Tic-Tac-Toe",
    blurb: "Two players, one grid, three in a row wins.",
    href: "games/tic-tac-toe.html",
    players: "1–2 players",
    accent: "yellow",
    status: "ready"
  },
  {
    slug: "guess-the-word",
    title: "Guess the Word",
    blurb: "Reveal the hidden word one letter at a time.",
    href: "games/guess-the-word.html",
    players: "1 player",
    accent: "coral",
    status: "ready"
  },
  {
    slug: "coming-soon",
    title: "Next cabinet",
    blurb: "A new game gets plugged in here soon.",
    href: null,
    players: "TBD",
    accent: "muted",
    status: "soon"
  }
];

// Expose for use in main.js (kept as a plain global to avoid a build step)
window.GAMES = GAMES;
