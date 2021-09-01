/**
 * Lightbox from https://grafikart.fr/tutoriels/lightbox-javascript-1224
 * @property {HTMLElement} element
 * @property {string[]} images Lightbox images path
 * @property {string} image Current image
 */
export default class Lightbox {
  static init() {
    const links = Array.from(document.querySelectorAll("[data-lightbox]"))
    const images = links.map(link => link.getAttribute("href"))

    links.forEach(link =>
      link.addEventListener("click", e => {
        e.preventDefault()
        new Lightbox(e.currentTarget.getAttribute("href"), images)
      }),
    )
  }

  /**
   * @param {string} url URL du medias
   * @param {string[]} images Lightbox images path
   */
  constructor(url, images) {
    this.element = this.buildDOM(url)
    this.images = images
    this.loadImage(url)
    document.body.appendChild(this.element)

    this.onKeyUp = this.onKeyUp.bind(this)
    document.addEventListener("keyup", this.onKeyUp)

    this.focusableElements = "button"
    this.firstFocusableElement = this.element.querySelectorAll(this.focusableElements)[0] // get first element to be focused inside modal
    this.focusableContent = this.element.querySelectorAll(this.focusableElements)
    this.lastFocusableElement = this.focusableContent[this.focusableContent.length - 1] // get last element to be focused inside modal
    this.firstFocusableElement.focus()
    this.onKeyDown = this.onKeyDown.bind(this)
    document.addEventListener("keydown", this.onKeyDown)
  }

  /**
   *
   * @param {string} url du media
   */
  loadImage(url) {
    this.url = null
    const image = new Image()
    const figure = this.element.querySelector(".lightbox__figure")
    const loader = document.createElement("div")
    loader.classList.add("lightbox__loader")
    figure.innerHTML = ""
    figure.appendChild(loader)
    image.onload = () => {
      figure.removeChild(loader)
      figure.appendChild(image)
      this.url = url
    }
    image.src = url
    image.className = "lightbox__img"
  }

  onKeyDown(e) {
    const isTabPressed = e.key === "Tab" || e.keyCode === 9

    if (!isTabPressed) {
      return
    }

    if (e.shiftKey) {
      // if shift key pressed for shift + tab combination
      if (document.activeElement === this.firstFocusableElement) {
        this.lastFocusableElement.focus() // add focus for the last focusable element
        e.preventDefault()
      }
    } else {
      // if tab key is pressed
      if (document.activeElement === this.lastFocusableElement) {
        // if focused has reached to last focusable element then focus first focusable element after pressing tab
        this.firstFocusableElement.focus() // add focus for the first focusable element
        e.preventDefault()
      }
    }
  }

  /**
   * @param {KeyboardEvent} e
   */
  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e)
    } else if (e.key === "ArrowLeft") {
      this.prev(e)
    } else if (e.key === "ArrowRight") {
      this.next(e)
    }
  }

  /**
   * Close the lightbox
   * @param {MouseEvent|KeyboardEvent} e
   */
  close(e) {
    e.preventDefault(this.element.classList.add("fade-out"))
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element)
    }, 500)
    document.removeEventListener("keyup", this.onKeyUp)
    document.removeEventListener("keydown", this.onKeyDown)
  }

  /**
   * Close the lightbox
   * @param {MouseEvent|KeyboardEvent} e
   */
  next(e) {
    e.preventDefault()
    let i = this.images.findIndex(image => image === this.url)
    if (i === this.images.length - 1) {
      i = -1
    }
    this.loadImage(this.images[i + 1])
  }

  /**
   * Close the lightbox
   * @param {MouseEvent|KeyboardEvent} e
   */
  prev(e) {
    e.preventDefault()
    let i = this.images.findIndex(image => image === this.url)
    if (i === 0) {
      i = this.images.length
    }
    this.loadImage(this.images[i - 1])
  }

  /**
   * @param {string} url URL du media
   * @returns {HTMLElement}
   */
  buildDOM(url) {
    const box = document.createElement("div")
    box.className = "lightbox"

    const closeBtn = document.createElement("button")
    closeBtn.className = "lightbox__close"
    const closeBtnTxt = document.createElement("span")
    closeBtnTxt.className = "visually-hidden"
    closeBtnTxt.textContent = "Fermer"
    closeBtn.appendChild(closeBtnTxt)
    closeBtn.addEventListener("click", this.close.bind(this))

    const prevBtn = document.createElement("button")
    prevBtn.className = "lightbox__prev"
    const prevBtnTxt = document.createElement("span")
    prevBtnTxt.className = "visually-hidden"
    prevBtnTxt.textContent = "Précédent"
    prevBtn.appendChild(prevBtnTxt)
    prevBtn.addEventListener("click", this.prev.bind(this))

    const nextBtn = document.createElement("button")
    nextBtn.className = "lightbox__next"
    const nextBtnTxt = document.createElement("span")
    nextBtnTxt.className = "visually-hidden"
    nextBtnTxt.textContent = "Suivant"
    nextBtn.appendChild(nextBtnTxt)
    nextBtn.addEventListener("click", this.next.bind(this))

    const container = document.createElement("div")
    container.className = "lightbox__container"

    const figure = document.createElement("figure")
    figure.className = "lightbox__figure"

    container.append(prevBtn, nextBtn, closeBtn, figure)
    box.appendChild(container)

    return box
  }
}
