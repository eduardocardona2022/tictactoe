## 1. Estructura HTML

- [x] 1.1 Crear `index.html` con meta viewport, title "Tic Tac Toe" y enlace a `styles.css` y `game.js`
- [x] 1.2 Crear pantalla de inicio (`#start-screen`) con título, subtítulo y botón "Iniciar Partida"
- [x] 1.3 Crear contenedor del juego (`#game-container`) con indicador de turno (`#turn-indicator`), tablero 3x3 (`#board` con 9 `.cell`), marcador (`#scoreboard`) y botón de reinicio (`#restart-btn`)
- [x] 1.4 Crear overlay de resultado (`#result-overlay`) con mensaje de ganador/empate y botón "Jugar de nuevo"

## 2. Variables CSS y tema base

- [x] 2.1 Definir variables CSS en `:root`: `--bg-primary`, `--bg-secondary`, `--color-x`, `--color-o`, `--color-x-glow`, `--color-o-glow`, `--color-text`, `--color-accent`, `--font-main`
- [x] 2.2 Aplicar fondo oscuro, tipografía (system font stack o Google Fonts import), reseteo básico de márgenes/padding
- [x] 2.3 Estilizar el botón "Iniciar Partida" con efecto neón, hover glow y animación de pulso

## 3. Estilos del tablero y celdas

- [x] 3.1 Crear grid 3x3 con `display: grid` y líneas divisorias con efecto neón
- [x] 3.2 Estilizar celdas: tamaño fijo, centrado de contenido, cursor pointer, efecto hover con glow sutil y transición
- [x] 3.3 Estilo de celda ocupada: `cursor: not-allowed` y sin efecto hover
- [x] 3.4 Animación `@keyframes` de entrada para fichas (pop-in: scale 0 → 1.1 → 1 con fade)
- [x] 3.5 Animación staggered para entrada del tablero: cada celda aparece con ~50ms de delay incremental

## 4. Estilos visuales de fichas y estados

- [x] 4.1 Clase `.x` con color cyan, text-shadow glow, y animación de aparición
- [x] 4.2 Clase `.o` con color magenta, text-shadow glow, y animación de aparición
- [x] 4.3 Clase `.winner` para celdas ganadoras con animación de pulso, color intensificado y glow más fuerte
- [x] 4.4 Estilizar indicador de turno con transición de color entre cyan y magenta según jugador activo

## 5. Estilos de UI: marcador, resultado y botones

- [x] 5.1 Estilizar marcador (`#scoreboard`) con layout horizontal, labels y valores con colores neón
- [x] 5.2 Estilizar overlay de resultado con backdrop semi-transparente, mensaje centrado y animación de entrada
- [x] 5.3 Estilizar botones de acción ("Reiniciar", "Jugar de nuevo") con estilo consistente al botón de inicio

## 6. Efectos visuales avanzados

- [x] 6.1 Crear animación `@keyframes` de línea ganadora: pseudo-elemento que se extiende sobre las celdas ganadoras
- [x] 6.2 Crear animación `@keyframes` de partículas/confeti con múltiples spans o divs generados desde JS al ganar
- [x] 6.3 Aplicar transiciones suaves entre pantallas (start → game, game → result) con fade/scale

## 7. Lógica del juego en JavaScript

- [x] 7.1 Inicializar estado del juego: `board` (array 9), `currentPlayer` ('X'), `gameActive` (false), `scores` ({ X: 0, O: 0, draws: 0 })
- [x] 7.2 Implementar `checkWin(board, player)`: verificar las 8 combinaciones ganadoras y devolver la combinación o null
- [x] 7.3 Implementar `checkDraw(board)`: verificar si todas las celdas están ocupadas sin ganador
- [x] 7.4 Implementar `handleCellClick(index)`: validar movimiento, actualizar estado y DOM, verificar fin de juego
- [x] 7.5 Implementar `updateTurnIndicator()`: actualizar texto y clase del indicador de turno
- [x] 7.6 Implementar `handleGameEnd(result)`: mostrar resultado, actualizar marcador, bloquear tablero, lanzar efectos visuales
- [x] 7.7 Implementar `resetBoard()`: limpiar tablero, resetear turno a X, activar juego (sin tocar marcador)
- [x] 7.8 Implementar `startGame()`: ocultar pantalla de inicio, mostrar juego, activar tablero

## 8. Wiring de eventos y animaciones

- [x] 8.1 Conectar botón "Iniciar Partida" → `startGame()`
- [x] 8.2 Conectar clicks en celdas → `handleCellClick(index)` (usar event delegation o listeners individuales)
- [x] 8.3 Conectar botón "Reiniciar" → `resetBoard()`
- [x] 8.4 Conectar botón "Jugar de nuevo" → `resetBoard()` + ocultar overlay de resultado
- [x] 8.5 Implementar función para generar partículas de celebración al ganar
- [x] 8.6 Implementar función para mostrar línea ganadora animada según la combinación

## 9. Pulido e integración final

- [x] 9.1 Verificar todos los escenarios de victoria (8 combinaciones) y empate
- [x] 9.2 Verificar que los clicks se ignoran correctamente antes de iniciar, después de terminar y en celdas ocupadas
- [x] 9.3 Ajustar timings de animaciones para que se sientan fluidas (no muy lentas ni instantáneas)
- [x] 9.4 Probar en Chrome, Firefox y Edge para verificar consistencia visual
- [x] 9.5 Asegurar que no hay dependencias externas (todo el CSS, JS y fuente son locales o de system font stack)
