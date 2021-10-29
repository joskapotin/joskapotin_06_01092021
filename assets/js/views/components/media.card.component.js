import config from "../../config/config.js"
import likeIconComponent from "./like.icon.component.js"
import mediaFactory from "./media.component.factory.js"

/**
 * Create media card element
 * @param {{photographerId:string, title:string, media:string, type:string, likes:string, date:string, price:string, alt:string}}
 * @returns {HTMLElement} uiMediaCard
 */
const mediaCardComponent = ({ photographerId, title, media, type, likes, date, price, alt }) => {
  const photographerMediaPath = `${config.mediasPath}/photographer-id-${photographerId}`
  const altText = alt

  const uiMediaCard = document.createElement("article")
  uiMediaCard.className = "media__content"
  uiMediaCard.dataset.id = "id"
  uiMediaCard.dataset.tagFiltrable = "true"

  const uiLink = document.createElement("a")
  uiLink.href = `${photographerMediaPath}/${media}`
  uiLink.className = "media__link"
  uiLink.dataset.type = type
  uiLink.dataset.lightbox = "true"
  uiLink.dataset.title = title
  uiLink.dataset.alt = altText
  uiLink.title = altText

  const uiFooter = document.createElement("footer")
  uiFooter.className = "media__footer"

  const uiTitle = document.createElement("h3")
  uiTitle.className = "media__title"
  uiTitle.textContent = title

  const uiDate = document.createElement("span")
  uiDate.className = "media__date"
  uiDate.ariaLabel = "Date"
  uiDate.textContent = date

  const uiPrice = document.createElement("span")
  uiPrice.className = "media__price"
  uiPrice.ariaLabel = "Price"
  uiPrice.textContent = `${price}€`

  const uiLikes = document.createElement("span")
  uiLikes.className = "media__likes"

  const uiLikesNbr = document.createElement("span")
  uiLikesNbr.classList.add("media__likes-number")
  uiLikesNbr.ariaLabel = "Total likes number"
  uiLikesNbr.textContent = likes

  const uiLikeBtn = document.createElement("button")
  uiLikeBtn.className = "btn-like"
  uiLikeBtn.dataset.tooltip = "Click if you like"
  const uiLikeTxt = document.createElement("span")
  uiLikeTxt.classList.add("btn-like__txt", "visually-hidden")
  uiLikeTxt.textContent = "Like this media"
  const uiLikeIcon = likeIconComponent()

  uiLikeBtn.append(uiLikeIcon, uiLikeTxt)
  uiLikes.append(uiLikesNbr, uiLikeBtn)
  uiFooter.append(uiTitle, uiDate, uiLikes)
  uiLink.appendChild(mediaFactory({ photographerId, media, type, alt }))
  uiMediaCard.append(uiLink, uiFooter)

  return uiMediaCard
}

export default mediaCardComponent
