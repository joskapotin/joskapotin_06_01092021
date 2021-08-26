import { config } from "./config.js"
import { getPhotographers, createNavBar, resetPage } from "./helpers.js"
import { photographerFactory } from "./factory.js"
import initPhotographerPage from "./page-photographer.js"

/**
 * Insert the static HTML
 */
const prepHomepage = () => {
  document.body.id = "page-home"
  const markup = `<h1 class="page-title" data-reset>Nos photographes</h1><section id="photographers-list" class="section-photographers" data-reset></section>`
  config.uiMain.insertAdjacentHTML("beforeend", markup)
}

/**
 * insert the top nav bar
 * @returns {Promise<Array>} an array of nodes
 */
const insertTopNavBar = async () => {
  const navBar = await createNavBar()
  config.uiHeader.insertAdjacentHTML("beforeend", navBar)
  return document.querySelectorAll("#site-header .tag-link")
}

/**
 * Receive an array of photographer object, use factory function to format them and return the result
 * @param {Array} photographers
 * @returns {string} html content
 */
const createPhotographersCards = photographers => {
  const photographersCards = photographers
    .map(photographer => {
      return photographerFactory(photographer)
    })
    .join("")
  return photographersCards
}

/**
 * Receive an array of photographer object, create the doms elements, insert them and return an array of node to init the nav
 * @param {Array} photographers
 * @returns {nodes} nodes
 */
const insertPhotographersCards = photographers => {
  const photographersCards = createPhotographersCards(photographers)
  const uiPhotographersList = config.uiMain.querySelector("#photographers-list")
  uiPhotographersList.insertAdjacentHTML("beforeend", photographersCards)
  return document.querySelectorAll(".card-photographer .tag-link")
}

/**
 * Receive a tag and show the corresponding photographers
 * @param {string} tag
 */
const showPhotographerByTag = async tag => {
  const photographers = await getPhotographers()
  const photographerByTag = photographers.filter(element => element.tags.find(element => element === tag))
  initPhotographersCards(photographerByTag)
}

/**
 * Init the tag navigation that show photographer by tag
 * @param {Array} uiTagLinks An array of nodes
 */
const initPhotographersTagNav = uiTagLinks => {
  uiTagLinks.forEach(uiTagLink => {
    uiTagLink.addEventListener("click", event => {
      event.preventDefault()
      const tag = event.target.dataset.tag
      showPhotographerByTag(tag)
    })
  })
}

/**
 * Init the photographers navigation that open the photographer page
 */
const initPhotographersNav = () => {
  const uiCardsLink = config.uiMain.querySelectorAll(".card-link")
  uiCardsLink.forEach(card => {
    const photographerId = card.parentNode.dataset.id
    card.addEventListener("click", event => {
      event.preventDefault()
      initPhotographerPage(photographerId)
    })
  })
}

/**
 * Remove all photographers, display the requested ones and init the nav on each cards
 * @param {array} photographers
 */
const initPhotographersCards = photographers => {
  document.querySelectorAll(".card-photographer[data-tag-filtrable]").forEach(element => element.remove())
  initPhotographersTagNav(insertPhotographersCards(photographers))
  initPhotographersNav()
}

/**
 * Inititate the homepage
 */
const initHomepage = async () => {
  resetPage()
  prepHomepage()
  initPhotographersTagNav(await insertTopNavBar())
  initPhotographersCards(await getPhotographers())
}

export default initHomepage
