import { css, html, LitElement } from "lit";
import "../dw-chip-select.js";
import "../dw-chip.js";
import { ThemeStyle } from "@dreamworld/material-styles/theme.js";

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
      `,
    ];
  }
  render() {
    return html`
      <dw-chip-select></dw-chip-select> <br />
      <div class="wrapper">
        <dw-chip .value=${"Chip View"}></dw-chip>

        <dw-chip .value=${"Selected"} selected></dw-chip>
      </div>
    `;
  }
}

customElements.define(componentName, DwChipSelectDemo);
