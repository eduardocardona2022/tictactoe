## ADDED Requirements

### Requirement: Alternancia de turnos
El sistema SHALL alternar turnos entre el Jugador X y el Jugador O, empezando siempre por X.

#### Scenario: Primer turno es X
- **WHEN** se inicia una nueva partida
- **THEN** el turno activo es del Jugador X.

#### Scenario: Turno cambia tras movimiento válido
- **WHEN** un jugador coloca su ficha en una celda vacía
- **THEN** el turno pasa al otro jugador.

### Requirement: Movimiento solo en celda vacía
El sistema SHALL rechazar movimientos sobre celdas ya ocupadas.

#### Scenario: Click en celda ocupada ignorado
- **WHEN** un jugador intenta clickear una celda que ya contiene X u O
- **THEN** el sistema ignora el click y no modifica el estado del juego.

### Requirement: Movimiento solo durante partida activa
El sistema SHALL rechazar movimientos cuando la partida no está activa (antes de iniciar o después de terminar).

#### Scenario: Click ignorado antes de iniciar
- **WHEN** un jugador clickea una celda antes de presionar "Iniciar Partida"
- **THEN** el sistema ignora el click.

#### Scenario: Click ignorado tras victoria
- **WHEN** un jugador clickea una celda después de que haya un ganador
- **THEN** el sistema ignora el click.

### Requirement: Detección de victoria
El sistema SHALL detectar cuando un jugador completa una fila, columna o diagonal con sus tres fichas.

#### Scenario: Victoria por fila superior
- **WHEN** el Jugador X ocupa las celdas [0, 1, 2] (fila superior)
- **THEN** el sistema declara ganador al Jugador X.

#### Scenario: Victoria por columna central
- **WHEN** el Jugador O ocupa las celdas [1, 4, 7] (columna central)
- **THEN** el sistema declara ganador al Jugador O.

#### Scenario: Victoria por diagonal principal
- **WHEN** el Jugador X ocupa las celdas [0, 4, 8] (diagonal principal)
- **THEN** el sistema declara ganador al Jugador X.

#### Scenario: Victoria por diagonal secundaria
- **WHEN** el Jugador O ocupa las celdas [2, 4, 6] (diagonal secundaria)
- **THEN** el sistema declara ganador al Jugador O.

### Requirement: Detección de empate
El sistema SHALL detectar cuando todas las celdas están ocupadas sin que haya un ganador.

#### Scenario: Empate con tablero lleno
- **WHEN** las 9 celdas están ocupadas y no hay combinación ganadora
- **THEN** el sistema declara empate.

### Requirement: Bloqueo del tablero al finalizar
El sistema SHALL impedir nuevos movimientos cuando la partida termina (victoria o empate).

#### Scenario: Tablero bloqueado tras victoria
- **WHEN** se detecta un ganador
- **THEN** ninguna celda acepta nuevos clicks hasta que se reinicie la partida.

#### Scenario: Tablero bloqueado tras empate
- **WHEN** se detecta un empate
- **THEN** ninguna celda acepta nuevos clicks hasta que se reinicie la partida.
