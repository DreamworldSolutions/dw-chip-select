import { css, html, LitElement, nothing } from "@dreamworld/pwa-helpers/lit.js";
import { repeat } from "lit/directives/repeat.js";

// View Elements
import "./dw-chip.js";

// Styles
import * as TypographyLiterals from "@dreamworld/material-styles/typography-literals.js";

// Utils
import { cloneDeep, isEqual } from "lodash-es";
import { ChipTypes, KeyCode } from "./utils";

const shimmerData = Array(2).fill({});

export class DwChipSelect extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        outline: none;
      }

      .label {
        color: var(--mdc-theme-text-secondary-on-surface, rgba(0, 0, 0, 0.6));
        ${TypographyLiterals.body2};
      }

      .chip-wrapper {
        display: flex;
        flex-wrap: wrap;
      }

      dw-chip {
        margin-right: 8px;
        margin-top: 8px;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * This is the type of the chip.
       * The default value is `filter`.
       * Possible values: `filter`, `choice`, and `input`.
       */
      type: { type: String },

      /**
       * Selected list item object.
       * When the type is `filter`, the value data type is an array of objects.
       * When the type is `choice`, the value data type is an object.
       */
      value: { type: Object },

      /**
       * This is a list of selectable items.
       */
      items: { type: Array },

      /**
       * This function returns a string and provides the value that represents the chip item.
       */
      valueTextProvider: { type: Function },

      /**
       * This function provides the value.
       */
      valueProvider: { type: Function },

      /**
       * This provides a value based on the input received from the valueExpression key.
       */
      valueExpression: { type: String },

      /**
       * This sets the name attribute on the internal input.
       * The name property should only be used for browser autofill,
       * as webcomponent form participation does not currently consider the name attribute.
       */
      name: { type: String },

      /**
       * This sets the label string and shows the label at the top of the chips.
       */
      label: { type: String },

      /**
       * Set this to configure custom logic to detect whether value is changed or not.
       * Default: compares both values by strict equality (by reference) `v1 === v2`.
       * It must return a Boolean.
       * Function receives 2 arguments: (v1, v2). Should return `true` when both values are same otherwise `false`.
       */
      valueEquator: { type: Function },

      /**
       * Whether component is focused or not
       */
      focused: { type: Boolean },

      /**
       * Computed property from valueProvider and valueExpression
       */
      _valueProvider: { type: Function },

      /**
       * index of activated Item
       * default: -1
       */
      _activatedIndex: { type: Number },
    };
  }

  constructor() {
    super();
    this.tabIndex = "0";
    this.valueTextProvider = (item) => item;
    this._valueProvider = (item) => item;
    this.type = ChipTypes.filter;
    this._activatedIndex = -1;

    this.valueEquator = (v1, v2) => v1 === v2;

    this._onKeyDown = this._onKeyDown.bind(this);
  }

  render() {
    return html`
      <div class="label">${this.label}</div>
      ${this._renderChipList}
    `;
  }

  get _renderChipList() {
    if (!this.items) {
      return html`<div class="chip-wrapper">
        ${repeat(shimmerData, () => html`<dw-chip shimmer></dw-chip>`)}
      </div>`;
    }

    if (this.items.length === 0) {
      return nothing;
    }

    return html`<div class="chip-wrapper">
      ${repeat(this.items, (item, index) => {
        const selected = this.#_isSelected(item);
        const activated = this.#_isActivated(index);
        return html`<dw-chip
          .value=${this.valueTextProvider(item)}
          ?selected=${selected}
          ?activated=${activated}
          .type=${this.type}
          @click=${() => this._onChipToggle(item, selected, index)}
        ></dw-chip>`;
      })}
    </div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.#_computeValueProvider();

    this.addEventListener("focusin", this._onFocusIn);
    this.addEventListener("focusout", this._onFocusOut);
    this.addEventListener("mousedown", this._onMouseDown);

    window.addEventListener("keydown", this._onKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("focusin", this._onFocusIn);
    this.removeEventListener("focusout", this._onFocusOut);
    this.removeEventListener("mousedown", this._onMouseDown);

    window.removeEventListener("keydown", this._onKeyDown);
  }

  willUpdate(_changedProperties) {
    if (_changedProperties.has("valueProvider") || _changedProperties.has("valueExpression")) {
      this.#_computeValueProvider();
    }
  }

  _onChipToggle(item, selected, index) {
    this._activatedIndex = index;
    const oItem = this._valueProvider(item);
    let oValue = cloneDeep(this.value);
    const previousValue = cloneDeep(oValue);

    switch (this.type) {
      case ChipTypes.filter:
        if (selected) {
          let index = oValue.findIndex((element) => this.valueEquator(oItem, element));
          if (index > -1) {
            oValue.splice(index, 1);
            oValue = [...oValue];
          }
        } else {
          if (!oValue || !Array.isArray(oValue)) oValue = [];
          oValue = [...oValue, oItem];
        }
        break;
      case ChipTypes.choice:
        if (!selected) {
          oValue = oItem;
        }
        break;
    }

    if (!isEqual(previousValue, oValue)) {
      this.value = oValue;
      this.dispatchEvent(new CustomEvent("change", { detail: this.value }));
    }
  }

  #_computeValueProvider() {
    if (!this.valueProvider && !this.valueExpression) {
      this._valueProvider = (item) => item;
      return;
    }

    if (this.valueExpression) {
      this._valueProvider = (item) => item[this.valueExpression];
      return;
    }

    this._valueProvider = this.valueProvider;
  }

  #_isSelected(item) {
    if (Array.isArray(this.value) && this.value.length > 0) {
      return this.value.some((element) => this.valueEquator(this._valueProvider(item), element));
    }

    return this.valueEquator(this._valueProvider(item), this.value);
  }

  #_isActivated(index) {
    return this._activatedIndex === index;
  }

  _onMouseDown() {
    this.mouseDowned = true;
  }

  _onFocusIn() {
    this.mouseDowned ? (this.mouseDowned = false) : (this._activatedIndex = 0);
    this.focused = true;
  }

  _onFocusOut() {
    this._activatedIndex = -1;
    this.focused = false;
  }

  _onKeyDown(e) {
    if (!this.focused) {
      return;
    }
    const { keyCode } = e;
    switch (keyCode) {
      case KeyCode.ARROW_DOWN:
      case KeyCode.ARROW_LEFT:
      case KeyCode.ARROW_RIGHT:
      case KeyCode.ARROW_UP:
      case KeyCode.ENTER:
      case KeyCode.SPACE:
        e.stopPropagation();
        e.preventDefault();
        break;
      default:
        break;
    }

    const itemsLength = this.items ? this.items.length : 0;

    switch (keyCode) {
      case KeyCode.ARROW_DOWN:
      case KeyCode.ARROW_RIGHT:
        if (itemsLength > 0) {
          this._activatedIndex = (this._activatedIndex + 1) % itemsLength;
        }
        break;
      case KeyCode.ARROW_UP:
      case KeyCode.ARROW_LEFT:
        if (itemsLength > 0) {
          this._activatedIndex = (this._activatedIndex - 1 + itemsLength) % itemsLength;
        }
        break;
      case KeyCode.ENTER:
      case KeyCode.SPACE:
        if (this._activatedIndex > -1) {
          const activatedItem = this.items[this._activatedIndex];
          const isSelected = this.#_isSelected(activatedItem);
          this._onChipToggle(activatedItem, isSelected, this._activatedIndex);
        }
        break;
      default:
        break;
    }
  }
}

customElements.define("dw-chip-select", DwChipSelect);
