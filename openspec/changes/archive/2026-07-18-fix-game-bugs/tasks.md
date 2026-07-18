## 1. Transición start screen sincronizada

- [x] 1.1 Reemplazar `setTimeout(300ms)` en `startGame()` por listener `animationend` con `{ once: true }`
- [x] 1.2 El listener debe ocultar `#start-screen`, limpiar su animation style, mostrar `#game-container` y llamar `resetBoard()`
- [x] 1.3 Verificar: si se cambia la duración del `@keyframes fadeOut` en CSS a 0.6s, la transición sigue funcionando sin tocar JS

## 2. Reinicio de tablero sin reflow forzado

- [x] 2.1 Reemplazar `void boardEl.offsetWidth` en `resetBoard()` por `boardEl.getAnimations().forEach(a => a.cancel())`
- [x] 2.2 Verificar: la animación staggered de entrada (`animate-in`) se reinicia correctamente al presionar "Reiniciar" o "Jugar de nuevo"

## 3. Limpieza de partículas vía animationend

- [x] 3.1 Reemplazar `setTimeout(() => particle.remove(), 3500)` en `spawnParticles()` por `particle.addEventListener('animationend', () => particle.remove())`
- [x] 3.2 Verificar: las partículas desaparecen del DOM exactamente cuando termina su animación de caída
- [x] 3.3 Verificar: si se llama `spawnParticles()` dos veces seguidas (dos wins rápidos), ambos sets de partículas coexisten y se limpian independientemente

## 4. Línea de victoria responsiva con ResizeObserver

- [x] 4.1 Almacenar el combo ganador en `boardEl.dataset.winningCombo` dentro de `drawWinLine()`
- [x] 4.2 Extraer la lógica de posicionamiento de la línea a una función `redrawWinLine()` que lea el combo del dataset y recalcule posiciones
- [x] 4.3 Crear un `ResizeObserver` sobre `boardEl` que llame a `redrawWinLine()` al detectar cambios de tamaño
- [x] 4.4 Guardar referencia al observer (variable en scope del módulo) para poder desconectarlo
- [x] 4.5 En `resetBoard()`, desconectar el observer si existe, remover la win-line, y limpiar `boardEl.dataset.winningCombo`
- [x] 4.6 Verificar: al hacer zoom in/out o resize de ventana con una línea de victoria visible, la línea se reposiciona correctamente
- [x] 4.7 Verificar: al reiniciar partida, el observer se desconecta y no hay memory leaks
