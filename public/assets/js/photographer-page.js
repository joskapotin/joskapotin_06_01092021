import { photographeThumbPath, mediasPath, uiHeader, uiMain } from "./options.js"
import { getMediasByPhotographer, createTaglist, initTagNav, resetApp } from "./helpers.js"

const uiCreateHeader = ({ name, city, country, tags, tagline, portrait, price }) => {
  const thumbnail = `${photographeThumbPath}/${portrait}`
  const tagList = createTaglist(tags)
  const header = `<section class="card card-single" data-reset><img class="card__img" src="${thumbnail}" height="auto" width="auto"><h1 class="card__name">${name}</h1><h2 class="card__location">${city}, ${country}</h2><p class="card__tagline">${tagline}</p><ul class="tag-list">${tagList}</ul><button class="btn card__btn">Contactez-moi</button><footer class="card__footer"><span class="card__likes">297 081</span><span class="card__pricing">${price}€/jour</span></footer></section>`
  uiHeader.insertAdjacentHTML("beforeend", header)
}

const uiCreateGallery = (medias, photographerId) => {
  const uiGalleryArray = []
  medias.forEach(media => {
    const { id, title, image, video, likes, date, price } = media
    const photographerMediaPath = `${mediasPath}/photographer-id-${photographerId}`
    let thumbnail = `<img class="media media-img" data-src="${photographerMediaPath}/${image}" src="${photographerMediaPath}/${image}">`

    if (video) {
      const ext = video.substr(video.lastIndexOf(".") + 1)
      thumbnail = `<video class="media media-video" data-src="${photographerMediaPath}/${image}"><source src="${photographerMediaPath}/${video}" type="video/${ext}"></video>`
    }

    // Each media get an unique id and data-id from the photographer id
    const uiMedia = `<article class="media__content" data-id="${id}" data-filtrable><a href="#media-id-${id}" class="media__link"><figure class="media__figure">${thumbnail}<figcaption class="media__caption">${title}<span class="date">${date}</span><span class="media__price">${price}€</span><span class="like-total">${likes}</span></figcaption></figure></a><button class="btn-like">Like</button></article>`
    uiGalleryArray.push(uiMedia)
  })

  const uiGallery = uiGalleryArray.join("")
  const markup = `<nav class="sort-nav" data-reset><p class="sort-title">Trier par</p><ul class="sort-list"><li class="sort-item">Popularité</li><li class="sort-item">Date</li><li class="sort-item">Titre</li></ul></nav><section id="media-gallery" class="media-gallery" data-reset>${uiGallery}</section>`
  uiMain.insertAdjacentHTML("beforeend", markup)
}

const initPhotographerPage = async (apiUrl, photographer) => {
  resetApp()
  uiCreateHeader(photographer)
  const medias = await getMediasByPhotographer(apiUrl, photographer.id)
  // we need the photographer id for the medias path
  uiCreateGallery(medias, photographer.id)
  initTagNav(apiUrl, "medias")
}

export default initPhotographerPage
