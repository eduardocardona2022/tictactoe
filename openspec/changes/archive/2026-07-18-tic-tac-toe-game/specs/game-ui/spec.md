## ADDED Requirements

### Requirement: Pantalla de inicio con botón de inicio
El sistema SHALL mostrar una pantalla de bienvenida con el título del juego y un botón "Iniciar Partida" antes de comenzar.

#### Scenario: Pantalla de inicio visible al cargar
- **WHEN** la página carga por primera vez
- **THEN** se muestra el título "Tic Tac Toe", un subtítulo atractivo y un botón "Iniciar Partida" prominente.

#### Scenario: Transición a pantalla de juego
- **WHEN** el jugador presiona "Iniciar Partida"
- **THEN** la pantalla de inicio se oculta con una animación de fade-out y aparece el tablero de juego.

### Requirement: Indicador de turno
El sistema SHALL mostrar claramente de quién es el turno actual durante la partida.

#### Scenario: Indicador muestra turno de X
- **WHEN** es el turno del Jugador X
- **THEN** el indicador muestra "Turno de X" con el color correspondiente a X (ej. cyan/azul neón).

#### Scenario: Indicador muestra turno de O
- **WHEN** es el turno del Jugador O
- **THEN** el indicador muestra "Turno de O" con el color correspondiente a O (ej. magenta/rosa neón).

### Requirement: Marcador de puntuación
El sistema SHALL llevar un marcador de victorias para X, O y empates durante la sesión.

#### Scenario: Marcador se actualiza al ganar X
- **WHEN** el Jugador X gana una partida
- **THEN** el contador de X en el marcador se incrementa en 1.

#### Scenario: Marcador se actualiza al ganar O
- **WHEN** el Jugador O gana una partida
- **THEN** el contador de O en el marcador se incrementa en 1.

#### Scenario: Marcador se actualiza al empatar
- **WHEN** la partida termina en empate
- **THEN** el contador de empates se incrementa en 1.

### Requirement: Pantalla de resultado
El sistema SHALL mostrar el resultado de la partida (ganador o empate) al finalizar.

#### Scenario: Anuncio de ganador
- **WHEN** un jugador gana la partida
- **THEN** se muestra un mensaje como "¡Jugador X gana!" con efectos visuales de celebración.

#### Scenario: Anuncio de empate
- **WHEN** la partida termina en empate
- **THEN** se muestra un mensaje como "¡Empate!" con efecto visual.

### Requirement: Botón de reinicio
El sistema SHALL ofrecer un botón para reiniciar la partida sin recargar la página.

#### Scenario: Reiniciar partida
- **WHEN** el jugador presiona "Jugar de nuevo" después de una victoria o empate
- **THEN** el tablero se limpia, el turno vuelve a X y comienza una nueva partida manteniendo el marcador acumulado.

### Requirement: Botón de reinicio siempre visible
El sistema SHALL mostrar el botón de reinicio durante toda la partida activa.

#### Scenario: Reiniciar durante partida
- **WHEN** el jugador presiona "Reiniciar" en medio de una partida
- **THEN** el tablero se limpia, el turno vuelve a X, y el marcador NO se modifica.
