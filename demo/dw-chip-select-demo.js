import { css, html, LitElement } from "lit";
import "../dw-chip-select.js";
import "../dw-chip.js";
import { ThemeStyle } from "@dreamworld/material-styles/theme.js";
import { country_list, country_with_code, PaymentTypes } from "./utils.js";

const componentName = "dw-chip-select-demo";

export class DwChipSelectDemo extends LitElement {
  static get styles() {
    return [
      ThemeStyle,
      css`
        dw-chip {
          margin-top: 16px;
          margin-right: 8px;
        }

        .wrapper {
          display: flex;
        }

        dw-chip-select {
          margin-top: 16px;
        }
      `,
    ];
  }
  render() {
    return html`
      <dw-chip-select
        label="Filter"
        .valueExpression=${"name"}
        .items=${PaymentTypes}
        .valueTextProvider=${(item) => item.label}
        @change=${this._onChange}
      ></dw-chip-select>
      <dw-chip-select
        type="choice"
        label="Choice"
        .valueExpression=${"name"}
        .items=${PaymentTypes}
        .valueTextProvider=${(item) => item.label}
        @change=${this._onChange}
      ></dw-chip-select>

      <dw-chip-select
        label="Country Filter"
        .items=${country_list}
        @change=${this._onChange}
      ></dw-chip-select>

      <dw-chip-select
        label="Country Choice"
        type="choice"
        .items=${country_with_code}
        .valueTextProvider=${(item) => `${item.name}: ${item.code}`}
        @change=${this._onChange}
      ></dw-chip-select>
    `;
  }

  _onChange(e) {
    console.log("change", e);
  }
}

customElements.define(componentName, DwChipSelectDemo);
