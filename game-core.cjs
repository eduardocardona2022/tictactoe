const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function checkWin(b, p) {
  for (const combo of WINNING_COMBOS) {
    if (b[combo[0]] === p && b[combo[1]] === p && b[combo[2]] === p) {
      return combo;
    }
  }
  return null;
}

function checkDraw(b) {
  return b.every(cell => cell !== '');
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { WINNING_COMBOS, checkWin, checkDraw };
}
