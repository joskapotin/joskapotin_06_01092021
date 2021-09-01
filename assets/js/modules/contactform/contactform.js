/**
 * @property {HTMLElement} element
 */
export default class ContactForm {
  static init(name) {
    const contactForm = new ContactForm(name)
    contactForm()
  }

  constructor(name) {
    this.name = name
    this.element = this.buildDOM()
    document.body.appendChild(this.element)
  }

  buildDOM() {
    const uiModal = document.createElement("aside")
    uiModal.classList.add("form-contact", "modal")

    const uiContent = document.createElement("section")
    uiContent.classList.add("modal__content")

    const uiCloseBtn = document.createElement("button")
    uiCloseBtn.classList.add("btn", "btn-close-modal")
    const uiCloseBtntxt = document.createElement("span")
    uiCloseBtntxt.classList.add("visually-hidden")
    uiCloseBtntxt.textContent = "Fermer le formulaire"

    const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    iconSvg.setAttribute("fill", "inherit")
    iconSvg.setAttribute("viewBox", "0 0 20 20")
    iconSvg.classList.add("close-modal__icon")
    const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
    iconPath.setAttribute("d", "M19.333 2.547l-1.88-1.88L10 8.12 2.547.667l-1.88 1.88L8.12 10 .667 17.453l1.88 1.88L10 11.88l7.453 7.453 1.88-1.88L11.88 10l7.453-7.453z")
    iconSvg.appendChild(iconPath)

    const uiHeader = document.createElement("header")
    uiHeader.classList.add("form__header")

    const uiTitle = document.createElement("h4")
    uiTitle.classList.add("form__title")
    uiTitle.textContent = "Contactez moi"

    const uiSubtitle = document.createElement("h5")
    uiSubtitle.classList.add("form__subtitle")
    uiSubtitle.textContent = this.name

    const uiForm = document.createElement("form")
    uiForm.name = "form-contact"
    uiForm.classList.add("form-contact")

    const uiLabelFirstname = document.createElement("label")
    uiLabelFirstname.classList.add("text-label")
    uiLabelFirstname.textContent = "Prénom"

    const uiInputFirstname = document.createElement("input")
    uiInputFirstname.classList.add("text-control")
    uiInputFirstname.type = "text"
    uiInputFirstname.name = "name"

    const uiLabelLastname = document.createElement("label")
    uiLabelLastname.classList.add("text-label")
    uiLabelLastname.textContent = "Nom"

    const uiInputLastname = document.createElement("input")
    uiInputLastname.classList.add("text-control")
    uiInputLastname.type = "text"
    uiInputLastname.name = "lastname"

    const uiLabelEmail = document.createElement("label")
    uiLabelEmail.classList.add("text-label")
    uiLabelEmail.textContent = "Email"

    const uiInputEmail = document.createElement("input")
    uiInputEmail.classList.add("text-control")
    uiInputEmail.type = "email"
    uiInputEmail.name = "email"

    const uiLabelMessage = document.createElement("label")
    uiLabelMessage.classList.add("text-label")
    uiLabelMessage.textContent = "Votre message"

    const uiInputMessage = document.createElement("textarea")
    uiInputMessage.classList.add("text-control")
    uiInputMessage.name = "message"

    const uiSubmitButton = document.createElement("button")
    uiSubmitButton.classList.add("btn", "btn-submit")
    uiSubmitButton.textContent = "Envoyer"

    uiCloseBtn.append(iconSvg, uiCloseBtntxt)
    uiHeader.append(uiTitle, uiSubtitle)

    uiLabelFirstname.appendChild(uiInputFirstname)
    uiLabelLastname.appendChild(uiInputLastname)
    uiLabelEmail.appendChild(uiInputEmail)
    uiLabelMessage.appendChild(uiInputMessage)

    uiForm.append(uiLabelFirstname, uiLabelLastname, uiLabelEmail, uiLabelMessage, uiSubmitButton)
    uiContent.append(uiHeader, uiCloseBtn, uiForm)
    uiModal.appendChild(uiContent)

    return uiModal
  }
}
