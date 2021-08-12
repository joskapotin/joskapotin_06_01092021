import buildData from "./builder.js"
import { createTaglist, uiCreateTagNav, initTagNav, fetchData } from "./helpers.js"

const url = "./data/fisheyedata.json"
const mediasPath = "medias/"
const photographeThumbPath = mediasPath + "photographers-id-photos/"
const uiHeader = document.getElementById("site-header")
const uiMain = document.getElementById("site-main")

const uiInsertHeaderMarkup = () => {
  const markup = '<nav class="top-nav" aria-label="photographers category"><ul id="tag-nav" class="tag-list"></ul></nav>'
  uiHeader.insertAdjacentHTML("beforeend", markup)
  const uiTagNav = document.getElementById("tag-nav")
  return uiTagNav
}

const uiInsertMainMarkup = () => {
  const markup = `<h1 class="page-title">Nos photographes</h1><section id="photographers-list" class="section-photographers"></section>`
  uiMain.insertAdjacentHTML("beforeend", markup)
  const uiPhotographersList = document.getElementById("photographers-list")
  return uiPhotographersList
}

// Create photographers list
const uiCreatePhotographersList = (photographers, uiPhotographersList) => {
  photographers.forEach(photographe => {
    const { id, firstname, lastname, city, country, tags, tagline, price, portrait } = photographe
    const thumbnail = photographeThumbPath.concat(portrait)
    const tagList = createTaglist(tags)

    const uiCard = `<article class="card" id="card${id}"><img class="card__img" src="${thumbnail}" height="200" width="200"><h2 class="name">${firstname} ${lastname}</h2><h3 class="location">${city}, ${country}</h3><p class="tagline">${tagline}</p><p class="pricing">${price}€/jour</p><ul class="tag-list">${tagList}</ul></article>`
    uiPhotographersList.insertAdjacentHTML("beforeend", uiCard)
  })
}

// Init Homepage
const createHomepage = ({ photographers }) => {
  const uiTagNav = uiInsertHeaderMarkup()
  uiCreateTagNav(photographers, uiTagNav)
  const uiPhotographersList = uiInsertMainMarkup()
  uiCreatePhotographersList(photographers, uiPhotographersList)
  return photographers
}

const initHomepage = () => {
  fetchData(url)
    .then(result => {
      return buildData(result)
    })
    .then(result => {
      return createHomepage(result)
    })
    .then(result => {
      return initTagNav(result)
    })
    .catch(error => console.log(error))
}

export default initHomepage
