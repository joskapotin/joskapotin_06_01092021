import { photographeThumbPath, uiHeader, uiMain } from "./options.js"
import { requestData, getElementById, createTagNav, resetPage } from "./helpers.js"
import initMediasCards from "./cards-medias.js"

const uiCreateHeader = ({ id, name, city, country, tags, tagline, portrait, price }) => {
  const thumbnail = `${photographeThumbPath}/${portrait}`
  const tagNav = createTagNav(tags)
  const header = `<section id="photographer-section" class="photographer-section" data-id="${id}" data-reset><article class="photographer__resume">
    <h1 class="photographer__name">${name}</h1><h2 class="photographer__location">${city}, ${country}</h2><p class="photographer__tagline">${tagline}</p>${tagNav}
  </article><button class="btn photographer__btn-contact">Contactez-moi</button><picture class="photographer__picture"><img class="photographer__img" alt="" src="${thumbnail}"></picture><aside class="photographer__aside"><span class="photographer__likes">297 081</span><span class="photographer__pricing">${price}€/jour</span></aside></section>`
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
      event.preventDefault()
      const tag = event.target.dataset.tag
      showMediasByTag(apiUrl, photographerId, tag)
    })
  })
}

const requestMediasByPhotographer = async (apiUrl, id) => {
  const { media } = await requestData(apiUrl)
  const medias = media.filter(element => element.photographerId === parseInt(id))
  return medias
}

const sortByPopularity = elements => {
  return elements.sort((a, b) => b.likes - a.likes)
}

const sortByTitle = elements => {
  return elements.sort((a, b) => a.title.localeCompare(b.title))
}

const sortByDate = elements => {
  return elements.sort((a, b) => new Date(b.date) - new Date(a.date))
}

const sortMedias = async (apiUrl, photographerId, sorteBy) => {
  const unsortedMedias = await requestMediasByPhotographer(apiUrl, photographerId)
  if (sorteBy === "Title") {
    return sortByTitle(unsortedMedias)
  } else if (sorteBy === "Date") {
    return sortByDate(unsortedMedias)
  }
  return sortByPopularity(unsortedMedias)
}

const loadMedias = async (apiUrl, photographerId, sorteBy) => {
  const medias = await sortMedias(apiUrl, photographerId, sorteBy)
  initMediasCards(medias, photographerId, sorteBy)
}

// select dropdown
const initSortSelect = (apiUrl, photographerId) => {
  const uiElements = document.querySelectorAll("[data-sorter]")
  uiElements.forEach(uiElement => {
    uiElement.addEventListener("click", event => {
      // The first option is the current so we do nothing
      const target = event.target
      const parent = event.target.parentNode
      const current = parent.firstChild
      if (target.isSameNode(current)) {
        return
      }
      parent.insertBefore(target, parent.firstChild)
      const sorteBy = target.dataset.sorter
      loadMedias(apiUrl, photographerId, sorteBy)
    })
  })
}

const initPhotographerPage = async (apiUrl, photographerId) => {
  resetPage()
  document.body.id = "page-photographer"

  const { photographers } = await requestData(apiUrl)
  const photographer = getElementById(photographers, photographerId)
  uiCreateHeader(photographer)

  const markup = `<nav class="sort-nav" data-reset><span class="sort-nav__label">Trier par<div class="sort-nav__list" role="listbox"><button class="btn sort-nav__item" data-sorter="Likes" role="option">Popularité</button><button class="btn sort-nav__item" data-sorter="Date" role="option">Date</button><button class="btn sort-nav__item" data-sorter="Title" role="option">Titre</button></div></span></nav><section id="media-gallery" class="media-gallery" data-reset></section>`
  uiMain.insertAdjacentHTML("beforeend", markup)

  const medias = await sortMedias(apiUrl, photographerId)
  initMediasCards(medias, photographerId)

  const uiTagLinks = document.querySelectorAll("#photographer-section .tag-link")
  initMediasTagNav(apiUrl, photographerId, uiTagLinks)

  initSortSelect(apiUrl, photographerId)
}

export default initPhotographerPage
