## MODIFIED Requirements

### Requirement: Animación de entrada del tablero
El sistema SHALL animar la aparición del tablero al iniciar una partida.

#### Scenario: Tablero aparece con animación
- **WHEN** el jugador presiona "Iniciar Partida"
- **THEN** las celdas del tablero aparecen secuencialmente con una animación de fade-in o scale-in (staggered, ~50ms entre celdas).

#### Scenario: Animación de entrada se reinicia al reiniciar partida
- **WHEN** el jugador presiona "Reiniciar" o "Jugar de nuevo" durante o después de una partida
- **THEN** la animación de entrada del tablero se ejecuta nuevamente desde el inicio sin forzar un reflow de layout innecesario.

### Requirement: Efecto de partículas de celebración
El sistema SHALL mostrar un efecto de partículas o confeti al declarar un ganador.

#### Scenario: Partículas tras victoria
- **WHEN** se anuncia un ganador
- **THEN** aparecen partículas brillantes (confeti) en la pantalla con animación de caída o dispersión durante al menos 2 segundos.

#### Scenario: Partículas se limpian al completar animación
- **WHEN** la animación de una partícula de celebración finaliza
- **THEN** la partícula SHALL ser removida del DOM inmediatamente, sin depender de un temporizador fijo.
