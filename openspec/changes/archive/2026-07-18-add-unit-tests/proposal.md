## Why

El proyecto tiene lógica de juego determinista (8 combinaciones ganadoras, detección de empate, alternancia de turnos) pero cero tests automatizados. Cada nuevo feature (como sonido o AI) corre el riesgo de romper la lógica existente sin que nadie se entere. Los tests unitarios son la red de seguridad que permite iterar con confianza, y este proyecto —sin dependencias externas ni build tools— es el candidato perfecto para una suite de tests minimalista.

## What Changes

- Extraer las funciones puras de lógica de juego (`checkWin`, `checkDraw`) y las constantes (`WINNING_COMBOS`) en un módulo separado `game-core.js` para que sean testeables sin DOM.
- Crear `game-core.test.js` con tests unitarios usando el test runner nativo de Node.js (`node:test` + `node:assert`), cubriendo todos los escenarios de los specs existentes.
- Actualizar `index.html` para cargar `game-core.js` antes de `game.js`, manteniendo el modelo de scripts globales (sin ES modules, sin build step).
- Agregar script `npm test` (o comando directo `node --test`) en `package.json` del proyecto para ejecutar los tests.

## Capabilities

### New Capabilities
- `unit-tests`: suite de tests unitarios para la lógica de juego, cubriendo detección de victoria (8 combinaciones × 2 jugadores), detección de empate, alternancia de turnos, y validación de movimientos.

### Modified Capabilities
<!-- No requirement changes — testing verifies existing behavior, not changing it -->

## Impact

- `game-core.js` (nuevo): extracción de `WINNING_COMBOS`, `checkWin()`, `checkDraw()` desde `game.js`.
- `game.js`: remover funciones extraídas, usar las del scope global de `game-core.js`.
- `game-core.test.js` (nuevo): tests unitarios con `node:test`.
- `index.html`: agregar `<script src="game-core.js">` antes de `game.js`.
- `package.json` (nuevo): agregar script `test` con `node --test`.
