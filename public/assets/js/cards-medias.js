import { mediasPath, uiMain } from "./options.js"

const createMediasCards = (medias, photographerId) => {
  const mediasCards = []

  medias.forEach(media => {
    const { id, title, image, video, likes, date, price } = media
    const photographerMediaPath = `${mediasPath}/photographer-id-${photographerId}`
    let thumbnail = `<img class="media media-img" data-src="${photographerMediaPath}/${image}" src="${photographerMediaPath}/${image}">`

    if (video) {
      const ext = video.substr(video.lastIndexOf(".") + 1)
      thumbnail = `<video class="media media-video" data-src="${photographerMediaPath}/${image}"><source src="${photographerMediaPath}/${video}" type="video/${ext}"></video>`
    }

    const uiMedia = `<article class="media__content" data-id="${id}" data-tag-filtrable><a href="#media-id-${id}" class="media__link"><figure class="media__figure">${thumbnail}</figure></a><footer class="media__footer"><h3 class="media__title">${title}</h3><span class="media__date">${date}</span><span class="media__price">${price}€</span><span class="media__total-likes">${likes}<button class="btn-like">Like</button></span></footer></article>`
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
