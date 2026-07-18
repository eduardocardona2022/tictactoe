## Context

El proyecto actual (`game.js`) contiene toda la lógica en un solo archivo con 7 variables globales y mezcla lógica de juego, audio, y manipulación del DOM. Las funciones `checkWin()` y `checkDraw()` son puras (reciben el tablero como parámetro, no dependen del DOM), lo que las hace ideales para testing unitario. El resto del código depende de `document`, `AudioContext`, o variables globales mutables.

La restricción principal del proyecto es **cero dependencias externas** — no hay npm, no hay build step, no hay bundler. Esto condiciona la elección de framework de testing.

## Goals / Non-Goals

**Goals:**
- Suite de tests unitarios que cubra el 100% de la lógica de juego pura (checkWin, checkDraw)
- Ejecutable con un solo comando (`node --test`), sin instalar dependencias
- Sin modificar el comportamiento del juego ni romper la experiencia en el navegador
- Mantener el proyecto sin dependencias externas

**Non-Goals:**
- Tests de integración que requieran DOM, navegador, o AudioContext
- Tests end-to-end (Cypress, Playwright)
- Cobertura de código de las funciones de UI/animación/audio
- CI/CD pipeline automatizado
- Modificar `game.js` para usar ES modules — se mantiene el modelo de scripts globales

## Decisions

### Decision 1: Node.js `node:test` como test runner

**Elegido**: `node:test` (nativo de Node.js 18+, sin dependencias).

**Alternativas consideradas**:
- **Vitest/Jest**: Requieren `package.json` con dependencias, instalación vía npm, y configuración. Rompen la filosofía zero-deps del proyecto.
- **Custom test runner en vanilla JS**: Re-inventar la rueda. `node:test` ya existe, es estable, y viene incluido en Node.js.
- **Test runner en el navegador**: Requiere HTML adicional y ejecución manual. No viable para automatización.

**Razón**: `node:test` es el único approach que cumple "cero dependencias" + "automatizable". Viene built-in en Node.js 18+.

### Decision 2: Extracción mínima — solo funciones puras

**Elegido**: Crear `game-core.js` con solo `WINNING_COMBOS`, `checkWin()`, `checkDraw()`. Sin tocar el estado global.

**Alternativa**: Extraer TODO el state management (board, currentPlayer, gameActive) en un módulo separado con factory functions.

**Razón**: Mínima intervención. Las funciones puras son las únicas testeables sin mockear DOM. Extraer el state management requeriría refactors más invasivos en `handleCellClick()` y `resetBoard()` que no aportan valor de testing inmediato (el state se verifica indirectamente a través de los resultados de las funciones puras). Si en el futuro se agrega AI, se puede extraer más.

### Decision 3: Scripts globales, sin ES modules

**Elegido**: `index.html` carga `game-core.js` vía `<script>` tradicional, exponiendo `WINNING_COMBOS`, `checkWin`, `checkDraw` al scope global. `game.js` los consume del scope global.

**Alternativa**: Migrar a `<script type="module">` con `import`/`export`.

**Razón**: ES modules requerirían refactorizar `game.js` entero para usar `import`, y los test files usar `import` también. Aunque sería más limpio, el costo de refactor no está justificado para este cambio. `game-core.js` usa `module.exports` condicional (solo en Node) para ser consumido por el test file, mientras expone al scope global en el navegador. Esto da compatibilidad dual sin build step.

### Decision 4: package.json solo con script test

**Elegido**: Crear `package.json` mínimo con `"scripts": { "test": "node --test" }` y `"type": "module"` (necesario para `import` en test files).

**Razón**: Permite `npm test` estándar. `"type": "module"` es requerido por `node:test` con sintaxis `import`. Esto NO introduce dependencias externas — solo usa Node.js built-ins.

## Risks / Trade-offs

- **Código duplicado en test file** → El test file importa `game-core.js` y testea sus funciones. Si alguien modifica `game-core.js` de forma incompatible, los tests fallan. No hay riesgo de divergencia porque no hay duplicación — se testea el mismo código que se usa en el navegador.
- **Dual environment (browser + Node)** → `game-core.js` debe funcionar tanto en navegador (scope global) como en Node (`import`). Se usa un patrón UMD mínimo: exponer al scope global (`window`) y exportar para Node (`module.exports` o conditional export). Si no se maneja bien, puede haber errores `window is not defined`. → Mitigación: verificar `typeof window !== 'undefined'` antes de asignar.
- **Node.js 18+ requerido** → Si alguien tiene Node <18 no podrá ejecutar los tests. → Mitigación: documentar requisito en el script test. En 2026, Node 18 es LTS mínimo razonable.
