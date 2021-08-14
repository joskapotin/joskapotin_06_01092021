import { photographeThumbPath, mediasPath, uiHeader, uiMain } from "./options.js"
import { fetchMediasByPhotographer, createTaglist, initTagNav, resetApp } from "./helpers.js"

const uiCreateHeader = ({ id, name, city, country, tags, tagline, portrait, price }) => {
  const thumbnail = `${photographeThumbPath}/${portrait}`
  const tagList = createTaglist(tags)
  const header = `<section class="photographer-section" data-id="${id}" data-reset><article class="photographer__content"><h1 class="photographer__name">${name}</h1><h2 class="photographer__location">${city}, ${country}</h2><p class="photographer__tagline">${tagline}</p>${tagList}</article><button class="btn photographer__btn-contact">Contactez-moi</button><aside class="photographer__aside"><span class="photographer__likes">297 081</span><span class="photographer__pricing">${price}€/jour</span></aside><picture class="photographer__picture"><img class="photographer__img" src="${thumbnail}"></picture></section>`
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
    const uiMedia = `<article class="media__content" data-id="${id}" data-filtrable><a href="#media-id-${id}" class="media__link"><figure class="media__figure">${thumbnail}</figure></a><footer class="media__footer"><h3 class="media__title">${title}</h3><span class="media__date">${date}</span><span class="media__price">${price}€</span><span class="media__total-likes">${likes}<button class="btn-like">Like</button></span></footer></article>`
    uiGalleryArray.push(uiMedia)
  })

  const uiGallery = uiGalleryArray.join("")
  const markup = `
  <nav class="sort-nav" data-reset><label class="sort-nav__label">Trier par<span class="sort-nav__select"><select><option value="Option 1">Popularité</option><option value="Option 2">Date</option><option value="Option 3">Titre</option></select><span class="sort-nav-focus"></span></span></label></nav><section id="media-gallery" class="media-gallery" data-reset>${uiGallery}</section>`
  uiMain.insertAdjacentHTML("beforeend", markup)
}

const initPhotographerPage = async (apiUrl, photographer) => {
  resetApp()
  uiCreateHeader(photographer)
  const medias = await fetchMediasByPhotographer(apiUrl, photographer.id)
  // we need the photographer id for the medias path
  uiCreateGallery(medias, photographer.id)
  initTagNav(apiUrl, "medias")
}

export default initPhotographerPage
