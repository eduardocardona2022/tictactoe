# Tic Tac Toe

Juego estático de Tic Tac Toe para navegador, desarrollado con HTML, CSS y JavaScript puros.

El proyecto contiene el juego funcional y los artefactos de OpenSpec que describen el comportamiento esperado y conservan el historial de planificación. No hay un gestor de paquetes, paso de compilación, servicio de backend ni ejecutor de pruebas automatizadas configurado.

## Estructura del proyecto

```text
tictactoe/
+-- index.html
+-- styles.css
+-- game.js
+-- openspec/
    +-- config.yaml
    +-- specs/
    |   +-- game-board/spec.md
    |   +-- game-logic/spec.md
    |   +-- game-ui/spec.md
    |   +-- visual-effects/spec.md
    +-- changes/
        +-- add-project-readme/
        +-- archive/
```

## Archivos principales

### `index.html`

Define la estructura estática de la página del juego.

Responsabilidades principales:

- Carga `styles.css`.
- Define la interfaz del juego en español.
- Incluye la pantalla de inicio con el título `Tic Tac Toe`, el subtítulo y el botón `Iniciar Partida`.
- Define el contenedor oculto del juego que aparece al iniciarlo.
- Define el tablero de 3x3 como nueve elementos `.cell` con valores `data-index` de `0` a `8`.
- Define el marcador de victorias de X y O, además de los empates.
- Define el botón de reinicio que se muestra durante la partida.
- Define la capa de resultados con el botón `Jugar de nuevo`.
- Carga `game.js` al final del cuerpo del documento.

### `styles.css`

Contiene todos los estilos visuales y el comportamiento de las animaciones.

Responsabilidades principales:

- Importa la fuente Orbitron desde Google Fonts.
- Define propiedades personalizadas de CSS para los colores de fondo y de jugadores, efectos de brillo, tipografía, tamaño de las celdas y separación del tablero.
- Aplica el tema visual neón oscuro.
- Da estilo a la pantalla de inicio, los botones, el indicador de turno, el tablero, las celdas, el marcador y la capa de resultados.
- Renderiza las fichas X y O mediante `.cell.x::before` y `.cell.o::before`.
- Anima la entrada del tablero, la colocación de fichas, el pulso del ganador, el crecimiento de la línea ganadora, el brillo de botones, las transiciones de pantalla y las partículas de celebración.

### `game.js`

Implementa todo el estado del juego y la interacción con el navegador.

Responsabilidades principales:

- Almacena las ocho combinaciones ganadoras en `WINNING_COMBOS`.
- Controla el estado del tablero, el jugador actual, el estado activo o inactivo de la partida y los puntajes acumulados de la sesión.
- Gestiona los eventos de inicio, reinicio, nueva partida y clics en el tablero.
- Valida los movimientos ignorando los clics cuando la partida está inactiva o una celda ya está ocupada.
- Alterna los turnos entre X y O.
- Detecta victorias y empates.
- Resalta las celdas ganadoras.
- Dibuja la línea ganadora animada.
- Genera partículas de celebración después de una victoria.
- Actualiza el marcador y la capa de resultados.

## Ejecución local

Abre `index.html` directamente en un navegador.

No se requiere instalación:

```text
index.html
```

También podés servir la carpeta con cualquier servidor de archivos estáticos, si lo preferís, pero la aplicación actual no lo requiere.

## Flujo de juego

1. La página carga con la pantalla de inicio visible.
2. El jugador hace clic en `Iniciar Partida`.
3. La pantalla de inicio se desvanece y aparece el contenedor del juego.
4. X siempre comienza.
5. Los jugadores se turnan para hacer clic en celdas vacías.
6. Un movimiento válido marca la celda seleccionada y cambia el turno.
7. Un movimiento se ignora cuando la celda ya está ocupada o la partida no está activa.
8. Cuando un jugador completa una fila, columna o diagonal, el juego declara un ganador.
9. Cuando todas las celdas se llenan sin un ganador, el juego declara un empate.
10. Aparece la capa de resultados con `Jugar de nuevo`.

## Puntuación

El marcador registra los resultados de la sesión actual del navegador:

- Victorias de X
- Victorias de O
- Empates

Al presionar `Jugar de nuevo` o `Reiniciar`, se limpia el tablero y el turno vuelve a X. El marcador permanece acumulado hasta que se recarga la página.

## Comportamiento visual

La interfaz usa un tema neón oscuro con colores diferentes para cada jugador:

- X usa un brillo cian o azul eléctrico.
- O usa un brillo magenta o rosa.
- El indicador del turno activo cambia de color según el jugador actual.
- Las celdas vacías muestran respuesta visual al pasar el cursor.
- Las fichas se animan al colocarse.
- Las celdas ganadoras emiten un pulso.
- Se dibuja una línea brillante sobre la combinación ganadora.
- Caen partículas de celebración después de una victoria.
- La capa de resultados aparece con una animación de desvanecimiento y escala.

## Directorio OpenSpec

La carpeta `openspec/` contiene los artefactos de planificación y especificación del proyecto.

### `openspec/config.yaml`

Declara el esquema de OpenSpec que utiliza este proyecto:

```yaml
schema: spec-driven
```

### `openspec/specs/`

Contiene las especificaciones principales vigentes de las capacidades del juego:

- `game-board`: renderizado del tablero de 3x3, celdas clicables, respuesta al pasar el cursor, animación de colocación de fichas y resaltado de celdas ganadoras.
- `game-logic`: alternancia de turnos, validación de movimientos, detección de victorias y empates, y reglas del ciclo de vida de la partida.
- `game-ui`: pantalla de inicio, indicador de turno, marcador, capa de resultados, controles de reinicio y flujo para volver a jugar.
- `visual-effects`: tema neón oscuro, brillo de fichas, animación de entrada del tablero, línea ganadora, partículas y transiciones.

### `openspec/changes/`

Contiene cambios activos y archivados de OpenSpec.

- `archive/2026-07-18-add-project-readme/` conserva el cambio que incorporó este README.
- `archive/2026-07-18-tic-tac-toe-game/` conserva la propuesta, el diseño, las tareas y las especificaciones delta del cambio original del juego Tic Tac Toe.

Los cambios archivados son contexto histórico útil. Las especificaciones principales en `openspec/specs/` son la fuente de verdad actual.

## Herramientas actuales

Este proyecto actualmente no tiene:

- `package.json`.
- Paso de instalación de dependencias.
- Comando de compilación.
- Comando de linting.
- Comando de pruebas automatizadas.
- Servicio de backend.

Esto es intencional para el alcance actual: la aplicación es un juego pequeño y estático para navegador.

## Notas de mantenimiento

- Mantené `README.md` actualizado cuando cambien los archivos, el comportamiento del juego o la estructura de OpenSpec.
- Mantené la documentación del juego vinculada al comportamiento observable en `game.js`, no a intenciones futuras.
- Agregá o actualizá los cambios de OpenSpec antes de implementar cambios de comportamiento importantes.
- Si más adelante se incorpora un gestor de paquetes, una herramienta de compilación o un ejecutor de pruebas, documentá los comandos exactos en este README.
- Prestá atención a la codificación del texto de la interfaz: el código actual incluye etiquetas en español en `index.html` y mensajes de resultados en `game.js`.
