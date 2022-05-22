window
  .fetch("CustomButton/template.html")
  .then((stream) => stream.text())
  .then((text) => defineButton(text));

function defineButton(html) {
  class CustomButton extends HTMLElement {
    static get observedAttributes() {
      return ["label", "variant"];
    }

    get label() {
      return this.getAttribute("label");
    }
    get variant(){
      return this.getAttribute("variant");
    }

    set variant(value){
      this.setAttribute("variant", value);
    }
    set label(value){
      this.setAttribute("label", value);
    }

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
      if (oldValue !== newValue) {
        this[attrName] = newValue;
        this.render();
      }
    }

    render() {
      const { shadowRoot } = this;
      shadowRoot.innerHTML = html;
      const button = shadowRoot.querySelector("button");
      if (button) {
        if(this.label) button.innerHTML = this.label;
        if (this.variant) {
          button.classList.add(this.variant);
        } else {
          button.classList.add("primary");
        }
      }
    }
  }

  window.customElements.get('custom-button') || window.customElements.define("custom-button", CustomButton);
}
