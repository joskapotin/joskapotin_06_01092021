import { uiHeader, uiMain } from "./options.js"
import { requestData, createNavBar, initTagNav, resetPage } from "./helpers.js"
import initPhotographersCard from "./cards-photographers.js"

const initHomepage = async apiUrl => {
  resetPage()

  const navBar = await createNavBar(apiUrl)
  uiHeader.insertAdjacentHTML("beforeend", navBar)

  const uiTagLinks = document.querySelectorAll("#site-header .tag-link")
  const filter = { apiUrl: apiUrl, type: "photographers", uiElements: uiTagLinks }
  initTagNav(filter)

  const markup = `<h1 class="page-title" data-reset>Nos photographes</h1><section id="photographers-list" class="section-photographers" data-reset></section>`
  uiMain.insertAdjacentHTML("beforeend", markup)

  const { photographers } = await requestData(apiUrl)
  initPhotographersCard(apiUrl, photographers)
}

export default initHomepage
