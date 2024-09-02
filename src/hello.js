const template = document.createElement('template')
template.innerHTML = `
    <div class="main">
    <input type="text" class="userName" placeholder="Enter your first name!">
    <p class="hello-vowels"></p>
    </div>
`

/**
 * Gets a input from the user and converts tells the user how many vowels the user's name has.
 */
class Hello extends HTMLElement {

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))

    this.userName = this.shadowRoot.querySelector('.userName')
  }

  connectedCallback() {
    this.userName.addEventListener('keypress', this.handleKeyPress.bind(this))
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
    const nameValue = this.userName.value.toLowerCase().trim()
    let vowels = 0
    let indexOfVowel = []

    for (let i = 0; i < nameValue.length; i++) {
      if ('aeiou'.includes(nameValue[i])) {
        vowels++
        indexOfVowel.push(i)
      }
    }

    this.renderVowels(vowels, indexOfVowel)
  }

  renderVowels(count, index) {
    const nameSpan = this.shadowRoot.querySelector('.hello-vowels')

    if (count != undefined) {
      nameSpan.textContent = `Your name includes ${count} vowels on ${index.join(', ')}.`
    } else if (this.userName.value == undefined) {
      nameSpan.textContent = 'Please write a name or atleast a word!!!'
    } else {
      nameSpan.textContent = 'The name/word you entered has no vowels.'
    }
  }
}

customElements.define('Hello-Hello', Hello)
