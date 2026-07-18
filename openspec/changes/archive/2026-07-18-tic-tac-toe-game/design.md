## Context

Proyecto greenfield. Se construye un juego de Tic Tac Toe para navegador usando HTML, CSS y JavaScript vanilla. No hay backend, no hay dependencias externas. El juego es para dos jugadores humanos en el mismo dispositivo (hot-seat). La prioridad del proyecto es la calidad visual y la experiencia de usuario pulida.

## Goals / Non-Goals

**Goals:**
- Experiencia visual espectacular con tema oscuro, colores neón y animaciones fluidas.
- Jugabilidad completa: inicio de partida, turnos alternados, detección de victoria/empate, reinicio.
- Marcador de puntuación persistente en sesión.
- Sin dependencias externas (cero node_modules).

**Non-Goals:**
- No hay modo contra IA.
- No hay persistencia entre sesiones (no localStorage).
- No hay sonido (se puede agregar después).
- No es responsive para mobile (diseñado para desktop primero).
- No hay multiplayer online.

## Decisions

### Arquitectura de archivos: 3 archivos planos

**Decisión**: `index.html`, `styles.css`, `game.js` en la raíz del proyecto.

**Alternativa considerada**: Estructura con `/src`, `/css`, `/js` con múltiples módulos. Rechazada porque para un proyecto de este tamaño (un solo juego), la simplicidad de 3 archivos reduce fricción y hace el proyecto inmediatamente ejecutable (doble clic en el HTML).

### Estructura del DOM: generado estáticamente en HTML

**Decisión**: El tablero y la UI se definen en HTML. JavaScript solo maneja interacciones y actualiza clases/texto. No se genera HTML dinámicamente.

**Razón**: Separación clara de concerns. CSS puede estilizar sin esperar a JS. Mejor para animaciones y transiciones.

### Motor de juego: estado en array plano + funciones puras

**Decisión**: El estado del juego vive en un array de 9 posiciones (`['', '', '', '', '', '', '', '', '']`). Las reglas (checkWin, checkDraw) son funciones puras que reciben el array y devuelven resultado.

**Alternativa considerada**: Clase `Game` con estado interno. Rechazada porque funciones puras son más testables y el estado es tan simple que no justifica una clase.

### Sistema visual: CSS custom properties + animaciones con @keyframes

**Decisión**: Tema definido con variables CSS (`--color-x`, `--color-o`, `--bg-dark`, `--neon-glow`). Animaciones con `@keyframes` para entrada de fichas, línea ganadora y partículas.

**Alternativa considerada**: Canvas para todo. Rechazado porque CSS ofrece animaciones GPU-accelerated sin código extra y es más mantenible para UI.

### Efectos de partículas: pseudo-elementos + animaciones CSS

**Decisión**: Las partículas de celebración se implementan con múltiples `::before`/`::after` o spans generados con animaciones CSS, no con Canvas ni librerías.

**Razón**: Mantiene la restricción de cero dependencias y es suficientemente expresivo para el efecto deseado.

## Risks / Trade-offs

- [Riesgo] Las animaciones pesadas pueden causar jank en dispositivos lentos → Mitigación: usar `will-change` y `transform` en lugar de propiedades que disparen layout.
- [Riesgo] Sin testing automatizado, los bugs en la lógica de victoria pueden pasar desapercibidos → Mitigación: cubrir todas las combinaciones ganadoras en las specs con escenarios explícitos.
- [Trade-off] CSS-only para partículas limita la complejidad del efecto vs Canvas/WebGL → Aceptado: suficiente para el alcance visual deseado.
