import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { WINNING_COMBOS, checkWin, checkDraw } = require('./game-core.cjs');

function emptyBoard() {
  return ['', '', '', '', '', '', '', '', ''];
}

function boardWith(moves) {
  const b = emptyBoard();
  for (const [i, p] of Object.entries(moves)) {
    b[i] = p;
  }
  return b;
}

describe('checkWin', () => {
  const combos = [
    { name: 'fila superior', combo: [0, 1, 2] },
    { name: 'fila media', combo: [3, 4, 5] },
    { name: 'fila inferior', combo: [6, 7, 8] },
    { name: 'columna izquierda', combo: [0, 3, 6] },
    { name: 'columna central', combo: [1, 4, 7] },
    { name: 'columna derecha', combo: [2, 5, 8] },
    { name: 'diagonal principal', combo: [0, 4, 8] },
    { name: 'diagonal secundaria', combo: [2, 4, 6] }
  ];

  for (const { name, combo } of combos) {
    it(`X gana en ${name}`, () => {
      const b = emptyBoard();
      combo.forEach(i => { b[i] = 'X'; });
      assert.deepStrictEqual(checkWin(b, 'X'), combo);
    });
  }

  for (const { name, combo } of combos) {
    it(`O gana en ${name}`, () => {
      const b = emptyBoard();
      combo.forEach(i => { b[i] = 'O'; });
      assert.deepStrictEqual(checkWin(b, 'O'), combo);
    });
  }

  it('retorna null cuando no hay ganador', () => {
    const b = boardWith({ 0: 'X', 1: 'O', 2: 'X', 3: 'X', 4: 'O' });
    assert.strictEqual(checkWin(b, 'X'), null);
    assert.strictEqual(checkWin(b, 'O'), null);
  });

  it('retorna null en tablero vacío', () => {
    assert.strictEqual(checkWin(emptyBoard(), 'X'), null);
    assert.strictEqual(checkWin(emptyBoard(), 'O'), null);
  });
});

describe('checkDraw', () => {
  it('retorna true con tablero lleno sin ganador', () => {
    const b = ['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];
    assert.strictEqual(checkDraw(b), true);
  });

  it('retorna true con tablero lleno con ganador (checkDraw no evalua victoria)', () => {
    const b = ['X', 'X', 'X', 'O', 'O', 'X', 'O', 'X', 'O'];
    assert.strictEqual(checkDraw(b), true);
  });

  it('retorna false con tablero parcialmente vacío', () => {
    assert.strictEqual(checkDraw(emptyBoard()), false);
  });
});

describe('WINNING_COMBOS', () => {
  it('tiene 8 combinaciones con índices válidos', () => {
    assert.strictEqual(WINNING_COMBOS.length, 8);
    for (const combo of WINNING_COMBOS) {
      assert.strictEqual(combo.length, 3);
      for (const i of combo) {
        assert.ok(i >= 0 && i <= 8, `índice ${i} fuera de rango 0-8`);
      }
    }
  });
});
