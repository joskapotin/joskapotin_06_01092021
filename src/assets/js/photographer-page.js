import { photographeThumbPath, uiHeader, uiMain } from "./options.js"
import { uiInsertGallery, requestMediasByPhotographer, createTagNav, initTagNav, resetPage } from "./helpers.js"

const uiCreateHeader = ({ id, name, city, country, tags, tagline, portrait, price }) => {
  const thumbnail = `${photographeThumbPath}/${portrait}`
  const tagNav = createTagNav(tags)
  const header = `<section class="photographer-section" data-id="${id}" data-reset><article class="photographer__resume">
    <h1 class="photographer__name">${name}</h1><h2 class="photographer__location">${city}, ${country}</h2><p class="photographer__tagline">${tagline}</p>${tagNav}
  </article><button class="btn photographer__btn-contact">Contactez-moi</button><picture class="photographer__picture"><img class="photographer__img" src="${thumbnail}"></picture><aside class="photographer__aside"><span class="photographer__likes">297 081</span><span class="photographer__pricing">${price}€/jour</span></aside></section>`
  uiHeader.insertAdjacentHTML("beforeend", header)
}

const initPhotographerPage = async (apiUrl, photographer) => {
  resetPage()
  uiCreateHeader(photographer)

  const markup = `<nav class="sort-nav" data-reset><span class="sort-nav__label">Trier par</span><ul class="sort-nav__list" tabindex="0"><li class="sort-nav__item" data-sorter="Likes">Popularité</li><li class="sort-nav__item" data-sorter="Date">Date</li><li class="sort-nav__item" data-sorter="Title">Titre</li></ul></nav><section id="media-gallery" class="media-gallery" data-reset></section>`
  uiMain.insertAdjacentHTML("beforeend", markup)

  const medias = await requestMediasByPhotographer(apiUrl, photographer.id)
  // we need the photographer id for the medias path
  uiInsertGallery(medias, photographer.id)

  const filter = { apiUrl: apiUrl, type: "medias" }
  initTagNav(filter)
}

export default initPhotographerPage
