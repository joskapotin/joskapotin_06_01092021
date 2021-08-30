import config from "../../api/config.js"
import tagNav from "../tags/tag.nav.js"

const photographerCard = async ({ name, id, city, country, tags, tagline, price, portrait }) => {
  const uiArticle = document.createElement("article")
  uiArticle.classList = "card card-photographer"
  uiArticle.dataset.id = "id"
  uiArticle.dataset.tagFiltrable = "true"

  const uiPortrait = document.createElement("img")
  uiPortrait.src = `${config.photographeThumbPath}/${portrait}`
  uiPortrait.alt = ""
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
  uiPrice.textContent = `${price}€/jour`

  const uiTagNav = await tagNav(tags)

  const uiLink = document.createElement("a")
  uiLink.href = `/photographer/${id}`
  uiLink.className = "card-link"
  uiLink.dataset.link = ""

  uiLink.append(uiPortrait, uiName, uiLocation, uiTagline, uiPrice)
  uiArticle.append(uiLink, uiTagNav)

  return uiArticle
}

export default photographerCard
