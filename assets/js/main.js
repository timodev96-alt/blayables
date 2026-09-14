(function renderGameGrid() {
  const grid = document.getElementById("game-grid");
  if (!grid || !window.GAMES) return;

  window.GAMES.forEach((game) => {
    const isSoon = game.status === "soon";
    const tag = isSoon ? "div" : "a";

    const card = document.createElement(tag);
    card.className = `cabinet cabinet--${game.accent}${isSoon ? " cabinet--soon" : ""}`;
    if (!isSoon) card.href = game.href;

    card.innerHTML = `
      <div class="cabinet__marquee"></div>
      <div class="cabinet__screen">
        <h2 class="cabinet__title">${game.title}</h2>
        <p class="cabinet__blurb">${game.blurb}</p>
        <div class="cabinet__meta">
          <span>${game.players}</span>
          <span class="cabinet__cta">${isSoon ? "coming soon" :""}</span>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
})();
