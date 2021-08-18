import { photographeThumbPath, uiHeader, uiMain } from "./options.js"
import { requestData, requestMediasByPhotographer, sortMedias, getElementById, createTagNav, resetPage } from "./helpers.js"
import initMediasCards from "./cards-medias.js"

const uiCreateHeader = ({ id, name, city, country, tags, tagline, portrait, price }) => {
  const thumbnail = `${photographeThumbPath}/${portrait}`
  const tagNav = createTagNav(tags)
  const header = `<section id="photographer-section" class="photographer-section" data-id="${id}" data-reset><article class="photographer__resume">
    <h1 class="photographer__name">${name}</h1><h2 class="photographer__location">${city}, ${country}</h2><p class="photographer__tagline">${tagline}</p>${tagNav}
  </article><button class="btn photographer__btn-contact">Contactez-moi</button><picture class="photographer__picture"><img class="photographer__img" src="${thumbnail}"></picture><aside class="photographer__aside"><span class="photographer__likes">297 081</span><span class="photographer__pricing">${price}€/jour</span></aside></section>`
  uiHeader.insertAdjacentHTML("beforeend", header)
}

const requestMediasByTag = async (apiUrl, photographerId, tag) => {
  const medias = await requestMediasByPhotographer(apiUrl, photographerId)
  return medias.filter(element => element.tags.find(element => element === tag))
}

const showMediasByTag = async (apiUrl, photographerId, tag) => {
  const medias = await requestMediasByTag(apiUrl, photographerId, tag)
  initMediasCards(medias, photographerId)
}

const initMediasTagNav = (apiUrl, photographerId, uiTagLinks) => {
  uiTagLinks.forEach(uiTagLink => {
    uiTagLink.addEventListener("click", event => {
      const tag = event.target.dataset.tag
      showMediasByTag(apiUrl, photographerId, tag)
    })
  })
}

// select dropdown
// const initSortSelect = photographerId => {
//   const uiElements = document.querySelectorAll("[data-sorter]")
//   console.log(uiElements)
//   uiElements.forEach(uiElement => {
//     uiElement.addEventListener("click", event => {
//       const target = event.target
//       const parent = event.target.parentNode
//       const current = parent.firstChild
//       if (target.isSameNode(current)) {
//         return
//       }
//       parent.insertBefore(target, parent.firstChild)
//       const sorter = target.dataset.sorter
//       console.log(sorter)
//     })
//   })
// }

const initPhotographerPage = async (apiUrl, photographerId) => {
  resetPage()

  const { photographers } = await requestData(apiUrl)
  const photographer = getElementById(photographers, photographerId)
  uiCreateHeader(photographer)

  const markup = `<nav class="sort-nav" data-reset><span class="sort-nav__label">Trier par<div class="sort-nav__list" role="listbox" tabindex="0"><button class="btn sort-nav__item" data-sorter="Likes" role="option">Popularité</button><button class="btn sort-nav__item" data-sorter="Date" role="option">Date</button><button class="btn sort-nav__item" data-sorter="Title" role="option">Titre</button></div></span></nav><section id="media-gallery" class="media-gallery" data-reset></section>`
  uiMain.insertAdjacentHTML("beforeend", markup)

  const unsortedMedias = await requestMediasByPhotographer(apiUrl, photographerId)
  const medias = await sortMedias(unsortedMedias, "Likes")
  initMediasCards(medias, photographerId)

  const uiTagLinks = document.querySelectorAll("#photographer-section .tag-link")
  initMediasTagNav(apiUrl, photographerId, uiTagLinks)

  // initSortSelect(photographerId)
}

export default initPhotographerPage
