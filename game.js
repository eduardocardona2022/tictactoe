let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = false;
let scores = { X: 0, O: 0, draws: 0 };
let winLineObserver = null;

let soundEnabled = true;
let audioCtx = null;

function initAudio() {
  if (audioCtx) return;
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) return;
  audioCtx = new Ctor();
}

function ensureAudioRunning() {
  if (!soundEnabled) return false;
  initAudio();
  if (!audioCtx) return false;
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return true;
}

function playPlaceSound() {
  if (!ensureAudioRunning()) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, audioCtx.currentTime);
  gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
}

function playWinSound() {
  if (!ensureAudioRunning()) return;
  const notes = [523.25, 659.25, 783.99];
  notes.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    const startTime = audioCtx.currentTime + i * 0.15;
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(0.15, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(startTime);
    osc.stop(startTime + 0.2);
  });
}

function playDrawSound() {
  if (!ensureAudioRunning()) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(220, audioCtx.currentTime);
  gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
}

function playStartSound() {
  if (!ensureAudioRunning()) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(330, audioCtx.currentTime);
  osc.frequency.linearRampToValueAtTime(660, audioCtx.currentTime + 0.25);
  gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
}

function playRestartSound() {
  if (!ensureAudioRunning()) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(300, audioCtx.currentTime);
  gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.15);
}

const startScreen = document.getElementById('start-screen');
const gameContainer = document.getElementById('game-container');
const turnIndicator = document.getElementById('turn-indicator');
const boardEl = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const scoreDraws = document.getElementById('score-draws');
const resultOverlay = document.getElementById('result-overlay');
const resultMessage = document.getElementById('result-message');
const particlesContainer = document.getElementById('particles-container');

function updateTurnIndicator() {
  turnIndicator.className = currentPlayer === 'X' ? 'turn-x' : 'turn-o';
  turnIndicator.querySelector('.player-name').textContent = currentPlayer;
}

function handleCellClick(index) {
  if (!gameActive || board[index] !== '') return;

  board[index] = currentPlayer;
  const cell = cells[index];
  cell.classList.add('taken', currentPlayer.toLowerCase());
  playPlaceSound();

  const winCombo = checkWin(board, currentPlayer);
  if (winCombo) {
    gameActive = false;
    playWinSound();
    highlightWinnerCells(winCombo);
    setTimeout(() => {
      drawWinLine(winCombo);
      spawnParticles();
    }, 400);
    handleGameEnd(currentPlayer);
    return;
  }

  if (checkDraw(board)) {
    gameActive = false;
    playDrawSound();
    handleGameEnd(null);
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateTurnIndicator();
}

function highlightWinnerCells(combo) {
  combo.forEach(i => cells[i].classList.add('winner'));
}

function handleGameEnd(result) {
  if (result) {
    scores[result]++;
    document.getElementById('score-' + result.toLowerCase()).textContent = scores[result];
    resultMessage.textContent = '¡Jugador ' + result + ' gana!';
    resultMessage.className = 'win-' + result.toLowerCase();
  } else {
    scores.draws++;
    scoreDraws.textContent = scores.draws;
    resultMessage.textContent = '¡Empate!';
    resultMessage.className = 'draw';
  }

  setTimeout(() => {
    resultOverlay.classList.remove('hidden');
  }, 600);
}

function drawWinLine(combo) {
  boardEl.dataset.winningCombo = combo.join(',');
  redrawWinLine();

  if (!winLineObserver) {
    winLineObserver = new ResizeObserver(() => {
      redrawWinLine();
    });
    winLineObserver.observe(boardEl);
  }
}

function redrawWinLine() {
  const existing = boardEl.querySelector('.win-line');
  if (existing) existing.remove();

  const comboStr = boardEl.dataset.winningCombo;
  if (!comboStr) return;
  const combo = comboStr.split(',').map(Number);

  const boardRect = boardEl.getBoundingClientRect();
  const first = cells[combo[0]].getBoundingClientRect();
  const last = cells[combo[2]].getBoundingClientRect();

  const line = document.createElement('div');
  line.classList.add('win-line');

  const isRow = combo[0] + 2 === combo[2] && combo[0] % 3 === 0;
  const isCol = combo[0] + 6 === combo[2];
  const isDiag = !isRow && !isCol;

  if (isRow) {
    line.classList.add('horizontal');
    const cellMid = first.top + first.height / 2;
    line.style.top = (cellMid - boardRect.top - 2) + 'px';
    line.style.left = (first.left - boardRect.left + 8) + 'px';
    const targetWidth = last.right - first.left - 16;
    line.style.setProperty('--target-width', targetWidth + 'px');
    line.style.width = targetWidth + 'px';
  } else if (isCol) {
    line.classList.add('vertical');
    const cellMid = first.left + first.width / 2;
    line.style.left = (cellMid - boardRect.left - 2) + 'px';
    line.style.top = (first.top - boardRect.top + 8) + 'px';
    const targetHeight = last.bottom - first.top - 16;
    line.style.setProperty('--target-height', targetHeight + 'px');
    line.style.height = targetHeight + 'px';
  } else {
    line.classList.add('diagonal');
    line.style.height = '4px';
    line.style.top = (first.top + first.height / 2 - boardRect.top - 2) + 'px';
    line.style.left = (first.left - boardRect.left + 8) + 'px';
    const dx = last.right - first.left - 16;
    const dy = last.bottom - first.top - 16;
    const len = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    line.style.width = len + 'px';
    line.style.transform = 'rotate(' + angle + 'deg)';
  }

  boardEl.appendChild(line);
}

function spawnParticles() {
  const colors = ['#00f0ff', '#ff00e5', '#7b5cff', '#ffffff', '#00ff88', '#ffaa00'];
  const count = 60;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = -(Math.random() * 10 + 5) + 'px';
    particle.style.width = (Math.random() * 8 + 4) + 'px';
    particle.style.height = (Math.random() * 8 + 4) + 'px';
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.boxShadow = '0 0 8px ' + particle.style.background;
    particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
    particle.style.animationDelay = Math.random() * 0.8 + 's';

    particlesContainer.appendChild(particle);

    particle.addEventListener('animationend', () => {
      particle.remove();
    });
  }
}

function resetBoard() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;

  cells.forEach(c => {
    c.className = 'cell';
  });

  if (winLineObserver) {
    winLineObserver.disconnect();
    winLineObserver = null;
  }
  delete boardEl.dataset.winningCombo;

  const winLine = boardEl.querySelector('.win-line');
  if (winLine) winLine.remove();

  updateTurnIndicator();
  boardEl.classList.remove('animate-in');
  boardEl.getAnimations().forEach(a => a.cancel());
  boardEl.classList.add('animate-in');
}

function startGame() {
  startScreen.style.animation = 'fadeOut 0.3s ease-out forwards';
  startScreen.addEventListener('animationend', () => {
    startScreen.classList.add('hidden');
    startScreen.style.animation = '';
    gameContainer.classList.remove('hidden');
    resetBoard();
    playStartSound();
  }, { once: true });
}

document.getElementById('start-btn').addEventListener('click', startGame);

boardEl.addEventListener('click', (e) => {
  const cell = e.target.closest('.cell');
  if (!cell) return;
  const index = parseInt(cell.dataset.index, 10);
  handleCellClick(index);
});

document.getElementById('restart-btn').addEventListener('click', () => {
  playRestartSound();
  resetBoard();
});

document.getElementById('play-again-btn').addEventListener('click', () => {
  resultOverlay.classList.add('hidden');
  playRestartSound();
  resetBoard();
});

const soundToggle = document.getElementById('sound-toggle');

function updateSoundToggle() {
  if (soundEnabled) {
    soundToggle.textContent = '🔊';
    soundToggle.classList.remove('muted');
  } else {
    soundToggle.textContent = '🔇';
    soundToggle.classList.add('muted');
  }
}

soundToggle.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  updateSoundToggle();
});
