## MODIFIED Requirements

### Requirement: Pantalla de inicio con botón de inicio
El sistema SHALL mostrar una pantalla de bienvenida con el título del juego y un botón "Iniciar Partida" antes de comenzar.

#### Scenario: Pantalla de inicio visible al cargar
- **WHEN** la página carga por primera vez
- **THEN** se muestra el título "Tic Tac Toe", un subtítulo atractivo y un botón "Iniciar Partida" prominente.

#### Scenario: Transición a pantalla de juego
- **WHEN** el jugador presiona "Iniciar Partida"
- **THEN** la pantalla de inicio se oculta con una animación de fade-out y aparece el tablero de juego. La transición SHALL completarse usando la duración definida en CSS como fuente única de verdad, sin depender de un timeout fijo en JavaScript.
