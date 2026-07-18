# unit-tests

## Purpose

Suite de tests unitarios para la lógica de juego usando el test runner nativo de Node.js (`node:test`), sin dependencias externas. Cubre detección de victoria (8 combinaciones × 2 jugadores), detección de empate, y validación de la estructura de combinaciones ganadoras.

## Requirements

### Requirement: Tests de detección de victoria
El sistema SHALL incluir tests unitarios que verifiquen la detección de victoria para las 8 combinaciones ganadoras con ambos jugadores (X y O).

#### Scenario: Victoria en cada fila
- **WHEN** el tablero tiene tres X en la fila superior [0,1,2], fila media [3,4,5], o fila inferior [6,7,8]
- **THEN** `checkWin(board, 'X')` retorna el array de la combinación ganadora correspondiente.

#### Scenario: Victoria en cada columna
- **WHEN** el tablero tiene tres X en la columna izquierda [0,3,6], central [1,4,7], o derecha [2,5,8]
- **THEN** `checkWin(board, 'X')` retorna el array de la combinación ganadora correspondiente.

#### Scenario: Victoria en cada diagonal
- **WHEN** el tablero tiene tres X en la diagonal principal [0,4,8] o secundaria [2,4,6]
- **THEN** `checkWin(board, 'X')` retorna el array de la combinación ganadora correspondiente.

#### Scenario: Jugador O gana
- **WHEN** el tablero tiene tres O en cualquiera de las 8 combinaciones ganadoras
- **THEN** `checkWin(board, 'O')` retorna el array de la combinación ganadora correspondiente.

#### Scenario: Sin ganador
- **WHEN** el tablero no tiene tres fichas iguales en ninguna combinación ganadora
- **THEN** `checkWin(board, player)` retorna `null`.

### Requirement: Tests de detección de empate
El sistema SHALL incluir tests unitarios que verifiquen la detección de empate.

#### Scenario: Tablero lleno sin ganador
- **WHEN** las 9 celdas están ocupadas y no hay combinación ganadora para ningún jugador
- **THEN** `checkDraw(board)` retorna `true`.

#### Scenario: Tablero lleno con ganador
- **WHEN** las 9 celdas están ocupadas y existe una combinación ganadora
- **THEN** `checkDraw(board)` retorna `true` (la función verifica si el tablero está lleno; la verificación de victoria es responsabilidad del caller que ejecuta `checkWin` primero).

#### Scenario: Tablero parcialmente vacío
- **WHEN** el tablero tiene al menos una celda vacía
- **THEN** `checkDraw(board)` retorna `false`.

### Requirement: Test runner sin dependencias
El sistema SHALL ejecutar todos los tests unitarios usando exclusivamente el test runner nativo de Node.js (`node:test`), sin dependencias externas de npm.

#### Scenario: Ejecutar tests con npm test
- **WHEN** se ejecuta `npm test` o `node --test` en el directorio del proyecto
- **THEN** se ejecutan todos los tests de `game-core.test.js` y se muestra un resumen de resultados (pass/fail).

#### Scenario: Tests en aislamiento
- **WHEN** se ejecutan los tests unitarios
- **THEN** no se requiere un navegador, un DOM, ni archivos HTML — los tests se ejecutan puramente en Node.js.

### Requirement: Cobertura de escenarios de los specs
El sistema SHALL incluir tests que cubran todos los escenarios definidos en los specs de `game-logic`.

#### Scenario: Cada escenario de game-logic tiene un test
- **WHEN** se revisa la suite de tests
- **THEN** existe al menos un test por cada escenario definido en `openspec/specs/game-logic/spec.md`, cubriendo alternancia de turnos, movimientos válidos/inválidos, detección de victoria (8 combos × 2 jugadores), detección de empate, y bloqueo del tablero.
