import { config } from "./config.js"
import { getPhotographers, getMedias, getElementById, createTagNav, resetPage } from "./helpers.js"
import initMediasCards from "./cards-medias.js"

const uiCreateHeader = ({ id, name, city, country, tags, tagline, portrait, price }) => {
  const thumbnail = `${config.photographeThumbPath}/${portrait}`
  const tagNav = createTagNav(tags)
  const header = `<section id="photographer-section" class="photographer-section" data-id="${id}" data-reset><article class="photographer__resume">
    <h1 class="photographer__name">${name}</h1><h2 class="photographer__location">${city}, ${country}</h2><p class="photographer__tagline">${tagline}</p>${tagNav}
  </article><button class="btn photographer__btn-contact">Contactez-moi</button><picture class="photographer__picture"><img class="photographer__img" alt="" src="${thumbnail}"></picture><aside class="photographer__aside"><span class="photographer__likes">297 081</span><span class="photographer__pricing">${price}€/jour</span></aside></section>`
  config.uiHeader.insertAdjacentHTML("beforeend", header)
}

const requestMediasByPhotographer = async id => {
  const Allmedias = await getMedias()
  const medias = Allmedias.filter(element => element.photographerId === parseInt(id))
  return medias
}

const requestMediasByTag = async (photographerId, tag) => {
  const medias = await requestMediasByPhotographer(photographerId)
  return medias.filter(element => element.tags.find(element => element === tag))
}

const showMediasByTag = async (photographerId, tag) => {
  const medias = await requestMediasByTag(photographerId, tag)
  initMediasCards(medias, photographerId)
}

const initMediasTagNav = (photographerId, uiTagLinks) => {
  uiTagLinks.forEach(uiTagLink => {
    uiTagLink.addEventListener("click", event => {
      event.preventDefault()
      const tag = event.target.dataset.tag
      showMediasByTag(photographerId, tag)
    })
  })
}

const sortByPopularity = elements => {
  return elements.sort((a, b) => b.likes - a.likes)
}

const sortByTitle = elements => {
  return elements.sort((a, b) => a.title.localeCompare(b.title))
}

const sortByDate = elements => {
  elements.forEach(e => console.log(e, Date.parse(e.date)))
  return elements.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
}

const sortMedias = async (photographerId, sorteBy) => {
  const unsortedMedias = await requestMediasByPhotographer(photographerId)
  if (sorteBy === "Title") {
    return sortByTitle(unsortedMedias)
  } else if (sorteBy === "Date") {
    return sortByDate(unsortedMedias)
  }
  return sortByPopularity(unsortedMedias)
}

const loadMedias = async (photographerId, sorteBy) => {
  const medias = await sortMedias(photographerId, sorteBy)
  initMediasCards(medias, photographerId, sorteBy)
}

// select dropdown
const initSortSelect = photographerId => {
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
      loadMedias(photographerId, sorteBy)
    })
  })
}

const initPhotographerPage = async photographerId => {
  resetPage()
  document.body.id = "page-photographer"

  const photographers = await getPhotographers()
  const photographer = getElementById(photographers, photographerId)
  uiCreateHeader(photographer)

  const markup = `<nav class="sort-nav" data-reset><span class="sort-nav__label">Trier par<div class="sort-nav__list" role="listbox"><button class="btn sort-nav__item" data-sorter="Likes" role="option">Popularité</button><button class="btn sort-nav__item" data-sorter="Date" role="option">Date</button><button class="btn sort-nav__item" data-sorter="Title" role="option">Titre</button></div></span></nav><section id="media-gallery" class="media-gallery" data-reset></section>`
  config.uiMain.insertAdjacentHTML("beforeend", markup)

  const medias = await sortMedias(photographerId)
  initMediasCards(medias, photographerId)

  const uiTagLinks = document.querySelectorAll("#photographer-section .tag-link")
  initMediasTagNav(photographerId, uiTagLinks)

  initSortSelect(photographerId)
}

export default initPhotographerPage
