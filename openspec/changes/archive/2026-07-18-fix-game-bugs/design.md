## Context

El juego está implementado en 3 archivos vanilla (HTML, CSS, JS) sin dependencias. La arquitectura actual mezcla lógica de juego con manipulación de DOM en `game.js`. Los 4 bugs identificados son todos de la capa de rendering/animación — no tocan la lógica de juego (`checkWin`, `checkDraw`).

Estado actual relevante por bug:

| Bug | Archivo | Líneas |
|-----|---------|--------|
| Win line no responsive | `game.js` | 93-137 (`drawWinLine`) |
| Partículas con setTimeout | `game.js` | 139-161 (`spawnParticles`) |
| Transición start con setTimeout | `game.js` | 181-189 (`startGame`) |
| Board reset con offsetWidth | `game.js` | 163-179 (`resetBoard`) |

## Goals / Non-Goals

**Goals:**
- La línea de victoria se reposiciona automáticamente ante resize/zoom del viewport
- Las partículas se limpian exactamente cuando termina su animación CSS
- La transición start → game está sincronizada con la animación CSS (fuente única de verdad)
- `resetBoard()` no fuerza reflow innecesario

**Non-Goals:**
- No se refactoriza la arquitectura (sin separar engine/UI)
- No se agregan tests
- No se toca CSS ni HTML
- No se cambia el comportamiento visible — solo se hace robusto lo existente

## Decisions

### 1. Win line → ResizeObserver

**Alternativas consideradas:**

| Opción | Pros | Contras |
|--------|------|---------|
| `ResizeObserver` | Preciso, se dispara solo cuando cambia el tamaño del board, nativo | Requiere cleanup en resetBoard |
| `window.resize` event | Simple, familiar | Se dispara en cualquier resize, no solo del board; requiere debounce |
| Recalcular en `requestAnimationFrame` loop | Siempre actualizado | Gasta CPU innecesariamente, overkill |
| Posicionar con CSS puro (transform + %) | Sin JS, naturalmente responsive | Las diagonales requieren `atan2` para el ángulo, no se puede solo con CSS |

**Decisión: `ResizeObserver` sobre `#board`.**

La línea se redibuja cada vez que el board cambia de tamaño. Se guarda el combo ganador en un data attribute (`data-winning-combo`) para poder redibujar sin depender del estado global. El observer se desconecta en `resetBoard()`.

**Implementación:**
```
drawWinLine(combo):
  1. Guarda combo en board.dataset.winningCombo
  2. Dibuja la línea (misma geometría actual)
  3. Crea ResizeObserver → redrawWinLine()

redrawWinLine():
  1. Remueve .win-line existente en el board
  2. Lee combo de board.dataset.winningCombo
  3. Recalcula posiciones con getBoundingClientRect() actual
  4. Dibuja nueva línea

resetBoard():
  1. Desconecta ResizeObserver si existe
  2. Remueve .win-line
  3. Limpia dataset
```

### 2. Partículas → animationend

**Alternativas consideradas:**

| Opción | Pros | Contras |
|--------|------|---------|
| `animationend` event | Se dispara cuando la animación realmente termina | Requiere un listener por partícula |
| `setTimeout` (actual) | Simple | Duración hardcodeada, se desacopla del CSS |
| `requestAnimationFrame` polling | Preciso | Overkill, más código |

**Decisión: `animationend` sobre cada partícula.**

Una línea por partícula. El listener es auto-contenido: cuando la partícula termina su animación, se remueve del DOM inmediatamente.

**Edge case:** si `spawnParticles()` se llama dos veces rápido (dos wins seguidos sin que las partículas anteriores terminen), ambos sets coexisten correctamente porque cada partícula tiene su propio listener independiente.

### 3. Start screen → animationend

**Alternativas consideradas:**

| Opción | Pros | Contras |
|--------|------|---------|
| `animationend` en `#start-screen` | Fuente única de verdad (duración en CSS), nativo | Necesita `{ once: true }` para no re-dispararse |
| `setTimeout` con duración leída de CSS | Menos acoplamiento | `getComputedStyle` para leer animation-duration es frágil |
| Dejar como está | Sin cambios | Bug actual |

**Decisión: `animationend` con `{ once: true }`.**

El listener se registra justo antes de disparar la animación y se auto-remueve al ejecutarse. Si cambia la duración en CSS, el JS sigue funcionando correctamente sin cambios.

### 4. Board reset → getAnimations().cancel()

**Alternativas consideradas:**

| Opción | Pros | Contras |
|--------|------|---------|
| `getAnimations().forEach(cancel)` | Estándar, auto-documentado, sin reflow | Soporte: todos los browsers modernos (Chrome 84+, FF 75+, Safari 13.1+) |
| `void offsetWidth` (actual) | Funciona en todos los browsers | Fuerza reflow sincrónico, opaco |
| Remover y re-crear el elemento | Limpio conceptualmente | Requiere re-crear listeners, rompe referencias |
| `element.animate()` (Web Animations API) | Control fino | Overkill para un simple re-trigger de CSS animation |

**Decisión: `getAnimations().forEach(a => a.cancel())`.**

Antes de re-agregar `animate-in`, se cancelan todas las animaciones activas en el board. Esto fuerza que la nueva clase dispare la animación desde cero — el mismo efecto que `void offsetWidth` pero sin el reflow y con intención explícita.

## Risks / Trade-offs

- **[Win line + resize] Si el tablero cambia de tamaño durante una animación de la línea (0.6s), el redraw puede causar un flicker visual.** → Mitigación: el redraw reinicia la animación de la línea, lo cual es aceptable (el flicker dura < 100ms y solo ocurre si el usuario hace resize justo durante el grow de la línea, un caso extremadamente raro).
- **[ResizeObserver] Requiere cleanup explícito en resetBoard() para no acumular observers.** → Mitigación: se desconecta en cada reset y se crea uno nuevo en cada win.
- **[getAnimations] En browsers muy viejos podría no existir.** → Mitigación: el proyecto ya usa CSS custom properties, Grid, y backdrop-filter, que tienen requisitos similares. Si un browser no soporta `getAnimations`, el tablero simplemente no tiene animación de entrada (degradación elegante, no crashea).
