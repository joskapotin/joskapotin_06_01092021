/**
 * Lightbox from https://grafikart.fr/tutoriels/lightbox-javascript-1224
 * @property {HTMLElement} element
 * @property {Object[]} medias URL and type of all medias
 * @property {string} currentMedia Current image
 */
export default class Lightbox {
  static init() {
    const links = Array.from(document.querySelectorAll("[data-lightbox]"))
    const medias = links.map(link => {
      return { url: link.getAttribute("href"), type: link.dataset.type, title: link.dataset.title, alt: link.dataset.alt }
    })

    links.forEach(link =>
      link.addEventListener("click", e => {
        e.preventDefault()
        const currentMedia = { url: e.currentTarget.getAttribute("href"), type: e.currentTarget.dataset.type, title: link.dataset.title, alt: link.dataset.alt }
        new Lightbox(currentMedia, medias)
      }),
    )
  }

  /**
   * @property {Object[]} medias URL and type of all medias
   * @property {string} currentMedia Current image
   */
  constructor(currentMedia, medias) {
    this.element = this.buildDOM()
    this.medias = medias
    this.loadMedia(currentMedia)
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
  loadMedia({ url, type, title, alt }) {
    this.url = null

    const figure = this.element.querySelector(".lightbox__figure")
    figure.innerHTML = ""

    const uiTitle = document.createElement("figcaption")
    uiTitle.textContent = title

    const loader = document.createElement("div")
    loader.classList.add("lightbox__loader")

    const media = type === "image" ? document.createElement("img") : document.createElement("video")
    media.className = "lightbox__media"
    media.alt = alt

    figure.appendChild(loader)

    if (type === "image") {
      media.src = url

      media.onload = () => {
        figure.removeChild(loader)
        figure.append(media, uiTitle)
        this.url = url
      }
    } else if (type === "video") {
      const ext = url.substr(url.lastIndexOf(".") + 1)
      const source = document.createElement("source")
      source.src = url
      source.type = `video/${ext}`
      media.controls = "controls"
      media.appendChild(source)

      figure.removeChild(loader)
      figure.append(media, uiTitle)
      this.url = url
    }
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
   * next media
   * @param {MouseEvent|KeyboardEvent} e
   */
  next(e) {
    e.preventDefault()
    let i = this.medias.findIndex(media => media.url === this.url)
    if (i === this.medias.length - 1) {
      i = -1
    }
    this.loadMedia(this.medias[i + 1])
  }

  /**
   * prev media
   * @param {MouseEvent|KeyboardEvent} e
   */
  prev(e) {
    e.preventDefault()
    let i = this.medias.findIndex(media => media.url === this.url)
    if (i === 0) {
      i = this.medias.length
    }
    this.loadMedia(this.medias[i - 1])
  }

  /**
   * Create lightbox DOM element
   * @returns {HTMLElement}
   */
  buildDOM() {
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
