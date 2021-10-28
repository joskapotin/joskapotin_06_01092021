import config from "../../config/config.js"

const mediaFactory = ({ photographerId, media, type, alt }) => {
  const photographerMediaPath = `${config.mediasPath}/photographer-id-${photographerId}`
  const altText = alt

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
    // uiThumbnail.tabIndex = "-1"

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

  return uiFigure
}

export default mediaFactory
