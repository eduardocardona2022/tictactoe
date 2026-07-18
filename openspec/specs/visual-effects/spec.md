# visual-effects

## Purpose

Visual effects and animations: dark neon theme, token glow, board entry animation, winning line draw effect, celebration particles, and smooth state transitions.

## Requirements

### Requirement: Tema oscuro con colores neón
El sistema SHALL usar un tema oscuro de fondo con colores neón para los elementos del juego.

#### Scenario: Fondo oscuro aplicado
- **WHEN** la página se renderiza en cualquier estado
- **THEN** el fondo es de color oscuro (near-black o dark-blue) con texto y elementos en colores brillantes/neón.

### Requirement: Efecto neón en fichas
El sistema SHALL aplicar efecto de brillo neón (glow) a las fichas X y O.

#### Scenario: X tiene glow cyan
- **WHEN** una celda contiene la ficha X
- **THEN** la X se renderiza con un efecto de brillo/neón en color cyan o azul eléctrico usando CSS box-shadow o text-shadow.

#### Scenario: O tiene glow magenta
- **WHEN** una celda contiene la ficha O
- **THEN** la O se renderiza con un efecto de brillo/neón en color magenta o rosa eléctrico usando CSS box-shadow o text-shadow.

### Requirement: Animación de entrada del tablero
El sistema SHALL animar la aparición del tablero al iniciar una partida.

#### Scenario: Tablero aparece con animación
- **WHEN** el jugador presiona "Iniciar Partida"
- **THEN** las celdas del tablero aparecen secuencialmente con una animación de fade-in o scale-in (staggered, ~50ms entre celdas).

#### Scenario: Animación de entrada se reinicia al reiniciar partida
- **WHEN** el jugador presiona "Reiniciar" o "Jugar de nuevo" durante o después de una partida
- **THEN** la animación de entrada del tablero se ejecuta nuevamente desde el inicio sin forzar un reflow de layout innecesario.

### Requirement: Animación de línea ganadora
El sistema SHALL dibujar una línea animada que atraviese las celdas ganadoras.

#### Scenario: Línea ganadora se dibuja
- **WHEN** se detecta una victoria
- **THEN** una línea brillante se dibuja automáticamente sobre las tres celdas ganadoras con una animación de trazado (draw effect).

### Requirement: Efecto de partículas de celebración
El sistema SHALL mostrar un efecto de partículas o confeti al declarar un ganador.

#### Scenario: Partículas tras victoria
- **WHEN** se anuncia un ganador
- **THEN** aparecen partículas brillantes (confeti) en la pantalla con animación de caída o dispersión durante al menos 2 segundos.

#### Scenario: Partículas se limpian al completar animación
- **WHEN** la animación de una partícula de celebración finaliza
- **THEN** la partícula SHALL ser removida del DOM inmediatamente, sin depender de un temporizador fijo.

### Requirement: Transiciones suaves entre estados
El sistema SHALL usar transiciones CSS para cambios de estado visual.

#### Scenario: Transición al mostrar resultado
- **WHEN** la partida termina
- **THEN** el mensaje de resultado aparece con una transición suave de opacidad y escala (fade-in + scale-up, mínimo 300ms).

#### Scenario: Transición al cambiar turno
- **WHEN** el turno cambia de un jugador a otro
- **THEN** el indicador de turno se actualiza con una transición de color suave.
