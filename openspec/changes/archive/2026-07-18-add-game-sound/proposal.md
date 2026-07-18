## Why

El juego actual tiene una experiencia visual pulida con tema neón, animaciones y partículas, pero carece completamente de feedback auditivo. Agregar sonido completa la inmersión sensorial y hace que cada acción del juego (colocar ficha, ganar, empatar) tenga un refuerzo sonoro que mejora la experiencia del jugador.

## What Changes

- Agregar efectos de sonido para los eventos principales del juego: colocar ficha, cambio de turno, victoria, empate, inicio y reinicio de partida.
- Usar exclusivamente la Web Audio API (AudioContext + OscillatorNode) para generar sonidos proceduralmente, sin archivos de audio externos, manteniendo el proyecto sin dependencias.
- Agregar un botón para activar/desactivar el sonido en la interfaz.
- Integrar los disparadores de sonido en los puntos correctos del game loop existente sin alterar la lógica de juego.

## Capabilities

### New Capabilities
- `game-sound`: generación procedural de efectos de sonido mediante Web Audio API para los eventos del juego (colocar ficha, victoria, empate, inicio, reinicio), incluyendo control de volumen y mute global.

### Modified Capabilities
- `game-ui`: agregar un botón de toggle de sonido (mute/unmute) visible en la interfaz de juego.

## Impact

- `game.js`: agregar módulo de audio (AudioContext, funciones de sonido) e insertar llamadas a sonidos en los handlers de eventos existentes (`handleCellClick`, `handleGameEnd`, `startGame`, `resetBoard`).
- `index.html`: agregar elemento HTML para el botón de toggle de sonido.
- `styles.css`: agregar estilos para el botón de sonido consistente con el tema neón.
