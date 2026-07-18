## MODIFIED Requirements

### Requirement: Celdas ganadoras resaltadas
El sistema SHALL resaltar visualmente las tres celdas que forman la combinación ganadora.

#### Scenario: Línea ganadora resaltada
- **WHEN** un jugador completa una línea ganadora (fila, columna o diagonal)
- **THEN** las tres celdas ganadoras muestran un efecto visual distintivo (brillo, cambio de color, animación de pulso).

#### Scenario: Línea ganadora se mantiene correcta al redimensionar
- **WHEN** la ventana del navegador cambia de tamaño o se aplica zoom mientras se muestra una línea ganadora
- **THEN** la línea ganadora SHALL reposicionarse automáticamente para seguir alineada con las celdas ganadoras.
