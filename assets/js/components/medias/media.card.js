import config from "../../api/config.js"

const formatAlternativeText = text => {
  return text.slice(0, -4).replaceAll("_", " ")
}

const createLikeIcon = () => {
  const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
  iconSvg.setAttribute("fill", "inherit")
  iconSvg.setAttribute("viewBox", "0 0 19 19")
  iconSvg.classList.add("btn-like__icon")

  const iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
  iconPath.setAttribute(
    "d",
    "M9.5 18.35l-1.269-1.32C3.725 12.36.75 9.28.75 5.5.75 2.42 2.868 0 5.563 0 7.085 0 8.546.81 9.5 2.09 10.454.81 11.915 0 13.438 0c2.694 0 4.812 2.42 4.812 5.5 0 3.78-2.975 6.86-7.481 11.54L9.5 18.35z",
  )

  iconSvg.appendChild(iconPath)

  return iconSvg
}

const mediaCard = ({ id, photographerId, title, image, video, likes, date, price }) => {
  const photographerMediaPath = `${config.mediasPath}/photographer-id-${photographerId}`
  const uiAlt = image ? formatAlternativeText(image) : formatAlternativeText(video)
  const ext = video?.substr(video.lastIndexOf(".") + 1)

  const uiMedia = document.createElement("article")
  uiMedia.className = "media__content"
  uiMedia.dataset.id = "id"
  uiMedia.dataset.tagFiltrable = "true"

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
  const uiLikeIcon = createLikeIcon()
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
  uiMedia.append(uiLink, uiFooter)

  return uiMedia
}

export default mediaCard
