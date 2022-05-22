window
  .fetch("CustomButton/template.html")
  .then((stream) => stream.text())
  .then((text) => define(text));

function define(html) {
  class CustomButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.render();
    }

    render() {
      const { shadowRoot } = this;
      shadowRoot.innerHTML = html;
    }
  }

  window.customElements.define("custom-button", CustomButton);
}
