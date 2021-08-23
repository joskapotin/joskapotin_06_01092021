import { config } from "./config.js"
import { mediaFactory } from "./factory.js"

const createMediasCards = medias => {
  const mediasCards = []

  medias.forEach(media => {
    mediasCards.push(mediaFactory(media))
  })

  return mediasCards.join("")
}

const initMediasCards = async (medias, photographerId) => {
  document.querySelectorAll(".media__content[data-tag-filtrable]").forEach(element => element.remove())

  const mediasCards = createMediasCards(medias, photographerId)
  const uiGallery = config.uiMain.querySelector("#media-gallery")

  uiGallery.insertAdjacentHTML("beforeend", mediasCards)
}

export default initMediasCards
