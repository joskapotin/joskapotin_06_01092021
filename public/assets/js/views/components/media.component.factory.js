import config from "../../config/config.js"

/**
 * factory function. Return corresponding DOM element
 * @param {{photographerId:string, media:string, type:string, alt:string}}
 * @returns {HTMLElement} uiFigure
 */
const mediaFactory = ({ photographerId, media, type, alt }) => {
  if (type === "image") {
    return createImage({ photographerId, media, alt })
  } else if (type === "video") {
    return createVideo({ photographerId, media, alt })
  }
}

/**
 * create a html element image
 * @param {{photographerId:string, media:string, alt:string}}
 * @returns {HTMLElement} uiFigure
 */
const createImage = ({ photographerId, media, alt }) => {
  const photographerMediaPath = `${config.mediasPath}/photographer-id-${photographerId}`
  const altText = alt

  const uiFigure = document.createElement("figure")
  uiFigure.className = "media__figure"
  uiFigure.classList.add("media__figure--img")
  const uiThumbnail = document.createElement("img")
  uiThumbnail.classList.add("media", "media--img")
  uiThumbnail.alt = altText
  uiThumbnail.src = `${photographerMediaPath}/${media}`
  uiThumbnail.dataset.src = `${photographerMediaPath}/${media}`
  uiFigure.appendChild(uiThumbnail)

  return uiFigure
}

/**
 * create a html element video
 * @param {{photographerId:string, media:string, alt:string}}
 * @returns {HTMLElement} uiFigure
 */
const createVideo = ({ photographerId, media, alt }) => {
  const photographerMediaPath = `${config.mediasPath}/photographer-id-${photographerId}`
  const altText = alt

  const uiFigure = document.createElement("figure")
  uiFigure.className = "media__figure"
  uiFigure.classList.add("media__figure--video")
  const uiThumbnail = document.createElement("video")
  uiThumbnail.classList.add("media", "media--video")
  const ext = media.substr(media.lastIndexOf(".") + 1)
  const source = document.createElement("source")
  source.src = `${photographerMediaPath}/${media}`
  source.type = `video/${ext}`
  uiThumbnail.append(source)
  const uiFigcaption = document.createElement("figcaption")
  uiFigcaption.className = "visually-hidden"
  uiFigcaption.textContent = altText

  uiFigure.append(uiThumbnail, uiFigcaption)

  return uiFigure
}

export default mediaFactory
