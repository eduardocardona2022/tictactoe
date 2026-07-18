## 1. Extracción de lógica de juego

- [x] 1.1 Crear `game-core.js` con `WINNING_COMBOS`, `checkWin()`, y `checkDraw()` extraídos de `game.js`, con export condicional para dual browser/Node
- [x] 1.2 Remover `WINNING_COMBOS`, `checkWin()`, y `checkDraw()` de `game.js` (las consume del scope global vía `game-core.js`)
- [x] 1.3 Agregar `<script src="game-core.js">` antes de `<script src="game.js">` en `index.html`

## 2. Suite de tests

- [x] 2.1 Crear `game-core.test.js` importando `game-core.js` con `node:test` y `node:assert`
- [x] 2.2 Escribir tests de `checkWin()`: 8 combos ganadores × jugador X (8 tests) + 8 combos × jugador O (8 tests) + tablero sin ganador (1 test) = 17 tests
- [x] 2.3 Escribir tests de `checkDraw()`: tablero lleno sin ganador, tablero lleno con ganador, tablero parcialmente vacío (3 tests)
- [x] 2.4 Escribir tests de `WINNING_COMBOS`: verificar que tiene exactamente 8 combos y que cada combo tiene 3 índices válidos (0-8) (1 test)

## 3. Configuración

- [x] 3.1 Crear `package.json` con `"type": "module"` y `"scripts": { "test": "node --test" }`, sin dependencias

## 4. Verificación

- [x] 4.1 Ejecutar `npm test` y verificar que los 21 tests pasan
- [x] 4.2 Verificar que el juego sigue funcionando en el navegador (abrir `index.html`, jugar una partida completa)
