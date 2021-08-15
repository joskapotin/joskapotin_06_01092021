import { uiHeader, uiMain } from "./options.js"
import { requestData, uiCreateNavBar, uiInsertPhotographersCard, getElementById, initTagNav, resetPage } from "./helpers.js"
import initPhotographerPage from "./photographer-page.js"

const initPhotographerNav = (apiUrl, photographers) => {
  const cardsLink = uiMain.querySelectorAll(".card-link")
  cardsLink.forEach(card => {
    const photographer = getElementById(photographers, card.parentNode.dataset.id)
    card.addEventListener("click", event => {
      initPhotographerPage(apiUrl, photographer)
    })
  })
}

const initHomepage = async apiUrl => {
  resetPage()

  const uiNavBar = await uiCreateNavBar(apiUrl)
  uiHeader.insertAdjacentHTML("beforeend", uiNavBar)

  const markup = `<h1 class="page-title" data-reset>Nos photographes</h1><section id="photographers-list" class="section-photographers" data-reset></section>`
  uiMain.insertAdjacentHTML("beforeend", markup)

  const { photographers } = await requestData(apiUrl)
  uiInsertPhotographersCard(photographers)

  const filter = { apiUrl: apiUrl, type: "photographers" }
  initTagNav(filter)

  // when a photographer cards is clicked we need to send the target photographer and the apiUrl so we can request the corresponding medias
  initPhotographerNav(apiUrl, photographers)
}

export default initHomepage
