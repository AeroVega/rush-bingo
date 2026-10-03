const FREE_SPACE = "FREE SPACE — Someone air-drums.";
let current = "connie";
let lastCelebrated = false;

function marks() {
  try { return new Set(JSON.parse(localStorage.getItem("rush-bingo-" + current)) || []); }
  catch (error) { return new Set(); }
}
function save(set) { localStorage.setItem("rush-bingo-" + current, JSON.stringify([...set])); }

function render() {
  const grid = document.getElementById("grid");
  const set = marks();
  const items = [...RUSH_BINGO_CARDS[current]];
  items.splice(12, 0, FREE_SPACE);
  grid.innerHTML = "";
  items.forEach((text, index) => {
    const square = document.createElement("button");
    square.className = "sq" + (index === 12 ? " free" : "") + (set.has(index) ? " marked" : "");
    square.textContent = text;
    square.onclick = () => toggle(index);
    grid.appendChild(square);
  });
  document.getElementById("status").textContent = [...set].filter(i => i !== 12).length + " squares marked";
  document.getElementById("bingo").classList.toggle("show", bingo(set));
}

function toggle(index) {
  const set = marks();
  if (index === 12) set.add(index);
  else set.has(index) ? set.delete(index) : set.add(index);
  save(set);
  render();

  requestAnimationFrame(() => {
    const square = document.querySelectorAll(".sq")[index];
    if (!square) return;
    square.classList.remove("hit");
    void square.offsetWidth;
    square.classList.add("hit");
    setTimeout(() => square.classList.remove("hit"), 450);
  });
  if (bingo(set)) celebrate();
}

function bingo(set) {
  const lines = [
    [0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24],
    [0,5,10,15,20],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24],
    [0,6,12,18,24],[4,8,12,16,20]
  ];
  return lines.some(line => line.every(i => set.has(i)));
}

function celebrate() {
  if (lastCelebrated) return;
  lastCelebrated = true;
  const banner = document.getElementById("bingo");
  banner.classList.add("bingo-party");
  document.querySelectorAll(".sq").forEach((square, i) => setTimeout(() => square.classList.add("bingo-wave"), i * 28));
  setTimeout(() => document.querySelectorAll(".sq.bingo-wave").forEach(s => s.classList.remove("bingo-wave")), 850);
  for (let i = 0; i < 42; i++) {
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.left = (10 + Math.random() * 80) + "vw";
    piece.style.setProperty("--dx", (Math.random() * 260 - 130) + "px");
    piece.style.setProperty("--spin", (Math.random() * 1080 - 540) + "deg");
    piece.style.animationDelay = (Math.random() * .35) + "s";
    piece.style.background = i % 3 === 0 ? "#f1c861" : i % 3 === 1 ? "#e2473d" : "#f7f3e9";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 2400);
  }
  setTimeout(() => banner.classList.remove("bingo-party"), 2200);
}

function resetCard() {
  if (!confirm("Reset all marks on this card?")) return;
  localStorage.removeItem("rush-bingo-" + current);
  lastCelebrated = false;
  render();
}

function show(card) {
  current = card;
  document.getElementById("game").hidden = false;
  ["connie","brandon"].forEach((name, i) => document.getElementById("t" + i).classList.toggle("active", name === card));
  render();
}
render();
