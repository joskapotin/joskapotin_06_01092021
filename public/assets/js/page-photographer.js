import { config } from "./config.js"
import { getPhotographers, getMedias, sortByPopularity, sortByTitle, sortByDate, getElementById, createTagNav, resetPage } from "./helpers.js"
import { mediaFactory } from "./factory.js"

/**
 * Insert the static HTML
 */
const prepPhotographerPage = () => {
  document.body.id = "page-photographer"
  const markup = `<nav class="sort-nav" data-reset><span class="sort-nav__label">Trier par<div class="sort-nav__list" role="listbox"><button class="btn sort-nav__item" data-sorter="Likes" role="option">Popularité</button><button class="btn sort-nav__item" data-sorter="Date" role="option">Date</button><button class="btn sort-nav__item" data-sorter="Title" role="option">Titre</button></div></span></nav><section id="media-gallery" class="media-gallery" data-reset></section>`
  config.uiMain.insertAdjacentHTML("beforeend", markup)
}

/**
 * get the photographer by his id and insert his informations in the DOM
 * @param {string} photographerId
 */
const insertPhotographerInfos = async photographerId => {
  const photographers = await getPhotographers()
  const { id, name, city, country, tags, tagline, portrait, price } = getElementById(photographers, photographerId)
  const thumbnail = `${config.photographeThumbPath}/${portrait}`
  const tagNav = createTagNav(tags)
  const header = `<section id="photographer-section" class="photographer-section" data-id="${id}" data-reset><article class="photographer__resume">
    <h1 class="photographer__name">${name}</h1><h2 class="photographer__location">${city}, ${country}</h2><p class="photographer__tagline">${tagline}</p>${tagNav}
  </article><button class="btn photographer__btn-contact">Contactez-moi</button><picture class="photographer__picture"><img class="photographer__img" alt="" src="${thumbnail}"></picture><aside class="photographer__aside"><span class="photographer__likes">297 081</span><span class="photographer__pricing">${price}€/jour</span></aside></section>`
  config.uiHeader.insertAdjacentHTML("beforeend", header)
}

/**
 * pass an array of medias object through the factory and return the html reday to be inserted
 * @param {Array} medias
 * @returns {string}
 */
const createMediasCards = medias => {
  const mediasCards = medias
    .map(media => {
      return mediaFactory(media)
    })
    .join("")

  return mediasCards
}

/**
 * remove existing medias from the dom and insert the requested ones
 * @param {Array} medias an array of medias objects
 */
const insertMediasCards = medias => {
  document.querySelectorAll(".media__content[data-tag-filtrable]").forEach(element => element.remove())

  const mediasCards = createMediasCards(medias)
  const uiGallery = config.uiMain.querySelector("#media-gallery")
  uiGallery.insertAdjacentHTML("beforeend", mediasCards)
}

/**
 * Get medias of a photographer
 * @param {string} id
 * @returns {Promise<Array>} an array of medias objects
 */
const requestMediasByPhotographer = async id => {
  const Allmedias = await getMedias()
  const medias = Allmedias.filter(element => element.photographerId === parseInt(id))
  return medias
}

/**
 * Get the medias of aphotographer with a specific tag
 * @param {string} photographerId
 * @param {string} tag
 * @returns {Promise<Array>} an array of medias objects
 */
const requestMediasByPhotographerAndTag = async (photographerId, tag) => {
  const medias = await requestMediasByPhotographer(photographerId)
  return medias.filter(element => element.tags.find(element => element === tag))
}

/**
 * Insert the media of aphotographer with a specific tag
 * @param {string} photographerId
 * @param {string} tag
 */
const showMediasByTag = async (photographerId, tag) => {
  const medias = await requestMediasByPhotographerAndTag(photographerId, tag)
  insertMediasCards(medias, photographerId)
}

/**
 * Add eventlistener to filter medias by tag
 * @param {string} photographerId of the current photographer
 * @param {Array} uiTagLinks array of nodes
 */
const initMediasTagNav = (photographerId, uiTagLinks) => {
  uiTagLinks.forEach(uiTagLink => {
    uiTagLink.addEventListener("click", event => {
      event.preventDefault()
      const tag = event.target.dataset.tag
      showMediasByTag(photographerId, tag)
    })
  })
}

/**
 * Sort medias and insert them
 * @param {string} photographerId of the current photographer
 * @param {string} sorteBy can be "Title", "Date", any other value or undefine sort by popularity
 * @callback insertMediasCards(sortedMedias)
 */
const sortMedias = async (photographerId, sorteBy) => {
  const unsortedMedias = await requestMediasByPhotographer(photographerId)
  if (sorteBy === "Title") {
    const sortedMedias = sortByTitle(unsortedMedias)
    return insertMediasCards(sortedMedias)
  } else if (sorteBy === "Date") {
    const sortedMedias = sortByDate(unsortedMedias)
    return insertMediasCards(sortedMedias)
  }
  const sortedMedias = sortByPopularity(unsortedMedias)
  return insertMediasCards(sortedMedias)
}

/**
 * build the select menu and sort medias on click
 * @param {string} photographerId
 */
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
      sortMedias(photographerId, sorteBy)
    })
  })
}

/**
 * Display the photographer page and initiate the gallery
 * @param {string} photographerId
 */
const initPhotographerPage = photographerId => {
  resetPage()
  prepPhotographerPage()
  insertPhotographerInfos(photographerId)
  sortMedias(photographerId)

  const uiTagLinks = document.querySelectorAll("#photographer-section .tag-link")
  initMediasTagNav(photographerId, uiTagLinks)

  initSortSelect(photographerId)
}

export default initPhotographerPage
