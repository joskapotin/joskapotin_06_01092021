import config from "../../config/config.js"
import likeIconComponent from "./like.icon.component.js"

const formatAlternativeText = text => {
  return text.slice(0, -4).replaceAll("_", " ")
}

const mediaCardComponent = ({ photographerId, title, media, type, likes, date, price, tags }) => {
  const photographerMediaPath = `${config.mediasPath}/photographer-id-${photographerId}`
  const altText = formatAlternativeText(media)

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

  const uiFigure = document.createElement("figure")
  uiFigure.className = "media__figure"

  if (type === "image") {
    uiFigure.classList.add("media__figure--img")
    const uiThumbnail = document.createElement("img")
    uiThumbnail.classList.add("media", "media--img")
    uiThumbnail.alt = altText
    uiThumbnail.src = `${photographerMediaPath}/${media}`
    uiThumbnail.dataset.src = `${photographerMediaPath}/${media}`

    uiFigure.appendChild(uiThumbnail)
  } else if (type === "video") {
    uiFigure.classList.add("media__figure--video")
    const uiThumbnail = document.createElement("video")
    uiThumbnail.classList.add("media", "media--video")
    uiThumbnail.tabIndex = "-1"

    const ext = media.substr(media.lastIndexOf(".") + 1)
    const source = document.createElement("source")
    source.src = `${photographerMediaPath}/${media}`
    source.type = `video/${ext}`

    uiThumbnail.append(source)

    const uiFigcaption = document.createElement("figcaption")
    uiFigcaption.className = "visually-hidden"
    uiFigcaption.textContent = altText

    uiFigure.append(uiThumbnail, uiFigcaption)
  }

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
  uiFooter.append(uiTitle, uiDate, uiPrice, uiLikes)
  uiLink.appendChild(uiFigure)
  uiMediaCard.append(uiLink, uiFooter)

  return uiMediaCard
}

export default mediaCardComponent
