import { uiHeader, uiMain } from "./options.js"
import { requestData, createNavBar, resetPage } from "./helpers.js"
import { initPhotographersCards, initPhotographersTagNav } from "./cards-photographers.js"

const initHomepage = async apiUrl => {
  resetPage()

  const navBar = await createNavBar(apiUrl)
  uiHeader.insertAdjacentHTML("beforeend", navBar)

  const uiTagLinks = document.querySelectorAll("#site-header .tag-link")
  initPhotographersTagNav(apiUrl, uiTagLinks)

  const markup = `<h1 class="page-title" data-reset>Nos photographes</h1><section id="photographers-list" class="section-photographers" data-reset></section>`
  uiMain.insertAdjacentHTML("beforeend", markup)

  const { photographers } = await requestData(apiUrl)
  initPhotographersCards(apiUrl, photographers)
}

export default initHomepage
