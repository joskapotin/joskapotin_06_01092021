import { photographeThumbPath, uiMain } from "./config.js"
import { createTagNav, requestData } from "./helpers.js"
import initPhotographerPage from "./page-photographer.js"

const createPhotographersCards = photographers => {
  const photographersCard = []
  photographers.forEach(photographe => {
    const { id, name, city, country, tags, tagline, price, portrait } = photographe
    const thumbnail = `${photographeThumbPath}/${portrait}`
    const tagNav = createTagNav(tags)

    const uiCard = `<article class="card card-photographer" data-id="${id}" data-tag-filtrable><a href="photographer/${id}" class="card-link"><img class="card__img" src="${thumbnail}" alt="" height="200" width="200"><h2 class="card__name">${name}</h2><h3 class="card__location">${city}, ${country}</h3><p class="card__tagline">${tagline}</p><p class="card__pricing">${price}€/jour</p></a>${tagNav}</article>`
    photographersCard.push(uiCard)
  })
  return photographersCard.join("")
}

const requestPhotographersByTag = async tag => {
  const { photographers } = await requestData()
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
  const uiCardsLink = uiMain.querySelectorAll(".card-link")
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
  const uiPhotographersList = uiMain.querySelector("#photographers-list")
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
