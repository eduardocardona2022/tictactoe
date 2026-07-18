## Why

El juego tiene 4 bugs de robustness que afectan la experiencia en condiciones reales de uso: la línea de victoria se desposiciona con zoom/resize, las partículas se limpian con un timer fijo en vez del evento de animación, la transición de la pantalla de inicio está desacoplada entre JS y CSS, y el reinicio del tablero usa un hack de reflow forzado en vez de la API estándar de animaciones. Todos son fixes quirúrgicos, sin cambios de arquitectura.

## What Changes

- **Win line responsive**: la línea de victoria se reposiciona automáticamente cuando el tablero cambia de tamaño (ResizeObserver)
- **Particle cleanup**: las partículas de celebración se remueven vía `animationend` en vez de `setTimeout` fijo
- **Start screen transition**: la transición start → game usa `animationend` en vez de `setTimeout` con duración hardcodeada
- **Board reset**: `resetBoard()` usa `getAnimations().forEach(cancel)` en vez del hack `void offsetWidth`

## Capabilities

### New Capabilities

Ninguna — son fixes de implementación, no features nuevas.

### Modified Capabilities

- `game-board`: La línea de victoria debe reposicionarse correctamente cuando el viewport cambia de tamaño
- `game-ui`: La transición de la pantalla de inicio al juego debe sincronizarse con la animación CSS
- `visual-effects`: Las partículas deben limpiarse al terminar su animación; el reinicio del tablero no debe forzar reflow

## Impact

- `game.js` — todos los fixes (drawWinLine, spawnParticles, startGame, resetBoard, handleGameEnd)
- `styles.css` — sin cambios requeridos
- `index.html` — sin cambios
