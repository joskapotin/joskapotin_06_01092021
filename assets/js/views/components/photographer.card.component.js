import config from "../../config/config.js"
import tagNav from "./tag.nav.component.js"

/**
 * create photographer card
 * @param {{name:string, id:string, city:string, country:string, tags:string, tagline:string, price:string, portrait:string,currentTag:string }}
 * @returns {HTMLElement} uiPhotographerCard
 */
const photographerCardComponent = ({ photographer: { name, id, city, country, tags, tagline, price, portrait }, currentTag }) => {
  const uiPhotographerCard = document.createElement("article")
  uiPhotographerCard.classList = "card card-photographer"
  uiPhotographerCard.dataset.id = "id"
  uiPhotographerCard.dataset.tagFiltrable = "true"

  const uiPortrait = document.createElement("img")
  uiPortrait.src = `${config.photographeThumbPath}/${portrait}`
  uiPortrait.alt = "Portrait du Photographe"
  uiPortrait.className = "card__img"

  const uiName = document.createElement("h2")
  uiName.className = "card__name"
  uiName.textContent = name

  const uiLocation = document.createElement("h3")
  uiLocation.className = "card__location"
  uiLocation.textContent = `${city}, ${country}`

  const uiTagline = document.createElement("p")
  uiTagline.className = "card__tagline"
  uiTagline.textContent = tagline

  const uiPrice = document.createElement("p")
  uiPrice.className = "card__pricing"
  uiPrice.ariaLabel = `${price}€ par jour`
  uiPrice.textContent = `${price}€/jour`

  const uiTagNav = tagNav({ tags, currentTag })
  uiTagNav.ariaLabel = "Secondary"

  const uiLink = document.createElement("a")
  uiLink.href = `/photographer/${id}`
  uiLink.className = "card-link"
  uiLink.dataset.link = ""

  uiLink.append(uiPortrait, uiName, uiLocation, uiTagline, uiPrice)
  uiPhotographerCard.append(uiLink, uiTagNav)

  return uiPhotographerCard
}

export default photographerCardComponent
