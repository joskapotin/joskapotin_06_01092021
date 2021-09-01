import config from "../../config/config.js"
import likeIconComponent from "./like.icon.component.js"

const formatAlternativeText = text => {
  return text.slice(0, -4).replaceAll("_", " ")
}

const mediaCardComponent = ({ photographerId, title, image, video, likes, date, price }) => {
  const photographerMediaPath = `${config.mediasPath}/photographer-id-${photographerId}`
  const uiAlt = image ? formatAlternativeText(image) : formatAlternativeText(video)
  const ext = video?.substr(video.lastIndexOf(".") + 1)

  const uiMediaCard = document.createElement("article")
  uiMediaCard.className = "media__content"
  uiMediaCard.dataset.id = "id"
  uiMediaCard.dataset.tagFiltrable = "true"

  const uiLink = document.createElement("a")
  uiLink.href = image ? `${photographerMediaPath}/${image}` : `${photographerMediaPath}/${video}`
  uiLink.className = "media__link"
  uiLink.dataset.lightbox = ""

  const uiFigure = document.createElement("figure")
  uiFigure.className = "media__figure"
  if (video) uiFigure.classList.add("media__figure-video")

  const uiThumbnail = image ? document.createElement("img") : document.createElement("video")

  if (image) {
    uiThumbnail.classList = "media media-img"
    uiThumbnail.alt = uiAlt
    uiThumbnail.dataset.src = `${photographerMediaPath}/${image}`
    uiThumbnail.src = `${photographerMediaPath}/${image}`

    uiFigure.append(uiThumbnail)
  } else if (video) {
    uiThumbnail.classList = "media media-video"
    uiThumbnail.dataset.src = `${photographerMediaPath}/${video}`
    uiThumbnail.src = `${photographerMediaPath}/${video}`
    uiThumbnail.type = `video/${ext}`
    uiThumbnail.tabIndex = "-1"

    const uiFigcaption = document.createElement("figcaption")
    uiFigcaption.className = "visually-hidden"
    uiFigcaption.textContent = uiAlt

    uiFigure.append(uiThumbnail, uiFigcaption)
  }

  const uiFooter = document.createElement("footer")
  uiFooter.className = "media__footer"

  const uiTitle = document.createElement("h3")
  uiTitle.className = "media__title"
  uiTitle.textContent = title

  const uiDate = document.createElement("span")
  uiDate.className = "media__date"
  uiDate.textContent = date

  const uiPrice = document.createElement("span")
  uiPrice.className = "media__price"
  uiPrice.textContent = `${price}€`

  const uiLikes = document.createElement("span")
  uiLikes.className = "media__likes"
  uiLikes.textContent = likes

  const uiLikeBtn = document.createElement("button")
  uiLikeBtn.className = "btn-like"
  uiLikeBtn.dataset.tooltip = "Click if you like"
  const uiLikeIcon = likeIconComponent()
  const uiLikeTxt = document.createElement("span")
  uiLikeTxt.classList.add("btn-like__txt", "visually-hidden")
  uiLikeTxt.textContent = "Like this media"

  uiLikeBtn.addEventListener("click", e => {
    e.preventDefault()
    console.log("like +1")
  })

  uiLikeBtn.append(uiLikeIcon, uiLikeTxt)
  uiLikes.appendChild(uiLikeBtn)
  uiFooter.append(uiTitle, uiDate, uiPrice, uiLikes)
  uiLink.appendChild(uiFigure)
  uiMediaCard.append(uiLink, uiFooter)

  return uiMediaCard
}

export default mediaCardComponent
