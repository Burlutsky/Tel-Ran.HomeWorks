# Homework 33. Tel-Ran.
# Calculator (Vite + TypeScript + React + Redux Classic)

A clean, keyboard-friendly Standard calculator UI (Windows-like layout) built with Vite + React + TypeScript and classic Redux (no RTK).
Dark/light themes, accessible markup, and a config-driven keypad.

### Features

- Standard layout: ```% CE C ⌫```, ```1/x x² √ ÷```, ```7 8 9 ×```, ```4 5 6 −```, ```1 2 3 +```, ```± 0 . =```.
- Dark & Light themes (toggle via UI; system theme respected by default).
- Memory keys (MC/MR/M+/M−/MS) in a compact row; MR/MC auto-disable when memory is empty.
- Config-driven keypad (rows/keys defined in constants; easy to localize/extend).
- Classic Redux store with actions/reducer/selectors; pure math engine utilities.
- A11y-first: ARIA labels where needed, focus styles, semantic regions.
- Ready for keyboard shortcuts (mapping file included; listener can be added easily).

### Quick start
#### Prerequisites
- Node.js 18+
- npm / pnpm / yarn

#### Install & run
```Typescript
# install deps
npm i
# dev server
npm run dev
# build
npm run build
# preview production build
npm run preview
```
Vite will print the local URL (typically http://localhost:5173).

### Project structure
```bash
src/
  App.tsx
  App.css
  main.tsx

  controllers/
    useKeyIntent.ts           # maps KeyIntent → Redux actions (dispatch)

  domain/
    mathEngine.ts             # pure math helpers: unary/binary ops, formatter

  app/
    store/
      index.ts                # classic Redux store + DevTools
    actions/
      calc.ts                 # action types & creators (classic Redux)
    reducers/
      calc.ts                 # main reducer (display, memory, operators)
    selectors/
      calc.ts                 # memo-free selectors (display, secondary, hasMemory)

  components/
    Display/
      index.tsx               # display panel (main & secondary lines, theme toggle)
    Key/
      index.tsx               # reusable Key component
    KeyboardListener/
      index.tsx               # component to translate keydown events into the same KeyIntent
    Keypad/
      index.tsx               # renders keypad from constants using <Key>
    MemoryRow/
      index.tsx               # renders memory keys row from constants using <Key>
    Toast/
      index.tsx               # (placeholder) toast messages

  features/
    ui/
      types/
        key.ts                # KeyIntent, KeyVariant, Operator, etc.
        index.ts
      config/
        keypad.ts             # KEYPAD_ROWS (4×N)
        memory.ts             # MEMORY_KEYS (MC/MR/M+/M−/MS)
        index.ts
      maps/
        keyboard.ts           # KEYBOARD_MAP (KeyboardEvent → key id)
        index.ts
```

### Theming
- The root container has ```class="calc"``` and a ```data-theme``` attribute:
  - ```"system"``` (default) → uses ```prefers-color-scheme```
  - ```"dark"``` or ```"light"``` to force a theme
- CSS variables drive colors, spacing, radii, etc.
- The theme toggle in ```Display``` switches the attribute on the root:
```ts
interface CalcState {
    display: string;            // current input/result as text
    overwriteInput: boolean;    // next digit replaces display

    accumulator: number | null; // left operand / last result
    pendingOperator: Operator | null;

    lastOperator: Operator | null; // for repeated "="
    lastOperand: number | null;

    memoryValue: number | null; // MS/MR/M+/M−/MC
}
```
### Core actions (classic Redux)
- Input: ```INPUT_DIGIT```, ```INPUT_DECIMAL```, ```TOGGLE_SIGN```, ```BACKSPACE```
- Control: ```CLEAR_ENTRY```, ```CLEAR_ALL```
- Operators: ```SET_OPERATOR```, ```APPLY_UNARY```, ```EVALUATE```
- Memory: ```MEMORY_ACT``` (```MC|MR|M+|M-|MS```)

### Selectors
- ```selectDisplay(state)```
- ```selectSecondary(state)``` → e.g., ```"12 +"``` when an operator is pending
- ```selectHasMemory(state)```

### Intent-first keypad
UI keys don’t know Redux. They emit a KeyIntent which the controller hook translates to actions.
```ts
// features/ui/types/key.ts
export type KeyIntent =
  | { type: "digit"; value: string }
  | { type: "operator"; op: Operator }
  | { type: "unary"; fn: UnaryFn }
  | { type: "action"; act: "DECIMAL" | "EQUALS" | "CE" | "C" | "BACKSPACE" | "TOGGLE_SIGN" | "MC" | "MR" | "M+" | "M-" | "MS" };

```
- Key layouts live in ```features/ui/config/{keypad,memory}.ts```.
- Keypad (```components/Keypad```) maps config → ```<Key>``` and calls ```onKeyPress(intent)```.
- Controller (```controllers/useKeyIntent.ts```) does the ```intent → dispatch(action)``` mapping.

This keeps UI clean, testable, and easy to extend.

### Accessibility
- Semantic regions: ```role="group"``` for keypad, ```role="region"``` for display.
- ARIA labels on non-textual buttons (```⌫```, ```.```) and memory keys.
- Clear focus outlines and sufficient contrast in both themes.

### Keyboard support 

```features/ui/maps/keyboard.ts``` contains a basic ```KEYBOARD_MAP``` (e.g., ```"1" → "d1", "Enter" → "eq", "Backspace" → "bksp", "+" → "add"```, etc).

Added the small ```KeyboardListener``` component to translate ```keydown``` events into the same ```KeyIntent``` path used by clicks (and optionally add a pressed highlight using ```data-key```).


### Scripts

Common scripts (check package.json):
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

### Contributing
- Keep components presentational; route logic through intents and Redux actions.
- Prefer readonly config arrays for keypad/memory layouts.
- Use the existing types in features/ui/types—they are the single source of truth.

### License
MIT (you can change this to your preferred license).

### Acknowledgements
- Vite team for a great DX.
- Windows Calculator for the Standard layout inspiration.