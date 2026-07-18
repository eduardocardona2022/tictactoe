## ADDED Requirements

### Requirement: Sonido al colocar ficha
El sistema SHALL reproducir un sonido corto cuando un jugador coloca su ficha en una celda vacía.

#### Scenario: Sonido al colocar X
- **WHEN** el Jugador X coloca su ficha en una celda vacía durante una partida activa
- **THEN** se reproduce un sonido tipo "pop" o "click" de corta duración (máximo 200ms) distintivo para el movimiento.

#### Scenario: Sonido al colocar O
- **WHEN** el Jugador O coloca su ficha en una celda vacía durante una partida activa
- **THEN** se reproduce un sonido tipo "pop" o "click" de corta duración (máximo 200ms) distintivo para el movimiento.

#### Scenario: Sin sonido cuando el sonido está desactivado
- **WHEN** un jugador coloca una ficha y el sonido está desactivado (mute)
- **THEN** no se reproduce ningún sonido.

### Requirement: Sonido de victoria
El sistema SHALL reproducir un sonido de celebración cuando un jugador gana la partida.

#### Scenario: Sonido al ganar
- **WHEN** se detecta una combinación ganadora y se declara un ganador
- **THEN** se reproduce un sonido de celebración (secuencia de tonos ascendentes, duración máxima 800ms).

#### Scenario: Sin sonido de victoria cuando mute
- **WHEN** un jugador gana y el sonido está desactivado
- **THEN** no se reproduce el sonido de victoria.

### Requirement: Sonido de empate
El sistema SHALL reproducir un sonido distintivo cuando la partida termina en empate.

#### Scenario: Sonido al empatar
- **WHEN** se detecta que todas las celdas están ocupadas sin ganador
- **THEN** se reproduce un sonido neutro de tono bajo (duración máxima 400ms).

#### Scenario: Sin sonido de empate cuando mute
- **WHEN** la partida termina en empate y el sonido está desactivado
- **THEN** no se reproduce el sonido de empate.

### Requirement: Sonido de inicio de partida
El sistema SHALL reproducir un sonido cuando comienza una nueva partida.

#### Scenario: Sonido al iniciar
- **WHEN** el jugador presiona "Iniciar Partida" y el juego comienza
- **THEN** se reproduce un sonido breve de inicio (tono ascendente simple, duración máxima 300ms).

#### Scenario: Sin sonido de inicio cuando mute
- **WHEN** se inicia una partida y el sonido está desactivado
- **THEN** no se reproduce el sonido de inicio.

### Requirement: Sonido de reinicio
El sistema SHALL reproducir un sonido cuando se reinicia la partida.

#### Scenario: Sonido al reiniciar
- **WHEN** el jugador presiona "Reiniciar" o "Jugar de nuevo"
- **THEN** se reproduce un sonido breve de reinicio (tono neutro, duración máxima 200ms).

#### Scenario: Sin sonido de reinicio cuando mute
- **WHEN** se reinicia la partida y el sonido está desactivado
- **THEN** no se reproduce el sonido de reinicio.

### Requirement: Control de sonido (mute/unmute)
El sistema SHALL permitir al usuario activar o desactivar todos los sonidos del juego mediante un botón de toggle.

#### Scenario: Sonido activado por defecto
- **WHEN** la página carga por primera vez
- **THEN** el sonido está activado y el botón muestra el estado "activado".

#### Scenario: Desactivar sonido
- **WHEN** el usuario presiona el botón de sonido estando activado
- **THEN** el sonido se desactiva, el botón cambia su apariencia para indicar estado "mute", y ningún sonido se reproduce en acciones posteriores.

#### Scenario: Reactivar sonido
- **WHEN** el usuario presiona el botón de sonido estando en mute
- **THEN** el sonido se reactiva, el botón cambia su apariencia para indicar estado "activado", y los sonidos vuelven a reproducirse en las acciones del juego.

### Requirement: Sin dependencias externas de audio
El sistema SHALL generar todos los sonidos exclusivamente con la Web Audio API del navegador, sin archivos de audio externos ni bibliotecas de terceros.

#### Scenario: Sin archivos de audio
- **WHEN** se reproduce cualquier sonido del juego
- **THEN** el audio se genera proceduralmente usando AudioContext y OscillatorNode, sin realizar solicitudes de red para archivos de audio.

### Requirement: Compatibilidad sin Web Audio API
El sistema SHALL funcionar normalmente sin sonido en navegadores que no soporten Web Audio API.

#### Scenario: Navegador sin AudioContext
- **WHEN** el navegador no soporta `window.AudioContext` ni `window.webkitAudioContext`
- **THEN** el juego funciona completamente, no se muestra el botón de sonido, y no se producen errores en consola relacionados con audio.

### Requirement: El audio no bloquea la interfaz
El sistema SHALL reproducir sonidos de manera asíncrona sin bloquear la interfaz de usuario ni retrasar las animaciones visuales.

#### Scenario: Sonido no interfiere con animaciones
- **WHEN** se reproduce un sonido durante una animación visual (colocación de ficha, partículas, overlay de resultado)
- **THEN** la animación visual se ejecuta con normalidad sin retrasos ni bloqueos causados por el audio.
