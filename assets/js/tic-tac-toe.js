(function () {
  const boardEl = document.getElementById("ttt-board");
  const statusEl = document.getElementById("ttt-status");
  const scoreEl = document.getElementById("ttt-score");
  const resetBtn = document.getElementById("ttt-reset");
  const resetScoreBtn = document.getElementById("ttt-reset-score");

  const WIN_LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  let board = Array(9).fill(null);
  let current = "X";
  let over = false;
  const score = { X: 0, O: 0, draws: 0 };

  function buildBoard() {
    boardEl.innerHTML = "";
    board.forEach((mark, i) => {
      const cell = document.createElement("button");
      cell.className = "ttt-cell";
      cell.setAttribute("role", "gridcell");
      cell.setAttribute("aria-label", `Cell ${i + 1}`);
      cell.dataset.index = i;
      if (mark) {
        cell.textContent = mark;
        cell.dataset.mark = mark;
        cell.disabled = true;
      }
      cell.addEventListener("click", () => handleMove(i));
      boardEl.appendChild(cell);
    });
  }

  function handleMove(index) {
    if (over || board[index]) return;
    board[index] = current;

    const winLine = WIN_LINES.find((line) =>
      line.every((i) => board[i] === current)
    );

    if (winLine) {
      over = true;
      score[current] += 1;
      statusEl.textContent = `${current} wins this round`;
      highlightWin(winLine);
    } else if (board.every(Boolean)) {
      over = true;
      score.draws += 1;
      statusEl.textContent = "It's a draw";
    } else {
      current = current === "X" ? "O" : "X";
      statusEl.textContent = `${current}'s turn`;
    }

    buildBoard();
    updateScore();
    if (over) disableAll();
  }

  function highlightWin(line) {
    // Re-render happens right after; mark cells so we can style post-render.
    requestAnimationFrame(() => {
      line.forEach((i) => {
        const cell = boardEl.querySelector(`[data-index="${i}"]`);
        if (cell) cell.style.borderColor = "var(--yellow)";
      });
    });
  }

  function disableAll() {
    boardEl.querySelectorAll(".ttt-cell").forEach((c) => (c.disabled = true));
  }

  function updateScore() {
    scoreEl.textContent = `X: ${score.X} · O: ${score.O} · Draws: ${score.draws}`;
  }

  function newRound() {
    board = Array(9).fill(null);
    current = "X";
    over = false;
    statusEl.textContent = "X goes first";
    buildBoard();
  }

  resetBtn.addEventListener("click", newRound);
  resetScoreBtn.addEventListener("click", () => {
    score.X = 0;
    score.O = 0;
    score.draws = 0;
    updateScore();
    newRound();
  });

  buildBoard();
  updateScore();
})();
