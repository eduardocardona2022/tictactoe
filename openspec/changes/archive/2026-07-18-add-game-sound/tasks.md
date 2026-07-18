## 1. Módulo de audio

- [x] 1.1 Crear funciones de sonido en `game.js`: inicialización lazy de `AudioContext` (al primer `startGame()`), variable global `soundEnabled = true`, y detección de soporte Web Audio API
- [x] 1.2 Implementar `playPlaceSound()`: sonido corto tipo pop (~100ms, tono medio 440Hz con envolvente rápido de ataque/decaimiento vía GainNode) para colocación de ficha
- [x] 1.3 Implementar `playWinSound()`: secuencia de 3 tonos ascendentes (C5→E5→G5, 100ms cada uno con 80ms de gap) para victoria
- [x] 1.4 Implementar `playDrawSound()`: tono bajo neutro (~220Hz, 300ms, decaimiento suave) para empate
- [x] 1.5 Implementar `playStartSound()`: tono ascendente simple (~330Hz→660Hz en 250ms) para inicio de partida
- [x] 1.6 Implementar `playRestartSound()`: tono corto neutro (~300Hz, 150ms) para reinicio

## 2. Integración con el juego

- [x] 2.1 Insertar llamada a `playPlaceSound()` en `handleCellClick()` después de colocar ficha exitosamente pero antes del check de win/draw
- [x] 2.2 Insertar llamada a `playWinSound()` en `handleCellClick()` cuando se detecta un ganador (`winCombo` no es null)
- [x] 2.3 Insertar llamada a `playDrawSound()` en `handleCellClick()` cuando `checkDraw()` retorna true
- [x] 2.4 Insertar llamada a `playStartSound()` en `startGame()` cuando comienza la partida
- [x] 2.5 Insertar llamada a `playRestartSound()` en `resetBoard()` al reiniciar la partida

## 3. Interfaz de control de sonido

- [x] 3.1 Agregar botón de toggle de sonido en `index.html` dentro del `#game-container`, con íconos de texto Unicode (por ejemplo: `🔊` activado / `🔇` mute) y clase CSS `sound-toggle`
- [x] 3.2 Agregar estilos CSS en `styles.css` para el botón `.sound-toggle`: posicionamiento fijo (esquina superior derecha del game container), colores neón consistentes con el tema, estados hover/active, y transición suave al cambiar de ícono
- [x] 3.3 Conectar el botón en `game.js`: event listener que alterna `soundEnabled`, actualiza el texto del botón entre `🔊` y `🔇`, y aplica clase CSS para el estado mute

## 4. Verificación

- [x] 4.1 Probar manualmente: iniciar partida → sonido de inicio, colocar fichas → sonido de colocación, ganar → sonido de victoria con partículas, reiniciar → sonido de reinicio, empatar → sonido de empate
- [x] 4.2 Probar toggle de mute: desactivar sonido, verificar que ningún sonido se reproduce, reactivar, verificar que los sonidos vuelven
- [x] 4.3 Probar que el juego funciona sin errores en consola y sin afectar animaciones existentes (colocación de fichas, partículas, overlay, win line)
