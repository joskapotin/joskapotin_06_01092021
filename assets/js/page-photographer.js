import { photographeThumbPath, uiHeader, uiMain } from "./options.js"
import { sortByPopularity, sortByTitle, requestMediasByPhotographer, createTagNav, initTagNav, resetPage } from "./helpers.js"
import initMediasCards from "./cards-medias.js"

const uiCreateHeader = ({ id, name, city, country, tags, tagline, portrait, price }) => {
  const thumbnail = `${photographeThumbPath}/${portrait}`
  const tagNav = createTagNav(tags)
  const header = `<section id="photographer-section" class="photographer-section" data-id="${id}" data-reset><article class="photographer__resume">
    <h1 class="photographer__name">${name}</h1><h2 class="photographer__location">${city}, ${country}</h2><p class="photographer__tagline">${tagline}</p>${tagNav}
  </article><button class="btn photographer__btn-contact">Contactez-moi</button><picture class="photographer__picture"><img class="photographer__img" src="${thumbnail}"></picture><aside class="photographer__aside"><span class="photographer__likes">297 081</span><span class="photographer__pricing">${price}€/jour</span></aside></section>`
  uiHeader.insertAdjacentHTML("beforeend", header)
}
const initPhotographerPage = async (apiUrl, photographer) => {
  resetPage()
  uiCreateHeader(photographer)

  const markup = `<nav class="sort-nav" data-reset><span class="sort-nav__label">Trier par<ul class="sort-nav__list"><li class="sort-nav__item" data-sorter="Likes" tabindex="0">Popularité</li><li class="sort-nav__item" data-sorter="Date" tabindex="0">Date</li><li class="sort-nav__item" data-sorter="Title" tabindex="0">Titre</li></ul></span></nav><section id="media-gallery" class="media-gallery" data-reset></section>`
  uiMain.insertAdjacentHTML("beforeend", markup)

  const unsortedMedias = await requestMediasByPhotographer(apiUrl, photographer.id)
  const medias = sortByPopularity(unsortedMedias)
  initMediasCards(medias, photographer.id)

  const uiTagLinks = document.querySelectorAll("#photographer-section .tag-link")
  console.log(uiTagLinks)
  const filter = { apiUrl: apiUrl, type: "medias", uiElements: uiTagLinks }
  initTagNav(filter)

  // select dropdown
  // document.addEventListener("click", event => {
  //   if (event.target.matches("[data-sorter]")) {
  //     const target = event.target
  //     const parent = event.target.parentNode
  //     const current = parent.firstChild
  //     if (!target.isSameNode(current)) {
  //       parent.insertBefore(target, parent.firstChild)
  //       const sorter = target.dataset.sorter
  //       if (sorter === "Likes") {
  //         const medias = sortByPopularity(unsortedMedias)
  //         initMediasCards(medias, photographer.id)
  //       } else if (sorter === "Title") {
  //         const medias = sortByTitle(unsortedMedias)
  //         initMediasCards(medias, photographer.id)
  //       }

  //       // sortMedias(target.dataset.dataSorter.value)
  //     }
  //   }
  // })

  // sorting
}

export default initPhotographerPage
