## Context

El proyecto Tic Tac Toe es una aplicación vanilla JS (HTML+CSS+JS) sin dependencias externas ni build step. El audio se implementará exclusivamente con Web Audio API (`AudioContext`, `OscillatorNode`, `GainNode`) generando sonidos procedurales, sin archivos de audio externos. Esto mantiene el principio de cero dependencias del proyecto.

Los eventos del juego que dispararán sonidos están bien definidos en `game.js`:
- `handleCellClick()` — colocación de ficha y cambio de turno (líneas 43-70)
- `handleGameEnd()` — victoria o empate (líneas 76-92)
- `startGame()` — inicio de partida (líneas 205-213)
- `resetBoard()` — reinicio (líneas 181-203)

El control de sonido será un toggle mute/unmute global representado por una variable booleana y un botón en la UI.

## Goals / Non-Goals

**Goals:**
- Sonidos procedurales para: colocar ficha, victoria, empate, inicio de partida, reinicio
- Interfaz de sonido con botón toggle mute/unmute integrado en el tema neón existente
- Cero dependencias externas (solo Web Audio API nativa del navegador)
- Inicialización lazy de AudioContext (primera interacción del usuario, requerido por políticas de autoplay)
- El estado de mute persiste solo durante la sesión (se reinicia al recargar)

**Non-Goals:**
- Música de fondo o loops musicales
- Archivos de audio (.mp3, .wav, .ogg)
- Persistencia del estado de mute en localStorage
- Control de volumen individual por tipo de sonido
- Soporte para navegadores sin Web Audio API (IE11)

## Decisions

### Decision 1: Web Audio API procedural vs archivos de audio

**Elegido**: Web Audio API con OscillatorNode.

**Alternativa**: Archivos de audio estáticos (.wav/.mp3).

**Razón**: Mantener el proyecto sin dependencias externas ni assets adicionales. Los sonidos de un Tic Tac Toe son simples (pops, clicks, arpegios) y se generan fácilmente con osciladores. Además, evita problemas de carga de archivos, paths relativos, y formatos de audio cross-browser.

### Decision 2: Inicialización lazy de AudioContext

**Elegido**: Crear el AudioContext en el primer evento de usuario (click en "Iniciar Partida").

**Alternativa**: Crear AudioContext al cargar la página.

**Razón**: Los navegadores modernos bloquean la reproducción de audio antes de una interacción del usuario (autoplay policy). Crear el contexto en el evento `startGame()` garantiza que esté en un contexto de interacción de usuario válido y evita mensajes de advertencia en consola.

### Decision 3: Variable global `soundEnabled` + botón toggle

**Elegido**: Booleano global `soundEnabled = true` por defecto, controlado por un botón con ícono.

**Alternativa**: Usar `AudioContext.state` ('running'/'suspended') como indicador de mute.

**Razón**: Separar el estado de habilitación del usuario del estado técnico del AudioContext. `AudioContext.state` puede ser 'suspended' por razones del navegador aunque el usuario quiera sonido. Un booleano explícito da control completo y es más simple de entender.

### Decision 4: Sonidos simples de un solo oscilador por evento

**Elegido**: Un OscillatorNode con envolvente (ataque/decaimiento vía GainNode) por evento.

**Alternativa**: Síntesis compleja con múltiples osciladores y filtros.

**Razón**: Para feedback auditivo de un juego simple, sonidos cortos tipo "blip" o "pop" son suficientes y efectivos. Síntesis compleja añadiría complejidad innecesaria sin mejorar materialmente la experiencia.

### Decision 5: Ubicación del botón de sonido

**Elegido**: Esquina superior derecha del game container, junto a los controles existentes.

**Alternativa**: Dentro del scoreboard o en el start screen.

**Razón**: El botón debe estar visible durante toda la partida activa. La esquina superior derecha es una ubicación estándar y no interfiere con el layout existente del tablero, indicador de turno o scoreboard.

## Risks / Trade-offs

- **Web Audio API no soportada** → El juego funciona normalmente sin sonido. La detección de `window.AudioContext || window.webkitAudioContext` al inicio es suficiente. Si no existe, simplemente no se crea el módulo de audio y no se muestra el botón de sonido.
- **AudioContext en estado "suspended"** → Intentar `audioCtx.resume()` antes de cada sonido. Si falla, simplemente no se reproduce el sonido.
- **Múltiples osciladores simultáneos (spam de clicks)** → Cada sonido crea su propio oscilador con `stop()` programado. Los osciladores son garbage-collected al terminar. Para clicks muy rápidos (victoria que frena el juego), no hay riesgo de acumulación porque `gameActive = false`.
- **Conflicto con CSS animations/transitions** → Los sonidos son independientes del DOM y no afectan performance de renderizado. Se disparan en los mismos handlers pero en call stack separado del layout/paint.
