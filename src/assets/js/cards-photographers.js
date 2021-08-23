import { config } from "./config.js"
import { getPhotographers } from "./helpers.js"
import { photographerFactory } from "./factory.js"
import initPhotographerPage from "./page-photographer.js"

const createPhotographersCards = photographers => {
  const photographersCard = []
  photographers.forEach(photographer => {
    photographersCard.push(photographerFactory(photographer))
  })
  return photographersCard.join("")
}

const requestPhotographersByTag = async tag => {
  const photographers = await getPhotographers()
  return photographers.filter(element => element.tags.find(element => element === tag))
}

const showPhotographerByTag = async tag => {
  const photographerByTag = await requestPhotographersByTag(tag)
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

const initPhotographerNav = () => {
  const uiCardsLink = config.uiMain.querySelectorAll(".card-link")
  uiCardsLink.forEach(card => {
    const photographerId = card.parentNode.dataset.id
    card.addEventListener("click", event => {
      event.preventDefault()
      initPhotographerPage(photographerId)
    })
  })
}

const insertPhotographersCards = photographers => {
  const photographersCards = createPhotographersCards(photographers)
  const uiPhotographersList = config.uiMain.querySelector("#photographers-list")
  uiPhotographersList.insertAdjacentHTML("beforeend", photographersCards)
}

const initPhotographersCards = photographers => {
  document.querySelectorAll(".card-photographer[data-tag-filtrable]").forEach(element => element.remove())

  insertPhotographersCards(photographers)

  const uiTagLinks = document.querySelectorAll(".card-photographer .tag-link")
  initPhotographersTagNav(uiTagLinks)

  initPhotographerNav()
}

export { initPhotographersCards, initPhotographersTagNav }
