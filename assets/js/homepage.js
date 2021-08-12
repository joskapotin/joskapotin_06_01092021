import { photographeThumbPath, uiHeader, uiMain } from "./options.js"
import { getAllTheTag, createTaglist, initTagNav, getElementById, getPhotographers } from "./helpers.js"
import initPhotographerPage from "./gallery"

const uiCreateNavBar = photographers => {
  const tagArray = getAllTheTag(photographers)
  const tagList = createTaglist(tagArray)
  const markup = `<nav class="top-nav" aria-label="photographers category" data-js="true"><ul id="tag-nav" class="tag-list">${tagList}</ul></nav>`
  uiHeader.insertAdjacentHTML("beforeend", markup)
}

const uiCreatePhotographersCards = photographers => {
  const uiPhotographersArray = []
  photographers.forEach(photographe => {
    const { id, name, city, country, tags, tagline, price, portrait } = photographe
    const thumbnail = `${photographeThumbPath}/${portrait}`
    const tagList = createTaglist(tags)

    // Each card get an unique id and data-id from the photographer id
    const uiCard = `<article class="card card-photographer" id="card-${id}"><a href="#photographer-id-${id}" class="card-link" data-id="${id}"><img class="card__img" src="${thumbnail}" height="200" width="200"><h2 class="card__name">${name}</h2><h3 class="card__location">${city}, ${country}</h3><p class="card__tagline">${tagline}</p><p class="card__pricing">${price}€/jour</p><ul class="tag-list">${tagList}</ul></a></article>`
    uiPhotographersArray.push(uiCard)
  })
  const uiPhotographers = uiPhotographersArray.join("")
  const markup = `<h1 class="page-title" data-js="true">Nos photographes</h1><section id="photographers-list" class="section-photographers" data-js="true">${uiPhotographers}</section>`
  uiMain.insertAdjacentHTML("beforeend", markup)
}

const initPhotographerNav = photographers => {
  const cardsLink = uiMain.querySelectorAll(".card-link")
  cardsLink.forEach(card => {
    const photographer = getElementById(photographers, card.dataset.id)
    card.addEventListener("click", event => {
      initPhotographerPage(photographer)
    })
  })
}

const initHomepage = async apiUrl => {
  getPhotographers(apiUrl)
    .then(photographers => {
      uiCreateNavBar(photographers)
      uiCreatePhotographersCards(photographers)
      return photographers
    })
    .then(photographers => {
      initTagNav(photographers)
      initPhotographerNav(photographers)
    })
    .catch(error => console.log(error))
}

export default initHomepage
