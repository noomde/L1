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

  /**
   * The constructor.
   */
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
      .appendChild(template.content.cloneNode(true))

    this.userName = this.shadowRoot.querySelector('.userName')
  }

  /**
   * The connected callback.
   */
  connectedCallback() {
    this.userName.addEventListener('keypress', this.handleKeyPress.bind(this))
  }

  /**
   * The disconnected callback
   */
  disconnectedCallback() {
    this.userName.removeEventListener('keypress', this.handleKeyPress.bind(this))
  }

  /**
   * Makes sure the users keypress works.
   *
   * @param {Event} e - Handles the users keypress
   */
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.countVowels()
    }
  }

  /**
   * Checks the users input.
   *
   * @returns { 1 | 2| 3 | Array} - Returns a number/array depending on the users input.
   */
  checkInput() {
    const name = this.userName.value.trim()
    if (name === undefined) {
      return 1
    } else if (name.length < 2) {
      return 2
    } else if (name.split(' ').length > 1) {
      const fullName = name.split(' ')
      return fullName
    } else {
      return 3
    }
  }

  /**
   * Counts the vowels in the users name.
   */
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

  /**
   * Renders the respons to the user.
   *
   * @param {number} count - The number of vowels.
   * @param {number} index - The index of the vowels
   */
  renderVowels(count, index) {
    const nameSpan = this.shadowRoot.querySelector('.hello-vowels')

    const checkedName = this.checkInput()

    if (checkedName == 3) {
      nameSpan.textContent = `Your name includes ${count} vowels on index ${index.join(', ')}.`
    } else if (checkedName == 1) {
      nameSpan.textContent = 'Please write a name or atleast a word!!!'
    } else if (checkedName == 2) {
      nameSpan.textContent = 'Please write a name longer than 2'
    } else if (Array.isArray(checkedName)) {
      nameSpan.textContent = `Your full name includes ${count} vowels on index ${index.join(', ')}.`
    }
  }
}

customElements.define('Hello-Hello', Hello)
