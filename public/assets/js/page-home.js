import { config } from "./config.js"
import { getPhotographers, createNavBar, resetPage } from "./helpers.js"
import { photographerFactory } from "./factory.js"
import initPhotographerPage from "./page-photographer.js"

const prepHomepage = () => {
  document.body.id = "page-home"
  const markup = `<h1 class="page-title" data-reset>Nos photographes</h1><section id="photographers-list" class="section-photographers" data-reset></section>`
  config.uiMain.insertAdjacentHTML("beforeend", markup)
}

const insertTopNavBar = async () => {
  const navBar = await createNavBar()
  config.uiHeader.insertAdjacentHTML("beforeend", navBar)
}

const createPhotographersCards = photographers => {
  const photographersCards = photographers
    .map(photographer => {
      return photographerFactory(photographer)
    })
    .join("")
  return photographersCards
}

const insertPhotographersCards = photographers => {
  const photographersCards = createPhotographersCards(photographers)
  const uiPhotographersList = config.uiMain.querySelector("#photographers-list")
  uiPhotographersList.insertAdjacentHTML("beforeend", photographersCards)
}

const getPhotographersByTag = async tag => {
  const photographers = await getPhotographers()
  return photographers.filter(element => element.tags.find(element => element === tag))
}

const showPhotographerByTag = async tag => {
  const photographerByTag = await getPhotographersByTag(tag)
  initPhotographersCards(photographerByTag)
}

const initPhotographersTagNav = uiTagLinks => {
  uiTagLinks.forEach(uiTagLink => {
    uiTagLink.addEventListener("click", event => {
      event.preventDefault()
      const tag = event.target.dataset.tag
      showPhotographerByTag(tag)
    })
  })
}

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

const initPhotographersCards = photographers => {
  document.querySelectorAll(".card-photographer[data-tag-filtrable]").forEach(element => element.remove())

  insertPhotographersCards(photographers)

  const uiTagLinks = document.querySelectorAll(".card-photographer .tag-link")
  initPhotographersTagNav(uiTagLinks)

  initPhotographersNav()
}

const initHomepage = async () => {
  resetPage()

  prepHomepage()

  insertTopNavBar()

  const photographers = await getPhotographers()
  initPhotographersCards(photographers)

  const uiTagLinks = document.querySelectorAll("#site-header .tag-link")
  initPhotographersTagNav(uiTagLinks)
}

export default initHomepage
