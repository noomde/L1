const template = document.createElement('template')
template.innerHTML = `
    <div class="main">
    <input type="text" class="userName">
    </div>
`

/**
 * Gets a input from the user and converts tells the user how many vowels the user's name has.
 */
class Hello extends HTMLElement {

  constructor () {
    super() 
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))

    this.userName = this.shadowRoot.querySelector('.userName')
  }

  connectedCallback() {
    this.userName.addEventListener('keypress', this.handleKeypress.bind(this))
  }

  disconnectedCallback() {
    this.userName.removeEventListener('keypress', this.handleKeyPress.bind(this))
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.countVowels()
    }
  }

  countVowels() {
    
  }

  renderVowels() {

  }
}

customElements.define('Hello', Hello)
