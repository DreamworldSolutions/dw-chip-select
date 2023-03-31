import { html, LitElement } from "lit";
import "../dw-chip-select.js";

const componentName = "dw-chip-select-demo";

export class DwChipSelectDemo extends LitElement {
  render() {
    return html`<dw-chip-select></dw-chip-select>`;
  }
}

customElements.define(componentName, DwChipSelectDemo);
