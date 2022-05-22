window
  .fetch("CustomPanel/template.html")
  .then((stream) => stream.text())
  .then((text) => definePanel(text));

function definePanel(html) {
  class CustomPanel extends HTMLElement {

    static get observedAttributes() {
      return ["title", "content", "variant"];
    }

     get title() {
      return this.getAttribute("title");
    }
    get content(){
      return this.getAttribute("content");
    }
    get variant(){
      return this.getAttribute("variant");
    }

    set content(value){
      this.setAttribute("content", value);
    }
    set title(value){
      this.setAttribute("title", value);
    }
    set variant(value){
      this.setAttribute("variant", value);
    }

    constructor(){
      super();
      this.attachShadow({ mode: "open" });
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
			if (oldValue !== newValue) {
				this[attrName] = newValue;
				this.render();
			}
    }

    connectedCallback(){
        this.render();
    }

		render() {
			const { shadowRoot } = this;
			shadowRoot.innerHTML = html;
			const panel = shadowRoot.querySelector("div.panel");
			const panelTitle = panel.querySelector("span.panel-title");
			const panelContent = panel.querySelector(".panel-content");
			if (panel) {
				if(this.title && panelTitle) panelTitle.innerHTML = this.title;
				if(this.content && panelContent) panelContent.innerHTML = this.content;
        if(this.variant){
          panel.classList.add(this.variant);
        } else{
          panel.classList.add("primary");
        }
			}
    }
  }

  window.customElements.get('custom-panel') || window.customElements.define("custom-panel", CustomPanel);

}
