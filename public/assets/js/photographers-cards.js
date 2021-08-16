import { photographeThumbPath, uiMain } from "./options.js"
import { createTagNav, initTagNav, getElementById } from "./helpers.js"
import initPhotographerPage from "./photographer-page.js"

const ShcreatePhotographersCards = photographers => {
  const uiPhotographers = []
  photographers.forEach(photographe => {
    const { id, name, city, country, tags, tagline, price, portrait } = photographe
    const thumbnail = `${photographeThumbPath}/${portrait}`
    const tagNav = createTagNav(tags)

    const uiCard = `<article class="card card-photographer" data-id="${id}" data-tag-filtrable><a href="#photographer-id-${id}" class="card-link"><img class="card__img" src="${thumbnail}" height="200" width="200"><h2 class="card__name">${name}</h2><h3 class="card__location">${city}, ${country}</h3><p class="card__tagline">${tagline}</p><p class="card__pricing">${price}€/jour</p></a>${tagNav}</article>`
    uiPhotographers.push(uiCard)
  })
  return uiPhotographers.join("")
}

const insertPhotographersCards = (photographersCard, uiPhotographersList) => {
  uiPhotographersList.insertAdjacentHTML("beforeend", photographersCard)
}

const initPhotographerNav = (apiUrl, photographers, uiCardsLink) => {
  uiCardsLink.forEach(card => {
    const photographer = getElementById(photographers, card.parentNode.dataset.id)
    card.addEventListener("click", event => {
      initPhotographerPage(apiUrl, photographer)
    })
  })
}

const initPhotographersCards = (apiUrl, photographers) => {
  document.querySelectorAll(".card-photographer[data-tag-filtrable]").forEach(element => element.remove())

  const photographersCard = ShcreatePhotographersCards(photographers)
  const uiPhotographersList = uiMain.querySelector("#photographers-list")
  insertPhotographersCards(photographersCard, uiPhotographersList)

  const uiNavBar = document.querySelector(".card-photographer .tag-nav")
  const filter = { apiUrl: apiUrl, type: "photographers", uiElements: [uiNavBar] }
  initTagNav(filter)

  const uiCardsLink = uiMain.querySelectorAll(".card-link")
  initPhotographerNav(apiUrl, photographers, uiCardsLink)
}

export default initPhotographersCards
