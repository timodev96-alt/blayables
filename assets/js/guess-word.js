(function () {
  const WORDS = [
    { word: "PYTHON", category: "Programming" },
    { word: "GALAXY", category: "Space" },
    { word: "PUZZLE", category: "Games" },
    { word: "CANYON", category: "Geography" },
    { word: "ORCHID", category: "Plants" },
    { word: "VOYAGE", category: "Travel" },
    { word: "CIRCUIT", category: "Electronics" },
    { word: "GLACIER", category: "Geography" },
    { word: "RHYTHM", category: "Music" },
    { word: "COMPASS", category: "Tools" },
  ];

  const MAX_LIVES = 6;

  const wordEl = document.getElementById("gw-word");
  const keyboardEl = document.getElementById("gw-keyboard");
  const livesEl = document.getElementById("gw-lives");
  const messageEl = document.getElementById("gw-message");
  const categoryEl = document.getElementById("gw-category");
  const winsEl = document.getElementById("gw-wins");
  const nextBtn = document.getElementById("gw-next");

  let current = null;
  let guessed = new Set();
  let lives = MAX_LIVES;
  let over = false;
  let wins = 0;

  function pickWord() {
    const entry = WORDS[Math.floor(Math.random() * WORDS.length)];
    current = entry;
    guessed = new Set();
    lives = MAX_LIVES;
    over = false;
    categoryEl.textContent = `Category: ${entry.category}`;
    messageEl.textContent = "";
    messageEl.className = "gw-message";
    render();
    buildKeyboard();
  }

  function render() {
    wordEl.innerHTML = "";
    current.word.split("").forEach((letter) => {
      const span = document.createElement("span");
      const revealed = guessed.has(letter);
      span.className = "gw-letter" + (revealed ? " gw-letter--filled" : "");
      span.textContent = revealed ? letter : "";
      wordEl.appendChild(span);
    });

    livesEl.innerHTML = "";
    for (let i = 0; i < MAX_LIVES; i++) {
      const dot = document.createElement("span");
      dot.className = "gw-life" + (i >= lives ? " gw-life--lost" : "");
      livesEl.appendChild(dot);
    }
  }

  function buildKeyboard() {
    keyboardEl.innerHTML = "";
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((letter) => {
      const key = document.createElement("button");
      key.className = "gw-key";
      key.textContent = letter;
      key.addEventListener("click", () => handleGuess(letter, key));
      keyboardEl.appendChild(key);
    });
  }

  function handleGuess(letter, keyEl) {
    if (over || guessed.has(letter)) return;
    guessed.add(letter);
    keyEl.disabled = true;

    if (current.word.includes(letter)) {
      keyEl.classList.add("gw-key--correct");
    } else {
      keyEl.classList.add("gw-key--wrong");
      lives -= 1;
    }

    render();
    checkEnd();
  }

  function checkEnd() {
    const solved = current.word.split("").every((l) => guessed.has(l));

    if (solved) {
      over = true;
      wins += 1;
      winsEl.textContent = `Words solved: ${wins}`;
      messageEl.textContent = "Solved it! Nicely done.";
      messageEl.className = "gw-message gw-message--win";
      disableKeyboard();
    } else if (lives <= 0) {
      over = true;
      messageEl.textContent = `Out of tries — the word was ${current.word}.`;
      messageEl.className = "gw-message gw-message--lose";
      disableKeyboard();
      revealAll();
    }
  }

  function revealAll() {
    current.word.split("").forEach((l) => guessed.add(l));
    render();
  }

  function disableKeyboard() {
    keyboardEl.querySelectorAll(".gw-key").forEach((k) => (k.disabled = true));
  }

  nextBtn.addEventListener("click", pickWord);

  pickWord();
})();
