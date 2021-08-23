import { config } from "./config.js"
import { getPhotographers, createNavBar, resetPage } from "./helpers.js"
import { initPhotographersCards, initPhotographersTagNav } from "./cards-photographers.js"

const insertTopNavBar = async () => {
  const navBar = await createNavBar()
  config.uiHeader.insertAdjacentHTML("beforeend", navBar)
  return document.querySelectorAll("#site-header .tag-link")
}

const insertPhotographersCards = async () => {
  const photographers = await getPhotographers()
  initPhotographersCards(photographers)
}

const initHomepage = async () => {
  resetPage()
  document.body.id = "page-home"

  const uiTagLinks = await insertTopNavBar()
  initPhotographersTagNav(uiTagLinks)

  const markup = `<h1 class="page-title" data-reset>Nos photographes</h1><section id="photographers-list" class="section-photographers" data-reset></section>`
  config.uiMain.insertAdjacentHTML("beforeend", markup)

  insertPhotographersCards()
}

export default initHomepage
