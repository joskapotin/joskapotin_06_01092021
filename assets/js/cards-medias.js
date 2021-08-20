import { mediasPath, uiMain } from "./options.js"

const createMediasCards = (medias, photographerId) => {
  const mediasCards = []

  medias.forEach(media => {
    const { id, title, image, video, likes, date, price } = media
    const photographerMediaPath = `${mediasPath}/photographer-id-${photographerId}`
    const alt = image?.slice(0, -4).replaceAll("_", " ") ?? video?.slice(0, -4).replaceAll("_", " ")

    let thumbnail = `<figure class="media__figure"><img class="media media-img" alt="${alt}" data-src="${photographerMediaPath}/${image}" src="${photographerMediaPath}/${image}"></figure>`

    if (video) {
      const ext = video.substr(video.lastIndexOf(".") + 1)
      thumbnail = `<figure class="media__figure media__figure-video"><video tabindex="-1" class="media media-video" data-src="${photographerMediaPath}/${image}"><source src="${photographerMediaPath}/${video}" type="video/${ext}"></video><figcaption class="visually-hidden">${alt}</figcaption></figure>`
    }

    const uiMedia = `<article class="media__content" data-id="${id}" data-tag-filtrable><a href="media/${id}" class="media__link">${thumbnail}</a><footer class="media__footer"><h3 class="media__title">${title}</h3><span class="media__date">${date}</span><span class="media__price">${price}€</span><span class="media__total-likes">${likes}<button class="btn-like">Like</button></span></footer></article>`
    mediasCards.push(uiMedia)
  })

  return mediasCards.join("")
}

const initMediasCards = async (medias, photographerId) => {
  document.querySelectorAll(".media__content[data-tag-filtrable]").forEach(element => element.remove())

  const mediasCards = createMediasCards(medias, photographerId)
  const uiGallery = uiMain.querySelector("#media-gallery")

  uiGallery.insertAdjacentHTML("beforeend", mediasCards)
}

export default initMediasCards
