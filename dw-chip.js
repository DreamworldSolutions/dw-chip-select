import { html, LitElement, css, nothing } from "lit";
import "@dreamworld/dw-ripple";
import "@dreamworld/dw-icon";

// Styles
import * as TypographyLiterals from "@dreamworld/material-styles/typography-literals.js";

const componentName = "dw-chip";
const Types = {
  filter: "filter",
  choice: "choice",
  input: "input",
};

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

        overflow: hidden;
        box-sizing: border-box;
      }

      :host(:not([selected])) {
        border: 1px solid var(--mdc-theme-divider-color, rgba(0, 0, 0, 0.12));
      }

      :host([selected]) {
        color: var(--mdc-theme-primary, #02afcd);
      }

      dw-ripple {
        position: absolute;
      }

      :host([selected]) dw-icon {
        padding-right: 8px;
        --dw-icon-color: var(--mdc-theme-primary, #02afcd);
      }

      .value {
        ${TypographyLiterals.body2};
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
      type: { type: String },

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
    };
  }

  constructor() {
    super();
    this.icon = "done";
    this.type = Types.filter;
  }

  render() {
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
    if (this.selected && this.type === Types.filter) {
      return html`<dw-icon name=${this.icon}></dw-icon>`;
    }
    return nothing;
  }
}

customElements.define(componentName, DwChip);
