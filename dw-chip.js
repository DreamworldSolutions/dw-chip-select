import { css, html, LitElement, nothing } from "@dreamworld/pwa-helpers/lit.js";
import { classMap } from "lit/directives/class-map.js";

// View Elements
import "@dreamworld/dw-icon";
import "@dreamworld/dw-ripple";

// Utils
import { ChipTypes } from "./utils";

// Styles
import { body2 } from "@dreamworld/material-styles/typography-literals.js";
import { animate } from "@lit-labs/motion";

export class DwChip extends LitElement {
  static get styles() {
    return css`
      :host {
        position: relative;
        display: flex;
        align-items: center;
        padding-left: 12px;
        padding-right: 12px;
        height: var(--dw-chip-height, 32px);
        border-radius: calc(var(--dw-chip-height, 32px) / 2);
        border: 1px solid transparent;
        ${body2};

        overflow: hidden;
        box-sizing: border-box;
        cursor: pointer;
      }

      :host(:not([selected])) {
        border: 1px solid var(--mdc-theme-divider-color, rgba(0, 0, 0, 0.12));
      }

      :host([selected][type="filter"]) {
        padding-left: 0px;
      }

      :host([selected]) {
        color: var(--mdc-theme-primary, #02afcd);
      }

      :host([selected]) dw-icon {
        padding-right: 8px;
        padding-left: 4px;
        --dw-icon-color: var(--mdc-theme-primary, #02afcd);
      }

      .hide {
        width: 0;
        overflow: hidden;
      }

      .show {
        width: max-content;
      }

      .shimmer {
        background: var(
          --dw-chip-select-shimmer-gradiant,
          linear-gradient(to right, #f1efef, #f9f8f8, #e7e5e5)
        );
        height: 20px;
        width: 64px;
        flex: 1;
        border-radius: 4px;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * Determines the type of chip view to be rendered.
       * Possible values: 'filter', 'choice', and 'input'
       * Default value: 'filter'
       */
      type: { type: String, reflect: true },

      /**
       * Indicates whether the chip is selected or not.
       */
      selected: { type: Boolean },

      /**
       * Indicates whether the chip is activated or not.
       */
      activated: { type: Boolean },

      /**
       * Specifies the value to be shown as text in the chip.
       */
      value: { type: String },

      /**
       * Indicates whether the chip is disabled or not.
       */
      disabled: { type: Boolean },

      /**
       * Specifies the material icon name to be shown as the leading icon in the chip.
       * Default: 'done'
       */
      icon: { type: String },

      /**
       * Input property
       * Whether to show shimmer view or not
       */
      shimmer: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.icon = "done";
    this.type = ChipTypes.filter;
  }

  render() {
    if (this.shimmer) {
      return html`<div class="shimmer"></div>`;
    }
    return html`
      <dw-ripple
        primary
        ?activated=${this.activated}
        ?selected=${this.selected}
        ?disabled=${this.disabled}
      ></dw-ripple>
      ${this._renderLeadingIcon}
      <div class="value">${this.value}</div>
    `;
  }

  get _renderLeadingIcon() {
    if (this.type === ChipTypes.filter) {
      return html`<dw-icon
        name=${this.icon}
        class="${classMap({ show: this.selected, hide: !this.selected })}"
        ${animate()}
      ></dw-icon>`;
    }
    return nothing;
  }
}

customElements.define("dw-chip", DwChip);
