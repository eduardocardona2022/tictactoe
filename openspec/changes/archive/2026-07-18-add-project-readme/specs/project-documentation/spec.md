## ADDED Requirements

### Requirement: Root README documents project purpose and structure
The system SHALL provide a root `README.md` that explains the Tic Tac Toe project's purpose, folder structure, and top-level file responsibilities.

#### Scenario: Reader understands folder contents
- **WHEN** a maintainer opens `README.md`
- **THEN** the document describes `index.html`, `styles.css`, `game.js`, and the `openspec/` directory with enough detail to understand their roles.

#### Scenario: Reader understands project scope
- **WHEN** a maintainer reads the overview
- **THEN** the document identifies the app as a static browser-based Tic Tac Toe game built with HTML, CSS, and JavaScript.

### Requirement: README explains how to run the app
The system SHALL document how to run the project locally without implying unavailable tooling.

#### Scenario: Reader can launch the game
- **WHEN** a maintainer reads the usage instructions
- **THEN** the document explains that `index.html` can be opened directly in a browser.

#### Scenario: Reader understands tooling limits
- **WHEN** a maintainer reviews the setup notes
- **THEN** the document states that there is currently no package manager, build step, or automated test command configured.

### Requirement: README documents gameplay and implementation behavior
The system SHALL summarize the current gameplay flow and implementation responsibilities reflected in the source files.

#### Scenario: Reader understands game flow
- **WHEN** a maintainer reads the gameplay section
- **THEN** the document describes start screen behavior, turn alternation, move validation, win detection, draw detection, scoring, restart behavior, and result display.

#### Scenario: Reader understands visual behavior
- **WHEN** a maintainer reads the UI and effects section
- **THEN** the document describes the neon theme, animated board entry, token glow, winning-cell highlight, winning line, and celebration particles.

### Requirement: README documents OpenSpec workflow context
The system SHALL explain how the `openspec/` directory supports project planning and specification.

#### Scenario: Reader understands existing specs
- **WHEN** a maintainer reads the OpenSpec section
- **THEN** the document lists the current main spec capabilities for game board, game logic, game UI, and visual effects.

#### Scenario: Reader understands change artifacts
- **WHEN** a maintainer reads the OpenSpec section
- **THEN** the document explains that archived changes preserve past proposals, designs, tasks, and delta specs.
