## MODIFIED Requirements

### Requirement: Botón de reinicio
El sistema SHALL ofrecer un botón para reiniciar la partida sin recargar la página, y un botón para activar o desactivar el sonido del juego.

#### Scenario: Reiniciar partida
- **WHEN** el jugador presiona "Jugar de nuevo" después de una victoria o empate
- **THEN** el tablero se limpia, el turno vuelve a X y comienza una nueva partida manteniendo el marcador acumulado.

### Requirement: Botón de reinicio siempre visible
El sistema SHALL mostrar el botón de reinicio y el botón de control de sonido durante toda la partida activa.

#### Scenario: Reiniciar durante partida
- **WHEN** el jugador presiona "Reiniciar" en medio de una partida
- **THEN** el tablero se limpia, el turno vuelve a X, y el marcador NO se modifica.

#### Scenario: Botón de sonido visible durante partida
- **WHEN** el juego está activo
- **THEN** el botón de toggle de sonido está visible y funcional en la interfaz de juego.

## ADDED Requirements

### Requirement: Botón de toggle de sonido
El sistema SHALL mostrar un botón para alternar entre sonido activado y silenciado (mute) en la interfaz de juego.

#### Scenario: Botón visible con sonido activado
- **WHEN** la partida está activa y el sonido está habilitado
- **THEN** se muestra un botón con ícono o indicador de sonido activado, estilizado con el tema neón del juego.

#### Scenario: Botón visible con sonido desactivado
- **WHEN** la partida está activa y el sonido está en mute
- **THEN** se muestra el botón con ícono o indicador de sonido desactivado, visualmente distinto del estado activado.

#### Scenario: Toggle al hacer click
- **WHEN** el usuario hace click en el botón de sonido
- **THEN** el estado de sonido alterna entre activado y mute, y el botón actualiza su apariencia inmediatamente.
