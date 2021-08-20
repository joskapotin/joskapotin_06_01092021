import { uiHeader, uiMain } from "./config.js"
import { requestData, createNavBar, resetPage } from "./helpers.js"
import { initPhotographersCards, initPhotographersTagNav } from "./cards-photographers.js"

const insertTopNavBar = async () => {
  const navBar = await createNavBar()
  uiHeader.insertAdjacentHTML("beforeend", navBar)
  return document.querySelectorAll("#site-header .tag-link")
}

const insertPhotographersCards = async () => {
  const { photographers } = await requestData()
  initPhotographersCards(photographers)
}

const initHomepage = async () => {
  resetPage()
  document.body.id = "page-home"

  const uiTagLinks = await insertTopNavBar()
  initPhotographersTagNav(uiTagLinks)

  const markup = `<h1 class="page-title" data-reset>Nos photographes</h1><section id="photographers-list" class="section-photographers" data-reset></section>`
  uiMain.insertAdjacentHTML("beforeend", markup)

  insertPhotographersCards()
}

export default initHomepage
