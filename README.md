# `<dw-chip-select>` [![Published on npm](https://img.shields.io/npm/v/@dreamworld/dw-chip-select.svg)](https://www.npmjs.com/package/@dreamworld/dw-chip-select)

Compact, interactive chip elements that allow users to filter, choose, or input values — built as LitElement-based web components.

---

## 1. User Guide

### Installation & Setup

```bash
yarn add @dreamworld/dw-chip-select
```

Import the component module (registers both `<dw-chip-select>` and `<dw-chip>` custom elements):

```javascript
import "@dreamworld/dw-chip-select";
```

Load Material Icons font (required for the leading checkmark icon in filter chips):

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons&display=block&display=swap">
```

---

### Basic Usage

#### Filter chip (multi-select)

```html
<dw-chip-select
  label="Status"
  .items=${["Active", "Inactive", "Pending"]}
  .value=${["Active"]}
  @change=${(e) => console.log(e.detail)}
></dw-chip-select>
```

#### Choice chip (single-select) with object items

```html
<dw-chip-select
  type="choice"
  label="Payment Type"
  .items=${[{ name: "RECEIPT", label: "Receipt" }, { name: "PAYMENT", label: "Payment" }]}
  .valueExpression=${"name"}
  .valueTextProvider=${(item) => item.label}
  @change=${(e) => console.log(e.detail)}
></dw-chip-select>
```

#### Shimmer / loading state

When `items` is `undefined` (not yet loaded), the component automatically renders a shimmer placeholder row:

```html
<!-- items not yet set → shows shimmer chips -->
<dw-chip-select label="Loading..."></dw-chip-select>
```

---

### API Reference

#### `<dw-chip-select>`

##### Properties / Attributes

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `type` | `String` | `"filter"` | No | Chip selection mode. One of `"filter"` (multi-select), `"choice"` (single-select), `"input"` (reserved, no toggle logic implemented). |
| `items` | `Array` | `undefined` | No | List of selectable item data. When `undefined`, shimmer placeholders are rendered. When an empty array, nothing is rendered. |
| `value` | `Array\|Object` | `undefined` | No | Current selection. Array of values for `filter` type; single value object for `choice` type. Values are compared using `valueEquator`. |
| `label` | `String` | `undefined` | No | Text label rendered above the chip row. |
| `valueTextProvider` | `Function` | `(item) => item` | No | Given an item from `items`, returns the display string for the chip. |
| `valueProvider` | `Function` | `undefined` | No | Given an item from `items`, returns the value stored in `value`. Mutually exclusive with `valueExpression`; `valueExpression` takes precedence when both are set. |
| `valueExpression` | `String` | `undefined` | No | Property key used to extract the value from each item object (e.g., `"id"`). Overrides `valueProvider` when both are provided. |
| `chipDisabledProvider` | `Function` | `undefined` | No | Given an item, returns `true` if that chip should be disabled. |
| `valueEquator` | `Function` | `(v1, v2) => v1 === v2` | No | Custom equality function used to determine whether two values are the same. Receives `(v1, v2)`, must return a `Boolean`. |
| `name` | `String` | `undefined` | No | Sets the `name` attribute for browser autofill purposes only. |

##### Events

| Event | `detail` type | Description |
|-------|--------------|-------------|
| `change` | `Array` (filter) or `Object` (choice) | Fired after a chip is toggled and the value has actually changed (deep equality check via `lodash-es/isEqual`). `detail` is the new `value`. |

---

#### `<dw-chip>` (sub-component)

`<dw-chip>` is rendered internally by `<dw-chip-select>` but can also be used standalone.

##### Properties / Attributes

| Name | Type | Default | Reflect | Description |
|------|------|---------|---------|-------------|
| `type` | `String` | `"filter"` | Yes | Chip variant. `"filter"` shows a leading checkmark icon when selected; `"choice"` and `"input"` do not. |
| `value` | `String` | `undefined` | No | Text displayed inside the chip. |
| `selected` | `Boolean` | `false` | No | Whether the chip is in selected state. |
| `activated` | `Boolean` | `false` | No | Whether the chip has keyboard-activated focus styling (via `dw-ripple`). |
| `disabled` | `Boolean` | `false` | No | When `true`, the chip has `opacity: 0.5` and `pointer-events: none` (applied by the parent `<dw-chip-select>`). |
| `icon` | `String` | `"done"` | No | Material icon name shown as leading icon in `filter` type when selected. |
| `shimmer` | `Boolean` | `false` | No | When `true`, replaces chip content with an animated shimmer placeholder. |

##### CSS Custom Properties

| Property | Default | Description |
|----------|---------|-------------|
| `--dw-chip-height` | `32px` | Height of the chip and base for border-radius calculation. |
| `--dw-chip-select-shimmer-gradiant` | `linear-gradient(to right, #f1efef, #f9f8f8, #e7e5e5)` | Background gradient for shimmer placeholders. |
| `--mdc-theme-primary` | `#02afcd` | Color applied to selected chip text and leading icon. |
| `--mdc-theme-divider-color` | `rgba(0, 0, 0, 0.12)` | Border color of unselected chips. |
| `--mdc-theme-text-secondary-on-surface` | `rgba(0, 0, 0, 0.6)` | Color of the label text above the chip row. |

---

### Configuration Options

#### `ChipTypes` constant (`utils.js`)

```javascript
import { ChipTypes } from "@dreamworld/dw-chip-select/utils.js";
// ChipTypes.filter  → "filter"
// ChipTypes.choice  → "choice"
// ChipTypes.input   → "input"
```

#### Keyboard Navigation

When `<dw-chip-select>` is focused, the following keys are active:

| Key | Action |
|-----|--------|
| `ArrowRight` / `ArrowDown` | Move activation to next chip (wraps around) |
| `ArrowLeft` / `ArrowUp` | Move activation to previous chip (wraps around) |
| `Enter` / `Space` | Toggle the currently activated chip |

Focus via mouse click does not move activation to index 0; focus via keyboard (`Tab`) sets activation to index 0.

---

### Advanced Usage

#### Object items with `valueExpression`

When items are objects, use `valueExpression` to specify the key whose value is stored in `value`, and `valueTextProvider` to control the display label:

```javascript
const items = [
  { name: "RECEIPT", label: "Receipt" },
  { name: "PAYMENT", label: "Payment" },
];

html`
  <dw-chip-select
    type="choice"
    .items=${items}
    .valueExpression=${"name"}
    .valueTextProvider=${(item) => item.label}
    @change=${(e) => console.log(e.detail)} <!-- e.detail = "RECEIPT" or "PAYMENT" -->
  ></dw-chip-select>
`;
```

#### Object items with `valueProvider`

`valueProvider` is a function alternative to `valueExpression`. Note: `valueExpression` takes precedence if both are set.

```javascript
html`
  <dw-chip-select
    .items=${items}
    .valueProvider=${(item) => item.name}
    .valueTextProvider=${(item) => item.label}
  ></dw-chip-select>
`;
```

#### Conditional chip disabling

```javascript
html`
  <dw-chip-select
    .items=${items}
    .chipDisabledProvider=${(item) => item.name === "PAYMENT"}
  ></dw-chip-select>
`;
```

#### Custom value equality

Use `valueEquator` when items are objects compared by identity rather than reference:

```javascript
html`
  <dw-chip-select
    .items=${items}
    .valueEquator=${(v1, v2) => v1?.id === v2?.id}
  ></dw-chip-select>
`;
```

#### Pre-selected value (filter type)

The `value` prop must be an array for `filter` type. Values in the array must match what `valueProvider`/`valueExpression` extracts (or the raw item if neither is set):

```javascript
// items = ["India", "Norway", "Chile"]  (string array, no valueExpression)
html`<dw-chip-select .items=${items} .value=${["India", "Norway"]}></dw-chip-select>`;
```

---

## 2. Developer Guide / Architecture

### Architecture Overview

The library consists of two LitElement custom elements with a clear orchestrator/leaf separation:

```
<dw-chip-select>          ← Orchestrator
  └── <dw-chip> × N       ← Leaf (one per item)
        └── <dw-ripple>   ← Visual feedback
        └── <dw-icon>     ← Leading checkmark (filter type only)
```

#### `DwChipSelect` — Orchestrator (`dw-chip-select.js`)

- **Reactive properties** declare the public API; Lit schedules re-renders on change.
- **`repeat()` directive** is used for keyed rendering of the chip list, enabling efficient DOM diffing.
- **Value provider resolution** (`#_computeValueProvider`) runs in `willUpdate` whenever `valueProvider` or `valueExpression` changes, computing a unified `_valueProvider` function. Priority: `valueExpression` > `valueProvider` > identity function.
- **Selection logic** in `_onChipToggle`:
  - `filter`: clones `value` array via `lodash-es/cloneDeep`, splices or appends; dispatches `change` only if `lodash-es/isEqual` detects a difference.
  - `choice`: sets `value` to the single extracted item; only dispatches when item was not already selected.
  - The `value` prop is never mutated in place — a new array/object reference is always produced.
- **Keyboard management**: A `window`-level `keydown` listener (attached/detached via `connectedCallback`/`disconnectedCallback`) guards on `this.focused`. Arrow keys move `_activatedIndex` with wraparound modulo. Enter/Space triggers `_onChipToggle` on the activated item.
- **Focus tracking**: `focusin`/`focusout` listeners on the host set `focused` and manage `_activatedIndex`. Mouse-initiated focus (`mousedown` flag) skips auto-activation of index 0.

#### `DwChip` — Leaf (`dw-chip.js`)

- Renders a `<dw-ripple>` for visual press/activation feedback.
- For `filter` type, renders a `<dw-icon>` with `@lit-labs/motion`'s `animate()` directive, producing an animated width transition (`hide`/`show` CSS classes) as the chip is selected/deselected.
- `shimmer` prop short-circuits the entire render to a styled placeholder `<div>`.
- `type` attribute is reflected to allow CSS attribute selectors (`[type="filter"]`).

#### Design Patterns

| Pattern | Location | Description |
|---------|----------|-------------|
| Compound component | `dw-chip-select` + `dw-chip` | Parent manages state; children are purely presentational. |
| Provider functions | `valueProvider`, `valueTextProvider`, `chipDisabledProvider`, `valueEquator` | Strategy pattern — callers inject behavior without subclassing. |
| Immutable value updates | `_onChipToggle` | `cloneDeep` + `isEqual` ensures no external mutation and no spurious `change` events. |
| Animated CSS class swap | `dw-chip._renderLeadingIcon` | `classMap` + `animate()` drives the icon show/hide transition declaratively. |
| Shimmer / skeleton loading | `items === undefined` branch | Renders fixed-count placeholder chips via `Array(2).fill({})` until data arrives. |
